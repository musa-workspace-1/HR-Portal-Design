import React from 'react';
import { X, ChevronDown, Users, DollarSign, Activity } from 'lucide-react';

export default function ProcessPayrollModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="overlay show">
      <div className="modal" style={{ maxWidth: '640px', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ padding: '24px 24px 16px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: 'var(--ink)' }}>Process Monthly Payroll</h3>
          <button onClick={onClose} className="btn ghost" style={{ padding: '4px', border: 'none', color: 'var(--ink-2)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', maxHeight: 'calc(90vh - 140px)', overflowY: 'auto' }}>
          
          {/* Payroll Cycle Details */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--ink)', marginBottom: '16px' }}>Payroll Cycle Details</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="field">
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
                  Select Month <span style={{ color: 'var(--coral)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <select className="glass-ctrl" style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', appearance: 'none', backgroundColor: 'var(--surface-2)' }} required defaultValue="October 2025">
                    <option>September 2025</option>
                    <option>October 2025</option>
                    <option>November 2025</option>
                  </select>
                  <ChevronDown size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} />
                </div>
              </div>

              <div className="field">
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
                  Pay Period <span style={{ color: 'var(--coral)' }}>*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Oct 1 - Oct 31"
                  className="glass-ctrl"
                  style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="field">
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
                  Payment Type <span style={{ color: 'var(--coral)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <select className="glass-ctrl" style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', appearance: 'none', backgroundColor: 'var(--surface-2)' }} required defaultValue="Bank Transfer">
                    <option>Bank Transfer</option>
                    <option>Cheque</option>
                    <option>Cash</option>
                  </select>
                  <ChevronDown size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} />
                </div>
              </div>

              <div className="field">
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
                  Entity <span style={{ color: 'var(--coral)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <select className="glass-ctrl" style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', appearance: 'none', backgroundColor: 'var(--surface-2)' }} required defaultValue="24Loops Pakistan">
                    <option>24Loops Pakistan</option>
                    <option>24Loops Global</option>
                  </select>
                  <ChevronDown size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Summary Preview */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--ink)', marginBottom: '16px' }}>Summary Preview</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '16px', backgroundColor: 'var(--surface-2)', borderRadius: '16px', border: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ padding: '8px', background: 'var(--surface-1)', borderRadius: '8px', color: 'var(--ink-2)' }}>
                    <Users size={16} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--ink-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Employees</span>
                </div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--ink)' }}>156</div>
              </div>

              <div style={{ padding: '16px', backgroundColor: 'var(--surface-2)', borderRadius: '16px', border: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ padding: '8px', background: 'var(--surface-1)', borderRadius: '8px', color: 'var(--sage)' }}>
                    <Activity size={16} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--ink-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gross Amount</span>
                </div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--ink)' }}>PKR 3.8M</div>
              </div>

              <div style={{ padding: '16px', backgroundColor: 'var(--brand)', borderRadius: '16px', color: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '8px', color: 'white' }}>
                    <DollarSign size={16} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(255, 255, 255, 0.8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Net Payable</span>
                </div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: 'white' }}>PKR 3.5M</div>
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
            Run Payroll
          </button>
        </div>

      </div>
    </div>
  );
}
