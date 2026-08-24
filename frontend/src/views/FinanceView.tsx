import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { Invoice } from '../types';
import { CreditCard, Plus, Trash2, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';

export const FinanceView: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Invoice>>({
    invoiceNumber: `FAC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    studentName: '',
    guardianName: '',
    concept: 'Pensión Mensual - Septiembre 2026',
    amount: 450000,
    dueDate: new Date().toISOString().split('T')[0],
    status: 'PENDING',
    paymentMethod: 'PSE / Wompi'
  });

  const loadInvoices = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/finance');
      setInvoices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/finance', formData);
      setShowModal(false);
      setFormData({
        invoiceNumber: `FAC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        studentName: '',
        guardianName: '',
        concept: 'Pensión Mensual',
        amount: 450000,
        dueDate: new Date().toISOString().split('T')[0],
        status: 'PENDING',
        paymentMethod: 'PSE / Wompi'
      });
      loadInvoices();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Anular o eliminar esta factura?')) {
      try {
        await apiClient.delete(`/finance/${id}`);
        loadInvoices();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PAID':
        return <span className="badge badge-superior">PAGADA</span>;
      case 'PENDING':
        return <span className="badge badge-basico">PENDIENTE</span>;
      case 'OVERDUE':
        return <span className="badge badge-bajo">VENCIDA</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Finanzas, Tesorería y Facturación</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Control de pensiones, matrículas, estados de cuenta familiares y pasarelas de pago</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} /> Emitir Factura
        </button>
      </div>

      <div className="card" style={{ padding: '0px' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>N° Factura</th>
                <th>Estudiante</th>
                <th>Acudiente</th>
                <th>Concepto</th>
                <th>Monto</th>
                <th>Vencimiento</th>
                <th>Estado</th>
                <th>Método</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={9} style={{ textAlign: 'center', padding: '30px' }}>Cargando finanzas...</td></tr>
              ) : invoices.length === 0 ? (
                <tr><td colSpan={9} style={{ textAlign: 'center', padding: '30px' }}>No hay facturas emitidas</td></tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td><strong style={{ color: '#00c2cb' }}>{inv.invoiceNumber}</strong></td>
                    <td><strong style={{ color: '#ffffff' }}>{inv.studentName}</strong></td>
                    <td>{inv.guardianName}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{inv.concept}</td>
                    <td><strong style={{ color: '#10b981' }}>${inv.amount.toLocaleString()} COP</strong></td>
                    <td style={{ color: '#94a3b8' }}>{inv.dueDate}</td>
                    <td>{getStatusBadge(inv.status)}</td>
                    <td style={{ fontSize: '12px', color: '#64748b' }}>{inv.paymentMethod || '-'}</td>
                    <td>
                      <button onClick={() => handleDelete(inv.id)} className="btn btn-danger" style={{ padding: '6px 10px', fontSize: '12px' }}>
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
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Emitir Factura Escolar</h3>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>N° Factura</label>
                  <input required value={formData.invoiceNumber} onChange={e => setFormData({ ...formData, invoiceNumber: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Valor ($ COP)</label>
                  <input type="number" required value={formData.amount} onChange={e => setFormData({ ...formData, amount: parseFloat(e.target.value) })} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estudiante</label>
                  <input required value={formData.studentName} onChange={e => setFormData({ ...formData, studentName: e.target.value })} placeholder="Nombre del alumno" />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Acudiente Responsable</label>
                  <input required value={formData.guardianName} onChange={e => setFormData({ ...formData, guardianName: e.target.value })} placeholder="Nombre del padre" />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Concepto de Cobro</label>
                <input required value={formData.concept} onChange={e => setFormData({ ...formData, concept: e.target.value })} placeholder="Ej. Pensión Septiembre 2026" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Fecha Límite</label>
                  <input type="date" required value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estado</label>
                  <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as any })}>
                    <option value="PENDING">PENDIENTE</option>
                    <option value="PAID">PAGADA</option>
                    <option value="OVERDUE">VENCIDA</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancelar</button>
                <button type="submit" className="btn btn-primary">Generar Factura</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
