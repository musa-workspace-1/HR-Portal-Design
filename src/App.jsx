import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import MobileNav from './components/MobileNav';

import Dashboard from './pages/Dashboard';
import EmployeeDirectory from './pages/EmployeeDirectory';
import Onboarding from './pages/Onboarding';
import Offboarding from './pages/Offboarding';
import Team from './pages/Team';
import AttendanceDashboard from './pages/AttendanceDashboard';
import AttendanceLog from './pages/AttendanceLog';
import Shift from './pages/Shift';
import Overtime from './pages/Overtime';
import Leave from './pages/Leave';
import RecruitmentDashboard from './pages/RecruitmentDashboard';
import CandidatePipeline from './pages/CandidatePipeline';
import Interviews from './pages/Interviews';
import OfferLetters from './pages/OfferLetters';
import PayrollDashboard from './pages/PayrollDashboard';
import SalaryStructure from './pages/SalaryStructure';

function App() {
  const [currentPage, setCurrentPage] = useState('employee-directory');
  const [activeDropdown, setActiveDropdown] = useState('staff');

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc] text-slate-900 font-sans overflow-hidden">
      
      <Topbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          activeDropdown={activeDropdown} 
          toggleDropdown={toggleDropdown} 
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'employee-directory' && <EmployeeDirectory />}
          {currentPage === 'onboarding' && <Onboarding />}
          {currentPage === 'offboarding' && <Offboarding />}
          {currentPage === 'team' && <Team />}
          {currentPage === 'attendance-dashboard' && <AttendanceDashboard />}
          {currentPage === 'attendance-log' && <AttendanceLog />}
          {currentPage === 'shift' && <Shift />}
          {currentPage === 'overtime' && <Overtime />}
          {currentPage === 'leave' && <Leave />}
          {currentPage === 'recruitment-dashboard' && <RecruitmentDashboard />}
          {currentPage === 'candidate-pipeline' && <CandidatePipeline />}
          {currentPage === 'interviews' && <Interviews />}
          {currentPage === 'offer-letters' && <OfferLetters />}
          {currentPage === 'payroll-dashboard' && <PayrollDashboard />}
          {currentPage === 'salary-structure' && <SalaryStructure />}
        </main>
      </div>

      <MobileNav currentPage={currentPage} setCurrentPage={setCurrentPage} />

    </div>
  );
}

export default App;
