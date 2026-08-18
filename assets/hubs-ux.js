(()=>{
  function init(){
    const root=document.querySelector('[data-hub]');
    if(!root)return;
    const cards=[...root.querySelectorAll('[data-card]')];
    const input=document.querySelector('[data-hub-search]');
    const buttons=[...document.querySelectorAll('[data-hub-filter]')];
    const empty=root.querySelector('.hub-empty')||document.querySelector('.hub-empty');
    let filter='all';

    function run(){
      const q=(input?.value||'').toLowerCase().trim();
      let visible=0;
      cards.forEach(card=>{
        const tags=(card.dataset.tags||'').toLowerCase();
        const text=(card.textContent||'').toLowerCase();
        const okFilter=filter==='all'||tags.split(/\s+/).includes(filter);
        const okSearch=!q||text.includes(q)||tags.includes(q);
        const show=okFilter&&okSearch;
        card.style.display=show?'':'none';
        card.setAttribute('aria-hidden',show?'false':'true');
        if(show)visible++;
      });
      if(empty)empty.style.display=visible?'none':'block';
    }

    buttons.forEach(btn=>btn.addEventListener('click',e=>{
      e.preventDefault();
      filter=btn.dataset.hubFilter||'all';
      buttons.forEach(b=>{
        const active=b===btn;
        b.classList.toggle('active',active);
        b.setAttribute('aria-pressed',String(active));
      });
      run();
    }));
    input?.addEventListener('input',run);
    run();
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
})();
