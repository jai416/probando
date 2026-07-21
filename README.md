# IP República Bolivariana de Venezuela - Sitio Web Oficial

**URL**: https://republica-bolivariana-de-venezuela.netlify.app/

## Estructura

```
web/
├── index.html              # Página principal
├── noticias.html           # Blog/Noticias
├── gallery.html            # Galería de fotos
├── pagina-informatica.html # Informática
├── pagina-electronica.html # Electrónica
├── pagina-automatica.html  # Automática
├── en/index.html           # Versión en inglés
├── styles.css              # Estilos
├── sw.js                   # Service Worker (PWA)
├── site.webmanifest        # Manifest PWA
├── icons.svg               # Iconos SVG inline
├── javascript/
│   ├── main.js             # Funcionalidades principales
│   ├── chatbot.js          # Chatbot interactivo
│   └── data.js             # ← TODOS LOS DATOS AQUÍ
└── assets/                 # Imágenes
```

## Cómo editar el contenido

### Agregar/modificar noticias
Abre `javascript/data.js` y edita el array `noticias`:

```javascript
noticias: [
    {
        id: 13,
        titulo: "Título de la noticia",
        fecha: "2026-07-15",
        resumen: "Breve resumen...",
        contenido: "Texto completo...",
        imagen: "assets/imagen.webp",
        categoria: "Académico"
    },
    // ... más noticias
]
```

### Agregar/modificar respuestas del chatbot
En `javascript/data.js`, edita el objeto `chatbot`:

```javascript
chatbot: {
    nueva_clave: {
        response: "Respuesta del chatbot aquí",
        suggestions: ["Opción 1", "Opción 2"]
    }
}
```

### Agregar nuevas imágenes
1. Sube la imagen a `assets/`
2. Agrega la noticia en `javascript/data.js` con la ruta correcta

## Cómo funciona

- **Contenido estático** — todo el HTML/CSS está en los archivos
- **datos en JS** — `data.js` contiene noticias y chatbot, se carga una vez
- **Chatbot** — carga conocimiento de `data.js`, responde con NLP local
- **PWA** — service worker cachea todo para funcionar offline
- **Netlify Forms** — el formulario envía emails automáticamente
- **Imágenes WebP** — formato moderno, mejor compresión
- **Lazy loading** — imágenes cargan solo cuando se necesitan

## Despliegue

```bash
git add -A
git commit -m "Descripción"
git push
```

Netlify redespliega automáticamente.

## Contacto

**Desarrollado por**: Jaison M. Herrera Romero
**Centro**: IP República Bolivariana de Venezuela
**Ubicación**: Güines, Mayabeque, Cuba

---
**Versión**: 9.0
