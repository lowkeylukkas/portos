/* PortOS runtime polish — raster subject icons + reliable music app. */
(() => {
  const iconMap = {
    'MAPEH':'mapeh.png','TLE':'tle.png','Values Ed.':'values-ed.png','Values Education':'values-ed.png',
    'English':'english.png','Araling Panlipunan':'araling-panlipunan.png','My Galleries':'my-galleries.png',
    'Integration':'integration.png','Reflection':'reflection.png','Credits & Sources':'credits-sources.png',
    'Credits and Sources':'credits-sources.png','About Me':'about-me.png','Science':'science.png',
    'Filipino':'filipino.png','Mathematics':'mathematics.png','Music':'music.png',
    'Customize':'about-me.png','Files':'credits-sources.png','Help':'reflection.png'
  };
  const iconFor = (title) => iconMap[title] || 'about-me.png';

  function putRealIcon(container, src) {
    if (!container) return;
    let img = container.querySelector(':scope > img.portos-real-app-icon');
    if (!img) {
      container.textContent = '';
      img = document.createElement('img');
      img.className = 'portos-real-app-icon';
      img.alt = '';
      img.draggable = false;
      container.appendChild(img);
    }
    if (img.getAttribute('src') !== src) img.src = src;
    img.setAttribute('aria-hidden', 'true');
  }

  function polishAppIdentity(root = document) {
    root.querySelectorAll('.portos-app-window').forEach(win => {
      const title = win.querySelector('.portos-app-title')?.textContent?.trim() || '';
      putRealIcon(win.querySelector('.portos-app-icon'), iconFor(title));
    });
    root.querySelectorAll('.portos-window-task, .task-app').forEach(task => {
      const title = task.getAttribute('aria-label') || task.title || '';
      putRealIcon(task.querySelector('.mini-icon'), iconFor(title));
    });
  }

  const style = document.createElement('style');
  style.id = 'portos-final-icon-fix';
  style.textContent = `
    .icon-orb { background-color:transparent !important; background-repeat:no-repeat !important; background-position:center !important; background-size:contain !important; mix-blend-mode:normal !important; box-shadow:none !important; }
    .icon-mapeh .icon-orb { background-image:url("mapeh.png") !important; }
    .icon-tle .icon-orb { background-image:url("tle.png") !important; }
    .icon-values .icon-orb { background-image:url("values-ed.png") !important; }
    .icon-english .icon-orb { background-image:url("english.png") !important; }
    .icon-ap .icon-orb { background-image:url("araling-panlipunan.png") !important; }
    .icon-gallery .icon-orb { background-image:url("my-galleries.png") !important; }
    .icon-integration .icon-orb { background-image:url("integration.png") !important; }
    .icon-reflection .icon-orb { background-image:url("reflection.png") !important; }
    .icon-sources .icon-orb { background-image:url("credits-sources.png") !important; }
    .icon-music .icon-orb { background-image:url("music.png") !important; }
    .icon-about .icon-orb { background-image:url("about-me.png") !important; }
    .icon-science .icon-orb { background-image:url("science.png") !important; }
    .icon-filipino .icon-orb { background-image:url("filipino.png") !important; }
    .icon-math .icon-orb { background-image:url("mathematics.png") !important; }
    .portos-real-app-icon { width:100% !important; height:100% !important; object-fit:contain !important; background:transparent !important; border:0 !important; filter:none !important; mix-blend-mode:normal !important; }
    .lock-clock-wrap, .lock-time, .lock-date { display:none !important; }
    .lock-content { gap:0 !important; }
    .portos-music-app { position:fixed; left:50%; top:50%; width:min(620px,calc(100vw - 32px)); height:min(470px,calc(100vh - 120px)); transform:translate(-50%,-50%) scale(.94); opacity:0; z-index:120; border:1px solid rgba(255,255,255,.78); border-radius:26px; overflow:hidden; background:linear-gradient(145deg,rgba(236,252,255,.92),rgba(93,196,239,.76) 46%,rgba(5,89,164,.86)); box-shadow:inset 0 2px 6px rgba(255,255,255,.9),0 28px 70px rgba(0,26,65,.5),0 0 30px rgba(87,226,255,.28); backdrop-filter:blur(18px) saturate(145%); transition:transform .22s ease,opacity .22s ease; }
    .portos-music-app.open { transform:translate(-50%,-50%) scale(1); opacity:1; }
    .portos-music-app .music-app-head { height:52px; display:flex; align-items:center; gap:12px; padding:0 15px; color:#fff; font-weight:800; text-shadow:0 1px 3px rgba(0,50,100,.6); background:linear-gradient(180deg,rgba(194,246,255,.78),rgba(37,151,207,.66) 55%,rgba(4,77,143,.72)); border-bottom:1px solid rgba(255,255,255,.58); }
    .portos-music-app .music-app-head img { width:34px;height:34px;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,40,80,.3)); }
    .portos-music-app .music-app-close { margin-left:auto; width:34px;height:30px;border:1px solid rgba(255,255,255,.7);border-radius:9px;color:#fff;background:linear-gradient(180deg,rgba(255,255,255,.55),rgba(0,91,160,.55));cursor:pointer; }
    .portos-music-app .music-app-body { height:calc(100% - 52px); display:grid; place-items:center; padding:24px; }
    .portos-music-app .music-app-card { width:min(520px,100%); padding:24px; border-radius:24px; background:linear-gradient(145deg,rgba(255,255,255,.48),rgba(117,214,243,.3)); border:1px solid rgba(255,255,255,.7); box-shadow:inset 0 2px 5px rgba(255,255,255,.7),0 14px 30px rgba(0,62,110,.2); text-align:center; color:#fff; text-shadow:0 1px 3px rgba(0,49,96,.65); }
    .portos-music-app .music-app-cover { width:150px;height:150px;margin:0 auto 16px;border-radius:26px;object-fit:cover;border:2px solid rgba(255,255,255,.8);box-shadow:inset 0 2px 6px rgba(255,255,255,.8),0 10px 24px rgba(0,48,96,.28); }
    .portos-music-app .music-app-title { font-size:24px;font-weight:900; }
    .portos-music-app .music-app-artist { margin-top:5px;font-size:12px;opacity:.9; }
    .portos-music-app .music-app-controls { margin-top:22px;display:flex;justify-content:center;gap:10px; }
    .portos-music-app .music-app-controls button { width:42px;height:36px;border:1px solid rgba(255,255,255,.85);border-radius:11px;color:#05639a;background:linear-gradient(180deg,#fff,#c9f8ff 38%,#43b9e5 68%,#0878bf);box-shadow:inset 0 2px 3px rgba(255,255,255,.95),0 3px 6px rgba(0,44,86,.25);cursor:pointer;font-weight:900; }
    .portos-music-app .music-app-controls .main { width:52px;height:40px;font-size:16px; }
  `;
  document.head.appendChild(style);

  const observer = new MutationObserver(() => polishAppIdentity(document));
  observer.observe(document.body, { childList:true, subtree:true });
  polishAppIdentity(document);

  const music = document.querySelector('.music-gadget');
  const musicIcon = document.querySelector('.icon-music');
  let musicApp = null;

  function openMusicApp() {
    if (!musicApp) {
      musicApp = document.createElement('section');
      musicApp.className = 'portos-music-app';
      musicApp.setAttribute('role','dialog');
      musicApp.setAttribute('aria-label','PortOS Music');
      musicApp.innerHTML = `
        <div class="music-app-head"><img src="music.png" alt=""><span>PORTOS MUSIC</span><button class="music-app-close" type="button" aria-label="Close">×</button></div>
        <div class="music-app-body"><div class="music-app-card"><img class="music-app-cover" src="Iridescent Crystal Star Emblem.png" alt=""><div class="music-app-title">PortOS Music</div><div class="music-app-artist">Ready to play your Frutiger Mix</div><div class="music-app-controls"><button data-music="prev">◀</button><button class="main" data-music="play">▶</button><button data-music="next">▶</button></div></div></div>`;
      document.body.appendChild(musicApp);
      musicApp.querySelector('.music-app-close').addEventListener('click',()=>musicApp.classList.remove('open'));
      musicApp.querySelector('[data-music="play"]').addEventListener('click',async()=>{
        const p=window.PortOSMusic; if(!p?.audio) return; if(p.audio.paused) await p.start?.(); else p.audio.pause(); syncMusicApp();
      });
      musicApp.querySelector('[data-music="prev"]').addEventListener('click',()=>{ const p=window.PortOSMusic; if(!p) return; const i=p.tracks.indexOf(p.currentTrack); p.setTrack?.(i-1,true); syncMusicApp(); });
      musicApp.querySelector('[data-music="next"]').addEventListener('click',()=>{ window.PortOSMusic?.nextTrack?.(true); syncMusicApp(); });
    }
    musicApp.classList.remove('open');
    requestAnimationFrame(()=>musicApp.classList.add('open'));
    if (music) { music.classList.remove('music-hidden'); music.classList.add('music-focus'); music.style.zIndex='90'; }
    syncMusicApp();
  }

  function syncMusicApp() {
    if (!musicApp) return;
    const p=window.PortOSMusic; const play=musicApp.querySelector('[data-music="play"]'); const cover=musicApp.querySelector('.music-app-cover'); const title=musicApp.querySelector('.music-app-title'); const artist=musicApp.querySelector('.music-app-artist');
    if (!p) return;
    play.textContent=p.audio?.paused?'▶':'❚❚';
    if (p.currentTrack) { title.textContent=p.currentTrack.title; artist.textContent=`${p.currentTrack.artist} • PortOS Music`; }
    const liveCover=document.querySelector('.album-cover'); if(liveCover?.src) cover.src=liveCover.src;
  }

  if (music && musicIcon) {
    musicIcon.addEventListener('click', (event) => { event.preventDefault(); event.stopPropagation(); openMusicApp(); });
    const playButton = music.querySelector('.music-button.play');
    playButton?.addEventListener('click', async (event) => {
      event.preventDefault(); event.stopImmediatePropagation();
      const player = window.PortOSMusic; if (!player?.audio) return;
      try { if (player.audio.paused) await player.start?.(); else player.audio.pause(); syncMusicApp(); } catch (_) {}
    }, true);
  }
  document.addEventListener('play',syncMusicApp,true);
  document.addEventListener('pause',syncMusicApp,true);
})();
