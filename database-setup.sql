-- =============================================
-- IP REPÚBLICA BOLIVARIANA DE VENEZUELA
-- Base de datos para Panel Admin
-- Ejecutar en Supabase SQL Editor
-- =============================================

-- Tabla de usuarios para login
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  nombre TEXT NOT NULL,
  rol TEXT DEFAULT 'editor' CHECK (rol IN ('admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de noticias
CREATE TABLE IF NOT EXISTS noticias (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  resumen TEXT,
  contenido TEXT,
  imagen_url TEXT,
  categoria TEXT DEFAULT 'general',
  publicada BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de conocimiento del chatbot
CREATE TABLE IF NOT EXISTS chatbot_knowledge (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clave TEXT UNIQUE NOT NULL,
  respuesta TEXT NOT NULL,
  sugerencias TEXT[] DEFAULT '{}',
  categoria TEXT DEFAULT 'general',
  activo BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Datos iniciales del chatbot
INSERT INTO chatbot_knowledge (clave, respuesta, sugerencias, categoria) VALUES
('especialidades', '📚 ESPECIALIDADES 2025-2026\n\n💻 Informática - 59 estudiantes (3 grupos)\n⚡ Electrónica - 14 estudiantes\n🤖 Automática - 7 estudiantes\n\n🎯 Total: 80 estudiantes en 5 grupos', ARRAY['Informática','Electrónica','Automática'], 'academico'),
('informatica', '💻 ESPECIALIDAD DE INFORMÁTICA\n\nFormamos técnicos en desarrollo de software, programación y gestión de bases de datos.\n\n👥 Matrícula: 59 alumnos (3 grupos)\n📅 Duración: 3 años\n🛠️ Módulos: Programación Web, Redes, POO, Prácticas de Producción', ARRAY['Inscripción','Electrónica','Automática'], 'academico'),
('electronica', '⚡ ESPECIALIDAD DE ELECTRÓNICA\n\nFormación en diseño de circuitos, sistemas digitales y telecomunicaciones.\n\n👥 Matrícula: 14 alumnos (1 grupo)\n📅 Duración: 3 años\n🛠️ Módulos: Circuitos, Sistemas Digitales, Telecomunicaciones, Reparación', ARRAY['Inscripción','Informática','Automática'], 'academico'),
('automatica', '🤖 ESPECIALIDAD DE AUTOMÁTICA\n\nAutomatización, control industrial, PLC y robótica aplicada.\n\n👥 Matrícula: 7 alumnos (1 grupo)\n📅 Duración: 3 años\n🛠️ Módulos: PLC, Sistemas de Control, Robótica, Neumática', ARRAY['Inscripción','Informática','Electrónica'], 'academico'),
('inscripcion', '📝 REQUISITOS DE INSCRIPCIÓN\n\n1. Certificado de noveno grado aprobado\n2. Fotos tipo carné (2)\n3. Tarjeta de menor actualizada\n4. Planilla de solicitud completa\n\n📅 Período: Julio - Septiembre\n📍 Secretaría del centro', ARRAY['Contacto','Ubicación','Horario'], 'admisiones'),
('mision', '🎯 MISIÓN\n\nDirigir científicamente la formación inicial y continua de la fuerza de trabajo calificada de nivel medio, a través de la integración escuela politécnica y de oficios - entidad laboral.', ARRAY['Visión','Valores'], 'institucional'),
('vision', '👁️ VISIÓN\n\nSer un centro de referencia en la formación de técnicos medios, reconocido por su calidad educativa, vinculación con el sector productivo y contribución al desarrollo territorial.', ARRAY['Misión','Valores'], 'institucional'),
('valores', '⭐ VALORES DEL CENTRO\n\n• Patriotismo\n• Solidaridad humana\n• Colectivismo\n• Laboriosidad\n• Disciplina\n• Independencia\n• Creatividad', ARRAY['Misión','Visión'], 'institucional'),
('directivos', '👥 EQUIPO DIRECTIVO\n\n• Director: Greisy González Llano\n• Secretaria Docente: Lien Mercedes Herrera Gil\n• Subdirector General: Andy Díaz López\n• Subdirectora de Procesos: Mercedes Rivero Pérez', ARRAY['Contacto','Horario'], 'institucional'),
('instalaciones', '🏫 INSTALACIONES\n\nBloque 1 - Académico:\n• 13 aulas, 2 laboratorios de informática\n• Biblioteca, sala de historia, aula de dibujo\n\nBloque 2 - Deportivo:\n• 2 canchas de baloncesto\n• Comedor para 150 personas\n• 8 dormitorios (4 habilitados)', ARRAY['Laboratorio','Comedor'], 'infraestructura'),
('gratuito', '✅ La educación en nuestro centro es completamente GRATUITA. La educación técnica en Cuba es gratuita, no se pagan matrículas ni mensualidades.', ARRAY['Inscripción','Becas'], 'admisiones'),
('contacto', '📞 CONTACTO\n\n📱 Teléfono: #47526422\n🕒 Horario: Lunes a Viernes 8:00 AM - 4:00 PM\n📍 Güines, Mayabeque, Cuba', ARRAY['Ubicación','Horario'], 'contacto'),
('ubicacion', '📍 UBICACIÓN\n\nConsejo popular No. 3\nCircunscripción No. 1\nCalle Km 3 1/2, Río Seco\nGüines, Mayabeque, Cuba', ARRAY['Contacto','Horario'], 'contacto'),
('estadisticas', '📊 ESTADÍSTICAS\n\n📈 Promoción: 98%\n💼 Inserción laboral: 85%\n📚 Retención: 90.6%\n\nMatrícula 2025-2026: 80 estudiantes', ARRAY['Especialidades','Contacto'], 'academico'),
('deportes', '⚽ DEPORTES\n\n• Cancha de baloncesto\n• Cancha de voleibol\n• Área de béisbol\n• Atletismo (en rescate)\n\nCompetencias inter-escolares regularmente.', ARRAY['Vida estudiantil','Infraestructura'], 'vida_estudiantil'),
('proyectos', '🚀 PROYECTOS EN DESARROLLO\n\n• Calendario Escolar\n• Portal de Recursos Educativos\n• Área de Descargas\n• Sistema de Gestión Académica\n\nPróximamente disponibles.', ARRAY['Especialidades','Contacto'], 'general')
ON CONFLICT (clave) DO NOTHING;

-- Habilitar Row Level Security
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE noticias ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso para noticias publicadas (público)
CREATE POLICY "Noticias publicadas visibles para todos"
  ON noticias FOR SELECT
  USING (publicada = true);

-- Políticas de admin (acceso total)
CREATE POLICY "Admin acceso total noticias"
  ON noticias FOR ALL
  USING (true);

CREATE POLICY "Admin acceso total usuarios"
  ON usuarios FOR ALL
  USING (true);

-- Usuario admin por defecto
-- Email: admin@iprbv.edu.cu
-- Password: admin123
INSERT INTO usuarios (email, password_hash, nombre, rol)
VALUES ('admin@iprbv.edu.cu', 'admin123', 'Administrador', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Noticias de ejemplo
INSERT INTO noticias (titulo, resumen, contenido, imagen_url, categoria, publicada) VALUES
('Jornada de Embellecimiento del Centro', 'Estudiantes y profesores participaron en una jornada de embellecimiento para mejorar las instalaciones del centro educativo.', 'Estudiantes y profesores del IP República Bolivariana de Venezuela participaron activamente en una jornada de embellecimiento del centro, donde se realizaron trabajos de pintura, limpieza y mejora de las instalaciones. Esta actividad demuestra el compromiso de toda la comunidad educativa con el cuidado de nuestro espacio formativo.', 'assets/IMG-20260201-WA0052.webp', 'Actividades', true),
('Actividad Solidaria con Venezuela', 'Nuestra comunidad escolar se unió en una actividad de solidaridad con el pueblo venezolano.', 'El IP República Bolivariana de Venezuela realizó una emotiva actividad de solidaridad con el pueblo venezolano, donde estudiantes y profesores firmaron una carta de apoyo y realizaron actividades culturales que reflejan los valores de internacionalismo que promovemos en nuestra institución.', 'assets/IMG-20260201-WA0021.webp', 'Solidaridad', true),
('Graduación de la Promoción 2025', 'Con orgullo celebramos la graduación de nuestros técnicos medios.', 'Con gran orgullo celebramos la graduación de la promoción 2025 del IP República Bolivariana de Venezuela. Los egresados de las especialidades de Informática, Electrónica y Automática recibieron sus títulos de Técnicos Medios en un acto solemne presidido por las autoridades del centro y acompañados por sus familias.', 'assets/IMG-20260201-WA0010.webp', 'Graduación', true),
('Inicio del Curso Escolar 2025-2026', 'Damos la bienvenida a los nuevos estudiantes que se incorporan a nuestras tres especialidades.', 'Con entusiasmo dimos inicio al curso escolar 2025-2026 en el IP República Bolivariana de Venezuela. Nuevos estudiantes se incorporan a nuestras tres especialidades técnicas: Informática, Electrónica y Automática, comenzando así su formación para convertirse en técnicos medios competentes.', 'assets/imagenes del centro (14).webp', 'Inicio de curso', true),
('Clases Prácticas en Laboratorio', 'Los estudiantes de Electrónica realizaron prácticas de laboratorio con osciloscopios.', 'Los estudiantes de la especialidad de Electrónica desarrollaron importantes sesiones prácticas en nuestro laboratorio equipado con osciloscopios, generadores de funciones y sistemas de desarrollo modernos, aplicando los conocimientos teóricos adquiridos en clase.', 'assets/IMG-20260201-WA0025.webp', 'Académico', true),
('Cosecha del Huerto Escolar', 'Los estudiantes cosecharon verduras frescas como parte del programa de educación ambiental.', 'El huerto escolar del IP República Bolivariana de Venezuela produjo una excelente cosecha de verduras frescas. Los estudiantes participantes aprendieron técnicas de agricultura sostenible y el manejo responsable de recursos naturales, contribuyendo a la alimentación de la comunidad escolar.', 'assets/IMG_20251017_093353.webp', 'Producción', true);
