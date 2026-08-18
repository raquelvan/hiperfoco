import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
// Solo se sanea contenido editorial previamente validado. Los productos
// conservan su asset local estable y no se sustituyen por hotlinks externos.
const replacements=new Map([
  ['/assets/images/guide-airfryer.webp','/assets/img/freidora-premium.png'],
  ['assets/images/guide-airfryer.webp','assets/img/freidora-premium.png'],
  ['../assets/images/guide-airfryer.webp','../assets/img/freidora-premium.png'],
  ['/assets/images/guide-aspiradoras.webp','https://images.pexels.com/photos/9462146/pexels-photo-9462146.jpeg?auto=compress&cs=tinysrgb&w=1400'],
  ['assets/images/guide-aspiradoras.webp','https://images.pexels.com/photos/9462146/pexels-photo-9462146.jpeg?auto=compress&cs=tinysrgb&w=1400'],
  ['../assets/images/guide-aspiradoras.webp','https://images.pexels.com/photos/9462146/pexels-photo-9462146.jpeg?auto=compress&cs=tinysrgb&w=1400'],
  ['/assets/images/guide-capsulas.webp','https://images.pexels.com/photos/18071820/pexels-photo-18071820.jpeg?auto=compress&cs=tinysrgb&w=1400'],
  ['assets/images/guide-capsulas.webp','https://images.pexels.com/photos/18071820/pexels-photo-18071820.jpeg?auto=compress&cs=tinysrgb&w=1400'],
  ['../assets/images/guide-capsulas.webp','https://images.pexels.com/photos/18071820/pexels-photo-18071820.jpeg?auto=compress&cs=tinysrgb&w=1400'],
  ['/assets/images/guide-robot.webp','https://images.pexels.com/photos/6856825/pexels-photo-6856825.jpeg?auto=compress&cs=tinysrgb&w=1400'],
  ['assets/images/guide-robot.webp','https://images.pexels.com/photos/6856825/pexels-photo-6856825.jpeg?auto=compress&cs=tinysrgb&w=1400'],
  ['../assets/images/guide-robot.webp','https://images.pexels.com/photos/6856825/pexels-photo-6856825.jpeg?auto=compress&cs=tinysrgb&w=1400']
]);

const ordered=[...replacements.entries()].sort((a,b)=>b[0].length-a[0].length);
let files=0;
function walk(dir){
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    if(['.git','node_modules','.netlify'].includes(e.name))continue;
    const full=path.join(dir,e.name);
    if(e.isDirectory())walk(full);
    else if(e.isFile()&&e.name.endsWith('.html'))fix(full);
  }
}
function fix(file){
  let html=fs.readFileSync(file,'utf8'),before=html;
  for(const [from,to] of ordered)html=html.split(from).join(to);
  if(/\.\.https?:\/\//i.test(html))throw new Error(`URL externa corrupta en ${path.relative(ROOT,file)}`);
  if(html!==before){fs.writeFileSync(file,html);files++}
}
walk(ROOT);
console.log(`Imágenes editoriales saneadas en ${files} HTML; productos locales preservados.`);
