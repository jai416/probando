#!/bin/bash

# ================================================================= #
# SCRIPT DE UPGRADE VISUAL Y DE UX - FRONTEND PURO                  #
# ================================================================= #

echo "🚀 Iniciando Upgrade de Experiencia de Usuario y Diseño..."

# 1. ACTUALIZACIÓN BRUTAL DEL CHATBOT (Persistencia, Efecto Escribiendo y Audio)
if [ -f "javascript/chatbot.js" ]; then
    echo "🤖 Modificando javascript/chatbot.js para añadir persistencia y efectos..."
    
    cat << 'EOF' > javascript/chatbot.js
// =====================================================
// CHATBOT IP REPÚBLICA BOLIVARIANA DE VENEZUELA
// Versión Avanzada - UX / UI Pro 2026
// =====================================================
(function() {
    'use strict';

    // Base de conocimiento integrada
    var KNOWLEDGE = {
        "saludo": { 
            response: "¡Hola! 👋 Bienvenido al IP República Bolivariana de Venezuela.\n\nSoy el asistente virtual del centro. ¿En qué puedo ayudarte hoy?", 
            suggestions: ["Especialidades", "Inscripción", "Contacto", "Ubicación"] 
        },
        "adios": { 
            response: "¡Hasta luego! 👋\n\nGracias por contactarnos. ¡Que tengas un excelente día!", 
            suggestions: ["Especialidades", "Contacto"] 
        },
        "gracias": { 
            response: "¡De nada! 😊 \n\nEstoy aquí para ayudarte. ¿Tienes alguna otra pregunta?", 
            suggestions: ["Especialidades", "Inscripción", "Contacto"] 
        },
        "especialidades": { 
            response: "📚 **ESPECIALIDADES 2025-2026**\n\n💻 **Informática** - 59 estudiantes (3 grupos)\n⚡ **Electrónica** - 14 estudiantes\n🤖 **Automática** - 7 estudiantes\n\n🎯 Total: 80 estudiantes\n\n¿Quieres más información sobre alguna?", 
            suggestions: ["Informática", "Electrónica", "Automática"]
        },
        "informatica": {
            response: "💻 **ESPECIALIDAD DE INFORMÁTICA**\n\nFormamos técnicos en desarrollo de software, programación y gestión de bases de datos.\n\n👥 **Matrícula**: 59 alumnos.\n🛠️ **Módulos principales**: Programación Web, Redes, POO y Prácticas de Producción.",
            suggestions: ["Inscripción", "Especialidades", "Contacto"]
        },
        "electronica": {
            response: "⚡ **ESPECIALIDAD DE ELECTRÓNICA**\n\nFormación técnica en diseño de circuitos, sistemas digitales, reparación de equipos y telecomunicaciones.\n\n👥 **Matrícula**: 14 alumnos.",
            suggestions: ["Inscripción", "Especialidades"]
        },
        "automatica": {
            response: "🤖 **ESPECIALIDAD DE AUTOMÁTICA**\n\nEnfocada en sistemas de control industrial, automatización de procesos y bases de robótica aplicada.\n\n👥 **Matrícula**: 7 alumnos.",
            suggestions: ["Inscripción", "Especialidades"]
        },
        "inscripcion": {
            response: "📝 **REQUISITOS DE INSCRIPCIÓN**\n\n1. Certificado de noveno grado aprobado.\n2. Fotos tipo carné (2).\n3. Tarjeta de menor actualizada.\n4. Planilla de solicitud completa.\n\nPara iniciar el proceso ve a la página de Contacto.",
            suggestions: ["Contacto", "Ubicación"]
        },
        "ubicacion": {
            response: "📍 **UBICACIÓN DEL CENTRO**\n\nNos encontramos en:\nConsejo popular No. 3, Calle Km 3 1/2, Río Seco, Güines, Mayabeque, Cuba.",
            suggestions: ["Contacto", "Horario"]
        },
        "contacto": {
            response: "📞 **INFORMACIÓN DE CONTACTO**\n\n📱 **Teléfono**: #47526422\n🕒 **Horario**: Lunes a Viernes (8:00 AM - 4:00 PM)",
            suggestions: ["Ubicación", "Especialidades"]
        },
        "horario": {
            response: "🕒 **HORARIO ESCOLAR**\n\nEl centro permanece abierto de Lunes a Viernes de 8:00 AM a 4:00 PM. Las clases técnicas se imparten en las sesiones correspondientes por turnos.",
            suggestions: ["Contacto", "Especialidades"]
        }
    };

    function guardarHistorial(texto, esBot, sugerencias) {
        var historial = JSON.parse(sessionStorage.getItem('chat_history')) || [];
        historial.push({ texto: texto, esBot: esBot, sugerencias: sugerencias || [] });
        sessionStorage.setItem('chat_history', JSON.stringify(historial));
    }

    function reproducirSonido() {
        // Generador de audio sintetizado nativo para no depender de archivos externos pesados
        try {
            var ctx = new (window.AudioContext || window.webkitAudioContext)();
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, ctx.currentTime); // Nota Re5 (Tono limpio de notificación)
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
        } catch(e) { console.log("AudioContext no soportado"); }
    }

    function removeTypingIndicator() {
        var indicator = document.getElementById('chat-typing');
        if (indicator) indicator.remove();
    }

    function showTypingIndicator() {
        var chatMessages = document.getElementById('chat-messages');
        if (!chatMessages || document.getElementById('chat-typing')) return;

        var typingDiv = document.createElement('div');
        typingDiv.id = 'chat-typing';
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addMessage(text, isBot, suggestions, save) {
        removeTypingIndicator();
        var chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        var messageContainer = document.createElement('div');
        messageContainer.className = isBot ? 'message-wrapper bot-wrapper' : 'message-wrapper user-wrapper';

        var messageDiv = document.createElement('div');
        messageDiv.className = isBot ? 'message bot-message' : 'message user-message';
        
        if (isBot) {
            // Convertir marcas markdown simples a HTML
            var formatted = text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br>');
            messageDiv.innerHTML = formatted;
        } else {
            messageDiv.textContent = text;
        }

        messageContainer.appendChild(messageDiv);
        chatMessages.appendChild(messageContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (isBot && suggestions) {
            showQuickReplies(suggestions);
        }

        if (save !== false) {
            guardarHistorial(text, isBot, isBot ? suggestions : null);
        }
    }

    function showQuickReplies(suggestions) {
        var quickRepliesContainer = document.getElementById('chat-quick-replies');
        if (!quickRepliesContainer) return;
        
        quickRepliesContainer.innerHTML = '';
        if (!suggestions || suggestions.length === 0) return;

        suggestions.forEach(function(sug) {
            var btn = document.createElement('button');
            btn.className = 'quick-reply-btn';
            btn.textContent = sug;
            btn.addEventListener('click', function() {
                var input = document.getElementById('user-input');
                if (input) {
                    input.value = sug;
                    handleSend();
                }
            });
            quickRepliesContainer.appendChild(btn);
        });
    }

    function handleSend() {
        var input = document.getElementById('user-input');
        if (!input || !input.value.trim()) return;

        var text = input.value.trim();
        input.value = '';

        // Añadir mensaje del usuario
        addMessage(text, false, null, true);

        // Ocultar replies anteriores mientras piensa
        var quickRepliesContainer = document.getElementById('chat-quick-replies');
        if (quickRepliesContainer) quickRepliesContainer.innerHTML = '';

        // Mostrar indicador de escritura
        showTypingIndicator();

        // Simular pensamiento humano (1.2 segundos)
        setTimeout(function() {
            var cleanText = text.toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quitar tildes
                .replace(/[?¿!¡,.]/g, "");

            var responseKey = "saludo";
            var maxMatches = 0;

            for (var key in KNOWLEDGE) {
                if (cleanText.includes(key)) {
                    responseKey = key;
                    break;
                }
            }

            var reply = KNOWLEDGE[responseKey];
            reproducirSonido();
            addMessage(reply.response, true, reply.suggestions, true);
        }, 1200);
    }

    function cargarHistorial() {
        var historial = JSON.parse(sessionStorage.getItem('chat_history'));
        if (historial && historial.length > 0) {
            historial.forEach(function(msg) {
                addMessage(msg.texto, msg.esBot, null, false);
            });
            var ultimoMensajeBot = historial.slice().reverse().find(m => m.esBot);
            if (ultimoMensajeBot && ultimoMensajeBot.sugerencias) {
                showQuickReplies(ultimoMensajeBot.sugerencias);
            }
        } else {
            showTypingIndicator();
            setTimeout(function() { 
                var saludo = KNOWLEDGE['saludo']; 
                reproducirSonido();
                addMessage(saludo.response, true, saludo.suggestions, true); 
            }, 800);
        }
    }

    function initChatbot() {
        var input = document.getElementById('user-input');
        var chatWidget = document.getElementById('chat-widget');
        var chatOpenBtn = document.getElementById('chat-open-btn');
        var chatCloseBtn = document.getElementById('chat-close-btn');
        var sendBtn = document.getElementById('send-btn');
        
        if (!input) return;
        
        if (sendBtn) {
            sendBtn.addEventListener('click', handleSend);
        }
        
        input.addEventListener('keypress', function(e) { 
            if (e.key === 'Enter') handleSend(); 
        });
        
        if (chatOpenBtn) {
            chatOpenBtn.addEventListener('click', function() { 
                if (chatWidget) {
                    chatWidget.classList.remove('hidden');
                    input.focus();
                }
            });
        }
        
        if (chatCloseBtn) {
            chatCloseBtn.addEventListener('click', function() { 
                if (chatWidget) {
                    chatWidget.classList.add('hidden');
                }
            });
        }
        
        cargarHistorial();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbot);
    } else {
        initChatbot();
    }
})();
EOF
fi

# 2. INYECCIÓN DE ESTILOS CSS AVANZADOS EN STYLES.CSS
if [ -f "styles.css" ]; then
    echo "🎨 Agregando reglas de diseño Pro (Burbujas asimétricas y animaciones) a styles.css..."
    cat << 'EOF' >> styles.css

/* ---------- MEJORAS VISUALES DE UX/UI CHATBOT (IP-RBV) ---------- */
.message-wrapper {
    display: flex;
    width: 100%;
    margin-bottom: 12px;
}
.user-wrapper { justify-content: flex-end; }
.bot-wrapper { justify-content: flex-start; }

.chat-messages .message {
    max-width: 82%;
    padding: 11px 15px;
    font-size: 0.94rem;
    line-height: 1.45;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
}

.chat-messages .user-message {
    background: var(--primary, #0a2463) !important;
    color: white !important;
    border-radius: 16px 16px 0px 16px !important;
    animation: slideInRight 0.25s ease forwards;
}

.chat-messages .bot-message {
    background: var(--gray-light, #e9ecef) !important;
    color: #1e1e1e !important;
    border-radius: 16px 16px 16px 0px !important;
    animation: slideInLeft 0.25s ease forwards;
}

/* Píldoras interactivas (Quick replies) */
.quick-reply-btn {
    background: transparent !important;
    color: var(--primary, #0a2463) !important;
    border: 1.5px solid var(--primary, #0a2463) !important;
    padding: 6px 14px !important;
    border-radius: 20px !important;
    font-size: 0.85rem !important;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease !important;
}
.quick-reply-btn:hover {
    background: var(--primary, #0a2463) !important;
    color: white !important;
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(10,36,99,0.2);
}

/* Indicador de escritura animado */
.typing-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 14px 20px !important;
    width: 60px;
}
.typing-indicator span {
    width: 7px;
    height: 7px;
    background: #6c757d;
    border-radius: 50%;
    display: inline-block;
    animation: bounceTyping 1.3s infinite ease-in-out;
}
.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounceTyping {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
}
@keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-10px); }
    to { opacity: 1; transform: translateX(0); }
}
@keyframes slideInRight {
    from { opacity: 0; transform: translateX(10px); }
    to { opacity: 1; transform: translateX(0); }
}
EOF
fi

# 3. FILTROS DINÁMICOS EN LA GALERÍA (gallery.html)
if [ -f "gallery.html" ]; then
    echo "📸 Agregando control de filtros e inyección en gallery.html..."
    
    # Agregar la barra de botones arriba de la galería usando sed seguro
    sed -i '/<div class="gallery-grid/i \
    <div class="gallery-filters" style="text-align: center; margin: 30px 0; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">\
        <button class="filter-btn active" data-filter="all" style="padding: 8px 18px; border-radius: 20px; border: 2px solid #0a2463; background: #0a2463; color: white; cursor: pointer; font-weight:600; transition:all 0.2s;">Todas las Fotos</button>\
        <button class="filter-btn" data-filter="apoyo" style="padding: 8px 18px; border-radius: 20px; border: 2px solid #0a2463; background: transparent; color: #0a2463; cursor: pointer; font-weight:600; transition:all 0.2s;">Actividades Político-Sociales</button>\
        <button class="filter-btn" data-filter="centro" style="padding: 8px 18px; border-radius: 20px; border: 2px solid #0a2463; background: transparent; color: #0a2463; cursor: pointer; font-weight:600; transition:all 0.2s;">Instalaciones y Clases</button>\
    </div>' gallery.html

    # Marcar los elementos del archivo con categorías dinámicas para que funcione el filtrado
    sed -i 's/class="gallery-item/data-category="centro" class="gallery-item/g' gallery.html
    sed -i 's/data-category="centro" class="gallery-item item-medium"><img src="assets\/IMG-20260201-WA0057.jpg"/data-category="apoyo" class="gallery-item item-medium"><img src="assets\/IMG-20260201-WA0057.jpg"/g' gallery.html
    sed -i 's/data-category="centro" class="gallery-item item-medium"><img src="assets\/IMG-20260201-WA0061.jpg"/data-category="apoyo" class="gallery-item item-medium"><img src="assets\/IMG-20260201-WA0061.jpg"/g' gallery.html

    # Inyectar el script de comportamiento al final de gallery.html antes de la etiqueta de cierre
    sed -i '/<\/body>/i \
    <script>\
    (function() {\
        var botones = document.querySelectorAll(".filter-btn");\
        var items = document.querySelectorAll(".gallery-item");\
        botones.forEach(function(btn) {\
            btn.addEventListener("click", function() {\
                botones.forEach(b => {\
                    b.style.background = "transparent";\
                    b.style.color = "#0a2463";\
                });\
                this.style.background = "#0a2463";\
                this.style.color = "white";\
                var filtro = this.getAttribute("data-filter");\
                items.forEach(function(item) {\
                    if (filtro === "all" || item.getAttribute("data-category") === filtro) {\
                        item.style.display = "block";\
                        setTimeout(() => item.style.opacity = "1", 10);\
                    } else {\
                        item.style.display = "none";\
                    }\
                });\
            });\
        });\
    })();\
    <\/script>' gallery.html
fi

echo "--------------------------------------------------"
echo "🎉 ¡Upgrade completado! Chatbot con persistencia y galería optimizada con éxito."
