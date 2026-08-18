import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const rules = [
  { terms:['de’longhi magnifica evo','de\'longhi magnifica evo','delonghi magnifica evo'], src:'/assets/approved/magnifica-evo.jpg' },
  { terms:['philips serie 3300 lattego','philips 3300 lattego'], src:'/assets/approved/philips-3300.jpg' },
  { terms:['de’longhi rivelia','de\'longhi rivelia','delonghi rivelia'], src:'/assets/approved/rivelia.jpg' },
  { terms:['de’longhi magnifica s','de\'longhi magnifica s','delonghi magnifica s'], src:'/assets/approved/magnifica-s.jpg' },
  { terms:['philips serie 5500 lattego','philips 5500 lattego'], src:'/assets/approved/philips-5500.webp' }
];

const norm = s => String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,"'").replace(/\s+/g,' ').trim();

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

function replaceCardImages(html){
  // Procesa bloques de tarjeta/enlace/div/section relativamente pequeños y sustituye únicamente la imagen del producto exacto.
  return html.replace(/<(a|article|div|section)\b[^>]*>[\s\S]{0,5000}?<\/\1>/gi, block => {
    const text=norm(block.replace(/<[^>]+>/g,' '));
    const rule=rules.find(r=>r.terms.some(t=>text.includes(norm(t))));
    if(!rule) return block;
    if(/<img\b/i.test(block)){
      return block.replace(/<img\b([^>]*?)\bsrc=(['"])[^'"]*\2([^>]*)>/i,(m,a,q,b)=>{
        let attrs=(a+b).replace(/\s+srcset=(['"])[\s\S]*?\1/gi,'').replace(/\s+data-src=(['"])[\s\S]*?\1/gi,'');
        if(!/\balt=/i.test(attrs)) attrs += ` alt="${rule.terms[0]}"`;
        return `<img${attrs} src="${rule.src}">`;
      });
    }
    return block;
  });
}

let changed=0;
for(const file of await files(ROOT)){
  const old=await fs.readFile(file,'utf8');
  const next=replaceCardImages(old);
  if(next!==old){ await fs.writeFile(file,next); changed++; }
}

// Centraliza también el catálogo para que scripts posteriores y páginas dinámicas usen exactamente los mismos assets.
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

console.log(`✓ Imágenes aprobadas aplicadas en ${changed} HTML.`);
