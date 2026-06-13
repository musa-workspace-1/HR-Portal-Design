import React, { useState } from 'react';
import { 
  Plus, Search, ChevronDown, Check, X, Eye,
  Calendar, CheckCircle2, FileText, XCircle
} from 'lucide-react';
import ApplyLeaveModal from '../components/ApplyLeaveModal';

export default function Leave() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isApplyLeaveModalOpen, setIsApplyLeaveModalOpen] = useState(false);
  
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 'LR-001',
      employeeName: 'Ahmad Raza',
      initials: 'AR',
      type: 'Annual Leave',
      fromDate: '2026-06-10',
      toDate: '2026-06-14',
      days: '5',
      status: 'Pending',
    },
    {
      id: 'LR-002',
      employeeName: 'Sarah Ali',
      initials: 'SA',
      type: 'Sick Leave',
      fromDate: '2026-05-25',
      toDate: '2026-05-26',
      days: '2',
      status: 'Approved',
    },
    {
      id: 'LR-003',
      employeeName: 'Tariq Khan',
      initials: 'TK',
      type: 'Casual Leave',
      fromDate: '2026-05-28',
      toDate: '2026-05-28',
      days: '1',
      status: 'Rejected',
    },
    {
      id: 'LR-004',
      employeeName: 'Elena Rodriguez',
      initials: 'ER',
      type: 'Annual Leave',
      fromDate: '2026-07-01',
      toDate: '2026-07-10',
      days: '10',
      status: 'Pending',
    },
  ]);

  const handleApprove = (id) => {
    setLeaveRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'Approved' } : req
    ));
  };

  const handleReject = (id) => {
    setLeaveRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'Rejected' } : req
    ));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <ApplyLeaveModal isOpen={isApplyLeaveModalOpen} onClose={() => setIsApplyLeaveModalOpen(false)} />
      
      {/* 1. Page Title & Action Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn primary" onClick={() => setIsApplyLeaveModalOpen(true)}>
            <Plus size={16} />
            Apply for Leave
          </button>
        </div>
      </div>

      {/* 2. High-Level Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <MetricCard 
          title="PENDING APPROVALS" 
          value="1" 
          icon={<Calendar size={24} style={{ color: 'var(--brand)' }} />} 
        />
        <MetricCard 
          title="APPROVED THIS MONTH" 
          value="1" 
          icon={<CheckCircle2 size={24} style={{ color: 'var(--sage)' }} />} 
        />
        <MetricCard 
          title="ON LEAVE TODAY" 
          value="8" 
          icon={<FileText size={24} style={{ color: 'var(--sky)' }} />} 
        />
        <MetricCard 
          title="REJECTED" 
          value="1" 
          icon={<XCircle size={24} style={{ color: 'var(--coral)' }} />} 
        />
      </div>

      <div className="panel" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* 3. Advanced Filter Deck */}
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

        {/* 4. Leave Applications Ledger Table */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th style={{ paddingTop: '24px' }}>Employee</th>
                <th style={{ paddingTop: '24px' }}>Type</th>
                <th style={{ paddingTop: '24px' }}>From</th>
                <th style={{ paddingTop: '24px' }}>To</th>
                <th style={{ paddingTop: '24px' }}>Days</th>
                <th style={{ paddingTop: '24px' }}>Status</th>
                <th style={{ textAlign: 'right', paddingTop: '24px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((record) => (
                <tr key={record.id}>
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
                  <td style={{ fontWeight: '600' }}>{record.type}</td>
                  <td style={{ color: 'var(--ink-2)' }}>{record.fromDate}</td>
                  <td style={{ color: 'var(--ink-2)' }}>{record.toDate}</td>
                  <td style={{ fontWeight: '700' }}>{record.days}</td>
                  <td>
                    <StatusBadge status={record.status} />
                  </td>
                  <td>
                    {record.status === 'Pending' ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        <button 
                          onClick={() => handleApprove(record.id)}
                          className="btn primary"
                          style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px' }}
                        >
                          <Check size={14} /> Approve
                        </button>
                        <button 
                          onClick={() => handleReject(record.id)}
                          className="btn primary"
                          style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px' }}
                        >
                          <X size={14} /> Reject
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        <button className="btn primary" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px' }}>
                          <Eye size={14} /> View
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {leaveRequests.length === 0 && (
            <div className="empty">
              No leave requests found.
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon }) {
  return (
    <div className="lb-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
      <div>
        <div className="lt">{title}</div>
        <div className="lv">{value}</div>
      </div>
      <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'var(--surface-2)', display: 'grid', placeItems: 'center', flexShrink: 0, border: '1px solid var(--line)' }}>
        {icon}
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



