import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { PsicoSession } from '../types';
import { HeartHandshake, Plus, Lock, Calendar, Trash2 } from 'lucide-react';

export const PsicoView: React.FC = () => {
  const [sessions, setSessions] = useState<PsicoSession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<PsicoSession>>({
    studentName: '',
    counselorName: 'Dra. Marcela Silva (Psicóloga)',
    sessionDate: new Date().toISOString().split('T')[0],
    topic: '',
    observations: '',
    agreements: '',
    confidentialityLevel: 'RESTRICTED'
  });

  const loadSessions = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/psico');
      setSessions(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/psico', formData);
      setShowModal(false);
      setFormData({ studentName: '', counselorName: 'Dra. Marcela Silva (Psicóloga)', sessionDate: new Date().toISOString().split('T')[0], topic: '', observations: '', agreements: '', confidentialityLevel: 'RESTRICTED' });
      loadSessions();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar registro confidencial de sesión?')) {
      try {
        await apiClient.delete(`/psico/${id}`);
        loadSessions();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Psicoorientación y Acompañamiento Escolar</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Ficha clínica y psicopedagógica confidencial de bienestar estudiantil</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} /> Nueva Sesión
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Cargando sesiones...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {sessions.map((s) => (
            <div key={s.id} className="card" style={{ borderLeft: '4px solid #a855f7' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
                      {s.studentName}
                    </h3>
                    <span style={{ fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Lock size={10} /> {s.confidentialityLevel}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                    Orientador: <strong>{s.counselorName}</strong> | Fecha: {s.sessionDate}
                  </div>
                </div>
                <button onClick={() => handleDelete(s.id)} className="btn btn-danger" style={{ padding: '4px 8px', fontSize: '11px' }}>
                  <Trash2 size={12} />
                </button>
              </div>

              <div style={{ marginTop: '12px', fontSize: '14px', fontWeight: 600, color: '#00c2cb' }}>
                Motivo / Tema: {s.topic}
              </div>

              <div style={{ marginTop: '8px', fontSize: '13px', color: '#cbd5e1' }}>
                {s.observations}
              </div>

              {s.agreements && (
                <div style={{ marginTop: '10px', padding: '10px', background: '#0b1120', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '12px', color: '#94a3b8' }}>
                  <strong style={{ color: '#c084fc' }}>Acuerdos y Plan de Acompañamiento: </strong> {s.agreements}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal Crear */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Nueva Ficha de Psicoorientación</h3>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estudiante</label>
                <input required value={formData.studentName} onChange={e => setFormData({ ...formData, studentName: e.target.value })} placeholder="Nombre del estudiante" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Orientador / Psicólogo</label>
                  <input required value={formData.counselorName} onChange={e => setFormData({ ...formData, counselorName: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Fecha</label>
                  <input type="date" required value={formData.sessionDate} onChange={e => setFormData({ ...formData, sessionDate: e.target.value })} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tema / Motivo de Consulta</label>
                <input required value={formData.topic} onChange={e => setFormData({ ...formData, topic: e.target.value })} placeholder="Ej. Hábitos de estudio, ansiedad ante exámenes" />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Observaciones Clínicas / Pedagógicas</label>
                <textarea required rows={3} value={formData.observations} onChange={e => setFormData({ ...formData, observations: e.target.value })} placeholder="Diagnóstico o descripción de la sesión..." />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Compromisos y Acuerdos</label>
                <input value={formData.agreements} onChange={e => setFormData({ ...formData, agreements: e.target.value })} placeholder="Pautas a seguir con el estudiante y familia" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar Ficha</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
