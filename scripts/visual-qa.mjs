import { chromium } from 'playwright';

const base=(process.argv[2]||'').replace(/\/$/,'');
if(!base) throw new Error('Falta URL de preview');
const pages=[['home','/'],['regalos','/regalos/'],['reviews','/reviews/'],['cafe','/categoria/cafe.html'],['categorias','/categoria/'],['comparativas','/comparativas/'],['guias','/guias/'],['selecciones','/selecciones/'],['review-magnifica-s','/reviews/delonghi-magnifica-s.html'],['review-philips-3300','/reviews/philips-3300-lattego.html']];
const sizes=[['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]];
const browser=await chromium.launch({headless:true});
const failures=[];
for(const [label,viewport] of sizes){
  const context=await browser.newContext({viewport});
  for(const [name,path] of pages){
    const page=await context.newPage();const consoleErrors=[];page.on('pageerror',e=>consoleErrors.push(String(e.message||e)));
    await page.goto(base+path,{waitUntil:'domcontentloaded',timeout:45000});
    await page.evaluate(()=>document.querySelectorAll('img[loading="lazy"]').forEach(img=>img.loading='eager'));
    await page.evaluate(async()=>{const sleep=ms=>new Promise(r=>setTimeout(r,ms));const step=Math.max(300,Math.floor(innerHeight*.65));for(let y=0;y<document.documentElement.scrollHeight;y+=step){scrollTo(0,y);await sleep(90)}scrollTo(0,0);});
    await page.evaluate(async()=>{await Promise.all([...document.images].map(img=>img.complete?Promise.resolve():new Promise(resolve=>{const done=()=>resolve();img.addEventListener('load',done,{once:true});img.addEventListener('error',done,{once:true});setTimeout(done,5000)})));});
    await page.waitForTimeout(300);
    const result=await page.evaluate((pageName)=>{
      const broken=[...document.images].filter(img=>!img.complete||img.naturalWidth===0).map(img=>({src:img.currentSrc||img.src,alt:img.alt||''}));
      const emptyAlt=[...document.images].filter(img=>!String(img.alt||'').trim()).map(img=>img.currentSrc||img.src);
      const overflow=document.documentElement.scrollWidth>window.innerWidth+3,overflowBy=document.documentElement.scrollWidth-window.innerWidth;
      const lowRes=[...document.querySelectorAll('.gift-image img,.guide-image img')].filter(img=>img.naturalWidth>0&&img.getBoundingClientRect().width>120&&img.naturalWidth<600).map(img=>({src:img.currentSrc||img.src,w:img.naturalWidth}));
      const productContexts='.product-media img,.hub-media img,.compare-product img,.review-product img,.hf-guide-pick-media img,.page-product-media img,.reviewCard img';
      const forbidden=[...document.querySelectorAll(productContexts)].filter(img=>/assets\/images\/product-/.test(img.currentSrc||img.src)).map(img=>img.currentSrc||img.src);
      if(pageName==='home')forbidden.push(...[...document.querySelectorAll('.gifts>.gift img')].filter(img=>/assets\/images\/gift-/.test(img.currentSrc||img.src)).map(img=>img.currentSrc||img.src));
      const checks={};
      if(pageName==='home'){
        const sectionFor=text=>[...document.querySelectorAll('.section')].find(s=>[...s.querySelectorAll('h2')].some(h=>h.textContent.trim().includes(text)));
        const reviews=sectionFor('Últimas reseñas'),guides=sectionFor('Guías y comparativas populares'),gifts=sectionFor('Regalos tecnológicos');
        const reviewCards=reviews?[...reviews.querySelectorAll('.review-grid>.card')]:[];
        checks.homeReviewMissing=reviewCards.filter(c=>!c.querySelector('.product-media img')).length;
        checks.homeReviewCards=reviewCards.length;
        checks.homeGuides=guides?[...guides.querySelectorAll('.guide-grid>.card')].filter(c=>c.querySelector('.guide-image img')).length:0;
        checks.homeGifts=gifts?[...gifts.querySelectorAll('.gifts>.gift')].filter(c=>c.querySelector('.gift-image img')).length:0;
      }
      if(pageName.startsWith('review-')){checks.budgetImages=document.querySelectorAll('.budget-compact-wrap .money img,.budget-compact-wrap .hf-auto-product-media').length;checks.heroImages=document.querySelectorAll('.review-product img').length;checks.heroWrong=[...document.querySelectorAll('.review-product img')].filter(img=>/gift-|guide-/i.test(img.currentSrc||img.src)).length;}
      if(pageName==='reviews')checks.reviewCardsMissing=[...document.querySelectorAll('[data-review-card],.reviews-grid>.card,.review-grid>.card')].filter(c=>!c.querySelector('img')).length;
      if(pageName==='comparativas')checks.comparisonMissing=[...document.querySelectorAll('.hub-card')].filter(c=>!c.querySelector('img')).length;
      if(pageName==='cafe')checks.cafeMissing=[...document.querySelectorAll('.hub-card,.product-page-card,.reviewCard')].filter(c=>/Magnifica|Philips|Rivelia/i.test(c.textContent)&&!c.querySelector('img')).length;
      return{broken,emptyAlt,overflow,overflowBy,lowRes,forbidden,images:document.images.length,checks};
    },name);
    if(result.broken.length)failures.push(`${name}-${label}: imágenes rotas: ${result.broken.map(x=>x.alt||x.src).join(' | ')}`);
    if(result.emptyAlt.length)failures.push(`${name}-${label}: ${result.emptyAlt.length} imágenes sin alt`);
    if(result.overflow)failures.push(`${name}-${label}: desbordamiento horizontal de ${result.overflowBy}px`);
    if(result.lowRes.length)failures.push(`${name}-${label}: imágenes editoriales de baja resolución: ${result.lowRes.map(x=>`${x.w}px ${x.src}`).join(' | ')}`);
    if(result.forbidden.length)failures.push(`${name}-${label}: thumbnails legacy en cards relevantes: ${result.forbidden.join(' | ')}`);
    if(name==='home'){
      if(!result.checks.homeReviewCards||result.checks.homeReviewMissing!==0)failures.push(`${name}-${label}: hay tarjetas de Últimas reseñas sin foto (${result.checks.homeReviewMissing}/${result.checks.homeReviewCards})`);
      if(result.checks.homeGuides!==5)failures.push(`${name}-${label}: Guías populares debe tener 5 tarjetas con foto y tiene ${result.checks.homeGuides}`);
      if(result.checks.homeGifts!==6)failures.push(`${name}-${label}: Regalos debe tener 6 tarjetas con foto y tiene ${result.checks.homeGifts}`);
    }
    if(name.startsWith('review-')){if(result.checks.budgetImages!==0)failures.push(`${name}-${label}: Qué opción elegir contiene fotos automáticas (${result.checks.budgetImages})`);if(result.checks.heroImages!==1)failures.push(`${name}-${label}: hero debe tener exactamente 1 foto (${result.checks.heroImages})`);if(result.checks.heroWrong!==0)failures.push(`${name}-${label}: hero usa imagen editorial en vez del producto`);}
    if(result.checks.reviewCardsMissing>0)failures.push(`${name}-${label}: ${result.checks.reviewCardsMissing} reviews sin foto`);
    if(result.checks.comparisonMissing>0)failures.push(`${name}-${label}: ${result.checks.comparisonMissing} comparativas sin foto`);
    if(result.checks.cafeMissing>0)failures.push(`${name}-${label}: ${result.checks.cafeMissing} cafeteras sin foto`);
    if(consoleErrors.length)console.warn(`${name}-${label}: errores JS: ${consoleErrors.join(' | ')}`);
    await page.screenshot({path:`qa-${name}-${label}.png`,fullPage:true});console.log(`✓ ${name}-${label}: ${result.images} imágenes; checks=${JSON.stringify(result.checks)}`);await page.close();
  }
  await context.close();
}
await browser.close();
if(failures.length){console.error('\nQA VISUAL FALLIDA\n'+failures.join('\n'));process.exit(1)}
console.log('✓ QA visual completa: desktop/móvil, imágenes cargadas, secciones completas, sin thumbnails legacy ni overflow.');
