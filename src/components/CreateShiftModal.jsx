import React from 'react';
import { X, Clock, ChevronDown } from 'lucide-react';

export default function CreateShiftModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="overlay show">
      <div className="modal" style={{ maxWidth: '500px', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ padding: '24px 24px 16px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: 'var(--ink)' }}>Create Shift</h3>
          <button onClick={onClose} className="btn ghost" style={{ padding: '4px', border: 'none', color: 'var(--ink-2)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: 'calc(90vh - 140px)', overflowY: 'auto' }}>
          
          <div className="field">
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
              Shift Name <span style={{ color: 'var(--coral)' }}>*</span>
            </label>
            <input 
              type="text" 
              placeholder="e.g. Morning Shift"
              className="glass-ctrl"
              style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="field">
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
                Start time <span style={{ color: 'var(--coral)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  defaultValue="09:00 am"
                  className="glass-ctrl"
                  style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
                  required
                />
                <Clock size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} />
              </div>
            </div>

            <div className="field">
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
                End time <span style={{ color: 'var(--coral)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  defaultValue="06:00 pm"
                  className="glass-ctrl"
                  style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
                  required
                />
                <Clock size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} />
              </div>
            </div>
          </div>

          <div className="field">
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
              Working Days <span style={{ color: 'var(--coral)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <select className="glass-ctrl" style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', appearance: 'none', backgroundColor: 'var(--surface-2)' }}>
                <option>Monday – Friday</option>
                <option>Monday – Saturday</option>
                <option>Saturday – Sunday</option>
              </select>
              <ChevronDown size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} />
            </div>
          </div>

          <div className="field">
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
              Grace period (minutes)
            </label>
            <input 
              type="text" 
              defaultValue="15"
              className="glass-ctrl"
              style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
            />
          </div>

          <div className="field">
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
              Assigned employees (Optional)
            </label>
            <select 
              multiple 
              className="glass-ctrl" 
              style={{ width: '100%', padding: '8px', fontSize: '14px', borderRadius: '12px', minHeight: '120px', marginBottom: '8px', backgroundImage: 'none' }}
            >
              <option value="shah_zaib" style={{ padding: '8px 12px', borderRadius: '8px', marginBottom: '4px', background: 'transparent', color: 'var(--ink)' }}>Shah Zaib</option>
              <option value="sarah_ahmed" style={{ padding: '8px 12px', borderRadius: '8px', marginBottom: '4px', background: 'transparent', color: 'var(--ink)' }}>Sarah Ahmed</option>
              <option value="umair_khan" style={{ padding: '8px 12px', borderRadius: '8px', marginBottom: '4px', background: 'transparent', color: 'var(--ink)' }}>Umair Khan</option>
              <option value="elena_rodriguez" style={{ padding: '8px 12px', borderRadius: '8px', marginBottom: '4px', background: 'transparent', color: 'var(--ink)' }}>Elena Rodriguez</option>
            </select>
            <div style={{ fontSize: '11px', color: 'var(--ink-2)' }}>
              Hold Ctrl/Cmd to select multiple. Assignees cannot be on two overlapping shifts.
            </div>
          </div>

          <div className="field">
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
              Notes
            </label>
            <textarea 
              className="glass-ctrl"
              style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', minHeight: '80px', resize: 'vertical' }}
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
