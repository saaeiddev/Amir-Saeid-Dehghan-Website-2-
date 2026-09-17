(() => {
  'use strict';

  const DATA = window.PORTFOLIO_DATA;
  if (!DATA) return;

  function applyCover(host, item, mode = 'cover') {
    if (!host || !item?.cover || host.dataset.coverApplied === 'true') return;
    host.dataset.coverApplied = 'true';
    host.classList.add('has-real-cover');

    const fallback = document.createElement('span');
    fallback.className = 'cover-fallback';
    fallback.textContent = item.code || item.title || 'Cover';

    const img = document.createElement('img');
    img.src = item.cover;
    img.alt = item.coverAlt || `${item.title || 'Media'} original cover artwork`;
    img.decoding = 'async';
    img.loading = mode === 'featured' ? 'eager' : 'lazy';
    img.referrerPolicy = 'no-referrer';
    img.addEventListener('error', () => host.classList.add('cover-failed'), { once: true });

    host.replaceChildren(fallback, img);
  }

  function enhanceMusic(win) {
    const featured = DATA.music?.[0];
    applyCover(win.querySelector('.big-album'), featured, 'featured');
    win.querySelectorAll('.track').forEach((track, index) => {
      applyCover(track.querySelector('.album-thumb'), DATA.music?.[index]);
      const time = track.querySelector('time');
      if (time && DATA.music?.[index]?.duration) time.textContent = DATA.music[index].duration;
    });
  }

  function enhanceMediaWindow(win, items) {
    win.querySelectorAll('.media-item').forEach((card, index) => {
      applyCover(card.querySelector('.media-cover'), items?.[index]);
    });
  }

  function enhanceWindow(win) {
    if (!(win instanceof Element)) return;
    const id = win.dataset.window;
    if (id === 'music') enhanceMusic(win);
    if (id === 'games') enhanceMediaWindow(win, DATA.games);
    if (id === 'movies') enhanceMediaWindow(win, DATA.movies);
  }

  function enhanceDetail() {
    const card = document.getElementById('detail-card');
    if (!card || !card.children.length) return;
    const title = card.querySelector('h2')?.textContent?.trim();
    if (!title) return;
    const movie = DATA.movies?.find(item => item.title === title);
    if (movie) applyCover(card.querySelector('.detail-hero'), movie, 'featured');
  }

  function enhanceAll() {
    document.querySelectorAll('.finder-window').forEach(enhanceWindow);
    enhanceDetail();
  }

  const observer = new MutationObserver(() => requestAnimationFrame(enhanceAll));
  observer.observe(document.body, { childList: true, subtree: true });
  enhanceAll();
})();
