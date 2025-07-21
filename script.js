// Handle year
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav toggle (mobile)
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Portfolio gallery population
  const gallery = document.getElementById('gallery');
  const template = document.getElementById('pieceTemplate');

  if (gallery && template) {
    fetch('data/pieces.json')
      .then(r => r.json())
      .then(items => {
        items.forEach(item => {
          const node = template.content.cloneNode(true);
          const fig = node.querySelector('.piece');
          const img = node.querySelector('img');
          const cap = node.querySelector('figcaption');
          fig.dataset.style = item.style;
          img.src = item.src;
          img.alt = item.alt || item.caption || item.style;
          cap.textContent = item.caption || item.style;
          gallery.appendChild(node);
        });
        initFiltering();
      })
      .catch(err => {
        console.error('Gallery load error:', err);
        gallery.innerHTML = '<p>Unable to load portfolio right now.</p>';
      });
  }

  function initFiltering(){
    const buttons = document.querySelectorAll('.filters .filter');
    const pieces = Array.from(document.querySelectorAll('.piece'));
    buttons.forEach(btn => btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      pieces.forEach(p => {
        const show = filter === 'all' || p.dataset.style === filter;
        p.classList.toggle('hidden', !show);
      });
    }));
  }
  function renderEvents() {
  fetch('data/events.json')
    .then(r => r.json())
    .then(data => {
      const container = document.getElementById('events-list');
      data.events.sort((a, b) => new Date(a.date) - new Date(b.date));
      data.events.forEach(evt => {
        const art = document.createElement('article');
        art.className = 'event';
        art.innerHTML = `
          <img src="${evt.image || 'assets/placeholder.jpg'}" alt="${evt.title}" loading="lazy">
          <div class="event-info">
            <h3>${evt.title}</h3>
            <time datetime="${evt.date}">${new Date(evt.date).toLocaleDateString()}</time>
            <p>${evt.description}</p>
          </div>
        `;
        container.appendChild(art);
      });
    });
}

window.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initFilters();
  if (document.getElementById('events-list')) renderEvents();
});
});