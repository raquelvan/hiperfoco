(()=>{
  function visualFor(text,href){
    const t=(text+' '+href).toLowerCase();
    if(/airfryer|freidora/.test(t))return{img:'/assets/images/guide-airfryer.webp'};
    if(/aspir|robot/.test(t))return{img:/robot/.test(t)?'/assets/images/guide-robot.webp':'/assets/images/guide-aspiradoras.webp'};
    if(/capsul/.test(t))return{img:'/assets/images/guide-capsulas.webp'};
    if(/café|cafe|cafetera/.test(t))return{icon:'☕'};
    if(/wifi|mesh/.test(t))return{icon:'⌁'};
    if(/auricular|audio|música|musica|altavoz/.test(t))return{icon:'◖◗'};
    if(/power|carga|bater/.test(t))return{icon:'⚡'};
    if(/aire|purificador|alerg/.test(t))return{icon:'≈'};
    if(/ipl|personal|depila|secador/.test(t))return{icon:'✧'};
    if(/casa|hogar/.test(t))return{icon:'⌂'};
    if(/gaming|gamer/.test(t))return{icon:'◇'};
    return{icon:'◎'};
  }
  function run(){
    if(!location.pathname.startsWith('/categoria/')||/\/categoria\/?(?:index\.html)?$/.test(location.pathname))return;
    const grid=document.querySelector('main .page-grid');
    if(!grid||grid.dataset.visualized)return;
    grid.dataset.visualized='1';
    // Las categorías que muestran productos reales conservan sus fotos y su plantilla.
    // No reconstruimos esas tarjetas con iconos genéricos.
    if(grid.querySelector('.page-product-media img')){
      grid.classList.add('category-product-grid');
      return;
    }
    grid.classList.add('category-visual-grid');
    grid.classList.remove('page-grid');
    [...grid.querySelectorAll('a.page-card')].forEach(a=>{
      const h=a.querySelector('h3'),p=a.querySelector('p'),title=h?.textContent.trim()||'Explorar',desc=p?.textContent.trim()||'',v=visualFor(title,a.getAttribute('href')||'');
      a.className='category-visual-card';
      const media=v.img?'<img src="'+v.img+'" alt="" loading="lazy">':'<span>'+v.icon+'</span>';
      a.innerHTML='<div class="category-visual-top">'+media+'</div><div class="category-visual-copy"><h3>'+title+'</h3><p>'+desc+'</p><div class="category-chips"><span>Guía útil</span><span>Decisión de compra</span></div></div>';
    });
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run):run();
})();
