/* URSUS THEME — load in <head>, no defer (prevents a dark flash). */
(function () {
  var KEY = 'ursus_theme', root = document.documentElement;

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function apply(t) {
    root.setAttribute('data-theme', t);
    var b = document.getElementById('themeToggle');
    if (b) {
      b.setAttribute('aria-pressed', t === 'light' ? 'true' : 'false');
      b.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
      b.title = b.getAttribute('aria-label');
    }
  }

  // Default: dark on the Armament site, light on Engineering (until the visitor picks one)
  var DEFAULT = /^\/ursusengineering(\/|$)/i.test(location.pathname) ? 'light' : 'dark';
  var saved = read();
  apply(saved === 'light' || saved === 'dark' ? saved : DEFAULT);

  document.addEventListener('DOMContentLoaded', function () {
    var host = document.querySelector('.nav-right');
    if (!host || document.getElementById('themeToggle')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'themeToggle';
    btn.className = 'nav-theme-btn';
    btn.innerHTML =
      '<svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/>' +
      '<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>' +
      '<svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

    // sits between the cart icon and the login/account button
    var auth = host.querySelector('.nav-auth');
    host.insertBefore(btn, auth || null);

    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.classList.add('theme-anim');
      apply(next); write(next);
      setTimeout(function () { root.classList.remove('theme-anim'); }, 350);
    });
    apply(root.getAttribute('data-theme'));
  });

  // keep other open tabs in sync
  window.addEventListener('storage', function (e) {
    if (e.key === KEY) apply(e.newValue === 'light' ? 'light' : (e.newValue === 'dark' ? 'dark' : DEFAULT));
  });
})();
