import React, { useState } from 'react';
import Icon from '../components/Icon';

export default function AddEmployee({ onCancel, onAdd }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    nationality: '',
    nationalId: '',
    personalPhone: '',
    personalEmail: '',
    department: '',
    jobTitle: '',
    basicSalary: '',
    currency: 'PKR',
    bankName: '',
    accountNumber: '',
    iban: '',
  });

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (onAdd) onAdd(formData);
  };

  return (
    <div className="stagger">
      <div className="sec-head">
        <h3>Add New Employee</h3>
        <button className="btn ghost" onClick={onCancel}><Icon name="x" /> Cancel</button>
      </div>

      <div className="panel" style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {[1, 2, 3, 4, 5, 6].map(step => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: currentStep >= step ? 'var(--brand)' : 'var(--surface-3)',
                color: currentStep >= step ? '#fff' : 'var(--ink-3)',
                display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 700
              }}>
                {step}
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: currentStep >= step ? 'var(--ink)' : 'var(--ink-3)' }}>
                {['Personal', 'Contact', 'Employment', 'Salary', 'Documents', 'Review'][step - 1]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        {currentStep === 1 && (
          <div className="grid">
            <h4 style={{ fontSize: '14px', marginBottom: '10px' }}>Personal Information</h4>
            <div className="field">
              <label>Full Name *</label>
              <input value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} placeholder="e.g. Shah Zaib" />
            </div>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="field">
                <label>Date of Birth *</label>
                <input type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
              </div>
              <div className="field">
                <label>Gender *</label>
                <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                  <option value="">Select</option><option>Male</option><option>Female</option>
                </select>
              </div>
            </div>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="field">
                <label>Nationality *</label>
                <input value={formData.nationality} onChange={e => setFormData({...formData, nationality: e.target.value})} />
              </div>
              <div className="field">
                <label>National ID *</label>
                <input value={formData.nationalId} onChange={e => setFormData({...formData, nationalId: e.target.value})} placeholder="00000-0000000-0" />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="grid">
            <h4 style={{ fontSize: '14px', marginBottom: '10px' }}>Contact Details</h4>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="field">
                <label>Personal Phone *</label>
                <input value={formData.personalPhone} onChange={e => setFormData({...formData, personalPhone: e.target.value})} placeholder="+92 300 0000000" />
              </div>
              <div className="field">
                <label>Personal Email</label>
                <input type="email" value={formData.personalEmail} onChange={e => setFormData({...formData, personalEmail: e.target.value})} />
              </div>
            </div>
            <div className="field">
              <label>Address</label>
              <textarea placeholder="Full residential address"></textarea>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="grid">
            <h4 style={{ fontSize: '14px', marginBottom: '10px' }}>Employment Details</h4>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="field">
                <label>Department *</label>
                <select value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
                  <option value="">Select Department</option>
                  <option>Engineering</option><option>Sales</option><option>Creative & Design</option>
                </select>
              </div>
              <div className="field">
                <label>Job Title *</label>
                <input value={formData.jobTitle} onChange={e => setFormData({...formData, jobTitle: e.target.value})} placeholder="e.g. Senior Engineer" />
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="grid">
            <h4 style={{ fontSize: '14px', marginBottom: '10px' }}>Salary Structure</h4>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="field">
                <label>Basic Salary *</label>
                <input type="number" value={formData.basicSalary} onChange={e => setFormData({...formData, basicSalary: e.target.value})} placeholder="100000" />
              </div>
              <div className="field">
                <label>Currency</label>
                <select value={formData.currency} onChange={e => setFormData({...formData, currency: e.target.value})}>
                  <option>PKR</option><option>USD</option><option>AED</option>
                </select>
              </div>
            </div>
            <h4 style={{ fontSize: '14px', marginTop: '10px', marginBottom: '10px' }}>Bank Details</h4>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="field">
                <label>Bank Name *</label>
                <input value={formData.bankName} onChange={e => setFormData({...formData, bankName: e.target.value})} />
              </div>
              <div className="field">
                <label>Account Number *</label>
                <input value={formData.accountNumber} onChange={e => setFormData({...formData, accountNumber: e.target.value})} />
              </div>
            </div>
            <div className="field">
              <label>IBAN *</label>
              <input value={formData.iban} onChange={e => setFormData({...formData, iban: e.target.value})} />
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="grid">
            <h4 style={{ fontSize: '14px', marginBottom: '10px' }}>Documents Upload</h4>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="field">
                <label>National ID Copy (PDF, JPG) *</label>
                <input type="file" />
              </div>
              <div className="field">
                <label>Passport Copy (PDF, JPG) *</label>
                <input type="file" />
              </div>
              <div className="field">
                <label>Medical Fitness (PDF) *</label>
                <input type="file" />
              </div>
              <div className="field">
                <label>Bank Verification Letter (PDF) *</label>
                <input type="file" />
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="grid">
            <h4 style={{ fontSize: '14px', marginBottom: '10px' }}>Review Data</h4>
            <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: '12px', fontSize: '13px' }}>
              <p><b>Name:</b> {formData.fullName || '-'}</p>
              <p><b>Department:</b> {formData.department || '-'}</p>
              <p><b>Job Title:</b> {formData.jobTitle || '-'}</p>
              <p><b>Salary:</b> {formData.basicSalary} {formData.currency}</p>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
          <button className="btn ghost" onClick={handlePrev} disabled={currentStep === 1}>Previous</button>
          {currentStep < 6 ? (
            <button className="btn primary" onClick={handleNext}>Next Step <Icon name="arrow" /></button>
          ) : (
            <button className="btn primary" onClick={handleSubmit}><Icon name="check" /> Submit</button>
          )}
        </div>
      </div>
    </div>
  );
}
