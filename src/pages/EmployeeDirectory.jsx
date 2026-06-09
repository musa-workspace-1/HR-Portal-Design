import React, { useState } from 'react';
import Icon from '../components/Icon';
import AddEmployee from './AddEmployee';

export default function EmployeeDirectory({ view, setView }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const initialEmployees = [
    {
      id: 1,
      name: 'Sarah Ahmed',
      email: 'sarah.ahmed@24loops.com',
      department: 'Creative & Design',
      jobTitle: 'Creative Director',
      status: 'active',
      att: 98,
      perf: 4.8
    },
    {
      id: 2,
      name: 'Syed Muhammad Saad',
      email: 'syed.saad@24loops.com',
      department: 'Product',
      jobTitle: 'Product Design Manager',
      status: 'active',
      att: 95,
      perf: 4.6
    },
    {
      id: 3,
      name: 'Umair Khan',
      email: 'umair.khan@24loops.com',
      department: 'Engineering',
      jobTitle: 'Frontend Developer',
      status: 'pending',
      att: 0,
      perf: 0
    },
    {
      id: 4,
      name: 'Elena Rodriguez',
      email: 'elena.rodriguez@24loops.com',
      department: 'Management',
      jobTitle: 'Product Manager',
      status: 'leave',
      att: 92,
      perf: 4.9
    },
  ];

  const [employeesList, setEmployeesList] = useState(initialEmployees);

  const filteredEmployees = employeesList.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter === '' || employee.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  const departments = [...new Set(employeesList.map(e => e.department))];

  if (view === 'add') {
    return (
      <AddEmployee 
        onCancel={() => setView('list')} 
        onAdd={(newEmp) => {
          setEmployeesList(prev => [
            {
              id: prev.length + 1,
              name: newEmp.fullName,
              email: newEmp.personalEmail || `${newEmp.fullName.toLowerCase().replace(/\s+/g, '.')}@24loops.com`,
              department: newEmp.department || 'Creative & Design',
              jobTitle: newEmp.jobTitle || 'UI/UX Designer',
              status: 'pending',
              att: 0,
              perf: 0
            },
            ...prev
          ]);
          setView('list');
        }}
      />
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="search" style={{ margin: 0, width: '300px' }}>
          <Icon name="search" />
          <input 
            placeholder="Search employees..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select 
          className="select" 
          style={{ margin: 0 }}
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        
        <button className="btn primary" style={{ marginLeft: 'auto' }} onClick={() => setView('add')}>
          <Icon name="plus" /> Add Employee
        </button>
      </div>

      <div className="emp-grid stagger">
        {filteredEmployees.length === 0 ? (
          <div className="empty">No employees found.</div>
        ) : (
          filteredEmployees.map((e, i) => (
            <div key={e.id} className="emp-card" style={{ animationDelay: `${i * 35}ms` }}>
              <div className="av" style={{ background: 'var(--surface-3)', width: '64px', height: '64px', fontSize: '24px' }}>
                {e.name.charAt(0)}
              </div>
              <h4>{e.name}</h4>
              <div className="role">{e.jobTitle}</div>
              <StatusPill status={e.status} />
              <div className="meta">
                <div><b>{e.att}%</b>Attendance</div>
                <div><b>{e.perf > 0 ? e.perf : '-'}</b>Rating</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    active: ['green', 'Active'],
    leave: ['gold', 'On Leave'],
    remote: ['sky', 'Remote'],
    pending: ['gold', 'Pending'],
    approved: ['green', 'Approved'],
    rejected: ['coral', 'Rejected']
  };
  const [color, label] = map[status] || ['gray', status];
  
  return (
    <span className={`pill ${color}`}>
      <span className="dotc"></span>{label}
    </span>
  );
}
