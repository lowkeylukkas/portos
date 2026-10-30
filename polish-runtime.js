/* PortOS runtime — transparent subject icons + full Frutiger Aero Music app. */
(() => {
  const iconMap = {
    'MAPEH':'MAPEH.png','TLE':'TLE.png','Values Ed.':'values-ed.png','Values Education':'values-ed.png',
    'English':'English.png','Araling Panlipunan':'Araling Panlipunan.png','Science':'Science.png',
    'Filipino':'Filipino.png','Mathematics':'Mathematics.png','Music':'Music.png'
  };
  const iconFor = title => iconMap[title] || 'Iridescent Crystal Star Emblem.png';

  function putRealIcon(container, src){
    if(!container)return;
    let img=container.querySelector(':scope > img.portos-real-app-icon');
    if(!img){container.textContent='';img=document.createElement('img');img.className='portos-real-app-icon';img.alt='';img.draggable=false;container.appendChild(img)}
    if(img.getAttribute('src')!==src)img.src=src;
    img.setAttribute('aria-hidden','true');
  }
  function polishAppIdentity(root=document){
    root.querySelectorAll('.portos-app-window').forEach(win=>{
      const title=win.querySelector('.portos-app-title')?.textContent?.trim()||'';
      putRealIcon(win.querySelector('.portos-app-icon'),iconFor(title));
    });
    root.querySelectorAll('.portos-window-task,.task-app').forEach(task=>{
      const title=task.getAttribute('aria-label')||task.title||'';
      putRealIcon(task.querySelector('.mini-icon'),iconFor(title));
    });
  }

  const style=document.createElement('style');
  style.id='portos-final-icon-and-music-fix';
  style.textContent=`
    .icon-orb{background-color:transparent!important;background-repeat:no-repeat!important;background-position:center!important;background-size:contain!important;mix-blend-mode:normal!important;box-shadow:none!important;filter:none!important}
    .portos-real-app-icon{width:100%!important;height:100%!important;object-fit:contain!important;background:transparent!important;border:0!important;filter:none!important;mix-blend-mode:normal!important;box-shadow:none!important}
    .icon-mapeh .icon-orb{background-image:url("MAPEH.png")!important}.icon-tle .icon-orb{background-image:url("TLE.png")!important}.icon-values .icon-orb{background-image:url("values-ed.png")!important}.icon-english .icon-orb{background-image:url("English.png")!important}.icon-ap .icon-orb{background-image:url("Araling Panlipunan.png")!important}.icon-music .icon-orb{background-image:url("Music.png")!important}.icon-science .icon-orb{background-image:url("Science.png")!important}.icon-filipino .icon-orb{background-image:url("Filipino.png")!important}.icon-math .icon-orb{background-image:url("Mathematics.png")!important}
    .lock-clock-wrap,.lock-time,.lock-date{display:none!important}.lock-content{gap:0!important}

    .portos-music-app{position:fixed;left:50%;top:50%;width:min(820px,calc(100vw - 34px));height:min(680px,calc(100vh - 70px));transform:translate(-50%,-50%) scale(.94);opacity:0;visibility:hidden;z-index:120;border:1px solid rgba(255,255,255,.86);border-radius:24px;overflow:hidden;background:linear-gradient(145deg,rgba(229,251,255,.96),rgba(89,190,235,.94) 44%,rgba(11,91,170,.96));box-shadow:inset 0 2px 7px rgba(255,255,255,.98),0 30px 80px rgba(0,26,65,.58),0 0 38px rgba(79,222,255,.34);backdrop-filter:blur(20px) saturate(150%);transition:transform .22s ease,opacity .22s ease,visibility .22s ease;color:#fff;font-family:Segoe UI,Arial,sans-serif}
    .portos-music-app.open{transform:translate(-50%,-50%) scale(1);opacity:1;visibility:visible}
    .portos-music-app *{box-sizing:border-box}
    .portos-music-app .music-app-head{height:58px;display:flex;align-items:center;gap:11px;padding:0 15px;color:#fff;font-size:16px;font-weight:800;text-shadow:0 1px 3px rgba(0,50,100,.65);background:linear-gradient(180deg,rgba(194,247,255,.86),rgba(40,157,213,.76) 52%,rgba(3,78,146,.8));border-bottom:1px solid rgba(255,255,255,.62)}
    .portos-music-app .music-app-head img{width:32px;height:32px;object-fit:contain;background:transparent!important;filter:none!important}
    .portos-music-app .music-app-close{margin-left:auto;width:36px;height:31px;border:1px solid rgba(255,255,255,.82);border-radius:9px;color:#fff;background:linear-gradient(180deg,rgba(255,255,255,.55),rgba(0,91,160,.62));cursor:pointer;font-size:20px;line-height:1;box-shadow:inset 0 1px 2px rgba(255,255,255,.8)}
    .portos-music-app .music-app-layout{height:calc(100% - 58px);display:grid;grid-template-columns:160px 1fr;min-height:0}
    .portos-music-app .music-sidebar{padding:17px 10px;background:linear-gradient(180deg,rgba(14,123,191,.56),rgba(5,66,137,.6));border-right:1px solid rgba(255,255,255,.42);display:flex;flex-direction:column;gap:7px}
    .portos-music-app .music-side-title{font-size:10px;letter-spacing:1px;text-transform:uppercase;opacity:.72;padding:4px 10px 8px;font-weight:900}
    .portos-music-app .music-nav{border:1px solid transparent;border-radius:11px;background:transparent;color:#fff;text-align:left;padding:10px 11px;font-size:12px;font-weight:800;cursor:pointer;text-shadow:0 1px 2px rgba(0,45,85,.65)}
    .portos-music-app .music-nav:hover,.portos-music-app .music-nav.active{background:linear-gradient(180deg,rgba(255,255,255,.42),rgba(96,202,239,.28));border-color:rgba(255,255,255,.45);box-shadow:inset 0 1px 2px rgba(255,255,255,.65),0 4px 12px rgba(0,46,95,.12)}
    .portos-music-app .music-nav span{display:inline-block;width:24px;font-size:17px;vertical-align:-2px}
    .portos-music-app .music-main{min-width:0;min-height:0;padding:16px 17px 14px;overflow:hidden;display:flex;flex-direction:column;gap:12px;background:linear-gradient(180deg,rgba(216,248,255,.28),rgba(38,135,211,.14))}
    .portos-music-app .music-main-top{display:flex;align-items:center;gap:12px}
    .portos-music-app .music-view-title{font-size:19px;font-weight:900;text-shadow:0 2px 4px rgba(0,49,96,.62)}
    .portos-music-app .music-search{margin-left:auto;width:min(235px,42%);height:34px;border:1px solid rgba(255,255,255,.68);border-radius:18px;padding:0 14px;color:#07548b;background:rgba(255,255,255,.48);outline:none;box-shadow:inset 0 2px 4px rgba(0,67,115,.12),0 1px 2px rgba(255,255,255,.7)}
    .portos-music-app .music-search::placeholder{color:#24709b}
    .portos-music-app .now-card{display:grid;grid-template-columns:220px 1fr;gap:20px;padding:16px;border-radius:20px;border:1px solid rgba(255,255,255,.72);background:linear-gradient(145deg,rgba(255,255,255,.48),rgba(112,214,243,.28));box-shadow:inset 0 2px 5px rgba(255,255,255,.78),0 10px 26px rgba(0,57,112,.16);min-height:215px}
    .portos-music-app .record-stage{position:relative;display:grid;place-items:center;min-height:180px;overflow:hidden}
    .portos-music-app .record{width:164px;height:164px;border-radius:50%;background:radial-gradient(circle at center,#eafcff 0 7%,#7ed5f0 8% 11%,#0a75b6 12% 22%,#0a3e7c 23% 100%);box-shadow:0 9px 20px rgba(0,44,90,.3),inset 0 2px 4px rgba(255,255,255,.75);position:absolute;right:4px;animation:portosSpin 7s linear infinite;animation-play-state:paused}
    .portos-music-app.playing .record{animation-play-state:running}
    .portos-music-app .record::after{content:"";position:absolute;inset:16px;border-radius:50%;background:repeating-radial-gradient(circle,rgba(255,255,255,.12) 0 1px,transparent 2px 6px)}
    .portos-music-app .now-cover{position:relative;width:168px;height:168px;border-radius:18px;object-fit:cover;border:2px solid rgba(255,255,255,.86);box-shadow:inset 0 2px 5px rgba(255,255,255,.8),0 9px 20px rgba(0,47,94,.3);z-index:2;margin-left:-40px}
    .portos-music-app .now-info{align-self:center;min-width:0;padding-right:8px}
    .portos-music-app .now-label{font-size:10px;text-transform:uppercase;letter-spacing:1.3px;opacity:.78;font-weight:900}
    .portos-music-app .now-title{font-size:27px;line-height:1.08;font-weight:900;margin-top:6px;text-shadow:0 2px 4px rgba(0,46,93,.62)}
    .portos-music-app .now-artist{font-size:12px;margin-top:5px;opacity:.9}
    .portos-music-app .now-actions{display:flex;align-items:center;gap:8px;margin-top:17px}
    .portos-music-app .player-btn{width:38px;height:34px;border:1px solid rgba(255,255,255,.88);border-radius:10px;color:#05649a;background:linear-gradient(180deg,#fff,#d5fbff 38%,#5ac7eb 67%,#087bc1);box-shadow:inset 0 2px 3px rgba(255,255,255,.96),0 3px 7px rgba(0,44,86,.28);cursor:pointer;font-weight:900}
    .portos-music-app .player-btn.main{width:50px;height:42px;border-radius:50%;font-size:16px}
    .portos-music-app .heart-btn{margin-left:auto;background:transparent;border:0;color:#fff;font-size:26px;cursor:pointer;text-shadow:0 2px 4px rgba(0,48,90,.5)}
    .portos-music-app .song-progress{margin-top:14px;height:7px;border-radius:8px;background:rgba(255,255,255,.4);overflow:hidden;box-shadow:inset 0 1px 2px rgba(0,48,90,.15)}
    .portos-music-app .song-progress-fill{height:100%;width:0;background:linear-gradient(90deg,#fff,#a6efff);border-radius:8px;box-shadow:0 0 8px rgba(255,255,255,.85)}
    .portos-music-app .song-times{display:flex;justify-content:space-between;font-size:9px;margin-top:4px;opacity:.82}
    .portos-music-app .songs-card{min-height:0;flex:1;border:1px solid rgba(255,255,255,.68);border-radius:17px;background:rgba(224,249,255,.25);box-shadow:inset 0 1px 3px rgba(255,255,255,.58);overflow:hidden;display:flex;flex-direction:column}
    .portos-music-app .songs-head{height:42px;display:flex;align-items:center;padding:0 12px;font-size:13px;font-weight:900;border-bottom:1px solid rgba(255,255,255,.38);text-shadow:0 1px 2px rgba(0,47,91,.55)}
    .portos-music-app .song-list{overflow:auto;padding:5px}
    .portos-music-app .song-row{width:100%;display:grid;grid-template-columns:38px minmax(0,1fr) 50px 32px;gap:8px;align-items:center;border:1px solid transparent;border-radius:10px;background:transparent;color:#fff;padding:6px 8px;text-align:left;cursor:pointer}
    .portos-music-app .song-row:hover,.portos-music-app .song-row.current{background:linear-gradient(180deg,rgba(255,255,255,.42),rgba(86,193,233,.25));border-color:rgba(255,255,255,.42);box-shadow:inset 0 1px 2px rgba(255,255,255,.62)}
    .portos-music-app .song-thumb{width:34px;height:34px;border-radius:7px;object-fit:cover;border:1px solid rgba(255,255,255,.72)}
    .portos-music-app .song-name{font-size:11px;font-weight:850;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .portos-music-app .song-by{font-size:9px;opacity:.74;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .portos-music-app .song-duration{font-size:9px;text-align:right;opacity:.86}
    .portos-music-app .song-heart{border:0;background:transparent;color:#fff;font-size:17px;cursor:pointer;text-shadow:0 1px 2px rgba(0,50,90,.5)}
    @keyframes portosSpin{to{transform:rotate(360deg)}}
    @media(max-width:720px){.portos-music-app .music-app-layout{grid-template-columns:110px 1fr}.portos-music-app .now-card{grid-template-columns:1fr}.portos-music-app .record-stage{display:none}.portos-music-app .now-cover{margin:0 auto}.portos-music-app .music-search{width:40%}}
  `;
  document.head.appendChild(style);

  const observer=new MutationObserver(()=>polishAppIdentity(document));
  observer.observe(document.body,{childList:true,subtree:true});
  polishAppIdentity(document);

  const music=document.querySelector('.music-gadget'), musicIcon=document.querySelector('.icon-music');
  let musicApp=null;
  const favoriteKey='portos-music-favorites';
  const getFavorites=()=>{try{return JSON.parse(localStorage.getItem(favoriteKey)||'[]')}catch(_){return[]}};
  const saveFavorites=f=>{try{localStorage.setItem(favoriteKey,JSON.stringify(f))}catch(_) {}};

  function openMusicApp(){
    if(!musicApp){
      musicApp=document.createElement('section');
      musicApp.className='portos-music-app';
      musicApp.setAttribute('role','dialog');
      musicApp.setAttribute('aria-label','PortOS Music');
      musicApp.innerHTML=`
        <div class="music-app-head"><img src="Music.png" alt=""><span>PortOS Music</span><button class="music-app-close" type="button" aria-label="Close">×</button></div>
        <div class="music-app-layout">
          <aside class="music-sidebar">
            <div class="music-side-title">Library</div>
            <button class="music-nav active" data-view="now"><span>♫</span>Now Playing</button>
            <button class="music-nav" data-view="songs"><span>☷</span>All Songs</button>
            <button class="music-nav" data-view="favorites"><span>♡</span>Favorites</button>
            <div class="music-side-title" style="margin-top:12px">Playlists</div>
            <button class="music-nav" data-view="playlist"><span>☷</span>PortOS Mix</button>
          </aside>
          <main class="music-main">
            <div class="music-main-top"><div class="music-view-title">Now Playing</div><input class="music-search" type="search" placeholder="Search songs..." aria-label="Search songs"></div>
            <section class="now-card">
              <div class="record-stage"><div class="record"></div><img class="now-cover" src="Iridescent Crystal Star Emblem.png" alt="Album cover"></div>
              <div class="now-info"><div class="now-label">Now Playing</div><div class="now-title">Loading…</div><div class="now-artist">PortOS Music</div><div class="now-actions"><button class="player-btn" data-player="prev" aria-label="Previous">◀</button><button class="player-btn main" data-player="play" aria-label="Play">▶</button><button class="player-btn" data-player="next" aria-label="Next">▶</button><button class="heart-btn" data-player="favorite" aria-label="Favorite">♡</button></div><div class="song-progress"><div class="song-progress-fill"></div></div><div class="song-times"><span>0:00</span><span>0:00</span></div></div>
            </section>
            <section class="songs-card"><div class="songs-head"><span>All Songs</span></div><div class="song-list"></div></section>
          </main>
        </div>`;
      document.body.appendChild(musicApp);
      musicApp.querySelector('.music-app-close').addEventListener('click',()=>musicApp.classList.remove('open'));
      musicApp.querySelectorAll('.music-nav').forEach(nav=>nav.addEventListener('click',()=>{musicApp.querySelectorAll('.music-nav').forEach(n=>n.classList.remove('active'));nav.classList.add('active');musicApp.querySelector('.music-view-title').textContent=nav.textContent.trim();renderSongs(nav.dataset.view||'songs')}));
      musicApp.querySelector('.music-search').addEventListener('input',e=>renderSongs('songs',e.target.value));
      musicApp.querySelector('[data-player="play"]').addEventListener('click',async()=>{const p=window.PortOSMusic;if(!p?.audio)return;if(p.audio.paused)await p.start?.();else p.audio.pause();syncMusicApp()});
      musicApp.querySelector('[data-player="prev"]').addEventListener('click',()=>{const p=window.PortOSMusic;if(!p)return;const i=p.tracks.indexOf(p.currentTrack);p.setTrack?.(i-1,true);syncMusicApp()});
      musicApp.querySelector('[data-player="next"]').addEventListener('click',()=>{window.PortOSMusic?.nextTrack?.(true);syncMusicApp()});
      musicApp.querySelector('[data-player="favorite"]').addEventListener('click',()=>toggleFavorite(window.PortOSMusic?.currentTrack));
    }
    musicApp.classList.remove('open');requestAnimationFrame(()=>musicApp.classList.add('open'));
    if(music){music.classList.remove('music-hidden');music.classList.add('music-focus');music.style.zIndex='90'}
    renderSongs('songs');syncMusicApp();
  }

  function toggleFavorite(track){
    if(!track)return;
    const favorites=getFavorites();
    const i=favorites.indexOf(track.title);
    if(i>=0)favorites.splice(i,1);else favorites.push(track.title);
    saveFavorites(favorites);syncMusicApp();renderSongs('songs');
  }

  function renderSongs(view='songs',query=''){
    if(!musicApp||!window.PortOSMusic)return;
    const tracks=window.PortOSMusic.tracks||[];const current=window.PortOSMusic.currentTrack;const fav=getFavorites();
    let list=tracks;
    if(view==='favorites')list=tracks.filter(t=>fav.includes(t.title));
    if(view==='playlist')list=tracks;
    const q=String(query||'').trim().toLowerCase();
    if(q)list=list.filter(t=>`${t.title} ${t.artist}`.toLowerCase().includes(q));
    const host=musicApp.querySelector('.song-list');
    host.innerHTML='';
    if(!list.length){host.innerHTML='<div style="padding:30px;text-align:center;opacity:.8;font-size:12px">No songs here yet ♡</div>';return}
    list.forEach(track=>{
      const row=document.createElement('button');row.className='song-row'+(current?.title===track.title?' current':'');row.type='button';
      const idx=tracks.indexOf(track);row.innerHTML=`<img class="song-thumb" src="Iridescent Crystal Star Emblem.png" alt=""><span><div class="song-name"></div><div class="song-by"></div></span><span class="song-duration">—</span><button class="song-heart" type="button" aria-label="Favorite">${fav.includes(track.title)?'♥':'♡'}</button>`;
      row.querySelector('.song-name').textContent=track.title;row.querySelector('.song-by').textContent=track.artist;
      row.querySelector('.song-heart').addEventListener('click',e=>{e.stopPropagation();toggleFavorite(track)});
      row.addEventListener('click',()=>{window.PortOSMusic.setTrack?.(idx,true);syncMusicApp();renderSongs(view,query)});
      host.appendChild(row);
      const cover=musicApp.querySelector('.now-cover');
      if(window.PortOSMusic.audio?.duration&&current?.title===track.title)row.querySelector('.song-duration').textContent=formatDuration(window.PortOSMusic.audio.duration);
      loadTrackThumb(track,row.querySelector('.song-thumb'));
    });
  }
  function formatDuration(s){return Number.isFinite(s)?`${Math.floor(s/60)}:${Math.floor(s%60).toString().padStart(2,'0')}`:'—'}
  async function loadTrackThumb(track,img){
    try{const r=await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(track.search)}&entity=song&limit=3`);if(!r.ok)return;const d=await r.json();const m=d.results?.[0];if(m?.artworkUrl100)img.src=m.artworkUrl100.replace('100x100','300x300')}catch(_){}
  }
  function syncMusicApp(){
    if(!musicApp)return;const p=window.PortOSMusic;if(!p)return;
    const track=p.currentTrack;const play=musicApp.querySelector('[data-player="play"]');const cover=musicApp.querySelector('.now-cover');const title=musicApp.querySelector('.now-title');const artist=musicApp.querySelector('.now-artist');const heart=musicApp.querySelector('[data-player="favorite"]');
    play.textContent=p.audio?.paused?'▶':'❚❚';title.textContent=track?.title||'PortOS Music';artist.textContent=track?`${track.artist} • PortOS Music`:'Ready to play';
    heart.textContent=track&&getFavorites().includes(track.title)?'♥':'♡';musicApp.classList.toggle('playing',!!p.audio&&!p.audio.paused);
    const liveCover=document.querySelector('.album-cover');if(liveCover?.src)cover.src=liveCover.src;
    const fill=musicApp.querySelector('.song-progress-fill');const currentTime=musicApp.querySelector('.song-times span:first-child');const durationTime=musicApp.querySelector('.song-times span:last-child');
    if(fill&&p.audio){const ratio=p.audio.duration?p.audio.currentTime/p.audio.duration:0;fill.style.width=`${Math.max(0,Math.min(100,ratio*100))}%`;if(currentTime)currentTime.textContent=formatDuration(p.audio.currentTime);if(durationTime)durationTime.textContent=formatDuration(p.audio.duration)}
  }

  if(music&&musicIcon){
    musicIcon.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();openMusicApp()});
    const playButton=music.querySelector('.music-button.play');
    playButton?.addEventListener('click',async event=>{event.preventDefault();event.stopImmediatePropagation();const player=window.PortOSMusic;if(!player?.audio)return;try{if(player.audio.paused)await player.start?.();else player.audio.pause();syncMusicApp()}catch(_){}},true);
  }
  document.addEventListener('play',syncMusicApp,true);document.addEventListener('pause',syncMusicApp,true);document.addEventListener('timeupdate',syncMusicApp,true);
})();