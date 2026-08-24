import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { StrengthEvaluation } from '../types';
import { BrainCircuit, Sparkles, Compass, Lightbulb, Activity } from 'lucide-react';

export const StrengthsView: React.FC = () => {
  const [evaluations, setEvaluations] = useState<StrengthEvaluation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEval, setSelectedEval] = useState<StrengthEvaluation | null>(null);

  const loadEvaluations = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/strengths');
      setEvaluations(res.data);
      if (res.data.length > 0) {
        setSelectedEval(res.data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvaluations();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BrainCircuit size={24} color="#00c2cb" /> Radar de Fortalezas y Orientación Vocacional IA
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            Evaluación psicopedagógica multidimensional basada en redes neuronales para potenciar el talento del estudiante
          </p>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Analizando diagnósticos...</div>
      ) : evaluations.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>No hay evaluaciones diagnósticas cargadas</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
          {/* Student Selector List */}
          <div className="card">
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Estudiantes Evaluados</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {evaluations.map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => setSelectedEval(ev)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid',
                    borderColor: selectedEval?.id === ev.id ? '#00c2cb' : 'var(--border-color)',
                    background: selectedEval?.id === ev.id ? 'rgba(0, 194, 203, 0.1)' : '#0b1120',
                    color: '#ffffff',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>{ev.studentName}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Evaluado: {ev.evaluatedAt}</div>
                  </div>
                  <Sparkles size={16} color={selectedEval?.id === ev.id ? '#00c2cb' : '#64748b'} />
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Dimensional Analysis */}
          {selectedEval && (
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#00c2cb' }}>DIAGNÓSTICO PSICOPEDAGÓGICO</span>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>{selectedEval.studentName}</h3>
                </div>
                <div style={{ padding: '6px 12px', background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '20px', color: '#818cf8', fontSize: '12px', fontWeight: 700 }}>
                  Perfil IA Generativo
                </div>
              </div>

              {/* Dimensional Progress Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Pensamiento Lógico-Matemático</span>
                    <strong style={{ color: '#38bdf8' }}>{selectedEval.logicalScore}%</strong>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#0b1120', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${selectedEval.logicalScore}%`, height: '100%', background: '#38bdf8', borderRadius: '4px' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Creatividad e Innovación Visual</span>
                    <strong style={{ color: '#a855f7' }}>{selectedEval.creativeScore}%</strong>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#0b1120', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${selectedEval.creativeScore}%`, height: '100%', background: '#a855f7', borderRadius: '4px' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Inteligencia Emocional y Liderazgo</span>
                    <strong style={{ color: '#10b981' }}>{selectedEval.emotionalScore}%</strong>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#0b1120', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${selectedEval.emotionalScore}%`, height: '100%', background: '#10b981', borderRadius: '4px' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Competencia Lingüística y Discursiva</span>
                    <strong style={{ color: '#f59e0b' }}>{selectedEval.linguisticScore}%</strong>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#0b1120', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${selectedEval.linguisticScore}%`, height: '100%', background: '#f59e0b', borderRadius: '4px' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Razonamiento Espacial y Mecánico</span>
                    <strong style={{ color: '#00c2cb' }}>{selectedEval.spatialScore}%</strong>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#0b1120', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${selectedEval.spatialScore}%`, height: '100%', background: '#00c2cb', borderRadius: '4px' }}></div>
                  </div>
                </div>
              </div>

              {/* AI Recommendation Box */}
              <div style={{ padding: '18px', background: 'rgba(0, 194, 203, 0.05)', border: '1px solid var(--border-glow)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00c2cb', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
                  <Sparkles size={16} /> Recomendación Predictiva Vocacional (AI Engine):
                </div>
                <p style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: 1.6 }}>
                  {selectedEval.aiRecommendation}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
