// Nexus Theme — main.js

// Mobile nav toggle
(function () {
  var toggle = document.getElementById('navToggle');
  var menu   = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
    });
    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
      }
    });
  }
})();

// Lazy images fallback
document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
  img.addEventListener('error', function () {
    this.style.display = 'none';
  });
});
