const swiper = new Swiper('.swiper', {

    direction: 'horizontal',

    slidesPerView: 1.3,
    spaceBetween: 32,

    centeredSlides: true,
    rewind: true,
    
    breakpoints: {
        600: {
            slidesPerView: 4.3,
        },
    },
    mousewheel: {
        invert: false,
    },
    keyboard: {
        enabled: true,
        onlyInViewport: false,
    },

    pagination: {
        el: '.swiper-pagination',
    },
});