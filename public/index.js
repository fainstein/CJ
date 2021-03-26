$(document).ready(function(){
  $('.sidenav').sidenav();
});

const swiper = new Swiper('.swiper-container', {
  grabCursor: true,
centeredSlides: true,
  breakpoints: {
    // when window width is >= 320px

    0: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    // when window width is >= 640px
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
