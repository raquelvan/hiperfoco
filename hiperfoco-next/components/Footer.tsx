import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="siteFooter">
      <div><Logo/><p>Nos obsesionamos. Tú compras mejor.</p></div>
      <div><h3>Explorar</h3><Link href="/categoria/cafe/">Café</Link><Link href="/categoria/cocina/">Cocina inteligente</Link><Link href="/comparativas/">Comparativas</Link></div>
      <div><h3>Transparencia</h3><Link href="/metodologia/">Metodología</Link><Link href="/como-nos-financiamos/">Cómo nos financiamos</Link><Link href="/apoyanos/">Apoya Hiperfoco</Link></div>
      <div><h3>Contacto</h3><a href="mailto:hola@hiperfoco.eu">hola@hiperfoco.eu</a><p className="tiny">© 2026 Hiperfoco</p></div>
    </footer>
  );
}
