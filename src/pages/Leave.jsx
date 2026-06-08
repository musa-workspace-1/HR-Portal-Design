import React, { useState } from 'react';
import { 
  Plus, Search, ChevronDown, Check, X, Eye,
  Calendar, CheckCircle2, FileText, XCircle
} from 'lucide-react';

export default function Leave() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 'LR-001',
      employeeName: 'Ahmad Raza',
      initials: 'AR',
      type: 'Annual Leave',
      fromDate: '2026-06-10',
      toDate: '2026-06-14',
      days: '5',
      status: 'Pending',
    },
    {
      id: 'LR-002',
      employeeName: 'Sarah Ali',
      initials: 'SA',
      type: 'Sick Leave',
      fromDate: '2026-05-25',
      toDate: '2026-05-26',
      days: '2',
      status: 'Approved',
    },
    {
      id: 'LR-003',
      employeeName: 'Tariq Khan',
      initials: 'TK',
      type: 'Casual Leave',
      fromDate: '2026-05-28',
      toDate: '2026-05-28',
      days: '1',
      status: 'Rejected',
    },
    {
      id: 'LR-004',
      employeeName: 'Elena Rodriguez',
      initials: 'ER',
      type: 'Annual Leave',
      fromDate: '2026-07-01',
      toDate: '2026-07-10',
      days: '10',
      status: 'Pending',
    },
  ]);

  const handleApprove = (id) => {
    setLeaveRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'Approved' } : req
    ));
  };

  const handleReject = (id) => {
    setLeaveRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'Rejected' } : req
    ));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-0">
      
      {/* 1. Page Title & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leave Management</h1>
          <p className="text-sm text-slate-500 mt-1">Review and manage employee time-off requests.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors shadow-sm">
            <Plus size={16} />
            Apply for Leave
          </button>
        </div>
      </div>

      {/* 2. High-Level Metrics (Leave Balance Summary Row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="PENDING APPROVALS" 
          value="1" 
          icon={<Calendar size={24} className="text-amber-500" />} 
        />
        <MetricCard 
          title="APPROVED THIS MONTH" 
          value="1" 
          icon={<CheckCircle2 size={24} className="text-emerald-500" />} 
        />
        <MetricCard 
          title="ON LEAVE TODAY" 
          value="8" 
          icon={<FileText size={24} className="text-primary" />} 
        />
        <MetricCard 
          title="REJECTED" 
          value="1" 
          icon={<XCircle size={24} className="text-rose-500" />} 
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col min-h-[500px]">
        
        {/* 3. Advanced Filter Deck */}
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

        {/* 4. Leave Applications Ledger Table */}
        <div className="w-full">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/50 text-slate-500 font-medium text-xs uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">From</th>
                <th className="px-4 py-3">To</th>
                <th className="px-4 py-3">Days</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leaveRequests.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/20">
                        {record.initials}
                      </div>
                      <div className="font-semibold text-slate-900">{record.employeeName}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700">{record.type}</td>
                  <td className="px-4 py-3 text-slate-700">{record.fromDate}</td>
                  <td className="px-4 py-3 text-slate-700">{record.toDate}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{record.days}</td>
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
          
          {leaveRequests.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              No leave requests found.
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:bg-gradient-to-br hover:from-primary hover:to-blue-950 transition-all duration-300 cursor-pointer border-transparent hover:border-transparent hover:shadow-md">
      <div>
        <h3 className="text-slate-500 group-hover:text-blue-100 transition-colors text-xs font-bold mb-1 tracking-wider">{title}</h3>
        <div className="text-3xl font-black text-slate-900 group-hover:text-white transition-colors">{value}</div>
      </div>
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
        {icon}
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
