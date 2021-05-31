let forms;

document.addEventListener('DOMContentLoaded', function() {
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
  ;(function() {
    let indexHeroSlides = document.querySelectorAll('.index-hero__slide'),
      dot = '<button type="button" class="index-hero__dot dot"></button>',
      features = document.querySelectorAll('.feat'),
      partners = document.querySelectorAll('.partners-block__img');
  
    // Точки-переключатели
    $('.partners-block, .index-hero__slider, .feat-block').on('init', function(event, slick) {
      if (!$(this).hasClass('dots-shadowed')) {
  
        $(this).find('.dots').append('<li class="shadow-dot" style="transform:translateX(0)"></li>');
  
        $(this).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
          if (currentSlide !== nextSlide) {
            $(this).find('.shadow-dot').css('transform', 'translateX(' + (nextSlide * 200) + '%)');
          }
        });
      }
    });
  
  
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
    };
  
    if (features.length && features.length > 0) {
      window.addEventListener('resize', buildFeaturesSlider);
      buildFeaturesSlider();
    }
  
    let buildPartnersSlider = function() {
      // если ширина экрана больше 578px и слайдов меньше 4, то слайдера не будет
      if (matchMedia('(min-width: 575.98px)').matches && partners.length < 4) {
        if ($('.partners-block').hasClass('slick-slider')) {
          $('.partners-block').slick('unslick');
        }
      // если ширина экрана больше 1440px и слайдов меньше 7, то слайдера не будет
      } else if (matchMedia('(min-width: 1439.98px)').matches && partners.length < 7) {
        if ($('.partners-block').hasClass('slick-slider')) {
          $('.partners-block').slick('unslick');
        }
      // в других случаях делаем слайдер
      } else {
        if ($('.partners-block').hasClass('slick-slider')) {
          // слайдер уже создан
          return;
        }
        if (partners.length && partners.length > 2) {
          $('.partners-block').slick({
            // appendDots: $('element'),
            // appendArrows: $('element'),
            // autoplay: true,
            // autoplaySpeed: 3000,
            // adaptiveHeight: false,
            // asNavFor: $('element'),
            // centerMode: false,
            // centerPadding: '50px',
            // cssEase: 'ease',
            // draggable: true,
            // slide: 'selector',
            accessibility: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            arrows: false, // true by default
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
    };
  
    if (partners.length && partners.length > 0) {
      window.addEventListener('resize', buildPartnersSlider);
      buildPartnersSlider();
    }
  
    // настройки grab курсора на всех слайдерах
    $('.slick-list.draggable').on('mousedown', function() {
      $(this).addClass('grabbing');
    });
  
    $('.slick-list.draggable').on('beforeChange', function() {
      $(this).removeClass('grabbing');
    });
  
    $(document).on('mouseup', function() {
      $('.slick-list.draggable').removeClass('grabbing');
    });
  
    
  
  })();
  
});