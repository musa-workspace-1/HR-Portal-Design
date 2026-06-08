import React, { useState } from 'react';
import { 
  Users, CheckCircle2, Clock, AlertCircle, 
  Calendar as CalendarIcon, ArrowRight, Filter
} from 'lucide-react';

export default function Onboarding() {
  const [activeTab, setActiveTab] = useState('All');

  const onboardingData = [
    {
      id: 1,
      name: 'Sarah Ahmed',
      systemId: '38202-1764241-3',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      role: 'Creative Director',
      department: 'Creative & Design',
      startDate: '2026-06-15',
      status: 'Completed',
      progress: 100,
      stepsCompleted: 4,
      stepsTotal: 4
    },
    {
      id: 2,
      name: 'Syed Muhammad Saad',
      systemId: '42101-9876543-1',
      avatar: 'https://i.pravatar.cc/150?u=syed',
      role: 'Product Design Manager',
      department: 'Product',
      startDate: '2026-06-20',
      status: 'In Progress',
      progress: 75,
      stepsCompleted: 3,
      stepsTotal: 4
    },
    {
      id: 3,
      name: 'Umair Khan',
      systemId: '61101-1234567-9',
      avatar: 'https://i.pravatar.cc/150?u=umair',
      role: 'Frontend Developer',
      department: 'Engineering',
      startDate: '2026-07-01',
      status: 'Not Started',
      progress: 0,
      stepsCompleted: 0,
      stepsTotal: 6
    },
    {
      id: 4,
      name: 'Elena Rodriguez',
      systemId: '35201-8765432-5',
      avatar: 'https://i.pravatar.cc/150?u=elena',
      role: 'Product Manager',
      department: 'Management',
      startDate: '2026-06-10',
      status: 'In Progress',
      progress: 40,
      stepsCompleted: 2,
      stepsTotal: 5
    },
  ];

  const filteredData = activeTab === 'All' 
    ? onboardingData 
    : onboardingData.filter(item => item.status === activeTab);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-0">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Onboarding Workflows</h1>
          <p className="text-sm text-slate-500 mt-1">Track and manage new employee onboarding progress.</p>
        </div>
      </div>

      {/* 1. High-Level Onboarding Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Active Workflows" value="12" icon={<Users size={20} className="text-primary" />} color="bg-primary/10 group-hover:bg-white transition-colors" />
        <MetricCard title="Completed (Month)" value="8" icon={<CheckCircle2 size={20} className="text-emerald-600" />} color="bg-emerald-50" />
        <MetricCard title="Pending Steps" value="34" icon={<Clock size={20} className="text-amber-600" />} color="bg-amber-50" />
        <MetricCard title="Overdue Steps" value="3" icon={<AlertCircle size={20} className="text-rose-600" />} color="bg-rose-50 border border-rose-100" textClass="text-rose-600" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        
        {/* 2. Active Workflows Filter Bar */}
        <div className="p-2 border-b border-slate-100 bg-slate-50/50 overflow-x-auto hide-scrollbar">
          <div className="flex items-center gap-1 min-w-max px-2">
            <FilterTab label="All" active={activeTab === 'All'} onClick={() => setActiveTab('All')} />
            <FilterTab label="Not Started" active={activeTab === 'Not Started'} onClick={() => setActiveTab('Not Started')} />
            <FilterTab label="In Progress" active={activeTab === 'In Progress'} onClick={() => setActiveTab('In Progress')} />
            <FilterTab label="Completed" active={activeTab === 'Completed'} onClick={() => setActiveTab('Completed')} />
          </div>
        </div>

        {/* 3. Onboarding Workflow Data Table */}
        <div className="w-full">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-white text-slate-500 font-medium text-xs uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Role & Department</th>
                <th className="px-4 py-3">Start Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Progress</th>
                <th className="px-4 py-3 text-center">Steps</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((employee) => (
                <tr key={employee.id} className="hover:bg-slate-50/50 transition-colors">
                  
                  {/* Employee */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={employee.avatar} alt={employee.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                      <div>
                        <div className="font-semibold text-slate-900">{employee.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{employee.systemId}</div>
                      </div>
                    </div>
                  </td>

                  {/* Role & Department */}
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{employee.role}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{employee.department}</div>
                  </td>

                  {/* Start Date */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-slate-700">
                      <CalendarIcon size={14} className="text-slate-400" />
                      <span>{employee.startDate}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <StatusBadge status={employee.status} />
                  </td>

                  {/* Progress */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 min-w-[120px]">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            employee.progress === 100 ? 'bg-emerald-500' : 'bg-primary'
                          }`}
                          style={{ width: `${employee.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700 w-8">{employee.progress}%</span>
                    </div>
                  </td>

                  {/* Steps */}
                  <td className="px-4 py-3 text-center font-medium text-slate-700">
                    <span className={employee.stepsCompleted === employee.stepsTotal ? "text-emerald-600" : ""}>
                      {employee.stepsCompleted}
                    </span>
                    <span className="text-slate-400 mx-0.5">/</span>
                    <span className="text-slate-500">{employee.stepsTotal}</span>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3 text-right">
                    <button className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-primary hover:text-white border border-slate-200 hover:border-primary text-slate-700 rounded-lg text-sm font-semibold transition-all shadow-sm group">
                      Open
                      <ArrowRight size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredData.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No workflows found for this status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, color, textClass }) {
  return (
    <div className={`group hover:bg-gradient-to-br hover:from-primary hover:to-blue-950 transition-all duration-300 cursor-pointer hover:shadow-md bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 ${color.includes('border-rose') ? 'border-rose-100 bg-rose-50/30' : ''}`}>
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-slate-500 group-hover:text-blue-100 transition-colors text-sm font-medium mb-0.5">{title}</h3>
        <div className={`text-2xl font-bold ${textClass || 'text-slate-900'} group-hover:text-white transition-colors`}>{value}</div>
      </div>
    </div>
  );
}

function FilterTab({ label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
        active 
          ? 'bg-white text-primary shadow-sm border border-slate-200/60' 
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 border border-transparent'
      }`}
    >
      {label}
    </button>
  );
}

function StatusBadge({ status }) {
  let colorClass = 'bg-slate-100 text-slate-600 border-slate-200';
  let indicatorColor = 'bg-slate-400';
  
  if (status === 'Completed') {
    colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    indicatorColor = 'bg-emerald-500';
  } else if (status === 'In Progress') {
    colorClass = 'bg-primary/10 text-primary border-primary/20';
    indicatorColor = 'bg-primary/100';
  } else if (status === 'Not Started') {
    colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
    indicatorColor = 'bg-amber-500';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${colorClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${indicatorColor}`}></span>
      {status}
    </span>
  );
}
