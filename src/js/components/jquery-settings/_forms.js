;
(function() {
  let thanksPopupTimer,
    thanksPopup = $('.thanks-popup'),
    overlay = $('.overlay');

  closeThanksPopup = function() {
    thanksPopup.css('animation', 'fadeOut .5s');

    if (overlay.hasClass('active')) {
      overlay.css('animation', 'fadeOut .5s');
    }
  };

  $('form').each(function() {
    $(this).validate({
      rules: {
        'user-name': {
          required: true,
          userName: true,
          minlength: 2
        },
        'user-tel': {
          required: true,
          userPhone: true
        },
        'user-email': {
          email: true
        },
        'privacy-policy': {
          required: true,
          minlength: 1
        }
      },
      messages: {
        'user-name': {
          required: 'Укажите имя',
          minlength: jQuery.validator.format('Имя не может быть таким коротким'),
          userName: 'Допустимы только буквы'
        },
        'user-tel': {
          required: 'Укажите телефон',
          userPhone: 'Укажите верный номер телефона'
        },
        'user-email': {
          email: 'Укажите верный E-mail'
        },
        'privacy-policy': {
          required: 'Согласитель с политикой обработки персональных данных'
        }
      },
      onfocusout: false,
      errorClass: 'invalid',
      submitHandler: function(form, event) {
        event.preventDefault();

        let inputs = form.querySelectorAll('input, textarea');

        for (let i = 0; i < inputs.length; i++) {
          inputs[i].classList.remove('filled');
        }

        $(this)[0].resetForm();

        thanksPopup.addClass('active');
        if (!overlay.hasClass('active')) {
          overlay.addClass('active');
        }
        thanksPopupTimer = setTimeout(function() {
          closeThanksPopup();
        }, 3000);
      }
    });
  });

  thanksPopup.on('click', function() {
    closeThanksPopup();
    clearTimeout(thanksPopupTimer);
  });

  $('.thanks-popup, .overlay').on('animationend', function() {
    if (event.animationName === 'fadeOut') {
      $(this).removeClass('active');
      $(this).css('animation', '');
    }
  });

  // form beforesubmit validate
  $('form .btn').on('click', function() {
    if (!$(event.target).parents('form').valid()) {
      event.preventDefault();
    }
  });

})();


$('.field__inp').on('input', function() {
  if ($(this).val() !== '') {
    $(this).addClass('filled');
  } else {
    $(this).removeClass('filled');
  }
});

$('.product-name-inp').val($('.product-hero-sect__title').text());


if ($.validator) {
  $.validator.methods.userPhone = function(value, element) {
    return /\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/.test(value);
  };

  $.validator.methods.userName = function(value, element) {
    return /^[а-яёА-ЯЁa-zA-Z\s]+$/.test(value);
  };
}