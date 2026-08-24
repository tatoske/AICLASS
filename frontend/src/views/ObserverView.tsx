import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { ObserverRecord } from '../types';
import { ClipboardList, Plus, Trash2, Award, AlertCircle, ShieldAlert } from 'lucide-react';

export const ObserverView: React.FC = () => {
  const [records, setRecords] = useState<ObserverRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<ObserverRecord>>({
    studentName: '',
    authorName: 'Prof. Carlos Mendoza',
    incidentDate: new Date().toISOString().split('T')[0],
    incidentType: 'MERIT',
    description: '',
    commitments: '',
    guardianNotified: true
  });

  const loadRecords = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/observer');
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/observer', formData);
      setShowModal(false);
      setFormData({ studentName: '', authorName: 'Prof. Carlos Mendoza', incidentDate: new Date().toISOString().split('T')[0], incidentType: 'MERIT', description: '', commitments: '', guardianNotified: true });
      loadRecords();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar anotación del observador?')) {
      try {
        await apiClient.delete(`/observer/${id}`);
        loadRecords();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'MERIT':
        return <Award size={18} color="#10b981" />;
      case 'TYPE_I':
        return <AlertCircle size={18} color="#f59e0b" />;
      case 'TYPE_II':
        return <ShieldAlert size={18} color="#f97316" />;
      case 'TYPE_III':
        return <ShieldAlert size={18} color="#f43f5e" />;
      default:
        return <AlertCircle size={18} color="#00c2cb" />;
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Observador del Estudiante y Convivencia</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Registro oficial de méritos académicos, faltas de convivencia y compromisos</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} /> Nueva Anotación
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Cargando observador...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {records.map((r) => (
            <div key={r.id} className="card" style={{ borderLeft: r.incidentType === 'MERIT' ? '4px solid #10b981' : '4px solid #f43f5e' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {getTypeIcon(r.incidentType)}
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
                      {r.studentName}
                    </h3>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      Docente: <strong>{r.authorName}</strong> | Fecha: {r.incidentDate}
                    </span>
                  </div>
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '12px',
                  background: r.incidentType === 'MERIT' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                  color: r.incidentType === 'MERIT' ? '#10b981' : '#f43f5e'
                }}>
                  {r.incidentType === 'MERIT' ? 'RECONOCIMIENTO / MÉRITO' : `FALTA ${r.incidentType}`}
                </span>
              </div>

              <div style={{ marginTop: '14px', fontSize: '14px', color: '#cbd5e1' }}>
                {r.description}
              </div>

              {r.commitments && (
                <div style={{ marginTop: '10px', padding: '10px 14px', background: '#0b1120', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '13px', color: '#94a3b8' }}>
                  <strong style={{ color: '#00c2cb' }}>Compromiso: </strong> {r.commitments}
                </div>
              )}

              <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748b' }}>
                <div>Acudiente notificado: <strong>{r.guardianNotified ? 'SÍ' : 'NO'}</strong></div>
                <button onClick={() => handleDelete(r.id)} className="btn btn-danger" style={{ padding: '4px 8px', fontSize: '11px' }}>
                  <Trash2 size={12} /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Crear */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Nueva Anotación en Observador</h3>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estudiante</label>
                <input required value={formData.studentName} onChange={e => setFormData({ ...formData, studentName: e.target.value })} placeholder="Nombre completo" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tipo de Registro</label>
                  <select value={formData.incidentType} onChange={e => setFormData({ ...formData, incidentType: e.target.value as any })}>
                    <option value="MERIT">MÉRITO / FELICITACIÓN</option>
                    <option value="TYPE_I">TIPO I (Leve)</option>
                    <option value="TYPE_II">TIPO II (Grave)</option>
                    <option value="TYPE_III">TIPO III (Gravísima)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Fecha</label>
                  <input type="date" required value={formData.incidentDate} onChange={e => setFormData({ ...formData, incidentDate: e.target.value })} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Descripción de los Hechos</label>
                <textarea required rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Detalles de la situación o motivo del reconocimiento..." />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Compromisos Adquiridos</label>
                <input value={formData.commitments} onChange={e => setFormData({ ...formData, commitments: e.target.value })} placeholder="Acuerdos firmados por el estudiante..." />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancelar</button>
                <button type="submit" className="btn btn-primary">Registrar en Observador</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
