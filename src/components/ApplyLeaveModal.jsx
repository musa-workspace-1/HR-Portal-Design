import React from 'react';
import { X, Search, Calendar, ChevronDown, UploadCloud } from 'lucide-react';

export default function ApplyLeaveModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="overlay show">
      <div className="modal" style={{ maxWidth: '540px', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ padding: '24px 24px 16px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: 'var(--ink)' }}>Apply for Leave</h3>
          <button onClick={onClose} className="btn ghost" style={{ padding: '4px', border: 'none', color: 'var(--ink-2)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: 'calc(90vh - 140px)', overflowY: 'auto' }}>
          
          <div className="field">
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
              Employee <span style={{ color: 'var(--coral)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)' }} />
              <input 
                type="text" 
                placeholder="Search employee..."
                className="glass-ctrl"
                style={{ width: '100%', padding: '12px 16px 12px 40px', fontSize: '14px', borderRadius: '12px' }}
                required
              />
            </div>
          </div>

          <div className="field">
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
              Leave Type <span style={{ color: 'var(--coral)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <select className="glass-ctrl" style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', appearance: 'none', backgroundColor: 'var(--surface-2)' }}>
                <option>Annual Leave</option>
                <option>Sick Leave</option>
                <option>Casual Leave</option>
                <option>Emergency Leave</option>
                <option>Unpaid Leave</option>
              </select>
              <ChevronDown size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="field">
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
                From Date <span style={{ color: 'var(--coral)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="date" 
                  className="glass-ctrl"
                  style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
                To Date <span style={{ color: 'var(--coral)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="date" 
                  className="glass-ctrl"
                  style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
                  required
                />
              </div>
            </div>
          </div>

          <div className="field">
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
              Reason <span style={{ color: 'var(--coral)' }}>*</span>
            </label>
            <textarea 
              className="glass-ctrl"
              placeholder="Provide the context or rationale behind the leave request..."
              style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', minHeight: '80px', resize: 'vertical' }}
              required
            />
          </div>

          <div className="field">
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
              Supporting Document (Optional)
            </label>
            <div 
              style={{ 
                border: '1px dashed var(--line)', 
                borderRadius: '12px', 
                padding: '24px', 
                textAlign: 'center', 
                cursor: 'pointer',
                backgroundColor: 'var(--surface-2)',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--brand)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
            >
              <UploadCloud size={28} style={{ color: 'var(--ink-3)', margin: '0 auto 12px' }} />
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--ink)', marginBottom: '4px' }}>
                Click or drag & drop to upload
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
                PDF, Word, JPG, PNG (Max 10 MB)
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={onClose} className="btn ghost" style={{ border: '1px solid var(--coral)', color: 'var(--coral)' }}>
            Cancel
          </button>
          <button onClick={onClose} className="btn primary">
            Submit
          </button>
        </div>

      </div>
    </div>
  );
}
