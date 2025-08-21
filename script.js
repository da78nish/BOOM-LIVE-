// Reveal sections with IntersectionObserver
(function(){
  const sections = document.querySelectorAll("section");
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('show');
          obs.unobserve(en.target);
        }
      });
    }, {threshold: 0.18});
    sections.forEach(s => io.observe(s));
  } else {
    sections.forEach(s => s.classList.add('show'));
  }
})();

// Hide/show nav on scroll direction
(function(){
  let lastY = 0;
  const nav = document.getElementById('navbar');
  let ticking = false;
  window.addEventListener('scroll', function(){
    const y = window.scrollY || document.documentElement.scrollTop;
    if (!ticking) {
      window.requestAnimationFrame(function() {
        if (y > lastY) {
          nav.style.top = '-80px'; // hide
        } else {
          nav.style.top = '0'; // show
        }
        lastY = Math.max(y, 0);
        ticking = false;
      });
      ticking = true;
    }
  }, {passive:true});
})();

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(console.error);
  });
}
