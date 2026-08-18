import { chromium } from 'playwright';

const base=(process.argv[2]||'').replace(/\/$/,'');
if(!base) throw new Error('Falta URL de preview');

const pages=[
  ['home','/'],['regalos','/regalos/'],['reviews','/reviews/'],['cafe','/categoria/cafe.html'],
  ['categorias','/categoria/'],['comparativas','/comparativas/'],['guias','/guias/'],['selecciones','/selecciones/'],
  ['review-magnifica-s','/reviews/delonghi-magnifica-s.html'],['review-philips-3300','/reviews/philips-3300-lattego.html']
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
      for(let y=0;y<document.documentElement.scrollHeight;y+=step){scrollTo(0,y);await sleep(80)}
      scrollTo(0,0);await sleep(350);
    });
    await page.waitForTimeout(450);
    const result=await page.evaluate((pageName)=>{
      const broken=[...document.images].filter(img=>!img.complete||img.naturalWidth===0).map(img=>({src:img.currentSrc||img.src,alt:img.alt||''}));
      const emptyAlt=[...document.images].filter(img=>!String(img.alt||'').trim()).map(img=>img.currentSrc||img.src);
      const overflow=document.documentElement.scrollWidth>window.innerWidth+3;
      const overflowBy=document.documentElement.scrollWidth-window.innerWidth;
      const lowRes=[...document.querySelectorAll('.gift-image img,.guide-image img')]
        .filter(img=>img.naturalWidth>0&&img.getBoundingClientRect().width>120&&img.naturalWidth<600)
        .map(img=>({src:img.currentSrc||img.src,w:img.naturalWidth,shown:Math.round(img.getBoundingClientRect().width)}));
      const productContexts='.product-media img,.hub-media img,.compare-product img,.review-product img,.hf-guide-pick-media img,.page-product-media img,.reviewCard img';
      const legacyProduct=[...document.querySelectorAll(productContexts)].filter(img=>/assets\/images\/product-/.test(img.currentSrc||img.src)).map(img=>img.currentSrc||img.src);
      const legacyGift=pageName==='home'?[...document.querySelectorAll('.gifts>.gift img')].filter(img=>/assets\/images\/gift-/.test(img.currentSrc||img.src)).map(img=>img.currentSrc||img.src):[];
      const forbidden=[...legacyProduct,...legacyGift];
      const checks={};
      if(pageName==='home'){
        checks.homeReviews=[...document.querySelectorAll('.review-grid>.card')].filter(c=>c.querySelector('.product-media img')).length;
        checks.homeGuides=[...document.querySelectorAll('.guide-grid>.card')].filter(c=>c.querySelector('.guide-image img')).length;
        checks.homeGifts=[...document.querySelectorAll('.gifts>.gift')].filter(c=>c.querySelector('.gift-image img')).length;
      }
      if(pageName.startsWith('review-')){
        checks.budgetImages=document.querySelectorAll('.budget-compact-wrap .money img,.budget-compact-wrap .hf-auto-product-media').length;
        checks.heroImages=document.querySelectorAll('.review-product img').length;
        checks.heroWrong=[...document.querySelectorAll('.review-product img')].filter(img=>/gift-|guide-/i.test(img.currentSrc||img.src)).length;
      }
      if(pageName==='reviews') checks.reviewCardsMissing=[...document.querySelectorAll('[data-review-card],.reviews-grid>.card,.review-grid>.card')].filter(c=>!c.querySelector('img')).length;
      if(pageName==='comparativas') checks.comparisonMissing=[...document.querySelectorAll('.hub-card')].filter(c=>!c.querySelector('img')).length;
      if(pageName==='cafe') checks.cafeMissing=[...document.querySelectorAll('.hub-card,.product-page-card,.reviewCard')].filter(c=>/Magnifica|Philips|Rivelia/i.test(c.textContent)&&!c.querySelector('img')).length;
      return {broken,emptyAlt,overflow,overflowBy,lowRes,forbidden,images:document.images.length,checks};
    },name);
    if(result.broken.length) failures.push(`${name}-${label}: ${result.broken.length} imágenes rotas: ${result.broken.map(x=>x.alt||x.src).join(' | ')}`);
    if(result.emptyAlt.length) failures.push(`${name}-${label}: ${result.emptyAlt.length} imágenes sin alt`);
    if(result.overflow) failures.push(`${name}-${label}: desbordamiento horizontal de ${result.overflowBy}px`);
    if(result.lowRes.length) failures.push(`${name}-${label}: imágenes editoriales con resolución insuficiente: ${result.lowRes.map(x=>`${x.w}px ${x.src}`).join(' | ')}`);
    if(result.forbidden.length) failures.push(`${name}-${label}: siguen cargándose thumbnails legacy en tarjetas relevantes: ${result.forbidden.join(' | ')}`);
    if(name==='home'){
      if(result.checks.homeReviews!==4) failures.push(`${name}-${label}: Últimas reseñas debe tener 4 tarjetas con foto y tiene ${result.checks.homeReviews}`);
      if(result.checks.homeGuides!==5) failures.push(`${name}-${label}: Guías populares debe tener 5 tarjetas con foto y tiene ${result.checks.homeGuides}`);
      if(result.checks.homeGifts!==6) failures.push(`${name}-${label}: Regalos debe tener 6 tarjetas con foto y tiene ${result.checks.homeGifts}`);
    }
    if(name.startsWith('review-')){
      if(result.checks.budgetImages!==0) failures.push(`${name}-${label}: Qué opción elegir no debe contener fotos automáticas (${result.checks.budgetImages})`);
      if(result.checks.heroImages!==1) failures.push(`${name}-${label}: hero de review debe tener exactamente 1 foto (${result.checks.heroImages})`);
      if(result.checks.heroWrong!==0) failures.push(`${name}-${label}: hero de review usa una imagen editorial/gift en vez del producto`);
    }
    if(result.checks.reviewCardsMissing>0) failures.push(`${name}-${label}: ${result.checks.reviewCardsMissing} cards de review sin foto`);
    if(result.checks.comparisonMissing>0) failures.push(`${name}-${label}: ${result.checks.comparisonMissing} comparativas sin foto`);
    if(result.checks.cafeMissing>0) failures.push(`${name}-${label}: ${result.checks.cafeMissing} tarjetas de cafeteras sin foto`);
    if(consoleErrors.length) console.warn(`${name}-${label}: errores JS: ${consoleErrors.join(' | ')}`);
    await page.screenshot({path:`qa-${name}-${label}.png`,fullPage:true});
    console.log(`✓ ${name}-${label}: ${result.images} imágenes; checks=${JSON.stringify(result.checks)}`);
    await page.close();
  }
  await context.close();
}
await browser.close();
if(failures.length){console.error('\nQA VISUAL FALLIDA\n'+failures.join('\n'));process.exit(1)}
console.log('✓ QA visual completa: imágenes presentes, sin thumbnails legacy en cards, sin inyección en presupuesto, sin overflow y con resolución editorial suficiente.');
