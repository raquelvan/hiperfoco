(()=>{
  const style=document.createElement('style');
  style.textContent='.gift4-media{background:#f5f7f6!important}.gift4-media img{object-fit:contain!important;object-position:center!important;padding:8px!important}.gift4-media.no-photo{display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;padding:14px!important}.gift4-media.no-photo span{display:block!important;font:700 .68rem/1.35 Inter,system-ui!important;color:#68756f!important}.gift4-media.no-photo span:before{content:"Imagen de producto pendiente";display:block}.gift4-media.no-photo img{display:none!important}';
  document.head.appendChild(style);
  function arm(img){
    if(!img||img.dataset.hfArmed==='1')return;
    img.dataset.hfArmed='1';
    const fail=()=>{const media=img.closest('.gift4-media');if(!media)return;media.classList.add('no-photo');const label=media.querySelector('span');if(label)label.textContent='';};
    img.addEventListener('error',fail,{once:true});
    if(img.complete&&img.naturalWidth===0)fail();
  }
  function run(){document.querySelectorAll('.gift4-media img').forEach(arm)}
  document.addEventListener('DOMContentLoaded',run);
  new MutationObserver(run).observe(document.documentElement,{childList:true,subtree:true});
})();