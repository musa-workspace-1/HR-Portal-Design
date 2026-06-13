import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, ChevronDown, User, Settings, HelpCircle, Globe, LogOut, Calendar, Megaphone, Moon, Sun } from 'lucide-react';

export default function Topbar({ currentPage, setCurrentPage, notifications = [], markAllNotificationsAsRead, markNotificationAsRead, isDarkMode, toggleDarkMode }) {
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

  const formatTitle = (pageStr) => {
    if (!pageStr) return 'Dashboard';
    
    return pageStr
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const pageTitle = formatTitle(currentPage);

  return (
    <div className="topbar">
      <div className="page-title">
        <h2>{pageTitle}</h2>
        {currentPage === 'dashboard' && (
          <p style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '4px' }}>Welcome Back, Shah Zaib!</p>
        )}
      </div>

      <div className="search">
        <Search size={16} />
        <input type="text" placeholder="Search..." />
      </div>

      <button className="icon-btn" title="Toggle Theme" onClick={toggleDarkMode}>
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="relative" ref={notificationsRef}>
        <div 
          onClick={() => {
            setNotificationsOpen(!notificationsOpen);
            setProfileMenuOpen(false);
          }}
          className="icon-btn"
        >
          <Bell size={18} />
          {unreadCount > 0 && <div className="dot"></div>}
        </div>

        {notificationsOpen && (
          <div className="notif-panel show" style={{ position: 'absolute', top: '56px', right: '0' }}>
            <div className="notif-head">
              <h3>Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={() => markAllNotificationsAsRead()}
                  className="btn ghost" style={{ padding: '4px 8px', fontSize: '10px' }}
                >
                  Mark all read
                </button>
              )}
            </div>
            
            <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
              {notifications.length === 0 ? (
                <div className="empty">All caught up! No notifications.</div>
              ) : (
                notifications.slice(0, 5).map((notif) => (
                  <div 
                    key={notif.id}
                    onClick={() => markNotificationAsRead(notif.id)}
                    className="notif-item"
                  >
                    <div className="ni" style={{
                      background: notif.type === 'leave' ? 'var(--sage-soft)' : 'var(--sky-soft)',
                      color: notif.type === 'leave' ? 'var(--sage)' : 'var(--sky)'
                    }}>
                      {notif.type === 'leave' ? <Calendar size={16} /> : <Megaphone size={16} />}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <p><b>{notif.title}</b> — {notif.message}</p>
                      <div className="nt">{notif.time} {notif.isRead ? '' : '• New'}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div 
              onClick={() => { setCurrentPage('notifications'); setNotificationsOpen(false); }}
              style={{ padding: '12px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', color: 'var(--brand)', cursor: 'pointer', borderTop: '1px solid var(--line-2)' }}
            >
              View All Notifications
            </div>
          </div>
        )}
      </div>

      <div className="relative" ref={profileRef}>
        <div 
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          className="avatar-btn"
        >
          <div className="av" style={{background:'linear-gradient(135deg, var(--sky), #3a5c78)'}}>SK</div>
          <div className="nm">Shah Zaib</div>
          <ChevronDown size={14} color="var(--ink-3)" style={{ marginLeft: '-2px' }} />
        </div>

        {profileMenuOpen && (
          <div className="card" style={{ position: 'absolute', top: '56px', right: '0', width: '260px', zIndex: 100, padding: '12px' }}>
            <div style={{ paddingBottom: '12px', borderBottom: '1px solid var(--line)', marginBottom: '12px' }}>
              <h4 style={{ fontWeight: 'bold', fontSize: '14px', fontFamily: 'var(--display)' }}>Shah Zaib Kazmi</h4>
              <div style={{ fontSize: '11px', color: 'var(--ink-3)' }}>ID: 69e1de1dc494d728359309d1</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
              <DropdownItem 
                icon={<User size={16} />} 
                label="My Profile" 
                onClick={() => { setCurrentPage('profile'); setProfileMenuOpen(false); }}
              />
              <DropdownItem 
                icon={<Bell size={16} />} 
                label="Notifications" 
                onClick={() => { setCurrentPage('notifications'); setProfileMenuOpen(false); }}
              />
              <DropdownItem 
                icon={<Settings size={16} />} 
                label="Settings" 
                onClick={() => { setCurrentPage('settings'); setProfileMenuOpen(false); }}
              />
              <DropdownItem 
                icon={<HelpCircle size={16} />} 
                label="Help" 
                onClick={() => { setCurrentPage('help'); setProfileMenuOpen(false); }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '12px', color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Globe size={14} /> English
              </div>
              <button className="pill coral" style={{ border: 'none', cursor: 'pointer' }}>
                <LogOut size={12} /> Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DropdownItem({ icon, label, onClick }) {
  return (
    <div onClick={onClick} className="nav-item" style={{ padding: '8px 12px', margin: '0', fontSize: '13px' }}>
      {icon}
      <span>{label}</span>
    </div>
  );
}
