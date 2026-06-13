import React from 'react';
import { X, ChevronDown, Video } from 'lucide-react';

export default function ScheduleInterviewModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="overlay show">
      <div className="modal" style={{ maxWidth: '540px', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ padding: '24px 24px 16px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: 'var(--ink)' }}>Schedule Interview</h3>
          <button onClick={onClose} className="btn ghost" style={{ padding: '4px', border: 'none', color: 'var(--ink-2)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: 'calc(90vh - 140px)', overflowY: 'auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="field">
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
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
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
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
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
                Interview date <span style={{ color: 'var(--coral)' }}>*</span>
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
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
                Interview time <span style={{ color: 'var(--coral)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="time" 
                  className="glass-ctrl"
                  style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px' }}
                  required
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="field">
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
                Interviewer(s) <span style={{ color: 'var(--coral)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <select multiple className="glass-ctrl" style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', minHeight: '44px', maxHeight: '44px', overflow: 'hidden', appearance: 'none', backgroundColor: 'var(--surface-2)', backgroundImage: 'none' }} required>
                  <option value="" disabled selected style={{ color: 'var(--ink-3)' }}>Select an option</option>
                  <option value="john">John Doe</option>
                  <option value="sarah">Sarah Smith</option>
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: '16px', top: '14px', color: 'var(--ink-3)', pointerEvents: 'none' }} />
              </div>
            </div>

            <div className="field">
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
                Interview Type <span style={{ color: 'var(--coral)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <select className="glass-ctrl" style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', appearance: 'none', backgroundColor: 'var(--surface-2)' }} required>
                  <option>Video Call</option>
                  <option>In-Person</option>
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} />
              </div>
            </div>
          </div>

          <div className="field">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
              Meeting link
            </label>
            <div style={{ position: 'relative' }}>
              <Video size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)' }} />
              <input 
                type="text" 
                placeholder="https://zoom.us/j/..."
                className="glass-ctrl"
                style={{ width: '100%', padding: '12px 16px 12px 44px', fontSize: '14px', borderRadius: '12px' }}
              />
            </div>
          </div>

          <div className="field">
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--ink-3)', marginBottom: '8px' }}>
              Notes
            </label>
            <textarea 
              className="glass-ctrl"
              placeholder="Instructions for the interviewer..."
              style={{ width: '100%', padding: '12px 16px', fontSize: '14px', borderRadius: '12px', minHeight: '100px', resize: 'vertical' }}
            />
          </div>

        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={onClose} className="glass-ctrl" style={{ padding: '10px 20px', borderRadius: '12px', fontWeight: '700', color: 'var(--coral)', border: '1px solid var(--coral)', background: 'transparent' }}>
            Cancel
          </button>
          <button onClick={onClose} className="btn primary" style={{ padding: '10px 20px', borderRadius: '12px' }}>
            Schedule Interview
          </button>
        </div>

      </div>
    </div>
  );
}
