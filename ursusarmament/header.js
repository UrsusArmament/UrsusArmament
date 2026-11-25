/* URSUS HEADER — shared by every page. Place
   <script src="/ursusarmament/header.js"></script>
   where the header should appear (first thing inside <body>, after any toast div).
   Needs chrome.css. Edit nav links HERE only. */
(function () {
  var html = `<nav>
  <div class="nav-top">
    <div class="nav-brand">
      <a href="/ursusarmament/" class="nav-brand-link"><img class="nav-logo-img" src="/ursusarmament/images/ursusLogoOrange.png" alt="Ursus Armament logo"></a>
      <div class="nav-brand-text">
        <a href="/ursusarmament/" class="nav-logo">URSUS WORKS<sup class="tm">™</sup> - <span>ARMAMENT</span></a>
        <span class="nav-slogan">Right to Bear. &nbsp;Ready to Stand.</span>
      </div>
    </div>

    <!-- NAV RIGHT: cart icon + auth -->
    <div class="nav-right">

      <!-- Cart icon button -->
      <a href="/ursusarmament/cart" class="nav-cart-btn" id="navCartBtn" title="View Cart">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/>
        </svg>
        <span class="cart-count" id="cartCount"></span>
      </a>

      <div class="nav-auth" id="navAuth"><!-- populated by JS --></div>
      <button type="button" class="nav-burger" id="navBurger" aria-label="Open menu" aria-expanded="false" aria-controls="navRibbon">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
  <div class="nav-ribbon" id="navRibbon">
    <a href="/ursusarmament/products">Products</a>
    <a href="/ursusarmament/customerreviews">Reviews</a>
    <a href="/ursusarmament/learnmore/">Learn More</a>
    <a href="/ursusarmament/aboutus/">About</a>
    <a href="/ursusarmament/contact/">Contact</a>
    <a href="/ursusworks/">← Ursus Works<sup class="tm">™</sup></a>
  </div>
</nav>`;

  var me = document.currentScript;
  me.insertAdjacentHTML('beforebegin', html);

  /* Highlight the current section in the ribbon */
  var path = location.pathname.toLowerCase().replace(/\/+$/, '');
  document.querySelectorAll('#navRibbon a').forEach(function (a) {
    a.classList.remove('active');
    a.removeAttribute('aria-current');
    var href = (a.getAttribute('href') || '').toLowerCase().replace(/\/+$/, '');
    if (!href || href === '/ursusworks') return;            // parent-brand link is never "current"
    if (path === href || path.indexOf(href + '/') === 0) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
    /* Team Credentials lives under the About section */
    if (href === '/ursusarmament/aboutus' && path.indexOf('/ursusarmament/credentials') === 0) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  /* Mobile hamburger menu */
  var burger = document.getElementById('navBurger');
  var ribbon = document.getElementById('navRibbon');
  if (!burger || !ribbon) return;

  function setOpen(open) {
    burger.classList.toggle('open', open);
    ribbon.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!ribbon.classList.contains('open'));
  });
  ribbon.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('click', function (e) {
    if (ribbon.classList.contains('open') && !e.target.closest('nav')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && ribbon.classList.contains('open')) { setOpen(false); burger.focus(); }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 760) setOpen(false);
  });
})();
