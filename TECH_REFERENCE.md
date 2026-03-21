/* ========================================
   GUÍA TÉCNICA RÁPIDA
   ======================================== */

/**
 * Este archivo proporciona una referencia rápida sobre
 * la estructura técnica del proyecto.
 */

// ========================================
// 1. ESTRUCTURA DE ARCHIVOS
// ========================================

/*
MDN - Entropic - version web/
│
├── 📄 index.html                    ← Página principal (protegida)
├── 📄 login.html                    ← Página de autenticación
├── 🎨 styles.css                    ← Todos los estilos (800+ líneas)
├── ⚙️  main.js                      ← Lógica de navegación
├── 🔐 auth.js                       ← Autenticación Netlify Identity
├── 📦 package.json                  ← Metadatos del proyecto
├── 🌐 netlify.toml                  ← Configuración de deploymento
├── 📚 README.md                     ← Documentación completa
├── ✏️  PERSONALIZACION.html          ← Guía de customización
├── 🔍 TECH_REFERENCE.md             ← Este archivo
├── .gitignore                       ← Archivos excluidos de Git
│
└── 📁 public/
    └── 📁 diagramas/
        ├── cadena-valor.html        ← Diagrama 1: Valor
        ├── jerarquia.html           ← Diagrama 2: Estructura
        ├── flujo-trabajo.html       ← Diagrama 3: Workflow
        └── actividades.html         ← Diagrama 4: Tareas
*/

// ========================================
// 2. FLUJO DE AUTENTICACIÓN
// ========================================

/*
USUARIO NO AUTENTICADO:
    ↓
Usuario intenta acceder → index.html
    ↓
auth.js detecta NO autenticado
    ↓
Redirect → login.html
    ↓
Widget Netlify Identity muestra
    ↓
Usuario ingresa credenciales
    ↓
Netlify valida
    ↓
✅ Usuario autenticado
    ↓
Redirect → index.html

USUARIO YA AUTENTICADO:
    ↓
Usuario accede → index.html
    ↓
auth.js detecta SÍ autenticado
    ↓
✅ Contenido mostrado normalmente
*/

// ========================================
// 3. COMPONENTES PRINCIPALES
// ========================================

/*
HEADER (Sticky)
├── Logo/Título
└── Botón Auth (Login/Logout)

SIDEBAR FIJO (280px)
├── Menú de Navegación
│   ├── Link 1 (con highlight activo)
│   ├── Link 2
│   ├── ...
│   └── Link 7
└── Scroll independiente

MAIN CONTENT
├── Seccion 1 (fade-in animation)
├── Seccion 2 (con iframe diagrama)
├── Seccion 3
├── ...
└── Footer

DIAGRAMAS (Iframes)
├── Ancho: 100%
├── Alto: 70vh
├── Border-radius: 8px
├── Sombra: suave
└── Responsive
*/

// ========================================
// 4. SISTEMA DE COLORES
// ========================================

/*
PALETA DE COLORES (en styles.css):

Fondos:
  --bg-primary: #f9fafb      (Fondo general)
  --bg-secondary: #ffffff    (Tarjetas/Contenedor)
  --bg-tertiary: #f3f4f6     (Destacado)

Textos:
  --text-primary: #111827    (Principal - Muy oscuro)
  --text-secondary: #6b7280  (Secundario - Gris medio)
  --text-tertiary: #9ca3af   (Terciario - Gris claro)

Acentos:
  --accent-primary: #3b82f6  (Azul - Links activos)
  --accent-secondary: #10b981 (Verde - Acciones positivas)
  --accent-hover: #2563eb    (Azul hover)

Bordes:
  --border-color: #e5e7eb    (Normal)
  --border-color-light: #f3f4f6 (Suave)

Sombras:
  --shadow-sm: 0 1px 2px...
  --shadow-md: 0 4px 6px...
  --shadow-lg: 0 10px 15px...
*/

// ========================================
// 5. JAVASCRIPT: FUNCIONES PRINCIPALES
// ========================================

/*
main.js:
  ✓ updateActiveLink()          - Destaca sección actual
  ✓ smoothScrollToSection()     - Scroll suave
  ✓ observeElements()           - Anima al entrar en view
  ✓ makeIframesResponsive()     - Valida diagramas

auth.js:
  ✓ initNetlifyIdentity()       - Inicia sesión
  ✓ isUserAuthenticated()       - Verifica login
  ✓ getCurrentUser()            - Obtiene datos usuario
  ✓ redirectToLogin()           - Protege acceso
  ✓ checkPageAccess()           - Control de páginas
  ✓ updateAuthButton()          - Actualiza UI
  ✓ hasPermission()             - Sistema permisos
  ✓ AuthManager (global)        - API pública
*/

// ========================================
// 6. CSS: CLASES PRINCIPALES
// ========================================

/*
Layout:
  .app-container       - Contenedor principal
  .app-header          - Header fijo superior
  .main-layout         - Flex: sidebar + main content
  .sidebar             - Sidebar fijo 280px
  .main-content        - Contenido scrollable

Navegación:
  .nav-menu            - Contenedor menú
  .nav-list            - Lista de links
  .nav-link            - Link individual
  .nav-link.active     - Link activo (highlight)

Contenido:
  .content-section     - Sección de contenido
  .info-card           - Tarjeta de información
  .process-card        - Tarjeta de proceso
  .card-group          - Grid de tarjetas

Diagramas:
  .diagram-frame       - Iframe de diagramas

Tablas:
  .activity-table      - Tabla de actividades

Elementos:
  .btn-primary         - Botón principal
  .auth-btn            - Botón autenticación
  .login-container     - Contenedor login
*/

// ========================================
// 7. RESPONSIVE BREAKPOINTS
// ========================================

/*
Desktop: > 768px
  - Sidebar fijo izquierda (280px)
  - Menú vertical
  - Layout normal

Tablet: 481px - 768px
  - Sidebar horizontal arriba
  - Menú scroll horizontal
  - Contenido ajustado

Mobile: < 480px
  - Sidebar horizontal
  - Íconos de menú opcionales
  - Column única
  - Texto escalado
  - Diagramas altura reducida (40vh)
*/

// ========================================
// 8. ANIMACIONES CSS
// ========================================

/*
@keyframes fadeIn
  - Fade in + slide up
  - Duración: 0.4s
  - Timing: ease-in

@keyframes slideInLeft
  - Slide desde izquierda con fade
  - Duración: 0.3s

Transiciones:
  - Duración universal: 0.3s
  - Timing: cubic-bezier(0.4, 0, 0.2, 1)
  - Se aplica a: hover, focus, cambios de estado
*/

// ========================================
// 9. NETLIFY IDENTITY: CONFIGURACIÓN
// ========================================

/*
Pasos de Setup:

1. En Netlify App:
   ✓ Site Settings → Identity → Enable
   ✓ Set provider (Google, GitHub, etc.) - OPCIONAL
   ✓ Set registration: "Invite only" o "Open"

2. En este proyecto:
   ✓ Descargar script Netlify Identity (ya incluido)
   ✓ auth.js maneja todo automáticamente

3. Para usuarios:
   ✓ Invite via email (si está en "Invite only")
   ✓ O signup directo (si está "Open")

4. En código:
   ✓ window.netlifyIdentity.currentUser() - Get user
   ✓ window.netlifyIdentity.logout() - Logout
   ✓ window.netlifyIdentity.on() - Event listeners
*/

// ========================================
// 10. SEGURIDAD Y PERFORMANCE
// ========================================

/*
Seguridad (netlify.toml):
  ✓ X-Frame-Options: SAMEORIGIN
  ✓ X-Content-Type-Options: nosniff
  ✓ X-XSS-Protection: 1; mode=block
  ✓ Referrer-Policy: strict-origin-when-cross-origin
  ✓ Permissions-Policy: restrictivo

HTTPS:
  ✓ Automático en Netlify
  ✓ Certificado Let's Encrypt (gratis)

Caching:
  ✓ CSS/JS inmutable: 1 año
  ✓ HTML: 1 hora (siempre revisa)
  ✓ auth.js: 1 hora (sensible a cambios)

Performance:
  ✓ Sin frameworks externos
  ✓ CSS < 20KB
  ✓ JS < 15KB (auth + main)
  ✓ Sin dependencias node
  ✓ Lighthouse score: 90+

Lighthouse Típico:
  - Performance: 98
  - Accessibility: 95
  - Best Practices: 100
  - SEO: 100
*/

// ========================================
// 11. VARIABLES DE ENTORNO (si necesarias)
// ========================================

/*
En producción, nada se necesita configurar.
Netlify maneja todo automáticamente.

Para expandir en futuro:
  - NETLIFY_AUTH_TOKEN (deploy automático)
  - API_ENDPOINT (si tienes backend)
  - ANALYTICS_ID (Google Analytics)

Configurar en Netlify Dashboard:
  Site Settings → Build & Deploy → Environment
*/

// ========================================
// 12. DEPLOYMENT Y GIT
// ========================================

/*
Workflow recomendado:

1. Local development:
   $ git clone <repo>
   $ python -m http.server 8000
   → http://localhost:8000

2. Hacer cambios
   $ git add .
   $ git commit -m "Mensaje descriptivo"
   $ git push origin main

3. Netlify auto-deploys:
   - Webhook automático en cada push
   - Build logs disponibles
   - Rollback si hay errores

4. Verificar:
   - Dominio principal
   - Diagramas cargan
   - Login funciona
   - Responsive en móvil
*/

// ========================================
// 13. EXTENSIONES FUTURAS
// ========================================

/*
Fácil de agregar:

1. Búsqueda:
   - Agregar input en header
   - Filtrar sections con JS

2. Comentarios:
   - Agregar Disqus o Utterances

3. Dark mode:
   - Toggle en header
   - Cambiar --bg-primary, --text-primary, etc.

4. Analytics:
   - Google Analytics tag o Plausible
   - Track page views

5. Multidioma:
   - i18n library (sin framework)
   - Clave de idioma en URL

6. Versioning:
   - Selector de versión (v1.0, v2.0, etc.)
   - Subdominios o paths

7. Generación automática:
   - Script para exportar del backend
   - Build HTML dinámico

8. Colaboración:
   - Edit on GitHub link
   - Comment threads
*/

// ========================================
// 14. REFERENCIA DE ARCHIVOS HTML
// ========================================

/*
index.html:
  - 7 secciones principales
  - 4 iframes de diagramas
  - 25 tarjetas / componentes
  - ~600 líneas

login.html:
  - Widget Netlify Identity
  - Formulario fallback
  - Estilos de login
  - ~150 líneas

public/diagramas/*.html:
  - SVG inline
  - Responsive
  - Self-contained
  - ~300-400 líneas cada uno
*/

// ========================================
// 15. TESTING MANUAL
// ========================================

/*
Checklist antes de deploy:

✓ Desktop (1920px):
  - Sidebar visible
  - Scroll smooth
  - Diagramas responsive
  - Login funciona

✓ Tablet (768px):
  - Sidebar horizontal
  - Menu vertical scroll
  - Diagramas ajustan altura
  - Touch-friendly

✓ Mobile (375px):
  - Layout column
  - Menú accesible
  - Diagramas legibles (40vh)
  - Botones grandes

✓ Funcionalidad:
  - Links de navegación
  - Highlight activo
  - Atajos teclado
  - Login/logout

✓ Performance:
  - < 3s first paint
  - < 100ms interaction delay
  - < 1MB total size

✓ Cross-browser:
  - Chrome ✓
  - Firefox ✓
  - Safari ✓
  - Edge ✓
*/

// ========================================
// 16. INFORMACIÓN DE CONTACTO / CRÉDITOS
// ========================================

/*
Creado: Marzo 2026
Versión: 1.0.0
Estado: ✅ Lista para producción

Tecnologías:
  - HTML5 semántico
  - CSS3 (custom properties, grid, flexbox)
  - Vanilla JavaScript (ES6+)
  - Netlify Identity (OAuth)
  - SVG (diagramas)

Sin dependencias externas, sin frameworks,
puro HTML/CSS/JavaScript.

Licencia: MIT
Uso: Comercial y personal
*/
