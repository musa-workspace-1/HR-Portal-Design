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
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-0 relative">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-3 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-500 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={20} />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your platform configurations and account preferences.</p>
        </div>
        <button 
          onClick={() => triggerToast('Settings saved successfully!')}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:opacity-90 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm shadow-primary/20 cursor-pointer"
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>

      {/* Settings Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sidebar Menu */}
        <div className="lg:col-span-4 xl:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className={activeTab === tab.id ? 'text-primary' : 'text-slate-400'}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Right Configuration Forms */}
        <div className="lg:col-span-8 xl:col-span-9 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
          
          {activeTab === 'company' && (
            <form onSubmit={(e) => { e.preventDefault(); triggerToast('Settings saved successfully!'); }} className="space-y-8">
              {/* Section 1: Company Information */}
              <div>
                <h2 className="text-lg font-bold text-slate-900 pb-1.5 border-b border-slate-100 mb-5 flex items-center gap-2">
                  <Building2 size={20} className="text-primary" />
                  Company Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company Name</label>
                    <input 
                      type="text" 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Registration Number</label>
                    <input 
                      type="text" 
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tax ID / VAT</label>
                    <input 
                      type="text" 
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Industry</label>
                    <div className="relative">
                      <select 
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors cursor-pointer appearance-none"
                      >
                        <option>Information Technology</option>
                        <option>Financial Services</option>
                        <option>Healthcare</option>
                        <option>Education</option>
                        <option>Manufacturing</option>
                        <option>Retail</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Contact Details */}
              <div>
                <h2 className="text-lg font-bold text-slate-900 pb-1.5 border-b border-slate-100 mb-5 flex items-center gap-2">
                  <Mail size={20} className="text-primary" />
                  Contact Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Phone</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Headquarters Address</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-4 top-3 text-slate-400" />
                      <textarea 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={3}
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Bottom Save Button */}
              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button 
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:opacity-90 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === 'preferences' && (
            <form onSubmit={(e) => { e.preventDefault(); triggerToast('Preferences saved successfully!'); }} className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 pb-1.5 border-b border-slate-100 mb-4 flex items-center gap-2">
                <Sliders size={20} className="text-primary" />
                Localization & Preferences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Default Language</label>
                  <select 
                    value={defaultLanguage}
                    onChange={(e) => setDefaultLanguage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm cursor-pointer outline-none"
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Time Zone</label>
                  <select 
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm cursor-pointer outline-none"
                  >
                    <option>UTC (Coordinated Universal Time)</option>
                    <option>EST (Eastern Standard Time)</option>
                    <option>PST (Pacific Standard Time)</option>
                    <option>PKT (Pakistan Standard Time)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date Format</label>
                  <select 
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm cursor-pointer outline-none"
                  >
                    <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2026-06-09)</option>
                    <option value="DD-MM-YYYY">DD-MM-YYYY (e.g. 09-06-2026)</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 06/09/2026)</option>
                    <option value="DD MMM YYYY">DD MMM YYYY (e.g. 09 Jun 2026)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Currency Format</label>
                  <select 
                    value={currencyFormat}
                    onChange={(e) => setCurrencyFormat(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm cursor-pointer outline-none"
                  >
                    <option value="USD">USD ($) - US Dollar</option>
                    <option value="EUR">EUR (€) - Euro</option>
                    <option value="GBP">GBP (£) - British Pound</option>
                    <option value="PKR">PKR (Rs) - Pakistani Rupee</option>
                    <option value="CAD">CAD (C$) - Canadian Dollar</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button 
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:opacity-90 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                >
                  <Save size={16} />
                  Save Preferences
                </button>
              </div>
            </form>
          )}

          {activeTab === 'roles' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 pb-1.5 border-b border-slate-100 mb-4 flex items-center gap-2">
                <UserCheck size={20} className="text-primary" />
                Roles & Permissions
              </h2>
              <p className="text-sm text-slate-500">Manage permission levels for different HR user groups.</p>
              <div className="border border-slate-100 rounded-xl divide-y divide-slate-100 overflow-hidden">
                <div className="p-4 bg-slate-50/50 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Administrator</h3>
                    <p className="text-xs text-slate-500">Full control over all platform modules and settings.</p>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">Active</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-sm text-slate-700">HR Manager</h3>
                    <p className="text-xs text-slate-500">Can view employee directories, manage onboarding/offboarding.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 pb-1.5 border-b border-slate-100 mb-4 flex items-center gap-2">
                <Bell size={20} className="text-primary" />
                Notification Configurations
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">Email Notifications</h4>
                    <p className="text-xs text-slate-500">Send email updates for leave requests and policy guidelines.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary cursor-pointer" />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">Push Notifications</h4>
                    <p className="text-xs text-slate-500">Send push notifications to desktop and mobile devices.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary cursor-pointer" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 pb-1.5 border-b border-slate-100 mb-4 flex items-center gap-2">
                <Shield size={20} className="text-primary" />
                Security & Privacy
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">Two-Factor Authentication (2FA)</h4>
                    <p className="text-xs text-slate-500">Add an extra layer of security to your admin account.</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 accent-primary cursor-pointer" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 pb-1.5 border-b border-slate-100 mb-4 flex items-center gap-2">
                <Cpu size={20} className="text-primary" />
                Integrations & API
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">Slack Integration</h4>
                    <p className="text-xs text-slate-500">Post announcements to company Slack channels automatically.</p>
                  </div>
                  <button className="px-3.5 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold rounded-lg transition-colors cursor-pointer">Connect</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workflows' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Key size={20} className="text-primary" />
                  <h2 className="text-lg font-bold text-slate-900">Workflow Configuration</h2>
                </div>
                
                {/* 1. Workflow Module Toggles */}
                <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
                  <button
                    onClick={() => { setWorkflowType('onboarding'); setSearchQuery(''); }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      workflowType === 'onboarding' 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-850'
                    }`}
                  >
                    Onboarding Workflow
                  </button>
                  <button
                    onClick={() => { setWorkflowType('offboarding'); setSearchQuery(''); }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      workflowType === 'offboarding' 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-850'
                    }`}
                  >
                    Offboarding Workflow
                  </button>
                </div>
              </div>

              {/* 2. Step Selection & Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                <div className="flex gap-4">
                  <div className="text-center px-3 py-2 bg-white rounded-xl shadow-xs border border-slate-100 flex-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Steps</span>
                    <span className="text-lg font-extrabold text-slate-800">{totalStepsCount}</span>
                  </div>
                  <div className="text-center px-3 py-2 bg-white rounded-xl shadow-xs border border-slate-100 flex-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Mandatory</span>
                    <span className="text-lg font-extrabold text-amber-600">{mandatoryCount}</span>
                  </div>
                  <div className="text-center px-3 py-2 bg-white rounded-xl shadow-xs border border-slate-100 flex-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Active</span>
                    <span className="text-lg font-extrabold text-primary">{activeCount}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button 
                      onClick={handleEnableAll}
                      className="px-2.5 py-1.5 bg-white hover:bg-slate-55 border border-slate-200 rounded-lg text-[10px] sm:text-xs font-bold text-slate-700 transition-colors shadow-xs cursor-pointer"
                    >
                      Enable All
                    </button>
                    <button 
                      onClick={handleMandatoryOnly}
                      className="px-2.5 py-1.5 bg-white hover:bg-slate-55 border border-slate-200 rounded-lg text-[10px] sm:text-xs font-bold text-slate-700 transition-colors shadow-xs cursor-pointer"
                    >
                      Mandatory steps only
                    </button>
                    <button 
                      onClick={handleClearAll}
                      className="px-2.5 py-1.5 bg-white hover:bg-slate-55 border border-slate-200 rounded-lg text-[10px] sm:text-xs font-bold text-rose-600 transition-colors shadow-xs cursor-pointer"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              </div>

              {/* Inline Search Bar */}
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search steps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              {/* 3. Categorized Workflow Step Checkboxes */}
              <div className="space-y-6">
                {categoriesList.map((cat) => {
                  const catSteps = currentSteps.filter(s => s.category === cat.name);
                  const matchedSteps = catSteps.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
                  const activeCatCount = catSteps.filter(s => s.active).length;
                  const totalCatCount = catSteps.length;

                  if (searchQuery && matchedSteps.length === 0) return null;

                  return (
                    <div key={cat.name} className="bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden">
                      <div className="px-4 py-3 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-800">{cat.label}</span>
                          <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {activeCatCount}/{totalCatCount} Active
                          </span>
                        </div>
                        <button
                          onClick={() => handleSelectAllCategory(cat.name, activeCatCount / totalCatCount)}
                          className="text-xs font-semibold text-primary hover:text-blue-800 transition-colors cursor-pointer"
                        >
                          {activeCatCount === totalCatCount ? 'Deselect All' : 'Select All'}
                        </button>
                      </div>

                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {matchedSteps.map((step) => (
                          <label 
                            key={step.id} 
                            className={`flex items-start gap-3 p-2.5 rounded-xl border border-transparent transition-all cursor-pointer hover:bg-slate-50/60 ${
                              step.active 
                                ? 'bg-primary/[0.01] border-primary/10' 
                                : ''
                            }`}
                          >
                            <input 
                              type="checkbox" 
                              checked={step.active}
                              onChange={() => handleToggleStep(step.id)}
                              className="mt-0.5 w-4 h-4 rounded text-primary border-slate-300 focus:ring-primary accent-primary cursor-pointer flex-shrink-0"
                            />
                            <div className="text-xs leading-normal">
                              <span className={`font-semibold ${step.active ? 'text-slate-800' : 'text-slate-500'}`}>
                                {step.name}
                              </span>
                              {step.mandatory && (
                                <span className="ml-1.5 text-[9px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200/60 px-1 rounded">
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
              <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-5 space-y-4">
                <div>
                  <h3 className="font-bold text-sm text-slate-800">Step Order</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Below is the active sequence of enabled steps. Reorder the sequence presented to hiring managers.</p>
                </div>
                
                {activeStepsList.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
                    No steps are currently active. Enable steps above to configure their sequence.
                  </div>
                ) : (
                  <div className="bg-white border border-slate-100 rounded-xl divide-y divide-slate-100 overflow-hidden shadow-xs">
                    {activeStepsList.map((step, idx) => (
                      <div key={step.id} className="p-3 flex items-center justify-between gap-4 hover:bg-slate-50/30 transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-semibold text-slate-700 truncate">{step.name}</span>
                          {step.mandatory && (
                            <span className="text-[8px] font-bold bg-amber-50 text-amber-600 px-1 rounded flex-shrink-0">M</span>
                          )}
                        </div>

                        {/* Order Controls */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => moveStep(idx, -1)}
                            disabled={idx === 0}
                            title="Move Up"
                            className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            onClick={() => moveStep(idx, 1)}
                            disabled={idx === activeStepsList.length - 1}
                            title="Move Down"
                            className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
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
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <button
                  onClick={handleResetWorkflow}
                  className="w-full sm:w-auto px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Reset to defaults
                </button>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => triggerToast(`Preview generated for ${workflowType} workflow!`)}
                    className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Preview workflow
                  </button>
                  <button
                    onClick={() => triggerToast(`${workflowType === 'onboarding' ? 'Onboarding' : 'Offboarding'} configuration saved successfully!`)}
                    className="w-full sm:w-auto px-4 py-2 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
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
      <div className="bg-slate-900 text-slate-300 rounded-2xl p-5 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md mt-6">
        
        {/* Status Indicators */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="text-xs">
              <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[9px]">Cloud API</span>
              <span className="font-bold text-slate-100">Online</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            <div className="text-xs">
              <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[9px]">Database</span>
              <span className="font-bold text-slate-100">Healthy</span>
            </div>
          </div>

          {/* Storage Capacity */}
          <div className="flex items-center gap-3">
            <HardDrive size={18} className="text-slate-400" />
            <div className="text-xs">
              <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[9px]">Storage Capacity</span>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-20 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[15%] rounded-full"></div>
                </div>
                <span className="font-bold text-slate-100">85% Free</span>
              </div>
            </div>
          </div>
        </div>

        {/* Version Control */}
        <div className="text-xs md:text-right border-t md:border-t-0 border-slate-800 pt-4 md:pt-0 flex flex-col gap-0.5">
          <div className="font-bold text-slate-100 flex items-center gap-1.5 md:justify-end">
            <span className="px-1.5 py-0.5 bg-slate-800 text-[10px] text-slate-400 rounded border border-slate-700 font-mono">v2.4.0</span>
            <span>Platform Version</span>
          </div>
          <span className="text-slate-500 text-[10px] font-medium">Latest update: June 9, 2026 10:00 AM</span>
        </div>

      </div>

    </div>
  );
}
