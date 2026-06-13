import React, { useState, useEffect } from 'react';
import { 
  User, Briefcase, Key, Shield, 
  Upload, Trash2, CheckCircle2, Lock, Building, Save
} from 'lucide-react';

export default function Profile() {
  // Profile Info State
  const [fullName, setFullName] = useState('Shah Zaib Kazmi');
  const [email, setEmail] = useState('shahzaib.kazmi@24loops.com');
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [jobTitle, setJobTitle] = useState('HR Director');

  // Static/Committed state to feed read-only system records at the bottom
  const [committedInfo, setCommittedInfo] = useState({
    fullName: 'Shah Zaib Kazmi',
    email: 'shahzaib.kazmi@24loops.com',
    phone: '+1 (555) 019-2834',
    jobTitle: 'HR Director'
  });

  // Avatar Upload, Crop, Zoom State
  const [avatarUrl, setAvatarUrl] = useState('/shah_zaib_avatar.png');
  const [zoom, setZoom] = useState(1);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isCroppingOpen, setIsCroppingOpen] = useState(false);
  const [tempFileUrl, setTempFileUrl] = useState(null);

  // Security Credentials state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Toast State
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleProfileSave = (e) => {
    e.preventDefault();
    setCommittedInfo({
      fullName,
      email,
      phone,
      jobTitle
    });
    triggerToast('Profile information saved successfully!');
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      triggerToast('Error: Passwords do not match!');
      return;
    }
    triggerToast('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      triggerToast('Error: Maximum file size is 5 MB!');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setTempFileUrl(reader.result);
      setZoom(1);
      setDragOffset({ x: 0, y: 0 });
      setIsCroppingOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const saveCroppedPhoto = () => {
    setAvatarUrl(tempFileUrl);
    setIsCroppingOpen(false);
    triggerToast('Profile photo updated successfully!');
  };

  const deletePhoto = () => {
    setAvatarUrl('https://i.pravatar.cc/150?u=empty');
    triggerToast('Profile photo removed.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
      
      {/* Toast Alert */}
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '16px',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          background: toastMessage.startsWith('Error') ? 'var(--coral)' : 'var(--sage)',
          color: '#fff',
          fontWeight: '600',
          fontSize: '14px',
          transition: 'all 0.3s'
        }}>
          <CheckCircle2 size={20} />
          <span>{toastMessage}</span>
        </div>
      )}


      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        
        {/* Left Card: Status & Photo Management */}
        <div style={{ flex: '1', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Identity Card */}
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            
            {/* Avatar Container */}
            <div style={{ 
              position: 'relative', width: '112px', height: '112px', borderRadius: '50%', overflow: 'hidden', 
              border: '4px solid var(--surface-1)', boxShadow: '0 0 0 1px var(--line)', background: 'var(--surface-2)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              <img 
                src={avatarUrl} 
                alt="Avatar" 
                style={{ 
                  transform: `scale(${zoom}) translate(${dragOffset.x}px, ${dragOffset.y}px)`,
                  transition: 'transform 0.1s ease-out',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            <h3 style={{ fontWeight: '800', color: 'var(--ink)', fontSize: '16px', marginTop: '16px' }}>{fullName}</h3>
            <p style={{ fontSize: '12px', color: 'var(--ink-2)', fontWeight: '600', marginTop: '2px' }}>{jobTitle}</p>

            {/* Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '16px', width: '100%' }}>
              <span className="pill green">ACTIVE</span>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: '700', color: 'var(--ink-3)', marginTop: '4px' }}>
                <Shield size={12} style={{ color: 'var(--brand)' }} />
                <span>Email verified</span>
              </div>
            </div>

            {/* Last Login Tracking */}
            <div style={{ borderTop: '1px solid var(--line)', width: '100%', marginTop: '20px', paddingTop: '16px', textAlign: 'left', fontSize: '11px', color: 'var(--ink-3)' }}>
              <span style={{ fontWeight: '600', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '8px', marginBottom: '2px' }}>Last Session</span>
              <span style={{ fontWeight: '700', color: 'var(--ink-2)', display: 'block' }}>5/23/2026, 9:39:27 AM</span>
            </div>

          </div>

          {/* Photo Management Box */}
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '12px', fontWeight: '700', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Profile Photo</h4>
            
            {/* Upload Area */}
            <label style={{
              border: '2px dashed var(--line)',
              background: 'var(--surface-2)',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'border-color 0.2s'
            }}>
              <Upload size={20} style={{ color: 'var(--ink-3)', marginBottom: '8px' }} />
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--ink)' }}>Upload new image</span>
              <span style={{ fontSize: '10px', color: 'var(--ink-3)', marginTop: '4px' }}>JPEG, PNG, WebP or GIF (max 5 MB)</span>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }} 
              />
            </label>

            {/* Crop/Zoom Panel (Conditional) */}
            {isCroppingOpen && tempFileUrl && (
              <div style={{ padding: '12px', background: 'var(--surface-2)', borderRadius: '12px', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--ink-2)' }}>Crop & Zoom Tool</div>
                
                {/* Visual Circle Overlay Preview */}
                <div style={{ width: '96px', height: '96px', margin: '0 auto', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--brand)', background: 'var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={tempFileUrl} 
                    alt="Temp preview"
                    style={{ transform: `scale(${zoom})`, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.1s' }} 
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: '700', color: 'var(--ink-3)', textTransform: 'uppercase' }}>
                    <span>Zoom</span>
                    <span>{zoom.toFixed(1)}x</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="3" 
                    step="0.1" 
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={saveCroppedPhoto}
                    className="btn primary"
                    style={{ flex: 1, padding: '6px', fontSize: '10px' }}
                  >
                    Apply Crop
                  </button>
                  <button 
                    onClick={() => { setIsCroppingOpen(false); setTempFileUrl(null); }}
                    className="btn"
                    style={{ flex: 1, padding: '6px', fontSize: '10px' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <button 
              onClick={deletePhoto}
              className="btn"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px', color: 'var(--coral)', borderColor: 'var(--line)' }}
            >
              <Trash2 size={14} />
              Delete Current Photo
            </button>
          </div>

        </div>

        {/* Right Section: Profile Form & Security */}
        <div style={{ flex: '2', minWidth: '400px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Edit Profile Form */}
          <div className="panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--ink)', paddingBottom: '12px', borderBottom: '1px solid var(--line)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={20} style={{ color: 'var(--brand)' }} />
              Directory Information
            </h2>
            
            <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div className="field">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label>Personal Phone</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label>Job Title</label>
                  <input 
                    type="text" 
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px' }}>
                <button 
                  type="submit"
                  className="btn primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Save size={16} />
                  Save Profile
                </button>
              </div>
            </form>

          </div>

          {/* Security & Password Management */}
          <div className="panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--ink)', paddingBottom: '12px', borderBottom: '1px solid var(--line)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={20} style={{ color: 'var(--brand)' }} />
              Credentials & Access
            </h2>
            
            <form onSubmit={handlePasswordUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
                <div className="field">
                  <label>Current Password</label>
                  <input 
                    type="password" 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="field">
                  <label>New Password</label>
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="field">
                  <label>Confirm Password</label>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px' }}>
                <button 
                  type="submit"
                  className="btn"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' }}
                >
                  <Key size={16} />
                  Update password
                </button>
              </div>
            </form>

          </div>

        </div>

      </div>

      {/* Read-Only System HR Records */}
      <div className="panel" style={{ background: 'var(--surface-2)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--ink)', paddingBottom: '6px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={20} style={{ color: 'var(--brand)' }} />
            Official HR System Records
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--ink-2)', marginTop: '4px' }}>These values are locked and managed by the global HR administration group.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          {/* Read-only Personal Records */}
          <div style={{ background: 'var(--surface-1)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '700', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={14} style={{ color: 'var(--ink-3)' }} />
              Personal Details
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <RecordRow label="Full Name" value={committedInfo.fullName} />
              <RecordRow label="Email Address" value={committedInfo.email} />
              <RecordRow label="Personal Phone" value={committedInfo.phone} />
            </div>
          </div>

          {/* Read-only Employment Details */}
          <div style={{ background: 'var(--surface-1)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '700', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Briefcase size={14} style={{ color: 'var(--ink-3)' }} />
              Employment Details
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <RecordRow label="Employee ID" value="69e1de1dc494d728359309d1" isMono />
              <RecordRow label="Job Title" value={committedInfo.jobTitle} />
              <RecordRow label="Department" value="Human Resources" />
              <RecordRow label="Company Name" value="24Loops HR" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

function RecordRow({ label, value, isMono }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', fontSize: '12px' }}>
      <span style={{ color: 'var(--ink-3)', fontWeight: '600' }}>{label}</span>
      <span style={{ 
        fontWeight: '700', 
        color: 'var(--ink)', 
        ...(isMono ? { fontFamily: 'monospace', fontSize: '10px', background: 'var(--surface-2)', border: '1px solid var(--line)', padding: '2px 6px', borderRadius: '4px' } : {}) 
      }}>
        {value}
      </span>
    </div>
  );
}
