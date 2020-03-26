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
