/* PortOS final runtime polish — keep original artwork, fix app identity, smooth interactions. */
(() => {
  const iconMap = {
    'MAPEH':'mapeh.png','TLE':'tle.png','Values Ed.':'values.png','Values Education':'values.png','English':'english.png','Araling Panlipunan':'araling-panlipunan.png','My Galleries':'galleries.png','Integration':'integration.png','Reflection':'reflection.png','Credits & Sources':'credits.png','Credits and Sources':'credits.png','About Me':'about-me.png','Science':'science.png','Filipino':'filipino.png','Mathematics':'math.png','Customize':'tle.png','Files':'credits.png','Help':'about-me.png'
  };
  const iconFor = (title) => iconMap[title] || '';
  function polishAppIdentity(root = document) {
    root.querySelectorAll('.portos-app-window').forEach(win => {
      const title = win.querySelector('.portos-app-title')?.textContent?.trim();
      const src = iconFor(title);
      const icon = win.querySelector('.portos-app-icon');
      if (icon && src) {
        if (icon.dataset.appIcon !== src) icon.style.backgroundImage = `url("${src}")`;
        icon.dataset.appIcon = src;
        icon.setAttribute('aria-hidden','true');
      }
    });
    root.querySelectorAll('.portos-window-task').forEach(task => {
      const title = task.getAttribute('aria-label') || task.title || '';
      const src = iconFor(title);
      const icon = task.querySelector('.mini-icon');
      if (icon && src) {
        if (icon.dataset.appIcon !== src) icon.style.backgroundImage = `url("${src}")`;
        icon.dataset.appIcon = src;
        if (icon.textContent.trim()) icon.textContent = '';
      }
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
      setTimeout(() => music.classList.remove('music-focus'), 650);
      window.PortOSMusic?.start?.();
    });
  }
})();
