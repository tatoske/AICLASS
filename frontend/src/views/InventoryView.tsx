import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { InventoryItem, Location } from '../types';
import { Archive, Plus, MapPin, Tag, AlertCircle } from 'lucide-react';

export const InventoryView: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    name: '',
    serialNumber: '',
    status: 'ACTIVO',
    manufactureDate: ''
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [itemsRes, locsRes] = await Promise.all([
        apiClient.get('/inventory/items'),
        apiClient.get('/inventory/locations')
      ]);
      setItems(itemsRes.data);
      setLocations(locsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/inventory/items', formData);
      setShowModal(false);
      loadData();
      setFormData({ name: '', serialNumber: '', status: 'ACTIVO', manufactureDate: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecommission = async (id: string) => {
    if(window.confirm('¿Estás seguro de dar de baja este recurso?')) {
      try {
        await apiClient.post(`/inventory/items/${id}/decommission`);
        loadData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Archive className="text-blue-600" /> Inventario y Recursos
          </h1>
          <p className="text-gray-500">Gestión de bienes, salones e infraestructura</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} /> Nuevo Recurso
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2"><Tag size={18} /> Bienes Físicos</h3>
        </div>
        {loading ? (
          <div className="text-center py-10">Cargando inventario...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Recurso / S/N</th>
                <th className="p-4 font-semibold text-gray-600">Estado</th>
                <th className="p-4 font-semibold text-gray-600">Ubicación</th>
                <th className="p-4 font-semibold text-gray-600">Fechas</th>
                <th className="p-4 font-semibold text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${item.status === 'DE_BAJA' ? 'opacity-50' : ''}`}>
                  <td className="p-4">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500 font-mono">S/N: {item.serialNumber}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'ACTIVO' ? 'bg-green-100 text-green-700' :
                      item.status === 'MANTENIMIENTO' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {item.location ? (
                      <div className="flex items-center gap-1 text-gray-600 text-sm">
                        <MapPin size={14} className="text-gray-400" />
                        {item.location.name} ({item.location.campus})
                      </div>
                    ) : <span className="text-gray-400 text-sm">Sin asignar</span>}
                  </td>
                  <td className="p-4 text-xs text-gray-500">
                    <p>Ingreso: {item.entryDate}</p>
                    {item.status === 'DE_BAJA' && <p className="text-red-500">Baja: {item.decommissionDate}</p>}
                  </td>
                  <td className="p-4">
                    {item.status !== 'DE_BAJA' && (
                      <button 
                        onClick={() => handleDecommission(item.id!)}
                        className="text-red-600 hover:text-red-800 text-xs font-semibold flex items-center gap-1 bg-red-50 px-2 py-1 rounded"
                      >
                        <AlertCircle size={14} /> Dar de Baja
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No hay recursos registrados en el inventario.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">Nuevo Recurso Físico</h2>
            </div>
            <form onSubmit={handleCreate} className="p-4 space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nombre del Bien</label>
                <input required type="text" className="w-full border p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Ej. Video Beam Epson" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Número de Serie (S/N)</label>
                <input required type="text" className="w-full border p-2 rounded font-mono" value={formData.serialNumber} onChange={e => setFormData({...formData, serialNumber: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Estado</label>
                  <select className="w-full border p-2 rounded" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="ACTIVO">ACTIVO</option>
                    <option value="MANTENIMIENTO">MANTENIMIENTO</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Fecha Manufactura</label>
                  <input type="date" className="w-full border p-2 rounded" value={formData.manufactureDate} onChange={e => setFormData({...formData, manufactureDate: e.target.value})} />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                  Cancelar
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
