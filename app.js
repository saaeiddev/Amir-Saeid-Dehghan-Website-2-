(() => {
  'use strict';

  const DATA = window.PORTFOLIO_DATA;
  const desktopIcons = document.getElementById('desktop-icons');
  const windowLayer = document.getElementById('window-layer');
  const dock = document.getElementById('dock');
  const menuClock = document.getElementById('menu-clock');
  const menuPopover = document.getElementById('menu-popover');
  const photoViewer = document.getElementById('photo-viewer');
  const viewerImage = document.getElementById('viewer-image');
  const viewerCaption = document.getElementById('viewer-caption');
  const detailViewer = document.getElementById('detail-viewer');
  const detailCard = document.getElementById('detail-card');

  const windows = new Map();
  let topZ = 120;
  let photoIndex = 0;
  let selectedDesktopIcon = null;

  const svgIcon = (name) => {
    const paths = {
      music: '<path d="M9 18V6l9-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="15" cy="16" r="3"/>',
      photos: '<rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="9" cy="10" r="2"/><path d="m5 17 4-4 3 3 2-2 5 5"/>',
      projects: '<path d="M4 7h6l2 2h8v10H4z"/><path d="M8 13h8M12 9v8"/>',
      books: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z"/><path d="M8 4v16M11 8h5"/>',
      games: '<path d="M8 9h8a5 5 0 0 1 4.7 6.7l-.6 1.8a2 2 0 0 1-3.4.7L15 16H9l-1.7 2.2a2 2 0 0 1-3.4-.7l-.6-1.8A5 5 0 0 1 8 9Z"/><path d="M7 13h4M9 11v4M16 12h.01M18 14h.01"/>',
      movies: '<rect x="4" y="5" width="16" height="14" rx="3"/><path d="M4 9h16M8 5l2 4M14 5l2 4"/>',
      grid: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>'
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.projects}</svg>`;
  };

  function renderDesktop() {
    desktopIcons.innerHTML = DATA.folders.map((folder) => `
      <button class="desktop-icon" type="button" data-open="${folder.id}" aria-label="Open ${folder.label}">
        <span class="folder-art" style="--accent:${folder.accent}">
          <span class="folder-glyph">${svgIcon(folder.icon)}</span>
        </span>
        <span class="label">${folder.label}</span>
      </button>
    `).join('');

    desktopIcons.addEventListener('click', (event) => {
      const button = event.target.closest('[data-open]');
      if (!button) return;
      if (selectedDesktopIcon) selectedDesktopIcon.classList.remove('selected');
      button.classList.add('selected');
      selectedDesktopIcon = button;

      const coarsePointer = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 820;
      if (coarsePointer) openWindow(button.dataset.open);
    });

    desktopIcons.addEventListener('dblclick', (event) => {
      const button = event.target.closest('[data-open]');
      if (!button || window.matchMedia('(pointer: coarse)').matches) return;
      openWindow(button.dataset.open);
    });

    desktopIcons.addEventListener('keydown', (event) => {
      const icons = [...desktopIcons.querySelectorAll('.desktop-icon')];
      const current = icons.indexOf(document.activeElement);
      if (current < 0) return;
      const cols = window.innerWidth <= 420 ? 2 : window.innerWidth <= 820 ? 3 : 2;
      let next = current;
      if (event.key === 'ArrowRight') next = Math.min(icons.length - 1, current + 1);
      if (event.key === 'ArrowLeft') next = Math.max(0, current - 1);
      if (event.key === 'ArrowDown') next = Math.min(icons.length - 1, current + cols);
      if (event.key === 'ArrowUp') next = Math.max(0, current - cols);
      if (next !== current) { event.preventDefault(); icons[next].focus(); }
    });
  }

  function renderDock() {
    const finder = `
      <button class="dock-app" type="button" data-dock="finder" aria-label="Finder">
        <span class="tooltip">Finder</span>
        <span class="dock-icon"><span class="finder-face"><span class="finder-side-a"></span><span class="finder-side-b"></span><span class="finder-smile"></span></span></span>
      </button>`;
    dock.innerHTML = finder + DATA.folders.map(folder => `
      <button class="dock-app" type="button" data-dock="${folder.id}" aria-label="Open ${folder.short}">
        <span class="tooltip">${folder.short}</span>
        <span class="dock-icon">${svgIcon(folder.icon)}</span>
      </button>`).join('');

    dock.addEventListener('click', (event) => {
      const app = event.target.closest('[data-dock]');
      if (!app) return;
      app.classList.remove('bounce');
      void app.offsetWidth;
      app.classList.add('bounce');
      setTimeout(() => app.classList.remove('bounce'), 500);
      if (app.dataset.dock === 'finder') focusMostRecent();
      else openWindow(app.dataset.dock);
    });
  }

  function renderContent(id) {
    if (id === 'music') return musicContent();
    if (id === 'photos') return photosContent();
    if (id === 'projects') return projectsContent();
    if (id === 'books') return booksContent();
    if (id === 'games') return gamesContent();
    if (id === 'movies') return moviesContent();
    return '<div class="empty-note">This folder is ready for content.</div>';
  }

  function header(title, text, count) {
    return `<div class="library-header"><div><h2>${title}</h2><p>${text}</p></div><span class="collection-count">${count}</span></div>`;
  }

  function musicContent() {
    return header('Favorite Musics', 'A small part of Amir’s soundtrack — arranged like a personal macOS Music library.', `${DATA.music.length} tracks`) + `
      <div class="music-layout">
        <section class="now-playing" aria-label="Music player preview">
          <div class="big-album" aria-hidden="true"></div>
          <strong>Enter Sandman</strong><small style="display:block;color:var(--muted);margin-top:4px">Metallica · 1991</small>
          <div class="player-row"><button class="player-btn" aria-label="Previous track">‹</button><button class="player-btn primary" aria-label="Play preview">▶</button><button class="player-btn" aria-label="Next track">›</button></div>
          <p style="font-size:11px;color:var(--muted);text-align:center;margin-bottom:0">Playback controls are intentionally non-autoplay.</p>
        </section>
        <div class="track-list">${DATA.music.map((track, i) => `<article class="track"><div class="album-thumb ${track.tone}"></div><div><strong>${track.title}</strong><small>${track.artist} · ${track.year}</small></div><time>${i === 0 ? '5:31' : i === 1 ? '4:05' : i === 2 ? '5:15' : '—'}</time></article>`).join('')}</div>
      </div>`;
  }

  function photosContent() {
    return header('My Photos', 'A Photos-inspired gallery. Replace the placeholders in data.js with personal images whenever you want.', `${DATA.photos.length} photos`) + `
      <div class="photo-grid">${DATA.photos.map((photo, i) => `<button class="photo-tile ${photo.src}" type="button" data-photo="${i}" aria-label="Open ${photo.title}"><span>${photo.title}</span></button>`).join('')}</div>`;
  }

  function projectsContent() {
    return header('My Projects', 'Selected creative-technology, 3D, AI, multimedia and interactive web experiments.', `${DATA.projects.length} projects`) + `
      <div class="project-gallery">${DATA.projects.map(project => `<article class="project-card"><div class="project-mark">${project.mark}</div><div><div class="category">${project.category}</div><h3>${project.name}</h3><p>${project.description}</p><a class="open-link" href="${project.url}" target="_blank" rel="noopener noreferrer">Open project <span>↗</span></a></div></article>`).join('')}</div>`;
  }

  function booksContent() {
    return header('My Books', 'A quiet Books-inspired shelf for authored work and future publications.', `${DATA.books.length} books`) + `
      <div class="bookshelf">${DATA.books.map(book => `<article class="book"><div class="book-cover"><b>${book.mark}</b><small>AMIR SAEID DEHGHAN</small></div><h3>${book.title}</h3><p>${book.subtitle}<br>${book.status}</p></article>`).join('')}</div>`;
  }

  function gamesContent() {
    return header('Favorite Games', 'A cover-flow-like library for favorite games and gaming nostalgia.', `${DATA.games.length} games`) + `
      <div class="media-strip">${DATA.games.map(game => `<article class="media-item"><div class="media-cover"><span class="media-code">${game.code}</span></div><h3>${game.title}</h3><div class="media-meta">${game.platform} · ${game.year}</div><p>${game.description}</p></article>`).join('')}</div>`;
  }

  function moviesContent() {
    return header('Favorite Movies', 'A compact Apple TV-inspired collection inside the desktop environment.', `${DATA.movies.length} movies`) + `
      <div class="media-strip">${DATA.movies.map((movie, i) => `<article class="media-item"><button class="media-button" type="button" data-movie="${i}" aria-label="Open details for ${movie.title}"><div class="media-cover"><span class="media-code">${movie.code}</span></div><h3>${movie.title}</h3><div class="media-meta">${movie.genre} · ${movie.year}</div><p>${movie.info}</p></button></article>`).join('')}</div>`;
  }

  function windowTemplate(folder) {
    return `
      <div class="window-toolbar" data-drag-handle>
        <div class="traffic-lights" aria-label="Window controls">
          <button class="traffic close" type="button" data-action="close" aria-label="Close window"></button>
          <button class="traffic min" type="button" data-action="minimize" aria-label="Minimize window"></button>
          <button class="traffic max" type="button" data-action="maximize" aria-label="Maximize window"></button>
        </div>
        <div class="window-title-wrap"><span class="mini-folder" style="--accent:${folder.accent}"></span><div><div class="window-title">${folder.label}</div><div class="window-subtitle">Amir Saeid Dehghan — Personal Desktop</div></div></div>
        <div class="window-spacer"></div>
        <div class="view-pill" aria-hidden="true"><span>≡</span><span class="active">${svgIcon('grid')}</span></div>
      </div>
      <div class="window-content">${renderContent(folder.id)}</div>`;
  }

  function openWindow(id) {
    const folder = DATA.folders.find(f => f.id === id);
    if (!folder) return;
    if (windows.has(id)) {
      const state = windows.get(id);
      if (state.minimized) restoreWindow(id);
      focusWindow(state.el);
      return;
    }
    const el = document.createElement('section');
    el.className = 'finder-window';
    el.dataset.window = id;
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', folder.label);
    el.innerHTML = windowTemplate(folder);
    const offset = windows.size % 5;
    if (window.innerWidth > 820) {
      el.style.left = `${Math.min(window.innerWidth - 610, 170 + offset * 32)}px`;
      el.style.top = `${65 + offset * 26}px`;
    }
    windowLayer.appendChild(el);
    windows.set(id, { el, minimized: false, maximized: false });
    bindWindow(el, id);
    focusWindow(el);
    setDockActive(id, true);
  }

  function bindWindow(el, id) {
    el.addEventListener('pointerdown', () => focusWindow(el));
    el.addEventListener('click', (event) => {
      const action = event.target.closest('[data-action]')?.dataset.action;
      if (action === 'close') closeWindow(id);
      if (action === 'minimize') minimizeWindow(id);
      if (action === 'maximize') toggleMaximize(id);
      const photo = event.target.closest('[data-photo]');
      if (photo) openPhoto(Number(photo.dataset.photo));
      const movie = event.target.closest('[data-movie]');
      if (movie) openMovie(Number(movie.dataset.movie));
    });
    enableDrag(el, el.querySelector('[data-drag-handle]'));
  }

  function focusWindow(el) {
    topZ += 1;
    el.style.zIndex = topZ;
    [...windowLayer.children].forEach(w => w.classList.toggle('inactive', w !== el));
  }

  function focusMostRecent() {
    const visible = [...windows.values()].filter(w => !w.minimized);
    if (!visible.length) return openWindow('projects');
    visible.sort((a,b) => Number(a.el.style.zIndex || 0) - Number(b.el.style.zIndex || 0));
    focusWindow(visible.at(-1).el);
  }

  function closeWindow(id) {
    const state = windows.get(id);
    if (!state) return;
    state.el.classList.add('closing');
    setTimeout(() => {
      state.el.remove();
      windows.delete(id);
      setDockActive(id, false);
      focusMostRecentVisible();
    }, 190);
  }

  function minimizeWindow(id) {
    const state = windows.get(id);
    if (!state || state.minimized) return;
    state.el.classList.add('minimizing');
    state.minimized = true;
    setTimeout(() => { state.el.style.display = 'none'; state.el.classList.remove('minimizing'); }, 255);
    focusMostRecentVisible(id);
  }

  function restoreWindow(id) {
    const state = windows.get(id);
    if (!state) return;
    state.el.style.display = '';
    state.minimized = false;
    state.el.animate([{opacity:0, transform:'translateY(35px) scale(.82)'},{opacity:1,transform:'none'}], {duration:240,easing:'cubic-bezier(.2,.8,.2,1)'});
    focusWindow(state.el);
  }

  function toggleMaximize(id) {
    const state = windows.get(id);
    if (!state) return;
    state.maximized = !state.maximized;
    state.el.classList.toggle('maximized', state.maximized);
    focusWindow(state.el);
  }

  function focusMostRecentVisible(excludeId) {
    const visible = [...windows.entries()].filter(([id, state]) => id !== excludeId && !state.minimized).map(([,state]) => state.el);
    if (!visible.length) return;
    visible.sort((a,b) => Number(a.style.zIndex||0) - Number(b.style.zIndex||0));
    focusWindow(visible.at(-1));
  }

  function setDockActive(id, active) {
    const app = dock.querySelector(`[data-dock="${id}"]`);
    if (app) app.classList.toggle('active', active);
  }

  function enableDrag(win, handle) {
    let dragging = false;
    let startX = 0, startY = 0, startLeft = 0, startTop = 0;
    handle.addEventListener('pointerdown', (event) => {
      if (event.target.closest('.traffic-lights') || window.innerWidth <= 820 || win.classList.contains('maximized')) return;
      dragging = true;
      startX = event.clientX;
      startY = event.clientY;
      startLeft = win.offsetLeft;
      startTop = win.offsetTop;
      handle.setPointerCapture(event.pointerId);
      focusWindow(win);
    });
    handle.addEventListener('pointermove', (event) => {
      if (!dragging) return;
      const maxLeft = window.innerWidth - Math.min(win.offsetWidth, 240);
      const maxTop = window.innerHeight - 120;
      win.style.left = `${Math.max(-win.offsetWidth + 180, Math.min(maxLeft, startLeft + event.clientX - startX))}px`;
      win.style.top = `${Math.max(6, Math.min(maxTop, startTop + event.clientY - startY))}px`;
    });
    const stop = () => dragging = false;
    handle.addEventListener('pointerup', stop);
    handle.addEventListener('pointercancel', stop);
  }

  function openPhoto(index) {
    photoIndex = index;
    renderPhoto();
    photoViewer.classList.remove('hidden');
    photoViewer.querySelector('.viewer-close').focus();
  }

  function renderPhoto() {
    const photo = DATA.photos[photoIndex];
    viewerImage.className = photo.src;
    viewerImage.removeAttribute('src');
    viewerImage.alt = photo.title;
    const tile = document.querySelector(`.${photo.src}`);
    if (tile) viewerImage.style.background = getComputedStyle(tile).getPropertyValue('--photo-bg');
    viewerCaption.textContent = `${photo.title} — ${photo.caption}`;
  }

  function closePhoto() { photoViewer.classList.add('hidden'); }
  function changePhoto(delta) { photoIndex = (photoIndex + delta + DATA.photos.length) % DATA.photos.length; renderPhoto(); }

  photoViewer.addEventListener('click', (event) => {
    if (event.target.classList.contains('viewer-close') || event.target === photoViewer) closePhoto();
    if (event.target.classList.contains('viewer-prev')) changePhoto(-1);
    if (event.target.classList.contains('viewer-next')) changePhoto(1);
  });

  function openMovie(index) {
    const movie = DATA.movies[index];
    detailCard.innerHTML = `<button class="detail-close" type="button" aria-label="Close details">×</button><div class="detail-hero">${movie.code}</div><h2>${movie.title}</h2><div><span class="detail-chip">${movie.genre}</span><span class="detail-chip">${movie.year}</span><span class="detail-chip">${movie.rating}</span></div><p>${movie.info}</p>`;
    detailViewer.classList.remove('hidden');
    detailCard.querySelector('.detail-close').focus();
  }

  detailViewer.addEventListener('click', (event) => {
    if (event.target === detailViewer || event.target.closest('.detail-close')) detailViewer.classList.add('hidden');
  });

  function updateClock() {
    const now = new Date();
    menuClock.textContent = new Intl.DateTimeFormat(undefined, { weekday:'short', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' }).format(now);
  }

  const menuMap = {
    apple: [['About This Portfolio', 'about'], ['System Settings…', 'system-settings'], ['separator'], ['Recent Items', 'recent-items'], ['separator'], ['Sleep', 'sleep'], ['Restart…', 'restart'], ['Shut Down…', 'shutdown']],
    owner: [['Amir Saeid Dehghan', null], ['Creative Technology Portfolio', null], ['separator'], ['Open Projects', 'projects']],
    file: [['New Finder Window', 'projects'], ['Open Photos', 'photos'], ['separator'], ['Close Window', 'close-front'], ['Close All Windows', 'close-all']],
    edit: [['Undo', null], ['separator'], ['Cut', null], ['Copy', null], ['Paste', null], ['separator'], ['Select All', null]],
    view: [['Show Desktop', 'show-desktop'], ['Open All Folders', 'open-all']],
    window: [['Minimize', 'min-front'], ['Zoom', 'zoom-front'], ['separator'], ['Bring All to Front', 'bring-front']],
    help: [['Portfolio Help', 'about'], ['Keyboard: ⌘W, ⌘M, ⌘Space, Esc', null]]
  };

  document.querySelector('.menu-left').addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-menu]');
    if (!trigger) return;
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.menu-trigger').forEach(t => t.setAttribute('aria-expanded','false'));
    if (isOpen) { menuPopover.classList.add('hidden'); return; }
    trigger.setAttribute('aria-expanded','true');
    const items = menuMap[trigger.dataset.menu] || [];
    menuPopover.innerHTML = items.map(item => item[0] === 'separator' ? '<div class="separator"></div>' : `<button role="menuitem" type="button" ${item[1] ? `data-command="${item[1]}"` : 'disabled'}><span>${item[0]}</span>${item[1] === 'projects' ? '<span>⌘P</span>' : ''}</button>`).join('');
    const rect = trigger.getBoundingClientRect();
    menuPopover.style.left = `${Math.min(rect.left, window.innerWidth - 250)}px`;
    menuPopover.classList.remove('hidden');
  });

  menuPopover.addEventListener('click', (event) => {
    const command = event.target.closest('[data-command]')?.dataset.command;
    if (!command) return;
    runCommand(command);
    closeMenus();
  });

  function runCommand(command) {
    if (DATA.folders.some(f => f.id === command)) return openWindow(command);

    const frontEntry = () => [...windows.entries()]
      .filter(([, state]) => !state.minimized)
      .sort((a, b) => Number(a[1].el.style.zIndex || 0) - Number(b[1].el.style.zIndex || 0))
      .at(-1);

    const showSystemSheet = (title, message) => {
      detailCard.innerHTML = `<button class="detail-close" type="button" aria-label="Close details">×</button><div class="detail-hero gg-system-hero"></div><h2>${title}</h2><p>${message}</p>`;
      detailViewer.classList.remove('hidden');
      detailCard.querySelector('.detail-close')?.focus();
    };
    if (command === 'close-front') {
      const front = frontEntry();
      if (front) closeWindow(front[0]);
    }
    if (command === 'zoom-front') {
      const front = frontEntry();
      if (front) toggleMaximize(front[0]);
    }
    if (command === 'system-settings') showSystemSheet('System Settings', 'This is a browser-based portfolio, so system settings are represented visually rather than changing your Mac.');
    if (command === 'recent-items') showSystemSheet('Recent Items', 'Your portfolio folders and projects remain available from the desktop, Finder sidebar, Dock and Spotlight.');
    if (command === 'sleep') showSystemSheet('Sleep', 'Sleep is simulated here. Closing this panel returns you to the portfolio desktop.');
    if (command === 'restart') showSystemSheet('Restart', 'Restart is simulated in the browser; your portfolio content and window state are not modified.');
    if (command === 'shutdown') showSystemSheet('Shut Down', 'Shut Down is simulated and never closes the visitor’s real browser or device.');
    if (command === 'close-all') [...windows.keys()].forEach(closeWindow);
    if (command === 'show-desktop') [...windows.keys()].forEach(minimizeWindow);
    if (command === 'open-all') DATA.folders.forEach((f,i) => setTimeout(() => openWindow(f.id), i * 45));
    if (command === 'min-front') {
      const visible = [...windows.entries()].filter(([,s]) => !s.minimized).sort((a,b) => Number(a[1].el.style.zIndex||0)-Number(b[1].el.style.zIndex||0));
      if (visible.length) minimizeWindow(visible.at(-1)[0]);
    }
    if (command === 'bring-front') [...windows.values()].filter(s=>!s.minimized).forEach(s=>focusWindow(s.el));
    if (command === 'about') {
      detailCard.innerHTML = `<button class="detail-close" type="button" aria-label="Close details">×</button><div class="detail-hero">ASD</div><h2>Amir Saeid Dehghan — Personal Desktop</h2><div><span class="detail-chip">Multimedia</span><span class="detail-chip">3D</span><span class="detail-chip">UI/UX</span><span class="detail-chip">AI</span></div><p>An interactive second personal website designed as a tactile macOS-inspired desktop rather than a conventional portfolio page.</p>`;
      detailViewer.classList.remove('hidden');
    }
  }

  function closeMenus() {
    menuPopover.classList.add('hidden');
    document.querySelectorAll('.menu-trigger').forEach(t => t.setAttribute('aria-expanded','false'));
  }

  document.addEventListener('pointerdown', (event) => {
    if (!event.target.closest('.menu-bar')) closeMenus();
    if (!event.target.closest('.desktop-icon') && selectedDesktopIcon) { selectedDesktopIcon.classList.remove('selected'); selectedDesktopIcon = null; }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (!photoViewer.classList.contains('hidden')) closePhoto();
      else if (!detailViewer.classList.contains('hidden')) detailViewer.classList.add('hidden');
      else closeMenus();
    }
    if (!photoViewer.classList.contains('hidden') && event.key === 'ArrowLeft') changePhoto(-1);
    if (!photoViewer.classList.contains('hidden') && event.key === 'ArrowRight') changePhoto(1);

    if ((event.metaKey || event.ctrlKey) && !event.altKey) {
      const key = event.key.toLowerCase();
      const front = [...windows.entries()]
        .filter(([, state]) => !state.minimized)
        .sort((a, b) => Number(a[1].el.style.zIndex || 0) - Number(b[1].el.style.zIndex || 0))
        .at(-1);

      if (key === 'w' && front) {
        event.preventDefault();
        closeWindow(front[0]);
      }
      if (key === 'm' && front) {
        event.preventDefault();
        minimizeWindow(front[0]);
      }
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 820) windows.forEach(state => { state.el.style.left = '8px'; state.el.style.top = '8px'; });
  });

  renderDesktop();
  renderDock();
  updateClock();
  setInterval(updateClock, 30000);
})();
