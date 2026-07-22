const fs = require('fs');
const path = require('path');

const replacements = [
    { from: /\bstroke-dasharray=/g, to: 'strokeDasharray=' },
    { from: /\bstroke-dashoffset=/g, to: 'strokeDashoffset=' },
    { from: /\bstroke-width=/g, to: 'strokeWidth=' },
    { from: /\bstroke-linecap=/g, to: 'strokeLinecap=' },
    { from: /\bstroke-linejoin=/g, to: 'strokeLinejoin=' },
    { from: /\bstroke-miterlimit=/g, to: 'strokeMiterlimit=' },
    { from: /\bfill-rule=/g, to: 'fillRule=' },
    { from: /\bclip-rule=/g, to: 'clipRule=' },
    { from: /\bclip-path=/g, to: 'clipPath=' },
    { from: /\bstop-color=/g, to: 'stopColor=' },
    { from: /\bstop-opacity=/g, to: 'stopOpacity=' },
    { from: /\bfont-family=/g, to: 'fontFamily=' },
    { from: /\bfont-size=/g, to: 'fontSize=' },
    { from: /\bfont-weight=/g, to: 'fontWeight=' },
    { from: /\balignment-baseline=/g, to: 'alignmentBaseline=' },
    { from: /\bbaseline-shift=/g, to: 'baselineShift=' },
    { from: /\bdominant-baseline=/g, to: 'dominantBaseline=' },
    { from: /\bvector-effect=/g, to: 'vectorEffect=' },
    { from: /\bshape-rendering=/g, to: 'shapeRendering=' },
    { from: /\bcolor-interpolation=/g, to: 'colorInterpolation=' }
];

function fixSvgProps(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixSvgProps(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            replacements.forEach(({ from, to }) => {
                content = content.replace(from, to);
            });

            fs.writeFileSync(fullPath, content);
        }
    });
}

fixSvgProps(path.join(__dirname, 'app'));
console.log('Fixed SVG props to camelCase');
