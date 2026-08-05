
const searchForm = document.querySelector('[data-search]');
searchForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = searchForm.querySelector('input').value.toLowerCase().trim();
  const routes = [
    ['philips', 'reviews/philips-3300-lattego.html'],
    ['rivelia', 'reviews/delonghi-rivelia.html'],
    ['magnifica s', 'reviews/delonghi-magnifica-s.html'],
    ['magnifica', 'reviews/delonghi-magnifica-evo.html'],
    ['regalo', 'regalos/index.html'],
    ['aspirador', 'guias/mejores-aspiradoras-sin-cable-2026.html'],
    ['cafetera', 'categorias/cafe.html']
  ];
  const result = routes.find(([term]) => query.includes(term));
  window.location.href = result ? result[1] : 'reviews/index.html';
});
document.querySelectorAll('[data-news]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('La newsletter se conectará antes del lanzamiento público.');
  });
});
