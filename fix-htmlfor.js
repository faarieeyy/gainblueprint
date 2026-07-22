const fs = require('fs');
const path = require('path');

function fixHtmlFor(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixHtmlFor(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            content = content.replace(/\sfor="/g, ' htmlFor="');
            // Also replace tabindex to tabIndex
            content = content.replace(/\stabindex="/g, ' tabIndex="');
            // Also replace autocomplete to autoComplete
            content = content.replace(/\sautocomplete="/g, ' autoComplete="');
            fs.writeFileSync(fullPath, content);
        }
    });
}
fixHtmlFor(path.join(__dirname, 'app'));
console.log('Fixed htmlFor and tabIndex');
