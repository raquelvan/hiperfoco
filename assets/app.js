document.addEventListener('DOMContentLoaded',()=>{
  const menuButton=document.querySelector('[data-menu],.mobile-toggle');
  const mobilePanel=document.querySelector('[data-mobile],.mobile-panel');
  if(menuButton&&mobilePanel){menuButton.addEventListener('click',()=>{const open=mobilePanel.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});}

  const search=document.querySelector('[data-search]');
  search?.addEventListener('submit',e=>{e.preventDefault();const q=(search.querySelector('input')?.value||'').toLowerCase().trim();const routes=[['philips','reviews/philips-3300-lattego.html'],['rivelia','reviews/delonghi-rivelia.html'],['magnifica s','reviews/delonghi-magnifica-s.html'],['magnifica','reviews/delonghi-magnifica-evo.html'],['aspirador','guias/mejores-aspiradoras-sin-cable-2026.html'],['freidora','guias/freidoras-aire-merecen-pena.html'],['regalo','regalos/index.html']];const found=routes.find(([term])=>q.includes(term));location.href=found?found[1]:'reviews/index.html';});

  const style=document.createElement('style');
  style.textContent=`
  .mobile-panel.open{display:block!important}
  .s2-price-section{padding:14px 0 10px}.s2-price-layout{display:grid;grid-template-columns:270px 1fr;gap:14px;padding:16px}.s2-price-summary{background:#f1f6f3;border-radius:15px;padding:17px;display:flex;flex-direction:column;justify-content:center}.s2-price-summary span{font-size:.62rem;font-weight:900;text-transform:uppercase;color:var(--green)}.s2-price-summary h2{font-size:1.65rem;margin:6px 0}.s2-price-summary strong{font:2.8rem/1 Georgia,serif;color:var(--green);margin:4px 0 9px}.s2-price-summary p,.s2-price-summary small{font-size:.72rem;color:var(--muted);margin:0}.s2-offers{display:grid;gap:7px}.s2-offer{display:grid;grid-template-columns:1fr 90px 84px;gap:10px;align-items:center;border:1px solid var(--line);border-radius:12px;padding:9px 11px;background:#fff}.s2-offer.best{border:2px solid var(--green);background:#f4f8f5}.s2-offer div{display:flex;flex-direction:column}.s2-offer div em{font-style:normal;font-size:.54rem;font-weight:900;text-transform:uppercase;color:var(--green)}.s2-offer div b{font-size:.82rem}.s2-offer div small{font-size:.62rem;color:var(--muted)}.s2-offer>strong{font:1.05rem Georgia,serif;color:var(--green);text-align:right}.s2-offer>a{font-size:.69rem;font-weight:850;text-decoration:none;color:var(--green);text-align:right}
  .nobody.s2-compact{display:grid!important;grid-template-columns:minmax(0,1fr) 150px!important;min-height:82px!important;max-height:82px!important;overflow:hidden!important}.nobody.s2-compact .nobody-copy{padding:10px 14px!important;display:flex!important;flex-direction:column!important;justify-content:center!important}.nobody.s2-compact h2{font-size:1.08rem!important;margin:0 0 3px!important}.nobody.s2-compact p{font-size:.7rem!important;line-height:1.35!important;margin:0!important}.nobody.s2-compact .btn{display:none!important}.nobody.s2-compact .nobody-photo{min-height:0!important;height:82px!important}.nobody.s2-compact .nobody-photo img{height:82px!important;object-fit:cover!important}
  .budget-compact-wrap{padding:12px 0 16px}.budget-compact-head{display:flex;justify-content:space-between;align-items:end;gap:16px;margin-bottom:8px}.budget-compact-head h2{font-size:1.75rem;margin:0}.budget-compact-head p{font-size:.78rem;color:var(--muted);margin:0}.money-grid.s2-budget{grid-template-columns:repeat(3,1fr)!important;gap:8px!important}.money-grid.s2-budget .money{padding:12px 14px!important;min-height:0!important;display:block!important}.money-grid.s2-budget .money-icon{display:none!important}.money-grid.s2-budget h3{font-size:.98rem!important;margin:0 0 4px!important}.money-grid.s2-budget p{font-size:.73rem!important;line-height:1.4!important;margin:0!important}
  .verdict-note{font-size:.78rem;line-height:1.5;color:var(--muted);margin:10px 0 0}.faq details{padding:12px 0;border-bottom:1px solid var(--line)}.faq details:last-child{border-bottom:0}.faq summary{font-weight:800;cursor:pointer;line-height:1.35}.faq details p{font-size:.82rem;line-height:1.55;color:var(--muted);margin:8px 0 0}
  @media(max-width:700px){.s2-price-layout{grid-template-columns:1fr;padding:11px}.s2-price-summary{padding:14px}.s2-price-summary strong{font-size:2.35rem}.s2-offer{grid-template-columns:1fr auto;padding:9px 10px}.s2-offer>a{grid-column:1/-1;text-align:left}.nobody.s2-compact{grid-template-columns:1fr!important;min-height:0!important;max-height:none!important}.nobody.s2-compact .nobody-photo{display:none!important}.nobody.s2-compact .nobody-copy{padding:9px 12px!important}.nobody.s2-compact h2{font-size:1rem!important}.nobody.s2-compact p{font-size:.68rem!important}.budget-compact-head{display:block;margin-bottom:7px}.budget-compact-head h2{font-size:1.45rem}.budget-compact-head p{font-size:.73rem;margin-top:2px}.money-grid.s2-budget{grid-template-columns:1fr!important;gap:6px!important}.money-grid.s2-budget .money{padding:10px 12px!important}.money-grid.s2-budget h3{font-size:.92rem!important}.money-grid.s2-budget p{font-size:.71rem!important}.review-actions{display:grid!important;grid-template-columns:1fr!important}.review-actions a{width:100%!important}}
  `;
  document.head.appendChild(style);

  if(!location.pathname.endsWith('/reviews/delonghi-magnifica-evo.html'))return;

  const hero=document.querySelector('.review-hero');
  if(hero){
    const actions=hero.querySelector('.review-actions');
    if(actions){actions.innerHTML='<a class="buy" href="#comparativa">Comparar alternativas →</a><a class="compare-button" href="#precios">Ver mejor precio · 379,99 €</a>';}
  }

  let prices=document.querySelector('#precios');
  if(hero&&!prices){
    prices=document.createElement('section');prices.id='precios';prices.className='review-shell review-section s2-price-section';
    prices.innerHTML=`<div class="review-card s2-price-layout"><div class="s2-price-summary"><span>Comparador actualizado</span><h2>Mejor precio ahora</h2><strong>379,99 €</strong><p>Mismo modelo <b>ECAM290.61.SB</b></p><small>Comprobado el 6 de agosto de 2026. Precio y stock pueden cambiar.</small></div><div class="s2-offers"><article class="s2-offer best"><div><em>Mejor precio</em><b>PcComponentes</b><small>Vendido y enviado por PcComponentes</small></div><strong>379,99 €</strong><a data-affiliate-slot="pccomponentes-magnifica-evo" href="https://www.pccomponentes.com/delonghi-magnifica-evo-cafetera-superautomatica-con-deposito-de-leche-15-bares-plateada-5-bebidas" target="_blank" rel="nofollow sponsored noopener">Ver oferta →</a></article><article class="s2-offer"><div><b>Carrefour</b><small>Vendido por Carrefour · envío gratis</small></div><strong>399 €</strong><a data-affiliate-slot="carrefour-magnifica-evo" href="https://www.carrefour.es/cafetera-superautomatica-delonghi-ecam29061sb/VC4A-17955283/p" target="_blank" rel="nofollow sponsored noopener">Ver oferta →</a></article><article class="s2-offer"><div><b>MediaMarkt</b><small>Consulta precio y vendedor</small></div><strong>Ver precio</strong><a data-affiliate-slot="mediamarkt-magnifica-evo" href="https://www.mediamarkt.es/es/product/_cafetera-express-ecam29061sb-de-longhi-150-barbar-1450-w-2-tazas-multicolor-98981528.html" target="_blank" rel="nofollow sponsored noopener">Consultar →</a></article><article class="s2-offer"><div><b>Worten</b><small>Vendido por Worten</small></div><strong>569 €</strong><a data-affiliate-slot="worten-magnifica-evo" href="https://www.worten.es/productos/cafetera-automatico-delonghi-magnifica-evo-ecam290-61-sb-7533123" target="_blank" rel="nofollow sponsored noopener">Ver oferta →</a></article><article class="s2-offer"><div><b>El Corte Inglés</b><small>Consulta disponibilidad</small></div><strong>Ver precio</strong><a data-affiliate-slot="eci-magnifica-evo" href="https://www.elcorteingles.es/dia-del-padre/A43102936-8004399021402-pr-cafetera-superautomatica-delonghi-magnifica-evo-ecam29061sb-con-molinillo-incorporado-gris/" target="_blank" rel="nofollow sponsored noopener">Consultar →</a></article></div></div>`;
    hero.insertAdjacentElement('afterend',prices);
  }

  const verdict=document.querySelector('#resumen');
  const verdictText=verdict?.querySelector('.answer p');
  if(verdictText)verdictText.textContent='Sí, especialmente si quieres pasar de cápsulas a café en grano sin aprender técnicas de barista. Por unos 380–430 €, combina buen espresso, leche automática y una limpieza razonable. La recomendaríamos para una casa donde se preparan varios cafés al día y se valora la comodidad.';
  const verdictMain=verdict?.querySelector('.verdict-main');
  if(verdictMain&&!verdictMain.querySelector('.verdict-note')){const note=document.createElement('p');note.className='verdict-note';note.textContent='La compra pierde sentido si solo tomas espresso, buscas perfiles de usuario o la encuentras por encima de 500 €, porque en ese precio aparecen alternativas más completas.';verdictMain.appendChild(note);}

  const nobody=document.querySelector('.review-card.nobody');nobody?.classList.add('s2-compact');

  const moneyGrid=document.querySelector('.money-grid');
  if(moneyGrid){moneyGrid.classList.add('s2-budget');const parent=moneyGrid.parentElement;const heading=parent?.querySelector('h2');const intro=heading?.nextElementSibling;if(heading)heading.textContent='Qué opción elegir';if(intro&&intro.tagName==='P')intro.textContent='Una recomendación rápida según el presupuesto.';parent?.classList.add('budget-compact-wrap');if(heading&&intro&&!parent.querySelector('.budget-compact-head')){const wrap=document.createElement('div');wrap.className='budget-compact-head';heading.before(wrap);wrap.append(heading,intro);}moneyGrid.querySelectorAll('.money-icon').forEach(el=>el.remove());}

  const faqCard=document.querySelector('#faq .faq');
  const faqs=[
    ['¿Merece la pena la De’Longhi Magnifica Evo?','Sí, especialmente entre 380 y 430 €. Es una buena compra para quien quiere café recién molido, cappuccino automático y controles sencillos. Por encima de 500 €, conviene comparar modelos con más personalización.'],
    ['¿Cuál es el mejor precio de la Magnifica Evo?','El precio más bajo comprobado el 6 de agosto de 2026 fue 379,99 € en PcComponentes. Carrefour aparecía a 399 €. El stock y el precio pueden cambiar, por eso conviene revisar el comparador antes de comprar.'],
    ['¿Hace buen café espresso?','Sí, cuando se utiliza café en grano fresco y se ajustan la molienda y la intensidad. El resultado es consistente y con buena temperatura, aunque ofrece menos control que una cafetera manual.'],
    ['¿Qué tal prepara cappuccino y café con leche?','El sistema LatteCrema Hot prepara la espuma automáticamente y ofrece resultados consistentes. Es uno de sus puntos fuertes para quien toma cappuccino, latte macchiato o bebidas con leche a diario.'],
    ['¿Es fácil de limpiar?','La limpieza diaria es sencilla, pero no inexistente: hay que vaciar la bandeja y los posos, enjuagar la jarra de leche y limpiar periódicamente el grupo de infusión extraíble.'],
    ['¿Cada cuánto hay que descalcificarla?','Depende de la dureza del agua y del uso. La máquina avisa cuando necesita descalcificación. Usar un filtro de agua y configurar correctamente la dureza puede reducir la frecuencia.'],
    ['¿Qué café en grano funciona mejor?','Suele funcionar mejor con tuestes medios o medio-oscuros y granos poco aceitosos. Los granos muy brillantes o grasos pueden dejar más residuos en el molinillo y exigir más limpieza.'],
    ['¿Es muy ruidosa?','El molinillo se oye durante unos segundos al preparar cada café, como ocurre en la mayoría de superautomáticas. No es silenciosa, pero el ruido es breve y razonable para una cocina doméstica.'],
    ['¿Puede preparar dos cafés a la vez?','Puede preparar dos espressos simultáneamente. En las bebidas con leche, la preparación es individual porque utiliza la jarra LatteCrema.'],
    ['¿Cuánto tarda en preparar un café?','Tras el encendido y el enjuague automático, un espresso tarda alrededor de un minuto. Las bebidas con leche requieren algo más de tiempo, pero el proceso es automático.'],
    ['¿Es mejor que una cafetera de cápsulas?','Para quien toma café todos los días, ofrece café recién molido, más opciones de ajuste y menos residuos de cápsulas. A cambio, ocupa más espacio, cuesta más al principio y requiere limpieza.'],
    ['¿Qué diferencia hay entre la Magnifica Evo y la Philips 3300 LatteGo?','La Magnifica Evo destaca por el equilibrio del café y el sistema LatteCrema. La Philips 3300 LatteGo resulta especialmente cómoda para desmontar y lavar el sistema de leche.'],
    ['¿Cuánto puede durar una Magnifica Evo?','No hay una vida útil garantizada única. Con limpieza regular, descalcificación y mantenimiento del grupo de infusión, una superautomática de esta gama puede mantenerse en buen estado durante años.']
  ];
  if(faqCard){const title=faqCard.querySelector('h2');faqCard.innerHTML='';if(title)faqCard.appendChild(title);faqs.forEach(([q,a])=>{const d=document.createElement('details');d.innerHTML=`<summary>${q}</summary><p>${a}</p>`;faqCard.appendChild(d);});}

  const main=document.querySelector('main');
  const anchor=document.querySelector('.anchor-nav');
  const index=document.querySelector('#indice');
  const pros=document.querySelector('#mejor-peor');
  const analysis=[...document.querySelectorAll('.review-section')].find(s=>s.querySelector('h2')?.textContent.trim()==='Cómo es el café')||document.querySelector('#analisis');
  const insight=nobody?.closest('.review-section');
  const faq=document.querySelector('#faq');
  const comparison=document.querySelector('#comparativa');
  const budget=moneyGrid?.closest('.review-section');
  const final=[...document.querySelectorAll('main>.review-section')].find(s=>s.querySelector('.final-cta'));
  [prices,anchor,index,pros,verdict,analysis,insight,faq,comparison,budget,final].forEach(el=>el?.remove());
  [prices,anchor,index,pros,verdict,analysis,insight,faq,comparison,budget,final].forEach(el=>el&&main.appendChild(el));

  if(anchor){const inner=anchor.querySelector('.anchor-inner');if(inner)inner.innerHTML='<a href="#precios">Precios</a><a href="#indice">Índice</a><a href="#mejor-peor">Lo mejor y lo peor</a><a href="#resumen">¿La compraríamos?</a><a href="#faq">FAQ</a><a href="#comparativa">Comparativa</a>';}
  const finalLink=document.querySelector('.final-cta a');if(finalLink){finalLink.href='#precios';finalLink.textContent='Ver mejor precio →';}
});