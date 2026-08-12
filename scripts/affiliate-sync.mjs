import fs from 'node:fs';
import path from 'node:path';

const file=path.resolve('assets/products.json');
const catalog=JSON.parse(fs.readFileSync(file,'utf8'));
const tdToken=process.env.TRADEDOUBLER_PRODUCTS_TOKEN||'';
const amazonTag=process.env.AMAZON_PARTNER_TAG||'hiperfoco-21';

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
    const td=await tdSearch([product.name,product.model].filter(Boolean).join(' '));
    if(td){
      product.image=td.productImage?.url||td.imageUrl||product.image;
      product.affiliate.tradedoubler=td.productUrl||td.url||product.affiliate.tradedoubler;
      product.price=td.price?.displayPrice||td.price?.value||product.price;
      product.source='tradedoubler';
    }
  }catch(err){
    console.warn(`Affiliate sync skipped for ${product.name}: ${err.message}`);
  }
  if(product.affiliate.amazon&&!product.affiliate.amazon.includes('tag=')){
    product.affiliate.amazon += `${product.affiliate.amazon.includes('?')?'&':'?'}tag=${amazonTag}`;
  }
}

catalog.updatedAt=new Date().toISOString();
fs.writeFileSync(file,JSON.stringify(catalog,null,2)+'\n');
console.log(tdToken?'Affiliate catalog synced with Tradedoubler.':'Affiliate catalog kept from repository: TRADEDOUBLER_PRODUCTS_TOKEN not configured.');
