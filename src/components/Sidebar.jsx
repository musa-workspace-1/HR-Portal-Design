import React from 'react';
import { Home, Users, Clock, Briefcase, DollarSign, ChevronDown, Settings, HelpCircle } from 'lucide-react';

export default function Sidebar({ currentPage, setCurrentPage, activeDropdown, toggleDropdown }) {
  return (
    <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-slate-100 flex-shrink-0 z-20 shadow-sm pt-2">

      <div className="px-4 py-3 flex flex-col items-center border-b border-slate-100">
        <img src="https://i.pravatar.cc/150?u=shahzaib" alt="Shah Zaib Kazmi" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md mb-1.5" />
        <h3 className="font-bold text-slate-900 text-sm">Shah Zaib Kazmi</h3>
        <p className="text-[10px] text-slate-500 font-medium">HR Manager</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <NavItem 
          icon={<Home size={20} />} 
          label="Dashboard" 
          active={currentPage === 'dashboard'} 
          onClick={() => { setCurrentPage('dashboard'); toggleDropdown(null); }} 
        />
        
        <div className="flex flex-col">
          <button 
            onClick={() => toggleDropdown('staff')}
            className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-colors ${['employee-directory', 'onboarding', 'offboarding', 'team'].includes(currentPage) ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <div className="flex items-center gap-3">
              <span className={['employee-directory', 'onboarding', 'offboarding', 'team'].includes(currentPage) ? 'text-primary' : 'text-slate-400'}><Users size={20} /></span>
              <span className={`text-sm ${['employee-directory', 'onboarding', 'offboarding', 'team'].includes(currentPage) ? 'font-semibold' : ''}`}>Staff & Lifecycle</span>
            </div>
            <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'staff' ? 'rotate-180' : ''}`} />
          </button>
          
          {activeDropdown === 'staff' && (
            <div className="mt-1 ml-4 border-l-2 border-slate-100 pl-3 flex flex-col gap-1">
              <SubNavItem 
                label="Employee Directory" 
                active={currentPage === 'employee-directory'} 
                onClick={() => setCurrentPage('employee-directory')} 
              />
              <SubNavItem 
                label="Onboarding" 
                active={currentPage === 'onboarding'} 
                onClick={() => setCurrentPage('onboarding')} 
              />
              <SubNavItem 
                label="Offboarding" 
                active={currentPage === 'offboarding'} 
                onClick={() => setCurrentPage('offboarding')} 
              />
              <SubNavItem 
                label="Team" 
                active={currentPage === 'team'} 
                onClick={() => setCurrentPage('team')} 
              />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <button 
            onClick={() => toggleDropdown('time')}
            className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-colors ${['attendance-dashboard', 'attendance-log', 'shift', 'overtime', 'leave'].includes(currentPage) ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <div className="flex items-center gap-3">
              <span className={['attendance-dashboard', 'attendance-log', 'shift', 'overtime', 'leave'].includes(currentPage) ? 'text-primary' : 'text-slate-400'}><Clock size={20} /></span>
              <span className={`text-sm ${['attendance-dashboard', 'attendance-log', 'shift', 'overtime', 'leave'].includes(currentPage) ? 'font-semibold' : ''}`}>Time & Attendance</span>
            </div>
            <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'time' ? 'rotate-180' : ''}`} />
          </button>
          
          {activeDropdown === 'time' && (
            <div className="mt-1 ml-4 border-l-2 border-slate-100 pl-3 flex flex-col gap-1">
              <SubNavItem 
                label="Attendance Dashboard" 
                active={currentPage === 'attendance-dashboard'} 
                onClick={() => setCurrentPage('attendance-dashboard')} 
              />
              <SubNavItem 
                label="Attendance Log" 
                active={currentPage === 'attendance-log'} 
                onClick={() => setCurrentPage('attendance-log')} 
              />
              <SubNavItem 
                label="Shift" 
                active={currentPage === 'shift'} 
                onClick={() => setCurrentPage('shift')} 
              />
              <SubNavItem 
                label="Overtime" 
                active={currentPage === 'overtime'} 
                onClick={() => setCurrentPage('overtime')} 
              />
              <SubNavItem 
                label="Leave" 
                active={currentPage === 'leave'} 
                onClick={() => setCurrentPage('leave')} 
              />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <button 
            onClick={() => toggleDropdown('hiring')}
            className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-colors ${['recruitment-dashboard', 'candidate-pipeline', 'interviews', 'offer-letters'].includes(currentPage) ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <div className="flex items-center gap-3">
              <span className={['recruitment-dashboard', 'candidate-pipeline', 'interviews', 'offer-letters'].includes(currentPage) ? 'text-primary' : 'text-slate-400'}><Briefcase size={20} /></span>
              <span className={`text-sm ${['recruitment-dashboard', 'candidate-pipeline', 'interviews', 'offer-letters'].includes(currentPage) ? 'font-semibold' : ''}`}>Hiring</span>
            </div>
            <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'hiring' ? 'rotate-180' : ''}`} />
          </button>
          
          {activeDropdown === 'hiring' && (
            <div className="mt-1 ml-4 border-l-2 border-slate-100 pl-3 flex flex-col gap-1">
              <SubNavItem 
                label="Recruitment Dashboard" 
                active={currentPage === 'recruitment-dashboard'} 
                onClick={() => setCurrentPage('recruitment-dashboard')} 
              />
              <SubNavItem 
                label="Candidate Pipeline" 
                active={currentPage === 'candidate-pipeline'} 
                onClick={() => setCurrentPage('candidate-pipeline')} 
              />
              <SubNavItem 
                label="Interviews" 
                active={currentPage === 'interviews'} 
                onClick={() => setCurrentPage('interviews')} 
              />
              <SubNavItem 
                label="Offer Letters" 
                active={currentPage === 'offer-letters'} 
                onClick={() => setCurrentPage('offer-letters')} 
              />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <button 
            onClick={() => toggleDropdown('payroll')}
            className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-colors ${['payroll-dashboard', 'salary-structure'].includes(currentPage) ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <div className="flex items-center gap-3">
              <span className={['payroll-dashboard', 'salary-structure'].includes(currentPage) ? 'text-primary' : 'text-slate-400'}><DollarSign size={20} /></span>
              <span className={`text-sm ${['payroll-dashboard', 'salary-structure'].includes(currentPage) ? 'font-semibold' : ''}`}>Payroll</span>
            </div>
            <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'payroll' ? 'rotate-180' : ''}`} />
          </button>
          
          {activeDropdown === 'payroll' && (
            <div className="mt-1 ml-4 border-l-2 border-slate-100 pl-3 flex flex-col gap-1">
              <SubNavItem 
                label="Payroll Dashboard" 
                active={currentPage === 'payroll-dashboard'} 
                onClick={() => setCurrentPage('payroll-dashboard')} 
              />
              <SubNavItem 
                label="Salary Structure" 
                active={currentPage === 'salary-structure'} 
                onClick={() => setCurrentPage('salary-structure')} 
              />
            </div>
          )}
        </div>
      </nav>

      <div className="px-3 py-2 border-t border-slate-100 space-y-0.5">
        <NavItem icon={<Settings size={20} />} label="Settings" />
        <NavItem icon={<HelpCircle size={20} />} label="Help Center" />
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-xl transition-colors ${active ? 'bg-primary/10 text-primary font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
      <span className={active ? 'text-primary' : 'text-slate-400'}>{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
}

function SubNavItem({ label, active, onClick }) {
  return (
    <button onClick={onClick} className={`text-left w-full px-3 py-2 rounded-lg text-sm transition-colors ${active ? 'bg-primary/10 text-primary font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
      {label}
    </button>
  );
}
