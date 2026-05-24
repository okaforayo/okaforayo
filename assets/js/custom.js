/* custom.js - site-specific scripts */
(function($) {
    'use strict';
    $(document).ready(function() {
        // lazy-load ad slots
        function decodeBase64(v) {
            try { return window.atob(v || ''); } catch(e) { return ''; }
        }
        function mountHtml(el, html) {
            if (!el || typeof html !== 'string') return;
            el.innerHTML = html;
            el.querySelectorAll('script').forEach(function(old) {
                var s = document.createElement('script');
                Array.from(old.attributes).forEach(function(a) { s.setAttribute(a.name, a.value); });
                if (old.textContent) s.textContent = old.textContent;
                old.parentNode.replaceChild(s, old);
            });
        }
        var slots = Array.from(document.querySelectorAll('[data-lazy-ad][data-ad-html]'));
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function(entries) {
                entries.forEach(function(e) {
                    if (!e.isIntersecting) return;
                    mountHtml(e.target, decodeBase64(e.target.dataset.adHtml || ''));
                    io.unobserve(e.target);
                });
            }, { rootMargin: '200px 0px' });
            slots.forEach(function(s) { io.observe(s); });
        } else {
            slots.forEach(function(s) { mountHtml(s, decodeBase64(s.dataset.adHtml || '')); });
        }
    });
})(jQuery);
