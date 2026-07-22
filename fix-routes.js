const fs = require('fs');
const path = require('path');

function fixRoutes(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixRoutes(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            // Replace href and window.location.href strings
            content = content
                .replace(/href=["']\/?index\.html["']/g, 'href="/"')
                .replace(/href=["']\/?journey\.html["']/g, 'href="/journey"')
                .replace(/href=["']\/?ebook\.html["']/g, 'href="/ebook"')
                .replace(/href=["']\/?bmi\.html["']/g, 'href="/bmi"')
                .replace(/href=["']\/?contact\.html["']/g, 'href="/contact"')
                .replace(/href=["']\/?fitness-tools\.html["']/g, 'href="/fitness-tools"')
                .replace(/href=["']\/?dashboard\.html["']/g, 'href="/dashboard"')
                .replace(/href=["']\/?login\.html["']/g, 'href="/login"')
                .replace(/href=["']\/?reader\.html(["'\?])/g, 'href="/reader$1')
                .replace(/href=["']\/?admin\.html["']/g, 'href="/admin"')
                .replace(/href=["']\/?admin\/login\.html["']/g, 'href="/admin/login"')
                
                // Replace window.location.href = '...'
                .replace(/window\.location\.href\s*=\s*['"]\/?index\.html['"]/g, "window.location.href = '/'")
                .replace(/window\.location\.href\s*=\s*['"]\/?journey\.html['"]/g, "window.location.href = '/journey'")
                .replace(/window\.location\.href\s*=\s*['"]\/?ebook\.html['"]/g, "window.location.href = '/ebook'")
                .replace(/window\.location\.href\s*=\s*['"]\/?bmi\.html['"]/g, "window.location.href = '/bmi'")
                .replace(/window\.location\.href\s*=\s*['"]\/?contact\.html['"]/g, "window.location.href = '/contact'")
                .replace(/window\.location\.href\s*=\s*['"]\/?fitness-tools\.html['"]/g, "window.location.href = '/fitness-tools'")
                .replace(/window\.location\.href\s*=\s*['"]\/?dashboard\.html['"]/g, "window.location.href = '/dashboard'")
                .replace(/window\.location\.href\s*=\s*['"]\/?login\.html['"]/g, "window.location.href = '/login'")
                .replace(/window\.location\.href\s*=\s*`\/?reader\.html/g, "window.location.href = `/reader")
                .replace(/window\.location\.href\s*=\s*['"]\/?admin\.html['"]/g, "window.location.href = '/admin'")
                .replace(/window\.location\.href\s*=\s*['"]\/?admin\/login\.html['"]/g, "window.location.href = '/admin/login'");

            fs.writeFileSync(fullPath, content);
        }
    });
}

fixRoutes(path.join(__dirname, 'app'));
console.log('Fixed all .html routes');
