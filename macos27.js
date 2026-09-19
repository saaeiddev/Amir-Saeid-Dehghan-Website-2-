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
    window.DESKTOP.openWindow(id);
    upgradeExistingWindows();
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
    search.setAttribute('aria-label', 'Search portfolio');
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

    installFinderControls(win);
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
  let spotlightReturnFocus = null;

  function createSpotlight() {
    if (document.querySelector('.gg-spotlight')) return;

    const overlay = document.createElement('section');
    overlay.className = 'gg-spotlight hidden';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Spotlight');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `
      <div class="gg-spot-input-wrap">
        ${icon('search')}
        <input class="gg-spot-input" type="search" autocomplete="off" placeholder="Search" aria-label="Search portfolio" />
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
      const id = result.dataset.spotOpen;
      openFolder(id);
      const win = document.querySelector(`[data-window="${id}"]`);
      const item = win?.querySelectorAll('.finder-item')[Number(result.dataset.spotIndex)];
      closeSpotlight();
      if (item) {
        win.querySelectorAll('.finder-item').forEach(el=>el.classList.toggle('selected',el===item));
        item.scrollIntoView({block:'center'});
        item.focus({preventScroll:true});
      }
    });
  }

  function syncSpotlightSelection(items = [...document.querySelectorAll('.gg-spot-result')]) {
    items.forEach((item, index) => {
      item.classList.toggle('active', index === spotlightIndex);
      item.setAttribute('aria-selected', String(index === spotlightIndex));
    });
    items[spotlightIndex]?.scrollIntoView({ block: 'nearest' });
  }

  function renderSpotlightResults(query = '') {
    const results = document.querySelector('.gg-spot-results');
    if (!results) return;

    const q = query.trim().toLowerCase();
    const entries = DATA.folders.flatMap(folder => [
      {folder, title:folder.label, kind:'Folder', index:-1},
      ...(DATA[folder.id] || []).map((item,index) => ({folder, title:item.title || item.name,
        kind:folder.short, index, terms:Object.values(item).filter(v=>typeof v==='string').join(' ')}))
    ]);
    const matches = entries.filter(entry => !q ? entry.index === -1 :
      `${entry.title} ${entry.kind} ${entry.terms || ''}`.toLowerCase().includes(q)).slice(0,18);
    spotlightIndex = Math.min(spotlightIndex, Math.max(0,matches.length - 1));
    results.innerHTML = matches.map((entry,index) => `
      <button class="gg-spot-result ${index === spotlightIndex ? 'active' : ''}"
        type="button" role="option" aria-selected="${index === spotlightIndex}"
        data-spot-open="${entry.folder.id}" data-spot-index="${entry.index}">
        <span class="gg-spot-folder">${icon(entry.folder.icon)}</span>
        <span><strong>${escapeHTML(entry.title)}</strong><small>${escapeHTML(entry.kind)} · ${entry.index < 0 ? 'Amir Saeid Dehghan' : entry.folder.label}</small></span>
      </button>`).join('') || '<div class="gg-spot-empty">No results</div>';
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }

  function openSpotlight() {
    const overlay = document.querySelector('.gg-spotlight');
    if (!overlay) return;

    spotlightReturnFocus = document.activeElement;
    toggleControlCenter(false);
    overlay.classList.remove('hidden');
    spotlightIndex = 0;
    renderSpotlightResults('');

    const input = overlay.querySelector('.gg-spot-input');
    input.value = '';
    window.setTimeout(() => input.focus(), 0);
  }

  function closeSpotlight() {
    const panel = document.querySelector('.gg-spotlight');
    if (!panel || panel.classList.contains('hidden')) return;
    panel.classList.add('hidden');
    if (panel.contains(document.activeElement)) spotlightReturnFocus?.focus();
  }

  function dockMagnification() {
    const dock = document.getElementById('dock');
    let frame = 0, pointer = null;
    const reset = () => {
      pointer = null;
      cancelAnimationFrame(frame);
      dock.querySelectorAll('.dock-app').forEach(app => {
        app.style.removeProperty('flex-basis');
        app.style.removeProperty('width');
        app.querySelector('.dock-icon').style.removeProperty('transform');
        app.querySelector('.tooltip').style.removeProperty('bottom');
      });
    };
    dock.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch' || innerWidth <= 820 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      pointer = event.clientX;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const apps = [...dock.querySelectorAll('.dock-app')];
        const dockRect = dock.getBoundingClientRect();
        // Stable unmagnified centers avoid a feedback loop as the shelf expands.
        const baseWidth = apps.length * 52 + (apps.length - 1) * 3 + 25;
        const start = dockRect.left + dockRect.width / 2 - baseWidth / 2;
        apps.forEach((app,index) => {
          const distance = Math.abs(pointer - (start + index * 55 + 26));
          const influence = Math.max(0, 1 - distance / 135);
          const scale = 1 + .42 * (1 - Math.cos(influence * Math.PI)) / 2;
          const width = 52 * scale;
          app.style.flexBasis = `${width}px`;
          app.style.width = `${width}px`;
          app.querySelector('.dock-icon').style.transform = `scale(${scale})`;
          app.querySelector('.tooltip').style.bottom = `${52 * scale + 14}px`;
        });
      });
    });
    dock.addEventListener('pointerleave', reset);
    dock.addEventListener('focusout', reset);
    window.addEventListener('resize', reset);
  }

  function installFinderControls(win) {
    const content = win.querySelector('.window-content');
    const pill = win.querySelector('.view-pill');
    pill.removeAttribute('aria-hidden');
    pill.setAttribute('role','group');
    pill.setAttribute('aria-label','Finder view');
    pill.innerHTML = `<button class="finder-view" aria-label="Icon view" aria-pressed="true" data-view="icons"><svg viewBox="0 0 24 24"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg></button><button class="finder-view" aria-label="List view" aria-pressed="false" data-view="list"><svg viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h1M3 12h1M3 18h1"/></svg></button>`;
    pill.addEventListener('click', event => {
      const button = event.target.closest('[data-view]');
      if (!button) return;
      content.dataset.view = button.dataset.view;
      pill.querySelectorAll('button').forEach(el=>el.setAttribute('aria-pressed',String(el===button)));
    });
    const id = win.dataset.window;
    const status = document.createElement('footer');
    status.className = 'finder-status';
    status.innerHTML = `<span>Amir’s Mac › ${DATA.folders.find(f=>f.id===id).short}</span><span>${DATA[id].length} items</span>`;
    win.appendChild(status);
    const items = [...content.querySelectorAll('.project-card,.media-item,.book,.photo-tile,.track')];
    items.forEach((item,index) => {
      item.classList.add('finder-item');
      if (item.tagName !== 'BUTTON') item.tabIndex = 0;
      item.dataset.finderIndex = index;
    });
    content.addEventListener('click', event => {
      const item = event.target.closest('.finder-item');
      items.forEach(el=>el.classList.toggle('selected',el===item));
    });
    content.addEventListener('keydown', event => {
      const item = event.target.closest('.finder-item');
      if (!item || event.target !== item) return;
      if (event.key === 'Enter' && item.tagName !== 'BUTTON') {
        item.querySelector('a,button')?.click();
      }
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const next = Math.max(0,Math.min(items.length-1,items.indexOf(item) + (['ArrowDown','ArrowRight'].includes(event.key) ? 1 : -1)));
        items[next].focus();
        items.forEach(el=>el.classList.toggle('selected',el===items[next]));
      }
    });
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
      document.querySelector('.gg-context-menu')?.classList.add('hidden');
      document.querySelector('.gg-info-panel')?.classList.add('hidden');
      toggleControlCenter(false);
      closeSpotlight();
    }
  });

  // Arrow navigation for real menu buttons; keep modal keyboard focus contained.
  document.addEventListener('keydown', event => {
    const trigger = event.target.closest('.menu-trigger');
    if (trigger && ['ArrowDown','ArrowUp'].includes(event.key)) {
      event.preventDefault();
      if (trigger.getAttribute('aria-expanded') !== 'true') trigger.click();
      document.querySelector('#menu-popover button:not(:disabled)')?.focus();
      return;
    }
    const menu = event.target.closest('[role=menu]');
    if (menu && ['ArrowDown','ArrowUp','Home','End'].includes(event.key)) {
      const entries = [...menu.querySelectorAll('button:not(:disabled)')];
      if (!entries.length) return;
      event.preventDefault();
      let next = entries.indexOf(document.activeElement) + (event.key === 'ArrowUp' ? -1 : 1);
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = entries.length - 1;
      entries[(next + entries.length) % entries.length].focus();
    }
    if (event.key === 'Tab') {
      const dialog = [...document.querySelectorAll('[aria-modal=true]')].find(el=>!el.classList.contains('hidden'));
      if (!dialog) return;
      const controls = [...dialog.querySelectorAll('button:not(:disabled), input, a[href], [tabindex="0"]')].filter(el=>el.getClientRects().length);
      if (!controls.length) return;
      if (event.shiftKey && (document.activeElement === controls[0] || !dialog.contains(document.activeElement))) {event.preventDefault();controls.at(-1).focus();}
      else if (!event.shiftKey && (document.activeElement === controls.at(-1) || !dialog.contains(document.activeElement))) {event.preventDefault();controls[0].focus();}
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

(() => {
  'use strict';
  if (window.MACOS27_FIDELITY_BEHAVIOR_20260918) return;
  window.MACOS27_FIDELITY_BEHAVIOR_20260918 = true;

  const DATA = window.PORTFOLIO_DATA;
  const dock = document.getElementById('dock');
  const desktop = document.getElementById('desktop');
  const desktopIcons = document.getElementById('desktop-icons');

  const svg = (body, viewBox = '0 0 24 24') =>
    `<svg viewBox="${viewBox}" aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

  const trashSVG = svg('<path d="M7 8h10l-.7 11H7.7L7 8Z"/><path d="M9 8V5.8h6V8M5 8h14M10 11v5M14 11v5"/>');

  function upgradeDock() {
    if (!dock) return;

    const artwork = {finder:'finder',music:'music',photos:'photos',projects:'safari',books:'books',games:'folder',movies:'movies'};
    dock.querySelectorAll('[data-dock]').forEach(button => {
      const name = artwork[button.dataset.dock];
      if (name) button.querySelector('.dock-icon').innerHTML = `<img class="dock-art" src="./assets/icons/${name}.svg" alt="" draggable="false">`;
    });

    if (!dock.querySelector('.gg-dock-separator')) {
      const separator = document.createElement('span');
      separator.className = 'gg-dock-separator';
      separator.setAttribute('aria-hidden', 'true');
      dock.appendChild(separator);
    }

    if (!dock.querySelector('[data-dock="trash"]')) {
      const trash = document.createElement('button');
      trash.className = 'dock-app';
      trash.type = 'button';
      trash.dataset.dock = 'trash';
      trash.setAttribute('aria-label', 'Trash');
      trash.innerHTML = `<span class="tooltip">Trash</span><span class="dock-icon"><img class="dock-art" src="./assets/icons/trash.svg" alt="" draggable="false"></span>`;
      trash.addEventListener('click', (event) => {
        event.stopPropagation();
        hideContextMenu();
        showInfo(null, 'Trash', 'Empty', 'No portfolio content is deleted.');
      });
      dock.appendChild(trash);
    }
  }

  function reorderStatusItems() {
    const right = document.querySelector('.menu-right');
    if (!right) return;
    const items = [...right.children];
    const wifi = items.find(el => el.getAttribute('aria-label')?.includes('Wi-Fi'));
    const sound = items.find(el => el.getAttribute('aria-label')?.includes('Sound'));
    const search = right.querySelector('.gg-spotlight-trigger');
    const control = right.querySelector('[data-gg-control]');
    const battery = right.querySelector('.battery');
    const clock = document.getElementById('menu-clock');
    [wifi, sound, search, control, battery, clock].forEach(el => el && right.appendChild(el));
  }

  function createContextMenu() {
    if (document.querySelector('.gg-context-menu')) return;
    const menu = document.createElement('div');
    menu.className = 'gg-context-menu hidden';
    menu.setAttribute('role', 'menu');
    document.body.appendChild(menu);

    const info = document.createElement('section');
    info.className = 'gg-info-panel hidden';
    info.setAttribute('role', 'dialog');
    info.setAttribute('aria-modal', 'true');
    info.setAttribute('aria-label', 'Get Info');
    document.body.appendChild(info);

    menu.addEventListener('click', (event) => {
      const action = event.target.closest('[data-gg-context]')?.dataset.ggContext;
      if (!action) return;
      const id = menu.dataset.folderId;

      if (action === 'open' && id) {
        document.querySelector(`[data-dock="${id}"]`)?.click();
      } else if (action === 'info' && id) {
        showInfo(id);
      } else if (action === 'show-desktop') {
        document.querySelector('[data-menu="view"]')?.click();
        const cmd = document.querySelector('[data-command="show-desktop"]');
        cmd?.click();
      } else if (action === 'view-options') {
        showInfo(null, 'Desktop View Options', 'Icon size: 73 px', 'Grid spacing: macOS-style');
      }

      hideContextMenu();
    });
  }

  function showInfo(id, titleOverride, kindOverride, detailOverride) {
    const panel = document.querySelector('.gg-info-panel');
    if (!panel) return;
    const folder = DATA?.folders?.find(item => item.id === id);
    const title = titleOverride || folder?.label || 'Desktop';
    const kind = kindOverride || 'Folder';
    const detail = detailOverride || 'Amir Saeid Dehghan — Personal Desktop';

    panel.innerHTML = `
      <button class="gg-info-close" type="button" aria-label="Close Get Info">×</button>
      <div class="gg-info-head">
        <span class="gg-info-folder" aria-hidden="true"></span>
        <div><h3>${title}</h3><p>${kind}</p></div>
      </div>
      <div class="gg-info-row"><span>Kind</span><span>${kind}</span></div>
      <div class="gg-info-row"><span>Where</span><span>Personal Desktop</span></div>
      <div class="gg-info-row"><span>Owner</span><span>Amir Saeid Dehghan</span></div>
      <div class="gg-info-row"><span>Details</span><span>${detail}</span></div>`;
    panel.classList.remove('hidden');
    panel.querySelector('.gg-info-close')?.addEventListener('click', () => panel.classList.add('hidden'), { once: true });
    panel.querySelector('.gg-info-close')?.focus();
  }

  function showContextMenu(event, folderId) {
    const menu = document.querySelector('.gg-context-menu');
    if (!menu) return;
    menu.dataset.folderId = folderId || '';

    if (folderId) {
      menu.innerHTML = `
        <button type="button" role="menuitem" data-gg-context="open"><span>Open</span><kbd>⌘O</kbd></button>
        <button type="button" role="menuitem" data-gg-context="info"><span>Get Info</span><kbd>⌘I</kbd></button>
        <div class="separator"></div>
        <button type="button" role="menuitem" disabled>Rename</button>
        <button type="button" role="menuitem" disabled>Quick Look</button>
        <div class="separator"></div>
        <button type="button" role="menuitem" data-gg-context="view-options">Show View Options</button>`;
    } else {
      menu.innerHTML = `
        <button type="button" role="menuitem" data-gg-context="show-desktop">Show Desktop</button>
        <div class="separator"></div>
        <button type="button" role="menuitem" disabled>Sort By</button>
        <button type="button" role="menuitem" disabled>Clean Up</button>
        <div class="separator"></div>
        <button type="button" role="menuitem" data-gg-context="view-options">Show View Options</button>`;
    }

    menu.classList.remove('hidden');
    const rect = menu.getBoundingClientRect();
    const x = Math.min(event.clientX, window.innerWidth - rect.width - 6);
    const y = Math.min(event.clientY, window.innerHeight - rect.height - 8);
    menu.style.left = `${Math.max(6, x)}px`;
    menu.style.top = `${Math.max(34, y)}px`;
  }

  function hideContextMenu() {
    document.querySelector('.gg-context-menu')?.classList.add('hidden');
  }

  function bindContextMenu() {
    document.addEventListener('contextmenu', (event) => {
      const icon = event.target.closest('.desktop-icon');
      const onDesktop = event.target.closest('#desktop') && !event.target.closest('.finder-window');

      if (!icon && !onDesktop) return;
      event.preventDefault();

      if (icon) {
        desktopIcons?.querySelectorAll('.desktop-icon.selected').forEach(el => el.classList.remove('selected'));
        icon.classList.add('selected');
        showContextMenu(event, icon.dataset.open);
      } else {
        showContextMenu(event, null);
      }
    });

    document.addEventListener('pointerdown', (event) => {
      if (!event.target.closest('.gg-context-menu')) hideContextMenu();
      if (!event.target.closest('.gg-info-panel') && !event.target.closest('[data-gg-context="info"]')) {
        document.querySelector('.gg-info-panel')?.classList.add('hidden');
      }
    });
  }

  function bindMinimizeTargeting() {
    document.addEventListener('pointerdown', (event) => {
      const min = event.target.closest('.traffic.min');
      if (!min) return;
      const win = min.closest('.finder-window');
      if (!win) return;
      const id = win.dataset.window;
      const dockItem = dock?.querySelector(`[data-dock="${id}"]`);
      if (!dockItem) return;

      const wr = win.getBoundingClientRect();
      const dr = dockItem.getBoundingClientRect();
      win.style.setProperty('--gg-min-x', `${dr.left + dr.width / 2 - (wr.left + wr.width / 2)}px`);
      win.style.setProperty('--gg-min-y', `${dr.top + dr.height / 2 - (wr.top + wr.height / 2)}px`);
    }, true);
  }

  function observeFinderWindows() {
    const layer = document.getElementById('window-layer');
    if (!layer || typeof MutationObserver !== 'function') return;
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach(node => {
          if (!(node instanceof Element)) return;
          if (node.matches('.finder-window')) window.MACOS27?.upgradeWindow?.(node);
          node.querySelectorAll?.('.finder-window').forEach(win => window.MACOS27?.upgradeWindow?.(win));
        });
      }
    });
    observer.observe(layer, { childList: true });
  }

  function bindDesktopKeyboardOpen() {
    desktopIcons?.addEventListener('keydown', (event) => {
      const icon = event.target.closest('.desktop-icon');
      if (!icon) return;
      if (event.key === 'Enter') {
        event.preventDefault();
        document.querySelector(`[data-dock="${icon.dataset.open}"]`)?.click();
      }
    });
  }

  function init() {
    upgradeDock();
    reorderStatusItems();
    createContextMenu();
    bindContextMenu();
    bindMinimizeTargeting();
    observeFinderWindows();
    bindDesktopKeyboardOpen();

    // Double-click creation occurs after the original click listener; this pass
    // catches any window that appears from a double-click immediately.
    document.addEventListener('dblclick', () => queueMicrotask(() => window.MACOS27?.upgradeExistingWindows?.()));
    window.MACOS27?.upgradeExistingWindows?.();
  }

  init();
})();
