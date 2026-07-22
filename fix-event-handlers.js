const fs = require('fs');
const path = require('path');

function fixEventHandlers(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixEventHandlers(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            content = content
                .replace(/onsubmit="([^"]+)"/g, (match, code) => {
                    const cleanCode = code.replace(/event/g, 'e');
                    return `onSubmit={(e) => { e.preventDefault(); ${cleanCode}; }}`;
                })
                .replace(/onkeyup="([^"]+)"/g, 'onKeyUp={(e) => { $1; }}')
                .replace(/onkeydown="([^"]+)"/g, 'onKeyDown={(e) => { $1; }}')
                .replace(/onkeypress="([^"]+)"/g, 'onKeyPress={(e) => { $1; }}')
                .replace(/onfocus="([^"]+)"/g, 'onFocus={(e) => { $1; }}')
                .replace(/onblur="([^"]+)"/g, 'onBlur={(e) => { $1; }}');

            fs.writeFileSync(fullPath, content);
        }
    });
}

fixEventHandlers(path.join(__dirname, 'app'));
console.log('Fixed lowercase event handlers');
