import fs from 'node:fs';
import path from 'node:path';
const ROOT=process.cwd();
const skipPrefixes=['categorias/','necesidades/','legal/','templates/'];
const skipFiles=new Set(['404.html','gracias-contacto.html']);
const out=[];
const strip=s=>String(s||'').replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
const meta=(html,name)=>html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=(["'])([\\s\\S]*?)\\1[^>]*>`,'i'))?.[2]||html.match(new RegExp(`<meta[^>]+content=(["'])([\\s\\S]*?)\\1[^>]+name=["']${name}["'][^>]*>`,'i'))?.[2]||'';
const canonical=html=>html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]||html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1]||'';
const noindex=html=>/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
function typeFor(rel){if(rel.startsWith('reviews/'))return'Review';if(rel.startsWith('guias/'))return'Guía';if(rel.startsWith('comparativas/'))return'Comparativa';if(rel.startsWith('regalos/'))return'Regalos';if(rel.startsWith('selecciones/'))return'Selección';if(rel.startsWith('categoria/'))return'Categoría';return'Página';}
function walk(dir){for(const ent of fs.readdirSync(dir,{withFileTypes:true})){if(['.git','node_modules','.netlify'].includes(ent.name))continue;const full=path.join(dir,ent.name);if(ent.isDirectory())walk(full);else if(ent.isFile()&&ent.name.endsWith('.html'))add(full);}}
function add(file){const rel=path.relative(ROOT,file).replaceAll('\\','/');if(skipFiles.has(rel)||skipPrefixes.some(p=>rel.startsWith(p)))return;const html=fs.readFileSync(file,'utf8');if(noindex(html))return;const can=canonical(html);if(can&&!can.startsWith('https://hiperfoco.eu'))return;const title=strip(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]).replace(/\s*[|—-]\s*Hiperfoco\s*$/i,'').trim();if(!title)return;const desc=strip(meta(html,'description'));const h1=strip(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]);let url=can?new URL(can).pathname:'/'+rel.replace(/index\.html$/,'').replace(/\.html$/i,'.html');if(url==='/index.html')url='/';const body=strip(html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]||'').slice(0,900);out.push({title:typeFor(rel)==='Página'&&h1?h1:title,type:typeFor(rel),url,text:[desc,h1,body].filter(Boolean).join(' ').slice(0,1200)});}
walk(ROOT);
const dedup=[...new Map(out.map(x=>[x.url,x])).values()].sort((a,b)=>a.title.localeCompare(b.title,'es'));
fs.writeFileSync(path.join(ROOT,'assets/search.json'),JSON.stringify(dedup,null,0)+'\n');
console.log(`Search index: ${dedup.length} páginas indexables.`);
