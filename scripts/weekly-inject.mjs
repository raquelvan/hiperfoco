import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const tag='<script defer src="/assets/weekly-prices.js?v=20260810"></script>';

function walk(dir){
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
    if(['.git','node_modules','.netlify'].includes(ent.name))continue;
    const p=path.join(dir,ent.name);
    if(ent.isDirectory())walk(p);
    else if(ent.isFile()&&p.endsWith('.html')){
      const rel=path.relative(ROOT,p).replace(/\\/g,'/');
      const isPricePage=(rel.startsWith('reviews/')&&!rel.endsWith('/index.html'))||(rel.startsWith('regalos/')&&!rel.endsWith('/index.html'));
      if(!isPricePage)continue;
      let html=fs.readFileSync(p,'utf8');
      if(!html.includes('/assets/weekly-prices.js'))html=html.replace(/<\/head>/i,`${tag}</head>`);
      fs.writeFileSync(p,html);
    }
  }
}
walk(ROOT);
console.log('Capa semanal de precios inyectada en reviews y guías de regalos.');
