const fs = require('fs');

const page = fs.readFileSync('app/page.jsx', 'utf8');

// A crude way to find unclosed tags
const tags = [];
const regex = /<(\/?)([a-z0-9]+)([^>]*)>/gi;
let match;
while ((match = regex.exec(page)) !== null) {
    const isClosing = match[1] === '/';
    const tagName = match[2].toLowerCase();
    const attrs = match[3];
    
    // Ignore self-closing tags
    if (attrs.endsWith('/') || ['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tagName)) {
        continue;
    }
    
    if (isClosing) {
        if (tags.length > 0 && tags[tags.length - 1].name === tagName) {
            tags.pop();
        } else {
            console.log('Unexpected closing tag:', tagName, 'at index', match.index, 'Expected:', tags.length > 0 ? tags[tags.length - 1].name : 'none');
        }
    } else {
        tags.push({name: tagName, index: match.index});
    }
}
console.log('Unclosed tags:', tags.map(t => t.name));
