const fs = require('fs');
const path = require('path');

const pageJsx = path.join(__dirname, 'app', 'page.jsx');
let content = fs.readFileSync(pageJsx, 'utf8');

// Replace any sequence of </div> followed by </section> where there are too many divs
content = content.replace(/<\/div>\s*<\/div>\s*<\/section>/, '</div>\n</section>');

fs.writeFileSync(pageJsx, content);
console.log('Fixed page.jsx section tags');
