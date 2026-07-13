// Configuración de Supabase - NO SUBIR A GIT
// Este archivo contiene las credenciales privadas
const SUPABASE_CONFIG = {
    url: 'https://vkgnypcjpioixkwakxvy.supabase.co',
    key: 'sb_publishable_wRk77sSzRyx5Q3Y4dnuEcw_3Jp3SEZb'
};

if (typeof window !== 'undefined') {
    window.SUPABASE_CONFIG = SUPABASE_CONFIG;
}
