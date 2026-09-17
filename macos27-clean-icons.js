(() => {
  'use strict';

  const glyph = (kind, color = '#0b6fbd') => {
    const common = 'fill="none" stroke="'+color+'" stroke-width="2.15" stroke-linecap="round" stroke-linejoin="round"';
    const paths = {
      music: `<path ${common} d="M29 25v12.5c0 3-2 4.8-5 4.8-2.7 0-4.5-1.5-4.5-3.7 0-2.4 2-3.9 4.7-3.9.9 0 1.7.1 2.4.4V24l13-2.8v11.7c0 2.9-2 4.7-4.8 4.7-2.6 0-4.3-1.4-4.3-3.5 0-2.3 1.9-3.8 4.6-3.8.8 0 1.6.1 2.2.4V19.1L29 21v4Z"/>`,
      photos: `<rect ${common} x="18" y="21" width="25" height="18" rx="3.5"/><circle ${common} cx="25" cy="27" r="2.3"/><path ${common} d="m20.5 36 6-6 4.2 4 3-3 6.8 6"/>`,
      projects: `<path ${common} d="M18 24h9l3 3h14v13H18z"/><path ${common} d="M25 33h12M31 27v12"/>`,
      books: `<path ${common} d="M20 21h12v20H20a4 4 0 0 1-4-4V25a4 4 0 0 1 4-4Z"/><path ${common} d="M32 21h10a3 3 0 0 1 3 3v17H32zM25 26h4"/>`,
      games: `<path ${common} d="M23 27h14a7 7 0 0 1 6.5 9.4l-1.1 3a3 3 0 0 1-5 1l-2.6-3.3h-9.6l-2.6 3.3a3 3 0 0 1-5-1l-1.1-3A7 7 0 0 1 23 27Z"/><path ${common} d="M21 32h7M24.5 28.5v7M36.5 31.5h.01M40 34.5h.01"/>`,
      movies: `<rect ${common} x="18" y="23" width="26" height="17" rx="3.2"/><path ${common} d="M18 28h26M23 23l3 5M31 23l3 5M39 23l3 5"/>`
    };
    return paths[kind] || paths.projects;
  };

  function folderSVG(kind, mini = false) {
    const vb = mini ? '0 0 56 44' : '0 0 64 50';
    const x = mini ? 5 : 6;
    const y = mini ? 7 : 7;
    const w = mini ? 46 : 52;
    const h = mini ? 32 : 37;
    const frontY = mini ? 14 : 15;
    return `<svg viewBox="${vb}" aria-hidden="true">
      <defs>
        <linearGradient id="fg-${kind}-${mini}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#67bfff"/>
          <stop offset="1" stop-color="#2d98eb"/>
        </linearGradient>
        <linearGradient id="bg-${kind}-${mini}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#8fd2ff"/>
          <stop offset="1" stop-color="#58b3f5"/>
        </linearGradient>
      </defs>
      <path d="M${x+4} ${y+5}h15l4 4h${w-23}a5 5 0 0 1 5 5v${h-9}H${x}V${y+10}a5 5 0 0 1 5-5Z" fill="url(#bg-${kind}-${mini})"/>
      <path d="M${x} ${frontY+4}a5 5 0 0 1 5-5h${w-10}a5 5 0 0 1 5 5v${h-7}a5 5 0 0 1-5 5H${x+5}a5 5 0 0 1-5-5Z" fill="url(#fg-${kind}-${mini})" stroke="#ffffff" stroke-opacity=".18"/>
      <path d="M${x+4} ${frontY+3}h${w-8}" stroke="#fff" stroke-opacity=".25" stroke-linecap="round"/>
      <g opacity=".72" transform="${mini ? 'translate(-3 -3) scale(.9)' : ''}">${glyph(kind)}</g>
    </svg>`;
  }

  function finderSVG() {
    return `<svg viewBox="0 0 64 64" aria-hidden="true">
      <defs><linearGradient id="finderBlue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7fc7ff"/><stop offset="1" stop-color="#2c98eb"/></linearGradient></defs>
      <rect x="6" y="6" width="52" height="52" rx="12.5" fill="#d5f0ff" stroke="#fff" stroke-opacity=".22"/>
      <path d="M32 6h13.5A12.5 12.5 0 0 1 58 18.5v27A12.5 12.5 0 0 1 45.5 58H32Z" fill="url(#finderBlue)"/>
      <path d="M31.7 10c-5.9 8.2-6.7 20.2-4.2 30.1" fill="none" stroke="#17324b" stroke-width="2" stroke-linecap="round"/>
      <path d="M19.5 26c.8-.9 1.8-.9 2.6 0M42 26c.8-.9 1.8-.9 2.6 0M18.5 43c7.2 4.8 19.8 5.4 27.6-.5" fill="none" stroke="#17324b" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  }

  function upgradeDesktop() {
    document.querySelectorAll('.desktop-icon').forEach(btn => {
      const kind = btn.dataset.open;
      const art = btn.querySelector('.folder-art');
      if (!art || art.classList.contains('m27-folder')) return;
      art.classList.add('m27-folder');
      art.innerHTML = folderSVG(kind);
    });
  }

  function upgradeDock() {
    document.querySelectorAll('.dock-app').forEach(btn => {
      const kind = btn.dataset.dock;
      const holder = btn.querySelector('.dock-icon');
      if (!holder || holder.dataset.m27Upgraded === 'true') return;
      holder.dataset.m27Upgraded = 'true';
      if (kind === 'finder') {
        holder.classList.add('m27-finder-icon');
        holder.innerHTML = finderSVG();
      } else {
        holder.classList.add('m27-dock-folder');
        holder.innerHTML = folderSVG(kind, true);
      }
    });
  }

  upgradeDesktop();
  upgradeDock();
})();
