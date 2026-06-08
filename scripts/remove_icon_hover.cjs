const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('group-hover:bg-white/10 group-hover:text-white transition-colors')) {
    content = content.replace(/ group-hover:bg-white\/10 group-hover:text-white transition-colors/g, '');
    fs.writeFileSync(filePath, content);
    console.log(`Reverted icon hover in ${file}`);
  }
});
