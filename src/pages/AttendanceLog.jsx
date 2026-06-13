import React, { useState } from 'react';
import { 
  Download, Search, Calendar as CalendarIcon, 
  ChevronDown, Edit2, ChevronLeft, ChevronRight, Filter
} from 'lucide-react';
import ExportModal from '../components/ExportModal';
import UpdateAttendanceModal from '../components/UpdateAttendanceModal';

export default function AttendanceLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  
  const attendanceData = [
    {
      id: 1,
      name: 'Sarah Ahmed',
      systemId: '38202-1764241-3',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      date: '2026-05-23',
      markIn: '09:00 AM',
      markOut: '05:30 PM',
      workingHours: '8h 30m',
      status: 'Present',
    },
    {
      id: 2,
      name: 'Syed Muhammad Saad',
      systemId: '42101-9876543-1',
      avatar: 'https://i.pravatar.cc/150?u=syed',
      date: '2026-05-23',
      markIn: '10:15 AM',
      markOut: '06:00 PM',
      workingHours: '7h 45m',
      status: 'Late',
    },
    {
      id: 3,
      name: 'Umair Khan',
      systemId: '61101-1234567-9',
      avatar: 'https://i.pravatar.cc/150?u=umair',
      date: '2026-05-23',
      markIn: '--:--',
      markOut: '--:--',
      workingHours: '-',
      status: 'Absent',
    },
    {
      id: 4,
      name: 'Elena Rodriguez',
      systemId: '35201-8765432-5',
      avatar: 'https://i.pravatar.cc/150?u=elena',
      date: '2026-05-23',
      markIn: '--:--',
      markOut: '--:--',
      workingHours: '-',
      status: 'On Leave',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
      <UpdateAttendanceModal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} />
      
      {/* 1. Page Title & Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn primary" onClick={() => setIsExportModalOpen(true)}>
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* 3. Attendance Ledger Table Container */}
      <div className="panel" style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
        
        {/* 2. Advanced Filtering Control Bar */}
        <div style={{ padding: '16px', borderBottom: '1px solid var(--line)', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Search */}
          <div className="search" style={{ margin: 0 }}>
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search employee or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
            
            {/* Date Picker Tool */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)' }}>
                <CalendarIcon size={16} />
              </div>
              <input 
                type="text" 
                defaultValue="23-May-2026"
                className="glass-ctrl"
                style={{ width: '160px', paddingLeft: '36px', paddingRight: '14px', paddingTop: '10px', paddingBottom: '10px' }}
                readOnly
              />
            </div>

            {/* Department Dropdown */}
            <div style={{ position: 'relative' }}>
              <select className="glass-ctrl" style={{ minWidth: '160px', padding: '10px 32px 10px 14px' }}>
                <option>All Departments</option>
                <option>Information Technology</option>
                <option>Creative & Design</option>
                <option>Management</option>
              </select>
            </div>

            {/* Status Filter Dropdown */}
            <div style={{ position: 'relative' }}>
              <select className="glass-ctrl" style={{ minWidth: '140px', padding: '10px 32px 10px 14px' }}>
                <option>All Status</option>
                <option>Present</option>
                <option>Late</option>
                <option>Absent</option>
                <option>WFH</option>
                <option>Half Day</option>
                <option>On Leave</option>
              </select>
            </div>

          </div>
        </div>

        {/* 3. Ledger Table Content */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Mark In</th>
                <th>Mark Out</th>
                <th>Working Hours</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record) => (
                <tr key={record.id}>
                  <td>
                    <div className="emp-cell">
                      <img src={record.avatar} alt={record.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div className="e-nm">{record.name}</div>
                        <div className="e-rl">{record.systemId}</div>
                      </div>
                    </div>
                  </td>
                  <td>{record.date}</td>
                  <td>
                    <span style={{ color: record.markIn === '--:--' ? 'var(--ink-3)' : 'var(--ink)', fontWeight: record.markIn === '--:--' ? '500' : '700' }}>{record.markIn}</span>
                  </td>
                  <td>
                    <span style={{ color: record.markOut === '--:--' ? 'var(--ink-3)' : 'var(--ink)', fontWeight: record.markOut === '--:--' ? '500' : '700' }}>{record.markOut}</span>
                  </td>
                  <td>
                    <span style={{ color: record.workingHours === '-' ? 'var(--ink-3)' : 'var(--ink)', fontWeight: record.workingHours === '-' ? '500' : '800' }}>{record.workingHours}</span>
                  </td>
                  <td>
                    <StatusBadge status={record.status} />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      className="btn primary" 
                      onClick={() => setIsUpdateModalOpen(true)}
                      style={{ margin: '0 auto', width: '32px', height: '32px', padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Edit2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Table Pagination & Ledger Footer */}
        <div style={{ padding: '16px', borderTop: '1px solid var(--line)', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: 'var(--ink-3)' }}>
          <div>
            Showing <span style={{ fontWeight: 'bold', color: 'var(--ink)' }}>1</span> to <span style={{ fontWeight: 'bold', color: 'var(--ink)' }}>{attendanceData.length}</span> of <span style={{ fontWeight: 'bold', color: 'var(--ink)' }}>{attendanceData.length}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="btn ghost" disabled style={{ padding: '8px 12px', opacity: 0.5 }}>
              <ChevronLeft size={16} />
              Previous
            </button>
            <div className="btn ghost" style={{ padding: '8px 12px', pointerEvents: 'none' }}>
              1 / 1
            </div>
            <button className="btn ghost" disabled style={{ padding: '8px 12px', opacity: 0.5 }}>
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let pillClass = 'pill gray';
  
  if (status === 'Present') {
    pillClass = 'pill green';
  } else if (status === 'Late') {
    pillClass = 'pill gold';
  } else if (status === 'Absent') {
    pillClass = 'pill coral';
  } else if (status === 'On Leave' || status === 'WFH') {
    pillClass = 'pill sky';
  } else if (status === 'Half Day') {
    pillClass = 'pill brand';
  }

  return (
    <span className={pillClass}>
      {status}
    </span>
  );
}



