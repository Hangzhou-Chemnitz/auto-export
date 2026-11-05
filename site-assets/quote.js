(function () {
 'use strict';
 const form = document.getElementById('quote-form'); if (!form) return;
 const script = document.currentScript;
 const params = new URLSearchParams(location.search);
 const options = {scope:'quote',surface:'quote'};
 // A fresh explicit model (including an empty one) wins over the previous draft.
 if (params.has('model')) {
  options.modelOverride = params.get('model').slice(0,1000);
  form.elements.namedItem('model').value = options.modelOverride;
 }
 // Consume prefill once; never propagate personal text via URLs or referrers.
 if (location.search || location.hash) history.replaceState(null,'',location.pathname);
 document.querySelectorAll('.preview > a, #language-link, [data-language-switch]').forEach(link => {
  const url = new URL(link.href,location.href); url.search = ''; url.hash = ''; link.href = url.href;
 });
 const ready = import(new URL('inquiry-draft.js',script.src).href).then(() => window.ChemnitzInquiry.bind(form,options));
 function pending(event) { event.preventDefault(); event.stopImmediatePropagation(); ready.then(() => {form.removeEventListener('submit',pending,true);form.requestSubmit();}); }
 form.addEventListener('submit',pending,true);
 ready.then(() => form.removeEventListener('submit',pending,true));
})();
