/* WizLeads Ghost Theme — vanilla JS */
(function () {
    'use strict';

    /* ---------------------------------------------------------------
       Reading time (calculated client-side from post content)
       --------------------------------------------------------------- */
    var readingEl = document.querySelector('[data-reading-time]');
    var contentEl = document.querySelector('.post-content');
    if (readingEl && contentEl) {
        var words = contentEl.textContent.trim().split(/\s+/).length;
        var mins = Math.max(1, Math.round(words / 230));
        readingEl.innerHTML = ' &nbsp;·&nbsp; ' + mins + ' min read';
    }

    /* ---------------------------------------------------------------
       Sticky header scroll state
       --------------------------------------------------------------- */
    var header = document.querySelector('[data-site-header]');
    if (header) {
        var updateScrolled = function () {
            header.dataset.scrolled = window.scrollY > 8 ? 'true' : 'false';
        };
        updateScrolled();
        window.addEventListener('scroll', updateScrolled, { passive: true });
    }

    /* ---------------------------------------------------------------
       Mobile nav toggle
       --------------------------------------------------------------- */
    /* Floating header mobile menu */
    var fhBtn = document.querySelector('.fh-mobile-btn');
    var fhMenu = document.querySelector('.fh-mobile-menu');
    if (fhBtn && fhMenu) {
        fhBtn.addEventListener('click', function () {
            fhMenu.classList.toggle('open');
        });
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.floating-header') && !e.target.closest('.fh-mobile-menu')) {
                fhMenu.classList.remove('open');
            }
        });
        fhMenu.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') fhMenu.classList.remove('open');
        });
    }

    /* ---------------------------------------------------------------
       Table of contents — build from content headings
       --------------------------------------------------------------- */
    var tocList = document.querySelector('[data-toc-list]');
    var content = document.querySelector('[data-content]');
    if (tocList && content) {
        var headings = content.querySelectorAll('h2, h3');
        if (headings.length < 2) {
            var tocEl = document.querySelector('[data-toc]');
            if (tocEl) tocEl.style.visibility = 'hidden';
        } else {
            var items = [];
            headings.forEach(function (h, i) {
                if (!h.id) h.id = 'section-' + i;
                var li = document.createElement('li');
                li.className = h.tagName === 'H3' ? 'toc-h3' : 'toc-h2';
                var a = document.createElement('a');
                a.href = '#' + h.id;
                a.textContent = h.textContent;
                li.appendChild(a);
                tocList.appendChild(li);
                items.push({ id: h.id, link: a });
            });

            if ('IntersectionObserver' in window) {
                var observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        var link = items.find(function (it) { return it.id === entry.target.id; });
                        if (link && entry.isIntersecting) {
                            items.forEach(function (it) { it.link.classList.remove('is-active'); });
                            link.link.classList.add('is-active');
                        }
                    });
                }, { rootMargin: '-10% 0px -70% 0px' });
                headings.forEach(function (h) { observer.observe(h); });
            }
        }
    }

    /* ---------------------------------------------------------------
       Copy-to-clipboard share button
       --------------------------------------------------------------- */
    document.querySelectorAll('[data-share="copy"]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var url = window.location.href;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(url).then(function () {
                    var svg = btn.querySelector('svg');
                    if (svg) {
                        btn.style.color = '#7c3aed';
                        setTimeout(function () { btn.style.color = ''; }, 1500);
                    }
                });
            }
        });
    });

    /* ---------------------------------------------------------------
       Hero search — inline Ghost Content API search
       --------------------------------------------------------------- */
    var heroInput = document.getElementById('hero-search-input');
    var heroBtn = document.getElementById('hero-search-btn');
    var heroResults = document.getElementById('hero-search-results');
    var searchTimer = null;
    var ghostMeta = document.querySelector('link[rel="alternate"][type="application/rss+xml"]');
    var ghostRoot = ghostMeta ? ghostMeta.href.replace('/rss/', '/') : window.location.origin + '/';
    var GHOST_API_URL = ghostRoot + 'ghost/api/content/posts/';
    var GHOST_API_KEY = 'aac7ae7956a99ebc3907879ba3';

    function doSearch(query) {
        if (!query || query.length < 2) {
            heroResults.classList.remove('active');
            heroResults.innerHTML = '';
            return;
        }
        var url = GHOST_API_URL + '?key=' + GHOST_API_KEY +
            '&limit=5&fields=title,url,excerpt,feature_image&filter=title:~%27' +
            encodeURIComponent(query) + '%27';

        fetch(url)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                var posts = data.posts || [];
                if (!posts.length) {
                    heroResults.innerHTML = '<div class="hero-search-no-results">No results found</div>';
                    heroResults.classList.add('active');
                    return;
                }
                heroResults.innerHTML = posts.map(function (p) {
                    var img = p.feature_image
                        ? '<img src="' + p.feature_image + '" alt="" width="48" height="48" loading="lazy">'
                        : '';
                    var excerpt = (p.excerpt || '').substring(0, 80);
                    return '<a href="' + p.url + '" class="hero-search-result">' +
                        img +
                        '<div class="hero-search-result-text">' +
                            '<div class="hero-search-result-title">' + p.title + '</div>' +
                            '<div class="hero-search-result-excerpt">' + excerpt + '</div>' +
                        '</div></a>';
                }).join('');
                heroResults.classList.add('active');
            })
            .catch(function () {
                heroResults.innerHTML = '<div class="hero-search-no-results">Search unavailable</div>';
                heroResults.classList.add('active');
            });
    }

    if (heroInput && heroBtn && heroResults) {
        heroInput.addEventListener('input', function () {
            clearTimeout(searchTimer);
            var q = this.value.trim();
            searchTimer = setTimeout(function () { doSearch(q); }, 300);
        });
        heroInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                clearTimeout(searchTimer);
                doSearch(this.value.trim());
            }
        });
        heroBtn.addEventListener('click', function () {
            doSearch(heroInput.value.trim());
        });
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.subscribe-form')) {
                heroResults.classList.remove('active');
            }
        });
    }

    /* ---------------------------------------------------------------
       CTA Subscribe — Airtable integration
       --------------------------------------------------------------- */
    var ctaForm = document.getElementById('cta-subscribe-form');
    var ctaMsg = document.getElementById('cta-subscribe-msg');
    if (ctaForm && ctaMsg) {
        ctaForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = ctaForm.querySelector('input[name="name"]').value.trim();
            var email = ctaForm.querySelector('input[name="email"]').value.trim();
            if (!name || !email) return;

            var btn = ctaForm.querySelector('button');
            btn.textContent = 'Sending...';
            btn.disabled = true;

            fetch('https://api.airtable.com/v0/appq85YavAIEtTVfB/tblBEO4Xex0ijCJrz', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer patEG4OqaQod4ljR3.f2b9df69aea901f9bfd013365ed71fe78ec9d3919aaa503f6b5476e9ab7488be',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    records: [{ fields: { Name: name, Email: email } }]
                })
            })
            .then(function (r) {
                if (!r.ok) throw new Error('Failed');
                return r.json();
            })
            .then(function () {
                ctaMsg.style.color = '#a5f3a3';
                ctaMsg.textContent = 'You\'re in! We\'ll notify you about giveaways and deals.';
                ctaForm.style.display = 'none';
            })
            .catch(function () {
                ctaMsg.style.color = '#fca5a5';
                ctaMsg.textContent = 'Something went wrong. Please try again.';
                btn.textContent = 'Subscribe';
                btn.disabled = false;
            });
        });
    }

    /* ---------------------------------------------------------------
       Infinite scroll — AJAX "Load More" for post grids
       --------------------------------------------------------------- */
    document.addEventListener('click', function (e) {
        var btn = e.target.closest('.btn-load-more');
        if (!btn) return;
        e.preventDefault();
        e.stopPropagation();

        var nextUrl = btn.getAttribute('href');
        if (!nextUrl || btn.classList.contains('loading')) return;

        btn.classList.add('loading');
        var originalText = btn.textContent;
        btn.textContent = 'Loading…';

        fetch(nextUrl)
            .then(function (res) {
                if (!res.ok) throw new Error(res.status);
                return res.text();
            })
            .then(function (html) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, 'text/html');

                var newCards = doc.querySelectorAll('.post-card');
                var grid = document.querySelector('.posts-grid');

                if (grid && newCards.length) {
                    newCards.forEach(function (card) {
                        grid.appendChild(document.importNode(card, true));
                    });
                }

                var nextPageBtn = doc.querySelector('.btn-load-more');
                if (nextPageBtn && nextPageBtn.getAttribute('href')) {
                    btn.setAttribute('href', nextPageBtn.getAttribute('href'));
                    btn.textContent = originalText;
                    btn.classList.remove('loading');
                } else {
                    btn.parentElement.style.display = 'none';
                }
            })
            .catch(function () {
                btn.textContent = originalText;
                btn.classList.remove('loading');
            });
    });

})();

/* Mid-article signup box (partials/post-cta.hbs): move it before the middle H2 on posts with 4+ H2s,
   and keep ?ref= attribution: write the post slug into the wl_source cookie the main site reads. */
(function () {
    var box = document.querySelector('[data-cta-mid]');
    var content = document.querySelector('[data-content]');
    if (box && content) {
        var heads = Array.prototype.filter.call(content.children, function (el) { return el.tagName === 'H2'; });
        if (heads.length >= 4) {
            content.insertBefore(box, heads[Math.floor(heads.length / 2)]);
            box.classList.add('is-placed');
        }
    }
    document.addEventListener('click', function (e) {
        var a = e.target.closest ? e.target.closest('a[data-wl-ref]') : null;
        if (!a) return;
        var tag = a.getAttribute('data-wl-ref');
        if (!tag) return;
        var m = document.cookie.match(/(?:^|; )wl_source=([^;]*)/);
        var existing = m ? decodeURIComponent(m[1]) : '';
        if (existing.indexOf(tag + '|') !== -1) return;
        var updated = (existing + tag + '|').slice(-1000);
        var exp = new Date(); exp.setDate(exp.getDate() + 60);
        document.cookie = 'wl_source=' + encodeURIComponent(updated) + '; expires=' + exp.toUTCString() + '; path=/; domain=.wizleads.io';
    });
})();

/* $1 credit pack popup: appears 5 seconds after load, then stays hidden on this
   browser for 30 days. Closes on the cross, a click outside the ticket, or Esc. */
(function () {
    var overlay = document.querySelector('[data-wlp]');
    if (!overlay) return;

    var KEY = 'wl_popup_1usd_seen';
    var DAYS = 30;
    var WINDOW_MS = DAYS * 24 * 60 * 60 * 1000;

    function lastSeen() {
        try {
            var v = parseInt(localStorage.getItem(KEY), 10);
            if (v) return v;
        } catch (e) {}
        var m = document.cookie.match(new RegExp('(?:^|; )' + KEY + '=(\\d+)'));
        return m ? parseInt(m[1], 10) : 0;
    }
    function markSeen() {
        var now = Date.now();
        try { localStorage.setItem(KEY, String(now)); } catch (e) {}
        document.cookie = KEY + '=' + now + '; max-age=' + (DAYS * 86400) + '; path=/; SameSite=Lax';
    }

    if (Date.now() - lastSeen() < WINDOW_MS) return;

    // The tawk.to chat button sits over the ticket's corner on phones, so it is
    // hidden while the ticket is open. tawk.to adds these functions once it loads.
    function chat(fn) {
        var api = window.Tawk_API;
        if (api && typeof api[fn] === 'function') {
            try { return api[fn](); } catch (e) {}
        }
    }
    // If tawk.to finishes loading while the ticket is up, hide the button then.
    // Keeps the chat restyle's own onLoad (tawk-widget.js) running first.
    window.Tawk_API = window.Tawk_API || {};
    var chatOnLoad = window.Tawk_API.onLoad;
    window.Tawk_API.onLoad = function () {
        if (typeof chatOnLoad === 'function') chatOnLoad.apply(this, arguments);
        if (overlay.classList.contains('is-open')) chat('hideWidget');
    };

    function close() {
        if (overlay.hidden || !overlay.classList.contains('is-open')) return;
        chat('showWidget');
        overlay.classList.remove('is-open');
        document.removeEventListener('keydown', onKey);
        document.removeEventListener('click', onClick, true);
        setTimeout(function () { overlay.hidden = true; }, 280);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    // Listen on the document: on phones the overlay lets taps through to the page
    function onClick(e) {
        if (!e.target.closest('.wlp-ticket') || e.target.closest('[data-wlp-close]')) close();
    }

    setTimeout(function () {
        // Don't interrupt an open chat; the ticket isn't marked seen, so a later page shows it
        if (chat('isChatMaximized') === true) return;
        chat('hideWidget');
        overlay.hidden = false;
        void overlay.offsetWidth;
        overlay.classList.add('is-open');
        markSeen();
        document.addEventListener('keydown', onKey);
        document.addEventListener('click', onClick, true);
        var btn = overlay.querySelector('[data-wlp-close]');
        if (btn) btn.focus({ preventScroll: true });
    }, 5000);
})();

/* Offer band in the header: closing it hides it here and on wizleads.io (same key). */
(function () {
    var btn = document.querySelector('[data-ribbon-close]');
    if (!btn) return;
    btn.addEventListener('click', function () {
        document.documentElement.classList.add('ribbon-closed');
        try { localStorage.setItem('wl_offer_bf_closed', '1'); } catch (e) {}
    });
})();
