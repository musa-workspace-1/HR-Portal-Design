const fs = require('fs');

const html = fs.readFileSync('reference.html', 'utf-8');
const start = html.indexOf('</style>');
const end = html.lastIndexOf('</html>');
const body = html.substring(start + 8, end);

fs.writeFileSync('src/reskin.html', body, 'utf-8');
console.log('HTML extracted and written to src/reskin.html');
