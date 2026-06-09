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
    <div className="max-w-4xl mx-auto space-y-6 pb-24 lg:pb-0 relative">
      
      {/* Toast Alert */}
      {showToast && (
        <div className={`fixed top-20 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-in fade-in slide-in-from-top-4 duration-305 ${
          toastMessage.startsWith('Error') 
            ? 'bg-rose-600 text-white border-rose-500' 
            : 'bg-emerald-600 text-white border-emerald-500'
        }`}>
          <CheckCircle2 size={20} />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your identity, personal details, and account credentials.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Card: Status & Photo Management */}
        <div className="md:col-span-1 space-y-6">
          
          {/* Identity Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col items-center text-center">
            
            {/* Avatar Container */}
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner group bg-slate-100 flex items-center justify-center">
              <img 
                src={avatarUrl} 
                alt="Avatar" 
                style={{ 
                  transform: `scale(${zoom}) translate(${dragOffset.x}px, ${dragOffset.y}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="font-extrabold text-slate-950 text-base mt-4">{fullName}</h3>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">{jobTitle}</p>

            {/* Badges */}
            <div className="flex flex-col items-center gap-2 mt-4 w-full">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                ACTIVE
              </span>
              
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 mt-1">
                <Shield size={12} className="text-primary" />
                <span>Email verified</span>
              </div>
            </div>

            {/* Last Login Tracking */}
            <div className="border-t border-slate-100 w-full mt-5 pt-4 text-left text-[11px] text-slate-400 space-y-0.5">
              <span className="font-semibold block uppercase tracking-wider text-[8px] text-slate-400">Last Session</span>
              <span className="font-bold text-slate-600 block">5/23/2026, 9:39:27 AM</span>
            </div>

          </div>

          {/* Photo Management Box */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Profile Photo</h4>
            
            {/* Upload Area */}
            <label className="border-2 border-dashed border-slate-200 hover:border-primary/50 bg-slate-50/50 hover:bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors text-center">
              <Upload size={20} className="text-slate-400 mb-2" />
              <span className="text-xs font-bold text-slate-700">Upload new image</span>
              <span className="text-[10px] text-slate-400 mt-1">JPEG, PNG, WebP or GIF (max 5 MB)</span>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="hidden" 
              />
            </label>

            {/* Crop/Zoom Panel (Conditional) */}
            {isCroppingOpen && tempFileUrl && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                <div className="text-[11px] font-bold text-slate-600">Crop & Zoom Tool</div>
                
                {/* Visual Circle Overlay Preview */}
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-primary bg-slate-200 flex items-center justify-center">
                  <img 
                    src={tempFileUrl} 
                    alt="Temp preview"
                    style={{ transform: `scale(${zoom})` }}
                    className="w-full h-full object-cover transition-transform duration-100" 
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
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
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={saveCroppedPhoto}
                    className="flex-1 py-1.5 bg-primary hover:opacity-90 text-white rounded-lg text-[10px] font-bold shadow-xs cursor-pointer"
                  >
                    Apply Crop
                  </button>
                  <button 
                    onClick={() => { setIsCroppingOpen(false); setTempFileUrl(null); }}
                    className="flex-1 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-lg text-[10px] font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <button 
              onClick={deletePhoto}
              className="w-full flex items-center justify-center gap-2 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-rose-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <Trash2 size={14} />
              Delete Current Photo
            </button>
          </div>

        </div>

        {/* Right Section: Profile Form & Security */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Edit Profile Form */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 pb-1.5 border-b border-slate-100 mb-5 flex items-center gap-2">
              <User size={20} className="text-primary" />
              Directory Information
            </h2>
            
            <form onSubmit={handleProfileSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Personal Phone</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Job Title</label>
                  <input 
                    type="text" 
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:opacity-90 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                >
                  <Save size={16} />
                  Save Profile
                </button>
              </div>
            </form>

          </div>

          {/* Security & Password Management */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 pb-1.5 border-b border-slate-100 mb-5 flex items-center gap-2">
              <Lock size={20} className="text-primary" />
              Credentials & Access
            </h2>
            
            <form onSubmit={handlePasswordUpdate} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Password</label>
                  <input 
                    type="password" 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Password</label>
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Confirm Password</label>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer"
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
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 pb-1.5 border-b border-slate-200 flex items-center gap-2">
            <Building size={20} className="text-primary" />
            Official HR System Records
          </h2>
          <p className="text-xs text-slate-500 mt-1">These values are locked and managed by the global HR administration group.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Read-only Personal Records */}
          <div className="bg-white border border-slate-200/50 rounded-xl p-5 space-y-4 shadow-2xs">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <User size={14} className="text-slate-400" />
              Personal Details
            </h3>
            
            <div className="space-y-3">
              <RecordRow label="Full Name" value={committedInfo.fullName} />
              <RecordRow label="Email Address" value={committedInfo.email} />
              <RecordRow label="Personal Phone" value={committedInfo.phone} />
            </div>
          </div>

          {/* Read-only Employment Details */}
          <div className="bg-white border border-slate-200/50 rounded-xl p-5 space-y-4 shadow-2xs">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase size={14} className="text-slate-400" />
              Employment Details
            </h3>
            
            <div className="space-y-3">
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
    <div className="flex justify-between items-center gap-4 text-xs">
      <span className="text-slate-400 font-semibold">{label}</span>
      <span className={`font-bold text-slate-800 ${isMono ? 'font-mono text-[10px] bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded' : ''}`}>
        {value}
      </span>
    </div>
  );
}
