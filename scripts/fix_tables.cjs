const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let modified = false;

  if (content.includes('whitespace-nowrap')) {
    content = content.replace(/<table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">/g, '<table className="w-full text-left text-xs text-slate-600">');
    // also scale down table text size to text-xs to fit more data
    content = content.replace(/<table className="w-full text-left text-sm text-slate-600">/g, '<table className="w-full text-left text-xs text-slate-600">');
    modified = true;
  }

  if (content.includes('px-6 py-4')) {
    content = content.replace(/px-6 py-4/g, 'px-3 py-2');
    modified = true;
  }

  if (content.includes('overflow-x-auto')) {
    content = content.replace(/className="overflow-x-auto"/g, 'className="w-full"');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
