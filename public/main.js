'use strict';

(function () {
  /* ==========================================================================
     1. Theme Switcher Engine (Light / Dark / System)
     ========================================================================== */
  var storedTheme = localStorage.getItem('theme-mode') || 'system';

  function applyTheme(mode) {
    var effectiveTheme = mode;
    if (mode === 'system') {
      var isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      effectiveTheme = isDark ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme-mode', mode);
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    localStorage.setItem('theme-mode', mode);

    var buttons = document.querySelectorAll('.theme-btn');
    buttons.forEach(function (btn) {
      if (btn.getAttribute('data-theme-mode') === mode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  applyTheme(storedTheme);

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      if ((localStorage.getItem('theme-mode') || 'system') === 'system') {
        applyTheme('system');
      }
    });
  }

  /* ==========================================================================
     2. Application Initializer
     ========================================================================== */
  function initApp() {
    applyTheme(localStorage.getItem('theme-mode') || 'system');

    /* Theme Button Listeners */
    var themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var mode = btn.getAttribute('data-theme-mode');
        if (mode) applyTheme(mode);
      });
    });

    /* Mobile Navbar Toggle */
    var navToggle = document.getElementById('navbarToggle');
    var navMenu = document.getElementById('navbarMenu');
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!isExpanded));
        navMenu.classList.toggle('show');
      });
    }

    /* Apple FAQ Accordion Controller */
    var expandBtn = document.getElementById('faqExpandAllBtn');
    var faqItems = document.querySelectorAll('.apple-faq-item');
    if (expandBtn && faqItems.length > 0) {
      var isAllExpanded = false;

      function updateBtnState() {
        var allOpen = true;
        faqItems.forEach(function (item) {
          if (!item.hasAttribute('open')) allOpen = false;
        });
        isAllExpanded = allOpen;
        expandBtn.setAttribute('aria-expanded', String(isAllExpanded));
        var label = expandBtn.querySelector('.apple-faq-btn-text');
        var chevron = expandBtn.querySelector('.apple-faq-expand-chevron');
        if (label) label.textContent = isAllExpanded ? 'Collapse all' : 'Expand all';
        if (chevron) chevron.style.transform = isAllExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
      }

      expandBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var newState = !isAllExpanded;
        faqItems.forEach(function (item) {
          if (newState) {
            item.setAttribute('open', '');
          } else {
            item.removeAttribute('open');
          }
        });
        updateBtnState();
      });

      faqItems.forEach(function (item) {
        item.addEventListener('toggle', updateBtnState);
      });
    }

    /* Search Modal Engine */
    var searchIndex = null;
    var isFetching = false;
    var modal = document.getElementById('searchModal');
    var input = document.getElementById('searchInput');
    var results = document.getElementById('searchResults');
    var closeBtn = document.getElementById('searchClose');

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    async function loadSearch() {
      if (searchIndex || isFetching) return;
      isFetching = true;
      try {
        var res = await fetch('/search-index.json');
        if (res.ok) {
          var data = await res.json();
          searchIndex = Array.isArray(data) ? data : (data.entries || []);
        } else {
          searchIndex = [];
        }
      } catch (e) {
        searchIndex = [];
      } finally {
        isFetching = false;
      }
    }

    function openSearch() {
      if (!modal) return;
      modal.classList.add('active');
      loadSearch();
      setTimeout(function () {
        if (input) {
          input.focus();
          if (input.value.trim()) {
            input.dispatchEvent(new Event('input'));
          }
        }
      }, 50);
    }

    function closeSearch() {
      if (!modal) return;
      modal.classList.remove('active');
      if (input) input.value = '';
      if (results) results.innerHTML = '<div class="search-empty">Type to search...</div>';
    }

    var triggers = document.querySelectorAll('#searchTrigger, #searchTriggerMobile, .search-trigger');
    triggers.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openSearch();
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeSearch);
    if (modal) {
      var backdrop = modal.querySelector('.search-backdrop');
      if (backdrop) backdrop.addEventListener('click', closeSearch);
    }

    window.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      } else if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeSearch();
      }
    });

    if (input) {
      input.addEventListener('input', function () {
        var query = input.value.trim().toLowerCase();
        if (!query) {
          results.innerHTML = '<div class="search-empty">Type to search...</div>';
          return;
        }
        if (!searchIndex) {
          results.innerHTML = '<div class="search-empty">Loading search index...</div>';
          loadSearch().then(function () {
            input.dispatchEvent(new Event('input'));
          });
          return;
        }
        if (searchIndex.length === 0) {
          results.innerHTML = '<div class="search-empty">No results found for "' + escapeHtml(query) + '"</div>';
          return;
        }

        var tokens = query.split(/\\s+/).filter(Boolean);
        var matches = searchIndex.filter(function (item) {
          var t = (item.title || '').toLowerCase();
          var d = (item.description || '').toLowerCase();
          var c = (item.content || '').toLowerCase();
          var u = (item.url || '').toLowerCase();
          var target = t + ' ' + d + ' ' + c + ' ' + u;
          return tokens.every(function (tok) {
            return target.includes(tok);
          });
        }).slice(0, 10);

        if (matches.length === 0) {
          results.innerHTML = '<div class="search-empty">No results found for "' + escapeHtml(query) + '"</div>';
          return;
        }

        results.innerHTML = matches.map(function (item) {
          return '<a class="search-item" href="' + item.url + '">' +
            '<div class="search-item-title">' + escapeHtml(item.title) + '</div>' +
            '<div class="search-item-desc">' + escapeHtml((item.description || item.content || '').replace(/<[^>]+>/g, '').slice(0, 140)) + '...</div>' +
            '</a>';
        }).join('');
      });
    }

    /* Photo Lightbox Modal Engine */
    var lightboxModal = document.getElementById('photoLightboxModal');
    if (!lightboxModal) {
      lightboxModal = document.createElement('div');
      lightboxModal.id = 'photoLightboxModal';
      lightboxModal.className = 'photo-lightbox-modal';
      lightboxModal.setAttribute('role', 'dialog');
      lightboxModal.setAttribute('aria-modal', 'true');
      lightboxModal.setAttribute('aria-label', 'Photo Preview');
      lightboxModal.innerHTML = '<div class="photo-lightbox-backdrop"></div>' +
        '<div class="photo-lightbox-content">' +
        '  <div class="photo-lightbox-media-wrap">' +
        '    <button type="button" class="photo-lightbox-close" aria-label="Close photo preview">✕</button>' +
        '    <img src="" alt="" class="photo-lightbox-img" id="lightboxImg" />' +
        '  </div>' +
        '  <div class="photo-lightbox-caption" id="lightboxCaption"></div>' +
        '</div>';
      document.body.appendChild(lightboxModal);
    }

    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxCaption = document.getElementById('lightboxCaption');
    var lightboxClose = lightboxModal.querySelector('.photo-lightbox-close');
    var lightboxBackdrop = lightboxModal.querySelector('.photo-lightbox-backdrop');

    function openLightbox(src, alt) {
      if (!lightboxImg) return;
      lightboxImg.src = src;
      lightboxImg.alt = alt || 'Photo Preview';
      if (lightboxCaption) lightboxCaption.textContent = alt || '';
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      if (!lightboxModal) return;
      lightboxModal.classList.remove('active');
      if (lightboxImg) lightboxImg.src = '';
      document.body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });

    document.addEventListener('click', function (e) {
      var photoTarget = e.target.closest('.photo-card, .photo-img-wrapper, .gallery-card, .gallery-img-wrapper, figure');
      if (photoTarget) {
        var img = photoTarget.querySelector('img');
        if (img && img.src) {
          e.preventDefault();
          openLightbox(img.src, img.alt);
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();


/* ==========================================================================
   Banking On Quantum — Enterprise Controllers (Clock & Scorecard)
   ========================================================================== */

/* 1. Live Countdown Engine */
(function() {
  function updateCounters() {
    var now = new Date();
    
    // NIST FIPS 140-2 Sunset: 2026-09-21
    var fipsDate = new Date('2026-09-21T00:00:00Z');
    var fipsDays = Math.ceil((fipsDate - now) / (1000 * 60 * 60 * 24));
    var fipsEl = document.getElementById('countFipsSunset');
    if (fipsEl) fipsEl.textContent = fipsDays > 0 ? fipsDays + ' days' : 'Historical';

    // US Federal Key Est. Deadline (EO): 2030-12-31
    var usDate = new Date('2030-12-31T23:59:59Z');
    var usDays = Math.ceil((usDate - now) / (1000 * 60 * 60 * 24));
    var usEl = document.getElementById('countUsEo');
    if (usEl) usEl.textContent = usDays.toLocaleString() + ' days';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateCounters);
  } else {
    updateCounters();
  }
})();

/* 2. Pillar Tab Controller */
(function() {
  function initPillarTabs() {
    var tabBtns = document.querySelectorAll('.pillar-tab-btn');
    var panes = document.querySelectorAll('.pillar-content-pane');
    if (!tabBtns.length) return;

    tabBtns.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = btn.getAttribute('data-target');
        tabBtns.forEach(function(b) { b.classList.remove('active'); });
        panes.forEach(function(p) { p.classList.remove('active'); });
        btn.classList.add('active');
        var targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPillarTabs);
  } else {
    initPillarTabs();
  }
})();

/* 3. Resilience Index Scorecard Calculator */
(function() {
  function initScorecard() {
    var sliders = document.querySelectorAll('.score-slider');
    var totalScoreEl = document.getElementById('scoreTotal');
    var gradeEl = document.getElementById('scoreGrade');
    var recEl = document.getElementById('scoreRecommendation');
    if (!sliders.length || !totalScoreEl) return;

    function recalculate() {
      var total = 0;
      sliders.forEach(function(slider) {
        var val = parseFloat(slider.value);
        total += val;
        var valDisplay = document.getElementById(slider.id + 'Val');
        if (valDisplay) valDisplay.textContent = val.toFixed(1) + ' / 5.0';
      });

      var avg = total / sliders.length;
      totalScoreEl.textContent = avg.toFixed(2) + ' / 5.00';

      var grade = 'Tier 4 (Initial)';
      var rec = 'Immediate Cryptographic Bill of Materials (CBOM) inventory recommended.';

      if (avg >= 4.2) {
        grade = 'Tier 1 (Quantum Agility Leader)';
        rec = 'Production hybrid PQC operational; continue scheduled multi-rail stress testing.';
      } else if (avg >= 3.2) {
        grade = 'Tier 2 (Structured Transition)';
        rec = 'CBOM baseline complete; accelerate hybrid TLS 1.3 and HSM firmware upgrades.';
      } else if (avg >= 2.0) {
        grade = 'Tier 3 (Discovery Phase)';
        rec = 'Prioritise SWIFT / ISO 20022 payment rails for asymmetric algorithm discovery.';
      }

      if (gradeEl) gradeEl.textContent = grade;
      if (recEl) recEl.textContent = rec;
    }

    sliders.forEach(function(slider) {
      slider.addEventListener('input', recalculate);
    });

    recalculate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScorecard);
  } else {
    initScorecard();
  }
})();
