import React, { useState } from 'react';
import { 
  Plus, Search, ChevronDown, CalendarClock
} from 'lucide-react';

export default function Shift() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-0">
      
      {/* 1. Page Title & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Shift Management</h1>
          <p className="text-sm text-slate-500 mt-1">Configure and assign working shifts across the organization.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors shadow-sm">
            <Plus size={16} />
            Add Shift
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col min-h-[500px]">
        
        {/* 2. Search & Quick Filter Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/30">
          
          {/* Text Search Input Field */}
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

          {/* Status Filter Dropdown */}
          <div className="relative w-full sm:w-auto min-w-[140px]">
            <select className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-primary/50 transition-colors shadow-sm cursor-pointer">
              <option>All</option>
              <option>Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

        </div>

        {/* 3. Empty Workspace / Zero-State Component */}
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100">
            <CalendarClock size={40} className="text-slate-300" strokeWidth={1.5} />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">No records found</h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed mb-6">
            There are currently no active shifts matching your criteria. 
            Click the button above to define a new shift schedule.
          </p>
        </div>

      </div>
    </div>
  );
}
