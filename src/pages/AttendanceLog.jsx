import React, { useState } from 'react';
import { 
  Download, Search, Calendar as CalendarIcon, 
  ChevronDown, Edit2, ChevronLeft, ChevronRight, Filter
} from 'lucide-react';

export default function AttendanceLog() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const attendanceData = [
    {
      id: 1,
      name: 'Sarah Ahmed',
      systemId: '38202-1764241-3',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      date: '2026-05-23',
      markIn: '09:00 AM',
      markOut: '05:30 PM',
      workingHours: '8h 30m',
      status: 'Present',
    },
    {
      id: 2,
      name: 'Syed Muhammad Saad',
      systemId: '42101-9876543-1',
      avatar: 'https://i.pravatar.cc/150?u=syed',
      date: '2026-05-23',
      markIn: '10:15 AM',
      markOut: '06:00 PM',
      workingHours: '7h 45m',
      status: 'Late',
    },
    {
      id: 3,
      name: 'Umair Khan',
      systemId: '61101-1234567-9',
      avatar: 'https://i.pravatar.cc/150?u=umair',
      date: '2026-05-23',
      markIn: '--:--',
      markOut: '--:--',
      workingHours: '-',
      status: 'Absent',
    },
    {
      id: 4,
      name: 'Elena Rodriguez',
      systemId: '35201-8765432-5',
      avatar: 'https://i.pravatar.cc/150?u=elena',
      date: '2026-05-23',
      markIn: '--:--',
      markOut: '--:--',
      workingHours: '-',
      status: 'On Leave',
    },
  ];

  return (
    <div className="stagger">
      
      {/* 1. Page Title & Action Bar */}
      <div className="sec-head">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Attendance Log</h1>
          <p className="text-sm text-slate-500 mt-1">Track and manage daily attendance records for all employees.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn ghost">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* 3. Attendance Ledger Table Container */}
      <div className="panel">
        
        {/* 2. Advanced Filtering Control Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col lg:flex-row gap-4 items-center justify-between bg-slate-50/30">
          
          {/* Search */}
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search employee or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary/50 transition-colors shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            
            {/* Date Picker Tool */}
            <div className="relative flex-1 sm:flex-none">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <CalendarIcon size={16} />
              </div>
              <input 
                type="text" 
                defaultValue="23-May-2026"
                className="w-full sm:w-40 pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-primary/50 transition-colors shadow-sm cursor-pointer"
                readOnly
              />
            </div>

            {/* Department Dropdown */}
            <div className="relative flex-1 sm:flex-none min-w-[160px]">
              <select className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-primary/50 transition-colors shadow-sm cursor-pointer">
                <option>All Departments</option>
                <option>Information Technology</option>
                <option>Creative & Design</option>
                <option>Management</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Status Filter Dropdown */}
            <div className="relative flex-1 sm:flex-none min-w-[140px]">
              <select className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-primary/50 transition-colors shadow-sm cursor-pointer">
                <option>All Status</option>
                <option>Present</option>
                <option>Late</option>
                <option>Absent</option>
                <option>WFH</option>
                <option>Half Day</option>
                <option>On Leave</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

          </div>
        </div>

        {/* 3. Ledger Table Content */}
        <div className="w-full">
          <table className="w-full text-left text-sm text-slate-600">
            <thead >
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Mark In</th>
                <th className="px-4 py-3">Mark Out</th>
                <th className="px-4 py-3">Working Hours</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendanceData.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={record.avatar} alt={record.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200 shadow-sm" />
                      <div>
                        <div className="font-bold text-slate-900">{record.name}</div>
                        <div className="text-[11px] text-slate-500 font-medium mt-0.5">{record.systemId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700">{record.date}</td>
                  <td className="px-4 py-3">
                    <span className={record.markIn === '--:--' ? 'text-slate-400' : 'font-medium text-slate-700'}>{record.markIn}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={record.markOut === '--:--' ? 'text-slate-400' : 'font-medium text-slate-700'}>{record.markOut}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={record.workingHours === '-' ? 'text-slate-400' : 'font-bold text-slate-900'}>{record.workingHours}</span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={record.status} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors mx-auto block">
                      <Edit2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Table Pagination & Ledger Footer */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 bg-slate-50/30">
          <div>
            Showing <span className="font-medium text-slate-900">1</span> to <span className="font-medium text-slate-900">{attendanceData.length}</span> of <span className="font-medium text-slate-900">{attendanceData.length}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              <ChevronLeft size={16} />
              Previous
            </button>
            <div className="font-bold text-slate-900 bg-white px-3 py-1.5 border border-slate-200 rounded-lg shadow-sm">
              1 / 1
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let colorClass = 'bg-slate-100 text-slate-600 border-slate-200';
  
  if (status === 'Present') {
    colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (status === 'Late') {
    colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (status === 'Absent') {
    colorClass = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (status === 'On Leave' || status === 'WFH') {
    colorClass = 'bg-primary/10 text-primary border-primary/20';
  } else if (status === 'Half Day') {
    colorClass = 'bg-purple-50 text-purple-700 border-purple-200';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${colorClass}`}>
      {status}
    </span>
  );
}
