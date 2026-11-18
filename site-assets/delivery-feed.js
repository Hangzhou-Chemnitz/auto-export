(()=>{
 'use strict';
 const HOME_LIMIT=6,home=document.querySelector('#warehouse-footage .warehouse-grid'),archive=document.querySelector('.footage-grid');
 if(!home&&!archive)return;
 // Reuse the original cards. Cloning drops their playback listeners and the
 // homepage observer's video references when live uploads are inserted.
 const ownScript=document.currentScript,assetBase=new URL('.',ownScript.src),grid=home||archive,baseline=[...grid.children];
 const text={
  en:{labels:{dispatch:'Vehicle dispatch',loading:'Vehicle loading',handover:'Vehicle handover',yard:'Vehicle yard'},tag:'REAL FOOTAGE',description:'Real delivery-team footage. Availability and terms are confirmed for each inquiry.',play:'Play video',date:'Filmed'},
  'zh-CN':{labels:{dispatch:'车辆发运实拍',loading:'车辆装载实拍',handover:'车辆交付实拍',yard:'车辆场地实拍'},tag:'真实现场',description:'来自交付团队的现场实拍。具体供货和交易条件以每次询价确认为准。',play:'播放视频',date:'拍摄日期'},
  es:{labels:{dispatch:'Despacho de vehículos',loading:'Carga de vehículos',handover:'Entrega de vehículos',yard:'Patio de vehículos'},tag:'IMÁGENES REALES',description:'Imágenes reales del equipo de entregas. La disponibilidad y las condiciones se confirman en cada consulta.',play:'Reproducir video',date:'Grabado'},
  fr:{labels:{dispatch:'Expédition de véhicules',loading:'Chargement de véhicules',handover:'Livraison de véhicules',yard:'Parc automobile'},tag:'IMAGES RÉELLES',description:'Images réelles de notre équipe de livraison. Disponibilité et conditions à confirmer pour chaque demande.',play:'Lire la vidéo',date:'Filmé le'},
  ru:{labels:{dispatch:'Отправка автомобилей',loading:'Погрузка автомобилей',handover:'Передача автомобилей',yard:'Автомобильная площадка'},tag:'РЕАЛЬНЫЕ КАДРЫ',description:'Реальные кадры команды доставки. Наличие и условия уточняются по каждому запросу.',play:'Смотреть видео',date:'Дата съёмки'},
  ar:{labels:{dispatch:'شحن السيارات',loading:'تحميل السيارات',handover:'تسليم السيارات',yard:'ساحة السيارات'},tag:'لقطات حقيقية',description:'لقطات حقيقية من فريق التسليم. يتم تأكيد التوفر والشروط لكل استفسار.',play:'تشغيل الفيديو',date:'تاريخ التصوير'}
 },language=document.documentElement.lang==='zh-CN'?'zh':document.documentElement.lang,locale=text[document.documentElement.lang]||text.en;
 const earlier={en:'Earlier footage','zh-CN':'往期实拍',es:'Imágenes anteriores',fr:'Images précédentes',ru:'Архивные кадры',ar:'لقطات سابقة'}[document.documentElement.lang]||'Earlier footage';
 const aspects=new Map();let legacyLibrary;
 let config,last='',inflight=false,retryDimensions=false,aspectDirty=false,aspectTimer;
 function requestAspectUpdate(){aspectDirty=true;if(inflight||aspectTimer)return;aspectTimer=setTimeout(()=>{aspectTimer=null;if(!retryDimensions){aspectDirty=false;return;}aspectDirty=false;update();},100);}
 function sizeColumns(){const width=home?.querySelector('.delivery-column')?.getBoundingClientRect().width;if(width){const value=Math.ceil(width*16/9+178)+'px';if(home.style.getPropertyValue('--delivery-column-height')!==value)home.style.setProperty('--delivery-column-height',value);}}
 if(home){if('ResizeObserver'in window)new ResizeObserver(sizeColumns).observe(home);window.addEventListener('resize',sizeColumns,{passive:true});}
 for(const event of ['pointerdown','keydown'])grid.addEventListener(event,e=>{const video=e.target.closest?.('video')||e.target.closest?.('[data-footage-play]')?.parentElement.querySelector('video');if(video)video.dataset.deliveryWatching='true';});
 grid.addEventListener('ended',e=>{if(e.target.tagName==='VIDEO')delete e.target.dataset.deliveryWatching;},true);
 function media(raw){try{const url=new URL(raw),endpoint=new URL(config.endpoint),owned=/^\/media\/[a-f0-9]{32}\/(?:video\.mp4|poster\.jpg)$/.test(url.pathname);if(url.protocol==='https:'&&url.origin===endpoint.origin&&owned&&!url.search&&!url.hash)return url.href;if(['127.0.0.1','localhost'].includes(location.hostname)&&url.hostname==='127.0.0.1'&&url.origin===endpoint.origin&&owned)return url.href;}catch{}return null;}
 function title(item){
  if(item.legacy)return item.legacyTitle;
  // Only display a stored translation for this locale. A delayed/failed job must
  // not make the Spanish, Arabic, etc. page display an untranslated Chinese caption.
  const source=item.sourceLanguage||(/\p{Script=Han}/u.test(item.model)?'zh':/\p{Script=Arabic}/u.test(item.model)?'ar':/\p{Script=Cyrillic}/u.test(item.model)?'ru':'en');
  const value=item.titles?.[language],caption=typeof value==='string'&&value.trim()&&value.length<=320?value.trim():source===language?item.model:'';
  return caption||locale.labels[item.category];
 }
 function card(item,older=false){
  const article=document.createElement('article');article.className=home?'warehouse-card':'footage-card';article.dataset[item.legacy?'deliveryLegacy':'deliveryId']=item.id;article.id='delivery-'+item.id;
  const frame=document.createElement('div');frame.className='delivery-frame';
  const setAspect=(width,height)=>{if(width&&height){frame.dataset.orientation=height>width?'portrait':'landscape';frame.style.setProperty('--delivery-aspect',width+'/'+height);}};
  const poster=document.createElement('img');poster.alt=title(item);poster.loading='lazy';
  // Posters keep the phone's original proportions. Detect those proportions
  // from the image, without downloading every video just to lay out the grid.
  poster.addEventListener('load',()=>{setAspect(poster.naturalWidth,poster.naturalHeight);if(home&&item.orientation==='unknown'){aspects.set(item.poster,poster.naturalHeight>poster.naturalWidth?'portrait':'landscape');requestAspectUpdate();}});
  poster.src=item.poster;
  const play=document.createElement('button');play.className='delivery-play';play.type='button';play.setAttribute('aria-label',locale.play+' · '+title(item));const symbol=document.createElement('span');symbol.textContent='▶';symbol.setAttribute('aria-hidden','true');play.append(symbol);frame.append(poster,play);
  if(item.duration){const duration=document.createElement('span');duration.className='delivery-duration';duration.dir='ltr';duration.setAttribute('aria-hidden','true');const seconds=Math.ceil(item.duration);duration.textContent=Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');frame.append(duration);}
  if(older){article.dataset.deliveryEarlier='true';const badge=document.createElement('span');badge.className='delivery-history-badge';badge.textContent=earlier;frame.append(badge);}
  if(item.orientation)frame.dataset.orientation=item.orientation;
  play.addEventListener('click',()=>{
   frame.dataset.playing='true';
   if(item.kind==='iframe'){const iframe=document.createElement('iframe');iframe.src=item.playback+(item.playback.includes('?')?'&':'?')+'autoplay=true';iframe.title=title(item);iframe.allow='autoplay; fullscreen; picture-in-picture';iframe.allowFullscreen=true;frame.replaceChildren(iframe);iframe.focus();}
   else{const video=document.createElement('video');video.src=item.playback;video.poster=item.poster;video.controls=true;video.playsInline=true;video.preload='none';video.dataset.deliveryWatching='true';video.setAttribute('aria-label',title(item));video.addEventListener('loadedmetadata',()=>setAspect(video.videoWidth,video.videoHeight));frame.replaceChildren(video);video.play().catch(()=>{});video.focus();}
  });
  const copy=document.createElement('div');copy.className=home?'warehouse-card-copy':'footage-card-copy';const label=document.createElement('p');label.className='eyebrow';label.textContent=locale.tag;const h=document.createElement(home?'h3':'h2');h.className='delivery-title';h.textContent=title(item);if(home)h.title=title(item);const description=document.createElement('p');description.className='delivery-card-description';description.textContent=item.legacyDescription||locale.description;copy.append(label,h,description);if(item.date){const date=document.createElement('time');date.className='delivery-date';date.dateTime=item.date;date.textContent=locale.date+' · '+item.date;copy.append(date);}else if(item.legacy){const note=document.createElement('p');note.className='delivery-date';note.textContent=earlier;copy.append(note);}article.append(frame,copy);return article;
 }
 function inspect(item){
  if(aspects.has(item.poster))return Promise.resolve(aspects.get(item.poster));
  return new Promise(resolve=>{const image=new Image();let settled=false;const done=value=>{if(!settled){settled=true;clearTimeout(timer);resolve(value);}};const timer=setTimeout(()=>done('unknown'),2500);image.onload=()=>{const late=settled,value=image.naturalHeight>image.naturalWidth?'portrait':'landscape';aspects.set(item.poster,value);done(value);if(home&&late)requestAspectUpdate();};image.onerror=()=>done('unknown');image.src=item.poster;});
 }
 async function inspectMany(items){let cursor=0;await Promise.all(Array.from({length:Math.min(4,items.length)},async()=>{while(cursor<items.length){const item=items[cursor++];if(!item.orientation)item.orientation=await inspect(item);}}));}
 function legacyItem(node){
  const video=node.querySelector('video'),heading=node.querySelector('h2,h3');if(!video||!heading)return null;
  try{const playback=new URL(video.querySelector('source')?.getAttribute('src')||video.getAttribute('src'),location.href),poster=new URL(video.getAttribute('poster'),location.href),pattern=/^\/site-assets\/media\/branded\/chemnitz-[a-z0-9-]+\.(mp4|png|jpg)$/;
   if(playback.origin!==location.origin||poster.origin!==location.origin||!pattern.test(playback.pathname)||!playback.pathname.endsWith('.mp4')||!pattern.test(poster.pathname)||playback.search||poster.search)return null;
   return {id:playback.pathname.split('/').pop().replace('.mp4',''),legacy:true,legacyTitle:heading.textContent.trim(),legacyDescription:node.querySelector('.warehouse-card-copy>p:last-child,.footage-card-copy>p:last-child')?.textContent.trim(),kind:'file',playback:playback.href,poster:poster.href,orientation:'landscape'};
  }catch{return null;}
 }
 async function oldLibrary(){
  if(legacyLibrary)return legacyLibrary;
  const link=document.querySelector('.warehouse-footage-link'),url=link&&new URL(link.href);if(!url||url.origin!==location.origin||!/^\/(?:zh\/|es\/|fr\/|ru\/|ar\/)?footage\.html$/.test(url.pathname))return [];
  try{const response=await fetch(url,{credentials:'omit',signal:AbortSignal.timeout(4000)});if(!response.ok)return [];const doc=new DOMParser().parseFromString(await response.text(),'text/html');legacyLibrary=[...doc.querySelectorAll('.footage-grid>.footage-card')].map(legacyItem).filter(Boolean);return legacyLibrary;}catch{return [];}
 }
 function pack(entries){
  const used=new Set(),columns=[];
  for(const entry of entries){if(columns.length===HOME_LIMIT)break;if(used.has(entry.key))continue;used.add(entry.key);const group=[entry];
   if(entry.item.orientation==='landscape'){const partner=entries.find(e=>!used.has(e.key)&&e.item.orientation==='landscape');if(partner){used.add(partner.key);group.push(partner);}}
   columns.push(group);
  }
  return columns;
 }
 async function homeLayout(items){
  const recent=items.slice(0,HOME_LIMIT);await inspectMany(recent);
  if(recent.length===HOME_LIMIT&&recent.every(i=>i.orientation!=='landscape'))return {columns:recent.map(item=>[{key:item.id,item,older:false}]),complete:recent.every(i=>i.orientation!=='unknown')};
  const pool=items.slice(0,24);
  // Posters only, at most four concurrent requests and 24 upload candidates.
  await inspectMany(pool);
  const uploads=pool.map((item,index)=>({key:item.id,item,older:index>=HOME_LIMIT})),legacy=baseline.map(legacyItem).filter(Boolean),seen=new Set(legacy.map(i=>i.playback));
  let entries=[...uploads,...legacy.map(item=>({key:item.playback,item,older:true}))],columns=pack(entries);
  if(columns.length<HOME_LIMIT||columns.some(c=>c[0].item.orientation==='landscape'&&c.length===1)){
   for(const item of await oldLibrary())if(!seen.has(item.playback)){seen.add(item.playback);entries.push({key:item.playback,item,older:true});}
   columns=pack(entries);
  }
  return {columns,complete:pool.every(i=>i.orientation!=='unknown')};
 }
 async function update(){
  if(inflight||document.hidden)return;inflight=true;
  try{
   if(!config){const r=await fetch(new URL('delivery-feed-config.json',assetBase),{cache:'no-store',signal:AbortSignal.timeout(4000)});if(!r.ok)return;config=await r.json();}
   if(!config.enabled||!config.endpoint)return;
   const endpoint=new URL(config.endpoint);if(endpoint.protocol!=='https:'&&!(['127.0.0.1','localhost'].includes(location.hostname)&&endpoint.hostname==='127.0.0.1'))return;
   const response=await fetch(endpoint,{credentials:'omit',signal:AbortSignal.timeout(5000)});if(!response.ok)return;const data=await response.json();if(data.version!==1||!Array.isArray(data.items))return;
   const seen=new Set(),items=data.items.slice(0,200).filter(item=>{
    if(!/^[a-f0-9]{32}$/.test(item.id)||seen.has(item.id)||!locale.labels[item.category]||!/^\d{4}-\d{2}-\d{2}$/.test(item.date)||typeof item.model!=='string'||item.model.length>80||!['iframe','file'].includes(item.kind)||!(item.duration>0&&item.duration<=360))return false;
    item.poster=media(item.poster);item.playback=media(item.playback);if(!item.poster||!item.playback||!Number.isFinite(Date.parse(item.uploadedAt)))return false;seen.add(item.id);return true;
   });
   const signature=JSON.stringify(items);if(signature===last&&!retryDimensions||(!items.length&&!last))return;
   // Avoid replacing a video while a visitor is watching it. Retry on refresh.
   if(grid.querySelector('iframe')||[...grid.querySelectorAll('video')].some(v=>!v.paused&&v.dataset.deliveryWatching==='true'))return;
   const layout=home&&items.length?await homeLayout(items):null;
   // A click may occur while poster dimensions/old footage are being read.
   if(grid.querySelector('iframe')||[...grid.querySelectorAll('video')].some(v=>!v.paused&&v.dataset.deliveryWatching==='true'))return;
   // Unknown poster dimensions are retried later, never treated as permanent.
   last=signature;retryDimensions=!!layout&&!layout.complete;
   grid.querySelectorAll('video').forEach(v=>v.pause());
   const selected=layout?layout.columns.flat().map(e=>e.item):items,visible=selected.filter(i=>!i.legacy),cards=home?[]:visible.map(item=>card(item)),nodes=[];
   if(home){if(layout){for(const group of layout.columns){const column=document.createElement('div');column.className='delivery-column'+(group.length===2?' delivery-column-pair':'');for(const entry of group)column.append(card(entry.item,entry.older));nodes.push(column);}}else nodes.push(...baseline);home.classList.toggle('warehouse-grid-six',!!layout);}
   else{if(cards.length){const recent=document.createElement('div');recent.className='delivery-recent';recent.append(...cards);nodes.push(recent);}nodes.push(...baseline);}
   grid.replaceChildren(...nodes);
   if(home)sizeColumns();
   let schema=document.getElementById('delivery-feed-schema');if(!schema){schema=document.createElement('script');schema.type='application/ld+json';schema.id='delivery-feed-schema';document.head.append(schema);}
   schema.textContent=JSON.stringify({'@context':'https://schema.org','@graph':visible.map(item=>({'@type':'VideoObject',name:title(item),description:locale.description,thumbnailUrl:item.poster,uploadDate:item.uploadedAt,duration:'PT'+Math.ceil(item.duration)+'S',...(item.kind==='iframe'?{embedUrl:item.playback}:{contentUrl:item.playback})}))}).replace(/</g,'\\u003c');
   document.dispatchEvent(new CustomEvent('chemnitz:delivery-feed-updated',{detail:{count:items.length}}));
  }catch{/* Keep the complete existing footage section if the feed is unavailable. */}finally{inflight=false;if(home&&retryDimensions&&aspectDirty)requestAspectUpdate();}
 }
 update();setInterval(update,60000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)update();});
})();
