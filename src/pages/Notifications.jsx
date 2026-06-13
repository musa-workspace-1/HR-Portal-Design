import React, { useState } from 'react';
import { Calendar, Megaphone, Trash2, Check, CheckCircle, Bell, Clock } from 'lucide-react';

export default function Notifications({ notifications, markAllNotificationsAsRead, markNotificationAsRead, deleteNotification }) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'all') return true;
    return notif.type === activeTab;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {notifications.some(n => !n.isRead) && (
            <button 
              onClick={markAllNotificationsAsRead}
              className="btn ghost"
              style={{ fontSize: '12px', padding: '8px 16px' }}
            >
              <CheckCircle size={16} style={{ color: 'var(--sage)' }} />
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="seg">
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
      <div className="panel" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {filteredNotifications.length === 0 ? (
          <div className="empty" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '64px', height: '64px', background: 'var(--surface-2)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid var(--line)' }}>
              <Bell size={28} style={{ color: 'var(--ink-3)' }} strokeWidth={1.5} />
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--ink)', marginBottom: '4px' }}>All caught up!</h2>
            <p style={{ fontSize: '13px', color: 'var(--ink-2)' }}>
              No new notifications in this category.
            </p>
          </div>
        ) : (
          <div>
            {filteredNotifications.map((notif, idx) => (
              <div 
                key={notif.id} 
                className="notif-item group"
                style={{ 
                  borderBottom: idx === filteredNotifications.length - 1 ? 'none' : '1px solid var(--line)',
                  background: !notif.isRead ? 'var(--brand-softer)' : 'transparent',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '16px',
                  padding: '16px 20px',
                  transition: 'background 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1 }}>
                  {/* Icon Badge */}
                  <div className="ni" style={{ 
                    background: notif.type === 'leave' ? 'var(--sage-soft)' : 'var(--sky-soft)',
                    color: notif.type === 'leave' ? 'var(--sage)' : 'var(--sky)',
                    width: '42px', height: '42px', borderRadius: '12px'
                  }}>
                    {notif.type === 'leave' ? <Calendar size={20} /> : <Megaphone size={20} />}
                  </div>
                  
                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '2px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--ink)' }}>
                        {notif.title}
                      </span>
                      {!notif.isRead && (
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--brand)', flexShrink: 0 }} />
                      )}
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: '1.5' }}>
                      {notif.message}
                    </p>
                    <div className="nt" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--ink-3)', fontWeight: '600', marginTop: '8px' }}>
                      <Clock size={12} />
                      <span>{notif.time}</span>
                    </div>
                  </div>
                </div>

                {/* Individual Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  {!notif.isRead ? (
                    <button 
                      onClick={(e) => { e.stopPropagation(); markNotificationAsRead(notif.id); }}
                      title="Mark as read"
                      style={{ padding: '6px', color: 'var(--ink-3)', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: '0.2s' }}
                      onMouseOver={(e) => { e.currentTarget.style.color = 'var(--sage)'; e.currentTarget.style.background = 'var(--sage-soft)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.color = 'var(--ink-3)'; e.currentTarget.style.background = 'transparent'; }}
                    >
                      <Check size={16} />
                    </button>
                  ) : (
                    <span style={{ padding: '6px', color: 'var(--ink-3)', opacity: 0.5, pointerEvents: 'none' }}>
                      <CheckCircle size={16} />
                    </span>
                  )}
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}
                    title="Delete notification"
                    style={{ padding: '6px', color: 'var(--ink-3)', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: '0.2s' }}
                    onMouseOver={(e) => { e.currentTarget.style.color = 'var(--coral)'; e.currentTarget.style.background = 'var(--coral-soft)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.color = 'var(--ink-3)'; e.currentTarget.style.background = 'transparent'; }}
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
      className={active ? 'active' : ''}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {label}
        {count > 0 && (
          <span style={{ 
            fontSize: '10px', 
            padding: '2px 6px', 
            borderRadius: '20px', 
            fontWeight: '800',
            background: active ? 'var(--brand)' : 'var(--surface)', 
            color: active ? '#fff' : 'var(--ink-3)',
            boxShadow: active ? 'none' : 'inset 0 1px 2px rgba(0,0,0,0.05)'
          }}>
            {count}
          </span>
        )}
      </span>
    </button>
  );
}
