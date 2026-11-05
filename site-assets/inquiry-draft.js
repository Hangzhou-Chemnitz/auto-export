// Tab-scoped inquiry drafts. No personal field is copied to a site URL or analytics.
(function () {
 'use strict';
 if (window.ChemnitzInquiry) return;
 const TTL = 30 * 60 * 1000;
 const PREFIX = 'chemnitz:inquiry-draft:v1:';
 const FIELDS = ['model','customer','company','destination','quantity','email','phone','message','contact'];
 const CONTACTS = Object.freeze({
  '8615625033581':'Chloe','8615913687692':'Natalie','8613640033268':'Darwin',
  '8618511445792':'Zeeshan','8613826126147':'Jacky'
 });
 const SCOPES = new Set(['quote','home','vehicle']);
 const bound = new WeakSet();
 function localeOptions() {
  try {
   const data=JSON.parse(document.getElementById('inquiry-locale')?.textContent||'null');
   return data&&data.lang===document.documentElement.lang?data:{};
  } catch { return {}; }
 }
 function key(scope) { return PREFIX + (SCOPES.has(scope) ? scope : 'quote'); }
 function read(scope) {
  try {
   const record = JSON.parse(sessionStorage.getItem(key(scope)) || 'null');
   if (!record || record.version !== 1 || !Number.isFinite(record.updatedAt) ||
       Date.now() - record.updatedAt > TTL || record.updatedAt > Date.now() || !record.fields) {
    sessionStorage.removeItem(key(scope)); return {};
   }
   return record.fields;
  } catch { return {}; }
 }
 function save(form, scope) {
  const fields = {};
  for (const name of FIELDS) {
   const control = form.elements.namedItem(name);
   if (control && typeof control.value === 'string') fields[name] = control.value;
  }
  try { sessionStorage.setItem(key(scope), JSON.stringify({version:1,updatedAt:Date.now(),fields})); } catch { /* Storage denial must not block an inquiry. */ }
 }
 function track(name, parameters, callback) {
  if (typeof window.chemnitzTrack !== 'function') { if (callback) callback(); return; }
  try { window.chemnitzTrack(name, parameters, callback); } catch { if (callback) callback(); }
 }
 function submit(form, options) {
  if (!form.reportValidity() || form.dataset.inquiryNavigating === 'true') return;
  const data = new FormData(form), number = String(data.get('contact') || '');
  if (!Object.prototype.hasOwnProperty.call(CONTACTS, number)) return;
  save(form, options.scope);
  const labels = {model:'Model',customer:'Name',company:'Company',destination:'Destination',quantity:'Quantity',email:'Email',phone:'WhatsApp / Phone',message:'Additional requirements',...options.labels};
  if(options.modelLabel)labels.model=options.modelLabel;
  const lines = [options.greeting||'Hello Chemnitz, I would like an export quotation.'];
  for (const [name,label] of Object.entries(labels)) {
   const value = String(data.get(name) || '').trim(); if (value) lines.push(label + ': ' + value);
  }
  const url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(lines.join('\n'));
  form.dataset.inquiryNavigating = 'true';
  let navigated = false;
  const navigate = () => { if (navigated) return; navigated = true; clearTimeout(timer); window.location.assign(url); };
  // A blocked tag must not trap the customer. This means opening WhatsApp, not sending a message.
  const timer = setTimeout(navigate, 550);
  track('whatsapp_open', {entry_surface:options.surface,cta_location:options.surface + '_form',contact_name:CONTACTS[number]}, navigate);
 }
 function bind(form, options = {}) {
  if (!form || bound.has(form)) return;
  bound.add(form);
  options = Object.assign({scope:'quote',surface:'quote',zh:document.documentElement.lang.startsWith('zh')}, localeOptions(), options);
  const draft = read(options.scope);
  for (const name of FIELDS) {
   const control = form.elements.namedItem(name);
   if (!control || typeof draft[name] !== 'string') continue;
   if (name === 'contact' && !Object.prototype.hasOwnProperty.call(CONTACTS, draft[name])) continue;
   control.value = draft[name];
  }
  if (Object.prototype.hasOwnProperty.call(options, 'modelOverride') && form.elements.namedItem('model')) {
   form.elements.namedItem('model').value = options.modelOverride;
  }
  // Consent is neither stored nor restored, including browser history restoration.
  const clearConsent = () => { form.querySelectorAll('input[type="checkbox"]').forEach(control => { control.checked = false; }); delete form.dataset.inquiryNavigating; };
  clearConsent(); window.addEventListener('pageshow', clearConsent);
  const notice = document.createElement('small'); notice.className = 'inquiry-draft-note';
  notice.textContent = options.draftNotice || (options.zh
   ? '填写内容仅在当前标签页暂存 30 分钟，便于切换语言；同意选项不会保存。浏览器禁用存储时将无法恢复草稿。'
   : 'Your draft stays in this tab for 30 minutes to support language switching. Consent is not saved. Draft recovery is unavailable when browser storage is blocked.');
  form.append(notice);
  const persist = () => save(form, options.scope);
  form.addEventListener('input', persist); form.addEventListener('change', persist);
  window.addEventListener('pagehide', persist);
  const destination = form.elements.namedItem('destination');
  if (destination) destination.addEventListener('change', () => {
   const country = destination.value.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
   if (/\b(peru|colombia|chile)\b|秘鲁|哥伦比亚|智利/i.test(country)) form.elements.namedItem('contact').value = '8613826126147';
   persist();
  });
  let started = false;
  form.addEventListener('focusin', () => {
   if (started) return; started = true;
   track('inquiry_start', {entry_surface:options.surface,cta_location:options.surface + '_form'});
  });
  form.addEventListener('submit', event => {
   event.preventDefault(); event.stopImmediatePropagation(); submit(form, options);
  }, true);
  // Session storage is the sole language-switch transfer channel.
  document.querySelectorAll('.preview > a, #language-link, [data-language-switch]').forEach(link => link.addEventListener('click', persist, true));
 }
 window.ChemnitzInquiry = Object.freeze({bind,save,ttl:TTL,storageKey:key});
})();
