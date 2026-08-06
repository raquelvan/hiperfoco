(()=>{
  const applyImmediateFixes=()=>{
    const heading=[...document.querySelectorAll('h2')].find(el=>el.textContent.trim().startsWith('Si fuera mi dinero'));
    if(heading){
      heading.textContent='Qué opción elegir';
      const intro=heading.nextElementSibling;
      if(intro&&intro.tagName==='P') intro.textContent='Una recomendación clara según lo que quieras gastar.';
    }
    const style=document.createElement('style');
    style.textContent=`
      .money-grid{gap:10px!important}
      .money{display:block!important;min-height:0!important;padding:15px 16px!important;overflow:hidden!important}
      .money-icon,.money-icon svg{display:none!important;width:0!important;height:0!important;min-width:0!important;min-height:0!important;max-width:0!important;max-height:0!important;margin:0!important;padding:0!important}
      .money h3{font-size:1.05rem!important;line-height:1.2!important;margin:0 0 5px!important}
      .money p{font-size:.8rem!important;line-height:1.45!important;margin:0!important}
      @media(max-width:700px){
        .review-product,.hero-product{min-height:205px!important;height:205px!important;padding:14px 20px 18px!important;overflow:hidden!important;display:flex!important;align-items:center!important;justify-content:center!important}
        .review-product img,.hero-product img{display:block!important;width:auto!important;height:auto!important;max-width:205px!important;max-height:178px!important;object-fit:contain!important;object-position:center!important;margin:auto!important;transform:none!important}
        .money-grid{grid-template-columns:1fr!important;gap:8px!important}
        .money{display:block!important;padding:13px 14px!important;min-height:0!important}
        .money h3{font-size:1rem!important;margin:0 0 4px!important}
        .money p{font-size:.76rem!important;line-height:1.4!important}
        .bottom-grid>div>h2{font-size:1.8rem!important}
        .bottom-grid>div>h2+p{font-size:.82rem!important;margin-bottom:10px!important}
      }
    `;
    document.head.appendChild(style);
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',applyImmediateFixes,{once:true});
  else applyImmediateFixes();

  const legacy=document.createElement('script');
  legacy.src='https://raw.githubusercontent.com/raquelvan/hiperfoco/5e76fe3cfe38bd7eb8c2cf1e41f7daab3a87fa2c/assets/app.js';
  legacy.onload=applyImmediateFixes;
  legacy.onerror=applyImmediateFixes;
  document.head.appendChild(legacy);
})();