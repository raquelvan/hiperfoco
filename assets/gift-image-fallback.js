(()=>{
  const p=location.pathname;
  let fallback='/assets/images/gift-todo.webp';
  if(/gamers|frikis|tecnologicos|musica/.test(p))fallback='/assets/images/gift-gamers.webp';
  else if(/cafe/.test(p))fallback='/assets/images/gift-cafe.webp';
  else if(/cocinillas/.test(p))fallback='/assets/images/gift-cocina.webp';
  else if(/viajer/.test(p))fallback='/assets/images/gift-viajeros.webp';
  else if(/casa/.test(p))fallback='/assets/images/gift-casa.webp';

  const style=document.createElement('style');
  style.textContent='.gift4-media img[data-hf-fallback="1"]{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important;padding:0!important;background:#f3f6f4!important}.gift4-media:has(img[data-hf-fallback="1"]) span{display:none!important}';
  document.head.appendChild(style);

  function arm(img){
    if(!img||img.dataset.hfArmed==='1')return;
    img.dataset.hfArmed='1';
    img.addEventListener('error',()=>{
      if(img.dataset.hfFallback==='1')return;
      img.dataset.hfFallback='1';
      img.removeAttribute('srcset');
      img.src=fallback;
      img.closest('.gift4-media')?.classList.remove('no-photo');
    });
    if(img.complete&&img.naturalWidth===0)img.dispatchEvent(new Event('error'));
  }
  function run(){document.querySelectorAll('.gift4-media img').forEach(arm)}
  document.addEventListener('DOMContentLoaded',run);
  new MutationObserver(run).observe(document.documentElement,{childList:true,subtree:true});
})();
