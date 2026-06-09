import React, { useState } from 'react';
import { Calendar, Megaphone, Trash2, Check, CheckCircle, Bell, Clock } from 'lucide-react';

export default function Notifications({ notifications, markAllNotificationsAsRead, markNotificationAsRead, deleteNotification }) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'all') return true;
    return notif.type === activeTab;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 lg:pb-0">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-sm text-slate-500 mt-1">View and manage your full notification history.</p>
        </div>
        <div className="flex items-center gap-2">
          {notifications.some(n => !n.isRead) && (
            <button 
              onClick={markAllNotificationsAsRead}
              className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
            >
              <CheckCircle size={16} className="text-emerald-600" />
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex border-b border-slate-200">
        <TabButton 
          active={activeTab === 'all'} 
          onClick={() => setActiveTab('all')} 
          label="All" 
          count={notifications.length}
        />
        <TabButton 
          active={activeTab === 'leave'} 
          onClick={() => setActiveTab('leave')} 
          label="Leave Requests" 
          count={notifications.filter(n => n.type === 'leave').length}
        />
        <TabButton 
          active={activeTab === 'policy'} 
          onClick={() => setActiveTab('policy')} 
          label="Policy Updates" 
          count={notifications.filter(n => n.type === 'policy').length}
        />
      </div>

      {/* Notification List Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center min-h-[300px]">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
              <Bell size={28} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">All caught up!</h2>
            <p className="text-sm text-slate-500 max-w-sm">
              No new notifications in this category.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredNotifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors hover:bg-slate-50/55 ${!notif.isRead ? 'bg-primary/[0.01]' : ''}`}
              >
                <div className="flex items-start gap-4 flex-1">
                  {/* Icon Badge */}
                  <div className={`p-2.5 rounded-xl flex-shrink-0 ${
                    notif.type === 'leave' 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-blue-50 text-blue-600'
                  }`}>
                    {notif.type === 'leave' ? <Calendar size={20} /> : <Megaphone size={20} />}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5">
                      <span className="text-sm font-semibold text-slate-900">
                        {notif.title}
                      </span>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-400 font-medium mt-2">
                      <Clock size={12} />
                      <span>{notif.time}</span>
                    </div>
                  </div>
                </div>

                {/* Individual Actions */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {!notif.isRead ? (
                    <button 
                      onClick={() => markNotificationAsRead(notif.id)}
                      title="Mark as read"
                      className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Check size={16} />
                    </button>
                  ) : (
                    <span className="p-1.5 text-slate-300 pointer-events-none">
                      <CheckCircle size={16} className="text-emerald-500/60" />
                    </span>
                  )}
                  <button 
                    onClick={() => deleteNotification(notif.id)}
                    title="Delete notification"
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label, count }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3.5 text-sm font-semibold border-b-2 transition-all cursor-pointer relative ${
        active 
          ? 'border-primary text-primary' 
          : 'border-transparent text-slate-500 hover:text-slate-900'
      }`}
    >
      <span className="flex items-center gap-2">
        {label}
        {count > 0 && (
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
            active ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
          }`}>
            {count}
          </span>
        )}
      </span>
    </button>
  );
}
