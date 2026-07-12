#!/bin/bash
# build.sh - Optimización del sitio web IP-RBV
# Minifica CSS y JS, genera iconos responsive

echo "🔧 Iniciando build de IP República Bolivariana de Venezuela..."

# Crear directorio de salida
mkdir -p dist

# Minificar CSS
echo "📦 Minificando CSS..."
if command -v csso &> /dev/null; then
    csso styles.css -o styles.min.css
elif command -v cssnano &> /dev/null; then
    cssnano styles.css styles.min.css
else
    # Fallback: eliminar comentarios y espacios múltiples
    sed 's/\/\*.*\*\///g' styles.css | sed '/^$/d' | tr -s ' ' > styles.min.css
    echo "  ℹ️ Usando minificación básica (instala csso para mejor resultado)"
fi

# Minificar JS
echo "📦 Minificando JavaScript..."
for js in javascript/*.js; do
    minified="${js%.js}.min.js"
    if command -v terser &> /dev/null; then
        terser "$js" -o "$minified" -c -m
    elif command -v uglifyjs &> /dev/null; then
        uglifyjs "$js" -o "$minified" -c -m
    else
        # Fallback básico
        sed 's/\/\/.*$//' "$js" | sed 's/\/\*.*\*\///g' | tr -s ' ' | tr '\n' ' ' > "$minified"
        echo "  ℹ️ Usando minificación básica para $js"
    fi
done

# Generar icono 192px desde 512px (si ImageMagick disponible)
echo "🖼️ Generando iconos responsive..."
if command -v convert &> /dev/null; then
    convert "assets/icon-512.webp" -resize 192x192 "assets/icon-192.webp" 2>/dev/null && echo "  ✅ icon-192.webp generado" || echo "  ℹ️ No se pudo generar icon-192.webp"
else
    echo "  ℹ️ ImageMagick no instalado - saltando generación de iconos"
fi

# Copiar archivos a dist
echo "📁 Copiando archivos..."
cp index.html sitemap.xml robots.txt site.webmanifest sw.js icons.svg dist/
cp styles.min.css dist/styles.css 2>/dev/null || cp styles.css dist/
cp -r assets/ dist/
cp -r javascript/ dist/
cp -r en/ dist/
cp noticias.html gallery.html contacto.html pagina-*.html dist/ 2>/dev/null

echo ""
echo "✅ Build completado!"
echo "📊 Resumen:"
echo "   CSS original: $(wc -c < styles.css) bytes"
echo "   CSS minificado: $(wc -c < styles.min.css 2>/dev/null || echo 'N/A') bytes"
echo "   Archivos JS: $(find javascript/ -name '*.js' | wc -l)"
echo ""
echo "🚀 Para desplegar: git push (Netlify despliega automáticamente)"
