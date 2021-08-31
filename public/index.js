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

// Form char counter
$(document).ready(function() {
  $('input#input_text, textarea#message').characterCounter();
});

// Form select reason
$(document).ready(function(){
  $('select').formSelect();
});


// New Recipe

$(document).ready(function(){
  $('input.autocomplete').autocomplete({
    data: {
      "Cucharada": null,
      "Cucharadita": null,
      "Gramos": null,
      "Miligramos": null,
      "Kilogramos": null,
      "Taza": null,
      "Litro": null,
      "Mililitro": null,
      "Centímetro cúbico": null,
    },
  });
});
