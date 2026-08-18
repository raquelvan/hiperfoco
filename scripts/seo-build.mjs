import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BASE = 'https://hiperfoco.eu';
const SECTION_NAMES = {
  reviews: 'Reseñas', guias: 'Guías', regalos: 'Regalos', categoria: 'Categorías',
  comparativas: 'Comparativas', selecciones: 'Selecciones'
};
const NOINDEX_FILES = new Set(['404.html','gracias-contacto.html','cookies.html','privacidad.html','aviso-legal.html']);
const LEGACY_PREFIXES = ['categorias/','necesidades/','legal/'];
const SEO_OVERRIDES = {
  'como-nos-financiamos.html': {
    description: 'Así se financia Hiperfoco: afiliación, colaboraciones transparentes y apoyo de lectores, sin vender posiciones editoriales.'
  },
  'guias/como-elegir-cafetera-superautomatica.html': {
    title: 'Cómo elegir cafetera superautomática | Hiperfoco'
  },
  'guias/elegir-airfryer.html': {
    title: 'Cómo elegir una airfryer: tamaño y capacidad | Hiperfoco'
  },
  'guias/limpiar-cafetera-superautomatica.html': {
    title: 'Cómo limpiar una cafetera superautomática | Hiperfoco'
  },
  'guias/purificador-aire-alergia-polen-cadr.html': {
    title: 'Purificador para alergia y polen: guía CADR | Hiperfoco'
  },
  'regalos/casa-inteligente.html': {
    title: 'Regalos para casa inteligente: ideas útiles | Hiperfoco'
  },
  'regalos/regalos-menos-de-30-euros.html': {
    title: 'Regalos por menos de 30 €: ideas útiles | Hiperfoco'
  },
  'regalos/regalos-menos-de-50-euros.html': {
    title: 'Regalos por menos de 50 €: ideas que sí sirven | Hiperfoco'
  },
  'regalos/regalos-para-amantes-musica.html': {
    title: 'Regalos para amantes de la música | Hiperfoco'
  },
  'regalos/regalos-para-frikis.html': {
    title: 'Regalos para frikis: tecnología, gaming y más | Hiperfoco'
  },
  'regalos/regalos-para-novia.html': {
    title: 'Regalos para novia: ideas útiles y originales | Hiperfoco'
  },
  'regalos/regalos-para-novio.html': {
    title: 'Regalos para novio: ideas útiles y originales | Hiperfoco'
  },
  'regalos/viajeros.html': {
    title: 'Regalos para viajeros: ideas prácticas | Hiperfoco'
  },
  'selecciones/cocina-pequena.html': {
    description: 'Cafeteras y productos elegidos para cocinas pequeñas: menos fondo, menos espacio ocupado y uso cómodo sin renunciar a lo importante.'
  },
  'selecciones/dos-personas.html': {
    description: 'Selección de cafeteras para dos personas según bebidas, limpieza, tamaño, presupuesto y facilidad para cambiar ajustes y perfiles.'
  },
  'selecciones/limpiar-poco.html': {
    description: 'Cafeteras para quien quiere limpiar poco: sistemas de leche sencillos, grupos accesibles y rutinas de mantenimiento con menos fricción.'
  },
  'selecciones/mejor-cafe.html': {
    description: 'Cafeteras para priorizar el sabor del café: molienda, temperatura, ajuste de intensidad y alternativas según presupuesto y comodidad.'
  },
  'selecciones/menos-300.html': {
    description: 'Cafeteras por menos de 300 € seleccionadas por facilidad de uso, calidad de café, mantenimiento y relación calidad-precio real.'
  },
  'selecciones/silencioso.html': {
    description: 'Cafeteras para hogares donde importa el ruido: molienda, preparación y uso diario comparados para elegir una opción más discreta.'
  }
};

const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const strip = s => String(s ?? '').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const reEsc = s => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function insertHead(html, tag) { return html.replace(/<\/head>/i, `${tag}</head>`); }
function upsertMeta(html, attr, key, content) {
  const rx = new RegExp(`<meta\\s+[^>]*${attr}=["']${reEsc(key)}["'][^>]*>`, 'i');
  const tag = `<meta ${attr}="${key}" content="${esc(content)}">`;
  return rx.test(html) ? html.replace(rx, tag) : insertHead(html, tag);
}
function upsertCanonical(html, href) {
  const rx = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i;
  const tag = `<link rel="canonical" href="${esc(href)}">`;
  return rx.test(html) ? html.replace(rx, tag) : insertHead(html, tag);
}
function ensureTitle(html, title) {
  const rx = /<title>[\s\S]*?<\/title>/i;
  const tag = `<title>${esc(title)}</title>`;
  return rx.test(html) ? html.replace(rx, tag) : html.replace(/<head([^>]*)>/i, `<head$1>${tag}`);
}
function canonicalFor(rel) {
  let p = rel.replace(/\\/g,'/');
  if (p.startsWith('categorias/')) p = 'categoria/' + p.slice('categorias/'.length);
  if (p.startsWith('necesidades/')) p = 'selecciones/' + p.slice('necesidades/'.length);
  if (p.startsWith('legal/')) p = p.slice('legal/'.length);
  if (p === 'index.html') return `${BASE}/`;
  if (p.endsWith('/index.html')) return `${BASE}/${p.slice(0,-10)}`;
  return `${BASE}/${p}`;
}
function reviewData(html) {
  const m = html.match(/<script[^>]+id=["']review-data["'][^>]*>([\s\S]*?)<\/script>/i);
  if (!m) return null;
  try { return JSON.parse(m[1]); } catch { return null; }
}
function firstText(html, selector) {
  const tag = selector === 'h1' ? 'h1' : 'p';
  const m = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return m ? strip(m[1]) : '';
}
function titleFrom(html, rd, rel) {
  if (SEO_OVERRIDES[rel]?.title) return SEO_OVERRIDES[rel].title;
  const existing = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (existing && strip(existing[1])) return strip(existing[1]);
  if (rd?.name) return `${rd.name}: análisis, opinión y precio | Hiperfoco`;
  const h1 = firstText(html, 'h1');
  if (h1) return `${h1} | Hiperfoco`;
  if (rel === '404.html') return 'Página no encontrada | Hiperfoco';
  return 'Hiperfoco — Reviews, comparativas y guías para comprar mejor';
}
function descriptionFrom(html, rd, rel) {
  if (SEO_OVERRIDES[rel]?.description) return SEO_OVERRIDES[rel].description;
  const patterns = [
    /<meta\s+[^>]*name=["']description["'][^>]*content=(["'])([\s\S]*?)\1[^>]*>/i,
    /<meta\s+[^>]*content=(["'])([\s\S]*?)\1[^>]*name=["']description["'][^>]*>/i
  ];
  for (const rx of patterns) {
    const m = html.match(rx);
    if (m?.[2]) return strip(m[2]);
  }
  if (rd?.intro) return strip(rd.intro).slice(0,160);
  const p = firstText(html, 'p');
  return (p || 'Reviews, comparativas y guías de compra independientes para elegir mejor.').slice(0,160);
}
function imageFrom(html, rd) {
  if (rd?.image) return rd.image;
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (!m) return '';
  try { return new URL(m[1], `${BASE}/`).href; } catch { return ''; }
}
function brandFrom(name='') {
  if (/De[’']?Longhi/i.test(name)) return 'De’Longhi';
  if (/Philips/i.test(name)) return 'Philips';
  if (/Nespresso/i.test(name)) return 'Nespresso';
  if (/Ninja/i.test(name)) return 'Ninja';
  if (/JBL/i.test(name)) return 'JBL';
  if (/Sony/i.test(name)) return 'Sony';
  if (/Anker/i.test(name)) return 'Anker';
  if (/TP-?Link|Tapo/i.test(name)) return 'TP-Link';
  if (/Apple|AirTag/i.test(name)) return 'Apple';
  if (/Fujifilm|Instax/i.test(name)) return 'Fujifilm';
  if (/LEGO/i.test(name)) return 'LEGO';
  if (/Kodak/i.test(name)) return 'Kodak';
  if (/Amazon Echo|Fire TV|Kindle/i.test(name)) return 'Amazon';
  return '';
}
function addJsonLd(html, id, data) {
  if (html.includes(`id="${id}"`) || html.includes(`id='${id}'`)) return html;
  return insertHead(html, `<script id="${id}" type="application/ld+json">${JSON.stringify(data)}</script>`);
}
function breadcrumbData(rel, title, canonical) {
  const p = rel.replace(/\\/g,'/');
  if (!p.includes('/') || p.endsWith('/index.html') || LEGACY_PREFIXES.some(x=>p.startsWith(x))) return null;
  const [section] = p.split('/');
  const label = SECTION_NAMES[section];
  if (!label) return null;
  const pageName = title.replace(/\s*\|\s*Hiperfoco.*$/i,'').trim();
  return {
    '@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[
      {'@type':'ListItem',position:1,name:'Inicio',item:`${BASE}/`},
      {'@type':'ListItem',position:2,name:label,item:`${BASE}/${section}/`},
      {'@type':'ListItem',position:3,name:pageName,item:canonical}
    ]
  };
}
function processHtml(file) {
  const rel = path.relative(ROOT,file).replace(/\\/g,'/');
  let html = fs.readFileSync(file,'utf8');
  if (!/<head[\s>]/i.test(html)) return;

  const rd = reviewData(html);
  const canonical = canonicalFor(rel);
  const title = titleFrom(html, rd, rel);
  const desc = descriptionFrom(html, rd, rel);
  const image = imageFrom(html, rd);
  const legacy = LEGACY_PREFIXES.some(x=>rel.startsWith(x));
  const noindex = NOINDEX_FILES.has(rel) || legacy;
  const isArticle = /^(reviews|guias|regalos|comparativas|selecciones)\//.test(rel) && !rel.endsWith('/index.html');

  html = ensureTitle(html,title);
  html = upsertMeta(html,'name','description',desc);
  html = upsertCanonical(html,canonical);
  html = upsertMeta(html,'name','robots',noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
  html = upsertMeta(html,'property','og:title',title);
  html = upsertMeta(html,'property','og:description',desc);
  html = upsertMeta(html,'property','og:type',isArticle ? 'article' : 'website');
  html = upsertMeta(html,'property','og:url',canonical);
  html = upsertMeta(html,'property','og:site_name','Hiperfoco');
  html = upsertMeta(html,'property','og:locale','es_ES');
  if (image) html = upsertMeta(html,'property','og:image',image);
  html = upsertMeta(html,'name','twitter:card',image ? 'summary_large_image' : 'summary');
  html = upsertMeta(html,'name','twitter:title',title);
  html = upsertMeta(html,'name','twitter:description',desc);
  if (image) html = upsertMeta(html,'name','twitter:image',image);

  if (rel === 'index.html') {
    html = addJsonLd(html,'hf-site-schema',{
      '@context':'https://schema.org','@graph':[
        {'@type':'Organization','@id':`${BASE}/#organization`,name:'Hiperfoco',url:`${BASE}/`,logo:`${BASE}/favicon.svg`},
        {'@type':'WebSite','@id':`${BASE}/#website`,url:`${BASE}/`,name:'Hiperfoco',publisher:{'@id':`${BASE}/#organization`},inLanguage:'es-ES'}
      ]
    });
  }

  const bc = breadcrumbData(rel,title,canonical);
  if (bc && !html.includes('"BreadcrumbList"')) html = addJsonLd(html,'hf-breadcrumb-schema',bc);

  if (rd?.name && !html.includes('"@type":"Product"') && !html.includes('"@type": "Product"')) {
    const brand = brandFrom(rd.name);
    const score = Number(String(rd.score ?? '').replace(',','.'));
    const product = {
      '@context':'https://schema.org','@type':'Product',name:rd.name,
      description:rd.intro || desc,
      ...(rd.image ? {image:[rd.image]} : {}),
      ...(brand ? {brand:{'@type':'Brand',name:brand}} : {}),
      ...(rd.category ? {category:rd.category} : {}),
      ...(rd.officialUrl ? {sameAs:rd.officialUrl} : {}),
      review:{'@type':'Review',author:{'@type':'Organization',name:'Hiperfoco'},publisher:{'@type':'Organization',name:'Hiperfoco'},
        reviewBody:rd.verdict || rd.intro || desc,
        ...(Number.isFinite(score) ? {reviewRating:{'@type':'Rating',ratingValue:score,bestRating:10,worstRating:0}} : {})}
    };
    html = addJsonLd(html,'hf-product-review-schema',product);
  }

  fs.writeFileSync(file,html);
}

function walk(dir) {
  for (const ent of fs.readdirSync(dir,{withFileTypes:true})) {
    if (['.git','node_modules','.netlify'].includes(ent.name)) continue;
    const p = path.join(dir,ent.name);
    if (ent.isDirectory()) walk(p);
    else if (ent.isFile() && p.endsWith('.html')) processHtml(p);
  }
}
walk(ROOT);
console.log('SEO/GEO head normalizado en HTML.');
