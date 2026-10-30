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

let appWindowZ = 70;

const appIconMap = {
  'MAPEH': 'mapeh.png',
  'TLE': 'tle.png',
  'Values Ed.': 'values.png',
  'English': 'english.png',
  'Araling Panlipunan': 'araling-panlipunan.png',
  'My Galleries': 'galleries.png',
  'Integration': 'integration.png',
  'Reflection': 'reflection.png',
  'Credits & Sources': 'credits.png',
  'About Me': 'about-me.png',
  'Science': 'science.png',
  'Filipino': 'filipino.png',
  'Mathematics': 'math.png',
  'Music': 'music.png',
  'Customize': 'about-me.png',
  'Files': 'credits.png',
  'Help': 'reflection.png'
};

function getAppIcon(title) {
  return appIconMap[title] || 'about-me.png';
}

function getLiveAppWindows() {
  return [...document.querySelectorAll('.portos-app-window')].filter((windowEl) => windowEl.dataset.closing !== 'true');
}

function getTaskbarAppsContainer() {
  return document.querySelector('.taskbar-apps');
}

function updateTaskbarState() {
  const windows = getLiveAppWindows();
  document.querySelectorAll('.portos-window-task').forEach((task) => {
    const id = task.dataset.windowId;
    const windowEl = windows.find((item) => item.dataset.windowId === id);
    task.classList.toggle('active', !!windowEl && !windowEl.classList.contains('minimized'));
    task.setAttribute('aria-pressed', String(!!windowEl && !windowEl.classList.contains('minimized')));
  });
}

function addWindowToTaskbar(windowEl, title, symbol) {
  const container = getTaskbarAppsContainer();
  if (!container) return;
  const task = document.createElement('button');
  const icon = getAppIcon(title);
  task.type = 'button';
  task.className = 'task-app portos-window-task active';
  task.dataset.windowId = windowEl.dataset.windowId;
  task.setAttribute('aria-label', title);
  task.setAttribute('aria-pressed', 'true');
  task.title = title;
  task.innerHTML = `<span class="mini-icon" aria-hidden="true"></span>`;
  task.querySelector('.mini-icon').style.backgroundImage = `url("${icon}")`;
  task.addEventListener('click', (event) => {
    event.stopPropagation();
    const target = getLiveAppWindows().find((item) => item.dataset.windowId === task.dataset.windowId);
    if (!target) { task.remove(); return; }
    if (target.classList.contains('minimized')) {
      target.classList.remove('minimized');
      target.classList.add('open');
    }
    focusAppWindow(target);
    updateWindowDimmer();
    updateTaskbarState();
  });
  container.appendChild(task);
}

function removeWindowFromTaskbar(windowEl) {
  document.querySelector(`.portos-window-task[data-window-id="${windowEl.dataset.windowId}"]`)?.remove();
  updateTaskbarState();
}

function focusAppWindow(windowEl) {
  if (!windowEl) return;
  appWindowZ += 1;
  windowEl.style.zIndex = String(appWindowZ);
  updateTaskbarState();
}

function updateWindowDimmer() {
  let dimmer = document.getElementById('portos-window-dimmer');
  const visibleWindows = getLiveAppWindows().filter((windowEl) => !windowEl.classList.contains('minimized'));
  if (!visibleWindows.length) {
    if (dimmer) {
      dimmer.classList.remove('active');
      window.setTimeout(() => {
        if (dimmer && !dimmer.classList.contains('active') && !getLiveAppWindows().some((windowEl) => !windowEl.classList.contains('minimized'))) dimmer.remove();
      }, 220);
    }
    return;
  }
  if (!dimmer) {
    dimmer = document.createElement('div');
    dimmer.id = 'portos-window-dimmer';
    dimmer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dimmer);
  }
  requestAnimationFrame(() => dimmer.classList.add('active'));
}

function closeAppWindow(windowEl) {
  if (!windowEl || windowEl.dataset.closing === 'true') return;
  windowEl.dataset.closing = 'true';
  windowEl.classList.remove('open', 'minimized');
  windowEl.classList.add('closing');
  updateWindowDimmer();
  window.setTimeout(() => {
    removeWindowFromTaskbar(windowEl);
    windowEl.remove();
    updateWindowDimmer();
    updateTaskbarState();
  }, 260);
}

function hideAppWindow() {
  getLiveAppWindows().forEach((windowEl) => windowEl.classList.add('minimized'));
  updateWindowDimmer();
  updateTaskbarState();
}

function closeFocusedAppWindow() {
  const windows = getLiveAppWindows().filter((windowEl) => !windowEl.classList.contains('minimized'));
  if (!windows.length) return;
  const focused = windows.sort((a, b) => Number(getComputedStyle(b).zIndex || 0) - Number(getComputedStyle(a).zIndex || 0))[0];
  closeAppWindow(focused);
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
  let resizing = false;
  let resizeDirection = '';
  let resizeStartX = 0;
  let resizeStartY = 0;
  let resizeStartLeft = 0;
  let resizeStartTop = 0;
  let resizeStartWidth = 0;
  let resizeStartHeight = 0;

  function setWindowPosition(left, top) {
    const maxLeft = Math.max(8, window.innerWidth - windowEl.offsetWidth - 8);
    const maxTop = Math.max(8, window.innerHeight - windowEl.offsetHeight - 84);
    windowEl.style.left = `${Math.min(Math.max(8, left), maxLeft)}px`;
    windowEl.style.top = `${Math.min(Math.max(8, top), maxTop)}px`;
  }

  function stopDragging(event) {
    if (!dragging) return;
    dragging = false;
    windowEl.classList.remove('dragging');
    titlebar.style.cursor = 'move';
    try { titlebar.releasePointerCapture?.(event.pointerId); } catch (_) {}
  }

  titlebar?.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 || event.target.closest('.portos-window-button')) return;
    focusAppWindow(windowEl);
    if (windowEl.classList.contains('maximized')) return;
    const rect = windowEl.getBoundingClientRect();
    windowEl.style.transition = 'none';
    windowEl.style.left = `${rect.left}px`;
    windowEl.style.top = `${rect.top}px`;
    windowEl.style.transform = 'none';
    requestAnimationFrame(() => { windowEl.style.transition = ''; });
    dragging = true;
    dragOffsetX = event.clientX - rect.left;
    dragOffsetY = event.clientY - rect.top;
    windowEl.classList.add('dragging');
    titlebar.setPointerCapture?.(event.pointerId);
    titlebar.style.cursor = 'grabbing';
  });
  titlebar?.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    setWindowPosition(event.clientX - dragOffsetX, event.clientY - dragOffsetY);
  });
  titlebar?.addEventListener('pointerup', stopDragging);
  titlebar?.addEventListener('pointercancel', stopDragging);
  titlebar?.addEventListener('dblclick', (event) => {
    if (!event.target.closest('.portos-window-button')) toggleMaximize();
  });

  function stopResize(event) {
    if (!resizing) return;
    resizing = false;
    windowEl.classList.remove('resizing');
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
    try { event?.currentTarget?.releasePointerCapture?.(event.pointerId); } catch (_) {}
    updateTaskbarState();
  }

  function resizeWindow(event) {
    if (!resizing) return;
    const dx = event.clientX - resizeStartX;
    const dy = event.clientY - resizeStartY;
    const minWidth = 360;
    const minHeight = 220;
    let left = resizeStartLeft;
    let top = resizeStartTop;
    let width = resizeStartWidth;
    let height = resizeStartHeight;

    if (resizeDirection.includes('e')) width = Math.max(minWidth, resizeStartWidth + dx);
    if (resizeDirection.includes('s')) height = Math.max(minHeight, resizeStartHeight + dy);
    if (resizeDirection.includes('w')) {
      width = Math.max(minWidth, resizeStartWidth - dx);
      left = resizeStartLeft + (resizeStartWidth - width);
    }
    if (resizeDirection.includes('n')) {
      height = Math.max(minHeight, resizeStartHeight - dy);
      top = resizeStartTop + (resizeStartHeight - height);
    }

    const maxRight = window.innerWidth - 8;
    const maxBottom = window.innerHeight - 84;
    if (left < 8) { width -= 8 - left; left = 8; }
    if (top < 8) { height -= 8 - top; top = 8; }
    width = Math.min(width, maxRight - left);
    height = Math.min(height, maxBottom - top);

    windowEl.style.left = `${left}px`;
    windowEl.style.top = `${top}px`;
    windowEl.style.width = `${Math.max(minWidth, width)}px`;
    windowEl.style.height = `${Math.max(minHeight, height)}px`;
  }

  windowEl.querySelectorAll('.portos-window-resizer').forEach((handle) => {
    handle.addEventListener('pointerdown', (event) => {
      if (event.button !== 0 || windowEl.classList.contains('maximized')) return;
      event.preventDefault();
      event.stopPropagation();
      focusAppWindow(windowEl);
      const rect = windowEl.getBoundingClientRect();
      resizing = true;
      resizeDirection = handle.dataset.resize || 'se';
      resizeStartX = event.clientX;
      resizeStartY = event.clientY;
      resizeStartLeft = rect.left;
      resizeStartTop = rect.top;
      resizeStartWidth = rect.width;
      resizeStartHeight = rect.height;
      windowEl.style.transition = 'none';
      windowEl.style.left = `${rect.left}px`;
      windowEl.style.top = `${rect.top}px`;
      windowEl.style.transform = 'none';
      windowEl.classList.add('resizing');
      document.body.style.userSelect = 'none';
      document.body.style.cursor = getComputedStyle(handle).cursor;
      handle.setPointerCapture?.(event.pointerId);
    });
    handle.addEventListener('pointermove', resizeWindow);
    handle.addEventListener('pointerup', stopResize);
    handle.addEventListener('pointercancel', stopResize);
  });

  windowEl.addEventListener('pointerdown', () => focusAppWindow(windowEl));

  function toggleMinimize() {
    if (windowEl.classList.contains('minimized')) {
      windowEl.classList.remove('minimized');
      windowEl.classList.add('open');
      focusAppWindow(windowEl);
      updateWindowDimmer();
    } else {
      windowEl.classList.add('minimized');
      updateWindowDimmer();
    }
    updateTaskbarState();
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
      windowEl.style.transform = 'none';
      maximizeButton.textContent = '□';
      maximizeButton.setAttribute('aria-label', 'Maximize window');
      focusAppWindow(windowEl);
      return;
    }
    const rect = windowEl.getBoundingClientRect();
    restoreBounds = { left:`${rect.left}px`, top:`${rect.top}px`, width:`${rect.width}px`, height:`${rect.height}px` };
    windowEl.classList.remove('minimized');
    windowEl.classList.add('maximized');
    windowEl.style.transform = 'none';
    maximizeButton.textContent = '❐';
    maximizeButton.setAttribute('aria-label', 'Restore window');
    focusAppWindow(windowEl);
  }

  minimizeButton?.addEventListener('click', (event) => { event.stopPropagation(); toggleMinimize(); });
  maximizeButton?.addEventListener('click', (event) => { event.stopPropagation(); toggleMaximize(); });
  closeButton?.addEventListener('click', (event) => { event.stopPropagation(); closeAppWindow(windowEl); });
  return { toggleMaximize };
}

const appDescriptions = {
  'MAPEH':'Music, Arts, Physical Education, and Health portfolio work.','TLE':'Technology and Livelihood Education projects and activities.','Values Ed.':'Values Education reflections, activities, and learning materials.','English':'English lessons, written work, and creative activities.','Araling Panlipunan':'Araling Panlipunan projects, research, and activities.','My Galleries':'A gallery space for projects, artwork, photographs, and creations.','Integration':'Integrated activities connecting ideas across different subjects.','Reflection':'Personal reflections and learning takeaways.','Credits & Sources':'References, acknowledgements, and sources used throughout the portfolio.','About Me':'A personal introduction to the creator of this digital portfolio.','Science':'Science lessons, investigations, experiments, and projects.','Filipino':'Filipino language, literature, and written activities.','Mathematics':'Mathematics lessons, problem solving, and activities.'
};

function openAppWindow(title, symbol, description) {
  setStartMenu(false);
  const windowEl = document.createElement('section');
  const icon = getAppIcon(title);
  windowEl.className = 'portos-app-window';
  windowEl.dataset.windowId = `portos-window-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
  windowEl.setAttribute('role', 'dialog');
  windowEl.setAttribute('aria-label', title);
  windowEl.innerHTML = `
    <div class="portos-app-titlebar">
      <span class="portos-app-icon" aria-hidden="true"></span><span class="portos-app-title">${title}</span>
      <div class="portos-window-controls" aria-label="Window controls">
        <button class="portos-window-button" data-window-action="minimize" type="button" aria-label="Minimize window">—</button>
        <button class="portos-window-button" data-window-action="maximize" type="button" aria-label="Maximize window">□</button>
        <button class="portos-window-button close" data-window-action="close" type="button" aria-label="Close window">×</button>
      </div>
    </div>
    <div class="portos-app-body"><h2>${title}</h2><p>${description}</p><div class="portos-app-hint">This PortOS window is interactive — drag the glossy title bar to move it, drag any edge or corner to resize it, or use the controls to minimize, maximize, restore, and close it.</div></div>
    <span class="portos-window-resizer n" data-resize="n"></span><span class="portos-window-resizer s" data-resize="s"></span><span class="portos-window-resizer e" data-resize="e"></span><span class="portos-window-resizer w" data-resize="w"></span>
    <span class="portos-window-resizer ne" data-resize="ne"></span><span class="portos-window-resizer nw" data-resize="nw"></span><span class="portos-window-resizer se" data-resize="se"></span><span class="portos-window-resizer sw" data-resize="sw"></span>`;
  document.body.appendChild(windowEl);
  windowEl.querySelector('.portos-app-icon').style.backgroundImage = `url("${icon}")`;
  const width = windowEl.offsetWidth;
  const height = windowEl.offsetHeight;
  const left = Math.max(8, (window.innerWidth - width) / 2);
  const top = Math.max(8, (window.innerHeight - height - 76) / 2);
  windowEl.style.left = `${left}px`;
  windowEl.style.top = `${top}px`;
  makeAppWindowInteractive(windowEl);
  addWindowToTaskbar(windowEl, title, symbol);
  focusAppWindow(windowEl);
  updateWindowDimmer();
  requestAnimationFrame(() => windowEl.classList.add('open'));
}

function toggleMusic() {
  if (!musicGadget) return;
  musicGadget.classList.remove('music-hidden');
  setStartMenu(false);
}

function wireDesktopIcons() {
  document.querySelectorAll('.desktop-icon').forEach((button) => button.addEventListener('click', () => {
    const title = button.querySelector('.icon-label')?.textContent?.trim() || button.getAttribute('aria-label') || 'Portfolio';
    if (title === 'Music') return toggleMusic();
    const symbol = button.querySelector('.icon-symbol')?.textContent?.trim() || '✦';
    openAppWindow(title, symbol, appDescriptions[title] || 'Portfolio section.');
  }));
}

function wireMusicControls() {
  if (!musicGadget) return;
  musicGadget.querySelectorAll('.music-button').forEach((button,index) => button.addEventListener('click', () => {
    if (index === 1) {
      musicGadget.classList.toggle('is-playing');
      button.textContent = musicGadget.classList.contains('is-playing') ? '❚❚' : '▶';
      button.setAttribute('aria-label', musicGadget.classList.contains('is-playing') ? 'Pause' : 'Play');
    } else if (index === 0) musicGadget.querySelector('.music-progress-fill').style.width='0%';
    else if (index === 2) musicGadget.querySelector('.music-progress-fill').style.width='37%';
  }));
}

function wireStartMenu() {
  if (!startMenu) return;
  startMenu.querySelectorAll('.start-item').forEach((item) => item.addEventListener('click', () => {
    const title = item.querySelector('strong')?.textContent?.trim() || '';
    const symbol = item.querySelector('.start-item-icon')?.textContent?.trim() || '✦';
    if (title === 'Music') toggleMusic();
    else if (title === 'Desktop') setStartMenu(false);
    else if (title === 'Customize') openAppWindow('Customize','⚙','Personalize the PortOS desktop experience.');
    else if (title === 'Files') openAppWindow('Files','▰','Portfolio documents and project files.');
    else if (title === 'Help') openAppWindow('Help','?','PortOS help and navigation.');
    else openAppWindow(title,symbol,appDescriptions[title] || 'Portfolio section.');
  }));
}

function wireTaskbarApps() {
  document.querySelectorAll('.task-app:not(.portos-window-task)').forEach((button) => button.addEventListener('click', () => {
    const label = button.getAttribute('aria-label');
    if (label === 'Desktop') { hideAppWindow(); setStartMenu(false); }
    else if (label === 'Files') openAppWindow('Files','▰','Portfolio documents and project files.');
    else if (label === 'Gallery') openAppWindow('My Galleries','✿',appDescriptions['My Galleries']);
  }));
}

window.addEventListener('load', () => {
  updateClocks(); wireDesktopIcons(); wireMusicControls(); wireStartMenu(); wireTaskbarApps();
  window.setInterval(updateClocks,1000);
  window.setTimeout(() => {
    if (bootScreen) bootScreen.classList.add('fade-out');
    if (lockScreen) { lockScreen.classList.add('fade-in'); lockScreen.setAttribute('aria-hidden','false'); }
  },2600);
});

if (loginButton) loginButton.addEventListener('click',showDesktop);
if (startOrb) startOrb.addEventListener('click',(event) => { event.stopPropagation(); setStartMenu(!startMenu.classList.contains('open')); });
document.addEventListener('click',(event) => { if (startMenu && startMenu.classList.contains('open') && !startMenu.contains(event.target) && event.target !== startOrb) setStartMenu(false); });
document.addEventListener('keydown',(event) => { if (event.key === 'Escape') { setStartMenu(false); closeFocusedAppWindow(); } });
