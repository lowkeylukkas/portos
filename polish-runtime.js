/* PortOS runtime polish — reliable subject icons + music focus. */
(() => {
  const iconMap = {
    'MAPEH':'mapeh.svg','TLE':'tle.svg','Values Ed.':'values-ed.svg','Values Education':'values-ed.svg',
    'English':'english.svg','Araling Panlipunan':'araling-panlipunan.svg','My Galleries':'my-galleries.svg',
    'Integration':'integration.svg','Reflection':'reflection.svg','Credits & Sources':'credits-sources.svg',
    'Credits and Sources':'credits-sources.svg','About Me':'about-me.svg','Science':'science.svg',
    'Filipino':'filipino.svg','Mathematics':'mathematics.svg','Music':'music.svg',
    'Customize':'about-me.svg','Files':'credits-sources.svg','Help':'reflection.svg'
  };
  const iconFor = (title) => iconMap[title] || 'about-me.svg';

  function putRealIcon(container, src) {
    if (!container) return;
    let img = container.querySelector(':scope > img.portos-real-app-icon');
    if (!img) {
      container.textContent = '';
      img = document.createElement('img');
      img.className = 'portos-real-app-icon';
      img.alt = '';
      img.draggable = false;
      container.appendChild(img);
    }
    if (img.getAttribute('src') !== src) img.src = src;
    img.setAttribute('aria-hidden', 'true');
  }

  function polishAppIdentity(root = document) {
    root.querySelectorAll('.portos-app-window').forEach(win => {
      const title = win.querySelector('.portos-app-title')?.textContent?.trim() || '';
      putRealIcon(win.querySelector('.portos-app-icon'), iconFor(title));
    });
    root.querySelectorAll('.portos-window-task, .task-app').forEach(task => {
      const title = task.getAttribute('aria-label') || task.title || '';
      putRealIcon(task.querySelector('.mini-icon'), iconFor(title));
    });
  }

  const style = document.createElement('style');
  style.id = 'portos-final-icon-fix';
  style.textContent = `
    /* New clean transparent subject icons — no baked canvas, no screen blend. */
    .icon-orb { background-color:transparent !important; background-repeat:no-repeat !important; background-position:center !important; background-size:contain !important; mix-blend-mode:normal !important; box-shadow:none !important; }
    .icon-mapeh .icon-orb { background-image:url("mapeh.svg") !important; }
    .icon-tle .icon-orb { background-image:url("tle.svg") !important; }
    .icon-values .icon-orb { background-image:url("values-ed.svg") !important; }
    .icon-english .icon-orb { background-image:url("english.svg") !important; }
    .icon-ap .icon-orb { background-image:url("araling-panlipunan.svg") !important; }
    .icon-gallery .icon-orb { background-image:url("my-galleries.svg") !important; }
    .icon-integration .icon-orb { background-image:url("integration.svg") !important; }
    .icon-reflection .icon-orb { background-image:url("reflection.svg") !important; }
    .icon-sources .icon-orb { background-image:url("credits-sources.svg") !important; }
    .icon-music .icon-orb { background-image:url("music.svg") !important; }
    .icon-about .icon-orb { background-image:url("about-me.svg") !important; }
    .icon-science .icon-orb { background-image:url("science.svg") !important; }
    .icon-filipino .icon-orb { background-image:url("filipino.svg") !important; }
    .icon-math .icon-orb { background-image:url("mathematics.svg") !important; }
    /* The lock screen should be clean now — no clock/date panel. */
    .lock-clock-wrap, .lock-time, .lock-date { display:none !important; }
    .lock-content { gap:0 !important; }
  `;
  document.head.appendChild(style);

  const observer = new MutationObserver(() => polishAppIdentity(document));
  observer.observe(document.body, { childList:true, subtree:true });
  polishAppIdentity(document);

  const music = document.querySelector('.music-gadget');
  const musicIcon = document.querySelector('.icon-music');
  if (music && musicIcon) {
    musicIcon.addEventListener('click', () => {
      music.classList.remove('music-hidden');
      music.classList.remove('music-focus');
      requestAnimationFrame(() => music.classList.add('music-focus'));
      window.PortOSMusic?.start?.();
    });

    const playButton = music.querySelector('.music-button.play');
    playButton?.addEventListener('click', async (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const player = window.PortOSMusic;
      if (!player?.audio) return;
      try {
        if (player.audio.paused) await player.start?.();
        else player.audio.pause();
      } catch (_) {}
    }, true);
  }
})();
