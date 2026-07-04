import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

interface ToastProps extends ToastMessage {
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ id, message, type, duration = 4000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} style={{ color: 'var(--accent-success)' }} />;
      case 'error':
        return <AlertCircle size={18} style={{ color: 'var(--accent-error)' }} />;
      case 'info':
      default:
        return <Info size={18} style={{ color: 'var(--accent-primary)' }} />;
    }
  };

  return (
    <div className={`toast toast-${type}`} style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 18px',
      borderRadius: 'var(--border-radius-md)',
      background: 'var(--bg-card)',
      border: '1px solid var(--border-card)',
      boxShadow: 'var(--shadow-lg)',
      minWidth: 280,
      maxWidth: 380,
      pointerEvents: 'auto',
      animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {getIcon()}
      </div>
      <div style={{ flex: 1, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>
        {message}
      </div>
      <button 
        onClick={() => onClose(id)} 
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          borderRadius: '50%',
          transition: 'all 0.15s'
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
      >
        <X size={14} />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="toast-container" style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      zIndex: 9999,
      pointerEvents: 'none',
    }}>
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </div>
  );
};
