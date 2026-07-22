const fs = require('fs');
const path = require('path');

function fixPreloader(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixPreloader(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Replace window.addEventListener('load', () => { ... }); with just the inner content.
            content = content.replace(/window\.addEventListener\('load',\s*\(\)\s*=>\s*\{\s*setTimeout/g, 'setTimeout');
            
            // We also need to remove the closing }); for the event listener.
            // In the original code, it looks like:
            //             }, 1800);
            //         });
            // We will replace this specific ending
            content = content.replace(/\},\s*1800\);\s*\}\);/g, '}, 1800);');
            
            fs.writeFileSync(fullPath, content);
        }
    });
}

fixPreloader(path.join(__dirname, 'app'));
console.log('Fixed preloader using strict replace');
