/**
 * Main JavaScript
 * Gestiona navegación, scroll suave y highlight de secciones activas
 */

// ====================================
// VARIABLES GLOBALES
// ====================================

const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

// ====================================
// FUNCIONES DE NAVEGACIÓN
// ====================================

/**
 * Actualiza el link activo en el sidebar
 */
function updateActiveLink() {
    let currentSection = '';
    
    // Encontrar qué sección está más visible en el viewport
    contentSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom > 200) {
            currentSection = section.getAttribute('id');
        }
    });

    // Actualizar clase activa en los links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active');
        }
    });
}

/**
 * Scroll suave a una sección
 */
function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Actualizar el link activo inmediatamente
        setTimeout(() => {
            updateActiveLink();
        }, 500);
    }
}

// ====================================
// EVENT LISTENERS
// ====================================

// Navegación por clicks en sidebar
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        smoothScrollToSection(sectionId);
    });
});

// Actualizar link activo durante scroll
mainContent.addEventListener('scroll', updateActiveLink);

// Inicializar highlight al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateActiveLink();
});

// ====================================
// FUNCIONES AUXILIARES
// ====================================

/**
 * Animar elementos al entrar en viewport
 */
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-in forwards';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observar secaracteres
    const cards = document.querySelectorAll('.info-card, .process-card');
    cards.forEach(card => observer.observe(card));
}

// Ejecutar observador cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', observeElements);

// ====================================
// MANEJO DE DIAGRAMAS
// ====================================

/**
 * Asegurar que los iframes sean responsive
 */
function makeIframesResponsive() {
    const iframes = document.querySelectorAll('.diagram-frame');
    
    iframes.forEach(iframe => {
        // Agregar atributo sandbox para seguridad
        iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts');
        
        // Agregar listeners para errores de carga
        iframe.addEventListener('error', () => {
            console.warn('El diagrama no se pudo cargar:', iframe.src);
            iframe.style.display = 'none';
            const errorMsg = document.createElement('div');
            errorMsg.className = 'info-card';
            errorMsg.innerHTML = '<p style="color: var(--text-tertiary);">⚠️ No se pudo cargar el diagrama. Por favor, verifica la ruta del archivo.</p>';
            iframe.parentElement.insertBefore(errorMsg, iframe);
        });
    });
}

document.addEventListener('DOMContentLoaded', makeIframesResponsive);

// ====================================
// KEYBOARD SHORTCUTS
// ====================================

/**
 * Atajos de teclado
 * Ctrl/Cmd + K: Focus en búsqueda (preparado para futuras búsquedas)
 * G + cualquier número: Ir a sección
 */
document.addEventListener('keydown', (e) => {
    // Evitar conflictos si estamos escribiendo en un input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }

    // Atajos rápidos
    if (e.ctrlKey || e.metaKey) {
        if (e.key === 'k' || e.key === 'K') {
            e.preventDefault();
            // Preparado para búsqueda futura
            console.log('Atajo: Buscar (preparado)');
        }
    }
});

// ====================================
// MONITOREO DE VIEWPORT
// ====================================

/**
 * Detectar cambios en el tamaño de la ventana
 */
window.addEventListener('resize', () => {
    updateActiveLink();
});

// ====================================
// INICIALIZACIÓN
// ====================================

console.log('Main.js cargado correctamente');
console.log('Sitio de documentación Entrópica inicializado');
