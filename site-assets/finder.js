// Brand tiles open brand profiles; body-style and region tiles open the catalogue.
// All tiles use native links in the HTML.
// They intentionally do not change the homepage inquiry form.
(function () {
 'use strict';
 const form = document.getElementById('quote-form'); if (!form) return;
 const source = document.currentScript.src;
 const ready = import(new URL('inquiry-draft.js',source).href).then(() => window.ChemnitzInquiry.bind(form,{scope:'home',surface:'home'}));
 // Capture supersedes the legacy inline homepage submit handler during migration.
 function pending(event) { event.preventDefault(); event.stopImmediatePropagation(); ready.then(() => {form.removeEventListener('submit',pending,true);form.requestSubmit();}); }
 form.addEventListener('submit',pending,true);
 ready.then(() => form.removeEventListener('submit',pending,true));
})();
