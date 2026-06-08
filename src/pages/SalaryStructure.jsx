import React, { useState } from 'react';
import { 
  Plus, Search, ChevronDown, Edit2
} from 'lucide-react';

export default function SalaryStructure() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [componentsData, setComponentsData] = useState([
    {
      id: 'COMP-001',
      name: 'Housing Allowance',
      type: 'Allowance',
      calcType: 'Percentage',
      defaultValue: '40% of Basic',
      taxable: 'Yes',
      status: 'Active',
    },
    {
      id: 'COMP-002',
      name: 'Transport Allowance',
      type: 'Allowance',
      calcType: 'Fixed',
      defaultValue: 'PKR 15,000',
      taxable: 'No',
      status: 'Active',
    },
    {
      id: 'COMP-003',
      name: 'Medical',
      type: 'Allowance',
      calcType: 'Fixed',
      defaultValue: 'PKR 10,000',
      taxable: 'No',
      status: 'Active',
    },
    {
      id: 'COMP-004',
      name: 'Income Tax',
      type: 'Deduction',
      calcType: 'Fixed',
      defaultValue: 'Slab-based',
      taxable: '—',
      status: 'Active',
    },
    {
      id: 'COMP-005',
      name: 'Provident Fund',
      type: 'Deduction',
      calcType: 'Percentage',
      defaultValue: '8% of Basic',
      taxable: '—',
      status: 'Inactive',
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 lg:pb-0">
      
      {/* 1. Page Title & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Salary Structure</h1>
          <p className="text-sm text-slate-500 mt-1">Define and manage organizational earning and withholding rules.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors shadow-sm">
            <Plus size={16} />
            Add Component
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
              placeholder="Search components..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary/50 transition-colors shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Type Filter */}
            <div className="relative flex-1 sm:flex-none min-w-[140px]">
              <select className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-primary/50 transition-colors shadow-sm cursor-pointer">
                <option>All Types</option>
                <option>Allowance</option>
                <option>Deduction</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="relative flex-1 sm:flex-none min-w-[140px]">
              <select className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-primary/50 transition-colors shadow-sm cursor-pointer">
                <option>All Statuses</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* 3. Salary Components Ledger & Variable Metrics */}
        <div className="w-full">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/50 text-slate-500 font-medium text-xs uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-4 py-3">Component Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Calculation Type</th>
                <th className="px-4 py-3">Default Value</th>
                <th className="px-4 py-3">Taxable</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {componentsData.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900">{record.name}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold ${record.type === 'Allowance' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                      {record.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700">{record.calcType}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{record.defaultValue}</td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${record.taxable === 'Yes' ? 'text-emerald-600' : record.taxable === 'No' ? 'text-slate-400' : 'text-slate-400'}`}>
                      {record.taxable}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={record.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    {/* 4. Contextual Inline Action Flows */}
                    <button className="flex items-center justify-end gap-1.5 px-4 py-1.5 text-slate-600 hover:text-primary bg-slate-50 border border-slate-200 hover:border-primary/30 rounded-md text-xs font-bold transition-colors shadow-sm ml-auto">
                      <Edit2 size={14} /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {componentsData.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              No salary components found.
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let colorClass = 'bg-slate-100 text-slate-600 border-slate-200';
  
  if (status === 'Active') {
    colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (status === 'Inactive') {
    colorClass = 'bg-slate-50 text-slate-500 border-slate-200';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${colorClass}`}>
      {status}
    </span>
  );
}
