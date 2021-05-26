(function(){'use strict';function a(a){this.time=a.time,this.target=a.target,this.rootBounds=a.rootBounds,this.boundingClientRect=a.boundingClientRect,this.intersectionRect=a.intersectionRect||i(),this.isIntersecting=!!a.intersectionRect;var b=this.boundingClientRect,c=b.width*b.height,d=this.intersectionRect,e=d.width*d.height;this.intersectionRatio=c?+(e/c).toFixed(4):this.isIntersecting?1:0}function b(a,b){var c=b||{};if("function"!=typeof a)throw new Error("callback must be a function");if(c.root&&1!=c.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=d(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=a,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(c.rootMargin),this.thresholds=this._initThresholds(c.threshold),this.root=c.root||null,this.rootMargin=this._rootMarginValues.map(function(a){return a.value+a.unit}).join(" ")}function c(){return window.performance&&performance.now&&performance.now()}function d(a,b){var c=null;return function(){c||(c=setTimeout(function(){a(),c=null},b))}}function e(a,b,c,d){"function"==typeof a.addEventListener?a.addEventListener(b,c,d||!1):"function"==typeof a.attachEvent&&a.attachEvent("on"+b,c)}function f(a,b,c,d){"function"==typeof a.removeEventListener?a.removeEventListener(b,c,d||!1):"function"==typeof a.detatchEvent&&a.detatchEvent("on"+b,c)}function g(a,b){var c=Math.max(a.top,b.top),d=Math.min(a.bottom,b.bottom),e=Math.max(a.left,b.left),f=Math.min(a.right,b.right),g=f-e,h=d-c;return 0<=g&&0<=h&&{top:c,bottom:d,left:e,right:f,width:g,height:h}}function h(a){var b;try{b=a.getBoundingClientRect()}catch(a){}return b?(b.width&&b.height||(b={top:b.top,right:b.right,bottom:b.bottom,left:b.left,width:b.right-b.left,height:b.bottom-b.top}),b):i()}function i(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function j(a,b){for(var c=b;c;){if(c==a)return!0;c=k(c)}return!1}function k(a){var b=a.parentNode;return b&&11==b.nodeType&&b.host?b.host:b&&b.assignedSlot?b.assignedSlot.parentNode:b}if("object"==typeof window){if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype)return void("isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return 0<this.intersectionRatio}}));var l=window.document,m=[];b.prototype.THROTTLE_TIMEOUT=100,b.prototype.POLL_INTERVAL=null,b.prototype.USE_MUTATION_OBSERVER=!0,b.prototype.observe=function(a){var b=this._observationTargets.some(function(b){return b.element==a});if(!b){if(!(a&&1==a.nodeType))throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:a,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},b.prototype.unobserve=function(a){this._observationTargets=this._observationTargets.filter(function(b){return b.element!=a}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},b.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},b.prototype.takeRecords=function(){var a=this._queuedEntries.slice();return this._queuedEntries=[],a},b.prototype._initThresholds=function(a){var b=a||[0];return Array.isArray(b)||(b=[b]),b.sort().filter(function(b,c,d){if("number"!=typeof b||isNaN(b)||0>b||1<b)throw new Error("threshold must be a number between 0 and 1 inclusively");return b!==d[c-1]})},b.prototype._parseRootMargin=function(a){var b=(a||"0px").split(/\s+/).map(function(a){var b=/^(-?\d*\.?\d+)(px|%)$/.exec(a);if(!b)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(b[1]),unit:b[2]}});return b[1]=b[1]||b[0],b[2]=b[2]||b[0],b[3]=b[3]||b[1],b},b.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(e(window,"resize",this._checkForIntersections,!0),e(l,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in window&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(l,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},b.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,f(window,"resize",this._checkForIntersections,!0),f(l,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},b.prototype._checkForIntersections=function(){var b=this._rootIsInDom(),d=b?this._getRootRect():i();this._observationTargets.forEach(function(e){var f=e.element,g=h(f),i=this._rootContainsTarget(f),j=e.entry,k=b&&i&&this._computeTargetAndRootIntersection(f,d),l=e.entry=new a({time:c(),target:f,boundingClientRect:g,rootBounds:d,intersectionRect:k});j?b&&i?this._hasCrossedThreshold(j,l)&&this._queuedEntries.push(l):j&&j.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},b.prototype._computeTargetAndRootIntersection=function(a,b){if("none"!=window.getComputedStyle(a).display){for(var c=h(a),d=c,e=k(a),f=!1;!f;){var i=null,j=1==e.nodeType?window.getComputedStyle(e):{};if("none"==j.display)return;if(e==this.root||e==l?(f=!0,i=b):e!=l.body&&e!=l.documentElement&&"visible"!=j.overflow&&(i=h(e)),i&&(d=g(i,d),!d))break;e=k(e)}return d}},b.prototype._getRootRect=function(){var a;if(this.root)a=h(this.root);else{var b=l.documentElement,c=l.body;a={top:0,left:0,right:b.clientWidth||c.clientWidth,width:b.clientWidth||c.clientWidth,bottom:b.clientHeight||c.clientHeight,height:b.clientHeight||c.clientHeight}}return this._expandRectByRootMargin(a)},b.prototype._expandRectByRootMargin=function(a){var b=this._rootMarginValues.map(function(b,c){return"px"==b.unit?b.value:b.value*(c%2?a.width:a.height)/100}),c={top:a.top-b[0],right:a.right+b[1],bottom:a.bottom+b[2],left:a.left-b[3]};return c.width=c.right-c.left,c.height=c.bottom-c.top,c},b.prototype._hasCrossedThreshold=function(a,b){var c=a&&a.isIntersecting?a.intersectionRatio||0:-1,d=b.isIntersecting?b.intersectionRatio||0:-1;if(c!==d)for(var e,f=0;f<this.thresholds.length;f++)if(e=this.thresholds[f],e==c||e==d||e<c!=e<d)return!0},b.prototype._rootIsInDom=function(){return!this.root||j(l,this.root)},b.prototype._rootContainsTarget=function(a){return j(this.root||l,a)},b.prototype._registerInstance=function(){0>m.indexOf(this)&&m.push(this)},b.prototype._unregisterInstance=function(){var a=m.indexOf(this);-1!=a&&m.splice(a,1)},window.IntersectionObserver=b,window.IntersectionObserverEntry=a}})();
;(function () {
  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent (event, params) {
    params = params || {bubbles: false, cancelable: false, detail: null};
    let evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();
(function(ELEMENT) {
  ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
  ELEMENT.closest = ELEMENT.closest || function closest(selector) {
      if (!this) return null;
      if (this.matches(selector)) return this;
      if (!this.parentElement) {return null}
      else return this.parentElement.closest(selector)
    };
}(Element.prototype));
let lazy,
  menu,
  hdr,
  overlay,
  setVh = function() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  },
  toArray = function(array) {
    let newArray = [];

    for (let i = 0; i < array.length; i++) {
      newArray.push(array[i]);
    }

    return newArray;
  },
  pageUtils = document.querySelector('#page-utils');

document.head.removeChild(pageUtils);
// vh units fix
window.addEventListener('resize', setVh);
setVh();

document.addEventListener('DOMContentLoaded', function() {


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
  
  ;(function() {
    let hdrClone = hdr.cloneNode(true),
      hdrParent = hdr.parentElement,
      fixThreshold = hdr.getBoundingClientRect().bottom + pageYOffset;
      
    hdrClone.style.opacity = 0;
    hdrClone.style.pointerEvents = 'none';
  
    window.addEventListener('scroll', fixHdr);
    fixHdr();
    
    function fixHdr() {
      if (pageYOffset > fixThreshold) {
        if (menu.style && (menu.classList.contains('active') || hdr.querySelector('.burger').classList.contains('closed'))) {
          return;
        }
        hdrParent.appendChild(hdrParent.replaceChild(hdrClone, hdr));
        hdr.classList.add('fixed');
        window.removeEventListener('scroll', fixHdr);
        window.addEventListener('scroll', unfixHdr);
      }
    }
  
    function unfixHdr() {
      if (pageYOffset <= fixThreshold) {
        hdrParent.replaceChild(hdr, hdrClone);
        hdr.classList.remove('fixed');
        window.removeEventListener('scroll', unfixHdr);
        window.addEventListener('scroll', fixHdr);
      }
    }
  })();
  ;(function() {
  
    let productsSect = document.querySelector('.catalog-products');
  
    if (productsSect) {
      let productsBlock = productsSect.querySelector('.catalog-products__wrap'),
        loader = productsSect.querySelector('.loader'),
        moreBtn = productsSect.querySelector('.catalog-products__more-btn'),
        moreBtnLoader = moreBtn.querySelector('.loader'),
  
        paginationBlock = productsSect.querySelector('.catalog-products__pagination'),
        paginationNumbersBlock = paginationBlock.querySelector('.pagination__numbers'),
        paginationPrev = paginationNumbersBlock.previousElementSibling,
        paginationNext = paginationNumbersBlock.nextElementSibling,
  
        productsCounter = productsSect.querySelector('.catalog-products__counter'),
  
        queryParam = productsSect.dataset.term,
        postsPerPage = 0,
        currentPage = 1,
        pageProductsLength = 0,
        products = [],
        productsLength = 0,
  
        getPosts = function(postOffset, postsPerPage, callback) {
          let xhr = new XMLHttpRequest(),
            // date = `action=loadcatalog&termId=${queryParam}&postOffset=${postOffset}&postsPerPage=${postsPerPage}`;
            date = 'action=loadcatalog&termId=' + queryParam + '&postOffset=' + postOffset + '&postsPerPage=' + postsPerPage;
  
          xhr.open('POST', SITEURL + '/wp-admin/admin-ajax.php');
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.send(date);
  
          xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
              loader.style.animation = 'fadeOut .5s';
              let response = JSON.parse(xhr.response);
              if (response.error) {
              productsBlock.insertAdjacentHTML('beforeend', '<p class="catalog-error">' + response.error + '<p>');
                console.warn('errorText:' + response.errorText);
              } else {
                if (response.products) {
                  if (!productsLength) {
                    (productsLength = response.length);
                  }
                  callback && callback(response.products);
                } else {
                  productsBlock.insertAdjacentHTML('beforeend', '<p class="catalog-empty">Товаров в этой категории нет</p>');
                }
              }
            }
          });
        },
        printPosts = function(posts) {
          for (let key in posts) {
            let elem = posts[key],
              link = elem.link,
              title = elem.title,
              descr = elem.descr,
              src = elem.src,
              a = '<a href="' + link + '" class="product" title="Перейти на страницу с ' + title + '">',
              img = '<img src="' + src + '" alt="' + title + '" title="' + title + '" class="product__img" />',
              str = '<strong class="product__title">' + title + '</strong>',
              p = '<p class="product__descr">' + descr + '</p>',
              html = a + img + str + p + '</a>';
              // html = `<a href="' + link + '" class="product" title="Перейти на страницу с ${title}">
              //   <img src="${src}" alt="${title}" title="${title}" class="product__img" />
              //   <strong class="product__title">${title}</strong>
              //   <p class="product__descr">${descr}</p>
              // </a>`;
            productsBlock.insertAdjacentHTML('beforeend', html);
            pageProductsLength++;
            products.push(posts[key]);
          }
  
          if (paginationNumbersBlock.children.length < 2) {
            createPaginationNumbers();
          }
          if (window.matchMedia('(max-width:1023.98px)').matches) {
            animateSection();
          }
        },
        setPostsPerPage = function() {
          if (window.matchMedia('(min-width:1439.98px)').matches) {
            postsPerPage = 12;
          } else if (window.matchMedia('(min-width:1023.98px)').matches) {
            postsPerPage = 9;
          } else if (window.matchMedia('(min-width:767.98px)').matches) {
            postsPerPage = 8;
          } else {
            postsPerPage = 4;
          }
        },
        setBtnVisibility = function(showCallback, hideCallback) {
          // console.log(`pageProductsLength: ${pageProductsLength}`);
          // console.log(`productsLength: ${productsLength}`);
          if (pageProductsLength < productsLength) {
            // console.log('show btn');
            moreBtnLoader.classList.remove('active');
            moreBtn.classList.remove('hide', 'disabled');
            showCallback && showCallback();
          } else {
            // console.log('hide btn');
            moreBtn.classList.add('hide');
            hideCallback && hideCallback();
          }
        },
        animateSection = function() {
          productsBlock.style.maxHeight = productsBlock.scrollHeight + 'px';
        },
        createPaginationNumbers = function() {
          if (window.matchMedia('(min-width:1023.98px)').matches) {
            let pagesCount = Math.ceil(productsLength / postsPerPage);
            if (pagesCount > 1) {
              for (let i = 0; i < pagesCount; i++) {
                let button = document.createElement('button');
                button.setAttribute('type', 'button');
                button.classList.add('pagination__number');
                if (i === 0) {
                  button.classList.add('active');
                }
                button.textContent = i + 1;
                paginationNumbersBlock.insertAdjacentElement('beforeend', button);
              }
  
              paginationBlock.addEventListener('click', function() {
                let target = event.target;
  
                if (target.classList.contains('pagination__number') && !target.classList.contains('active')) {
                  currentPage = +target.textContent;
                  setPage(currentPage);
                } else if (target.classList.contains('pagination__prev') && !target.classList.contains('disabled')) {
                  setPage(--currentPage);
                } else if (target.classList.contains('pagination__next') && !target.classList.contains('disabled')) {
                  setPage(++currentPage);
                }
                
              });
            }
          }
        },
        setPage = function(pageNum) {
          let numbers = paginationNumbersBlock.children,
            postOffset = pageNum * postsPerPage - postsPerPage,
            current = pageNum - 1;
  
          for (let i = 0; i < numbers.length; i++) {
            numbers[i].classList.remove('active');
          }
  
          loader.classList.add('active');
          paginationBlock.classList.add('disabled');
          numbers[current].classList.add('active');
  
          getPosts(postOffset, postsPerPage, function(response) {
            productsBlock.innerHTML = '';
            printPosts(response);
            paginationBlock.classList.remove('disabled');
            if (current > 0) {
              paginationPrev.classList.remove('disabled');
            } else {
              paginationPrev.classList.add('disabled');
            }
            if (numbers.length - 1 === current) {
              paginationNext.classList.add('disabled');
            } else {
              paginationNext.classList.remove('disabled');
            }
          });
  
        },
        showPosts = function() {
          let childs = productsBlock.children,
            diff = childs.length > postsPerPage ? childs.length - postsPerPage : 0;
  
          for (let i = 0; i < diff; i++) {
            productsBlock.removeChild(productsBlock.children[productsBlock.children.length - 1]);
          }
  
          pageProductsLength = childs.length;
          productsLength = +productsCounter.textContent;
  
          setBtnVisibility();
  
          if (paginationNumbersBlock.children.length < 2) {
            createPaginationNumbers();
          }
          
          if (window.matchMedia('(max-width:1023.98px)').matches) {
            animateSection();
          }
        };
  
        window.addEventListener('resize', function() {
          setPostsPerPage();
        });
  
        loader.addEventListener('animationend', function() {
          if (event.animationName === 'fadeOut') {
            this.classList.remove('active');
            this.style.animation = '';
          }
        });
  
        setPostsPerPage();
        showPosts();
        // getPosts(0, postsPerPage, function(response) {
        //   productsCounter.textContent = productsLength;
        //   printPosts(response);
        //   setBtnVisibility();
        // });
  
        moreBtn.addEventListener('click', function() {
          moreBtn.classList.add('disabled');
          moreBtnLoader.classList.add('active');
          getPosts(pageProductsLength, postsPerPage, function(response) {
            printPosts(response);
            setBtnVisibility();
          });
        });
    }
  
  })();
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
  ;(function() {
    function setCursorPosition(pos, elem) {
      elem.focus();
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select()
      }
    }
  
      function mask(event) {
      let matrix = "+7(___)___-__-__",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
      if (def.length >= val.length) val = def;
      this.value = matrix.replace(/./g, function(a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
      });
      if (event.type == "blur") {
      if (this.value.length == 2) this.value = ""
      } else setCursorPosition(this.value.length, this)
      };
      let input = document.querySelectorAll("[name=user-tel]");
      for (let i = 0; i < input.length; i++) {
        input[i].addEventListener("input", mask, false);
        input[i].addEventListener("focus", mask, false);
        input[i].addEventListener("blur", mask, false);
      }
  })();

  ;(function() {
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
  

  // Корректировка высоты таблиц характеристик товаров, чтобы убрать горизонтальный скролл
  let productTableWrappers = document.querySelectorAll('.product__table-wrap'),
    setTableWrapHeight = function() {
      for (let i = 0; i < productTableWrappers.length; i++) {
        let table = productTableWrappers[i].children[0];
        table.style.height = table.offsetHeight + 1 + 'px';
        // productTableWrappers[i].style.height = table.offsetHeight + 1 + 'px';
        // console.log(table.offsetHeight);
        // setTimeout(function(){console.log(table.offsetHeight)}, 1000);
      }
    };
  if (productTableWrappers.length && productTableWrappers.length > 0) {
    setTableWrapHeight();
    window.addEventListener('resize', setTableWrapHeight);
  }

  let mapBlock = document.querySelector('#contacts-map');

  if (mapBlock) {
    let ymapsInit = function() {
      let tag = document.createElement('script');

      tag.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?apikey=82596a7c-b060-47f9-9fb6-829f012a9f04&lang=ru_RU&onload=ymapsOnload');
      document.body.appendChild(tag);

      mapBlock.removeEventListener('lazyloaded', ymapsInit);

    };

    mapBlock.addEventListener('lazyloaded', ymapsInit);
  }

  // Корректировка высоты изображения в секции "о производстве"
  let productionSect = document.querySelector('.production-sect');

  if (productionSect) {
    let setElementSize = function() {
      if (window.matchMedia('(min-width:1023.98px)').matches) {
        let img = productionSect.children[0];
        parentStyles = getComputedStyle(productionSect);
        img.style.height = productionSect.clientHeight - parentStyles.paddingTop.slice(0, -2) - parentStyles.paddingBottom.slice(0, -2) + 'px';
      } else {
        let img = productionSect.children[0];
        img.style.height = '';
      }
    };
    setElementSize();
    window.addEventListener('resize', setElementSize);
  }

  lazy = new lazyload({
    clearSrc: true,
    clearMedia: true
  });

  // lazyload встака google maps
  // let mapBlock = document.querySelector('.contacts-sect__map');

  // if (mapBlock) {
  //   let mapCoords = mapBlock.dataset.coords.split(/\,\s|\,/),
  //     mapZoom = +mapBlock.dataset.zoom,
  //     popupContent = '<p class="map__content">' + document.querySelector('.address__text').textContent + '</p>';

  //     initMap();
  //     function initMap() {
  //       let coords = {
  //           lat: +mapCoords[0],
  //           lng: +mapCoords[1]
  //         },
  //         svg = '<svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.4953 13.3314L17.6618 11.1312C17.59 11.0508 17.4874 11.0048 17.3795 11.0048C17.2717 11.0048 17.1691 11.0508 17.0973 11.1312L15.2639 13.3314C15.1727 13.4407 15.153 13.5931 15.2135 13.722C15.2741 13.8508 15.4037 13.9331 15.546 13.9328H16.1292C15.5865 16.144 13.6209 17.8491 11.1458 18.2451V8.79912H14.446C14.6486 8.79912 14.8127 8.63493 14.8127 8.43243V6.96567C14.8127 6.76317 14.6486 6.59898 14.446 6.59898H11.1458V5.65289C12.4474 5.12649 13.1935 3.75141 12.9253 2.3731C12.6571 0.994968 11.4498 0 10.0457 0C8.64178 0 7.43446 0.994968 7.16625 2.3731C6.89803 3.75141 7.64413 5.12649 8.94562 5.65289V6.59898H5.64542C5.44291 6.59898 5.27873 6.76317 5.27873 6.96567V8.43243C5.27873 8.63493 5.44291 8.79912 5.64542 8.79912H8.94562V18.2451C6.47047 17.8491 4.50506 16.144 3.96237 13.9328H4.54535C4.68787 13.9331 4.8175 13.8508 4.87802 13.722C4.93854 13.5931 4.91884 13.4407 4.82771 13.3314L2.99426 11.1312C2.92246 11.0508 2.81987 11.0048 2.7119 11.0048C2.60411 11.0048 2.50152 11.0508 2.42972 11.1312L0.596273 13.3314C0.505138 13.4407 0.485443 13.5931 0.545961 13.722C0.606479 13.8508 0.736109 13.9331 0.878452 13.9328H1.69634C2.23169 17.3431 5.2055 20.0234 8.94562 20.4673V20.8999C8.94652 20.9971 8.98448 21.0904 9.05198 21.1602L9.78536 21.8936C9.93003 22.0354 10.1615 22.0354 10.3062 21.8936L11.0396 21.1602C11.1071 21.0904 11.145 20.9971 11.1458 20.8999V20.4673C14.8861 20.0234 17.8599 17.3431 18.3952 13.9328H19.2129C19.3555 13.9331 19.4851 13.8508 19.5456 13.722C19.6061 13.5931 19.5864 13.4407 19.4953 13.3314ZM10.0457 4.03215C9.43818 4.03215 8.94562 3.53959 8.94562 2.93208C8.94562 2.32458 9.43818 1.83202 10.0457 1.83202C10.6534 1.83202 11.1458 2.32458 11.1458 2.93208C11.1458 3.53959 10.6534 4.03215 10.0457 4.03215Z" fill="#16656A"/></svg>',
  //         map = new google.maps.Map(mapBlock, {
  //             center: coords,
  //             zoom: mapZoom
  //         }),
  //         marker = new google.maps.Marker({
  //             position: coords,
  //             map: map,
  //             icon: {
  //               url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg)
  //             }
  //         }),
  //         infowindow = new google.maps.InfoWindow({
  //             content: popupContent
  //         });

  //         infowindow.open(map, marker);

  //         marker.addListener('click', function() {
  //           infowindow.open(map, marker);
  //         });

  //       map.setOptions({
  //         styles:
  //         [{
  //             "featureType": "administrative",
  //             "stylers": [{"visibility": "off"}]
  //           }, {
  //             "featureType": "road",
  //             "elementType": "geometry",
  //             "stylers": [{"lightness": 100},{"visibility": "simplified"}]
  //           }, {
  //             "featureType": "water",
  //             "elementType": "geometry",
  //             "stylers": [{"visibility": "on"},{"color": "#C6E2FF"}]
  //           }, {
  //             "featureType": "poi",
  //             "stylers": [{"visibility": "off"}]
  //           }, {
  //             "featureType": "poi",
  //             "elementType": "geometry.fill",
  //             "stylers": [{"color": "#C5E3BF"}]
  //           }, {
  //             "featureType": "poi.park",
  //             "stylers": [{"visibility": "on"}]
  //           }, {
  //             "featureType": "road",
  //             "elementType": "geometry.fill",
  //             "stylers": [{"color": "#D1D1B8"}]
  //           }]
  //       });

  //     }


  //   window.addEventListener('load', function() {
  //     setTimeout(function() {
  //       let scriptSrc = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAo1LNJevO-ouYd9LgKHtaGrrdtSDlBCO0&callback=initMap",
  //         tag = document.createElement("script");

  //       tag.setAttribute("async", "async");
  //       tag.setAttribute("src", scriptSrc);
  //       document.body.appendChild(tag);
  //     }, 1000);
  //   });
  // }
});