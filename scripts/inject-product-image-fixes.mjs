import fs from 'node:fs';
import path from 'node:path';
const ROOT=process.cwd();
const tag='<script defer src="/assets/product-image-fixes.js?v=20260812"></script>';
function walk(dir){
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
    if(['.git','node_modules','.netlify'].includes(ent.name))continue;
    const p=path.join(dir,ent.name);
    if(ent.isDirectory())walk(p);
    else if(ent.isFile()&&p.endsWith('.html')){
      let html=fs.readFileSync(p,'utf8');
      if(!html.includes('/assets/product-image-fixes.js')){
        html=html.replace(/<\/head>/i,`${tag}</head>`);
        fs.writeFileSync(p,html);
      }
    }
  }
}
walk(ROOT);
console.log('Global product image fixes injected.');
