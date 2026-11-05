import {REGIONAL_SHORTLISTS, REVIEWED_AT} from './regional-models.js';
import {appUrl, vehicleUrl} from './site-paths.js';

const isZh=document.documentElement.lang==='zh-CN';
const t=(a,b)=>isZh?a:b;
const local=value=>value[isZh?'zh':'en'];
const grid=document.querySelector('.catalog-grid'),count=document.querySelector('#result-count');
const brand=document.querySelector('#brand'),type=document.querySelector('#body-type'),search=document.querySelector('#search');
const region=document.querySelector('#region'),regionPanel=document.querySelector('#region-reference');
const heading=document.querySelector('.catalog-intro h1'),intro=document.querySelector('.catalog-intro p');
const defaultHeading=heading.textContent,defaultIntro=intro.textContent;
const names={Toyota:'丰田',Nissan:'日产',Volkswagen:'大众',Geely:'吉利',Changan:'长安',Chery:'奇瑞',Jetour:'捷途',Zeekr:'极氪',Honda:'本田',Hyundai:'现代',Kia:'起亚',Audi:'奥迪'};
const typeNames={Sedan:'轿车',Hatchback:'两厢车',SUV:'SUV',MPV:'MPV'};
const bodyStyles=Object.keys(typeNames);
const bodyStyle=label=>bodyStyles.find(style=>new RegExp('\\b'+style+'\\b','i').test(label))||label;
const selectedOption=(select,value)=>[...select.options].find(option=>option.value.toLowerCase()===(value||'').toLowerCase())?.value||'';
let models=[];
function syncFilterURL(){
 const url=new URL(location.href);
 for(const [key,value] of [['brand',brand.value],['type',type.value],['q',search.value.trim()],['region',region.value]]){
  if(value)url.searchParams.set(key,value);else url.searchParams.delete(key);
 }
 if(url.href!==location.href)history.replaceState(null,'',url);
 const languageLink=document.querySelector('.preview a');
 if(languageLink){const target=new URL(languageLink.href,location.href);target.search=url.search;languageLink.href=target.href;}
}
function renderRegion(reference){
 const keepOpen=regionPanel.dataset.region===region.value&&regionPanel.querySelector('details')?.open;
 regionPanel.replaceChildren();regionPanel.hidden=!reference;regionPanel.dataset.region=region.value;
 heading.textContent=reference?local(reference.label)+t(' · 选车参考',' · Model shortlist'):defaultHeading;
 intro.textContent=reference?local(reference.scope):defaultIntro;
 if(!reference)return;
 const title=document.createElement('h2');title.id='region-title';title.textContent=t('为什么展示这些车型？','Why these models?');
 const note=document.createElement('p');note.textContent=local(reference.caveat);
 const details=document.createElement('details');details.open=!!keepOpen;
 const summary=document.createElement('summary');summary.textContent=reference.sources.length?t('查看市场资料与筛选依据','Market sources & selection method'):t('查看选车说明','About this selection');
 const method=document.createElement('p');method.textContent=reference.sources.length?t('根据注明国家和统计期的公开车型销量 / 登记数据，与现有目录匹配。仅选部分车型，展示顺序不是销量排名；不同国家、时期或统计口径的数据不合并计算。','Selected nameplates are matched to our catalogue using public sales/registration reports for the stated markets and periods. This is a partial shortlist, not a sales ranking; figures from different countries, periods or methods are not combined.'):t('未指定具体市场，先展示首页现有主推车型；不使用其他区域的数据推断当地热度。','With no specific market selected, this list shows the models already featured on our homepage. It does not infer local popularity from another region’s data.');
 const date=document.createElement('p');date.className='region-reviewed';date.textContent=t('资料整理：','Research reviewed: ')+REVIEWED_AT+t('；非实时榜单，最新销量和供货需另行确认。','; not a live ranking. Verify newer sales figures and availability separately.');
 details.append(summary,method);
 if(reference.sources.length){
  const list=document.createElement('ul');
  for(const source of reference.sources){
   const row=document.createElement('li'),link=document.createElement('a'),kind=document.createElement('span');
   link.href=source.url;link.target='_blank';link.rel='noopener noreferrer';link.textContent=local(source.title);
   kind.textContent=' — '+local(source.type);row.append(link,kind);list.append(row);
  }
  details.append(list);
 }
 details.append(date);regionPanel.append(title,note,details);
}
function render(){
 const q=search.value.trim().toLowerCase();
 const reference=REGIONAL_SHORTLISTS[region.value];
 const evidence=new Map((reference?.models||[]).map(item=>[item.id,item]));
 const candidates=reference?reference.models.map(item=>models.find(model=>model.id===item.id)).filter(Boolean):models;
 const items=candidates.filter(m=>(!brand.value||(m.brandGroup||m.brand)===brand.value)&&(!type.value||(bodyStyles.includes(type.value)?m.bodyStyle===type.value:m.type===type.value))&&((m.name+' '+m.brand+' '+(names[m.brand]||'')).toLowerCase().includes(q)));
 syncFilterURL();
 renderRegion(reference);
 count.textContent=reference?t('显示 '+items.length+' / '+candidates.length+' 款区域参考车型',items.length+' of '+candidates.length+' shortlisted models'):t('显示 '+items.length+' / '+models.length+' 款车型',items.length+' of '+models.length+' models');
 grid.replaceChildren();
 for(const m of items){
  const a=document.createElement('a');a.className='catalog-card';a.href=vehicleUrl(m.id,isZh);a.dataset.modelId=m.id;
  const photo=document.createElement('div');photo.className='catalog-photo';
  const img=document.createElement('img');img.src=m.image;img.alt=m.title;img.loading='lazy';img.width=640;img.height=480;
  const badge=document.createElement('span');badge.textContent=isZh?(typeNames[m.type]||m.type):m.type;photo.append(img,badge);
  const body=document.createElement('div');body.className='catalog-body';
  const small=document.createElement('small');small.textContent=isZh?(names[m.brand]||m.brand)+' / '+m.brand:m.brand.toUpperCase();
  const title=document.createElement('h2');title.textContent=m.name;
  const note=document.createElement('p');note.textContent=t('具体版本与供货情况，请询价确认。','Confirm the version and availability on inquiry.');
  const cta=document.createElement('span');cta.className='catalog-card-link';cta.textContent=t('查看车型与配置 ↗','View model & specifications ↗');
  body.append(small,title);
  if(evidence.has(m.id)){
   const item=evidence.get(m.id),marketNote=document.createElement('p');marketNote.className='catalog-market-note';marketNote.dataset.match=item.match;marketNote.textContent=local(item.evidence);body.append(marketNote);
  }
  body.append(note,cta);a.append(photo,body);grid.append(a);
 }
 if(!items.length){const e=document.createElement('div');e.className='catalog-empty';e.textContent=t('没有匹配的车型，请调整筛选或清除条件。','No matching models. Adjust or clear your filters.');grid.append(e)}
}
[brand,type,search,region].forEach(e=>e.addEventListener('input',render));
document.querySelector('#clear-filters').onclick=()=>{brand.value=type.value=search.value=region.value='';render()};
(async()=>{try{
 const res=await fetch(appUrl('data/catalog-models.json'));if(!res.ok)throw Error();
 const data=await res.json();
 models=data.map(m=>({...m,image:appUrl(m.image)}));
 for(const control of [brand,type,region]) while(control.options.length>1)control.remove(1);
 for(const b of [...new Set(models.map(m=>m.brandGroup||m.brand))])brand.add(new Option(isZh?(names[b]||b)+' · '+b:b,b));
 for(const b of [...new Set(models.map(m=>m.type))])type.add(new Option(isZh?(typeNames[b]||b):b,b));
 for(const [key,reference] of Object.entries(REGIONAL_SHORTLISTS))region.add(new Option(local(reference.label),key));
 const params=new URLSearchParams(location.search);
 brand.value=selectedOption(brand,params.get('brand'));
 type.value=selectedOption(type,params.get('type'));
 region.value=selectedOption(region,params.get('region'));
 search.value=params.get('q')||'';render();
 }catch(e){count.textContent=t('目录暂时无法加载','Catalogue unavailable');if(!grid.children.length)grid.textContent=t('请刷新重试，或使用页首的获取报价联系团队。','Please refresh or contact our team for a quote.')}
})();
