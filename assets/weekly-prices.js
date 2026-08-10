(()=>{
  const REVIEWED='10 de agosto de 2026';
  const giftPrices={
    'Amazon Echo Dot (5.ª gen)':'Ver precio',
    'Amazon Fire TV Stick 4K':'69,99 €',
    'Apple AirTag':'29,99 €',
    'Anker Nano Power Bank':'Ver precio',
    'Anker cargador Nano USB-C':'Ver precio',
    'TP-Link Tapo C200':'Ver precio',
    'Kindle Paperwhite':'179,99 €',
    'JBL Clip 5':'Ver precio',
    'JBL Flip 6':'Ver precio',
    'Sony WH-CH720N':'69,00 €',
    'Fujifilm Instax Mini 12':'Ver precio',
    'LEGO Icons Ramo de Rosas':'59,99 €',
    'Kodak Mini 2 Retro':'87,99 €',
    'Ember Mug 2':'Ver precio',
    'AeroPress':'Ver precio',
    'Hario V60':'Ver precio',
    'Timemore C3':'Ver precio',
    'Wacaco Nanopresso':'Ver precio',
    'Adaptador universal SKROSS':'Ver precio',
    'Cubos organizadores BAGAIL':'Ver precio',
    'Báscula digital de equipaje':'Ver precio',
    'LEGO Star Wars R2-D2':'Ver precio',
    'Razer BlackShark V2 X':'Ver precio',
    '8BitDo Ultimate Controller':'Ver precio'
  };

  const reviewPrices={
    'delonghi-magnifica-evo':{
      best:'388,53 €',
      stores:[
        {store:'PcComponentes',price:'388,53 €'},
        {store:'Carrefour',price:'399 €'},
        {store:'MediaMarkt',price:'459,92 €'},
        {store:'Worten',price:'Ver precio'},
        {store:'El Corte Inglés',price:'Ver precio'},
        {store:'Amazon',price:'480,01 €'}
      ]
    },
    'delonghi-magnifica-s':{
      best:'279,00 €',
      stores:[
        {store:'Amazon',price:'299,99 €'},
        {store:'MediaMarkt',price:'279,00 €'},
        {store:'PcComponentes',match:'ECAM21.110',price:'Ver precio'},
        {store:'PcComponentes',match:'ECAM21.117',price:'300 €'},
        {store:'Web oficial',price:'Ver precio'}
      ]
    },
    'delonghi-rivelia':{
      best:'519,00 €',
      stores:[
        {store:'De’Longhi',price:'Ver precio'},
        {store:'Amazon',price:'519,00 €'},
        {store:'MediaMarkt',price:'519,00 €'},
        {store:'PcComponentes',price:'519,00 €'}
      ]
    },
    'philips-3300-lattego':{
      best:'456,52 €',
      stores:[
        {store:'Philips',price:'Ver precio'},
        {store:'Amazon',price:'456,52 €'},
        {store:'MediaMarkt',price:'492,73 €'},
        {store:'PcComponentes',price:'Ver precio'}
      ]
    },
    'philips-5500-lattego':{
      best:'Ver precio',
      stores:[
        {store:'Amazon',price:'Ver precio'},
        {store:'Philips',price:'Ver precio'},
        {store:'MediaMarkt',price:'Ver precio'},
        {store:'PcComponentes',price:'Ver precio'}
      ]
    },
    'nespresso-vertuo-plus':{
      best:'Ver precio',
      stores:[
        {store:'Amazon',price:'Ver precio'},
        {store:'Krups',price:'Ver precio'},
        {store:'MediaMarkt',price:'Ver precio'},
        {store:'Carrefour',price:'Ver precio'}
      ]
    },
    'ninja-af400':{
      best:'236,66 €',
      stores:[
        {store:'Ninja',price:'Ver precio'},
        {store:'Amazon',price:'Ver precio'},
        {store:'MediaMarkt',price:'236,66 €'},
        {store:'PcComponentes',price:'239,89 €'}
      ]
    }
  };

  const numeric=p=>/^\d/.test(String(p||''));
  const value=p=>parseFloat(String(p).replace(/[^\d,]/g,'').replace(',','.'));

  function updateGift(){
    document.querySelectorAll('.gift4-product').forEach(card=>{
      const name=card.querySelector('h3')?.textContent.trim();
      const price=giftPrices[name];
      const el=card.querySelector('.gift4-price');
      if(price&&el)el.textContent=price;
    });
    document.querySelectorAll('.s3-table tbody tr').forEach(row=>{
      const td=row.querySelectorAll('td');
      if(td.length>1){const p=giftPrices[td[0].textContent.trim()];if(p)td[1].textContent=p;}
    });
    const meta=document.querySelector('.gift4-guide .s3-meta');
    if(meta&&/Actualizado el /i.test(meta.textContent))meta.textContent=meta.textContent.replace(/Actualizado el .*?(?= ·|$)/i,`Actualizado el ${REVIEWED}`);
  }

  function findRow(rows,cfg){
    return rows.find(r=>{
      const store=r.querySelector('.offer-shop strong,.s2-offer b')?.textContent.trim();
      const detail=r.querySelector('.offer-shop small,.s2-offer small')?.textContent||'';
      return store===cfg.store&&(!cfg.match||detail.includes(cfg.match));
    });
  }

  function updateReview(){
    const slug=location.pathname.split('/').pop()?.replace('.html','');
    const cfg=reviewPrices[slug];
    if(!cfg)return;
    const rows=[...document.querySelectorAll('#precios .offer-row,#precios .s2-offer')];
    if(!rows.length)return;
    rows.forEach(r=>{r.classList.remove('best');r.querySelector('.weekly-best')?.remove();});
    cfg.stores.forEach(s=>{
      const row=findRow(rows,s);if(!row)return;
      const price=row.querySelector('.offer-value,.s2-offer > strong');
      if(price)price.textContent=s.price;
    });
    const verified=cfg.stores.filter(s=>numeric(s.price)).sort((a,b)=>value(a.price)-value(b.price));
    if(verified.length){
      const bestRow=findRow(rows,verified[0]);
      if(bestRow){bestRow.classList.add('best');const holder=bestRow.querySelector('.offer-shop,.s2-offer > div');if(holder&&!holder.querySelector('.weekly-best'))holder.insertAdjacentHTML('afterbegin','<em class="weekly-best">Mejor precio verificado</em>');}
    }
    const summary=document.querySelector('#precios .best-price-main,#precios .s2-price-summary > strong');
    if(summary)summary.textContent=cfg.best;
    const upd=document.querySelector('#precios .price-update');
    if(upd)upd.textContent=`Revisado el ${REVIEWED}. Precios y stock pueden cambiar.`;
    const small=document.querySelector('#precios .s2-price-summary small');
    if(small)small.textContent=`Revisado el ${REVIEWED}. Precios y disponibilidad pueden cambiar. Comprueba siempre modelo, vendedor, envío y condiciones.`;

    if(slug==='delonghi-magnifica-evo'){
      document.querySelectorAll('a.btn-main[href="#precios"]').forEach(a=>a.textContent=`Ver mejor precio · ${cfg.best} →`);
      document.querySelectorAll('#faq details').forEach(d=>{const q=d.querySelector('summary')?.textContent||'';const p=d.querySelector('p');if(p&&/mejor precio/i.test(q))p.textContent='El precio más bajo comprobado es 388,53 € en PcComponentes, seguido de 399 € en Carrefour.';});
      document.querySelectorAll('script[type="application/ld+json"]').forEach(s=>{
        try{const j=JSON.parse(s.textContent);const all=j['@graph']||[j];all.forEach(n=>{if(n['@type']==='Product'&&n.offers){n.offers.lowPrice='388.53';n.offers.highPrice='480.01';}if(n['@type']==='FAQPage')n.mainEntity?.forEach(q=>{if(/mejor precio/i.test(q.name||''))q.acceptedAnswer.text='El precio más bajo comprobado es 388,53 € en PcComponentes. Los precios y el stock pueden cambiar.';});});s.textContent=JSON.stringify(j);}catch{ }
      });
    }
  }

  function run(){updateGift();updateReview();}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,50);setTimeout(run,250);setTimeout(run,1000);setTimeout(run,3000);});
})();
