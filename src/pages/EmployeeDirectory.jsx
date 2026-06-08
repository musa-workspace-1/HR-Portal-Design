import React, { useState } from 'react';
import { 
  Download, Plus, Users, UserCheck, UserPlus, 
  Search, Filter, MoreHorizontal, ChevronLeft, ChevronRight 
} from 'lucide-react';

export default function EmployeeDirectory() {
  const [searchTerm, setSearchTerm] = useState('');

  const employees = [
    {
      id: 1,
      name: 'Sarah Ahmed',
      email: 'sarah.ahmed@24loops.com',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      department: 'Creative & Design',
      jobTitle: 'Creative Director',
      employmentType: 'Full Time',
      startDate: '2023-01-15',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Syed Muhammad Saad',
      email: 'syed.saad@24loops.com',
      avatar: 'https://i.pravatar.cc/150?u=syed',
      department: 'Product',
      jobTitle: 'Product Design Manager',
      employmentType: 'Full Time',
      startDate: '2022-08-10',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Umair Khan',
      email: 'umair.khan@24loops.com',
      avatar: 'https://i.pravatar.cc/150?u=umair',
      department: 'Engineering',
      jobTitle: 'Frontend Developer',
      employmentType: 'Contract',
      startDate: '2024-03-01',
      status: 'Onboarding',
    },
    {
      id: 4,
      name: 'Elena Rodriguez',
      email: 'elena.rodriguez@24loops.com',
      avatar: 'https://i.pravatar.cc/150?u=elena',
      department: 'Management',
      jobTitle: 'Product Manager',
      employmentType: 'Full Time',
      startDate: '2021-06-15',
      status: 'Active',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-0">
      
      {/* 1. Page Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employee Directory</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your team members and their employment details.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <Download size={16} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors shadow-sm">
            <Plus size={16} />
            Add New Employee
          </button>
        </div>
      </div>

      {/* 2. Summary Metrics Cards (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard title="Total Employees" value="1,245" icon={<Users size={20} className="text-primary" />} color="bg-primary/10 group-hover:bg-white transition-colors" />
        <KpiCard title="Active" value="1,180" icon={<UserCheck size={20} className="text-emerald-600" />} color="bg-emerald-50" />
        <KpiCard title="Onboarding" value="23" icon={<UserPlus size={20} className="text-amber-600" />} color="bg-amber-50" />
      </div>

      {/* 3. Employee Directory Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search employees..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors">
            <Filter size={16} />
            More Filters
          </button>
        </div>

        {/* Table Content */}
        <div className="w-full">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/50 text-slate-500 font-medium text-xs uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Job Title</th>
                <th className="px-4 py-3">Employment Type</th>
                <th className="px-4 py-3">Start Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={employee.avatar} alt={employee.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                      <div>
                        <div className="font-semibold text-slate-900">{employee.name}</div>
                        <div className="text-xs text-slate-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{employee.department}</td>
                  <td className="px-4 py-3">{employee.jobTitle}</td>
                  <td className="px-4 py-3">{employee.employmentType}</td>
                  <td className="px-4 py-3">{employee.startDate}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={employee.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-primary hover:text-primary font-medium text-sm px-3 py-1.5 rounded-md hover:bg-primary/10 transition-colors">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination & Footnote Controls */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 bg-slate-50/30">
          <div>
            Showing <span className="font-medium text-slate-900">1</span> to <span className="font-medium text-slate-900">{employees.length}</span> of <span className="font-medium text-slate-900">{employees.length}</span> entries
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              <ChevronLeft size={16} />
              Previous
            </button>
            <div className="font-medium text-slate-900">
              1 / 1
            </div>
            <button className="flex items-center gap-1 text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon, color }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 group hover:bg-gradient-to-br hover:from-primary hover:to-blue-950 transition-all duration-300 cursor-pointer border-transparent hover:border-transparent hover:shadow-md">
      <div className={`p-4 rounded-xl ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-slate-500 group-hover:text-blue-100 transition-colors text-sm font-medium mb-1">{title}</h3>
        <div className="text-2xl font-bold text-slate-900 group-hover:text-white transition-colors">{value}</div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let colorClass = 'bg-slate-100 text-slate-700';
  
  if (status === 'Active') {
    colorClass = 'bg-emerald-100 text-emerald-700 border-emerald-200';
  } else if (status === 'Onboarding') {
    colorClass = 'bg-amber-100 text-amber-700 border-amber-200';
  } else if (status === 'Terminated') {
    colorClass = 'bg-rose-100 text-rose-700 border-rose-200';
  }

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${colorClass}`}>
      {status}
    </span>
  );
}
