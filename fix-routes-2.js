const fs = require('fs');
const path = require('path');

function fixRoutesMore(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixRoutesMore(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            content = content
                .replace(/fitness-tools\.html#/g, '/fitness-tools#')
                .replace(/reader\.html\?/g, '/reader?');

            fs.writeFileSync(fullPath, content);
        }
    });
}

fixRoutesMore(path.join(__dirname, 'app'));
console.log('Fixed remaining .html routes');
