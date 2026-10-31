/* PortOS QOL fixes: reliable Values Ed icon + isolated volume slider + centered Start profile. */
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
    if (!gadget || !track || !audio || track.dataset.qolReady === 'native') return;
    track.dataset.qolReady = 'native';

    track.innerHTML = '<input class="portos-volume-native" type="range" min="0" max="100" step="1" value="72" aria-label="Music volume">';
    const input = track.querySelector('.portos-volume-native');
    const label = gadget.querySelector('.volume-control > span:last-child');

    function render(value) {
      const n = Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
      input.value = String(n);
      input.style.setProperty('--volume', `${n}%`);
      input.style.background = `linear-gradient(90deg, #cfffff 0%, #45dff8 ${n}%, rgba(0,79,136,.28) ${n}%, rgba(0,79,136,.28) 100%)`;
      if (label) label.textContent = `${n}%`;
    }

    function setVolume(value) {
      const n = Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
      audio.volume = n / 100;
      render(n);
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
    audio.addEventListener('volumechange', () => render(audio.volume * 100));

    if (!Number.isFinite(audio.volume)) audio.volume = .72;
    render(audio.volume * 100);
  }

  const style = document.createElement('style');
  style.id = 'portos-qol-native-volume-style';
  style.textContent = `
    .icon-values .icon-orb { background-image:none!important; }
    .values-ed-real-icon { width:100%!important;height:100%!important;object-fit:contain!important;display:block!important;background:transparent!important;border:0!important;filter:none!important;mix-blend-mode:normal!important;box-shadow:none!important; }
    .music-gadget .volume-control { position:relative!important;z-index:999!important;display:flex!important;align-items:center!important;gap:6px!important;pointer-events:auto!important; }
    .music-gadget .volume-track { position:relative!important;flex:1!important;min-width:110px!important;width:auto!important;height:24px!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important;pointer-events:auto!important; }
    .portos-volume-native { position:absolute!important;left:0!important;top:2px!important;width:100%!important;height:20px!important;margin:0!important;padding:0!important;display:block!important;opacity:1!important;cursor:pointer!important;z-index:1000!important;appearance:none!important;-webkit-appearance:none!important;border:1px solid rgba(255,255,255,.9)!important;border-radius:999px!important;box-shadow:inset 0 2px 3px rgba(0,50,100,.22),0 1px 0 rgba(255,255,255,.7)!important;background:rgba(0,79,136,.28)!important;overflow:visible!important; }
    .portos-volume-native::-webkit-slider-thumb { -webkit-appearance:none!important;appearance:none!important;width:18px!important;height:18px!important;border-radius:50%!important;border:1px solid rgba(255,255,255,.98)!important;background:radial-gradient(circle at 35% 28%,#fff 0 18%,#d5ffff 31%,#5bdff8 68%,#087bc1 100%)!important;box-shadow:0 2px 5px rgba(0,55,110,.38),inset 0 1px 2px #fff!important;cursor:pointer!important; }
    .portos-volume-native::-moz-range-thumb { width:18px!important;height:18px!important;border-radius:50%!important;border:1px solid rgba(255,255,255,.98)!important;background:radial-gradient(circle at 35% 28%,#fff 0 18%,#d5ffff 31%,#5bdff8 68%,#087bc1 100%)!important;box-shadow:0 2px 5px rgba(0,55,110,.38),inset 0 1px 2px #fff!important;cursor:pointer!important; }
    .portos-volume-native::-moz-range-track { height:18px!important;border:0!important;background:transparent!important; }

    /* Center the Start-menu identity as one cohesive profile group. */
    .start-user {
      justify-content:center!important;
      text-align:left!important;
    }
    .start-user > div:last-child {
      flex:0 0 auto!important;
    }
  `;
  document.head.appendChild(style);

  function fixStartProfile() {
    const img = document.querySelector('.start-avatar .portos-start-logo');
    if (!img) return;
    img.src = 'mqdefault.jpg';
    img.style.setProperty('content', 'url("mqdefault.jpg")', 'important');
    img.style.setProperty('object-fit', 'cover', 'important');
    img.style.setProperty('object-position', 'center', 'important');
    img.style.setProperty('border-radius', '50%', 'important');
  }

  fixValuesIcon();
  improveVolume();
  fixStartProfile();
  new MutationObserver(() => {
    fixValuesIcon();
    improveVolume();
    fixStartProfile();
  }).observe(document.body, { childList:true, subtree:true });
})();
