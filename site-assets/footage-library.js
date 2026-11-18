(()=>{
 'use strict';
 const grid=document.querySelector('.footage-grid');if(!grid)return;
 const earlier={en:'Earlier footage','zh-CN':'往期实拍',es:'Imágenes anteriores',fr:'Images précédentes',ru:'Архивные кадры',ar:'لقطات سابقة'}[document.documentElement.lang]||'Earlier footage';
 // Keep the actual cards, videos and listeners. Never clone or invent records.
 let ordered=[...grid.querySelectorAll('.footage-card')],last='',pending=false,timer;
 const identities=new WeakMap(),knownAspects=new WeakMap();let nextID=0;
 const key=node=>{if(!identities.has(node))identities.set(node,++nextID);return identities.get(node);};
 function playing(){return grid.querySelector('iframe')||[...grid.querySelectorAll('video')].some(v=>!v.paused&&!v.ended);}
 function orientation(card){
  const frame=card.querySelector('.delivery-frame'),image=frame?.querySelector('img');
  if(image?.complete&&image.naturalWidth){const value=image.naturalHeight>image.naturalWidth?'portrait':'landscape';knownAspects.set(card,value);return value;}
  // Opening a clip replaces its poster with a video element. Keep the known
  // poster layout instead of reshuffling cards when metadata becomes available.
  if(knownAspects.has(card))return knownAspects.get(card);
  if(frame&&!image&&card.dataset.libraryOrientation)return card.dataset.libraryOrientation;
  if(frame)return frame.dataset.orientation==='landscape'?'landscape':'portrait';
  // The original branded archive clips have a landscape playback canvas.
  return 'landscape';
 }
 function size(){
  const width=grid.querySelector('.delivery-library-column')?.getBoundingClientRect().width;
  if(width){const value=Math.ceil(width*16/9+200)+'px';if(grid.style.getPropertyValue('--delivery-library-height')!==value)grid.style.setProperty('--delivery-library-height',value);}
 }
 function schedule(){if(timer)return;timer=setTimeout(()=>{timer=null;render();},100);}
 function render(){
  if(playing()){pending=true;return;}pending=false;
  const entries=ordered.map(node=>({node,orientation:orientation(node)})),signature=entries.map(e=>key(e.node)+':'+e.orientation).join('|');
  if(signature===last){size();return;}last=signature;
  const used=new Set(),columns=[];
  for(const entry of entries){
   if(used.has(entry.node))continue;used.add(entry.node);const group=[entry];
   if(entry.orientation==='landscape'){
    const partner=entries.find(e=>!used.has(e.node)&&e.orientation==='landscape');
    if(partner){used.add(partner.node);group.push(partner);}
   }
   const column=document.createElement('div');column.className='delivery-library-column'+(group.length===2?' delivery-library-pair':'');
   for(const {node,orientation:aspect}of group){
    node.dataset.libraryOrientation=aspect;
    const heading=node.querySelector('h2');if(heading)heading.title=heading.textContent.trim();
    const frame=node.querySelector('.footage-frame');
    if(!node.hasAttribute('data-delivery-id')&&frame&&!frame.querySelector('.delivery-history-badge')){
     const badge=document.createElement('span');badge.className='delivery-history-badge';badge.textContent=earlier;frame.append(badge);
    }
    column.append(node);
   }
   columns.push(column);
  }
  grid.classList.add('delivery-library-grid');grid.replaceChildren(...columns);size();
 }
 document.addEventListener('chemnitz:delivery-feed-updated',()=>{ordered=[...grid.querySelectorAll('.footage-card')];render();});
 grid.addEventListener('load',event=>{if(event.target.tagName==='IMG')schedule();},true);
 grid.addEventListener('loadedmetadata',schedule,true);
 for(const event of ['pause','ended'])grid.addEventListener(event,()=>{if(pending)schedule();},true);
 if('ResizeObserver'in window)new ResizeObserver(size).observe(grid);
 window.addEventListener('resize',size,{passive:true});
 render();
})();
