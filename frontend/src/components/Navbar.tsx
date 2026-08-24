import React from 'react';
import { Bell, Search, User, ShieldCheck } from 'lucide-react';
import { getCurrentBackendPort } from '../api/client';

interface NavbarProps {
  title: string;
  subtitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ title, subtitle }) => {
  const currentPort = getCurrentBackendPort();
  const isJava = currentPort === '8080';

  return (
    <header className="topbar">
      <div>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>{title}</h1>
        {subtitle && <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{subtitle}</p>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Active Backend Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          background: isJava ? 'rgba(0, 194, 203, 0.12)' : 'rgba(99, 102, 241, 0.12)',
          border: `1px solid ${isJava ? 'rgba(0, 194, 203, 0.3)' : 'rgba(99, 102, 241, 0.3)'}`,
          borderRadius: '30px',
          fontSize: '12px',
          fontWeight: 600,
          color: isJava ? '#00c2cb' : '#818cf8'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: isJava ? '#00c2cb' : '#818cf8',
            boxShadow: `0 0 8px ${isJava ? '#00c2cb' : '#818cf8'}`
          }}></span>
          <span>Conectado: {isJava ? 'Spring Boot (:8080)' : 'FastAPI (:8000)'}</span>
        </div>

        {/* User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1e293b, #334155)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--border-color)'
          }}>
            <User size={18} color="#94a3b8" />
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#f1f5f9' }}>Director Académico</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Rectoría AIClass</div>
          </div>
        </div>
      </div>
    </header>
  );
};
