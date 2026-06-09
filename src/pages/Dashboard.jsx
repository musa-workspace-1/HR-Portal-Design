import React, { useState } from 'react';
import { 
  Users, UserCheck, CalendarOff, Briefcase, 
  Filter, Download, Plus, MapPin, 
  Sun, CheckCircle, AlertCircle, TrendingUp, TrendingDown, BarChart3, ChevronRight, Award, Gift, X
} from 'lucide-react';

export default function Dashboard({ setCurrentPage, setDirectoryView }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-0">
      
      {/* Modal Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Dashboard filters</h3>
              <button 
                onClick={handleCancel}
                className="text-slate-400 hover:text-slate-650 p-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content / Contextual Note & Fields */}
            <div className="p-6 space-y-6">
              
              {/* Contextual Note */}
              <div className="bg-blue-50/50 border border-blue-100 text-blue-700 p-3.5 rounded-xl text-xs leading-normal flex items-start gap-2.5">
                <AlertCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="font-medium">
                  Narrow charts and the leave list. KPI cards still show company-wide totals from the server.
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                
                {/* Leave Requests Filter */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Leave Requests (Sidebar List)</label>
                  <div className="relative">
                    <select 
                      value={tempLeaveStatus}
                      onChange={(e) => setTempLeaveStatus(e.target.value)}
                      className="w-full appearance-none px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>

                {/* Headcount Chart Filter */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Headcount Chart</label>
                  <div className="relative">
                    <select 
                      value={tempHeadcountDept}
                      onChange={(e) => setTempHeadcountDept(e.target.value)}
                      className="w-full appearance-none px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
                    >
                      <option value="All">All Departments</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="HR">HR</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>

                {/* Attendance Chart Filter */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Attendance Overview Chart</label>
                  <div className="relative">
                    <select 
                      value={tempAttendanceRange}
                      onChange={(e) => setTempAttendanceRange(e.target.value)}
                      className="w-full appearance-none px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
                    >
                      <option value="Full range">Full range (all points)</option>
                      <option value="Last 3">Last 3 data points</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Action Footer */}
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-4">
              <button 
                onClick={handleReset}
                className="text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
              >
                Reset to defaults
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={handleCancel}
                  className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleApply}
                  className="px-4 py-2 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-primary/10 cursor-pointer"
                >
                  Apply filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back, Shah Zaib! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={openFilters}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
          >
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm cursor-pointer">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Employees" value="1,245" trend="up" trendValue="5 this month" icon={<Users size={20} className="text-primary" />} color="bg-primary/10 group-hover:bg-white transition-colors" onClick={() => handleKpiClick('employee-directory')} />
        <KpiCard title="Present Today" value="1,022" trend="up" trendValue="82.1% rate" icon={<UserCheck size={20} className="text-emerald-600" />} color="bg-emerald-50" onClick={() => handleKpiClick('attendance-dashboard')} />
        <KpiCard title="On Leave" value="48" trend="down" trendValue="9 pending" icon={<CalendarOff size={20} className="text-rose-600" />} color="bg-rose-50" onClick={() => handleKpiClick('leave')} />
        <KpiCard title="Open Positions" value="12" trend="up" trendValue="34 applicants" icon={<Briefcase size={20} className="text-purple-600" />} color="bg-purple-50" onClick={() => handleKpiClick('recruitment-dashboard')} />
      </div>

      {/* Quick Actions - Scrollable on mobile */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-900 text-base">Quick Actions</h2>
        </div>
        <div className="flex overflow-x-auto pb-2 -mx-2 px-2 hide-scrollbar gap-4 lg:grid lg:grid-cols-7 lg:overflow-visible lg:pb-0 lg:px-0 lg:mx-0">
          <QuickAction icon={<Plus size={24} />} label="Add Employee" color="text-primary bg-primary/10" onClick={() => handleQuickActionClick('employee-directory', 'add')} />
          <QuickAction icon={<Briefcase size={24} />} label="Post Job" color="text-purple-600 bg-purple-50" onClick={() => handleQuickActionClick('recruitment-dashboard')} />
          <QuickAction icon={<DollarSignIcon size={24} />} label="Payroll" color="text-emerald-600 bg-emerald-50" onClick={() => handleQuickActionClick('payroll-dashboard')} />
          <QuickAction icon={<CheckCircle size={24} />} label="Attendance" color="text-amber-600 bg-amber-50" onClick={() => handleQuickActionClick('attendance-dashboard')} />
          <QuickAction icon={<CalendarOff size={24} />} label="Leaves" color="text-rose-600 bg-rose-50" onClick={() => handleQuickActionClick('leave')} />
          <QuickAction icon={<BarChart3 size={24} />} label="Reports" color="text-indigo-600 bg-indigo-50" onClick={() => handleQuickActionClick('payroll-dashboard')} />
          <QuickAction icon={<UploadIcon size={24} />} label="Upload Doc" color="text-slate-600 bg-slate-100" onClick={() => handleQuickActionClick('profile')} />
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Widgets & Charts) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Clock / Weather Widget */}
            <div className="group bg-gradient-to-br from-primary to-blue-950 hover:from-white hover:to-white hover:border-transparent hover:shadow-md transition-all duration-300 cursor-pointer rounded-2xl p-6 text-white hover:text-slate-900 shadow-sm relative overflow-hidden border border-transparent">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 group-hover:bg-primary/5 transition-colors rounded-full blur-2xl"></div>
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <div className="flex items-center gap-1.5 text-blue-100 group-hover:text-slate-500 transition-colors mb-1">
                    <MapPin size={14} />
                    <span className="text-sm font-medium">New York, USA</span>
                  </div>
                  <h3 className="text-3xl font-bold mt-2">10:24 AM</h3>
                  <p className="text-sm text-blue-100 group-hover:text-slate-500 transition-colors mt-1">Thursday, June 6, 2026</p>
                </div>
                <div className="text-right">
                  <Sun size={32} className="text-yellow-300 group-hover:text-amber-500 transition-colors ml-auto mb-2" />
                  <div className="text-2xl font-bold">72°F</div>
                  <div className="text-xs text-blue-100 group-hover:text-slate-500 transition-colors mt-1">Partly Cloudy</div>
                </div>
              </div>
            </div>

            {/* Payroll Progress */}
            <div onClick={() => handleKpiClick('payroll-dashboard')} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-center cursor-pointer hover:border-primary/20 transition-all duration-350 hover:shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-slate-900">Payroll Cycle (June)</h2>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">Active</span>
              </div>
              
              <div className="mb-2 flex justify-between items-end">
                <div>
                  <span className="text-3xl font-bold text-slate-900">82%</span>
                  <span className="text-sm text-slate-500 ml-2">Processed</span>
                </div>
                <div className="text-sm font-medium text-slate-700">
                  128 / 156 <span className="text-slate-400 font-normal">Employees</span>
                </div>
              </div>
              
              <div className="w-full bg-slate-100 rounded-full h-2.5 mb-4 overflow-hidden">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '82%' }}></div>
              </div>
              <p className="text-xs text-slate-500">Cycle closes in 3 days. 28 reviews pending.</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Attendance Tracker Chart */}
            <div onClick={() => handleKpiClick('attendance-dashboard')} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between cursor-pointer hover:border-primary/20 transition-all duration-350 hover:shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-slate-900">Weekly Attendance</h2>
                <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {attendanceRange === 'Last 3' ? 'Last 3 points' : 'Full range'}
                </span>
              </div>
              
              <div className="space-y-4 flex-1 flex flex-col justify-center">
                {filteredAttendance.map(day => (
                  <AttendanceBar key={day.day} day={day.day} present={day.present} late={day.late} absent={day.absent} disabled={day.disabled} isToday={day.isToday} />
                ))}
              </div>
              
              <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-slate-100 text-[10px] sm:text-xs">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div><span className="text-slate-600 font-medium">Present</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div><span className="text-slate-600 font-medium">Late</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div><span className="text-slate-600 font-medium">Absent</span></div>
              </div>
            </div>

            {/* Headcount Chart Widget */}
            <div onClick={() => handleKpiClick('employee-directory')} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between cursor-pointer hover:border-primary/20 transition-all duration-350 hover:shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-slate-900">Headcount by Team</h2>
                <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {headcountDept === 'All' ? 'All Teams' : headcountDept}
                </span>
              </div>

              <div className="space-y-4 flex-1 flex flex-col justify-center">
                {filteredHeadcount.length === 0 ? (
                  <div className="text-center text-xs text-slate-400 py-6">No data found</div>
                ) : (
                  filteredHeadcount.map(d => (
                     <div key={d.dept} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-600">
                        <span>{d.dept}</span>
                        <span className="font-bold text-slate-950">{d.count} Employees</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${d.color} transition-all duration-500`} style={{ width: `${(d.count / 450) * 100}%` }}></div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">
                <span>Active Segments</span>
                <span className="text-primary font-extrabold">{filteredHeadcount.reduce((acc, curr) => acc + curr.count, 0)} Total</span>
              </div>
            </div>

          </div>
          
        </div>

        {/* Right Column (Lists & Feeds) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Upcoming Leaves */}
          <div onClick={() => handleKpiClick('leave')} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 cursor-pointer hover:border-primary/20 transition-all duration-350 hover:shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-bold text-slate-900">Leave Tracker</h2>
              <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {leaveStatus === 'All' ? 'All Statuses' : leaveStatus}
              </span>
            </div>
            <div className="space-y-4">
              {filteredLeaves.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-100 rounded-xl">
                  No {leaveStatus !== 'All' ? leaveStatus.toLowerCase() : ''} leaves found.
                </div>
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

          {/* Celebrations Panel */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="font-bold text-slate-900 mb-5">Celebrations</h2>
            
            <div className="mb-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Gift size={14} className="text-rose-500" /> Birthdays Today
              </h3>
              <div className="space-y-3">
                <CelebrationItem name="James Rivera" role="Frontend Developer" avatar="https://i.pravatar.cc/150?u=james" />
                <CelebrationItem name="Sarah Ahmed" role="Creative Director" avatar="https://i.pravatar.cc/150?u=sarah" />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Award size={14} className="text-amber-500" /> Work Anniversaries
              </h3>
              <div className="space-y-3">
                <CelebrationItem name="Elena Rodriguez" role="Product Manager" avatar="https://i.pravatar.cc/150?u=elena" meta="3 Year Anniversary" metaColor="text-amber-600 bg-amber-50" />
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
}

function KpiCard({ title, value, trend, trendValue, icon, color, onClick }) {
  const isUp = trend === 'up';
  return (
    <div onClick={onClick} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 group hover:bg-gradient-to-br hover:from-primary hover:to-blue-950 transition-all duration-300 cursor-pointer border-transparent hover:border-transparent hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
        <button className="text-slate-400 group-hover:text-white/70 transition-colors hover:text-slate-600">
          <ChevronRight size={20} />
        </button>
      </div>
      <div>
        <h3 className="text-slate-500 group-hover:text-blue-100 transition-colors text-sm font-medium mb-1">{title}</h3>
        <div className="text-2xl font-bold text-slate-900 group-hover:text-white transition-colors">{value}</div>
        <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${isUp ? 'text-emerald-600 group-hover:text-emerald-300' : 'text-rose-600 group-hover:text-rose-300'}`}>
          {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{trendValue}</span>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon, label, color, onClick }) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-2 min-w-[80px] lg:min-w-0 cursor-pointer group">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${color}`}>
        {icon}
      </div>
      <span className="text-xs font-medium text-slate-600 text-center">{label}</span>
    </div>
  );
}

function LeaveItem({ name, type, duration, initials, color, date, status }) {
  let statusBadge = 'bg-emerald-50 text-emerald-700 border-emerald-100';
  if (status === 'Pending') statusBadge = 'bg-amber-50 text-amber-700 border-amber-100';
  if (status === 'Rejected') statusBadge = 'bg-rose-50 text-rose-700 border-rose-100';

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${color}`}>
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-slate-900 text-sm truncate flex items-center gap-2">
          {name}
          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border ${statusBadge}`}>{status}</span>
        </div>
        <div className="text-xs text-slate-550 flex items-center gap-1 mt-0.5">
          <span className="truncate">{type}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
      </div>
      <div className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-md whitespace-nowrap">
        {duration}
      </div>
    </div>
  );
}

function CelebrationItem({ name, role, avatar, meta, metaColor }) {
  return (
    <div className="flex items-center gap-3">
      <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-slate-900 text-sm truncate">{name}</div>
        <div className="text-xs text-slate-500 truncate">{role}</div>
      </div>
      {meta && (
        <div className={`text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap ${metaColor}`}>
          {meta}
        </div>
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
    <div className={`flex items-center gap-3 ${disabled ? 'opacity-40' : ''}`}>
      <div className={`w-8 text-sm font-medium ${isToday ? 'text-primary font-bold' : 'text-slate-600'}`}>{day}</div>
      <div className="flex-1 h-3 flex rounded-full overflow-hidden bg-slate-100">
        {!disabled && (
          <>
            <div className="bg-emerald-500 h-full" style={{ width: `${pWidth}%` }}></div>
            <div className="bg-amber-400 h-full" style={{ width: `${lWidth}%` }}></div>
            <div className="bg-rose-500 h-full" style={{ width: `${aWidth}%` }}></div>
          </>
        )}
      </div>
      <div className="w-8 text-right text-xs font-medium text-slate-505">
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
