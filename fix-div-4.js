const fs = require('fs');

const pageJsx = 'app/page.jsx';
let content = fs.readFileSync(pageJsx, 'utf8');

// Add one closing </div> before the last </section> that precedes </main>
content = content.replace(/<\/section>\s*<\/main>/, '</div>\n</section>\n\n</main>');

fs.writeFileSync(pageJsx, content);
console.log('Fixed page.jsx unclosed div');
