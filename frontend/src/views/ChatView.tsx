import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { ChatMessage } from '../types';
import { MessageSquare, Send, User, Bot, Users } from 'lucide-react';

export const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [channel, setChannel] = useState<string>('general');
  const [newMessage, setNewMessage] = useState<string>('');
  const [senderName, setSenderName] = useState<string>('Prof. Carlos Mendoza');
  const [senderRole, setSenderRole] = useState<string>('TEACHER');

  const loadMessages = async () => {
    try {
      const res = await apiClient.get(`/chat?channel=${channel}`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 5000);
    return () => clearInterval(interval);
  }, [channel]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await apiClient.post('/chat', {
        channelName: channel,
        senderName,
        senderRole,
        message: newMessage
      });
      setNewMessage('');
      loadMessages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Centro de Mensajería y Chat Institucional</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Canales de comunicación oficiales entre docentes, directivos y psicorientación</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '20px', height: '600px' }}>
        {/* Channels List */}
        <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', marginBottom: '8px', letterSpacing: '0.05em' }}>
            CANALES DE CONVERSACIÓN
          </span>
          <button
            onClick={() => setChannel('general')}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              background: channel === 'general' ? 'rgba(0, 194, 203, 0.15)' : 'transparent',
              color: channel === 'general' ? '#00c2cb' : '#cbd5e1',
              fontWeight: channel === 'general' ? 700 : 500,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textAlign: 'left'
            }}
          >
            <Users size={16} /> # Sala de Profesores
          </button>
          <button
            onClick={() => setChannel('rectoria')}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              background: channel === 'rectoria' ? 'rgba(0, 194, 203, 0.15)' : 'transparent',
              color: channel === 'rectoria' ? '#00c2cb' : '#cbd5e1',
              fontWeight: channel === 'rectoria' ? 700 : 500,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textAlign: 'left'
            }}
          >
            <MessageSquare size={16} /> # Consejo Directivo
          </button>
        </div>

        {/* Chat Messages and Input */}
        <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '8px', flex: 1, marginBottom: '16px' }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{ padding: '12px', background: '#0b1120', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ fontSize: '13px', color: '#00c2cb' }}>{m.senderName}</strong>
                    <span style={{ fontSize: '10px', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                      {m.senderRole}
                    </span>
                  </div>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>
                    {m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#e2e8f0' }}>{m.message}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
            <input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje en este canal..."
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0 20px' }}>
              <Send size={16} /> Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
