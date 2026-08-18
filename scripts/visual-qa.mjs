import { chromium } from 'playwright';

const base=(process.argv[2]||'').replace(/\/$/,'');
if(!base) throw new Error('Falta URL de preview');

const pages=[
  ['home','/'],['regalos','/regalos/'],['reviews','/reviews/'],['cafe','/categoria/cafe.html'],
  ['categorias','/categoria/'],['comparativas','/comparativas/'],['guias','/guias/'],['selecciones','/selecciones/']
];
const sizes=[['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]];
const browser=await chromium.launch({headless:true});
const failures=[];

for(const [label,viewport] of sizes){
  const context=await browser.newContext({viewport});
  for(const [name,path] of pages){
    const page=await context.newPage();
    const url=base+path;
    const consoleErrors=[];
    page.on('pageerror',e=>consoleErrors.push(String(e.message||e)));
    await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
    await page.evaluate(()=>document.querySelectorAll('img[loading="lazy"]').forEach(img=>img.loading='eager'));
    await page.evaluate(async()=>{
      const sleep=ms=>new Promise(r=>setTimeout(r,ms));
      const step=Math.max(300,Math.floor(innerHeight*.65));
      for(let y=0;y<document.documentElement.scrollHeight;y+=step){scrollTo(0,y);await sleep(70)}
      scrollTo(0,0);await sleep(250);
    });
    await page.waitForTimeout(350);
    const result=await page.evaluate(()=>{
      const broken=[...document.images].filter(img=>!img.complete||img.naturalWidth===0).map(img=>({src:img.currentSrc||img.src,alt:img.alt||''}));
      const overflow=document.documentElement.scrollWidth>window.innerWidth+3;
      const overflowBy=document.documentElement.scrollWidth-window.innerWidth;
      return {broken,overflow,overflowBy,images:document.images.length};
    });
    if(result.broken.length) failures.push(`${name}-${label}: ${result.broken.length} imágenes rotas: ${result.broken.map(x=>x.alt||x.src).join(' | ')}`);
    if(result.overflow) failures.push(`${name}-${label}: desbordamiento horizontal de ${result.overflowBy}px`);
    if(consoleErrors.length) console.warn(`${name}-${label}: errores JS no bloqueantes: ${consoleErrors.join(' | ')}`);
    await page.screenshot({path:`qa-${name}-${label}.png`,fullPage:true});
    console.log(`✓ ${name}-${label}: ${result.images} imágenes cargadas, sin overflow${result.broken.length?' (con roturas)':''}`);
    await page.close();
  }
  await context.close();
}
await browser.close();
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log('✓ QA visual responsive completa: todas las imágenes cargan y no hay desbordamientos horizontales.');
