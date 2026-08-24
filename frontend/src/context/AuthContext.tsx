import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, School } from '../types';

/**
 * Define la estructura del Contexto de Autenticación.
 * 
 * @property currentUser - El usuario autenticado actualmente (o null si no hay sesión).
 * @property setCurrentUser - Función para actualizar directamente el estado del usuario.
 * @property mockLogin - Función para simular un inicio de sesión basado en un rol.
 */
interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  mockLogin: (role: User['role'], schoolName: string) => void;
}

// Inicializamos el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Proveedor de Autenticación (AuthProvider)
 * 
 * Este componente envuelve la aplicación y provee el estado de autenticación
 * a cualquier componente hijo que lo requiera mediante el uso de `useAuth()`.
 * 
 * @param children - Los componentes hijos que consumirán este contexto.
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estado que almacena el usuario actual. Inicia en 'null' indicando que no hay sesión activa.
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  /**
   * Simula un inicio de sesión exitoso creando un usuario ficticio
   * basado en el rol y el colegio seleccionados.
   * 
   * @param role - El rol del usuario (ej. 'RECTOR', 'PROFESOR')
   * @param schoolName - Nombre del colegio para asociarlo al usuario.
   */
  const mockLogin = (role: User['role'], schoolName: string) => {
    // Generamos datos ficticios (mock) para evitar necesitar un backend real en modo demo
    setCurrentUser({
      id: `mock-${Date.now()}`,
      name: `Usuario ${role}`,
      role: role,
      documentType: 'CC',
      documentNumber: '00000000',
      email: `${role.toLowerCase()}@${schoolName.replace(/\s+/g, '').toLowerCase()}.edu.co`,
      phone: '3000000000',
      school: {
        id: `school-${Date.now()}`,
        name: schoolName,
        nit: '900.123.456-1',
        address: 'Dirección del Colegio',
        city: 'Ciudad Mock',
        domain: `${schoolName.replace(/\s+/g, '').toLowerCase()}.edu.co`
      }
    } as unknown as User);
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, mockLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizado para consumir el contexto de autenticación.
 * Facilita el acceso a los datos del usuario desde cualquier componente.
 * 
 * @returns El contexto de autenticación (currentUser, setCurrentUser, mockLogin).
 * @throws Error si se intenta usar fuera de un AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  
  return context;
};
