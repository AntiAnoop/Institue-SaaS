const fs = require('fs');
const path = require('path');

const outputFile = 'full_project_code_final.txt';
const ignoreDirs = new Set(['node_modules', '.next', '.git', '.vscode', 'public', 'dist', 'build']);
const includeExtensions = new Set(['.ts', '.tsx', '.js', '.json', '.css', '.md', '.env.local']);

if (fs.existsSync(outputFile)) {
  fs.unlinkSync(outputFile);
}

const writeStream = fs.createWriteStream(outputFile, { flags: 'a' });

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!ignoreDirs.has(file)) {
        scanDirectory(fullPath);
      }
    } else {
      const ext = path.extname(file);
      const relPath = path.relative(process.cwd(), fullPath);

      if (includeExtensions.has(ext)) {
        writeStream.write(`\n\n=========================================\n`);
        writeStream.write(`FILE: ${relPath}\n`);
        writeStream.write(`=========================================\n`);
        
        try {
            const content = fs.readFileSync(fullPath, 'utf8');
            writeStream.write(content);
        } catch (err) {
            writeStream.write(`[Error reading file: ${err.message}]`);
        }
      }
    }
  }
}

console.log("⏳ Scanning project and generating dump...");
writeStream.write("PROJECT STRUCTURE AND CODE DUMP\n================================\n");

try {
    scanDirectory(process.cwd());
    writeStream.end();
    console.log(`✅ Success! All code saved to: ${outputFile}`);
    console.log("👉 Copy and paste the content of 'full_project_code_final.txt' here.");
} catch (e) {
    console.error("❌ Error:", e.message);
}