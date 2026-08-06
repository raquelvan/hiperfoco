(()=>{
  const initMenu=()=>{
    const button=document.querySelector('[data-menu]');
    const panel=document.querySelector('[data-mobile]');
    if(!button||!panel||button.dataset.bound==='true') return;
    button.dataset.bound='true';
    button.addEventListener('click',()=>{
      const open=panel.classList.toggle('open');
      button.setAttribute('aria-expanded',String(open));
    });
  };

  const applyReviewFixes=()=>{
    initMenu();
    if(!location.pathname.endsWith('/reviews/delonghi-magnifica-evo.html')) return;

    const hero=document.querySelector('.review-hero');
    if(hero&&!document.querySelector('#precios')){
      const prices=document.createElement('section');
      prices.id='precios';
      prices.className='review-shell review-section s2-prices';
      prices.innerHTML=`<div class="review-card price-layout"><div class="price-summary"><span>Comparador actualizado</span><h2>Mejor precio ahora</h2><strong>379,99 €</strong><p>Mismo modelo <b>ECAM290.61.SB</b>.</p><small>Precios comprobados el 6 de agosto de 2026. Pueden cambiar.</small></div><div class="offer-list"><article class="offer-row best"><div><em>Mejor precio</em><b>PcComponentes</b><small>Vendido y enviado por PcComponentes</small></div><strong>379,99 €</strong><a href="https://www.pccomponentes.com/delonghi-magnifica-evo-cafetera-superautomatica-con-deposito-de-leche-15-bares-plateada-5-bebidas" target="_blank" rel="nofollow sponsored noopener">Ver oferta →</a></article><article class="offer-row"><div><b>Carrefour</b><small>Vendido por Carrefour · envío gratis</small></div><strong>399 €</strong><a href="https://www.carrefour.es/cafetera-superautomatica-delonghi-ecam29061sb/VC4A-17955283/p" target="_blank" rel="nofollow sponsored noopener">Ver oferta →</a></article><article class="offer-row"><div><b>MediaMarkt</b><small>Consulta precio y vendedor</small></div><strong>Ver precio</strong><a href="https://www.mediamarkt.es/es/product/_cafetera-express-ecam29061sb-de-longhi-150-barbar-1450-w-2-tazas-multicolor-98981528.html" target="_blank" rel="nofollow sponsored noopener">Consultar →</a></article><article class="offer-row"><div><b>Worten</b><small>Vendido por Worten</small></div><strong>569 €</strong><a href="https://www.worten.es/productos/cafetera-automatico-delonghi-magnifica-evo-ecam290-61-sb-7533123" target="_blank" rel="nofollow sponsored noopener">Ver oferta →</a></article><article class="offer-row"><div><b>El Corte Inglés</b><small>Consulta disponibilidad</small></div><strong>Ver precio</strong><a href="https://www.elcorteingles.es/dia-del-padre/A43102936-8004399021402-pr-cafetera-superautomatica-delonghi-magnifica-evo-ecam29061sb-con-molinillo-incorporado-gris/" target="_blank" rel="nofollow sponsored noopener">Consultar →</a></article></div></div>`;
      hero.insertAdjacentElement('afterend',prices);
    }

    const heading=[...document.querySelectorAll('h2')].find(el=>el.textContent.trim().startsWith('Si fuera mi dinero'));
    if(heading){
      heading.textContent='Qué opción elegir';
      const intro=heading.nextElementSibling;
      if(intro&&intro.tagName==='P') intro.textContent='Una recomendación rápida según el presupuesto.';
    }

    const nobody=[...document.querySelectorAll('.review-section')].find(section=>section.querySelector('h2')?.textContent.trim()==='Lo que nadie te cuenta');
    if(nobody){
      nobody.classList.add('compact-insight-section');
      nobody.innerHTML=`<div class="review-card compact-insight"><div><span>Lo que nadie te cuenta</span><p>La clave no es tener muchas recetas, sino que vaciar los posos, enjuagar la bandeja y limpiar la jarra sea rápido. <strong>En la Magnifica Evo la rutina es razonable</strong>, aunque la leche añade piezas que cuidar.</p></div><img src="https://dam.delonghi.com/902x902/assets/218865" alt="Magnifica Evo preparando café y bebidas con leche" loading="lazy"></div>`;
    }

    if(!document.querySelector('#review-fixes-v2')){
      const style=document.createElement('style');
      style.id='review-fixes-v2';
      style.textContent=`.price-layout{display:grid;grid-template-columns:275px 1fr;gap:16px;padding:17px}.price-summary{background:linear-gradient(145deg,#edf4ef,#fafbf8);border-radius:16px;padding:18px;display:flex;flex-direction:column;justify-content:center}.price-summary>span{font-size:.63rem;font-weight:900;text-transform:uppercase;color:var(--green)}.price-summary h2{font-size:1.65rem;margin:6px 0 4px}.price-summary>strong{font:2.8rem/1 Georgia,serif;color:var(--green);margin:3px 0 9px}.price-summary p{font-size:.8rem;margin:0}.price-summary small{font-size:.66rem;color:var(--muted);margin-top:8px}.offer-list{display:grid;gap:6px}.offer-row{display:grid;grid-template-columns:minmax(180px,1fr) 90px 82px;gap:11px;align-items:center;border:1px solid var(--line);border-radius:12px;padding:9px 11px;background:#fff}.offer-row.best{border:2px solid var(--green);background:#f4f8f5}.offer-row>div{display:flex;flex-direction:column}.offer-row b{font-size:.83rem}.offer-row small{font-size:.64rem;color:var(--muted)}.offer-row em{width:max-content;background:var(--green);color:#fff;border-radius:999px;padding:2px 7px;font-size:.53rem;font-style:normal;font-weight:900;text-transform:uppercase;margin-bottom:3px}.offer-row>strong{font:1.05rem Georgia,serif;color:var(--green);text-align:right;white-space:nowrap}.offer-row a{font-size:.7rem;font-weight:850;text-decoration:none;color:var(--green);text-align:right;white-space:nowrap}.money-grid{gap:8px!important}.money{display:block!important;min-height:0!important;padding:12px 14px!important;overflow:hidden!important}.money-icon,.money-icon svg{display:none!important}.money h3{font-size:.98rem!important;line-height:1.2!important;margin:0 0 4px!important}.money p{font-size:.74rem!important;line-height:1.4!important;margin:0!important}.compact-insight-section{padding:8px 0!important}.compact-insight{display:grid!important;grid-template-columns:minmax(0,1fr) 180px!important;min-height:92px!important;max-height:92px!important;overflow:hidden!important}.compact-insight>div{padding:12px 17px!important;display:flex!important;flex-direction:column!important;justify-content:center!important}.compact-insight>div>span{font:1.1rem/1.1 Georgia,serif!important;margin-bottom:4px!important}.compact-insight p{font-size:.74rem!important;line-height:1.38!important;margin:0!important}.compact-insight img{width:100%!important;height:92px!important;object-fit:cover!important;object-position:center 48%!important}@media(max-width:700px){.price-layout{grid-template-columns:1fr;padding:12px;gap:10px}.price-summary{padding:14px}.price-summary h2{font-size:1.4rem}.price-summary>strong{font-size:2.25rem}.offer-row{grid-template-columns:1fr auto;padding:9px}.offer-row a{grid-column:1/-1;text-align:left}.money-grid{grid-template-columns:1fr!important;gap:6px!important}.money{padding:10px 12px!important}.money h3{font-size:.92rem!important}.money p{font-size:.72rem!important}.compact-insight{grid-template-columns:1fr!important;min-height:0!important;max-height:none!important}.compact-insight img{display:none!important}.compact-insight>div{padding:10px 13px!important}.compact-insight>div>span{font-size:1rem!important}.compact-insight p{font-size:.71rem!important;line-height:1.36!important}}`;
      document.head.appendChild(style);
    }
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',applyReviewFixes,{once:true});
  else applyReviewFixes();

  const legacy=document.createElement('script');
  legacy.src='https://raw.githubusercontent.com/raquelvan/hiperfoco/5e76fe3cfe38bd7eb8c2cf1e41f7daab3a87fa2c/assets/app.js';
  legacy.onload=()=>{initMenu();applyReviewFixes();};
  legacy.onerror=()=>{initMenu();applyReviewFixes();};
  document.head.appendChild(legacy);
})();