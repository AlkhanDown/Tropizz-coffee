const user = JSON.parse(sessionStorage.getItem('user'))

const menuIcon = document.querySelector('#hiddenMenu')
const hiddenMenu = document.querySelector('#hiddenMenu > ul')

const waveImg = document.querySelector('.wave')
const productsImages = Array.from(document.querySelectorAll('.cardImg img'))

const goTopBtn = document.querySelector('#goTopBtn')
const authAndAccountLinks = document.querySelectorAll('.authAndAccount')

const userNameInput = document.querySelector('#userName')
const userEmailInput = document.querySelector('#email')
if (userNameInput && userEmailInput) {
    userNameInput.value = user.username ?? ''
    userEmailInput.value = user.email
}

const addToCartBtn = document.querySelector('.addToCart')
const cartContainer = document.querySelector('#cart')

waveImg?.setAttribute('loading', 'lazy')
productsImages?.splice(0, 7).forEach(el => el.setAttribute('loading', 'lazy'))

feather.replace()

menuIcon.addEventListener('click', e => {
    hiddenMenu.classList.toggle('hide')
})

menuIcon.addEventListener('click', () => {
    menuIcon.querySelector('svg').classList.toggle('clicked')
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

if (user) {
    authAndAccountLinks.forEach(link => {
        const index = user.email.indexOf('@')
        link.innerHTML = user.email.slice(0, index)
        link.href = '/Tropizz/pages/user.html'
    })
} else {
    const signOutBtns = document.querySelectorAll('.signOut')
    signOutBtns.forEach(btn => {
        btn.parentElement.remove()
    })
}

const getCurrentPageLocation = () => {
    const slashIndex = window.location.href.lastIndexOf('/')
    const dotHtmlIndex = window.location.href.indexOf('.html')

    return window.location.href.slice(slashIndex, dotHtmlIndex)
}

if (getCurrentPageLocation() === '/user') {
    authAndAccountLinks.forEach(link => {
        link.classList.add('active')
    })
} else {
    authAndAccountLinks.forEach(link => {
        link.classList.remove('active')
    })
}

const updateNumberOfProduct = () => {
    const cart = JSON.parse(sessionStorage.getItem('cart'))
    const number = document.querySelector('.numberInCart .number')
    if (cart && number){
        number.innerHTML = cart[getCurrentPageLocation().slice(1)] ? cart[getCurrentPageLocation().slice(1)] : '0'
    }
}
updateNumberOfProduct()


addToCartBtn?.addEventListener('click', e => {
    e.preventDefault()
    const newItem = getCurrentPageLocation().slice(1)

    let cart = JSON.parse(sessionStorage.getItem('cart'))
    if (!cart) {
        sessionStorage.setItem('cart', JSON.stringify({ [newItem]: 1 }))
    } else {
        const newList = cart[newItem]
            ? { ...cart, [newItem]: cart[newItem] + 1 }
            : { ...cart, [newItem]: 1 }

        sessionStorage.setItem('cart', JSON.stringify(newList))
    }
    updateNumberOfProduct()

    console.log(sessionStorage.getItem('cart'))
})

if (cartContainer){
    const cart = JSON.parse(sessionStorage.getItem('cart'))

    if (cart){
        const createElement = (tagName = 'div') => document.createElement(tagName)

        for (const arr of Object.entries(cart)){
            const newProductElement = createElement()
            newProductElement.classList.add('productItem')

            const productName = createElement()
            productName.classList.add('productName')
            const h3 = createElement('h3')
            h3.innerHTML = arr[0]
            productName.appendChild(h3)

            const productNumber = createElement()
            productNumber.classList.add('productNumber')
            productNumber.innerHTML = arr[1]

            const deleteProductBtn = createElement('button')
            deleteProductBtn.classList.add('deleteProduct')
            deleteProductBtn.innerHTML = 'Удалить'

            newProductElement.appendChild(productName)
            newProductElement.appendChild(productNumber)
            newProductElement.appendChild(deleteProductBtn)

            cartContainer.appendChild(newProductElement)
        }
    }
}

const deleteProductBtns = document.querySelectorAll('.deleteProduct')

deleteProductBtns?.forEach(btn => {
    btn.addEventListener('click', e => {
        btn.disabled = true

        const closestParentName = btn.closest('.productItem').querySelector('.productName h3')
        const cart = JSON.parse(sessionStorage.getItem('cart'))
        delete cart[closestParentName.innerHTML]
        sessionStorage.setItem('cart', JSON.stringify(cart))

        btn.disabled = false
        window.location.reload()
    })
})