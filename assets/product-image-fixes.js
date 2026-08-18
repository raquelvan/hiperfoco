(()=>{
  const IMAGES={
    'delonghi magnifica evo':'/assets/images/product-magnifica-evo.webp',
    'philips serie 3300 lattego':'/assets/images/product-philips-3300.webp',
    'delonghi rivelia':'/assets/images/product-rivelia.webp',
    'delonghi magnifica s':'/assets/images/product-magnifica-s.webp',
    'philips serie 5500 lattego':'https://www.cf-dam.vbs.versuni.com/adaptivemedia/rendition?format=webp&height=2048&id=1b7fcdc9342844c53c459e83b581f786dec466bf&width=2048'
  };
  const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  function keyFor(img){
    const card=img.closest('.card,.product-page-card,.comparison-card,.review-card,.gift4-product,article,a');
    const text=[img.alt,card?.querySelector('h3')?.textContent,card?.querySelector('h2')?.textContent,document.querySelector('h1')?.textContent].filter(Boolean).join(' ');
    const n=norm(text);
    return Object.keys(IMAGES).find(k=>n.includes(norm(k)))||null;
  }
  function apply(){
    document.querySelectorAll('img').forEach(img=>{
      const key=keyFor(img);if(!key)return;
      const src=IMAGES[key];
      if(img.dataset.hfCleanProduct===key)return;
      img.dataset.hfCleanProduct=key;
      img.removeAttribute('srcset');img.src=src;
      img.style.objectFit='contain';img.style.objectPosition='center';img.style.mixBlendMode='normal';img.style.background='#fff';
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true});window.addEventListener('load',apply);
})();