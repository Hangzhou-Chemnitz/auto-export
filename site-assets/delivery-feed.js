(()=>{
 'use strict';
 const home=document.querySelector('#warehouse-footage .warehouse-grid'),archive=document.querySelector('.footage-grid');
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
 },locale=text[document.documentElement.lang]||text.en;
 let config,last='',inflight=false;
 for(const event of ['pointerdown','keydown'])grid.addEventListener(event,e=>{const video=e.target.closest?.('video')||e.target.closest?.('[data-footage-play]')?.parentElement.querySelector('video');if(video)video.dataset.deliveryWatching='true';});
 grid.addEventListener('ended',e=>{if(e.target.tagName==='VIDEO')delete e.target.dataset.deliveryWatching;},true);
 function media(raw){try{const url=new URL(raw),endpoint=new URL(config.endpoint),owned=/^\/media\/[a-f0-9]{32}\/(?:video\.mp4|poster\.jpg)$/.test(url.pathname);if(url.protocol==='https:'&&url.origin===endpoint.origin&&owned&&!url.search&&!url.hash)return url.href;if(['127.0.0.1','localhost'].includes(location.hostname)&&url.hostname==='127.0.0.1'&&url.origin===endpoint.origin&&owned)return url.href;}catch{}return null;}
 function title(item){return (item.model?item.model+' · ':'')+locale.labels[item.category];}
 function card(item){
  const article=document.createElement('article');article.className=home?'warehouse-card':'footage-card';article.dataset.deliveryId=item.id;article.id='delivery-'+item.id;
  const frame=document.createElement('div');frame.className='delivery-frame';
  const setAspect=(width,height)=>{if(width&&height){frame.dataset.orientation=height>width?'portrait':'landscape';frame.style.setProperty('--delivery-aspect',width+'/'+height);}};
  const poster=document.createElement('img');poster.alt=title(item);poster.loading='lazy';
  // Posters keep the phone's original proportions. Detect those proportions
  // from the image, without downloading every video just to lay out the grid.
  poster.addEventListener('load',()=>setAspect(poster.naturalWidth,poster.naturalHeight));
  poster.src=item.poster;
  const play=document.createElement('button');play.className='delivery-play';play.type='button';play.setAttribute('aria-label',locale.play+' · '+title(item));const symbol=document.createElement('span');symbol.textContent='▶';symbol.setAttribute('aria-hidden','true');play.append(symbol);frame.append(poster,play);
  const duration=document.createElement('span');duration.className='delivery-duration';duration.dir='ltr';duration.setAttribute('aria-hidden','true');const seconds=Math.ceil(item.duration);duration.textContent=Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');frame.append(duration);
  play.addEventListener('click',()=>{
   frame.dataset.playing='true';
   if(item.kind==='iframe'){const iframe=document.createElement('iframe');iframe.src=item.playback+(item.playback.includes('?')?'&':'?')+'autoplay=true';iframe.title=title(item);iframe.allow='autoplay; fullscreen; picture-in-picture';iframe.allowFullscreen=true;frame.replaceChildren(iframe);iframe.focus();}
   else{const video=document.createElement('video');video.src=item.playback;video.poster=item.poster;video.controls=true;video.playsInline=true;video.preload='none';video.dataset.deliveryWatching='true';video.setAttribute('aria-label',title(item));video.addEventListener('loadedmetadata',()=>setAspect(video.videoWidth,video.videoHeight));frame.replaceChildren(video);video.play().catch(()=>{});video.focus();}
  });
  const copy=document.createElement('div');copy.className=home?'warehouse-card-copy':'footage-card-copy';const label=document.createElement('p');label.className='eyebrow';label.textContent=locale.tag;const h=document.createElement(home?'h3':'h2');h.className='delivery-title';h.textContent=title(item);const description=document.createElement('p');description.textContent=locale.description;const date=document.createElement('time');date.className='delivery-date';date.dateTime=item.date;date.textContent=locale.date+' · '+item.date;copy.append(label,h,description,date);article.append(frame,copy);return article;
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
   const signature=JSON.stringify(items);if(signature===last||(!items.length&&!last))return;
   // Avoid replacing a video while a visitor is watching it. Retry on refresh.
   if(grid.querySelector('iframe')||[...grid.querySelectorAll('video')].some(v=>!v.paused&&v.dataset.deliveryWatching==='true'))return;
   // Remember only the rendered feed, not an update deferred while watching.
   last=signature;
   grid.querySelectorAll('video').forEach(v=>v.pause());
   const visible=home?items.slice(0,3):items,cards=visible.map(card),nodes=[];
   if(home)nodes.push(...cards,...baseline.slice(0,3-cards.length));
   else{if(cards.length){const recent=document.createElement('div');recent.className='delivery-recent';recent.append(...cards);nodes.push(recent);}nodes.push(...baseline);}
   grid.replaceChildren(...nodes);
   let schema=document.getElementById('delivery-feed-schema');if(!schema){schema=document.createElement('script');schema.type='application/ld+json';schema.id='delivery-feed-schema';document.head.append(schema);}
   schema.textContent=JSON.stringify({'@context':'https://schema.org','@graph':visible.map(item=>({'@type':'VideoObject',name:title(item),description:locale.description,thumbnailUrl:item.poster,uploadDate:item.uploadedAt,duration:'PT'+Math.ceil(item.duration)+'S',...(item.kind==='iframe'?{embedUrl:item.playback}:{contentUrl:item.playback})}))}).replace(/</g,'\\u003c');
   document.dispatchEvent(new CustomEvent('chemnitz:delivery-feed-updated',{detail:{count:items.length}}));
  }catch{/* Keep the complete existing footage section if the feed is unavailable. */}finally{inflight=false;}
 }
 update();setInterval(update,60000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)update();});
})();
