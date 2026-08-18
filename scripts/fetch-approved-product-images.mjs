import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('assets/approved');
await fs.mkdir(outDir, { recursive: true });

// Fuentes exactas que usaba la home validada el 10/08/2026.
// Solo se admiten fabricante/DAM para los productos bloqueados.
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
  'philips-5500-v3.webp': [
    {url:'https://www.cf-dam.vbs.versuni.com/adaptivemedia/rendition?format=webp&height=1200&id=1b7fcdc9342844c53c459e83b581f786dec466bf&width=1200', min:50000},
    {url:'https://images.philips.com/is/image/philipsconsumer/vrs_985a5521_0beb_4817_914c3fe3bfafc0f8?$png$=&fit=constrain&hei=1200&wid=1200', min:50000}
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
console.log('✓ Fotos aprobadas del 10/08 recuperadas desde fabricante y versionadas v3.');
