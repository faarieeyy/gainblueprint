const fs = require('fs');
const path = require('path');

const pageJsx = path.join(__dirname, 'app', 'page.jsx');
let content = fs.readFileSync(pageJsx, 'utf8');

// Replace 3 closing divs followed by section with 2 closing divs
content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/, '</div>\n</div>\n</section>');

fs.writeFileSync(pageJsx, content);
console.log('Fixed page.jsx');
