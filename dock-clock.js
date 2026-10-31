(() => {
  function initDockClock() {
    const dock = document.querySelector('.portos-taskbar');
    if (!dock || document.getElementById('portos-dock-clock')) return;
    const clock = document.createElement('div');
    clock.id = 'portos-dock-clock';
    clock.className = 'portos-dock-clock';
    clock.setAttribute('aria-label', 'Current time');
    clock.innerHTML = '<span class="dock-clock-time"></span><span class="dock-clock-date"></span>';
    dock.appendChild(clock);

    const timeEl = clock.querySelector('.dock-clock-time');
    const dateEl = clock.querySelector('.dock-clock-date');
    function tick() {
      const now = new Date();
      timeEl.textContent = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
      dateEl.textContent = now.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
    tick();
    window.setInterval(tick, 1000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initDockClock);
  else initDockClock();
})();