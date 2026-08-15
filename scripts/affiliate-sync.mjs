import fs from 'node:fs';
import path from 'node:path';

const file=path.resolve('assets/products.json');
const reportFile=path.resolve('assets/affiliate-sync-report.json');
const catalog=JSON.parse(fs.readFileSync(file,'utf8'));
const tdToken=process.env.TRADEDOUBLER_PRODUCTS_TOKEN||'';
const amazonTag=process.env.AMAZON_PARTNER_TAG||'hiperfoco-21';
const amazonClientId=process.env.AMAZON_CREATORS_CLIENT_ID||'';
const amazonClientSecret=process.env.AMAZON_CREATORS_CLIENT_SECRET||'';
const marketplace='www.amazon.es';
let amazonAccessToken='';
let tdFeeds=[];
let tdMatches=0;
const runAt=new Date().toISOString();
const report={runAt,amazonApiEnabled:Boolean(amazonClientId&&amazonClientSecret),tradedoubler:{feeds:0,matches:0},products:[]};

if(!tdToken) throw new Error('TRADEDOUBLER_PRODUCTS_TOKEN missing: affiliate price sync cannot run safely');

async function getAmazonToken(){
  if(!amazonClientId||!amazonClientSecret)return '';
  if(amazonAccessToken)return amazonAccessToken;
  const res=await fetch('https://api.amazon.co.uk/auth/o2/token',{
    method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({grant_type:'client_credentials',client_id:amazonClientId,client_secret:amazonClientSecret,scope:'creatorsapi::default'})
  });
  if(!res.ok)throw new Error(`Amazon token ${res.status}`);
  const data=await res.json();
  amazonAccessToken=data.access_token||'';
  return amazonAccessToken;
}

async function amazonItem(asin){
  if(!asin)return null;
  const token=await getAmazonToken();
  if(!token)return null;
  const res=await fetch('https://creatorsapi.amazon/catalog/v1/getItems',{
    method:'POST',
    headers:{authorization:`Bearer ${token}`,'content-type':'application/json','x-marketplace':marketplace},
    body:JSON.stringify({itemIds:[asin],itemIdType:'ASIN',marketplace,partnerTag:amazonTag,resources:['images.primary.large','itemInfo.title','offersV2.listings.price']})
  });
  if(!res.ok)throw new Error(`Amazon getItems ${res.status}`);
  const data=await res.json();
  return data.itemsResult?.items?.[0]||data.items?.[0]||null;
}

async function getTdFeeds(){
  const res=await fetch(`https://api.tradedoubler.com/1.0/productFeeds.json?token=${encodeURIComponent(tdToken)}`,{headers:{accept:'application/json'}});
  if(!res.ok)throw new Error(`Tradedoubler feeds ${res.status}`);
  const data=await res.json();
  return (data.feeds||[]).filter(f=>f.active!==false&&f.visible!==false&&Number(f.numberOfProducts||0)>0);
}

function norm(v=''){
  return String(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
}

function scoreCandidate(item,product){
  const hay=norm(`${item.name||''} ${item.description||''} ${item.sku||''}`);
  const required=norm(`${product.name||''} ${product.model||''}`).split(' ').filter(t=>t.length>2);
  let score=required.reduce((s,t)=>s+(hay.includes(t)?2:0),0);
  if(product.model&&hay.includes(norm(product.model)))score+=12;
  if(item.availability&&/stock|available|dispon/i.test(String(item.availability)))score+=1;
  return score;
}

function readTdPrice(td){
  const p=td?.price;
  if(!p)return '';
  if(typeof p==='string'||typeof p==='number')return p;
  return p.displayPrice||p.value||p.amount||'';
}

async function tdSearch(product){
  if(!tdFeeds.length)return null;
  const q=[product.name,product.model].filter(Boolean).join(' ');
  const candidates=[];
  for(const feed of tdFeeds){
    const url=`https://api.tradedoubler.com/1.0/products.json;fid=${encodeURIComponent(feed.feedId)};q=${encodeURIComponent(q)};limit=10?token=${encodeURIComponent(tdToken)}`;
    try{
      const res=await fetch(url,{headers:{accept:'application/json'}});
      if(!res.ok)continue;
      const data=await res.json();
      const list=Array.isArray(data.products)?data.products:[];
      for(const item of list)candidates.push({...item,_feed:feed});
    }catch{}
  }
  candidates.sort((a,b)=>scoreCandidate(b,product)-scoreCandidate(a,product));
  const best=candidates[0];
  return best&&scoreCandidate(best,product)>0?best:null;
}

tdFeeds=await getTdFeeds();
if(!tdFeeds.length) throw new Error('Tradedoubler responded but no active product feeds with products were found');
report.tradedoubler.feeds=tdFeeds.length;
console.log(`Tradedoubler feeds discovered: ${tdFeeds.length}`);

for(const [key,product] of Object.entries(catalog.products)){
  const itemReport={key,name:product.name,model:product.model||'',amazon:product.affiliate?.amazon?'affiliate-link-only':'missing',tradedoubler:'no-match',price:'',availability:'',merchant:'',verifiedAt:''};
  let amazonMatched=false;

  try{
    const amazon=await amazonItem(product.asin);
    if(amazon){
      amazonMatched=true;
      product.image=amazon.images?.primary?.large?.url||product.image;
      product.affiliate.amazon=amazon.detailPageURL||product.affiliate.amazon;
      product.price=amazon.offersV2?.listings?.[0]?.price?.displayAmount||'';
      product.source='amazon-creators-api';
      product.verifiedAt=runAt;
      itemReport.amazon='api-verified';
      itemReport.price=product.price||'';
      itemReport.verifiedAt=runAt;
    }
  }catch(err){console.warn(`Amazon sync skipped for ${product.name}: ${err.message}`)}

  try{
    const td=await tdSearch(product);
    if(td){
      tdMatches++;
      const tdPrice=readTdPrice(td);
      product.image=td.productImage?.url||product.image||'';
      product.affiliate.tradedoubler=td.productUrl||product.affiliate.tradedoubler||'';
      if(!amazonMatched)product.price=tdPrice||'';
      product.merchant=td.programName||td._feed?.programs?.[0]?.name||td._feed?.name||'';
      product.feedId=td.feedId||td._feed?.feedId||null;
      product.availability=td.availability||'';
      product.source=amazonMatched?'amazon-creators-api+tradedoubler':'tradedoubler';
      product.verifiedAt=runAt;
      itemReport.tradedoubler='verified';
      itemReport.price=amazonMatched?(product.price||''):(tdPrice||'');
      itemReport.availability=product.availability;
      itemReport.merchant=product.merchant;
      itemReport.verifiedAt=runAt;
    }else{
      if(product.source==='tradedoubler'||product.source==='amazon-creators-api+tradedoubler'){
        if(!amazonMatched)product.price='';
        product.availability='';
        product.verifiedAt='';
      }
    }
  }catch(err){
    itemReport.tradedoubler=`error:${err.message}`;
    console.warn(`Tradedoubler sync skipped for ${product.name}: ${err.message}`);
  }

  if(product.affiliate.amazon&&!product.affiliate.amazon.includes('tag=')){
    product.affiliate.amazon += `${product.affiliate.amazon.includes('?')?'&':'?'}tag=${amazonTag}`;
  }
  report.products.push(itemReport);
}

catalog.updatedAt=runAt;
catalog.integrations={amazon:Boolean(amazonClientId&&amazonClientSecret),tradedoubler:true,tradedoublerFeeds:tdFeeds.length,tradedoublerMatches:tdMatches};
report.tradedoubler.matches=tdMatches;
fs.writeFileSync(file,JSON.stringify(catalog,null,2)+'\n');
fs.writeFileSync(reportFile,JSON.stringify(report,null,2)+'\n');
console.log(`Affiliate sync complete. Amazon=${Boolean(amazonClientId&&amazonClientSecret)} Tradedoubler=true feeds=${tdFeeds.length} matches=${tdMatches}`);
