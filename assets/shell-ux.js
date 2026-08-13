(()=>{
 const searchIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="m16 16 4 4"></path></svg>';
 const routes=[
  ['philips 5500','/reviews/philips-5500-lattego.html'],['philips 3300','/reviews/philips-3300-lattego.html'],['philips','/reviews/philips-3300-lattego.html'],['rivelia','/reviews/delonghi-rivelia.html'],['magnifica s','/reviews/delonghi-magnifica-s.html'],['magnifica evo','/reviews/delonghi-magnifica-evo.html'],['magnifica','/reviews/delonghi-magnifica-evo.html'],['cafetera','/categoria/cafe.html'],['café','/categoria/cafe.html'],['airfryer','/categoria/cocina.html'],['freidora','/categoria/cocina.html'],['aspirador','/categoria/aspiradoras.html'],['robot','/guias/mejores-robots-aspiradores-2026.html'],['auricular','/guias/mejores-auriculares-inalambricos-2026.html'],['regalo','/regalos/index.html'],['seleccion','/selecciones/index.html'],['selección','/selecciones/index.html']
 ];
 function go(q){q=String(q||'').toLowerCase().trim();if(!q)return;const hit=routes.find(([term])=>q.includes(term));location.href=hit?hit[1]:'/reviews/index.html';}
 function wire(form){if(!form||form.dataset.shellSearch==='1')return;form.dataset.shellSearch='1';form.addEventListener('submit',e=>{e.preventDefault();go(form.querySelector('input')?.value)});}
 function init(){
  const nav=document.querySelector('.site-header .nav');
  const menu=nav?.querySelector('.menu');
  const mobilePanel=document.querySelector('[data-mobile],.mobile-panel');
  const toggle=document.querySelector('[data-menu],.mobile-toggle');
  if(!nav)return;
  if(menu&&!menu.querySelector('.business-link')){const business=document.createElement('a');business.className='business-link';business.href='/contacto.html';business.textContent='Para tu negocio';const support=menu.querySelector('.support');support?menu.insertBefore(business,support):menu.appendChild(business);}
  if(!nav.querySelector('.header-search')){const form=document.createElement('form');form.className='header-search';form.setAttribute('role','search');form.innerHTML='<input type="search" aria-label="Buscar en Hiperfoco" placeholder="Buscar producto…"><button type="submit" aria-label="Buscar">'+searchIcon+'</button>';menu?nav.insertBefore(form,menu):nav.appendChild(form);wire(form);}
  if(!nav.querySelector('.nav-actions-mobile')){const actions=document.createElement('div');actions.className='nav-actions-mobile';const trigger=document.createElement('button');trigger.type='button';trigger.className='mobile-search-trigger';trigger.setAttribute('aria-label','Buscar');trigger.innerHTML=searchIcon;actions.appendChild(trigger);if(toggle)nav.insertBefore(actions,toggle);else nav.appendChild(actions);trigger.addEventListener('click',()=>{if(mobilePanel&&!mobilePanel.classList.contains('open')){mobilePanel.classList.add('open');toggle?.setAttribute('aria-expanded','true')}setTimeout(()=>mobilePanel?.querySelector('.mobile-menu-search input')?.focus(),30);});}
  if(mobilePanel){
   if(!mobilePanel.querySelector('.mobile-menu-search')){const f=document.createElement('form');f.className='mobile-menu-search';f.setAttribute('role','search');f.innerHTML='<input type="search" aria-label="Buscar en Hiperfoco" placeholder="Buscar producto o guía…"><button type="submit" aria-label="Buscar">⌕</button>';mobilePanel.prepend(f);wire(f);}
   if(!mobilePanel.querySelector('a[href*="selecciones"]')){const a=document.createElement('a');a.href='/selecciones/index.html';a.textContent='Selecciones';mobilePanel.appendChild(a);}
   if(!mobilePanel.querySelector('.mobile-business')){const a=document.createElement('a');a.className='mobile-business';a.href='/contacto.html';a.textContent='Para tu negocio · Contacta';mobilePanel.appendChild(a);}
   if(!mobilePanel.querySelector('.mobile-support')){const a=document.createElement('a');a.className='mobile-support';a.href='/apoyar.html';a.textContent='♡ Apóyanos';mobilePanel.appendChild(a);}
  }
  document.querySelectorAll('.home-hero [data-search],.home-hero .searchbar').forEach(el=>{el.hidden=true;el.setAttribute('aria-hidden','true')});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();