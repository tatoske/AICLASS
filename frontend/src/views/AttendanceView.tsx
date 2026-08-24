import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { AttendanceRecord } from '../types';
import { UserCheck, Plus, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';

export const AttendanceView: React.FC = () => {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<AttendanceRecord>>({
    studentName: '',
    attendanceDate: new Date().toISOString().split('T')[0],
    status: 'PRESENT',
    notes: 'Puntual'
  });

  const loadAttendance = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/attendance');
      setAttendance(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/attendance', formData);
      setShowModal(false);
      setFormData({ studentName: '', attendanceDate: new Date().toISOString().split('T')[0], status: 'PRESENT', notes: 'Puntual' });
      loadAttendance();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PRESENT':
        return <span style={{ color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={14} /> PRESENTE</span>;
      case 'ABSENT':
        return <span style={{ color: '#f43f5e', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}><XCircle size={14} /> INASISTENCIA</span>;
      case 'LATE':
        return <span style={{ color: '#f59e0b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> RETARDO</span>;
      case 'EXCUSED':
        return <span style={{ color: '#38bdf8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}><AlertTriangle size={14} /> JUSTIFICADA</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Control Diario de Asistencia</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Llamado a lista en tiempo real y registro de novedades de llegada</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} /> Registrar Novedad
        </button>
      </div>

      <div className="card" style={{ padding: '0px' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Fecha de Registro</th>
                <th>Estado de Asistencia</th>
                <th>Observaciones / Justificación</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '30px' }}>Cargando registros...</td>
                </tr>
              ) : attendance.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '30px' }}>No hay registros para la fecha</td>
                </tr>
              ) : (
                attendance.map((a) => (
                  <tr key={a.id}>
                    <td><strong style={{ color: '#ffffff' }}>{a.studentName}</strong></td>
                    <td style={{ color: '#94a3b8' }}>{a.attendanceDate}</td>
                    <td>{getStatusBadge(a.status)}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{a.notes || '-'}</td>
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
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Registrar Asistencia</h3>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estudiante</label>
                <input required value={formData.studentName} onChange={e => setFormData({ ...formData, studentName: e.target.value })} placeholder="Nombre completo del estudiante" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Fecha</label>
                  <input type="date" required value={formData.attendanceDate} onChange={e => setFormData({ ...formData, attendanceDate: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estado</label>
                  <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as any })}>
                    <option value="PRESENT">PRESENTE</option>
                    <option value="ABSENT">INASISTENCIA</option>
                    <option value="LATE">RETARDO</option>
                    <option value="EXCUSED">EXCUSADO / JUSTIFICADO</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Novedad o Justificación</label>
                <input value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} placeholder="Ej. Presentó soporte médico" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar Registro</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
