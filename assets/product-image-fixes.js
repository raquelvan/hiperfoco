(()=>{
  const FALLBACKS={
    'delonghi magnifica evo':'https://dam.delonghi.com/902x902/assets/225625',
    'philips serie 3300 lattego':'https://ferbod.com/cdn/shop/files/cdc120be-Philips-Series-3300-Fully-automatic-espresso-machine-EP334790-2.webp?v=1771354052&width=1445',
    'delonghi rivelia':'https://dam.delonghi.com/902x902/assets/269456',
    'delonghi magnifica s':'https://dam.delonghi.com/902x902/assets/223655',
    'philips serie 5500 lattego':'https://www.cf-dam.vbs.versuni.com/adaptivemedia/rendition?format=webp&height=2048&id=1b7fcdc9342844c53c459e83b581f786dec466bf&width=2048',
    'jbl clip 5':'https://m.media-amazon.com/images/I/41jYyKRVqmL._AC_CX679_.jpg',
    'jbl flip 6':'https://m.media-amazon.com/images/I/71H4arZ12jL._AC_SL1500_.jpg',
    'sony wh ch720n':'https://m.media-amazon.com/images/I/51rpbVmi9XL._AC_SL1200_.jpg',
    'razer blackshark v2 x':'https://m.media-amazon.com/images/I/71R8hF+vYkL._AC_SL1500_.jpg',
    'anker nano power bank':'https://m.media-amazon.com/images/I/61pUul1oDlL._AC_SL1500_.jpg',
    'anker cargador nano usb c':'https://m.media-amazon.com/images/I/51tVD2d2QmL._AC_SL1500_.jpg',
    'amazon echo dot':'https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SL1000_.jpg',
    'amazon fire tv stick 4k':'https://m.media-amazon.com/images/I/51TjJOTfslL._AC_SL1000_.jpg',
    'tp link tapo c200':'https://m.media-amazon.com/images/I/51g3R+eJmJL._AC_SL1000_.jpg',
    'kindle paperwhite':'https://m.media-amazon.com/images/I/81swm2WdawL._AC_SY741_.jpg',
    'aeropress':'https://m.media-amazon.com/images/I/71u+LDMJQ5L._AC_SL1500_.jpg',
    'hario v60':'https://m.media-amazon.com/images/I/61W0xEO3eML._AC_SL1500_.jpg',
    'timemore c3':'https://m.media-amazon.com/images/I/61H6vCjKXQL._AC_SL1500_.jpg',
    'wacaco nanopresso':'https://m.media-amazon.com/images/I/61yc+O3IuGL._AC_SL1500_.jpg',
    'apple airtag':'https://m.media-amazon.com/images/I/314YPlM+dcS._SL500_.jpg',
    'fujifilm instax mini 12':'https://m.media-amazon.com/images/I/61+jaO2GeDL.jpg',
    'lego star wars r2 d2':'https://m.media-amazon.com/images/I/81qF8QW0WGL._AC_SL1500_.jpg',
    '8bitdo ultimate controller':'https://m.media-amazon.com/images/I/61l7q7kXoIL._AC_SL1500_.jpg'
  };
  const BAD_LOCAL=/\/assets\/images\/(?:product-magnifica-evo|product-philips-3300|product-rivelia|product-magnifica-s)\.webp/i;
  const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const KEYS=Object.keys(FALLBACKS);
  const cardSel='.card,.product-page-card,.comparison-card,.review-card,.reviewCard,.gift4-product,.hf-selection-card,.hf-guide-pick,article.product-card,a.product-card';
  function keyFor(node){const n=norm([node?.getAttribute?.('alt'),node?.querySelector?.('h3')?.textContent,node?.querySelector?.('h2')?.textContent,node?.querySelector?.('.product-name')?.textContent,node?.textContent].filter(Boolean).join(' '));return KEYS.find(k=>n.includes(norm(k)))||null}
  function style(img){Object.assign(img.style,{objectFit:'contain',objectPosition:'center',mixBlendMode:'normal',background:'#fff',display:'block'});img.removeAttribute('srcset');img.decoding='async'}
  function setFallback(img,key){if(!key)return;img.dataset.hfFallbackApplied='1';img.src=FALLBACKS[key];style(img);img.onerror=()=>{img.style.display='none';img.closest('.hf-auto-product-media,.page-product-media,.hf-selection-media,.hf-guide-pick-media,.gift4-media,.cardMedia,.product-media')?.classList.add('hf-photo-missing')}}
  function wireExisting(img){const card=img.closest(cardSel),key=keyFor(card||img);style(img);if(key&&BAD_LOCAL.test(img.getAttribute('src')||'')){setFallback(img,key);return}if(key&&!img.dataset.hfErrorWired){img.dataset.hfErrorWired='1';img.addEventListener('error',()=>{if(img.dataset.hfFallbackApplied!=='1')setFallback(img,key)},{once:true})}}
  function ensureMissing(){document.querySelectorAll(cardSel).forEach(card=>{if(card.querySelector('img'))return;const key=keyFor(card);if(!key)return;let media=card.querySelector('.page-product-media,.hf-selection-media,.hf-guide-pick-media,.gift4-media,.cardMedia,.product-media');if(!media){media=document.createElement('div');media.className='hf-auto-product-media';card.prepend(media)}const img=document.createElement('img');img.alt=(card.querySelector('h3,h2')?.textContent||key).trim();img.loading='lazy';media.appendChild(img);setFallback(img,key)})}
  function apply(){document.querySelectorAll('img').forEach(wireExisting);ensureMissing()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  window.addEventListener('load',apply);setTimeout(apply,350);new MutationObserver(()=>requestAnimationFrame(apply)).observe(document.documentElement,{childList:true,subtree:true});
})();
