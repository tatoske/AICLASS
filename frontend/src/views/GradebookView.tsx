import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { GradeRecord } from '../types';
import { GraduationCap, Plus, Trash2, Calculator } from 'lucide-react';

export const GradebookView: React.FC = () => {
  const [grades, setGrades] = useState<GradeRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<GradeRecord>>({
    studentName: '',
    courseName: 'Matemáticas y Cálculo',
    term: 'Periodo 1',
    saberScore: 4.0,
    hacerScore: 4.0,
    serScore: 4.0,
    feedback: ''
  });

  const loadGrades = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/gradebook');
      setGrades(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGrades();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/gradebook', formData);
      setShowModal(false);
      setFormData({ studentName: '', courseName: 'Matemáticas y Cálculo', term: 'Periodo 1', saberScore: 4.0, hacerScore: 4.0, serScore: 4.0, feedback: '' });
      loadGrades();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar registro de calificación?')) {
      try {
        await apiClient.delete(`/gradebook/${id}`);
        loadGrades();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getBadgeClass = (perf?: string) => {
    switch (perf) {
      case 'SUPERIOR': return 'badge-superior';
      case 'ALTO': return 'badge-alto';
      case 'BÁSICO': return 'badge-basico';
      case 'BAJO': return 'badge-bajo';
      default: return 'badge-alto';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Planilla de Notas Institucional</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            Cálculo ponderado institucional: <strong>Definitiva = (Saber × 40%) + (Hacer × 40%) + (Ser × 20%)</strong>
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} /> Nueva Calificación
        </button>
      </div>

      <div className="card" style={{ padding: '0px' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Asignatura</th>
                <th>Periodo</th>
                <th>Saber (40%)</th>
                <th>Hacer (40%)</th>
                <th>Ser (20%)</th>
                <th>Definitiva</th>
                <th>Nivel</th>
                <th>Observaciones</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} style={{ textAlign: 'center', padding: '30px' }}>Cargando notas...</td>
                </tr>
              ) : grades.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ textAlign: 'center', padding: '30px' }}>No hay registros de notas</td>
                </tr>
              ) : (
                grades.map((g) => (
                  <tr key={g.id}>
                    <td><strong style={{ color: '#ffffff' }}>{g.studentName}</strong></td>
                    <td>{g.courseName}</td>
                    <td>{g.term}</td>
                    <td><span style={{ fontWeight: 700, color: '#38bdf8' }}>{g.saberScore?.toFixed(1)}</span></td>
                    <td><span style={{ fontWeight: 700, color: '#a855f7' }}>{g.hacerScore?.toFixed(1)}</span></td>
                    <td><span style={{ fontWeight: 700, color: '#f59e0b' }}>{g.serScore?.toFixed(1)}</span></td>
                    <td>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 800,
                        color: (g.finalScore || 0) >= 3.0 ? '#10b981' : '#f43f5e'
                      }}>
                        {g.finalScore?.toFixed(2)}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getBadgeClass(g.performanceLevel)}`}>
                        {g.performanceLevel}
                      </span>
                    </td>
                    <td style={{ fontSize: '12px', color: '#94a3b8', maxWidth: '200px' }}>
                      {g.feedback || '-'}
                    </td>
                    <td>
                      <button onClick={() => handleDelete(g.id)} className="btn btn-danger" style={{ padding: '6px 10px', fontSize: '12px' }}>
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
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Ingresar Calificación</h3>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Nombre del Estudiante</label>
                <input required value={formData.studentName} onChange={e => setFormData({ ...formData, studentName: e.target.value })} placeholder="Ej. Valentina Ríos Morales" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Materia</label>
                  <input required value={formData.courseName} onChange={e => setFormData({ ...formData, courseName: e.target.value })} placeholder="Matemáticas" />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Periodo</label>
                  <select value={formData.term} onChange={e => setFormData({ ...formData, term: e.target.value })}>
                    <option value="Periodo 1">Periodo 1</option>
                    <option value="Periodo 2">Periodo 2</option>
                    <option value="Periodo 3">Periodo 3</option>
                    <option value="Periodo 4">Periodo 4</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Saber (40%)</label>
                  <input type="number" step="0.1" min="0" max="5" required value={formData.saberScore} onChange={e => setFormData({ ...formData, saberScore: parseFloat(e.target.value) })} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Hacer (40%)</label>
                  <input type="number" step="0.1" min="0" max="5" required value={formData.hacerScore} onChange={e => setFormData({ ...formData, hacerScore: parseFloat(e.target.value) })} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Ser (20%)</label>
                  <input type="number" step="0.1" min="0" max="5" required value={formData.serScore} onChange={e => setFormData({ ...formData, serScore: parseFloat(e.target.value) })} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Retroalimentación Pedagógica</label>
                <textarea rows={3} value={formData.feedback} onChange={e => setFormData({ ...formData, feedback: e.target.value })} placeholder="Comentarios del docente sobre el desempeño..." />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar Nota</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
