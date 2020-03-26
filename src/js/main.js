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

document.addEventListener('DOMContentLoaded', function() {
  
  lazy = new lazyload({
    clearSrc: true,
    clearMedia: true
  });

  hdr = document.querySelector('.hdr');
  overlay = document.querySelector('.overlay');

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
  
  
  
  ;(function() {
    let faqBlocks = document.querySelectorAll('.faq'),
      dropdownText = function(elem, i) {
        let answer = elem[i].nextElementSibling,
          parentFaqBlock = faqBlocks[i],
          answerHeight = answer.scrollHeight;
  
        if (!parentFaqBlock.classList.contains('active')) {
  
          for (let j = 0; j < faqBlocks.length; j++) {
            faqBlocks[j].classList.remove('active');
            faqBlocks[j].querySelector('.faq__answer').style.maxHeight = '0px';
          }
  
          parentFaqBlock.classList.add('active');
  
          answer.style.maxHeight = answerHeight + 'px';
          
        } else {
          if (faqBlocks.length > 1) {
            answer.style.maxHeight = '0px';
            parentFaqBlock.classList.remove('active');
          }
        }
      };
  
    if (faqBlocks.length) {
  
      let faqBlocksParent = faqBlocks[0].parentElement,
        questions = faqBlocksParent.querySelectorAll('.faq__question');
  
        dropdownText(questions, 0);
  
      for (let i = 0; i < questions.length; i++) {
        questions[i].addEventListener('click', function() {
          dropdownText(questions, i);
        });
      }
    }
  })();

});