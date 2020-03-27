;(function() {
  let hdrClone = hdr.cloneNode(true),
    hdrParent = hdr.parentElement,
    fixThreshold = hdr.getBoundingClientRect().bottom + pageYOffset;
    
  hdrClone.style.opacity = 0;
  hdrClone.style.pointerEvents = 'none';

  window.addEventListener('scroll', fixHdr);
  fixHdr();
  
  function fixHdr() {
    if (pageYOffset > fixThreshold) {
      if (menu.style && menu.classList.contains('active')) {
        return;
      }
      hdrParent.appendChild(hdrParent.replaceChild(hdrClone, hdr));
      hdr.classList.add('fixed');
      window.removeEventListener('scroll', fixHdr);
      window.addEventListener('scroll', unfixHdr);
    }
  }

  function unfixHdr() {
    if (pageYOffset <= fixThreshold) {
      hdrParent.replaceChild(hdr, hdrClone);
      hdr.classList.remove('fixed');
      window.removeEventListener('scroll', unfixHdr);
      window.addEventListener('scroll', fixHdr);
    }
  }
})();