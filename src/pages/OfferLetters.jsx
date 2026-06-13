import React, { useState } from 'react';
import { 
  Plus, Search, ChevronDown, Eye, Mail
} from 'lucide-react';
import CreateOfferModal from '../components/CreateOfferModal';

export default function OfferLetters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOfferModalOpen, setIsCreateOfferModalOpen] = useState(false);
  
  const [offerData, setOfferData] = useState([
    {
      id: 'OFF-001',
      candidateName: 'Alice Brown',
      initials: 'AB',
      jobTitle: 'Senior Frontend Developer',
      salary: 'PKR 250,000',
      deadline: '2026-06-15',
      status: 'Pending',
    },
    {
      id: 'OFF-002',
      candidateName: 'Marcus Johnson',
      initials: 'MJ',
      jobTitle: 'Backend Engineer',
      salary: 'PKR 220,000',
      deadline: '2026-06-10',
      status: 'Accepted',
    },
    {
      id: 'OFF-003',
      candidateName: 'Sophia Chen',
      initials: 'SC',
      jobTitle: 'UX Designer',
      salary: 'PKR 180,000',
      deadline: '2026-06-05',
      status: 'Rejected',
    },
    {
      id: 'OFF-004',
      candidateName: 'James Wilson',
      initials: 'JW',
      jobTitle: 'DevOps Engineer',
      salary: 'PKR 300,000',
      deadline: '2026-06-20',
      status: 'Pending',
    },
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <CreateOfferModal isOpen={isCreateOfferModalOpen} onClose={() => setIsCreateOfferModalOpen(false)} />
      
      {/* 1. Page Title & Action Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn primary" onClick={() => setIsCreateOfferModalOpen(true)}>
            <Plus size={16} />
            Create Offer
          </button>
        </div>
      </div>

      <div className="panel" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* 2. Global Query & Parameter Filtering */}
        <div style={{ padding: '20px', borderBottom: '1px solid var(--line)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', background: 'var(--surface-2)' }}>
          
          <div className="search" style={{ margin: 0, width: '100%', maxWidth: '300px' }}>
            <Search />
            <input 
              type="text" 
              placeholder="Search names or IDs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: 'max-content', minWidth: '160px', margin: 0 }} className="field">
            <select className="glass-ctrl" style={{ width: '100%', margin: 0 }}>
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Accepted</option>
              <option>Rejected</option>
            </select>
          </div>

        </div>

        {/* 3. Offer Records Data Grid & Log Tracking */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th style={{ paddingTop: '24px' }}>ID</th>
                <th style={{ paddingTop: '24px' }}>Candidate</th>
                <th style={{ paddingTop: '24px' }}>Job Title</th>
                <th style={{ paddingTop: '24px' }}>Salary</th>
                <th style={{ paddingTop: '24px' }}>Deadline</th>
                <th style={{ paddingTop: '24px' }}>Status</th>
                <th style={{ textAlign: 'right', paddingTop: '24px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offerData.map((record) => (
                <tr key={record.id}>
                  <td style={{ fontWeight: '700', color: 'var(--ink)' }}>{record.id}</td>
                  <td>
                    <div className="emp-cell">
                      <div className="av" style={{ background: 'var(--surface-2)', color: 'var(--ink)' }}>
                        {record.initials}
                      </div>
                      <div>
                        <div className="e-nm">{record.candidateName}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: '600' }}>{record.jobTitle}</td>
                  <td style={{ fontWeight: '700' }}>{record.salary}</td>
                  <td style={{ color: 'var(--ink-2)' }}>{record.deadline}</td>
                  <td>
                    <StatusBadge status={record.status} />
                  </td>
                  <td>
                    {/* 4. Contextual Inline Action Flows */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                      {record.status === 'Pending' && (
                        <button className="btn" style={{ padding: '6px 12px', background: 'var(--amber-soft)', color: 'var(--amber)', borderRadius: '8px', fontSize: '11px' }}>
                          <Mail size={14} /> Remind
                        </button>
                      )}
                      <button className="btn primary" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px' }}>
                        <Eye size={14} /> View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {offerData.length === 0 && (
            <div className="empty">
              No offer letter records found.
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
  } else if (status === 'Accepted') {
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



