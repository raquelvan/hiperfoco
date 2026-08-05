'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { reviews } from '@/data/site';

export function SearchBox(){
  const [q,setQ]=useState('');
  const results=useMemo(()=>q.trim().length<2?[]:reviews.filter(r=>`${r.brand} ${r.name} ${r.type}`.toLowerCase().includes(q.toLowerCase())),[q]);
  return <div className="searchWrap"><label htmlFor="site-search" className="srOnly">Buscar productos</label><div className="searchBox"><span>⌕</span><input id="site-search" value={q} onChange={e=>setQ(e.target.value)} placeholder="¿Qué estás pensando en comprar?"/></div>{results.length>0&&<div className="searchResults">{results.map(r=><Link key={r.slug} href={`/reviews/${r.slug}/`}><b>{r.brand} {r.name}</b><span>{r.type} · {r.score.toFixed(1)}</span></Link>)}</div>}</div>
}
