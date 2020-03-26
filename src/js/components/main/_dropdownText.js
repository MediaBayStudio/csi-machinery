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