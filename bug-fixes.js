/* PortOS targeted bug fixes — keeps the existing design/runtime intact. */
(() => {
  const VALUES_ICON = 'Values Ed..png?v=13';

  function fixValuesRuntimeIcons(root = document) {
    root.querySelectorAll('.portos-app-window, .portos-window-task, .task-app').forEach((el) => {
      const title = el.querySelector('.portos-app-title')?.textContent?.trim()
        || el.getAttribute('aria-label')
        || el.title
        || '';
      if (title !== 'Values Ed.' && title !== 'Values Education') return;
      const img = el.querySelector('.portos-real-app-icon');
      if (img) img.src = VALUES_ICON;
      const icon = el.querySelector('.portos-app-icon, .mini-icon');
      if (icon) icon.style.setProperty('background-image', `url("${VALUES_ICON}")`, 'important');
    });
  }

  // The Music app originally put a <button> inside another <button> for the
  // favourite control. Browsers close the outer button during HTML parsing,
  // which makes row.querySelector('.song-heart') return null and stops the
  // library from rendering. Convert only that nested control into a span.
  const innerHTMLDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
  if (innerHTMLDescriptor?.set && innerHTMLDescriptor?.get) {
    Object.defineProperty(Element.prototype, 'innerHTML', {
      configurable: innerHTMLDescriptor.configurable,
      enumerable: innerHTMLDescriptor.enumerable,
      get: innerHTMLDescriptor.get,
      set(value) {
        let next = value;
        if (this.classList?.contains('song-row') && typeof next === 'string' && next.includes('class="song-heart"')) {
          next = next
            .replace('<button class="song-heart" type="button" aria-label="Favorite">', '<span class="song-heart" role="button" tabindex="0" aria-label="Favorite">')
            .replace('</button>', '</span>');
        }
        return innerHTMLDescriptor.set.call(this, next);
      }
    });
  }

  function fixMusicFavoriteKeyboard() {
    document.querySelectorAll('.portos-music-app .song-heart').forEach((heart) => {
      if (heart.dataset.portosKeyboardReady === 'true') return;
      heart.dataset.portosKeyboardReady = 'true';
      heart.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        heart.click();
      });
    });
  }

  // Start-menu Music should open the actual Music app, not merely reveal the gadget.
  document.addEventListener('click', (event) => {
    const item = event.target.closest?.('.start-item');
    if (!item) return;
    const title = item.querySelector('strong')?.textContent?.trim();
    if (title !== 'Music') return;
    const desktopMusic = document.querySelector('.desktop-icon.icon-music');
    if (!desktopMusic) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    desktopMusic.click();
  }, true);

  fixValuesRuntimeIcons();
  fixMusicFavoriteKeyboard();

  new MutationObserver(() => {
    fixValuesRuntimeIcons();
    fixMusicFavoriteKeyboard();
  }).observe(document.body, { childList: true, subtree: true });
})();
