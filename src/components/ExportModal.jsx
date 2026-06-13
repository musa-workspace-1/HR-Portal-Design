import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function ExportModal({ isOpen, onClose }) {
  const [format, setFormat] = useState('csv');

  if (!isOpen) return null;

  return (
    <div className="overlay show">
      <div className="modal" style={{ maxWidth: '550px' }}>
        <div className="modal-head">
          <h3>Export employee data</h3>
          <button onClick={onClose} className="btn ghost" style={{ padding: '4px', border: 'none' }}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '16px' }}>
          
          <div style={{ color: 'var(--ink-3)', fontSize: '14.5px', lineHeight: '1.5' }}>
            Download a copy of all employees in your directory. Choose a format, then confirm to save the file.
          </div>

          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--ink-3)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>FILE FORMAT</div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ 
                display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer',
                padding: '16px', borderRadius: '12px',
                border: format === 'csv' ? '1px solid var(--brand)' : '1px solid var(--line)',
                background: 'var(--surface-2)',
                transition: 'all 0.2s'
              }}>
                <input 
                  type="radio" 
                  name="exportFormat" 
                  value="csv" 
                  checked={format === 'csv'} 
                  onChange={() => setFormat('csv')}
                  style={{ accentColor: 'var(--brand)', transform: 'scale(1.2)' }}
                />
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--ink)', fontSize: '15px', marginBottom: '4px' }}>Excel (.csv)</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Opens in Microsoft Excel, Google Sheets, and similar apps.</div>
                </div>
              </label>

              <label style={{ 
                display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer',
                padding: '16px', borderRadius: '12px',
                border: format === 'json' ? '1px solid var(--brand)' : '1px solid var(--line)',
                background: 'var(--surface-2)',
                transition: 'all 0.2s'
              }}>
                <input 
                  type="radio" 
                  name="exportFormat" 
                  value="json" 
                  checked={format === 'json'} 
                  onChange={() => setFormat('json')}
                  style={{ accentColor: 'var(--brand)', transform: 'scale(1.2)' }}
                />
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--ink)', fontSize: '15px', marginBottom: '4px' }}>JSON (.json)</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Structured data for scripts, backups, or integrations.</div>
                </div>
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px', paddingTop: '20px', borderTop: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={onClose} className="btn" style={{ border: '1px solid var(--brand)', color: 'var(--brand)', background: 'transparent' }}>Cancel</button>
              <button onClick={onClose} className="btn primary">Download export</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
