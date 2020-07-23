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