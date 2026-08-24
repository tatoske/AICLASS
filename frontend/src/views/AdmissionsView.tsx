import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { Admission } from '../types';
import { UserPlus, Plus, CheckCircle, Clock, XCircle, Trash2 } from 'lucide-react';

export const AdmissionsView: React.FC = () => {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Admission>>({
    applicantName: '',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    targetGrade: '10°',
    status: 'SUBMITTED',
    submissionDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const loadAdmissions = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admissions');
      setAdmissions(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmissions();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/admissions', formData);
      setShowModal(false);
      setFormData({ applicantName: '', guardianName: '', guardianPhone: '', guardianEmail: '', targetGrade: '10°', status: 'SUBMITTED', submissionDate: new Date().toISOString().split('T')[0], notes: '' });
      loadAdmissions();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar registro de admisión?')) {
      try {
        await apiClient.delete(`/admissions/${id}`);
        loadAdmissions();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACCEPTED':
      case 'ENROLLED':
        return <span className="badge badge-superior">ADMITIDO</span>;
      case 'IN_REVIEW':
        return <span className="badge badge-basico">EN REVISIÓN</span>;
      case 'REJECTED':
        return <span className="badge badge-bajo">NO ADMITIDO</span>;
      default:
        return <span className="badge badge-alto">POSTULADO</span>;
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Admisiones, Prematrículas y Cupos</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Control del embudo de postulaciones y documentación de nuevos aspirantes</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} /> Nueva Postulación
        </button>
      </div>

      <div className="card" style={{ padding: '0px' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Aspirante</th>
                <th>Grado Solicitado</th>
                <th>Acudiente / Contacto</th>
                <th>Fecha Postulación</th>
                <th>Estado</th>
                <th>Observaciones</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '30px' }}>Cargando admisiones...</td></tr>
              ) : admissions.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '30px' }}>No hay solicitudes de admisión</td></tr>
              ) : (
                admissions.map((a) => (
                  <tr key={a.id}>
                    <td><strong style={{ color: '#ffffff' }}>{a.applicantName}</strong></td>
                    <td><span style={{ fontWeight: 700, color: '#00c2cb' }}>Grado {a.targetGrade}</span></td>
                    <td>
                      <div style={{ fontSize: '13px' }}>{a.guardianName}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{a.guardianPhone} | {a.guardianEmail}</div>
                    </td>
                    <td style={{ color: '#94a3b8' }}>{a.submissionDate}</td>
                    <td>{getStatusBadge(a.status)}</td>
                    <td style={{ fontSize: '12px', color: '#94a3b8', maxWidth: '200px' }}>{a.notes || '-'}</td>
                    <td>
                      <button onClick={() => handleDelete(a.id)} className="btn btn-danger" style={{ padding: '6px 10px', fontSize: '12px' }}>
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Crear */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Nueva Postulación de Admisión</h3>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Nombre Completo del Aspirante</label>
                <input required value={formData.applicantName} onChange={e => setFormData({ ...formData, applicantName: e.target.value })} placeholder="Ej. Camila Restrepo" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Nombre del Acudiente</label>
                  <input required value={formData.guardianName} onChange={e => setFormData({ ...formData, guardianName: e.target.value })} placeholder="Ej. Carlos Restrepo" />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Grado a Cursar</label>
                  <input required value={formData.targetGrade} onChange={e => setFormData({ ...formData, targetGrade: e.target.value })} placeholder="10°" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Teléfono</label>
                  <input required value={formData.guardianPhone} onChange={e => setFormData({ ...formData, guardianPhone: e.target.value })} placeholder="3001234567" />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Email</label>
                  <input type="email" required value={formData.guardianEmail} onChange={e => setFormData({ ...formData, guardianEmail: e.target.value })} placeholder="acudiente@mail.com" />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Notas / Observaciones</label>
                <textarea rows={2} value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} placeholder="Colegio de procedencia, observaciones..." />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancelar</button>
                <button type="submit" className="btn btn-primary">Registrar Aspirante</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
