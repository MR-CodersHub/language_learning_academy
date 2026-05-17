const fs = require('fs');
const path = require('path');

const dir = __dirname;
const pages = [
  'index.html', 'home-2.html', 'about.html', 'courses.html',
  'languages.html', 'blog.html', 'testimonials.html', 'faq.html',
  'contact.html', 'teachers.html', 'pricing.html', 'auth.html'
];

// The single canonical header-actions block for ALL pages
const canonicalHeaderActions = `      <!-- Header Actions -->
      <div class="header-actions">
        <!-- Theme Toggle -->
        <div class="theme-toggle" id="themeToggleBtn" title="Toggle Theme" role="button" aria-label="Toggle theme">
          <div class="theme-toggle-ball"></div>
          <i class="fa-solid fa-sun"></i>
          <i class="fa-solid fa-moon"></i>
        </div>

        <!-- User Account Icon -->
        <div class="user-account-widget" id="headerUserWidget">
          <button class="account-trigger-btn" id="accountTriggerBtn" aria-label="User Account Menu" aria-expanded="false">
            <i class="fa-regular fa-circle-user"></i>
          </button>
          <div class="account-dropdown" id="accountDropdownMenu" role="menu">
            <!-- Injected by JS -->
          </div>
        </div>

        <!-- Hamburger -->
        <div class="hamburger" id="hamburgerMenuBtn" title="Toggle Mobile Navigation" role="button" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>`;

// Regex to match the entire header-actions block (from comment to closing </div>)
const headerActionsRegex = /[ \t]*<!-- (?:Utilities.*?|Header Actions) -->[\s\S]*?<\/div>\s*\n\s*<\/div>\s*\n\s*<\/header>/;

pages.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace the entire header-actions block
  const replaced = content.replace(
    headerActionsRegex,
    canonicalHeaderActions + '\n    </div>\n  </header>'
  );

  if (replaced !== content) {
    fs.writeFileSync(filePath, replaced);
    console.log(`  ✓ Fixed: ${file}`);
  } else {
    console.log(`  ~ Skipped (no match): ${file}`);
  }
});

console.log('\nHeader actions standardized across all pages!');
