const bootScreen = document.getElementById('boot-screen');
const lockScreen = document.getElementById('lock-screen');
const desktop = document.getElementById('desktop');
const loginButton = document.getElementById('login-button');
const lockTime = document.getElementById('lock-time');
const lockDate = document.getElementById('lock-date');

function updateLockClock() {
  const now = new Date();
  lockTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  lockDate.textContent = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
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
  updateLockClock();
  window.setInterval(updateLockClock, 1000);

  window.setTimeout(() => {
    bootScreen.classList.add('fade-out');
    lockScreen.classList.add('fade-in');
    lockScreen.setAttribute('aria-hidden', 'false');
  }, 2600);
});

loginButton.addEventListener('click', showDesktop);
