import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LucideIcon,
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  CalendarCheck,
  ClipboardList,
  UserCheck,
  BrainCircuit,
  HeartHandshake,
  UserPlus,
  CreditCard,
  Utensils,
  Stethoscope,
  MessageSquare,
  Megaphone,
  Server,
  Sparkles,
  Users,
  FileText,
  Archive
} from 'lucide-react';
import { getCurrentBackendPort, setBackendPort } from '../api/client';
import { useAuth } from '../context/AuthContext';

/**
 * Tipos de roles soportados por la plataforma.
 */
type Role = 'RECTOR' | 'PROFESOR' | 'SECRETARIA' | 'PAGADOR' | 'ACUDIENTE' | 'ALUMNO';

/**
 * Estructura de un ítem de navegación individual en el menú.
 */
interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  allowedRoles?: Role[];
}

/**
 * Estructura de una sección que agrupa múltiples ítems de navegación.
 */
interface NavSection {
  title: string;
  allowedRoles?: Role[];
  items: NavItem[];
}

/**
 * Componente Barra Lateral (Sidebar)
 * 
 * Contiene el menú de navegación principal de la aplicación.
 * Renderiza dinámicamente las opciones disponibles según el rol del usuario actual.
 * 
 * Mejores prácticas implementadas:
 * - Uso de etiquetas `<nav>`, `<aside>` para correcta estructura semántica.
 * - Inclusión de `aria-label` en elementos interactivos y controles.
 * - Documentación detallada en formato JSDoc.
 */
export const Sidebar: React.FC = () => {
  // Estado para el control del puerto del backend actual (Java vs Python)
  const currentPort = getCurrentBackendPort();
  
  // Obtenemos el usuario autenticado desde el contexto global
  const { currentUser } = useAuth();
  
  // Determinamos el rol actual (por defecto ALUMNO como salvaguarda)
  const role = (currentUser?.role ?? 'ALUMNO') as Role;

  /**
   * Cambia dinámicamente el puerto del backend utilizado por el cliente de API.
   * @param port - Puerto destino ('8080' para Java o '8000' para Python).
   */
  const handleToggleBackend = (port: '8080' | '8000') => {
    if (port !== currentPort) {
      setBackendPort(port);
    }
  };

  /**
   * Configuración centralizada de las secciones y enlaces del menú.
   * Se definen los permisos de acceso mediante la propiedad `allowedRoles`.
   */
  const allSections: NavSection[] = [
    {
      title: 'PRINCIPAL Y ESTADÍSTICAS',
      items: [
        { to: '/', label: 'Mi Dashboard (Personal)', icon: LayoutDashboard },
        {
          to: '/dashboard-rector',
          label: 'Tablero Directivo',
          icon: LayoutDashboard,
          allowedRoles: ['RECTOR'],
        },
      ]
    },
    {
      title: '1. GESTIÓN ACADÉMICA',
      allowedRoles: ['RECTOR', 'PROFESOR', 'SECRETARIA'],
      items: [
        { to: '/courses', label: 'Cursos y Horarios', icon: BookOpen },
        {
          to: '/gradebook',
          label: 'Planilla de Notas',
          icon: GraduationCap,
          allowedRoles: ['RECTOR', 'PROFESOR'],
        },
        { to: '/tasks', label: 'Agenda y Tareas', icon: CalendarCheck },
      ]
    },
    {
      title: '2. ESTUDIANTES Y CONDUCTA',
      allowedRoles: ['RECTOR', 'PROFESOR', 'SECRETARIA'],
      items: [
        { to: '/attendance', label: 'Llamado de Asistencia', icon: UserCheck },
        { to: '/observer', label: 'Observador del Estudiante', icon: ClipboardList },
      ]
    },
    {
      title: '3. IA Y BIENESTAR',
      items: [
        {
          to: '/strengths',
          label: 'Radar de Fortalezas IA',
          icon: BrainCircuit,
          badge: 'IA',
          allowedRoles: ['RECTOR', 'PROFESOR'],
        },
        {
          to: '/psico',
          label: 'Psicoorientación',
          icon: HeartHandshake,
          allowedRoles: ['RECTOR', 'PROFESOR'],
        },
      ]
    },
    {
      title: '4. ADMINISTRACIÓN',
      allowedRoles: ['RECTOR', 'SECRETARIA', 'PAGADOR'],
      items: [
        {
          to: '/users',
          label: 'Gestión de Usuarios',
          icon: Users,
          allowedRoles: ['RECTOR', 'SECRETARIA'],
        },
        {
          to: '/enrollment',
          label: 'Matrículas y Transición',
          icon: GraduationCap,
          allowedRoles: ['RECTOR', 'SECRETARIA'],
        },
        {
          to: '/reports',
          label: 'Reportes y Documentos',
          icon: FileText,
          allowedRoles: ['RECTOR', 'SECRETARIA'],
        },
        {
          to: '/inventory',
          label: 'Inventario y Recursos',
          icon: Archive,
          allowedRoles: ['RECTOR'],
        },
        {
          to: '/admissions',
          label: 'Admisiones',
          icon: UserPlus,
          allowedRoles: ['RECTOR', 'SECRETARIA'],
        },
        {
          to: '/finance',
          label: 'Finanzas y Pensiones',
          icon: CreditCard,
          allowedRoles: ['RECTOR', 'PAGADOR'],
        },
        {
          to: '/canteen',
          label: 'Cafetería y Monedero',
          icon: Utensils,
          allowedRoles: ['RECTOR', 'PAGADOR'],
        },
        { to: '/infirmary', label: 'Enfermería y Salud', icon: Stethoscope },
      ]
    },
    {
      title: '5. COMUNICACIONES',
      items: [
        { to: '/chat', label: 'Chat Institucional', icon: MessageSquare },
        { to: '/announcements', label: 'Cartelera y Circulares', icon: Megaphone },
      ]
    }
  ];

  /**
   * Verifica si el usuario actual tiene permisos para acceder a una ruta o sección.
   * Si no se especifica allowedRoles, la ruta es pública para todos.
   */
  const canAccess = (allowedRoles?: Role[]) =>
    !allowedRoles || allowedRoles.includes(role);

  // Filtramos las secciones y los ítems de navegación según el rol del usuario
  const navSections = allSections
    .filter(sec => canAccess(sec.allowedRoles))
    .map(sec => ({
      ...sec,
      items: sec.items.filter(item => canAccess(item.allowedRoles)),
    }))
    .filter(sec => sec.items.length > 0);

  return (
    <aside className="sidebar" aria-label="Barra lateral de navegación principal">
      {/* Encabezado: Marca y Perfil del Usuario */}
      <header style={{ padding: '20px 16px', borderBottom: '1px solid rgba(0,194,203,0.15)', background: 'linear-gradient(180deg, #04091a 0%, #060d1f 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #00c2cb 0%, #0d1f6b 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0, 194, 203, 0.4)',
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            <Sparkles size={22} color="#ffffff" />
          </div>
          <div>
            <h1 style={{
              fontSize: '20px',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(90deg, #00c2cb 0%, #4db8ff 50%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
            }}>
              AiClass
            </h1>
            <span style={{ fontSize: '10px', color: '#00c2cb', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Aprende · Explora · Crece
            </span>
          </div>
        </div>
        
        {/* Identificador Visual de Perfil del Usuario Activo */}
        {currentUser && (
          <div 
            style={{
              marginTop: '12px',
              padding: '8px 12px',
              background: 'rgba(0,194,203,0.08)',
              border: '1px solid rgba(0,194,203,0.2)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            aria-label={`Usuario actual: ${currentUser.name}, Rol: ${currentUser.role}`}
          >
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#00c2cb',
              boxShadow: '0 0 6px #00c2cb',
              flexShrink: 0,
            }} aria-hidden="true" />
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#e2e8f0', lineHeight: 1.2 }}>{currentUser.name}</p>
              <p style={{ fontSize: '10px', color: '#00c2cb', fontWeight: 600 }}>
                {currentUser.role} — {currentUser.school?.name ?? 'Sin colegio'}
              </p>
            </div>
          </div>
        )}
      </header>

      {/* Selector de Entorno de Backend (Control para QA / Demo) */}
      <section 
        style={{ margin: '16px 16px 8px 16px', padding: '12px', background: '#0b1120', borderRadius: '12px', border: '1px solid var(--border-color)' }}
        aria-label="Selector de Servidor Backend"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
          <Server size={14} color="#00c2cb" aria-hidden="true" />
          <span>Servidor Activo:</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          <button
            onClick={() => handleToggleBackend('8080')}
            style={{
              padding: '6px',
              fontSize: '11px',
              fontWeight: 700,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: currentPort === '8080' ? '#00c2cb' : '#1e293b',
              color: currentPort === '8080' ? '#000000' : '#94a3b8',
              transition: 'all 0.2s ease'
            }}
            aria-pressed={currentPort === '8080'}
            aria-label="Conectar al servidor Java Spring Boot en el puerto 8080"
          >
            ☕ Java (:8080)
          </button>
          <button
            onClick={() => handleToggleBackend('8000')}
            style={{
              padding: '6px',
              fontSize: '11px',
              fontWeight: 700,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: currentPort === '8000' ? '#6366f1' : '#1e293b',
              color: currentPort === '8000' ? '#ffffff' : '#94a3b8',
              transition: 'all 0.2s ease'
            }}
            aria-pressed={currentPort === '8000'}
            aria-label="Conectar al servidor Python FastAPI en el puerto 8000"
          >
            🐍 Python (:8000)
          </button>
        </div>
      </section>

      {/* Menú de Navegación Dinámico */}
      <nav style={{ padding: '8px 12px', flex: 1 }} aria-label="Menú principal de navegación">
        {navSections.map((sec, idx) => (
          <div key={idx} style={{ marginBottom: '18px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', padding: '0 8px 6px 8px', letterSpacing: '0.08em' }}>
              {sec.title}
            </h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px', listStyle: 'none', padding: 0, margin: 0 }}>
              {sec.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <li key={itemIdx}>
                    <NavLink
                      to={item.to}
                      style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontSize: '13px',
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? '#00c2cb' : '#cbd5e1',
                        background: isActive ? 'rgba(0, 194, 203, 0.1)' : 'transparent',
                        borderLeft: isActive ? '3px solid #00c2cb' : '3px solid transparent',
                        transition: 'all 0.15s ease'
                      })}
                      aria-current={({ isActive }) => isActive ? 'page' : undefined}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Icon size={16} aria-hidden="true" />
                        <span>{item.label}</span>
                      </div>
                      {/* Medalla/Badge especial (ej. IA) */}
                      {item.badge && (
                        <span 
                          style={{ fontSize: '9px', fontWeight: 800, background: '#6366f1', color: 'white', padding: '2px 6px', borderRadius: '10px' }}
                          aria-label={`Característica especial: ${item.badge}`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};
