import fs from 'node:fs';
import path from 'node:path';
const dir=path.resolve('regalos');
for(const name of fs.readdirSync(dir)){
  if(!name.endsWith('.html'))continue;
  const file=path.join(dir,name);
  let html=fs.readFileSync(file,'utf8');
  if(!html.includes('gift-render.js'))continue;
  if(!html.includes('gift-image-fallback.js'))html=html.replace('<script defer src="../assets/gift-render.js"></script>','<script defer src="../assets/gift-render.js"></script><script defer src="../assets/gift-image-fallback.js"></script>');
  if(!html.includes('gift-catalog-live.js'))html=html.replace('</body>','<script defer src="../assets/gift-catalog-live.js"></script></body>');
  fs.writeFileSync(file,html);
}
console.log('Gift image integrity and affiliate catalog injected.');