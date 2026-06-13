import React, { useState } from 'react';
import { 
  Plus, Search, ChevronDown, Video, MapPin, 
  MessageSquare, ExternalLink
} from 'lucide-react';
import ScheduleInterviewModal from '../components/ScheduleInterviewModal';

export default function Interviews() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  
  const [interviewData, setInterviewData] = useState([
    {
      id: 'INT-001',
      candidateName: 'Alice Brown',
      initials: 'AB',
      position: 'Senior Frontend Developer',
      date: '2026-06-07',
      time: '10:00 AM',
      interviewer: 'John Doe',
      medium: 'Video Call',
      status: 'Scheduled',
    },
    {
      id: 'INT-002',
      candidateName: 'Marcus Johnson',
      initials: 'MJ',
      position: 'Backend Engineer',
      date: '2026-06-07',
      time: '01:30 PM',
      interviewer: 'Sarah Smith',
      medium: 'In-Person',
      status: 'Scheduled',
    },
    {
      id: 'INT-003',
      candidateName: 'Sophia Chen',
      initials: 'SC',
      position: 'UX Designer',
      date: '2026-06-06',
      time: '04:00 PM',
      interviewer: 'Emily White',
      medium: 'Video Call',
      status: 'Completed',
    },
    {
      id: 'INT-004',
      candidateName: 'David Lee',
      initials: 'DL',
      position: 'Product Manager',
      date: '2026-06-08',
      time: '11:00 AM',
      interviewer: 'Michael Scott',
      medium: 'Video Call',
      status: 'Cancelled',
    },
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <ScheduleInterviewModal isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} />
      
      {/* 1. Page Title & Action Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn primary" onClick={() => setIsScheduleModalOpen(true)}>
            <Plus size={16} />
            Schedule Interview
          </button>
        </div>
      </div>

      <div className="panel" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* 2. Advanced Search & Query Parameters */}
        <div style={{ padding: '20px', borderBottom: '1px solid var(--line)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', background: 'var(--surface-2)' }}>
          
          <div className="search" style={{ margin: 0, width: '100%', maxWidth: '300px' }}>
            <Search />
            <input 
              type="text" 
              placeholder="Search names, IDs, positions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', width: '100%', maxWidth: 'max-content' }}>
            
            {/* Timeframe Filter */}
            <div style={{ position: 'relative', flex: '1 1 auto', minWidth: '140px', margin: 0 }} className="field">
              <select className="glass-ctrl" style={{ width: '100%', margin: 0 }}>
                <option>All Time</option>
                <option>Today</option>
                <option>This Week</option>
              </select>
            </div>

            {/* Lifecycle Status Filter */}
            <div style={{ position: 'relative', flex: '1 1 auto', minWidth: '140px', margin: 0 }} className="field">
              <select className="glass-ctrl" style={{ width: '100%', margin: 0 }}>
                <option>All Statuses</option>
                <option>Scheduled</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>

          </div>
        </div>

        {/* 3. Interview Record Ledger & Variable Metrics */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th style={{ paddingTop: '24px' }}>ID</th>
                <th style={{ paddingTop: '24px' }}>Candidate</th>
                <th style={{ paddingTop: '24px' }}>Position</th>
                <th style={{ paddingTop: '24px' }}>Timestamp</th>
                <th style={{ paddingTop: '24px' }}>Interviewer</th>
                <th style={{ paddingTop: '24px' }}>Medium</th>
                <th style={{ paddingTop: '24px' }}>Status</th>
                <th style={{ textAlign: 'right', paddingTop: '24px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {interviewData.map((record) => (
                <tr key={record.id}>
                  <td style={{ fontWeight: '700' }}>{record.id}</td>
                  <td>
                    <div className="emp-cell">
                      <div className="av" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>
                        {record.initials}
                      </div>
                      <div>
                        <div className="e-nm">{record.candidateName}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: '600' }}>{record.position}</td>
                  <td>
                    <div style={{ fontWeight: '600' }}>{record.date}</div>
                    <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginTop: '2px' }}>{record.time}</div>
                  </td>
                  <td style={{ color: 'var(--ink-2)' }}>{record.interviewer}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {record.medium === 'Video Call' ? (
                        <Video size={14} style={{ color: 'var(--brand)' }} />
                      ) : (
                        <MapPin size={14} style={{ color: 'var(--gold)' }} />
                      )}
                      <span style={{ fontWeight: '600', color: 'var(--ink-2)' }}>{record.medium}</span>
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={record.status} />
                  </td>
                  <td>
                    {/* 4. Contextual Inline Action Flows */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                      {record.medium === 'Video Call' && (
                        <button className="btn primary" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px' }}>
                          <ExternalLink size={14} /> Join
                        </button>
                      )}
                      <button className="btn primary" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px' }}>
                        <MessageSquare size={14} /> Feedback
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {interviewData.length === 0 && (
            <div className="empty">
              No interview records found.
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let pillClass = 'pill gray';
  
  if (status === 'Scheduled') {
    pillClass = 'pill brand';
  } else if (status === 'Completed') {
    pillClass = 'pill green';
  } else if (status === 'Cancelled') {
    pillClass = 'pill gray';
  }

  return (
    <span className={pillClass}>
      {status}
    </span>
  );
}



