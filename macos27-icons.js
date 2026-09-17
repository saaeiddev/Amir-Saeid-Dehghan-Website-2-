(() => {
  'use strict';

  let seq = 0;
  const uid = (prefix = 'gg') => `${prefix}-${++seq}`;

  function defs(id) {
    return `
      <defs>
        <linearGradient id="${id}-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ffffff" stop-opacity=".46"/>
          <stop offset=".35" stop-color="#ffffff" stop-opacity=".08"/>
          <stop offset="1" stop-color="#ffffff" stop-opacity=".02"/>
        </linearGradient>
        <linearGradient id="${id}-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#86d5ff"/>
          <stop offset=".45" stop-color="#42aaf7"/>
          <stop offset="1" stop-color="#1487e4"/>
        </linearGradient>
        <linearGradient id="${id}-blue2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#c1ecff"/>
          <stop offset="1" stop-color="#5ab8ff"/>
        </linearGradient>
        <linearGradient id="${id}-red" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ff6a86"/>
          <stop offset=".5" stop-color="#ff2d55"/>
          <stop offset="1" stop-color="#d61145"/>
        </linearGradient>
        <linearGradient id="${id}-orange" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ffbd4a"/>
          <stop offset=".52" stop-color="#ff8a1f"/>
          <stop offset="1" stop-color="#ef5a0b"/>
        </linearGradient>
        <linearGradient id="${id}-purple" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#9d8cff"/>
          <stop offset=".5" stop-color="#635bff"/>
          <stop offset="1" stop-color="#4136d7"/>
        </linearGradient>
        <linearGradient id="${id}-dark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#3d424c"/>
          <stop offset=".46" stop-color="#20242c"/>
          <stop offset="1" stop-color="#0d1118"/>
        </linearGradient>
        <filter id="${id}-shadow" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.6" flood-color="#000" flood-opacity=".28"/>
        </filter>
      </defs>`;
  }

  function squircleShell(id, fill) {
    return `
      <rect x="5" y="5" width="54" height="54" rx="13.7" fill="${fill}"/>
      <rect x="5.75" y="5.75" width="52.5" height="52.5" rx="12.95" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="1.5"/>
      <path d="M12 7.5h40c3.8 0 6.7 3.1 6.7 6.9v2.4c-10.5-3.7-35.8-4-53.4.2v-2.6C5.3 10.6 8.2 7.5 12 7.5Z" fill="url(#${id}-glass)" opacity=".9"/>
      <path d="M9 49.5c8 5.1 38.3 6.2 46.2-1.2" fill="none" stroke="#000" stroke-opacity=".1" stroke-width="2" stroke-linecap="round"/>
    `;
  }

  function appIcon(name, size = 64) {
    const id = uid(name);
    let art = '';

    if (name === 'finder') {
      art = `
        ${defs(id)}
        <g filter="url(#${id}-shadow)">
          <rect x="5" y="5" width="54" height="54" rx="13.7" fill="#42aaff"/>
          <path d="M5 18.7C12.2 12.4 19.5 9 31.8 8.1V59H18C10.8 59 5 53.2 5 46V18.7Z" fill="#bde9ff"/>
          <path d="M32 5h14c7.2 0 13 5.8 13 13v28c0 7.2-5.8 13-13 13H32V5Z" fill="url(#${id}-blue)"/>
          <path d="M31.8 7.3c-7.7 10.3-8.3 22.4-6.1 33.1" fill="none" stroke="#13253f" stroke-width="2.1" stroke-linecap="round"/>
          <path d="M19.2 25.3c.8-1 2-1 2.8 0" fill="none" stroke="#18324b" stroke-width="2.1" stroke-linecap="round"/>
          <path d="M42.6 24.9c.9-1 2.1-1 3 0" fill="none" stroke="#0d2542" stroke-width="2.1" stroke-linecap="round"/>
          <path d="M17.7 42c7.5 5.2 20.8 5.8 29.1-.8" fill="none" stroke="#17324f" stroke-width="2.15" stroke-linecap="round"/>
          <rect x="5.75" y="5.75" width="52.5" height="52.5" rx="12.95" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="1.5"/>
          <path d="M12 7.5h40c3.8 0 6.7 3.1 6.7 6.9v2.4c-12-3.7-36.6-3.8-53.4.7v-3.1C5.3 10.6 8.2 7.5 12 7.5Z" fill="url(#${id}-glass)" opacity=".72"/>
        </g>`;
    } else if (name === 'music') {
      art = `${defs(id)}<g filter="url(#${id}-shadow)">${squircleShell(id, `url(#${id}-red)`)}
        <path d="M39.2 19.1v22.3c0 5.3-3.6 8.5-8.8 8.5-4.6 0-7.4-2.6-7.4-6.1 0-3.8 3.3-6.2 7.8-6.2 1.5 0 2.7.2 3.6.6V25.4l15.5-3.4v16.5c0 5.1-3.4 8.2-8.4 8.2-4.3 0-7.1-2.4-7.1-5.9 0-3.6 3-6 7.4-6 1.4 0 2.5.2 3.4.6V16.3l-15.9 3.5v-.7Z" fill="#fff"/>
        <path d="M34.5 20.1 50 16.7v5.6l-15.5 3.4Z" fill="#fff"/>
      </g>`;
    } else if (name === 'photos') {
      const petals = [
        ['#ff3b30', 32, 16, 0], ['#ff9500', 43, 21, 45], ['#ffd60a', 48, 32, 90], ['#34c759', 43, 43, 135],
        ['#00c7be', 32, 48, 180], ['#0a84ff', 21, 43, 225], ['#5e5ce6', 16, 32, 270], ['#ff2d55', 21, 21, 315]
      ];
      art = `${defs(id)}<g filter="url(#${id}-shadow)">${squircleShell(id, '#f7f8fb')}
        ${petals.map(([c,cx,cy,r]) => `<ellipse cx="${cx}" cy="${cy}" rx="8.2" ry="13.2" fill="${c}" fill-opacity=".9" transform="rotate(${r} ${cx} ${cy})"/>`).join('')}
        <circle cx="32" cy="32" r="8.3" fill="#fff"/><circle cx="32" cy="32" r="4.5" fill="#f4f5f7"/>
        <path d="M10 8.5h44" stroke="#fff" stroke-opacity=".75" stroke-width="2" stroke-linecap="round"/>
      </g>`;
    } else if (name === 'projects') {
      art = `${defs(id)}<g filter="url(#${id}-shadow)">${squircleShell(id, `url(#${id}-blue)`)}
        <path d="M18 22.5h10l3.2 3.6H47c2 0 3.7 1.7 3.7 3.7v14c0 2-1.7 3.7-3.7 3.7H17c-2 0-3.7-1.7-3.7-3.7V26.2c0-2 1.6-3.7 3.7-3.7H18Z" fill="#d9f2ff" fill-opacity=".96"/>
        <path d="M13.3 30.4h37.4v13.4c0 2-1.7 3.7-3.7 3.7H17c-2 0-3.7-1.7-3.7-3.7V30.4Z" fill="#fff" fill-opacity=".72"/>
        <path d="M24.8 37h14.4M32 29.8v14.4" stroke="#168ce8" stroke-width="2.6" stroke-linecap="round"/>
      </g>`;
    } else if (name === 'books') {
      art = `${defs(id)}<g filter="url(#${id}-shadow)">${squircleShell(id, `url(#${id}-orange)`)}
        <path d="M16 20.3c5.4-1.5 11.2-.7 16 2.5v23.4c-4.8-3.2-10.6-4-16-2.4V20.3Z" fill="#fff" fill-opacity=".95"/>
        <path d="M48 20.3c-5.4-1.5-11.2-.7-16 2.5v23.4c4.8-3.2 10.6-4 16-2.4V20.3Z" fill="#fff" fill-opacity=".82"/>
        <path d="M32 23v23M19.7 25.7c3.2-.5 6.1-.2 8.8 1M44.3 25.7c-3.2-.5-6.1-.2-8.8 1" stroke="#ef7b16" stroke-opacity=".5" stroke-width="1.4" stroke-linecap="round"/>
      </g>`;
    } else if (name === 'games') {
      art = `${defs(id)}<g filter="url(#${id}-shadow)">${squircleShell(id, `url(#${id}-purple)`)}
        <path d="M21.7 25.2h20.6c7 0 11.7 6.9 9.2 13.3l-2.2 5.6c-1.4 3.7-6.3 4.5-8.8 1.4L36.8 41h-9.6l-3.7 4.5c-2.5 3.1-7.4 2.3-8.8-1.4l-2.2-5.6c-2.5-6.4 2.2-13.3 9.2-13.3Z" fill="#fff" fill-opacity=".95"/>
        <path d="M20.5 32.9h7.4M24.2 29.2v7.4" stroke="#574be8" stroke-width="2.4" stroke-linecap="round"/>
        <circle cx="41.2" cy="31.5" r="2.1" fill="#574be8"/><circle cx="45.8" cy="35.7" r="2.1" fill="#574be8"/>
      </g>`;
    } else if (name === 'movies') {
      art = `${defs(id)}<g filter="url(#${id}-shadow)">${squircleShell(id, `url(#${id}-dark)`)}
        <rect x="14" y="24" width="36" height="24" rx="5.5" fill="#dff5ff" fill-opacity=".94"/>
        <path d="M14 25.2h36v7.6H14z" fill="#62c7ff"/>
        <path d="m17 24 5-8h8l-5 8h-8Zm13 0 5-8h8l-5 8h-8Zm13 0 5-8h2v8h-7Z" fill="#e9f9ff"/>
        <path d="M25.6 37.3 39 37.3" stroke="#2c7fae" stroke-width="2" stroke-linecap="round"/>
      </g>`;
    } else {
      return appIcon('projects', size);
    }

    return `<svg class="gg-app-icon" viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">${art}</svg>`;
  }

  function folderIcon(kind = 'folder', badgeColor = '#0a84ff') {
    const id = uid('folder');
    const glyphs = {
      music: '<path d="M41 31v13c0 3.4-2.3 5.4-5.7 5.4-3 0-4.8-1.6-4.8-3.9 0-2.5 2.1-4 5-4 .9 0 1.7.1 2.3.4V34l9.7-2.1v9.8c0 3.2-2.2 5.2-5.4 5.2-2.8 0-4.5-1.6-4.5-3.7 0-2.3 1.9-3.8 4.7-3.8.8 0 1.5.1 2 .4V29.2L41 30v1Z"/>',
      photos: '<circle cx="40" cy="39" r="5"/><path d="M31 46l6-6 4 4 3-3 6 6"/>',
      projects: '<path d="M30 36h20M40 26v20"/>',
      books: '<path d="M30 29h9c3 0 5 2 5 5v15H34c-2 0-4-2-4-4V29Zm14 5h5c2 0 4 2 4 4v11h-9V34Z"/>',
      games: '<path d="M33 33h14c4.8 0 8 4.7 6.3 9.1L52 45.8c-1 2.5-4.3 3-6 .9l-2.5-3H37l-2.5 3c-1.7 2.1-5 1.6-6-.9l-1.3-3.7c-1.7-4.4 1.5-9.1 5.8-9.1Z"/><path d="M32 38h6M35 35v6M46 37h.1M50 40h.1"/>',
      movies: '<rect x="29" y="31" width="23" height="16" rx="3"/><path d="M29 36h23M34 31l3 5M42 31l3 5"/>',
      folder: '<path d="M30 32h9l3 3h11v12H30z"/>'
    };
    return `<svg class="gg-folder-svg" viewBox="0 0 80 66" aria-hidden="true">
      <defs>
        <linearGradient id="${id}-tab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9de1ff"/><stop offset="1" stop-color="#53b9f6"/></linearGradient>
        <linearGradient id="${id}-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8bd6ff"/><stop offset=".52" stop-color="#4cb3f7"/><stop offset="1" stop-color="#208fe8"/></linearGradient>
        <linearGradient id="${id}-front" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".32"/><stop offset=".32" stop-color="#ffffff" stop-opacity=".06"/><stop offset="1" stop-color="#087ad4" stop-opacity=".14"/></linearGradient>
        <linearGradient id="${id}-badge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".46"/><stop offset=".22" stop-color="${badgeColor}" stop-opacity=".92"/><stop offset="1" stop-color="${badgeColor}" stop-opacity=".62"/></linearGradient>
      </defs>
      <path d="M8.5 14.5c0-3.7 3-6.7 6.7-6.7h18.2c1.8 0 3.5.7 4.8 2l5.2 5H65c3.7 0 6.7 3 6.7 6.7v5.8H8.5V14.5Z" fill="url(#${id}-tab)" stroke="#fff" stroke-opacity=".32"/>
      <rect x="5.2" y="18.5" width="69.6" height="43" rx="10" fill="url(#${id}-body)" stroke="#fff" stroke-opacity=".34"/>
      <rect x="6.8" y="20.1" width="66.4" height="39.8" rx="8.6" fill="url(#${id}-front)"/>
      <path d="M9.5 22.5h61" stroke="#fff" stroke-opacity=".45" stroke-width="1.4" stroke-linecap="round"/>
      <rect x="24.5" y="27" width="31" height="28" rx="8" fill="url(#${id}-badge)" stroke="#fff" stroke-opacity=".36"/>
      <g fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${glyphs[kind] || glyphs.folder}</g>
    </svg>`;
  }

  function miniIcon(name) {
    const colors = { projects:'#0a84ff', photos:'#ff453a', music:'#ff375f', books:'#ff9f0a', games:'#5e5ce6', movies:'#64d2ff', folder:'#8e8e93' };
    const c = colors[name] || '#0a84ff';
    const inner = {
      music: '<path d="M10.8 5.2v7.3c0 1.8-1.2 2.9-3 2.9-1.6 0-2.6-.9-2.6-2.1 0-1.3 1.1-2.2 2.7-2.2.5 0 .9.1 1.2.2V7l5-1.1v5.5c0 1.7-1.1 2.8-2.8 2.8-1.5 0-2.4-.8-2.4-2 0-1.2 1-2 2.5-2 .4 0 .8.1 1.1.2V4.8l-1.7.4Z" fill="#fff"/>',
      photos: '<circle cx="9" cy="9" r="3.5" fill="#fff"/><path d="M4.7 13 7 10.7l1.8 1.8 1.6-1.5 2.9 2.9" fill="none" stroke="#fff" stroke-width="1.4"/>',
      projects: '<path d="M4.5 6h4l1.8 2H14v6H4.5Z" fill="#fff"/><path d="M9.2 8.8v3.6M7.4 10.6H11" stroke="${c}" stroke-width="1.2"/>',
      books: '<path d="M4.5 5.3c2.2-.7 4-.2 4.5.6v7.6c-.8-.8-2.6-1.2-4.5-.5V5.3Zm9 0c-2.2-.7-4-.2-4.5.6v7.6c.8-.8 2.6-1.2 4.5-.5V5.3Z" fill="#fff"/>',
      games: '<path d="M5.3 7h7.4c2.5 0 4.2 2.5 3.3 4.8l-.7 1.8c-.5 1.3-2.2 1.6-3.1.5l-1.3-1.5H7.1l-1.3 1.5c-.9 1.1-2.6.8-3.1-.5L2 11.8C1.1 9.5 2.8 7 5.3 7Z" fill="#fff"/>',
      movies: '<rect x="3.6" y="5" width="10.8" height="8.5" rx="2" fill="#fff"/><path d="M3.6 8h10.8" stroke="${c}" stroke-width="1.2"/>',
      folder: '<path d="M3 6h5l1.8 2H15v6H3Z" fill="#fff"/>'
    };
    return `<svg class="gg-mini-icon" viewBox="0 0 18 18" aria-hidden="true"><rect x="1" y="1" width="16" height="16" rx="4.5" fill="${c}"/><rect x="1.6" y="1.6" width="14.8" height="14.8" rx="3.9" fill="none" stroke="#fff" stroke-opacity=".28"/>${inner[name] || inner.folder}</svg>`;
  }

  const badgeColors = { music:'#ff375f', photos:'#ff453a', projects:'#0a84ff', books:'#ff9f0a', games:'#5e5ce6', movies:'#64d2ff' };

  function upgradeDesktopIcons(root = document) {
    root.querySelectorAll?.('.desktop-icon[data-open]').forEach((button) => {
      const kind = button.dataset.open;
      const art = button.querySelector('.folder-art');
      if (!art || art.dataset.icon27 === 'true') return;
      art.dataset.icon27 = 'true';
      art.classList.add('gg-real-folder');
      art.innerHTML = folderIcon(kind, badgeColors[kind]);
    });
  }

  function upgradeDock(root = document) {
    root.querySelectorAll?.('.dock-app[data-dock]').forEach((button) => {
      const kind = button.dataset.dock;
      const holder = button.querySelector('.dock-icon');
      if (!holder || holder.dataset.icon27 === 'true') return;
      holder.dataset.icon27 = 'true';
      holder.innerHTML = appIcon(kind === 'finder' ? 'finder' : kind);
    });
  }

  function upgradeSidebar(root = document) {
    root.querySelectorAll?.('.gg-sidebar-item').forEach((button) => {
      const kind = button.dataset.ggOpen || 'folder';
      const holder = button.querySelector('.gg-side-icon');
      if (!holder || holder.dataset.icon27 === 'true') return;
      holder.dataset.icon27 = 'true';
      holder.innerHTML = miniIcon(kind);
    });
  }

  function upgradeSpotlight(root = document) {
    root.querySelectorAll?.('.gg-spot-result[data-spot-open]').forEach((button) => {
      const kind = button.dataset.spotOpen;
      const holder = button.querySelector(':scope > span:first-child');
      if (!holder || holder.dataset.icon27 === 'true') return;
      holder.dataset.icon27 = 'true';
      holder.innerHTML = appIcon(kind, 40);
    });
  }

  function upgradeMiniFolders(root = document) {
    root.querySelectorAll?.('.finder-window[data-window]').forEach((win) => {
      const holder = win.querySelector('.mini-folder');
      if (!holder || holder.dataset.icon27 === 'true') return;
      holder.dataset.icon27 = 'true';
      holder.classList.add('gg-mini-folder-svg');
      holder.innerHTML = folderIcon(win.dataset.window, badgeColors[win.dataset.window]);
    });
  }

  function upgradeAll(root = document) {
    upgradeDesktopIcons(root);
    upgradeDock(root);
    upgradeSidebar(root);
    upgradeSpotlight(root);
    upgradeMiniFolders(root);
  }

  function start() {
    upgradeAll(document);
    const observer = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        upgradeAll(node);
        if (node.parentElement) upgradeAll(node.parentElement);
      }));
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once:true });
  else start();
})();
