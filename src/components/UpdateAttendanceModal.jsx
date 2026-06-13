import React from 'react';
import { X, Clock, ChevronDown } from 'lucide-react';

export default function UpdateAttendanceModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="overlay show">
      <div className="modal" style={{ maxWidth: '460px', padding: 0 }}>
        
        {/* Header */}
        <div style={{ padding: '24px 24px 16px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: 'var(--ink)' }}>Update Attendance</h3>
          <button onClick={onClose} className="btn ghost" style={{ padding: '4px', border: 'none', color: 'var(--ink-2)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Check In
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                defaultValue="--:-- --"
                className="glass-ctrl"
                style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
              />
              <Clock size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Check Out
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                defaultValue="--:-- --"
                className="glass-ctrl"
                style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
              />
              <Clock size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Status
            </label>
            <div style={{ position: 'relative' }}>
              <select className="glass-ctrl" style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', appearance: 'none', backgroundColor: 'var(--surface-2)' }}>
                <option>Absent</option>
                <option>Present</option>
                <option>Late</option>
                <option>On Leave</option>
                <option>Half Day</option>
              </select>
              <ChevronDown size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Notes
            </label>
            <textarea 
              className="glass-ctrl"
              style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', minHeight: '60px', resize: 'vertical' }}
            />
          </div>

        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={onClose} className="btn ghost" style={{ border: '1px solid var(--coral)', color: 'var(--coral)' }}>
            Cancel
          </button>
          <button onClick={onClose} className="btn primary">
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
