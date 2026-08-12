import fs from 'node:fs';
import path from 'node:path';
const dir=path.resolve('regalos');
for(const name of fs.readdirSync(dir)){
  if(!name.endsWith('.html'))continue;
  const file=path.join(dir,name);
  let html=fs.readFileSync(file,'utf8');
  if(!html.includes('gift-render.js')||html.includes('gift-image-fallback.js'))continue;
  html=html.replace('<script defer src="../assets/gift-render.js"></script>','<script defer src="../assets/gift-render.js"></script><script defer src="../assets/gift-image-fallback.js"></script>');
  fs.writeFileSync(file,html);
}
console.log('Gift image fallback injected.');
