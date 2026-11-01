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

  // About Me content: a Vista/Frutiger Aero-style information hub matching
  // the approved three-section layout supplied by the user.
  function styleAboutMeContent(win) {
    if (!win || win.dataset.aboutMeStyled === 'true') return;
    const title = win.querySelector('.portos-app-title')?.textContent?.trim();
    if (title !== 'About Me') return;
    const body = win.querySelector('.portos-app-body');
    if (!body) return;

    body.classList.add('portos-about-body');
    body.innerHTML = `
      <div class="about-section">
        <div class="about-section-title"><span>Personal Information</span><i></i><b>⌃</b></div>
        <div class="about-items">
          <button class="about-item" type="button"><span class="about-glyph profile">●</span><span>Profile</span></button>
          <button class="about-item" type="button"><span class="about-glyph info">▤</span><span>Basic Information</span></button>
          <button class="about-item" type="button"><span class="about-glyph photos">▧</span><span>Photos</span></button>
          <button class="about-item" type="button"><span class="about-glyph interests">★</span><span>Interests &amp; Hobbies</span></button>
        </div>
      </div>
      <div class="about-section">
        <div class="about-section-title"><span>My Journey</span><i></i><b>⌃</b></div>
        <div class="about-items">
          <button class="about-item" type="button"><span class="about-glyph achievements">🏆</span><span>Achievements</span></button>
          <button class="about-item" type="button"><span class="about-glyph studies">▰</span><span>Studies</span></button>
          <button class="about-item" type="button"><span class="about-glyph skills">↗</span><span>Skills</span></button>
          <button class="about-item" type="button"><span class="about-glyph goals">♥</span><span>Goals</span></button>
        </div>
      </div>
      <div class="about-section">
        <div class="about-section-title"><span>More About Me</span><i></i><b>⌃</b></div>
        <div class="about-items">
          <button class="about-item" type="button"><span class="about-glyph favorites">♪</span><span>Favorites</span></button>
          <button class="about-item" type="button"><span class="about-glyph games">✚</span><span>Games</span></button>
          <button class="about-item" type="button"><span class="about-glyph movies">▶</span><span>Movies &amp; Series</span></button>
          <button class="about-item" type="button"><span class="about-glyph values">♧</span><span>Values &amp; Principles</span></button>
        </div>
      </div>`;
    win.dataset.aboutMeStyled = 'true';
  }

  const aboutStyle = document.createElement('style');
  aboutStyle.id = 'portos-about-me-content-style';
  aboutStyle.textContent = `
    .portos-app-window .portos-about-body{
      padding:16px 18px 18px!important;
      overflow:auto!important;
      background:linear-gradient(180deg,#fbfeff 0%,#eef7fb 52%,#e7f1f7 100%)!important;
      color:#111!important;
      text-shadow:none!important;
      font-family:'Segoe UI',Arial,sans-serif!important;
    }
    .portos-about-body .about-section{margin:0 0 18px}
    .portos-about-body .about-section:last-child{margin-bottom:0}
    .portos-about-body .about-section-title{display:flex;align-items:center;gap:10px;color:#1644b8;font-size:18px;line-height:22px;font-weight:800;text-shadow:0 1px 0 #fff}
    .portos-about-body .about-section-title i{height:1px;flex:1;background:linear-gradient(90deg,#76a8ed,rgba(118,168,237,.18));box-shadow:0 1px 0 #fff}
    .portos-about-body .about-section-title b{font-size:20px;line-height:16px;font-weight:900;color:#243bc1}
    .portos-about-body .about-items{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px 10px;padding:9px 0 0}
    .portos-about-body .about-item{min-width:0;min-height:72px;display:flex;align-items:center;gap:12px;padding:7px 8px;border:1px solid transparent;border-radius:12px;background:transparent;color:#111;font:600 14px/1.15 'Segoe UI',Arial,sans-serif;text-align:left;cursor:pointer;transition:background .16s ease,transform .16s ease,box-shadow .16s ease}
    .portos-about-body .about-item:hover{background:linear-gradient(180deg,rgba(255,255,255,.9),rgba(194,231,249,.62));border-color:rgba(103,173,221,.48);box-shadow:inset 0 1px 2px #fff,0 3px 9px rgba(30,105,166,.13);transform:translateY(-1px)}
    .portos-about-body .about-glyph{width:54px;height:54px;flex:0 0 54px;display:grid;place-items:center;border-radius:15px;border:1px solid rgba(255,255,255,.95);font-size:28px;font-weight:900;color:#fff;text-shadow:0 2px 3px rgba(0,52,110,.42);background:linear-gradient(145deg,#f8ffff 0%,#aeeafa 18%,#32a9df 57%,#0874bd 100%);box-shadow:inset 0 2px 4px rgba(255,255,255,.98),0 3px 7px rgba(0,62,112,.25)}
    .portos-about-body .about-glyph.profile{border-radius:50%;font-size:23px;background:radial-gradient(circle at 50% 28%,#cfffff 0 16%,#2ab2eb 17% 43%,#0878c4 44% 100%)}
    .portos-about-body .about-glyph.info{font-size:29px}.portos-about-body .about-glyph.photos{transform:rotate(-5deg)}
    .portos-about-body .about-glyph.interests,.portos-about-body .about-glyph.goals{color:#fff5a0;background:linear-gradient(145deg,#fff9a8,#ffd42b 48%,#e99a00);text-shadow:0 2px 3px rgba(133,80,0,.35)}
    .portos-about-body .about-glyph.achievements{font-size:24px;background:linear-gradient(145deg,#fff8b2,#ffd72b 45%,#e99a00)}
    .portos-about-body .about-glyph.studies{font-size:25px;background:linear-gradient(145deg,#8fd8ff,#347fe0 48%,#1250b0)}
    .portos-about-body .about-glyph.skills{font-size:34px;color:#44ef43;background:linear-gradient(145deg,#eaffff,#b7f5ff 35%,#28b8ed)}
    .portos-about-body .about-glyph.goals{color:#ffb9d0;background:linear-gradient(145deg,#fff,#ffb7d1 45%,#ef4d91);text-shadow:0 2px 3px rgba(130,0,55,.25)}
    .portos-about-body .about-glyph.favorites{font-size:34px;background:linear-gradient(145deg,#fff,#9ee6ff 45%,#147bc9)}
    .portos-about-body .about-glyph.games{font-size:24px;background:linear-gradient(145deg,#eefbff,#a8cde8 45%,#6b8fae)}
    .portos-about-body .about-glyph.movies{font-size:25px;background:linear-gradient(145deg,#eefaff,#72c8f0 48%,#1769ba)}
    .portos-about-body .about-glyph.values{font-size:29px;color:#74ff62;background:linear-gradient(145deg,#efffff,#b9f5d0 40%,#3eb95a)}
    @media(max-width:720px){.portos-about-body .about-items{grid-template-columns:repeat(2,minmax(0,1fr))}.portos-about-body .about-section-title{font-size:15px}.portos-about-body .about-item{font-size:12px;min-height:62px}.portos-about-body .about-glyph{width:46px;height:46px;flex-basis:46px;font-size:22px}}
  `;
  document.head.appendChild(aboutStyle);

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

  function applyAboutMeContent(root = document) {
    root.querySelectorAll('.portos-app-window').forEach(styleAboutMeContent);
  }

  fixValuesRuntimeIcons();
  fixMusicFavoriteKeyboard();
  applyAboutMeContent();

  new MutationObserver(() => {
    fixValuesRuntimeIcons();
    fixMusicFavoriteKeyboard();
    applyAboutMeContent();
  }).observe(document.body, { childList: true, subtree: true });
})();
