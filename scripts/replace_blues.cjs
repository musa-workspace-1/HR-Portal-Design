const fs = require('fs');
const path = require('path');

const dirs = [path.join(__dirname, 'src', 'pages'), path.join(__dirname, 'src', 'components')];

dirs.forEach(dir => {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

  files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    let modified = false;

    const replacements = {
      'text-blue-600': 'text-primary',
      'text-blue-700': 'text-primary',
      'text-blue-500': 'text-primary',
      'text-blue-800': 'text-primary',
      'bg-blue-50': 'bg-primary/10',
      'bg-blue-100': 'bg-primary/20',
      'border-blue-200': 'border-primary/20',
      'hover:bg-blue-700': 'hover:opacity-90',
      'hover:bg-blue-600': 'hover:opacity-90',
      'hover:text-blue-800': 'hover:opacity-80',
      'hover:bg-blue-50': 'hover:bg-primary/10',
      'bg-blue-500': 'bg-primary',
      'bg-blue-600': 'bg-primary',
      "'#3b82f6'": "'#041E66'"
    };

    for (const [key, value] of Object.entries(replacements)) {
      if (content.includes(key)) {
        content = content.split(key).join(value);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    }
  });
});
