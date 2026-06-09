import React, { useState } from 'react';
import { 
  Search, ChevronDown, Check, X, Eye
} from 'lucide-react';

export default function Overtime() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [overtimeRequests, setOvertimeRequests] = useState([
    {
      id: 'OT-001',
      employeeName: 'Tariq Ali',
      initials: 'TA',
      date: '2026-05-20',
      hours: '2.5 Hours',
      reason: 'Critical production deploy',
      status: 'Pending',
    },
    {
      id: 'OT-002',
      employeeName: 'Sarah Khan',
      initials: 'SK',
      date: '2026-05-21',
      hours: '4 Hours',
      reason: 'Weekend support coverage',
      status: 'Approved',
    },
    {
      id: 'OT-003',
      employeeName: 'Ahmad Raza',
      initials: 'AR',
      date: '2026-05-22',
      hours: '1 Hours',
      reason: 'Late client meeting',
      status: 'Rejected',
    },
    {
      id: 'OT-004',
      employeeName: 'Elena Rodriguez',
      initials: 'ER',
      date: '2026-05-23',
      hours: '3 Hours',
      reason: 'Emergency server patching',
      status: 'Pending',
    },
  ]);

  const handleApprove = (id) => {
    setOvertimeRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'Approved' } : req
    ));
  };

  const handleReject = (id) => {
    setOvertimeRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'Rejected' } : req
    ));
  };

  return (
    <div className="stagger">
      
      {/* 1. Page Title & Action Bar */}
      <div className="sec-head">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Overtime Requests</h1>
          <p className="text-sm text-slate-500 mt-1">Review and manage extra work hours submitted by your team.</p>
        </div>
      </div>

      <div className="panel">
        
        {/* 2. Data Query & Status Filter Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/30">
          
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary/50 transition-colors shadow-sm"
            />
          </div>

          <div className="relative w-full sm:w-auto min-w-[140px]">
            <select className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-primary/50 transition-colors shadow-sm cursor-pointer">
              <option>Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

        </div>

        {/* 3. Overtime Requests Data Table */}
        <div className="w-full">
          <table className="w-full text-left text-sm text-slate-600">
            <thead >
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Overtime Date</th>
                <th className="px-4 py-3">Hours</th>
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {overtimeRequests.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">{record.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/20">
                        {record.initials}
                      </div>
                      <div className="font-semibold text-slate-900">{record.employeeName}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{record.date}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{record.hours}</td>
                  <td className="px-4 py-3 text-slate-500 max-w-[200px] truncate" title={record.reason}>
                    {record.reason}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={record.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    {record.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleApprove(record.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-500 hover:text-white rounded-md text-xs font-bold transition-colors shadow-sm"
                        >
                          <Check size={14} /> Approve
                        </button>
                        <button 
                          onClick={() => handleReject(record.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-500 hover:text-white rounded-md text-xs font-bold transition-colors shadow-sm"
                        >
                          <X size={14} /> Reject
                        </button>
                      </div>
                    ) : (
                      <button className="flex items-center justify-end gap-1.5 px-4 py-1.5 text-slate-600 hover:text-primary bg-slate-50 border border-slate-200 hover:border-primary/30 rounded-md text-xs font-bold transition-colors shadow-sm ml-auto">
                        <Eye size={14} /> View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {overtimeRequests.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              No overtime requests found.
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let colorClass = 'bg-slate-100 text-slate-600 border-slate-200';
  
  if (status === 'Pending') {
    colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (status === 'Approved') {
    colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (status === 'Rejected') {
    colorClass = 'bg-rose-50 text-rose-700 border-rose-200';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${colorClass}`}>
      {status}
    </span>
  );
}
