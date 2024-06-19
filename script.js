//DEFINICION DE LA CLASE "USER" o "USUARIO"
class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static getAllUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    static saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    static findUser(email, password) {
        const users = User.getAllUsers();
        return users.find(user => user.email === email && user.password === password);
    }

    static userExists(email) {
        const users = User.getAllUsers();
        return users.some(user => user.email === email);
    }

    save() {
        const users = User.getAllUsers();
        users.push(this);
        User.saveUsers(users);
    }
}

//INICIO DE SESION LOGICA


document.addEventListener('DOMContentLoaded', function() {
    // Lógica para el inicio de sesión
    const loginForm = document.querySelector('.login form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar que el formulario se envíe automáticamente
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            const user = User.findUser(email, password);
            if (user) {
                localStorage.setItem('loggedInUserName', user.name);
                window.location.href = "sesioniniciada.html";
            } else {
                alert("Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.");
            }
        });
    }

    // Lógica para mostrar el nombre del usuario en sesioniniciada.html
    const userName = localStorage.getItem('loggedInUserName');
    if (userName) {
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage) {
            welcomeMessage.textContent = `¡Hola, ${userName}! ¿Qué te gustaría hacer hoy?`;
        }
    }

    // Lógica para el registro
    const registerForm = document.querySelector('.register form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar que el formulario se envíe automáticamente
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            if (password !== confirmPassword) {
                alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
                return;
            }
            
            if (User.userExists(email)) {
                alert("El correo electrónico ya está registrado. Por favor, inicia sesión o utiliza otro correo electrónico.");
                return;
            }
            
            const newUser = new User(name, email, password);
            newUser.save();
            localStorage.setItem('loggedInUserName', name);
            window.location.href = "sesioniniciada.html";
        });
    }

    // Crear cuenta de administrador si no existe
    const adminUser = new User('Administrador', 'admin@admin.com', 'admin');
    if (!User.userExists(adminUser.email)) {
        adminUser.save();
    }
});

//REDIRECCION

function redirectToSesionIniciada() {
    window.location.href = "cuenta.html";
}

