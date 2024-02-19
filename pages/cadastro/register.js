import { auth } from '../../src/firebase-config.js'

const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () => document.getElementById('register-button'),
    loginButton: () => document.getElementById('login-button')
    
}

auth.onAuthStateChanged((user) => {
    if (user) {
        if (user.uid == "UQ45sWhvISX7MQeXundMEVMOcSf1") {
            window.location.href="../userAdmin/admin.html"
        } else {
            window.location.href="../users/home.html"
        }
    } else {
      alert('Usuário não logado');
    }
  });


form.email().addEventListener('change', () => {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

    toggleRegisterButtonDisable();
})

form.password().addEventListener('change', () => {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";

    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordsMatch();
    toggleRegisterButtonDisable();
})

form.confirmPassword().addEventListener('change', () => {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
})

form.registerButton().addEventListener('click', () => {
    showLoading();

    const email = form.email().value;
    const password = form.password().value;
    auth.createUserWithEmailAndPassword(
        email, password
    ).then(() => {
        hideLoading();
        window.location.href = "../users/home.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    })
})


function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return "Email já está em uso";
    }
    return error.message;
}

function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display =
        password == confirmPassword ? "none" : "block";
}

function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}

function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;
    if (!password || password.length < 6) {
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return false;
    }

    return true;
}

form.loginButton().addEventListener('click', () => {
    window.location.href="../login/index.html"
})

