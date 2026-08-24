import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { User } from '../types';
import { Users, Plus, Trash2, Edit2, Shield } from 'lucide-react';

export const UsersView: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    role: 'ALUMNO',
    documentType: 'TI',
    documentNumber: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: 'M',
    country: 'Colombia',
    department: '',
    municipality: '',
    commune: '',
    neighborhood: '',
    address: '',
    eps: '',
    maritalStatus: 'Soltero',
    capabilitiesDisabilities: 'Ninguna',
    conflictStatus: 'Ninguno',
    professionalTitle: '',
    position: '',
    transportSubsidy: 'No',
    restaurantSubsidy: 'No'
  });

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/users', formData);
      setShowModal(false);
      loadUsers();
      // Reset
      setFormData({
        name: '', role: 'ALUMNO', documentType: 'TI', documentNumber: '', email: '', phone: '', birthDate: '', gender: 'M', country: 'Colombia', department: '', municipality: '', commune: '', neighborhood: '', address: '', eps: '', maritalStatus: 'Soltero', capabilitiesDisabilities: 'Ninguna', conflictStatus: 'Ninguno', professionalTitle: '', position: '', transportSubsidy: 'No', restaurantSubsidy: 'No'
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if(window.confirm('¿Eliminar usuario?')) {
      try {
        await apiClient.delete(`/users/${id}`);
        loadUsers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const renderDynamicFields = () => {
    if (formData.role === 'PROFESOR' || formData.role === 'SECRETARIA' || formData.role === 'PAGADOR' || formData.role === 'RECTOR') {
      return (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="col-span-2">
            <h3 className="font-semibold text-gray-700">Información Profesional</h3>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Título Profesional</label>
            <input type="text" className="w-full border p-2 rounded" value={formData.professionalTitle} onChange={e => setFormData({...formData, professionalTitle: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Cargo</label>
            <input type="text" className="w-full border p-2 rounded" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} />
          </div>
        </div>
      );
    } else if (formData.role === 'ALUMNO' || formData.role === 'ACUDIENTE') {
      return (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="col-span-2">
            <h3 className="font-semibold text-gray-700">Beneficios y Subsidios</h3>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Subsidio Transporte</label>
            <select className="w-full border p-2 rounded" value={formData.transportSubsidy} onChange={e => setFormData({...formData, transportSubsidy: e.target.value})}>
              <option value="No">No</option>
              <option value="Sí">Sí</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Subsidio Restaurante</label>
            <select className="w-full border p-2 rounded" value={formData.restaurantSubsidy} onChange={e => setFormData({...formData, restaurantSubsidy: e.target.value})}>
              <option value="No">No</option>
              <option value="Sí">Sí</option>
            </select>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="text-blue-600" /> Gestión de Usuarios
          </h1>
          <p className="text-gray-500">Demografía exhaustiva, roles y permisos</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} /> Nuevo Usuario
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">Cargando usuarios...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Nombre</th>
                <th className="p-4 font-semibold text-gray-600">Documento</th>
                <th className="p-4 font-semibold text-gray-600">Rol</th>
                <th className="p-4 font-semibold text-gray-600">Email</th>
                <th className="p-4 font-semibold text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">{user.name}</td>
                  <td className="p-4 text-gray-600">{user.documentType} {user.documentNumber}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'ALUMNO' ? 'bg-green-100 text-green-700' :
                      user.role === 'PROFESOR' ? 'bg-blue-100 text-blue-700' :
                      user.role === 'RECTOR' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'SECRETARIA' ? 'bg-yellow-100 text-yellow-700' :
                      user.role === 'PAGADOR' ? 'bg-orange-100 text-orange-700' :
                      user.role === 'ACUDIENTE' ? 'bg-teal-100 text-teal-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id!)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No hay usuarios registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="text-blue-600" /> Registrar Nuevo Usuario
            </h2>
            <form onSubmit={handleCreate}>
              <div className="grid grid-cols-3 gap-4">
                {/* Datos Básicos */}
                <div className="col-span-3">
                  <h3 className="font-semibold text-gray-700 border-b pb-2 mb-2">Datos Básicos</h3>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Nombre Completo</label>
                  <input required type="text" className="w-full border p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Rol</label>
                  <select className="w-full border p-2 rounded" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as User['role']})}
                  >
                    <option value="ALUMNO">ALUMNO</option>
                    <option value="PROFESOR">PROFESOR</option>
                    <option value="SECRETARIA">SECRETARIA</option>
                    <option value="PAGADOR">PAGADOR</option>
                    <option value="ACUDIENTE">ACUDIENTE</option>
                    <option value="RECTOR">RECTOR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Fecha de Nacimiento</label>
                  <input type="date" className="w-full border p-2 rounded" value={formData.birthDate} onChange={e => setFormData({...formData, birthDate: e.target.value})} />
                </div>

                {/* Documento y Contacto */}
                <div>
                  <label className="block text-sm text-gray-600">Tipo Doc.</label>
                  <select className="w-full border p-2 rounded" value={formData.documentType} onChange={e => setFormData({...formData, documentType: e.target.value})}>
                    <option value="TI">TI</option>
                    <option value="CC">CC</option>
                    <option value="CE">CE</option>
                    <option value="RC">RC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">No. Documento</label>
                  <input required type="text" className="w-full border p-2 rounded" value={formData.documentNumber} onChange={e => setFormData({...formData, documentNumber: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Género</label>
                  <select className="w-full border p-2 rounded" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                
                {/* Contacto */}
                <div className="col-span-3">
                  <h3 className="font-semibold text-gray-700 border-b pb-2 mt-2 mb-2">Contacto y Ubicación</h3>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Email</label>
                  <input type="email" className="w-full border p-2 rounded" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Teléfono</label>
                  <input type="text" className="w-full border p-2 rounded" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Dirección</label>
                  <input type="text" className="w-full border p-2 rounded" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>

                {/* Bienestar */}
                <div className="col-span-3">
                  <h3 className="font-semibold text-gray-700 border-b pb-2 mt-2 mb-2">Bienestar y Diversidad</h3>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">EPS</label>
                  <input type="text" className="w-full border p-2 rounded" value={formData.eps} onChange={e => setFormData({...formData, eps: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Capacidades/Discapacidades</label>
                  <input type="text" className="w-full border p-2 rounded" value={formData.capabilitiesDisabilities} onChange={e => setFormData({...formData, capabilitiesDisabilities: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Estado de Conflicto</label>
                  <select className="w-full border p-2 rounded" value={formData.conflictStatus} onChange={e => setFormData({...formData, conflictStatus: e.target.value})}>
                    <option value="Ninguno">Ninguno</option>
                    <option value="Víctima">Víctima</option>
                    <option value="Desplazado">Desplazado</option>
                    <option value="Reinsertado">Reinsertado</option>
                  </select>
                </div>
              </div>

              {/* Campos dinámicos según el rol */}
              {renderDynamicFields()}

              <div className="flex justify-end gap-2 mt-6 border-t pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                  Cancelar
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Guardar Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
