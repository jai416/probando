#!/bin/bash

# ================================================================= #
# SCRIPT DE AUTOMATIZACIÓN Y LIMPIEZA - IP rBV                      #
# ================================================================= #

echo "🚀 Iniciando proceso de limpieza y optimización del proyecto..."

# 1. Corregir el Service Worker (web.css -> styles.css)
if [ -f "sw.js" ]; then
    echo "🔧 Corrigiendo referencia de CSS en sw.js..."
    sed -i 's/web\.css/styles\.css/g' sw.js
elif [ -f "javascript/sw.js" ]; then
    echo "🔧 Corrigiendo referencia de CSS en javascript/sw.js..."
    sed -i 's/web\.css/styles\.css/g' javascript/sw.js
fi

# 2. Renombrar algo.html a index.html si existe
if [ -f "algo.html" ]; then
    echo "📦 Renombrando algo.html a index.html..."
    mv algo.html index.html
fi

# 3. Actualizar los enlaces internos
echo "🔗 Actualizando enlaces internos de 'algo.html' a 'index.html'..."
sed -i 's/algo\.html/index\.html/g' *.html 2>/dev/null
sed -i 's/algo\.html/index\.html/g' sitemap.xml 2>/dev/null
sed -i 's/algo\.html/index\.html/g' robots.txt 2>/dev/null
sed -i 's/algo\.html/index\.html/g' manifest.json 2>/dev/null
sed -i 's/algo\.html/index\.html/g' javascript/manifest.json 2>/dev/null

# 4. Limpiar los scripts duplicados del switch de tema oscuro
echo "🧹 Eliminando scripts redundantes de modo oscuro en los HTMLs..."
for archivo in pagina-informatica.html pagina-electronica.html pagina-automatica.html contacto.html; do
    if [ -f "$archivo" ]; then
        sed -i "/document.getElementById('theme-toggle')?\.addEventListener('click'/,/});/d" "$archivo"
    fi
done

echo "✅ Limpieza y correcciones completadas con éxito."
echo "--------------------------------------------------"

# 5. Automatización de Git
echo "📦 Preparando cambios para Git..."

if [ ! -d ".git" ]; then
    echo "🗂️ Inicializando repositorio Git..."
    git init
fi

git add index.html styles.css javascript/ gallery.html contacto.html pagina-informatica.html pagina-electronica.html pagina-automatica.html sitemap.xml robots.txt README.md package.json build.sh
git status --short

echo "💾 Creando commit con las correcciones..."
git commit -m "Refactor: renombrado algo.html a index.html, arreglado cache de sw.js y eliminados scripts duplicados"

RAMA_ACTUAL=$(git branch --show-current)
if [ -z "$RAMA_ACTUAL" ]; then
    RAMA_ACTUAL="main"
    git branch -M main
fi

echo "📤 Subiendo cambios a GitHub en la rama '$RAMA_ACTUAL'..."
git push origin "$RAMA_ACTUAL"

if [ $? -eq 0 ]; then
    echo "🎉 ¡Todo listo, asere! El código está limpio y actualizado en GitHub."
else
    echo "⚠️ El push falló. Revisa si necesitas autenticarte o configurar tu origin remoto."
fi
