const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  const cardFuncRegex = /function (KpiCard|MetricCard|TaskCard)\s*\([^)]*\)\s*\{([\s\S]*?)\n\}/g;

  content = content.replace(cardFuncRegex, (match, funcName, body) => {
    let newBody = body;
    
    newBody = newBody.replace(/<div className="(bg-white[^"]*)"/, '<div className="$1 group hover:bg-gradient-to-br hover:from-primary hover:to-blue-950 transition-all duration-300 cursor-pointer border-transparent hover:border-transparent hover:shadow-md"');
    
    newBody = newBody.replace(/text-slate-500/g, 'text-slate-500 group-hover:text-blue-100 transition-colors');
    newBody = newBody.replace(/text-slate-900/g, 'text-slate-900 group-hover:text-white transition-colors');
    newBody = newBody.replace(/text-slate-400/g, 'text-slate-400 group-hover:text-white\/70 transition-colors');
    
    if (newBody.includes('${color}')) {
      newBody = newBody.replace(/\$\{color\}/g, '${color} group-hover:bg-white/10 group-hover:text-white transition-colors');
    }
    
    newBody = newBody.replace(/'text-emerald-600'/g, "'text-emerald-600 group-hover:text-emerald-300'");
    newBody = newBody.replace(/'text-rose-600'/g, "'text-rose-600 group-hover:text-rose-300'");
    
    modified = true;
    return `function ${funcName}${match.substring(match.indexOf('('), match.indexOf('{') + 1)}${newBody}\n}`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
