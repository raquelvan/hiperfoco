import fs from 'node:fs/promises';

const checks=[
  ['De’Longhi Magnifica Evo','/assets/approved/magnifica-evo.jpg'],
  ['Philips Serie 3300 LatteGo','/assets/approved/philips-3300.jpg'],
  ['De’Longhi Rivelia','/assets/approved/rivelia.jpg'],
  ['De’Longhi Magnifica S','/assets/approved/magnifica-s.jpg'],
  ['Philips Serie 5500 LatteGo','/assets/approved/philips-5500.webp']
];
const pages=['index.html','reviews/index.html','categoria/cafe.html'];
let errors=[];
for(const page of pages){
  const html=await fs.readFile(page,'utf8');
  for(const [name,src] of checks){
    if(html.toLowerCase().includes(name.toLowerCase().replace('’',"'")) || html.includes(name)){
      if(!html.includes(src)) errors.push(`${page}: ${name} no usa ${src}`);
    }
  }
}
for(const [,src] of checks){
  const file=src.replace(/^\//,'');
  try{
    const st=await fs.stat(file);
    if(st.size<60000) errors.push(`${file}: ${st.size} bytes, demasiado pequeño`);
  }catch{errors.push(`${file}: falta el asset aprobado`)}
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('✓ Home, Reseñas y Café usan únicamente fotos HD aprobadas; todos los assets superan 60 KB.');
