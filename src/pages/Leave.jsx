import React, { useState } from 'react';
import Icon from '../components/Icon';

export default function Leave() {
  const [filter, setFilter] = useState('all');

  const balances = [
    { label: 'Annual Leave', used: 14, total: 20, color: 'brand' },
    { label: 'Sick Leave', used: 8, total: 10, color: 'coral' },
    { label: 'Personal', used: 3, total: 5, color: 'sky' },
    { label: 'Remote Days', used: 22, total: '∞', color: 'sage' }
  ];

  const requests = [
    { n: 'Carla Sanford', type: 'Annual Leave', from: 'Jun 18', to: 'Jun 20', days: 2, st: 'approved' },
    { n: 'Judy Abbott', type: 'Sick Leave', from: 'Jun 10', to: 'Jun 11', days: 1, st: 'pending' },
    { n: 'Martin Feeney', type: 'Remote Day', from: 'Jun 12', to: 'Jun 12', days: 1, st: 'approved' }
  ];

  const filteredRequests = requests.filter(r => filter === 'all' || r.st === filter);

  return (
    <div className="stagger">
      <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '18px' }}>
        {balances.map((b, i) => (
          <div key={i} className="lb-card">
            <div className="lt">{b.label}</div>
            <div className="lv" style={{ color: `var(--${b.color})` }}>
              {b.used}<small> / {b.total} days</small>
            </div>
            <div className="bar-track" style={{ marginTop: '12px' }}>
              <div 
                className="bar-fill" 
                style={{ 
                  width: `${typeof b.total === 'number' ? (b.used / b.total) * 100 : 60}%`, 
                  background: `var(--${b.color})` 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="seg">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>Pending</button>
          <button className={filter === 'approved' ? 'active' : ''} onClick={() => setFilter('approved')}>Approved</button>
        </div>
        <button className="btn primary"><Icon name="plus" /> Request Leave</button>
      </div>

      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Days</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((l, i) => (
              <tr key={i}>
                <td>
                  <div className="emp-cell">
                    <div className="av" style={{ background: 'var(--surface-3)', color: 'var(--ink-2)' }}>{l.n.substring(0, 2)}</div>
                    <div className="e-nm">{l.n}</div>
                  </div>
                </td>
                <td>{l.type}</td>
                <td style={{ color: 'var(--ink-3)' }}>{l.from} – {l.to}</td>
                <td><b>{l.days}</b></td>
                <td>
                  <span className={`pill ${l.st === 'approved' ? 'green' : 'gold'}`}>
                    <span className="dotc"></span>{l.st.charAt(0).toUpperCase() + l.st.slice(1)}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  {l.st === 'pending' && (
                    <button className="btn primary" style={{ padding: '6px 12px', fontSize: '11px' }}>Approve</button>
                  )}
                </td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--ink-3)' }}>No leave requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
