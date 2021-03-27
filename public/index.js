$(document).ready(function(){
  $('.sidenav').sidenav();
});

const swiper = new Swiper('.swiper-container', {
  grabCursor: true,
  breakpoints: {
    // when window width is >= 320px

    0: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    425: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 840px
    840: {
      slidesPerView: 3,
      spaceBetween: 40
    },
    1100: {
      slidesPerView: 4,
      spaceBetween: 40
    }
  },

  // slidesPerView: 2,
  // spaceBetween: 30,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
