import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js'
import {getDatabase, set, update, ref} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js'

const firebaseConfig = {
    apiKey: "AIzaSyBj5EaOF3I6sNRbI38NnQveyjk-U8rKM9M",
    authDomain: "tropizz.firebaseapp.com",
    databaseURL: "https://tropizz-default-rtdb.firebaseio.com",
    projectId: "tropizz",
    storageBucket: "tropizz.appspot.com",
    messagingSenderId: "663105869951",
    appId: "1:663105869951:web:fe4ed552ce4e2a83e2474a"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const googleProvider = new GoogleAuthProvider()
const database = getDatabase(app)

const registerBtn = document.querySelector('#registerBtn')
const loginBtn = document.querySelector('#loginBtn')
const loginWithGoogleBtn = document.querySelector('#loginWithGoogleBtn')

registerBtn.addEventListener('click', e => {
    const email = document.querySelector('#register_email').value
    const password = document.querySelector('#register_password').value

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user

            set(ref(database, `users/${user.uid}`), {email, password})
                .then(() => {
                    console.log(user)
                })
                .catch(e => {
                    console.error(e)
                })
        })
        .catch(e => {
            console.error(e)
        })
})

loginBtn.addEventListener('click', e => {
    const email = document.querySelector('#login_email').value
    const password = document.querySelector('#login_password').value

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            const log_date = new Date()

            update(ref(database, `users/${user.uid}`), {last_login: log_date})
                .then(() => {
                    console.log(user)
                })
                .catch(e => {
                    console.error(e)
                })
        })
        .catch(e => {
            console.error(e)
        })
})

loginWithGoogleBtn.addEventListener('click', e => {
    signInWithPopup(auth, googleProvider)
        .then((userCredential) => {
            const user = userCredential.user
            const log_date = new Date()

            update(ref(database, `users/${user.uid}`), {last_login: log_date})
                .then(() => {
                    console.log(user)
                })
                .catch(e => {
                    console.error(e)
                })
        })
        .catch(e => {
            console.error(e)
        })
})