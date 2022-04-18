import '@firebase/app'

// import { init } from 'init-firebase'

// import { getAuth, signInWithEmailAndPassword, createUserWi   thEmailAndPassword, GoogleAuthProvider } from "firebase/auth"
// import { getAuth } from "firebase/auth"

// import firebase from "firebase/compat";
// import initializeApp from "firebase.initializeApp"

const firebaseConfig = {
    apiKey: "AIzaSyBj5EaOF3I6sNRbI38NnQveyjk-U8rKM9M",
    authDomain: "tropizz.firebaseapp.com",
    projectId: "tropizz",
    storageBucket: "tropizz.appspot.com",
    messagingSenderId: "663105869951",
    appId: "1:663105869951:web:9ee2c79654581c7be2474a"
}

const app = initializeApp(firebaseConfig)
// const auth = getAuth(app)
// const provider = new GoogleAuthProvider(app)

const goLogin = document.querySelector('#goLogin')
const goRegister = document.querySelector('#goRegister')

const loginBlock = document.querySelector('.login')
const registerBlock = document.querySelector('.register')

const registerBtn = document.querySelector('#registerBtn')
const loginBtn = document.querySelector('#loginBtn')

feather.replace()

goLogin.addEventListener('click', e => {
    e.preventDefault()
    loginBlock.classList.add('showForm')
    loginBlock.classList.remove('hideForm')
    registerBlock.classList.add('hideForm')
    registerBlock.classList.remove('showForm')
})

goRegister.addEventListener('click', e => {
    e.preventDefault()
    loginBlock.classList.remove('showForm')
    loginBlock.classList.add('hideForm')
    registerBlock.classList.add('showForm')
    registerBlock.classList.remove('hideForm')
})

for (let form of document.forms) {
    form.addEventListener('submit', e => {
        e.preventDefault()
    })
}

// registerBtn.addEventListener('click', e => {
//     const email = document.querySelector('#register_email')
//     const password = document.querySelector('#register_password')
//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             const user = userCredential.user
//         })
//         .catch(e => {
//             console.error(e)
//         })
// })