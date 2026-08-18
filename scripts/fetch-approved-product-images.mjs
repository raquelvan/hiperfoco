import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('assets/approved');
await fs.mkdir(outDir, { recursive: true });

const products = {
  'magnifica-evo.jpg': [
    {url:'https://dam.delonghi.com/1200x1200/assets/225625', min:8000},
    {url:'https://thk-cdn.fra1.cdn.digitaloceanspaces.com/products/kavovarki-ta-kavomasini/kavomasina-avtomaticna-delonghi-magnifica-evo-ecam-29061sb-europe/delonghimagnificaevoecam29061sbeurope.jpg', min:60000}
  ],
  'philips-3300.jpg': [
    {url:'https://us.home-appliances.philips/cdn/shop/files/3300_2_3000x3000_006594e4-c53f-426d-b9d6-04c3bf61a317_1946x.jpg?v=1765219594', min:60000},
    {url:'https://ferbod.com/cdn/shop/files/cdc120be-Philips-Series-3300-Fully-automatic-espresso-machine-EP334790-2.webp?v=1771354052&width=1445', min:60000}
  ],
  'rivelia.jpg': [
    {url:'https://dam.delonghi.com/1200x1200/assets/268661', min:8000},
    {url:'https://cdn.vexio.ro/images/products/img_202405240840/2693344/full/espressor-delonghi-delonghi-rivelia-exam-440-35-b-5691943.png', min:50000},
    {url:'https://www.euronics.it/dw/image/v2/BFPN_PRD/on/demandware.static/-/Sites-catalog_euronics_master/default/dw6cf71bcf/hi-res/232007905_4.jpg?q=100&strip=false&sw=1600', min:50000}
  ],
  'magnifica-s.jpg': [
    {url:'https://dam.delonghi.com/1200x1200/assets/253055', min:8000},
    {url:'https://dam.delonghi.com/902x902/assets/253055', min:8000}
  ],
  'philips-5500.webp': [
    {url:'https://www.cf-dam.vbs.versuni.com/adaptivemedia/rendition?format=webp&height=2048&id=1b7fcdc9342844c53c459e83b581f786dec466bf&width=2048', min:50000},
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
console.log('✓ Todas las fotos corresponden al modelo exacto y proceden de fuentes HD/1200px aprobadas.');
