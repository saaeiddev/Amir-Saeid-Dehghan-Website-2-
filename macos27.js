(() => {
  'use strict';

  const DATA = window.PORTFOLIO_DATA;
  if (!DATA) return;

  const icon = (name) => {
    const paths = {
      chevronLeft: '<path d="m14.5 5-7 7 7 7"/>',
      chevronRight: '<path d="m9.5 5 7 7-7 7"/>',
      search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
      control: '<path d="M4 7h8M16 7h4M4 17h4M12 17h8"/><circle cx="14" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
      wifi: '<path d="M4 9.5c4.8-4 11.2-4 16 0M7 13c3-2.5 7-2.5 10 0M10.2 16.4c1.1-.8 2.5-.8 3.6 0M12 19h.01"/>',
      bluetooth: '<path d="m8 7 8 10V7L8 17l8-10"/>',
      moon: '<path d="M19 15.5A7 7 0 0 1 8.5 5 7.5 7.5 0 1 0 19 15.5Z"/>',
      sun: '<circle cx="12" cy="12" r="3.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
      sound: '<path d="M5 10v4h4l4 3V7l-4 3H5Zm11-1.5a5 5 0 0 1 0 7"/>',
      folder: '<path d="M3 7h7l2 2h9v10H3z"/>',
      music: '<path d="M9 18V6l9-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="15" cy="16" r="3"/>',
      photos: '<rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="9" cy="10" r="2"/><path d="m5 17 4-4 3 3 2-2 5 5"/>',
      projects: '<path d="M4 7h6l2 2h8v10H4z"/><path d="M8 13h8M12 9v8"/>',
      books: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z"/><path d="M8 4v16M11 8h5"/>',
      games: '<path d="M8 9h8a5 5 0 0 1 4.7 6.7l-.6 1.8a2 2 0 0 1-3.4.7L15 16H9l-1.7 2.2a2 2 0 0 1-3.4-.7l-.6-1.8A5 5 0 0 1 8 9Z"/><path d="M7 13h4M9 11v4M16 12h.01M18 14h.01"/>',
      movies: '<rect x="4" y="5" width="16" height="14" rx="3"/><path d="M4 9h16M8 5l2 4M14 5l2 4"/>'
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.folder}</svg>`;
  };

  function openFolder(id) {
    const dockButton = document.querySelector(`[data-dock="${id}"]`);
    const desktopButton = document.querySelector(`[data-open="${id}"]`);
    (dockButton || desktopButton)?.click();
  }

  function buildSidebar(activeId) {
    const sidebar = document.createElement('aside');
    sidebar.className = 'gg-sidebar';
    sidebar.setAttribute('aria-label', 'Finder sidebar');

    const favoriteItems = [
      ['projects', 'Projects', '#0a84ff'],
      ['photos', 'Photos', '#ff453a'],
      ['music', 'Music', '#ff375f'],
      ['books', 'Books', '#ff9f0a']
    ];
    const mediaItems = [
      ['games', 'Games', '#5e5ce6'],
      ['movies', 'Movies', '#64d2ff']
    ];

    const group = (label, items) => `
      <div class="gg-sidebar-group">
        <div class="gg-sidebar-label">${label}</div>
        ${items.map(([id, title, color]) => `
          <button class="gg-sidebar-item ${id === activeId ? 'active' : ''}" type="button" data-gg-open="${id}">
            <span class="gg-side-icon" style="--side-color:${color}">${icon(id)}</span>
            <span>${title}</span>
          </button>`).join('')}
      </div>`;

    sidebar.innerHTML =
      group('Favorites', favoriteItems) +
      group('Media', mediaItems) +
      `<div class="gg-sidebar-group">
        <div class="gg-sidebar-label">Locations</div>
        <button class="gg-sidebar-item" type="button" data-gg-open="projects">
          <span class="gg-side-icon" style="--side-color:#8e8e93">${icon('folder')}</span>
          <span>Amir’s Mac</span>
        </button>
      </div>`;

    sidebar.addEventListener('click', (event) => {
      const button = event.target.closest('[data-gg-open]');
      if (button) openFolder(button.dataset.ggOpen);
    });
    return sidebar;
  }

  function upgradeWindow(win) {
    if (!win || win.dataset.ggUpgraded === 'true') return;
    win.dataset.ggUpgraded = 'true';
    const id = win.dataset.window;
    const toolbar = win.querySelector('.window-toolbar');
    const content = win.querySelector('.window-content');
    if (!toolbar || !content) return;

    const titleWrap = toolbar.querySelector('.window-title-wrap');
    const nav = document.createElement('div');
    nav.className = 'gg-toolbar-actions';
    nav.innerHTML = `
      <button class="gg-toolbar-btn" type="button" aria-label="Back">${icon('chevronLeft')}</button>
      <button class="gg-toolbar-btn" type="button" aria-label="Forward">${icon('chevronRight')}</button>`;
    toolbar.insertBefore(nav, titleWrap);

    const search = document.createElement('button');
    search.className = 'gg-search';
    search.type = 'button';
    search.innerHTML = `${icon('search')}<span>Search</span>`;
    search.addEventListener('click', openSpotlight);
    const viewPill = toolbar.querySelector('.view-pill');
    toolbar.insertBefore(search, viewPill);

    const body = document.createElement('div');
    body.className = 'gg-window-body';
    content.parentNode.insertBefore(body, content);
    body.appendChild(buildSidebar(id));
    body.appendChild(content);
  }

  function observeWindows() {
    const layer = document.getElementById('window-layer');
    if (!layer) return;
    layer.querySelectorAll('.finder-window').forEach(upgradeWindow);
    new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches?.('.finder-window')) upgradeWindow(node);
          node.querySelectorAll?.('.finder-window').forEach(upgradeWindow);
        });
      });
    }).observe(layer, { childList: true, subtree: true });
  }

  function buildSystemButtons() {
    const right = document.querySelector('.menu-right');
    const clock = document.getElementById('menu-clock');
    if (!right || !clock || right.querySelector('[data-gg-control]')) return;

    const searchButton = document.createElement('button');
    searchButton.className = 'gg-status-button';
    searchButton.type = 'button';
    searchButton.setAttribute('aria-label', 'Spotlight');
    searchButton.innerHTML = icon('search');
    searchButton.addEventListener('click', (event) => { event.stopPropagation(); openSpotlight(); });

    const controlButton = document.createElement('button');
    controlButton.className = 'gg-status-button';
    controlButton.type = 'button';
    controlButton.dataset.ggControl = 'true';
    controlButton.setAttribute('aria-label', 'Control Center');
    controlButton.innerHTML = icon('control');
    controlButton.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleControlCenter();
    });

    right.insertBefore(searchButton, clock);
    right.insertBefore(controlButton, clock);
  }

  function createControlCenter() {
    if (document.querySelector('.gg-control-center')) return;
    const panel = document.createElement('section');
    panel.className = 'gg-control-center hidden';
    panel.setAttribute('aria-label', 'Control Center');
    panel.innerHTML = `
      <div class="gg-cc-grid">
        <div class="gg-cc-tile">
          <div class="gg-cc-row"><span class="gg-cc-dot">${icon('wifi')}</span><div><strong>Wi-Fi</strong><small>Connected</small></div></div>
          <div class="gg-cc-row"><span class="gg-cc-dot" style="background:#0a84ff">${icon('bluetooth')}</span><div><strong>Bluetooth</strong><small>On</small></div></div>
        </div>
        <div class="gg-cc-tile">
          <div class="gg-cc-row"><span class="gg-cc-dot" style="background:#5e5ce6">${icon('moon')}</span><div><strong>Focus</strong><small>Off</small></div></div>
          <div class="gg-cc-row"><span class="gg-cc-dot" style="background:#30d158">${icon('control')}</span><div><strong>AirDrop</strong><small>Contacts Only</small></div></div>
        </div>
      </div>
      <div class="gg-slider-card">
        <div class="gg-slider-head"><span>Display</span><span>${icon('sun')}</span></div>
        <input class="gg-slider" data-gg-brightness type="range" min="70" max="110" value="100" aria-label="Display brightness" />
      </div>
      <div class="gg-slider-card">
        <div class="gg-slider-head"><span>Sound</span><span>${icon('sound')}</span></div>
        <input class="gg-slider" type="range" min="0" max="100" value="62" aria-label="Sound volume" />
      </div>
      <div class="gg-slider-card">
        <div class="gg-slider-head"><span>Liquid Glass</span><span>Clear ↔ Tinted</span></div>
        <input class="gg-slider" data-gg-glass type="range" min="38" max="78" value="58" aria-label="Liquid Glass opacity" />
      </div>
      <div class="gg-cc-media">
        <div class="gg-cc-art"></div>
        <div><strong>Enter Sandman</strong><small>Metallica</small></div>
        <div class="gg-media-controls">◀︎ ▶︎</div>
      </div>`;
    document.body.appendChild(panel);

    panel.querySelector('[data-gg-glass]').addEventListener('input', (event) => {
      document.documentElement.style.setProperty('--gg-glass-alpha', String(Number(event.target.value) / 100));
    });
    panel.querySelector('[data-gg-brightness]').addEventListener('input', (event) => {
      const value = Number(event.target.value) / 100;
      document.querySelector('.wallpaper').style.filter = `brightness(${value})`;
    });
  }

  function toggleControlCenter(force) {
    const panel = document.querySelector('.gg-control-center');
    const button = document.querySelector('[data-gg-control]');
    if (!panel) return;
    const shouldOpen = typeof force === 'boolean' ? force : panel.classList.contains('hidden');
    panel.classList.toggle('hidden', !shouldOpen);
    button?.classList.toggle('active', shouldOpen);
    if (shouldOpen) closeSpotlight();
  }

  function createSpotlight() {
    if (document.querySelector('.gg-spotlight')) return;
    const overlay = document.createElement('section');
    overlay.className = 'gg-spotlight hidden';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Spotlight');
    overlay.innerHTML = `
      <div class="gg-spot-input-wrap">
        ${icon('search')}
        <input class="gg-spot-input" type="search" autocomplete="off" placeholder="Search or Ask" aria-label="Search folders" />
      </div>
      <div class="gg-spot-results"></div>`;
    document.body.appendChild(overlay);
    const input = overlay.querySelector('.gg-spot-input');
    input.addEventListener('input', () => renderSpotlightResults(input.value));
    overlay.addEventListener('click', (event) => {
      const result = event.target.closest('[data-spot-open]');
      if (!result) return;
      openFolder(result.dataset.spotOpen);
      closeSpotlight();
    });
  }

  function renderSpotlightResults(query = '') {
    const results = document.querySelector('.gg-spot-results');
    if (!results) return;
    const q = query.trim().toLowerCase();
    const folders = DATA.folders.filter((folder) => !q || folder.label.toLowerCase().includes(q) || folder.short.toLowerCase().includes(q));
    results.innerHTML = folders.slice(0, 6).map((folder, index) => `
      <button class="gg-spot-result ${index === 0 ? 'active' : ''}" type="button" data-spot-open="${folder.id}">
        <span>${icon(folder.icon)}</span>
        <span><strong>${folder.label}</strong><small>Folder · Amir Saeid Dehghan</small></span>
      </button>`).join('') || `<div style="padding:14px;color:rgb(255 255 255 / .5);font-size:12px">No results</div>`;
  }

  function openSpotlight() {
    const overlay = document.querySelector('.gg-spotlight');
    if (!overlay) return;
    toggleControlCenter(false);
    overlay.classList.remove('hidden');
    renderSpotlightResults('');
    const input = overlay.querySelector('.gg-spot-input');
    input.value = '';
    requestAnimationFrame(() => input.focus());
  }

  function closeSpotlight() {
    document.querySelector('.gg-spotlight')?.classList.add('hidden');
  }

  function dockMagnification() {
    const dock = document.getElementById('dock');
    if (!dock || matchMedia('(pointer: coarse)').matches) return;
    const apps = () => [...dock.querySelectorAll('.dock-app')];
    dock.addEventListener('pointermove', (event) => {
      apps().forEach((app) => {
        const rect = app.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const distance = Math.abs(event.clientX - center);
        const influence = Math.max(0, 1 - distance / 115);
        const scale = 1 + influence * .27;
        const lift = influence * 8;
        app.style.transform = `translateY(${-lift}px) scale(${scale})`;
      });
    });
    dock.addEventListener('pointerleave', () => apps().forEach((app) => app.style.removeProperty('transform')));
  }

  document.addEventListener('pointerdown', (event) => {
    if (!event.target.closest('.gg-control-center') && !event.target.closest('[data-gg-control]')) toggleControlCenter(false);
    if (!event.target.closest('.gg-spotlight') && !event.target.closest('.gg-search') && !event.target.closest('.gg-status-button')) closeSpotlight();
  });

  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.code === 'Space') {
      event.preventDefault();
      openSpotlight();
    }
    if (event.key === 'Escape') {
      toggleControlCenter(false);
      closeSpotlight();
    }
  });

  buildSystemButtons();
  createControlCenter();
  createSpotlight();
  observeWindows();
  dockMagnification();
})();
