import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const rules = [
  { terms:['de’longhi magnifica evo',"de'longhi magnifica evo",'delonghi magnifica evo'], src:'/assets/approved/magnifica-evo.jpg' },
  { terms:['philips serie 3300 lattego','philips 3300 lattego'], src:'/assets/approved/philips-3300.jpg' },
  { terms:['de’longhi rivelia',"de'longhi rivelia",'delonghi rivelia'], src:'/assets/approved/rivelia.jpg' },
  { terms:['de’longhi magnifica s',"de'longhi magnifica s",'delonghi magnifica s'], src:'/assets/approved/magnifica-s.jpg' },
  { terms:['philips serie 5500 lattego','philips 5500 lattego'], src:'/assets/approved/philips-5500.webp' }
];

async function files(dir){
  const out=[];
  for(const e of await fs.readdir(dir,{withFileTypes:true})){
    if(['.git','node_modules'].includes(e.name)) continue;
    const p=path.join(dir,e.name);
    if(e.isDirectory()) out.push(...await files(p));
    else if(e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function replaceSrcInTag(tag, src, alt){
  let next=tag
    .replace(/\s+srcset=(['"])[\s\S]*?\1/gi,'')
    .replace(/\s+data-src=(['"])[\s\S]*?\1/gi,'');
  if(/\bsrc=(['"])[^'"]*\1/i.test(next)) next=next.replace(/\bsrc=(['"])[^'"]*\1/i,`src="${src}"`);
  else next=next.replace(/<img\b/i,`<img src="${src}"`);
  if(!/\balt=/i.test(next)) next=next.replace(/<img\b/i,`<img alt="${alt}"`);
  return next;
}

function applyRule(html, rule){
  let out=html;
  let cursor=0;
  while(cursor<out.length){
    const low=out.toLowerCase();
    let hit=-1;
    for(const term of rule.terms){
      const i=low.indexOf(term.toLowerCase(),cursor);
      if(i!==-1 && (hit===-1 || i<hit)) hit=i;
    }
    if(hit===-1) break;

    // Busca la imagen más cercana al nombre del producto. En nuestros hubs la imagen suele ir antes del título,
    // pero algunas plantillas la colocan después. Limitamos la distancia para no tocar una tarjeta vecina.
    const prevStart=low.lastIndexOf('<img',hit);
    const prevEnd=prevStart>=0?out.indexOf('>',prevStart):-1;
    const nextStart=low.indexOf('<img',hit);
    const nextEnd=nextStart>=0?out.indexOf('>',nextStart):-1;
    const prevDist=prevStart>=0?hit-prevStart:Infinity;
    const nextDist=nextStart>=0?nextStart-hit:Infinity;
    let start=-1,end=-1;
    if(prevDist<=3200 || nextDist<=3200){
      if(prevDist<=nextDist){start=prevStart;end=prevEnd;} else {start=nextStart;end=nextEnd;}
    }
    if(start>=0 && end>start){
      const tag=out.slice(start,end+1);
      if(!tag.includes(rule.src)){
        const replacement=replaceSrcInTag(tag,rule.src,rule.terms[0]);
        out=out.slice(0,start)+replacement+out.slice(end+1);
        cursor=hit+rule.terms[0].length;
        continue;
      }
    }
    cursor=hit+1;
  }
  return out;
}

let changed=0;
for(const file of await files(ROOT)){
  const old=await fs.readFile(file,'utf8');
  let next=old;
  for(const rule of rules) next=applyRule(next,rule);
  if(next!==old){ await fs.writeFile(file,next); changed++; }
}

const catalogPath=path.join(ROOT,'assets','affiliate-overrides.json');
try{
  const data=JSON.parse(await fs.readFile(catalogPath,'utf8'));
  const map={
    'delonghi-magnifica-evo':'/assets/approved/magnifica-evo.jpg',
    'philips-3300':'/assets/approved/philips-3300.jpg',
    'delonghi-rivelia':'/assets/approved/rivelia.jpg',
    'delonghi-magnifica-s':'/assets/approved/magnifica-s.jpg',
    'philips-5500':'/assets/approved/philips-5500.webp'
  };
  for(const [k,src] of Object.entries(map)) if(data[k]) Object.assign(data[k],{image:src,imageLocked:true,imageSource:'approved-hd-local'});
  await fs.writeFile(catalogPath,JSON.stringify(data,null,2)+'\n');
}catch(e){ console.warn('No se pudo actualizar affiliate-overrides:',e.message); }

console.log(`✓ Fotos aprobadas aplicadas por proximidad de producto en ${changed} HTML.`);
