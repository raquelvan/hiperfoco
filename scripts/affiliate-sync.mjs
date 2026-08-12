import fs from 'node:fs';
import path from 'node:path';

const file=path.resolve('assets/products.json');
const catalog=JSON.parse(fs.readFileSync(file,'utf8'));
const tdToken=process.env.TRADEDOUBLER_PRODUCTS_TOKEN||'';
const amazonTag=process.env.AMAZON_PARTNER_TAG||'hiperfoco-21';
const amazonClientId=process.env.AMAZON_CREATORS_CLIENT_ID||'';
const amazonClientSecret=process.env.AMAZON_CREATORS_CLIENT_SECRET||'';
const marketplace='www.amazon.es';
let amazonAccessToken='';
let tdFeeds=[];

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
  if(!tdToken)return [];
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

async function tdSearch(product){
  if(!tdToken||!tdFeeds.length)return null;
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

if(tdToken){
  try{
    tdFeeds=await getTdFeeds();
    console.log(`Tradedoubler feeds discovered: ${tdFeeds.length}`);
  }catch(err){
    console.warn(`Tradedoubler feed discovery failed: ${err.message}`);
  }
}

for(const product of Object.values(catalog.products)){
  try{
    const amazon=await amazonItem(product.asin);
    if(amazon){
      product.image=amazon.images?.primary?.large?.url||product.image;
      product.affiliate.amazon=amazon.detailPageURL||product.affiliate.amazon;
      product.price=amazon.offersV2?.listings?.[0]?.price?.displayAmount||product.price;
      product.source='amazon-creators-api';
    }
  }catch(err){console.warn(`Amazon sync skipped for ${product.name}: ${err.message}`)}

  try{
    const td=await tdSearch(product);
    if(td){
      product.image=product.image||td.productImage?.url||'';
      product.affiliate.tradedoubler=td.productUrl||product.affiliate.tradedoubler||'';
      product.price=product.price||td.price?.displayPrice||td.price?.value||td.price||'';
      product.merchant=td.programName||td._feed?.programs?.[0]?.name||td._feed?.name||'';
      product.feedId=td.feedId||td._feed?.feedId||null;
      product.availability=td.availability||'';
      if(!product.source)product.source='tradedoubler';
    }
  }catch(err){console.warn(`Tradedoubler sync skipped for ${product.name}: ${err.message}`)}

  if(product.affiliate.amazon&&!product.affiliate.amazon.includes('tag=')){
    product.affiliate.amazon += `${product.affiliate.amazon.includes('?')?'&':'?'}tag=${amazonTag}`;
  }
}

catalog.updatedAt=new Date().toISOString();
catalog.integrations={amazon:Boolean(amazonClientId&&amazonClientSecret),tradedoubler:Boolean(tdToken),tradedoublerFeeds:tdFeeds.length};
fs.writeFileSync(file,JSON.stringify(catalog,null,2)+'\n');
console.log(`Affiliate sync complete. Amazon=${Boolean(amazonClientId&&amazonClientSecret)} Tradedoubler=${Boolean(tdToken)} feeds=${tdFeeds.length}`);
