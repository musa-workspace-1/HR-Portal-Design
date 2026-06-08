const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let modified = false;

  if (content.includes('<table className="w-full text-left text-xs text-slate-600">')) {
    content = content.replace(/<table className="w-full text-left text-xs text-slate-600">/g, '<table className="w-full text-left text-sm text-slate-600">');
    modified = true;
  }

  if (content.includes('px-3 py-2')) {
    content = content.replace(/px-3 py-2/g, 'px-4 py-3');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
