/* PortOS output media + subject-specific references. */
(() => {
  const MEDIA = {
    'MAPEH': 'assets/outputs/mapeh-last-supper.jpg',
    'TLE': 'assets/outputs/tle-signature-salad.jpg'
  };

  const CREDITS = {
    'MAPEH': [
      'Wikimedia Commons — high-resolution image of The Last Supper.',
      'New International Version / NABRE — John 13:21, betrayal narrative context.',
      'Google — background research and source discovery.',
      'Mental Floss — “15 Facts About Leonardo Da Vinci’s The Last Supper”.',
      'Ars Electronica — “Deep Space LIVE: The Last Supper”.',
      'Walks of Italy — “8 Fascinating Facts You Didn’t Know About Da Vinci’s Last Supper”.',
      'Kemp, M. (2006). Leonardo da Vinci: The marvelous works of nature and man. Oxford University Press.',
      'Vasari, G. (1998). The lives of the artists. Oxford World’s Classics.'
    ],
    'English': [
      'Booth, S. (Ed.). (2000). Shakespeare’s sonnets. Yale University Press.',
      'Poetry Foundation. (n.d.). Sonnet 18: “Shall I compare thee to a summer’s day?”.',
      'Vendler, H. (1997). The art of Shakespeare’s sonnets. Harvard University Press.'
    ],
    'Values Ed.': ['No separate source list was included in the submitted output; the portfolio keeps the original project text and photo evidence.'],
    'Filipino': ['No separate source list was included in the submitted output.'],
    'Mathematics': ['No separate source list was included in the submitted output.'],
    'Science': ['No separate source list was included in the submitted output.'],
    'TLE': ['No separate source list was included in the submitted output; finished-product evidence is shown as the student’s own output.'],
    'Araling Panlipunan': ['No separate source list was included in the submitted output.']
  };

  const style = document.createElement('style');
  style.id = 'portos-output-media-style';
  style.textContent = `
    .po-output-media{margin:8px 0 18px;padding:12px;border:1px solid #c7e6f5;border-radius:12px;background:linear-gradient(180deg,#fff,#eef9ff);box-shadow:inset 0 1px 0 #fff,0 5px 14px rgba(35,112,155,.10)}
    .po-output-media img{display:block;width:100%;max-height:520px;object-fit:contain;border-radius:8px;background:#edf7fc;box-shadow:0 2px 10px rgba(0,45,80,.18)}
    .po-output-media figcaption{margin-top:8px;text-align:center;font:12px/1.4 'Segoe UI',Arial,sans-serif;color:#41677d}
    .po-credits{margin-top:20px;padding:16px 18px;border:1px solid #c5e4f5;border-radius:12px;background:linear-gradient(180deg,#ffffff,#edf8ff);box-shadow:inset 0 1px 0 #fff,0 5px 14px rgba(35,112,155,.09)}
    .po-credits h3{margin:0 0 9px;color:#15589d;font:700 18px 'Segoe UI',Arial,sans-serif}
    .po-credits ul{margin:0;padding-left:20px;color:#31586e;font:13px/1.55 'Segoe UI',Arial,sans-serif}
    .po-credits li{margin:3px 0}
  `;
  document.head.appendChild(style);

  function getTitle(win){ return win.querySelector('.portos-app-title')?.textContent?.trim() || ''; }

  function addMedia(win, title){
    const path = MEDIA[title];
    if (!path || win.querySelector('.po-output-media')) return;
    const placeholder = win.querySelector('.po-photo-placeholder');
    if (!placeholder) return;
    const figure = document.createElement('figure');
    figure.className = 'po-output-media';
    const img = document.createElement('img');
    img.src = path;
    img.alt = title === 'MAPEH' ? 'Leonardo da Vinci’s The Last Supper' : 'Finished Greek salad output';
    img.loading = 'lazy';
    const cap = document.createElement('figcaption');
    cap.textContent = title === 'MAPEH' ? 'The Last Supper (Il Cenacolo) — Leonardo da Vinci' : 'Signature Salad — finished product';
    figure.append(img, cap);
    placeholder.replaceWith(figure);
  }

  function addCredits(win, title){
    if (win.querySelector('.po-credits') || !CREDITS[title]) return;
    const content = win.querySelector('.portos-vista-content');
    if (!content) return;
    const box = document.createElement('section');
    box.className = 'po-credits';
    box.innerHTML = `<h3>References &amp; Credits</h3><ul>${CREDITS[title].map(x => `<li>${x}</li>`).join('')}</ul>`;
    content.appendChild(box);
  }

  function scan(){
    document.querySelectorAll('.portos-app-window').forEach(win => {
      const title = getTitle(win);
      if (!title) return;
      addMedia(win,title);
      addCredits(win,title);
    });
  }
  scan();
  new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});
})();
