import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { Task } from '../types';
import { CalendarCheck, Plus, Trash2, CheckCircle2, Clock } from 'lucide-react';

export const TasksView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Task>>({
    courseName: 'Matemáticas y Cálculo',
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    weightPercentage: 20.0,
    category: 'HACER',
    status: 'PENDING'
  });

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/tasks', formData);
      setShowModal(false);
      setFormData({ courseName: 'Matemáticas y Cálculo', title: '', description: '', dueDate: new Date().toISOString().split('T')[0], weightPercentage: 20.0, category: 'HACER', status: 'PENDING' });
      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar esta tarea escolar?')) {
      try {
        await apiClient.delete(`/tasks/${id}`);
        loadTasks();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Agenda de Deberes y Tareas</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Asignación de actividades escolares, fechas de entrega y ponderaciones</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} /> Asignar Nueva Tarea
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Cargando tareas...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {tasks.map((t) => (
            <div key={t.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 8px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', borderRadius: '6px' }}>
                    {t.courseName}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: t.status === 'COMPLETED' ? '#10b981' : '#f59e0b' }}>
                    {t.status === 'COMPLETED' ? 'COMPLETADA' : 'PENDIENTE'}
                  </span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                  {t.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  {t.description || 'Sin descripción adicional'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} color="#00c2cb" /> Entrega: <strong>{t.dueDate}</strong>
                  </div>
                  <div>Peso: <strong>{t.weightPercentage}%</strong> ({t.category})</div>
                </div>
              </div>

              <div style={{ marginTop: '18px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => handleDelete(t.id)} className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>
                  <Trash2 size={14} /> Eliminar
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
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Asignar Tarea</h3>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Título de la Actividad</label>
                <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Ej. Taller de Vectores" />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Materia</label>
                <input required value={formData.courseName} onChange={e => setFormData({ ...formData, courseName: e.target.value })} placeholder="Física Cuántica" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Fecha Límite</label>
                  <input type="date" required value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Componente Evaluativo</label>
                  <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value as any })}>
                    <option value="SABER">SABER (40%)</option>
                    <option value="HACER">HACER (40%)</option>
                    <option value="SER">SER (20%)</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Instrucciones y Guía</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Detalles de lo que debe realizar el estudiante..." />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancelar</button>
                <button type="submit" className="btn btn-primary">Asignar Tarea</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
