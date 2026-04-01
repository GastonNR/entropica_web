/**
 * Auth.js - Gestión de Autenticación con Netlify Identity
 */

// ====================================
// CONFIGURACIÓN
// ====================================

const PROTECTED_PAGES = ['home.html'];
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// ====================================
// INICIALIZACIÓN
// ====================================

function initNetlifyIdentity() {
    if (!window.netlifyIdentity) return;

    window.netlifyIdentity.on('login', (user) => {
        console.log('Login:', user.email);
        window.netlifyIdentity.close();
        updateAuthButton();
        logUserAccess();
        window.location.href='/pages/home.html'
    });

    window.netlifyIdentity.on('logout', () => {
        console.log('Logout');
        updateAuthButton();
        // Abrir modal de login automáticamente
        setTimeout(() => {
            window.netlifyIdentity.open('login');
        }, 300);
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
        window.location.href="/index.html"
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
        // Abrir modal de login si no hay sesión
        if (window.netlifyIdentity) {
            window.netlifyIdentity.open('login');
        }
    }
}

// ====================================
// BOTÓN DE AUTENTICACIÓN EN HEADER
// ====================================

function updateAuthButton() {
    const btn = document.getElementById('logout-button');
    if (!btn) return;

    const user = getCurrentUser();

    if (user) {
        btn.textContent = `${user.email} — Salir`;
        btn.onclick = logout;
        
    } else {
        btn.textContent = 'Login';
        btn.onclick = () => window.netlifyIdentity?.open('login');
    }
}

function 

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
    updateAuthButton();
    logUserAccess();

    const user = getCurrentUser();
    console.log(user ? `Sesión activa: ${user.email}` : 'Sin sesión activa');
});

// ====================================
// API PÚBLICA
// ====================================

window.AuthManager = {
    isAuthenticated: isUserAuthenticated,
    getCurrentUser,
    logout,
    hasPermission,
};