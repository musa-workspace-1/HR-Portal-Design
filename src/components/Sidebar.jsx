import React from 'react';
import { Home, Users, Clock, Briefcase, DollarSign, ChevronDown, Sun } from 'lucide-react';

export default function Sidebar({ currentPage, setCurrentPage, activeDropdown, toggleDropdown }) {
  return (
    <div className="sidebar">

      <div className="brand">
        <div className="logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="23" height="23"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <h1>HR Portal</h1>
      </div>

      <div className="nav-scroll">

        
        <NavItem 
          icon={<Home size={19} />} 
          label="Dashboard" 
          active={currentPage === 'dashboard'} 
          onClick={() => { setCurrentPage('dashboard'); toggleDropdown(null); }} 
        />
        


        <div className="flex flex-col">
          <div 
            onClick={() => toggleDropdown('staff')}
            className={`nav-item ${['employee-directory', 'onboarding', 'offboarding', 'team'].includes(currentPage) ? 'active' : ''}`}
          >
            <Users size={19} />
            <span style={{flex: 1}}>Staff & Lifecycle</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'staff' ? 'rotate-180' : ''}`} style={{opacity: 0.5}} />
          </div>
          
          {activeDropdown === 'staff' && (
            <div style={{ paddingLeft: '32px', marginBottom: '8px' }}>
              <SubNavItem label="Employee Directory" active={currentPage === 'employee-directory'} onClick={() => setCurrentPage('employee-directory')} />
              <SubNavItem label="Onboarding" active={currentPage === 'onboarding'} onClick={() => setCurrentPage('onboarding')} />
              <SubNavItem label="Offboarding" active={currentPage === 'offboarding'} onClick={() => setCurrentPage('offboarding')} />
              <SubNavItem label="Team" active={currentPage === 'team'} onClick={() => setCurrentPage('team')} />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div 
            onClick={() => toggleDropdown('time')}
            className={`nav-item ${['attendance-dashboard', 'attendance-log', 'shift', 'overtime', 'leave'].includes(currentPage) ? 'active' : ''}`}
          >
            <Clock size={19} />
            <span style={{flex: 1}}>Time & Attendance</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'time' ? 'rotate-180' : ''}`} style={{opacity: 0.5}} />
          </div>
          
          {activeDropdown === 'time' && (
            <div style={{ paddingLeft: '32px', marginBottom: '8px' }}>
              <SubNavItem label="Attendance Dashboard" active={currentPage === 'attendance-dashboard'} onClick={() => setCurrentPage('attendance-dashboard')} />
              <SubNavItem label="Attendance Log" active={currentPage === 'attendance-log'} onClick={() => setCurrentPage('attendance-log')} />
              <SubNavItem label="Shift" active={currentPage === 'shift'} onClick={() => setCurrentPage('shift')} />
              <SubNavItem label="Overtime" active={currentPage === 'overtime'} onClick={() => setCurrentPage('overtime')} />
              <SubNavItem label="Leave" active={currentPage === 'leave'} onClick={() => setCurrentPage('leave')} />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div 
            onClick={() => toggleDropdown('hiring')}
            className={`nav-item ${['recruitment-dashboard', 'candidate-pipeline', 'interviews', 'offer-letters'].includes(currentPage) ? 'active' : ''}`}
          >
            <Briefcase size={19} />
            <span style={{flex: 1}}>Hiring</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'hiring' ? 'rotate-180' : ''}`} style={{opacity: 0.5}} />
          </div>
          
          {activeDropdown === 'hiring' && (
            <div style={{ paddingLeft: '32px', marginBottom: '8px' }}>
              <SubNavItem label="Recruitment Dashboard" active={currentPage === 'recruitment-dashboard'} onClick={() => setCurrentPage('recruitment-dashboard')} />
              <SubNavItem label="Candidate Pipeline" active={currentPage === 'candidate-pipeline'} onClick={() => setCurrentPage('candidate-pipeline')} />
              <SubNavItem label="Interviews" active={currentPage === 'interviews'} onClick={() => setCurrentPage('interviews')} />
              <SubNavItem label="Offer Letters" active={currentPage === 'offer-letters'} onClick={() => setCurrentPage('offer-letters')} />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div 
            onClick={() => toggleDropdown('payroll')}
            className={`nav-item ${['payroll-dashboard', 'salary-structure'].includes(currentPage) ? 'active' : ''}`}
          >
            <DollarSign size={19} />
            <span style={{flex: 1}}>Payroll</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'payroll' ? 'rotate-180' : ''}`} style={{opacity: 0.5}} />
          </div>
          
          {activeDropdown === 'payroll' && (
            <div style={{ paddingLeft: '32px', marginBottom: '8px' }}>
              <SubNavItem label="Payroll Dashboard" active={currentPage === 'payroll-dashboard'} onClick={() => setCurrentPage('payroll-dashboard')} />
              <SubNavItem label="Salary Structure" active={currentPage === 'salary-structure'} onClick={() => setCurrentPage('salary-structure')} />
            </div>
          )}
        </div>

        <NavItem 
          icon={<Sun size={19} />} 
          label={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span>AI Hub</span>
              <span className="pill" style={{ background: '#bd7942', color: '#fff', fontSize: '9px', padding: '2px 6px' }}>AI</span>
            </div>
          } 
          active={currentPage === 'ai-hub'} 
          onClick={() => { setCurrentPage('ai-hub'); toggleDropdown(null); }} 
        />
      </div>



    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <div onClick={onClick} className={`nav-item ${active ? 'active' : ''}`}>
      {icon}
      <span>{label}</span>
    </div>
  );
}

function SubNavItem({ label, active, onClick }) {
  return (
    <div 
      onClick={onClick} 
      className={`nav-item ${active ? 'active' : ''}`}
      style={{ padding: '8px 12px', fontSize: '12.5px', marginBottom: '2px' }}
    >
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: active ? 'var(--brand)' : 'var(--ink-3)', opacity: active ? 1 : 0.4 }}></span>
      {label}
    </div>
  );
}
