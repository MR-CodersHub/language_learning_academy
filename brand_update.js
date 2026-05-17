const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname);
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldHeaderLogo = `        <div class="logo-icon">
          <i class="fa-solid fa-graduation-cap"></i>
        </div>
        <div class="logo-text">Aura<span>Lingo</span></div>`;

const newHeaderLogo = `        <div class="logo-icon" style="background: linear-gradient(135deg, #7C3AED, #3B82F6); border-radius: 10px; transform: rotate(-5deg); box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);">
          <i class="fa-solid fa-language" style="transform: rotate(5deg); font-size: 20px; color: white;"></i>
        </div>
        <div class="logo-text" style="font-weight: 800; letter-spacing: -0.5px;">Fluen<span style="color: #3B82F6;">tra</span></div>`;

const oldFooterLogo = `            <div class="logo-icon">
              <i class="fa-solid fa-graduation-cap"></i>
            </div>
            <div class="logo-text" style="color: white;">Aura<span>Lingo</span></div>`;

const newFooterLogo = `            <div class="logo-icon" style="background: linear-gradient(135deg, #7C3AED, #3B82F6); border-radius: 10px; transform: rotate(-5deg); box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);">
              <i class="fa-solid fa-language" style="transform: rotate(5deg); color: white; font-size: 20px;"></i>
            </div>
            <div class="logo-text" style="color: white; font-weight: 800; letter-spacing: -0.5px;">Fluen<span style="color: #3B82F6;">tra</span></div>`;

const oldDashLogo = `        <div class="dash-logo-icon">
          <i class="fa-solid fa-graduation-cap"></i>
        </div>
        <span class="dash-logo-text">AuraLingo</span>`;

const newDashLogo = `        <div class="dash-logo-icon" style="background: linear-gradient(135deg, #7C3AED, #3B82F6); border-radius: 10px; transform: rotate(-5deg); box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);">
          <i class="fa-solid fa-language" style="transform: rotate(5deg); font-size: 20px; color: white;"></i>
        </div>
        <span class="dash-logo-text" style="font-weight: 800; letter-spacing: -0.5px; background: linear-gradient(135deg, #7C3AED, #3B82F6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Fluentra</span>`;

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // 1. Inject Favicon
  if (!content.includes('favicon.svg')) {
    content = content.replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n  <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">');
  }

  // 2. Replace Logos Structurally
  content = content.replace(oldHeaderLogo, newHeaderLogo);
  content = content.replace(oldFooterLogo, newFooterLogo);
  content = content.replace(oldDashLogo, newDashLogo);

  // 3. Replace all remaining brand text globally (case-sensitive to match AuraLingo)
  content = content.replace(/AuraLingo/g, 'Fluentra');
  content = content.replace(/auralingo_/g, 'fluentra_');
  content = content.replace(/auralingo\.com/g, 'fluentra.com');
  
  fs.writeFileSync(path.join(dir, file), content);
});

console.log('Successfully rebranded all files to Fluentra!');
