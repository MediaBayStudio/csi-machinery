let forms;

document.addEventListener('DOMContentLoaded', function() {
  ;(function() {
    let thanksPopupTimer,
      callbackPopupTimer,
      thanksPopup = $('.thanks-popup'),
      callbackPopup = $('.callback-popup'),
      overlay = $('.overlay');
  
      closeThanksPopup = function() {
        thanksPopup.css('animation', 'fadeOut .5s');
  
        if (overlay.hasClass('active') && !callbackPopup.hasClass('active')) {
          overlay.css('animation', 'fadeOut .5s');
        }
      };
  
    $('form:not(#searchform)').each(function() {
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
            // required: true,
            email: true
          },
          'privacy-policy': {
            required: true,
            minlength: 1
          },
          'company-name': {
            // required: true,
            minlength: 2
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
            // required: 'Укажите E-mail',
            email: 'Укажите верный E-mail'
          },
          'privacy-policy': {
            required: 'Согласитель с политикой обработки персональных данных'
          },
          'company-name': {
            // required: 'Укажите название компании',
            minlength: jQuery.validator.format('Название компании не может быть таким коротким')
          }
        },
        onfocusout: false,
        errorClass: 'invalid',
        submitHandler: function(form, event) {
          event.preventDefault();
  
          let inputs = form.querySelectorAll('input, textarea');
  
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
          }
          
          $(this)[0].resetForm();
          
          thanksPopup.addClass('active');
          if (!overlay.hasClass('active')) {
            overlay.addClass('active');
          }
          thanksPopupTimer = setTimeout(function() {
            closeThanksPopup();
          }, 3000);
  
          callbackPopupTimer = setTimeout(function() {
            callbackPopup[0].close();
          }, 5000);
        }
        });
      });
  
      thanksPopup.on('click', function() {
        closeThanksPopup();
        clearTimeout(thanksPopupTimer);
        clearTimeout(callbackPopupTimer);
      });
  
      $('.thanks-popup, .overlay').on('animationend', function() {
        if (event.animationName === 'fadeOut') {
          $(this).removeClass('active');
          $(this).css('animation', '');
        }
      });
  
    })();
  
    $('.field__inp').on('input', function() {
      if ($(this).val() !== '') {
        $(this).nextAll('.field__text').addClass('focused');
      } else {
        $(this).nextAll('.field__text').removeClass('focused');
      }
    });
  
  
    $.validator.methods.userPhone = function(value, element) {
      return /\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/.test(value);
    };
  
    $.validator.methods.userName = function(value, element) {
      return /^[а-яёА-ЯЁa-zA-Z\s]+$/.test(value);
    };
  
  ;(function() {
    let indexHeroSlides = document.querySelectorAll('.index-hero__slide'),
      dot = '<button type="button" class="index-hero__dot dot"></button>',
      features = document.querySelectorAll('.feat'),
      partners = document.querySelectorAll('.partners-block__img');
  
    if (indexHeroSlides && indexHeroSlides.length > 1) {
      $('.index-hero__slider').slick({
        accessibility: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        arrows: false,
        dots: true,
        dotsClass: 'index-hero__dots dots',
        customPaging: function() {
          return dot;
        }
      });
    }
  
    let buildFeaturesSlider = function() {
      if (matchMedia('(min-width: 767.98px)').matches && features.length < 4) {
        if ($('.feat-block').hasClass('slick-slider')) {
          $('.feat-block').slick('unslick');
        }
      } else {
        if ($('.feat-block').hasClass('slick-slider')) {
          return;
        }
        if (features.length > 1) {
          $('.feat-block').slick({
            accessibility: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            arrows: false,
            dots: true,
            dotsClass: 'feat__dots dots',
            customPaging: function() {
              return dot;
            },
            variableWidth: true,
            centerMode: true,
            centerPadding: '0',
            mobileFirst: true,
            responsive: [{
              breakpoint: 575.98,
              settings: {
                slidesToScroll: 1,
                slidesToShow: 2,
                centerMode: false
              }
            }]
          });
        }
      }
    }
  
    if (features.length && features.length > 0) {
      window.addEventListener('resize', buildFeaturesSlider);
      buildFeaturesSlider();
    }
  
    let buildPartnersSlider = function() {
      if (matchMedia('(min-width: 575.98px)').matches && partners.length < 4) {
        if ($('.partners-block').hasClass('slick-slider')) {
          $('.partners-block').slick('unslick');
        }
      } else if (matchMedia('(min-width: 1439.98px)').matches && partners.length < 7) {
        if ($('.partners-block').hasClass('slick-slider')) {
          $('.partners-block').slick('unslick');
        }
      } else {
        if ($('.partners-block').hasClass('slick-slider')) {
          return;
        }
        if (partners.length && partners.length > 2) {
          $('.partners-block').slick({
            accessibility: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
            dotsClass: 'partners__dots dots',
            customPaging: function() {
              return dot;
            },
            mobileFirst: true,
            responsive: [{
              breakpoint: 575.98,
              settings: {
                slidesToScroll: 1,
                slidesToShow: 3
              }
            }, {
              breakpoint: 1439.98,
              settings: {
                slidesToScroll: 1,
                slidesToShow: 5
              }
            }]
          });
        }
      }
    }
  
    if (partners.length && partners.length > 0) {
      window.addEventListener('resize', buildPartnersSlider);
      buildPartnersSlider();
    }
  
    
    $('.slick-list').on('mousedown', function() {
      $(this).addClass('grabbing');
    });
  
    $('.slick-list').on('beforeChange', function() {
      $(this).removeClass('grabbing');
    });
  
    $(document).on('mouseup', function() {
      $('.slick-list').removeClass('grabbing');
    });
  
  })();
  
});