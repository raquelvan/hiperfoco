
const toggle=document.querySelector('.mobile-toggle');
const mobile=document.querySelector('.mobile-menu');
toggle?.addEventListener('click',()=>mobile.classList.toggle('open'));
document.querySelectorAll('[data-newsletter]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();form.querySelector('button').textContent='¡Apuntada!';form.reset();}));
const search=document.querySelector('[data-search]');
search?.addEventListener('submit',e=>{e.preventDefault();const q=search.querySelector('input').value.toLowerCase();if(q.includes('philips'))location.href='reviews/philips-3300-lattego.html';else if(q.includes('rivelia'))location.href='reviews/delonghi-rivelia.html';else if(q.includes('regalo'))location.href='regalos/index.html';else if(q.includes('aspir'))location.href='guias/mejores-aspiradoras-sin-cable-2026.html';else location.href='categorias/cafe.html';});
