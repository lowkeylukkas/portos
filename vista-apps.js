/* PortOS shared Windows Vista / Frutiger Aero app shell. */
(() => {
  const ICONS = {
    'MAPEH': 'MAPEH.png',
    'TLE': 'TLE.png',
    'Values Ed.': 'Values Ed..png',
    'English': 'English.png',
    'Araling Panlipunan': 'Araling Panlipunan.png',
    'Science': 'Science.png',
    'Filipino': 'Filipino.png',
    'Mathematics': 'Mathematics.png',
    'About Me': 'Blue Glass Profile Card with Star.png',
    'Music': 'Music.png',
    'My Galleries': 'galleries.png',
    'Integration': 'integration.png',
    'Reflection': 'reflection.png',
    'Credits & Sources': 'credits.png',
    'Customize': 'Blue Glass Profile Card with Star.png',
    'Files': 'credits.png',
    'Help': 'reflection.png'
  };
  const DESCRIPTIONS = {
    'MAPEH': 'Music, Arts, Physical Education, and Health portfolio work.',
    'TLE': 'Technology and Livelihood Education projects and activities.',
    'Values Ed.': 'Values Education reflections, activities, and learning materials.',
    'English': 'English lessons, written work, and creative activities.',
    'Araling Panlipunan': 'Araling Panlipunan projects, research, and activities.',
    'Science': 'Science lessons, investigations, experiments, and projects.',
    'Filipino': 'Filipino language, literature, and written activities.',
    'Mathematics': 'Mathematics lessons, problem solving, and activities.',
    'About Me': 'A personal introduction to the creator of this digital portfolio.',
    'Music': 'PortOS music player and audio library.',
    'My Galleries': 'A gallery space for projects, artwork, photographs, and creations.',
    'Integration': 'Integrated activities connecting ideas across different subjects.',
    'Reflection': 'Personal reflections and learning takeaways.',
    'Credits & Sources': 'References, sources, and portfolio credits.',
    'Customize': 'PortOS appearance and personalization options.',
    'Files': 'Portfolio files and supporting materials.',
    'Help': 'PortOS help and guidance.'
  };

  const style = document.createElement('style');
  style.id = 'portos-vista-app-shell-final';
  style.textContent = `
    .portos-app-window{overflow:hidden!important;border:1px solid rgba(255,255,255,.92)!important;border-radius:12px 12px 7px 7px!important;background:#eaf7ff!important;box-shadow:0 18px 45px rgba(0,35,75,.46),0 0 18px rgba(115,226,255,.28),inset 0 1px 0 #fff!important}
    .portos-app-titlebar{height:46px!important;min-height:46px!important;padding:0 7px 0 10px!important;border-radius:11px 11px 0 0!important;background:linear-gradient(180deg,rgba(235,255,255,.98) 0%,rgba(122,218,246,.98) 20%,rgba(35,151,213,.98) 58%,rgba(4,82,153,.98) 100%)!important;border-bottom:1px solid rgba(255,255,255,.9)!important;box-shadow:inset 0 2px 3px rgba(255,255,255,.92),inset 0 -2px 4px rgba(0,53,104,.28)!important;color:#fff!important;text-shadow:0 1px 3px rgba(0,43,83,.9)!important}
    .portos-app-titlebar:after{content:"";position:absolute;left:0;right:0;top:1px;height:10px;border-radius:11px 11px 0 0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.48),transparent);pointer-events:none}
    .portos-app-title{font-size:14px!important;font-weight:700!important}
    .portos-app-icon{width:31px!important;height:31px!important;border-radius:7px!important;background-size:contain!important;background-position:center!important;background-repeat:no-repeat!important;box-shadow:inset 0 1px 2px rgba(255,255,255,.7),0 1px 3px rgba(0,43,80,.35)!important}
    .portos-app-body{padding:0!important;background:#f7fbff!important;color:#17344c!important;overflow:auto!important}
    .portos-vista-hero{position:relative;min-height:178px;display:flex;align-items:center;padding:20px 30px;box-sizing:border-box;overflow:hidden;color:#fff;background:linear-gradient(135deg,#07577f 0%,#078fb4 32%,#08c4a2 66%,#51e719 100%);border-bottom:1px solid rgba(255,255,255,.94);box-shadow:inset 0 2px 7px rgba(255,255,255,.82),inset 0 -18px 32px rgba(0,68,93,.18),0 2px 8px rgba(0,57,90,.22)}
    .portos-vista-hero:before{content:"";position:absolute;inset:-30% -8%;background:radial-gradient(circle at 12% 74%,rgba(255,255,255,.98) 0 1px,transparent 3px),radial-gradient(circle at 68% 45%,rgba(255,255,255,.95) 0 1px,transparent 3px),radial-gradient(circle at 82% 23%,rgba(255,255,255,.85) 0 1px,transparent 3px),linear-gradient(153deg,transparent 35%,rgba(255,255,255,.22) 46%,transparent 53%);transform:rotate(-4deg);pointer-events:none}
    .portos-vista-hero:after{content:"";position:absolute;left:4%;right:3%;bottom:8px;height:4px;border-radius:50%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.86),rgba(255,255,255,.26),transparent);filter:blur(.4px);pointer-events:none}
    .portos-vista-hero-icon{position:relative;z-index:2;width:142px;height:142px;flex:0 0 142px;object-fit:contain;object-position:center;filter:drop-shadow(0 7px 7px rgba(0,38,66,.35)) drop-shadow(0 0 8px rgba(255,255,255,.5))}
    .portos-vista-hero-copy{position:relative;z-index:2;min-width:0;margin-left:24px;text-shadow:0 2px 4px rgba(0,49,73,.68)}
    .portos-vista-hero-title{margin:0 0 5px!important;font-family:'Segoe UI',Tahoma,Arial,sans-serif!important;font-size:42px!important;font-weight:300!important;line-height:1.04!important;letter-spacing:-1px!important;color:#fff!important;text-shadow:0 2px 5px rgba(0,48,72,.65)!important}
    .portos-vista-hero-desc{margin:0!important;max-width:650px;font-family:'Segoe UI',Tahoma,Arial,sans-serif!important;font-size:15px!important;font-style:italic!important;line-height:1.4!important;color:#fff!important;text-shadow:0 1px 3px rgba(0,47,70,.7)!important}
    .portos-vista-details{position:absolute;z-index:3;right:24px;top:62px;display:flex;align-items:center;gap:7px;color:#fff;font:16px 'Segoe UI',Tahoma,Arial,sans-serif;text-shadow:0 2px 4px rgba(0,45,65,.72);white-space:nowrap}
    .portos-vista-details-arrow{font-size:29px;font-weight:300;line-height:1;color:#65ff58;text-shadow:0 0 8px rgba(255,255,255,.8),0 2px 3px rgba(0,67,40,.72)}
    .portos-vista-content{position:relative;padding:20px 22px 28px;background:linear-gradient(180deg,#fff 0%,#f8fcff 62%,#e9f6fd 100%);min-height:220px;color:#17344c}
    .portos-vista-content:before{content:"";position:absolute;left:0;right:0;top:0;height:1px;background:rgba(80,154,208,.45)}
    .portos-vista-content>h2{margin:0 0 5px!important;color:#14539b!important;font:700 24px/1.2 'Segoe UI',Tahoma,Arial,sans-serif!important;text-shadow:0 1px 0 #fff!important}
    .portos-vista-content>p{margin:0 0 14px!important;color:#274b64!important;font:14px/1.45 'Segoe UI',Tahoma,Arial,sans-serif!important}
    .portos-vista-content .portos-app-hint{margin:14px 0 0!important;border-radius:10px!important;background:linear-gradient(180deg,#fff,#edf8ff)!important;border:1px solid #c8e8f8!important;color:#285473!important;box-shadow:inset 0 1px 2px #fff,0 3px 10px rgba(36,117,165,.1)!important}
    @media(max-width:760px){.portos-vista-hero{padding-left:18px;padding-right:18px}.portos-vista-hero-icon{width:105px;height:105px;flex-basis:105px}.portos-vista-hero-title{font-size:32px!important}.portos-vista-details{right:14px;top:auto;bottom:13px;font-size:12px}.portos-vista-content{padding:16px}}
    @media(max-width:500px){.portos-vista-hero-icon{width:78px;height:78px;flex-basis:78px}.portos-vista-hero-copy{margin-left:12px}.portos-vista-hero-title{font-size:26px!important}.portos-vista-hero-desc{font-size:11px!important}}
  `;
  document.head.appendChild(style);

  function buildShell(win) {
    if (!win || win.dataset.vistaShell === 'true') return;
    const title = win.querySelector('.portos-app-title')?.textContent?.trim();
    if (!ICONS[title]) return;
    const body = win.querySelector('.portos-app-body');
    if (!body) return;

    const old = document.createElement('div');
    old.innerHTML = body.innerHTML;
    const existingContent = old.querySelector('.portos-about-body') || old;

    const hero = document.createElement('div');
    hero.className = 'portos-vista-hero';
    hero.innerHTML = `
      <img class="portos-vista-hero-icon" src="${ICONS[title]}" alt="">
      <div class="portos-vista-hero-copy">
        <h1 class="portos-vista-hero-title">${title}</h1>
        <p class="portos-vista-hero-desc">${DESCRIPTIONS[title]}</p>
      </div>
      <div class="portos-vista-details"><span class="portos-vista-details-arrow">➜</span><span>Show more details</span></div>`;

    const content = document.createElement('div');
    content.className = 'portos-vista-content';
    content.append(...Array.from(existingContent.childNodes));

    body.replaceChildren(hero, content);
    win.dataset.vistaShell = 'true';
  }

  function scan() {
    document.querySelectorAll('.portos-app-window').forEach(buildShell);
  }
  scan();
  new MutationObserver(scan).observe(document.body, {childList:true, subtree:true});
})();
