feather.replace()

// const swiper = new Swiper('.swiper', {
//     direction: 'horizontal',
//     loop: true,
//
//     // Navigation arrows
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     }
// })

const menuIcon = document.querySelector('#hiddenMenu')
const hiddenMenu = document.querySelector('#hiddenMenu > ul')

menuIcon.addEventListener('click', e => {
    hiddenMenu.classList.toggle('hide')
})