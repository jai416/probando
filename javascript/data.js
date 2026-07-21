// =============================================
// data.js - TODOS LOS DATOS DEL SITIO
// IP República Bolivariana de Venezuela
// =============================================

const datosInstitucionales = {

    // ---------- NOTICIAS ----------
    noticias: [
        {
            id: 1,
            titulo: "Jornada de Embellecimiento del Centro",
            fecha: "2026-02-01",
            resumen: "Estudiantes y profesores participaron en una jornada de embellecimiento para mejorar las instalaciones del centro educativo.",
            contenido: "Estudiantes y profesores del IP República Bolivariana de Venezuela participaron activamente en una jornada de embellecimiento del centro, donde se realizaron trabajos de pintura, limpieza y mejora de las instalaciones. Esta actividad demuestra el compromiso de toda la comunidad educativa con el cuidado de nuestro espacio formativo.",
            imagen: "assets/IMG-20260201-WA0052.webp",
            categoria: "Actividades"
        },
        {
            id: 2,
            titulo: "Actividad Solidaria con Venezuela",
            fecha: "2026-02-01",
            resumen: "Nuestra comunidad escolar se unió en una actividad de solidaridad con el pueblo venezolano.",
            contenido: "El IP República Bolivariana de Venezuela realizó una emotiva actividad de solidaridad con el pueblo venezolano, donde estudiantes y profesores firmaron una carta de apoyo y realizaron actividades culturales que reflejan los valores de internacionalismo que promovemos en nuestra institución.",
            imagen: "assets/IMG-20260201-WA0021.webp",
            categoria: "Solidaridad"
        },
        {
            id: 3,
            titulo: "Graduación de la Promoción 2025",
            fecha: "2025-12-20",
            resumen: "Con orgullo celebramos la graduación de nuestros técnicos medios.",
            contenido: "Con gran orgullo celebramos la graduación de la promoción 2025 del IP República Bolivariana de Venezuela. Los egresados de las especialidades de Informática, Electrónica y Automática recibieron sus títulos de Técnicos Medios en un acto solemne presidido por las autoridades del centro y acompañados por sus familias.",
            imagen: "assets/IMG-20260201-WA0010.webp",
            categoria: "Graduación"
        },
        {
            id: 4,
            titulo: "Clases Prácticas en Laboratorio",
            fecha: "2025-11-15",
            resumen: "Los estudiantes de Electrónica realizaron prácticas de laboratorio con osciloscopios.",
            contenido: "Los estudiantes de la especialidad de Electrónica desarrollaron importantes sesiones prácticas en nuestro laboratorio equipado con osciloscopios, generadores de funciones y sistemas de desarrollo modernos, aplicando los conocimientos teóricos adquiridos en clase.",
            imagen: "assets/IMG-20260201-WA0025.webp",
            categoria: "Académico"
        },
        {
            id: 5,
            titulo: "Cosecha del Huerto Escolar",
            fecha: "2025-10-17",
            resumen: "Los estudiantes cosecharon verduras frescas como parte del programa de educación ambiental.",
            contenido: "El huerto escolar del IP República Bolivariana de Venezuela produjo una excelente cosecha de verduras frescas. Los estudiantes participantes aprendieron técnicas de agricultura sostenible y el manejo responsable de recursos naturales, contribuyendo a la alimentación de la comunidad escolar.",
            imagen: "assets/IMG_20251017_093353.webp",
            categoria: "Producción"
        },
        {
            id: 6,
            titulo: "Competencia Deportiva Inter-escuelas",
            fecha: "2025-10-10",
            resumen: "Nuestros estudiantes participaron en la competencia deportiva del municipio Güines.",
            contenido: "Nuestros estudiantes participaron activamente en la competencia deportiva inter-escuelas del municipio Güines, destacándose en las disciplinas de baloncesto y voleibol. Este evento reunió a jóvenes de diversas instituciones educativas de la región.",
            imagen: "assets/IMG-20260201-WA0031.webp",
            categoria: "Deportes"
        },
        {
            id: 7,
            titulo: "Taller de Programación Web",
            fecha: "2025-09-25",
            resumen: "Los estudiantes de Informática asistieron a un taller de desarrollo web.",
            contenido: "Los estudiantes de la especialidad de Informática participaron en un taller de desarrollo web donde aprendieron las tecnologías más actuales del mercado, incluyendo HTML5, CSS3 y JavaScript moderno, fortaleciendo sus competencias técnicas.",
            imagen: "assets/IMG-20260201-WA0013.webp",
            categoria: "Académico"
        },
        {
            id: 8,
            titulo: "Inicio del Curso Escolar 2025-2026",
            fecha: "2025-09-01",
            resumen: "Damos la bienvenida a los nuevos estudiantes de nuestras tres especialidades.",
            contenido: "Con entusiasmo dimos inicio al curso escolar 2025-2026 en el IP República Bolivariana de Venezuela. Nuevos estudiantes se incorporan a nuestras tres especialidades técnicas: Informática, Electrónica y Automática, comenzando así su formación para convertirse en técnicos medios competentes.",
            imagen: "assets/imagenes del centro (14).webp",
            categoria: "Inicio de curso"
        },
        {
            id: 9,
            titulo: "Acto de Graduación 2024",
            fecha: "2025-07-15",
            resumen: "Celebramos la graduación de la promoción 2024 con familias y autoridades.",
            contenido: "Celebramos el acto de graduación de la promoción 2024 del IP República Bolivariana de Venezuela con la presencia de familias, profesores y autoridades del municipio Güines. Los graduados recibieron sus títulos de Técnicos Medios con orgullo y esperanza para su futuro profesional.",
            imagen: "assets/IMG-20260201-WA0042.webp",
            categoria: "Graduación"
        },
        {
            id: 10,
            titulo: "Festival Deportivo del Centro",
            fecha: "2025-06-20",
            resumen: "Se realizó el festival deportivo anual con competencias de atletismo y más.",
            contenido: "Se realizó con éxito el festival deportivo anual del IP República Bolivariana de Venezuela, con competencias de atletismo, baloncesto y voleibol entre los diferentes grupos del centro, promoviendo el deporte y la recreación sana entre nuestros estudiantes.",
            imagen: "assets/imagenes del centro (19).webp",
            categoria: "Deportes"
        },
        {
            id: 11,
            titulo: "Expo-Tecnología 2025",
            fecha: "2025-05-10",
            resumen: "Los estudiantes presentaron sus proyectos en la Expo-Tecnología.",
            contenido: "Los estudiantes de las tres especialidades presentaron sus proyectos finales de curso en la Expo-Tecnología 2025, abierta a la comunidad. Se exhibieron soluciones tecnológicas innovadoras en programación, circuitos electrónicos y sistemas automatizados.",
            imagen: "assets/IMG-20260201-WA0015.webp",
            categoria: "Académico"
        },
        {
            id: 12,
            titulo: "Celebración del Día del Estudiante",
            fecha: "2025-04-17",
            resumen: "Actividades recreativas y culturales para celebrar a nuestros estudiantes.",
            contenido: "Con diversas actividades recreativas, culturales y deportivas celebramos el día del estudiante en nuestra institución, reconociendo el esfuerzo y dedicación de todos los jóvenes que forman parte de nuestra comunidad educativa.",
            imagen: "assets/IMG-20260201-WA0017.webp",
            categoria: "Cultural"
        }
    ],

    // ---------- CONOCIMIENTO DEL CHATBOT ----------
    chatbot: {
        saludo: { response: "¡Hola! 👋 Bienvenido al IP República Bolivariana de Venezuela.\n\nSoy el asistente virtual del centro. ¿En qué puedo ayudarte?", suggestions: ["Especialidades", "Inscripción", "Contacto", "Proyectos"] },
        saludo_tarde: { response: "¡Buenas tardes! 👋 ¿En qué puedo ayudarte?", suggestions: ["Especialidades", "Inscripción", "Contacto"] },
        saludo_noche: { response: "¡Buenas noches! 👋 Aunque es tarde, estoy aquí para ayudarte.", suggestions: ["Especialidades", "Contacto"] },
        adios: { response: "¡Hasta luego! 👋 ¡Que tengas un excelente día!", suggestions: [] },
        gracias: { response: "¡De nada! 😊 ¿Tienes alguna otra pregunta?", suggestions: ["Especialidades", "Contacto"] },
        especialidades: { response: "📚 ESPECIALIDADES 2025-2026\n\n💻 Informática - 59 estudiantes (3 grupos)\n⚡ Electrónica - 14 estudiantes\n🤖 Automática - 7 estudiantes\n\n🎯 Total: 80 estudiantes en 5 grupos", suggestions: ["Informática", "Electrónica", "Automática"] },
        informatica: { response: "💻 ESPECIALIDAD DE INFORMÁTICA\n\nFormamos técnicos en desarrollo de software, programación y gestión de bases de datos.\n\n👥 Matrícula: 59 alumnos (3 grupos)\n📅 Duración: 3 años\n🛠️ Módulos: Programación Web, Redes, POO, Prácticas de Producción", suggestions: ["Inscripción", "Electrónica", "Automática"] },
        electronica: { response: "⚡ ESPECIALIDAD DE ELECTRÓNICA\n\nFormación en diseño de circuitos, sistemas digitales y telecomunicaciones.\n\n👥 Matrícula: 14 alumnos (1 grupo)\n📅 Duración: 3 años\n🛠️ Módulos: Circuitos, Sistemas Digitales, Telecomunicaciones, Reparación", suggestions: ["Inscripción", "Informática", "Automática"] },
        automatica: { response: "🤖 ESPECIALIDAD DE AUTOMÁTICA\n\nAutomatización, control industrial, PLC y robótica aplicada.\n\n👥 Matrícula: 7 alumnos (1 grupo)\n📅 Duración: 3 años\n🛠️ Módulos: PLC, Sistemas de Control, Robótica, Neumática", suggestions: ["Inscripción", "Informática", "Electrónica"] },
        inscripcion: { response: "📝 REQUISITOS DE INSCRIPCIÓN\n\n1. Certificado de noveno grado aprobado\n2. Fotos tipo carné (2)\n3. Tarjeta de menor actualizada\n4. Planilla de solicitud completa\n\n📅 Período: Julio - Septiembre\n📍 Secretaría del centro", suggestions: ["Contacto", "Ubicación", "Horario"] },
        mision: { response: "🎯 MISIÓN\n\nDirigir científicamente la formación inicial y continua de la fuerza de trabajo calificada de nivel medio, a través de la integración escuela politécnica y de oficios - entidad laboral.", suggestions: ["Visión", "Valores"] },
        vision: { response: "👁️ VISIÓN\n\nSer un centro de referencia en la formación de técnicos medios, reconocido por su calidad educativa, vinculación con el sector productivo y contribución al desarrollo territorial.", suggestions: ["Misión", "Valores"] },
        valores: { response: "⭐ VALORES DEL CENTRO\n\n• Patriotismo\n• Solidaridad humana\n• Colectivismo\n• Laboriosidad\n• Disciplina\n• Independencia\n• Creatividad", suggestions: ["Misión", "Visión"] },
        directivos: { response: "👥 EQUIPO DIRECTIVO\n\n• Director: Greisy González Llano\n• Secretaria Docente: Lien Mercedes Herrera Gil\n• Subdirector General: Andy Díaz López\n• Subdirectora de Procesos: Mercedes Rivero Pérez", suggestions: ["Contacto", "Horario"] },
        instalaciones: { response: "🏫 INSTALACIONES\n\nBloque 1 - Académico:\n• 13 aulas, 2 laboratorios de informática\n• Biblioteca, sala de historia, aula de dibujo\n\nBloque 2 - Deportivo:\n• 2 canchas de baloncesto\n• Comedor para 150 personas\n• 8 dormitorios (4 habilitados)", suggestions: ["Laboratorio", "Comedor"] },
        gratuito: { response: "✅ La educación en nuestro centro es completamente GRATUITA. No se pagan matrículas ni mensualidades.", suggestions: ["Inscripción", "Becas"] },
        contacto: { response: "📞 CONTACTO\n\n📱 Teléfono: #47526422\n🕒 Horario: Lunes a Viernes 8:00 AM - 4:00 PM\n📍 Güines, Mayabeque, Cuba", suggestions: ["Ubicación", "Horario"] },
        ubicacion: { response: "📍 UBICACIÓN\n\nConsejo popular No. 3\nCircunscripción No. 1\nCalle Km 3 1/2, Río Seco\nGüines, Mayabeque, Cuba", suggestions: ["Contacto", "Horario"] },
        estadisticas: { response: "📊 ESTADÍSTICAS\n\n📈 Promoción: 98%\n💼 Inserción laboral: 85%\n📚 Retención: 90.6%\n\nMatrícula 2025-2026: 80 estudiantes", suggestions: ["Especialidades", "Contacto"] },
        deportes: { response: "⚽ DEPORTES\n\n• Cancha de baloncesto\n• Cancha de voleibol\n• Área de béisbol\n• Atletismo (en rescate)\n\nCompetencias inter-escolares regularmente.", suggestions: ["Vida estudiantil", "Infraestructura"] },
        proyectos: { response: "🚀 PROYECTOS EN DESARROLLO\n\n• Calendario Escolar\n• Portal de Recursos Educativos\n• Área de Descargas\n• Sistema de Gestión Académica\n\nPróximamente disponibles.", suggestions: ["Especialidades", "Contacto"] },
        ayuda: { response: "❓ Puedo ayudarte con:\n\n• Especialidades del centro\n• Requisitos de inscripción\n• Infraestructura\n• Ubicación y contacto\n• Estadísticas\n• Proyectos en desarrollo\n\n¡Solo pregúntame!", suggestions: ["Especialidades", "Inscripción", "Contacto"] },
        horario: { response: "🕒 HORARIO\n\nLunes a Viernes: 8:00 AM - 4:00 PM\n\nLas clases se imparten por turnos según el grupo.", suggestions: ["Contacto", "Especialidades"] },
        becas: { response: "🎓 BECAS\n\nEl centro ofrece becas según:\n• Rendimiento académico\n• Situación socioeconómica\n• Participación en actividades\n\nConsulta en secretaría.", suggestions: ["Inscripción", "Contacto"] },
        titulo: { response: "🎓 TÍTULO\n\nAl egresar obtienes el título de Técnico Medio en tu especialidad, reconocido por el Ministerio de Educación.", suggestions: ["Inscripción", "Especialidades"] },
        laboratorio: { response: "💻 LABORATORIOS\n\nContamos con 2 laboratorios de informática equipados con computadoras actualizadas, internet y software especializado.", suggestions: ["Infraestructura", "Informática"] },
        comedor: { response: "🍽️ COMEDOR\n\nCapacidad para 150 comensales simultáneos. Cocina con cocción a gas.", suggestions: ["Infraestructura", "Dormitorios"] },
        dormitorios: { response: "🛏️ DORMITORIOS\n\n8 dormitorios (4 habilitados: 2 femeninos y 2 masculinos).", suggestions: ["Infraestructura", "Comedor"] },
        huerto: { response: "🌱 HUERTO ESCOLAR\n\nProyecto productivo donde los estudiantes aprenden agricultura y manejo sustentable. Producimos verduras frescas.", suggestions: ["Vida estudiantil", "Proyectos"] },
        vida_estudiantil: { response: "🎉 VIDA ESTUDIANTIL\n\n• Huerto escolar\n• Actividades de emulación\n• Eventos culturales\n• Competencias deportivas\n• Jornadas de voluntariado", suggestions: ["Huerto", "Deportes", "Proyectos"] },
        chiste: { response: "😄 ¿Por qué el programador fue al médico? ¡Porque tenía un bug en el sistema! 😂\n\n¿Algo más?", suggestions: ["Especialidades", "Contacto"] }
    }
};

// Para compatibilidad con chatbot.js
if (typeof window !== 'undefined') {
    window.datosInstitucionales = datosInstitucionales;
}
