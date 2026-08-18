import fs from 'node:fs';

const file='index.html';
let html=fs.readFileSync(file,'utf8');
const replacements=new Map([
  ['assets/images/gift-cafe.webp','https://images.unsplash.com/photo-1774801935427-a1fdfc594d78?auto=format&fit=crop&w=1200&q=82'],
  ['assets/images/gift-gamers.webp','https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&w=1200&q=82'],
  ['assets/images/gift-viajeros.webp','https://images.unsplash.com/photo-1414408718521-f6f6198e9917?auto=format&fit=crop&w=1200&q=82'],
  ['assets/images/gift-casa.webp','https://images.unsplash.com/photo-1603090067602-cac4e283d866?auto=format&fit=crop&w=1200&q=82']
]);
for(const [from,to] of replacements)html=html.split(from).join(to);
fs.writeFileSync(file,html);
console.log('Home: 4 thumbnails de regalos sustituidos por imágenes HD; 2 imágenes premium aprobadas se conservan.');
