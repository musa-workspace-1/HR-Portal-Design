import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

const ToggleSwitch = ({ checked, onChange }) => (
  <div 
    onClick={() => onChange(!checked)}
    style={{
      width: '40px', height: '24px', borderRadius: '12px', 
      background: checked ? 'var(--coral)' : 'var(--line)',
      position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
    }}>
    <div style={{
      width: '18px', height: '18px', borderRadius: '50%', background: 'white',
      position: 'absolute', top: '3px', left: checked ? '19px' : '3px', transition: 'left 0.2s',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
    }} />
  </div>
);

export default function CreateSalaryStructureModal({ isOpen, onClose }) {
  const [isTaxable, setIsTaxable] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [partOfCtc, setPartOfCtc] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="overlay show">
      <div className="modal" style={{ maxWidth: '540px', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ padding: '24px 24px 16px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: 'var(--ink)' }}>Create Salary Structure</h3>
          <button onClick={onClose} className="btn ghost" style={{ padding: '4px', border: 'none', color: 'var(--ink-2)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: 'calc(90vh - 140px)', overflowY: 'auto' }}>
          
          <div className="field">
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
              Component Name <span style={{ color: 'var(--coral)' }}>*</span>
            </label>
            <input 
              type="text" 
              placeholder="e.g. Remote Work Allowance"
              className="glass-ctrl"
              style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="field">
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
                Type <span style={{ color: 'var(--coral)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <select className="glass-ctrl" style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', appearance: 'none', backgroundColor: 'var(--surface-2)' }} required defaultValue="Allowance">
                  <option>Allowance</option>
                  <option>Deduction</option>
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} />
              </div>
            </div>

            <div className="field">
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
                Calculation Type <span style={{ color: 'var(--coral)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <select className="glass-ctrl" style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', appearance: 'none', backgroundColor: 'var(--surface-2)' }} required defaultValue="Fixed amount">
                  <option>Fixed amount</option>
                  <option>Percentage of basic</option>
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} />
              </div>
            </div>
          </div>

          <div className="field">
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
              Default Value
            </label>
            <input 
              type="text" 
              className="glass-ctrl"
              style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', backgroundColor: 'var(--surface-2)', borderRadius: '12px', border: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--ink)' }}>Is taxable?</span>
              </div>
              <ToggleSwitch checked={isTaxable} onChange={setIsTaxable} />
            </div>

            <div style={{ width: '100%', height: '1px', background: 'var(--line)' }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--ink)' }}>Is active?</span>
              </div>
              <ToggleSwitch checked={isActive} onChange={setIsActive} />
            </div>

            <div style={{ width: '100%', height: '1px', background: 'var(--line)' }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--ink)' }}>Part of CTC?</span>
                <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>Included in cost-to-company calculation</span>
              </div>
              <ToggleSwitch checked={partOfCtc} onChange={setPartOfCtc} />
            </div>
          </div>

          <div className="field">
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
              Notes
            </label>
            <textarea 
              className="glass-ctrl"
              placeholder="Internal guidelines, compliance rules, or descriptions..."
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
