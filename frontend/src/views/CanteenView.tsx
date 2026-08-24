import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { CanteenOrder } from '../types';
import { Utensils, Plus, Trash2, CheckCircle2, Clock } from 'lucide-react';

export const CanteenView: React.FC = () => {
  const [orders, setOrders] = useState<CanteenOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<CanteenOrder>>({
    studentName: '',
    itemName: 'Almuerzo Ejecutivo Saludable + Jugo',
    quantity: 1,
    unitPrice: 14000,
    status: 'PREPARING'
  });

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/canteen');
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/canteen', formData);
      setShowModal(false);
      setFormData({ studentName: '', itemName: 'Almuerzo Ejecutivo Saludable + Jugo', quantity: 1, unitPrice: 14000, status: 'PREPARING' });
      loadOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Cancelar este pedido de cafetería?')) {
      try {
        await apiClient.delete(`/canteen/${id}`);
        loadOrders();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Cafetería, Restaurante y Monedero Digital</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Gestión de pedidos de alimentación escolar y control de saldo digital</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} /> Nuevo Pedido
        </button>
      </div>

      <div className="card" style={{ padding: '0px' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Plato / Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
                <th>Estado del Pedido</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '30px' }}>Cargando pedidos...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '30px' }}>No hay pedidos registrados</td></tr>
              ) : (
                orders.map((o) => (
                  <tr key={o.id}>
                    <td><strong style={{ color: '#ffffff' }}>{o.studentName}</strong></td>
                    <td style={{ color: '#00c2cb', fontWeight: 600 }}>{o.itemName}</td>
                    <td>{o.quantity}</td>
                    <td>${o.unitPrice?.toLocaleString()}</td>
                    <td><strong style={{ color: '#10b981' }}>${((o.unitPrice || 0) * (o.quantity || 1)).toLocaleString()}</strong></td>
                    <td>
                      <span className={`badge ${o.status === 'DELIVERED' ? 'badge-superior' : 'badge-basico'}`}>
                        {o.status === 'DELIVERED' ? 'ENTREGADO' : 'EN PREPARACIÓN'}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(o.id)} className="btn btn-danger" style={{ padding: '6px 10px', fontSize: '12px' }}>
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
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Nuevo Pedido de Cafetería</h3>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estudiante</label>
                <input required value={formData.studentName} onChange={e => setFormData({ ...formData, studentName: e.target.value })} placeholder="Nombre del estudiante" />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Menú / Producto</label>
                <input required value={formData.itemName} onChange={e => setFormData({ ...formData, itemName: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Cantidad</label>
                  <input type="number" min="1" required value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) })} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Precio Unitario ($)</label>
                  <input type="number" required value={formData.unitPrice} onChange={e => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) })} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estado Inicial</label>
                <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as any })}>
                  <option value="PREPARING">EN PREPARACIÓN</option>
                  <option value="DELIVERED">ENTREGADO</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancelar</button>
                <button type="submit" className="btn btn-primary">Crear Pedido</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
