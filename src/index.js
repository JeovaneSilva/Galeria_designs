import { auth } from './firebase-config.js';


const form = {
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    loginButton: () => document.getElementById("login-button"),
    registerButton: () => document.getElementById("register-Button:"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    recoverPasswordButton: () => document.getElementById("recover-password-button"),
} 

auth.onAuthStateChanged((user) => {
    if (user) {
        if (user.uid == "UQ45sWhvISX7MQeXundMEVMOcSf1") {
            window.location.href="../public/admin.html"
        } else {
            window.location.href="../public/home.html"
        }
    } else {
      alert('Usuário não logado');
    }
  });

  
form.email().addEventListener('change',() =>{
    toggleButtonsDisable();
    toggleEmailErrors();
})

form.password().addEventListener('change', () =>{
    toggleButtonsDisable();
    togglePasswordErrors();
})

form.loginButton().addEventListener('click', () => {
    showLoading();
    auth.signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(() => {
        if(form.email().value == "jeanlimadasilva392@gmail.com" && form.password().value == "admin123"){
            hideLoading();
            window.location.href = "../public/admin.html";
        } else{
            hideLoading();
            window.location.href = "../public/home.html";
        }
       
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
})

form.registerButton().addEventListener('click', () => {
    window.location.href = "../public/registrar.html";
})

form.recoverPasswordButton().addEventListener('click', () => {
    showLoading();
    auth.sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading();
        alert('Email enviado com sucesso');
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
})


function getErrorMessage(error) {
    if (error.code == "auth/invalid-credential") {
        return "Usuário nao encontrado";
    }
    if (error.code == "auth/wrong-password") {
        return "Senha inválida";
    }
    return error.message;
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function togglePasswordErrors() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    form.recoverPasswordButton().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    return form.password().value ? true : false;
}

