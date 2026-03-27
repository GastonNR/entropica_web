/**
 * Auth.js - Gestión de Autenticación con Netlify Identity
 * Maneja login, logout y redirección de usuarios
 */

// ====================================
// VARIABLES GLOBALES
// ====================================

const PROTECTED_PAGES = ['index.html'];
const LOGIN_PAGE = 'login.html';
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// ====================================
// INICIALIZACIÓN DE NETLIFY IDENTITY
// ====================================

/**
 * Inicializar Netlify Identity Widget
 */
function initNetlifyIdentity() {
    if (window.netlifyIdentity) {
        // Redirigir al login después del cierre de sesión
        window.netlifyIdentity.on('logout', () => {
            redirectToLogin();
        });

        // Redirigir al dashboard después del login
        window.netlifyIdentity.on('login', (user) => {
            console.log('Usuario autenticado:', user.email);
            // Redirigir a la página principal
            window.location.href = 'index.html';
        });

        // Manejador de errores de autenticación
        window.netlifyIdentity.on('error', (err) => {
            console.error('Error de autenticación:', err);
        });

        return true;
    }
    return false;
}

// ====================================
// FUNCIONES DE AUTENTICACIÓN
// ====================================

/**
 * Verificar si el usuario está autenticado
 */
async function isUserAuthenticated() {
    try {
        if (window.netlifyIdentity) {
            const user = window.netlifyIdentity.currentUser();
            return user !== null;
        }
        return false;
    } catch (error) {
        console.error('Error verificando autenticación:', error);
        return false;
    }
}

/**
 * Obtener datos del usuario actual
 */
function getCurrentUser() {
    try {
        if (window.netlifyIdentity) {
            return window.netlifyIdentity.currentUser();
        }
        return null;
    } catch (error) {
        console.error('Error obteniendo usuario:', error);
        return null;
    }
}

/**
 * Redirigir al login si no está autenticado
 */
function redirectToLogin() {
    if (!window.location.href.includes(LOGIN_PAGE)) {
        console.log('No autenticado. Redirigiendo a login...');
        window.location.href = LOGIN_PAGE;
    }
}

/**
 * Redirigir al dashboard si está autenticado (desde login)
 */
function redirectToDashboard() {
    console.log('Autenticado. Accediendo al dashboard...');
    window.location.href = 'index.html';
}

// ====================================
// PROTECCIÓN DE CONTENIDO
// ====================================

/**
 * Verificar acceso a página protegida
 */
async function checkPageAccess() {
    // Si no está protegida, permitir acceso directo
    if (!PROTECTED_PAGES.includes(currentPage)) {
        return true;
    }

    // Esperar a que Netlify Identity esté inicializado
    await new Promise(resolve => {
        const checkIdentity = () => {
            if (window.netlifyIdentity) {
                resolve();
            } else {
                setTimeout(checkIdentity, 100);
            }
        };
        checkIdentity();
    });

    // Verificar autenticación
    const authenticated = await isUserAuthenticated();

    if (!authenticated && currentPage === 'index.html') {
        redirectToLogin();
        return false;
    }

    return true;
}

// ====================================
// GESTIÓN DE UI PARA AUTENTICACIÓN
// ====================================

/**
 * Actualizar UI del botón de autenticación
 */
async function updateAuthButton() {
    const authButton = document.getElementById('auth-button');
    if (!authButton) return;

    const user = await isUserAuthenticated();

    if (user) {
        const currentUser = getCurrentUser();
        authButton.textContent = `${currentUser?.email || 'Cuenta'} (Logout)`;
        authButton.classList.add('logout');
        authButton.addEventListener('click', logout);
    } else {
        authButton.textContent = 'Login';
        authButton.classList.remove('logout');
        authButton.addEventListener('click', () => {
            if (window.netlifyIdentity) {
                window.netlifyIdentity.open();
            }
        });
    }
}

/**
 * Logout del usuario
 */
function logout() {
    if (window.netlifyIdentity) {
        window.netlifyIdentity.logout();
        console.log('Usuario desconectado');
    }
}

// ====================================
// MANEJO DE FORMULARIO DE LOGIN MANUAL
// ====================================

/**
 * Inicializar formulario manual de login (fallback)
 */
function initManualLoginForm() {
    const form = document.getElementById('manual-login-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email')?.value;
        const password = document.getElementById('password')?.value;

        if (!email || !password) {
            alert('Por favor, completa todos los campos');
            return;
        }

        try {
            // Esta es una demostración. En producción usarías Netlify Identity
            console.log('🔐 Intento de login con:', email);
            alert('Por favor, usa el login de Netlify Identity de arriba.\n\nEst e formulario es solo un fallback para propósitos de demostración.');
        } catch (error) {
            console.error('Error en login:', error);
            alert('Error durante el login. Por favor, intenta de nuevo.');
        }
    });
}

// ====================================
// MOSTRAR PANEL DE LOGIN EN LA PÁGINA DE LOGIN
// ====================================

/**
 * Mostrar widget de Netlify Identity en página de login
 */
function initLoginPage() {
    if (currentPage === LOGIN_PAGE && window.netlifyIdentity) {
        // El widget se inicializa automáticamente en el div con id "netlify-identity-container"
        window.netlifyIdentity.open('signup');
        
        // Event listener para cuando se cierre sin login
        const checkAuth = setInterval(async () => {
            if (await isUserAuthenticated()) {
                clearInterval(checkAuth);
                redirectToDashboard();
            }
        }, 500);
    }
}

// ====================================
// SISTEMA DE PERMISOS (PREPARADO PARA FUTURO)
// ====================================

/**
 * Verificar si el usuario tiene permisos específicos
 */
function hasPermission(permission) {
    const user = getCurrentUser();
    if (!user) return false;

    // Aquí se pueden agregar lógicas de permisos basadas en:
    // - Roles de usuario
    // - Metadatos en Netlify Identity
    // - Claims JWT

    const userMetadata = user.user_metadata || {};
    const roles = userMetadata.roles || [];

    return roles.includes(permission);
}

/**
 * Registrar acceso de usuario (para análisis)
 */
function logUserAccess() {
    const user = getCurrentUser();
    if (user) {
        console.log(`Acceso de usuario: ${user.email} - Página: ${currentPage} - ${new Date().toLocaleString()}`);
    }
}

// ====================================
// INICIALIZACIÓN GENERAL
// ====================================

/**
 * Ejecutar todas las inicializaciones cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🔐 Iniciando sistema de autenticación...');

    // Inicializar Netlify Identity
    initNetlifyIdentity();

    // Esperar a que Netlify Identity esté completamente cargado
    const waitForIdentity = new Promise(resolve => {
        const checkIdentity = () => {
            if (window.netlifyIdentity) {
                resolve();
            } else {
                setTimeout(checkIdentity, 100);
            }
        };
        checkIdentity();
    });

    await waitForIdentity;

    // Verificar acceso a página protegida
    const hasAccess = await checkPageAccess();
    if (!hasAccess) {
        return;
    }

    // Actualizar UI del botón de autenticación
    updateAuthButton();

    // Inicializar página de login si aplica
    initLoginPage();

    // Inicializar formulario manual si existe
    initManualLoginForm();

    // Registrar acceso del usuario
    logUserAccess();

    // Mostrar información en consola
    const user = getCurrentUser();
    if (user) {
        console.log(`✅ Sesión activa para: ${user.email}`);
    } else {
        console.log('⚠️ No hay sesión activa');
    }
});

// ====================================
// MANEJO DE CAMBIOS DE SESIÓN
// ====================================

/**
 * Monitorear cambios en la sesión
 */
if (window.netlifyIdentity) {
    window.netlifyIdentity.on('login', async () => {
        console.log('Detectado login. Actualizando UI...');
        updateAuthButton();
        logUserAccess();
    });

    window.netlifyIdentity.on('logout', async () => {
        console.log('Detectado logout. Actualizando UI...');
        updateAuthButton();
    });
}

// ====================================
// EXPORTAR FUNCIONES PARA USO EXTERNO
// ====================================

window.AuthManager = {
    isAuthenticated: isUserAuthenticated,
    getCurrentUser: getCurrentUser,
    logout: logout,
    hasPermission: hasPermission,
    redirectToDashboard: redirectToDashboard,
    redirectToLogin: redirectToLogin
};

console.log('Auth.js cargado correctamente');
console.log('Sistema de autenticación listo');
