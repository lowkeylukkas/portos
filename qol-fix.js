/* PortOS QOL fixes: reliable Values Ed icon + reworked volume control. */
(() => {
  const iconSrc = 'Values Ed..png?v=12';

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
    return window.PortOSMusic?.audio || document.querySelector('.music-gadget audio') || document.querySelector('audio');
  }

  function improveVolume() {
    const gadget = document.querySelector('.music-gadget');
    const track = gadget?.querySelector('.volume-track');
    const audio = getMusicAudio();
    if (!gadget || !track || !audio || track.dataset.qolReady === 'reworked') return;
    track.dataset.qolReady = 'reworked';

    track.innerHTML = `
      <div class="portos-volume-visual" aria-hidden="true">
        <div class="portos-volume-fill"></div>
        <div class="portos-volume-knob"></div>
      </div>
      <input class="portos-volume-input" type="range" min="0" max="100" step="1" value="72" aria-label="Music volume">
    `;

    const input = track.querySelector('.portos-volume-input');
    const visual = track.querySelector('.portos-volume-visual');
    const fill = track.querySelector('.portos-volume-fill');
    const knob = track.querySelector('.portos-volume-knob');
    const label = gadget.querySelector('.volume-control > span:last-child');

    function render(value) {
      const n = Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
      input.value = String(n);
      visual.style.setProperty('--volume', `${n}%`);
      fill.style.width = `${n}%`;
      knob.style.left = `${n}%`;
      if (label) label.textContent = `${n}%`;
    }

    function setVolume(value) {
      const n = Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
      audio.volume = n / 100;
      render(n);
    }

    function sync() {
      render(audio.volume * 100);
    }

    input.addEventListener('input', () => setVolume(input.value));
    input.addEventListener('change', () => setVolume(input.value));
    input.addEventListener('pointerdown', e => e.stopPropagation(), true);
    input.addEventListener('pointermove', e => e.stopPropagation(), true);
    input.addEventListener('pointerup', e => e.stopPropagation(), true);
    input.addEventListener('click', e => e.stopPropagation(), true);
    input.addEventListener('wheel', e => {
      e.preventDefault();
      e.stopPropagation();
      setVolume(Number(input.value) + (e.deltaY < 0 ? 5 : -5));
    }, { passive:false });

    audio.addEventListener('volumechange', sync);
    if (!Number.isFinite(audio.volume)) audio.volume = .72;
    sync();
  }

  const style = document.createElement('style');
  style.id = 'portos-qol-reworked-volume-style';
  style.textContent = `
    .icon-values .icon-orb { background-image:none!important; }
    .values-ed-real-icon { width:100%!important;height:100%!important;object-fit:contain!important;display:block!important;background:transparent!important;border:0!important;filter:none!important;mix-blend-mode:normal!important;box-shadow:none!important; }

    .music-gadget .volume-control { position:relative!important;z-index:90!important;display:flex!important;align-items:center!important;gap:6px!important;pointer-events:auto!important; }
    .music-gadget .volume-track { position:relative!important;flex:1!important;min-width:110px!important;height:24px!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important;pointer-events:auto!important; }
    .portos-volume-visual { position:absolute!important;left:0!important;right:0!important;top:50%!important;height:8px!important;transform:translateY(-50%)!important;border-radius:999px!important;background:rgba(0,79,136,.28)!important;border:1px solid rgba(255,255,255,.9)!important;box-shadow:inset 0 2px 3px rgba(0,50,100,.22),0 1px 0 rgba(255,255,255,.7)!important;pointer-events:none!important;overflow:visible!important; }
    .portos-volume-fill { position:absolute!important;left:0!important;top:0!important;height:100%!important;width:72%!important;border-radius:inherit!important;background:linear-gradient(90deg,#cfffff,#45dff8,#0a88cf)!important;box-shadow:0 0 6px rgba(133,245,255,.85)!important;pointer-events:none!important; }
    .portos-volume-knob { position:absolute!important;top:50%!important;left:72%!important;width:20px!important;height:20px!important;transform:translate(-50%,-50%)!important;border:1px solid rgba(255,255,255,.98)!important;border-radius:50%!important;background:radial-gradient(circle at 35% 28%,#fff 0 18%,#d5ffff 31%,#5bdff8 68%,#087bc1 100%)!important;box-shadow:0 2px 5px rgba(0,55,110,.38),inset 0 1px 2px #fff!important;pointer-events:none!important;z-index:2!important; }
    .portos-volume-input { position:absolute!important;inset:-8px 0!important;width:100%!important;height:40px!important;margin:0!important;padding:0!important;opacity:0!important;cursor:pointer!important;z-index:5!important;appearance:none!important;-webkit-appearance:none!important;touch-action:none!important; }
    .portos-volume-input::-webkit-slider-thumb { width:40px!important;height:40px!important;cursor:pointer!important; }
    .portos-volume-input::-moz-range-thumb { width:40px!important;height:40px!important;cursor:pointer!important; }
  `;
  document.head.appendChild(style);

  fixValuesIcon();
  improveVolume();
  new MutationObserver(() => { fixValuesIcon(); improveVolume(); }).observe(document.body, { childList:true, subtree:true });
})();