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

function updateLockClock() {
  const now = new Date();
  lockTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  lockDate.textContent = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  if (taskbarClock) {
    taskbarClock.innerHTML = `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}<small>${now.toLocaleDateString([], { weekday: 'long' })}</small>`;
  }
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

function showDesktop() {
  lockScreen.classList.add('unlocking');
  desktop.classList.add('fade-in');
  desktop.setAttribute('aria-hidden', 'false');
  lockScreen.setAttribute('aria-hidden', 'true');
  window.setTimeout(() => {
    lockScreen.style.display = 'none';
  }, 700);
}

window.addEventListener('load', () => {
  buildClockTicks();
  updateLockClock();
  updateAnalogClock();
  window.setInterval(updateLockClock, 1000);
  window.setInterval(updateAnalogClock, 50);

  window.setTimeout(() => {
    bootScreen.classList.add('fade-out');
    lockScreen.classList.add('fade-in');
    lockScreen.setAttribute('aria-hidden', 'false');
  }, 2600);
});

loginButton.addEventListener('click', showDesktop);
