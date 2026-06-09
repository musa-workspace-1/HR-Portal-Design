import React, { useState } from 'react';
import Icon from '../components/Icon';

export default function Settings() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [aiDigest, setAiDigest] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    const h = document.documentElement;
    h.setAttribute('data-theme', !darkTheme ? 'dark' : 'light');
  };

  return (
    <div className="grid" style={{ gridTemplateColumns: '1fr 2fr' }}>
      <div className="panel" style={{ textAlign: 'center' }}>
        <div className="av" style={{ width: '84px', height: '84px', fontSize: '30px', margin: '0 auto', background: 'linear-gradient(135deg, #c79a3a, #bd7942)' }}>
          CS
        </div>
        <h3 style={{ fontFamily: 'var(--display)', fontSize: '20px', marginTop: '14px' }}>Carla Sanford</h3>
        <p style={{ fontSize: '13px', color: 'var(--ink-3)' }}>HR Director · People Ops</p>
        <div style={{ marginTop: '14px' }}>
          <span className="pill green"><span className="dotc"></span>Active</span>{' '}
          <span className="pill brand">Admin</span>
        </div>
        <button className="btn ghost" style={{ width: '100%', marginTop: '16px' }}>Change Photo</button>
      </div>
      
      <div className="panel">
        <div className="sec-head"><h3>Profile Settings</h3></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <div className="field"><label>Full Name</label><input defaultValue="Carla Sanford" /></div>
          <div className="field"><label>Email</label><input defaultValue="carla@24loops.co" /></div>
          <div className="field"><label>Department</label><input defaultValue="People Operations" /></div>
          <div className="field"><label>Job Title</label><input defaultValue="HR Director" /></div>
        </div>
        
        <div className="sec-head" style={{ marginTop: '10px' }}><h3 style={{ fontSize: '15px' }}>Preferences</h3></div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderTop: '1px solid var(--line-2)' }}>
          <span style={{ fontSize: '13.5px', fontWeight: '600' }}>Email notifications</span>
          <div 
            onClick={() => setEmailNotifs(!emailNotifs)} 
            className={emailNotifs ? 'on' : ''} 
            style={{ width: '44px', height: '25px', borderRadius: '20px', background: emailNotifs ? 'var(--brand)' : 'var(--line)', position: 'relative', cursor: 'pointer', transition: '.2s' }}
          >
            <span style={{ position: 'absolute', top: '3px', left: emailNotifs ? '22px' : '3px', width: '19px', height: '19px', borderRadius: '50%', background: '#fff', transition: '.2s', boxShadow: 'var(--shadow-sm)' }}></span>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderTop: '1px solid var(--line-2)' }}>
          <span style={{ fontSize: '13.5px', fontWeight: '600' }}>AI weekly digest</span>
          <div 
            onClick={() => setAiDigest(!aiDigest)} 
            className={aiDigest ? 'on' : ''} 
            style={{ width: '44px', height: '25px', borderRadius: '20px', background: aiDigest ? 'var(--brand)' : 'var(--line)', position: 'relative', cursor: 'pointer', transition: '.2s' }}
          >
            <span style={{ position: 'absolute', top: '3px', left: aiDigest ? '22px' : '3px', width: '19px', height: '19px', borderRadius: '50%', background: '#fff', transition: '.2s', boxShadow: 'var(--shadow-sm)' }}></span>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderTop: '1px solid var(--line-2)' }}>
          <span style={{ fontSize: '13.5px', fontWeight: '600' }}>Dark mode</span>
          <div 
            onClick={toggleTheme} 
            className={darkTheme ? 'on' : ''} 
            style={{ width: '44px', height: '25px', borderRadius: '20px', background: darkTheme ? 'var(--brand)' : 'var(--line)', position: 'relative', cursor: 'pointer', transition: '.2s' }}
          >
            <span style={{ position: 'absolute', top: '3px', left: darkTheme ? '22px' : '3px', width: '19px', height: '19px', borderRadius: '50%', background: '#fff', transition: '.2s', boxShadow: 'var(--shadow-sm)' }}></span>
          </div>
        </div>
        
        <button className="btn primary" style={{ marginTop: '16px' }} onClick={() => alert('Settings saved')}>
          <Icon name="check" /> Save Changes
        </button>
      </div>
    </div>
  );
}
