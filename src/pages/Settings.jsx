import React, { useState, useEffect } from 'react';
import { 
  Building2, Mail, Phone, MapPin, Save, Shield, Key, 
  Bell, Cpu, Sliders, UserCheck, HardDrive, CheckCircle2,
  ArrowUp, ArrowDown, Search
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('company');
  const [workflowType, setWorkflowType] = useState('onboarding'); // 'onboarding' or 'offboarding'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Company Form State
  const [companyName, setCompanyName] = useState('24Loops HR Ltd.');
  const [regNumber, setRegNumber] = useState('REG-2026-98765');
  const [taxId, setTaxId] = useState('VAT-987654321');
  const [industry, setIndustry] = useState('Information Technology');
  const [email, setEmail] = useState('hr@24loops.com');
  const [phone, setPhone] = useState('+1 (555) 240-6677');
  const [address, setAddress] = useState('100 Innovation Way, Suite 400, Tech District, San Francisco, CA 94107');

  // Preferences State
  const [defaultLanguage, setDefaultLanguage] = useState('English');
  const [timeZone, setTimeZone] = useState('UTC (Coordinated Universal Time)');
  const [dateFormat, setDateFormat] = useState('YYYY-MM-DD');
  const [currencyFormat, setCurrencyFormat] = useState('USD');

  // Success Toast State
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Settings saved successfully!');
  
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

  // Workflow Checklist State - Onboarding
  const [onboardingSteps, setOnboardingSteps] = useState([
    // Pre-joining
    { id: 'o-1', name: 'Offer letter signed', category: 'Pre-joining', mandatory: true, active: true },
    { id: 'o-2', name: 'Background verification', category: 'Pre-joining', mandatory: true, active: true },
    { id: 'o-3', name: 'Document collection', category: 'Pre-joining', mandatory: true, active: true },
    { id: 'o-4', name: 'Contract/employment agreement signed', category: 'Pre-joining', mandatory: true, active: true },
    { id: 'o-5', name: 'Reference check', category: 'Pre-joining', mandatory: false, active: false },
    { id: 'o-6', name: 'Medical/health fitness check', category: 'Pre-joining', mandatory: false, active: false },
    { id: 'o-7', name: 'Drug test', category: 'Pre-joining', mandatory: false, active: false },
    // Legal & compliance
    { id: 'o-8', name: 'Tax form submission', category: 'Legal & compliance', mandatory: true, active: false },
    { id: 'o-9', name: 'NDA/confidentiality agreement', category: 'Legal & compliance', mandatory: true, active: false },
    { id: 'o-10', name: 'Employee handbook acknowledgment', category: 'Legal & compliance', mandatory: true, active: false },
    { id: 'o-11', name: 'Code of conduct agreement', category: 'Legal & compliance', mandatory: true, active: false },
    { id: 'o-12', name: 'Anti-harassment policy training', category: 'Legal & compliance', mandatory: false, active: false },
    { id: 'o-13', name: 'Data protection/privacy consent', category: 'Legal & compliance', mandatory: false, active: false },
    { id: 'o-14', name: 'Social media policy acknowledgment', category: 'Legal & compliance', mandatory: false, active: false },
    // Payroll & benefits
    { id: 'o-15', name: 'Bank account/payroll setup', category: 'Payroll & benefits', mandatory: true, active: false },
    { id: 'o-16', name: 'Benefits enrollment', category: 'Payroll & benefits', mandatory: true, active: false },
    { id: 'o-17', name: 'Pension/retirement plan setup', category: 'Payroll & benefits', mandatory: false, active: false },
    { id: 'o-18', name: 'Employee stock options setup', category: 'Payroll & benefits', mandatory: false, active: false },
    { id: 'o-19', name: 'Leave policy briefing', category: 'Payroll & benefits', mandatory: false, active: false },
    // IT & system access
    { id: 'o-20', name: 'Company email account created', category: 'IT & system access', mandatory: true, active: false },
    { id: 'o-21', name: 'System access & permissions setup', category: 'IT & system access', mandatory: true, active: false },
    { id: 'o-22', name: 'Employee ID/access badge created', category: 'IT & system access', mandatory: true, active: false },
    { id: 'o-23', name: 'Equipment assignment', category: 'IT & system access', mandatory: true, active: false },
    { id: 'o-24', name: 'Software & tools access setup', category: 'IT & system access', mandatory: false, active: false },
    { id: 'o-25', name: 'VPN/remote access setup', category: 'IT & system access', mandatory: false, active: false },
    // Workspace & logistics
    { id: 'o-26', name: 'Workspace/desk assignment', category: 'Workspace & logistics', mandatory: true, active: false },
    { id: 'o-27', name: 'Parking/transport registration', category: 'Workspace & logistics', mandatory: false, active: false },
    { id: 'o-28', name: 'Canteen/cafeteria registration', category: 'Workspace & logistics', mandatory: false, active: false },
    { id: 'o-29', name: 'Locker assignment', category: 'Workspace & logistics', mandatory: false, active: false },
    { id: 'o-30', name: 'Building/office tour', category: 'Workspace & logistics', mandatory: false, active: false },
    // Orientation & training
    { id: 'o-31', name: 'Company orientation session', category: 'Orientation & training', mandatory: true, active: false },
    { id: 'o-32', name: 'Department introduction & meet team', category: 'Orientation & training', mandatory: true, active: false },
    { id: 'o-33', name: 'Role-specific training', category: 'Orientation & training', mandatory: true, active: false },
    { id: 'o-34', name: 'Health & safety induction', category: 'Orientation & training', mandatory: true, active: false },
    { id: 'o-35', name: 'IT/cybersecurity awareness training', category: 'Orientation & training', mandatory: true, active: false },
    { id: 'o-36', name: 'Emergency contact registration', category: 'Orientation & training', mandatory: true, active: false },
    { id: 'o-37', name: 'Buddy/mentor assignment', category: 'Orientation & training', mandatory: false, active: false },
    { id: 'o-38', name: 'Probation period setup & review dates', category: 'Orientation & training', mandatory: false, active: false },
    { id: 'o-39', name: '30-60-90 day performance plan', category: 'Orientation & training', mandatory: false, active: false }
  ]);

  // Workflow Checklist State - Offboarding
  const [offboardingSteps, setOffboardingSteps] = useState([
    // Pre-exit / Resignation notice
    { id: 'f-1', name: 'Resignation letter received', category: 'Pre-joining', mandatory: true, active: true },
    { id: 'f-2', name: 'Exit date negotiation completed', category: 'Pre-joining', mandatory: true, active: true },
    { id: 'f-3', name: 'Exit interview scheduled', category: 'Pre-joining', mandatory: true, active: true },
    { id: 'f-4', name: 'Formal acknowledgment sent', category: 'Pre-joining', mandatory: true, active: true },
    { id: 'f-5', name: 'Handover document template provided', category: 'Pre-joining', mandatory: false, active: false },
    { id: 'f-6', name: 'Clients notified of departure', category: 'Pre-joining', mandatory: false, active: false },
    { id: 'f-7', name: 'Team transition planning meeting', category: 'Pre-joining', mandatory: false, active: false },
    // Legal & compliance
    { id: 'f-8', name: 'Separation agreement signed', category: 'Legal & compliance', mandatory: true, active: false },
    { id: 'f-9', name: 'NDA obligations review', category: 'Legal & compliance', mandatory: true, active: false },
    { id: 'f-10', name: 'COBRA/health coverage options info', category: 'Legal & compliance', mandatory: true, active: false },
    { id: 'f-11', name: 'Pension/retirement options review', category: 'Legal & compliance', mandatory: true, active: false },
    { id: 'f-12', name: 'IP agreement review', category: 'Legal & compliance', mandatory: false, active: false },
    { id: 'f-13', name: 'Company data deletion certificate', category: 'Legal & compliance', mandatory: false, active: false },
    { id: 'f-14', name: 'Compliance checklist signed', category: 'Legal & compliance', mandatory: false, active: false },
    // Payroll & benefits
    { id: 'f-15', name: 'Final paycheck calculation', category: 'Payroll & benefits', mandatory: true, active: false },
    { id: 'f-16', name: 'Outstanding expense approvals', category: 'Payroll & benefits', mandatory: true, active: false },
    { id: 'f-17', name: 'Commission/bonus calculations', category: 'Payroll & benefits', mandatory: false, active: false },
    { id: 'f-18', name: 'Tax withholding adjustments', category: 'Payroll & benefits', mandatory: false, active: false },
    { id: 'f-19', name: 'Severance pay clearance', category: 'Payroll & benefits', mandatory: false, active: false },
    // IT deprovisioning
    { id: 'f-20', name: 'Active Directory account disabled', category: 'IT & system access', mandatory: true, active: false },
    { id: 'f-21', name: 'Google Workspace/email archived', category: 'IT & system access', mandatory: true, active: false },
    { id: 'f-22', name: 'Slack/communication seats revoked', category: 'IT & system access', mandatory: true, active: false },
    { id: 'f-23', name: 'Single Sign-On (SSO) tokens cleared', category: 'IT & system access', mandatory: true, active: false },
    { id: 'f-24', name: 'Laptop & mobile hardware wiped', category: 'IT & system access', mandatory: false, active: false },
    { id: 'f-25', name: 'External partner access removed', category: 'IT & system access', mandatory: false, active: false },
    // Workspace clearout
    { id: 'f-26', name: 'Desk/office locker emptied', category: 'Workspace & logistics', mandatory: true, active: false },
    { id: 'f-27', name: 'Access keys/fobs returned', category: 'Workspace & logistics', mandatory: false, active: false },
    { id: 'f-28', name: 'Company vehicle returned', category: 'Workspace & logistics', mandatory: false, active: false },
    { id: 'f-29', name: 'Parking pass deactivated', category: 'Workspace & logistics', mandatory: false, active: false },
    { id: 'f-30', name: 'Corporate credit cards destroyed', category: 'Workspace & logistics', mandatory: false, active: false },
    // Knowledge transfer & orientation
    { id: 'f-31', name: 'Task delegation finalized', category: 'Orientation & training', mandatory: true, active: false },
    { id: 'f-32', name: 'Client files transferred', category: 'Orientation & training', mandatory: true, active: false },
    { id: 'f-33', name: 'Team passwords updated/rotated', category: 'Orientation & training', mandatory: true, active: false },
    { id: 'f-34', name: 'Admin controls transferred', category: 'Orientation & training', mandatory: true, active: false },
    { id: 'f-35', name: 'Exit survey completed', category: 'Orientation & training', mandatory: true, active: false },
    { id: 'f-36', name: 'Manager exit briefing', category: 'Orientation & training', mandatory: true, active: false },
    { id: 'f-37', name: 'Final feedback meeting', category: 'Orientation & training', mandatory: false, active: false },
    { id: 'f-38', name: 'Farewell card/announcement', category: 'Orientation & training', mandatory: false, active: false },
    { id: 'f-39', name: 'Alumnus network registration', category: 'Orientation & training', mandatory: false, active: false }
  ]);

  const currentSteps = workflowType === 'onboarding' ? onboardingSteps : offboardingSteps;
  const setSteps = workflowType === 'onboarding' ? setOnboardingSteps : setOffboardingSteps;

  const handleToggleStep = (id) => {
    setSteps(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  // Bulk options
  const handleEnableAll = () => {
    setSteps(prev => prev.map(s => ({ ...s, active: true })));
    triggerToast(`All ${workflowType} steps enabled!`);
  };

  const handleMandatoryOnly = () => {
    setSteps(prev => prev.map(s => ({ ...s, active: s.mandatory })));
    triggerToast(`Mandatory ${workflowType} steps only configured!`);
  };

  const handleClearAll = () => {
    setSteps(prev => prev.map(s => ({ ...s, active: false })));
    triggerToast(`All ${workflowType} steps disabled!`);
  };

  const handleResetWorkflow = () => {
    if (workflowType === 'onboarding') {
      setOnboardingSteps(prev => prev.map((s, idx) => ({ ...s, active: idx < 4 })));
    } else {
      setOffboardingSteps(prev => prev.map((s, idx) => ({ ...s, active: idx < 4 })));
    }
    triggerToast(`Workflow reset to default baseline!`);
  };

  const handleSelectAllCategory = (categoryName, currentStatus) => {
    const shouldEnable = currentStatus < 1; // if 0 active or fractional, enable all in this category
    setSteps(prev => prev.map(s => s.category === categoryName ? { ...s, active: shouldEnable } : s));
  };

  // Reordering steps in the Active Sequence
  const moveStep = (index, direction) => {
    const activeSteps = currentSteps.filter(s => s.active);
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= activeSteps.length) return;
    
    const step1 = activeSteps[index];
    const step2 = activeSteps[targetIndex];
    
    const step1Idx = currentSteps.findIndex(s => s.id === step1.id);
    const step2Idx = currentSteps.findIndex(s => s.id === step2.id);
    
    const updated = [...currentSteps];
    const temp = updated[step1Idx];
    updated[step1Idx] = updated[step2Idx];
    updated[step2Idx] = temp;
    
    setSteps(updated);
  };

  // Metrics calculations
  const totalStepsCount = currentSteps.length;
  const mandatoryCount = currentSteps.filter(s => s.mandatory).length;
  const activeCount = currentSteps.filter(s => s.active).length;

  const tabs = [
    { id: 'company', label: 'Company Information', icon: <Building2 size={18} /> },
    { id: 'preferences', label: 'Preferences', icon: <Sliders size={18} /> },
    { id: 'roles', label: 'Roles & Permissions', icon: <UserCheck size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'security', label: 'Security & Privacy', icon: <Shield size={18} /> },
    { id: 'integrations', label: 'Integrations & API', icon: <Cpu size={18} /> },
    { id: 'workflows', label: 'Workflow Configuration', icon: <Key size={18} /> }
  ];

  // Helper for displaying step order list
  const activeStepsList = currentSteps.filter(s => s.active);

  // Group steps by category
  const categoriesList = [
    { name: 'Pre-joining', label: workflowType === 'onboarding' ? 'Pre-joining' : 'Pre-exit / Resignation notice' },
    { name: 'Legal & compliance', label: 'Legal & compliance' },
    { name: 'Payroll & benefits', label: 'Payroll & benefits' },
    { name: 'IT & system access', label: workflowType === 'onboarding' ? 'IT & system access' : 'IT deprovisioning' },
    { name: 'Workspace & logistics', label: workflowType === 'onboarding' ? 'Workspace & logistics' : 'Workspace clearout' },
    { name: 'Orientation & training', label: workflowType === 'onboarding' ? 'Orientation & training' : 'Knowledge transfer & exit briefing' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Toast Notification */}
      {showToast && (
        <div className="panel" style={{ position: 'fixed', top: '80px', right: '16px', zIndex: 50, display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--sage)', color: '#fff', padding: '12px 16px', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.2)' }}>
          <CheckCircle2 size={20} />
          <span style={{ fontSize: '14px', fontWeight: '600' }}>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
        <button 
          onClick={() => triggerToast('Settings saved successfully!')}
          className="btn primary"
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>

      {/* Settings Container */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '24px' }}>
        
        {/* Left Sidebar Menu */}
        <div className="panel" style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '4px', padding: '16px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', transition: 'all 0.2s', cursor: 'pointer',
                background: activeTab === tab.id ? 'var(--surface-2)' : 'transparent',
                color: activeTab === tab.id ? 'var(--brand)' : 'var(--ink-2)',
                border: 'none'
              }}
            >
              <span style={{ color: activeTab === tab.id ? 'var(--brand)' : 'var(--ink-3)' }}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Right Configuration Forms */}
        <div className="panel" style={{ flex: '3 1 600px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {activeTab === 'company' && (
            <form onSubmit={(e) => { e.preventDefault(); triggerToast('Settings saved successfully!'); }} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Section 1: Company Information */}
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)', paddingBottom: '12px', borderBottom: '1px solid var(--line)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Building2 size={20} style={{ color: 'var(--brand)' }} />
                  Company Information
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  <div className="field">
                    <label>Company Name</label>
                    <input 
                      type="text" 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="field">
                    <label>Registration Number</label>
                    <input 
                      type="text" 
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="field">
                    <label>Tax ID / VAT</label>
                    <input 
                      type="text" 
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="field">
                    <label>Industry</label>
                    <div style={{ position: 'relative' }}>
                      <select 
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        style={{ width: '100%', appearance: 'none', cursor: 'pointer' }}
                      >
                        <option>Information Technology</option>
                        <option>Financial Services</option>
                        <option>Healthcare</option>
                        <option>Education</option>
                        <option>Manufacturing</option>
                        <option>Retail</option>
                      </select>
                      <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--ink-3)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Contact Details */}
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)', paddingBottom: '12px', borderBottom: '1px solid var(--line)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={20} style={{ color: 'var(--brand)' }} />
                  Contact Details
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  <div className="field">
                    <label>Primary Email</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)' }} />
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ paddingLeft: '44px', width: '100%' }}
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label>Primary Phone</label>
                    <div style={{ position: 'relative' }}>
                      <Phone size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)' }} />
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ paddingLeft: '44px', width: '100%' }}
                        required
                      />
                    </div>
                  </div>
                  <div className="field" style={{ gridColumn: '1 / -1' }}>
                    <label>Headquarters Address</label>
                    <div style={{ position: 'relative' }}>
                      <MapPin size={16} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--ink-3)' }} />
                      <textarea 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={3}
                        style={{ paddingLeft: '44px', width: '100%', resize: 'none' }}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Bottom Save Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                <button type="submit" className="btn primary">
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === 'preferences' && (
            <form onSubmit={(e) => { e.preventDefault(); triggerToast('Preferences saved successfully!'); }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)', paddingBottom: '12px', borderBottom: '1px solid var(--line)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sliders size={20} style={{ color: 'var(--brand)' }} />
                Localization & Preferences
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <div className="field">
                  <label>Default Language</label>
                  <select 
                    value={defaultLanguage}
                    onChange={(e) => setDefaultLanguage(e.target.value)}
                    style={{ width: '100%', appearance: 'none', cursor: 'pointer' }}
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div className="field">
                  <label>Time Zone</label>
                  <select 
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                    style={{ width: '100%', appearance: 'none', cursor: 'pointer' }}
                  >
                    <option>UTC (Coordinated Universal Time)</option>
                    <option>EST (Eastern Standard Time)</option>
                    <option>PST (Pacific Standard Time)</option>
                    <option>PKT (Pakistan Standard Time)</option>
                  </select>
                </div>
                <div className="field">
                  <label>Date Format</label>
                  <select 
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    style={{ width: '100%', appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2026-06-09)</option>
                    <option value="DD-MM-YYYY">DD-MM-YYYY (e.g. 09-06-2026)</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 06/09/2026)</option>
                    <option value="DD MMM YYYY">DD MMM YYYY (e.g. 09 Jun 2026)</option>
                  </select>
                </div>
                <div className="field">
                  <label>Currency Format</label>
                  <select 
                    value={currencyFormat}
                    onChange={(e) => setCurrencyFormat(e.target.value)}
                    style={{ width: '100%', appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="USD">USD ($) - US Dollar</option>
                    <option value="EUR">EUR (€) - Euro</option>
                    <option value="GBP">GBP (£) - British Pound</option>
                    <option value="PKR">PKR (Rs) - Pakistani Rupee</option>
                    <option value="CAD">CAD (C$) - Canadian Dollar</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                <button type="submit" className="btn primary">
                  <Save size={16} />
                  Save Preferences
                </button>
              </div>
            </form>
          )}

          {activeTab === 'roles' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)', paddingBottom: '12px', borderBottom: '1px solid var(--line)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserCheck size={20} style={{ color: 'var(--brand)' }} />
                Roles & Permissions
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--ink-2)' }}>Manage permission levels for different HR user groups.</p>
              <div style={{ border: '1px solid var(--line)', borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ padding: '16px', background: 'var(--surface-2)', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontWeight: '800', fontSize: '14px', color: 'var(--ink)' }}>Administrator</h3>
                    <p style={{ fontSize: '12px', color: 'var(--ink-2)' }}>Full control over all platform modules and settings.</p>
                  </div>
                  <span className="pill brand">Active</span>
                </div>
                <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontWeight: '800', fontSize: '14px', color: 'var(--ink)' }}>HR Manager</h3>
                    <p style={{ fontSize: '12px', color: 'var(--ink-2)' }}>Can view employee directories, manage onboarding/offboarding.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)', paddingBottom: '12px', borderBottom: '1px solid var(--line)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bell size={20} style={{ color: 'var(--brand)' }} />
                Notification Configurations
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--surface-2)', borderRadius: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--ink)' }}>Email Notifications</h4>
                    <p style={{ fontSize: '12px', color: 'var(--ink-2)' }}>Send email updates for leave requests and policy guidelines.</p>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--brand)' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--surface-2)', borderRadius: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--ink)' }}>Push Notifications</h4>
                    <p style={{ fontSize: '12px', color: 'var(--ink-2)' }}>Send push notifications to desktop and mobile devices.</p>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--brand)' }} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)', paddingBottom: '12px', borderBottom: '1px solid var(--line)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={20} style={{ color: 'var(--brand)' }} />
                Security & Privacy
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--surface-2)', borderRadius: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--ink)' }}>Two-Factor Authentication (2FA)</h4>
                    <p style={{ fontSize: '12px', color: 'var(--ink-2)' }}>Add an extra layer of security to your admin account.</p>
                  </div>
                  <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--brand)' }} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)', paddingBottom: '12px', borderBottom: '1px solid var(--line)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cpu size={20} style={{ color: 'var(--brand)' }} />
                Integrations & API
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--surface-2)', borderRadius: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--ink)' }}>Slack Integration</h4>
                    <p style={{ fontSize: '12px', color: 'var(--ink-2)' }}>Post announcements to company Slack channels automatically.</p>
                  </div>
                  <button className="btn secondary" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px' }}>Connect</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workflows' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Header */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyItems: 'space-between', justifyContent: 'space-between', gap: '16px', borderBottom: '1px solid var(--line)', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                  <Key size={20} style={{ color: 'var(--brand)' }} />
                  <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)' }}>Workflow Configuration</h2>
                </div>
                
                {/* 1. Workflow Module Toggles */}
                <div className="seg" style={{ display: 'flex', width: 'fit-content' }}>
                  <button
                    onClick={() => { setWorkflowType('onboarding'); setSearchQuery(''); }}
                    className={workflowType === 'onboarding' ? 'active' : ''}
                  >
                    Onboarding Workflow
                  </button>
                  <button
                    onClick={() => { setWorkflowType('offboarding'); setSearchQuery(''); }}
                    className={workflowType === 'offboarding' ? 'active' : ''}
                  >
                    Offboarding Workflow
                  </button>
                </div>
              </div>

              {/* 2. Step Selection & Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', alignItems: 'center', background: 'var(--surface-2)', padding: '16px', borderRadius: '16px', border: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ textAlign: 'center', padding: '12px', background: '#fff', borderRadius: '12px', border: '1px solid var(--line)', flex: 1 }}>
                    <span style={{ fontSize: '10px', color: 'var(--ink-3)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Total Steps</span>
                    <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--ink)' }}>{totalStepsCount}</span>
                  </div>
                  <div style={{ textAlign: 'center', padding: '12px', background: '#fff', borderRadius: '12px', border: '1px solid var(--line)', flex: 1 }}>
                    <span style={{ fontSize: '10px', color: 'var(--ink-3)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Mandatory</span>
                    <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--amber)' }}>{mandatoryCount}</span>
                  </div>
                  <div style={{ textAlign: 'center', padding: '12px', background: '#fff', borderRadius: '12px', border: '1px solid var(--line)', flex: 1 }}>
                    <span style={{ fontSize: '10px', color: 'var(--ink-3)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Active</span>
                    <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--brand)' }}>{activeCount}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'flex-end' }}>
                  <button 
                    onClick={handleEnableAll}
                    className="btn ghost" style={{ padding: '6px 12px', fontSize: '12px', background: '#fff' }}
                  >
                    Enable All
                  </button>
                  <button 
                    onClick={handleMandatoryOnly}
                    className="btn ghost" style={{ padding: '6px 12px', fontSize: '12px', background: '#fff' }}
                  >
                    Mandatory steps only
                  </button>
                  <button 
                    onClick={handleClearAll}
                    className="btn ghost" style={{ padding: '6px 12px', fontSize: '12px', background: '#fff', color: 'var(--coral)' }}
                  >
                    Clear all
                  </button>
                </div>
              </div>

              {/* Inline Search Bar */}
              <div className="search" style={{ margin: 0 }}>
                <Search />
                <input 
                  type="text"
                  placeholder="Search steps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* 3. Categorized Workflow Step Checkboxes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {categoriesList.map((cat) => {
                  const catSteps = currentSteps.filter(s => s.category === cat.name);
                  const matchedSteps = catSteps.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
                  const activeCatCount = catSteps.filter(s => s.active).length;
                  const totalCatCount = catSteps.length;

                  if (searchQuery && matchedSteps.length === 0) return null;

                  return (
                    <div key={cat.name} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '16px', overflow: 'hidden' }}>
                      <div style={{ padding: '12px 16px', background: 'var(--surface-2)', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '800', fontSize: '14px', color: 'var(--ink)' }}>{cat.label}</span>
                          <span className="pill brand" style={{ fontSize: '10px', padding: '2px 8px' }}>
                            {activeCatCount}/{totalCatCount} Active
                          </span>
                        </div>
                        <button
                          onClick={() => handleSelectAllCategory(cat.name, activeCatCount / totalCatCount)}
                          style={{ fontSize: '12px', fontWeight: '600', color: 'var(--brand)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                        >
                          {activeCatCount === totalCatCount ? 'Deselect All' : 'Select All'}
                        </button>
                      </div>

                      <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
                        {matchedSteps.map((step) => (
                          <label 
                            key={step.id} 
                            style={{ 
                              display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '10px', borderRadius: '12px', border: '1px solid transparent', transition: 'all 0.2s', cursor: 'pointer',
                              background: step.active ? 'var(--surface-2)' : 'transparent',
                              borderColor: step.active ? 'var(--line)' : 'transparent'
                            }}
                          >
                            <input 
                              type="checkbox" 
                              checked={step.active}
                              onChange={() => handleToggleStep(step.id)}
                              style={{ marginTop: '2px', width: '16px', height: '16px', cursor: 'pointer', accentColor: 'var(--brand)', flexShrink: 0 }}
                            />
                            <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
                              <span style={{ fontWeight: '600', color: step.active ? 'var(--ink)' : 'var(--ink-3)' }}>
                                {step.name}
                              </span>
                              {step.mandatory && (
                                <span style={{ marginLeft: '6px', fontSize: '9px', fontWeight: '800', background: 'var(--surface-2)', color: 'var(--amber)', border: '1px solid var(--line)', padding: '2px 4px', borderRadius: '4px' }}>
                                  Mandatory
                                </span>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 4. Step Order Sequencing */}
              <div style={{ background: 'var(--surface-2)', borderRadius: '16px', border: '1px solid var(--line)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h3 style={{ fontWeight: '800', fontSize: '14px', color: 'var(--ink)' }}>Step Order</h3>
                  <p style={{ fontSize: '12px', color: 'var(--ink-2)', marginTop: '4px' }}>Below is the active sequence of enabled steps. Reorder the sequence presented to hiring managers.</p>
                </div>
                
                {activeStepsList.length === 0 ? (
                  <div className="empty" style={{ padding: '24px', textAlign: 'center', background: '#fff' }}>
                    No steps are currently active. Enable steps above to configure their sequence.
                  </div>
                ) : (
                  <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
                    {activeStepsList.map((step, idx) => (
                      <div key={step.id} style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', borderBottom: idx !== activeStepsList.length - 1 ? '1px solid var(--line)' : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                          <span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: '800', color: 'var(--ink-3)', background: 'var(--surface-2)', padding: '2px 8px', borderRadius: '4px' }}>
                            {idx + 1}
                          </span>
                          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--ink)' }}>{step.name}</span>
                          {step.mandatory && (
                            <span style={{ fontSize: '8px', fontWeight: '800', background: 'var(--surface-2)', color: 'var(--amber)', padding: '2px 4px', borderRadius: '4px', flexShrink: 0 }}>M</span>
                          )}
                        </div>

                        {/* Order Controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                          <button
                            onClick={() => moveStep(idx, -1)}
                            disabled={idx === 0}
                            title="Move Up"
                            style={{ padding: '4px', background: 'transparent', border: 'none', color: idx === 0 ? 'var(--ink-4)' : 'var(--ink-3)', cursor: idx === 0 ? 'not-allowed' : 'pointer' }}
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            onClick={() => moveStep(idx, 1)}
                            disabled={idx === activeStepsList.length - 1}
                            title="Move Down"
                            style={{ padding: '4px', background: 'transparent', border: 'none', color: idx === activeStepsList.length - 1 ? 'var(--ink-4)' : 'var(--ink-3)', cursor: idx === activeStepsList.length - 1 ? 'not-allowed' : 'pointer' }}
                          >
                            <ArrowDown size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. Final Configuration Actions */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                <button
                  onClick={handleResetWorkflow}
                  className="btn ghost"
                >
                  Reset to defaults
                </button>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <button
                    onClick={() => triggerToast(`Preview generated for ${workflowType} workflow!`)}
                    className="btn secondary"
                  >
                    Preview workflow
                  </button>
                  <button
                    onClick={() => triggerToast(`${workflowType === 'onboarding' ? 'Onboarding' : 'Offboarding'} configuration saved successfully!`)}
                    className="btn primary"
                  >
                    Save configuration
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* System Health Dashboard */}
      <div className="panel" style={{ background: 'var(--ink)', color: '#fff', marginTop: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
        
        {/* Status Indicators */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ position: 'relative', display: 'flex', width: '10px', height: '10px' }}>
              <span style={{ position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', background: 'var(--sage)', opacity: 0.7 }}></span>
              <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: '10px', width: '10px', background: 'var(--sage)' }}></span>
            </span>
            <div style={{ fontSize: '12px' }}>
              <span style={{ color: 'var(--ink-3)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', fontSize: '9px' }}>Cloud API</span>
              <span style={{ fontWeight: '800', color: '#fff' }}>Online</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ height: '10px', width: '10px', borderRadius: '50%', background: 'var(--sage)' }}></span>
            <div style={{ fontSize: '12px' }}>
              <span style={{ color: 'var(--ink-3)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', fontSize: '9px' }}>Database</span>
              <span style={{ fontWeight: '800', color: '#fff' }}>Healthy</span>
            </div>
          </div>

          {/* Storage Capacity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <HardDrive size={18} style={{ color: 'var(--ink-3)' }} />
            <div style={{ fontSize: '12px' }}>
              <span style={{ color: 'var(--ink-3)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', fontSize: '9px' }}>Storage Capacity</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                <div style={{ width: '80px', background: 'var(--ink-2)', height: '6px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: 'var(--sage)', height: '100%', width: '15%', borderRadius: '4px' }}></div>
                </div>
                <span style={{ fontWeight: '800', color: '#fff' }}>85% Free</span>
              </div>
            </div>
          </div>
        </div>

        {/* Version Control */}
        <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'right' }}>
          <div style={{ fontWeight: '800', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
            <span style={{ padding: '2px 6px', background: 'var(--ink-2)', fontSize: '10px', color: 'var(--ink-4)', borderRadius: '4px', border: '1px solid var(--ink-3)', fontFamily: 'monospace' }}>v2.4.0</span>
            <span>Platform Version</span>
          </div>
          <span style={{ color: 'var(--ink-3)', fontSize: '10px', fontWeight: '600' }}>Latest update: June 9, 2026 10:00 AM</span>
        </div>

      </div>

    </div>
  );
}
