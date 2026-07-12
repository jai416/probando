# IP República Bolivariana de Venezuela - Sitio Web Oficial

Sitio web moderno, responsivo y PWA para el Instituto Politécnico República Bolivariana de Venezuela.

**URL**: https://republica-bolivariana-de-venezuela.netlify.app/

## Estadísticas del Centro

- **80 estudiantes** matriculados (2025-2026)
- **3 especialidades**: Informática (59), Electrónica (14), Automática (7)
- **98% promoción** académica
- **85% inserción laboral**

## Características

- PWA instalable (funciona offline)
- Chatbot interactivo con respuestas contextuales
- Galería de fotos con lightbox
- Blog/Noticias del centro
- Formulario de contacto real (Netlify Forms)
- Bilingüe (Español/Inglés)
- Modo oscuro/claro
- Icons SVG inline (sin dependencias externas)
- Structured Data (JSON-LD) para SEO
- Meta tags Open Graph y Twitter Cards
- Headers de seguridad (CSP, X-Frame-Options)
- Print stylesheet optimizado
- Accesibilidad (skip-link, focus-visible, reduced-motion, high-contrast)

## Estructura del Proyecto

```
web/
├── index.html              # Página principal (ES)
├── en/
│   └── index.html          # Página principal (EN)
├── pagina-informatica.html # Especialidad de Informática
├── pagina-electronica.html # Especialidad de Electrónica
├── pagina-automatica.html  # Especialidad de Automática
├── gallery.html            # Galería de fotos con lightbox
├── noticias.html           # Blog/Noticias del centro
├── contacto.html           # Contacto con Netlify Forms
├── styles.css              # Estilos principales
├── icons.svg               # Sprite SVG (17 iconos)
├── sw.js                   # Service Worker (PWA + offline)
├── site.webmanifest        # Manifest PWA
├── netlify.toml            # Configuración Netlify + headers
├── build.sh                # Script de build/minify
├── sitemap.xml             # Mapa del sitio para SEO
├── robots.txt              # Instrucciones para bots
├── assets/                 # Imágenes WebP optimizadas
└── javascript/
    ├── main.js             # Funcionalidades principales
    └── chatbot.js          # Chatbot interactivo
```

## PWA (Progressive Web App)

El sitio es instalable como应用 en dispositivos móviles:
- Funciona offline gracias al Service Worker
- Caché inteligente de páginas y recursos
- Iconos responsive (192px, 512px)
- Manifest completo para instalación

## Formulario de Contacto

El formulario usa **Netlify Forms** (gratis):
- Los mensajes se envían por email al administrador
- Protección contra spam con honeypot
- Sin necesidad de backend propio

Para ver los mensajes: Netlify Dashboard > Forms

## Optimizaciones de Rendimiento

1. **Iconos SVG inline** — ~80KB → ~2KB (eliminada dependencia Font Awesome)
2. **Service Worker** — caché offline de todo el sitio
3. **Google Fonts diferido** — carga no bloqueante
4. **Scripts defer** — JavaScript no bloqueante
5. **Imágenes WebP** — mejor compresión que JPEG/PNG
6. **Lazy loading** — imágenes con `loading="lazy"`
7. **Preload hero** — imagen principal precargada
8. **fetchpriority** — logo con prioridad alta
9. **Caché Netlify** — headers optimizados por tipo
10. **CSS deduplicado** — reglas duplicadas eliminadas

## Seguridad

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy` configurado
- `Permissions-Policy` restrictivo

## SEO

- Meta tags Open Graph completos
- Twitter Cards
- JSON-LD structured data (EducationalOrganization)
- Canonical URLs
- Hreflang para ES/EN
- Sitemap XML actualizado
- robots.txt

## Build y Despliegue

```bash
# Build (minifica CSS/JS)
./build.sh

# Despliegue automático
git add -A
git commit -m "descripción"
git push
```

## Desarrollo Local

```bash
python -m http.server 8000
# Abrir http://localhost:8000
```

## Contacto

**Desarrollado por**: Jaison M. Herrera Romero
**Centro Educativo**: IP República Bolivariana de Venezuela
**Ubicación**: Güines, Mayabeque, Cuba
**Teléfono**: #47526422

---
**Última actualización**: Julio 2026
**Versión**: 4.0.0
