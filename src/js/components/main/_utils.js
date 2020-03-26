let lazy,
  menu,
  hdr,
  overlay,
  setVh = function() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  },
  dropdownText = function(target) {
    // remove class dropped
  };
  
// vh units fix
window.addEventListener('resize', setVh);
setVh();