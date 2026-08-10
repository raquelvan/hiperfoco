(()=>{document.querySelectorAll('link[rel~="icon"]').forEach(n=>n.remove());const svg=document.createElement('link');svg.rel='icon';svg.type='image/svg+xml';svg.href='/favicon.svg?v=20260807-2';document.head.appendChild(svg);const ico=document.createElement('link');ico.rel='shortcut icon';ico.type='image/x-icon';ico.href='/favicon.ico?v=20260807-2';document.head.appendChild(ico);})();
(()=>{
  const reviewData=document.getElementById('review-data');
  if(!reviewData||location.pathname.endsWith('/reviews/delonghi-magnifica-evo.html'))return;
  const savedReviewData=reviewData.textContent;
  window.addEventListener('DOMContentLoaded',()=>{
    setTimeout(()=>{
      if(window.__HIPERFOCO_FINAL_REVIEW__)return;
      window.__HIPERFOCO_FINAL_REVIEW__=true;
      const data=document.createElement('script');
      data.id='review-data';
      data.type='application/json';
      data.textContent=savedReviewData;
      document.body.appendChild(data);
      const script=document.createElement('script');
      script.src='../assets/product-review-final-20260806.js?v=20260806-1933';
      document.body.appendChild(script);
    },0);
  },{once:true});
})();

(()=>{window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','G-CPG0BGWBCM');const ga=document.createElement('script');ga.async=true;ga.src='https://www.googletagmanager.com/gtag/js?id=G-CPG0BGWBCM';document.head.appendChild(ga);})();

document.addEventListener('DOMContentLoaded',()=>{
  const menuButton=document.querySelector('[data-menu],.mobile-toggle');
  const mobilePanel=document.querySelector('[data-mobile],.mobile-panel');
  if(menuButton&&mobilePanel){menuButton.addEventListener('click',()=>{const open=mobilePanel.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});}

  const search=document.querySelector('[data-search]');
  search?.addEventListener('submit',e=>{e.preventDefault();const q=(search.querySelector('input')?.value||'').toLowerCase().trim();const routes=[['philips','reviews/philips-3300-lattego.html'],['rivelia','reviews/delonghi-rivelia.html'],['magnifica s','reviews/delonghi-magnifica-s.html'],['magnifica','reviews/delonghi-magnifica-evo.html'],['aspirador','guias/mejores-aspiradoras-sin-cable-2026.html'],['freidora','guias/freidoras-aire-merecen-pena.html'],['regalo','regalos/index.html']];const found=routes.find(([term])=>q.includes(term));location.href=found?found[1]:'reviews/index.html';});

  const style=document.createElement('style');
  style.textContent=`
  .mobile-panel.open{display:block!important}
  @media(max-width:760px){.home-hero{display:block!important;min-height:0!important;padding:20px 0 14px!important}.home-hero .focus-map{display:none!important}.home-hero h1{font-size:clamp(2.65rem,12vw,3.55rem)!important;line-height:1.02!important;margin:10px 0!important}.home-lead{font-size:.92rem!important;line-height:1.5!important;margin-bottom:13px!important}.searchbar{max-width:none!important}}
  .s2-price-section{padding:14px 0 10px}.s2-price-layout{display:grid;grid-template-columns:270px 1fr;gap:14px;padding:16px}.s2-price-summary{background:#f1f6f3;border-radius:15px;padding:17px;display:flex;flex-direction:column;justify-content:center}.s2-price-summary span{font-size:.62rem;font-weight:900;text-transform:uppercase;color:var(--green)}.s2-price-summary h2{font-size:1.65rem;margin:6px 0}.s2-price-summary strong{font:2.8rem/1 Georgia,serif;color:var(--green);margin:4px 0 9px}.s2-price-summary p,.s2-price-summary small{font-size:.72rem;color:var(--muted);margin:0}.s2-offers{display:grid;gap:7px}.s2-offer{display:grid;grid-template-columns:1fr 90px 84px;gap:10px;align-items:center;border:1px solid var(--line);border-radius:12px;padding:9px 11px;background:#fff}.s2-offer.best{border:2px solid var(--green);background:#f4f8f5}.s2-offer div{display:flex;flex-direction:column}.s2-offer div em{font-style:normal;font-size:.54rem;font-weight:900;text-transform:uppercase;color:var(--green)}.s2-offer div b{font-size:.82rem}.s2-offer div small{font-size:.62rem;color:var(--muted)}.s2-offer>strong{font:1.05rem Georgia,serif;color:var(--green);text-align:right}.s2-offer>a{font-size:.69rem;font-weight:850;text-decoration:none;color:var(--green);text-align:right}
  .nobody.s2-compact{display:grid!important;grid-template-columns:minmax(0,1fr) 170px!important;min-height:92px!important;max-height:92px!important;overflow:hidden!important}.nobody.s2-compact .nobody-copy{padding:12px 16px!important;display:flex!important;flex-direction:column!important;justify-content:center!important}.nobody.s2-compact h2{font-size:1.2rem!important;margin:0 0 4px!important}.nobody.s2-compact p{font-size:.74rem!important;line-height:1.4!important;margin:0!important}.nobody.s2-compact .btn{display:none!important}.nobody.s2-compact .nobody-photo{min-height:0!important;height:92px!important}.nobody.s2-compact .nobody-photo img{height:92px!important;object-fit:cover!important}
  .budget-compact-wrap{padding:12px 0 16px}.budget-compact-head{display:flex;justify-content:space-between;align-items:end;gap:16px;margin-bottom:8px}.budget-compact-head h2{font-size:1.75rem;margin:0}.budget-compact-head p{font-size:.78rem;color:var(--muted);margin:0}.money-grid.s2-budget{grid-template-columns:repeat(3,1fr)!important;gap:8px!important}.money-grid.s2-budget .money{padding:12px 14px!important;min-height:0!important;display:block!important}.money-grid.s2-budget .money-icon{display:none!important}.money-grid.s2-budget h3{font-size:.98rem!important;margin:0 0 4px!important}.money-grid.s2-budget p{font-size:.73rem!important;line-height:1.4!important;margin:0!important}
  #resumen,#indice,#mejor-peor,#comparativa,#faq,#precios{scroll-margin-top:132px}
  @media(max-width:700px){.s2-price-layout{grid-template-columns:1fr;padding:11px}.s2-price-summary{padding:14px}.s2-price-summary strong{font-size:2.35rem}.s2-offer{grid-template-columns:1fr auto;padding:9px 10px}.s2-offer>a{grid-column:1/-1;text-align:left}.nobody.s2-compact{grid-template-columns:1fr!important;min-height:0!important;max-height:none!important}.nobody.s2-compact .nobody-photo{display:none!important}.nobody.s2-compact .nobody-copy{padding:11px 13px!important}.nobody.s2-compact h2{font-size:1.05rem!important}.nobody.s2-compact p{font-size:.71rem!important}.budget-compact-head{display:block;margin-bottom:7px}.budget-compact-head h2{font-size:1.45rem}.budget-compact-head p{font-size:.73rem;margin-top:2px}.money-grid.s2-budget{grid-template-columns:1fr!important;gap:6px!important}.money-grid.s2-budget .money{padding:10px 12px!important}.money-grid.s2-budget h3{font-size:.92rem!important}.money-grid.s2-budget p{font-size:.71rem!important}#resumen,#indice,#mejor-peor,#comparativa,#faq,#precios{scroll-margin-top:112px}}`;
  document.head.appendChild(style);

  const reviewTrack=document.querySelector('.review-grid');
  const reviewSection=reviewTrack?.closest('.section');
  if(reviewTrack&&reviewSection&&!reviewTrack.dataset.carouselReady){reviewTrack.dataset.carouselReady='1';const head=reviewSection.querySelector('.section-head');if(head&&!head.querySelector('.carousel-controls')){const controls=document.createElement('div');controls.className='carousel-controls';controls.innerHTML='<button type="button" aria-label="Anterior">←</button><button type="button" aria-label="Siguiente">→</button>';head.appendChild(controls);const [prev,next]=controls.querySelectorAll('button');const move=dir=>{const card=reviewTrack.querySelector('.card');reviewTrack.scrollBy({left:dir*((card?.getBoundingClientRect().width||280)+14),behavior:'smooth'});};prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));}}

  if(!location.pathname.endsWith('/reviews/delonghi-magnifica-evo.html'))return;

  const hero=document.querySelector('.review-hero');
  const actions=hero?.querySelector('.review-actions');
  if(actions)actions.innerHTML='<a class="buy" href="#precios">Ver mejor precio →</a><a class="compare-button" href="#comparativa">Comparar →</a>';

  let prices=document.querySelector('#precios');
  if(hero&&!prices){prices=document.createElement('section');prices.id='precios';prices.className='review-shell review-section s2-price-section';prices.innerHTML=`<div class="review-card s2-price-layout"><div class="s2-price-summary"><span>Comparador actualizado</span><h2>Mejor precio ahora</h2><strong>379,99 €</strong><p>Mismo modelo <b>ECAM290.61.SB</b></p><small>Comprobado el 6 de agosto de 2026. Precio y stock pueden cambiar.</small></div><div class="s2-offers"><article class="s2-offer best"><div><em>Mejor precio</em><b>PcComponentes</b><small>Vendido y enviado por PcComponentes</small></div><strong>379,99 €</strong><a data-affiliate-slot="pccomponentes-magnifica-evo" href="https://www.pccomponentes.com/delonghi-magnifica-evo-cafetera-superautomatica-con-deposito-de-leche-15-bares-plateada-5-bebidas" target="_blank" rel="nofollow sponsored noopener">Ver oferta →</a></article><article class="s2-offer"><div><b>Carrefour</b><small>Vendido por Carrefour · envío gratis</small></div><strong>399 €</strong><a data-affiliate-slot="carrefour-magnifica-evo" href="https://www.carrefour.es/cafetera-superautomatica-delonghi-ecam29061sb/VC4A-17955283/p" target="_blank" rel="nofollow sponsored noopener">Ver oferta →</a></article><article class="s2-offer"><div><b>MediaMarkt</b><small>Consulta precio y vendedor</small></div><strong>Ver precio</strong><a data-affiliate-slot="mediamarkt-magnifica-evo" href="https://www.mediamarkt.es/es/product/_cafetera-express-ecam29061sb-de-longhi-150-barbar-1450-w-2-tazas-multicolor-98981528.html" target="_blank" rel="nofollow sponsored noopener">Consultar →</a></article><article class="s2-offer"><div><b>Worten</b><small>Vendido por Worten</small></div><strong>569 €</strong><a data-affiliate-slot="worten-magnifica-evo" href="https://www.worten.es/productos/cafetera-automatico-delonghi-magnifica-evo-ecam290-61-sb-7533123" target="_blank" rel="nofollow sponsored noopener">Ver oferta →</a></article><article class="s2-offer"><div><b>El Corte Inglés</b><small>Consulta disponibilidad</small></div><strong>Ver precio</strong><a data-affiliate-slot="eci-magnifica-evo" href="https://www.elcorteingles.es/dia-del-padre/A43102936-8004399021402-pr-cafetera-superautomatica-delonghi-magnifica-evo-ecam29061sb-con-molinillo-incorporado-gris/" target="_blank" rel="nofollow sponsored noopener">Consultar →</a></article></div></div>`;}

  const sections=[...document.querySelectorAll('main > section')];
  const byHeading=text=>sections.find(section=>section.querySelector('h2')?.textContent.trim().startsWith(text));
  const index=byHeading('Índice Hiperfoco');
  const pros=sections.find(section=>section.id==='mejor-peor');
  const verdict=sections.find(section=>section.id==='resumen');
  const nobody=sections.find(section=>section.querySelector('.review-card.nobody'));
  const faq=sections.find(section=>section.id==='faq');
  const comparison=sections.find(section=>section.id==='comparativa');
  const budget=sections.find(section=>section.querySelector('.money-grid'));
  const finalCta=sections.find(section=>section.querySelector('.final-cta'));
  const anchor=document.querySelector('.anchor-nav');

  if(hero&&prices)hero.insertAdjacentElement('afterend',prices);
  let cursor=prices;
  [index,pros,verdict,nobody,comparison,faq,budget,finalCta].forEach(section=>{if(section&&cursor){cursor.insertAdjacentElement('afterend',section);cursor=section;}});
  if(anchor&&prices)prices.insertAdjacentElement('afterend',anchor);

  nobody?.querySelector('.review-card.nobody')?.classList.add('s2-compact');

  const faqCard=faq?.querySelector('.faq');
  if(faqCard){const existing=[...faqCard.querySelectorAll('summary')].map(el=>el.textContent.trim().toLowerCase());const additions=[['¿Qué café en grano funciona mejor en la De’Longhi Magnifica Evo?','Funciona mejor con granos de tueste natural, de nivel medio y poco aceitosos. Los granos muy oscuros o brillantes pueden dejar más residuos en el molinillo y exigir más limpieza.'],['¿Cada cuánto hay que descalcificar la Magnifica Evo?','Depende de la dureza del agua y del uso. La propia máquina avisa cuando corresponde; usar el filtro y configurar correctamente la dureza ayuda a espaciar el proceso.'],['¿Hace mucho ruido al moler el café?','El molinillo se escucha durante unos segundos y no es silencioso, pero el ruido es similar al de otras cafeteras superautomáticas de su gama y termina al finalizar la molienda.']];for(const [q,a] of additions){if(existing.length>=6)break;if(!existing.includes(q.toLowerCase())){const detail=document.createElement('details');detail.innerHTML=`<summary>${q}</summary><p>${a}</p>`;faqCard.appendChild(detail);existing.push(q.toLowerCase());}}}

  const moneyGrid=budget?.querySelector('.money-grid');
  if(moneyGrid){moneyGrid.classList.add('s2-budget');const parent=moneyGrid.parentElement;const heading=parent?.querySelector('h2');const intro=heading?.nextElementSibling;if(heading)heading.textContent='Qué opción elegir';if(intro&&intro.tagName==='P')intro.textContent='Una recomendación rápida según el presupuesto.';parent?.classList.add('budget-compact-wrap');if(heading&&intro&&!parent.querySelector('.budget-compact-head')){const wrap=document.createElement('div');wrap.className='budget-compact-head';heading.before(wrap);wrap.append(heading,intro);}moneyGrid.querySelectorAll('.money-icon').forEach(el=>el.remove());}

  finalCta?.querySelector('a')?.setAttribute('href','#precios');
});

(()=>{
  function fixHomeReviewLinks(){
    if(location.pathname!=='/'&&!location.pathname.endsWith('/index.html'))return;
    document.querySelectorAll('a.section-link').forEach(a=>{
      const txt=(a.textContent||'').toLowerCase();
      if(txt.includes('reseña')){
        a.href='/reviews/';
        a.style.pointerEvents='auto';
        a.style.position='relative';
        a.style.zIndex='20';
        if(!a.dataset.fixedReviewLink){
          a.dataset.fixedReviewLink='1';
          a.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();window.location.assign('/reviews/');});
        }
      }
    });
  }
  document.addEventListener('DOMContentLoaded',fixHomeReviewLinks);
  window.addEventListener('load',fixHomeReviewLinks);
})();