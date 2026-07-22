const fs = require('fs');
const path = require('path');

// Fix API imports
function fixApiImports(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixApiImports(fullPath);
        } else if (fullPath.endsWith('route.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            content = content.replace(/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/db\/db/g, '../../../../db/db');
            fs.writeFileSync(fullPath, content);
        }
    });
}
fixApiImports(path.join(__dirname, 'app', 'api'));

// Fix JSX syntax errors
function fixJsx(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixJsx(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Fix unicode escape error in style objects
            content = content.replace(/style=\{\{([^\}]+)\}\}/g, (match, styles) => {
                return `style={{${styles.replace(/\\'/g, "'")}}}`;
            });
            fs.writeFileSync(fullPath, content);
        }
    });
}
fixJsx(path.join(__dirname, 'app'));

