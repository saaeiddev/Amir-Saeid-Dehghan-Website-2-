# Amir Saeid Dehghan — Personal Desktop

Static GitHub Pages portfolio. `data.js` is the unchanged source of all six categories, text, links and media. No bundler or runtime dependency is required.

- `app.js`: content renderers and window lifecycle, focus, dragging, shortcuts and menus.
- `macos27.js`: Finder chrome and views, content search, Dock magnification and context menus.
- `styles.css`: original content and viewer styles.
- `covers.js` / `covers.css`: existing media artwork behavior.
- `macos27.css`: desktop chrome, materials, content presentation and responsive rules.
- `assets/`: local vector artwork; paths remain relative for project Pages hosting.

## Design references

Reviewed September 19, 2026:

- [Apple macOS 27](https://www.apple.com/os/macos/): uniform toolbars, continuous sidebars, improved readability and Liquid Glass materials.
- [Apple desktop reference](https://www.apple.com/v/os/g/images/shared/welcome/hero_macbook__d6o4ngynokom_large.jpg)
- [Apple wallpaper/material reference](https://www.apple.com/v/os/g/images/macos/highlights/siri__mfeve50fboii_large.jpg)
- [Apple Safari chrome](https://www.apple.com/v/os/g/images/macos/apple_intelligence/safari__wwqti2pesg22_large.jpg)

The warm folded-ribbon wallpaper and familiar app/folder silhouettes are original SVG browser equivalents, **not extracted official Apple system assets**. Apple references are used for visual comparison only. System controls are portfolio simulations; they do not change the visitor's operating system. Existing photo and book placeholders are intentionally retained.

## Interaction

Desktop: click selects, double-click or Enter opens. Touch: tap opens. Finder windows retain content and view state through minimization. Dock opens/restores folders. Spotlight searches category names and every existing item's text. Cmd/Ctrl+W closes the active window, Cmd/Ctrl+M minimizes, Cmd/Ctrl+Space opens search; browser/OS reserved shortcuts may take priority. Escape dismisses temporary panels. Reduced motion and reduced transparency are supported.

## Verification

Open `tests/desktop.html` in a static server for the manual viewport preview and behavior suite (1440×900, 1920×1080, 2560×1440, iPad, iPhone and small-phone sizes). The iframe sets a real CSS viewport at each size, scaled only for display. Check image loading, console errors, pointer interactions and appearance separately. The harness does not modify portfolio data or external resources.

The existing `.github/workflows/deploy-pages.yml` deploys `main` to the original Pages site.
