#!/bin/bash

# Script de optimización para IP República Bolivariana de Venezuela
# Minifica CSS y JavaScript para mejor rendimiento

echo "🚀 Iniciando optimización de archivos..."

# Verificar si existe uglifycss y uglifyjs
if ! command -v uglifycss &> /dev/null; then
    echo "❌ uglifycss no está instalado. Instala con: npm install -g uglifycss"
    exit 1
fi

if ! command -v uglifyjs &> /dev/null; then
    echo "❌ uglifyjs no está instalado. Instala con: npm install -g uglify-js"
    exit 1
fi

# Crear directorio dist si no existe
mkdir -p dist/css
mkdir -p dist/js

echo "📦 Minificando CSS..."
uglifycss styles.css > dist/css/styles.min.css

echo "📦 Minificando JavaScript..."
uglifyjs javascript/main.js --compress --mangle > dist/js/main.min.js
uglifyjs javascript/chatbot.js --compress --mangle > dist/js/chatbot.min.js

echo "✅ Optimización completada!"
echo "📁 Archivos generados en dist/"
echo "   - dist/css/styles.min.css"
echo "   - dist/js/main.min.js"
echo "   - dist/js/chatbot.min.js"
echo ""
echo "💡 Para usar los archivos minificados, actualiza las referencias en index.html:"
echo "   - web.css → css/web.min.css"
echo "   - javascript/main.js → js/main.min.js"
echo "   - javascript/chatbot.js → js/chatbot.min.js"
