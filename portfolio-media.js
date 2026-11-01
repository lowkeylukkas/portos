/* PortOS output media + subject-specific references. */
(() => {
  const MEDIA = {
    'About Me': ['869470103_1148667690839274_8702733133473048812_n (1).jpg'],
    'MAPEH': ['The-Last-Supper-Restored-Da-Vinci_32x16.jpg'],
    'Values Ed.': [
      '870242341_1637070778432647_2963982473672156395_n.jpg',
      '886031168_1822838208961416_1442996111883944173_n.jpg',
      '857105004_1702238008225556_8128742769797848585_n.jpg',
      '869365473_1827720451609627_3904174363110748407_n.jpg',
      '867004958_2207764076833001_2399361207422562316_n.jpg'
    ],
    'Filipino': ['image_20261101_162358.jpg', 'image_20261101_162712.jpg'],
    'Science': ['gallery_image_20261101_181008-annotated-remove-the-ones-i-circled-in-blue.jpg'],
    'TLE': ['869365473_1827720451609627_3904174363110748407_n (1).jpg']
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
    .po-output-gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}
    .po-output-gallery img{width:100%;height:260px;object-fit:contain;border-radius:8px;background:#edf7fc;box-shadow:0 2px 10px rgba(0,45,80,.18)}
    .po-output-media figcaption{margin-top:8px;text-align:center;font:12px/1.4 'Segoe UI',Arial,sans-serif;color:#41677d}
    .po-credits{margin-top:20px;padding:16px 18px;border:1px solid #c5e4f5;border-radius:12px;background:linear-gradient(180deg,#ffffff,#edf8ff);box-shadow:inset 0 1px 0 #fff,0 5px 14px rgba(35,112,155,.09)}
    .po-credits h3{margin:0 0 9px;color:#15589d;font:700 18px 'Segoe UI',Arial,sans-serif}
    .po-credits ul{margin:0;padding-left:20px;color:#31586e;font:13px/1.55 'Segoe UI',Arial,sans-serif}
    .po-credits li{margin:3px 0}
    @media (max-width:600px){.po-output-gallery{grid-template-columns:1fr 1fr}.po-output-gallery img{height:180px}}
  `;
  document.head.appendChild(style);

  function getTitle(win){ return win.querySelector('.portos-app-title')?.textContent?.trim() || ''; }

  function buildMedia(paths, title){
    const figure = document.createElement('figure');
    figure.className = 'po-output-media';
    if (paths.length === 1) {
      const img = document.createElement('img');
      img.src = paths[0];
      img.alt = `${title} portfolio output`;
      img.loading = 'lazy';
      const cap = document.createElement('figcaption');
      cap.textContent = title === 'MAPEH' ? 'The Last Supper (Il Cenacolo) — Leonardo da Vinci'
        : title === 'TLE' ? 'Signature Salad — finished product'
        : title === 'About Me' ? 'About Me — profile photo'
        : title === 'Science' ? 'Science — submitted diagram'
        : 'Portfolio output';
      figure.append(img, cap);
    } else {
      const gallery = document.createElement('div');
      gallery.className = 'po-output-gallery';
      paths.forEach((path, index) => {
        const img = document.createElement('img');
        img.src = path;
        img.alt = `${title} portfolio photo ${index + 1}`;
        img.loading = 'lazy';
        gallery.appendChild(img);
      });
      const cap = document.createElement('figcaption');
      cap.textContent = title === 'Filipino' ? 'Tanka and Haiku — submitted outputs' : 'Photo evidence — submitted outputs';
      figure.append(gallery, cap);
    }
    return figure;
  }

  function addMedia(win, title){
    const paths = MEDIA[title];
    if (!paths?.length || win.querySelector('.po-output-media')) return;

    if (title === 'Values Ed.') {
      const photoGrid = win.querySelector('.po-photo-grid');
      if (photoGrid) {
        photoGrid.replaceWith(buildMedia(paths, title));
        return;
      }
    }

    const placeholder = win.querySelector('.po-photo-placeholder');
    if (!placeholder) return;
    placeholder.replaceWith(buildMedia(paths, title));
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
