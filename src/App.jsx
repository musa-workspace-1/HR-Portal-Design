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
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Help from './pages/Help';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [directoryView, setDirectoryView] = useState('list');

  const navigateToPage = (page) => {
    setCurrentPage(page);
    if (['employee-directory', 'onboarding', 'offboarding', 'team'].includes(page)) {
      setActiveDropdown('staff');
    } else if (['attendance-dashboard', 'attendance-log', 'shift', 'overtime', 'leave'].includes(page)) {
      setActiveDropdown('time');
    } else if (['recruitment-dashboard', 'candidate-pipeline', 'interviews', 'offer-letters'].includes(page)) {
      setActiveDropdown('hiring');
    } else if (['payroll-dashboard', 'salary-structure'].includes(page)) {
      setActiveDropdown('payroll');
    } else {
      setActiveDropdown(null);
    }
  };

  // Mock Notifications Data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'leave',
      title: 'Leave request approved',
      message: 'Your annual leave from Oct 12–16 was approved',
      time: '2 hours ago',
      isRead: false
    },
    {
      id: 2,
      type: 'policy',
      title: 'New Policy Update',
      message: 'Please review the updated WFH policy guidelines',
      time: 'Yesterday',
      isRead: false
    },
    {
      id: 3,
      type: 'leave',
      title: 'Leave request submitted',
      message: 'Rahul Gupta requested casual leave for June 18',
      time: '4 hours ago',
      isRead: false
    },
    {
      id: 4,
      type: 'policy',
      title: 'Updated Dress Code Policy',
      message: 'General updates on office smart casual requirements',
      time: '2 days ago',
      isRead: true
    },
    {
      id: 5,
      type: 'leave',
      title: 'Sick leave approved',
      message: 'Your sick leave request for May 20 was approved',
      time: '5 days ago',
      isRead: true
    }
  ]);

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(notif => notif.id === id ? { ...notif, isRead: true } : notif));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="app">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={navigateToPage} 
        activeDropdown={activeDropdown} 
        toggleDropdown={toggleDropdown} 
      />

      <div className="main">
        <Topbar 
          currentPage={currentPage}
          setCurrentPage={navigateToPage} 
          notifications={notifications} 
          markAllNotificationsAsRead={markAllNotificationsAsRead} 
          markNotificationAsRead={markNotificationAsRead} 
        />

        <div className="content" id="content">
          <div className="view active">
            {currentPage === 'dashboard' && <Dashboard setCurrentPage={navigateToPage} setDirectoryView={setDirectoryView} />}
            {currentPage === 'employee-directory' && <EmployeeDirectory view={directoryView} setView={setDirectoryView} />}
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
            {currentPage === 'notifications' && (
              <Notifications 
                notifications={notifications} 
                markAllNotificationsAsRead={markAllNotificationsAsRead} 
                markNotificationAsRead={markNotificationAsRead}
                deleteNotification={deleteNotification}
              />
            )}
            {currentPage === 'settings' && <Settings />}
            {currentPage === 'profile' && <Profile />}
            {currentPage === 'help' && <Help />}
          </div>
        </div>
      </div>

      <MobileNav currentPage={currentPage} setCurrentPage={navigateToPage} />

    </div>
  );
}

export default App;
