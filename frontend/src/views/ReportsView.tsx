import React, { useState } from 'react';
import { Download, FileText, Users, Receipt, CreditCard } from 'lucide-react';
import { getApiUrl } from '../api/client';

export const ReportsView: React.FC = () => {
  const [studentId, setStudentId] = useState<string>('1'); // Mock ID
  const apiUrl = getApiUrl();

  const downloadReport = (endpoint: string) => {
    window.open(`${apiUrl}${endpoint}`, '_blank');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-blue-600" /> Extracción y Reportes
          </h1>
          <p className="text-gray-500">Generación de paz y salvos, boletines y sábanas de datos masivas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sábana de Datos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Users className="text-blue-600" size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Sábana Demográfica (CSV)</h3>
          <p className="text-sm text-gray-500 mb-6 flex-grow">
            Exporta toda la información demográfica exhaustiva de los usuarios (Estudiantes, Docentes, Administrativos) en formato plano para integración con otros sistemas o bases de datos (Ej: DANE).
          </p>
          <button 
            onClick={() => downloadReport('/reports/users/csv')}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
          >
            <Download size={18} /> Descargar CSV
          </button>
        </div>

        {/* Paz y Salvo */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Receipt className="text-green-600" size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Paz y Salvo Institucional</h3>
          <p className="text-sm text-gray-500 mb-6 flex-grow">
            Genera un certificado oficial en PDF (Simulado) que avala que un estudiante específico se encuentra libre de deudas financieras o compromisos académicos pendientes.
          </p>
          <div className="w-full flex gap-2">
            <input 
              type="text" 
              placeholder="ID del Estudiante" 
              className="border p-2 rounded-lg flex-grow text-sm"
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
            />
            <button 
              onClick={() => downloadReport(`/reports/paz-y-salvo/${studentId}`)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex-shrink-0 flex items-center gap-2"
            >
              <Download size={18} /> PDF
            </button>
          </div>
        </div>

        {/* Carnet Estudiantil */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <CreditCard className="text-purple-600" size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Carnet Institucional</h3>
          <p className="text-sm text-gray-500 mb-6 flex-grow">
            Descarga la plantilla del carnet con la foto y los datos integrados del usuario para su impresión, utilizando el diseño parametrizado por la rectoría.
          </p>
          <div className="w-full flex gap-2">
            <input 
              type="text" 
              placeholder="ID del Usuario" 
              className="border p-2 rounded-lg flex-grow text-sm"
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
            />
            <button 
              onClick={() => downloadReport(`/reports/carnet/${studentId}`)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex-shrink-0 flex items-center gap-2"
            >
              <Download size={18} /> TXT
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
