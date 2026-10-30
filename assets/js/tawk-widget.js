/* WizLeads tawk.to chat widget: brand restyle.
   Copied unchanged from the landing page (repo wizleads-lp, branch
   feat/homepage-comparisons, commit 1dc956a, index.js lines 106-626), wrapped in
   a function so its names don't clash with the blog's own scripts. The only edit:
   the fallback agent photo is an absolute URL, https://wizleads.io/favicons/favicon-white.svg.
   Load this before the tawk.to loader (tawk-loader.html). Pairs with tawk-widget.css. */
(function () {
    // The widget renders inside same-origin iframes, which styles.css cannot reach,
    // so this stylesheet is injected into each frame, and the frame itself is resized
    // from here. Sizes, spacing, radii, shadows and type follow Intercom's messenger
    // as measured on instantly.ai (400x704 frame, 24px corners, 12px cards, 81px nav),
    // in the site's font and one brand colour. tawk adds .tawk-active to the toolbar
    // on every screen but home. The "Powered by tawk.to" badge is left alone:
    // removing it is a paid tawk.to add-on.
    var TAWK_BRAND = '#3b1d6e'; // the CTA banner's purple
    var TAWK_CSS = [
        "@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');",
        ":root { --tawk-header-background-color: " + TAWK_BRAND + " !important; --tawk-header-text-color: #fff !important; }",
        "*, *::before, *::after { font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important; -webkit-font-smoothing: antialiased; }",
        "body { color: #14161a; }",
        ".tawk-max-container { border-radius: 24px !important; overflow: hidden; background: #fff; }",
        "a { color: " + TAWK_BRAND + "; }",
        ".tawk-home-view .tawk-chat-panel { scrollbar-width: none; }",
        ".tawk-home-view .tawk-chat-panel::-webkit-scrollbar { display: none; }",
        ".ps__rail-y { opacity: 0 !important; } .ps:hover .ps__rail-y, .ps--scrolling-y .ps__rail-y { opacity: 1 !important; }",
        ".ps__thumb-y { width: 4px !important; right: 3px !important; background: rgba(9,14,21,0.2) !important; }",

        /* launcher: 48px flat circle, grows a little on hover */
        /* pinned to the frame's bottom-right, so it sits 20px from the page edges like the chat frame */
        /* a soft white glow keeps the circle visible over the footer, which is the same purple; the
           frame is widened 8px on each side (sizeMinFrame) so the glow is not clipped */
        ".tawk-min-container .tawk-button-circle.tawk-custom-color { width: 48px !important; height: 48px !important; margin: 0 !important; left: auto !important; right: 8px !important; bottom: 8px !important; background: " + TAWK_BRAND + " !important; border: 0 !important; box-shadow: 0 0 8px rgba(255,255,255,0.55) !important; transition: transform 0.167s cubic-bezier(0.33, 0, 0, 1) !important; }",
        ".tawk-min-container .tawk-button-circle:hover { transform: scale(1.1); }",
        ".tawk-min-container .tawk-button-circle svg { width: 24px !important; height: 24px !important; }",
        /* closed: a square speech bubble (drawn here); open: tawk's own chevron */
        /* the bubble icon and a chevron (both drawn here; tawk's own icon varies with agent status)
           cross-fade with a twist as the chat opens, as Intercom's do */
        ".tawk-min-container .tawk-button-circle svg { display: none !important; }",
        ".tawk-min-container .tawk-button-circle::after { content: ''; position: absolute; left: 50%; top: 50%; width: 24px; height: 24px; margin: -12px 0 0 -12px; background: #fff; transition: transform 160ms linear, opacity 80ms linear; transform: rotate(-60deg); opacity: 0; -webkit-mask: url(\"data:image/svg+xml," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M6 9l6 6 6-6'/></svg>") + "\") center / contain no-repeat; mask: url(\"data:image/svg+xml," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M6 9l6 6 6-6'/></svg>") + "\") center / contain no-repeat; }",
        "html.wl-open .tawk-min-container .tawk-button-circle::after { transform: rotate(0deg); opacity: 1; }",
        "html.wl-open .tawk-min-container .tawk-button-circle::before { transform: rotate(30deg) scale(0); opacity: 0; }",
        /* tawk puts the online agent's photo in the launcher; the icon replaces it */
        ".tawk-min-container .tawk-min-chat-icon { display: none !important; }",
        ".tawk-min-container .tawk-button-circle { position: absolute !important; }",
        ".tawk-min-container .tawk-button-circle::before { content: ''; position: absolute; left: 50%; top: 50%; width: 24px; height: 24px; margin: -12px 0 0 -12px; background: #fff; transition: transform 160ms linear, opacity 80ms linear; transform: rotate(0deg) scale(1); opacity: 1; -webkit-mask: url(\"data:image/svg+xml," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linejoin='round'><path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/></svg>") + "\") center / contain no-repeat; mask: url(\"data:image/svg+xml," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linejoin='round'><path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/></svg>") + "\") center / contain no-repeat; }",
        ".tawk-min-container .tawk-button-circle > div { display: flex; align-items: center; justify-content: center; }",
        /* unread count: a small flat red disc on the launcher's top-right edge, no ring, no shadow */
        ".tawk-min-container .tawk-min-badge { inset: auto auto 44px 46px !important; width: 20px !important; height: 20px !important; padding: 0 !important; border: 0 !important; border-radius: 50% !important; background: #e5484d !important; color: #fff !important; font-size: 11px !important; font-weight: 700 !important; line-height: 20px !important; box-shadow: none !important; }",

        /* proactive greeting (the preview frame): one message bubble, Intercom's quick-reply pills, a round close button */
        ".tawk-message-preview .tawk-card.tawk-message { background: #fff !important; border: 0 !important; border-radius: 20px 20px 6px 20px !important; box-shadow: rgba(9,14,21,0.1) 0 4px 24px, rgba(9,14,21,0.06) 0 1px 4px !important; padding: 0 !important; }",
        ".tawk-message-preview .tawk-message-preview-chat-bubble { padding: 10px 14px !important; }",
        ".tawk-message-preview .tawk-message-preview-chat-bubble .tawk-text-regular-3 { font-size: 14px !important; line-height: 20px !important; color: #111 !important; }",
        ".tawk-message-preview .tawk-suggested-messages { gap: 6px !important; margin-top: 8px !important; }",
        ".tawk-message-preview .tawk-suggested-messages-option { margin: 0 !important; }",
        ".tawk-message-preview .tawk-suggested-messages-option .tawk-button { padding: 5px 12px !important; border-radius: 999px !important; border: 1px solid " + TAWK_BRAND + " !important; background: #fff !important; color: " + TAWK_BRAND + " !important; font-size: 13px !important; font-weight: 600 !important; line-height: 18px !important; box-shadow: rgba(9,14,21,0.06) 0 1px 4px !important; transition: background 120ms ease, color 120ms ease !important; }",
        ".tawk-message-preview .tawk-suggested-messages-option .tawk-button:hover, .tawk-message-preview .tawk-suggested-messages-option .tawk-button:focus-visible { background: " + TAWK_BRAND + " !important; color: #fff !important; outline: 0 !important; }",
        ".tawk-message-preview .tawk-message-preview-close { width: 28px !important; height: 28px !important; border-radius: 50% !important; border: 0 !important; background: #fff !important; color: #6b6b6b !important; box-shadow: rgba(9,14,21,0.1) 0 2px 10px !important; display: flex !important; align-items: center !important; justify-content: center !important; }",
        ".tawk-message-preview .tawk-message-preview-close svg { width: 12px !important; height: 12px !important; }",
        ".tawk-message-preview .tawk-message-preview-close:hover { background: #f5f5f5 !important; }",

        /* toolbar buttons (back, menu, minimize): 38px squares with 16px glyphs */
        ".tawk-toolbar { height: 54px !important; padding: 8px 13px !important; box-sizing: border-box; }",
        ".tawk-toolbar .tawk-button { width: 38px !important; height: 38px !important; padding: 8px !important; border-radius: 10px !important; background: transparent !important; transition: background-color 150ms !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; }",
        ".tawk-toolbar .tawk-button svg { width: 16px !important; height: 16px !important; }",
        ".tawk-toolbar:not(.tawk-active) { background: transparent !important; }",
        ".tawk-toolbar:not(.tawk-active) .tawk-button { color: #fff !important; }",
        ".tawk-toolbar:not(.tawk-active) .tawk-button:hover { background: rgba(255,255,255,0.16) !important; }",
        ".tawk-toolbar.tawk-active { background: #fff !important; border-bottom: 1px solid #ededed; }",
        ".tawk-toolbar.tawk-active .tawk-button, .tawk-toolbar.tawk-active .tawk-header-text { color: #6c6f74 !important; }",
        ".tawk-toolbar.tawk-active .tawk-button:hover { background: #f5f5f5 !important; color: #14161a !important; }",
        ".tawk-tooltip-hover { display: none !important; }",
        ".tawk-toolbar-agent-avatars { display: flex !important; align-items: center; }",
        ".tawk-toolbar-agent-avatars .tawk-avatar { width: 32px !important; height: 32px !important; }",
        ".tawk-toolbar-agent-avatars:not(:has(.tawk-avatar))::before { content: ''; flex: none; width: 32px; height: 32px; margin-right: 10px; border-radius: 50%; background: var(--wl-agent-bg) var(--wl-agent) no-repeat center / var(--wl-agent-size); }",
        ".tawk-toolbar-agent-name { color: #14161a !important; font-size: 14px !important; font-weight: 600 !important; line-height: 1.1 !important; }",
        /* short windows: tighter home header so the cards stay in view */
        "@media (max-height: 600px) { .tawk-home-view .card--heading::before { margin-bottom: 36px; } .tawk-home-view #tawk-body > :first-child:has(.header-card) { padding-top: 24px; padding-bottom: 48px; } .tawk-home-view .card--heading .tawk-header-text { font-size: 21px !important; line-height: 27px !important; } }",
        /* when tawk leaves the header blank, the last agent's name and photo are filled in */
        ".tawk-toolbar-agent-name[data-wl-filled] { display: grid !important; grid-template-columns: 32px 1fr; column-gap: 10px; align-items: center; margin: 0 !important; line-height: 1.15 !important; }",
        ".tawk-toolbar-agent-name[data-wl-filled]::before { content: ''; grid-row: 1 / span 2; width: 32px; height: 32px; border-radius: 50%; background: var(--wl-agent-bg) var(--wl-agent) no-repeat center / var(--wl-agent-size); }",
        ".tawk-toolbar-agent-name[data-wl-status]::after { content: attr(data-wl-status); grid-column: 2; color: #6c6f74; font-size: 12.5px; font-weight: 400; }",
        /* three dots for the header menu, as in Intercom, instead of tawk's hamburger */
        ".tawk-toolbar-menu > .tawk-button svg { display: none !important; }",
        ".tawk-toolbar-menu > .tawk-button { position: relative !important; }",
        ".tawk-toolbar-menu > .tawk-button::before { content: ''; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 16px; height: 16px; margin: 0; background: #6c6f74; -webkit-mask: url(\"data:image/svg+xml," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'><circle cx='5' cy='12' r='2.2'/><circle cx='12' cy='12' r='2.2'/><circle cx='19' cy='12' r='2.2'/></svg>") + "\") center / contain no-repeat; mask: url(\"data:image/svg+xml," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'><circle cx='5' cy='12' r='2.2'/><circle cx='12' cy='12' r='2.2'/><circle cx='19' cy='12' r='2.2'/></svg>") + "\") center / contain no-repeat; }",
        /* the toolbar's dropdown menu: ordinary rows, not 38px squares */
        ".tawk-dropdown-menu { min-width: 240px; padding: 6px !important; border-radius: 12px !important; border: 1px solid #ededed !important; box-shadow: 0 4px 28px rgba(9,14,21,0.1), 0 1px 4px rgba(9,14,21,0.06) !important; }",
        ".tawk-toolbar .tawk-dropdown-menu .tawk-button { width: 100% !important; height: auto !important; padding: 10px 12px !important; border-radius: 8px !important; display: flex !important; align-items: center; justify-content: flex-start !important; text-align: left; gap: 10px; white-space: nowrap; font-size: 14px !important; color: #14161a !important; }",
        ".tawk-toolbar-menu > .tawk-button:hover::before { background: #14161a; }",
        ".tawk-toolbar .tawk-dropdown-menu .tawk-button:hover { background: #f5f5f5 !important; }",
        ".tawk-toolbar .tawk-dropdown-menu a.tawk-button[href*='tawk.to'] { display: none !important; }",
        ".tawk-toolbar .tawk-dropdown-menu .tawk-button span, .tawk-toolbar .tawk-dropdown-menu .tawk-button div { display: flex; align-items: center; gap: 10px; }",
        ".tawk-toolbar .tawk-dropdown-menu .tawk-button svg { width: 16px !important; height: 16px !important; color: #6c6f74; }",
        ".tawk-toolbar-agent-title { color: #6c6f74 !important; font-size: 12.5px !important; }",
        /* past conversations open in tawk's overlay, which has its own header around a nested toolbar */
        ".tawk-overlay { border-radius: 24px !important; background: #fff !important; }",
        ".tawk-overlay-header { background: #fff !important; min-height: 54px; padding: 8px 13px !important; border-bottom: 1px solid #ededed; display: flex; align-items: center; }",
        ".tawk-overlay-header .tawk-button-small { width: 38px !important; height: 38px !important; padding: 8px !important; border-radius: 10px !important; background: transparent !important; color: #6c6f74 !important; }",
        ".tawk-overlay-header .tawk-button-small svg { width: 16px !important; height: 16px !important; }",
        ".tawk-overlay-header .tawk-button-small:hover { background: #f5f5f5 !important; }",
        ".tawk-overlay-header .tawk-margin-auto-right { flex: 1; min-width: 0; }",
        ".tawk-overlay-header .tawk-toolbar { position: static !important; height: 38px !important; padding: 0 !important; border: 0 !important; border-radius: 0 !important; background: transparent !important; width: 100%; }",
        ".tawk-overlay-title:empty { display: none; }",
        /* messages screen header: no back arrow (the nav goes home), title centred like Intercom's */
        ".tawk-max-container:has(.tawk-message-view) .tawk-route-back .tawk-button { display: none !important; }",
        ".tawk-toolbar-title { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); margin: 0 !important; color: #14161a !important; font-size: 18px !important; font-weight: 600 !important; }",

        /* home: one solid brand block behind the logo and greeting, cards overlap its bottom edge */
        ".tawk-home-view .tawk-chat-panel { background: #fff !important; padding-top: 0 !important; }",
        ".tawk-home-view .tawk-chat-panel-inner { padding: 0 20px 100px !important; }",
        ".tawk-home-view #tawk-body > :first-child:has(.header-card) { position: relative; margin: 0 -20px; padding: 38px 20px 56px; background: " + TAWK_BRAND + "; }",
        ".tawk-home-view #tawk-body > :first-child:has(.header-card)::before { content: ''; position: absolute; left: 0; right: 0; bottom: 100%; height: 200px; background: " + TAWK_BRAND + "; }",
        ".tawk-home-view #tawk-body > :first-child:has(.header-card) + * { position: relative; margin-top: -40px !important; }",
        ".tawk-home-view .header-card { margin: 0 !important; }",
        ".tawk-home-view .card--heading::before { content: 'WizLeads'; display: block; height: 32px; line-height: 32px; padding-left: 42px; margin-bottom: 72px; color: #fff; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; background: url('" + location.origin + "/favicons/favicon-white.svg') no-repeat left center / 28px; }",
        ".tawk-home-view .card--heading .tawk-header-text { background: transparent !important; padding: 0 !important; color: rgba(255,255,255,0.6) !important; font-size: 24px !important; line-height: 30px !important; font-weight: 600 !important; letter-spacing: -0.02em; }",
        ".tawk-home-view .card--heading .tawk-header-text::after { content: 'How can we help? \\1F680'; display: block; color: #fff; }",
        ".tawk-home-view .card--text .tawk-header-text { background: transparent !important; color: rgba(255,255,255,0.8) !important; font-size: 14px !important; line-height: 21px !important; }",
        ".tawk-home-view .card-container { margin: 0; }",

        /* cards */
        ".tawk-card.tawk-card-inverse.tawk-box-shadow-xsmall, .tawk-card.tawk-home-kb-card, .tawk-form-input { background: #fff !important; border-radius: 12px !important; border: 1px solid #ededed !important; box-shadow: 0 4px 28px rgba(9,14,21,0.06), 0 1px 4px rgba(9,14,21,0.06) !important; }",
        ".card--chat { display: flex !important; align-items: center; padding: 16px 20px !important; margin-top: 10px !important; cursor: pointer; transition: background-color 150ms !important; }",
        ".card--chat .tawk-flex-1 { display: block !important; flex: 1 1 auto; min-width: 0; }",
        ".card--chat p { margin: 0 !important; }",
        ".card--chat:hover { background: #fafafa !important; }",
        ".card--chat p:first-child { color: #14161a !important; font-size: 14px !important; font-weight: 600 !important; line-height: 20px !important; }",
        ".card--chat p:last-child { color: #6c6f74 !important; font-size: 14px !important; line-height: 21px !important; }",
        ".card--chat svg, .tawk-message-tile svg { width: 20px !important; height: 20px !important; color: " + TAWK_BRAND + " !important; fill: " + TAWK_BRAND + "; }",

        /* home "Recent Conversations" card: same rows as the messages list */
        ".tawk-home-kb-card { padding: 16px 20px !important; }",
        ".tawk-home-card-title { color: #14161a !important; font-size: 14px !important; font-weight: 600 !important; line-height: 20px !important; margin: 0 0 4px !important; }",
        ".tawk-home-list-chat li { display: grid !important; grid-template-columns: 40px 1fr; column-gap: 16px; align-items: center; padding: 10px 0 !important; margin: 0 !important; cursor: pointer; }",
        ".tawk-home-list-chat li + li { border-top: 1px solid #ededed; }",
        ".tawk-home-list-chat li:hover { background: #fafafa !important; box-shadow: none !important; }",
        ".tawk-home-list-chat li:hover *, .tawk-home-list-chat-content, .tawk-home-list-chat-content:hover, .tawk-home-list-hover li:hover > * { background: transparent !important; box-shadow: none !important; }",
        ".tawk-home-list-chat li::before { content: ''; display: block !important; width: 40px; height: 40px; border-radius: 50%; background: var(--wl-agent-bg) var(--wl-agent) no-repeat center / var(--wl-agent-size); }",
        ".tawk-home-list-chat-content { min-width: 0; }",
        ".tawk-home-list-chat .tawk-text-grey-5 { display: flex; justify-content: space-between; gap: 12px; color: #14161a !important; font-size: 14px !important; line-height: 21px !important; margin: 0 !important; }",
        ".tawk-home-list-chat .tawk-timeago { color: #6c6f74 !important; font-size: 14px !important; flex: none; }",
        ".tawk-home-list-chat .tawk-message-text, .tawk-home-list-chat .tawk-message-text * { color: #6c6f74 !important; font-size: 14px !important; line-height: 21px !important; white-space: nowrap !important; }",
        ".tawk-home-list-chat .tawk-message-text { overflow: hidden; text-overflow: ellipsis; margin: 0 !important; }",

        /* home "Help Center" card: Intercom's grey search field with the icon on the right */
        ".tawk-search-wrapper { display: flex !important; align-items: center; height: 48px; margin-top: 8px !important; padding: 0 !important; border: 0 !important; border-radius: 10px !important; background: #f5f5f5 !important; transition: box-shadow 150ms; }",
        ".tawk-search-wrapper:focus-within { box-shadow: inset 0 0 0 2px " + TAWK_BRAND + "; }",
        ".tawk-search-wrapper .tawk-input { order: 1; flex: 1; min-width: 0; height: 48px !important; padding: 0 0 0 16px !important; border: 0 !important; border-radius: 10px !important; background: transparent !important; color: #14161a !important; font-size: 14px !important; font-weight: 600 !important; outline: 0 !important; box-shadow: none !important; }",
        ".tawk-search-wrapper .tawk-input::placeholder { color: #14161a !important; font-size: 14px !important; font-weight: 600 !important; opacity: 1; }",
        ".tawk-search-wrapper .tawk-search-button { order: 2; position: static !important; width: 48px !important; height: 48px !important; padding: 0 !important; margin: 0 !important; display: flex !important; align-items: center; justify-content: center; transform: none !important; background: transparent !important; color: " + TAWK_BRAND + " !important; }",
        ".tawk-search-wrapper .tawk-search-button svg { width: 18px !important; height: 18px !important; }",

        /* bottom nav: 81px, icon above a label, brand colour when active */
        ".tawk-footer { background: #fff !important; border-radius: 0 !important; }",
        ".tawk-footer:has(.tawk-bottom-navbar) { border-top: 1px solid #ededed; box-shadow: 0 0 25px rgba(9,14,21,0.06); padding: 0 !important; }",
        ".tawk-bottom-navbar { height: 80px; display: flex; align-items: stretch; }",
        ".tawk-bottom-navbar > div { flex: 1; display: flex; }",
        ".tawk-bottom-navbar button { flex: 1; display: flex !important; flex-direction: column; align-items: center; justify-content: center; gap: 4px; height: auto !important; padding: 18px 3px !important; border-radius: 0 !important; color: #6c6f74 !important; background: transparent !important; transition: color 250ms !important; }",
        ".tawk-bottom-navbar button svg { width: 24px !important; height: 24px !important; }",
        ".tawk-bottom-navbar button::after { content: attr(aria-label); font-size: 14px; font-weight: 600; line-height: 20px; }",
        ".tawk-bottom-navbar .tawk-nav-active, .tawk-bottom-navbar .tawk-nav-active svg { color: " + TAWK_BRAND + " !important; }",

        /* messages screen: plain rows, and the new-chat tile becomes a floating brand button */
        ".tawk-message-view .tawk-chat-panel { background: #fff !important; }",
        ".tawk-message-view .tawk-chat-panel-inner { padding: 0 0 100px !important; min-height: 100%; box-sizing: border-box; }",
        ".tawk-message-view .tawk-body { display: flex; flex-direction: column; flex: 1 0 auto !important; margin: 0 !important; }",
        ".tawk-message-view .tawk-message-title { display: none !important; }",
        ".tawk-message-view .tawk-recents-message-section { order: 1; }",
        ".tawk-message-view .tawk-message-section { order: 2; margin-top: auto; padding: 16px 0 20px; display: flex; justify-content: center; }",
        // the class is repeated to outrank tawk's own five-class card rule
        ".tawk-message-tile.tawk-message-tile.tawk-message-tile.tawk-message-tile.tawk-message-tile.tawk-message-tile { display: inline-flex !important; flex: 0 0 auto !important; width: auto !important; max-width: none !important; align-self: center; margin: 0 !important; padding: 10px 16px !important; border-radius: 10px !important; border: 0 !important; background: " + TAWK_BRAND + " !important; box-shadow: 0 0 25px rgba(9,14,21,0.06), 0 4px 10px rgba(9,14,21,0.1) !important; display: inline-flex !important; align-items: center; gap: 10px; cursor: pointer; transition: transform 150ms, filter 150ms !important; }",
        ".tawk-message-tile:hover { filter: brightness(1.08); }",
        /* a finished chat offers "New Conversation" in its footer; same brand button */
        ".tawk-max-footer-actions { display: flex; justify-content: center; padding: 8px 0 4px; }",
        ".tawk-max-footer-actions-button { width: auto !important; background: " + TAWK_BRAND + " !important; border: 0 !important; color: #fafafa !important; border-radius: 10px !important; font-size: 14px !important; font-weight: 600 !important; padding: 10px 16px !important; box-shadow: 0 0 25px rgba(9,14,21,0.06), 0 4px 10px rgba(9,14,21,0.1) !important; }",
        ".tawk-max-footer-actions-button svg { color: #fafafa !important; fill: #fafafa; width: 16px !important; height: 16px !important; }",
        ".tawk-message-tile-content, .tawk-message-tile > div, .card--chat > div { display: flex !important; align-items: center; }",
        ".tawk-message-tile svg, .card--chat svg { display: block; }",
        ".tawk-message-tile-title { color: #fafafa !important; font-size: 14px !important; font-weight: 600 !important; line-height: 20px !important; margin: 0 !important; }",
        ".tawk-message-tile-subtitle { display: none !important; }",
        ".tawk-message-tile svg { color: #fafafa !important; fill: #fafafa; width: 16px !important; height: 16px !important; }",
        /* rows: 40px avatar, name and time on one line, one-line preview, inset separators */
        ".tawk-message-item { display: grid !important; grid-template-columns: 40px 1fr; column-gap: 16px; align-items: center; margin: 0 20px !important; padding: 16px 3px !important; border-bottom: 1px solid #ededed; border-radius: 0 !important; cursor: pointer; transition: background-color 150ms; }",
        /* one flat hover tint on the row; tawk also tints the inner box, which read as a shadow */
        ".tawk-message-item:hover { background: #fafafa !important; }",
        ".tawk-message-item:hover *, .tawk-message-item-content, .tawk-message-item-content:hover, .tawk-message-item-header, .tawk-message-item-body { background: transparent !important; box-shadow: none !important; }",
        ".tawk-message-item::before { content: ''; width: 40px; height: 40px; border-radius: 50%; background: var(--wl-agent-bg) var(--wl-agent) no-repeat center / var(--wl-agent-size); }",
        ".tawk-message-item-content { padding: 0 !important; margin: 0 !important; min-width: 0; }",
        ".tawk-message-item-header { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }",
        ".tawk-message-item-name { color: #14161a !important; font-size: 14px !important; font-weight: 400 !important; line-height: 21px !important; }",
        ".tawk-message-item-time { color: #6c6f74 !important; font-size: 14px !important; line-height: 21px !important; flex: none; }",
        ".tawk-message-item-header, .tawk-message-item-body { margin: 0 !important; padding: 0 !important; }",
        ".tawk-message-item-body { min-width: 0; }",
        ".tawk-message-item-text, .tawk-message-item-text * { color: #6c6f74 !important; font-size: 14px !important; line-height: 21px !important; white-space: nowrap !important; }",
        ".tawk-message-item-text { overflow: hidden; text-overflow: ellipsis; margin: 0 !important; }",
        ".tawk-message-item-text > span { display: block; overflow: hidden; text-overflow: ellipsis; }",

        /* conversation: grey agent bubbles, brand visitor bubbles; the agent's photo sits
           beside the bubble, with "Name • time" under it, as in Intercom */
        ".tawk-chat-view .tawk-chat-panel { background: #fff !important; }",
        ".tawk-chat-view .tawk-chat-panel-inner { padding: 0 16px 16px !important; }",
        /* messages start at the top, as in Intercom, instead of being pushed to the bottom */
        ".tawk-chat-view .tawk-body { margin-top: 0 !important; }",
        ".tawk-chat-bubble { border-radius: 20px !important; padding: 10px 14px !important; font-size: 14px !important; line-height: 1.45 !important; max-width: 312px; }",
        ".tawk-chat-bubble p { margin: 0 !important; }",
        ".tawk-chat-bubble p + p, .tawk-chat-bubble br + br { margin-top: 10px !important; }",
        ".tawk-messages > .tawk-visitor + .tawk-visitor, .tawk-messages > .tawk-agent + .tawk-agent { margin-top: 4px; }",
        /* stacked messages from one side share flattened corners where they meet, as in Intercom */
        ".tawk-messages > .tawk-visitor:not(:only-child):first-child .tawk-chat-bubble { border-bottom-right-radius: 6px !important; }",
        ".tawk-messages > .tawk-visitor:not(:first-child):not(:last-child) .tawk-chat-bubble { border-top-right-radius: 6px !important; border-bottom-right-radius: 6px !important; }",
        ".tawk-messages > .tawk-visitor:not(:only-child):last-child .tawk-chat-bubble { border-top-right-radius: 6px !important; }",
        ".tawk-messages > .tawk-agent:not(:only-child):first-child .tawk-chat-bubble { border-bottom-left-radius: 6px !important; }",
        ".tawk-messages > .tawk-agent:not(:first-child):not(:last-child) .tawk-chat-bubble { border-top-left-radius: 6px !important; border-bottom-left-radius: 6px !important; }",
        ".tawk-messages > .tawk-agent:not(:only-child):last-child .tawk-chat-bubble { border-top-left-radius: 6px !important; }",
        ".tawk-agent-chat-bubble, .tawk-agent-chat-bubble-dots { background: #f5f5f5 !important; color: #14161a !important; }",
        ".tawk-agent-chat-bubble a { color: #14161a !important; text-decoration: underline; }",
        ".tawk-visitor-chat-bubble { background: " + TAWK_BRAND + " !important; color: #fff !important; }",
        ".tawk-visitor-chat-bubble a { color: #fff !important; }",
        ".tawk-message-block { align-items: flex-end !important; margin-bottom: 16px !important; }",
        ".tawk-message-profile, .tawk-message-profile .tawk-avatar-image, .tawk-message-profile img { width: 32px !important; height: 32px !important; }",
        ".tawk-message-profile { margin: 0 8px 22px 0 !important; }",
        ".tawk-avatar, .tawk-avatar-image, .tawk-avatar img { border-radius: 50% !important; overflow: hidden; }",
        ".tawk-agent { display: grid; grid-template-columns: minmax(0, 1fr); }",
        ".tawk-agent .tawk-message-bubble { order: 1; }",
        /* inside the grid tawk's row shrank to one letter per line; size the bubble to its text */
        ".tawk-agent-chat { width: 100% !important; max-width: none !important; }",
        ".tawk-agent-chat .tawk-message-body { flex: 0 1 auto !important; min-width: 0; max-width: 312px !important; }",
        ".tawk-chat-bubble { width: max-content; box-sizing: border-box; }",
        ".tawk-chat-name-margin { order: 2; justify-self: start; margin: 6px 0 0 16px !important; color: #6c6f74 !important; font-size: 12px !important; line-height: 16px !important; }",
        ".tawk-chat-name-margin[data-wl-time]::after { content: ' \u2022 ' attr(data-wl-time); }",
        ".tawk-agent-chat .tawk-flex-none { display: none !important; }",
        /* visitor rows: bubble on top, time under it, both hugging the right edge */
        ".tawk-visitor-chat { display: grid !important; grid-template-columns: minmax(0, 1fr); justify-items: end; width: 100% !important; max-width: none !important; }",
        ".tawk-visitor-chat .tawk-message-body { width: fit-content; max-width: 312px !important; min-width: 0; margin: 0 !important; }",
        /* the time shows only under the visitor's latest message, like Intercom's "Seen • Just now" */
        ".tawk-visitor-chat .tawk-flex-none { display: none !important; order: 2; text-align: right; margin: 6px 16px 0 0; }",
        ".tawk-chat-message-container > .tawk-message-block:nth-last-child(1 of :has(.tawk-visitor)) .tawk-visitor:last-child .tawk-visitor-chat .tawk-flex-none { display: block !important; }",
        ".tawk-timeago { color: #6c6f74 !important; font-size: 12px !important; line-height: 16px !important; }",
        /* pre-chat heading inside the conversation screen */
        ".tawk-chat-view .header-card .tawk-header-text { background: transparent !important; color: #14161a !important; font-size: 22px !important; font-weight: 600 !important; line-height: 1.25 !important; letter-spacing: -0.02em; }",
        ".tawk-chat-view .card--text .tawk-header-text { color: #6c6f74 !important; font-size: 14px !important; font-weight: 400 !important; line-height: 21px !important; }",

        /* composer: Intercom's 16px box, text on top, tools below left, round send button right */
        /* Intercom's composer: 16px from the sides and the bottom, nothing else around it */
        ".tawk-footer:has(.tawk-chatinput) { border-top: 0 !important; padding: 0 16px 16px !important; margin: 0 !important; }",
        ".tawk-footer:has(.tawk-chatinput) > div, #tawk-chatinput-container { padding: 0 !important; margin: 0 !important; }",
        /* nothing but the composer's own border changes on focus: no bands, shadows or lines around it */
        ".tawk-footer:has(.tawk-chatinput), .tawk-footer:has(.tawk-chatinput) > div, #tawk-chatinput-container, .tawk-chat-view .tawk-chat-panel, .tawk-chat-view .tawk-chat-panel-inner, .tawk-max-content { background: #fff !important; box-shadow: none !important; border: 0 !important; outline: 0 !important; }",
        ".tawk-footer::before, .tawk-footer::after, .tawk-chat-panel::before, .tawk-chat-panel::after, .tawk-chatinput::before, .tawk-chatinput::after { display: none !important; }",
        ".tawk-chatinput-editor:focus { outline: 0 !important; box-shadow: none !important; }",
        ".tawk-chatinput { box-sizing: border-box; width: auto !important; margin: 0 !important; padding: 12px 16px; border: 1px solid #ededed; border-radius: 16px; background: #fff; transition: border-color 150ms, box-shadow 150ms; }",
        ".tawk-chatinput:focus-within { border-color: " + TAWK_BRAND + "; box-shadow: inset 0 0 0 1px " + TAWK_BRAND + "; }",
        ".tawk-chatinput-wrap { flex-wrap: wrap !important; }",
        ".tawk-chatinput-editor { flex: 1 0 100% !important; width: 100% !important; box-sizing: border-box; font-size: 14px !important; line-height: 21px !important; min-height: 21px !important; margin: 0 0 6px !important; padding: 0 !important; color: #14161a !important; background: transparent !important; }",
        ".tawk-chatinput-editor::placeholder { color: #6c6f74 !important; }",
        ".tawk-chatinput-action-buttons { position: static !important; flex: 1 1 auto; display: flex !important; align-items: center; gap: 12px; margin: 0 !important; }",
        /* while typing, tawk adds its own send button after the tool row; it becomes the round
           brand button and the grey placeholder one hides */
        ".tawk-chatinput-send-container { position: static !important; flex: none; margin-left: auto; align-self: center; display: flex; }",
        ".tawk-chatinput-send { width: 32px !important; height: 32px !important; padding: 0 !important; border: 0 !important; border-radius: 50% !important; background: " + TAWK_BRAND + " !important; color: #fff !important; display: flex !important; align-items: center; justify-content: center; }",
        ".tawk-chatinput-send svg { width: 16px !important; height: 16px !important; color: #fff !important; fill: #fff !important; }",
        ".tawk-chatinput-wrap:has(.tawk-chatinput-send) .wl-send { display: none; }",
        ".tawk-chatinput-button { color: #6c6f74 !important; width: 24px !important; height: 24px !important; padding: 4px !important; margin: 0 !important; }",
        /* tawk hides the attach button while typing; Intercom keeps it */
        ".tawk-chatinput-action-buttons.active .tawk-chatinput-button { display: inline-flex !important; opacity: 1 !important; transform: none !important; }",
        /* tawk swaps the attach icon for a 7px one while typing, so one paperclip is drawn here for both states */
        ".tawk-chatinput-button svg { display: none !important; }",
        ".tawk-chatinput-button::before { content: ''; display: block; width: 16px; height: 16px; background: currentColor; -webkit-mask: url(\"data:image/svg+xml," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48'/></svg>") + "\") center / contain no-repeat; mask: url(\"data:image/svg+xml," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48'/></svg>") + "\") center / contain no-repeat; }",
        ".tawk-chatinput-button { display: inline-flex !important; align-items: center; justify-content: center; }",
        /* the emoji button gets a smiley instead of the paperclip */
        ".tawk-chatinput-button[aria-label='Insert emoji']::before { -webkit-mask-image: url(\"data:image/svg+xml," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='9.5'/><path d='M8 14.5s1.5 2 4 2 4-2 4-2'/><path d='M9 9.5h.01M15 9.5h.01' stroke-width='2.6'/></svg>") + "\"); mask-image: url(\"data:image/svg+xml," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='9.5'/><path d='M8 14.5s1.5 2 4 2 4-2 4-2'/><path d='M9 9.5h.01M15 9.5h.01' stroke-width='2.6'/></svg>") + "\"); }",
        ".tawk-chatinput-button svg { width: 16px !important; height: 16px !important; }",
        ".wl-send { margin-left: auto; width: 32px; height: 32px; border-radius: 50%; border: 0; padding: 0; display: flex; align-items: center; justify-content: center; background: rgba(9,14,21,0.1); color: #d6d6d6; cursor: pointer; transition: background-color 150ms, color 150ms; }",
        ".wl-send svg { width: 16px; height: 16px; }",
        ".tawk-chatinput:has(.tawk-chatinput-editor:not(:placeholder-shown)) .wl-send { background: " + TAWK_BRAND + "; color: #fff; }",

        /* emoji picker: Intercom's popover, a search row with an icon, small caps section labels, a roomy grid */
        ".tawk-chatinput-emojis { left: 0 !important; right: 0 !important; width: 100% !important; max-width: none !important; min-width: 0 !important; margin: 0 !important; bottom: calc(100% + 8px) !important; padding: 0 !important; box-sizing: border-box; }",
        ".tawk-emoji-picker { max-width: none !important; min-width: 0 !important; }",
        /* tawk's focus ring on the picker is a blue border plus a blue shadow, not an outline */
        ".tawk-emoji-picker.tawk-outline:focus, .tawk-emoji-picker.tawk-outline:focus-visible, .tawk-emoji-picker:focus-within { outline: 0 !important; border: 0 !important; box-shadow: 0 4px 28px rgba(9,14,21,0.12), 0 1px 4px rgba(9,14,21,0.08) !important; }",
        ".tawk-emoji-picker .tawk-outline:focus, .tawk-emoji-picker .tawk-outline:focus-visible { outline: 0 !important; border-color: transparent !important; box-shadow: none !important; }",
        ".tawk-emoji-picker .tawk-emoji:focus-visible { background: #f5f5f5 !important; }",
        ".tawk-emoji-picker { width: 100% !important; height: 260px !important; box-sizing: border-box; padding: 8px 8px 0 !important; border: 0 !important; border-radius: 12px !important; background: #fff !important; box-shadow: 0 4px 28px rgba(9,14,21,0.12), 0 1px 4px rgba(9,14,21,0.08) !important; flex-direction: column; overflow: hidden; }",
        /* flex only while shown: tawk closes the picker with an inline display: none, which must win */
        ".tawk-emoji-picker:not([style*='display: none']) { display: flex !important; }",
        ".tawk-emoji-group { display: none !important; }",
        ".tawk-emoji-search-container { flex: none; padding: 0 8px 8px !important; margin: 0 !important; border-bottom: 1px solid #ededed; }",
        ".tawk-emoji-search-container .tawk-form-wrapper { position: relative; margin: 0 !important; }",
        ".tawk-emoji-search-container .tawk-form-label { display: none !important; }",
        ".tawk-emoji-search-container .tawk-input { height: 36px !important; padding: 0 0 0 30px !important; border: 0 !important; border-radius: 0 !important; background: transparent url(\"data:image/svg+xml," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236c6f74' stroke-width='2.2' stroke-linecap='round'><circle cx='11' cy='11' r='7'/><path d='M20 20l-3.5-3.5'/></svg>").replace('%25236c6f74', '%236c6f74') + "\") no-repeat 2px center / 18px !important; font-size: 15px !important; color: #14161a !important; box-shadow: none !important; outline: 0 !important; }",
        ".tawk-emoji-search-container .tawk-input::placeholder { color: #6c6f74 !important; opacity: 1 !important; }",
        ".tawk-emoji-sticky-header { margin: 0 !important; padding: 10px 12px 4px !important; background: #fff !important; color: #6c6f74 !important; font-size: 11px !important; font-weight: 600 !important; letter-spacing: 0.06em; text-transform: uppercase; }",
        ".tawk-emoji-scroll { flex: 1; min-height: 0; overflow-y: auto !important; padding: 0 4px 8px !important; }",
        ".tawk-emoji-scroll > div { display: grid !important; grid-template-columns: repeat(7, 1fr); }",
        ".tawk-emoji-scroll h4, .tawk-emoji-scroll [class*=header] { grid-column: 1 / -1; margin: 0 !important; padding: 10px 8px 4px !important; color: #6c6f74 !important; font-size: 11px !important; font-weight: 600 !important; letter-spacing: 0.06em; text-transform: uppercase; }",
        ".tawk-emoji { width: auto !important; height: 40px !important; margin: 0 !important; padding: 0 !important; border: 0 !important; border-radius: 8px !important; background: transparent !important; display: flex !important; align-items: center; justify-content: center; cursor: pointer; transition: background-color 120ms; }",
        ".tawk-emoji:hover, .tawk-emoji:focus { background: #f5f5f5 !important; }",
        ".tawk-emoji img, .tawk-emoji .emojionly img { width: 26px !important; height: 26px !important; }",
        ".tawk-chatinput-button[aria-label='Insert emoji'][aria-expanded='true'], .tawk-chatinput-button.wl-emoji-open { color: " + TAWK_BRAND + " !important; }",

        /* pre-chat form */
        ".tawk-custom-border-left { border-left: 1px solid #ededed !important; }",
        ".tawk-form-wrapper input, .tawk-form-wrapper textarea { border-radius: 10px !important; border: 1px solid #ededed !important; font-size: 14px !important; transition: border-color 150ms !important; }",
        ".tawk-form-wrapper input:focus, .tawk-form-wrapper textarea:focus { border-color: " + TAWK_BRAND + " !important; box-shadow: inset 0 0 0 1px " + TAWK_BRAND + " !important; outline: none !important; }",
        ".tawk-form-label { color: #6c6f74 !important; font-size: 13px !important; }",
        ".tawk-form-footer .tawk-button, .tawk-button-primary { background: " + TAWK_BRAND + " !important; border: 0 !important; color: #fafafa !important; border-radius: 10px !important; font-size: 14px !important; font-weight: 600 !important; padding: 10px 16px !important; transition: filter 150ms !important; }",
        ".tawk-form-footer .tawk-button:hover { filter: brightness(1.08); }",
        ".tawk-form-footer .tawk-button p, .tawk-form-footer .tawk-button svg { color: #fafafa !important; fill: #fafafa; }",

        /* screen changes: Intercom pushes screens sideways, 150ms out then 150ms in */
        ".slide-fade-enter-active { transition: opacity 150ms ease-out 150ms, transform 150ms ease-out 150ms !important; }",
        ".slide-fade-leave-active { transition: opacity 150ms ease-out, transform 150ms ease-out !important; }",
        ".slide-fade-enter-from { opacity: 0 !important; transform: translateX(24px) !important; }",
        ".slide-fade-leave-to { opacity: 0 !important; transform: translateX(-24px) !important; }",
        "@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }"
    ].join("\n");

    // The chat frame's size, offset and shadow are inline !important styles set by tawk, so
    // they are overridden the same way. Intercom's sizing: 400 wide, and 704 tall or the
    // window height less 104px, whichever is smaller; 84px up, 16px above the 48px launcher.
    // Below 768px styles.css turns the frame's wrapper into a floating card, and the frame
    // just fills it. Those values match tawk's own full-screen ones (100%, 0px), so when tawk
    // re-applies its styles nothing changes and the two never fight.
    function sizeTawkFrame(f) {
        var set = function(prop, val) { if (f.style.getPropertyValue(prop) !== val) f.style.setProperty(prop, val, 'important'); };
        if (window.innerWidth < 768) {
            ['width', 'min-width', 'max-width', 'height', 'min-height', 'max-height'].forEach(function(p) { set(p, '100%'); });
            ['top', 'right', 'bottom', 'left'].forEach(function(p) { set(p, '0px'); });
            set('border-radius', '0px');
            set('box-shadow', 'none');
            return;
        }
        var h = Math.max(440, Math.min(704, window.innerHeight - 104)) + 'px';
        ['width', 'min-width', 'max-width'].forEach(function(p) { set(p, '400px'); });
        ['height', 'min-height', 'max-height'].forEach(function(p) { set(p, h); });
        set('bottom', '84px');
        set('border-radius', '24px');
        set('box-shadow', 'rgba(9, 14, 21, 0.16) 0px 5px 40px 0px');
    }

    // tawk only renders an agent's photo beside their messages and in a live chat's
    // header. Learn each agent's photo from there, keyed by name, so the messages list
    // and the header of a finished chat can show the right agent. Where the agent is
    // unknown (a row whose last message is the visitor's, an automated message), the
    // brand mark stands in.
    var AGENT_KEY = 'wl_tawk_agents';
    function agentPhoto(d) {
        var map = {};
        try { map = JSON.parse(localStorage.getItem(AGENT_KEY) || '{}'); } catch (e) {}
        var learn = function(name, img) {
            // tawk's trigger image (the WizLeads logo) carries the same alt text as real photos
            if (name && img && img.src && img.src.indexOf('trigger-images') === -1) map[name] = img.src;
        };
        d.querySelectorAll('.tawk-message-block').forEach(function(b) {
            var n = b.querySelector('.tawk-chat-name-margin');
            learn(n && n.textContent.trim(), b.querySelector('img[alt="Agent profile image"]'));
        });
        d.querySelectorAll('.tawk-toolbar-agent-avatars').forEach(function(h) {
            var n = h.querySelector('.tawk-toolbar-agent-name');
            learn(n && n.textContent.trim(), h.querySelector('.tawk-avatar img'));
        });
        try { localStorage.setItem(AGENT_KEY, JSON.stringify(map)); } catch (e) {}
        var apply = function(el, name) {
            var src = map[name];
            el.style.setProperty('--wl-agent', 'url("' + (src || 'https://wizleads.io/favicons/favicon-white.svg') + '")');
            el.style.setProperty('--wl-agent-bg', src ? '#f5f5f5' : TAWK_BRAND);
            el.style.setProperty('--wl-agent-size', src ? 'cover' : '22px');
        };
        d.querySelectorAll('.tawk-toolbar-agent-avatars').forEach(function(h) {
            var n = h.querySelector('.tawk-toolbar-agent-name');
            apply(h, n && n.textContent.trim());
        });
        d.querySelectorAll('.tawk-toolbar-agent-name[data-wl-filled]').forEach(function(p) { apply(p, p.textContent.trim()); });
        d.querySelectorAll('.tawk-message-item').forEach(function(row) {
            var n = row.querySelector('.tawk-message-item-name');
            apply(row, n && n.textContent.trim());
        });
        // home card rows read "Judy (2 minutes ago)": drop the brackets so the time can sit
        // on the right like the messages list; the name is what is left before the <time>
        d.querySelectorAll('.tawk-home-list-chat li').forEach(function(li) {
            var n = li.querySelector('.tawk-text-grey-5');
            if (!n) return;
            n.childNodes.forEach(function(t) {
                if (t.nodeType === 3 && /[()]/.test(t.nodeValue)) t.nodeValue = t.nodeValue.replace(/[()]/g, '').trim();
            });
            apply(li, (n.firstChild && n.firstChild.nodeType === 3 ? n.firstChild.nodeValue : n.textContent.split('(')[0]).trim());
        });
    }

    // tawk drops its "New Conversation" card from the home screen once a recent chat exists.
    // Intercom keeps a "Send us a message" card under the recent one, so add our own, which
    // does what tawk's card does: open the messages screen and press its new-conversation tile.
    function newChatCard(d) {
        d.querySelectorAll('.tawk-home-view').forEach(function(view) {
            if (!view.querySelector('.tawk-home-kb-card') || view.querySelector('.card--chat')) return;
            var slot = view.querySelector('.card-container:empty');
            if (!slot) return;
            var card = d.createElement('div');
            card.className = 'tawk-card tawk-card-inverse tawk-box-shadow-xsmall card--chat wl-new-chat';
            card.setAttribute('role', 'button');
            card.tabIndex = 0;
            card.innerHTML = '<div class="tawk-flex-1"><p>Send us a message</p><p>We typically reply in a few minutes</p></div>' +
                '<div><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"/></svg></div>';
            var go = function() {
                var nav = d.querySelector('.tawk-bottom-navbar button[aria-label="Messages"]');
                if (!nav) return;
                nav.click();
                var tries = 0, t = setInterval(function() {
                    var tile = d.querySelector('.tawk-message-view .tawk-message-tile');
                    if (tile || ++tries > 20) { clearInterval(t); if (tile) tile.click(); }
                }, 100);
            };
            card.addEventListener('click', go);
            card.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
            slot.appendChild(card);
        });
    }

    // Intercom's composer has a send button and a plain "Message..." placeholder; tawk has
    // neither (it sends on Enter), so both are added. Under each agent message the time is
    // copied onto the name, which the stylesheet renders as "Name • time".
    function composer(d) {
        // tawk's emoji picker only closes from its own button; close it on a click outside or Esc too
        if (!d.wlEmojiClose) {
            d.wlEmojiClose = true;
            var closePicker = function() {
                var open = Array.prototype.some.call(d.querySelectorAll('.tawk-emoji-picker'), function(p) { return p.getBoundingClientRect().height > 0; });
                if (!open) return false;
                var btn = Array.prototype.filter.call(d.querySelectorAll('.tawk-chatinput-button[aria-label="Insert emoji"]'), function(b) { return b.getBoundingClientRect().width > 0; })[0];
                if (btn) btn.click();
                return true;
            };
            d.addEventListener('mousedown', function(e) {
                if (e.target.closest && !e.target.closest('.tawk-chatinput-emojis, .tawk-chatinput-button[aria-label="Insert emoji"]')) closePicker();
            }, true);
            // Esc closes just the picker; tawk would otherwise minimise the whole chat
            // registered on the frame's window, whose capture phase runs before tawk's own handlers
            (d.defaultView || d).addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && closePicker()) { e.preventDefault(); e.stopImmediatePropagation(); }
            }, true);
        }
        d.querySelectorAll('.tawk-search').forEach(function(i) { if (i.placeholder !== 'Search for help') i.placeholder = 'Search for help'; });
        d.querySelectorAll('.tawk-emoji-search-container .tawk-input').forEach(function(i) { if (i.placeholder !== 'Search emoji\u2026') i.placeholder = 'Search emoji\u2026'; });
        d.querySelectorAll('.tawk-chatinput').forEach(function(box) {
            var ta = box.querySelector('.tawk-chatinput-editor');
            if (ta && ta.placeholder !== 'Message\u2026') ta.placeholder = 'Message\u2026';
            var row = box.querySelector('.tawk-chatinput-action-buttons');
            if (!ta || !row || row.querySelector('.wl-send')) return;
            var btn = d.createElement('button');
            btn.type = 'button';
            btn.className = 'wl-send';
            btn.setAttribute('aria-label', 'Send');
            btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
            btn.addEventListener('click', function() {
                if (!ta.value.trim()) { ta.focus(); return; }
                ta.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
            });
            row.appendChild(btn);
        });
        d.querySelectorAll('.tawk-agent').forEach(function(m) {
            var name = m.querySelector('.tawk-chat-name-margin'), time = m.querySelector('.tawk-timeago');
            if (name && time && name.getAttribute('data-wl-time') !== time.textContent.trim()) name.setAttribute('data-wl-time', time.textContent.trim());
        });
        // tawk blanks the header's agent once nobody is assigned; keep the last agent who wrote
        var names = Array.prototype.map.call(d.querySelectorAll('.tawk-agent .tawk-chat-name-margin'), function(n) { return n.textContent.trim(); })
            .filter(function(n) { return n && n !== 'WizLeads Support'; });
        var last = names[names.length - 1];
        var status = { online: 'Online now', away: 'Away', offline: 'Offline' }[(window.Tawk_API && Tawk_API.getStatus && Tawk_API.getStatus()) || ''] || '';
        d.querySelectorAll('.tawk-toolbar-agent-name').forEach(function(p) {
            if (!p.textContent.trim() && last) { p.textContent = last; p.setAttribute('data-wl-filled', ''); }
            if (p.hasAttribute('data-wl-filled') && status && p.getAttribute('data-wl-status') !== status) p.setAttribute('data-wl-status', status);
        });
        d.querySelectorAll('.tawk-toolbar-agent-title').forEach(function(t) {
            if (!t.textContent.trim() && status) t.textContent = status;
        });
    }

    // tawk marks the chat frame "open"/"closed" when it animates it, but not when it builds
    // the frame on first use or restores it open on load. Mark it open ourselves once its
    // content is there, so the wrapper (hidden until then, see styles.css) shows with the
    // open animation instead of popping in empty.
    // The launcher frame is 64x60 with the button flush to its corner, which would clip the
    // glow; 8px is added on each side and the frame moved out by the same, so the button
    // still sits 20px from the page edges.
    function sizeMinFrame(f) {
        ['width', 'min-width', 'max-width'].forEach(function(k) { f.style.setProperty(k, '72px', 'important'); });
        ['height', 'min-height', 'max-height'].forEach(function(k) { f.style.setProperty(k, '68px', 'important'); });
        f.style.setProperty('inset', 'auto 12px 12px auto', 'important');
    }

    function markOpen(f) {
        if (!f || f.parentElement.id !== 'max-widget' || f.classList.contains('open') || f.classList.contains('closed')) return;
        var d; try { d = f.contentDocument; } catch (e) { return; }
        if (d && d.querySelector('.tawk-max-container') && window.Tawk_API && Tawk_API.isChatMaximized && Tawk_API.isChatMaximized()) f.classList.add('open');
    }

    function styleTawk() {
        document.querySelectorAll('iframe[title="Chat widget"]').forEach(function(f) {
            // a frame can load a fresh document later (its srcdoc), which drops the style
            if (!f.wlTawk) { f.wlTawk = true; f.addEventListener('load', styleTawk); }
            if (f.parentElement && f.parentElement.id === 'max-widget') { sizeTawkFrame(f); markOpen(f); }
            if (f.parentElement && f.parentElement.id === 'min-widget') sizeMinFrame(f);
            var d;
            try { d = f.contentDocument; } catch (e) { return; }
            if (!d || !d.head) return;
            var open = !!(window.Tawk_API && Tawk_API.isChatMaximized && Tawk_API.isChatMaximized());
            if (d.documentElement.classList.contains('wl-open') !== open) d.documentElement.classList.toggle('wl-open', open);
            if (d.getElementById('wl-tawk')) return;
            // screens change inside the frame without touching the page, so watch the frame too
            new MutationObserver(function() { composer(d); agentPhoto(d); newChatCard(d); markOpen(f); }).observe(d.body, { childList: true, subtree: true });
            var s = d.createElement('style');
            s.id = 'wl-tawk';
            s.textContent = TAWK_CSS;
            d.head.appendChild(s);
            composer(d);
            agentPhoto(d);
            newChatCard(d);
        });
    }
    // tawk.to creates, shows and rebuilds its frames after load, so restyle whenever they change
    new MutationObserver(styleTawk).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
    window.Tawk_API = window.Tawk_API || {};
    Tawk_API.onLoad = styleTawk;
    Tawk_API.onChatMaximized = styleTawk;
    Tawk_API.onChatMinimized = styleTawk;
    window.addEventListener('resize', function() { var f = document.querySelector('#max-widget iframe'); if (f) sizeTawkFrame(f); });
})();
