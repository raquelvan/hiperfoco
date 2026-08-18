import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('assets/approved');
await fs.mkdir(outDir, { recursive: true });

// Fuentes visualmente verificadas: producto exacto, fondo limpio y sin rótulos promocionales incrustados.
const products = {
  'magnifica-evo.jpg': [
    {url:'https://cdn.dsmcdn.com/ty1000032/product/media/images/prod/PIM/20251112/10/94a7567c-60e9-46ef-876f-466d3bc61c5c/1_org_zoom.jpg', min:50000},
    {url:'https://www.dateks.lv/images/pic/1200/1200/630/1540.jpg', min:30000}
  ],
  'philips-3300.jpg': [
    {url:'https://im9.cz/iR/importprodukt-orig/629/62996393fbb80b6491e00b8b2f35b329.jpg', min:50000},
    {url:'https://us.home-appliances.philips/cdn/shop/files/3300_2_3000x3000_006594e4-c53f-426d-b9d6-04c3bf61a317_1946x.jpg?v=1765219594', min:60000}
  ],
  'rivelia.jpg': [
    {url:'https://cervera.cdn-norce.tech/55b7c5c3-b699-45e6-af23-e2570fe5faef.jpeg?format=webp&height=2048&mode=Pad&quality=75&width=2048', min:50000},
    {url:'https://cdn.vexio.ro/images/products/img_202405240840/2693344/full/espressor-delonghi-delonghi-rivelia-exam-440-35-b-5691943.png', min:50000}
  ],
  'magnifica-s.jpg': [
    {url:'https://media1.test-aankoop.be/images/EA80D6A0026C2C274BC021D55F70B0A8C71929FF/c4/Espressomachines-DELONGHI-ECAM21112B-MAGNIFICA-S-zoom.jpg', min:50000},
    {url:'https://imtc.qccdn.fr/test/cafetiere-a-expresso-avec-broyeur-a-grains/zoom/delonghi-ecam-21-112-s-magnifica-s_001.jpg', min:30000}
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
console.log('✓ Fotos limpias de los modelos exactos descargadas; sin thumbnails ni rótulos editoriales incrustados.');
