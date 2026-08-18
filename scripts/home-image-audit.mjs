import fs from 'node:fs';

const html=fs.readFileSync('index.html','utf8');
const expected=[
  ['Para amantes del café','https://images.unsplash.com/photo-1774801935427-a1fdfc594d78?auto=format&fit=crop&w=1200&q=82'],
  ['Para cocinillas','assets/img/regalo-cocinillas-premium.png'],
  ['Para gamers','https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&w=1200&q=82'],
  ['Para viajeros','https://images.unsplash.com/photo-1414408718521-f6f6198e9917?auto=format&fit=crop&w=1200&q=82'],
  ['Para casa inteligente','https://images.unsplash.com/photo-1603090067602-cac4e283d866?auto=format&fit=crop&w=1200&q=82'],
  ['Para quien ya tiene de todo','assets/img/regalo-para-quien-tiene-todo-premium.png']
];
const errors=[];
for(const [alt,src] of expected){
  if(!html.includes(`alt="${alt}"`))errors.push(`Falta tarjeta: ${alt}`);
  if(!html.includes(`src="${src.replaceAll('&','&amp;')}"`) && !html.includes(`src="${src}"`))errors.push(`Foto no validada: ${alt}`);
}
const lowRes=['assets/images/gift-cafe.webp','assets/images/gift-gamers.webp','assets/images/gift-viajeros.webp','assets/images/gift-casa.webp','assets/images/gift-todo.webp','assets/images/gift-cocina.webp'];
for(const src of lowRes)if(html.includes(src))errors.push(`Home sigue usando thumbnail antiguo: ${src}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('Home gifts: 6/6 imágenes verificadas en markup.');
