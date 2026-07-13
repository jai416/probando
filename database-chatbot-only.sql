-- =============================================
-- SOLO EJECUTAR ESTO SI YA EJECUTASTE EL SQL ANTERIOR
-- Crea la tabla chatbot_knowledge y arregla políticas
-- =============================================

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

-- Habilitar RLS
ALTER TABLE chatbot_knowledge ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas duplicadas
DROP POLICY IF EXISTS "Noticias publicadas visibles para todos" ON noticias;
DROP POLICY IF EXISTS "Admin acceso total noticias" ON noticias;
DROP POLICY IF EXISTS "Admin acceso total usuarios" ON usuarios;
DROP POLICY IF EXISTS "Noticias publicadas" ON noticias;
DROP POLICY IF EXISTS "Admin noticias" ON noticias;
DROP POLICY IF EXISTS "Admin usuarios" ON usuarios;

-- Recrear políticas con nombres únicos
CREATE POLICY "noticias_select_public" ON noticias FOR SELECT USING (publicada = true);
CREATE POLICY "admin_all_noticias" ON noticias FOR ALL USING (true);
CREATE POLICY "admin_all_usuarios" ON usuarios FOR ALL USING (true);
CREATE POLICY "admin_all_chatbot" ON chatbot_knowledge FOR ALL USING (true);

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
