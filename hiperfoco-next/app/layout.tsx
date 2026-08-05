import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://hiperfoco.eu'),
  title: { default: 'Hiperfoco · Nos obsesionamos. Tú compras mejor.', template: '%s · Hiperfoco' },
  description: 'Reviews, comparativas y guías de compra independientes para elegir mejor.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Hiperfoco', description: 'Nos obsesionamos. Tú compras mejor.', url: 'https://hiperfoco.eu', siteName: 'Hiperfoco', locale: 'es_ES', type: 'website' },
  robots: { index: true, follow: true },
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="es"><body><div className="pageShell"><Header/><main>{children}</main><Footer/></div></body></html>;
}
