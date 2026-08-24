import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { Course } from '../types';
import { BookOpen, Plus, Trash2, Users, Clock, MapPin } from 'lucide-react';

export const CoursesView: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Course>>({
    name: '',
    code: '',
    gradeLevel: '10°',
    groupName: 'A',
    teacherName: '',
    schedule: '',
    classroom: '',
    studentCount: 25
  });

  const loadCourses = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/courses');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/courses', formData);
      setShowModal(false);
      setFormData({ name: '', code: '', gradeLevel: '10°', groupName: 'A', teacherName: '', schedule: '', classroom: '', studentCount: 25 });
      loadCourses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      try {
        await apiClient.delete(`/courses/${id}`);
        loadCourses();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Cursos y Asignaciones Académicas</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Control de aulas, horarios, profesores y cupos</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} /> Crear Nuevo Curso
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Cargando cursos...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {courses.map((c) => (
            <div key={c.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 8px', background: 'rgba(0, 194, 203, 0.15)', color: '#00c2cb', borderRadius: '6px' }}>
                    {c.code}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Grado {c.gradeLevel} ({c.groupName})
                  </span>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>
                  {c.name}
                </h3>
                <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '14px' }}>
                  Docente: <strong style={{ color: '#f1f5f9' }}>{c.teacherName || 'Por asignar'}</strong>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#64748b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} color="#00c2cb" /> {c.schedule || 'Sin horario'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} color="#818cf8" /> {c.classroom || 'Sin aula'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={14} color="#f59e0b" /> {c.studentCount || 0} Estudiantes inscritos
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => handleDelete(c.id)} className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>
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
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Nuevo Curso</h3>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Nombre de la Materia</label>
                <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Ej. Biología Celular" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Código</label>
                  <input required value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} placeholder="BIO-10A" />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Grado y Grupo</label>
                  <input required value={formData.gradeLevel} onChange={e => setFormData({ ...formData, gradeLevel: e.target.value })} placeholder="10° A" />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Docente Asignado</label>
                <input value={formData.teacherName} onChange={e => setFormData({ ...formData, teacherName: e.target.value })} placeholder="Prof. Nombre Apellido" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Horario</label>
                  <input value={formData.schedule} onChange={e => setFormData({ ...formData, schedule: e.target.value })} placeholder="Lun-Mie 08:00 - 10:00" />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Aula / Lab</label>
                  <input value={formData.classroom} onChange={e => setFormData({ ...formData, classroom: e.target.value })} placeholder="Lab 3" />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar Curso</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
