import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const rules = [
  { terms:['de’longhi magnifica evo',"de'longhi magnifica evo",'delonghi magnifica evo'], src:'/assets/approved/magnifica-evo-v3.jpg' },
  { terms:['philips serie 3300 lattego','philips 3300 lattego'], src:'/assets/approved/philips-3300-v3.jpg' },
  { terms:['de’longhi rivelia',"de'longhi rivelia",'delonghi rivelia'], src:'/assets/approved/rivelia-v3.jpg' },
  { terms:['de’longhi magnifica s',"de'longhi magnifica s",'delonghi magnifica s'], src:'/assets/approved/magnifica-s-v3.jpg' },
  { terms:['philips serie 5500 lattego','philips 5500 lattego'], src:'/assets/approved/philips-5500-v4.png' },
  { terms:['ninja foodi max af400','ninja af400'], src:'/assets/approved/ninja-af400-v1.png' },
  { terms:['jbl flip 6'], src:'/assets/approved/jbl-flip6-v1.png' }
];
const legacyMap={
  '/assets/images/product-magnifica-evo.webp':'/assets/approved/magnifica-evo-v3.jpg',
  'assets/images/product-magnifica-evo.webp':'/assets/approved/magnifica-evo-v3.jpg',
  '/assets/images/product-philips-3300.webp':'/assets/approved/philips-3300-v3.jpg',
  'assets/images/product-philips-3300.webp':'/assets/approved/philips-3300-v3.jpg',
  '/assets/images/product-rivelia.webp':'/assets/approved/rivelia-v3.jpg',
  'assets/images/product-rivelia.webp':'/assets/approved/rivelia-v3.jpg',
  '/assets/images/product-magnifica-s.webp':'/assets/approved/magnifica-s-v3.jpg',
  'assets/images/product-magnifica-s.webp':'/assets/approved/magnifica-s-v3.jpg',
  '/assets/approved/magnifica-evo.jpg':'/assets/approved/magnifica-evo-v3.jpg',
  '/assets/approved/philips-3300.jpg':'/assets/approved/philips-3300-v3.jpg',
  '/assets/approved/rivelia.jpg':'/assets/approved/rivelia-v3.jpg',
  '/assets/approved/magnifica-s.jpg':'/assets/approved/magnifica-s-v3.jpg',
  '/assets/approved/magnifica-evo-v2.jpg':'/assets/approved/magnifica-evo-v3.jpg',
  '/assets/approved/philips-3300-v2.jpg':'/assets/approved/philips-3300-v3.jpg',
  '/assets/approved/rivelia-v2.jpg':'/assets/approved/rivelia-v3.jpg',
  '/assets/approved/magnifica-s-v2.jpg':'/assets/approved/magnifica-s-v3.jpg',
  '/assets/approved/philips-5500-v2.webp':'/assets/approved/philips-5500-v4.png',
  '/assets/approved/philips-5500-v3.webp':'/assets/approved/philips-5500-v4.png'
};

async function files(dir){const out=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){if(['.git','node_modules'].includes(e.name))continue;const p=path.join(dir,e.name);if(e.isDirectory())out.push(...await files(p));else if(e.name.endsWith('.html'))out.push(p);}return out;}
function replaceSrcInTag(tag,src,alt){let next=tag.replace(/\s+srcset=(['"])[\s\S]*?\1/gi,'').replace(/\s+data-src=(['"])[\s\S]*?\1/gi,'');if(/\bsrc=(['"])[^'"]*\1/i.test(next))next=next.replace(/\bsrc=(['"])[^'"]*\1/i,`src="${src}"`);else next=next.replace(/<img\b/i,`<img src="${src}"`);if(!/\balt=/i.test(next))next=next.replace(/<img\b/i,`<img alt="${alt}"`);return next;}
function applyRule(html,rule){let out=html,cursor=0;while(cursor<out.length){const low=out.toLowerCase();let hit=-1;for(const term of rule.terms){const i=low.indexOf(term.toLowerCase(),cursor);if(i!==-1&&(hit===-1||i<hit))hit=i;}if(hit===-1)break;const prevStart=low.lastIndexOf('<img',hit),prevEnd=prevStart>=0?out.indexOf('>',prevStart):-1,nextStart=low.indexOf('<img',hit),nextEnd=nextStart>=0?out.indexOf('>',nextStart):-1,prevDist=prevStart>=0?hit-prevStart:Infinity,nextDist=nextStart>=0?nextStart-hit:Infinity;let start=-1,end=-1;if(prevDist<=3200||nextDist<=3200){if(prevDist<=nextDist){start=prevStart;end=prevEnd;}else{start=nextStart;end=nextEnd;}}if(start>=0&&end>start){const tag=out.slice(start,end+1);if(!tag.includes(rule.src)){out=out.slice(0,start)+replaceSrcInTag(tag,rule.src,rule.terms[0])+out.slice(end+1);cursor=hit+rule.terms[0].length;continue;}}cursor=hit+1;}return out;}

let changed=0;
for(const file of await files(ROOT)){
  const old=await fs.readFile(file,'utf8');
  let next=old;
  for(const [from,to] of Object.entries(legacyMap)) next=next.split(from).join(to);
  for(const rule of rules) next=applyRule(next,rule);
  if(next!==old){await fs.writeFile(file,next);changed++;}
}

const catalogPath=path.join(ROOT,'assets','affiliate-overrides.json');
try{const data=JSON.parse(await fs.readFile(catalogPath,'utf8'));const map={'delonghi-magnifica-evo':'/assets/approved/magnifica-evo-v3.jpg','philips-3300':'/assets/approved/philips-3300-v3.jpg','delonghi-rivelia':'/assets/approved/rivelia-v3.jpg','delonghi-magnifica-s':'/assets/approved/magnifica-s-v3.jpg','philips-5500':'/assets/approved/philips-5500-v4.png','ninja-af400':'/assets/approved/ninja-af400-v1.png'};for(const [k,src] of Object.entries(map))if(data[k])Object.assign(data[k],{image:src,imageLocked:true,imageSource:'approved-local'});await fs.writeFile(catalogPath,JSON.stringify(data,null,2)+'\n');}catch(e){console.warn('No se pudo actualizar affiliate-overrides:',e.message);}

const productsPath=path.join(ROOT,'assets','products.json');
try{const data=JSON.parse(await fs.readFile(productsPath,'utf8'));if(data.products?.['jbl-flip-6'])Object.assign(data.products['jbl-flip-6'],{image:'/assets/approved/jbl-flip6-v1.png',imageLocked:true,imageSource:'approved-jbl-official'});await fs.writeFile(productsPath,JSON.stringify(data,null,2)+'\n');}catch(e){console.warn('No se pudo fijar JBL Flip 6 en products:',e.message);}
console.log(`✓ Fotos aprobadas y productos frágiles fijados localmente en ${changed} HTML.`);
