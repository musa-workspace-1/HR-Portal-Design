import React, { useState } from 'react';
import { 
  Plus, Search, ChevronDown, Eye, Mail
} from 'lucide-react';

export default function OfferLetters() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [offerData, setOfferData] = useState([
    {
      id: 'OFF-001',
      candidateName: 'Alice Brown',
      initials: 'AB',
      jobTitle: 'Senior Frontend Developer',
      salary: 'PKR 250,000',
      deadline: '2026-06-15',
      status: 'Pending',
    },
    {
      id: 'OFF-002',
      candidateName: 'Marcus Johnson',
      initials: 'MJ',
      jobTitle: 'Backend Engineer',
      salary: 'PKR 220,000',
      deadline: '2026-06-10',
      status: 'Accepted',
    },
    {
      id: 'OFF-003',
      candidateName: 'Sophia Chen',
      initials: 'SC',
      jobTitle: 'UX Designer',
      salary: 'PKR 180,000',
      deadline: '2026-06-05',
      status: 'Rejected',
    },
    {
      id: 'OFF-004',
      candidateName: 'James Wilson',
      initials: 'JW',
      jobTitle: 'DevOps Engineer',
      salary: 'PKR 300,000',
      deadline: '2026-06-20',
      status: 'Pending',
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-0">
      
      {/* 1. Page Title & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Offer Letters</h1>
          <p className="text-sm text-slate-500 mt-1">Draft, configure, and manage employment offer contracts.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors shadow-sm">
            <Plus size={16} />
            Create Offer
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col min-h-[500px]">
        
        {/* 2. Global Query & Parameter Filtering */}
        <div className="p-4 border-b border-slate-100 flex flex-col lg:flex-row gap-4 items-center justify-between bg-slate-50/30">
          
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search names or IDs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary/50 transition-colors shadow-sm"
            />
          </div>

          <div className="relative w-full sm:w-auto min-w-[160px]">
            <select className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-primary/50 transition-colors shadow-sm cursor-pointer">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Accepted</option>
              <option>Rejected</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

        </div>

        {/* 3. Offer Records Data Grid & Log Tracking */}
        <div className="w-full">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/50 text-slate-500 font-medium text-xs uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Candidate</th>
                <th className="px-4 py-3">Job Title</th>
                <th className="px-4 py-3">Salary</th>
                <th className="px-4 py-3">Deadline</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {offerData.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900">{record.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200 text-xs">
                        {record.initials}
                      </div>
                      <div className="font-semibold text-slate-900">{record.candidateName}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700">{record.jobTitle}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{record.salary}</td>
                  <td className="px-4 py-3 text-slate-700">{record.deadline}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={record.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    {/* 4. Contextual Inline Action Flows */}
                    <div className="flex items-center justify-end gap-2">
                      {record.status === 'Pending' && (
                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-amber-700 hover:text-white bg-amber-50 border border-amber-200 hover:bg-amber-500 rounded-md text-xs font-bold transition-colors shadow-sm">
                          <Mail size={14} /> Remind
                        </button>
                      )}
                      <button className="flex items-center gap-1.5 px-4 py-1.5 text-slate-600 hover:text-primary bg-slate-50 border border-slate-200 hover:border-primary/30 rounded-md text-xs font-bold transition-colors shadow-sm">
                        <Eye size={14} /> View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {offerData.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              No offer letter records found.
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
  } else if (status === 'Accepted') {
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
