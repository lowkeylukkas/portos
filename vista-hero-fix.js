/* PortOS Vista hero reliability fix — keeps the glossy app banner visible even when app windows are created after the main shell script. */
(() => {
  const ICONS = {
    'MAPEH': 'MAPEH.png', 'TLE': 'TLE.png', 'Values Ed.': 'Values Ed..png', 'English': 'English.png',
    'Araling Panlipunan': 'Araling Panlipunan.png', 'Science': 'Science.png', 'Filipino': 'Filipino.png',
    'Mathematics': 'Mathematics.png', 'About Me': 'Blue Glass Profile Card with Star.png', 'Music': 'Music.png',
    'My Galleries': 'galleries.png', 'Integration': 'integration.png', 'Reflection': 'reflection.png',
    'Credits & Sources': 'credits.png', 'Customize': 'Blue Glass Profile Card with Star.png',
    'Files': 'credits.png', 'Help': 'reflection.png'
  };
  const DESC = {
    'MAPEH':'Music, Arts, Physical Education, and Health portfolio work.', 'TLE':'Technology and Livelihood Education projects and activities.',
    'Values Ed.':'Values Education reflections, activities, and learning materials.', 'English':'English lessons, written work, and creative activities.',
    'Araling Panlipunan':'Araling Panlipunan projects, research, and activities.', 'Science':'Science lessons, investigations, experiments, and projects.',
    'Filipino':'Filipino language, literature, and written activities.', 'Mathematics':'Mathematics lessons, problem solving, and activities.',
    'About Me':'A personal introduction to the creator of this digital portfolio.', 'Music':'PortOS music player and audio library.',
    'My Galleries':'A gallery space for projects, artwork, photographs, and creations.', 'Integration':'Integrated activities connecting ideas across different subjects.',
    'Reflection':'Personal reflections and learning takeaways.', 'Credits & Sources':'References, sources, and portfolio credits.',
    'Customize':'PortOS appearance and personalization options.', 'Files':'Portfolio files and supporting materials.', 'Help':'PortOS help and guidance.'
  };

  if (!document.getElementById('portos-vista-hero-reliability-style')) {
    const s = document.createElement('style'); s.id = 'portos-vista-hero-reliability-style';
    s.textContent = `
      .portos-vista-hero{display:flex!important;visibility:visible!important;opacity:1!important;position:relative!important;z-index:2!important;min-height:178px!important;box-sizing:border-box!important;align-items:center!important;padding:20px 30px!important;overflow:hidden!important;color:#fff!important;background:linear-gradient(135deg,#07577f 0%,#078fb4 32%,#08c4a2 66%,#51e719 100%)!important;border-bottom:1px solid rgba(255,255,255,.94)!important;box-shadow:inset 0 2px 7px rgba(255,255,255,.82),inset 0 -18px 32px rgba(0,68,93,.18),0 2px 8px rgba(0,57,90,.22)!important}
      .portos-vista-hero:before{content:"";position:absolute;inset:-30% -8%;background:radial-gradient(circle at 12% 74%,rgba(255,255,255,.98) 0 1px,transparent 3px),radial-gradient(circle at 68% 45%,rgba(255,255,255,.95) 0 1px,transparent 3px),radial-gradient(circle at 82% 23%,rgba(255,255,255,.85) 0 1px,transparent 3px),linear-gradient(153deg,transparent 35%,rgba(255,255,255,.22) 46%,transparent 53%);transform:rotate(-4deg);pointer-events:none}
      .portos-vista-hero-icon{position:relative!important;z-index:2!important;width:142px!important;height:142px!important;flex:0 0 142px!important;object-fit:contain!important;filter:drop-shadow(0 7px 7px rgba(0,38,66,.35)) drop-shadow(0 0 8px rgba(255,255,255,.5))!important}
      .portos-vista-hero-copy{position:relative!important;z-index:2!important;margin-left:24px!important;min-width:0!important;text-shadow:0 2px 4px rgba(0,49,73,.68)!important}
      .portos-vista-hero-title{margin:0 0 5px!important;font:300 42px/1.04 'Segoe UI',Tahoma,Arial,sans-serif!important;color:#fff!important;letter-spacing:-1px!important;text-shadow:0 2px 5px rgba(0,48,72,.65)!important}
      .portos-vista-hero-desc{margin:0!important;font:italic 15px/1.4 'Segoe UI',Tahoma,Arial,sans-serif!important;color:#fff!important;text-shadow:0 1px 3px rgba(0,47,70,.7)!important}
      .portos-vista-details{position:absolute!important;z-index:4!important;right:24px!important;top:62px!important;display:flex!important;align-items:center!important;gap:7px!important;color:#fff!important;font:16px 'Segoe UI',Tahoma,Arial,sans-serif!important;white-space:nowrap!important;text-shadow:0 2px 4px rgba(0,45,65,.72)!important}
      .portos-vista-details-arrow{font-size:29px!important;color:#65ff58!important;text-shadow:0 0 8px rgba(255,255,255,.8),0 2px 3px rgba(0,67,40,.72)!important}
      @media(max-width:760px){.portos-vista-hero{padding:18px!important}.portos-vista-hero-icon{width:105px!important;height:105px!important;flex-basis:105px!important}.portos-vista-hero-title{font-size:32px!important}.portos-vista-details{right:14px!important;top:auto!important;bottom:13px!important;font-size:12px!important}}
      @media(max-width:500px){.portos-vista-hero-icon{width:78px!important;height:78px!important;flex-basis:78px!important}.portos-vista-hero-copy{margin-left:12px!important}.portos-vista-hero-title{font-size:26px!important}.portos-vista-hero-desc{font-size:11px!important}}
    `;
    document.head.appendChild(s);
  }

  function repair(win) {
    if (!win || win.dataset.vistaHeroFixed === 'true') return;
    const title = win.querySelector('.portos-app-title')?.textContent?.trim();
    if (!title || !ICONS[title]) return;
    const body = win.querySelector('.portos-app-body');
    if (!body || body.querySelector('.portos-vista-hero')) { if (body) win.dataset.vistaHeroFixed='true'; return; }

    const hero = document.createElement('div');
    hero.className = 'portos-vista-hero';
    hero.innerHTML = `<img class="portos-vista-hero-icon" src="${ICONS[title]}" alt=""><div class="portos-vista-hero-copy"><h1 class="portos-vista-hero-title">${title}</h1><p class="portos-vista-hero-desc">${DESC[title]}</p></div><div class="portos-vista-details"><span class="portos-vista-details-arrow">➜</span><span>Show more details</span></div>`;
    body.insertBefore(hero, body.firstChild);
    win.dataset.vistaHeroFixed='true';
  }

  function scan(){ document.querySelectorAll('.portos-app-window').forEach(repair); }
  scan();
  new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});
  window.setInterval(scan,800);
})();
