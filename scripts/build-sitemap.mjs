import fs from 'node:fs';
import path from 'node:path';
const ROOT=process.cwd(),BASE='https://hiperfoco.eu';
const urls=[];
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')}
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(['.git','node_modules','.netlify'].includes(e.name))continue;const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else if(e.isFile()&&e.name.endsWith('.html'))add(f)}}
function add(file){const rel=path.relative(ROOT,file).replaceAll('\\','/');if(rel==='404.html'||rel==='gracias-contacto.html')return;const html=fs.readFileSync(file,'utf8');if(/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html))return;const m=html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)||html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);let u=m?.[1];if(!u){if(rel==='index.html')u=BASE+'/';else if(rel.endsWith('/index.html'))u=BASE+'/'+rel.slice(0,-10);else u=BASE+'/'+rel}if(u.startsWith(BASE)&&!urls.includes(u))urls.push(u)}
walk(ROOT);urls.sort((a,b)=>a.localeCompare(b,'es'));
const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(u=>'  <url><loc>'+esc(u)+'</loc></url>').join('\n')+'\n</urlset>\n';
fs.writeFileSync(path.join(ROOT,'sitemap.xml'),xml,'utf8');
console.log(`Sitemap generado: ${urls.length} URLs indexables.`);