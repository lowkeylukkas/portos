/* PortOS portfolio outputs — structured subject content from the submitted PBA Outputs document. */
(() => {
  const subjectData = {
    'About Me': {
      subtitle: 'Student Profile & Personal Introduction',
      intro: 'A personal introduction to the creator of this digital portfolio.',
      sections: [
        { title: 'Profile', type: 'profile', body: `<div class="po-profile-grid"><div><span>Name</span><strong>Markus Henduard Llucas Osorio Evilla</strong></div><div><span>Grade & Section</span><strong>Grade 9 – Synergy</strong></div><div><span>Age</span><strong>14 years old</strong></div><div><span>Birthday</span><strong>January 23, 2012</strong></div></div>` },
        { title: 'Profile / Bio', body: `<p>Hi! I’m Markus Henduard Llucas Osorio Evilla, a 14-year-old Grade 9 student from section Synergy. I’m naturally curious, a bit quirky, and I love bringing humor and a lighthearted vibe into everything I do—even when managing academic deadlines.</p><p>Outside of class, I'm passionate about web design and coding, often spending time crafting custom scripts and sleek dark-themed web interfaces with expressive typography. I'm also a dedicated gamer who enjoys Genshin Impact, Honkai Impact 3rd, Honkai: Star Rail, Wuthering Waves, Zenless Zone Zero, and Mobile Legends: Bang Bang (mastering strategic hero counter-picks like Novaria, Eudora, and Lunox) and also managing game servers.</p><p>Whether I'm balancing multi-subject performance tasks, solving math variations step-by-step on paper, or practicing everyday eco-friendly conservation at home, I approach my learning journey with creativity, focus, and a unique perspective.</p>` },
        { title: 'Portfolio Photo', type: 'photo', label: 'Add your About Me / profile photo here', body: '<div class="po-photo-placeholder">Your photo will go here ✦</div>' }
      ]
    },
    'MAPEH': {
      subtitle: 'Renaissance Art Showcase',
      intro: 'The Last Supper (Il Cenacolo) — Leonardo da Vinci',
      sections: [
        { title: 'Artwork Details', body: `<div class="po-detail-grid"><div><span>Title</span><strong>The Last Supper (Il Cenacolo)</strong></div><div><span>Artist</span><strong>Leonardo da Vinci</strong></div><div><span>Date</span><strong>c. 1495–1498</strong></div><div><span>Location</span><strong>Refectory of Santa Maria delle Grazie, Milan, Italy</strong></div><div><span>Medium / Dimensions</span><strong>Tempera and oil on gesso, pitch, and mastic; 460 cm × 880 cm</strong></div></div>` },
        { title: 'Artwork', type: 'photo', label: 'Add your Renaissance Art output/photo here', body: '<div class="po-photo-placeholder">Renaissance artwork photo will go here ✦</div>' },
        { title: 'Why I Chose It', body: `<p>I selected Leonardo da Vinci’s <em>The Last Supper</em> because it immortalizes one of the most dramatically charged, emotionally complex, and psychologically profound narratives in sacred scripture. Leonardo captures the immediate emotional shock of Christ’s announcement of betrayal through disbelief, grief, outrage, suspicion, and confusion across the table.</p><p>On a personal level, this monumental work resonates deeply because it bridges transcendental theological doctrine with raw human vulnerability. The twelve distinct reactions invite the observer to examine moral conscience, empathy, and personal integrity.</p>` },
        { title: 'What Makes It Special', body: `<p><em>The Last Supper</em> stands as a milestone of High Renaissance art because of its revolutionary composition, narrative psychology, and experimental technique. Leonardo used tempera and oil on a dry layered base rather than traditional buon fresco, allowing delicate tonal transitions but contributing to the work’s conservation challenges.</p><p>The one-point perspective is especially important: architectural lines converge at a vanishing point behind Christ, making Him both the spiritual focal point and the geometric center. Judas is integrated among the apostles and subtly distinguished through shadow, his purse, and the tipped salt cellar. The apostles are also arranged in four balanced groups of three.</p>` },
        { title: 'What I Learned & How It Connects', body: `<p>Studying this masterwork demonstrates how the High Renaissance combined aesthetic beauty, empirical science, natural anatomy, and mathematical precision. Leonardo showed that artistic creativity and geometric logic can work together to make spiritual narratives tangible and emotionally resonant.</p><p>The work also taught me about the balance between creative innovation and material permanence. Leonardo’s experimentation created conservation challenges, yet his psychological realism permanently redefined narrative painting.</p>` }
      ]
    },
    'Values Ed.': {
      subtitle: 'Bawas Konsumo, Alaga sa Kalikasan!',
      intro: 'Values Education 9 — responsible resource use and everyday environmental stewardship.',
      sections: [
        { title: 'Maikling Pagninilay', body: `<p>Ang labis na pagkonsumo ng likas na yaman nang walang kaakibat na pagtitipid ay nagdudulot ng malawakang krisis sa kapaligiran at naglalagay sa panganib sa kinabukasan ng susunod na salinlahi. Ang simpleng pagbawas sa ating pangangailangan at pagpigil sa pag-aaksaya sa loob ng ating sariling mga tahanan at paaralan ay isang epektibong paraan upang maibsan ang pabigat sa ating kalikasan.</p><p>Sa pamamagitan ng mulat at disiplinadong pagkilos, naisasalin natin ang pagmamahal sa kalikasan mula sa mga salita tungo sa kongkretong aksyon na nagbibigay-daan sa isang maunlad at napapanatiling komunidad.</p>` },
        { title: 'Limang Araw ng Aking Eco-Friendly na Gawain', body: `<ol class="po-list"><li><strong>Araw 1 — Pagse-segregate ng Basura:</strong> Paghihiwalay ng biodegradable at non-biodegradable waste at malinaw na pagmamarka sa mga basurahan.</li><li><strong>Araw 2 — Pagpatay ng Ilaw Kapag Maliwanag ang Araw:</strong> Pagsulit sa natural na liwanag at pagpatay ng lamps kapag sapat ang liwanag mula sa labas.</li><li><strong>Araw 3 — Pagpatay ng Gripo at Pag-iwas sa Tulo:</strong> Maingat na pagsasara ng gripo at pagsuri sa mga tubo upang maiwasan ang patuloy na pag-aaksaya ng tubig.</li><li><strong>Araw 4 — Paggamit ng Eco-bag:</strong> Pagdadala ng reusable eco-bag upang mabawasan ang single-use plastics.</li><li><strong>Araw 5 — Paggamit ng Lumang Notebooks/Scratch Paper:</strong> Paggamit ng natitirang pahina para sa math scratch work, drafts, at reviewers bago bumili ng bagong papel.</li></ol>` },
        { title: 'Aking Mga Natutuhan', body: `<p>Sa pagtatapos ng limang araw, napatunayan ko na ang makabuluhang pangangalaga sa kalikasan ay nagsisimula sa payak ngunit disiplinadong mga gawi. Natutuhan ko na sa pamamagitan ng maayos na pagse-segregate ng basura, pagsulit sa natural na liwanag, pagsugpo sa tagas ng tubig, paggamit ng eco-bag, at pagtitipid sa bawat pahina ng lumang kuwaderno at scratch paper, malaki ang ating maiaambag sa pagbawas ng konsumo at pagpigil sa pagkasira ng kalikasan.</p>` },
        { title: 'Pangako Ko sa Kalikasan', body: `<ol class="po-list"><li>Magsagawa ng maayos na pagse-segregate ng basura at gamitin ang lumang kuwaderno o scratch paper hanggang sa huling pahina.</li><li>Magtipid sa kuryente sa pamamagitan ng pagpatay ng ilaw at pagsulit sa natural na liwanag, at tiyaking nakasara nang maayos ang mga gripo.</li><li>Tanggihan ang single-use plastics sa pamamagitan ng palagiang paggamit ng reusable eco-bags.</li></ol>` },
        { title: 'Photo Evidence', type: 'photo-grid', body: '<div class="po-photo-grid"><div class="po-photo-placeholder">Day 1 photo</div><div class="po-photo-placeholder">Day 2 photo</div><div class="po-photo-placeholder">Day 3 photo</div><div class="po-photo-placeholder">Day 4 photo</div><div class="po-photo-placeholder">Day 5 photo</div></div>' }
      ]
    },
    'English': {
      subtitle: 'Beyond the Lines: Analyzing a Shakespearean Sonnet',
      intro: 'Sonnet 18 (“Shall I compare thee to a summer’s day?”) by William Shakespeare',
      sections: [
        { title: 'The Sonnet', body: `<div class="po-quote">Shall I compare thee to a summer’s day?<br>Thou art more lovely and more temperate:<br>Rough winds do shake the darling buds of May,<br>And summer’s lease hath all too short a date:<br><br>Sometime too hot the eye of heaven shines,<br>And often is his gold complexion dimm'd;<br>And every fair from fair sometime declines,<br>By chance or nature’s changing course untrimm'd;<br><br>But thy eternal summer shall not fade<br>Nor lose possession of that fair thou ow’st;<br>Nor shall Death brag thou wander’st in his shade,<br>When in eternal lines to time thou grow’st:<br><br>So long as men can breathe or eyes can see,<br>So long lives this, and this gives life to thee.</div>` },
        { title: 'Analytical Essay', body: `<p>In William Shakespeare’s celebrated <em>Sonnet 18</em>, the speaker explores mortality, youth, and the relentless passage of time. The Shakespearean sonnet follows three rhyming quatrains and a climactic heroic couplet in iambic pentameter with an ABAB CDCD EFEF GG rhyme scheme.</p><p>The central idea is that physical beauty is temporary and vulnerable to decay, while poetry can preserve human beauty and virtue. Shakespeare contrasts the impermanence of nature with the enduring permanence of the written word, turning art into a philosophical defiance against oblivion.</p><p>The opening quatrain qualifies the comparison to summer by showing nature’s instability. The second quatrain uses celestial metaphor and personification to expose the sun’s imperfections. The volta at line 9 shifts from natural decay to artistic transcendence, while the final couplet argues that the sonnet itself can keep the beloved alive as long as people can read and remember it.</p>` },
        { title: 'References', body: `<p>Booth, S. (Ed.). (2000). <em>Shakespeare's sonnets</em>. Yale University Press.</p><p>Poetry Foundation. <em>Sonnet 18: “Shall I compare thee to a summer's day?”</em></p><p>Vendler, H. (1997). <em>The art of Shakespeare's sonnets</em>. Harvard University Press.</p>` }
      ]
    },
    'Filipino': {
      subtitle: 'Panitikan mula sa Hapon: Tanka at Haiku',
      intro: 'Pagsusuri sa ugnayan ng kalikasan at panloob na damdamin sa pamamagitan ng tradisyunal na anyong tula.',
      sections: [
        { title: 'Maikling Pagninilay', body: `<p>Ang aking nilikhang Tanka at Haiku ay sumusunod sa mahigpit at tradisyunal na estruktura ng sinaunang tulang Hapon upang suriin ang ugnayan ng kalikasan at ng panloob na damdamin ng tao. Sa Tanka, ginamit ko ang padron na 5-7-5-7-7 upang maipahayag ang pangungulila sa pagkawala ng init ng pag-ibig kasabay ng pagdating ng malamig na simoy ng hangin.</p><p>Ang Haiku naman ay gumamit ng mas maikling sukat na 5-7-5 upang ihayag ang isang matalas at buhay na imahe ng kalikasan—ang pagbagsak ng patak ng ulan sa dahon. Ipinapakita ng dalawang anyo na ang limitadong bilang ng pantig ay maaaring maging daan sa mas mabisa at siksik na pagpapahayag.</p>` },
        { title: 'Hamon sa Pagsulat', body: `<p>Ang pinakamalaking hamon ay ang maselang pagpili ng mga angkop na salitang Filipino na eksaktong tutugma sa hinihinging bilang ng pantig nang hindi nababawasan ang lalim at talab ng talinghaga. Kinailangan kong maging matiyaga sa pagpapalit-palit ng mga kasingkahulugan upang mapanatili ang tamang sukat.</p>` },
        { title: 'Mga Natutuhan', body: `<p>Natutuhan kong yakapin ang mga konseptong estetiko ng kulturang Hapon tulad ng <em>wabi-sabi</em>, ang pagpapahalaga sa kagandahan ng pagiging payak at hindi perpekto, at <em>mono no aware</em>, ang banayad na kamalayan sa pagiging lumilipas ng lahat ng bagay. Lalo rin nitong pinatibay ang pagiging mapagmasid sa simpleng ganda ng kapaligiran at pinalawak ang aking pagpapahalaga sa panitikan bilang tulay sa magkakaibang kultura at panahon.</p>` },
        { title: 'Output Photo', type: 'photo', label: 'Add your Tanka & Haiku output photo here', body: '<div class="po-photo-placeholder">Tanka & Haiku output will go here ✦</div>' }
      ]
    },
    'Mathematics': {
      subtitle: 'The Math Behind Direct & Inverse Variations',
      intro: 'Two worked applications showing how variation models describe real-world relationships.',
      sections: [
        { title: 'Problem & Solution 1 — Direct Variation', body: `<p><strong>Scenario:</strong> Automobile travel along a highway at constant velocity, where distance depends directly on travel time.</p><p><strong>Given:</strong> 120 km in 2 hours.</p><div class="po-formula">d = kt &nbsp; → &nbsp; k = d / t = 120 / 2 = 60 km/h</div><p><strong>Model:</strong> d = 60t</p><p><strong>At 5 hours:</strong> d = 60(5) = <strong>300 km</strong></p><table class="po-table"><tr><th>Time t (h)</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr><tr><th>Distance d (km)</th><td>60</td><td>120</td><td>180</td><td>240</td><td>300</td></tr></table>` },
        { title: 'Problem & Solution 2 — Inverse Variation', body: `<p><strong>Scenario:</strong> Travel time is inversely related to operating speed for a fixed route.</p><p><strong>Given:</strong> 4 hours at 60 km/h.</p><div class="po-formula">t = k / s &nbsp; → &nbsp; k = st = (60)(4) = 240 km</div><p><strong>Model:</strong> t = 240 / s</p><p><strong>At 80 km/h:</strong> t = 240 / 80 = <strong>3 hours</strong>, saving exactly 1 hour.</p><table class="po-table"><tr><th>Speed s (km/h)</th><th>40</th><th>60</th><th>80</th><th>120</th></tr><tr><th>Time t (h)</th><td>6.0</td><td>4.0</td><td>3.0</td><td>2.0</td></tr></table>` },
        { title: 'Reflection', body: `<p>Studying direct and inverse variations demonstrates how abstract algebraic functions serve as predictive models for everyday mechanical and logistical challenges. Direct variation shows how output quantities scale predictably with input efforts, while inverse variation highlights trade-offs such as balancing speed against travel time.</p><p>Constructing rigorous equations and analyzing numerical tables highlights the importance of mathematical precision in strategic decision-making and real-world problem solving.</p>` }
      ]
    },
    'Science': {
      subtitle: 'Ecosystem Dynamics & Conservation',
      intro: 'A study of symbiotic relationships and the directional flow of matter and energy through ecosystems.',
      sections: [
        { title: 'Summary of Output', body: `<p>This investigation examines five critical symbiotic relationships—<strong>mutualism, predation, competition, parasitism, and commensalism</strong>—and models the directional flow of matter and energy across ecological trophic pyramids.</p><p>Mutualism provides reciprocal benefits; predation and parasitism are asymmetric interactions; competition occurs when organisms vie for limited niches, nutrients, water, or territory; and commensalism benefits one organism without significantly affecting the other.</p><p>Energy flow follows the <strong>10% ecological efficiency rule</strong>, where most energy is dissipated at each successive trophic tier from producers to apex carnivores. This underscores the importance of preserving intact food webs.</p>` },
        { title: 'Written Reflection', body: `<p>Conducting an in-depth ecological investigation reveals the profound degree of biological interdependence that governs natural habitats and sustains life. When human activities disrupt a biological niche or overexploit a species, the consequences can trigger trophic cascades that destabilize regional food webs.</p><p>Understanding symbiotic dynamics demonstrates that biodiversity is not merely an aesthetic asset, but a vital life-support mechanism that regulates climate, water cycles, and soil fertility. This knowledge instills ethical accountability to advocate for sustainable community conservation.</p>` },
        { title: 'Output / Diagram', type: 'photo', label: 'Add your ecosystem diagram / output photo here', body: '<div class="po-photo-placeholder">Science output will go here ✦</div>' }
      ]
    },
    'TLE': {
      subtitle: 'Product Demonstration: My Signature Salad',
      intro: 'Traditional Greek Salad (Horiatiki Salata)',
      sections: [
        { title: 'Culinary Specs & Ingredients', body: `<p>Ripe tomatoes, crisp cucumbers, red onion, green bell pepper, authentic Kalamata olives, and a generous block of Greek feta seasoned with dried oregano. The dressing uses extra virgin olive oil, red wine vinegar, dried oregano, and sea salt, following traditional Greek preparation without lettuce or leafy greens.</p>` },
        { title: 'Sanitation, Food Safety & Preparation', body: `<p>All fresh produce was thoroughly cleansed under potable cold running water and sanitized appropriately. Separate clean cutting boards and dedicated chef’s knives were used to reduce cross-contamination risk. Tomatoes and cucumbers were cut into uniform slices, while the dressing was whisked from extra virgin olive oil, red wine vinegar, oregano, and sea salt.</p>` },
        { title: 'Plating, Aesthetic Design & Visual Balance', body: `<p>The salad was presented in a wide rustic ceramic bowl celebrating the natural colors of Mediterranean ingredients: red tomato wedges, deep green cucumber and pepper, purple-red onion, glossy Kalamata olives, and a central white feta slab. Dried oregano and golden olive oil completed the presentation without unnecessary clutter.</p>` },
        { title: 'Reflection', body: `<p>Preparing an authentic Greek Horiatiki salad taught me to highlight natural ingredient quality rather than relying on leafy greens as filler. I learned how acidity balances rich, creamy, salty ingredients, while practicing uniform knife cuts reinforced the importance of structural integrity. Rigorous sanitation and workstation organization also reinforced the importance of hygienic food handling at home.</p>` },
        { title: 'Product Photo', type: 'photo', label: 'Add your finished Greek salad photo here', body: '<div class="po-photo-placeholder">TLE finished product photo will go here ✦</div>' }
      ]
    },
    'Araling Panlipunan': {
      subtitle: 'Ekonomiks at Sektor ng Ekonomiya',
      intro: 'Pagsusuri sa demand, supply, ekwilibriyo, at tatlong pangunahing sektor ng ekonomiya.',
      sections: [
        { title: 'Pangkalahatang-ideya', body: `<p>Ang araling ito ay nakatuon sa pagsusuri ng pangunahing puwersa ng pamilihan—ang interaksiyon ng <strong>demand</strong> (mga mamimili) at <strong>supply</strong> (mga prodyuser)—at kung paano nakakamit ang ekwilibriyo sa presyo at dami ng produkto sa isang pambansang ekonomiya.</p><p>Sinusuri rin ang tatlong pangunahing sektor: <strong>Agrikultura</strong>, na nagkakaloob ng pagkain at hilaw na materyales; <strong>Industriya</strong>, na nagpoproseso at lumilikha ng mga yaring produkto at imprastraktura; at <strong>Paglilingkod</strong>, na nagbibigay ng propesyonal, teknikal, at pinansyal na serbisyo.</p>` },
        { title: 'Pagninilay', body: `<p>Ang pag-aaral ng ekonomiks ay nagbukas ng aking kamalayan sa kung paano ang demand at supply ay direktang humuhubog sa pang-araw-araw na presyo ng bilihin at kabuhayan. Natutuhan ko na ang bawat desisyon sa pagkonsumo ay may kaakibat na <em>opportunity cost</em>, kaya mahalagang maging mapanuri sa pagbabadyet ng limitadong salapi sa harap ng implasyon at kakapusan.</p><p>Naliwanagan din ako sa papel ng agrikultura, industriya, at serbisyo, at sa kahalagahan ng pagsuporta sa lokal na magsasaka at manggagawa. Sa huli, ang ekonomiks ay hindi lamang tungkol sa pera o grapiko, kundi gabay sa panlipunang katarungan, pantay na oportunidad, at sustinableng pag-unlad.</p>` },
        { title: 'Output / Visual', type: 'photo', label: 'Add your Economics output, graph, or project photo here', body: '<div class="po-photo-placeholder">Araling Panlipunan output will go here ✦</div>' }
      ]
    }
  };

  const style = document.createElement('style');
  style.id = 'portos-portfolio-output-style';
  style.textContent = `
    .po-wrap{height:100%;overflow:auto;padding:24px 28px 34px;background:linear-gradient(180deg,#fbfeff 0%,#eef9ff 55%,#e8f4fb 100%);color:#143c59;font-family:Segoe UI,Arial,sans-serif}
    .po-wrap *{box-sizing:border-box}.po-intro{margin:0 0 20px;padding:16px 18px;border:1px solid #b9dff0;border-radius:14px;background:linear-gradient(180deg,rgba(255,255,255,.92),rgba(220,244,255,.78));box-shadow:inset 0 1px 3px #fff,0 4px 12px rgba(0,87,135,.08);font-size:14px;line-height:1.6;color:#285b78}.po-section{margin:0 0 18px;padding:18px 20px;border:1px solid #c1dfed;border-radius:15px;background:rgba(255,255,255,.78);box-shadow:0 5px 15px rgba(0,74,112,.08),inset 0 1px 2px rgba(255,255,255,.95)}.po-section h3{margin:0 0 11px;color:#145aa0;font-size:18px;text-shadow:0 1px 0 #fff}.po-section p{margin:0 0 10px;font-size:13px;line-height:1.68}.po-section p:last-child{margin-bottom:0}.po-detail-grid,.po-profile-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.po-detail-grid>div,.po-profile-grid>div{padding:11px 13px;border-radius:11px;background:linear-gradient(180deg,#fff,#edf8ff);border:1px solid #c4e2f0}.po-detail-grid span,.po-profile-grid span{display:block;font-size:10px;text-transform:uppercase;letter-spacing:.8px;color:#54819a;font-weight:800;margin-bottom:4px}.po-detail-grid strong,.po-profile-grid strong{display:block;font-size:12px;line-height:1.4}.po-list{margin:0;padding-left:22px}.po-list li{margin:0 0 10px;font-size:13px;line-height:1.55}.po-list li:last-child{margin-bottom:0}.po-quote{padding:18px 20px;border-left:4px solid #4bb9e8;border-radius:10px;background:linear-gradient(90deg,#effaff,#fff);font-family:Georgia,serif;font-size:14px;line-height:1.75;color:#264c68}.po-formula{margin:12px 0;padding:13px;text-align:center;border-radius:10px;background:linear-gradient(180deg,#dff7ff,#bde9f8);border:1px solid #93d2e8;font-family:Consolas,monospace;font-weight:800;color:#075e91}.po-table{width:100%;border-collapse:separate;border-spacing:0;overflow:hidden;border:1px solid #acd4e5;border-radius:10px;font-size:12px}.po-table th,.po-table td{padding:9px;text-align:center;border-right:1px solid #c8e3ef;border-bottom:1px solid #c8e3ef}.po-table th{background:linear-gradient(180deg,#dff7ff,#bce8f7);color:#15577e}.po-table tr:last-child td,.po-table tr:last-child th{border-bottom:0}.po-table th:last-child,.po-table td:last-child{border-right:0}.po-photo-placeholder{min-height:180px;border:2px dashed #8bcbe5;border-radius:14px;display:grid;place-items:center;padding:24px;text-align:center;color:#4d8aaa;background:radial-gradient(circle at 50% 0,rgba(255,255,255,.95),rgba(219,245,255,.72));font-weight:800}.po-photo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.po-photo-grid .po-photo-placeholder{min-height:125px;font-size:11px}.po-wrap em{color:#176b99}.po-wrap::-webkit-scrollbar{width:10px}.po-wrap::-webkit-scrollbar-thumb{background:linear-gradient(#aee7f8,#54b7df);border-radius:10px;border:2px solid #edf9ff}
    @media(max-width:650px){.po-wrap{padding:17px}.po-detail-grid,.po-profile-grid{grid-template-columns:1fr}.po-photo-grid{grid-template-columns:1fr 1fr}.po-section{padding:15px}}
  `;
  document.head.appendChild(style);

  function photoSection(section){
    return `<section class="po-section"><h3>${section.title}</h3>${section.label ? `<div class="po-photo-label">${section.label}</div>` : ''}${section.body}</section>`;
  }

  function render(title, data){
    return `<div class="po-wrap"><div class="po-intro"><strong>${data.subtitle}</strong><br>${data.intro}</div>${data.sections.map(section => photoSection(section)).join('')}</div>`;
  }

  function enhanceWindow(win, title){
    const data = subjectData[title];
    if(!data || !win) return;
    const body = win.querySelector('.portos-app-body');
    if(!body) return;
    body.innerHTML = render(title, data);
    body.classList.add('po-app-body');
    win.dataset.portfolioOutput = 'true';
  }

  const originalOpen = window.openAppWindow;
  if(typeof originalOpen === 'function'){
    window.openAppWindow = function(title, symbol, description){
      originalOpen(title, symbol, description);
      if(subjectData[title]){
        setTimeout(() => {
          const windows = [...document.querySelectorAll('.portos-app-window')];
          const latest = windows[windows.length - 1];
          enhanceWindow(latest, title);
        }, 30);
      }
    };
  }

  window.PortOSPortfolio = { subjectData, enhanceWindow };
})();
