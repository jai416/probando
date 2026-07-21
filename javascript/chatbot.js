// =====================================================
// CHATBOT IP REPÚBLICA BOLIVARIANA DE VENEZUELA
// Versión 5.0 - Conocimiento desde data.js
// =====================================================
(function() {
    'use strict';

    // ---------- CARGAR CONOCIMIENTO ----------
    function getKnowledge() {
        if (window.datosInstitucionales && window.datosInstitucionales.chatbot) {
            return window.datosInstitucionales.chatbot;
        }
        return {};
    }

    // ---------- NLP ----------
    function cleanText(text) {
        return text.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[?¿!¡.,;:()]/g, "")
            .trim();
    }

    var SYNONYMS = {
        "especialidades": ["especialidades","carrera","carreras","estudiar","formacion","tecnico","que puedo"],
        "informatica": ["informatica","informatico","programacion","programar","software","desarrollo","computacion","redes"],
        "electronica": ["electronica","electronico","circuitos","telecomunicaciones","chip","digital"],
        "automatica": ["automatica","automatico","robotica","robot","plc","automatizacion","control"],
        "inscripcion": ["inscripcion","inscribir","inscribirse","matricula","matricular","apuntar","registro"],
        "mision": ["mision","que hacen","para que existen"],
        "vision": ["vision","como se ven","a donde van"],
        "valores": ["valores","principios","que defienden"],
        "directivos": ["directivos","director","quien dirige","equipo"],
        "instalaciones": ["instalaciones","edificio","aulas","donde estan","espacios"],
        "gratuito": ["gratis","gratuito","pago","cuanto cuesta","precio","costo"],
        "proyectos": ["proyectos","que van a hacer","futuro","proximo","planes"],
        "deportes": ["deportes","deporte","basket","baloncesto","voleibol","beisbol"],
        "contacto": ["contacto","contactar","llamar","telefono","email"],
        "ubicacion": ["ubicacion","donde","direccion","llegar","mapa"],
        "horario": ["horario","hora","cuando abren","cuando cierran"],
        "estadisticas": ["estadistica","estadisticas","datos","matricula total","promocion"],
        "huerto": ["huerto","siembra","agricultura","verdura","cosecha"],
        "vida_estudiantil": ["vida","estudiantil","actividades","eventos"],
        "chiste": ["chiste","chistes","gracioso","reir","joke"],
        "ayuda": ["ayuda","ayudar","help","puedes","sabes"],
        "titulo": ["titulo","certificado","graduar","egresar"],
        "laboratorio": ["laboratorio","computadoras","computadora"],
        "comedor": ["comedor","comida","alimentacion"],
        "dormitorios": ["dormitorio","dormir","alojamiento","internos"],
        "becas": ["beca","becas","ayuda economica"]
    };

    var PATTERNS = [
        { keys: ["hola","buenos","buenas","saludos","hey"], intent: "saludo" },
        { keys: ["adios","hasta luego","nos vemos","bye","chao"], intent: "adios" },
        { keys: ["gracias","agradezco","thanks"], intent: "gracias" },
        { keys: ["cuanto cuesta","cuanto vale","es gratis","pago"], intent: "gratuito" },
        { keys: ["donde quedan","donde esta","como llego"], intent: "ubicacion" },
        { keys: ["que hora","a que hora","cuando abren"], intent: "horario" },
        { keys: ["telefono","numero de","llamar"], intent: "contacto" },
        { keys: ["que puedo","que sabes","capaz"], intent: "ayuda" },
        { keys: ["necesito ayuda","ayudame","help"], intent: "ayuda" },
        { keys: ["cuantos estudiantes","cuantos alumnos"], intent: "estadisticas" },
        { keys: ["que especialidad","que carrera"], intent: "especialidades" },
        { keys: ["requisito","que necesito","documentos"], intent: "inscripcion" },
        { keys: ["proyecto","futuro","planes","proximo"], intent: "proyectos" },
        { keys: ["director","quien dirige","directivos"], intent: "directivos" },
        { keys: ["mision","para que sirven"], intent: "mision" },
        { keys: ["vision","como se ven"], intent: "vision" },
        { keys: ["valores","principios"], intent: "valores" }
    ];

    function findIntent(clean) {
        var knowledge = getKnowledge();
        for (var key in knowledge) { if (clean.includes(key)) return key; }
        for (var intent in SYNONYMS) {
            var aliases = SYNONYMS[intent];
            for (var i = 0; i < aliases.length; i++) {
                if (clean.includes(aliases[i])) return intent;
            }
        }
        for (var j = 0; j < PATTERNS.length; j++) {
            var match = PATTERNS[j].keys.some(function(k) { return clean.includes(k); });
            if (match) return PATTERNS[j].intent;
        }
        if (clean.length < 15 && /^(hola|buenas?|hey|que tal)/.test(clean)) return "saludo";
        return null;
    }

    function getGreetingIntent() {
        var hour = new Date().getHours();
        if (hour >= 6 && hour < 12) return "saludo";
        if (hour >= 12 && hour < 18) return "saludo_tarde";
        return "saludo_noche";
    }

    // ---------- UI ----------
    var lastMessageTime = 0;

    function removeTypingIndicator() {
        var el = document.getElementById('chat-typing');
        if (el) el.remove();
    }

    function showTypingIndicator() {
        var chatMessages = document.getElementById('chat-messages');
        if (!chatMessages || document.getElementById('chat-typing')) return;
        var div = document.createElement('div');
        div.id = 'chat-typing';
        div.className = 'message-wrapper bot-wrapper';
        div.innerHTML = '<div class="message bot-message typing-indicator"><span></span><span></span><span></span></div>';
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addMessage(text, isBot, suggestions) {
        removeTypingIndicator();
        var chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        var wrapper = document.createElement('div');
        wrapper.className = isBot ? 'message-wrapper bot-wrapper' : 'message-wrapper user-wrapper';

        var msg = document.createElement('div');
        msg.className = isBot ? 'message bot-message' : 'message user-message';

        if (isBot) {
            msg.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        } else {
            msg.textContent = text;
        }

        wrapper.appendChild(msg);
        chatMessages.appendChild(wrapper);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (isBot && suggestions && suggestions.length > 0) {
            showQuickReplies(suggestions);
        }

        try {
            var historial = JSON.parse(sessionStorage.getItem('chat_history')) || [];
            historial.push({ texto: text, esBot: isBot, sugerencias: suggestions || [] });
            if (historial.length > 50) historial = historial.slice(-50);
            sessionStorage.setItem('chat_history', JSON.stringify(historial));
        } catch(e) {}
    }

    function showQuickReplies(suggestions) {
        var container = document.getElementById('chat-quick-replies');
        if (!container) return;
        container.innerHTML = '';
        suggestions.forEach(function(sug) {
            var btn = document.createElement('button');
            btn.className = 'quick-reply-btn';
            btn.textContent = sug;
            btn.addEventListener('click', function() {
                var input = document.getElementById('user-input');
                if (input) { input.value = sug; handleSend(); }
            });
            container.appendChild(btn);
        });
    }

    function reproducirSonido() {
        try {
            var ctx = new (window.AudioContext || window.webkitAudioContext)();
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, ctx.currentTime);
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
        } catch(e) {}
    }

    function handleSend() {
        var input = document.getElementById('user-input');
        if (!input || !input.value.trim()) return;

        var now = Date.now();
        if (now - lastMessageTime < 1000) return;
        lastMessageTime = now;

        var text = input.value.trim();
        input.value = '';
        addMessage(text, false, null);

        var qr = document.getElementById('chat-quick-replies');
        if (qr) qr.innerHTML = '';

        showTypingIndicator();

        setTimeout(function() {
            var cleaned = cleanText(text);
            var intent = findIntent(cleaned);
            var knowledge = getKnowledge();
            var reply = knowledge[intent];

            if (!reply) {
                var fallbacks = [
                    "🤔 No estoy seguro de entender eso. ¿Puedes reformular tu pregunta?",
                    "Lo siento, no tengo información sobre eso. Intenta preguntar sobre especialidades, inscripción o contacto.",
                    "No comprendo bien. ¿Quieres saber sobre las especialidades, inscripción o ubicación del centro?"
                ];
                var msg = fallbacks[Math.floor(Math.random() * fallbacks.length)];
                reproducirSonido();
                addMessage(msg, true, ["Especialidades", "Inscripción", "Contacto", "Ayuda"]);
                return;
            }

            reproducirSonido();
            addMessage(reply.response, true, reply.suggestions);
        }, 800 + Math.random() * 600);
    }

    function cargarHistorial() {
        try {
            var historial = JSON.parse(sessionStorage.getItem('chat_history'));
            if (historial && historial.length > 0) {
                historial.forEach(function(msg) { addMessage(msg.texto, msg.esBot, null); });
                var ultimoBot = historial.slice().reverse().find(function(m) { return m.esBot; });
                if (ultimoBot && ultimoBot.sugerencias) showQuickReplies(ultimoBot.sugerencias);
            } else {
                showTypingIndicator();
                setTimeout(function() {
                    var greetingKey = getGreetingIntent();
                    var knowledge = getKnowledge();
                    var greeting = knowledge[greetingKey];
                    if (greeting) {
                        reproducirSonido();
                        addMessage(greeting.response, true, greeting.suggestions);
                    }
                }, 600);
            }
        } catch(e) {}
    }

    function initChatbot() {
        var input = document.getElementById('user-input');
        var chatWidget = document.getElementById('chat-widget');
        var chatOpenBtn = document.getElementById('chat-open-btn');
        var chatCloseBtn = document.getElementById('chat-close-btn');
        var sendBtn = document.getElementById('send-btn');

        if (!input) return;

        if (sendBtn) sendBtn.addEventListener('click', handleSend);
        input.addEventListener('keypress', function(e) { if (e.key === 'Enter') handleSend(); });

        if (chatOpenBtn) {
            chatOpenBtn.addEventListener('click', function() {
                if (chatWidget) { chatWidget.classList.remove('hidden'); input.focus(); }
            });
        }

        if (chatCloseBtn) {
            chatCloseBtn.addEventListener('click', function() {
                if (chatWidget) chatWidget.classList.add('hidden');
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
