const fs = require('fs');
const path = require('path');

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            content = content.replace(/window\.addEventListener\('DOMContentLoaded',\s*([a-zA-Z0-9_]+)\);/g, '$1();');
            // Remove <!-- and --> from JSX if any sneaked in
            content = content.replace(/<!--/g, '{/*').replace(/-->/g, '*/}');
            fs.writeFileSync(fullPath, content);
        }
    });
}

processDir(path.join(__dirname, 'app'));
