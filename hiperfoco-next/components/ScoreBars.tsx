import { Score } from '@/data/site';
export function ScoreBars({scores}:{scores:Score[]}){
  return <div className="scoreBars">{scores.map(s=><div className="scoreRow" key={s.label}><div><span>{s.label}</span><b>{s.value.toFixed(1)}</b></div><div className="track"><i style={{width:`${s.value*10}%`}}/></div><p>{s.note}</p></div>)}</div>
}
