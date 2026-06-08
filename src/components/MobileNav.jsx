import React from 'react';
import { Home, Users, Clock, Briefcase, DollarSign } from 'lucide-react';

export default function MobileNav({ currentPage, setCurrentPage }) {
  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-between px-6 py-3 z-30 pb-safe">
        <BottomNavItem 
          icon={<Home size={22} />} 
          label="Dashboard" 
          active={currentPage === 'dashboard'} 
          onClick={() => setCurrentPage('dashboard')} 
        />
        <BottomNavItem 
          icon={<Users size={22} />} 
          label="Staff" 
          active={['employee-directory', 'onboarding', 'offboarding', 'team'].includes(currentPage)} 
          onClick={() => setCurrentPage('employee-directory')} 
        />
        <BottomNavItem 
          icon={<Clock size={22} />} 
          label="Time" 
          active={['attendance-dashboard', 'attendance-log', 'shift', 'overtime', 'leave'].includes(currentPage)} 
          onClick={() => setCurrentPage('attendance-dashboard')} 
        />
        <BottomNavItem 
          icon={<Briefcase size={22} />} 
          label="Hiring" 
          active={['recruitment-dashboard', 'candidate-pipeline', 'interviews', 'offer-letters'].includes(currentPage)} 
          onClick={() => setCurrentPage('recruitment-dashboard')} 
        />
        <BottomNavItem 
          icon={<DollarSign size={22} />} 
          label="Payroll" 
          active={['payroll-dashboard', 'salary-structure'].includes(currentPage)} 
          onClick={() => setCurrentPage('payroll-dashboard')} 
        />
      </div>
      
      <button className="lg:hidden fixed bottom-20 right-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 z-30">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
      </button>
    </>
  );
}

function BottomNavItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 ${active ? 'text-primary' : 'text-slate-400'}`}>
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
