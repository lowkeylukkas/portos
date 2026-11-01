/* PortOS Science output override — Three Types of Plate Boundaries. */
(() => {
  const scienceData = {
    subtitle: 'Three Types of Plate Boundaries',
    intro: 'Cross-section diagrams and an explanation of how divergent, convergent, and transform boundaries shape Earth.',
    sections: [
      {
        title: 'Three Types of Plate Boundaries',
        type: 'photo',
        label: 'Divergent • Convergent • Transform',
        body: '<div class="po-science-diagram"><div class="po-photo-placeholder">Your plate-boundary diagram is ready to place here ✦<small>THREE TYPES OF PLATE BOUNDARIES</small></div></div>'
      },
      {
        title: 'What are tectonic plates and how do they move?',
        body: `<p>Tectonic plates are large, rigid pieces of Earth's lithosphere that float on the semi-fluid asthenosphere beneath them. These plates move very slowly, about as fast as your fingernails grow, due to convection currents in the mantle where hot molten rock rises and cooler rock sinks. The heat driving this movement comes from Earth's core and radioactive decay inside the planet. When plates move, they interact at their edges, called plate boundaries, where most geological activity occurs. This movement is continuous and is the core idea of the Theory of Plate Tectonics, which explains how continents drifted from a single supercontinent Pangaea. Understanding this movement helps us explain why earthquakes and volcanoes are not random.</p>`
      },
      {
        title: 'How do divergent, convergent, and transform boundaries differ and what happens at each?',
        body: `<p>The three plate boundaries differ in their movement and resulting landforms. At divergent boundaries, plates move apart from each other, allowing magma to rise from the mantle and create new oceanic crust through seafloor spreading, forming features like the Mid-Atlantic Ridge and rift valleys. At convergent boundaries, plates move toward each other, causing either subduction when a denser oceanic plate sinks beneath a lighter continental plate, creating trenches and volcanic arcs, or continental collision that forms huge mountain ranges like the Himalayas. At transform boundaries, plates slide horizontally past one another without creating or destroying crust, but friction builds up and is released as earthquakes along faults. Each boundary is therefore associated with distinct hazards and landforms: divergent with new crust, convergent with volcanoes and mountains, and transform with strong earthquakes.</p>`
      },
      {
        title: 'Real-world examples and importance in the Philippines',
        body: `<p>Real-world examples clearly show these processes in action. The Mid-Atlantic Ridge is a classic divergent boundary where new seafloor is formed, while the East African Rift Valley shows a continent splitting apart. The Andes Mountains and Mariana Trench were formed by the convergence and subduction of the Nazca and Pacific Plates. The San Andreas Fault in California is a famous transform boundary responsible for frequent earthquakes. For the Philippines, understanding plate tectonics is vital because the country lies within the Pacific Ring of Fire, at the convergence of the Philippine Sea Plate and the Eurasian Plate. This explains why we experience many earthquakes, volcanic eruptions like Mt. Mayon and Taal Volcano, and the formation of mountain ranges and trenches like the Philippine Trench. This knowledge is crucial for disaster preparedness, land-use planning, and saving lives through early warning systems and community education.</p>`
      },
      {
        title: 'Personal Reflection',
        body: `<p>Through creating this diagram and research, I learned that Earth's surface is not static but constantly moving and reshaping itself. At first, I found subduction and the difference between oceanic-continental convergence challenging to visualize, but drawing the cross-section helped me understand it. The most interesting concept for me was how transform boundaries cause earthquakes without volcanoes, because it explains many local fault movements. My understanding changed from thinking earthquakes just happen randomly to realizing they are predictable patterns along plate boundaries. This activity made me appreciate why scientific literacy and community preparedness are essential as a Filipino student living in a hazard-prone region.</p>`
      },
      {
        title: 'References and Credits',
        body: `<div class="po-references"><p>National Geographic Society. (2023). <em>Plate tectonics</em>. <a href="https://education.nationalgeographic.org/resource/plate-tectonics/" target="_blank" rel="noopener noreferrer">National Geographic Society</a></p><p>U.S. Geological Survey. (2024). <em>Understanding plate motions</em>. <a href="https://www.usgs.gov/" target="_blank" rel="noopener noreferrer">U.S. Geological Survey</a></p><p>Philippine Institute of Volcanology and Seismology. (2024). <em>Earthquake and volcano information</em>. <a href="https://www.phivolcs.dost.gov.ph/" target="_blank" rel="noopener noreferrer">PHIVOLCS</a></p></div>`
      }
    ]
  };

  function applyScienceOutput() {
    const portfolio = window.PortOSPortfolio;
    if (!portfolio || !portfolio.subjectData) return false;
    portfolio.subjectData.Science = scienceData;
    document.querySelectorAll('.portos-app-window').forEach((win) => {
      const title = win.querySelector('.portos-app-title')?.textContent?.trim();
      if (title === 'Science' && win.dataset.portfolioOutput === 'true') {
        portfolio.enhanceWindow(win, 'Science');
      }
    });
    return true;
  }

  const style = document.createElement('style');
  style.textContent = `
    .po-science-diagram .po-photo-placeholder{min-height:360px;background:linear-gradient(180deg,#fffdf9,#f5f0e8);border-color:#cfc6b7;color:#756a5c}
    .po-science-diagram .po-photo-placeholder small{display:block;margin-top:10px;font-size:16px;letter-spacing:1.2px;color:#756a5c}
    .po-references p{margin-bottom:12px!important}.po-references a{color:#176b99;font-weight:700}
  `;
  document.head.appendChild(style);

  if (!applyScienceOutput()) {
    const timer = setInterval(() => {
      if (applyScienceOutput()) clearInterval(timer);
    }, 50);
    setTimeout(() => clearInterval(timer), 5000);
  }
})();
