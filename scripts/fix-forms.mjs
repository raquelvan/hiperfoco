import fs from 'node:fs';
const file='index.html';
let html=fs.readFileSync(file,'utf8');
if(/<form\s+data-newsletter>/i.test(html)){
  html=html.replace(/<form\s+data-newsletter>/i,'<form data-newsletter name="newsletter" method="POST" data-netlify="true" action="/gracias-newsletter.html"><input type="hidden" name="form-name" value="newsletter">');
}
if(/<form[^>]+data-newsletter/i.test(html)&&!/data-newsletter[^>]+name=["']newsletter["']/i.test(html)){
  html=html.replace(/<form([^>]*data-newsletter[^>]*)>/i,'<form$1 name="newsletter" method="POST" data-netlify="true" action="/gracias-newsletter.html"><input type="hidden" name="form-name" value="newsletter">');
}
fs.writeFileSync(file,html);
console.log('Newsletter form connected to Netlify Forms.');
