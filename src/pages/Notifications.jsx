import React from 'react';
import Icon from '../components/Icon';

export default function Notifications() {
  const announcements = [
    { i: 'spark', c: 'brand', t: 'Q3 Townhall Meeting Scheduled', p: 'Join us next Thursday for the quarterly update. Check calendar for details.', time: '2 hours ago' },
    { i: 'star', c: 'gold', t: 'Welcome to the team, Sarah!', p: 'Sarah joins us as the new Lead Designer. Drop by her desk to say hi.', time: 'Yesterday' },
    { i: 'file', c: 'sky', t: 'New Expense Policy Updated', p: 'Please review the latest travel and meal reimbursement limits.', time: '3 days ago' },
    { i: 'clock', c: 'coral', t: 'Office Maintenance Notice', p: 'The 4th floor pantry will be closed for repairs this weekend.', time: 'Last week' },
    { i: 'employees', c: 'sage', t: 'Annual Leave Rollover', p: 'Reminder: Unused leave days must be used by end of Q4.', time: '2 weeks ago' }
  ];

  return (
    <div className="stagger">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '18px' }}>
        <button className="btn primary">
          <Icon name="spark" /> AI: Draft announcement
        </button>
      </div>
      
      <div className="grid" style={{ gap: '14px', gridTemplateColumns: '1fr' }}>
        {announcements.map((a, i) => (
          <div key={i} className="ann" style={{ animationDelay: `${i * 70}ms` }}>
            <div 
              className="ai-ic" 
              style={{ 
                background: `var(--${a.c}-soft)`, 
                color: `var(--${a.c === 'brand' ? 'brand' : a.c})` 
              }}
            >
              <Icon name={a.i} />
            </div>
            <div style={{ flex: 1 }}>
              <h4>{a.t}</h4>
              <p>{a.p}</p>
              <div className="at">Posted by Carla Sanford · {a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
