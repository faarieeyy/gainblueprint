const fs = require('fs');
const path = require('path');

function fixClassToClassName(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixClassToClassName(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Safely replace class=" with className=" avoiding replacing inside text
            content = content.replace(/\sclass="/g, ' className="');
            // Also replace for single quotes
            content = content.replace(/\sclass='/g, ' className=\'');
            
            // Replace <br> with <br /> globally
            content = content.replace(/<br>/g, '<br />');
            content = content.replace(/<hr>/g, '<hr />');
            
            fs.writeFileSync(fullPath, content);
        }
    });
}
fixClassToClassName(path.join(__dirname, 'app'));
console.log('Fixed class/className and br/hr');
