import fs from 'node:fs';
import path from 'node:path';
const ROOT=process.cwd(),BASE='https://hiperfoco.eu';
const urls=[];
const skip=new Set(['404.html','gracias-contacto.html','selecciones/menos-de-300.html','selecciones/cocinas-pequenas.html','selecciones/faciles-de-limpiar.html']);
const skipPrefixes=['categorias/','necesidades/','legal/'];
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')}
function lastmodFrom(html){const json=html.match(/"dateModified"\s*:\s*"(\d{4}-\d{2}-\d{2})/i);if(json)return json[1];const meta=html.match(/<meta[^>]+property=["']article:modified_time["'][^>]+content=["'](\d{4}-\d{2}-\d{2})/i)||html.match(/<meta[^>]+content=["'](\d{4}-\d{2}-\d{2})[^"']*["'][^>]+property=["']article:modified_time["']/i);return meta?.[1]||''}
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(['.git','node_modules','.netlify'].includes(e.name))continue;const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else if(e.isFile()&&e.name.endsWith('.html'))add(f)}}
function add(file){const rel=path.relative(ROOT,file).replaceAll('\\','/');if(skip.has(rel)||skipPrefixes.some(p=>rel.startsWith(p)))return;const html=fs.readFileSync(file,'utf8');if(/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html))return;const m=html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)||html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);let u=m?.[1];if(!u){if(rel==='index.html')u=BASE+'/';else if(rel.endsWith('/index.html'))u=BASE+'/'+rel.slice(0,-10);else u=BASE+'/'+rel}if(!u.startsWith(BASE))return;if(urls.some(x=>x.loc===u))return;urls.push({loc:u,lastmod:lastmodFrom(html)})}
walk(ROOT);urls.sort((a,b)=>a.loc.localeCompare(b.loc,'es'));
const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(x=>'  <url><loc>'+esc(x.loc)+'</loc>'+(x.lastmod?'<lastmod>'+x.lastmod+'</lastmod>':'')+'</url>').join('\n')+'\n</urlset>\n';
fs.writeFileSync(path.join(ROOT,'sitemap.xml'),xml,'utf8');
console.log(`Sitemap generado: ${urls.length} URLs canónicas indexables.`);
