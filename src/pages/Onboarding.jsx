import React, { useState } from 'react';
import Icon from '../components/Icon';

export default function Onboarding() {
  const [tasks, setTasks] = useState([
    { label: 'Sign employment contract', done: true, dept: 'HR' },
    { label: 'Complete tax & banking forms', done: true, dept: 'Finance' },
    { label: 'Set up company accounts', done: true, dept: 'IT' },
    { label: 'Order laptop & equipment', done: true, dept: 'IT' },
    { label: 'Schedule team intros', done: false, dept: 'Manager' },
    { label: 'Security training', done: false, dept: 'HR' },
    { label: 'Review handbook', done: false, dept: 'HR' },
    { label: 'Add to payroll', done: false, dept: 'Finance' }
  ]);

  const doneCount = tasks.filter(t => t.done).length;
  const progress = Math.round((doneCount / tasks.length) * 100);

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const circumference = 2 * Math.PI * 34;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="stagger">
      <div className="grid" style={{ gridTemplateColumns: '1fr 2fr' }}>
        <div className="panel" style={{ textAlign: 'center' }}>
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <div className="ring-wrap">
              <svg width="84" height="84" viewBox="0 0 84 84">
                <circle cx="42" cy="42" r="34" fill="none" stroke="var(--brand-2)" strokeWidth="6" opacity="0.3" />
                <circle 
                  cx="42" cy="42" r="34" 
                  fill="none" 
                  stroke="var(--brand)" 
                  strokeWidth="6" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={strokeDashoffset} 
                  strokeLinecap="round" 
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.8s ease-out' }} 
                />
              </svg>
              <div className="ring-text" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <b style={{ display: 'block', fontSize: '18px', fontFamily: 'var(--display)' }}>{progress}%</b>
                <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--ink-3)' }}>complete</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '14px' }}>
            <div className="av" style={{ width: '56px', height: '56px', fontSize: '20px', margin: '0 auto', background: 'var(--surface-3)', color: 'var(--ink-2)' }}>ES</div>
          </div>
          <h3 style={{ fontFamily: 'var(--display)', fontSize: '18px', marginTop: '10px' }}>Eva Schmidt</h3>
          <p style={{ fontSize: '12.5px', color: 'var(--ink-3)' }}>Frontend Engineer · Starts June 16</p>
          <button className="btn ghost" style={{ width: '100%', marginTop: '16px' }}>
            <Icon name="spark" /> AI: Draft welcome email
          </button>
        </div>
        
        <div className="panel">
          <div className="sec-head"><h3>Onboarding Checklist</h3></div>
          {tasks.map((t, i) => (
            <div 
              key={i} 
              className={`check-item ${t.done ? 'done' : ''}`} 
              onClick={() => toggleTask(i)}
              style={{ cursor: 'pointer' }}
            >
              <div className="check-box"><Icon name="check" /></div>
              <span className="ct">{t.label}</span>
              <span className="pill gray" style={{ marginLeft: 'auto' }}>{t.dept}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
