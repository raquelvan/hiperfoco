import fs from 'node:fs';
const productFile='assets/products.json',overrideFile='assets/affiliate-overrides.json';
if(!fs.existsSync(productFile)||!fs.existsSync(overrideFile))process.exit(0);
const data=JSON.parse(fs.readFileSync(productFile,'utf8')),overrides=JSON.parse(fs.readFileSync(overrideFile,'utf8'));
data.products=data.products||{};
for(const [id,o] of Object.entries(overrides)){
 const p=data.products[id]||{name:o.name||id,category:o.category||'default',image:'',affiliate:{amazon:'',tradedoubler:''}};
 p.name=o.name||p.name;
 p.category=o.category||p.category;
 if(o.image)p.image=o.image;
 if(typeof o.imageLocked==='boolean')p.imageLocked=o.imageLocked;
 if(o.imageSource)p.imageSource=o.imageSource;
 p.affiliate=p.affiliate||{};
 if(o.amazon)p.affiliate.amazon=o.amazon;
 if(o.tradedoubler)p.affiliate.tradedoubler=o.tradedoubler;
 data.products[id]=p;
}
data.updatedAt=new Date().toISOString();
fs.writeFileSync(productFile,JSON.stringify(data,null,2)+'\n');
console.log(`Afiliados e imágenes centralizados: ${Object.keys(overrides).length}.`);
