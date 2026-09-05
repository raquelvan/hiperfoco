import fs from 'node:fs';
import path from 'node:path';

const dir='reviews';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.html')&&f!=='index.html').sort();
const errors=[];
for(const file of files){
  const rel=path.posix.join(dir,file);
  const html=fs.readFileSync(rel,'utf8');
  const hasData=/<script[^>]+id=["']review-data["'][^>]*type=["']application\/json["']/i.test(html) || /<script[^>]+type=["']application\/json["'][^>]*id=["']review-data["']/i.test(html);
  const hasRenderer=/product-review(?:-final-20260806)?\.js/i.test(html);
  const hasReviewCss=/assets\/review\.css/i.test(html);
  if(!hasData||!hasRenderer||!hasReviewCss){
    errors.push(`${rel}: no usa la plantilla de review aprobada (review-data=${hasData}, renderer=${hasRenderer}, review.css=${hasReviewCss})`);
  }
}
console.log(`Review template audit: ${files.length} reviews revisadas.`);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('✓ Todas las reviews usan la plantilla aprobada.');
