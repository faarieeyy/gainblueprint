const fs = require('fs');

const bmiHtml = fs.readFileSync('public/bmi.html', 'utf8');

// Use convert logic to get fresh page.jsx for bmi
let body = bmiHtml;

const scriptMatches = [];
body = body.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, (match, content) => {
    if (content.trim()) scriptMatches.push(content);
    return '';
});

body = body.replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/tabindex=/g, 'tabIndex=')
    .replace(/<br>/g, '<br />')
    .replace(/<hr>/g, '<hr />')
    .replace(/<img([^>]+?)(?<!\/)>/g, '<img$1 />')
    .replace(/<input([^>]+?)(?<!\/)>/g, '<input$1 />')
    .replace(/stroke-dasharray=/g, 'strokeDasharray=')
    .replace(/stroke-dashoffset=/g, 'strokeDashoffset=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=');

const jsCode = scriptMatches.join('\n\n');

const cleanJsCode = jsCode
    .replace(/window\.addEventListener\('load'[\s\S]*?\},?\s*1800\);\s*\}\);/g, '')
    .replace(/href="[^"]*journey\.html"/g, 'href="/journey"')
    .replace(/href="[^"]*ebook\.html"/g, 'href="/ebook"')
    .replace(/href="[^"]*bmi\.html"/g, 'href="/bmi"')
    .replace(/href="[^"]*contact\.html"/g, 'href="/contact"')
    .replace(/href="[^"]*fitness-tools\.html"/g, 'href="/fitness-tools"')
    .replace(/href="[^"]*index\.html"/g, 'href="/"');

const jsx = `'use client';
import { useEffect } from 'react';

export default function Page() {
    useEffect(() => {
        ${cleanJsCode}
    }, []);

    return (
        <>
            ${body}
        </>
    );
}
`;

fs.writeFileSync('app/bmi/page.jsx', jsx);
console.log('Regenerated app/bmi/page.jsx cleanly');
