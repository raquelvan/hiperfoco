(()=>{
  const FALLBACKS={
    'delonghi magnifica evo':'/assets/approved/magnifica-evo-v3.jpg',
    'philips serie 3300 lattego':'/assets/approved/philips-3300-v3.jpg',
    'delonghi rivelia':'/assets/approved/rivelia-v3.jpg',
    'delonghi magnifica s':'/assets/approved/magnifica-s-v3.jpg',
    'philips serie 5500 lattego':'/assets/approved/philips-5500-v3.webp',
    'jbl clip 5':'https://m.media-amazon.com/images/I/41jYyKRVqmL._AC_CX679_.jpg',
    'jbl flip 6':'https://m.media-amazon.com/images/I/71H4arZ12jL._AC_SL1500_.jpg',
    'sony wh ch720n':'https://m.media-amazon.com/images/I/51rpbVmi9XL._AC_SL1200_.jpg'
  };
  const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const KEYS=Object.keys(FALLBACKS);
  const cardSel='.card,.product-page-card,.comparison-card,.review-card,.reviewCard,.hf-selection-card,.hf-guide-pick,article.product-card,.hub-card';
  function keyFor(node){const n=norm([node?.getAttribute?.('alt'),node?.querySelector?.('h3')?.textContent,node?.querySelector?.('h2')?.textContent,node?.textContent].filter(Boolean).join(' '));return KEYS.find(k=>n.includes(norm(k)))||null}
  function style(img){Object.assign(img.style,{objectFit:'contain',objectPosition:'center',mixBlendMode:'normal',background:'#fff',display:'block'});img.removeAttribute('srcset');img.decoding='async'}
  function setFallback(img,key){if(!key||img.dataset.hfFallbackApplied==='1')return;img.dataset.hfFallbackApplied='1';img.src=FALLBACKS[key];style(img)}
  function wireExisting(img){const card=img.closest(cardSel),key=keyFor(card||img);style(img);if(key&&!img.dataset.hfErrorWired){img.dataset.hfErrorWired='1';img.addEventListener('error',()=>setFallback(img,key),{once:true})}}
  function ensureMissing(){document.querySelectorAll(cardSel).forEach(card=>{if(card.querySelector('img'))return;const key=keyFor(card);if(!key)return;let media=card.querySelector('.page-product-media,.hf-selection-media,.hf-guide-pick-media,.cardMedia,.product-media,.hub-media');if(!media){media=document.createElement('div');media.className='hf-auto-product-media';card.prepend(media)}const img=document.createElement('img');img.alt=(card.querySelector('h3,h2')?.textContent||key).trim();img.loading='lazy';img.src=FALLBACKS[key];media.appendChild(img);style(img)})}
  function apply(){document.querySelectorAll('img').forEach(wireExisting);ensureMissing()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  window.addEventListener('load',apply,{once:true});
})();
