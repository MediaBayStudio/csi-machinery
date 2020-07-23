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