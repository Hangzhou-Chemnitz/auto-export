// Progressive enhancement only: brand content and model links exist in the HTML.
const cards=[...document.querySelectorAll('.brand-model-card')];
const filters=[...document.querySelectorAll('.brand-filter')];
const search=document.querySelector('#brand-search');
const result=document.querySelector('#brand-result');
const empty=document.querySelector('.brand-empty');
const isZh=document.documentElement.lang==='zh-CN';
const params=new URLSearchParams(location.search);
let type=filters.find(button=>button.dataset.type===params.get('type'))?.dataset.type||'';
search.value=params.get('q')||'';
function render(){
 const q=search.value.trim().toLowerCase();
 let visible=0;
 cards.forEach(card=>{card.hidden=!!((type&&card.dataset.type!==type)||(q&&!card.dataset.search.toLowerCase().includes(q)));if(!card.hidden)visible++});
 filters.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.type===type)));
 result.textContent=isZh?`显示 ${visible} / ${cards.length} 款目录车型`:`Showing ${visible} of ${cards.length} catalogue models`;
 empty.hidden=visible>0;
 const url=new URL(location.href);
 for(const [key,value] of [['type',type],['q',search.value.trim()]]){if(value)url.searchParams.set(key,value);else url.searchParams.delete(key)}
 if(url.href!==location.href)history.replaceState(null,'',url);
 const language=document.querySelector('[data-brand-language]');
 if(language){const target=new URL(language.href,location.href);target.search=url.search;language.href=target.href}
}
filters.forEach(button=>button.addEventListener('click',()=>{type=button.dataset.type;render()}));
search.addEventListener('input',render);
document.querySelector('#brand-clear').addEventListener('click',()=>{type='';search.value='';render();search.focus()});
render();
