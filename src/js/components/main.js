//=include main/_intersectionObserverPolyfill.js
//=include main/_customEventsPolyfill.js
//=include main/_closestPolyfill.js
//=include main/_utils.js

document.addEventListener('DOMContentLoaded', function() {


  hdr = document.querySelector('.hdr');
  overlay = document.querySelector('.overlay');

  //=include main/_menu.js
  //=include main/_popups.js
  //=include main/_fixHdr.js
  //=include main/_catalog.js
  //=include main/_dropdownText.js
  //=include main/_telMask.js

  //=include jquery-settings/_forms.js
  //=include jquery-settings/_sliders.js

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