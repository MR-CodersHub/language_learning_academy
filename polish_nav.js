const fs = require('fs');
const path = require('path');

const dir = __dirname;

// Map of filename → which nav link should have "active" class
const activeMap = {
  'index.html':        'index.html',
  'home-2.html':       'home-2.html',
  'about.html':        'about.html',
  'courses.html':      'courses.html',
  'languages.html':    'languages.html',
  'blog.html':         'blog.html',
  'testimonials.html': 'blog.html',   // testimonials lives under blog section
  'faq.html':          'blog.html',   // faq lives under blog section
  'contact.html':      'contact.html',
  'teachers.html':     'about.html',
  'pricing.html':      'courses.html',
  'auth.html':         ''
};

const files = Object.keys(activeMap);

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remove extra blank lines between Blog and Contact in nav
  content = content.replace(
    /(<a href="blog\.html" class="nav-link[^"]*"[^>]*>Blog<\/a>)\s*\n(\s*\n)+(\s*<a href="contact\.html")/g,
    '$1\n$3'
  );

  // 2. Fix active states - first strip ALL active classes from nav-links
  content = content.replace(/<a href="([^"]+)" class="nav-link active">/g, '<a href="$1" class="nav-link">');

  // 3. Then re-add active to the correct one
  const activeHref = activeMap[file];
  if (activeHref) {
    content = content.replace(
      new RegExp(`<a href="${activeHref}" class="nav-link">`),
      `<a href="${activeHref}" class="nav-link active">`
    );
  }

  fs.writeFileSync(filePath, content);
  console.log(`  ✓ Polished: ${file}`);
});

console.log('\nAll nav links polished successfully!');
