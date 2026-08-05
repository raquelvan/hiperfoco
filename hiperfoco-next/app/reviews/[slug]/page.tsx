import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { reviews } from '@/data/site';
import { ProductArt } from '@/components/ProductArt';
import { ScoreBars } from '@/components/ScoreBars';
import { TrustStrip } from '@/components/TrustStrip';

export function generateStaticParams(){return reviews.map(r=>({slug:r.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params; const r=reviews.find(x=>x.slug===slug); if(!r) return {};
  return {title:`${r.brand} ${r.name}: opinión y análisis`,description:r.verdict,alternates:{canonical:`/reviews/${r.slug}/`}};
}

export default async function ReviewPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const r=reviews.find(x=>x.slug===slug); if(!r) notFound();
  const schema={"@context":"https://schema.org","@type":"Review","name":`${r.brand} ${r.name}: análisis Hiperfoco`,"reviewBody":r.summary,"reviewRating":{"@type":"Rating","ratingValue":r.score,"bestRating":10,"worstRating":1},"itemReviewed":{"@type":"Product","name":`${r.brand} ${r.name}`,"brand":{"@type":"Brand","name":r.brand}},"publisher":{"@type":"Organization","name":"Hiperfoco","url":"https://hiperfoco.eu"}};
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <section className="reviewHero"><div className="reviewIntro"><p className="breadcrumbs"><Link href="/">Inicio</Link> / <Link href={`/categoria/${r.category}/`}>{r.category==='cafe'?'Café':'Cocina inteligente'}</Link> / {r.name}</p><span className="heroBadge">{r.badge}</span><h1>{r.brand}<br/>{r.name}</h1><p className="reviewTagline">{r.verdict}</p><div className="heroScore"><strong>{r.score.toFixed(1)}</strong><span>Índice Hiperfoco<br/><small>{r.analysisType}</small></span></div><div className="heroActions"><a className="button primary" href="#precio">Ver mejor precio</a><a className="button secondary" href="#comparativa">Comparar</a></div><p className="affiliateHint">Si compras desde nuestros enlaces, el precio es el mismo y nos ayudas a mantener la web.</p></div><div className="reviewMedia"><ProductArt kind={r.imageKind}/><p>{r.type}</p></div></section>
    <nav className="reviewNav" aria-label="Secciones de la review"><a href="#resumen">Resumen</a><a href="#indice">Índice Hiperfoco</a><a href="#nadie">Lo que nadie te cuenta</a><a href="#mejor-peor">Lo mejor y lo peor</a><a href="#comparativa">Comparativa</a><a href="#faq">FAQ</a></nav>
    <TrustStrip/>
    <section className="quickVerdict" id="resumen"><div className="yesCard"><p>¿La compraríamos?</p><strong>Sí</strong><span>{r.summary}</span></div><div><h2>Para quién sí</h2><ul className="goodList">{r.forWhom.map(x=><li key={x}>{x}</li>)}</ul></div><div><h2>Para quién no</h2><ul className="badList">{r.notFor.map(x=><li key={x}>{x}</li>)}</ul></div></section>
    <section className="scoreSection" id="indice"><div className="scoreLead"><p className="eyebrow">ÍNDICE HIPERFOCO</p><strong>{r.score.toFixed(1)}</strong><span>Excelente</span><p>Puntuamos lo que importa para esta categoría, no el número de funciones de la ficha técnica.</p><Link href="/metodologia/">Cómo puntuamos →</Link></div><ScoreBars scores={r.scores}/></section>
    <section className="nobodyReview" id="nadie"><div><p className="eyebrow">LO QUE NADIE TE CUENTA</p><h2>{r.nobodyTells}</h2><p>{r.nobodyTellsDetail}</p></div><div className={`detailVisual ${r.imageKind}`}><span/><i/><b/></div></section>
    <section className="prosCons" id="mejor-peor"><article><h2>Lo mejor</h2><ul className="goodList">{r.best.map(x=><li key={x}>{x}</li>)}</ul></article><article><h2>Lo peor</h2><ul className="badList">{r.worst.map(x=><li key={x}>{x}</li>)}</ul></article></section>
    <section className="compareSection" id="comparativa"><div className="sectionHead"><div><p className="eyebrow">COMPARATIVA RÁPIDA</p><h2>Frente a sus rivales directos</h2></div><Link href="/comparativas/">Ver comparativas →</Link></div><div className="compareGrid"><article className="comparisonCard featured"><span>Nuestra elección</span><ProductArt kind={r.imageKind} compact/><h3>{r.brand} {r.name}</h3><strong>{r.score.toFixed(1)}</strong><p>{r.verdict}</p></article>{r.alternatives.map(a=><article className="comparisonCard" key={a.name}>{a.slug?<Link href={`/reviews/${a.slug}/`}><ProductArt kind={r.imageKind} compact/><h3>{a.name}</h3></Link>:<><ProductArt kind={r.imageKind} compact/><h3>{a.name}</h3></>}<strong>{a.score.toFixed(1)}</strong><p>{a.note}</p></article>)}</div></section>
    <section className="moneySection"><div><p className="eyebrow">SI FUERA MI DINERO…</p><h2>Qué elegiría según el presupuesto</h2></div><div className="budgetGrid">{r.budgets.map(b=><article key={b.range}><span>{b.range}</span><h3>{b.choice}</h3><p>{b.reason}</p></article>)}</div></section>
    <section className="faqUpdates" id="faq"><div><p className="eyebrow">PREGUNTAS FRECUENTES</p><h2>Las dudas antes de comprar</h2>{r.faqs.map(f=><details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div><aside><p className="eyebrow">HISTORIAL DE ACTUALIZACIONES</p>{r.updates.map(u=><div className="timelineItem" key={u.date}><b>{u.date}</b><p>{u.text}</p></div>)}<p className="eyebrow sourceTitle">FUENTES CONSULTADAS</p><ul>{r.sources.map(s=><li key={s}>{s}</li>)}</ul></aside></section>
    <section className="supportBox"><div><p className="eyebrow">RESEÑAS INDEPENDIENTES</p><h2>Las marcas no pagan esta opinión.</h2><p>Algunos enlaces son de afiliación. Si compras desde ellos, la tienda puede pagarnos una pequeña comisión sin coste adicional para ti. También puedes apoyarnos con una aportación voluntaria.</p></div><Link className="button secondary" href="/apoyanos/">Cómo apoyar Hiperfoco</Link></section>
    <section className="finalCta" id="precio"><div><p className="eyebrow">ANTES DE COMPRAR</p><h2>Comprueba el modelo exacto y el precio actual.</h2><p>{r.priceLabel}. Añadiremos tiendas y enlaces de afiliación cuando estén verificados.</p></div><button className="button primary" type="button" disabled>Enlaces pendientes</button></section>
  </>;
}
