(function () {
  var STORAGE_KEY = 'ati-zh-mode';
  var MODES = ['zh', 'bilingual'];

  function applyMode(mode) {
    if (MODES.indexOf(mode) === -1) mode = 'bilingual';
    document.documentElement.setAttribute('data-mode', mode);
    var buttons = document.querySelectorAll('.mode-switch button[data-mode]');
    for (var i = 0; i < buttons.length; i++) {
      var b = buttons[i];
      if (b.getAttribute('data-mode') === mode) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    }
    try { localStorage.setItem(STORAGE_KEY, mode); } catch (e) {}
  }

  function initSwitch() {
    var saved = 'bilingual';
    try { saved = localStorage.getItem(STORAGE_KEY) || 'bilingual'; } catch (e) {}
    applyMode(saved);

    var buttons = document.querySelectorAll('.mode-switch button');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      if (btn.hasAttribute('href')) {
        btn.classList.add('active');
        btn.addEventListener('click', function (e) {
          window.location.href = this.getAttribute('href');
        });
      } else if (btn.hasAttribute('data-mode')) {
        if (btn.getAttribute('data-mode') === 'zh') {
          btn.classList.add('active');
        }
        btn.addEventListener('click', function () {
          applyMode(this.getAttribute('data-mode'));
        });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwitch);
  } else {
    initSwitch();
  }
})();
