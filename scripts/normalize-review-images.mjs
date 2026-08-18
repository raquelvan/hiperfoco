import fs from 'node:fs';
import path from 'node:path';

const dir=path.resolve('reviews');
const byName=[
  [/magnifica evo/i,'/assets/approved/magnifica-evo-v3.jpg'],
  [/philips.*3300.*lattego/i,'/assets/approved/philips-3300-v3.jpg'],
  [/rivelia/i,'/assets/approved/rivelia-v3.jpg'],
  [/magnifica s/i,'/assets/approved/magnifica-s-v3.jpg'],
  [/philips.*5500.*lattego/i,'/assets/approved/philips-5500-v4.png'],
  [/ninja.*af400|ninja foodi max/i,'/assets/approved/ninja-af400-v1.png'],
  [/jbl clip 5/i,'/assets/approved/jbl-clip5-v1.jpg'],
  [/jbl flip 6/i,'/assets/approved/jbl-flip6-v1.png'],
  [/sony.*wh.?ch720n/i,'/assets/approved/sony-ch720n-v1.jpg']
];
const imageFor=name=>byName.find(([rx])=>rx.test(String(name||'')))?.[1]||'';
let changed=0;
for(const name of fs.readdirSync(dir)){
  if(!name.endsWith('.html')||name==='index.html')continue;
  const file=path.join(dir,name);
  let html=fs.readFileSync(file,'utf8');
  const m=html.match(/(<script[^>]+id=["']review-data["'][^>]*>)([\s\S]*?)(<\/script>)/i);
  if(!m)continue;
  let data;try{data=JSON.parse(m[2])}catch{continue}
  const approved=imageFor(data.name);
  if(approved)data.image=approved;
  if(Array.isArray(data.comparison))data.comparison=data.comparison.map(row=>{
    if(!Array.isArray(row))return row;
    const src=imageFor(row[0]);
    return src?[row[0],row[1],src,...row.slice(3)]:row;
  });
  const next=m[1]+JSON.stringify(data)+m[3];
  html=html.slice(0,m.index)+next+html.slice(m.index+m[0].length);
  fs.writeFileSync(file,html);changed++;
}
console.log(`✓ JSON de reviews normalizado con imágenes locales aprobadas: ${changed} páginas.`);
