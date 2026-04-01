/**
 * Auth.js - Gestión de Autenticación con Netlify Identity
 */

// ====================================
// CONFIGURACIÓN
// ====================================

const PROTECTED_PAGES = ['home.html'];
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const logoutBtn = document.getElementById('logout-button').addEventListener('click', logout)

// ====================================
// INICIALIZACIÓN
// ====================================

function initNetlifyIdentity() {
    if (!window.netlifyIdentity) return;

    // Login exitoso → redirigir a home
    window.netlifyIdentity.on('login', (user) => {
        console.log('Login:', user.email);
        logUserAccess();
        window.netlifyIdentity.close();
        window.location.href = '/pages/home.html';
    });

    // Logout → redirigir a index (el modal aparece solo por el evento init)
    window.netlifyIdentity.on('logout', () => {
        console.log('Logout');
        window.location.href = '/index.html';
    });

    window.netlifyIdentity.on('error', (err) => {
        console.error('Error de autenticación:', err);
    });
}

// ====================================
// FUNCIONES DE AUTENTICACIÓN
// ====================================

function isUserAuthenticated() {
    try {
        return window.netlifyIdentity
            ? window.netlifyIdentity.currentUser() !== null
            : false;
    } catch (e) {
        return false;
    }
}

function getCurrentUser() {
    try {
        return window.netlifyIdentity
            ? window.netlifyIdentity.currentUser()
            : null;
    } catch (e) {
        return null;
    }
}

function logout() {
    if (window.netlifyIdentity) {
        window.netlifyIdentity.logout();
    }
}

function hasPermission(permission) {
    const user = getCurrentUser();
    if (!user) return false;
    const roles = user.user_metadata?.roles || [];
    return roles.includes(permission);
}

function logUserAccess() {
    const user = getCurrentUser();
    if (user) {
        console.log(`Acceso: ${user.email} — ${currentPage} — ${new Date().toLocaleString()}`);
    }
}

// ====================================
// PROTECCIÓN DE PÁGINA
// ====================================

function checkPageAccess() {
    if (!PROTECTED_PAGES.includes(currentPage)) return;

    if (!isUserAuthenticated()) {
        window.location.href = '/index.html';
    }
}

// ====================================
// BOTÓN DE LOGOUT EN HEADER
// ====================================

function initLogoutButton() {
    console.log("dentro de la función de initLogoutButton")
    const btn = document.getElementById('logout-button');
    console.log("Contenido de btn: " + btn)
    if (!btn) return;

    const user = getCurrentUser();
    console.log("Contenido de user: " + user)
    if (user) {
        btn.textContent = `${user.email} — Salir`;
    }
    btn.onclick = logout;
}

// ====================================
// INICIALIZACIÓN GENERAL
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    if (!window.netlifyIdentity) {
        console.error('Netlify Identity no está cargado. Verificá el script en el <head>.');
        return;
    }

    initNetlifyIdentity();
    checkPageAccess();
    //initLogoutButton();
    logUserAccess();

    const user = getCurrentUser();
    console.log(user ? `Sesión activa: ${user.email}` : 'Sin sesión activa');
});

// ====================================
// INICIO DE SESIÓN EN INDEX
// ====================================

// Si estamos en index.html y ya hay sesión activa, ir directo a home
// Si no hay sesión, abrir el modal automáticamente
if (currentPage === 'index.html' && window.netlifyIdentity) {
    window.netlifyIdentity.on('init', (user) => {
        if (user) {
            window.location.href = '/pages/home.html';
        } else {
            window.netlifyIdentity.open('login');
        }
        initLogoutButton()
    });
}

// ====================================
// API PÚBLICA
// ====================================

window.AuthManager = {
    isAuthenticated: isUserAuthenticated,
    getCurrentUser,
    logout,
    hasPermission,
};