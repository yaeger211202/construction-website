import fs from 'node:fs';
import path from 'node:path';

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

const files = [
  { name: 'hero.jpg', color: '#0f172a', text: 'Ocean Infra' },
  { name: 'p1.jpg', color: '#334155', text: 'Project 1' },
  { name: 'p2.jpg', color: '#475569', text: 'Project 2' },
  { name: 'p3.jpg', color: '#64748b', text: 'Project 3' },
];

const svg = (color, text) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900">
  <rect width="100%" height="100%" fill="${color}"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="72" fill="#ffffff" font-family="Arial, Helvetica, sans-serif">${text}</text>
  <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-size="28" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" opacity="0.8">Placeholder</text>
  <rect x="0" y="0" width="1600" height="900" fill="none" stroke="#ffffff" opacity="0.3"/>
</svg>`;

for (const f of files) {
  const svgPath = path.join(publicDir, f.name.replace('.jpg', '.svg'));
  const jpgPath = path.join(publicDir, f.name);
  if (!fs.existsSync(jpgPath)) {
    fs.writeFileSync(svgPath, svg(f.color, f.text));
    // Keep as SVG but save with .jpg name for Next/Image convenience in dev
    fs.copyFileSync(svgPath, jpgPath);
  }
}

// Create robots.txt and favicon for completeness
const robots = `User-agent: *\nAllow: /\nSitemap: https://example.com/sitemap.xml\n`;
if (!fs.existsSync(path.join(publicDir, 'robots.txt'))) {
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
}

