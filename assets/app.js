const menuButton=document.querySelector('[data-menu]');
const mobile=document.querySelector('[data-mobile]');
menuButton?.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});

const search=document.querySelector('[data-search]');
search?.addEventListener('submit',e=>{e.preventDefault();const q=search.querySelector('input').value.toLowerCase().trim();const routes=[['philips','reviews/philips-3300-lattego.html'],['rivelia','reviews/delonghi-rivelia.html'],['magnifica s','reviews/delonghi-magnifica-s.html'],['magnifica','reviews/delonghi-magnifica-evo.html'],['aspirador','guias/mejores-aspiradoras-sin-cable-2026.html'],['air fryer','guias/freidoras-aire-merecen-pena.html'],['freidora','guias/freidoras-aire-merecen-pena.html'],['regalo','regalos/index.html']];const found=routes.find(([term])=>q.includes(term));location.href=found?found[1]:'reviews/index.html';});

document.querySelectorAll('[data-newsletter]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const button=form.querySelector('button');button.textContent='¡Apuntada!';button.disabled=true;}));

// Estructura compacta del hero: separa la diana del texto para evitar solapamientos.
const focusMap=document.querySelector('.focus-map');
if(focusMap&&!focusMap.querySelector('.focus-visual')){
  const visual=document.createElement('div');visual.className='focus-visual';visual.setAttribute('aria-hidden','true');
  [...focusMap.children].filter(el=>el.matches('.ring,.core,.orbit')).forEach(el=>visual.appendChild(el));
  focusMap.prepend(visual);
}

// Convierte las últimas reseñas en un carrusel accesible con flechas.
const reviewSection=[...document.querySelectorAll('main .section')].find(section=>section.querySelector('h2')?.textContent.trim()==='Últimas reseñas');
if(reviewSection){
  reviewSection.classList.add('reviews-section');
  const head=reviewSection.querySelector('.section-head');
  const grid=reviewSection.querySelector('.review-grid');
  if(head&&grid&&!grid.hasAttribute('data-review-track')){
    grid.setAttribute('data-review-track','');
    const link=head.querySelector('.section-link');
    const actions=document.createElement('div');actions.className='section-actions';
    const controls=document.createElement('div');controls.className='carousel-controls';controls.setAttribute('aria-label','Mover reseñas');
    controls.innerHTML='<button class="carousel-arrow" type="button" data-review-prev aria-label="Reseñas anteriores">←</button><button class="carousel-arrow" type="button" data-review-next aria-label="Siguientes reseñas">→</button>';
    actions.appendChild(controls);if(link)actions.appendChild(link);head.appendChild(actions);
    const viewport=document.createElement('div');viewport.className='review-viewport';grid.parentNode.insertBefore(viewport,grid);viewport.appendChild(grid);
  }
}

const categorySection=[...document.querySelectorAll('main .section')].find(section=>section.querySelector('h2')?.textContent.trim()==='Explora por categorías');
categorySection?.classList.add('categories-section');

const reviewTrack=document.querySelector('[data-review-track]');
const moveReviews=direction=>{if(!reviewTrack)return;const card=reviewTrack.querySelector('.card');const gap=parseFloat(getComputedStyle(reviewTrack).columnGap||getComputedStyle(reviewTrack).gap)||18;const distance=(card?.getBoundingClientRect().width||300)+gap;reviewTrack.scrollBy({left:direction*distance,behavior:'smooth'});};
document.querySelector('[data-review-prev]')?.addEventListener('click',()=>moveReviews(-1));
document.querySelector('[data-review-next]')?.addEventListener('click',()=>moveReviews(1));

const homeCompactStyles=document.createElement('style');homeCompactStyles.textContent=`/* Home compacta · diseño aprobado */
.home-hero{display:grid;grid-template-columns:minmax(0,1.04fr) minmax(460px,.96fr);gap:34px;align-items:center;min-height:276px;padding:14px 0 12px}
.home-hero h1{font-size:clamp(2.85rem,4.5vw,4.25rem);max-width:620px;margin:10px 0}
.home-lead{font-size:.96rem;max-width:590px;margin:0 0 12px}
.searchbar{max-width:555px;padding:5px;border-radius:15px}
.searchbar input{padding:9px 11px}.searchbar button{padding:9px 17px}
.focus-map{position:relative;display:grid;grid-template-columns:minmax(195px,.85fr) minmax(240px,1.15fr);align-items:center;gap:17px;height:218px;overflow:visible}
.focus-visual{position:relative;height:218px;min-width:0;overflow:visible}
.focus-visual .ring{left:50%;top:50%}.focus-visual .ring.r1{width:198px;height:198px}.focus-visual .ring.r2{width:142px;height:142px}.focus-visual .ring.r3{width:88px;height:88px}
.focus-visual .core{left:50%;top:50%;width:72px;height:72px;font-size:.88rem}
.focus-visual .orbit{width:34px;height:34px}.focus-visual .orbit svg{width:17px;height:17px}
.focus-visual .o1{left:43%;top:0}.focus-visual .o4,.focus-visual .o5{display:none}.focus-visual .o2{left:auto;right:-2px;top:38%}.focus-visual .o3{left:8%;bottom:6%}
.map-copy{position:static;width:auto;display:grid;gap:4px}
.map-copy div{padding:7px 0;border-left:0}
.map-copy b{font-size:.92rem;line-height:1.15}.map-copy span{font-size:.74rem;line-height:1.35}
.section{padding:39px 0;border-top:0}.home-hero+.section{padding-top:22px}
.section-head{margin-bottom:18px}.section-head h2{font-size:clamp(1.9rem,2.75vw,2.5rem)}
.section-actions{display:flex;align-items:center;gap:11px}.carousel-controls{display:flex;gap:7px}
.carousel-arrow{width:38px;height:38px;border:1px solid var(--line);border-radius:50%;background:#fff;color:var(--green);font-size:1.05rem;cursor:pointer;display:grid;place-items:center;transition:.2s}
.carousel-arrow:hover{background:var(--green);border-color:var(--green);color:#fff;transform:translateY(-1px)}
.review-viewport{overflow:hidden}
.review-grid{display:grid;grid-auto-flow:column;grid-auto-columns:calc((100% - 42px)/3.25);grid-template-columns:none;gap:14px;overflow-x:auto;overscroll-behavior-inline:contain;scroll-snap-type:x mandatory;scrollbar-width:none;padding:2px 2px 7px}
.review-grid::-webkit-scrollbar{display:none}.review-grid>.card{scroll-snap-align:start}
.product-media{height:190px;padding:14px}.card-body{min-height:190px;padding:15px}.card h3{font-size:1.16rem}.card p{font-size:.82rem;margin-bottom:11px}
.categories-section{padding:27px 0 31px}.categories-section .section-head{margin-bottom:13px}
.categories{gap:9px}.cat{height:78px;padding:8px 6px;border-radius:16px;gap:4px}.cat-icon{width:25px;height:25px}.cat b{font-size:.76rem}
@media(max-width:1080px){
 .home-hero{grid-template-columns:minmax(0,1fr) minmax(390px,.92fr);gap:22px;min-height:265px}
 .focus-map{grid-template-columns:170px 1fr;height:205px}.focus-visual{height:205px}
 .focus-visual .ring.r1{width:174px;height:174px}.focus-visual .ring.r2{width:126px;height:126px}.focus-visual .ring.r3{width:78px;height:78px}
 .focus-visual .core{width:64px;height:64px}.map-copy{display:grid}.map-copy b{font-size:.86rem}.map-copy span{font-size:.7rem}
 .review-grid{grid-auto-columns:calc((100% - 28px)/2.45)}
}
@media(max-width:820px){
 .home-hero{grid-template-columns:1fr;padding:18px 0 8px;gap:10px}.hero-copy{text-align:left}.home-hero h1{font-size:clamp(2.65rem,11vw,3.7rem)}
 .focus-map{height:auto;grid-template-columns:1fr}.focus-visual{display:none}.map-copy{grid-template-columns:repeat(3,1fr);gap:8px}.map-copy div{background:#fff;border:1px solid var(--line);border-radius:14px;padding:10px}.map-copy b{font-size:.8rem}.map-copy span{font-size:.68rem}
 .home-hero+.section{padding-top:19px}.review-grid{grid-auto-columns:72%}
}
@media(max-width:560px){
 .map-copy{grid-template-columns:1fr;gap:6px}.map-copy div{display:grid;grid-template-columns:150px 1fr;gap:8px;align-items:center;padding:8px 10px}.map-copy span{font-size:.66rem}
 .section-head{display:flex;align-items:flex-end}.section-actions{gap:6px}.section-link{font-size:.76rem;padding:8px 10px}.carousel-arrow{width:34px;height:34px}
 .review-grid{grid-auto-columns:86%}.product-media{height:215px}.categories{grid-template-columns:repeat(4,1fr)}.cat{height:73px}.cat b{font-size:.68rem}
}
`;document.head.appendChild(homeCompactStyles);
