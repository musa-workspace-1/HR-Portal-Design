import React, { useState } from 'react';
import { 
  Users, UserCheck, CalendarOff, Briefcase, 
  Filter, Download, Plus, MapPin, 
  Sun, CheckCircle, AlertCircle, TrendingUp, TrendingDown, BarChart3, ChevronRight, Award, Gift, X,
  Clock, Settings, Target, Search
} from 'lucide-react';
import ExportModal from '../components/ExportModal';

export default function Dashboard({ setCurrentPage, setDirectoryView }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleKpiClick = (page) => {
    if (setCurrentPage) {
      setCurrentPage(page);
    }
  };

  const handleQuickActionClick = (page, view = 'list') => {
    if (page === 'employee-directory' && setDirectoryView) {
      setDirectoryView(view);
    }
    if (setCurrentPage) {
      setCurrentPage(page);
    }
  };

  // Committed Filter States
  const [leaveStatus, setLeaveStatus] = useState('All');
  const [headcountDept, setHeadcountDept] = useState('All');
  const [attendanceRange, setAttendanceRange] = useState('Full range');

  // Temp Filter States inside Modal
  const [tempLeaveStatus, setTempLeaveStatus] = useState('All');
  const [tempHeadcountDept, setTempHeadcountDept] = useState('All');
  const [tempAttendanceRange, setTempAttendanceRange] = useState('Full range');

  const openFilters = () => {
    setTempLeaveStatus(leaveStatus);
    setTempHeadcountDept(headcountDept);
    setTempAttendanceRange(attendanceRange);
    setIsFilterOpen(true);
  };

  const handleApply = () => {
    setLeaveStatus(tempLeaveStatus);
    setHeadcountDept(tempHeadcountDept);
    setAttendanceRange(tempAttendanceRange);
    setIsFilterOpen(false);
  };

  const handleReset = () => {
    setTempLeaveStatus('All');
    setTempHeadcountDept('All');
    setTempAttendanceRange('Full range');
  };

  const handleCancel = () => {
    setIsFilterOpen(false);
  };

  // Leaves Data
  const initialLeaves = [
    { name: 'Sarah Ahmed', type: 'Annual Leave', duration: '5 Days', initials: 'SA', color: 'bg-primary/20 text-primary', date: 'Jun 10 - Jun 14', status: 'Approved' },
    { name: 'Michael Chen', type: 'Sick Leave', duration: '2 Days', initials: 'MC', color: 'bg-purple-100 text-purple-700', date: 'Jun 6 - Jun 7', status: 'Pending' },
    { name: 'Ayesha Khan', type: 'Maternity', duration: '90 Days', initials: 'AK', color: 'bg-rose-100 text-rose-700', date: 'Jun 15 - Sep 15', status: 'Approved' },
    { name: 'David Smith', type: 'Unpaid Leave', duration: '1 Day', initials: 'DS', color: 'bg-amber-100 text-amber-700', date: 'Jun 8', status: 'Rejected' }
  ];

  const filteredLeaves = initialLeaves.filter(leave => {
    if (leaveStatus === 'All') return true;
    return leave.status === leaveStatus;
  });

  // Attendance Tracker Days
  const attendanceDays = [
    { day: 'Mon', present: 85, late: 10, absent: 5 },
    { day: 'Tue', present: 88, late: 8, absent: 4 },
    { day: 'Wed', present: 90, late: 5, absent: 5 },
    { day: 'Thu', present: 82, late: 12, absent: 6, isToday: true },
    { day: 'Fri', present: 0, late: 0, absent: 0, disabled: true }
  ];

  const filteredAttendance = attendanceRange === 'Last 3' ? attendanceDays.slice(-3) : attendanceDays;

  // Headcount Team Data
  const headcountData = [
    { dept: 'Engineering', count: 450, color: 'bg-primary' },
    { dept: 'Sales', count: 380, color: 'bg-blue-500' },
    { dept: 'Marketing', count: 250, color: 'bg-purple-500' },
    { dept: 'HR', count: 120, color: 'bg-emerald-500' }
  ];

  const filteredHeadcount = headcountDept === 'All' 
    ? headcountData 
    : headcountData.filter(d => d.dept === headcountDept);

  return (
    <div className="stagger">
      
      {/* Modal Filter Overlay */}
      {isFilterOpen && (
        <div className="overlay show">
          <div className="modal">
            
            <div className="modal-head">
              <h3>Dashboard filters</h3>
              <button onClick={handleCancel} className="btn ghost" style={{ padding: '4px', border: 'none' }}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
              <div className="field">
                <label>Leave Requests (Sidebar List)</label>
                <select value={tempLeaveStatus} onChange={(e) => setTempLeaveStatus(e.target.value)}>
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="field">
                <label>Headcount Chart</label>
                <select value={tempHeadcountDept} onChange={(e) => setTempHeadcountDept(e.target.value)}>
                  <option value="All">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              <div className="field">
                <label>Attendance Overview Chart</label>
                <select value={tempAttendanceRange} onChange={(e) => setTempAttendanceRange(e.target.value)}>
                  <option value="Full range">Full range (all points)</option>
                  <option value="Last 3">Last 3 data points</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                <button onClick={handleReset} className="btn ghost" style={{ border: 'none' }}>Reset</button>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={handleCancel} className="btn ghost">Cancel</button>
                  <button onClick={handleApply} className="btn primary">Apply filters</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />

      {/* Header & Actions */}
      <div className="sec-head" style={{ marginBottom: '18px', justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={openFilters} className="btn primary">
            <Filter size={16} /> Filter
          </button>
          <button className="btn primary" onClick={() => setIsExportModalOpen(true)}>
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* NEW Top KPI Cards Panel */}
      <div className="panel data-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px', width: '100%', padding: '16px 24px', borderRadius: '32px' }}>
        <TopKpiCard title="Total Employees" value="49,229" icon={<Users size={24} />} color="var(--coral)" bgColor="#f7eade" onClick={() => handleKpiClick('employee-directory')} />
        <TopKpiCard title="Total Projects" value="49,229" icon={<Target size={24} />} color="var(--sky)" bgColor="#eaf3fa" onClick={() => handleKpiClick('projects')} />
        <TopKpiCard title="Job Applicants" value="49,229" icon={<Search size={24} />} color="var(--sage)" bgColor="#eaf4ee" onClick={() => handleKpiClick('recruitment-dashboard')} />
      </div>

      <div className="dash-grid">
        
        {/* Left Column */}
        <div className="stagger">

          {/* Quick Actions */}
          <div className="panel" style={{ marginBottom: '18px' }}>
            <div className="sec-head"><h3>Quick Actions</h3></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', overflowX: 'auto', paddingBottom: '8px', paddingLeft: '4px', paddingRight: '4px' }}>
              <QuickAction icon={<Plus size={20} />} label="Add Employee" color="#334155" bgColor="#f1f5f9" onClick={() => handleQuickActionClick('employee-directory', 'add')} />
              <QuickAction icon={<Briefcase size={20} />} label="Post Job" color="#9333ea" bgColor="#faf5ff" onClick={() => handleQuickActionClick('recruitment-dashboard')} />
              <QuickAction icon={<DollarSignIcon size={20} />} label="Payroll" color="#16a34a" bgColor="#f0fdf4" onClick={() => handleQuickActionClick('payroll-dashboard')} />
              <QuickAction icon={<CheckCircle size={20} />} label="Attendance" color="#ea580c" bgColor="#fff7ed" onClick={() => handleQuickActionClick('attendance-dashboard')} />
              <QuickAction icon={<CalendarOff size={20} />} label="Leaves" color="#dc2626" bgColor="#fef2f2" onClick={() => handleQuickActionClick('leave')} />
              <QuickAction icon={<BarChart3 size={20} />} label="Reports" color="#4f46e5" bgColor="#eef2ff" onClick={() => {}} />
              <QuickAction icon={<UploadIcon size={20} />} label="Upload Doc" color="#475569" bgColor="#f8fafc" onClick={() => {}} />
            </div>
          </div>

          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {/* Payroll Progress */}
            <div className="panel" onClick={() => handleKpiClick('payroll-dashboard')} style={{ cursor: 'pointer' }}>
              <div className="sec-head">
                <h3>Payroll Cycle (June)</h3>
                <span className="pill green">Active</span>
              </div>
              <div className="wf-row">
                <div className="wf-top">
                  <div className="wf-lbl">Processed (128 / 156)</div>
                  <div className="wf-num">82%</div>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: '82%' }}></div>
                </div>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--ink-3)', marginTop: '12px' }}>Cycle closes in 3 days. 28 reviews pending.</p>
            </div>

            {/* Attendance Chart */}
            <div className="panel" onClick={() => handleKpiClick('attendance-dashboard')} style={{ cursor: 'pointer' }}>
              <div className="sec-head">
                <h3>Weekly Attendance</h3>
                <span className="pill brand">{attendanceRange === 'Last 3' ? 'Last 3 points' : 'Full range'}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {filteredAttendance.map(day => (
                  <AttendanceBar key={day.day} day={day.day} present={day.present} late={day.late} absent={day.absent} disabled={day.disabled} isToday={day.isToday} />
                ))}
              </div>
            </div>

            {/* Headcount Chart */}
            <div className="panel" onClick={() => handleKpiClick('employee-directory')} style={{ cursor: 'pointer', gridColumn: '1 / -1' }}>
              <div className="sec-head">
                <h3>Headcount by Team</h3>
                <span className="pill brand">{headcountDept === 'All' ? 'All Teams' : headcountDept}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                {filteredHeadcount.length === 0 ? (
                  <div className="empty">No data found</div>
                ) : (
                  filteredHeadcount.map(d => (
                    <div key={d.dept}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>
                        <span>{d.dept}</span>
                        <span>{d.count}</span>
                      </div>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${(d.count / 450) * 100}%`, background: d.dept === 'HR' ? 'var(--sage)' : d.dept === 'Sales' ? 'var(--sky)' : d.dept === 'Marketing' ? 'var(--coral)' : 'var(--brand)' }}></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column */}
        <div className="stagger">
          
          {/* Clock Widget */}
          <div className="clock-card" style={{ marginBottom: '18px' }}>
            <div className="clock-time">10:24 AM</div>
            <div className="clock-date">Thursday, June 6, 2026</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px', color: '#9c9388', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> New York</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Sun size={14} /> 72°F</div>
            </div>
          </div>

          {/* Leave Tracker */}
          <div className="panel" style={{ marginBottom: '18px', cursor: 'pointer' }} onClick={() => handleKpiClick('leave')}>
            <div className="sec-head">
              <h3>Leave Tracker</h3>
              <span className="pill gray">{leaveStatus === 'All' ? 'All' : leaveStatus}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredLeaves.length === 0 ? (
                <div className="empty">No {leaveStatus !== 'All' ? leaveStatus.toLowerCase() : ''} leaves found.</div>
              ) : (
                filteredLeaves.map((leave, idx) => (
                  <LeaveItem 
                    key={idx}
                    name={leave.name} 
                    type={leave.type} 
                    duration={leave.duration} 
                    initials={leave.initials} 
                    color={leave.color} 
                    date={leave.date} 
                    status={leave.status}
                  />
                ))
              )}
            </div>
          </div>

          {/* Celebrations */}
          <div className="meeting-card">
            <h3>Celebrations</h3>
            
            <div className="mtg">
              <div className="mt" style={{ color: 'var(--coral)' }}><Gift size={14} style={{ marginRight: '4px' }} /> Birthdays Today</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                <CelebrationItem name="James Rivera" role="Frontend Developer" avatar="https://i.pravatar.cc/150?u=james" />
                <CelebrationItem name="Sarah Ahmed" role="Creative Director" avatar="https://i.pravatar.cc/150?u=sarah" />
              </div>
            </div>

            <div className="mtg">
              <div className="mt" style={{ color: 'var(--gold)' }}><Award size={14} style={{ marginRight: '4px' }} /> Work Anniversaries</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                <CelebrationItem name="Elena Rodriguez" role="Product Manager" avatar="https://i.pravatar.cc/150?u=elena" meta="3 Years" metaColor="gold" />
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
}

function TopKpiCard({ title, value, icon, color, bgColor, onClick }) {
  return (
    <div 
      onClick={onClick} 
      style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px', 
        padding: '8px 16px', 
        background: 'transparent',
        cursor: 'pointer',
        minWidth: '200px'
      }}
    >
      <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: bgColor, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '12px', color: 'var(--ink-2)', fontWeight: '700', marginBottom: '4px' }}>{title}</div>
        <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--coral)', letterSpacing: '-0.5px', lineHeight: 1 }}>{value}</div>
      </div>
    </div>
  );
}
function KpiCard({ title, value, trend, trendValue, icon, color, bgColor, onClick }) {
  const isUp = trend === 'up';
  return (
    <div onClick={onClick} className="stat-mini">
      <div className="si" style={{ background: bgColor, color: color }}>
        {icon}
      </div>
      <div>
        <div className="sl">{title}</div>
        <div className="sv" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {value}
          <span style={{ fontSize: '10px', color: isUp ? 'var(--sage)' : 'var(--coral)', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
            {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trendValue.split(' ')[0]}
          </span>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon, label, color, bgColor, onClick }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
      <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: bgColor, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-2)' }}>{label}</span>
    </div>
  );
}

function LeaveItem({ name, type, duration, initials, color, date, status }) {
  let statusBadge = 'pill green';
  if (status === 'Pending') statusBadge = 'pill gold';
  if (status === 'Rejected') statusBadge = 'pill coral';

  return (
    <div className="notif-item" style={{ padding: '8px', borderBottom: 'none', background: 'var(--surface-2)', borderRadius: '12px', marginBottom: '4px' }}>
      <div className="ni" style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}>
        {initials}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <b>{name}</b>
          <span className={statusBadge} style={{ transform: 'scale(0.85)', transformOrigin: 'right center' }}>{status}</span>
        </p>
        <div className="nt">{type} • {date} • {duration}</div>
      </div>
    </div>
  );
}

function CelebrationItem({ name, role, avatar, meta, metaColor }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <img src={avatar} alt={name} style={{ width: '36px', height: '36px', borderRadius: '12px', objectFit: 'cover' }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{name}</div>
        <div style={{ fontSize: '11px', color: '#9c9388' }}>{role}</div>
      </div>
      {meta && (
        <span className={`pill ${metaColor}`}>{meta}</span>
      )}
    </div>
  );
}

function AttendanceBar({ day, present, late, absent, disabled, isToday }) {
  const total = disabled ? 100 : present + late + absent;
  const pWidth = disabled ? 0 : (present / total) * 100;
  const lWidth = disabled ? 0 : (late / total) * 100;
  const aWidth = disabled ? 0 : (absent / total) * 100;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: disabled ? 0.4 : 1 }}>
      <div style={{ width: '28px', fontSize: '12px', fontWeight: isToday ? 800 : 600, color: isToday ? 'var(--brand)' : 'var(--ink-2)' }}>{day}</div>
      <div className="bar-track" style={{ flex: 1, display: 'flex', background: 'var(--line)' }}>
        {!disabled && (
          <>
            <div style={{ width: `${pWidth}%`, background: 'var(--sage)', height: '100%' }}></div>
            <div style={{ width: `${lWidth}%`, background: 'var(--gold)', height: '100%' }}></div>
            <div style={{ width: `${aWidth}%`, background: 'var(--coral)', height: '100%' }}></div>
          </>
        )}
      </div>
      <div style={{ width: '24px', textAlign: 'right', fontSize: '11px', fontWeight: 600, color: 'var(--ink-3)' }}>
        {!disabled ? present + late : '-'}
      </div>
    </div>
  );
}

// Simple icons not natively in lucide-react or customized
function DollarSignIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  );
}

function UploadIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
  );
}
