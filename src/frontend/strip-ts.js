import fs from 'fs';
import path from 'path';
import babel from '@babel/core';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else {
            if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

const files = walk(srcDir);

files.forEach(file => {
    // Delete type definition files
    if (file.endsWith('.d.ts')) {
        fs.unlinkSync(file);
        return;
    }
    
    console.log(`Processing ${file}`);
    const code = fs.readFileSync(file, 'utf-8');
    
    try {
        const result = babel.transformSync(code, {
            filename: file,
            presets: [
                ['@babel/preset-typescript', { isTSX: file.endsWith('.tsx'), allExtensions: true }]
            ],
            retainLines: false, // Don't enforce line retention to allow clean type deletion
            compact: false,
        });
        
        if (result && result.code) {
            let newFile = file.endsWith('.tsx') ? file.replace(/\.tsx$/, '.jsx') : file.replace(/\.ts$/, '.js');
            fs.writeFileSync(newFile, result.code);
            fs.unlinkSync(file);
        }
    } catch (e) {
        console.error(`Failed on ${file}`, e);
    }
});

// Update index.html
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
    let indexHtml = fs.readFileSync(indexPath, 'utf-8');
    indexHtml = indexHtml.replace('/src/main.tsx', '/src/main.jsx');
    fs.writeFileSync(indexPath, indexHtml);
}

console.log("TypeScript stripped and files renamed successfully!");
