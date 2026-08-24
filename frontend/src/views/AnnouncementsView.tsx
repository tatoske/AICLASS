import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { Announcement } from '../types';
import { Megaphone, Plus, Trash2, Calendar, AlertTriangle } from 'lucide-react';

export const AnnouncementsView: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Announcement>>({
    title: '',
    content: '',
    category: 'INSTITUCIONAL',
    authorName: 'Rectoría AIClass',
    priority: 'NORMAL',
    publishedDate: new Date().toISOString().split('T')[0]
  });

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/announcements');
      setAnnouncements(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/announcements', formData);
      setShowModal(false);
      setFormData({ title: '', content: '', category: 'INSTITUCIONAL', authorName: 'Rectoría AIClass', priority: 'NORMAL', publishedDate: new Date().toISOString().split('T')[0] });
      loadAnnouncements();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar este comunicado?')) {
      try {
        await apiClient.delete(`/announcements/${id}`);
        loadAnnouncements();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Cartelera Oficial y Circulares</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Publicación institucional de eventos, fechas de corte y circulares de rectoría</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} /> Publicar Comunicado
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Cargando comunicados...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {announcements.map((a) => (
            <div key={a.id} className="card" style={{ borderLeft: a.priority === 'HIGH' || a.priority === 'URGENT' ? '4px solid #f43f5e' : '4px solid #00c2cb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, padding: '2px 8px', background: 'rgba(0, 194, 203, 0.15)', color: '#00c2cb', borderRadius: '6px' }}>
                      {a.category}
                    </span>
                    {a.priority === 'HIGH' && (
                      <span style={{ fontSize: '11px', fontWeight: 800, padding: '2px 8px', background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', borderRadius: '6px' }}>
                        PRIORITARIO
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
                    {a.title}
                  </h3>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                    Emitido por: <strong style={{ color: '#cbd5e1' }}>{a.authorName}</strong> | Fecha: {a.publishedDate}
                  </div>
                </div>
                <button onClick={() => handleDelete(a.id)} className="btn btn-danger" style={{ padding: '4px 8px', fontSize: '11px' }}>
                  <Trash2 size={12} />
                </button>
              </div>

              <p style={{ marginTop: '14px', fontSize: '14px', color: '#e2e8f0', lineHeight: 1.6 }}>
                {a.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal Crear */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Publicar Comunicado</h3>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Título del Comunicado</label>
                <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Ej. Entrega de Informes Finales" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Categoría</label>
                  <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                    <option value="INSTITUCIONAL">INSTITUCIONAL</option>
                    <option value="ACADÉMICO">ACADÉMICO</option>
                    <option value="CONVIVENCIA">CONVIVENCIA</option>
                    <option value="CIRCULAR">CIRCULAR</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Prioridad</label>
                  <select value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value as any })}>
                    <option value="NORMAL">NORMAL</option>
                    <option value="HIGH">ALTA / URGENTE</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Emisor / Autor</label>
                <input required value={formData.authorName} onChange={e => setFormData({ ...formData, authorName: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Contenido del Comunicado</label>
                <textarea required rows={4} value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} placeholder="Redactar el texto oficial del comunicado..." />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancelar</button>
                <button type="submit" className="btn btn-primary">Publicar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
