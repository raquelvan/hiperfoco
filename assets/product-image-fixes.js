(()=>{
  const IMAGES={
    'delonghi magnifica evo':'https://dam.delonghi.com/902x902/assets/225625',
    'philips serie 3300 lattego':'https://us.home-appliances.philips/cdn/shop/files/3300_2_3000x3000_006594e4-c53f-426d-b9d6-04c3bf61a317_1946x.jpg?v=1765219594',
    'delonghi rivelia':'https://dam.delonghi.com/902x902/assets/269456',
    'delonghi magnifica s':'https://dam.delonghi.com/902x902/assets/223655',
    'philips serie 5500 lattego':'https://f.nooncdn.com/p/pzsku/ZF10CCB17E177B5E94999Z/45/_/1780913314/9dda2774-22f7-4a75-8ed7-f1c2a9fa6a2a.jpg'
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
      img.removeAttribute('srcset');
      img.src=src;
      img.style.objectFit='contain';
      img.style.objectPosition='center';
      img.style.mixBlendMode='normal';
      img.style.background='#fff';
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',apply);
})();
