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

async function tdSearch(q){
  if(!tdToken)return null;
  const url=`https://api.tradedoubler.com/1.0/products.json;q=${encodeURIComponent(q)};limit=5?token=${encodeURIComponent(tdToken)}`;
  const res=await fetch(url,{headers:{accept:'application/json'}});
  if(!res.ok)throw new Error(`Tradedoubler ${res.status}`);
  const data=await res.json();
  const list=data.products||data.product||[];
  return Array.isArray(list)?list[0]||null:null;
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
    const td=await tdSearch([product.name,product.model].filter(Boolean).join(' '));
    if(td){
      product.image=product.image||td.productImage?.url||td.imageUrl||'';
      product.affiliate.tradedoubler=td.productUrl||td.url||product.affiliate.tradedoubler;
      product.price=product.price||td.price?.displayPrice||td.price?.value;
      if(!product.source)product.source='tradedoubler';
    }
  }catch(err){console.warn(`Tradedoubler sync skipped for ${product.name}: ${err.message}`)}

  if(product.affiliate.amazon&&!product.affiliate.amazon.includes('tag=')){
    product.affiliate.amazon += `${product.affiliate.amazon.includes('?')?'&':'?'}tag=${amazonTag}`;
  }
}

catalog.updatedAt=new Date().toISOString();
fs.writeFileSync(file,JSON.stringify(catalog,null,2)+'\n');
console.log(`Affiliate sync complete. Amazon=${Boolean(amazonClientId&&amazonClientSecret)} Tradedoubler=${Boolean(tdToken)}`);
