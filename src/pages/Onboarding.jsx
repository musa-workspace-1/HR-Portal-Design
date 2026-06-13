import React, { useState } from 'react';
import { 
  Users, CheckCircle2, Clock, AlertCircle, 
  Calendar as CalendarIcon, ArrowRight
} from 'lucide-react';

export default function Onboarding({ setCurrentPage, onSelectEmployee }) {
  const [activeTab, setActiveTab] = useState('All');

  const onboardingData = [
    {
      id: 1,
      name: 'Sarah Ahmed',
      systemId: '38202-1764241-3',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      role: 'Creative Director',
      department: 'Creative & Design',
      startDate: '2026-06-15',
      status: 'Completed',
      progress: 100,
      stepsCompleted: 4,
      stepsTotal: 4
    },
    {
      id: 2,
      name: 'Syed Muhammad Saad',
      systemId: '42101-9876543-1',
      avatar: 'https://i.pravatar.cc/150?u=syed',
      role: 'Product Design Manager',
      department: 'Product',
      startDate: '2026-06-20',
      status: 'In Progress',
      progress: 75,
      stepsCompleted: 3,
      stepsTotal: 4
    },
    {
      id: 3,
      name: 'Umair Khan',
      systemId: '61101-1234567-9',
      avatar: 'https://i.pravatar.cc/150?u=umair',
      role: 'Frontend Developer',
      department: 'Engineering',
      startDate: '2026-07-01',
      status: 'Not Started',
      progress: 0,
      stepsCompleted: 0,
      stepsTotal: 6
    },
    {
      id: 4,
      name: 'Elena Rodriguez',
      systemId: '35201-8765432-5',
      avatar: 'https://i.pravatar.cc/150?u=elena',
      role: 'Product Manager',
      department: 'Management',
      startDate: '2026-06-10',
      status: 'In Progress',
      progress: 40,
      stepsCompleted: 2,
      stepsTotal: 5
    },
  ];

  const filteredData = activeTab === 'All' 
    ? onboardingData 
    : onboardingData.filter(item => item.status === activeTab);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      


      {/* 1. High-Level Onboarding Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <MetricCard title="ACTIVE WORKFLOWS" value="12" icon={<Users size={24} style={{ color: 'var(--brand)' }} />} />
        <MetricCard title="COMPLETED (MONTH)" value="8" icon={<CheckCircle2 size={24} style={{ color: 'var(--sage)' }} />} />
        <MetricCard title="PENDING STEPS" value="34" icon={<Clock size={24} style={{ color: 'var(--amber)' }} />} />
        <MetricCard title="OVERDUE STEPS" value="3" icon={<AlertCircle size={24} style={{ color: 'var(--coral)' }} />} />
      </div>

      <div className="panel" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* 2. Active Workflows Filter Bar */}
        <div style={{ padding: '20px', borderBottom: '1px solid var(--line)', background: 'var(--surface-2)' }}>
          <div className="seg">
            <button className={activeTab === 'All' ? 'active' : ''} onClick={() => setActiveTab('All')}>All</button>
            <button className={activeTab === 'Not Started' ? 'active' : ''} onClick={() => setActiveTab('Not Started')}>Not Started</button>
            <button className={activeTab === 'In Progress' ? 'active' : ''} onClick={() => setActiveTab('In Progress')}>In Progress</button>
            <button className={activeTab === 'Completed' ? 'active' : ''} onClick={() => setActiveTab('Completed')}>Completed</button>
          </div>
        </div>

        {/* 3. Onboarding Workflow Data Table */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th style={{ paddingTop: '24px' }}>Employee</th>
                <th style={{ paddingTop: '24px' }}>Role & Department</th>
                <th style={{ paddingTop: '24px' }}>Start Date</th>
                <th style={{ paddingTop: '24px' }}>Status</th>
                <th style={{ paddingTop: '24px' }}>Progress</th>
                <th style={{ textAlign: 'center', paddingTop: '24px' }}>Steps</th>
                <th style={{ textAlign: 'right', paddingTop: '24px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((employee) => (
                <tr key={employee.id}>
                  
                  {/* Employee */}
                  <td>
                    <div className="emp-cell">
                      <img src={employee.avatar} alt={employee.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div className="e-nm">{employee.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginTop: '2px' }}>{employee.systemId}</div>
                      </div>
                    </div>
                  </td>

                  {/* Role & Department */}
                  <td>
                    <div style={{ fontWeight: '600' }}>{employee.role}</div>
                    <div style={{ fontSize: '12px', color: 'var(--ink-2)', marginTop: '2px' }}>{employee.department}</div>
                  </td>

                  {/* Start Date */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ink-2)' }}>
                      <CalendarIcon size={14} />
                      <span>{employee.startDate}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td>
                    <StatusBadge status={employee.status} />
                  </td>

                  {/* Progress */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '120px' }}>
                      <div style={{ flex: 1, height: '6px', background: 'var(--surface-2)', borderRadius: '10px', overflow: 'hidden' }}>
                        <div 
                          style={{ 
                            height: '100%', 
                            borderRadius: '10px', 
                            background: employee.progress === 100 ? 'var(--sage)' : 'var(--brand)',
                            width: `${employee.progress}%`,
                            transition: 'width 0.5s'
                          }}
                        ></div>
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--ink)', width: '32px' }}>{employee.progress}%</span>
                    </div>
                  </td>

                  {/* Steps */}
                  <td style={{ textAlign: 'center', fontWeight: '600', color: 'var(--ink-2)' }}>
                    <span style={{ color: employee.stepsCompleted === employee.stepsTotal ? 'var(--sage)' : 'inherit' }}>
                      {employee.stepsCompleted}
                    </span>
                    <span style={{ margin: '0 4px', color: 'var(--ink-3)', fontWeight: '400' }}>/</span>
                    <span style={{ color: 'var(--ink-3)' }}>{employee.stepsTotal}</span>
                  </td>

                  {/* Action */}
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      className="btn primary" 
                      onClick={() => {
                        if (onSelectEmployee) onSelectEmployee(employee);
                        if (setCurrentPage) setCurrentPage('onboarding-detail');
                      }} 
                      style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      Open
                      <ArrowRight size={14} style={{ color: 'var(--ink-3)' }} />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredData.length === 0 && (
            <div className="empty">
              No workflows found for this status.
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
  
  if (status === 'Completed') {
    pillClass = 'pill green';
  } else if (status === 'In Progress') {
    pillClass = 'pill brand';
  } else if (status === 'Not Started') {
    pillClass = 'pill gray';
  }

  return (
    <span className={pillClass}>
      {status}
    </span>
  );
}
