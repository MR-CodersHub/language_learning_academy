const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'assets', 'js', 'main.js');

let content = fs.readFileSync(file, 'utf8');
content = content.replace(/AuraLingo/g, 'Fluentra');
content = content.replace(/auralingo_/g, 'fluentra_');
content = content.replace(/auralingo\.com/g, 'fluentra.com');

fs.writeFileSync(file, content);
console.log('Successfully updated main.js');
