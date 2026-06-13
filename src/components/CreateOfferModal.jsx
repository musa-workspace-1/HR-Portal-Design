import React from 'react';
import { X, ChevronDown } from 'lucide-react';

export default function CreateOfferModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="overlay show">
      <div className="modal" style={{ maxWidth: '540px', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ padding: '24px 24px 16px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: 'var(--ink)' }}>Create Offer</h3>
          <button onClick={onClose} className="btn ghost" style={{ padding: '4px', border: 'none', color: 'var(--ink-2)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: 'calc(90vh - 140px)', overflowY: 'auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="field">
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
                Candidate <span style={{ color: 'var(--coral)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <select className="glass-ctrl" style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', appearance: 'none', backgroundColor: 'var(--surface-2)' }} required>
                  <option value="" disabled selected>Select an option</option>
                  <option>Alice Brown</option>
                  <option>Marcus Johnson</option>
                  <option>Sophia Chen</option>
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} />
              </div>
            </div>

            <div className="field">
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
                Job Title <span style={{ color: 'var(--coral)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <select className="glass-ctrl" style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', appearance: 'none', backgroundColor: 'var(--surface-2)' }} required>
                  <option value="" disabled selected>Select an option</option>
                  <option>Senior Frontend Developer</option>
                  <option>Backend Engineer</option>
                  <option>UX Designer</option>
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="field">
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
                Basic Salary <span style={{ color: 'var(--coral)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', fontSize: '14px', fontWeight: '700' }}>PKR</span>
                <input 
                  type="number" 
                  className="glass-ctrl"
                  style={{ width: '100%', padding: '12px 16px 12px 54px', fontSize: '14px', borderRadius: '12px' }}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
                Probation <span style={{ color: 'var(--coral)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <select className="glass-ctrl" style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', appearance: 'none', backgroundColor: 'var(--surface-2)' }} required defaultValue="3 Months">
                  <option>1 Month</option>
                  <option>3 Months</option>
                  <option>6 Months</option>
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="field">
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
                Start Date <span style={{ color: 'var(--coral)' }}>*</span>
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
                Offer Expiry Date <span style={{ color: 'var(--coral)' }}>*</span>
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
              Notes
            </label>
            <textarea 
              className="glass-ctrl"
              placeholder="Additional terms or sign-on bonus details..."
              style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', minHeight: '100px', resize: 'vertical' }}
            />
          </div>

        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={onClose} className="btn ghost" style={{ border: '1px solid var(--coral)', color: 'var(--coral)' }}>
            Cancel
          </button>
          <button onClick={onClose} className="btn primary">
            Generate & Send Offer
          </button>
        </div>

      </div>
    </div>
  );
}
