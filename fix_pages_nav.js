const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

// The exact Pages dropdown block to remove (covers both index.html style and others)
const pagesDropdownPatterns = [
  // Pattern with newlines - the standard Pages dropdown
  /\s*<\/div>\s*\n\s*\n\s*<a href="contact\.html"/g,
  // Match the full Pages dropdown div block
  /\s*<!-- Pages Dropdown -->\s*\n\s*<div class="nav-item-dropdown">[\s\S]*?<\/div>\s*\n/g
];

let updatedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  const original = content;

  // Step 1: Remove the entire Pages dropdown block (handles all variations)
  // This regex captures the full dropdown div including its children
  content = content.replace(
    /[ \t]*<!-- Pages Dropdown -->[ \t]*\n[ \t]*<div class="nav-item-dropdown">[\s\S]*?<\/div>\s*<\/div>\s*\n/g,
    '\n'
  );

  // Step 2: Add Blog link before Contact if it doesn't already exist
  // Check if there's already a blog nav-link (not inside a dropdown)
  if (!content.includes('<a href="blog.html" class="nav-link"')) {
    content = content.replace(
      /(\s*<a href="contact\.html" class="nav-link[^"]*"[^>]*>Contact<\/a>)/,
      '\n        <a href="blog.html" class="nav-link">Blog</a>$1'
    );
  }

  if (content !== original) {
    fs.writeFileSync(path.join(dir, file), content);
    updatedCount++;
    console.log(`  ✓ Updated: ${file}`);
  } else {
    console.log(`  - No change: ${file}`);
  }
});

console.log(`\nDone! Updated ${updatedCount} files.`);
