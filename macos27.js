(() => {
  'use strict';

  if (window.__MACOS27_GOLDEN_GATE_INITIALIZED__) return;
  window.__MACOS27_GOLDEN_GATE_INITIALIZED__ = true;

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
      airdrop: '<path d="M6.2 9.2a8.2 8.2 0 0 1 11.6 0M8.8 11.9a4.5 4.5 0 0 1 6.4 0M12 15.1h.01"/><path d="m9.2 17.6 2.8-4.8 2.8 4.8Z"/>',
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
      ['projects', 'Projects', '#5aa7ff'],
      ['photos', 'Photos', '#ff6b6b'],
      ['music', 'Music', '#ff5f7f'],
      ['books', 'Books', '#f4a340']
    ];
    const mediaItems = [
      ['games', 'Games', '#8b84ff'],
      ['movies', 'Movies', '#70c9ec']
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
          <span class="gg-side-icon" style="--side-color:#9a9aa0">${icon('folder')}</span>
          <span>Amir’s Mac</span>
        </button>
      </div>`;

    sidebar.addEventListener('click', (event) => {
      const button = event.target.closest('[data-gg-open]');
      if (button) openFolder(button.dataset.ggOpen);
    });

    return sidebar;
  }

  function stopToolbarDrag(event) {
    event.stopPropagation();
  }

  function upgradeWindow(win) {
    if (!win || win.dataset.ggUpgraded === 'true') {
      if (win) window.COVER_ENHANCER?.enhanceWindow?.(win);
      return;
    }

    const id = win.dataset.window;
    const toolbar = win.querySelector('.window-toolbar');
    const content = win.querySelector('.window-content');
    if (!toolbar || !content) return;

    win.dataset.ggUpgraded = 'true';

    const titleWrap = toolbar.querySelector('.window-title-wrap');
    const nav = document.createElement('div');
    nav.className = 'gg-toolbar-actions';
    nav.innerHTML = `
      <button class="gg-toolbar-btn" type="button" aria-label="Back" disabled>${icon('chevronLeft')}</button>
      <button class="gg-toolbar-btn" type="button" aria-label="Forward" disabled>${icon('chevronRight')}</button>`;
    nav.addEventListener('pointerdown', stopToolbarDrag);
    toolbar.insertBefore(nav, titleWrap);

    const search = document.createElement('button');
    search.className = 'gg-search';
    search.type = 'button';
    search.innerHTML = `${icon('search')}<span>Search</span>`;
    search.addEventListener('pointerdown', stopToolbarDrag);
    search.addEventListener('click', openSpotlight);
    const viewPill = toolbar.querySelector('.view-pill');
    toolbar.insertBefore(search, viewPill);

    const body = document.createElement('div');
    body.className = 'gg-window-body';
    content.parentNode.insertBefore(body, content);
    body.appendChild(buildSidebar(id));
    body.appendChild(content);

    window.COVER_ENHANCER?.enhanceWindow?.(win);
  }

  function upgradeExistingWindows() {
    document.querySelectorAll('.finder-window').forEach(upgradeWindow);
  }

  function scheduleWindowUpgrade(event) {
    const target = event.target.closest(
      '[data-open], [data-dock], [data-command], [data-gg-open], [data-spot-open]'
    );
    if (!target) return;

    // Run after component-level click handlers have created/restored the window.
    // Open All intentionally creates windows over a few bounded timers, so it gets
    // one final idempotent upgrade pass after the last scheduled window exists.
    if (target.matches('[data-command="open-all"]')) {
      window.setTimeout(upgradeExistingWindows, 300);
      return;
    }

    upgradeExistingWindows();
  }

  function buildSystemButtons() {
    const right = document.querySelector('.menu-right');
    const clock = document.getElementById('menu-clock');
    if (!right || !clock || right.querySelector('[data-gg-control]')) return;

    const searchButton = document.createElement('button');
    searchButton.className = 'gg-status-button gg-spotlight-trigger';
    searchButton.type = 'button';
    searchButton.setAttribute('aria-label', 'Spotlight');
    searchButton.innerHTML = icon('search');
    searchButton.addEventListener('click', (event) => {
      event.stopPropagation();
      openSpotlight();
    });

    const controlButton = document.createElement('button');
    controlButton.className = 'gg-status-button';
    controlButton.type = 'button';
    controlButton.dataset.ggControl = 'true';
    controlButton.setAttribute('aria-label', 'Control Center');
    controlButton.setAttribute('aria-expanded', 'false');
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
        <button class="gg-cc-toggle enabled" type="button" aria-pressed="true">
          <span class="gg-cc-dot">${icon('wifi')}</span>
          <span><strong>Wi-Fi</strong><small>Connected</small></span>
        </button>
        <button class="gg-cc-toggle enabled" type="button" aria-pressed="true">
          <span class="gg-cc-dot">${icon('bluetooth')}</span>
          <span><strong>Bluetooth</strong><small>On</small></span>
        </button>
        <button class="gg-cc-toggle" type="button" aria-pressed="false">
          <span class="gg-cc-dot neutral">${icon('moon')}</span>
          <span><strong>Focus</strong><small>Off</small></span>
        </button>
        <button class="gg-cc-toggle enabled" type="button" aria-pressed="true">
          <span class="gg-cc-dot">${icon('airdrop')}</span>
          <span><strong>AirDrop</strong><small>Contacts Only</small></span>
        </button>
      </div>
      <div class="gg-slider-card">
        <div class="gg-slider-head"><span>Display</span><span>${icon('sun')}</span></div>
        <input class="gg-slider" data-gg-brightness type="range" min="78" max="108" value="100" aria-label="Display brightness" />
      </div>
      <div class="gg-slider-card">
        <div class="gg-slider-head"><span>Sound</span><span>${icon('sound')}</span></div>
        <input class="gg-slider" type="range" min="0" max="100" value="62" aria-label="Sound volume" />
      </div>
      <div class="gg-cc-media">
        <div class="gg-cc-art" aria-hidden="true"></div>
        <div><strong>Enter Sandman</strong><small>Metallica</small></div>
        <div class="gg-media-controls" aria-hidden="true">◀︎　▶︎</div>
      </div>`;

    document.body.appendChild(panel);

    panel.querySelectorAll('.gg-cc-toggle').forEach((button) => {
      button.addEventListener('click', () => {
        const enabled = button.getAttribute('aria-pressed') !== 'true';
        button.setAttribute('aria-pressed', String(enabled));
        button.classList.toggle('enabled', enabled);
        const small = button.querySelector('small');
        if (small && button.querySelector('strong')?.textContent === 'Focus') {
          small.textContent = enabled ? 'On' : 'Off';
        }
      });
    });

    panel.querySelector('[data-gg-brightness]').addEventListener('input', (event) => {
      document.documentElement.style.setProperty(
        '--gg-wallpaper-brightness',
        String(Number(event.target.value) / 100)
      );
    });
  }

  function toggleControlCenter(force) {
    const panel = document.querySelector('.gg-control-center');
    const button = document.querySelector('[data-gg-control]');
    if (!panel) return;

    const shouldOpen = typeof force === 'boolean'
      ? force
      : panel.classList.contains('hidden');

    panel.classList.toggle('hidden', !shouldOpen);
    button?.classList.toggle('active', shouldOpen);
    button?.setAttribute('aria-expanded', String(shouldOpen));

    if (shouldOpen) closeSpotlight();
  }

  let spotlightIndex = 0;

  function createSpotlight() {
    if (document.querySelector('.gg-spotlight')) return;

    const overlay = document.createElement('section');
    overlay.className = 'gg-spotlight hidden';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Spotlight');
    overlay.innerHTML = `
      <div class="gg-spot-input-wrap">
        ${icon('search')}
        <input class="gg-spot-input" type="search" autocomplete="off" placeholder="Search" aria-label="Search folders" />
      </div>
      <div class="gg-spot-results" role="listbox" aria-label="Search results"></div>`;

    document.body.appendChild(overlay);

    const input = overlay.querySelector('.gg-spot-input');
    input.addEventListener('input', () => {
      spotlightIndex = 0;
      renderSpotlightResults(input.value);
    });

    input.addEventListener('keydown', (event) => {
      const items = [...overlay.querySelectorAll('.gg-spot-result')];
      if (!items.length) return;

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const delta = event.key === 'ArrowDown' ? 1 : -1;
        spotlightIndex = (spotlightIndex + delta + items.length) % items.length;
        syncSpotlightSelection(items);
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        items[spotlightIndex]?.click();
      }
    });

    overlay.addEventListener('click', (event) => {
      const result = event.target.closest('[data-spot-open]');
      if (!result) return;
      openFolder(result.dataset.spotOpen);
      closeSpotlight();
    });
  }

  function syncSpotlightSelection(items = [...document.querySelectorAll('.gg-spot-result')]) {
    items.forEach((item, index) => item.classList.toggle('active', index === spotlightIndex));
    items[spotlightIndex]?.scrollIntoView({ block: 'nearest' });
  }

  function renderSpotlightResults(query = '') {
    const results = document.querySelector('.gg-spot-results');
    if (!results) return;

    const q = query.trim().toLowerCase();
    const folders = DATA.folders.filter((folder) =>
      !q ||
      folder.label.toLowerCase().includes(q) ||
      folder.short.toLowerCase().includes(q)
    );

    spotlightIndex = Math.min(spotlightIndex, Math.max(0, folders.length - 1));

    results.innerHTML = folders.slice(0, 6).map((folder, index) => `
      <button
        class="gg-spot-result ${index === spotlightIndex ? 'active' : ''}"
        type="button"
        role="option"
        aria-selected="${index === spotlightIndex}"
        data-spot-open="${folder.id}">
        <span class="gg-spot-folder">${icon(folder.icon)}</span>
        <span><strong>${folder.label}</strong><small>Folder · Amir Saeid Dehghan</small></span>
      </button>`).join('') ||
      `<div class="gg-spot-empty">No results</div>`;
  }

  function openSpotlight() {
    const overlay = document.querySelector('.gg-spotlight');
    if (!overlay) return;

    toggleControlCenter(false);
    overlay.classList.remove('hidden');
    spotlightIndex = 0;
    renderSpotlightResults('');

    const input = overlay.querySelector('.gg-spot-input');
    input.value = '';
    window.setTimeout(() => input.focus(), 0);
  }

  function closeSpotlight() {
    document.querySelector('.gg-spotlight')?.classList.add('hidden');
  }

  function dockMagnification() {
    const dock = document.getElementById('dock');
    if (!dock || dock.dataset.ggMagnificationBound === 'true' || matchMedia('(pointer: coarse)').matches) return;

    dock.dataset.ggMagnificationBound = 'true';

    const reset = () => {
      dock.querySelectorAll('.dock-app').forEach((app) => app.style.removeProperty('transform'));
    };

    dock.addEventListener('pointermove', (event) => {
      const dockRect = dock.getBoundingClientRect();
      const apps = [...dock.querySelectorAll('.dock-app')];

      apps.forEach((app) => {
        const center = dockRect.left + app.offsetLeft + app.offsetWidth / 2;
        const distance = Math.abs(event.clientX - center);
        const influence = Math.max(0, 1 - distance / 108);
        const scale = 1 + influence * .24;
        const lift = influence * 7.5;
        app.style.transform = `translateY(${-lift}px) scale(${scale})`;
      });
    });

    dock.addEventListener('pointerleave', reset);
    dock.addEventListener('blur', reset, true);
  }

  document.addEventListener('click', scheduleWindowUpgrade);

  document.addEventListener('pointerdown', (event) => {
    if (!event.target.closest('.gg-control-center') && !event.target.closest('[data-gg-control]')) {
      toggleControlCenter(false);
    }
    if (
      !event.target.closest('.gg-spotlight') &&
      !event.target.closest('.gg-search') &&
      !event.target.closest('.gg-spotlight-trigger')
    ) {
      closeSpotlight();
    }
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
  upgradeExistingWindows();
  dockMagnification();

  window.MACOS27 = Object.freeze({
    upgradeWindow,
    upgradeExistingWindows,
    openSpotlight,
    closeSpotlight
  });
})();