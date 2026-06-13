import React from 'react';
import { 
  ChevronLeft, Download, RefreshCw, CheckCircle2,
  CheckCircle, Plus, AlertCircle, Clock
} from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';

export default function OnboardingDetail({ setCurrentPage, employee }) {
  
  if (!employee) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--ink-2)' }}>
        <p>No employee selected. Please go back and select an employee.</p>
        <button className="btn primary" onClick={() => setCurrentPage && setCurrentPage('onboarding')} style={{ marginTop: '16px' }}>
          Back to Onboarding
        </button>
      </div>
    );
  }

  const {
    name,
    role,
    department,
    startDate,
    status,
    progress,
    stepsCompleted,
    stepsTotal,
    avatar
  } = employee;

  // Pie chart data
  const pieData = [
    { name: 'Completed', value: progress, color: progress === 100 ? 'var(--sage)' : 'var(--brand)' },
    { name: 'Pending', value: 100 - progress, color: 'var(--surface-2)' },
  ];

  const pendingCount = stepsTotal - stepsCompleted;
  const inProgressCount = status === 'In Progress' ? 1 : 0;
  const actualPendingCount = status === 'In Progress' ? pendingCount - 1 : pendingCount;

  // Base steps templates
  const baseSteps = [
    {
      title: 'Offer letter signed',
      desc: 'Confirms the formal role, salary, and start date.'
    },
    {
      title: 'Background verification',
      desc: 'Covers criminal, education, and employment history checks via a third-party agency.'
    },
    {
      title: 'Document collection',
      desc: 'Verification that all required government IDs, passports, address proofs, and academic certificates have been uploaded.',
      note: 'All required HR documents uploaded with employee record'
    },
    {
      title: 'Contract / employment agreement signed',
      desc: 'Covers the legally binding employment contract.'
    },
    {
      title: 'IT Hardware Provisioning',
      desc: 'Laptops and other required hardware are provisioned and shipped.'
    },
    {
      title: 'First Day Orientation',
      desc: 'Introduction to company culture and team members.'
    }
  ];

  // Dynamically generate steps based on stepsTotal
  const stepsList = Array.from({ length: stepsTotal }).map((_, index) => {
    const baseStep = baseSteps[index] || { title: `Onboarding Step ${index + 1}`, desc: 'Required onboarding task.' };
    
    let stepStatus = 'Pending';
    if (index < stepsCompleted) stepStatus = 'Completed';
    else if (index === stepsCompleted && status === 'In Progress') stepStatus = 'In Progress';

    return {
      id: index + 1,
      ...baseStep,
      status: stepStatus,
      by: stepStatus === 'Completed' ? name : '-',
    };
  });

  return (
    <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. Header & Quick Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <button className="btn ghost" onClick={() => setCurrentPage && setCurrentPage('onboarding')} style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ChevronLeft size={16} /> Back
        </button>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn ghost" style={{ background: 'var(--surface)' }}>
            <Download size={16} /> Export Checklist
          </button>
          <button className="btn primary">
            <RefreshCw size={16} /> Sync steps from Settings
          </button>
        </div>
      </div>

      {/* 2. Status Notification */}
      {progress === 100 ? (
        <div style={{ background: 'var(--sage-soft)', border: '1px solid var(--sage)', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <CheckCircle2 size={20} style={{ color: 'var(--sage)', marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: '700', color: 'var(--sage)', fontSize: '15px', marginBottom: '4px' }}>Onboarding complete! All steps have been finished.</div>
            <div style={{ color: 'var(--sage)', fontSize: '14px' }}>All required steps have been completed. {name} is fully onboarded.</div>
          </div>
        </div>
      ) : progress > 0 ? (
        <div style={{ background: 'var(--brand-soft)', border: '1px solid var(--brand)', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <Clock size={20} style={{ color: 'var(--brand)', marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: '700', color: 'var(--brand)', fontSize: '15px', marginBottom: '4px' }}>Onboarding in progress</div>
            <div style={{ color: 'var(--brand)', fontSize: '14px' }}>{name} has completed {stepsCompleted} out of {stepsTotal} required steps.</div>
          </div>
        </div>
      ) : (
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <AlertCircle size={20} style={{ color: 'var(--ink-2)', marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: '700', color: 'var(--ink)', fontSize: '15px', marginBottom: '4px' }}>Onboarding not started</div>
            <div style={{ color: 'var(--ink-2)', fontSize: '14px' }}>No steps have been completed yet for {name}.</div>
          </div>
        </div>
      )}

      {/* 3. Employee Profile & Summary Metrics */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {/* Profile Snapshot */}
        <div className="panel" style={{ flex: '1 1 300px', display: 'flex', alignItems: 'center', gap: '20px', padding: '24px' }}>
          <img src={avatar} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '20px', objectFit: 'cover' }} />
          <div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--ink)' }}>{name}</div>
            <div style={{ fontSize: '14px', color: 'var(--ink-2)', marginBottom: '4px' }}>{role}</div>
            <div style={{ fontSize: '13px', color: 'var(--ink-3)' }}>{department}</div>
            <div style={{ fontSize: '12px', color: 'var(--brand)', marginTop: '8px', fontWeight: '600' }}>Start Date: {startDate}</div>
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

      {/* 4. Workflow Steps & Details */}
      <div className="panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--ink)', marginBottom: '6px' }}>Onboarding Steps</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ flex: 1, width: '200px', height: '6px', background: 'var(--surface-2)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: progress === 100 ? 'var(--sage)' : 'var(--brand)', borderRadius: '10px' }}></div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--ink-2)', fontWeight: '600' }}>{stepsCompleted} of {stepsTotal} steps done</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {stepsList.map((step) => (
            <div key={step.id} style={{ display: 'flex', gap: '16px', padding: '20px', background: 'var(--surface)', borderRadius: '16px', border: step.status === 'In Progress' ? '1px solid var(--brand)' : '1px solid var(--line)' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: step.status === 'Completed' ? 'var(--sage)' : step.status === 'In Progress' ? 'var(--brand)' : 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                {step.status === 'Completed' ? <CheckCircle size={14} style={{ color: '#fff' }} /> : step.status === 'In Progress' ? <Clock size={14} style={{ color: '#fff' }} /> : <AlertCircle size={14} style={{ color: 'var(--ink-3)' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--ink)', marginBottom: '4px' }}>{step.title}</div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px' }}>
                      <span style={{ padding: '2px 8px', background: 'var(--surface-2)', borderRadius: '4px', fontWeight: '600', color: 'var(--ink-2)' }}>Mandatory</span>
                      <span style={{ color: 'var(--ink-3)' }}>•</span>
                      <span style={{ color: step.status === 'Completed' ? 'var(--sage)' : step.status === 'In Progress' ? 'var(--brand)' : 'var(--ink-3)', fontWeight: '600' }}>
                        {step.status === 'Completed' ? (step.title === 'Document collection' ? 'Completed by system' : `Completed by ${step.by}`) : step.status}
                      </span>
                    </div>
                  </div>
                  {step.title !== 'Document collection' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn ghost" style={{ fontSize: '12px', padding: '6px 12px' }}>Completion Details</button>
                      <button className="btn ghost" style={{ fontSize: '12px', padding: '6px 12px', background: 'var(--surface-2)' }}>
                        <Plus size={14} /> Add Note
                      </button>
                    </div>
                  )}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.5' }}>{step.desc}</div>
                {step.note && (
                  <div style={{ marginTop: '12px', padding: '12px', background: 'var(--surface-2)', borderRadius: '8px', fontSize: '13px', color: 'var(--ink)', borderLeft: '3px solid var(--brand)' }}>
                    <span style={{ fontWeight: '600' }}>Note: </span> {step.note}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
