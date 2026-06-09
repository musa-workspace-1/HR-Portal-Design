import React, { useState } from 'react';
import { 
  User, Shield, Upload, Trash2, CheckCircle2, ChevronLeft, ChevronRight, Camera, X, Eye, EyeOff
} from 'lucide-react';

export default function AddEmployee({ onCancel, onAdd }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  // 1. Wizard Steps List
  const steps = [
    { number: 1, label: 'Personal Information' },
    { number: 2, label: 'Contact Details' },
    { number: 3, label: 'Employment Details' },
    { number: 4, label: 'Salary Structure' },
    { number: 5, label: 'Documents' },
    { number: 6, label: 'Review' }
  ];

  // 2. Main Form States
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    avatarUrl: '',
    fullName: '',
    dob: '',
    gender: '',
    nationality: '',
    maritalStatus: '',
    nationalId: '',
    passportNumber: '',
    personalEmail: '',
    personalPhone: '',

    // Step 2: Contact Details
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    stateProvince: '',
    postalCode: '',
    emergencyContactName: '',
    emergencyPhone: '',
    emergencyRelationship: '',
    emergencyEmail: '',

    // Step 3: Employment Details
    department: '',
    jobTitle: '',
    portalPassword: '',
    employmentType: '',
    workLocation: '',
    startDate: new Date().toISOString().split('T')[0],
    probationEndDate: '',
    annualLeave: 18,
    sickLeave: 10,

    // Step 4: Salary Structure
    basicSalary: '',
    currency: 'PKR',
    allowanceHousing: 0,
    allowanceTransport: 0,
    allowanceMedical: 0,
    allowancePhone: 0,
    bankName: '',
    accountNumber: '',
    iban: '',
    accountType: '',

    // Step 5: Documents
    docNationalId: null,
    docPassport: null,
    docCertificates: null,
    docExperienceLetters: null,
    docMedicalFitness: null,
    docBankVerification: null,
    docProfessionalPhoto: null,
    docWorkPermits: null
  });

  // 3. Avatar Upload & Crop State
  const [zoom, setZoom] = useState(1);
  const [isCroppingOpen, setIsCroppingOpen] = useState(false);
  const [tempFileUrl, setTempFileUrl] = useState(null);
  const [onCropDoneCallback, setOnCropDoneCallback] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Pre-configured cropping tool hook simulator
  const employees = {
    cropAfterChoose: (fileUrl, onCropDone) => {
      setTempFileUrl(fileUrl);
      setZoom(1);
      setIsCroppingOpen(true);
      setOnCropDoneCallback(() => onCropDone);
    }
  };

  // Handle image upload trigger
  const handlePhotoUpload = (e) => {
    setUploadError('');
    const file = e.target.files[0];
    if (!file) return;

    // Format restrictions: JPEG, PNG, WebP, GIF
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Error: Supported formats are JPEG, PNG, WebP, or GIF.');
      return;
    }

    // Size constraint: 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Error: Maximum file size is 5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      // Trigger the pre-configured cropping tool hook
      employees.cropAfterChoose(reader.result, (croppedImg) => {
        setFormData(prev => ({ ...prev, avatarUrl: croppedImg }));
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDocUpload = (field, file, allowedExtensions, maxSizeMB) => {
    setErrors(prev => {
      const next = { ...prev };
      delete next[field];
      return next;
    });

    if (!file) return;

    const fileExt = '.' + file.name.split('.').pop().toLowerCase();
    const isAllowed = allowedExtensions.includes(fileExt);

    if (!isAllowed) {
      setErrors(prev => ({ 
        ...prev, 
        [field]: `Invalid file format. Allowed: ${allowedExtensions.join(', ')}` 
      }));
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setErrors(prev => ({ 
        ...prev, 
        [field]: `File exceeds size limit of ${maxSizeMB} MB` 
      }));
      return;
    }

    handleInputChange(field, file.name);
  };

  const handleApplyCrop = () => {
    if (onCropDoneCallback) {
      onCropDoneCallback(tempFileUrl);
    }
    setIsCroppingOpen(false);
    setTempFileUrl(null);
  };

  const handleDeletePhoto = () => {
    setFormData(prev => ({ ...prev, avatarUrl: '' }));
  };

  // Form field change handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error if corrected
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // National ID mask formatter: 00000-0000000-0
  const handleNationalIdChange = (e) => {
    const rawVal = e.target.value;
    const digits = rawVal.replace(/\D/g, '').slice(0, 13);
    let formatted = '';
    if (digits.length > 0) {
      formatted += digits.slice(0, 5);
    }
    if (digits.length > 5) {
      formatted += '-' + digits.slice(5, 12);
    }
    if (digits.length > 12) {
      formatted += '-' + digits.slice(12, 13);
    }
    handleInputChange('nationalId', formatted);
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = 'Full Name is required';
    if (!formData.dob) tempErrors.dob = 'Date of Birth is required';
    if (!formData.gender) tempErrors.gender = 'Gender is required';
    if (!formData.nationality) tempErrors.nationality = 'Nationality is required';
    
    // Validate National ID mask format
    if (!formData.nationalId) {
      tempErrors.nationalId = 'National ID is required';
    } else {
      const nidRegex = /^\d{5}-\d{7}-\d{1}$/;
      if (!nidRegex.test(formData.nationalId)) {
        tempErrors.nationalId = 'National ID must follow the pattern 00000-0000000-0';
      }
    }

    if (!formData.personalPhone.trim()) {
      tempErrors.personalPhone = 'Personal Phone is required';
    }

    // Optional email check
    if (formData.personalEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.personalEmail)) {
        tempErrors.personalEmail = 'Please enter a valid email address';
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const tempErrors = {};
    if (!formData.addressLine1.trim()) tempErrors.addressLine1 = 'Address Line 1 is required';
    if (!formData.city.trim()) tempErrors.city = 'City is required';
    if (!formData.country) tempErrors.country = 'Country is required';
    if (!formData.emergencyContactName.trim()) tempErrors.emergencyContactName = 'Emergency Contact Name is required';
    if (!formData.emergencyPhone.trim()) tempErrors.emergencyPhone = 'Emergency Phone is required';
    if (!formData.emergencyRelationship) tempErrors.emergencyRelationship = 'Relationship is required';

    // Optional emergency email check
    if (formData.emergencyEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.emergencyEmail)) {
        tempErrors.emergencyEmail = 'Please enter a valid email address';
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const tempErrors = {};
    if (!formData.department) tempErrors.department = 'Department is required';
    if (!formData.jobTitle.trim()) tempErrors.jobTitle = 'Job Title is required';
    if (!formData.employmentType) tempErrors.employmentType = 'Employment Type is required';
    if (!formData.workLocation) tempErrors.workLocation = 'Work Location is required';
    if (!formData.startDate) tempErrors.startDate = 'Start Date is required';
    
    if (formData.portalPassword) {
      if (formData.portalPassword.length < 8) {
        tempErrors.portalPassword = 'Password must be at least 8 characters long';
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Step 4 Validation
  const validateStep4 = () => {
    const tempErrors = {};
    if (!formData.basicSalary || parseFloat(formData.basicSalary) <= 0) {
      tempErrors.basicSalary = 'Basic Salary is required and must be greater than 0';
    }
    if (!formData.bankName) tempErrors.bankName = 'Bank Name is required';
    if (!formData.accountNumber.trim()) tempErrors.accountNumber = 'Account Number is required';
    if (!formData.iban.trim()) tempErrors.iban = 'IBAN is required';
    if (!formData.accountType) tempErrors.accountType = 'Account Type is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Step 5 Validation
  const validateStep5 = () => {
    const tempErrors = {};
    if (!formData.docNationalId) tempErrors.docNationalId = 'National ID Copy is required';
    if (!formData.docPassport) tempErrors.docPassport = 'Passport Copy is required';
    if (!formData.docMedicalFitness) tempErrors.docMedicalFitness = 'Medical Fitness document is required';
    if (!formData.docBankVerification) tempErrors.docBankVerification = 'Bank Verification Letter is required';
    if (!formData.docProfessionalPhoto) tempErrors.docProfessionalPhoto = 'Professional Photograph is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Stepper Progression Controls
  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      if (validateStep3()) {
        setCurrentStep(4);
      }
    } else if (currentStep === 4) {
      if (validateStep4()) {
        setCurrentStep(5);
      }
    } else if (currentStep === 5) {
      if (validateStep5()) {
        setCurrentStep(6);
      }
    } else if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep === 6) {
      onAdd(formData);
    }
  };

  const calculatedEmail = formData.fullName 
    ? `${formData.fullName.toLowerCase().trim().replace(/[^a-z0-9]/g, '.').replace(/\s+/g, '.')}@24loops.com` 
    : 'auto@domain.com';

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 lg:pb-0 relative">
      
      {/* Header section */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add New Employee</h1>
          <p className="text-sm text-slate-505 mt-1">Register a new team member and initiate their onboarding setup flow.</p>
        </div>
        <button 
          onClick={onCancel}
          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>

      {/* 1. Multi-Step Progress Tracker */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[650px] px-2">
          {steps.map((step, idx) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            return (
              <React.Fragment key={step.number}>
                {/* Step Circle & Details */}
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted 
                      ? 'bg-emerald-500 text-white' 
                      : isActive 
                        ? 'bg-primary text-white ring-4 ring-primary/20' 
                        : 'bg-slate-100 text-slate-400'
                  }`}>
                    {isCompleted ? '✓' : step.number}
                  </div>
                  <div className="text-left">
                    <span className={`text-xs block font-bold transition-colors ${
                      isActive ? 'text-primary' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                    }`}>
                      {step.label}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      {isCompleted ? 'Completed' : isActive ? 'In Progress' : 'Pending'}
                    </span>
                  </div>
                </div>

                {/* Progress Bar Line */}
                {idx < steps.length - 1 && (
                  <div className="flex-1 mx-4 h-0.5 relative">
                    <div className="absolute inset-0 bg-slate-100 rounded-full"></div>
                    <div className={`absolute inset-0 bg-primary rounded-full transition-all duration-300 ${
                      isCompleted ? 'w-full' : 'w-0'
                    }`}></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        
        {/* Step Content Panels */}
        <div className="p-6 sm:p-8 flex-1">
          
          {/* STEP 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              
              {/* Photo Upload Module & Errors */}
              <div className="flex flex-col sm:flex-row gap-6 items-start border-b border-slate-100 pb-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Profile photo</label>
                  
                  <div className="flex items-center gap-4">
                    {/* Camera icon trigger container */}
                    <label className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-slate-350 hover:border-primary/50 bg-slate-50 hover:bg-slate-100 flex flex-col items-center justify-center cursor-pointer transition-colors text-center group">
                      {formData.avatarUrl ? (
                        <img src={formData.avatarUrl} alt="Cropped preview" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Camera size={24} className="text-slate-400 group-hover:text-primary transition-colors" />
                          <span className="text-[10px] text-slate-500 font-bold mt-1">Upload</span>
                        </>
                      )}
                      <input 
                        type="file" 
                        accept="image/jpeg, image/png, image/webp, image/gif"
                        onChange={handlePhotoUpload}
                        className="hidden" 
                      />
                    </label>

                    {formData.avatarUrl && (
                      <button 
                        type="button"
                        onClick={handleDeletePhoto}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-rose-600 rounded-lg text-xs font-bold transition-all cursor-pointer"
                      >
                        <Trash2 size={12} />
                        Remove
                      </button>
                    )}
                  </div>
                  
                  {uploadError && (
                    <p className="text-xs font-bold text-rose-600 mt-2">{uploadError}</p>
                  )}
                  <p className="text-[10px] text-slate-400 mt-2 font-medium">
                    Supports JPEG, PNG, WebP, or GIF (max size 5 MB).
                  </p>
                </div>

                {/* Cropping Tool HUD (Conditional) */}
                {isCroppingOpen && tempFileUrl && (
                  <div className="flex-1 bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-4 max-w-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Crop & Format Image</span>
                      <button 
                        type="button" 
                        onClick={() => { setIsCroppingOpen(false); setTempFileUrl(null); }}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    {/* Visual Circle Preview */}
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-primary bg-slate-200 flex items-center justify-center shadow-inner">
                      <img 
                        src={tempFileUrl} 
                        alt="Zoom Preview" 
                        style={{ transform: `scale(${zoom})` }}
                        className="w-full h-full object-cover transition-transform duration-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-500">
                        <span>ZOOM</span>
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
                        type="button"
                        onClick={handleApplyCrop}
                        className="flex-1 py-1.5 bg-primary hover:opacity-90 text-white rounded-lg text-xs font-bold shadow-sm cursor-pointer"
                      >
                        Apply Crop
                      </button>
                      <button 
                        type="button"
                        onClick={() => { setIsCroppingOpen(false); setTempFileUrl(null); }}
                        className="flex-1 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Full Name *</label>
                  <input 
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter full name"
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                      errors.fullName ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.fullName && <p className="text-xs font-bold text-rose-600">{errors.fullName}</p>}
                </div>

                {/* Date of Birth (dd - mm - yyyy representation) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Date of Birth * (dd - mm - yyyy)</label>
                  <input 
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                      errors.dob ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.dob && <p className="text-xs font-bold text-rose-600">{errors.dob}</p>}
                </div>

                {/* Gender */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Gender *</label>
                  <select 
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                      errors.gender ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && <p className="text-xs font-bold text-rose-600">{errors.gender}</p>}
                </div>

                {/* Nationality */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Nationality *</label>
                  <select 
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                      errors.nationality ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                    }`}
                  >
                    <option value="">Select Nationality</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="UAE">UAE</option>
                  </select>
                  {errors.nationality && <p className="text-xs font-bold text-rose-600">{errors.nationality}</p>}
                </div>

                {/* Marital Status (Optional) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Marital Status (Optional)</label>
                  <select 
                    value={formData.maritalStatus}
                    onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  >
                    <option value="">Select Marital Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                  </select>
                </div>

                {/* National ID (Formatted mask 00000-0000000-0) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">National ID * (00000-0000000-0)</label>
                  <input 
                    type="text"
                    placeholder="00000-0000000-0"
                    value={formData.nationalId}
                    onChange={handleNationalIdChange}
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                      errors.nationalId ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.nationalId && <p className="text-xs font-bold text-rose-600">{errors.nationalId}</p>}
                </div>

                {/* Passport Number (Optional) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Passport Number (Optional)</label>
                  <input 
                    type="text"
                    value={formData.passportNumber}
                    onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                    placeholder="Enter passport number"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>

                {/* Personal Email (Optional) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Personal Email (Optional)</label>
                  <input 
                    type="text"
                    value={formData.personalEmail}
                    onChange={(e) => handleInputChange('personalEmail', e.target.value)}
                    placeholder="example@email.com"
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                      errors.personalEmail ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.personalEmail && <p className="text-xs font-bold text-rose-600">{errors.personalEmail}</p>}
                </div>

                {/* Personal Phone */}
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Personal Phone *</label>
                  <input 
                    type="text"
                    value={formData.personalPhone}
                    onChange={(e) => handleInputChange('personalPhone', e.target.value)}
                    placeholder="+92 300 1234567"
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                      errors.personalPhone ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.personalPhone && <p className="text-xs font-bold text-rose-600">{errors.personalPhone}</p>}
                </div>

              </div>

            </div>
          )}

          {/* STEP 2: Contact Details (Interactive Setup) */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-3">Contact Details</h3>
              
              {/* Address Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Address Details</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Address Line 1 */}
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Address Line 1 *</label>
                    <input 
                      type="text"
                      value={formData.addressLine1}
                      onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                      placeholder="Primary street address"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                        errors.addressLine1 ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.addressLine1 && <p className="text-xs font-bold text-rose-600">{errors.addressLine1}</p>}
                  </div>

                  {/* Address Line 2 */}
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Address Line 2 (Optional)</label>
                    <input 
                      type="text"
                      value={formData.addressLine2}
                      onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                      placeholder="Apartment, suite, or unit details"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">City *</label>
                    <input 
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Enter city"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                        errors.city ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.city && <p className="text-xs font-bold text-rose-600">{errors.city}</p>}
                  </div>

                  {/* Country */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Country *</label>
                    <select 
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                        errors.country ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    >
                      <option value="">Select Country</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="UAE">UAE</option>
                    </select>
                    {errors.country && <p className="text-xs font-bold text-rose-600">{errors.country}</p>}
                  </div>

                  {/* State / Province */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">State / Province (Optional)</label>
                    <input 
                      type="text"
                      value={formData.stateProvince}
                      onChange={(e) => handleInputChange('stateProvince', e.target.value)}
                      placeholder="Enter state or province"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>

                  {/* Postal Code */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Postal Code (Optional)</label>
                    <input 
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      placeholder="Enter postal code"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>

                </div>
              </div>

              {/* Emergency Contact Information */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Emergency Contact Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Emergency Contact Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Emergency Contact Name *</label>
                    <input 
                      type="text"
                      value={formData.emergencyContactName}
                      onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                      placeholder="Enter emergency contact name"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                        errors.emergencyContactName ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.emergencyContactName && <p className="text-xs font-bold text-rose-600">{errors.emergencyContactName}</p>}
                  </div>

                  {/* Emergency Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-555 uppercase tracking-wider block">Emergency Phone *</label>
                    <input 
                      type="text"
                      value={formData.emergencyPhone}
                      onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                      placeholder="Enter emergency contact phone"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                        errors.emergencyPhone ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.emergencyPhone && <p className="text-xs font-bold text-rose-600">{errors.emergencyPhone}</p>}
                  </div>

                  {/* Relationship */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Relationship *</label>
                    <select 
                      value={formData.emergencyRelationship}
                      onChange={(e) => handleInputChange('emergencyRelationship', e.target.value)}
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                        errors.emergencyRelationship ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    >
                      <option value="">Select Relationship</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Child">Child</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.emergencyRelationship && <p className="text-xs font-bold text-rose-600">{errors.emergencyRelationship}</p>}
                  </div>

                  {/* Emergency Email (Optional) */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Emergency Email (Optional)</label>
                    <input 
                      type="text"
                      value={formData.emergencyEmail}
                      onChange={(e) => handleInputChange('emergencyEmail', e.target.value)}
                      placeholder="emergency@email.com"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                        errors.emergencyEmail ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.emergencyEmail && <p className="text-xs font-bold text-rose-600">{errors.emergencyEmail}</p>}
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* STEP 3: Employment Details (Interactive Setup) */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-3">Employment Details</h3>
              
              {/* Organizational Placement */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Organizational Placement</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Department */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Department *</label>
                    <select 
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                        errors.department ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    >
                      <option value="">Select Department</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Finance">Finance</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operations">Operations</option>
                      <option value="Product">Product</option>
                      <option value="Design">Design</option>
                      <option value="Legal">Legal</option>
                    </select>
                    {errors.department && <p className="text-xs font-bold text-rose-600">{errors.department}</p>}
                  </div>

                  {/* Job Title */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Job Title *</label>
                    <input 
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                      placeholder="e.g. Software Engineer, Sales Associate"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                        errors.jobTitle ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.jobTitle && <p className="text-xs font-bold text-rose-600">{errors.jobTitle}</p>}
                  </div>

                  {/* Employee ID (Read-only) */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Employee ID</label>
                    <input 
                      type="text"
                      value="EMP0156 (auto)"
                      readOnly
                      className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-505 focus:outline-none cursor-not-allowed"
                    />
                  </div>

                  {/* Work Email (Read-only) */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Work Email</label>
                    <input 
                      type="text"
                      value={`${calculatedEmail} (auto)`}
                      readOnly
                      className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-550 focus:outline-none cursor-not-allowed"
                    />
                  </div>

                </div>
              </div>

              {/* Access & System Settings */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Access & System Settings</h4>
                
                {/* Portal Password */}
                <div className="space-y-1 max-w-md">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Portal Password (optional)</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={formData.portalPassword}
                      onChange={(e) => handleInputChange('portalPassword', e.target.value)}
                      placeholder="Min 8 characters"
                      className={`w-full pl-4 pr-10 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                        errors.portalPassword ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.portalPassword ? (
                    <p className="text-xs font-bold text-rose-600">{errors.portalPassword}</p>
                  ) : (
                    <p className="text-[10px] text-slate-400">Requires a minimum of 8 characters.</p>
                  )}
                </div>
              </div>

              {/* Contract & Location Parameters */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Contract & Location Parameters</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Employment Type */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Employment Type *</label>
                    <select 
                      value={formData.employmentType}
                      onChange={(e) => handleInputChange('employmentType', e.target.value)}
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                        errors.employmentType ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    >
                      <option value="">Select Type</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Contractor">Contractor</option>
                    </select>
                    {errors.employmentType && <p className="text-xs font-bold text-rose-600">{errors.employmentType}</p>}
                  </div>

                  {/* Work Location */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Work Location *</label>
                    <select 
                      value={formData.workLocation}
                      onChange={(e) => handleInputChange('workLocation', e.target.value)}
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                        errors.workLocation ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    >
                      <option value="">Select Location</option>
                      <option value="Office">Office</option>
                      <option value="Remote">Remote</option>
                    </select>
                    {errors.workLocation && <p className="text-xs font-bold text-rose-600">{errors.workLocation}</p>}
                  </div>

                  {/* Start Date */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-555 uppercase tracking-wider block">Start Date * (dd - mm - yyyy)</label>
                    <input 
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                        errors.startDate ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.startDate && <p className="text-xs font-bold text-rose-600">{errors.startDate}</p>}
                  </div>

                  {/* Probation End Date */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-555 uppercase tracking-wider block">Probation End Date (Optional) (dd - mm - yyyy)</label>
                    <input 
                      type="date"
                      value={formData.probationEndDate}
                      onChange={(e) => handleInputChange('probationEndDate', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>

                </div>
              </div>

              {/* Time-Off Allocations */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Time-Off Allocations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Annual Leave */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Annual Leave (Days)</label>
                    <input 
                      type="number"
                      value={formData.annualLeave}
                      onChange={(e) => handleInputChange('annualLeave', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>

                  {/* Sick Leave */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Sick Leave (Days)</label>
                    <input 
                      type="number"
                      value={formData.sickLeave}
                      onChange={(e) => handleInputChange('sickLeave', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: Salary Structure */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-3">Salary & Bank Details</h3>
              
              {/* Compensation & Allowances */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Compensation & Allowances</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Basic Salary */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Basic Salary *</label>
                    <div className="relative">
                      <input 
                        type="number"
                        value={formData.basicSalary}
                        onChange={(e) => handleInputChange('basicSalary', e.target.value)}
                        placeholder="Enter basic salary"
                        className={`w-full pl-4 pr-16 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                          errors.basicSalary ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                        }`}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400 pointer-events-none">
                        {formData.currency}
                      </div>
                    </div>
                    {errors.basicSalary && <p className="text-xs font-bold text-rose-600">{errors.basicSalary}</p>}
                  </div>

                  {/* Currency Dropdown */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Currency</label>
                    <select 
                      value={formData.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    >
                      <option value="PKR">PKR</option>
                      <option value="SAR">SAR</option>
                      <option value="AED">AED</option>
                    </select>
                  </div>

                  {/* Housing Allowance */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Housing Allowance</label>
                    <input 
                      type="number"
                      value={formData.allowanceHousing}
                      onChange={(e) => handleInputChange('allowanceHousing', parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>

                  {/* Transport Allowance */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Transport Allowance</label>
                    <input 
                      type="number"
                      value={formData.allowanceTransport}
                      onChange={(e) => handleInputChange('allowanceTransport', parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>

                  {/* Medical Allowance */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Medical Allowance</label>
                    <input 
                      type="number"
                      value={formData.allowanceMedical}
                      onChange={(e) => handleInputChange('allowanceMedical', parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>

                  {/* Phone Allowance */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Phone Allowance</label>
                    <input 
                      type="number"
                      value={formData.allowancePhone}
                      onChange={(e) => handleInputChange('allowancePhone', parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none"
                    />
                  </div>

                </div>
              </div>

              {/* Disbursement Bank Details */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Disbursement Bank Details</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Bank */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Bank *</label>
                    <select 
                      value={formData.bankName}
                      onChange={(e) => handleInputChange('bankName', e.target.value)}
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                        errors.bankName ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    >
                      <option value="">Select Bank</option>
                      <option value="Habib Bank">Habib Bank</option>
                      <option value="Meezan Bank">Meezan Bank</option>
                    </select>
                    {errors.bankName && <p className="text-xs font-bold text-rose-600">{errors.bankName}</p>}
                  </div>

                  {/* Account Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Account Number *</label>
                    <input 
                      type="text"
                      value={formData.accountNumber}
                      onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                      placeholder="Enter account number"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                        errors.accountNumber ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.accountNumber && <p className="text-xs font-bold text-rose-600">{errors.accountNumber}</p>}
                  </div>

                  {/* IBAN */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-555 uppercase tracking-wider block">IBAN *</label>
                    <input 
                      type="text"
                      value={formData.iban}
                      onChange={(e) => handleInputChange('iban', e.target.value)}
                      placeholder="PK00 XXXX XXXX XXXX"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                        errors.iban ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.iban && <p className="text-xs font-bold text-rose-600">{errors.iban}</p>}
                  </div>

                  {/* Account Type */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Account Type *</label>
                    <select 
                      value={formData.accountType}
                      onChange={(e) => handleInputChange('accountType', e.target.value)}
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${
                        errors.accountType ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    >
                      <option value="">Select Account Type</option>
                      <option value="Current">Current</option>
                      <option value="Saving">Saving</option>
                    </select>
                    {errors.accountType && <p className="text-xs font-bold text-rose-650">{errors.accountType}</p>}
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* STEP 5: Documents */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-3">Documents Onboarding</h3>
                <p className="text-xs text-slate-400 mt-1">Please upload the required and optional documents below. Required uploads are marked with a red asterisk (*).</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DocZone 
                  label="National ID Copy" 
                  field="docNationalId" 
                  value={formData.docNationalId} 
                  formats={['.pdf', '.jpg', '.jpeg']} 
                  maxSizeMB={5} 
                  error={errors.docNationalId} 
                  required={true}
                  onUpload={handleDocUpload} 
                />
                <DocZone 
                  label="Passport Copy" 
                  field="docPassport" 
                  value={formData.docPassport} 
                  formats={['.pdf', '.jpg', '.jpeg']} 
                  maxSizeMB={5} 
                  error={errors.docPassport} 
                  required={true}
                  onUpload={handleDocUpload} 
                />
                <DocZone 
                  label="Certificates (Optional)" 
                  field="docCertificates" 
                  value={formData.docCertificates} 
                  formats={['.pdf']} 
                  maxSizeMB={10} 
                  error={errors.docCertificates} 
                  required={false}
                  onUpload={handleDocUpload} 
                />
                <DocZone 
                  label="Experience Letters (Optional)" 
                  field="docExperienceLetters" 
                  value={formData.docExperienceLetters} 
                  formats={['.pdf']} 
                  maxSizeMB={10} 
                  error={errors.docExperienceLetters} 
                  required={false}
                  onUpload={handleDocUpload} 
                />
                <DocZone 
                  label="Medical Fitness" 
                  field="docMedicalFitness" 
                  value={formData.docMedicalFitness} 
                  formats={['.pdf']} 
                  maxSizeMB={5} 
                  error={errors.docMedicalFitness} 
                  required={true}
                  onUpload={handleDocUpload} 
                />
                <DocZone 
                  label="Bank Verification Letter" 
                  field="docBankVerification" 
                  value={formData.docBankVerification} 
                  formats={['.pdf']} 
                  maxSizeMB={5} 
                  error={errors.docBankVerification} 
                  required={true}
                  onUpload={handleDocUpload} 
                />
                <DocZone 
                  label="Professional Photograph" 
                  field="docProfessionalPhoto" 
                  value={formData.docProfessionalPhoto} 
                  formats={['.jpg', '.jpeg']} 
                  maxSizeMB={2} 
                  error={errors.docProfessionalPhoto} 
                  required={true}
                  onUpload={handleDocUpload} 
                />
                <DocZone 
                  label="Work Permits & Visas (Optional)" 
                  field="docWorkPermits" 
                  value={formData.docWorkPermits} 
                  formats={['.pdf']} 
                  maxSizeMB={5} 
                  error={errors.docWorkPermits} 
                  required={false}
                  onUpload={handleDocUpload} 
                />
              </div>
            </div>
          )}

          {/* STEP 6: Review */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-3">Review & Confirm</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information Summary Card */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center gap-2">
                    <User size={18} className="text-primary" />
                    <h4 className="font-bold text-slate-800 text-sm">Personal Information Summary</h4>
                  </div>
                  <div className="p-5 space-y-4">
                    {/* Candidate Identity Overview (Avatar + Name) */}
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center flex-shrink-0 shadow-inner">
                        {formData.avatarUrl ? (
                          <img src={formData.avatarUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                        ) : (
                          <User size={24} className="text-slate-400" />
                        )}
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Candidate Name</span>
                        <div className="font-bold text-slate-900 text-base">{formData.fullName || 'Not specified'}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Name</span>
                        <span className="font-bold text-slate-900">{formData.fullName || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">National ID</span>
                        <span className="font-bold text-slate-900">{formData.nationalId || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Basic Salary</span>
                        <span className="font-bold text-slate-900">{formData.basicSalary ? `${formData.basicSalary} ${formData.currency}` : 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Date of Birth</span>
                        <span className="font-semibold text-slate-700">{formData.dob ? formData.dob.split('-').reverse().join(' - ') : '-'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Gender & Nationality</span>
                        <span className="font-semibold text-slate-700">{formData.gender || '-'} ({formData.nationality || '-'})</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Personal Contact</span>
                        <span className="font-semibold text-slate-700 block truncate">{formData.personalPhone || '-'}</span>
                        {formData.personalEmail && <span className="text-slate-500 block truncate font-normal">{formData.personalEmail}</span>}
                      </div>
                    </div>

                    {/* Address details */}
                    <div className="pt-3 border-t border-slate-100 text-xs">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block mb-1">Address Details</span>
                      <span className="font-semibold text-slate-700 block">
                        {formData.addressLine1} {formData.addressLine2 ? `, ${formData.addressLine2}` : ''}
                      </span>
                      <span className="text-slate-500 block">
                        {formData.city}, {formData.country} {formData.stateProvince ? `, ${formData.stateProvince}` : ''} {formData.postalCode ? `(${formData.postalCode})` : ''}
                      </span>
                    </div>

                    {/* Emergency details */}
                    <div className="pt-3 border-t border-slate-100 text-xs">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block mb-1">Emergency Contact</span>
                      <span className="font-semibold text-slate-700 block">
                        {formData.emergencyContactName ? `${formData.emergencyContactName} (${formData.emergencyRelationship})` : '-'}
                      </span>
                      <span className="text-slate-500 block">
                        Phone: {formData.emergencyPhone || '-'} {formData.emergencyEmail ? `| ${formData.emergencyEmail}` : ''}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Employment Details Summary Card */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center gap-2">
                    <Shield size={18} className="text-emerald-600" />
                    <h4 className="font-bold text-slate-800 text-sm">Employment Details Summary</h4>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Department</span>
                        <span className="font-bold text-slate-900">{formData.department || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Job Title</span>
                        <span className="font-bold text-slate-900">{formData.jobTitle || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Start Date</span>
                        <span className="font-bold text-slate-900">{formData.startDate || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Work Email</span>
                        <span className="font-bold text-slate-900 truncate block">{calculatedEmail}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Employment & Location</span>
                        <span className="font-semibold text-slate-700 block">{formData.employmentType || '-'} ({formData.workLocation || '-'})</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Time-Off (Annual/Sick)</span>
                        <span className="font-semibold text-slate-700 block">{formData.annualLeave} Days / {formData.sickLeave} Days</span>
                      </div>
                    </div>

                    {/* Bank Payout info */}
                    <div className="pt-3 border-t border-slate-100 text-xs">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block mb-1">Disbursement Bank Details</span>
                      <span className="font-semibold text-slate-700 block">{formData.bankName || '-'} ({formData.accountType || '-'})</span>
                      <span className="text-slate-500 block">Account: {formData.accountNumber || '-'}</span>
                      <span className="text-slate-500 block font-mono text-[10px]">IBAN: {formData.iban || '-'}</span>
                    </div>

                    {/* Document list */}
                    <div className="pt-3 border-t border-slate-100 text-xs">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block mb-2">Attached Documents</span>
                      <div className="grid grid-cols-1 gap-1.5 text-[11px]">
                        <div className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                          <span className="text-slate-650">National ID Copy *</span>
                          <span className="font-bold text-slate-800 truncate max-w-[150px]">{formData.docNationalId || 'Not attached'}</span>
                        </div>
                        <div className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                          <span className="text-slate-650">Passport Copy *</span>
                          <span className="font-bold text-slate-800 truncate max-w-[150px]">{formData.docPassport || 'Not attached'}</span>
                        </div>
                        <div className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                          <span className="text-slate-655">Medical Fitness *</span>
                          <span className="font-bold text-slate-800 truncate max-w-[150px]">{formData.docMedicalFitness || 'Not attached'}</span>
                        </div>
                        <div className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                          <span className="text-slate-655">Bank Verification Letter *</span>
                          <span className="font-bold text-slate-800 truncate max-w-[150px]">{formData.docBankVerification || 'Not attached'}</span>
                        </div>
                        <div className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                          <span className="text-slate-655">Professional Photograph *</span>
                          <span className="font-bold text-slate-800 truncate max-w-[150px]">{formData.docProfessionalPhoto || 'Not attached'}</span>
                        </div>
                        {(formData.docCertificates || formData.docExperienceLetters || formData.docWorkPermits) && (
                          <div className="pt-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            Optional Attachments
                          </div>
                        )}
                        {formData.docCertificates && (
                          <div className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                            <span className="text-slate-655">Certificates</span>
                            <span className="font-bold text-slate-800 truncate max-w-[150px]">{formData.docCertificates}</span>
                          </div>
                        )}
                        {formData.docExperienceLetters && (
                          <div className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                            <span className="text-slate-655">Experience Letters</span>
                            <span className="font-bold text-slate-800 truncate max-w-[150px]">{formData.docExperienceLetters}</span>
                          </div>
                        )}
                        {formData.docWorkPermits && (
                          <div className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                            <span className="text-slate-655">Work Permits & Visas</span>
                            <span className="font-bold text-slate-800 truncate max-w-[150px]">{formData.docWorkPermits}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Confirmation Checkbox */}
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-xs flex items-start gap-2.5 text-primary leading-normal font-semibold">
                <Shield size={16} className="mt-0.5 flex-shrink-0" />
                <p>
                  By completing setup, the profile records will be committed to the employee registry database, starting the automated onboarding task checklist.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* 4. Form Navigation Controls Footer */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-4">
          <button 
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-1 px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-750 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <ChevronLeft size={14} />
            Previous
          </button>

          {currentStep === steps.length ? (
            <button 
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:opacity-90 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/10 cursor-pointer animate-in fade-in"
            >
              Submit Onboarding
              <CheckCircle2 size={14} />
            </button>
          ) : (
            <button 
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1 px-4 py-2 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-primary/10 cursor-pointer"
            >
              Next
              <ChevronRight size={14} />
            </button>
          )}
        </div>

      </form>
    </div>
  );
}

function DocZone({ label, field, value, formats, maxSizeMB, error, required, onUpload }) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(field, e.dataTransfer.files[0], formats, maxSizeMB);
    }
  };

  return (
    <div className="space-y-1.5 flex flex-col">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </span>
        <span className={`font-semibold ${value ? 'text-emerald-600' : 'text-slate-400'}`}>
          {value ? '✓ Attached' : 'Not attached'}
        </span>
      </div>
      
      <label 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
          error 
            ? 'border-rose-300 bg-rose-50/20 hover:bg-rose-50/30' 
            : isDragActive
              ? 'border-primary bg-primary/5'
              : value 
                ? 'border-emerald-300 bg-emerald-50/10 hover:bg-emerald-50/20' 
                : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 hover:border-primary/50'
        }`}
      >
        <Upload className={`mb-1.5 ${error ? 'text-rose-500' : value ? 'text-emerald-500' : 'text-slate-400'}`} size={20} />
        <span className="text-[11px] font-bold text-slate-700 truncate max-w-xs block">
          {value ? value : 'Choose file or drag here'}
        </span>
        <span className="text-[9px] text-slate-400 mt-0.5 block">
          Accepts: {formats.join(', ')} (Max {maxSizeMB} MB)
        </span>
        <input 
          type="file" 
          accept={formats.join(',')}
          onChange={(e) => onUpload(field, e.target.files[0], formats, maxSizeMB)}
          className="hidden" 
        />
      </label>
      {error && <p className="text-[10px] font-bold text-rose-600">{error}</p>}
    </div>
  );
}
