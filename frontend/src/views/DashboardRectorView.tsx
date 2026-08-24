import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { DashboardStats } from '../types';
import { LayoutDashboard, Users, BookOpen, AlertTriangle, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export const DashboardRectorView: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiClient.get('/dashboards/rector');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading || !stats) {
    return <div className="p-6 text-center text-gray-500 py-20">Cargando métricas institucionales...</div>;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <LayoutDashboard className="text-blue-600" /> Tablero de Control Directivo
          </h1>
          <p className="text-gray-500">Métricas agregadas para toma de decisiones (Perfil: Rector)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Demografía Estudiantil */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Estudiantes</p>
              <h3 className="text-3xl font-black text-gray-800">{stats.totalStudents}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Users size={20} />
            </div>
          </div>
          <div className="text-xs text-green-600 flex items-center gap-1 font-medium mt-2">
            <TrendingUp size={14} /> <span>+5% este periodo</span>
          </div>
        </div>

        {/* Docentes y Staff */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Personal (Staff)</p>
              <h3 className="text-3xl font-black text-gray-800">{stats.totalTeachers + stats.totalStaff}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <Users size={20} />
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            {stats.totalTeachers} Docentes / {stats.totalStaff} Administrativos
          </div>
        </div>

        {/* Pruebas Saber */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Promedio Saber</p>
              <h3 className="text-3xl font-black text-gray-800">{stats.avgSaberScore.toFixed(1)}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <BookOpen size={20} />
            </div>
          </div>
          <div className="text-xs text-green-600 flex items-center gap-1 font-medium mt-2">
            <TrendingUp size={14} /> <span>Supera media nacional (250)</span>
          </div>
        </div>

        {/* Disciplina */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Alertas (Obs.)</p>
              <h3 className="text-3xl font-black text-red-600">{stats.activeIncidents}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <AlertTriangle size={20} />
            </div>
          </div>
          <div className="text-xs text-red-500 flex items-center gap-1 font-medium mt-2">
            <TrendingDown size={14} className="transform rotate-180" /> <span>Requiere atención inmediata</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Finanzas Básicas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <DollarSign className="text-green-600" /> Resumen Financiero
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-600">Ingresos Proyectados</span>
                <span className="text-sm font-bold text-gray-800">{formatCurrency(stats.totalRevenue)}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-600">Cartera Vencida (Por Recaudar)</span>
                <span className="text-sm font-bold text-red-600">{formatCurrency(stats.pendingPayments)}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Comunicados Recientes o Metas (Placeholder Visual) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Metas Institucionales 2026</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm text-blue-800">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Aumentar puntaje ICFES/Saber global en 5%
            </li>
            <li className="flex items-center gap-3 text-sm text-blue-800">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Reducir morosidad de pagos al 10%
            </li>
            <li className="flex items-center gap-3 text-sm text-blue-800">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Disminuir incidencias disciplinarias graves a 0
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
