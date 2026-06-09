import React, { useState, useEffect, useRef } from 'react';
import Icon from './Icon';

const PAGE_TITLES = {
  'dashboard': "Dashboard",
  'employee-directory': "Employees",
  'attendance-dashboard': "Attendance",
  'attendance-log': "Attendance Log",
  'shift': "Shift",
  'overtime': "Overtime",
  'leave': "Leave Management",
  'aihub': "AI Hub",
  'recruitment-dashboard': "Recruitment",
  'candidate-pipeline': "Candidate Pipeline",
  'interviews': "Interviews",
  'offer-letters': "Offer Letters",
  'onboarding': "Onboarding",
  'offboarding': "Offboarding",
  'team': "Team",
  'performance': "Performance",
  'payroll-dashboard': "Payroll",
  'salary-structure': "Salary Structure",
  'expenses': "Expenses",
  'documents': "Documents",
  'announcements': "Announcements",
  'settings': "Settings",
  'profile': "Profile",
  'help': "Help",
  'notifications': "Notifications"
};

export default function Topbar({ currentPage, setCurrentPage, notifications = [], markAllNotificationsAsRead, markNotificationAsRead }) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="topbar">
      <div className="page-title">
        <h2>{PAGE_TITLES[currentPage] || "Dashboard"}</h2>
      </div>

      <div className="search">
        <Icon name="search" />
        <input placeholder="Search for actions or people..." readOnly />
        <kbd>⌘K</kbd>
      </div>

      <button className="icon-btn" title="AI Assistant">
        <Icon name="spark" />
      </button>

      <button className="icon-btn" title="Theme" onClick={() => document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'}>
        <Icon name="theme" />
      </button>

      {/* Notifications Dropdown */}
      <div style={{ position: 'relative' }} ref={notificationsRef}>
        <button 
          className="icon-btn" 
          title="Notifications"
          onClick={() => {
            setNotificationsOpen(!notificationsOpen);
            setProfileMenuOpen(false);
          }}
        >
          <Icon name="bell" />
          {unreadCount > 0 && <span className="dot"></span>}
        </button>

        {notificationsOpen && (
          <div className="notif-panel" style={{ display: 'block', top: '100%', right: '0', position: 'absolute', marginTop: '12px' }}>
            <div className="notif-head">
              <h3>Notifications</h3>
              {unreadCount > 0 && (
                <span className="link" style={{ fontSize: '12px', color: 'var(--brand)', fontWeight: 700, cursor: 'pointer' }} onClick={markAllNotificationsAsRead}>
                  Mark all read
                </span>
              )}
            </div>
            <div>
              {notifications.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', fontSize: '13px', color: 'var(--ink-3)' }}>
                  All caught up!
                </div>
              ) : (
                notifications.slice(0, 5).map((notif) => (
                  <div 
                    key={notif.id}
                    onClick={() => markNotificationAsRead(notif.id)}
                    style={{
                      padding: '12px 16px',
                      display: 'flex',
                      gap: '12px',
                      cursor: 'pointer',
                      borderBottom: '1px solid var(--line)',
                      background: notif.isRead ? 'transparent' : 'var(--brand-softer)'
                    }}
                  >
                    <div style={{ 
                      width: '32px', height: '32px', borderRadius: '8px', 
                      background: notif.type === 'leave' ? 'var(--coral-soft)' : 'var(--sky-soft)',
                      color: notif.type === 'leave' ? 'var(--coral)' : 'var(--sky)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Icon name={notif.type === 'leave' ? 'clock' : 'alert'} style={{ width: '16px', height: '16px' }} />
                    </div>
                    <div style={{ flex: 1, fontSize: '12.5px', lineHeight: 1.4 }}>
                      <b style={{ color: 'var(--ink)' }}>{notif.title}</b>
                      <p style={{ color: 'var(--ink-2)', marginTop: '2px' }}>{notif.message}</p>
                      <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginTop: '4px' }}>{notif.time}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div 
              style={{ padding: '12px', textAlign: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--brand)', cursor: 'pointer', borderTop: '1px solid var(--line)' }}
              onClick={() => {
                setCurrentPage('notifications');
                setNotificationsOpen(false);
              }}
            >
              View All
            </div>
          </div>
        )}
      </div>

      {/* Profile Dropdown */}
      <div style={{ position: 'relative' }} ref={profileRef}>
        <div 
          className="avatar-btn" 
          onClick={() => {
            setProfileMenuOpen(!profileMenuOpen);
            setNotificationsOpen(false);
          }}
        >
          <div className="av" style={{ background: 'linear-gradient(135deg, #c79a3a, #bd7942)' }}>SK</div>
          <div className="nm">Shah Zaib Kazmi</div>
          <Icon name="down" style={{ width: '14px', height: '14px', color: 'var(--ink-3)' }} />
        </div>

        {profileMenuOpen && (
          <div className="notif-panel" style={{ display: 'block', top: '100%', right: '0', position: 'absolute', marginTop: '12px', width: '280px', padding: 0 }}>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <img src="/shah_zaib_avatar.png" alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>Shah Zaib Kazmi</div>
                  <div style={{ fontSize: '12px', color: 'var(--ink-3)' }}>HR Manager</div>
                </div>
              </div>
            </div>
            <div style={{ padding: '8px' }}>
              <div className="nav-item" onClick={() => { setCurrentPage('profile'); setProfileMenuOpen(false); }}>
                <Icon name="user" /> My Profile
              </div>
              <div className="nav-item" onClick={() => { setCurrentPage('settings'); setProfileMenuOpen(false); }}>
                <Icon name="settings" /> Settings
              </div>
            </div>
          </div>
        )}
      </div>

    </header>
  );
}
