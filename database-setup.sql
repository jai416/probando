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
