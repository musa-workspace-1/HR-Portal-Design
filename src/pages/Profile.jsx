import React, { useState, useEffect } from 'react';
import Icon from '../components/Icon';

export default function Profile() {
  const [fullName, setFullName] = useState('Shah Zaib Kazmi');
  const [email, setEmail] = useState('shahzaib.kazmi@24loops.com');
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [jobTitle, setJobTitle] = useState('HR Director');

  const [committedInfo, setCommittedInfo] = useState({
    fullName: 'Shah Zaib Kazmi',
    email: 'shahzaib.kazmi@24loops.com',
    phone: '+1 (555) 019-2834',
    jobTitle: 'HR Director'
  });

  const [avatarUrl, setAvatarUrl] = useState('/shah_zaib_avatar.png');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleProfileSave = (e) => {
    e.preventDefault();
    setCommittedInfo({ fullName, email, phone, jobTitle });
    triggerToast('Profile information saved successfully!');
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      triggerToast('Error: Passwords do not match!');
      return;
    }
    triggerToast('Password updated successfully!');
    setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
  };

  return (
    <div className="stagger">
      <div className="sec-head">
        <h3>My Profile</h3>
        <p style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Manage your identity, personal details, and account credentials.</p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        
        {/* Left Card: Status & Photo Management */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Identity Card */}
          <div className="panel" style={{ textAlign: 'center' }}>
            <div className="av" style={{ width: '90px', height: '90px', margin: '0 auto 16px', fontSize: '32px', background: 'var(--surface-3)', overflow: 'hidden' }}>
              <img src={avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{fullName}</h3>
            <p style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '4px' }}>{jobTitle}</p>
            <div style={{ marginTop: '16px' }}>
              <span className="pill green">Active</span>
            </div>
          </div>

          <div className="panel">
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--ink-3)', letterSpacing: '1px', marginBottom: '12px' }}>Profile Photo</h4>
            <div style={{ padding: '24px', border: '2px dashed var(--line)', borderRadius: '12px', textAlign: 'center', background: 'var(--surface-2)' }}>
              <Icon name="upload" style={{ color: 'var(--ink-3)', marginBottom: '8px' }} />
              <div style={{ fontSize: '12px', fontWeight: 700 }}>Upload new image</div>
              <div style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '4px' }}>JPEG, PNG (max 5MB)</div>
            </div>
          </div>

        </div>

        {/* Right Section: Profile Form & Security */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="panel">
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>Directory Information</h3>
            <form onSubmit={handleProfileSave}>
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className="field">
                  <label>Full Name</label>
                  <input value={fullName} onChange={e => setFullName(e.target.value)} required />
                </div>
                <div className="field">
                  <label>Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="field">
                  <label>Personal Phone</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>
                <div className="field">
                  <label>Job Title</label>
                  <input value={jobTitle} onChange={e => setJobTitle(e.target.value)} required />
                </div>
              </div>
              <div style={{ textAlign: 'right', marginTop: '12px' }}>
                <button type="submit" className="btn primary"><Icon name="check" /> Save Profile</button>
              </div>
            </form>
          </div>

          <div className="panel">
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>Credentials & Access</h3>
            <form onSubmit={handlePasswordUpdate}>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="field">
                  <label>Current Password</label>
                  <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
                </div>
                <div className="field">
                  <label>New Password</label>
                  <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                </div>
                <div className="field">
                  <label>Confirm Password</label>
                  <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                </div>
              </div>
              <div style={{ textAlign: 'right', marginTop: '12px' }}>
                <button type="submit" className="btn dark"><Icon name="lock" /> Update Password</button>
              </div>
            </form>
          </div>

          <div className="panel" style={{ background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>Official HR System Records</h3>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--ink-3)', letterSpacing: '1px', marginBottom: '12px' }}>Personal Details</h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <RecordRow label="Full Name" value={committedInfo.fullName} />
                  <RecordRow label="Email Address" value={committedInfo.email} />
                  <RecordRow label="Personal Phone" value={committedInfo.phone} />
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--ink-3)', letterSpacing: '1px', marginBottom: '12px' }}>Employment Details</h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <RecordRow label="Employee ID" value="69e1de1dc494d728359309d1" />
                  <RecordRow label="Job Title" value={committedInfo.jobTitle} />
                  <RecordRow label="Department" value="Human Resources" />
                  <RecordRow label="Company Name" value="24Loops HR" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {showToast && (
        <div className={`toast show`} style={{ background: toastMessage.startsWith('Error') ? 'var(--coral)' : 'var(--sage)' }}>
          <Icon name={toastMessage.startsWith('Error') ? 'alert' : 'check'} /> {toastMessage}
        </div>
      )}
    </div>
  );
}

function RecordRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
      <span style={{ color: 'var(--ink-3)' }}>{label}</span>
      <span style={{ fontWeight: 700 }}>{value}</span>
    </div>
  );
}
