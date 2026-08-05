import Link from 'next/link';
import { SearchBox } from '@/components/SearchBox';
import { ReviewCard } from '@/components/ReviewCard';
import { TrustStrip } from '@/components/TrustStrip';
import { reviews, categories } from '@/data/site';

export default function Home(){
  return <>
    <section className="hero">
      <div className="heroCopy"><p className="eyebrow">ANALIZAMOS. COMPARAMOS. TE AYUDAMOS A ELEGIR.</p><h1>Nos obsesionamos.<br/><em>Tú compras mejor.</em></h1><p className="lead">Analizamos cientos de productos para ayudarte a elegir sin perder horas comparando.</p><div className="heroActions"><Link className="button primary" href="#descubrir">Explorar guías</Link><Link className="button secondary" href="/comparativas/">Ver comparativas</Link></div></div>
      <div className="heroStill" aria-label="Bodegón editorial de café"><div className="leaf leaf1"/><div className="leaf leaf2"/><div className="kettle"/><div className="grinder"/><div className="cup"/><div className="book book1"/><div className="book book2"/></div>
    </section>
    <section className="searchSection"><SearchBox/><div className="categoryLinks">{categories.map(c=><Link href={`/categoria/${c.slug}/`} key={c.slug}><span>{c.icon}</span>{c.name}</Link>)}</div></section>
    <section className="section" id="descubrir"><div className="sectionHead"><div><p className="eyebrow">LO MÁS BUSCADO</p><h2>Empieza por una decisión concreta</h2></div><Link href="/guias/">Ver todas las guías →</Link></div><div className="reviewGrid">{reviews.map(r=><ReviewCard review={r} key={r.slug}/>)}</div></section>
    <section className="nobodyHome"><div><p className="eyebrow">NUESTRO SELLO</p><h2>Lo que nadie te cuenta</h2><p>No nos quedamos en la ficha técnica. Buscamos el detalle que cambia la experiencia después de semanas de uso.</p><Link className="textLink" href="/metodologia/">Descubre cómo analizamos →</Link></div><div className="nobodyVisual"><span/><i/><b/></div><div><p className="eyebrow">ANÁLISIS DESTACADO</p><h3>La limpieza importa más que el número de bebidas</h3><p>En una superautomática, una función que da pereza limpiar acaba siendo una función que dejas de usar.</p><Link className="textLink" href="/reviews/philips-3300-lattego/">Leer análisis →</Link></div></section>
    <TrustStrip/>
    <section className="needs"><div className="sectionHead"><div><p className="eyebrow">COMPRA SEGÚN TU NECESIDAD</p><h2>No existe una mejor para todos</h2></div></div><div className="needPills"><Link href="/categoria/cafe/?f=100">Menos de 100 €</Link><Link href="/categoria/cafe/?f=200">Menos de 200 €</Link><Link href="/categoria/cafe/?f=300">Menos de 300 €</Link><Link href="/categoria/cafe/?f=leche">Café con leche</Link><Link href="/categoria/cafe/?f=pareja">Somos dos</Link><Link href="/categoria/cocina/?f=espacio">Poco espacio</Link><Link href="/categoria/cafe/?f=limpieza">Poco mantenimiento</Link></div></section>
    <section className="newsletter" id="newsletter"><div><p className="eyebrow">LA LISTA HIPERFOCO</p><h2>Una compra menos de la que arrepentirte.</h2><p>Comparativas nuevas, cambios importantes y bajadas de precio que sí merecen la pena.</p></div><form name="newsletter" method="POST" data-netlify="true"><input type="hidden" name="form-name" value="newsletter"/><label htmlFor="email">Tu correo</label><div><input id="email" name="email" type="email" required placeholder="tu@email.com"/><button type="submit">Quiero ahorrar tiempo</button></div><small>Sin spam. Puedes darte de baja cuando quieras.</small></form></section>
  </>;
}
