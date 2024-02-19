import { auth } from '../../src/firebase-config.js'

const logout = document.getElementById("logout")
const enviarEmail = document.getElementById("enviarEmail")
const abrirModal = document.getElementById("abrirModal")

logout.addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href="../login/index.html"
    }).catch(() => {
        alert('Erro ao fazer LogOut')
    })
})

abrirModal.addEventListener('click', () => {
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    const slidercontainer = document.querySelector('main')
    const destaques = document.querySelector('#featured-container')
    const modal = document.querySelector('.janela-modal')
    modal.classList.add('abrir')

    header.style.display = "none"
    footer.style.display = "none"
    slidercontainer.style.display = "none"
    destaques.style.display = "none"

   

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar') {
            modal.classList.remove('abrir')

            header.style.display = "block"
            footer.style.display = "block"
            slidercontainer.style.display = "block"
            destaques.style.display = "block"
        }
    })
})

enviarEmail.addEventListener('click', () => {
    window.alert('Obrigado pela sua mensagem, aguarde um momento!')
})



