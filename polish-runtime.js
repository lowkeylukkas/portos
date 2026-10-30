/* PortOS runtime polish — reliable real app icons + music focus. */
(() => {
  const iconMap = {
    'MAPEH':'mapeh.png','TLE':'tle.png','Values Ed.':'values.png','Values Education':'values.png',
    'English':'english.png','Araling Panlipunan':'araling-panlipunan.png','My Galleries':'galleries.png',
    'Integration':'integration.png','Reflection':'reflection.png','Credits & Sources':'credits.png',
    'Credits and Sources':'credits.png','About Me':'about-me.png','Science':'science.png',
    'Filipino':'filipino.png','Mathematics':'math.png','Customize':'tle.png','Files':'credits.png','Help':'about-me.png'
  };
  const iconFor = (title) => iconMap[title] || 'about-me.png';

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

    /* script.js also had an older visual-only play handler. Capture the play
       button here so the real audio controller always wins and the button
       cannot accidentally toggle twice. */
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
