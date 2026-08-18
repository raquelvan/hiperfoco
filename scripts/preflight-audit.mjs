import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const BASE='https://hiperfoco.eu';
const errors=[];
const warnings=[];
const pages=[];
const canonicals=new Map();
const legacyPrefixes=['categorias/','necesidades/','legal/'];
const placeholderRx=/contenido en preparaci[oó]n|pr[oó]ximamente|lorem ipsum|foto exacta pendiente|selecci[oó]n creada para esta necesidad/i;

const normRel=p=>path.relative(ROOT,p).replaceAll('\\','/');
const strip=s=>String(s||'').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const attr=(tag,name)=>{const m=tag.match(new RegExp(`${name}=["']([^"']*)["']`,'i'));return m?.[1]||''};
const isNoindex=html=>/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);

function walk(dir){
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
    if(['.git','node_modules','.netlify'].includes(ent.name))continue;
    const full=path.join(dir,ent.name);
    if(ent.isDirectory())walk(full);
    else if(ent.isFile()&&ent.name.endsWith('.html'))auditHtml(full);
  }
}

function resolveLocal(baseRel,url){
  if(!url||url.startsWith('#')||/^(https?:|mailto:|tel:|javascript:|data:)/i.test(url))return null;
  const clean=url.split('#')[0].split('?')[0];
  if(!clean)return null;
  let target=clean.startsWith('/')?clean.slice(1):path.posix.normalize(path.posix.join(path.posix.dirname(baseRel),clean));
  if(target.endsWith('/'))target+='index.html';
  if(!path.posix.extname(target)){
    if(fs.existsSync(path.join(ROOT,target+'.html')))target+='.html';
    else if(fs.existsSync(path.join(ROOT,target,'index.html')))target=path.posix.join(target,'index.html');
  }
  return target;
}

function auditHtml(file){
  const rel=normRel(file);
  const html=fs.readFileSync(file,'utf8');
  const noindex=isNoindex(html);
  const legacy=legacyPrefixes.some(p=>rel.startsWith(p));
  const title=strip(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]);
  const desc=html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1]||html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1]||'';
  const canonical=html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]||html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1]||'';
  const h1s=[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>strip(m[1]));
  pages.push({rel,noindex,canonical,title,h1:h1s[0]||''});

  if(!noindex&&!legacy){
    if(!title)errors.push(`${rel}: falta <title>`);
    else if(title.length>75)warnings.push(`${rel}: title largo (${title.length})`);
    if(!desc)errors.push(`${rel}: falta meta description`);
    else if(strip(desc).length<45||strip(desc).length>180)warnings.push(`${rel}: description fuera de rango (${strip(desc).length})`);
    if(!canonical)errors.push(`${rel}: falta canonical`);
    else if(!canonical.startsWith(BASE))errors.push(`${rel}: canonical fuera de dominio (${canonical})`);
    if(h1s.length!==1)errors.push(`${rel}: debe tener 1 H1 y tiene ${h1s.length}`);
    if(placeholderRx.test(strip(html)))errors.push(`${rel}: contiene texto placeholder/preparación`);
    if(canonical){
      const prev=canonicals.get(canonical);
      if(prev&&prev!==rel)errors.push(`canonical duplicado: ${canonical} en ${prev} y ${rel}`);
      else canonicals.set(canonical,rel);
    }
  }

  for(const m of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){
    try{JSON.parse(m[1])}catch(e){errors.push(`${rel}: JSON-LD inválido (${e.message})`)}
  }

  for(const m of html.matchAll(/<img\b[^>]*>/gi)){
    const tag=m[0],src=attr(tag,'src'),alt=attr(tag,'alt');
    if(!alt.trim())warnings.push(`${rel}: imagen sin alt (${src||'sin src'})`);
    const local=resolveLocal(rel,src);
    if(local){
      const abs=path.join(ROOT,local);
      if(!fs.existsSync(abs))errors.push(`${rel}: imagen local inexistente ${src}`);
      else{
        const size=fs.statSync(abs).size;
        const context=html.slice(Math.max(0,m.index-180),Math.min(html.length,m.index+tag.length+180));
        const large=/product-media|page-product-media|guide-image|hero-product|hf-guide-pick-media|gift4-media|reviewCard|hub-media/i.test(context);
        if(large&&size<25000)errors.push(`${rel}: imagen demasiado pequeña para tarjeta grande (${src}, ${Math.round(size/1024)} KB)`);
      }
    }
  }

  for(const m of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)){
    const href=m[1],tag=m[0];
    const local=resolveLocal(rel,href);
    if(local&&!fs.existsSync(path.join(ROOT,local)))warnings.push(`${rel}: enlace interno no resuelto ${href}`);
    if(/amazon\.|link\.amazon|tradedoubler|clk\.tradedoubler/i.test(href)){
      const relAttr=attr(tag,'rel');
      if(!/sponsored/i.test(relAttr))errors.push(`${rel}: afiliado sin rel=sponsored (${href})`);
      if(/target=["']_blank["']/i.test(tag)&&!/noopener/i.test(relAttr))errors.push(`${rel}: target=_blank afiliado sin noopener (${href})`);
    }
  }
}

walk(ROOT);

const robots=fs.existsSync('robots.txt')?fs.readFileSync('robots.txt','utf8'):'';
if(!/Sitemap:\s*https:\/\/hiperfoco\.eu\/sitemap\.xml/i.test(robots))errors.push('robots.txt: falta referencia exacta al sitemap');

if(!fs.existsSync('sitemap.xml'))errors.push('sitemap.xml no existe después del build');
else{
  const xml=fs.readFileSync('sitemap.xml','utf8');
  if(!/^<\?xml version="1\.0" encoding="UTF-8"\?>/i.test(xml.trim()))errors.push('sitemap.xml: cabecera XML UTF-8 incorrecta');
  if(!/<urlset\s+xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/i.test(xml))errors.push('sitemap.xml: namespace/urlset incorrecto');
  const locs=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
  const dup=locs.filter((u,i,a)=>a.indexOf(u)!==i);
  if(dup.length)errors.push(`sitemap.xml: URLs duplicadas ${[...new Set(dup)].join(', ')}`);
  for(const u of locs){
    if(!u.startsWith(BASE))errors.push(`sitemap.xml: URL no absoluta/correcta ${u}`);
    if(/\/categorias\/|\/necesidades\/|\/legal\//.test(u))errors.push(`sitemap.xml: incluye URL legacy ${u}`);
  }
}

const report={generatedAt:new Date().toISOString(),pages:pages.length,errors,warnings};
fs.writeFileSync('preflight-report.json',JSON.stringify(report,null,2)+'\n');
console.log(`Preflight: ${pages.length} HTML · ${errors.length} errores · ${warnings.length} avisos.`);
if(errors.length){console.error(errors.map(e=>'ERROR '+e).join('\n'));process.exit(1)}
if(warnings.length)console.warn(warnings.map(w=>'WARN '+w).join('\n'));
