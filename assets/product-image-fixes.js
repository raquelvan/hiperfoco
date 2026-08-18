(()=>{
  const FALLBACKS={
    'delonghi magnifica evo':'/assets/approved/magnifica-evo-v3.jpg',
    'philips serie 3300 lattego':'/assets/approved/philips-3300-v3.jpg',
    'delonghi rivelia':'/assets/approved/rivelia-v3.jpg',
    'delonghi magnifica s':'/assets/approved/magnifica-s-v3.jpg',
    'philips serie 5500 lattego':'/assets/approved/philips-5500-v4.png',
    'jbl clip 5':'/assets/approved/jbl-clip5-v1.jpg',
    'jbl flip 6':'/assets/approved/jbl-flip6-v1.png',
    'sony wh ch720n':'/assets/approved/sony-ch720n-v1.jpg',
    'ninja foodi max af400':'/assets/approved/ninja-af400-v1.png'
  };
  const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const KEYS=Object.keys(FALLBACKS);
  // IMPORTANTE: no incluir .review-card genérico. Esa clase también se usa en
  // presupuesto, FAQ, historial y otros bloques editoriales que NO son producto.
  const productCardSel='.review-grid>.card,.product-page-card,.comparison-card,.reviewCard,.hf-selection-card,.hf-guide-pick,article.product-card,.hub-card,.compare-product';
  function keyFor(node){const n=norm([node?.getAttribute?.('alt'),node?.querySelector?.('h3')?.textContent,node?.querySelector?.('h2')?.textContent,node?.textContent].filter(Boolean).join(' '));return KEYS.find(k=>n.includes(norm(k)))||null}
  function style(img){Object.assign(img.style,{objectFit:'contain',objectPosition:'center',mixBlendMode:'normal',background:'#fff',display:'block'});img.removeAttribute('srcset');img.decoding='async'}
  function setFallback(img,key){if(!key||img.dataset.hfFallbackApplied==='1')return;img.dataset.hfFallbackApplied='1';img.src=FALLBACKS[key];style(img)}
  function wireExisting(img){const card=img.closest(productCardSel),key=keyFor(card||img);if(card)style(img);if(card&&key&&!img.dataset.hfErrorWired){img.dataset.hfErrorWired='1';img.addEventListener('error',()=>setFallback(img,key),{once:true})}}
  function ensureMissing(){document.querySelectorAll(productCardSel).forEach(card=>{if(card.querySelector('img'))return;const key=keyFor(card);if(!key)return;let media=card.querySelector('.page-product-media,.hf-selection-media,.hf-guide-pick-media,.cardMedia,.product-media,.hub-media');if(!media){media=document.createElement('div');media.className='hf-auto-product-media';card.prepend(media)}const img=document.createElement('img');img.alt=(card.querySelector('h3,h2')?.textContent||key).trim();img.loading='lazy';img.src=FALLBACKS[key];media.appendChild(img);style(img)})}
  function apply(){document.querySelectorAll(productCardSel+' img').forEach(wireExisting);ensureMissing()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  window.addEventListener('load',apply,{once:true});
})();
