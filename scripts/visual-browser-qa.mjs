import { chromium } from 'playwright';
import fs from 'node:fs';

const base=process.env.QA_URL;
if(!base)throw new Error('QA_URL no definido');
const browser=await chromium.launch({headless:true});
const cases=[
  ['home-desktop','/',{width:1440,height:1000}],
  ['home-mobile','/',{width:390,height:844}],
  ['regalos-desktop','/regalos/',{width:1440,height:1000}],
  ['reviews-desktop','/reviews/',{width:1440,height:1000}],
  ['cafe-desktop','/categoria/cafe.html',{width:1440,height:1000}]
];
const report=[];
for(const [name,path,viewport] of cases){
  const page=await browser.newPage({viewportSize:viewport});
  const url=new URL(path,base).href;
  await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
  await page.evaluate(async()=>{
    document.querySelectorAll('img').forEach(img=>{img.loading='eager'});
    const max=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
    for(let y=0;y<max;y+=Math.max(350,innerHeight*.65)){scrollTo(0,y);await new Promise(r=>setTimeout(r,90));}
    scrollTo(0,0);
    await new Promise(r=>setTimeout(r,500));
    await Promise.all([...document.images].map(img=>img.complete?Promise.resolve():new Promise(r=>{img.addEventListener('load',r,{once:true});img.addEventListener('error',r,{once:true});setTimeout(r,4000)})));
  });
  const audit=await page.evaluate(()=>{
    const broken=[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>({alt:i.alt,src:i.currentSrc||i.src}));
    const mediaSel='.hub-media,.product-media,.page-product-media,.gift-image,.guide-image,.hf-selection-media,.hf-guide-pick-media,.gift4-media';
    const overflow=[];
    document.querySelectorAll(`${mediaSel} img`).forEach(img=>{
      const p=img.parentElement;if(!p)return;const a=img.getBoundingClientRect(),b=p.getBoundingClientRect();
      if(a.left<b.left-2||a.right>b.right+2||a.top<b.top-2||a.bottom>b.bottom+2)overflow.push({alt:img.alt,src:img.currentSrc||img.src});
    });
    return{broken,overflow};
  });
  await page.screenshot({path:`qa-${name}.png`,fullPage:true});
  report.push({name,url,...audit});
  await page.close();
}
await browser.close();
fs.writeFileSync('visual-qa-report.json',JSON.stringify(report,null,2));
const errors=report.flatMap(r=>[
  ...r.broken.map(x=>`${r.name}: imagen rota ${x.alt||'(sin alt)'} -> ${x.src}`),
  ...r.overflow.map(x=>`${r.name}: imagen desborda ${x.alt||'(sin alt)'} -> ${x.src}`)
]);
console.log(`Visual QA: ${errors.length} errores de imagen/render.`);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
