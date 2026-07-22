const fs = require('fs');

const path = 'app/dashboard/page.jsx';
let content = fs.readFileSync(path, 'utf8');

// The problematic string in JSX is: style={{fontVariationSettings: '\'FILL\' 1', }}
// We replace it with: style={{fontVariationSettings: "'FILL' 1"}}
content = content.replace(/style=\{\{fontVariationSettings:\s*\\'FILL\\'\s*1',\s*\}\}/g, 'style={{fontVariationSettings: "\'FILL\' 1"}}');
content = content.replace(/style=\{\{fontVariationSettings:\s*'\\'FILL\\' 1',\s*\}\}/g, 'style={{fontVariationSettings: "\'FILL\' 1"}}');

// Actually, in the build error, the exact string it sees is: style={{fontVariationSettings: '\'FILL\' 1', }}
// In Regex, matching \' is tricky. We'll just replace the whole style block.
content = content.replace(/style=\{\{fontVariationSettings:[^\}]+\}\}/g, 'style={{fontVariationSettings: "\\\'FILL\\\' 1"}}');

fs.writeFileSync(path, content);
console.log('Fixed dashboard.jsx');
