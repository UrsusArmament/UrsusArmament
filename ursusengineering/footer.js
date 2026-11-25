/* URSUS ENGINEERING FOOTER — shared by every Engineering page. Place
   <script src="/ursusengineering/footer.js"></script>
   where the footer should appear. Needs eng.css. Edit footer links/text HERE only. */
(function () {
  var html = `<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <div class="footer-logo" style="opacity:1;">URSUS <span>ENGINEERING</span></div>
      <p>Engineering at Ursus Works<sup class="tm">™</sup> is beginning its move to domestic production of parts and circuit boards.</p>
    </div>
    <div class="footer-col">
      <h4>Engineering</h4>
      <ul>
        <li><a href="/ursusengineering">Overview</a></li>
        <li><a href="/ursusengineering/aboutus/">About</a></li>
        <li><a href="/ursusengineering/contact/">Contact</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Ursus Works<sup class="tm">™</sup></h4>
      <ul>
        <li><a href="/ursusworks/">Home</a></li>
        <li><a href="/ursusarmament/">Armament</a></li>
        <li><a href="https://www.youtube.com/@UrsusWorks/" target="_blank" rel="noopener noreferrer">YouTube</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-logo">URSUS <span>ENGINEERING</span></div>
    <div class="footer-legal">2026 Ursus Works<sup class="tm">™</sup></div>
  </div>
</footer>`;
  document.currentScript.insertAdjacentHTML('beforebegin', html);
})();
