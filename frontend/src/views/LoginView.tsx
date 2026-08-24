import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, KeyRound, Mail } from 'lucide-react';

/**
 * Vista de Inicio de Sesión (LoginView)
 * 
 * Este componente representa la pantalla de autenticación de la plataforma.
 * Dado que es un entorno de demostración, permite simular el inicio de sesión
 * seleccionando un rol específico (Rector, Profesor, etc.) en lugar de validar
 * credenciales reales contra un servidor.
 * 
 * Mejores prácticas implementadas:
 * - Uso de etiquetas semánticas y accesibilidad (htmlFor, ids, aria-labels).
 * - Separación de la lógica de presentación y manejo de estado.
 * - Comentarios descriptivos para facilitar el mantenimiento del código.
 */
export const LoginView: React.FC = () => {
  // Extraemos la función de login simulado desde nuestro contexto de autenticación
  const { mockLogin } = useAuth();
  
  // Estado local para gestionar el rol seleccionado por el usuario en el formulario
  const [selectedRole, setSelectedRole] = useState<string>('RECTOR');

  /**
   * Manejador del envío del formulario.
   * Previene la recarga de la página y ejecuta la lógica de inicio de sesión.
   * 
   * @param e - Evento del formulario React
   */
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evitamos que el navegador recargue la página al enviar el formulario
    
    // En una aplicación real, aquí llamaríamos a una API de autenticación (ej. /api/auth/login)
    // Pasando el correo y la contraseña reales. Para esta demo, usamos el login simulado.
    mockLogin(selectedRole as any, 'Colegio AIClass Central');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060d1f] p-4 relative overflow-hidden">
      {/* 
        Elementos decorativos de fondo (Background decoration)
        Utilizamos posiciones absolutas y desenfoque (blur) para crear un efecto de "Glassmorphism" y luces neón.
      */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[rgba(0,194,203,0.15)] blur-[100px]" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[rgba(26,58,143,0.2)] blur-[100px]" 
        aria-hidden="true" 
      />

      {/* Contenedor principal de la tarjeta de Login */}
      <div className="card w-full max-w-md relative z-10 border border-[rgba(255,255,255,0.08)] bg-[#0d1b3e] p-8 rounded-2xl shadow-2xl">
        
        {/* Encabezado: Logo y Título */}
        <header className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00c2cb] to-[#0d1f6b] flex items-center justify-center mb-4 shadow-[0_4px_16px_rgba(0,194,203,0.4)]">
            <Sparkles size={32} color="#ffffff" aria-label="Logo de IA" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00c2cb] via-[#4db8ff] to-white mb-2">
            AiClass
          </h1>
          <p className="text-sm text-[#00c2cb] font-bold tracking-[0.12em] uppercase text-center">
            Aprende · Explora · Crece
          </p>
        </header>

        {/* Formulario de Autenticación */}
        <form onSubmit={handleLoginSubmit} className="space-y-6" aria-label="Formulario de inicio de sesión">
          
          {/* Campo: Correo Electrónico */}
          <div className="form-group">
            <label htmlFor="emailInput" className="block text-sm font-medium text-gray-300 mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Mail size={18} aria-hidden="true" />
              </div>
              <input
                id="emailInput"
                type="email"
                placeholder="usuario@aiclass.edu.co"
                className="pl-10 w-full bg-[#060d1f] border border-[rgba(255,255,255,0.1)] rounded-lg py-2 text-white focus:outline-none focus:border-[#00c2cb] focus:ring-1 focus:ring-[#00c2cb] transition-colors"
                defaultValue="demo@aiclass.edu.co"
                required
                aria-required="true"
              />
            </div>
          </div>

          {/* Campo: Contraseña */}
          <div className="form-group">
            <label htmlFor="passwordInput" className="block text-sm font-medium text-gray-300 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <KeyRound size={18} aria-hidden="true" />
              </div>
              <input
                id="passwordInput"
                type="password"
                placeholder="••••••••"
                className="pl-10 w-full bg-[#060d1f] border border-[rgba(255,255,255,0.1)] rounded-lg py-2 text-white focus:outline-none focus:border-[#00c2cb] focus:ring-1 focus:ring-[#00c2cb] transition-colors"
                defaultValue="123456"
                required
                aria-required="true"
              />
            </div>
          </div>

          {/* Campo Especial para DEMO: Selector de Rol */}
          <div className="form-group">
            <label htmlFor="roleSelect" className="block text-sm font-medium text-gray-300 mb-2">
              Seleccionar Rol (Demo)
            </label>
            <select
              id="roleSelect"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-[#060d1f] border border-[rgba(255,255,255,0.1)] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#00c2cb] focus:ring-1 focus:ring-[#00c2cb] transition-colors"
              aria-label="Seleccione el rol con el que desea ingresar"
            >
              <option value="RECTOR">Rector</option>
              <option value="PROFESOR">Profesor</option>
              <option value="SECRETARIA">Secretaría</option>
              <option value="PAGADOR">Pagador</option>
              <option value="ACUDIENTE">Acudiente</option>
              <option value="ALUMNO">Alumno</option>
            </select>
          </div>

          {/* Botón de Envío */}
          <button
            type="submit"
            className="w-full btn-primary flex justify-center items-center text-lg py-3 mt-4 rounded-lg font-semibold transition-all hover:scale-[1.02]"
            aria-label="Ingresar a la plataforma"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Pie de página de la tarjeta */}
        <footer className="mt-8 text-center text-xs text-gray-400">
          <p>Esta es una versión de demostración.</p>
          <p>Selecciona un rol y haz clic en Iniciar Sesión para acceder.</p>
        </footer>
      </div>
    </div>
  );
};
