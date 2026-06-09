import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, ChevronDown, User, Settings, HelpCircle, Globe, LogOut, Calendar, Megaphone } from 'lucide-react';

export default function Topbar({ setCurrentPage, notifications = [], markAllNotificationsAsRead, markNotificationAsRead }) {
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
    <header className="bg-white h-16 flex items-center justify-between px-4 lg:px-8 border-b border-slate-100 z-40 shadow-sm flex-shrink-0">
      <div className="flex items-center gap-4 lg:w-60 flex-shrink-0">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
          24
        </div>
        <span className="font-bold text-lg tracking-tight">24Loops <span className="hidden lg:inline text-primary">HR</span></span>
      </div>

      <div className="hidden lg:flex items-center bg-slate-50 px-4 py-2 rounded-full w-96 border border-slate-100 focus-within:border-primary/30 transition-colors">
        <Search className="text-slate-400 w-4 h-4 mr-2" />
        <input type="text" placeholder="Search for actions or people..." className="bg-transparent border-none outline-none w-full text-sm text-slate-700 placeholder-slate-400" />
      </div>

      <div className="flex items-center gap-4 lg:gap-6 relative">
        <button className="lg:hidden text-slate-600">
          <Search size={20} />
        </button>
        
        {/* Notification Dropdown Container */}
        <div className="relative" ref={notificationsRef}>
          <button 
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileMenuOpen(false);
            }}
            className="relative text-slate-600 hover:text-primary transition-colors focus:outline-none cursor-pointer"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center border border-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="fixed top-16 left-4 right-4 md:absolute md:top-auto md:left-auto md:right-0 md:mt-3 md:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Notifications</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={() => {
                      markAllNotificationsAsRead();
                    }}
                    className="text-xs font-semibold text-primary hover:text-blue-800 transition-colors cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              
              {/* List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-sm text-slate-500">
                    All caught up! No notifications.
                  </div>
                ) : (
                  notifications.slice(0, 5).map((notif) => (
                    <div 
                      key={notif.id}
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                      }}
                      className={`p-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer ${!notif.isRead ? 'bg-primary/[0.01]' : ''}`}
                    >
                      <div className={`p-2 rounded-lg ${
                        notif.type === 'leave' 
                          ? 'bg-emerald-50 text-emerald-600' 
                          : 'bg-blue-50 text-blue-600'
                      } flex-shrink-0`}>
                        {notif.type === 'leave' ? <Calendar size={16} /> : <Megaphone size={16} />}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-slate-700 leading-normal">
                          <span className="font-semibold text-slate-900">{notif.title}</span>
                          <span> — {notif.message}</span>
                          <span className="text-[10px] text-slate-400 font-medium block mt-1">({notif.time})</span>
                        </div>
                      </div>
                      
                      {!notif.isRead && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                  ))
                )}
              </div>
              
              {/* Footer */}
              <button 
                onClick={() => {
                  setCurrentPage('notifications');
                  setNotificationsOpen(false);
                }}
                className="w-full text-center py-3 text-xs font-bold text-primary hover:text-blue-900 border-t border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                View All Notifications
              </button>
            </div>
          )}
        </div>
        
        {/* Profile Dropdown Container */}
        <div className="relative" ref={profileRef}>
          <div 
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="hidden lg:flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1.5 rounded-full transition-colors"
          >
            <img src="/shah_zaib_avatar.png" alt="Profile" className="w-8 h-8 rounded-full object-cover shadow-sm" />
            <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${profileMenuOpen ? 'rotate-180' : ''}`} />
          </div>
          <button 
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="lg:hidden text-slate-600 block focus:outline-none"
          >
            <img src="/shah_zaib_avatar.png" alt="Profile" className="w-8 h-8 rounded-full object-cover shadow-sm" />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden">
              
              {/* 1. Contextual Identity & Session Metadata */}
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <img src="/shah_zaib_avatar.png" alt="Profile" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-tight">Shah Zaib Kazmi</h4>
                    <p className="text-[10px] font-medium text-slate-500 font-mono bg-slate-200/50 px-1.5 py-0.5 rounded mt-1.5 inline-block border border-slate-200">ID: 69e1de1dc494d728359309d1</p>
                  </div>
                </div>
              </div>

              {/* 2. Navigational Profile Routing & Quick Actions */}
              <div className="p-2 border-b border-slate-100">
                <DropdownItem 
                  icon={<User size={16} />} 
                  label="My Profile" 
                  onClick={() => {
                    setCurrentPage('profile');
                    setProfileMenuOpen(false);
                  }}
                />
                <DropdownItem 
                  icon={<Bell size={16} />} 
                  label="Notifications" 
                  onClick={() => {
                    setCurrentPage('notifications');
                    setProfileMenuOpen(false);
                  }}
                />
                <DropdownItem 
                  icon={<Settings size={16} />} 
                  label="Settings" 
                  onClick={() => {
                    setCurrentPage('settings');
                    setProfileMenuOpen(false);
                  }}
                />
                <DropdownItem 
                  icon={<HelpCircle size={16} />} 
                  label="Help" 
                  onClick={() => {
                    setCurrentPage('help');
                    setProfileMenuOpen(false);
                  }}
                />
              </div>

              {/* 3. Localization & Session Termination Utilities */}
              <div className="p-2 flex items-center justify-between bg-slate-50/30">
                <div className="relative flex items-center">
                  <Globe size={16} className="text-slate-400 absolute left-2 pointer-events-none" />
                  <select className="pl-8 pr-6 py-1.5 bg-transparent text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg appearance-none cursor-pointer outline-none transition-colors">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                  <ChevronDown size={14} className="text-slate-400 absolute right-2 pointer-events-none" />
                </div>
                
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-lg transition-colors">
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function DropdownItem({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center w-full gap-3 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors cursor-pointer">
      <span className="text-slate-400">{icon}</span>
      {label}
    </button>
  );
}
