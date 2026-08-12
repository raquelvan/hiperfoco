import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const skip=new Set(['node_modules','.git']);
const tag='<script defer src="/assets/affiliate-catalog.js?v=20260812-1"></script>';

function walk(dir){
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
    if(skip.has(ent.name))continue;
    const full=path.join(dir,ent.name);
    if(ent.isDirectory())walk(full);
    else if(ent.isFile()&&ent.name.endsWith('.html'))inject(full);
  }
}

function inject(file){
  let html=fs.readFileSync(file,'utf8');
  if(html.includes('/assets/affiliate-catalog.js'))return;
  if(html.includes('</head>'))html=html.replace('</head>',`${tag}</head>`);
  else if(html.includes('</body>'))html=html.replace('</body>',`${tag}</body>`);
  else html+=tag;
  fs.writeFileSync(file,html);
}

walk(root);
console.log('Affiliate catalog loader injected into HTML pages.');
