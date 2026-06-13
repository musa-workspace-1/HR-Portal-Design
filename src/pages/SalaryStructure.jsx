import React, { useState } from 'react';
import { 
  Plus, Search, ChevronDown, Edit2
} from 'lucide-react';
import CreateSalaryStructureModal from '../components/CreateSalaryStructureModal';

export default function SalaryStructure() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
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
      taxable: 'â€”',
      status: 'Active',
    },
    {
      id: 'COMP-005',
      name: 'Provident Fund',
      type: 'Deduction',
      calcType: 'Percentage',
      defaultValue: '8% of Basic',
      taxable: 'â€”',
      status: 'Inactive',
    },
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <CreateSalaryStructureModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      
      {/* 1. Page Title & Action Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} />
            Add Component
          </button>
        </div>
      </div>

      <div className="panel" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* 2. Global Query & Parameter Filtering */}
        <div style={{ padding: '20px', borderBottom: '1px solid var(--line)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', background: 'var(--surface-2)' }}>
          
          <div className="search" style={{ margin: 0, width: '100%', maxWidth: '300px' }}>
            <Search />
            <input 
              type="text" 
              placeholder="Search components..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
            {/* Type Filter */}
            <div style={{ position: 'relative', minWidth: '140px', margin: 0 }} className="field">
              <select className="glass-ctrl" style={{ width: '100%', margin: 0 }}>
                <option>All Types</option>
                <option>Allowance</option>
                <option>Deduction</option>
              </select>
            </div>

            {/* Status Filter */}
            <div style={{ position: 'relative', minWidth: '140px', margin: 0 }} className="field">
              <select className="glass-ctrl" style={{ width: '100%', margin: 0 }}>
                <option>All Statuses</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

        </div>

        {/* 3. Salary Components Ledger & Variable Metrics */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th style={{ paddingTop: '24px' }}>Component Name</th>
                <th style={{ paddingTop: '24px' }}>Type</th>
                <th style={{ paddingTop: '24px' }}>Calculation Type</th>
                <th style={{ paddingTop: '24px' }}>Default Value</th>
                <th style={{ paddingTop: '24px' }}>Taxable</th>
                <th style={{ paddingTop: '24px' }}>Status</th>
                <th style={{ textAlign: 'right', paddingTop: '24px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {componentsData.map((record) => (
                <tr key={record.id}>
                  <td style={{ fontWeight: '800' }}>{record.name}</td>
                  <td>
                    <span className={`pill ${record.type === 'Allowance' ? 'brand' : 'coral'}`}>
                      {record.type}
                    </span>
                  </td>
                  <td style={{ fontWeight: '600', color: 'var(--ink-2)' }}>{record.calcType}</td>
                  <td style={{ fontWeight: '800' }}>{record.defaultValue}</td>
                  <td style={{ fontWeight: '600', color: record.taxable === 'Yes' ? 'var(--sage)' : 'var(--ink-3)' }}>
                    {record.taxable}
                  </td>
                  <td>
                    <StatusBadge status={record.status} />
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                      <button className="btn primary" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px' }}>
                        <Edit2 size={14} /> Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {componentsData.length === 0 && (
            <div className="empty">
              No salary components found.
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let pillClass = 'pill gray';
  
  if (status === 'Active') {
    pillClass = 'pill green';
  } else if (status === 'Inactive') {
    pillClass = 'pill gray';
  }

  return (
    <span className={pillClass}>
      {status}
    </span>
  );
}



