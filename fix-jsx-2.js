const fs = require('fs');
const path = require('path');

function fixJsx(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixJsx(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Fix style={{fontVariationSettings: ''FILL' 1', }}
            // Replace with style={{fontVariationSettings: "'FILL' 1"}}
            content = content.replace(/style=\{\{fontVariationSettings:\s*['"]+FILL['"]+\s*1['"]*,\s*\}\}/g, 'style={{fontVariationSettings: "\'FILL\' 1"}}');
            content = content.replace(/style=\{\{fontVariationSettings:\s*['"]+FILL['"]+\s*0['"]*,\s*\}\}/g, 'style={{fontVariationSettings: "\'FILL\' 0"}}');
            
            // For the dashboard error with string literal:
            content = content.replace(/style=\{\{fontVariationSettings:\s*\\'FILL\\'\s*1',\s*\}\}/g, 'style={{fontVariationSettings: "\\\'FILL\\\' 1"}}');
            content = content.replace(/style=\{\{fontVariationSettings:\s*'\\'FILL\\' 1',\s*\}\}/g, 'style={{fontVariationSettings: "\\\'FILL\\\' 1"}}');
            
            // Blanket replace for the specific malformed strings I see in the logs:
            content = content.replace(/style=\{\{fontVariationSettings:\s*''FILL'\s*1',\s*\}\}/g, 'style={{fontVariationSettings: "\\\'FILL\\\' 1"}}');
            content = content.replace(/style=\{\{fontVariationSettings:\s*'\\'FILL\\'\s*1',\s*\}\}/g, 'style={{fontVariationSettings: "\\\'FILL\\\' 1"}}');
            
            fs.writeFileSync(fullPath, content);
        }
    });
}
fixJsx(path.join(__dirname, 'app'));
