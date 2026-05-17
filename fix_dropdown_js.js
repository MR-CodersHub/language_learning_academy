const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'assets', 'js', 'main.js');
let content = fs.readFileSync(filePath, 'utf8');

// Find the start and end markers
const startMarker = '  // --- 12. DYNAMIC USER ACCOUNT DROPDOWN ---';
const endMarker = '});';

const startIdx = content.indexOf(startMarker);
// Find the last occurrence of }); which closes the DOMContentLoaded
const endIdx = content.lastIndexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Markers not found!');
  process.exit(1);
}

const newSection = `  // --- 12. DYNAMIC USER ACCOUNT DROPDOWN ---
  const accountTriggerBtn = document.getElementById('accountTriggerBtn');
  const accountDropdownMenu = document.getElementById('accountDropdownMenu');

  if (accountTriggerBtn && accountDropdownMenu) {
    // Fixed 3-item menu — always the same regardless of login state
    accountDropdownMenu.innerHTML = \`
      <a href="auth.html" class="acct-drop-link primary-link">
        <i class="fa-solid fa-right-to-bracket"></i>
        Login / Signup
      </a>
      <div class="acct-drop-divider"></div>
      <a href="user-dashboard.html" class="acct-drop-link">
        <i class="fa-solid fa-graduation-cap"></i>
        User Dashboard
      </a>
      <a href="admin-dashboard.html" class="acct-drop-link">
        <i class="fa-solid fa-shield-halved"></i>
        Admin Dashboard
      </a>
    \`;

    const openDropdown = () => {
      accountDropdownMenu.classList.add('open');
      accountTriggerBtn.classList.add('open');
      accountTriggerBtn.setAttribute('aria-expanded', 'true');
    };

    const closeDropdown = () => {
      accountDropdownMenu.classList.remove('open');
      accountTriggerBtn.classList.remove('open');
      accountTriggerBtn.setAttribute('aria-expanded', 'false');
    };

    accountTriggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      accountDropdownMenu.classList.contains('open') ? closeDropdown() : openDropdown();
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (
        accountDropdownMenu.classList.contains('open') &&
        !accountDropdownMenu.contains(e.target) &&
        !accountTriggerBtn.contains(e.target)
      ) {
        closeDropdown();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDropdown();
    });
  }

});`;

// Replace from startMarker to end of file
const newContent = content.slice(0, startIdx) + newSection + '\n';
fs.writeFileSync(filePath, newContent);
console.log('Section 12 replaced successfully!');
