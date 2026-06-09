import React, { useState, useEffect } from 'react';
import Icon from '../components/Icon';

export default function AttendanceDashboard() {
  const [time, setTime] = useState(new Date());
  const [clockedIn, setClockedIn] = useState(false);
  const [clockStatus, setClockStatus] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleClock = () => {
    if (!clockedIn) {
      setClockStatus('✓ Clocked in at ' + time.toLocaleTimeString('en-GB'));
    } else {
      setClockStatus('Session ended. Have a great day!');
    }
    setClockedIn(!clockedIn);
  };

  const employees = [
    { n: 'Carla Sanford', d: 'People Operations', ci: '08:58', h: '6.2h', st: 'present' },
    { n: 'Judy Abbott', d: 'Engineering', ci: '09:05', h: '6.6h', st: 'present' },
    { n: 'Martin Feeney', d: 'Sales', ci: '08:45', h: '7.0h', st: 'present' },
    { n: 'Ellen Streich', d: 'Design', ci: '—', h: '—', st: 'absent' },
    { n: 'Eva Schmidt', d: 'Engineering', ci: '09:12', h: '7.8h', st: 'present' },
    { n: 'Oliver Smith', d: 'Marketing', ci: '09:30', h: '8.2h', st: 'late' },
  ];

  return (
    <div className="stagger">
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', marginBottom: '18px' }}>
        <div className="clock-card">
          <div style={{ fontSize: '12px', color: '#9c9388', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Status</div>
          <div className="clock-time">{time.toLocaleTimeString('en-GB')}</div>
          <div className="clock-date">
            {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <button className="btn primary" onClick={toggleClock} style={{ marginTop: '20px' }}>
            <Icon name="clock" /> {clockedIn ? 'Clock Out' : 'Clock In'}
          </button>
          <div style={{ marginTop: '12px', fontSize: '12px', color: '#9c9388', fontWeight: '600' }}>
            {clockStatus}
          </div>
        </div>
        
        <div className="panel">
          <div style={{ fontSize: '12.5px', color: 'var(--ink-3)', fontWeight: '600' }}>Avg Check-in</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: '30px', fontWeight: '700', margin: '6px 0' }}>
            09:12 <small style={{ fontSize: '13px', color: 'var(--ink-3)' }}>AM</small>
          </div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: '78%' }}></div>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--ink-3)', marginTop: '8px', fontWeight: '600' }}>
            78% on time this week
          </div>
        </div>
        
        <div className="panel">
          <div style={{ fontSize: '12.5px', color: 'var(--ink-3)', fontWeight: '600' }}>Total Hours (Week)</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: '30px', fontWeight: '700', margin: '6px 0' }}>
            386<small style={{ fontSize: '13px', color: 'var(--ink-3)' }}>/450 hrs</small>
          </div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: '86%' }}></div>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--ink-3)', marginTop: '8px', fontWeight: '600' }}>
            86% of capacity
          </div>
        </div>
      </div>
      
      <div className="panel">
        <div className="sec-head">
          <h3>Today's Attendance Log</h3>
          <span className="pill green"><span className="dotc"></span>Live</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Clock In</th>
              <th>Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e, i) => (
              <tr key={i}>
                <td>
                  <div className="emp-cell">
                    <div className="av" style={{ background: 'var(--surface-3)', color: 'var(--ink-2)' }}>
                      {e.n.substring(0, 2)}
                    </div>
                    <div className="e-nm">{e.n}</div>
                  </div>
                </td>
                <td style={{ color: 'var(--ink-3)' }}>{e.d}</td>
                <td><b>{e.ci}</b></td>
                <td>{e.h === '—' ? '—' : <b>{e.h}</b>}</td>
                <td>
                  <span className={`pill ${e.st === 'present' ? 'green' : e.st === 'late' ? 'gold' : 'coral'}`}>
                    <span className="dotc"></span>{e.st.charAt(0).toUpperCase() + e.st.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
