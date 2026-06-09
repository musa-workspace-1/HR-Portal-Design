import React, { useState } from 'react';
import { 
  Plus, Search, ChevronDown, Video, MapPin, 
  MessageSquare, ExternalLink
} from 'lucide-react';

export default function Interviews() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [interviewData, setInterviewData] = useState([
    {
      id: 'INT-001',
      candidateName: 'Alice Brown',
      initials: 'AB',
      position: 'Senior Frontend Developer',
      date: '2026-06-07',
      time: '10:00 AM',
      interviewer: 'John Doe',
      medium: 'Video Call',
      status: 'Scheduled',
    },
    {
      id: 'INT-002',
      candidateName: 'Marcus Johnson',
      initials: 'MJ',
      position: 'Backend Engineer',
      date: '2026-06-07',
      time: '01:30 PM',
      interviewer: 'Sarah Smith',
      medium: 'In-Person',
      status: 'Scheduled',
    },
    {
      id: 'INT-003',
      candidateName: 'Sophia Chen',
      initials: 'SC',
      position: 'UX Designer',
      date: '2026-06-06',
      time: '04:00 PM',
      interviewer: 'Emily White',
      medium: 'Video Call',
      status: 'Completed',
    },
    {
      id: 'INT-004',
      candidateName: 'David Lee',
      initials: 'DL',
      position: 'Product Manager',
      date: '2026-06-08',
      time: '11:00 AM',
      interviewer: 'Michael Scott',
      medium: 'Video Call',
      status: 'Cancelled',
    },
  ]);

  return (
    <div className="stagger">
      
      {/* 1. Page Title & Action Bar */}
      <div className="sec-head">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Interviews</h1>
          <p className="text-sm text-slate-500 mt-1">Manage scheduling, details, and feedback for all candidate evaluations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors shadow-sm">
            <Plus size={16} />
            Schedule Interview
          </button>
        </div>
      </div>

      <div className="panel">
        
        {/* 2. Advanced Search & Query Parameters */}
        <div className="p-4 border-b border-slate-100 flex flex-col lg:flex-row gap-4 items-center justify-between bg-slate-50/30">
          
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search names, IDs, positions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary/50 transition-colors shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            
            {/* Timeframe Filter */}
            <div className="relative flex-1 sm:flex-none min-w-[140px]">
              <select className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-primary/50 transition-colors shadow-sm cursor-pointer">
                <option>All Time</option>
                <option>Today</option>
                <option>This Week</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Lifecycle Status Filter */}
            <div className="relative flex-1 sm:flex-none min-w-[140px]">
              <select className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-primary/50 transition-colors shadow-sm cursor-pointer">
                <option>All Statuses</option>
                <option>Scheduled</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

          </div>
        </div>

        {/* 3. Interview Record Ledger & Variable Metrics */}
        <div className="w-full">
          <table className="w-full text-left text-sm text-slate-600">
            <thead >
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Candidate</th>
                <th className="px-4 py-3">Position</th>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Interviewer</th>
                <th className="px-4 py-3">Medium</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {interviewData.map((record) => (
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
                  <td className="px-4 py-3 font-medium text-slate-700">{record.position}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{record.date}</div>
                    <div className="text-[11px] text-slate-500">{record.time}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{record.interviewer}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {record.medium === 'Video Call' ? (
                        <Video size={14} className="text-primary" />
                      ) : (
                        <MapPin size={14} className="text-amber-500" />
                      )}
                      <span className="font-medium text-slate-700">{record.medium}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={record.status} />
                  </td>
                  <td className="px-4 py-3">
                    {/* 4. Contextual Inline Action Flows */}
                    <div className="flex items-center justify-end gap-2">
                      {record.medium === 'Video Call' && (
                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-primary hover:text-white bg-primary/10 border border-primary/20 hover:opacity-90 rounded-md text-xs font-bold transition-colors shadow-sm">
                          <ExternalLink size={14} /> Join
                        </button>
                      )}
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:text-primary bg-slate-50 border border-slate-200 hover:border-primary/30 rounded-md text-xs font-bold transition-colors shadow-sm">
                        <MessageSquare size={14} /> Feedback
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {interviewData.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              No interview records found.
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let colorClass = 'bg-slate-100 text-slate-600 border-slate-200';
  
  if (status === 'Scheduled') {
    colorClass = 'bg-primary/10 text-primary border-primary/20';
  } else if (status === 'Completed') {
    colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (status === 'Cancelled') {
    colorClass = 'bg-slate-50 text-slate-700 border-slate-300';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold border ${colorClass}`}>
      {status}
    </span>
  );
}
