// Native details keeps contact selection usable even when JavaScript is unavailable.
(()=>{
 'use strict';
 for(const dock of document.querySelectorAll('.contact-dock')){
  const details=dock.querySelector('details'),toggle=details.querySelector('summary'),close=dock.querySelector('.contact-dock-close');
  dock.classList.add('is-enhanced');
  const sync=()=>toggle.setAttribute('aria-expanded',String(details.open));
  const collapse=restore=>{details.open=false;sync();if(restore)toggle.focus();};
  details.addEventListener('toggle',sync);sync();
  close.addEventListener('click',()=>collapse(true));
  dock.addEventListener('keydown',event=>{if(event.key==='Escape'&&details.open){event.preventDefault();collapse(true);}});
  document.addEventListener('pointerdown',event=>{if(details.open&&!dock.contains(event.target))collapse(false);});
 }
})();
