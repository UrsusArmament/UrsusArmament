/* URSUS FOOTER — shared by every page. Place
   <script src="/ursusarmament/footer.js"></script>
   where the footer should appear. Needs chrome.css.
   Edit footer links/text HERE only. */
(function () {
  var html = `<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <div class="nav-logo">URSUS <span style="color: var(--accent);">ARMAMENT</span><sup class="tm">™</sup></div>
      <p>Developing next-generation tactical gear for the American people. Designed, assembled, and tested with pride in the USA.</p>
    </div>
    <div class="footer-col">
      <h4>Products</h4>
      <ul>
        <li><a href="/ursusarmament/products/URSIX">URSIX</a></li>
        <li><a href="/ursusarmament/products/CALIDUS">CALIDUS</a></li>
        <li><a href="/ursusarmament/products">View All</a></li>
        <li><a href="/ursusarmament/customerreviews">Customer Reviews</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="/ursusarmament/aboutus/">About Us</a></li>
        <li><a href="/ursusarmament/testingstandards/">Testing Standards</a></li>
        <li><a href="/ursusarmament/careers/">Careers</a></li>
        <li><a href="https://www.youtube.com/@UrsusWorks/" target="_blank" rel="noopener noreferrer">YouTube</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Support</h4>
      <ul>
        <li><a href="/ursusarmament/contact/">Contact</a></li>
        <li><a href="/ursusarmament/warranty/">Warranty</a></li>
        <li><a href="/ursusarmament/learnmore/">Learn More</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Government</h4>
      <ul>
        <li><a href="/ursusarmament/procurement/">Procurement</a></li>
        <li><a href="/ursusarmament/ITAR/">ITAR Compliance</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-logo">URSUS <span>ARMAMENT</span><sup class="tm">™</sup></div>
    <div class="footer-legal">2026 Ursus Works<sup class="tm">™</sup>. All rights reserved. | <a href="/ursusarmament/aboutus/#privacy-security" style="color:inherit; text-decoration:underline;">Privacy Policy</a> | <a href="/ursusarmament/terms/" style="color:inherit; text-decoration:underline;">Terms</a></div>
  </div>
</footer>`;
  document.currentScript.insertAdjacentHTML('beforebegin', html);
})();
