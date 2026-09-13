import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
let changed=0;
function walk(dir){for(const ent of fs.readdirSync(dir,{withFileTypes:true})){if(['.git','node_modules','.netlify'].includes(ent.name))continue;const full=path.join(dir,ent.name);if(ent.isDirectory())walk(full);else if(ent.isFile()&&ent.name.endsWith('.html'))fix(full)}}
function fix(file){
  const rel=path.relative(root,file).replaceAll('\\','/');
  let html=fs.readFileSync(file,'utf8'),before=html;
  html=html.replaceAll('auriculares-inalambricos-que-mirar.html','mejores-auriculares-inalambricos-2026.html');
  html=html.replaceAll('../para-tu-negocio.html','../contacto.html').replaceAll('/para-tu-negocio.html','/contacto.html');
  html=html.replaceAll('wifi-mesh-vs-repetidor.html','wifi-mesh-o-repetidor.html');
  if(rel==='reviews/delonghi-magnifica-evo.html'){
    html=html.replaceAll('src="https://dam.delonghi.com/902x902/assets/225625"','src="/assets/approved/magnifica-evo-v3.jpg"');
    html=html.replace('<img src="https://dam.delonghi.com/902x902/assets/218787" alt="Panel y sistema de leche de la Magnifica Evo">','<img src="/assets/approved/magnifica-evo-v3.jpg" alt="De’Longhi Magnifica Evo ECAM290.61.SB">');
    html=html.replace('<img src="https://dam.delonghi.com/902x902/assets/218865" alt="Magnifica Evo preparando café y bebidas con leche">','<img src="/assets/approved/magnifica-evo-v3.jpg" alt="De’Longhi Magnifica Evo ECAM290.61.SB">');
  }
  const depth=rel.split('/').length-1,prefix=depth?'../'.repeat(depth):'';
  if(!html.includes('visual-fixes.css')&&html.includes('</head>'))html=html.replace('</head>',`<link rel="stylesheet" href="${prefix}assets/visual-fixes.css"></head>`);
  if((rel.startsWith('reviews/')||rel.startsWith('regalos/'))&&!html.includes('price-policy-guard.js')&&html.includes('</body>'))html=html.replace('</body>',`<script defer src="${prefix}assets/price-policy-guard.js"></script></body>`);
  if(html!==before){fs.writeFileSync(file,html);changed++}
}
walk(root);
console.log(`✓ Integridad del sitio: ${changed} páginas ajustadas (enlaces, QA visual, imágenes exactas y política de precios).`);
