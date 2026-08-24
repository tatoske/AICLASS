import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import {
  Users,
  BookOpen,
  GraduationCap,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Vista del Panel de Control (DashboardView)
 * 
 * Componente principal que actúa como página de inicio o "home" de la aplicación.
 * Muestra métricas clave (KPIs), accesos directos y los anuncios recientes.
 * 
 * Mejores prácticas aplicadas:
 * - Uso de JSDoc para documentar componentes y funciones.
 * - Etiquetas semánticas (<header>, <main>, <section>, <article>).
 * - Identificadores únicos y `aria-labels` para mejorar la accesibilidad (a11y).
 * - Uso de `Promise.all` para optimizar múltiples llamadas asíncronas concurrentes.
 */
export const DashboardView: React.FC = () => {
  // Estados para almacenar las métricas del panel de control
  const [coursesCount, setCoursesCount] = useState<number>(0);
  const [gradesCount, setGradesCount] = useState<number>(0);
  const [tasksCount, setTasksCount] = useState<number>(0);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  
  // Estado para controlar la carga de datos inicial
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Obtiene todos los datos estadísticos desde la API para llenar el Dashboard.
   * Utiliza Promise.all para ejecutar todas las solicitudes de manera simultánea,
   * reduciendo significativamente el tiempo de carga total.
   */
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      const [coursesRes, gradesRes, tasksRes, announcementsRes] = await Promise.all([
        apiClient.get('/courses'),
        apiClient.get('/gradebook'),
        apiClient.get('/tasks'),
        apiClient.get('/announcements')
      ]);
      
      setCoursesCount(coursesRes.data.length);
      setGradesCount(gradesRes.data.length);
      setTasksCount(tasksRes.data.length);
      setAnnouncements(announcementsRes.data);
    } catch (err) {
      console.error('Error al cargar las estadísticas del dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Se ejecuta al montar el componente
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <main aria-label="Panel de control principal">
      {/* Sección Hero: Bienvenida y Contexto */}
      <section 
        aria-labelledby="dashboard-hero-title"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 194, 203, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
          border: '1px solid var(--border-glow)',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#00c2cb', letterSpacing: '0.06em' }}>
            PANEL DE CONTROL ACADÉMICO
          </span>
          <h1 id="dashboard-hero-title" style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
            Bienvenido a AIClass Enterprise
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '600px', marginTop: '6px' }}>
            Gestión escolar centralizada, seguimiento disciplinario en tiempo real y analítica predictiva vocacional potenciada por IA.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/gradebook" className="btn btn-primary" aria-label="Ir a Planilla de Notas">
            <GraduationCap size={16} aria-hidden="true" /> Planilla de Notas
          </Link>
          <Link to="/strengths" className="btn btn-secondary" aria-label="Ir al Radar de IA">
            <Sparkles size={16} color="#00c2cb" aria-hidden="true" /> Radar IA
          </Link>
        </div>
      </section>

      {/* Sección de Métricas (KPIs) */}
      <section 
        aria-label="Indicadores Clave de Rendimiento"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}
      >
        {/* Tarjeta: Cursos Activos */}
        <article className="card" aria-labelledby="kpi-courses">
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span id="kpi-courses" style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Cursos Activos</span>
            <div style={{ padding: '8px', background: 'rgba(0, 194, 203, 0.1)', borderRadius: '10px' }} aria-hidden="true">
              <BookOpen size={18} color="#00c2cb" />
            </div>
          </header>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', marginTop: '12px' }} aria-live="polite">
            {isLoading ? '...' : coursesCount}
          </div>
          <footer style={{ fontSize: '12px', color: '#10b981', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={12} aria-hidden="true" /> 100% grupos asignados
          </footer>
        </article>

        {/* Tarjeta: Registros de Notas */}
        <article className="card" aria-labelledby="kpi-grades">
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span id="kpi-grades" style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Registros de Notas</span>
            <div style={{ padding: '8px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px' }} aria-hidden="true">
              <GraduationCap size={18} color="#818cf8" />
            </div>
          </header>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', marginTop: '12px' }} aria-live="polite">
            {isLoading ? '...' : gradesCount}
          </div>
          <footer style={{ fontSize: '12px', color: '#818cf8', marginTop: '4px' }}>
            Ponderado (40% - 40% - 20%)
          </footer>
        </article>

        {/* Tarjeta: Tareas y Agenda */}
        <article className="card" aria-labelledby="kpi-tasks">
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span id="kpi-tasks" style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Tareas y Agenda</span>
            <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '10px' }} aria-hidden="true">
              <Calendar size={18} color="#f59e0b" />
            </div>
          </header>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', marginTop: '12px' }} aria-live="polite">
            {isLoading ? '...' : tasksCount}
          </div>
          <footer style={{ fontSize: '12px', color: '#f59e0b', marginTop: '4px' }}>
            Actividades vigentes
          </footer>
        </article>

        {/* Tarjeta: Estado IA */}
        <article className="card" aria-labelledby="kpi-ai">
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span id="kpi-ai" style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Diagnóstico IA</span>
            <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px' }} aria-hidden="true">
              <Sparkles size={18} color="#10b981" />
            </div>
          </header>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', marginTop: '12px' }}>
            Activo
          </div>
          <footer style={{ fontSize: '12px', color: '#10b981', marginTop: '4px' }}>
            5 Dimensiones Cognitivas
          </footer>
        </article>
      </section>

      {/* Sección Secundaria: Anuncios y Estado del Sistema */}
      <section 
        aria-label="Información secundaria"
        style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}
      >
        {/* Panel de Cartelera y Comunicados */}
        <article className="card">
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>Cartelera y Comunicados Recientes</h2>
            <Link to="/announcements" style={{ fontSize: '12px', color: '#00c2cb', textDecoration: 'none', fontWeight: 600 }}>
              Ver todos →
            </Link>
          </header>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {announcements.length === 0 && !isLoading && (
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No hay anuncios recientes.</p>
            )}
            
            {announcements.map((ann, i) => (
              <div key={i} style={{ padding: '14px', background: '#0b1120', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '14px', color: '#f1f5f9' }}>{ann.title}</h3>
                  <time style={{ fontSize: '11px', color: '#64748b' }}>{ann.publishedDate}</time>
                </header>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{ann.content}</p>
                <footer style={{ marginTop: '8px', fontSize: '11px', color: '#00c2cb', fontWeight: 600 }}>
                  Por: {ann.authorName}
                </footer>
              </div>
            ))}
          </div>
        </article>

        {/* Panel de Estado de Servicios (Health Check simulado) */}
        <article className="card" aria-label="Estado de los servicios de la plataforma">
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
            Estado de los Servicios
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: '#0b1120', borderRadius: '8px' }}>
              <span style={{ fontSize: '13px' }}>Backend Spring Boot</span>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={14} aria-hidden="true" /> Listo (:8080)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: '#0b1120', borderRadius: '8px' }}>
              <span style={{ fontSize: '13px' }}>Backend FastAPI</span>
              <span style={{ fontSize: '11px', color: '#818cf8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={14} aria-hidden="true" /> Listo (:8000)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: '#0b1120', borderRadius: '8px' }}>
              <span style={{ fontSize: '13px' }}>Base de Datos H2 / SQL</span>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={14} aria-hidden="true" /> Conectado
              </span>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};
