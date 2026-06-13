import React, { useState } from 'react';
import { 
  Users, CheckCircle2, Clock, AlertCircle, 
  Calendar as CalendarIcon, ArrowRight, Activity, AlertTriangle
} from 'lucide-react';

export default function Offboarding({ setCurrentPage, onSelectEmployee }) {
  const [activeTab, setActiveTab] = useState('All');

  const offboardingData = [
    {
      id: 1,
      name: 'Alice Johnson',
      systemId: '21101-9876543-2',
      avatar: 'https://i.pravatar.cc/150?u=alice',
      role: 'Software Engineer',
      department: 'Engineering',
      lastDay: '2026-06-09',
      reason: 'Resignation',
      status: 'In Progress',
      progress: 0,
      stepsCompleted: 0,
      stepsTotal: 35
    },
    {
      id: 2,
      name: 'Bob Smith',
      systemId: '32101-1234567-8',
      avatar: 'https://i.pravatar.cc/150?u=bob',
      role: 'Marketing Manager',
      department: 'Marketing',
      lastDay: '2026-06-12',
      reason: 'Resignation',
      status: 'Not Started',
      progress: 0,
      stepsCompleted: 0,
      stepsTotal: 35
    }
  ];

  const StatusBadge = ({ status }) => {
    switch(status) {
      case 'Completed': return <span style={{ padding: '4px 10px', background: 'var(--sage-soft)', color: 'var(--sage)', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>Completed</span>;
      case 'In Progress': return <span style={{ padding: '4px 10px', background: 'var(--brand-soft)', color: 'var(--brand)', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>In Progress</span>;
      case 'Not Started': return <span style={{ padding: '4px 10px', background: 'var(--surface-2)', color: 'var(--ink-2)', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>Not Started</span>;
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. Dynamic Metric Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <MetricCard 
          title="ACTIVE WORKFLOWS" 
          value="2" 
          icon={<Activity size={24} style={{ color: 'var(--brand)' }} />} 
        />
        <MetricCard 
          title="COMPLETED (MONTH)" 
          value="0" 
          icon={<CheckCircle2 size={24} style={{ color: 'var(--sage)' }} />} 
        />
        <MetricCard 
          title="PENDING STEPS" 
          value="70" 
          icon={<Clock size={24} style={{ color: 'var(--amber)' }} />} 
        />
        <MetricCard 
          title="OVERDUE STEPS" 
          value="0" 
          icon={<AlertTriangle size={24} style={{ color: 'var(--coral)' }} />} 
        />
      </div>

      {/* 2. Pipeline Views Control */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {['All', 'Not Started', 'In Progress', 'Completed'].map(tab => (
          <button 
            key={tab}
            className={activeTab === tab ? 'btn' : 'btn ghost'}
            onClick={() => setActiveTab(tab)}
            style={{ 
              background: activeTab === tab ? 'var(--surface)' : 'transparent',
              fontWeight: activeTab === tab ? '700' : '600',
              color: activeTab === tab ? 'var(--ink)' : 'var(--ink-2)'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3. Offboarding Data Grid */}
      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--line)' }}>
                <th style={{ padding: '16px 20px', fontSize: '11px', fontWeight: '700', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Employee</th>
                <th style={{ padding: '16px 20px', fontSize: '11px', fontWeight: '700', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Role & Department</th>
                <th style={{ padding: '16px 20px', fontSize: '11px', fontWeight: '700', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Last Day</th>
                <th style={{ padding: '16px 20px', fontSize: '11px', fontWeight: '700', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                <th style={{ padding: '16px 20px', fontSize: '11px', fontWeight: '700', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Progress</th>
                <th style={{ padding: '16px 20px', fontSize: '11px', fontWeight: '700', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center' }}>Steps</th>
                <th style={{ padding: '16px 20px', fontSize: '11px', fontWeight: '700', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {offboardingData.map((employee, index) => (
                <tr key={employee.id} style={{ borderBottom: index !== offboardingData.length - 1 ? '1px solid var(--line)' : 'none' }}>
                  
                  {/* Employee Info */}
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={employee.avatar} alt="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: '700', color: 'var(--ink)', fontSize: '14px', marginBottom: '2px' }}>{employee.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--ink-3)' }}>{employee.systemId}</div>
                      </div>
                    </div>
                  </td>

                  {/* Role & Dept */}
                  <td style={{ padding: '16px 20px', fontSize: '14px', color: 'var(--ink)' }}>
                    <div style={{ fontWeight: '600' }}>{employee.role}</div>
                    <div style={{ fontSize: '12px', color: 'var(--ink-2)', marginTop: '2px' }}>{employee.department}</div>
                  </td>

                  {/* Last Day */}
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ink-2)', fontSize: '14px' }}>
                      <CalendarIcon size={14} />
                      <span>{employee.lastDay}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td style={{ padding: '16px 20px' }}>
                    <StatusBadge status={employee.status} />
                  </td>

                  {/* Progress */}
                  <td style={{ padding: '16px 20px' }}>
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
                  <td style={{ padding: '16px 20px', textAlign: 'center', fontWeight: '600', color: 'var(--ink-2)' }}>
                    <span style={{ color: employee.stepsCompleted === employee.stepsTotal ? 'var(--sage)' : 'inherit' }}>
                      {employee.stepsCompleted}
                    </span>
                    <span style={{ margin: '0 4px', color: 'var(--ink-3)', fontWeight: '400' }}>/</span>
                    <span style={{ color: 'var(--ink-3)' }}>{employee.stepsTotal}</span>
                  </td>

                  {/* Action */}
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <button 
                      className="btn primary" 
                      onClick={() => {
                        if (onSelectEmployee) onSelectEmployee(employee);
                        if (setCurrentPage) setCurrentPage('offboarding-detail');
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
