const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const accountWidgetHTML = `
        <!-- User Account Widget -->
        <div class="user-account-widget" id="headerUserWidget" style="position: relative; margin-left: 10px;">
          <button class="btn-circle account-trigger" id="accountTriggerBtn" aria-label="User Account" style="background: transparent; border: 1px solid var(--border-color); color: var(--text-primary); transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; cursor: pointer;">
            <i class="fa-regular fa-user"></i>
          </button>
          
          <div class="account-dropdown-menu" id="accountDropdownMenu" style="position: absolute; top: 130%; right: 0; width: 240px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); padding: 15px; opacity: 0; visibility: hidden; transform: translateY(15px); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); z-index: 999; display: flex; flex-direction: column; gap: 8px;">
            <!-- Content Injected via JS -->
          </div>
        </div>`;

files.forEach(file => {
  if (file === 'user-dashboard.html' || file === 'auth.html') return; 

  let content = fs.readFileSync(path.join(dir, file), 'utf8');

  // Remove old Enroll button
  const enrollRegex = /<!-- Highlighted Enroll Now -->[\s\S]*?<a[^>]*id="navbarEnrollBtn"[^>]*>[\s\S]*?<\/a>/;
  content = content.replace(enrollRegex, '');

  // Also catch generic Enroll Now button just in case spacing was different
  const enrollRegex2 = /<a href="contact.html" class="btn btn-primary" id="navbarEnrollBtn">[\s\S]*?<\/a>/;
  content = content.replace(enrollRegex2, '');

  // Inject Account Widget right after Theme Toggle block
  const themeToggleRegex = /(<div class="theme-toggle"[^>]*>[\s\S]*?<i class="fa-solid fa-moon"><\/i>\s*<\/div>)/;
  
  if (!content.includes('id="headerUserWidget"')) {
    content = content.replace(themeToggleRegex, '$1' + accountWidgetHTML);
  }

  fs.writeFileSync(path.join(dir, file), content);
});

console.log('User Account Widget Injected Successfully!');
