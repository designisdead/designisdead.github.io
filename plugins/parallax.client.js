(function(){
  window.addEventListener('scroll', function () {
    const scrollElements = document.querySelectorAll('[data-parallax]');
    for(const el of scrollElements) {
      const pos = window.pageYOffset * el.dataset.parallax;
      el.style.transform = 'translate3d(0px,' + pos + 'px, 0px)';
    }
  });
})();
