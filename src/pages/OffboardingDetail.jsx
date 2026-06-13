import React from 'react';
import { 
  ChevronLeft, Download, CheckCircle2, AlertCircle, Clock,
  FileText, DollarSign, Monitor, Briefcase, GraduationCap, XOctagon, Plus
} from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';

export default function OffboardingDetail({ setCurrentPage, employee }) {
  if (!employee) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--ink-2)' }}>
        <p>No employee selected. Please go back and select an employee.</p>
        <button className="btn primary" onClick={() => setCurrentPage && setCurrentPage('offboarding')} style={{ marginTop: '16px' }}>
          Back to Offboarding
        </button>
      </div>
    );
  }

  const {
    name,
    role,
    department,
    lastDay,
    reason,
    status,
    progress,
    stepsCompleted,
    stepsTotal,
    avatar
  } = employee;

  const pieData = [
    { name: 'Completed', value: progress, color: progress === 100 ? 'var(--sage)' : 'var(--brand)' },
    { name: 'Pending', value: 100 - progress, color: 'var(--surface-2)' },
  ];

  const pendingCount = stepsTotal - stepsCompleted;
  const inProgressCount = status === 'In Progress' ? 1 : 0;
  const actualPendingCount = status === 'In Progress' ? pendingCount - 1 : pendingCount;

  // Data structure for the offboarding categories
  const offboardingCategories = [
    {
      title: "1. Documentation & Legal",
      icon: <FileText size={18} style={{ color: 'var(--brand)' }} />,
      steps: [
        { title: 'Resignation / termination letter', type: 'Mandatory', desc: 'Formal written notice from employee or termination letter from company on file.' },
        { title: 'Final employment certificate', type: 'Optional', desc: 'Official document confirming job title, tenure, and role responsibilities.' },
        { title: 'Exit interview', type: 'Optional', desc: 'Structured conversation to gather feedback on experience, culture, and management.' },
        { title: 'Clearance certificate', type: 'Mandatory', desc: 'All-departments sign-off confirming assets returned, dues cleared, and access revoked.' },
        { title: 'Non-compete / non-solicitation agreement', type: 'Optional', desc: 'Post-employment restrictions on joining competitors or soliciting clients/staff.' },
        { title: 'Confidentiality reminder agreement', type: 'Optional', desc: 'Formal reminder of ongoing NDA obligations after departure.' }
      ]
    },
    {
      title: "2. Payroll & Finance",
      icon: <DollarSign size={18} style={{ color: 'var(--sage)' }} />,
      steps: [
        { title: 'Final payroll processing', type: 'Mandatory', desc: 'Calculate and disburse final salary including unpaid wages up to last working day.' },
        { title: 'Outstanding expense reimbursement', type: 'Optional', desc: 'Review and settle all pending employee expense claims before exit.' },
        { title: 'Leave balance payout', type: 'Optional', desc: 'Calculate and pay out any accrued but unused annual leave per policy.' },
        { title: 'Tax documents issued', type: 'Optional', desc: 'Issue P45, Form 16, or jurisdiction-equivalent tax separation document.' },
        { title: 'Benefits termination', type: 'Optional', desc: 'Formally close health insurance, dental, vision, and other active benefit plans.' },
        { title: 'Pension / retirement processing', type: 'Optional', desc: 'Transfer or close pension/provident fund account as per employee choice.' },
        { title: 'Loan / salary advance recovery', type: 'Optional', desc: 'Deduct or arrange repayment of any outstanding company loans or advances.' }
      ]
    },
    {
      title: "3. IT & Access Revocation",
      icon: <Monitor size={18} style={{ color: 'var(--coral)' }} />,
      steps: [
        { title: 'Email / system access revoked', type: 'Mandatory', desc: 'Disable all company email accounts, HRMS, ERP, and system logins on last day.' },
        { title: 'Software license deactivated', type: 'Optional', desc: 'Reclaim and reassign software licenses (Adobe, Microsoft, etc.) from departing employee.' },
        { title: 'VPN / remote access removed', type: 'Optional', desc: 'Remove all VPN credentials and remote access privileges immediately.' },
        { title: 'Company directory removal', type: 'Optional', desc: 'Remove employee from internal org chart, directory, and communication channels.' },
        { title: 'Social / company account access revoked', type: 'Optional', desc: 'Remove access to company social media, LinkedIn page, and external-facing accounts.' },
        { title: 'Data backup / transfer completed', type: 'Optional', desc: 'Back up or transfer work files, emails, and documents to successor or IT.' }
      ]
    },
    {
      title: "4. Asset Return",
      icon: <Briefcase size={18} style={{ color: 'var(--amber)' }} />,
      steps: [
        { title: 'Laptop / computer returned', type: 'Mandatory', desc: 'All company-issued computing equipment collected, wiped, and logged into inventory.' },
        { title: 'ID badge / access card returned', type: 'Mandatory', desc: 'Physical access cards and ID badges deactivated and collected.' },
        { title: 'Office keys / key fob returned', type: 'Optional', desc: 'All physical keys including server room, cabinet, and office keys returned.' },
        { title: 'Mobile phone / device returned', type: 'Optional', desc: 'Company-issued smartphones, tablets, and other mobile devices collected.' },
        { title: 'Company vehicle returned', type: 'Optional', desc: 'Car, motorcycle, or other company vehicle returned with keys and documentation.' },
        { title: 'Locker clearance confirmed', type: 'Optional', desc: 'Employee clears personal belongings and returns locker access.' }
      ]
    },
    {
      title: "5. Knowledge Transfer",
      icon: <GraduationCap size={18} style={{ color: 'var(--ocean)' }} />,
      steps: [
        { title: 'Project handover documentation', type: 'Optional', desc: 'Comprehensive written handover of all active projects, status, and next steps.' },
        { title: 'Ongoing task handover to successor', type: 'Optional', desc: 'Direct handover of day-to-day responsibilities to replacement or team lead.' },
        { title: 'Client / stakeholder notification', type: 'Optional', desc: 'Formal communication informing key clients or stakeholders of the change in contact.' },
        { title: 'Knowledge base / documentation updated', type: 'Optional', desc: 'Internal wiki, SOPs, and runbooks updated to reflect departing employee\'s knowledge.' },
        { title: 'Successor training completed', type: 'Optional', desc: 'Outgoing employee trains their replacement on tools, processes, and contacts.' }
      ]
    },
    {
      title: "6. Closure & Farewell",
      icon: <XOctagon size={18} style={{ color: 'var(--ink-2)' }} />,
      steps: [
        { title: 'Payroll system removal', type: 'Mandatory', desc: 'Employee fully removed from payroll system to prevent accidental future payments.' },
        { title: 'Reference letter issuance', type: 'Optional', desc: 'Formal reference letter provided confirming employment details and performance.' },
        { title: 'Team announcement sent', type: 'Optional', desc: 'Internal announcement notifying colleagues of the departure and transition plan.' },
        { title: 'Farewell event organized', type: 'Optional', desc: 'Optional farewell lunch, gathering, or virtual send-off organized by HR or team.' },
        { title: 'Alumni network enrollment', type: 'Optional', desc: 'Invite departing employee to join company alumni program for future networking.' }
      ]
    }
  ];

  return (
    <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. Header & Quick Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <button className="btn ghost" onClick={() => setCurrentPage && setCurrentPage('offboarding')} style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ChevronLeft size={16} /> Back
        </button>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn ghost" style={{ background: 'var(--surface)' }}>
            <Download size={16} /> Export Checklist
          </button>
        </div>
      </div>

      {/* 2. Employee Profile & Summary Metrics */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        
        {/* Profile Snapshot */}
        <div className="panel" style={{ flex: '1 1 300px', display: 'flex', alignItems: 'center', gap: '20px', padding: '24px' }}>
          <img src={avatar} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '20px', objectFit: 'cover' }} />
          <div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--ink)' }}>{name}</div>
            <div style={{ fontSize: '14px', color: 'var(--ink-2)', marginBottom: '4px' }}>{role}</div>
            <div style={{ fontSize: '13px', color: 'var(--ink-3)' }}>{department}</div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--coral)', fontWeight: '600', padding: '2px 8px', background: 'var(--coral-soft)', borderRadius: '12px' }}>{reason}</span>
              <span style={{ fontSize: '12px', color: 'var(--brand)', fontWeight: '600', padding: '2px 8px', background: 'var(--brand-soft)', borderRadius: '12px' }}>Last Day: {lastDay}</span>
            </div>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="panel data-bar" style={{ flex: '2 1 500px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '24px', flex: 1, justifyContent: 'space-around' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: 'var(--ink-3)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>Completed</div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--ink)' }}>{stepsCompleted} <span style={{ fontSize: '14px', color: 'var(--ink-3)', fontWeight: '500' }}>steps</span></div>
            </div>
            <div style={{ width: '1px', background: 'var(--line)' }}></div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: 'var(--ink-3)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>In Progress</div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--ink)' }}>{inProgressCount} <span style={{ fontSize: '14px', color: 'var(--ink-3)', fontWeight: '500' }}>steps</span></div>
            </div>
            <div style={{ width: '1px', background: 'var(--line)' }}></div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: 'var(--ink-3)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>Pending</div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--ink)' }}>{actualPendingCount} <span style={{ fontSize: '14px', color: 'var(--ink-3)', fontWeight: '500' }}>steps</span></div>
            </div>
            <div style={{ width: '1px', background: 'var(--line)' }}></div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: 'var(--ink-3)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>Total</div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--ink)' }}>{stepsTotal} <span style={{ fontSize: '14px', color: 'var(--ink-3)', fontWeight: '500' }}>steps</span></div>
            </div>
          </div>

          <div style={{ width: '120px', height: '120px', position: 'relative' }}>
            <PieChart width={120} height={120}>
              <Pie
                data={pieData}
                innerRadius={40}
                outerRadius={55}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <div style={{ fontSize: '20px', fontWeight: '700', color: progress === 100 ? 'var(--sage)' : 'var(--brand)' }}>{progress}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Workflow Steps & Categories */}
      <div className="panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--ink)', marginBottom: '6px' }}>Offboarding Workflow Checklist</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ flex: 1, width: '200px', height: '6px', background: 'var(--surface-2)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: progress === 100 ? 'var(--sage)' : 'var(--brand)', borderRadius: '10px' }}></div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--ink-2)', fontWeight: '600' }}>{stepsCompleted} of {stepsTotal} steps done</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {offboardingCategories.map((category, catIndex) => (
            <div key={catIndex}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid var(--line)' }}>
                {category.icon}
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--ink)' }}>{category.title}</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {category.steps.map((step, stepIndex) => (
                  <div key={stepIndex} style={{ display: 'flex', gap: '16px', padding: '20px', background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--line)' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <AlertCircle size={14} style={{ color: 'var(--ink-3)' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--ink)', marginBottom: '4px' }}>{step.title}</div>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px' }}>
                            <span style={{ padding: '2px 8px', background: 'var(--surface-2)', borderRadius: '4px', fontWeight: '600', color: 'var(--ink-2)' }}>{step.type}</span>
                            <span style={{ color: 'var(--ink-3)' }}>•</span>
                            <span style={{ color: 'var(--ink-3)', fontWeight: '600' }}>Pending</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn ghost" style={{ fontSize: '12px', padding: '6px 12px', color: 'var(--sage)' }}><CheckCircle2 size={14}/> Mark Complete</button>
                          <button className="btn ghost" style={{ fontSize: '12px', padding: '6px 12px', color: 'var(--brand)' }}><Clock size={14}/> Mark In Progress</button>
                          <button className="btn ghost" style={{ fontSize: '12px', padding: '6px 12px', color: 'var(--ink-3)' }}>Skip</button>
                          <button className="btn ghost" style={{ fontSize: '12px', padding: '6px 12px', background: 'var(--surface-2)' }}>
                            <Plus size={14} /> Add Note
                          </button>
                        </div>
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.5' }}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
