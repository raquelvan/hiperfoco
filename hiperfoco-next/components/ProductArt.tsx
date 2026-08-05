export function ProductArt({ kind = 'coffee', compact = false }: { kind?: 'coffee'|'airfryer'; compact?: boolean }) {
  if (kind === 'airfryer') return <div className={`productArt airfryerArt ${compact?'compact':''}`} aria-label="Ilustración de una freidora de aire"><span/><i/><b/></div>;
  return <div className={`productArt coffeeArt ${compact?'compact':''}`} aria-label="Ilustración de una cafetera superautomática"><span/><i/><b/><em/></div>;
}
