/* URSUS ENGINEERING HEADER — shared by every Engineering page. Place
   <script src="/ursusengineering/header.js"></script>
   as the first thing inside <body>. Needs eng.css.
   Edit nav links HERE only. */
(function () {
  var html = `<nav>
  <div class="nav-top">
    <div class="nav-brand">
      <a href="/ursusengineering" class="nav-brand-link"><img class="nav-logo-img" src="/ursusarmament/images/ursusLogoBlue.png" alt="Ursus Works logo"></a>
      <a href="/ursusengineering" class="nav-logo">URSUS WORKS<sup class="tm">™</sup> - <span>ENGINEERING</span></a>
    </div>
    <div class="nav-right">
      <span class="nav-auth" id="navAuth"></span><!-- theme toggle is inserted before this -->
      <button type="button" class="nav-burger" id="navBurger" aria-label="Open menu" aria-expanded="false" aria-controls="navRibbon">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
  <div class="nav-ribbon" id="navRibbon">
    <a href="/ursusengineering">Overview</a>
    <a href="/ursusengineering/aboutus/">About</a>
    <a href="/ursusengineering/contact/">Contact</a>
    <a href="/ursusworks/">← Ursus Works<sup class="tm">™</sup></a>
  </div>
</nav>`;

  document.currentScript.insertAdjacentHTML('beforebegin', html);

  /* Highlight the current section in the ribbon */
  var path = location.pathname.toLowerCase().replace(/\/+$/, '').replace(/\/index\.html$/, '');
  document.querySelectorAll('#navRibbon a').forEach(function (a) {
    a.classList.remove('active');
    a.removeAttribute('aria-current');
    var href = (a.getAttribute('href') || '').toLowerCase().replace(/\/+$/, '');
    if (!href || href === '/ursusworks') return;            // parent-brand link is never "current"
    var isRoot = href === '/ursusengineering';              // Overview: exact match only
    if (path === href || (!isRoot && path.indexOf(href + '/') === 0)) {
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
  burger.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!ribbon.classList.contains('open')); });
  ribbon.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('click', function (e) {
    if (ribbon.classList.contains('open') && !e.target.closest('nav')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && ribbon.classList.contains('open')) { setOpen(false); burger.focus(); }
  });
  window.addEventListener('resize', function () { if (window.innerWidth > 760) setOpen(false); });
})();
