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
            
            const target = `        window.addEventListener('load', () => {
            setTimeout(() => {
                const preloader = document.getElementById('preloader');
                if (preloader) {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 1000);
                }
            }, 1800);
        });`;
            
            const replacement = `        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 1000);
            }
        }, 1800);`;
            
            if (content.includes(target)) {
                content = content.replace(target, replacement);
                fs.writeFileSync(fullPath, content);
            }
        }
    });
}

fixPreloader(path.join(__dirname, 'app'));
console.log('Fixed preloader');
