import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js'
import {
    getAuth,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js'
import {getDatabase, set, update, ref} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js'

const firebaseConfig = {
    apiKey: "AIzaSyD6kXmjGovzh0ce9Q_lPQJbLB8vkyDPs04",
    authDomain: "alkhan-ebe22.firebaseapp.com",
    databaseURL: "https://alkhan-ebe22-default-rtdb.firebaseio.com/",
    projectId: "alkhan-ebe22",
    storageBucket: "alkhan-ebe22.appspot.com",
    messagingSenderId: "767424477169",
    appId: "1:767424477169:web:246df69114798df9737650"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const googleProvider = new GoogleAuthProvider()
const database = getDatabase(app)

const registerBtn = document.querySelector('#registerBtn')
const loginBtn = document.querySelector('#loginBtn')
const loginWithGoogleBtn = document.querySelector('#loginWithGoogleBtn')

const signOutBtns = document.querySelectorAll('.signOut')

registerBtn?.addEventListener('click', e => {
    registerBtn.disabled = true

    const email = document.querySelector('#register_email').value
    const password = document.querySelector('#register_password').value

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user

            set(ref(database, `users/${user.uid}`), {email, password})
                .then(() => {
                    signInWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            const user = userCredential.user
                            const log_date = new Date()

                            update(ref(database, `users/${user.uid}`), {last_login: log_date})
                                .then(() => {
                                    sessionStorage.setItem('user', JSON.stringify({
                                        userId: user.uid,
                                        email
                                    }))
                                    registerBtn.disabled = false
                                    window.history.go(-1)
                                })
                                .catch(e => {
                                    console.error(e)
                                    registerBtn.disabled = false
                                })
                        })
                        .catch(e => {
                            console.error(e)
                            registerBtn.disabled = false
                        })
                })
                .catch(e => {
                    console.error(e)
                    registerBtn.disabled = false
                })
        })
        .catch(e => {
            console.error(e)
            registerBtn.disabled = false
        })
})

loginBtn?.addEventListener('click', e => {
    loginBtn.disabled = true

    const email = document.querySelector('#login_email').value
    const password = document.querySelector('#login_password').value

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            const log_date = new Date()

            update(ref(database, `users/${user.uid}`), {last_login: log_date})
                .then(() => {
                    sessionStorage.setItem('user', JSON.stringify({
                        userId: user.uid,
                        email
                    }))
                    loginBtn.disabled = false
                    window.history.go(-1)
                })
                .catch(e => {
                    console.error(e)
                    loginBtn.disabled = false
                })
        })
        .catch(e => {
            console.error(e)
            loginBtn.disabled = false
        })
})

loginWithGoogleBtn?.addEventListener('click', e => {
    loginWithGoogleBtn.disabled = true

    signInWithPopup(auth, googleProvider)
        .then((userCredential) => {
            const user = userCredential.user
            const log_date = new Date()

            update(ref(database, `users/${user.uid}`), {last_login: log_date})
                .then(() => {
                    sessionStorage.setItem('user', JSON.stringify({
                        userId: user.uid,
                        email: user.email
                    }))
                    loginWithGoogleBtn.disabled = false
                    window.history.go(-1)
                })
                .catch(e => {
                    console.error(e)
                    loginWithGoogleBtn.disabled = false
                })
        })
        .catch(e => {
            console.error(e)
            loginWithGoogleBtn.disabled = false
        })
})


signOutBtns?.forEach(btn => {
    btn.addEventListener('click', e => {
        signOut(auth)
            .then(() => {
                sessionStorage.removeItem('user')
                console.log('Signed out!')

                const slashIndex = window.location.href.lastIndexOf('/')
                const extensionIndex = window.location.href.indexOf('.html')
                if (window.location.href.slice(slashIndex, extensionIndex) === '/user'){
                    window.location.href = '/Tropizz/index.html'
                    return
                }
                window.location.reload()
            })
            .catch(e => {
                console.error(e)
            })
    })
})