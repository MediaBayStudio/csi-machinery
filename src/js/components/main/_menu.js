;(function() {
  menu = new SimpleMenu({
    menu: 'aside',
    openBtn: {
      selector: '.burger',
      class: 'active'
    },
    closeBtn: {
      selector: '.burger',
      class: 'active'
    },
    overlay: false,
    toRight: true,
    desktop: true
  });

  let hdrTelBlock = hdr.querySelector('.hdr__tel-block');

  menu.addEventListener('beforeopen', function() {
    hdrTelBlock.classList.add('disabled');
    overlay.classList.add('active');
  });

  menu.addEventListener('beforeclose', function() {
    hdrTelBlock.classList.remove('disabled');
    overlay.style.animation = 'fadeOut .5s';
  });

  overlay.addEventListener('animationend', function() {
    if (event.animationName === 'fadeOut') {
      overlay.classList.remove('active');
      overlay.style.animation = '';
    }
  });

  overlay.addEventListener('click', function() {
    menu.close();  
  });

})();