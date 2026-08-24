import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, ChevronDown } from 'lucide-react';

export const UserSwitcher: React.FC = () => {
  const { currentUser, mockLogin, setCurrentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleRoleChange = (role: any, schoolName: string) => {
    mockLogin(role, schoolName);
    setIsOpen(false);
    // Reload page to reset states (simulate hard login)
    window.location.href = '/'; 
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <User size={18} />
        </div>
        <div className="text-left hidden md:block">
          <p className="text-sm font-bold text-gray-800">{currentUser?.name}</p>
          <p className="text-xs text-gray-500">{currentUser?.role} - {currentUser?.school?.name}</p>
        </div>
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100 mb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Simular Inicio de Sesión</p>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            <button onClick={() => handleRoleChange('RECTOR', 'Colegio AIClass Central')} className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700 hover:text-blue-700">Rector (Colegio Central)</button>
            <button onClick={() => handleRoleChange('PROFESOR', 'Colegio AIClass Central')} className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700 hover:text-blue-700">Profesor (Colegio Central)</button>
            <button onClick={() => handleRoleChange('SECRETARIA', 'Colegio AIClass Central')} className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700 hover:text-blue-700">Secretaria (Colegio Central)</button>
            <button onClick={() => handleRoleChange('PAGADOR', 'Colegio AIClass Central')} className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700 hover:text-blue-700">Pagador (Colegio Central)</button>
            <button onClick={() => handleRoleChange('ACUDIENTE', 'Colegio AIClass Central')} className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700 hover:text-blue-700">Acudiente (Colegio Central)</button>
            <button onClick={() => handleRoleChange('ALUMNO', 'Colegio AIClass Central')} className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700 hover:text-blue-700">Alumno (Colegio Central)</button>
            
            <div className="my-2 border-t border-gray-100"></div>
            
            <button onClick={() => handleRoleChange('RECTOR', 'Colegio B')} className="w-full text-left px-4 py-2 text-sm hover:bg-purple-50 text-gray-700 hover:text-purple-700">Rector (Colegio B)</button>
            <button onClick={() => handleRoleChange('PROFESOR', 'Colegio B')} className="w-full text-left px-4 py-2 text-sm hover:bg-purple-50 text-gray-700 hover:text-purple-700">Profesor (Colegio B)</button>
          </div>
          
          <div className="px-4 pt-2 border-t border-gray-100 mt-2">
            <button onClick={() => setCurrentUser(null)} className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 text-sm font-semibold py-2">
              <LogOut size={16} /> Cerrar Sesión Real
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
