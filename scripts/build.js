#!/usr/bin/env node
/**
 * node scripts/build.js
 * Reads public/image-map.json and rewrites index.html
 * replacing every WordPress URL with the local /images/filename path.
 * Output: public/index.html  (ready for Vercel)
 */

const fs   = require('fs');
const path = require('path');

const ROOT    = path.join(__dirname, '..');
const MAP     = JSON.parse(fs.readFileSync(path.join(ROOT, 'public', 'image-map.json'), 'utf8'));
const SRC     = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

let out = SRC;
for (const [wpUrl, localPath] of Object.entries(MAP)) {
  // escape special regex chars in the URL
  const escaped = wpUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  out = out.replace(new RegExp(escaped, 'g'), localPath);
}

fs.writeFileSync(path.join(ROOT, 'public', 'index.html'), out);
console.log('Built public/index.html with', Object.keys(MAP).length, 'local image paths.');
