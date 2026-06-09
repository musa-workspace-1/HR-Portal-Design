import React from 'react';
import Icon from './Icon';

export default function MobileNav({ currentPage, setCurrentPage }) {
  return (
    <>
      <div style={{
        display: 'none', // Hidden on desktop, we can use a media query for mobile
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'var(--surface)', borderTop: '1px solid var(--line)',
        justifyContent: 'space-between', padding: '12px 24px', zIndex: 30
      }} className="mobile-nav-bar">
        <BottomNavItem 
          icon="dashboard" 
          label="Dashboard" 
          active={currentPage === 'dashboard'} 
          onClick={() => setCurrentPage('dashboard')} 
        />
        <BottomNavItem 
          icon="employees" 
          label="Staff" 
          active={['employee-directory', 'onboarding', 'offboarding', 'team'].includes(currentPage)} 
          onClick={() => setCurrentPage('employee-directory')} 
        />
        <BottomNavItem 
          icon="attendance" 
          label="Time" 
          active={['attendance-dashboard', 'attendance-log', 'shift', 'overtime', 'leave'].includes(currentPage)} 
          onClick={() => setCurrentPage('attendance-dashboard')} 
        />
        <BottomNavItem 
          icon="recruitment" 
          label="Hiring" 
          active={['recruitment-dashboard', 'candidate-pipeline', 'interviews', 'offer-letters'].includes(currentPage)} 
          onClick={() => setCurrentPage('recruitment-dashboard')} 
        />
        <BottomNavItem 
          icon="payroll" 
          label="Payroll" 
          active={['payroll-dashboard', 'salary-structure'].includes(currentPage)} 
          onClick={() => setCurrentPage('payroll-dashboard')} 
        />
      </div>
      
      <button className="ai-fab" style={{ display: 'none' }} onClick={() => {}}>
        <Icon name="spark" />
      </button>
    </>
  );
}

function BottomNavItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
      color: active ? 'var(--brand)' : 'var(--ink-3)',
      background: 'none', border: 'none', cursor: 'pointer'
    }}>
      <Icon name={icon} style={{ width: '22px', height: '22px' }} />
      <span style={{ fontSize: '10px', fontWeight: 600 }}>{label}</span>
    </button>
  );
}
