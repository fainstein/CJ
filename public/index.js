// INIT AOS
AOS.init();

// INIT SIDDENAV
$(document).ready(function(){
  $('.sidenav').sidenav();
});

const swiper = new Swiper('.swiper-container', {
  grabCursor: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    425: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    840: {
      slidesPerView: 3,
      spaceBetween: 40
    },
    1100: {
      slidesPerView: 4,
      spaceBetween: 40
    }
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// $('.dropdown-trigger').dropdown();

$(".dropdown-menu li a").click(function(){
  $(".btn:first-child").html($(this).text()+' <span class="caret"></span>');
});
