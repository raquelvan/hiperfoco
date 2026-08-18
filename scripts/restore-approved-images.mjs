import fs from 'node:fs';
const productFile='assets/products.json';
const overrideFile='assets/affiliate-overrides.json';
if(!fs.existsSync(productFile)||!fs.existsSync(overrideFile))process.exit(0);
const data=JSON.parse(fs.readFileSync(productFile,'utf8'));
const overrides=JSON.parse(fs.readFileSync(overrideFile,'utf8'));
let restored=0;
for(const [id,o] of Object.entries(overrides)){
  if(!o.imageLocked||!o.image)continue;
  const p=data.products?.[id];
  if(!p)continue;
  p.image=o.image;
  p.imageLocked=true;
  p.imageSource=o.imageSource||'approved';
  restored++;
}
fs.writeFileSync(productFile,JSON.stringify(data,null,2)+'\n');
console.log(`Imágenes aprobadas restauradas/protegidas: ${restored}.`);
