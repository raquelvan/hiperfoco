(()=>{
  const FALLBACKS={cafe:'/assets/images/gift-cafe.webp',gaming:'/assets/images/gift-gamers.webp',tecnologia:'/assets/images/gift-casa.webp',viajes:'/assets/images/gift-viajeros.webp',cocina:'/assets/images/gift-cocina.webp',default:'/assets/images/gift-todo.webp'};
  const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  let catalog=null;

  function fallbackFor(product){return FALLBACKS[product?.category]||FALLBACKS.default;}
  function allProducts(){return Object.entries(catalog?.products||{});}
  function matchProduct(name){
    const n=norm(name);if(!n)return null;
    let best=null,bestScore=0;
    for(const [key,p] of allProducts()){
      const pn=norm(`${p.name||''} ${p.model||''}`);
      let score=0;
      if(n===norm(p.name))score=100;
      else if(n.includes(norm(p.name))||norm(p.name).includes(n))score=80;
      else {for(const t of n.split(' ').filter(x=>x.length>3))if(pn.includes(t))score+=5;}
      if(score>bestScore){best={key,p};bestScore=score;}
    }
    return bestScore>=10?best:null;
  }

  function ensureImage(img,product){
    if(!img)return;
    const desired=product?.image||'';
    if(desired&&img.src!==desired){img.dataset.previousSrc=img.src;img.src=desired;}
    img.onerror=()=>{
      const fallback=fallbackFor(product);
      if(img.src.endsWith(fallback))return;
      img.src=fallback;
      img.classList.add('affiliate-fallback-image');
    };
  }

  function ensureAffiliateButton(card,product){
    const url=product?.affiliate?.tradedoubler;if(!url)return;
    let buy=card.querySelector('.gift4-buy');
    if(!buy)return;
    let a=buy.querySelector('[data-catalog-affiliate="tradedoubler"]');
    if(!a){a=document.createElement('a');a.className='aff2';a.dataset.catalogAffiliate='tradedoubler';a.target='_blank';a.rel='nofollow sponsored noopener';buy.appendChild(a);}
    a.href=url;
    a.textContent=`${product.merchant||'Ver oferta'} →`;
  }

  function applyToCard(card){
    const heading=card.querySelector('h3');if(!heading)return;
    const match=matchProduct(heading.textContent);if(!match)return;
    const p=match.p;card.dataset.productKey=match.key;
    ensureImage(card.querySelector('img'),p);
    ensureAffiliateButton(card,p);
    if(p.price){
      const price=card.querySelector('.gift4-price');
      if(price&&(!price.textContent.trim()||/ver precio/i.test(price.textContent)))price.textContent=String(p.price);
    }
  }

  function addPhilips5500ToCafe(){
    if(!/\/categoria\/cafe\.html$/.test(location.pathname))return;
    const grid=document.querySelector('.product-page-grid');if(!grid||grid.querySelector('[data-product-key="philips-5500"]')||[...grid.querySelectorAll('h3')].some(h=>/5500 lattego/i.test(h.textContent)))return;
    const p=catalog?.products?.['philips-5500'];if(!p)return;
    const a=document.createElement('a');a.className='page-card product-page-card';a.href=p.review||'../reviews/philips-5500-lattego.html';a.dataset.productKey='philips-5500';
    a.innerHTML=`<span class="page-product-media"><img src="${p.image||fallbackFor(p)}" alt="Philips Serie 5500 LatteGo EP5544/80 cafetera superautomática" loading="lazy" decoding="async"></span><div><h3>Philips Serie 5500 LatteGo</h3><p>Más recetas y perfiles para hogares con gustos distintos.</p><b>Abrir →</b></div>`;
    grid.appendChild(a);ensureImage(a.querySelector('img'),p);
  }

  function apply(){
    document.querySelectorAll('.gift4-product,.product-page-card,.review-grid .card').forEach(applyToCard);
    addPhilips5500ToCafe();
    document.querySelectorAll('img').forEach(img=>{
      if(img.dataset.globalFallback==='1')return;img.dataset.globalFallback='1';
      const old=img.onerror;img.addEventListener('error',()=>{
        if(img.dataset.productFallbackApplied==='1')return;
        const card=img.closest('.gift4-product,.product-page-card,.review-grid .card');
        const heading=card?.querySelector('h3')?.textContent;
        const match=matchProduct(heading);
        if(match?.p?.image&&img.src!==match.p.image){img.src=match.p.image;return;}
        img.dataset.productFallbackApplied='1';
        const pageCat=/cafe|philips|delonghi|nespresso/i.test(`${location.pathname} ${heading||''}`)?'cafe':/gamer|razer|8bitdo|lego/i.test(`${location.pathname} ${heading||''}`)?'gaming':'default';
        img.src=FALLBACKS[pageCat];
      });
      if(typeof old==='function')img.addEventListener('error',old,{once:true});
    });
  }

  async function init(){
    try{const r=await fetch('/assets/products.json',{cache:'no-store'});if(!r.ok)throw new Error(String(r.status));catalog=await r.json();apply();
      new MutationObserver(()=>apply()).observe(document.body,{childList:true,subtree:true});
      setTimeout(apply,250);setTimeout(apply,1000);
    }catch(e){console.warn('Affiliate catalog unavailable',e);}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
