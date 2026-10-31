/* PortOS QOL fixes: reliable Values Ed icon + actually movable custom volume slider. */
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
    return window.PortOSMusic?.audio || document.querySelector('.music-gadget audio') || document.querySelector('audio');
  }

  function improveVolume() {
    const gadget = document.querySelector('.music-gadget');
    const track = gadget?.querySelector('.volume-track');
    const audio = getMusicAudio();
    if (!gadget || !track || !audio || track.dataset.qolReady === 'true') return;
    track.dataset.qolReady = 'true';

    track.innerHTML = '<div class="portos-volume-slider" role="slider" aria-label="Music volume" aria-valuemin="0" aria-valuemax="100" tabindex="0"><div class="portos-volume-fill"></div><div class="portos-volume-knob"></div></div>';
    const slider = track.querySelector('.portos-volume-slider');
    const fill = slider.querySelector('.portos-volume-fill');
    const knob = slider.querySelector('.portos-volume-knob');
    const label = gadget.querySelector('.volume-control > span:last-child');
    let dragging = false;

    function paint(value) {
      const n = Math.max(0, Math.min(100, Number(value) || 0));
      const pct = `${n}%`;
      audio.volume = n / 100;
      slider.style.setProperty('--volume', pct);
      fill.style.setProperty('width', pct, 'important');
      knob.style.setProperty('left', pct, 'important');
      slider.setAttribute('aria-valuenow', String(Math.round(n)));
      if (label) label.textContent = `${Math.round(n)}%`;
    }

    function valueFromEvent(e) {
      const r = slider.getBoundingClientRect();
      if (!r.width) return audio.volume * 100;
      return Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
    }

    function begin(e) {
      if (e.button !== undefined && e.button !== 0) return;
      if (!e.target.closest?.('.portos-volume-slider')) return;
      e.preventDefault();
      e.stopPropagation();
      dragging = true;
      slider.classList.add('dragging');
      paint(valueFromEvent(e));
      try { slider.setPointerCapture(e.pointerId); } catch (_) {}
    }

    function move(e) {
      if (!dragging) return;
      e.preventDefault();
      e.stopPropagation();
      paint(valueFromEvent(e));
    }

    function end(e) {
      if (!dragging) return;
      dragging = false;
      slider.classList.remove('dragging');
      try { slider.releasePointerCapture(e.pointerId); } catch (_) {}
    }

    slider.addEventListener('pointerdown', begin, {capture:true, passive:false});
    slider.addEventListener('pointermove', move, {capture:true, passive:false});
    slider.addEventListener('pointerup', end, {capture:true, passive:false});
    slider.addEventListener('pointercancel', end, {capture:true, passive:false});
    slider.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      paint(valueFromEvent(e));
    });
    slider.addEventListener('wheel', e => {
      e.preventDefault();
      e.stopPropagation();
      paint(audio.volume * 100 + (e.deltaY < 0 ? 5 : -5));
    }, {passive:false});
    slider.addEventListener('keydown', e => {
      let v = audio.volume * 100;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') v += 5;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') v -= 5;
      else if (e.key === 'Home') v = 0;
      else if (e.key === 'End') v = 100;
      else return;
      e.preventDefault();
      paint(v);
    });

    audio.addEventListener('volumechange', () => paint(audio.volume * 100));
    paint(audio.volume * 100 || 72);
  }

  const style = document.createElement('style');
  style.textContent = `
    .icon-values .icon-orb { background-image:none!important; }
    .values-ed-real-icon { width:100%!important;height:100%!important;object-fit:contain!important;display:block!important;background:transparent!important;border:0!important;filter:none!important;mix-blend-mode:normal!important;box-shadow:none!important; }
    .music-gadget .volume-control { position:relative!important;z-index:9999!important;pointer-events:auto!important; }
    .music-gadget .volume-track { flex:1!important;min-width:110px!important;height:30px!important;display:block!important;background:transparent!important;border:0!important;box-shadow:none!important;overflow:visible!important;pointer-events:auto!important; }
    .music-gadget .portos-volume-slider { position:relative!important;width:100%!important;height:30px!important;cursor:pointer!important;touch-action:none!important;user-select:none!important;outline:none!important;background:transparent!important;border:0!important;box-shadow:none!important;pointer-events:auto!important; }
    .music-gadget .portos-volume-slider::before { content:"";position:absolute!important;left:0!important;right:0!important;top:50%!important;height:6px!important;transform:translateY(-50%)!important;border-radius:999px!important;background:rgba(0,78,140,.28)!important;box-shadow:inset 0 1px 2px rgba(0,40,90,.28)!important;pointer-events:none!important; }
    .music-gadget .portos-volume-fill { position:absolute!important;left:0!important;top:50%!important;width:var(--volume,72%)!important;height:6px!important;transform:translateY(-50%)!important;border-radius:999px!important;background:linear-gradient(90deg,#d9ffff,#5ee7ff 58%,#20bce9)!important;box-shadow:0 0 6px rgba(132,245,255,.7),inset 0 1px 2px rgba(255,255,255,.9)!important;pointer-events:none!important; }
    .music-gadget .portos-volume-knob { position:absolute!important;top:50%!important;left:var(--volume,72%)!important;width:22px!important;height:22px!important;transform:translate(-50%,-50%)!important;border:1px solid rgba(255,255,255,.98)!important;border-radius:50%!important;background:radial-gradient(circle at 35% 28%,#fff 0 18%,#d5ffff 31%,#5bdff8 68%,#087bc1 100%)!important;box-shadow:0 2px 5px rgba(0,55,110,.38),inset 0 1px 2px #fff!important;pointer-events:none!important;transition:none!important; }
    .music-gadget .portos-volume-slider.dragging .portos-volume-knob { transform:translate(-50%,-50%) scale(1.08)!important; }
    .music-gadget .portos-volume-slider:focus-visible .portos-volume-knob { outline:2px solid rgba(255,255,255,.9)!important;outline-offset:2px!important; }
  `;
  document.head.appendChild(style);

  fixValuesIcon();
  improveVolume();
  new MutationObserver(() => { fixValuesIcon(); improveVolume(); }).observe(document.body, {childList:true,subtree:true});
})();