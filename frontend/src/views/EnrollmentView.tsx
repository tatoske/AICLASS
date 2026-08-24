import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { Enrollment, AcademicPeriod } from '../types';
import { GraduationCap, ArrowRight, AlertTriangle, Users } from 'lucide-react';

export const EnrollmentView: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [periods, setPeriods] = useState<AcademicPeriod[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPeriod, setCurrentPeriod] = useState<string>('');
  const [nextPeriod, setNextPeriod] = useState<string>('');
  const [isPromoting, setIsPromoting] = useState<boolean>(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [enrollRes, periodRes] = await Promise.all([
        apiClient.get('/enrollment'),
        apiClient.get('/enrollment/periods')
      ]);
      setEnrollments(enrollRes.data);
      setPeriods(periodRes.data);
      if (periodRes.data.length >= 2) {
        setCurrentPeriod(periodRes.data[0].id);
        setNextPeriod(periodRes.data[1].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePromote = async () => {
    if(!currentPeriod || !nextPeriod) return;
    if(window.confirm('¿Estás seguro de promover a todos los estudiantes de este periodo? Los reprobados se quedarán en el mismo grado.')) {
      try {
        setIsPromoting(true);
        await apiClient.post(`/enrollment/promote?currentPeriodId=${currentPeriod}&nextPeriodId=${nextPeriod}`);
        loadData();
        alert('Transición completada con éxito.');
      } catch (err) {
        console.error(err);
        alert('Error en la transición.');
      } finally {
        setIsPromoting(false);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <GraduationCap className="text-blue-600" /> Matrículas y Transición
          </h1>
          <p className="text-gray-500">Gestión del ciclo de vida y promoción de estudiantes</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Transición de Año Lectivo</h3>
          <p className="text-sm text-gray-600 max-w-md">Promueve automáticamente a todos los estudiantes matriculados en el periodo actual hacia el periodo siguiente. Los alumnos reprobados mantendrán el mismo grado.</p>
        </div>
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Periodo Actual</label>
            <select className="border p-2 rounded bg-white text-sm w-40" value={currentPeriod} onChange={e => setCurrentPeriod(e.target.value)}>
              <option value="">Seleccionar...</option>
              {periods.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <ArrowRight className="text-gray-400" />
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Periodo Destino</label>
            <select className="border p-2 rounded bg-white text-sm w-40" value={nextPeriod} onChange={e => setNextPeriod(e.target.value)}>
              <option value="">Seleccionar...</option>
              {periods.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <button 
            onClick={handlePromote}
            disabled={isPromoting || !currentPeriod || !nextPeriod}
            className="ml-2 bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 disabled:opacity-50 mt-5"
          >
            {isPromoting ? 'Procesando...' : 'Ejecutar Transición'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2"><Users size={18} /> Estudiantes Matriculados</h3>
        </div>
        {loading ? (
          <div className="text-center py-10">Cargando matrículas...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Estudiante</th>
                <th className="p-4 font-semibold text-gray-600">Periodo</th>
                <th className="p-4 font-semibold text-gray-600">Grado</th>
                <th className="p-4 font-semibold text-gray-600">Estado</th>
                <th className="p-4 font-semibold text-gray-600">Repitente</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map(enr => (
                <tr key={enr.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">{enr.student?.name}</td>
                  <td className="p-4 text-gray-600">{enr.academicPeriod?.name}</td>
                  <td className="p-4 font-bold text-gray-700">{enr.gradeLevel}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      enr.status === 'MATRICULADO' ? 'bg-green-100 text-green-700' :
                      enr.status === 'PRE-MATRICULADO' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {enr.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {enr.repeating ? (
                      <span className="flex items-center gap-1 text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded w-max">
                        <AlertTriangle size={14} /> SÍ
                      </span>
                    ) : <span className="text-gray-400 text-sm">No</span>}
                  </td>
                </tr>
              ))}
              {enrollments.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No hay matrículas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
