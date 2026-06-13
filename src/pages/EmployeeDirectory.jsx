import React, { useState } from 'react';
import { 
  Download, Plus, Users, UserCheck, UserPlus, 
  Search, Filter, MoreHorizontal, ChevronLeft, ChevronRight 
} from 'lucide-react';
import AddEmployee from './AddEmployee';
import ExportModal from '../components/ExportModal';

export default function EmployeeDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [view, setView] = useState('list');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const initialEmployees = [
    {
      id: 1,
      name: 'Sarah Ahmed',
      email: 'sarah.ahmed@24loops.com',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      department: 'Creative & Design',
      jobTitle: 'Creative Director',
      employmentType: 'Full Time',
      startDate: '2023-01-15',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Syed Muhammad Saad',
      email: 'syed.saad@24loops.com',
      avatar: 'https://i.pravatar.cc/150?u=syed',
      department: 'Product',
      jobTitle: 'Product Design Manager',
      employmentType: 'Full Time',
      startDate: '2022-08-10',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Umair Khan',
      email: 'umair.khan@24loops.com',
      avatar: 'https://i.pravatar.cc/150?u=umair',
      department: 'Engineering',
      jobTitle: 'Frontend Developer',
      employmentType: 'Contract',
      startDate: '2024-03-01',
      status: 'Onboarding',
    },
    {
      id: 4,
      name: 'Elena Rodriguez',
      email: 'elena.rodriguez@24loops.com',
      avatar: 'https://i.pravatar.cc/150?u=elena',
      department: 'Management',
      jobTitle: 'Product Manager',
      employmentType: 'Full Time',
      startDate: '2021-06-15',
      status: 'Active',
    },
  ];

  const [employeesList, setEmployeesList] = useState(initialEmployees);

  const filteredEmployees = employeesList.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDept = filterDept === '' || employee.department === filterDept;
    
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
              avatar: newEmp.avatarUrl || 'https://i.pravatar.cc/150?u=empty',
              department: newEmp.department || 'Creative & Design',
              jobTitle: newEmp.jobTitle || 'UI/UX Designer',
              employmentType: newEmp.employmentType || 'Full Time',
              startDate: newEmp.startDate || new Date().toISOString().split('T')[0],
              status: 'Onboarding',
            },
            ...prev
          ]);
          setView('list');
        }}
      />
    );
  }

  return (
    <div className="stagger">
      <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
      
      {/* 1. Page Header Controls */}
      <div className="sec-head" style={{ marginBottom: '18px', justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn primary" onClick={() => setIsExportModalOpen(true)}>
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* 2. Summary Metrics Cards (KPIs) - Unified Dashboard Style */}
      <div className="panel data-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px', width: '100%', padding: '16px 24px', borderRadius: '32px' }}>
        <TopKpiCard title="Total Employees" value="1,245" icon={<Users size={24} />} color="var(--brand)" bgColor="var(--brand-soft)" />
        <TopKpiCard title="Active" value="1,180" icon={<UserCheck size={24} />} color="var(--sage)" bgColor="var(--sage-soft)" />
        <TopKpiCard title="Onboarding" value="23" icon={<UserPlus size={24} />} color="var(--gold)" bgColor="var(--gold-soft)" />
      </div>

      {/* 3. Controls */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="search" style={{ margin: 0, width: '300px' }}>
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search employees..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="glass-ctrl" 
          aria-label="Filter by department" 
          style={{ margin: 0 }}
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <button className="btn primary" style={{ marginLeft: 'auto' }} onClick={() => setView('add')}>
          <Plus size={16} /> Add Employee
        </button>
      </div>

      {/* 4. Employee Grid Content */}
      <div className="emp-grid stagger">
        {filteredEmployees.map((employee, i) => (
          <div key={employee.id} className="emp-card" style={{ animationDelay: `${i * 35}ms` }}>
            <img src={employee.avatar} alt={employee.name} className="av" style={{ objectFit: 'cover' }} />
            <h4>{employee.name}</h4>
            <div className="role">{employee.jobTitle}</div>
            
            <StatusBadge status={employee.status} />

            <div className="meta">
              <div>Department <b>{employee.department}</b></div>
              <div>Type <b>{employee.employmentType}</b></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon, color, bgColor }) {
  return (
    <div className="stat-mini">
      <div className="si" style={{ background: bgColor, color: color }}>
        {icon}
      </div>
      <div>
        <div className="sl">{title}</div>
        <div className="sv">{value}</div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let colorClass = 'pill gray';
  
  if (status === 'Active') {
    colorClass = 'pill green';
  } else if (status === 'Onboarding') {
    colorClass = 'pill gold';
  } else if (status === 'Terminated') {
    colorClass = 'pill coral';
  }

  return (
    <span className={colorClass}>
      <span className="dotc"></span>
      {status}
    </span>
  );
}

function TopKpiCard({ title, value, icon, color, bgColor, onClick }) {
  return (
    <div 
      onClick={onClick} 
      style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px', 
        padding: '8px 16px', 
        background: 'transparent',
        cursor: onClick ? 'pointer' : 'default',
        minWidth: '200px'
      }}
    >
      <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: bgColor, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '12px', color: 'var(--ink-2)', fontWeight: '700', marginBottom: '4px' }}>{title}</div>
        <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--coral)', letterSpacing: '-0.5px', lineHeight: 1 }}>{value}</div>
      </div>
    </div>
  );
}



