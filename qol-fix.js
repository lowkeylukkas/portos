/* PortOS QOL fixes: reliable Values Ed icon + bulletproof custom volume slider. */
(() => {
  const iconSrc = 'Values Ed..png?v=9';

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
    if (img.src !== new URL(iconSrc, document.baseURI).href) img.src = iconSrc;
  }

  function improveVolume() {
    const gadget = document.querySelector('.music-gadget');
    const track = gadget?.querySelector('.volume-track');
    const audio = gadget?.querySelector('audio');
    if (!gadget || !track || !audio || track.dataset.qolReady) return;
    track.dataset.qolReady = 'true';

    track.innerHTML = '<div class="portos-volume-slider" role="slider" aria-label="Music volume" aria-valuemin="0" aria-valuemax="100" aria-valuenow="72" tabindex="0"><div class="portos-volume-fill"></div><div class="portos-volume-knob"></div></div>';
    const slider = track.querySelector('.portos-volume-slider');
    const fill = slider.querySelector('.portos-volume-fill');
    const knob = slider.querySelector('.portos-volume-knob');
    const label = gadget.querySelector('.volume-control > span:last-child');
    let dragging = false;
    let activePointerId = null;

    const paint = (value) => {
      const n = Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
      audio.volume = n / 100;
      fill.style.width = `${n}%`;
      knob.style.left = `${n}%`;
      slider.style.setProperty('--volume', `${n}%`);
      slider.setAttribute('aria-valuenow', String(n));
      if (label) label.textContent = `${n}%`;
    };

    const valueFromPointer = (event) => {
      const rect = slider.getBoundingClientRect();
      if (!rect.width) return 0;
      return Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    };

    const startDrag = (event) => {
      const target = event.target?.closest?.('.portos-volume-slider');
      if (!target || target !== slider || event.button !== 0) return;
      event.preventDefault();
      event.stopPropagation();
      dragging = true;
      activePointerId = event.pointerId ?? null;
      slider.classList.add('dragging');
      paint(valueFromPointer(event));
      try { slider.setPointerCapture?.(event.pointerId); } catch (_) {}
    };

    const moveDrag = (event) => {
      if (!dragging) return;
      if (activePointerId !== null && event.pointerId !== undefined && event.pointerId !== activePointerId) return;
      event.preventDefault();
      event.stopPropagation();
      paint(valueFromPointer(event));
    };

    const endDrag = (event) => {
      if (!dragging) return;
      dragging = false;
      activePointerId = null;
      slider.classList.remove('dragging');
      try { slider.releasePointerCapture?.(event.pointerId); } catch (_) {}
      event?.stopPropagation?.();
    };

    /* Capture on the document so the gadget's older pointer handlers cannot steal the drag. */
    document.addEventListener('pointerdown', startDrag, {capture:true, passive:false});
    document.addEventListener('pointermove', moveDrag, {capture:true, passive:false});
    document.addEventListener('pointerup', endDrag, {capture:true, passive:false});
    document.addEventListener('pointercancel', endDrag, {capture:true, passive:false});

    slider.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      paint(valueFromPointer(event));
    });
    slider.addEventListener('wheel', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      paint(audio.volume * 100 + (event.deltaY < 0 ? 5 : -5));
    }, {passive:false});
    slider.addEventListener('keydown', (event) => {
      let value = audio.volume * 100;
      if (event.key === 'ArrowRight' || event.key === 'ArrowUp') value += 5;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') value -= 5;
      else if (event.key === 'Home') value = 0;
      else if (event.key === 'End') value = 100;
      else return;
      event.preventDefault();
      paint(value);
    });

    audio.addEventListener('volumechange', () => {
      const value = Math.round(audio.volume * 100);
      fill.style.width = `${value}%`;
      knob.style.left = `${value}%`;
      slider.style.setProperty('--volume', `${value}%`);
      slider.setAttribute('aria-valuenow', String(value));
      if (label) label.textContent = `${value}%`;
    });

    paint((audio.volume || 0.72) * 100);
  }

  const style = document.createElement('style');
  style.textContent = `
    .icon-values .icon-orb { background-image:none!important; }
    .values-ed-real-icon { width:100%!important;height:100%!important;object-fit:contain!important;display:block!important;background:transparent!important;border:0!important;filter:none!important;mix-blend-mode:normal!important;box-shadow:none!important; }
    .music-gadget .volume-control { position:relative!important;z-index:100!important;pointer-events:auto!important; }
    .music-gadget .volume-track { flex:1!important;min-width:110px!important;height:30px!important;display:flex!important;align-items:center!important;background:transparent!important;border:0!important;box-shadow:none!important;overflow:visible!important;pointer-events:auto!important; }
    .music-gadget .portos-volume-slider { position:relative!important;width:100%!important;min-width:110px!important;height:30px!important;cursor:pointer!important;touch-action:none!important;user-select:none!important;outline:none!important;background:transparent!important;border:0!important;box-shadow:none!important;pointer-events:auto!important; }
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
