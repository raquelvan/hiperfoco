import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('assets/approved');
await fs.mkdir(outDir, { recursive: true });

// Fuentes exactas de fabricante. Las cuatro cafeteras principales recuperan
// las imágenes usadas en la home validada el 10/08/2026.
const products = {
  'magnifica-evo-v3.jpg': [
    {url:'https://dam.delonghi.com/902x902/assets/225625', min:8000}
  ],
  'philips-3300-v3.jpg': [
    {url:'https://us.home-appliances.philips/cdn/shop/files/3300_2_3000x3000_006594e4-c53f-426d-b9d6-04c3bf61a317_1946x.jpg?v=1765219594', min:60000}
  ],
  'rivelia-v3.jpg': [
    {url:'https://dam.delonghi.com/902x902/assets/269456', min:8000}
  ],
  'magnifica-s-v3.jpg': [
    {url:'https://dam.delonghi.com/902x902/assets/223655', min:8000}
  ],
  'philips-5500-v4.png': [
    {url:'https://images.philips.com/is/image/philipsconsumer/vrs_985a5521_0beb_4817_914c3fe3bfafc0f8?%24png%24=&fit=constrain&hei=1000&wid=1000', min:30000},
    {url:'https://images.philips.com/is/image/philipsconsumer/vrs_985a5521_0beb_4817_914c3fe3bfafc0f8?%24png%24=&fit=constrain&hei=410&wid=410', min:12000}
  ],
  'jbl-flip6-v1.png': [
    {url:'https://global.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw4e91d6eb/1_JBL_FLIP6_HERO_BLACK_29391_x2.png?sh=1000&sw=1000', min:20000}
  ]
};

async function fetchOne(file, candidates) {
  let last = '';
  for (const {url,min} of candidates) {
    try {
      const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 HiperfocoBuild/1.0', accept: 'image/avif,image/webp,image/png,image/jpeg,*/*' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const type = (res.headers.get('content-type') || '').toLowerCase();
      if (!type.startsWith('image/')) throw new Error(`tipo ${type || 'desconocido'}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < min) throw new Error(`archivo demasiado pequeño: ${buf.length} bytes (<${min})`);
      await fs.writeFile(path.join(outDir, file), buf);
      console.log(`✓ ${file}: ${Math.round(buf.length/1024)} KB ← ${url}`);
      return;
    } catch (err) {
      last = `${url}: ${err.message}`;
      console.warn(`× ${last}`);
    }
  }
  throw new Error(`No se pudo obtener ${file}. Último error: ${last}`);
}

for (const [file, candidates] of Object.entries(products)) await fetchOne(file, candidates);
console.log('✓ Fotos de producto críticas descargadas desde fabricante y servidas localmente.');
