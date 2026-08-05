import Link from 'next/link';
import { Logo } from './Logo';

export function Header() {
  return (
    <header className="siteHeader">
      <Logo />
      <nav className="mainNav" aria-label="Navegación principal">
        <Link href="/#descubrir">Descubrir</Link>
        <Link href="/comparativas/">Comparar</Link>
        <Link href="/guias/">Aprender</Link>
        <Link href="/metodologia/">Metodología</Link>
      </nav>
      <Link className="headerCta" href="/#newsletter">Newsletter</Link>
    </header>
  );
}
