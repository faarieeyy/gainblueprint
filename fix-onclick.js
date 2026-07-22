const fs = require('fs');
const path = require('path');

function fixOnClick(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixOnClick(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Fix onClick="..." to onClick={() => ...}
            // Be careful to not replace if it's already onClick={...}
            content = content.replace(/onClick="([^"]+)"/g, (match, code) => {
                // If it's something like document.getElementById('mob-menu').classList.toggle('hidden')
                // we just wrap it.
                return `onClick={() => { ${code} }}`;
            });
            fs.writeFileSync(fullPath, content);
        }
    });
}
fixOnClick(path.join(__dirname, 'app'));
console.log('Fixed onClick handlers');
