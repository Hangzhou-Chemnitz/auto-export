import {updateModelFaq} from './vehicle-faq.js';
import {appUrl, vehicleUrl, pageUrl} from './site-paths.js';

const FIELDS = [
 ['fuel','燃料类型','Fuel type'],['power','最大功率','Maximum power'],
 ['torque','最大扭矩','Maximum torque'],['acceleration','0–100 km/h 加速','0–100 km/h'],
 ['topSpeed','最高车速','Top speed'],['transmission','变速箱','Transmission'],
 ['drive','驱动类型','Drive type'],['dimensions','尺寸（长×宽×高）','Dimensions (L × W × H)'],
 ['wheelbase','轴距','Wheelbase'],['weight','整备质量','Curb weight'],
 ['tires','轮胎','Tyres'],['seats','座位','Seats'],['steering','转向位置','Steering position']
];

export async function mountVariants({id,name,zh}) {
 const tr=(cn,en)=>zh?cn:en;
 const local=value=>typeof value==='string'?value:value?.[zh?'zh':'en']||value?.zh||'';
 const el=(tag,value,cls)=>{const node=document.createElement(tag);if(value)node.textContent=value;if(cls)node.className=cls;return node};
 const content=document.getElementById('spec-content');
 if(!content)return;
 // Build-time official rows must survive a temporary data-fetch failure.
 const hasStaticSpecs=Boolean(content.querySelector('.technical-row'));
 const selected=document.querySelector('#selected-version');selected.setAttribute('role','status');selected.setAttribute('aria-live','polite');
 const grid=el('dl','','technical-grid');
 const pending=tr('所引官方配置表未列明','Not listed in the cited official sheet');
 function renderSpecs(specs={},missing=pending){
  grid.replaceChildren();
  FIELDS.forEach(([key,cn,en])=>{const pair=el('div','','technical-row');const value=local(specs[key]);pair.dataset.spec=key;pair.append(el('dt',tr(cn,en)),el('dd',value||missing,value?'':'pending-value'));grid.append(pair)});
 }
 let data;
 try {
  const path=id==='vehicle-config-rav4'?'data/rav4-official.json':'data/official/'+encodeURIComponent(id)+'.json';
  const response=await fetch(appUrl(path));
  if(!response.ok)throw new Error('Official data request failed');
  data=await response.json();
 }catch{
  if(hasStaticSpecs){
   if(!document.querySelector('.variant-load-notice')){const notice=el('p',tr('交互配置暂未加载，以下静态官方参数仍可阅读。请刷新重试。','Interactive trim data could not load. The static official specifications remain available; please refresh to retry.'),'variant-load-notice');notice.setAttribute('role','status');selected.after(notice);}
   return;
  }
  content.replaceChildren(grid);
  selected.textContent=tr('官方配置资料暂未加载成功，请刷新重试。','Official specification data could not load. Please refresh to retry.');
  selected.classList.add('variant-unavailable');
  renderSpecs({},tr('官方资料暂未加载','Official data unavailable'));
  updateModelFaq({id,name,zh});
  return;
 }
 // Hydrate one set of controls/specifications, never append to a snapshot's set.
 content.replaceChildren(grid);
 document.querySelector('#original-specs')?.remove();
 document.querySelectorAll('.variant-controls,.official-source,.variant-load-notice').forEach(node=>node.remove());
 selected.classList.remove('variant-unavailable');
 const oldNote=selected.nextElementSibling;if(oldNote?.tagName==='P')oldNote.remove();
 document.querySelector('#specifications').dataset.officialStatus=data.status||(data.variants?.length?'verified':'unavailable');
 const sourceNote=el('div','','official-source');
 if(data.source?.url){
  const sourceLink=el('a',local(data.source.title)||tr('厂家官网','Manufacturer website'));sourceLink.href=data.source.url;sourceLink.target='_blank';sourceLink.rel='noopener';
  sourceNote.append(el('span',tr('资料来源：','Source: ')),sourceLink);
 }
 if(data.source?.checkedAt)sourceNote.append(el('small',tr('核对日期：','Checked: ')+data.source.checkedAt));
 sourceNote.append(el('p',local(data.source?.scope),'source-scope'));selected.after(sourceNote);
 if(!data.variants?.length||data.status==='identity_conflict'){
  selected.textContent=data.status==='identity_conflict'?tr('车型版本对应关系待确认，暂不套用其他车型参数。','Model identity needs confirmation; specifications from a different model are not substituted.'):tr('尚未取得可核对的官方分版本配置表。','A verifiable official trim-by-trim specification sheet is not yet available.');
  selected.classList.add('variant-unavailable');renderSpecs({},tr('待官方版本资料确认','Pending official trim verification'));
  updateModelFaq({id,name,zh});
  return;
 }
 const controls=el('div','','variant-controls');
 const groupLabel=el('label',tr('年款 / 官方资料版本','Model year / official sheet edition'));
 const groupSelect=el('select');groupSelect.id='variant-year';groupLabel.append(groupSelect);
 const trimLabel=el('label',tr('选择配置版本','Select a trim'));const select=el('select');select.id='variant-trim';trimLabel.append(select);
 controls.append(groupLabel,trimLabel,el('p',tr('参数按所选版本展示；库存与出口报价另行确认。','Specifications follow the selected trim. Availability and export prices are confirmed separately.')));
 document.querySelector('#specifications > h2').after(controls);
 const photoNote=document.querySelector('.vehicle-hero > div > .vehicle-note');
 if(photoNote)photoNote.textContent=tr('图库为车型通用参考图，切换版本不会切换实车照片；具体外观与装备以所选版本和订单实车为准。','Gallery images are general model references and do not change with the selected trim. Confirm appearance and equipment against the selected trim and actual order vehicle.');
 const years=[...new Set(data.variants.map(v=>v.year||local(data.edition)))];
 years.forEach(y=>groupSelect.add(new Option(String(y),String(y))));
 content.append(el('h3',tr('标准及可选装备','Standard & optional equipment')));
 content.append(el('p',tr('● 标配　○ 选配　— 未配备；以下为官方配置表中的部分装备。','● Standard　○ Optional　— Not equipped; selected features from the official sheet.'),'equipment-legend'));
 const equipment=el('div','','equipment-grid');content.append(equipment);
 function update(manual=false) {
  const variant=data.variants.find(v=>v.id===select.value);if(!variant)return;
  const label=local(variant.label),year=variant.year&&!label.includes(String(variant.year))?variant.year+' ':'';
  selected.textContent=name+' · '+year+label;
  renderSpecs(variant.specs);
  equipment.replaceChildren();
  const states={standard:['●','标配','Standard'],optional:['○','选配','Optional'],absent:['—','未配备','Not equipped'],unknown:['?','待核对','Unverified']};
  [['exterior','外观装备','Exterior'],['comfort','内饰与舒适性','Interior & comfort'],['safety','安全与辅助','Safety & assistance']].forEach(([key,cn,en])=>{
   const column=el('div');column.append(el('h3',tr(cn,en)));const list=el('ul','','variant-equipment');
   for(const feature of variant.equipment?.[key]||[]){const state=states[feature.status]||states.unknown;const item=el('li');item.dataset.status=feature.status;item.append(el('span',state[0],'equipment-marker'),el('span',local(feature.label)),el('small',tr(state[1],state[2])));list.append(item)}
   if(!list.children.length)list.append(el('li',pending));column.append(list);equipment.append(column);
  });
  const fullName=name+' · '+year+label;
  const quote=new URL(pageUrl(zh?'quote-zh.html':'quote.html'),location.href);quote.searchParams.set('model',fullName);
  document.querySelectorAll('[data-model-quote],.nav-quote').forEach(a=>a.href=quote.href);
  document.querySelectorAll('[data-inquiry-model]').forEach(control=>control.value=fullName);
  updateModelFaq({id,name,zh,data,variant,fullName});
  const url=new URL(location.href);url.searchParams.set('trim',variant.id);history.replaceState(null,'',url);
  const language=document.getElementById('language-link');if(language)language.href=vehicleUrl(id,!zh,variant.id);
  document.querySelector('#model-name').textContent=name;
  document.dispatchEvent(new CustomEvent(manual?'chemnitz:variant-select':'chemnitz:vehicle-view',{bubbles:true,detail:{id,model_name:name,vehicle_spec_id:variant.id,trim_name:label,page_language:zh?'zh':'en'}}));
 }
 function populate(wanted,manual=false){select.replaceChildren();data.variants.filter(v=>String(v.year||local(data.edition))===groupSelect.value).forEach(v=>select.add(new Option(local(v.label),v.id)));if([...select.options].some(o=>o.value===wanted))select.value=wanted;update(manual)}
 const wanted=new URLSearchParams(location.search).get('trim')||data.defaultVariant;
 const initial=data.variants.find(v=>v.id===wanted)||data.variants[0];groupSelect.value=String(initial.year||local(data.edition));
 groupSelect.addEventListener('change',()=>populate(undefined,true));select.addEventListener('change',()=>update(true));populate(initial.id);
}
