const fs = require('fs');
const path = require('path');

const pageJsx = path.join(__dirname, 'app', 'page.jsx');
let content = fs.readFileSync(pageJsx, 'utf8');

// Replace any closing </div></div></section> that has too many divs
content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/g, '</div>\n</div>\n</section>');
content = content.replace(/<\/div>\s*<\/div>\s*<\/section>/g, '</div>\n</section>');

fs.writeFileSync(pageJsx, content);
console.log('Fixed page.jsx section tags');
