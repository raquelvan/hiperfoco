(()=>{
  const dataNode=document.getElementById('review-data');
  if(!dataNode)return;

  const x=JSON.parse(dataNode.textContent);
  const slug=location.pathname.split('/').pop().replace('.html','');

  const offerMap={
    'delonghi-magnifica-s':[
      {store:'Amazon',detail:'De’Longhi Magnifica S Perfetto',price:'Ver precio',url:'https://link.amazon/B0cqIYI0A',affiliate:true},
      {store:'MediaMarkt',detail:'ECAM22.113.B · comprueba modelo y stock',price:'269 €',url:'https://www.mediamarkt.es/es/product/_cafetera-superautom%C3%A1tica-de-longhi-magnifica-s-ecam-22-113-b-1450-w-1-8-l-250-g-13-programas-negro-1468539.html'},
      {store:'PcComponentes',detail:'ECAM21.110.B · comprueba vendedor',price:'286 €',url:'https://www.pccomponentes.com/delonghi-magnifica-s-ecam21110b-cafetera-superautomatica-con-molinillo-15-bares-negra'},
      {store:'PcComponentes',detail:'ECAM21.117.B · comprueba disponibilidad',price:'300 €',url:'https://www.pccomponentes.com/delonghi-magnifica-s-ecam-21-117-b-cafetera-superautomatica-negra'},
      {store:'Web oficial',detail:'Referencia y especificaciones del fabricante',price:'Ver precio',url:x.officialUrl}
    ],
    'philips-5500-lattego':[
      {store:'Amazon',detail:'Philips Serie 5500 LatteGo',price:'Ver precio',url:'https://link.amazon/B0bH9ozH7',affiliate:true},
      {store:'Philips',detail:'Ficha oficial y disponibilidad',price:'Ver precio',url:x.officialUrl},
      {store:'MediaMarkt',detail:'Busca Serie 5500 LatteGo y revisa el modelo',price:'Consultar',url:'https://www.mediamarkt.es/es/search.html?query=Philips%205500%20LatteGo'},
      {store:'PcComponentes',detail:'Consulta vendedores y condiciones',price:'Consultar',url:'https://www.pccomponentes.com/buscar/?query=Philips%205500%20LatteGo'}
    ],
    'nespresso-vertuo-plus':[
      {store:'Amazon',detail:'Nespresso VertuoPlus con espumador',price:'Ver precio',url:'https://link.amazon/B0fk29LwC',affiliate:true},
      {store:'Krups',detail:'Ficha oficial Vertuo Plus',price:'Ver precio',url:x.officialUrl},
      {store:'MediaMarkt',detail:'Consulta color, pack y disponibilidad',price:'Consultar',url:'https://www.mediamarkt.es/es/search.html?query=Nespresso%20VertuoPlus'},
      {store:'Carrefour',detail:'Revisa vendedor, pack y envío',price:'Consultar',url:'https://www.carrefour.es/supermercado?query=Nespresso%20VertuoPlus'}
    ],
    'delonghi-rivelia':[
      {store:'De’Longhi',detail:'Ficha oficial Rivelia',price:'Ver precio',url:x.officialUrl},
      {store:'Amazon',detail:'Busca el modelo exacto Rivelia',price:'Consultar',url:'https://www.amazon.es/s?k=DeLonghi+Rivelia'},
      {store:'MediaMarkt',detail:'Consulta color, jarra y vendedor',price:'Consultar',url:'https://www.mediamarkt.es/es/search.html?query=DeLonghi%20Rivelia'},
      {store:'PcComponentes',detail:'Comprueba modelo y disponibilidad',price:'Consultar',url:'https://www.pccomponentes.com/buscar/?query=DeLonghi%20Rivelia'}
    ],
    'philips-3300-lattego':[
      {store:'Philips',detail:'Ficha oficial Serie 3300 LatteGo',price:'Ver precio',url:x.officialUrl},
      {store:'Amazon',detail:'Busca el modelo exacto Serie 3300',price:'Consultar',url:'https://www.amazon.es/s?k=Philips+3300+LatteGo'},
      {store:'MediaMarkt',detail:'Comprueba referencia y disponibilidad',price:'Consultar',url:'https://www.mediamarkt.es/es/search.html?query=Philips%203300%20LatteGo'},
      {store:'PcComponentes',detail:'Consulta vendedores y condiciones',price:'Consultar',url:'https://www.pccomponentes.com/buscar/?query=Philips%203300%20LatteGo'}
    ],
    'ninja-af400':[
      {store:'Ninja',detail:'Ficha oficial Foodi MAX AF400',price:'Ver precio',url:x.officialUrl},
      {store:'Amazon',detail:'Busca Ninja Foodi MAX AF400',price:'Consultar',url:'https://www.amazon.es/s?k=Ninja+Foodi+MAX+AF400'},
      {store:'MediaMarkt',detail:'Comprueba referencia, vendedor y stock',price:'Consultar',url:'https://www.mediamarkt.es/es/search.html?query=Ninja%20AF400'},
      {store:'PcComponentes',detail:'Consulta disponibilidad y condiciones',price:'Consultar',url:'https://www.pccomponentes.com/buscar/?query=Ninja%20AF400'}
    ]
  };

  const offers=x.offers||offerMap[slug]||[
    {store:'Web oficial',detail:'Consulta precio, stock y condiciones',price:'Ver precio',url:x.officialUrl}
  ];
  const priced=offers.filter(o=>/\d/.test(o.price||''));
  const best=priced.length?priced.reduce((a,b)=>parseFloat(String(a.price).replace(/[^\d,]/g,'').replace(',','.'))<=parseFloat(String(b.price).replace(/[^\d,]/g,'').replace(',','.'))?a:b):offers[0];

  const L=a=>a.map(v=>`<li>${v}</li>`).join('');
  const D=a=>a.map(v=>`<details><summary>${v[0]}</summary><p>${v[1]}</p></details>`).join('');
  const M=a=>a.map(v=>`<div class="metric"><span>${v[0]}</span><div class="track"><div class="fill" style="width:${v[1]*10}%"></div></div><b>${String(v[1]).replace('.',',')}</b></div>`).join('');
  const C=a=>a.map(v=>`<article class="review-card compare-product"><img src="${v[2]}" alt="${v[0]}" loading="lazy"><div><span class="badge">${v[3]}</span><h3>${v[0]}</h3><ul><li>${v[1]}</li>${v[4]?`<li><a href="${v[4]}">Ver review →</a></li>`:''}</ul></div></article>`).join('');
  const O=offers.map((o,i)=>`<article class="s2-offer${i===0?' best':''}"><div>${i===0?'<em>Primera opción</em>':''}<b>${o.store}</b><small>${o.detail}</small></div><strong>${o.price}</strong><a href="${o.url}" target="_blank" rel="nofollow${o.affiliate?' sponsored':''} noopener">${o.price==='Consultar'?'Consultar →':'Ver oferta →'}</a></article>`).join('');

  document.title=`${x.name}: review, opinión y alternativas | Hiperfoco`;
  document.body.innerHTML=`<header class="site-header"><div class="container nav"><a class="brand" href="../index.html"><span class="mark"></span>Hiperfoco</a><nav class="menu"><a href="../reviews/index.html">Reseñas</a><a href="../categoria/index.html">Categorías</a><a href="../comparativas/index.html">Comparativas</a><a href="../guias/index.html">Guías</a><a href="../regalos/index.html">Regalos</a><a href="../selecciones/index.html">Selecciones</a><a href="../metodologia.html">Cómo analizamos</a><a class="support" href="../apoyar.html">♡ Apóyanos</a></nav><button class="mobile-toggle" data-menu aria-label="Abrir menú" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button></div><nav class="mobile-panel" data-mobile><a href="../reviews/index.html">Reseñas</a><a href="../categoria/index.html">Categorías</a><a href="../comparativas/index.html">Comparativas</a><a href="../guias/index.html">Guías</a><a href="../regalos/index.html">Regalos</a><a href="../metodologia.html">Cómo analizamos</a></nav></header><div class="review-shell breadcrumbs"><a href="../index.html">Inicio</a><span>›</span><a href="../categoria/${x.categorySlug}.html">${x.category}</a><span>›</span><span>${x.name}</span></div><main><section class="review-hero" style="--hero-bg:url('${x.heroBg||x.image}')"><div class="review-copy"><span class="review-kicker">☆ ${x.kicker}</span><h1 class="review-title">${x.name}</h1><div class="score-line"><div class="score-pill">${x.score}<small>/10</small></div><div class="score-message">Nos obsesionamos.<br>Tú compras mejor.</div></div><p class="review-intro">${x.intro}</p><div class="review-actions"><a class="buy" href="#precios">Ver mejor precio →</a><a class="compare-button" href="#comparativa">Comparar →</a></div><p class="disclosure">Análisis editorial documentado. No hemos cobrado por publicar esta reseña. No afirmamos una prueba física propia.</p></div><div class="review-product"><img src="${x.image}" alt="${x.name}" fetchpriority="high"></div></section><section class="review-shell review-section s2-price-section" id="precios"><div class="review-card s2-price-layout"><div class="s2-price-summary"><span>Comparador de precios</span><h2>Compara antes de comprar</h2><strong>${best?.price||'Ver precio'}</strong><p>${x.name}</p><small>Precios y disponibilidad pueden cambiar. Comprueba siempre modelo, vendedor, envío y condiciones.</small></div><div class="s2-offers">${O}</div></div></section><nav class="anchor-nav"><div class="review-shell anchor-inner"><a href="#resumen">Resumen</a><a href="#indice">Índice Hiperfoco</a><a href="#mejor-peor">Lo mejor</a><a href="#mejor-peor">Lo peor</a><a href="#comparativa">Comparativa</a><a href="#faq">FAQ</a></div></nav><section class="review-shell review-section" id="indice"><div class="review-card index-card"><div><div class="score-circle" style="--score:${parseFloat(String(x.score).replace(',','.'))*10}%"><strong>${x.score}</strong></div><div class="score-caption">Nota Hiperfoco</div></div><div><h2>Índice Hiperfoco</h2><div class="metrics">${M(x.metrics)}</div></div><div class="index-photo"><img src="${x.detailImage||x.image}" alt="Detalle de ${x.name}" loading="lazy"></div></div></section><section class="review-shell review-section" id="mejor-peor"><div class="pros-cons"><article class="review-card pros"><h2>✓ Lo mejor</h2><ul class="check-list">${L(x.pros)}</ul></article><article class="review-card cons"><h2>× Lo peor</h2><ul class="cross-list">${L(x.cons)}</ul></article></div></section><section class="review-shell review-section" id="resumen"><div class="review-card verdict"><div class="verdict-main"><div class="icon-heading"><span class="round-icon">✓</span><h2>¿La compraríamos?</h2></div><div class="answer"><span class="yes">${x.verdictLabel||'Sí'}</span><p>${x.verdict}</p></div></div><div class="verdict-side"><h3>Para quién sí</h3><ul class="check-list">${L(x.forYes)}</ul></div><div class="verdict-side"><h3>Para quién no</h3><ul class="cross-list">${L(x.forNo)}</ul></div></div></section><section class="review-shell review-section"><div class="review-card nobody s2-compact"><div class="nobody-copy"><h2>Lo que nadie te cuenta</h2><p>${x.nobody}</p></div><div class="nobody-photo"><img src="${x.heroBg||x.detailImage||x.image}" alt="Uso de ${x.name}" loading="lazy"></div></div></section><section class="review-shell review-section" id="comparativa"><div class="compare-head"><div><h2>Comparativa</h2><p>${x.name} frente a sus alternativas más directas.</p></div><a class="section-link" href="../comparativas/index.html">Ver comparativas →</a></div><div class="compare-grid">${C(x.comparison)}</div></section><section class="review-shell review-section" id="faq"><div class="bottom-grid"><div class="review-card faq"><h2>Preguntas frecuentes</h2>${D(x.faq)}</div><aside class="review-card sources"><h3>Fuentes y transparencia</h3><ul><li><a href="${x.officialUrl}" target="_blank" rel="noopener nofollow">Página oficial del producto</a></li><li>Manual y documentación del fabricante.</li><li>Comparación con alternativas directas.</li><li>Patrones repetidos en opiniones verificadas.</li></ul></aside></div></section><section class="review-shell review-section"><div class="bottom-grid"><div class="budget-compact-wrap"><div class="budget-compact-head"><h2>Qué opción elegir</h2><p>Una recomendación rápida según el presupuesto y el uso.</p></div><div class="money-grid s2-budget">${x.budget.map(v=>`<article class="review-card money"><h3>${v[0]}</h3><p>${v[1]}</p></article>`).join('')}</div></div><aside class="review-card history"><h3>Historial de actualizaciones</h3><div class="timeline"><article><b>6 agosto 2026</b><p>Adaptada a la plantilla definitiva de Hiperfoco.</p></article><article><b>${x.firstDate||'Junio 2026'}</b><p>Primera versión editorial documentada.</p></article></div></aside></div></section><section class="review-shell review-section"><div class="review-card final-cta"><div><h2>¿Te encaja?</h2><p>Comprueba el precio actual y decide con criterio.</p></div><a class="buy" href="#precios">Ver mejor precio →</a></div></section></main><footer class="footer"><div class="container footer-grid"><div><a class="brand" href="../index.html"><span class="mark"></span>Hiperfoco</a><p>Nos obsesionamos.<br>Tú compras mejor.</p></div><div><b>Explorar</b><a href="../reviews/index.html">Reseñas</a><a href="../categoria/index.html">Categorías</a><a href="../comparativas/index.html">Comparativas</a><a href="../guias/index.html">Guías</a></div><div><b>Transparencia</b><a href="../metodologia.html">Metodología</a><a href="../politica-editorial.html">Política editorial</a><a href="../financiacion.html">Cómo nos financiamos</a></div><div><b>Legal</b><a href="../privacidad.html">Privacidad</a><a href="../cookies.html">Cookies</a><a href="../aviso-legal.html">Aviso legal</a></div></div></footer>`;

  const mobileStyle=document.createElement('style');
  mobileStyle.textContent='@media(max-width:700px){.s2-price-section{display:block!important;padding:10px 0!important}.s2-price-layout{display:grid!important;grid-template-columns:1fr!important;gap:10px!important;padding:10px!important}.s2-price-summary{display:flex!important;padding:14px!important}.s2-offers{display:grid!important;gap:7px!important}.s2-offer{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;gap:5px 9px!important;padding:10px!important}.s2-offer>a{display:block!important;grid-column:1/-1!important;text-align:left!important;padding-top:3px!important}.review-hero{min-height:0!important}.review-actions{display:grid!important;grid-template-columns:1fr!important}.anchor-inner{overflow-x:auto!important;white-space:nowrap!important}}';
  document.head.appendChild(mobileStyle);

  const b=document.querySelector('[data-menu]'),m=document.querySelector('[data-mobile]');
  b?.addEventListener('click',()=>{const open=m.classList.toggle('open');b.setAttribute('aria-expanded',String(open));});
})();