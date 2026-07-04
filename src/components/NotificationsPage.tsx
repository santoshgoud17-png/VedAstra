import React from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_NOTIFICATIONS } from '../demoData';
import { CheckCheck } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { markAllRead, unreadCount } = useApp();

  const typeColors: Record<string, string> = {
    certificate: '#10B981', recruiter: '#0EA5E9', streak: '#EF4444',
    quiz: '#7C3AED', course: '#F59E0B', assignment: '#EC4899', badge: '#6366F1',
  };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="heading-lg">Notifications</h2>
          <p className="body-sm">{unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up! 🎉'}</p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={markAllRead} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <CheckCheck size={14} /> Mark All Read
        </button>
      </div>

      {DEMO_NOTIFICATIONS.map((n, i) => (
        <div key={n.id} className="card-flat" style={{ padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'flex-start', opacity: n.read ? 0.65 : 1, borderLeft: n.read ? '1px solid var(--border-card)' : `3px solid ${typeColors[n.type]}`, animation: `fadeInUp 0.4s ease ${i * 0.06}s both` }}>
          <div style={{ fontSize: '1.6rem', flexShrink: 0 }}>{n.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 3 }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{n.title}</span>
              {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: typeColors[n.type], flexShrink: 0 }} />}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{n.message}</p>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>{n.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
