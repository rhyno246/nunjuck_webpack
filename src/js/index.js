import "slick-carousel/slick/slick.css";
import "slick-carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/page/index.scss';
import image from '../img/icon.png';

//css
// $('body').css({
//     'background' : 'url(' + image +')',
//     "background-size" : "cover",
//     "background-repeat" : "no-repeat"
// })

var index = (function ($) {
  function SlideShow () {
    $(".carousel").slick({
      prevArrow:
        '<button class="arrow-slick prev-slick"><i class="fa  fa-angle-left" aria-hidden="true"></i></button>',
      nextArrow:
        '<button class="arrow-slick next-slick"><i class="fa  fa-angle-right" aria-hidden="true"></i></button>',
    });
  }
  function init () {
    SlideShow();
  }
  return {
    init
  }
})(jQuery);

$(document).ready(function () {
  index.init();
})



