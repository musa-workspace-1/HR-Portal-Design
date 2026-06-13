import React, { useState } from 'react';
import { 
  Search, ChevronDown, Check, X, Eye
} from 'lucide-react';

export default function Overtime() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [overtimeRequests, setOvertimeRequests] = useState([
    {
      id: 'OT-001',
      employeeName: 'Tariq Ali',
      initials: 'TA',
      date: '2026-05-20',
      hours: '2.5 Hours',
      reason: 'Critical production deploy',
      status: 'Pending',
    },
    {
      id: 'OT-002',
      employeeName: 'Sarah Khan',
      initials: 'SK',
      date: '2026-05-21',
      hours: '4 Hours',
      reason: 'Weekend support coverage',
      status: 'Approved',
    },
    {
      id: 'OT-003',
      employeeName: 'Ahmad Raza',
      initials: 'AR',
      date: '2026-05-22',
      hours: '1 Hours',
      reason: 'Late client meeting',
      status: 'Rejected',
    },
    {
      id: 'OT-004',
      employeeName: 'Elena Rodriguez',
      initials: 'ER',
      date: '2026-05-23',
      hours: '3 Hours',
      reason: 'Emergency server patching',
      status: 'Pending',
    },
  ]);

  const handleApprove = (id) => {
    setOvertimeRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'Approved' } : req
    ));
  };

  const handleReject = (id) => {
    setOvertimeRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'Rejected' } : req
    ));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      


      <div className="panel" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* 2. Data Query & Status Filter Bar */}
        <div style={{ padding: '20px', borderBottom: '1px solid var(--line)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', background: 'var(--surface-2)' }}>
          
          <div className="search" style={{ margin: 0, width: '100%', maxWidth: '300px' }}>
            <Search />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: 'max-content', minWidth: '140px', margin: 0 }} className="field">
            <select className="glass-ctrl" style={{ width: '100%', margin: 0 }}>
              <option>Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>

        </div>

        {/* 3. Overtime Requests Data Table */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th style={{ paddingTop: '24px' }}>ID</th>
                <th style={{ paddingTop: '24px' }}>Employee</th>
                <th style={{ paddingTop: '24px' }}>Overtime Date</th>
                <th style={{ paddingTop: '24px' }}>Hours</th>
                <th style={{ paddingTop: '24px' }}>Reason</th>
                <th style={{ paddingTop: '24px' }}>Status</th>
                <th style={{ textAlign: 'right', paddingTop: '24px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {overtimeRequests.map((record) => (
                <tr key={record.id}>
                  <td style={{ fontWeight: '600' }}>{record.id}</td>
                  <td>
                    <div className="emp-cell">
                      <div className="av" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>
                        {record.initials}
                      </div>
                      <div>
                        <div className="e-nm">{record.employeeName}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--ink-2)' }}>{record.date}</td>
                  <td style={{ fontWeight: '700' }}>{record.hours}</td>
                  <td style={{ color: 'var(--ink-2)', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={record.reason}>
                    {record.reason}
                  </td>
                  <td>
                    <StatusBadge status={record.status} />
                  </td>
                  <td>
                    {record.status === 'Pending' ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        <button 
                          onClick={() => handleApprove(record.id)}
                          className="btn"
                          style={{ padding: '6px 12px', background: 'var(--sage-soft)', color: 'var(--sage)', borderRadius: '8px', fontSize: '11px' }}
                        >
                          <Check size={14} /> Approve
                        </button>
                        <button 
                          onClick={() => handleReject(record.id)}
                          className="btn ghost"
                          style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px', color: 'var(--coral)' }}
                        >
                          <X size={14} /> Reject
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        <button className="btn ghost" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px' }}>
                          <Eye size={14} /> View
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {overtimeRequests.length === 0 && (
            <div className="empty">
              No overtime requests found.
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let pillClass = 'pill gray';
  
  if (status === 'Pending') {
    pillClass = 'pill brand';
  } else if (status === 'Approved') {
    pillClass = 'pill green';
  } else if (status === 'Rejected') {
    pillClass = 'pill coral';
  }

  return (
    <span className={pillClass}>
      {status}
    </span>
  );
}



