import React from 'react';
import Icon from './Icon';

export default function Sidebar({ currentPage, setCurrentPage, activeDropdown, toggleDropdown }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round">
            <path d="M4.5 12c0-2 1.6-3.6 3.6-3.6 1.6 0 2.6 1.1 3.4 2.5l1 1.8c.8 1.4 1.8 2.5 3.4 2.5 2 0 3.6-1.6 3.6-3.6S21.4 8 19.4 8c-1.6 0-2.6 1.1-3.4 2.5l-1 1.8C14.2 13.7 13.2 14.8 11.6 14.8 9.6 14.8 8 13.2 8 11.2"/>
          </svg>
        </div>
        <h1>24 loops</h1>
      </div>
      
      <div className="nav-scroll">
        <div className="nav-label">Main Menu</div>
        <NavItem 
          icon="dashboard" 
          label="Dashboard" 
          active={currentPage === 'dashboard'} 
          onClick={() => { setCurrentPage('dashboard'); toggleDropdown(null); }} 
        />
        <NavItem 
          icon="employees" 
          label="Employees" 
          active={currentPage === 'employee-directory' || currentPage === 'team'} 
          onClick={() => { setCurrentPage('employee-directory'); toggleDropdown('staff'); }} 
        />
        <NavItem 
          icon="attendance" 
          label="Attendance" 
          active={currentPage === 'attendance-dashboard' || currentPage === 'attendance-log' || currentPage === 'shift' || currentPage === 'overtime'} 
          onClick={() => { setCurrentPage('attendance-dashboard'); toggleDropdown('time'); }} 
        />
        <NavItem 
          icon="leave" 
          label={<span>Leave <span className="badge">3</span></span>}
          active={currentPage === 'leave'} 
          onClick={() => { setCurrentPage('leave'); toggleDropdown('time'); }} 
        />
        <NavItem 
          icon="spark" 
          label={<span>AI Hub <span className="ai-badge">AI</span></span>}
          active={currentPage === 'aihub'} 
          onClick={() => { setCurrentPage('aihub'); toggleDropdown(null); }} 
        />

        <div className="nav-label">Team Management</div>
        <NavItem 
          icon="recruitment" 
          label="Recruitment" 
          active={currentPage === 'recruitment-dashboard' || currentPage === 'candidate-pipeline' || currentPage === 'interviews' || currentPage === 'offer-letters'} 
          onClick={() => { setCurrentPage('recruitment-dashboard'); toggleDropdown('hiring'); }} 
        />
        <NavItem 
          icon="onboarding" 
          label="Onboarding" 
          active={currentPage === 'onboarding' || currentPage === 'offboarding'} 
          onClick={() => { setCurrentPage('onboarding'); toggleDropdown('staff'); }} 
        />
        <NavItem 
          icon="performance" 
          label="Performance" 
          active={currentPage === 'performance'} 
          onClick={() => { setCurrentPage('performance'); toggleDropdown(null); }} 
        />
        <NavItem 
          icon="payroll" 
          label="Payroll" 
          active={currentPage === 'payroll-dashboard' || currentPage === 'salary-structure'} 
          onClick={() => { setCurrentPage('payroll-dashboard'); toggleDropdown('payroll'); }} 
        />
        <NavItem 
          icon="expenses" 
          label="Expenses" 
          active={currentPage === 'expenses'} 
          onClick={() => { setCurrentPage('expenses'); toggleDropdown(null); }} 
        />

        <div className="nav-label">Workspace</div>
        <NavItem 
          icon="documents" 
          label="Documents" 
          active={currentPage === 'documents'} 
          onClick={() => { setCurrentPage('documents'); toggleDropdown(null); }} 
        />
        <NavItem 
          icon="announcements" 
          label="Announcements" 
          active={currentPage === 'announcements'} 
          onClick={() => { setCurrentPage('announcements'); toggleDropdown(null); }} 
        />
        <NavItem 
          icon="settings" 
          label="Settings" 
          active={currentPage === 'settings' || currentPage === 'profile'} 
          onClick={() => { setCurrentPage('settings'); toggleDropdown(null); }} 
        />
      </div>

      <div className="side-foot">
        <div className="ai-promo">
          <div className="spark">✦</div>
          <h4>Loop AI Assistant</h4>
          <p>Just chat — Loop AI can add people, book leave & more.</p>
          <button>Open Assistant</button>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <div className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
      <Icon name={icon} /> {label}
    </div>
  );
}
