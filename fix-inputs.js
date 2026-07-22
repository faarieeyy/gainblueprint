const fs = require('fs');
const path = require('path');

function fixInputs(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixInputs(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            // Replace oninput="..." with onChange={() => { ... }}
            content = content.replace(/oninput="([^"]+)"/g, 'onChange={() => { $1 }}');
            content = content.replace(/onchange="([^"]+)"/g, 'onChange={() => { $1 }}');

            // For inputs with value="..." and disabled without onChange or readOnly
            content = content.replace(/value="\+91"\s+disabled/g, 'defaultValue="+91" disabled readOnly');

            // Replace value="..." on inputs with defaultValue="..." unless there's an onChange
            content = content.replace(/<input([^>]*)\svalue="([^"]*)"([^>]*)>/g, (match, p1, p2, p3) => {
                if (match.includes('onChange') || match.includes('readOnly')) {
                    return match;
                }
                if (match.includes('disabled')) {
                    return `<input${p1} value="${p2}" readOnly${p3}>`;
                }
                return `<input${p1} defaultValue="${p2}"${p3}>`;
            });

            fs.writeFileSync(fullPath, content);
        }
    });
}

fixInputs(path.join(__dirname, 'app'));
console.log('Fixed input value and event props');
