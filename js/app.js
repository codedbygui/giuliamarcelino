/**
 * Currículo online - multi-idioma (PT/EN) - JavaScript vanilla
 */
(function () {
  'use strict';

  var currentLang = document.documentElement.lang === 'en' ? 'en' : 'pt';

  function t(key) {
    return (CV_DATA[currentLang] && CV_DATA[currentLang][key]) || key;
  }

  function setLang(lang) {
    if (lang !== 'pt' && lang !== 'en') return;
    currentLang = lang;
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
    var body = document.body;
    var pageKey = body && body.getAttribute('data-page');
    var titleKey = pageKey === 'portfolio' ? 'portfolio_page_title' : 'page_title';
    var pageTitle = t(titleKey);
    if (pageTitle) document.title = pageTitle;
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    renderAll();
  }

  function renderAll() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var value = t(key);
      if (value && value !== key) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.value = value;
        } else {
          el.textContent = value;
        }
      }
    });

    var cvBtn = document.getElementById('cv-download');
    if (cvBtn) {
      cvBtn.href = t('cv_download_url');
      var cvBtnText = cvBtn.querySelector('.btn-download-text');
      if (cvBtnText) cvBtnText.textContent = t('btn_download_cv');
    }
    var portfolioBtn = document.getElementById('portfolio-btn');
    if (portfolioBtn) {
      var portfolioBtnText = portfolioBtn.querySelector('.btn-portfolio-text');
      if (portfolioBtnText) portfolioBtnText.textContent = t('btn_portfolio');
    }

    var exp = t('experience');
    var timelineEl = document.getElementById('experience-timeline');
    if (timelineEl && Array.isArray(exp)) {
      timelineEl.innerHTML = exp.map(function (job) {
        var clientsHtml = '';
        if (job.clients && job.clients.length) {
          clientsHtml = '<p class="timeline-clients-label">' + t('clients_label') + ':</p>' +
            '<ul class="timeline-clients-list">' +
            job.clients.map(function (c) { return '<li>' + c + '</li>'; }).join('') +
            '</ul>';
        }
        return (
          '<div class="timeline-item">' +
          '<div class="timeline-period">' + (job.period || '') + '</div>' +
          '<div class="timeline-role">' + (job.role || '') + '</div>' +
          '<div class="timeline-company">' + (job.company || '') + '</div>' +
          '<p class="timeline-desc">' + (job.description || '') + '</p>' +
          clientsHtml +
          '</div>'
        );
      }).join('');
    }

    var achievements = t('achievements');
    var achievementsEl = document.getElementById('achievements-list');
    if (achievementsEl && Array.isArray(achievements)) {
      achievementsEl.innerHTML = achievements.map(function (item) {
        return '<div class="achievement-item">' + item + '</div>';
      }).join('');
    }

    var education = t('education');
    var educationEl = document.getElementById('education-block');
    if (educationEl && Array.isArray(education)) {
      educationEl.innerHTML = education.map(function (item) {
        return (
          '<div class="education-item">' +
          '<div class="education-period">' + (item.period || '') + '</div>' +
          '<div class="education-course">' + (item.course || '') + '</div>' +
          '<div class="education-school">' + (item.school || '') + '</div>' +
          '</div>'
        );
      }).join('');
    }

    var skills = t('skills');
    var skillsEl = document.getElementById('skills-grid');
    if (skillsEl && Array.isArray(skills)) {
      skillsEl.innerHTML = skills.map(function (skill) {
        return '<span class="skill-tag">' + skill + '</span>';
      }).join('');
    }

    var languages = t('languages');
    var languagesEl = document.getElementById('languages-list');
    if (languagesEl && Array.isArray(languages)) {
      languagesEl.innerHTML = languages.map(function (item) {
        return '<li><strong>' + (item.name || '') + ':</strong> ' + (item.level || '') + '</li>';
      }).join('');
    }

    var portfolio = t('portfolio_items');
    var portfolioEl = document.getElementById('portfolio-grid');
    if (portfolioEl && Array.isArray(portfolio)) {
      portfolioEl.innerHTML = portfolio.map(function (item) {
        var tagsHtml = '';
        if (item.tags && item.tags.length) {
          tagsHtml = '<div class="portfolio-tags">' +
            item.tags.map(function (tag) {
              return '<span class="portfolio-tag">' + tag + '</span>';
            }).join('') +
            '</div>';
        }

        var coverHtml = item.cover
          ? '<img src="' + item.cover + '" alt="' + (item.title || '') + '" class="portfolio-cover" loading="lazy">'
          : '';

        var cardHtml =
          '<article class="portfolio-card">' +
            '<div class="portfolio-card-inner">' +
              coverHtml +
              '<div class="portfolio-meta">' +
                '<h3 class="portfolio-title">' + (item.title || '') + '</h3>' +
                tagsHtml +
              '</div>' +
            '</div>' +
          '</article>';

        return item.url
          ? '<a class="portfolio-card-link" href="' + item.url + '">' + cardHtml + '</a>'
          : cardHtml;
      }).join('');
    }
  }

  function init() {
    var body = document.body;
    var pageKey = body && body.getAttribute('data-page');
    var titleKey = pageKey === 'portfolio' ? 'portfolio_page_title' : 'page_title';
    var pageTitle = t(titleKey);
    if (pageTitle) document.title = pageTitle;
    renderAll();

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = this.getAttribute('data-lang');
        if (lang) setLang(lang);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
