/* PortOS QOL fixes: reliable Values Ed icon + easy volume slider. */
(() => {
  const iconSrc = 'Values Ed..png?v=4';

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
    if (!gadget || !track || track.dataset.qolReady) return;
    track.dataset.qolReady = 'true';
    track.innerHTML = '<input class="portos-volume-slider" type="range" min="0" max="100" value="72" step="1" aria-label="Music volume">';
    const slider = track.querySelector('.portos-volume-slider');
    const audio = gadget.querySelector('audio');
    const label = gadget.querySelector('.volume-control > span:last-child');

    const sync = () => {
      const value = Math.round((audio?.volume ?? 0.72) * 100);
      slider.value = String(value);
      if (label) label.textContent = `${value}%`;
    };
    slider.addEventListener('input', () => {
      if (audio) audio.volume = Number(slider.value) / 100;
      if (label) label.textContent = `${slider.value}%`;
    });
    slider.addEventListener('pointerdown', e => e.stopPropagation());
    slider.addEventListener('click', e => e.stopPropagation());
    sync();
  }

  const style = document.createElement('style');
  style.textContent = `
    .icon-values .icon-orb { background-image:none!important; }
    .values-ed-real-icon { width:100%!important; height:100%!important; object-fit:contain!important; display:block!important; background:transparent!important; border:0!important; filter:none!important; mix-blend-mode:normal!important; box-shadow:none!important; }
    .volume-track { flex:1!important; height:18px!important; display:flex!important; align-items:center!important; background:transparent!important; border:0!important; box-shadow:none!important; overflow:visible!important; cursor:default!important; }
    .portos-volume-slider { appearance:none!important; -webkit-appearance:none!important; width:100%!important; height:9px!important; margin:0!important; padding:0!important; border:1px solid rgba(255,255,255,.92)!important; border-radius:999px!important; outline:none!important; cursor:pointer!important; background:linear-gradient(90deg,#baffff 0%,#36dcff 72%,rgba(0,79,136,.25) 72%,rgba(0,79,136,.25) 100%)!important; box-shadow:inset 0 2px 3px rgba(0,50,100,.25),0 1px 0 rgba(255,255,255,.75)!important; }
    .portos-volume-slider::-webkit-slider-thumb { -webkit-appearance:none!important; appearance:none!important; width:18px!important; height:18px!important; border:1px solid rgba(255,255,255,.95)!important; border-radius:50%!important; cursor:grab!important; background:radial-gradient(circle at 35% 28%,#fff 0 18%,#cfffff 30%,#48d9f7 68%,#087bc1 100%)!important; box-shadow:0 2px 5px rgba(0,55,110,.35),inset 0 1px 2px #fff!important; }
    .portos-volume-slider::-moz-range-thumb { width:18px!important; height:18px!important; border:1px solid rgba(255,255,255,.95)!important; border-radius:50%!important; cursor:grab!important; background:radial-gradient(circle at 35% 28%,#fff 0 18%,#cfffff 30%,#48d9f7 68%,#087bc1 100%)!important; box-shadow:0 2px 5px rgba(0,55,110,.35),inset 0 1px 2px #fff!important; }
    .portos-volume-slider:active::-webkit-slider-thumb { cursor:grabbing!important; transform:scale(1.08); }
    .portos-volume-slider:active::-moz-range-thumb { transform:scale(1.08); }
  `;
  document.head.appendChild(style);

  fixValuesIcon();
  improveVolume();
  new MutationObserver(() => { fixValuesIcon(); improveVolume(); }).observe(document.body, {childList:true,subtree:true});
})();
