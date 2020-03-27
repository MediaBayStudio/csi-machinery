//=include main/_utils.js

document.addEventListener('DOMContentLoaded', function() {
  
  lazy = new lazyload({
    clearSrc: true,
    clearMedia: true
  });

  hdr = document.querySelector('.hdr');
  overlay = document.querySelector('.overlay');

  //=include main/_menu.js
  //=include main/_popups.js
  //=include main/_fixHdr.js
  //=include main/_catalog.js
  //=include main/_dropdownText.js
  //=include main/_telMask.js

});

// window.addEventListener('load', function() {
//   setTimeout(function() {
//     let scriptSrc = "//maps.googleapis.com/maps/api/js?key=AIzaSyBy9wC4w-xoCIJiXVNKr6RawJSDnJV7nIA&callback=initMap",
//         tag = document.createElement("script");

//     tag.setAttribute("async", "async");
//     tag.setAttribute("src", scriptSrc);
//     document.body.appendChild(tag)
//   }, 1000)
// });


// function initMap() {
//   let coords = {
//     lat: 57.757997,
//     lng: 40.986052
//   },
//   svg = '<svg width="32" height="44" viewBox="0 0 32 44" xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M31.233 17.088c0 13.683-15.342 26.356-15.342 26.356s-15.342-12.673-15.342-26.356c0-9.438 6.869-17.088 15.342-17.088s15.342 7.651 15.342 17.088z" fill="<?php echo $page_color; ?>"/><path d="M13.382 14.198l.871 1.242-.029.037-1.066-.988-.352 4.107-.05.004-.337-3.963-.645.524-.047-.041.563-.918-4.597-.413-.001-.063 4.405-.401-.76-1.104.028-.043 1.052.816.337-3.735.05-.002.372 3.843 1.321-1.218.024.03-.972 1.442 9.896.225v.028l-10.063.591zM23.887 13.928c-2.094 2.361-4.151 4.683-6.208 7.004l.053.063 4.97-5.418.618 1.264-7.396 6.16-.036-.041 1.348-1.767c1.77-2.306 3.545-4.609 5.31-6.921.174-.228.359-.355.622-.345l.72.002zM15.338 22.964l-7.371-6.077.604-1.187 3.512 3.766-4.682-5.496c.307.017.605.023.901.055.075.008.157.084.212.154 2.271 2.885 4.54 5.774 6.807 8.661l.048.083-.03.041zM21.078 13.259l-2.575-.001c-.206 0-.159-.181-.158-.314l.033-3.17c.005-.664.001-1.329.001-1.993l.099-.07.131.244c.507.674 1.025 1.339 1.523 2.022.132.181.241.404.303.628.215.784.405 1.577.603 2.368l.039.285zM16.279 22.046l-.487.816-.026-.011.6-2.286c.556-2.083 1.118-4.164 1.664-6.251.062-.237.151-.326.359-.322.503.009 1.006.003 1.546.003l-.79 1.711c-.873 1.874-1.748 3.747-2.619 5.622l-.108.342-.139.377zM7.26 13.57l3.693-5.398.051.02-.414 2.657c-.114.733-.22 1.468-.346 2.197-.019.112-.12.285-.194.292-.9.089-1.803.154-2.79.231zM20.199 8.083l3.9 5.291-.789-.001-1.836-.031c-.141-.001-.23-.035-.267-.221-.325-1.598-.659-3.195-.989-4.792l-.018-.246zM14.055 13.053l1.281-2.062-.04-.054-.936.482-.022-.042 1.248-1.153 2.545 2.83-4.077-.001zM15.618 21.62l-1.912-6.164.051-.027 1.852 3.509 2.026-4.433.046.019-1.999 7.085-.063.011zM16.279 22.047l.139-.376c.3-.531.608-1.056.899-1.592 1.068-1.962 2.132-3.927 3.193-5.895.101-.187.207-.291.414-.278.348.021.697.006 1.062.006l-.095.172c-1.82 2.605-3.641 5.208-5.463 7.811l-.148.152zM17.444 11.855l-1.807-2.197-1.643 1.777-.063-.051 1.794-4.385 1.816 4.755-.097.101zM12.258 12.149l-1.194-.943-.336.444c-.091-.405.084-1.403.291-1.696l1.745-2.456.22-.282v1.603l-.037.011-.13-.927-.06-.004-.499 4.251zM15.355 22.437c-.628-1.649-1.213-3.322-1.9-4.939-.342-.807-.358-1.585-.242-2.415l.054-.15 2.137 7.492-.049.012zM8.887 14.127c.308 0 .561-.015.811.008.09.009.207.087.254.174.701 1.293 1.393 2.593 2.053 3.924l-3.118-4.106z" fill="#fff"/></svg>',
//   map = new google.maps.Map(document.querySelector(".contacts-sect__map"), {
//       center: coords,
//       zoom: 14
//   }),
//   marker = new google.maps.Marker({
//       position: coords,
//       map: map,
//       icon: {
//         url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg)
//       }
//   });
//   map.setOptions({
//     styles:
//     [{
//         "featureType": "road",
//         "elementType": "geometry",
//         "stylers": [{"lightness": 100},{"visibility": "simplified"}]
//       },
//       {
//         "featureType": "water",
//         "elementType": "geometry",
//         "stylers": [{"visibility": "on"},{"color": "#C6E2FF"}]
//       },
//       {
//         "featureType": "poi",
//         "elementType": "geometry.fill",
//         "stylers": [{"color": "#C5E3BF"}]
//       },
//       {
//         "featureType": "road",
//         "elementType": "geometry.fill",
//         "stylers": [{"color": "#D1D1B8"}]
//       }]
//   });
// }