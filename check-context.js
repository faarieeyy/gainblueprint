const fs = require('fs');

const page = fs.readFileSync('app/page.jsx', 'utf8');

console.log(page.substring(18850, 18950));
