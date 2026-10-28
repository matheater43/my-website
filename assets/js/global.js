/* ==========================================================================
   GLOBAL COMPONENT LOADER & INTERACTION LOGIC
   ========================================================================== */

function loadComponent(elementId, fileUrl, callback) {
  fetch(fileUrl)
    .then(r => {
      if (!r.ok) throw new Error('Failed to load ' + fileUrl);
      return r.text();
    })
    .then(d => {
      const target = document.getElementById(elementId);
      if (target) {
        target.innerHTML = d;
        if (callback) callback();
      }
    })
    .catch(e => console.error(e));
}

function initializeNavbarToggle() {
  const toggleInput = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleInput && navLinks) {
    toggleInput.addEventListener('change', function() {
      if (this.checked) {
        navLinks.classList.add('is-active');
      } else {
        navLinks.classList.remove('is-active');
      }
    });
  }
}

function toggleLanguage(targetLang) {
  const currentUrl = window.location.href;

  // Replace language identifier suffix (_e <-> _c) in filename
  if (targetLang === 'c' && currentUrl.includes('_e.html')) {
    window.location.href = currentUrl.replace('_e.html', '_c.html');
  } else if (targetLang === 'e' && currentUrl.includes('_c.html')) {
    window.location.href = currentUrl.replace('_c.html', '_e.html');
  }
}

/* ==========================================================================
   BACK TO TOP BUTTON LOGIC
   ========================================================================== */
function initializeBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');

  if (!backToTopBtn) return;

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  });

  // Auto scroll to top on click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  });
}

// Call the initializer inside DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  loadComponent('global-navbar-e', '../components/navbar_e.html', initializeNavbarToggle);
  loadComponent('global-footer-e', '../components/footer_e.html');
  loadComponent('global-navbar-c', '../components/navbar_c.html', initializeNavbarToggle);
  loadComponent('global-footer-c', '../components/footer_c.html');
  
  // Initialize Back to Top functionality
  initializeBackToTop();
});

// Shared base macros (formatting & math symbols)
const baseMacros = {
  thus: "\\therefore \\quad",
  bcz: "\\because \\quad",
  vs: "\\vspace{2mm}",
  vp: ["\\vspace{#1 mm}", 1],
  out: ["\\textcolor[RGB]{0, 176, 80}{#1}", 1],
  degree: "^\\circ"
};

// English macros
const EnglishMacros = {
  asum: "\\text{($\\angle$ sum of $\\Delta$)}",
  adj: "\\text{(adj. $\\angle$s on st. line)}",
  angpt: "\\text{($\\angle$s at a pt.)}",
  corrang: "\\text{corr. $\\angle$s, }",
  altang: "\\text{alt. $\\angle$s, }",
  intang: "\\text{int. $\\angle$s, }",
  ext: "\\text{(ext. $\\angle$ of $\\Delta$)}",
  base: "\\text{(base $\\angle$s, isos. $\\Delta$)}",
  sidesopp: "\\text{(sides opp. equal $\\angle$s)}",
  propeq: "\\text{(prop. of equil. $\\Delta$)}",
  asump: "\\text{($\\angle$ sum of polygon)}",
  esum: "\\text{(sum of ext. $\\angle$s of polygon)}",
  sidescong: "\\text{(corr. sides, $\\cong\\Delta$s)}",
  angcong: "\\text{(corr. $\\angle$s, $\\cong\\Delta$s)}",
  sidesim: "\\text{(corr. sides, $\\sim\\Delta$s)}",
  angsim: "\\text{(corr. $\\angle$s, $\\sim\\Delta$s)}",
  py: "\\text{(Pyth. theorem)}",
  convpy: "\\text{(converse of Pyth. theorem)}",
  angbis: "\\text{($\\angle$ bisector property)}",
  convangbis: "\\text{(converse of $\\angle$ bisector property)}",
  perpbis: "\\text{($\\perp$ bisector property)}",
  convperpbis: "\\text{(converse of $\\perp$ bisector property)}",
  linefrom: "\\text{(line from centre $\\perp$ chord bisects chord)}",
  linejoin: "\\text{(line joining centre to mid-pt. of chord $\\perp$ chord)}",
  twice: "\\text{($\\angle$ at centre twice $\\angle$ at $\\odot^\\text{ce}$)}",
  semi: "\\text{($\\angle$ in semicircle)}",
  convsemi: "\\text{(converse of $\\angle$ in semicircle)}",
  seg: "\\text{($\\angle$s in the same segment)}",
  arccen: "\\text{(arcs prop. to $\\angle$s at centre)}",
  arccir: "\\text{(arcs prop. to $\\angle$s at $\\odot^{\\text{ce}}$)}",
  oppcyc: "\\text{(opp. $\\angle$s, cyclic quad.)}",
  extcyc: "\\text{(ext. $\\angle$, cyclic quad.)}",
  tanrad: "\\text{(tangent $\\perp$ radius)}",
  tanprop: "\\text{(tangent properties)}",
  altseg: "\\text{($\\angle$ in alt. segment)}"
};

// Chinese translated macros
const ChineseMacros = {
  asum: "\\text{($\\Delta$ 內角和)}",
  adj: "\\text{(直線上的鄰角)}",
  angpt: "\\text{(同頂角)}",
  corrang: "\\text{同位角，}",
  altang: "\\text{內錯角，}",
  intang: "\\text{同旁內角，}",
  ext: "\\text{($\\Delta$ 外角)}",
  base: "\\text{(等腰 $\\Delta$ 底角)}",
  sidesopp: "\\text{(等角對等邊)}",
  propeq: "\\text{(等邊 $\\Delta$ 性質)}",
  asump: "\\text{(多邊形內角和)}",
  esum: "\\text{(多邊形外角和)}",
  sidescong: "\\text{(全等 $\\Delta$ 的對應邊)}",
  angcong: "\\text{(全等 $\\Delta$ 的對應角)}",
  sidesim: "\\text{(相似 $\\Delta$ 的對應邊)}",
  angsim: "\\text{(相似 $\\Delta$ 的對應角)}",
  py: "\\text{(畢氏定理)}",
  convpy: "\\text{(畢氏定理的逆定理)}",
  angbis: "\\text{(角平分線性質)}",
  convangbis: "\\text{(角平分線性質的逆定理)}",
  perpbis: "\\text{(垂直平分線性質)}",
  convperpbis: "\\text{(垂直平分線性質的逆定理)}",
  linefrom: "\\text{(圓心至弦的垂線平分弦)}",
  linejoin: "\\text{(圓心至弦中點的連線垂直弦)}",
  twice: "\\text{(圓心角兩倍於圓周角)}",
  semi: "\\text{(半圓上的圓周角)}",
  convsemi: "\\text{(半圓上的圓周角的逆定理)}",
  seg: "\\text{(同弓形內的圓周角)}",
  arccen: "\\text{(弧與圓心角成比例)}",
  arccir: "\\text{(弧與圓周角成比例)}",
  oppcyc: "\\text{(圓內接四邊形對角)}",
  extcyc: "\\text{(圓內接四邊形外角)}",
  tanrad: "\\text{(切線 $\\perp$ 半徑)}",
  tanprop: "\\text{(切線性質)}",
  altseg: "\\text{(交錯弓形的圓周角)}"
};

// Detect language from URL suffix
const isChinese = window.location.href.includes('_c.html');
const activeLocalizedMacros = isChinese ? ChineseMacros : EnglishMacros;

// Combine base macros with the active language set
const activeMacros = Object.assign({}, baseMacros, activeLocalizedMacros);

// assets/js/global.js

window.MathJax = {
  options: {
    ignoreHtmlClass: 'tex2jax_ignore|mathjax_ignore',
    processHtmlClass: 'tex2jax_process',
    // Add renderActions to inspect and transform TeX input per element
    renderActions: {
      autoUprightVars: [15, (doc) => {
        for (const math of doc.math) {
          // Find if the target math element is inside a '.upright-vars' container
          const node = math.start.node;
          const parent = node.parentElement ? node.parentElement.closest('.upright-vars') : null;

          if (parent) {
            // Replaces ALL occurrences of A, B, C, D, X, Y, M (even within multi-letter groups or subscripts)
            // Uses negative lookbehind (?<!\\) to avoid altering LaTeX commands starting with '\'
            math.math = math.math.replace(/(?<!\\)[ABCDXYM]/g, (match) => `\\mathrm{${match}}`);
          }
        }
      }, '']
    }
  },
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    
    macros: activeMacros
  },
  chtml: {
    scale: 0.96, // Adjust between 0.88 and 0.95 until visually balanced
    displayAlign: 'left',
    mtextInheritFont: true
  }
};
