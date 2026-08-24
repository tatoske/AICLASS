import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { InfirmaryVisit } from '../types';
import { Stethoscope, Plus, Trash2, HeartPulse } from 'lucide-react';

/**
 * Vista de Enfermería (InfirmaryView)
 * 
 * Este componente permite al personal médico de la institución registrar y gestionar
 * las visitas a la enfermería escolar. Incluye una tabla para visualizar los registros
 * existentes y un formulario en un modal para añadir nuevas atenciones.
 * 
 * Mejores prácticas implementadas:
 * - Uso de JSDoc para documentación de funciones y variables.
 * - Etiquetas semánticas (<header>, <main>, <section>).
 * - Identificadores únicos (`htmlFor`, `id`) y `aria-labels` para accesibilidad.
 * - Extracción de textos repetitivos a constantes.
 */
export const InfirmaryView: React.FC = () => {
  // Estado que almacena la lista de atenciones médicas
  const [visits, setVisits] = useState<InfirmaryVisit[]>([]);
  
  // Estado para controlar la pantalla de carga durante llamadas a la API
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Estado para mostrar u ocultar el modal de registro
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Estado local para los datos del formulario de nueva atención
  const [formData, setFormData] = useState<Partial<InfirmaryVisit>>({
    studentName: '',
    gradeLevel: '10° A',
    symptoms: '',
    medicationAdministered: '',
    disposition: 'RETURNED_TO_CLASS',
    nurseName: 'Enf. Patricia Londoño',
    guardianNotified: true
  });

  /**
   * Carga el historial de atenciones médicas desde el backend.
   * Maneja el estado de carga y posibles errores en la consola.
   */
  const loadVisits = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get('/infirmary');
      setVisits(res.data);
    } catch (err) {
      console.error('Error al cargar visitas de enfermería:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Hook que se ejecuta al montar el componente para traer los datos iniciales
  useEffect(() => {
    loadVisits();
  }, []);

  /**
   * Manejador para crear un nuevo registro de atención.
   * Envía los datos al servidor y recarga la tabla en caso de éxito.
   * 
   * @param e - Evento de envío de formulario React
   */
  const handleCreateVisit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/infirmary', formData);
      setIsModalOpen(false); // Cerramos el modal
      
      // Reiniciamos el formulario a sus valores por defecto
      setFormData({ 
        studentName: '', 
        gradeLevel: '10° A', 
        symptoms: '', 
        medicationAdministered: '', 
        disposition: 'RETURNED_TO_CLASS', 
        nurseName: 'Enf. Patricia Londoño', 
        guardianNotified: true 
      });
      
      // Recargamos los datos para ver el nuevo registro
      loadVisits();
    } catch (err) {
      console.error('Error al crear registro de enfermería:', err);
    }
  };

  /**
   * Manejador para eliminar un registro de atención específico.
   * Solicita confirmación al usuario antes de proceder.
   * 
   * @param id - Identificador único de la atención médica
   */
  const handleDeleteVisit = async (id: string) => {
    if (window.confirm('¿Está seguro que desea eliminar este registro de enfermería?')) {
      try {
        await apiClient.delete(`/infirmary/${id}`);
        loadVisits();
      } catch (err) {
        console.error('Error al eliminar registro:', err);
      }
    }
  };

  return (
    <section aria-labelledby="infirmary-title">
      {/* Encabezado de la Vista */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 id="infirmary-title" style={{ fontSize: '22px', fontWeight: 800 }}>Enfermería y Atención Médica Escolar</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            Registro de consultas, primeros auxilios, medicamentos suministrados y alertas de salud.
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="btn btn-primary"
          aria-label="Abrir formulario para registrar una nueva atención"
        >
          <Plus size={16} aria-hidden="true" /> Registrar Atención
        </button>
      </header>

      {/* Contenedor Principal: Tabla de Registros */}
      <main className="card" style={{ padding: '0px' }}>
        <div className="table-container" role="region" aria-label="Tabla de registros de enfermería" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col">Estudiante</th>
                <th scope="col">Grado</th>
                <th scope="col">Síntomas / Motivo</th>
                <th scope="col">Medicamento / Tratamiento</th>
                <th scope="col">Disposición</th>
                <th scope="col">Atendido Por</th>
                <th scope="col">Acudiente</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Estado: Cargando Datos */}
              {isLoading ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '30px' }} aria-live="polite">
                    Cargando atenciones médicas...
                  </td>
                </tr>
              ) : visits.length === 0 ? (
                /* Estado: Sin Datos */
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '30px' }}>
                    No hay registros de enfermería para mostrar.
                  </td>
                </tr>
              ) : (
                /* Estado: Lista de Datos */
                visits.map((visit) => (
                  <tr key={visit.id}>
                    <td><strong style={{ color: '#ffffff' }}>{visit.studentName}</strong></td>
                    <td style={{ color: '#00c2cb' }}>{visit.gradeLevel}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{visit.symptoms}</td>
                    <td style={{ color: '#818cf8' }}>{visit.medicationAdministered || 'Ninguno'}</td>
                    <td>
                      <span className="badge badge-superior" aria-label={`Estado: ${visit.disposition}`}>
                        {visit.disposition === 'RETURNED_TO_CLASS' ? 'RETORNO A CLASE' : visit.disposition}
                      </span>
                    </td>
                    <td style={{ fontSize: '12px' }}>{visit.nurseName}</td>
                    <td style={{ fontSize: '12px', color: visit.guardianNotified ? '#10b981' : '#64748b' }}>
                      {visit.guardianNotified ? 'NOTIFICADO' : 'NO NOTIFICADO'}
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDeleteVisit(visit.id)} 
                        className="btn btn-danger" 
                        style={{ padding: '6px 10px', fontSize: '12px' }}
                        aria-label={`Eliminar registro de ${visit.studentName}`}
                        title="Eliminar Registro"
                      >
                        <Trash2 size={13} aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal de Registro de Nueva Atención */}
      {isModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-content">
            <header>
              <h3 id="modal-title" style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>
                Registro de Atención Médica
              </h3>
            </header>
            
            <form onSubmit={handleCreateVisit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                {/* Campo: Nombre del Estudiante */}
                <div>
                  <label htmlFor="studentName" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estudiante</label>
                  <input 
                    id="studentName"
                    required 
                    value={formData.studentName} 
                    onChange={e => setFormData({ ...formData, studentName: e.target.value })} 
                    placeholder="Nombre del estudiante" 
                  />
                </div>
                {/* Campo: Grado Académico */}
                <div>
                  <label htmlFor="gradeLevel" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Grado</label>
                  <input 
                    id="gradeLevel"
                    required 
                    value={formData.gradeLevel} 
                    onChange={e => setFormData({ ...formData, gradeLevel: e.target.value })} 
                    placeholder="Ej. 10° A" 
                  />
                </div>
              </div>

              {/* Campo: Síntomas */}
              <div>
                <label htmlFor="symptoms" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Síntomas y Motivo de Consulta</label>
                <textarea 
                  id="symptoms"
                  required 
                  rows={2} 
                  value={formData.symptoms} 
                  onChange={e => setFormData({ ...formData, symptoms: e.target.value })} 
                  placeholder="Descripción del malestar o motivo de visita..." 
                />
              </div>

              {/* Campo: Tratamiento y Medicamentos */}
              <div>
                <label htmlFor="medicationAdministered" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Medicamento / Primeros Auxilios</label>
                <input 
                  id="medicationAdministered"
                  value={formData.medicationAdministered} 
                  onChange={e => setFormData({ ...formData, medicationAdministered: e.target.value })} 
                  placeholder="Ej. Hidratación oral, reposo, acetaminofén" 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {/* Campo: Enfermero a Cargo */}
                <div>
                  <label htmlFor="nurseName" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Enfermero(a) a Cargo</label>
                  <input 
                    id="nurseName"
                    required 
                    value={formData.nurseName} 
                    onChange={e => setFormData({ ...formData, nurseName: e.target.value })} 
                  />
                </div>
                
                {/* Campo: Disposición Final */}
                <div>
                  <label htmlFor="disposition" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Disposición Final</label>
                  <select 
                    id="disposition"
                    value={formData.disposition} 
                    onChange={e => setFormData({ ...formData, disposition: e.target.value })}
                  >
                    <option value="RETURNED_TO_CLASS">RETORNA A CLASE</option>
                    <option value="SENT_HOME">ENVIADO A CASA</option>
                    <option value="REFERRED_TO_HOSPITAL">REMITIDO A URGENCIAS</option>
                  </select>
                </div>
              </div>

              {/* Controles de Formulario */}
              <footer style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="btn btn-secondary"
                  aria-label="Cancelar registro y cerrar modal"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  aria-label="Guardar nueva atención médica"
                >
                  Registrar Atención
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
