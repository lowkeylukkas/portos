/* PortOS QOL fixes: reliable Values Ed icon + rebuilt native volume slider. */
(() => {
  const iconSrc = 'Values Ed..png?v=11';

  function fixValuesIcon() {
    const icon = document.querySelector('.icon-values .icon-orb');
    if (!icon) return;
    let img = icon.querySelector('.values-ed-real-icon');
    if (!img) {
      icon.textContent = '';
      img = document.createElement('img');
      img.className = 'values-ed-real-icon';
      img.alt = '';
      img.draggable = false;
      icon.appendChild(img);
    }
    img.src = iconSrc;
  }

  function getMusicAudio() {
    return window.PortOSMusic?.audio || document.querySelector('audio');
  }

  function improveVolume() {
    const gadget = document.querySelector('.music-gadget');
    const track = gadget?.querySelector('.volume-track');
    const audio = getMusicAudio();
    if (!gadget || !track || !audio || track.dataset.qolReady === 'native') return;
    track.dataset.qolReady = 'native';

    // Throw away every previous custom slider implementation.
    track.innerHTML = '<input class="portos-volume-native" type="range" min="0" max="100" step="1" value="72" aria-label="Music volume">';
    const slider = track.querySelector('.portos-volume-native');
    const label = gadget.querySelector('.volume-control > span:last-child');

    function paint(value) {
      const n = Math.max(0, Math.min(100, Math.round(Number(value))));
      slider.value = String(n);
      slider.style.setProperty('--volume-percent', n + '%');
      if (audio.volume !== n / 100) audio.volume = n / 100;
      if (label) label.textContent = n + '%';
    }

    function syncFromAudio() {
      const n = Math.round(audio.volume * 100);
      slider.value = String(n);
      slider.style.setProperty('--volume-percent', n + '%');
      if (label) label.textContent = n + '%';
    }

    slider.addEventListener('input', () => paint(slider.value));
    slider.addEventListener('change', () => paint(slider.value));
    slider.addEventListener('pointerdown', e => e.stopPropagation(), true);
    slider.addEventListener('pointermove', e => e.stopPropagation(), true);
    slider.addEventListener('click', e => e.stopPropagation(), true);
    slider.addEventListener('wheel', e => {
      e.preventDefault();
      e.stopPropagation();
      paint(Number(slider.value) + (e.deltaY < 0 ? 5 : -5));
    }, { passive: false });

    audio.addEventListener('volumechange', syncFromAudio);

    // Start from the real audio value; do not turn 0 into 72.
    if (!Number.isFinite(audio.volume)) audio.volume = 0.72;
    syncFromAudio();
  }

  const style = document.createElement('style');
  style.id = 'portos-qol-native-volume-style';
  style.textContent = `
    .icon-values .icon-orb { background-image:none!important; }
    .values-ed-real-icon { width:100%!important;height:100%!important;object-fit:contain!important;display:block!important;background:transparent!important;border:0!important;filter:none!important;mix-blend-mode:normal!important;box-shadow:none!important; }

    /* Completely replace the old volume widget. The browser owns thumb positioning now. */
    .music-gadget .volume-control { position:relative!important;z-index:50!important;display:flex!important;align-items:center!important;gap:6px!important;pointer-events:auto!important; }
    .music-gadget .volume-track { flex:1!important;min-width:110px!important;height:22px!important;display:flex!important;align-items:center!important;padding:0!important;margin:0!important;background:transparent!important;border:0!important;box-shadow:none!important;overflow:visible!important;pointer-events:auto!important; }
    .music-gadget .portos-volume-native { -webkit-appearance:none!important;appearance:none!important;width:100%!important;height:22px!important;margin:0!important;padding:0!important;border:0!important;outline:none!important;cursor:pointer!important;touch-action:none!important;user-select:none!important;background:linear-gradient(90deg,#cfffff 0%,#45dff8 var(--volume-percent,72%),rgba(0,74,135,.30) var(--volume-percent,72%),rgba(0,74,135,.30) 100%)!important;border-radius:999px!important;box-shadow:inset 0 2px 3px rgba(0,50,100,.20),0 1px 0 rgba(255,255,255,.55)!important;}
    .music-gadget .portos-volume-native::-webkit-slider-runnable-track { height:7px!important;border:1px solid rgba(255,255,255,.82)!important;border-radius:999px!important;background:transparent!important;box-shadow:none!important; }
    .music-gadget .portos-volume-native::-moz-range-track { height:7px!important;border:1px solid rgba(255,255,255,.82)!important;border-radius:999px!important;background:transparent!important;box-shadow:none!important; }
    .music-gadget .portos-volume-native::-webkit-slider-thumb { -webkit-appearance:none!important;appearance:none!important;width:22px!important;height:22px!important;margin-top:-8px!important;border:1px solid rgba(255,255,255,.98)!important;border-radius:50%!important;background:radial-gradient(circle at 35% 28%,#fff 0 18%,#d5ffff 31%,#5bdff8 68%,#087bc1 100%)!important;box-shadow:0 2px 5px rgba(0,55,110,.38),inset 0 1px 2px #fff!important;cursor:grab!important;}
    .music-gadget .portos-volume-native::-moz-range-thumb { width:22px!important;height:22px!important;border:1px solid rgba(255,255,255,.98)!important;border-radius:50%!important;background:radial-gradient(circle at 35% 28%,#fff 0 18%,#d5ffff 31%,#5bdff8 68%,#087bc1 100%)!important;box-shadow:0 2px 5px rgba(0,55,110,.38),inset 0 1px 2px #fff!important;cursor:grab!important;}
    .music-gadget .portos-volume-native:active::-webkit-slider-thumb { cursor:grabbing!important;transform:scale(1.06); }
    .music-gadget .portos-volume-native:active::-moz-range-thumb { cursor:grabbing!important;transform:scale(1.06); }
  `;
  document.head.appendChild(style);

  fixValuesIcon();
  improveVolume();
  new MutationObserver(() => { fixValuesIcon(); improveVolume(); }).observe(document.body, { childList:true, subtree:true });
})();