import fs from 'node:fs';

const file='index.html';
let html=fs.readFileSync(file,'utf8');
const replacements=new Map([
  ['assets/images/gift-cafe.webp','/assets/approved/philips-3300-v3.jpg'],
  ['assets/images/gift-gamers.webp','https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&w=1600&q=88'],
  ['assets/images/gift-viajeros.webp','https://images.unsplash.com/photo-1414408718521-f6f6198e9917?auto=format&fit=crop&w=1600&q=88'],
  ['assets/images/gift-casa.webp','https://images.unsplash.com/photo-1603090067602-cac4e283d866?auto=format&fit=crop&w=1600&q=88']
]);
for(const [from,to] of replacements)html=html.split(from).join(to);
fs.writeFileSync(file,html);
console.log('Home: regalos unificados; café usa asset aprobado y el resto imágenes editoriales HD.');
