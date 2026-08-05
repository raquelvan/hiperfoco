import Link from 'next/link';
import { Review } from '@/data/site';
import { ProductArt } from './ProductArt';

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="reviewCard">
      <div className="cardMedia"><ProductArt kind={review.imageKind} compact/><span className="cardBadge">{review.badge}</span></div>
      <div className="cardBody"><p className="eyebrow">REVIEW</p><h3>{review.brand} {review.name}</h3><p>{review.verdict}</p><div className="cardBottom"><strong>{review.score.toFixed(1)}</strong><Link href={`/reviews/${review.slug}/`}>Leer análisis →</Link></div></div>
    </article>
  );
}
