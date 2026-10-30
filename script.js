const bootScreen = document.getElementById('boot-screen');
const lockScreen = document.getElementById('lock-screen');
const desktop = document.getElementById('desktop');
const loginButton = document.getElementById('login-button');
const lockTime = document.getElementById('lock-time');
const lockDate = document.getElementById('lock-date');
const clockTicks = document.querySelector('.clock-ticks');
const clockHour = document.querySelector('.clock-hour');
const clockMinute = document.querySelector('.clock-minute');
const clockSecond = document.querySelector('.clock-second');
const taskbarClock = document.getElementById('taskbar-clock');
const startOrb = document.getElementById('start-orb');
const startMenu = document.getElementById('start-menu');
const musicGadget = document.querySelector('.music-gadget');

// Load the app-window styling without touching the approved desktop design.
if (!document.querySelector('link[data-portos-app-windows]')) {
  const appStyles = document.createElement('link');
  appStyles.rel = 'stylesheet';
  appStyles.href = 'app-windows.css';
  appStyles.dataset.portosAppWindows = 'true';
  document.head.appendChild(appStyles);
}

function updateLockClock() {
  const now = new Date();
  if (lockTime) lockTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  if (lockDate) lockDate.textContent = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  if (taskbarClock) taskbarClock.innerHTML = `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}<small>${now.toLocaleDateString([], { weekday: 'long' })}</small>`;
}

function buildClockTicks() {
  if (!clockTicks) return;
  clockTicks.innerHTML = '';
  for (let i = 0; i < 12; i += 1) {
    const tick = document.createElement('span');
    tick.className = 'clock-tick';
    tick.style.transform = `rotate(${i * 30}deg)`;
    clockTicks.appendChild(tick);
  }
}

function updateAnalogClock() {
  if (!clockHour || !clockMinute || !clockSecond) return;
  const now = new Date();
  const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;
  clockSecond.style.transform = `rotate(${seconds * 6}deg)`;
  clockMinute.style.transform = `rotate(${minutes * 6}deg)`;
  clockHour.style.transform = `rotate(${hours * 30}deg)`;
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
      <button class="portos-app-close" type="button" aria-label="Close ${title}">×</button>
    </div>
    <div class="portos-app-body">
      <h2>${title}</h2>
      <p>${description}</p>
      <div class="portos-app-hint">This PortOS window is now interactive. Your portfolio content can be placed here without changing the desktop wallpaper, clock, taskbar, or Aero interface.</div>
    </div>`;
  document.body.appendChild(windowEl);
  windowEl.querySelector('.portos-app-close').addEventListener('click', hideAppWindow);
}

function toggleMusic() {
  if (!musicGadget) return;
  musicGadget.classList.remove('music-hidden');
  musicGadget.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
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
  buildClockTicks();
  updateLockClock();
  updateAnalogClock();
  wireDesktopIcons();
  wireMusicControls();
  wireStartMenu();
  wireTaskbarApps();
  window.setInterval(updateLockClock, 1000);
  window.setInterval(updateAnalogClock, 50);
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
