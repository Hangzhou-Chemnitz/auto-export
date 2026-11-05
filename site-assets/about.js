// Original document links also work without JavaScript.
const viewer=document.querySelector('#document-viewer');
const title=document.querySelector('#document-title');
const description=document.querySelector('#document-description');
const image=document.querySelector('#document-image');
const original=document.querySelector('[data-full-document]');
const close=document.querySelector('[data-close-document]');
let opener=null,previousOverflow='';
document.querySelectorAll('a[data-document]').forEach(link=>{
 link.addEventListener('click',event=>{
  if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||typeof viewer.showModal!=='function')return;
  event.preventDefault();opener=link;
  title.textContent=link.dataset.title;description.textContent=link.dataset.description;
  image.src=link.href;image.alt=link.dataset.title;original.href=link.href;
  previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
  viewer.showModal();close.focus();
 });
});
close.addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',event=>{
 if(event.target!==viewer)return;
 const rect=viewer.getBoundingClientRect();
 if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)viewer.close();
});
viewer.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;opener?.focus()});
