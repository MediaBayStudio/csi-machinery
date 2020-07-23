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

  let hdrTelBlock = hdr.querySelector('.hdr__tel'),
    mobileOverlay = document.querySelector('.mobile-menu-overlay'),
    // from = 'M1.11133 2.99551C4.28726 1.86094 6.38895 1.00494 9.91892 1.00001C14.0263 0.994281 16.6546 3.1101 20.759 2.99551C24.3551 2.89511 25.8383 2.40557 28.8891 1.00001',
    // to = 'M0 1.99534C9 1.99984 5.47003 2.00027 9 1.99534C13.1074 1.98961 14.5 1.99534 19.6477 1.99534C26.5 2 21.5 1.99999 28 1.9999';
    from = 'M1 4.3C4.5498 2.9 6.57859 2.00555 10.5498 2C15.1413 2.24498 16.0498 3.90002 21.0501 4.30002C25.0498 4.40002 25.5498 3.90002 30.0501 2.15',
    to = 'M1 1.30002C10.5908 1.31099 6.40379 1.30554 10.375 1.3C17 1.29075 13.7812 1.30005 21.0501 1.30005C26.1875 1.3 21.0501 1.30005 30 1.30005';

  menu.addEventListener('beforeopen', function() {
    hdrTelBlock.classList.add('disabled');
    mobileOverlay.classList.add('active');

    let currentHdr = menu.parentElement.parentElement,
      menuCaller = currentHdr.querySelector('.burger'),
      paths = menuCaller.querySelectorAll('path');

      for (let i = 0; i < paths.length; i++) {

        let animate;

        if (paths[i].innerHTML === '') {
          animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
          animate.setAttribute('attributeName', 'd');
          animate.setAttribute('attributeType', 'XML');
          animate.setAttribute('dur', '.35s');
          animate.setAttribute('fill', 'freeze');
          paths[i].appendChild(animate);
        } else {
          animate = paths[i].children[0];
        }
        
        animate.setAttribute('from', from);
        animate.setAttribute('to', to);

        animate.beginElement();
      }

  });

  menu.addEventListener('beforeclose', function() {
    hdrTelBlock.classList.remove('disabled');
    mobileOverlay.style.animation = 'fadeOut .5s';

    let currentHdr = menu.parentElement.parentElement,
      menuCaller = currentHdr.querySelector('.burger'),
      paths = menuCaller.querySelectorAll('path');

    for (let i = 0; i < paths.length; i++) {
      let animate = paths[i].children[0];
      animate.setAttribute('from', to);
      animate.setAttribute('to', from);
      animate.beginElement();
    }

  });

  overlay.addEventListener('animationend', function() {
    if (event.animationName === 'fadeOut') {
      overlay.classList.remove('active');
      overlay.style.animation = '';
    }
  });

  mobileOverlay.addEventListener('animationend', function() {
    if (event.animationName === 'fadeOut') {
      mobileOverlay.classList.remove('active');
      mobileOverlay.style.animation = '';
    }
  });

  mobileOverlay.addEventListener('click', function() {
    menu.close();  
  });

})();