(() => {
  'use strict';

  if (window.COVER_ENHANCER) return;

  const DATA = window.PORTFOLIO_DATA;
  if (!DATA) return;

  // Resolve moved artwork without rewriting the portfolio's source content.
  const verifiedArtwork = {
    BLY: 'https://thumb.wikimedia.org/wikipedia/en/thumb/6/63/Bully_frontcover.jpg/250px-Bully_frontcover.jpg',
    RRR: 'https://thumb.wikimedia.org/wikipedia/en/thumb/a/ac/Rrr-wii-cover.jpg/250px-Rrr-wii-cover.jpg',
    MP2: 'https://thumb.wikimedia.org/wikipedia/en/thumb/2/21/Max_Payne_2.jpg/250px-Max_Payne_2.jpg',
    RE9: 'https://thumb.wikimedia.org/wikipedia/en/thumb/1/15/Resident_Evil_Requiem_Cover_Art.jpg/250px-Resident_Evil_Requiem_Cover_Art.jpg'
  };

  function applyCover(host, item, mode = 'cover') {
    if (!host || !item?.cover || host.dataset.coverApplied === 'true') return;

    host.dataset.coverApplied = 'true';
    host.classList.add('has-real-cover');

    const fallback = document.createElement('span');
    fallback.className = 'cover-fallback';
    fallback.textContent = item.code || item.title || 'Cover';

    const img = document.createElement('img');
    img.src = verifiedArtwork[item.code] || item.cover;
    img.alt = item.coverAlt || `${item.title || 'Media'} original cover artwork`;
    img.decoding = 'async';
    img.loading = mode === 'featured' ? 'eager' : 'lazy';
    img.referrerPolicy = 'no-referrer';
    img.addEventListener('error', () => {
      host.classList.add('cover-failed');
      fallback.textContent = item.title || 'Artwork unavailable';
    }, { once: true });

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

    const movie = DATA.movies?.find((item) => item.title === title);
    if (movie) applyCover(card.querySelector('.detail-hero'), movie, 'featured');
  }

  function enhanceExisting() {
    document.querySelectorAll('.finder-window').forEach(enhanceWindow);
    enhanceDetail();
  }

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-movie]')) {
      if (typeof queueMicrotask === 'function') queueMicrotask(enhanceDetail);
      else Promise.resolve().then(enhanceDetail);
    }
  });

  window.COVER_ENHANCER = Object.freeze({
    applyCover,
    enhanceWindow,
    enhanceDetail,
    enhanceExisting
  });

  enhanceExisting();
})();