const bootScreen = document.getElementById('boot-screen');
const lockScreen = document.getElementById('lock-screen');
const desktop = document.getElementById('desktop');
const loginButton = document.getElementById('login-button');
const lockTime = document.getElementById('lock-time');
const lockDate = document.getElementById('lock-date');
const desktopTime = document.getElementById('desktop-time');
const desktopAmPm = document.getElementById('desktop-ampm');
const desktopDate = document.getElementById('desktop-date');
const taskbarClock = document.getElementById('taskbar-clock');
const startOrb = document.getElementById('start-orb');
const startMenu = document.getElementById('start-menu');
const musicGadget = document.querySelector('.music-gadget');

if (!document.querySelector('link[data-portos-app-windows]')) {
  const appStyles = document.createElement('link');
  appStyles.rel = 'stylesheet';
  appStyles.href = 'app-windows.css';
  appStyles.dataset.portosAppWindows = 'true';
  document.head.appendChild(appStyles);
}

function updateClocks() {
  const now = new Date();
  const time24 = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const time12 = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  const [desktopClockTime, desktopClockAmPm = ''] = time12.split(' ');
  const date = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  const fullDate = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  if (lockTime) lockTime.textContent = time24;
  if (lockDate) lockDate.textContent = date;
  if (desktopTime) desktopTime.textContent = desktopClockTime;
  if (desktopAmPm) desktopAmPm.textContent = desktopClockAmPm;
  if (desktopDate) desktopDate.textContent = fullDate;
  if (taskbarClock) taskbarClock.innerHTML = `${time12}<small>${now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</small>`;
}

function setStartMenu(open) {
  if (!startMenu || !startOrb) return;
  startMenu.classList.toggle('open', open);
  startMenu.setAttribute('aria-hidden', String(!open));
  startOrb.setAttribute('aria-expanded', String(open));
}

function showDesktop() {
  if (!lockScreen || !desktop) return;
  lockScreen.classList.add('unlocking');
  desktop.classList.add('fade-in');
  desktop.setAttribute('aria-hidden', 'false');
  lockScreen.setAttribute('aria-hidden', 'true');
  window.setTimeout(() => { lockScreen.style.display = 'none'; }, 700);
}

function hideAppWindow() {
  const existing = document.querySelector('.portos-app-window');
  if (existing) existing.remove();
}

let appWindowZ = 70;

function focusAppWindow(windowEl) {
  if (!windowEl) return;
  appWindowZ += 1;
  windowEl.style.zIndex = String(appWindowZ);
}

function makeAppWindowInteractive(windowEl) {
  const titlebar = windowEl.querySelector('.portos-app-titlebar');
  const minimizeButton = windowEl.querySelector('[data-window-action="minimize"]');
  const maximizeButton = windowEl.querySelector('[data-window-action="maximize"]');
  const closeButton = windowEl.querySelector('[data-window-action="close"]');

  let dragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let restoreBounds = null;

  function setWindowPosition(left, top) {
    const maxLeft = Math.max(8, window.innerWidth - windowEl.offsetWidth - 8);
    const maxTop = Math.max(8, window.innerHeight - windowEl.offsetHeight - 84);
    windowEl.style.left = `${Math.min(Math.max(8, left), maxLeft)}px`;
    windowEl.style.top = `${Math.min(Math.max(8, top), maxTop)}px`;
    windowEl.style.transform = 'none';
  }

  titlebar?.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 || event.target.closest('.portos-window-button')) return;
    focusAppWindow(windowEl);
    if (windowEl.classList.contains('maximized')) return;
    const rect = windowEl.getBoundingClientRect();
    dragging = true;
    dragOffsetX = event.clientX - rect.left;
    dragOffsetY = event.clientY - rect.top;
    titlebar.setPointerCapture?.(event.pointerId);
    titlebar.style.cursor = 'grabbing';
  });

  titlebar?.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    setWindowPosition(event.clientX - dragOffsetX, event.clientY - dragOffsetY);
  });

  function stopDragging(event) {
    if (!dragging) return;
    dragging = false;
    titlebar.style.cursor = 'move';
    try { titlebar.releasePointerCapture?.(event.pointerId); } catch (_) {}
  }

  titlebar?.addEventListener('pointerup', stopDragging);
  titlebar?.addEventListener('pointercancel', stopDragging);
  titlebar?.addEventListener('dblclick', (event) => {
    if (!event.target.closest('.portos-window-button')) toggleMaximize();
  });

  windowEl.addEventListener('pointerdown', () => focusAppWindow(windowEl));

  function toggleMinimize() {
    windowEl.classList.toggle('minimized');
    if (!windowEl.classList.contains('minimized')) focusAppWindow(windowEl);
  }

  function toggleMaximize() {
    if (windowEl.classList.contains('maximized')) {
      windowEl.classList.remove('maximized');
      if (restoreBounds) {
        windowEl.style.left = restoreBounds.left;
        windowEl.style.top = restoreBounds.top;
        windowEl.style.width = restoreBounds.width;
        windowEl.style.height = restoreBounds.height;
      }
      maximizeButton.textContent = '□';
      maximizeButton.setAttribute('aria-label', 'Maximize window');
      return;
    }

    const rect = windowEl.getBoundingClientRect();
    restoreBounds = {
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`
    };
    windowEl.classList.remove('minimized');
    windowEl.classList.add('maximized');
    windowEl.style.transform = 'none';
    maximizeButton.textContent = '❐';
    maximizeButton.setAttribute('aria-label', 'Restore window');
    focusAppWindow(windowEl);
  }

  minimizeButton?.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMinimize();
  });
  maximizeButton?.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMaximize();
  });
  closeButton?.addEventListener('click', (event) => {
    event.stopPropagation();
    windowEl.remove();
  });

  return { toggleMaximize };
}

const appDescriptions = {
  'MAPEH': 'Music, Arts, Physical Education, and Health portfolio work.',
  'TLE': 'Technology and Livelihood Education projects and activities.',
  'Values Ed.': 'Values Education reflections, activities, and learning materials.',
  'English': 'English lessons, written work, and creative activities.',
  'Araling Panlipunan': 'Araling Panlipunan projects, research, and activities.',
  'My Galleries': 'A gallery space for projects, artwork, photographs, and creations.',
  'Integration': 'Integrated activities connecting ideas across different subjects.',
  'Reflection': 'Personal reflections and learning takeaways.',
  'Credits & Sources': 'References, acknowledgements, and sources used throughout the portfolio.',
  'About Me': 'A personal introduction to the creator of this digital portfolio.',
  'Science': 'Science lessons, investigations, experiments, and projects.',
  'Filipino': 'Filipino language, literature, and written activities.',
  'Mathematics': 'Mathematics lessons, problem solving, and activities.'
};

function openAppWindow(title, symbol, description) {
  hideAppWindow();
  setStartMenu(false);

  const windowEl = document.createElement('section');
  windowEl.className = 'portos-app-window open';
  windowEl.setAttribute('role', 'dialog');
  windowEl.setAttribute('aria-label', title);
  windowEl.innerHTML = `
    <div class="portos-app-titlebar">
      <span class="portos-app-icon">${symbol}</span>
      <span class="portos-app-title">${title}</span>
      <div class="portos-window-controls" aria-label="Window controls">
        <button class="portos-window-button" data-window-action="minimize" type="button" aria-label="Minimize window">—</button>
        <button class="portos-window-button" data-window-action="maximize" type="button" aria-label="Maximize window">□</button>
        <button class="portos-window-button close" data-window-action="close" type="button" aria-label="Close window">×</button>
      </div>
    </div>
    <div class="portos-app-body">
      <h2>${title}</h2>
      <p>${description}</p>
      <div class="portos-app-hint">This PortOS window is interactive — drag the glossy title bar to move it, pull the lower-right corner to resize it, or use the window controls to minimize, maximize, restore, and close it.</div>
    </div>`;

  document.body.appendChild(windowEl);

  const width = windowEl.offsetWidth;
  const height = windowEl.offsetHeight;
  windowEl.style.left = `${Math.max(8, (window.innerWidth - width) / 2)}px`;
  windowEl.style.top = `${Math.max(8, (window.innerHeight - height - 76) / 2)}px`;
  windowEl.style.transform = 'none';

  makeAppWindowInteractive(windowEl);
  focusAppWindow(windowEl);
}

function toggleMusic() {
  if (!musicGadget) return;
  musicGadget.classList.remove('music-hidden');
  setStartMenu(false);
}

function wireDesktopIcons() {
  document.querySelectorAll('.desktop-icon').forEach((button) => {
    button.addEventListener('click', () => {
      const title = button.querySelector('.icon-label')?.textContent?.trim() || button.getAttribute('aria-label') || 'Portfolio';
      if (title === 'Music') {
        toggleMusic();
        return;
      }
      const symbol = button.querySelector('.icon-symbol')?.textContent?.trim() || '✦';
      openAppWindow(title, symbol, appDescriptions[title] || 'Portfolio section.');
    });
  });
}

function wireMusicControls() {
  if (!musicGadget) return;
  const buttons = musicGadget.querySelectorAll('.music-button');
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (index === 1) {
        musicGadget.classList.toggle('is-playing');
        button.textContent = musicGadget.classList.contains('is-playing') ? '❚❚' : '▶';
        button.setAttribute('aria-label', musicGadget.classList.contains('is-playing') ? 'Pause' : 'Play');
      } else if (index === 0) {
        musicGadget.querySelector('.music-progress-fill').style.width = '0%';
      } else if (index === 2) {
        musicGadget.querySelector('.music-progress-fill').style.width = '37%';
      }
    });
  });
}

function wireStartMenu() {
  if (!startMenu) return;
  const items = startMenu.querySelectorAll('.start-item');
  items.forEach((item) => {
    item.addEventListener('click', () => {
      const title = item.querySelector('strong')?.textContent?.trim() || '';
      const symbol = item.querySelector('.start-item-icon')?.textContent?.trim() || '✦';
      if (title === 'Music') {
        toggleMusic();
      } else if (title === 'Desktop') {
        setStartMenu(false);
      } else if (title === 'Customize') {
        openAppWindow('Customize', '⚙', 'Personalize the PortOS desktop experience.');
      } else if (title === 'Files') {
        openAppWindow('Files', '▰', 'Portfolio documents and project files.');
      } else if (title === 'Help') {
        openAppWindow('Help', '?', 'PortOS help and navigation.');
      } else {
        openAppWindow(title, symbol, appDescriptions[title] || 'Portfolio section.');
      }
    });
  });
}

function wireTaskbarApps() {
  document.querySelectorAll('.task-app').forEach((button) => {
    button.addEventListener('click', () => {
      const label = button.getAttribute('aria-label');
      if (label === 'Desktop') {
        hideAppWindow();
        setStartMenu(false);
      } else if (label === 'Files') {
        openAppWindow('Files', '▰', 'Portfolio documents and project files.');
      } else if (label === 'Gallery') {
        openAppWindow('My Galleries', '✿', appDescriptions['My Galleries']);
      }
    });
  });
}

window.addEventListener('load', () => {
  updateClocks();
  wireDesktopIcons();
  wireMusicControls();
  wireStartMenu();
  wireTaskbarApps();
  window.setInterval(updateClocks, 1000);
  window.setTimeout(() => {
    if (bootScreen) bootScreen.classList.add('fade-out');
    if (lockScreen) {
      lockScreen.classList.add('fade-in');
      lockScreen.setAttribute('aria-hidden', 'false');
    }
  }, 2600);
});

if (loginButton) loginButton.addEventListener('click', showDesktop);
if (startOrb) startOrb.addEventListener('click', (event) => {
  event.stopPropagation();
  setStartMenu(!startMenu.classList.contains('open'));
});

document.addEventListener('click', (event) => {
  if (startMenu && startMenu.classList.contains('open') && !startMenu.contains(event.target) && event.target !== startOrb) setStartMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setStartMenu(false);
    hideAppWindow();
  }
});
