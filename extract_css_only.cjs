const fs = require('fs');

const html = fs.readFileSync('reference.html', 'utf-8');
const start = html.indexOf('<style>') + 7;
const end = html.lastIndexOf('</style>');
const css = html.substring(start, end);

fs.writeFileSync('src/reskin.css', css, 'utf-8');
console.log('CSS extracted and written to src/reskin.css');
