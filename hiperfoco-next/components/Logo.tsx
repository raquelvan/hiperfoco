import Link from 'next/link';

export function Logo() {
  return (
    <Link className="brand" href="/" aria-label="Hiperfoco, inicio">
      <span className="brandMark" aria-hidden="true"><i/><b/></span>
      <span>HIPERFOCO</span>
    </Link>
  );
}
