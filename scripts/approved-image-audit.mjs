import fs from 'node:fs/promises';

const checks=[
  ['De’Longhi Magnifica Evo','/assets/approved/magnifica-evo-v3.jpg',8000],
  ['Philips Serie 3300 LatteGo','/assets/approved/philips-3300-v3.jpg',60000],
  ['De’Longhi Rivelia','/assets/approved/rivelia-v3.jpg',8000],
  ['De’Longhi Magnifica S','/assets/approved/magnifica-s-v3.jpg',8000],
  ['Philips Serie 5500 LatteGo','/assets/approved/philips-5500-v3.webp',50000]
];
const forbidden=[
  '/assets/approved/magnifica-evo.jpg','/assets/approved/philips-3300.jpg','/assets/approved/rivelia.jpg','/assets/approved/magnifica-s.jpg',
  '/assets/approved/magnifica-evo-v2.jpg','/assets/approved/philips-3300-v2.jpg','/assets/approved/rivelia-v2.jpg','/assets/approved/magnifica-s-v2.jpg','/assets/approved/philips-5500-v2.webp',
  '/assets/images/product-magnifica-evo.webp','/assets/images/product-philips-3300.webp','/assets/images/product-rivelia.webp','/assets/images/product-magnifica-s.webp'
];
const pages=['index.html','reviews/index.html','categoria/cafe.html'];
let errors=[];
for(const page of pages){
  const html=await fs.readFile(page,'utf8');
  const normalized=html.toLowerCase().replaceAll('’',"'");
  for(const [name,src] of checks){
    const n=name.toLowerCase().replaceAll('’',"'");
    if(normalized.includes(n) && !html.includes(src)) errors.push(`${page}: ${name} no usa ${src}`);
  }
  for(const old of forbidden) if(html.includes(old)) errors.push(`${page}: sigue referenciando asset antiguo ${old}`);
}
for(const [,src,min] of checks){
  const file=src.replace(/^\//,'');
  try{const st=await fs.stat(file);if(st.size<min)errors.push(`${file}: ${st.size} bytes, por debajo de ${min}`);}catch{errors.push(`${file}: falta el asset v3`)}
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('✓ Home, Reseñas y Café usan exclusivamente las fotos aprobadas del 10/08 (v3).');
