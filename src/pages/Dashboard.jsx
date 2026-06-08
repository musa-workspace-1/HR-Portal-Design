import React from 'react';
import { 
  Users, UserCheck, CalendarOff, Briefcase, 
  Filter, Download, Plus, MapPin, 
  Sun, CheckCircle, AlertCircle, TrendingUp, TrendingDown, Clock, BarChart3, ChevronRight, Award, Gift
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-0">
      
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back, Shah Zaib! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Employees" value="1,245" trend="up" trendValue="5 this month" icon={<Users size={20} className="text-primary" />} color="bg-primary/10 group-hover:bg-white transition-colors" />
        <KpiCard title="Present Today" value="1,022" trend="up" trendValue="82.1% rate" icon={<UserCheck size={20} className="text-emerald-600" />} color="bg-emerald-50" />
        <KpiCard title="On Leave" value="48" trend="down" trendValue="9 pending" icon={<CalendarOff size={20} className="text-rose-600" />} color="bg-rose-50" />
        <KpiCard title="Open Positions" value="12" trend="up" trendValue="34 applicants" icon={<Briefcase size={20} className="text-purple-600" />} color="bg-purple-50" />
      </div>

      {/* Quick Actions - Scrollable on mobile */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-900 text-base">Quick Actions</h2>
          <button className="text-sm text-primary font-medium hover:underline">View all</button>
        </div>
        <div className="flex overflow-x-auto pb-2 -mx-2 px-2 hide-scrollbar gap-4 lg:grid lg:grid-cols-7 lg:overflow-visible lg:pb-0 lg:px-0 lg:mx-0">
          <QuickAction icon={<Plus size={24} />} label="Add Employee" color="text-primary bg-primary/10" />
          <QuickAction icon={<Briefcase size={24} />} label="Post Job" color="text-purple-600 bg-purple-50" />
          <QuickAction icon={<DollarSignIcon size={24} />} label="Payroll" color="text-emerald-600 bg-emerald-50" />
          <QuickAction icon={<CheckCircle size={24} />} label="Attendance" color="text-amber-600 bg-amber-50" />
          <QuickAction icon={<CalendarOff size={24} />} label="Leaves" color="text-rose-600 bg-rose-50" />
          <QuickAction icon={<BarChart3 size={24} />} label="Reports" color="text-indigo-600 bg-indigo-50" />
          <QuickAction icon={<UploadIcon size={24} />} label="Upload Doc" color="text-slate-600 bg-slate-100" />
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
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-center">
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

          {/* Attendance Tracker */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-slate-900">Weekly Attendance</h2>
              <button className="text-sm text-primary font-medium hover:underline">View Details</button>
            </div>
            
            <div className="space-y-4">
              <AttendanceBar day="Mon" present={85} late={10} absent={5} />
              <AttendanceBar day="Tue" present={88} late={8} absent={4} />
              <AttendanceBar day="Wed" present={90} late={5} absent={5} />
              <AttendanceBar day="Thu" present={82} late={12} absent={6} isToday />
              <AttendanceBar day="Fri" present={0} late={0} absent={0} disabled />
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div><span className="text-xs text-slate-600">Present</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-400"></div><span className="text-xs text-slate-600">Late</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-500"></div><span className="text-xs text-slate-600">Absent</span></div>
            </div>
          </div>
          
        </div>

        {/* Right Column (Lists & Feeds) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Upcoming Leaves */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-bold text-slate-900">Leave Tracker</h2>
              <button className="text-sm text-primary font-medium hover:underline">View all</button>
            </div>
            <div className="space-y-4">
              <LeaveItem name="Sarah Ahmed" type="Annual Leave" duration="5 Days" initials="SA" color="bg-primary/20 text-primary" date="Jun 10 - Jun 14" />
              <LeaveItem name="Michael Chen" type="Sick Leave" duration="2 Days" initials="MC" color="bg-purple-100 text-purple-700" date="Jun 6 - Jun 7" />
              <LeaveItem name="Ayesha Khan" type="Maternity" duration="90 Days" initials="AK" color="bg-rose-100 text-rose-700" date="Jun 15 - Sep 15" />
              <LeaveItem name="David Smith" type="Unpaid Leave" duration="1 Day" initials="DS" color="bg-amber-100 text-amber-700" date="Jun 8" />
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

function KpiCard({ title, value, trend, trendValue, icon, color }) {
  const isUp = trend === 'up';
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 group hover:bg-gradient-to-br hover:from-primary hover:to-blue-950 transition-all duration-300 cursor-pointer border-transparent hover:border-transparent hover:shadow-md">
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

function QuickAction({ icon, label, color }) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[80px] lg:min-w-0 cursor-pointer group">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${color}`}>
        {icon}
      </div>
      <span className="text-xs font-medium text-slate-600 text-center">{label}</span>
    </div>
  );
}

function LeaveItem({ name, type, duration, initials, color, date }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${color}`}>
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-slate-900 text-sm truncate">{name}</div>
        <div className="text-xs text-slate-500 flex items-center gap-1">
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
      <div className="w-8 text-right text-xs font-medium text-slate-500">
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
