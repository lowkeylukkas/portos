/* PortOS QOL fixes: reliable Values Ed icon + easy volume slider. */
(() => {
  const iconSrc = 'Values Ed..png?v=5';

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
    if (!gadget || !track) return;

    let slider = track.querySelector('.portos-volume-slider');
    if (!slider) {
      track.innerHTML = '<input class="portos-volume-slider" type="range" min="0" max="100" value="72" step="1" aria-label="Music volume">';
      slider = track.querySelector('.portos-volume-slider');
    }

    const audio = gadget.querySelector('audio');
    const label = gadget.querySelector('.volume-control > span:last-child');
    if (!slider || !audio || slider.dataset.qolReady) return;
    slider.dataset.qolReady = 'true';

    const paint = (value) => {
      const n = Math.max(0, Math.min(100, Math.round(value)));
      slider.value = String(n);
      slider.style.setProperty('--volume', `${n}%`);
      if (label) label.textContent = `${n}%`;
    };

    const sync = () => paint((audio.volume ?? 0.72) * 100);

    const setVolume = () => {
      audio.volume = Number(slider.value) / 100;
      paint(slider.value);
    };

    slider.addEventListener('input', setVolume);
    slider.addEventListener('change', setVolume);
    slider.addEventListener('pointerdown', (event) => event.stopPropagation());
    slider.addEventListener('pointermove', (event) => event.stopPropagation());
    slider.addEventListener('click', (event) => event.stopPropagation());
    slider.addEventListener('wheel', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const step = event.deltaY < 0 ? 5 : -5;
      audio.volume = Math.max(0, Math.min(1, audio.volume + step / 100));
      sync();
    }, { passive: false });

    audio.addEventListener('volumechange', sync);
    sync();
  }

  const style = document.createElement('style');
  style.textContent = `
    .icon-values .icon-orb { background-image:none!important; }
    .values-ed-real-icon { width:100%!important; height:100%!important; object-fit:contain!important; display:block!important; background:transparent!important; border:0!important; filter:none!important; mix-blend-mode:normal!important; box-shadow:none!important; }

    .music-gadget .volume-control { position:relative!important; z-index:20!important; pointer-events:auto!important; }
    .music-gadget .volume-track { flex:1!important; min-width:110px!important; height:28px!important; display:flex!important; align-items:center!important; background:transparent!important; border:0!important; box-shadow:none!important; overflow:visible!important; cursor:default!important; pointer-events:auto!important; touch-action:none!important; }
    .music-gadget .portos-volume-slider { appearance:none!important; -webkit-appearance:none!important; width:100%!important; min-width:110px!important; height:10px!important; margin:0!important; padding:0!important; border:1px solid rgba(255,255,255,.95)!important; border-radius:999px!important; outline:none!important; cursor:pointer!important; pointer-events:auto!important; touch-action:none!important; background:linear-gradient(90deg,#baffff 0%,#36dcff var(--volume,72%),rgba(0,79,136,.25) var(--volume,72%),rgba(0,79,136,.25) 100%)!important; box-shadow:inset 0 2px 3px rgba(0,50,100,.25),0 1px 0 rgba(255,255,255,.75)!important; }
    .music-gadget .portos-volume-slider::-webkit-slider-thumb { -webkit-appearance:none!important; appearance:none!important; width:22px!important; height:22px!important; border:1px solid rgba(255,255,255,.98)!important; border-radius:50%!important; cursor:grab!important; background:radial-gradient(circle at 35% 28%,#fff 0 18%,#cfffff 30%,#48d9f7 68%,#087bc1 100%)!important; box-shadow:0 2px 5px rgba(0,55,110,.35),inset 0 1px 2px #fff!important; }
    .music-gadget .portos-volume-slider::-moz-range-thumb { width:22px!important; height:22px!important; border:1px solid rgba(255,255,255,.98)!important; border-radius:50%!important; cursor:grab!important; background:radial-gradient(circle at 35% 28%,#fff 0 18%,#cfffff 30%,#48d9f7 68%,#087bc1 100%)!important; box-shadow:0 2px 5px rgba(0,55,110,.35),inset 0 1px 2px #fff!important; }
    .music-gadget .portos-volume-slider:active::-webkit-slider-thumb { cursor:grabbing!important; transform:scale(1.1); }
    .music-gadget .portos-volume-slider:active::-moz-range-thumb { transform:scale(1.1); }
  `;
  document.head.appendChild(style);

  fixValuesIcon();
  improveVolume();
  new MutationObserver(() => { fixValuesIcon(); improveVolume(); }).observe(document.body, {childList:true,subtree:true});
})();
