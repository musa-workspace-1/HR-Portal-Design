const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');

const signatures = {
  'Team.jsx': 'function TaskCard({ title, value, icon, color }) {',
  'RecruitmentDashboard.jsx': 'function MetricCard({ title, value, icon, trend, trendColor }) {',
  'PayrollDashboard.jsx': 'function MetricCard({ title, value, icon, trend, trendColor }) {',
  'Onboarding.jsx': 'function MetricCard({ title, value, icon, color, textClass }) {',
  'Offboarding.jsx': 'function MetricCard({ title, value, icon, color, textClass }) {',
  'Leave.jsx': 'function MetricCard({ title, value, icon }) {',
  'EmployeeDirectory.jsx': 'function KpiCard({ title, value, icon, color }) {',
  'Dashboard.jsx': 'function KpiCard({ title, value, trend, trendValue, icon, color }) {',
  'AttendanceDashboard.jsx': 'function MetricCard({ title, value, icon }) {'
};

for (const [file, sig] of Object.entries(signatures)) {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (file === 'Dashboard.jsx') {
      content = content.replace(/function KpiCard\(\{\s*const isUp = trend === 'up';/, `${sig}\n  const isUp = trend === 'up';`);
    } else {
      content = content.replace(/function (KpiCard|MetricCard|TaskCard)\(\{\s*return \(/, `${sig}\n  return (`);
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${file}`);
  }
}
