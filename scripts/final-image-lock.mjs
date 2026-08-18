import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const images={
  'delonghi-magnifica-evo':'https://www.dateks.lv/images/pic/1200/1200/630/1540.jpg',
  'philips-3300':'https://www.sterns.co.il/cdn/shop/files/3347_90_front.jpg?v=1720382075&width=1500',
  'delonghi-rivelia':'https://p1.akcdn.net/full/1273110460.delonghi-rivelia-exam440-35.jpg',
  'delonghi-magnifica-s':'https://dam.elcorteingles.es/producto/www-001007741815786-00.jpg',
  'philips-5500':'https://www.cf-dam.vbs.versuni.com/adaptivemedia/rendition?format=webp&height=2048&id=1b7fcdc9342844c53c459e83b581f786dec466bf&width=2048'
};

const aliases=new Map([
  ['assets/images/product-magnifica-evo.webp',images['delonghi-magnifica-evo']],
  ['../assets/images/product-magnifica-evo.webp',images['delonghi-magnifica-evo']],
  ['https://dam.delonghi.com/902x902/assets/225625',images['delonghi-magnifica-evo']],
  ['assets/images/product-philips-3300.webp',images['philips-3300']],
  ['../assets/images/product-philips-3300.webp',images['philips-3300']],
  ['https://us.home-appliances.philips/cdn/shop/files/3300_2_3000x3000_006594e4-c53f-426d-b9d6-04c3bf61a317_1946x.jpg?v=1765219594',images['philips-3300']],
  ['https://ferbod.com/cdn/shop/files/cdc120be-Philips-Series-3300-Fully-automatic-espresso-machine-EP334790-2.webp?v=1771354052&width=1445',images['philips-3300']],
  ['assets/images/product-rivelia.webp',images['delonghi-rivelia']],
  ['../assets/images/product-rivelia.webp',images['delonghi-rivelia']],
  ['https://dam.delonghi.com/902x902/assets/269456',images['delonghi-rivelia']],
  ['assets/images/product-magnifica-s.webp',images['delonghi-magnifica-s']],
  ['../assets/images/product-magnifica-s.webp',images['delonghi-magnifica-s']],
  ['https://dam.delonghi.com/902x902/assets/223655',images['delonghi-magnifica-s']],
  ['https://images.philips.com/is/image/philipsconsumer/vrs_985a5521_0beb_4817_914c3fe3bfafc0f8?%24png%24=&amp;fit=constrain&amp;hei=410&amp;wid=410',images['philips-5500']],
  ['https://images.philips.com/is/image/philipsconsumer/vrs_985a5521_0beb_4817_914c3fe3bfafc0f8?%24png%24=&fit=constrain&hei=410&wid=410',images['philips-5500']]
]);

function walk(dir){
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    if(['.git','node_modules','.netlify'].includes(e.name))continue;
    const full=path.join(dir,e.name);
    if(e.isDirectory())walk(full);
    else if(e.isFile()&&e.name.endsWith('.html'))fixHtml(full);
  }
}
function fixHtml(file){
  let html=fs.readFileSync(file,'utf8'),before=html;
  for(const [from,to] of aliases)html=html.split(from).join(to);
  if(html!==before)fs.writeFileSync(file,html);
}
walk(ROOT);

for(const file of ['assets/products.json','assets/affiliate-overrides.json']){
  if(!fs.existsSync(file))continue;
  const data=JSON.parse(fs.readFileSync(file,'utf8'));
  const bag=data.products||data;
  for(const [id,url] of Object.entries(images)){
    if(!bag[id])continue;
    bag[id].image=url;
    bag[id].imageLocked=true;
    bag[id].imageSource='qa-locked-exact-model';
  }
  fs.writeFileSync(file,JSON.stringify(data,null,2)+'\n');
}
console.log('Fotos principales bloqueadas a fuentes de alta resolución y modelo exacto.');
