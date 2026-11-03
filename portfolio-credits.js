/* PortOS — Credits & Sources inside each subject app */
(() => {
  const credits = {
    'About Me': {
      intro: 'Original student profile, biography, and portfolio materials by Markus Henduard Llucas Osorio Evilla.',
      sources: ['Personal information and original portfolio work submitted by the student.']
    },
    'MAPEH': {
      intro: 'Artwork information and analysis prepared for the MAPEH Renaissance Art output.',
      sources: ['Leonardo da Vinci, The Last Supper (Il Cenacolo), c. 1495–1498.', 'Santa Maria delle Grazie, Milan — artwork location and historical context.']
    },
    'Values Ed.': {
      intro: 'Reflection and photo evidence based on the student’s own five-day environmental conservation activity.',
      sources: ['Student’s original five-day eco-friendly activity documentation and reflection.', 'Environmental conservation concepts used for the classroom output.']
    },
    'English': {
      intro: 'Literary analysis and quotation references for William Shakespeare’s Sonnet 18.',
      sources: ["Booth, S. (Ed.). (2000). Shakespeare's Sonnets. Yale University Press.", 'Poetry Foundation — Sonnet 18.', "Vendler, H. (1997). The Art of Shakespeare's Sonnets. Harvard University Press."]
    },
    'Filipino': {
      intro: 'Original Tanka and Haiku reflection and analysis prepared for the Filipino output.',
      sources: ['Student’s original Tanka and Haiku output.', 'Traditional Japanese Tanka and Haiku poetic forms and concepts.']
    },
    'Mathematics': {
      intro: 'Worked examples and explanations prepared for the Direct and Inverse Variations output.',
      sources: ['Student’s original mathematical solutions and reflection.', 'Standard algebraic definitions and properties of direct and inverse variation.']
    },
    'Science': {
      intro: 'Science output based on ecosystem relationships, energy flow, and conservation concepts.',
      sources: ['Student’s original ecosystem diagram and written reflection.', 'Standard biology concepts covering symbiosis, trophic levels, and ecological energy flow.']
    },
    'TLE': {
      intro: 'Original food-preparation documentation and reflection for the Greek Salad product demonstration.',
      sources: ['Student’s original Greek Salad preparation, sanitation notes, plating, and reflection.', 'Traditional Horiatiki (Greek Salad) preparation principles.']
    },
    'Araling Panlipunan': {
      intro: 'Economics output prepared around demand, supply, equilibrium, and the sectors of the economy.',
      sources: ['Student’s original economics discussion and reflection.', 'Standard Araling Panlipunan 9 concepts on demand, supply, equilibrium, and economic sectors.']
    }
  };

  function addCredits(win, title) {
    const data = credits[title];
    const wrap = win && win.querySelector('.po-wrap');
    if (!data || !wrap || wrap.querySelector('.po-credits-section')) return;
    const section = document.createElement('section');
    section.className = 'po-section po-credits-section';
    section.innerHTML = `<h3>Credits &amp; Sources</h3><p>${data.intro}</p><ul class="po-list">${data.sources.map(s => `<li>${s}</li>`).join('')}</ul>`;
    wrap.appendChild(section);
  }

  function hookOpen() {
    if (typeof window.openAppWindow !== 'function') return;
    const previous = window.openAppWindow;
    if (previous.__creditsHooked) return;
    function wrapped(title, symbol, description) {
      const result = previous.apply(this, arguments);
      setTimeout(() => {
        const windows = [...document.querySelectorAll('.portos-app-window')];
        addCredits(windows[windows.length - 1], title);
      }, 120);
      return result;
    }
    wrapped.__creditsHooked = true;
    window.openAppWindow = wrapped;
  }

  const style = document.createElement('style');
  style.textContent = `.po-credits-section{margin-top:26px;border-top:1px solid #9fcfe5}.po-credits-section ul{margin-top:10px}`;
  document.head.appendChild(style);

  hookOpen();
  new MutationObserver(hookOpen).observe(document.documentElement, { childList: true, subtree: true });
})();
