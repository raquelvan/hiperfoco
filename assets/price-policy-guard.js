(()=>{
  const numericValue=text=>{const m=String(text||'').match(/\d[\d.]*,\d{2}|\d+(?:[.,]\d+)?/);return m?Number(m[0].replace(/\./g,'').replace(',','.')):NaN};
  const priceEl=row=>row?.querySelector('.offer-value,.s2-offer > strong');
  const storeName=row=>row?.querySelector('.offer-shop strong,.s2-offer b')?.textContent.trim()||'';
  function guardGifts(){
    if(!location.pathname.startsWith('/regalos/'))return;
    document.querySelectorAll('.gift4-product').forEach(card=>{
      if(card.querySelector('a[href*="amazon" i],a[href*="link.amazon" i]')){
        const p=card.querySelector('.gift4-price');if(p)p.textContent='Ver precio';
      }
    });
    document.querySelectorAll('.s3-table tbody tr').forEach(row=>{const cells=row.querySelectorAll('td');if(cells.length>1)cells[1].textContent='Ver precio';});
  }
  function guardReviews(){
    if(!location.pathname.startsWith('/reviews/'))return;
    const rows=[...document.querySelectorAll('#precios .offer-row,#precios .s2-offer')];
    if(!rows.length)return;
    rows.forEach(row=>{
      if(/^Amazon$/i.test(storeName(row))){const p=priceEl(row);if(p)p.textContent='Ver precio';row.classList.remove('best');row.querySelector('.weekly-best,.best-label')?.remove();}
    });
    const candidates=rows.map(row=>({row,p:priceEl(row),v:numericValue(priceEl(row)?.textContent),store:storeName(row)})).filter(x=>x.store&&!/^Amazon$/i.test(x.store)&&Number.isFinite(x.v)).sort((a,b)=>a.v-b.v);
    rows.forEach(r=>{if(!/^Amazon$/i.test(storeName(r)))r.classList.remove('best');r.querySelector('.weekly-best')?.remove();});
    const best=candidates[0];
    if(best){
      best.row.classList.add('best');
      const holder=best.row.querySelector('.offer-shop,.s2-offer > div');
      if(holder&&!holder.querySelector('.weekly-best'))holder.insertAdjacentHTML('afterbegin','<em class="weekly-best">Mejor precio verificado</em>');
    }
    const summary=document.querySelector('#precios .best-price-main,#precios .s2-price-summary > strong');
    const display=best?.p?.textContent.trim()||'Ver precio';
    if(summary)summary.textContent=display;
    if(location.pathname.endsWith('/delonghi-magnifica-evo.html')){
      document.querySelectorAll('a.btn-main[href="#precios"]').forEach(a=>a.textContent=`Ver mejor precio${display==='Ver precio'?'':` · ${display}`} →`);
      document.querySelectorAll('script[type="application/ld+json"]').forEach(s=>{try{const j=JSON.parse(s.textContent);const graph=j['@graph']||[j];const vals=candidates.map(x=>x.v);graph.forEach(n=>{if(n['@type']==='Product'&&n.offers){if(vals.length){n.offers.lowPrice=Math.min(...vals).toFixed(2);n.offers.highPrice=Math.max(...vals).toFixed(2);n.offers.offerCount=vals.length}else{delete n.offers.lowPrice;delete n.offers.highPrice;}}});s.textContent=JSON.stringify(j)}catch{}});
    }
  }
  function run(){guardGifts();guardReviews()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,100);setTimeout(run,500);setTimeout(run,1500)},{once:true});else{run();setTimeout(run,100);setTimeout(run,500)}
})();
