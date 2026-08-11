const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');

const walk = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach((file) => {
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          if (/\.(tsx|ts|js|jsx|css)$/.test(file)) {
            results.push(file);
          }
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

const hexRegex = /#(0284c7|2ba9e3|0369a1|0ea5e9|7dd3fc)\b/gi;
const tailwindRegex = /(text|bg|border|ring|from|via|to|shadow|fill|stroke|divide|outline)-(?:blue|cyan|sky)-[1-9]00\b/g;
const rgbaRegex = /rgba\(\s*(?:43\s*,\s*169\s*,\s*227|3\s*,\s*105\s*,\s*161|0\s*,\s*210\s*,\s*255|50\s*,\s*200\s*,\s*255)\b/g;

walk(dir, (err, results) => {
  if (err) throw err;
  let filesModified = 0;
  
  results.forEach((file) => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    content = content.replace(hexRegex, '#23abe6');
    content = content.replace(tailwindRegex, '$1-[#23abe6]');
    content = content.replace(rgbaRegex, 'rgba(35,171,230');

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
      filesModified++;
    }
  });
  
  console.log(`Total files modified: ${filesModified}`);
});
