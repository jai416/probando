// =====================================================
// CHATBOT IP REPÚBLICA BOLIVARIANA DE VENEZUELA
// Versión 3.0 - Avanzado con NLP mejorado
// =====================================================
(function() {
    'use strict';

    // ---------- BASE DE CONOCIMIENTO ----------
    var KNOWLEDGE = {
        saludo: {
            response: "¡Hola! 👋 Bienvenido al IP República Bolivariana de Venezuela.\n\nSoy el asistente virtual del centro. ¿En qué puedo ayudarte hoy?",
            suggestions: ["Especialidades", "Inscripción", "Contacto", "Infraestructura"]
        },
        saludo_tarde: {
            response: "¡Buenas tardes! 👋 Bienvenido al IP República Bolivariana de Venezuela.\n\n¿En qué puedo ayudarte?",
            suggestions: ["Especialidades", "Inscripción", "Contacto"]
        },
        saludo_noche: {
            response: "¡Buenas noches! 👋 Bienvenido al IP República Bolivariana de Venezuela.\n\nAunque es tarde, estoy aquí para ayudarte. ¿Qué necesitas?",
            suggestions: ["Especialidades", "Contacto"]
        },
        adios: {
            response: "¡Hasta luego! 👋\n\nGracias por contactarnos. ¡Que tengas un excelente día!",
            suggestions: []
        },
        gracias: {
            response: "¡De nada! 😊\n\nEstoy aquí para ayudarte. ¿Tienes alguna otra pregunta?",
            suggestions: ["Especialidades", "Inscripción", "Contacto"]
        },
        si: {
            response: "¡Genial! 😊 ¿En qué te puedo ayudar?",
            suggestions: ["Especialidades", "Inscripción", "Infraestructura"]
        },
        no: {
            response: "No hay problema. Si necesitas algo más, aquí estaré. 👋",
            suggestions: ["Especialidades", "Contacto"]
        },

        // ----- ESPECIALIDADES -----
        especialidades: {
            response: "📚 **ESPECIALIDADES 2025-2026**\n\n💻 **Informática** - 59 estudiantes (3 grupos)\n⚡ **Electrónica** - 14 estudiantes\n🤖 **Automática** - 7 estudiantes\n\n🎯 Total: 80 estudiantes en 5 grupos\n\n¿Quieres más información sobre alguna?",
            suggestions: ["Informática", "Electrónica", "Automática"]
        },
        informatica: {
            response: "💻 **ESPECIALIDAD DE INFORMÁTICA**\n\nFormamos técnicos en desarrollo de software, programación y gestión de bases de datos.\n\n👥 **Matrícula**: 59 alumnos (3 grupos)\n📅 **Duración**: 3 años\n🛠️ **Módulos principales**:\n• Programación Web y Apps\n• Redes y Telecomunicaciones\n• POO y Bases de Datos\n• Prácticas de Producción\n\n¿Te interesa inscribirte?",
            suggestions: ["Inscripción", "Electrónica", "Automática"]
        },
        electronica: {
            response: "⚡ **ESPECIALIDAD DE ELECTRÓNICA**\n\nFormación técnica en diseño de circuitos, sistemas digitales, reparación de equipos y telecomunicaciones.\n\n👥 **Matrícula**: 14 alumnos (1 grupo)\n📅 **Duración**: 3 años\n🛠️ **Módulos principales**:\n• Circuitos Electrónicos\n• Sistemas Digitales\n• Telecomunicaciones\n• Reparación de Equipos\n\n¿Te interesa inscribirte?",
            suggestions: ["Inscripción", "Informática", "Automática"]
        },
        automatica: {
            response: "🤖 **ESPECIALIDAD DE AUTOMÁTICA**\n\nEnfocada en sistemas de control industrial, automatización de procesos y bases de robótica aplicada.\n\n👥 **Matrícula**: 7 alumnos (1 grupo)\n📅 **Duración**: 3 años\n🛠️ **Módulos principales**:\n• PLC y Programación Industrial\n• Sistemas de Control\n• Robótica Aplicada\n• Neumática e Hidráulica\n\n¿Te interesa inscribirte?",
            suggestions: ["Inscripción", "Informática", "Electrónica"]
        },

        // ----- INSCRIPCIÓN -----
        inscripcion: {
            response: "📝 **REQUISITOS DE INSCRIPCIÓN**\n\n1. Certificado de noveno grado aprobado\n2. Fotos tipo carné (2)\n3. Tarjeta de menor actualizada\n4. Planilla de solicitud completa\n\n📅 **Período de inscripción**: Julio - Septiembre\n📍 **Dirígete a**: Secretaría del centro\n\n¿Necesitas más información?",
            suggestions: ["Contacto", "Ubicación", "Horario"]
        },
        requisitos: {
            response: "📋 **REQUISITOS**\n\nPara inscribirte necesitas:\n1. ✅ Certificado de noveno grado\n2. 📸 2 fotos tipo carné\n3. 🪪 Tarjeta de menor\n4. 📄 Planilla de solicitud\n\n¿Alguna otra duda?",
            suggestions: ["Inscripción", "Contacto"]
        },
        documentos: {
            response: "📄 **DOCUMENTOS NECESARIOS**\n\n• Certificado de noveno grado (original y copia)\n• 2 fotos tipo carné recientes\n• Tarjeta de menor actualizada\n• Planilla de solicitud (se entrega en el centro)\n\n¿Necesitas saber dónde entregarlos?",
            suggestions: ["Contacto", "Ubicación"]
        },

        // ----- CONTACTO Y UBICACIÓN -----
        contacto: {
            response: "📞 **INFORMACIÓN DE CONTACTO**\n\n📱 **Teléfono**: #47526422\n🕒 **Horario**: Lunes a Viernes (8:00 AM - 4:00 PM)\n📍 **Email**: info@iprbv.edu.cu\n\n¿Necesitas la ubicación exacta?",
            suggestions: ["Ubicación", "Horario", "Especialidades"]
        },
        ubicacion: {
            response: "📍 **UBICACIÓN DEL CENTRO**\n\nNos encontramos en:\n\nConsejo popular No. 3\nCircunscripción No. 1\nCalle Km 3 1/2, Río Seco\nGüines, Mayabeque, Cuba\n\n¿Cómo llegar?",
            suggestions: ["Contacto", "Horario"]
        },
        horario: {
            response: "🕒 **HORARIO ESCOLAR**\n\nEl centro permanece abierto de:\n🌅 Lunes a Viernes: 8:00 AM - 4:00 PM\n\nLas clases técnicas se imparten en sesiones por turnos según el grupo.\n\n¿Algo más?",
            suggestions: ["Contacto", "Especialidades"]
        },
        telefono: {
            response: "📱 **TELÉFONO**\n\nPuedes llamarnos al: **#47526422**\n\nHorario de atención: Lunes a Viernes de 8:00 AM a 4:00 PM",
            suggestions: ["Ubicación", "Contacto"]
        },

        // ----- INFRAESTRUCTURA -----
        infraestructura: {
            response: "🏫 **INFRAESTRUCTURA DEL CENTRO**\n\n**Bloque 1 - Académico:**\n• 13 aulas de clase\n• 2 laboratorios de informática\n• Biblioteca escolar\n• Sala de historia\n• Aula de dibujo\n\n**Bloque 2 - Deportivo y Alimentación:**\n• Canchas de baloncesto y voleibol\n• Área de béisbol\n• Comedor para 150 estudiantes\n• 8 dormitorios (3 habilitados)\n\n¿Quieres saber algo más?",
            suggestions: ["Especialidades", "Contacto"]
        },
        aulas: {
            response: "🏫 **AULAS**\n\nEl centro cuenta con **13 aulas** distribuidas en el Bloque 1 Académico, junto con 2 laboratorios de informática, biblioteca y sala de dibujo.\n\n¿Alguna otra pregunta?",
            suggestions: ["Infraestructura", "Especialidades"]
        },
        laboratorio: {
            response: "💻 **LABORATORIOS**\n\nContamos con **2 laboratorios de informática** equipados con:\n• Computadoras actualizadas\n• Acceso a internet\n• Software especializado\n\nLos estudiantes de Informática realizan aquí sus prácticas.\n\n¿Algo más?",
            suggestions: ["Infraestructura", "Informática"]
        },
        comedor: {
            response: "🍽️ **COMEDOR ESCOLAR**\n\nNuestro comedor tiene capacidad para **150 estudiantes** y ofrece alimentación durante el horario escolar.\n\n¿Otra pregunta?",
            suggestions: ["Infraestructura", "Contacto"]
        },
        dormitorios: {
            response: "🛏️ **DORMITORIOS**\n\nEl centro cuenta con **8 dormitorios**, de los cuales **3 están habilitados** para estudiantes internos.\n\n¿Algo más?",
            suggestions: ["Infraestructura", "Contacto"]
        },

        // ----- DEPORTES Y VIDA ESTUDIANTIL -----
        deportes: {
            response: "⚽ **DEPORTES**\n\nEl centro cuenta con:\n• 🏀 Cancha de baloncesto\n• 🏐 Cancha de voleibol\n• ⚾ Área de béisbol\n\nSe realizan actividades deportivas y competencias inter-escolaresregularmente.\n\n¿Te interesa la vida estudiantil?",
            suggestions: ["Vida estudiantil", "Infraestructura"]
        },
        vida_estudiantil: {
            response: "🎉 **VIDA ESTUDIANTIL**\n\nEn el IP República Bolivariana de Venezuela:\n• 🌱 Huerto escolar productivo\n• 🏅 Actividades de emulación\n• 🎭 Eventos culturales\n• ⚽ Competencias deportivas\n• 🤝 Jornadas de voluntariado\n\n¿Quieres saber más sobre alguna actividad?",
            suggestions: ["Huerto", "Deportes", "Infraestructura"]
        },
        huerto: {
            response: "🌱 **HUERTO ESCOLAR**\n\nNuestro huerto es un proyecto productivo donde los estudiantes aprenden:\n• Técnicas de agricultura\n• Manejo sustentable de recursos\n• Producción de alimentos\n\n¡Producimos verduras frescas para la comunidad escolar! 🥬🍅\n\n¿Algo más?",
            suggestions: ["Vida estudiantil", "Infraestructura"]
        },

        // ----- ESTADÍSTICAS -----
        estadisticas: {
            response: "📊 **ESTADÍSTICAS ACADÉMICAS**\n\n📈 **Promoción**: 98%\n💼 **Inserción laboral**: 85%\n📚 **Retención**: 90.6%\n\n**Matrícula histórica:**\n• 2022-2023: 200 estudiantes\n• 2023-2024: 180 estudiantes\n• 2024-2025: 165 estudiantes\n• 2025-2026: 80 estudiantes\n\n¿Alguna otra pregunta?",
            suggestions: ["Especialidades", "Contacto"]
        },
        promocion: {
            response: "📈 **TASA DE PROMOCIÓN**\n\nNuestro centro alcanza un **98% de promoción** académica, lo que demuestra la calidad de la formación que ofrecemos.\n\n¿Algo más?",
            suggestions: ["Estadísticas", "Especialidades"]
        },
        empleo: {
            response: "💼 **INSERCIÓN LABORAL**\n\nEl **85% de nuestros graduados** consiguen empleo en su especialidad. Trabajamos estrechamente con empresas y organizaciones para facilitar la inserción laboral.\n\n¿Te interesa alguna especialidad?",
            suggestions: ["Especialidades", "Inscripción"]
        },

        // ----- PRECIOS Y BECAS -----
        becas: {
            response: "🎓 **BECAS**\n\nEl centro ofrece becas según:\n• Rendimiento académico\n• Situación socioeconómica\n• Participación en actividades\n\nConsulta en secretaría para más información.\n\n¿Algo más?",
            suggestions: ["Inscripción", "Contacto"]
        },
        precio: {
            response: "💰 **COSTOS**\n\nLa educación técnica en Cuba es **gratuita**. No se pagan matrículas ni mensualidades.\n\n¿Alguna otra duda?",
            suggestions: ["Inscripción", "Becas"]
        },
        costo: {
            response: "💰 **COSTOS**\n\nLa educación técnica en Cuba es **gratuita**. No se pagan matrículas ni mensualidades.\n\n¿Alguna otra duda?",
            suggestions: ["Inscripción", "Becas"]
        },
        gratis: {
            response: "✅ **Así es**. La educación en nuestro centro es completamente **gratuita**. 🇨🇺\n\n¿Te gustaría inscribirte?",
            suggestions: ["InSCRIPTOR", "Requisitos"]
        },

        // ----- CERTIFICACIÓN -----
        titulo: {
            response: "🎓 **TÍTULO**\n\nAl egresar del centro obtienes el título de **Técnico Medio** en la especialidad cursada, reconocido por el Ministerio de Educación.\n\n¿Algo más?",
            suggestions: ["Inscripción", "Especialidades"]
        },
        certificado: {
            response: "📜 **CERTIFICADO**\n\nAl finalizar tus estudios recibes:\n• Título de Técnico Medio\n• Certificado de competencias laborales\n\nAmbos son documentos oficialmente reconocidos.\n\n¿Alguna otra duda?",
            suggestions: ["Título", "Inscripción"]
        },

        // ----- DESPEDIDA Y AGRADECIMIENTOS -----
        chiste: {
            response: "😄 No soy muy gracioso, pero te cuento uno técnico:\n\n¿Por qué el programador fue al médico? ¡Porque tenía un **bug** en el sistema! 😂\n\n¿Algo más en lo que te pueda ayudar?",
            suggestions: ["Especialidades", "Contacto"]
        },
        ayuda: {
            response: "❓ **¿EN QUÉ PUEDO AYUDARTE?**\n\nPuedo responderte sobre:\n• 📚 Especialidades del centro\n• 📝 Requisitos de inscripción\n• 🏫 Infraestructura\n• 📍 Ubicación y contacto\n• 📊 Estadísticas académicas\n• 🏃 Deportes y vida estudiantil\n• 💰 Costos y becas\n\n¡Solo pregúntame!",
            suggestions: ["Especialidades", "Inscripción", "Infraestructura", "Contacto"]
        },
        que_puedes: {
            response: "🤖 **MIS CAPACIDADES**\n\nPuedo ayudarte con:\n\n📚 Información sobre especialidades\n📝 Proceso de inscripción\n🏫 Infraestructura del centro\n📍 Ubicación y contacto\n📊 Estadísticas académicas\n💰 Costos y becas\n🏃 Deportes y actividades\n\n¡Pregúntame lo que necesites!",
            suggestions: ["Especialidades", "Ayuda"]
        }
    };

    // ---------- SINÓNIMOS Y ALIAS ----------
    var SYNONYMS = {
        "informatica": ["informatica", "informatico", "programacion", "programar", "software", "desarrollo", "computacion", "computadora", "codigo", "redes", "sistema"],
        "electronica": ["electronica", "electronico", "circuitos", "telecomunicaciones", "chip", "microchip", "digital"],
        "automatica": ["automatica", "automatico", "robotica", "robot", "plc", "automatizacion", "control", "industrial"],
        "inscripcion": ["inscripcion", "inscribir", "inscribirse", "matricula", "matricular", "apuntar", "registrarse", "registro", "nuevo", "nueva"],
        "contacto": ["contacto", "contactar", "llamar", "telefono", "email", "correo", "comunicar"],
        "ubicacion": ["ubicacion", "donde", "direccion", "dirrecion", "llegar", "mapa", "encuentran", "esta"],
        "horario": ["horario", "hora", "horas", "cuando", "abren", "cierran", "atencion"],
        "infraestructura": ["infraestructura", "instalaciones", "aulas", "edificio", "local", "espacio", "espacios", "comedor", "dormitorio", "laboratorio"],
        "especialidades": ["especialidades", "carrera", "carreras", "opcion", "opciones", "estudiar", "formacion", "tecnico"],
        "inscripcion": ["inscripcion", "requisitos", "documentos", "papeles", "necesito"],
        "deportes": ["deportes", "deporte", "basket", "baloncesto", "voleibol", "beisbol", "futbol", "correr", "competencia"],
        "becas": ["beca", "becas", "ayuda", "economico", "dinero", "costo", "costos", "pago", "pagan", "gratis", "gratuito", "precio"],
        "profesores": ["profesor", "profesores", "maestro", "maestros", "docente", "docentes", "profesa"],
        "estadisticas": ["estadistica", "estadisticas", "datos", "numeros", "matricula", "promocion", "empleo"],
        "huerto": ["huerto", "siembra", "agricultura", "verdura", "verduras", "cosecha", "sembrar"],
        "vidae": ["vida", "estudiantil", "actividades", "eventos", "cultural"],
        "chiste": ["chiste", "chistes", "gracioso", "reir", "risa", "joke"],
        "ayuda": ["ayuda", "ayudar", "help", "puedes", "capaz", "sabes"],
        "titul": ["titulo", "certificado", "graduar", "egresar", "egreso"]
    };

    // ---------- RATE LIMITING ----------
    var lastMessageTime = 0;
    var MIN_INTERVAL = 1000;

    // ---------- NLP: LIMPIAR TEXTO ----------
    function cleanText(text) {
        return text.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[?¿!¡.,;:()]/g, "")
            .trim();
    }

    // ---------- NLP: BUSCAR INTENCIÓN ----------
    function findIntent(clean) {
        // 1. Buscar coincidencia directa en KNOWLEDGE
        for (var key in KNOWLEDGE) {
            if (clean.includes(key)) return key;
        }

        // 2. Buscar por sinónimos
        for (var intent in SYNONYMS) {
            var aliases = SYNONYMS[intent];
            for (var i = 0; i < aliases.length; i++) {
                if (clean.includes(aliases[i])) return intent;
            }
        }

        // 3. Detección por patrones de palabras clave
        var patterns = [
            { keys: ["hola", "buenos", "buenas", "saludos", "hey"], intent: "saludo" },
            { keys: ["adios", "hasta luego", "nos vemos", "bye", "chao"], intent: "adios" },
            { keys: ["gracias", "agradezco", "thanks"], intent: "gracias" },
            { keys: ["cuanto cuesta", "cuanto vale", "es gratis", "pago"], intent: "precio" },
            { keys: ["donde quedan", "donde esta", "como llego", "direccion"], intent: "ubicacion" },
            { keys: ["que hora", "a que hora", "cuando abren", "cuando cierran"], intent: "horario" },
            { keys: ["telefono", "numero de", "llamar"], intent: "telefono" },
            { keys: ["que puedo", "que sabes", "que sabes hacer", "capaz"], intent: "que_puedes" },
            { keys: ["necesito ayuda", "ayudame", "help"], intent: "ayuda" },
            { keys: ["cuantos estudiantes", "cuantos alumnos", "matricula total"], intent: "estadisticas" },
            { keys: ["que especialidad", "que carrera", "que puedo estudiar"], intent: "especialidades" },
            { keys: ["requisito", "que necesito", "documentos"], intent: "requisitos" },
            { keys: ["como me inscribo", "quiero inscribirme", "me quiero inscribir"], intent: "inscripcion" }
        ];

        for (var j = 0; j < patterns.length; j++) {
            var match = patterns[j].keys.some(function(k) { return clean.includes(k); });
            if (match) return patterns[j].intent;
        }

        // 4. Detectar saludo genérico (palabras de 3+ chars que suenan a saludo)
        if (clean.length < 15 && /^(hola|buenas?|hey|que tal|que onda)/.test(clean)) {
            return "saludo";
        }

        return null;
    }

    // ---------- SALUDO POR HORA ----------
    function getGreetingIntent() {
        var hour = new Date().getHours();
        if (hour >= 6 && hour < 12) return "saludo";
        if (hour >= 12 && hour < 18) return "saludo_tarde";
        return "saludo_noche";
    }

    // ---------- GUARDAR HISTORIAL ----------
    function guardarHistorial(texto, esBot, sugerencias) {
        var historial = JSON.parse(sessionStorage.getItem('chat_history')) || [];
        historial.push({ texto: texto, esBot: esBot, sugerencias: sugerencias || [] });
        if (historial.length > 50) historial = historial.slice(-50);
        sessionStorage.setItem('chat_history', JSON.stringify(historial));
    }

    // ---------- SONIDO ----------
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

    // ---------- TYPING INDICATOR ----------
    function removeTypingIndicator() {
        var indicator = document.getElementById('chat-typing');
        if (indicator) indicator.remove();
    }

    function showTypingIndicator() {
        var chatMessages = document.getElementById('chat-messages');
        if (!chatMessages || document.getElementById('chat-typing')) return;

        var typingDiv = document.createElement('div');
        typingDiv.id = 'chat-typing';
        typingDiv.className = 'message-wrapper bot-wrapper';
        typingDiv.innerHTML = '<div class="message bot-message typing-indicator"><span></span><span></span><span></span></div>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // ---------- AGREGAR MENSAJE ----------
    function addMessage(text, isBot, suggestions, save) {
        removeTypingIndicator();
        var chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        var messageContainer = document.createElement('div');
        messageContainer.className = isBot ? 'message-wrapper bot-wrapper' : 'message-wrapper user-wrapper';

        var messageDiv = document.createElement('div');
        messageDiv.className = isBot ? 'message bot-message' : 'message user-message';

        if (isBot) {
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

        if (isBot && suggestions && suggestions.length > 0) {
            showQuickReplies(suggestions);
        }

        if (save !== false) {
            guardarHistorial(text, isBot, isBot ? suggestions : null);
        }
    }

    // ---------- QUICK REPLIES ----------
    function showQuickReplies(suggestions) {
        var container = document.getElementById('chat-quick-replies');
        if (!container) return;

        container.innerHTML = '';
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
            container.appendChild(btn);
        });
    }

    // ---------- ENVIAR MENSAJE ----------
    function handleSend() {
        var input = document.getElementById('user-input');
        if (!input || !input.value.trim()) return;

        var now = Date.now();
        if (now - lastMessageTime < MIN_INTERVAL) return;
        lastMessageTime = now;

        var text = input.value.trim();
        input.value = '';

        addMessage(text, false, null, true);

        var quickRepliesContainer = document.getElementById('chat-quick-replies');
        if (quickRepliesContainer) quickRepliesContainer.innerHTML = '';

        showTypingIndicator();

        var delay = 800 + Math.random() * 800;

        setTimeout(function() {
            var cleaned = cleanText(text);
            var intent = findIntent(cleaned);

            if (!intent) {
                var fallbacks = [
                    "🤔 No estoy seguro de entender eso. ¿Puedes reformular tu pregunta?",
                    "Lo siento, no tengo información sobre eso. Intenta preguntar sobre **especialidades**, **inscripción** o **contacto**.",
                    "No comprendo bien. ¿Quieres saber sobre las **especialidades**, el proceso de **inscripción** o la **ubicación** del centro?"
                ];
                var msg = fallbacks[Math.floor(Math.random() * fallbacks.length)];
                reproducirSonido();
                addMessage(msg, true, ["Especialidades", "Inscripción", "Contacto", "Ayuda"], true);
                return;
            }

            var reply = KNOWLEDGE[intent];
            if (!reply) {
                addMessage("No tengo información específica sobre eso. ¿En qué más te puedo ayudar?", true, ["Especialidades", "Contacto"], true);
                return;
            }

            reproducirSonido();
            addMessage(reply.response, true, reply.suggestions, true);
        }, delay);
    }

    // ---------- CARGAR HISTORIAL ----------
    function cargarHistorial() {
        var historial = JSON.parse(sessionStorage.getItem('chat_history'));
        if (historial && historial.length > 0) {
            historial.forEach(function(msg) {
                addMessage(msg.texto, msg.esBot, null, false);
            });
            var ultimoBot = historial.slice().reverse().find(function(m) { return m.esBot; });
            if (ultimoBot && ultimoBot.sugerencias) {
                showQuickReplies(ultimoBot.sugerencias);
            }
        } else {
            showTypingIndicator();
            setTimeout(function() {
                var greetingKey = getGreetingIntent();
                var greeting = KNOWLEDGE[greetingKey];
                reproducirSonido();
                addMessage(greeting.response, true, greeting.suggestions, true);
            }, 600);
        }
    }

    // ---------- INICIALIZAR ----------
    function initChatbot() {
        var input = document.getElementById('user-input');
        var chatWidget = document.getElementById('chat-widget');
        var chatOpenBtn = document.getElementById('chat-open-btn');
        var chatCloseBtn = document.getElementById('chat-close-btn');
        var sendBtn = document.getElementById('send-btn');

        if (!input) return;

        if (sendBtn) sendBtn.addEventListener('click', handleSend);

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
