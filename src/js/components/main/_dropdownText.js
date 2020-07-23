;(function() {
  let faqBlock = document.querySelector('.faq__block');

  if (faqBlock) {
    let faqBlocks = faqBlock.children,
      dropdownText = function(element) {
        element = element || faqBlocks[0]; // если элемент не передали, то открываем первый

        let parent = element.closest('.faq'),
          answer = parent.querySelector('.faq__answer'),
          answerHeight = answer.scrollHeight;

        if (parent.classList.contains('active')) {
          if (faqBlocks.length > 1) {
            answer.style.maxHeight = '0px';
            parent.classList.remove('active');
          }
        } else {
          for (let i = 0; i < faqBlocks.length; i++) {
            faqBlocks[i].classList.remove('active');
            faqBlocks[i].querySelector('.faq__answer').style.maxHeight = '0px';
          }

          parent.classList.add('active');
          answer.style.maxHeight = answerHeight + 'px';
        }
      };

    dropdownText();

    faqBlock.addEventListener('click', function() {
      let target = event.target;
      if (target.tagName === 'BUTTON') {
        dropdownText(target);
      }
    });

  }

})();