/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public', 'images');
const files = fs.readdirSync(publicDir);

const photoAlbums = [
  { num: 1, name: 'Basilur Autumn Tea', company: 'Basilur', slug: 'basilur-autumn-tea', count: 2 },
  { num: 2, name: 'Basilur Corporate Gift Shoot', company: 'Basilur', slug: 'basilur-corporate-gift', count: 4 },
  { num: 3, name: 'Basilur Christmas Shoot', company: 'Basilur', slug: 'basilur-christmas', count: 2 },
  { num: 4, name: 'Basilur Island of Tea Shoot', company: 'Basilur', slug: 'basilur-island-of-tea', count: 2 },
  { num: 5, name: 'Basilur Spring Shoot', company: 'Basilur', slug: 'basilur-spring', count: 4 },
  { num: 6, name: 'Martex Corporate Shoot', company: 'Martex', slug: 'martex-corporate', count: 7 },
  { num: 7, name: 'Tripson Product Shoot', company: 'Tripson', slug: 'tripson-product', count: 2 },
  { num: 8, name: 'Winter Christmas Shoot', company: 'Winter', slug: 'winter-christmas', count: 8 },
  { num: 9, name: 'Winter Classic Shoot', company: 'Winter', slug: 'winter-classic', count: 10 },
  { num: 10, name: 'Winter Studio Shoots', company: 'Winter', slug: 'winter-studio', count: 5 },
];

function makeSlug(name){
  return name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}

const expected = [];
photoAlbums.forEach(a => {
  const name = a.name;
  const slug = a.slug ? makeSlug(a.slug) : makeSlug(name);
  for(let i=1;i<=a.count;i++){
    const fname = `album${String(a.num).padStart(2,'0')}-${slug}-${String(i).padStart(2,'0')}.jpg`;
    expected.push({album:a.num, name: fname});
  }
});

const present = new Set(files.map(f=>f));

const missing = expected.filter(e => !present.has(e.name));
const extra = files.filter(f => !expected.find(e=>e.name===f) && f !== 'about.jpg' && f !== 'logo.png' && !f.startsWith('portfoliopic'));

console.log('Files in public/images:', files.length);
console.log('Expected files count:', expected.length);
console.log('\nMissing expected files (first 50):');
missing.slice(0,200).forEach(m => console.log(' -', m.name));

console.log('\nExtra files in folder (not in expected list):');
extra.forEach(x => console.log(' -', x));

console.log('\nSummary:', { missingCount: missing.length, extraCount: extra.length });
