const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const filesToReskin = [
  'AttendanceDashboard.jsx',
  'AttendanceLog.jsx',
  'Shift.jsx',
  'Overtime.jsx',
  'Leave.jsx',
  'RecruitmentDashboard.jsx',
  'CandidatePipeline.jsx',
  'Interviews.jsx',
  'OfferLetters.jsx',
  'PayrollDashboard.jsx',
  'SalaryStructure.jsx',
  'Notifications.jsx',
  'Settings.jsx',
  'Help.jsx',
  'Team.jsx',
  'Onboarding.jsx',
  'Offboarding.jsx'
];

filesToReskin.forEach(file => {
  const filePath = path.join(pagesDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file} - not found`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Page wrapper
  content = content.replace(/className="max-w-[^"]*mx-auto[^"]*"/g, 'className="stagger"');
  content = content.replace(/className={`max-w-[^`]*`}/g, 'className="stagger"');

  // Section headers
  content = content.replace(/className="flex flex-col md:flex-row md:items-center justify-between gap-4"/g, 'className="sec-head"');
  content = content.replace(/className="flex items-center justify-between[^"]*mb-6[^"]*"/g, 'className="sec-head"');
  
  // Panels
  content = content.replace(/className="bg-white[^"]*rounded-2xl[^"]*shadow-sm[^"]*border border-slate-100[^"]*"/g, 'className="panel"');
  content = content.replace(/className="bg-white[^"]*rounded-xl[^"]*shadow-sm[^"]*border border-slate-100[^"]*"/g, 'className="panel"');
  content = content.replace(/className={`bg-white[^`]*rounded-2xl[^`]*shadow-sm[^`]*`}/g, 'className="panel"');

  // Grids
  content = content.replace(/className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[^"]*"/g, 'className="grid" style={{ gridTemplateColumns: \'repeat(auto-fit, minmax(200px, 1fr))\', gap: \'16px\' }}');
  content = content.replace(/className="grid grid-cols-1 md:grid-cols-3 gap-[^"]*"/g, 'className="grid" style={{ gridTemplateColumns: \'repeat(auto-fit, minmax(300px, 1fr))\', gap: \'16px\' }}');
  content = content.replace(/className="grid grid-cols-1 lg:grid-cols-3 gap-[^"]*"/g, 'className="grid" style={{ gridTemplateColumns: \'1fr 1fr 1fr\', gap: \'16px\' }}');
  content = content.replace(/className="grid grid-cols-[^"]*"/g, 'className="grid"');

  // Buttons
  content = content.replace(/className="flex items-center gap-2 px-4 py-2 bg-primary hover:opacity-90 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"/g, 'className="btn primary"');
  content = content.replace(/className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-primary hover:opacity-90 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"/g, 'className="btn primary" style={{ width: "100%", justifyContent: "center" }}');
  content = content.replace(/className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"/g, 'className="btn ghost"');

  // Tables
  content = content.replace(/className="w-full text-left border-collapse"/g, '');
  content = content.replace(/className="bg-slate-50\/50 text-slate-500 font-medium text-xs uppercase tracking-wider border-b border-slate-100"/g, '');
  content = content.replace(/className="px-6 py-4 text-sm text-slate-700 border-b border-slate-100"/g, '');
  content = content.replace(/className="px-6 py-3 text-sm text-slate-700 border-b border-slate-100"/g, '');
  content = content.replace(/className="px-6 py-4 text-sm font-bold text-slate-900 border-b border-slate-100"/g, '');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${file}`);
});
