const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const appDir = path.join(__dirname, 'app');

if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir, { recursive: true });
}

function convertHtmlToJsx(htmlContent) {
    // Basic JSX conversions
    let jsx = htmlContent
        .replace(/class=/g, 'className=')
        .replace(/onclick=/g, 'onClick=')
        .replace(/for=/g, 'htmlFor=')
        .replace(/stroke-width=/g, 'strokeWidth=')
        .replace(/stroke-linecap=/g, 'strokeLinecap=')
        .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
        .replace(/fill-rule=/g, 'fillRule=')
        .replace(/clip-rule=/g, 'clipRule=')
        .replace(/viewbox=/gi, 'viewBox=')
        .replace(/font-variation-settings=/g, 'fontVariationSettings=')
        .replace(/charset=/g, 'charSet=');

    // Remove <!DOCTYPE html> and <html...> <head>...</head> and <body> tags since we have layout.jsx
    // Wait, the user has script tags, preloaders, etc. inside body.
    // Let's just extract everything inside <body>...</body>
    const bodyMatch = jsx.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
        jsx = bodyMatch[1];
    } else {
        console.log("No body tag found, using whole content");
    }

    // Fix self-closing tags
    jsx = jsx.replace(/<img([^>]+?)(?<!\/)>/g, '<img$1 />');
    jsx = jsx.replace(/<input([^>]+?)(?<!\/)>/g, '<input$1 />');
    jsx = jsx.replace(/<br>/g, '<br />');
    jsx = jsx.replace(/<hr([^>]+?)(?<!\/)>/g, '<hr$1 />');
    jsx = jsx.replace(/<hr>/g, '<hr />');
    
    // Inline styles need to be converted to objects
    jsx = jsx.replace(/style="([^"]*)"/g, (match, styleString) => {
        const styleObj = styleString.split(';').reduce((acc, style) => {
            const parts = style.split(':');
            if (parts.length === 2) {
                const key = parts[0].trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                let value = parts[1].trim();
                // If it's just a number, we might need to add quotes unless it's specific props. 
                // We'll wrap all values in quotes to be safe.
                acc += `${key}: '${value.replace(/'/g, "\\'")}', `;
            }
            return acc;
        }, '');
        return `style={{${styleObj}}}`;
    });

    // Fix comments
    jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

    // Fix empty script tags or specific script tags
    // For now we'll just leave scripts as they are inside the component or remove them and use useEffect.
    // Since scripts use document.getElementById, they will work if we put them in a useEffect.
    const scripts = [];
    jsx = jsx.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, (match, code) => {
        if (code.trim()) {
            scripts.push(code);
        }
        return '';
    });

    // Create the React component wrapper
    let componentBody = `
'use client';
import { useEffect } from 'react';

export default function Page() {
    useEffect(() => {
        ${scripts.join('\n')}
    }, []);

    return (
        <>
            ${jsx}
        </>
    );
}
`;
    return componentBody;
}

const pages = [
    { src: 'index.html', dest: 'page.jsx' },
    { src: 'journey.html', dest: 'journey/page.jsx' },
    { src: 'ebook.html', dest: 'ebook/page.jsx' },
    { src: 'bmi.html', dest: 'bmi/page.jsx' },
    { src: 'contact.html', dest: 'contact/page.jsx' },
    { src: 'fitness-tools.html', dest: 'fitness-tools/page.jsx' },
    { src: 'dashboard.html', dest: 'dashboard/page.jsx' },
    { src: 'reader.html', dest: 'reader/page.jsx' },
    { src: 'login.html', dest: 'login/page.jsx' },
    { src: 'admin/index.html', dest: 'admin/page.jsx' },
    { src: 'admin/login.html', dest: 'admin/login/page.jsx' }
];

pages.forEach(page => {
    const srcPath = path.join(publicDir, page.src);
    const destPath = path.join(appDir, page.dest);
    
    if (fs.existsSync(srcPath)) {
        const html = fs.readFileSync(srcPath, 'utf8');
        const jsx = convertHtmlToJsx(html);
        
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        
        fs.writeFileSync(destPath, jsx);
        console.log(`Converted ${page.src} to ${page.dest}`);
    } else {
        console.warn(`File not found: ${srcPath}`);
    }
});
