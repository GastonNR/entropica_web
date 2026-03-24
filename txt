# 📚 Documentación Técnica Entrópica

Sitio de documentación técnica profesional, estático y seguro con autenticación integrada.

## 🎯 Características

- ✅ **Estático**: Compatible con Netlify, GitHub Pages y cualquier servidor HTTP
- 🔒 **Autenticación**: Integración con Netlify Identity
- 📱 **Responsive**: Diseño adaptable a todos los dispositivos
- 🎨 **Minimalista**: Interfaz limpia y profesional tipo Notion/Stripe
- ⚡ **Rápido**: Sin dependencias externas, puro HTML/CSS/JS
- 📊 **Diagramas**: Soporte para iframes de draw.io
- 🎯 **Navegación**: Scroll suave y highlight de secciones activas

## 📂 Estructura de Archivos

```
/
├── index.html              # Página principal (protegida)
├── login.html              # Página de login
├── styles.css              # Estilos globales
├── main.js                 # Lógica de navegación y scroll
├── auth.js                 # Autenticación con Netlify Identity
├── netlify.toml            # Configuración Netlify
├── .gitignore              # Archivos ignorados en Git
├── README.md               # Esta documentación
│
└── public/
    └── diagramas/
        ├── cadena-valor.html     # Diagrama: Cadena de valor
        ├── jerarquia.html        # Diagrama: Jerarquía de procesos
        ├── flujo-trabajo.html    # Diagrama: Flujo de trabajo
        └── actividades.html      # Diagrama: Flujo de actividades
```

## 🚀 Instalación y Uso Local

### Opción 1: Servidor HTTP Simple (Python)

Si tienes Python instalado:

```bash
# Python 3
python -m http.server 8000

# Luego abre: http://localhost:8000
```

### Opción 2: Con Node.js (http-server)

```bash
npm install -g http-server
http-server
```

### Opción 3: Directamente en el navegador

Simplemente abre `index.html` en tu navegador (aunque algunas funciones de CORS pueden no funcionar).

## 🔐 Configuración de Autenticación

### Paso 1: Crear sitio en Netlify

1. Ve a [netlify.com](https://netlify.com)
2. Crea una nueva cuenta o inicia sesión
3. Crea un nuevo sitio desde Git

### Paso 2: Activar Netlify Identity

1. En tu sitio de Netlify, ve a **Site Settings** → **Identity**
2. Click en **Enable Identity**
3. En **Registration** selecciona "Invite only" (para usuarios privados)
4. En **External Providers** agrega proveedores si lo deseas (Google, GitHub, etc.)

### Paso 3: Configurar Acceso

#### Opción A: Agregar usuarios específicos (Invite only)
1. Ve a **Identity** → **Users**
2. Click en **Invite users**
3. Ingresa el email y envía invitación

#### Opción B: Permitir signups públicos
1. Cambia **Registration** a "Open"
2. Los usuarios pueden registrarse directamente en la página de login

### Paso 4: Deploy

1. Sube este repositorio a GitHub
2. En Netlify, conecta tu repositorio
3. El sitio se desplegará automáticamente

## 🎨 Personalización

### Cambiar Colores

Edita `styles.css` en la sección de variables CSS:

```css
:root {
    --bg-primary: #f9fafb;      /* Fondo claro */
    --accent-primary: #3b82f6;  /* Azul principal */
    --accent-secondary: #10b981; /* Verde secundario */
    /* ... más variables */
}
```

### Agregar Nuevas Secciones

1. Agrega un nuevo elemento en el HTML dentro de `main-content`:

```html
<section id="nueva-seccion" class="content-section">
    <h2>Nueva Sección</h2>
    <!-- Tu contenido aquí -->
</section>
```

2. Agrega el enlace en el sidebar:

```html
<li>
    <a href="#nueva-seccion" class="nav-link" data-section="nueva-seccion">
        <span class="nav-icon">📌</span>
        Nueva Sección
    </a>
</li>
```

### Agregar Diagramas

Crea archivos HTML en `public/diagramas/` y embed con iframes:

```html
<iframe src="./public/diagramas/tu-diagrama.html" class="diagram-frame"></iframe>
```

Los archivos de diagrama pueden ser:
- Exportados desde draw.io como HTML
- Creados con SVG puro
- Cualquier HTML autónomo

## 📊 Diagramas Incluidos

### 1. Cadena de Valor (`cadena-valor.html`)
Visualiza las 5 etapas principales:
- Entrada → Procesamiento → Validación → Salida → Valor

### 2. Jerarquía de Procesos (`jerarquia.html`)
Estructura de 3 niveles:
- Nivel 1: Estratégicos
- Nivel 2: Clave (valor alto)
- Nivel 3: Soporte

### 3. Flujo de Trabajo (`flujo-trabajo.html`)
Diagrama de flujo completo con:
- Decisiones (bifurcaciones)
- Rechazos y correexciones
- Métricas y tiempos

### 4. Flujo de Actividades (`actividades.html`)
Desglose detallado de 5 fases:
- Fase 1: Entrada
- Fase 2: Procesamiento
- Fase 3: Validación
- Fase 4: Entrega
- Fase 5: Monitoreo (paralelo)

## 🔌 JavaScript - Funcionalidades

### `main.js`
- ✅ Scroll suave entre secciones
- ✅ Highlight automático de sección activa
- ✅ Animaciones de entrada
- ✅ Atajos de teclado
- ✅ Validación de iframes

### `auth.js`
- ✅ Integración Netlify Identity
- ✅ Verificación de autenticación
- ✅ Redirección automática
- ✅ Gestión de sesiones
- ✅ Sistema de permisos (preparado)

## 🛡️ Seguridad

- ✅ Headers de seguridad configurados
- ✅ HTTPS automático en Netlify
- ✅ Autenticación nativa de navegador
- ✅ No almacena contraseñas localmente
- ✅ Sandbox en iframes

## 📈 SEO y Performance

- ✅ Meta tags configurados
- ✅ Viewport responsivo
- ✅ Caching de assets
- ✅ Lazy loading de iframes
- ✅ Font smoothing optimizado
- ✅ Scroll performance optimizado

## 🌐 Deployment

### En Netlify

```bash
# 1. Conectar repositorio a Netlify
# 2. Configurar en netlify.toml (ya incluido)
# 3. Activar Netlify Identity (ver sección anterior)
# 4. Deploy automático en cada push
```

### En GitHub Pages

```bash
# 1. Subir repositorio a GitHub
# 2. En Settings → Pages
# 3. Seleccionar rama main
# 4. GitHub desplegará automáticamente
```

**Nota**: GitHub Pages no soporta Netlify Identity. Usar solo para versión estática.

### En servidor propio

```bash
# Copiar todos los archivos al servidor web
# La carpeta public/ debe estar en la raíz
# Los diagramas se servirán desde /public/diagramas/
```

## 🔄 Integración con draw.io

### Exportar diagramas desde draw.io

1. Crea/abre diagrama en [draw.io](https://draw.io)
2. **File** → **Export** → **HTML**
3. Selecciona opciones:
   - `Embed content in HTML`: checked
   - `Responsive`: checked
4. Guarda en `public/diagramas/`
5. Actualiza `index.html` con nuevo iframe

## 📝 Customización Avanzada

### Sistema de Permisos

En `auth.js` está preparado el sistema para roles:

```javascript
// Verificar permisos específicos
if (await AuthManager.hasPermission('admin')) {
    // Mostrar opciones de administrador
}
```

### Logging de Usuarios

Agrrega automáticamente logs de acceso:

```javascript
logUserAccess(); // En auth.js
```

## 🐛 Troubleshooting

### Los diagramas no se cargan

**Problema**: Los iframes en `public/diagramas/` muestran error

**Solución**:
1. Verifica que las rutas sean correctas
2. Comprueba la consola del navegador (F12)
3. Asegúrate de que los archivos HTML estén en `public/diagramas/`

### Autenticación no funciona

**Problema**: El botón de login no responde

**Solución**:
1. Verifica que Netlify Identity esté habilitado
2. Comprueba que estés en HTTPS (Netlify lo hace automáticamente)
3. Revisa la consola para errores

### Sidebar se sobrelapea con contenido

**Problema**: En móvil, sidebar cubre el contenido

**Solución**:
- Automático en breakpoints de CSS media queries
- Sidebar se convierte a horizontal en pantallas < 768px

## 📚 Ejemplos de Uso

### Agregar enlace externo

```html
<a href="https://ejemplo.com" target="_blank" rel="noopener noreferrer">
    Enlace externo
</a>
```

### Agregar tabla

```html
<table class="activity-table">
    <thead>
        <tr>
            <th>Encabezado 1</th>
            <th>Encabezado 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Dato 1</td>
            <td>Dato 2</td>
        </tr>
    </tbody>
</table>
```

### Agregar código

```html
<div class="info-card">
    <h3>Ejemplo</h3>
    <pre><code>
// Tu código aquí
console.log('Hola');
    </code></pre>
</div>
```

## 📞 Soporte y Contacto

Para problemas o sugerencias:
1. Revisa la consola del navegador (F12)
2. Verifica los logs en Netlify Analytics
3. Comprueba la documentación de Netlify Identity

## 📄 Licencia

Proyecto de documentación técnica. Libre para uso personal y comercial.

## ✅ Checklist de Deploy

- [ ] Crear sitio en Netlify
- [ ] Habilitar Netlify Identity
- [ ] Conectar repositorio GitHub
- [ ] Configurar usuarios (invita)
- [ ] Probar login en producción
- [ ] Verificar diagramas se cargan
- [ ] Testear en dispositivos móviles
- [ ] Configurar dominio personalizado
- [ ] Habilitar HTTPS automático
- [ ] Revisar analytics

---

**Versión**: 1.0  
**Última actualización**: Marzo 2026  
**Estado**: ✅ Listo para producción
