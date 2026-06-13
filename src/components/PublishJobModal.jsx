import React, { useState } from 'react';
import { 
  X, ChevronDown, 
  Bold, Italic, Underline, List, ListOrdered, Eraser, Plus
} from 'lucide-react';

export default function PublishJobModal({ isOpen, onClose }) {
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  return (
    <div className="overlay show">
      <div className="modal" style={{ maxWidth: '640px', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ padding: '24px 24px 16px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: 'var(--ink)' }}>Publish job opening</h3>
          <button onClick={onClose} className="btn ghost" style={{ padding: '4px', border: 'none', color: 'var(--ink-2)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: 'calc(90vh - 140px)', overflowY: 'auto' }}>
          
          <div className="field">
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Job Title <span style={{ color: 'var(--coral)' }}>*</span>
            </label>
            <input 
              type="text" 
              className="glass-ctrl"
              style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
              required
            />
          </div>

          <div className="field">
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Department <span style={{ color: 'var(--coral)' }}>*</span>
            </label>
            <input 
              type="text" 
              className="glass-ctrl"
              style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="field">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Employment Type
              </label>
              <div style={{ position: 'relative' }}>
                <select className="glass-ctrl" style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', appearance: 'none', backgroundColor: 'var(--surface-2)' }}>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} />
              </div>
            </div>

            <div className="field">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Experience Level
              </label>
              <div style={{ position: 'relative' }}>
                <select className="glass-ctrl" style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', appearance: 'none', backgroundColor: 'var(--surface-2)' }}>
                  <option>Mid-level</option>
                  <option>Junior</option>
                  <option>Senior</option>
                  <option>Lead</option>
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} />
              </div>
            </div>
          </div>

          <div className="field">
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Location <span style={{ color: 'var(--coral)' }}>*</span>
            </label>
            <input 
              type="text" 
              className="glass-ctrl"
              style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div className="field">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                No. of Vacancies
              </label>
              <input 
                type="number" 
                defaultValue="1"
                className="glass-ctrl"
                style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
              />
            </div>

            <div className="field">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Salary Min (Optional)
              </label>
              <input 
                type="number" 
                className="glass-ctrl"
                style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
              />
            </div>

            <div className="field">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Salary Max (Optional)
              </label>
              <input 
                type="number" 
                className="glass-ctrl"
                style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
              />
            </div>
          </div>

          <div className="field" style={{ position: 'relative', marginTop: '4px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: 'var(--ink)', marginBottom: '12px' }}>
              Description
            </label>
            
            <div className="glass-ctrl" style={{ borderRadius: '12px', overflow: 'hidden', padding: 0 }}>
              {/* Toolbar */}
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)', display: 'flex', gap: '8px' }}>
                <button className="glass-ctrl" style={{ padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-2)', border: 'none' }}><Bold size={16} /></button>
                <button className="glass-ctrl" style={{ padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-2)', border: 'none' }}><Italic size={16} /></button>
                <button className="glass-ctrl" style={{ padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-2)', border: 'none' }}><Underline size={16} /></button>
                <button className="glass-ctrl" style={{ padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-2)', border: 'none', marginLeft: '4px' }}><List size={16} /></button>
                <button className="glass-ctrl" style={{ padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-2)', border: 'none' }}><ListOrdered size={16} /></button>
                <button className="glass-ctrl" style={{ padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-2)', border: 'none', marginLeft: '4px' }}><Eraser size={16} /></button>
              </div>
              
              {/* Editor */}
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the role, team, and what success looks like..."
                style={{ width: '100%', padding: '16px', fontSize: '14px', minHeight: '140px', border: 'none', background: 'transparent', resize: 'vertical', color: 'var(--ink)', outline: 'none' }}
              />
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '8px' }}>
              {description.length} characters (plain text)
            </div>
          </div>

          <div className="field" style={{ marginTop: '8px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: 'var(--ink)', marginBottom: '12px' }}>
              Qualifications
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input 
                type="text" 
                placeholder="Enter a bullet point..."
                className="glass-ctrl"
                style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
              />
              <button className="glass-ctrl" style={{ width: 'fit-content', padding: '8px 16px', fontSize: '13px', fontWeight: '700', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--surface-2)', border: '1px solid var(--line)', color: 'var(--ink)' }}>
                <Plus size={14} /> Add bullet
              </button>
            </div>
          </div>

          <div className="field" style={{ marginTop: '8px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: 'var(--ink)', marginBottom: '12px' }}>
              Responsibilities
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input 
                type="text" 
                placeholder="Enter a bullet point..."
                className="glass-ctrl"
                style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
              />
              <button className="glass-ctrl" style={{ width: 'fit-content', padding: '8px 16px', fontSize: '13px', fontWeight: '700', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--surface-2)', border: '1px solid var(--line)', color: 'var(--ink)' }}>
                <Plus size={14} /> Add bullet
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={onClose} className="glass-ctrl" style={{ padding: '10px 20px', borderRadius: '12px', fontWeight: '700', color: 'var(--ink)', border: '1px solid var(--line)', background: 'var(--surface-2)' }}>
            Cancel
          </button>
          <button onClick={onClose} className="btn primary" style={{ padding: '10px 20px', borderRadius: '12px' }}>
            Publish
          </button>
        </div>

      </div>
    </div>
  );
}
