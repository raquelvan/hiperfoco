import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories, reviews } from '@/data/site';
import { ReviewCard } from '@/components/ReviewCard';

export function generateStaticParams(){return categories.map(c=>({slug:c.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params; const c=categories.find(x=>x.slug===slug); return c?{title:c.name,description:c.description}:{}};
export default async function CategoryPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const c=categories.find(x=>x.slug===slug);if(!c)notFound();const list=reviews.filter(r=>r.category===slug);return <><section className="categoryHero"><span>{c.icon}</span><p className="eyebrow">CATEGORÍA</p><h1>{c.name}</h1><p>{c.description}</p></section><section className="filterLanding"><h2>Compra según tu caso</h2><div className="needPills"><a href="#reviews">Menos de 100 €</a><a href="#reviews">Menos de 200 €</a><a href="#reviews">Menos de 300 €</a><a href="#reviews">Mejor calidad-precio</a><a href="#reviews">Poco mantenimiento</a><a href="#reviews">Para familias</a></div></section><section className="section" id="reviews"><div className="sectionHead"><div><p className="eyebrow">REVIEWS</p><h2>Análisis publicados</h2></div></div><div className="reviewGrid">{list.map(r=><ReviewCard review={r} key={r.slug}/>)}</div></section></>}
