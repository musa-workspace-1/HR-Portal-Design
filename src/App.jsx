import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import AiDrawer from './components/AiDrawer';


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
import AiHub from './pages/AiHub';
import OnboardingDetail from './pages/OnboardingDetail';
import OffboardingDetail from './pages/OffboardingDetail';
// AI Assistant Button component
const AIAssistantBtn = ({ onClick }) => {
  return (
    <button className="ai-fab" onClick={onClick} title="Ask Loop AI">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>
        <circle cx="12" cy="12" r="3.2"/>
      </svg>
    </button>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [directoryView, setDirectoryView] = useState('list');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedOnboardingEmployee, setSelectedOnboardingEmployee] = useState(null);
  const [selectedOffboardingEmployee, setSelectedOffboardingEmployee] = useState(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

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
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />

        <div className="content">
          {currentPage === 'dashboard' && <Dashboard setCurrentPage={navigateToPage} setDirectoryView={setDirectoryView} />}
          {currentPage === 'employee-directory' && <EmployeeDirectory view={directoryView} setView={setDirectoryView} />}
          {currentPage === 'onboarding' && <Onboarding setCurrentPage={navigateToPage} onSelectEmployee={setSelectedOnboardingEmployee} />}
          {currentPage === 'onboarding-detail' && <OnboardingDetail setCurrentPage={navigateToPage} employee={selectedOnboardingEmployee} />}
          {currentPage === 'offboarding' && <Offboarding setCurrentPage={navigateToPage} onSelectEmployee={setSelectedOffboardingEmployee} />}
          {currentPage === 'offboarding-detail' && <OffboardingDetail setCurrentPage={navigateToPage} employee={selectedOffboardingEmployee} />}
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
          {currentPage === 'ai-hub' && <AiHub setIsAiOpen={setIsAiOpen} />}
        </div>
      </div>

      <AIAssistantBtn onClick={() => setIsAiOpen(true)} />
      <AiDrawer isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}

export default App;
