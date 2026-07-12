# IP República Bolivariana de Venezuela - Sitio Web Oficial

Sitio web moderno y responsivo para el Instituto Politécnico República Bolivariana de Venezuela, desarrollado con tecnologías web estándar.

**URL**: https://republica-bolivariana-de-venezuela.netlify.app/

## Estadísticas del Centro

- **80 estudiantes** matriculados (2025-2026)
- **3 especialidades**: Informática (59), Electrónica (14), Automática (7)
- **98% promoción** académica
- **85% inserción laboral**

## Características

- Diseño responsive con modo oscuro
- Chatbot interactivo con respuestas contextuales
- Galería de fotos del centro
- Navegación unificada en todas las páginas
- Bilingüe (Español/Inglés)
- Icons SVG inline (sin dependencias externas)
- Structured Data (JSON-LD) para SEO
- Meta tags Open Graph y Twitter Cards
- Headers de seguridad (CSP, X-Frame-Options)
- Caché optimizado en Netlify

## Estructura del Proyecto

```
web/
├── index.html              # Página principal (ES)
├── en/
│   └── index.html          # Página principal (EN)
├── pagina-informatica.html # Especialidad de Informática
├── pagina-electronica.html # Especialidad de Electrónica
├── pagina-automatica.html  # Especialidad de Automática
├── gallery.html            # Galería de fotos
├── contacto.html           # Página de contacto
├── styles.css              # Estilos principales (~2000 líneas)
├── icons.svg               # Sprite SVG (17 iconos)
├── netlify.toml            # Configuración Netlify + headers
├── sitemap.xml             # Mapa del sitio para SEO
├── robots.txt              # Instrucciones para bots
├── assets/                 # Imágenes WebP optimizadas
└── javascript/
    ├── main.js             # Funcionalidades principales
    └── chatbot.js          # Chatbot interactivo
```

## Tecnologías

- HTML5 semántico
- CSS3 con variables CSS
- JavaScript ES6+ vanilla (vanilla JS, sin frameworks)
- SVG inline para iconos (sin dependencias)
- Google Fonts (Playfair Display + Inter)
- Netlify (hosting + CDN + headers de seguridad)

## Optimizaciones de Rendimiento

1. **Iconos SVG inline** — eliminada dependencia de Font Awesome (~80KB → ~2KB)
2. **Google Fonts diferido** — carga no bloqueante con `media="print" onload`
3. **Scripts defer** — carga no bloqueante de JavaScript
4. **Imágenes WebP** — formato moderno con mejor compresión
5. **Lazy loading** — imágenes con `loading="lazy"` y `decoding="async"`
6. **Preload hero** — imagen principal precargada
7. **fetchpriority** — logo con prioridad alta
8. **Caché Netlify** — headers optimizados por tipo de archivo
9. **CSS deduplicado** — reglas CSS duplicadas eliminadas
10. **contain** — rendimiento optimizado en chat widget

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

## Desarrollo Local

```bash
# Abrir directamente en el navegador
open index.html

# O usar un servidor local
python -m http.server 8000
# Abrir http://localhost:8000
```

## Despliegue

El sitio se despliega automáticamente en Netlify al hacer push a la rama `main`.

```bash
git add -A
git commit -m "描述 de los cambios"
git push
```

## Contacto

**Desarrollado por**: Jaison M. Herrera Romero
**Centro Educativo**: IP República Bolivariana de Venezuela
**Ubicación**: Güines, Mayabeque, Cuba
**Teléfono**: #47526422

---
**Última actualización**: Julio 2026
**Versión**: 3.0.0
