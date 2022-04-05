const menuIcon = document.querySelector('#hiddenMenu')
const hiddenMenu = document.querySelector('#hiddenMenu > ul')

const goTopBtn = document.querySelector('#goTopBtn')

ScrollReveal().reveal('div', {delay: 25, reset: true})
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

menuIcon.addEventListener('click', e => {
    hiddenMenu.classList.toggle('hide')
})

const goTopBtnAnimation = () => {
    if (window.scrollY <= window.innerHeight / 2) {
        goTopBtn.classList.add('hide')
        setTimeout(() => {
            goTopBtn.style.opacity = '0'
        }, 500)
    } else {
        goTopBtn.classList.remove('hide')
        setTimeout(() => {
            goTopBtn.style.opacity = '1'
        }, 500)
    }
}
goTopBtnAnimation()

window.addEventListener("scroll", goTopBtnAnimation)

goTopBtn.addEventListener('click', () => {
    window.scrollTo(0, 0)
})