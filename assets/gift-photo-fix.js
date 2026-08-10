(()=>{
  const photos={
    'Fujifilm Instax Mini 12':'https://m.media-amazon.com/images/I/61+jaO2GeDL.jpg',
    'Kindle Paperwhite':'https://m.media-amazon.com/images/I/81swm2WdawL._AC_SY741_.jpg',
    'Sony WH-CH720N':'https://m.media-amazon.com/images/I/51rpbVmi9XL._AC_SL1200_.jpg',
    'LEGO Icons Ramo de Rosas':'https://target.scene7.com/is/image/Target/GUEST_c80112c2-b2c0-415a-a0e3-2554874f19ef?qlt=80&wid=1200',
    'Apple AirTag':'https://m.media-amazon.com/images/I/314YPlM+dcS._SL500_.jpg',
    'Kodak Mini 2 Retro':'https://m.media-amazon.com/images/I/41j72OeBFRL._AC_CX679_.jpg',
    'JBL Clip 5':'https://m.media-amazon.com/images/I/41jYyKRVqmL._AC_CX679_.jpg',
    'Ember Mug 2':'https://media.cdn.kaufland.de/product-images/1024x1024/1d4d4bdef81cb7263e6811318ac49a16.jpg'
  };
  function apply(){
    document.querySelectorAll('.gift4-product').forEach(card=>{
      const name=card.querySelector('h3')?.textContent.trim();
      const src=photos[name];
      if(!src)return;
      let media=card.querySelector('.gift4-media');
      if(!media)return;
      media.classList.remove('no-photo');
      let img=media.querySelector('img');
      if(!img){img=document.createElement('img');media.prepend(img);}
      if(img.dataset.realPhoto==='1')return;
      img.dataset.realPhoto='1';
      img.alt=name;
      img.loading='lazy';
      img.decoding='async';
      img.src=src;
      img.onerror=()=>{media.classList.add('no-photo');img.remove();};
    });
  }
  document.addEventListener('DOMContentLoaded',()=>{apply();setTimeout(apply,100);setTimeout(apply,500);setTimeout(apply,1500);});
  new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true});
})();