const bootScreen = document.getElementById('boot-screen');
const desktop = document.getElementById('desktop');

window.addEventListener('load', () => {
  window.setTimeout(() => {
    bootScreen.classList.add('fade-out');
    desktop.classList.add('fade-in');
    desktop.setAttribute('aria-hidden', 'false');
  }, 2600);
});
