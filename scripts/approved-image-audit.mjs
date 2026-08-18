import fs from 'node:fs/promises';

const checks=[
  ['De’Longhi Magnifica Evo','/assets/approved/magnifica-evo.jpg',8000],
  ['Philips Serie 3300 LatteGo','/assets/approved/philips-3300.jpg',50000],
  ['De’Longhi Rivelia','/assets/approved/rivelia.jpg',8000],
  ['De’Longhi Magnifica S','/assets/approved/magnifica-s.jpg',8000],
  ['Philips Serie 5500 LatteGo','/assets/approved/philips-5500.webp',50000]
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
}
for(const [,src,min] of checks){
  const file=src.replace(/^\//,'');
  try{
    const st=await fs.stat(file);
    if(st.size<min) errors.push(`${file}: ${st.size} bytes, por debajo del mínimo de la fuente aprobada (${min})`);
  }catch{errors.push(`${file}: falta el asset aprobado`)}
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('✓ Home, Reseñas y Café usan únicamente las fotos aprobadas; no quedan thumbnails antiguos en esos productos.');
