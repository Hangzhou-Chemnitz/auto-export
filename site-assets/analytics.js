// Privacy-first GA4 adapter. No form values, search terms, raw URLs or link text are event parameters.
// Before setting data-analytics-reviewed="true", an owner must disable GA Enhanced Measurement
// form interactions, outbound clicks, site search, history pageviews and user-provided-data collection.
// Those account settings cannot be safely asserted or disabled by this local script.
(function () {
 'use strict';
 if (window.__chemnitzNewAnalyticsLoaded) return;
 window.__chemnitzNewAnalyticsLoaded = true;
 const ID = 'G-PEL4QMFR44';
 const root = document.documentElement;
 const disabledPath = /(?:^|\/)(?:design-preview|preview|test|tests|stage|staging)(?:\/|\.|-|$)/i;
 const eligible = location.protocol === 'https:' && ['hzchemnitz.cn','www.hzchemnitz.cn'].includes(location.hostname.toLowerCase()) &&
  root.dataset.release === 'true' && root.dataset.analyticsReviewed === 'true' && root.dataset.stage !== 'true' &&
  !disabledPath.test(location.pathname) && !window.__chemnitzAnalyticsLoaderStarted && !window.__chemnitzAnalyticsEventsLoaded &&
  !document.querySelector('meta[name="robots"][content*="noindex"]');
 let enabled = false, started = false;
 window.__chemnitzAnalyticsEnabled = false;
 window.__chemnitzAnalyticsDisabled = true;
 window['ga-disable-' + ID] = true;
 const MODEL_NAMES = Object.freeze({
  rav4:'Toyota RAV4',corolla:'Toyota Corolla','corolla-cross':'Toyota Corolla Cross',camry:'Toyota Camry',highlander:'Toyota Highlander',wildlander:'Toyota Frontlander',granvia:'Toyota Granvia',bz3:'Toyota bZ3',
  teramont:'Volkswagen Teramont Pro',tharu:'Volkswagen Tharu XR',troc:'Volkswagen T-Roc',golf:'Volkswagen Golf','jetta-vs5':'JETTA VS5',
  coolray:'Geely Coolray',boyue:'Geely Boyue','xingyue-l':'Geely Xingyue L',niuzai:'Geely Niuzai','galaxy-m9':'Geely Galaxy M9','zeekr-9x':'Zeekr 9X',
  teana:'Nissan Teana',n7:'Nissan N7',n6:'Nissan N6',qashqai:'Nissan Qashqai',xtrail:'Nissan X-Trail',nx8:'Nissan NX8',sylphy:'Nissan Sylphy',
  seltos:'Kia Seltos',kx1:'Kia KX1',k3:'Kia K3',k5:'Kia K5',sportage:'Kia Sportage',elantra:'Hyundai Elantra',
  dashing:'Jetour Dashing',x70:'Jetour X70',traveler:'Jetour Traveler 7','free-rider':'Jetour Free Rider 7',q5:'Audi Q5L',q3:'Audi Q3',a5:'Audi A5L',crv:'Honda CR-V',
  'tiggo-3x':'Chery Tiggo 3X','tiggo-5x':'Chery Tiggo 5X',mg5:'MG MG5','changan-cs55':'Changan CS55 PLUS','changan-cs75':'Changan CS75 PLUS','changan-x5':'Changan X5 PLUS',
  'xingyue-l-plus':'Geely Xingyue L PLUS','aion-i60':'GAC AION i60','aion-y':'GAC AION Y'
 });
 const BRANDS = new Set(['toyota','nissan','volkswagen','geely','changan','chery','jetour','zeekr','honda','hyundai','kia','audi','aion']);
 const PATHS = new Set(['/',...['zh','es','fr','ru','ar','models','models-zh','about','about-zh','quote','quote-zh','footage'].map(slug=>'/'+slug+'.html'),...[...BRANDS].flatMap(brand=>['/brands/'+brand+'.html','/brands/'+brand+'-zh.html']),...Object.keys(MODEL_NAMES).flatMap(model=>['/vehicle-config-'+model+'.html','/zh/vehicle-config-'+model+'.html'])]);
 for(const lang of ['es','fr','ru','ar']){
  for(const page of ['models','about','quote','footage'])PATHS.add('/'+lang+'/'+page+'.html');
  for(const brand of BRANDS)PATHS.add('/'+lang+'/brands/'+brand+'.html');
  for(const model of Object.keys(MODEL_NAMES))PATHS.add('/'+lang+'/vehicle-config-'+model+'.html');
 }
 PATHS.add('/zh/footage.html');
 const MARKETS = new Set(['latin-america','middle-east','central-asia','africa','other','PE','CO','CL','AE','SA','KZ']);
 const SURFACES = new Set(['home','catalog','brand','vehicle','quote','about','footage','other']);
 const LOCATIONS = new Set(['header','hero','footer','brand_tile','body_tile','region_tile','catalog_card','brand_card','related_card','page_body','home_form','quote_form','vehicle_form','variant_picker','contact_dock']);
 const CONTACTS = new Set(['Chloe','Natalie','Darwin','Zeeshan','Jacky','Even']);
 const CONTACT_NUMBERS = Object.freeze({'8615625033581':'Chloe','8615913687692':'Natalie','8613640033268':'Darwin','8618511445792':'Zeeshan','8613826126147':'Jacky','8619325504833':'Even'});
 const EVENTS = new Set(['page_view','vehicle_view','vehicle_variant_select','catalog_click','brand_click','inquiry_start','whatsapp_open']);
 let context = {};
 function modelName(id) {
  const slug = String(id || '').replace(/^vehicle-config-/,'').replace(/^sylphy-2026$/,'sylphy');
  return Object.prototype.hasOwnProperty.call(MODEL_NAMES,slug) ? MODEL_NAMES[slug] : '';
 }
 function language() { const lang = (root.lang || '').split('-')[0]; return ['en','zh','es','fr','ru','ar'].includes(lang) ? lang : 'en'; }
 function surface() {
  if (/\/brands\//.test(location.pathname)) return 'brand';
  if (/\/(?:vehicles\/|vehicle(?:-zh)?\.html|vehicle-config-[a-z0-9-]+\.html)/.test(location.pathname) || root.dataset.model || root.dataset.modelId) return 'vehicle';
  if (/\/(?:cars|models)(?:-zh|-es)?(?:\.html|\/|$)/.test(location.pathname)) return 'catalog';
  if (/\/quote(?:-zh)?(?:\.html|\/|$)/.test(location.pathname)) return 'quote';
  if (/\/about(?:-zh)?(?:\.html|\/|$)/.test(location.pathname)) return 'about';
  if (/\/footage\.html$/.test(location.pathname)) return 'footage';
  return /^\/(?:zh|es|fr|ru|ar)\.html$/.test(location.pathname) || location.pathname === '/' ? 'home' : 'other';
 }
 function market() {
  const value = root.dataset.market || new URLSearchParams(location.search).get('region');
  return MARKETS.has(value) ? value : undefined;
 }
 function specId(value) {
  // Only IDs actually present in the rendered, manufacturer-backed selector are eligible.
  const select = document.getElementById('variant-trim');
  return typeof value === 'string' && /^[A-Za-z0-9_.:-]{1,100}$/.test(value) && select &&
   Array.from(select.options).some(option => option.value === value) ? value : undefined;
 }
 function cleanParameters(input = {}) {
  const output = {page_language:language(),entry_surface:surface()};
  const name = modelName(input.id) || (Object.values(MODEL_NAMES).includes(input.model_name) ? input.model_name : context.model_name);
  if (name) output.model_name = name;
  const trim = specId(input.vehicle_spec_id || context.vehicle_spec_id); if (trim) output.vehicle_spec_id = trim;
  const targetMarket = MARKETS.has(input.market) ? input.market : market(); if (targetMarket) output.market = targetMarket;
  if (SURFACES.has(input.entry_surface)) output.entry_surface = input.entry_surface;
  if (LOCATIONS.has(input.cta_location)) output.cta_location = input.cta_location;
  if (CONTACTS.has(input.contact_name)) output.contact_name = input.contact_name;
  return output;
 }
 function safeLocation() { return location.origin + location.pathname; }
 function safeReferrer() {
  try { const url = new URL(document.referrer); return /^https?:$/.test(url.protocol) ? url.origin : ''; } catch { return ''; }
 }
 function track(name, input, callback) {
  let done = false;
  const finish = () => { if (done) return; done = true; if (typeof callback === 'function') callback(); };
  if (!enabled || !EVENTS.has(name)) { finish(); return false; }
  const params = Object.assign(cleanParameters(input), {
   send_to:ID,page_location:safeLocation(),page_referrer:safeReferrer(),page_title:'Chemnitz / ' + surface(),
   transport_type:'beacon'
  });
  if (callback) { params.event_callback = finish; params.event_timeout = 450; window.setTimeout(finish,450); }
  try { window.gtag('event',name,params); } catch { finish(); return false; }
  return true;
 }
 window.chemnitzTrack = track;
 function syncConsent() {
  enabled = Boolean(eligible && PATHS.has(location.pathname) && window.ChemnitzAnalyticsConsent?.allowed());
  window.__chemnitzAnalyticsEnabled = enabled;
  window.__chemnitzAnalyticsDisabled = !enabled;
  window['ga-disable-' + ID] = !enabled;
  if (!enabled) {
   if (started) window.gtag('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
   // Remove only this site's Google Analytics cookies; leave inquiries and other files untouched.
   for (const item of document.cookie.split(';')) { const name = item.split('=')[0].trim(); if (!/^_ga(?:_|$)/.test(name)) continue; for (const domain of ['',location.hostname,'.hzchemnitz.cn']) document.cookie = name+'=; Max-Age=0; path=/; SameSite=Lax; Secure'+(domain?'; domain='+domain:''); }
   return;
  }
  if (started) { window.gtag('consent','update',{analytics_storage:'granted'}); return; }
  started = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  window.gtag('consent','update',{analytics_storage:'granted'});
  window.gtag('set',{page_location:safeLocation(),page_referrer:safeReferrer(),page_title:'Chemnitz / ' + surface(),send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false});
  window.gtag('js',new Date());
  window.gtag('config',ID,{send_page_view:false,page_location:safeLocation(),page_referrer:safeReferrer(),page_title:'Chemnitz / ' + surface(),allow_google_signals:false,allow_ad_personalization_signals:false});
  const script = document.createElement('script'); script.async = true;
  script.referrerPolicy = 'no-referrer';
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID; document.head.append(script);
  track('page_view');
  if (context.model_name && track('vehicle_view',Object.assign({},context,{cta_location:'page_body'}))) views.add(context.model_name);
 }
 const views = new Set();
 window.addEventListener('chemnitz:analytics-consent',syncConsent);
 syncConsent();
 function listen(type,handler) {
  const seen = new WeakSet();
  const receive = event => { if (seen.has(event)) return; seen.add(event); handler(event); };
  document.addEventListener(type,receive); window.addEventListener(type,receive);
 }
 listen('chemnitz:vehicle-view', event => {
  const detail = event.detail || {}, name = modelName(detail.id); if (!name) return;
  context = {model_name:name,vehicle_spec_id:specId(detail.vehicle_spec_id)};
  if (views.has(name)) return;
  if (track('vehicle_view',Object.assign({},context,{cta_location:'page_body'}))) views.add(name);
 });
 listen('chemnitz:variant-select', event => {
  const detail = event.detail || {}, name = modelName(detail.id), trim = specId(detail.vehicle_spec_id);
  if (!name || !trim) return;
  context = {model_name:name,vehicle_spec_id:trim};
  track('vehicle_variant_select',Object.assign({},context,{cta_location:'variant_picker'}));
 });
 function ctaLocation(link) {
  if (link.closest('.brand-tiles')) return 'brand_tile';
  if (link.closest('.region-panel')) return 'region_tile';
  if (link.closest('.type-panel')) return 'body_tile';
  if (link.closest('.catalog-card')) return 'catalog_card';
  if (link.closest('.brand-model-card')) return 'brand_card';
  if (link.closest('.related-card')) return 'related_card';
  if (link.closest('header')) return 'header';
  if (link.closest('footer,.catalog-footer')) return 'footer';
  if (link.closest('.hero,.brand-hero')) return 'hero';
  return 'page_body';
 }
 document.addEventListener('click', event => {
  const link = event.target.closest && event.target.closest('a[href]'); if (!link) return;
  let url; try { url = new URL(link.href,location.href); } catch { return; }
  if (url.origin !== location.origin) {
   if (url.protocol === 'https:' && url.hostname === 'wa.me' && link.closest('.contact-dock')) {
    const contact = CONTACT_NUMBERS[url.pathname.replace(/^\//,'')];
    if (contact) track('whatsapp_open',{entry_surface:surface(),cta_location:'contact_dock',contact_name:contact});
   }
   return;
  }
  const params = {entry_surface:surface(),cta_location:ctaLocation(link)};
  const brand = url.pathname.match(/\/brands\/([a-z]+)(?:-zh)?(?:\.html|\/|$)/)?.[1];
  let eventName;
  if (brand && BRANDS.has(brand)) eventName = 'brand_click';
  else if (/\/(?:(?:cars|models)(?:-zh|-es)?(?:\.html|\/|$)|vehicles\/|vehicle(?:-zh)?\.html|vehicle-config-[a-z0-9-]+\.html)/.test(url.pathname)) {
   eventName = 'catalog_click';
   const id = link.dataset.modelId || url.searchParams.get('model') || url.pathname.match(/(vehicle-config-[a-z0-9-]+)\.html/)?.[1];
   const name = modelName(id); if (name) params.model_name = name;
   const targetMarket = url.searchParams.get('region'); if (MARKETS.has(targetMarket)) params.market = targetMarket;
  }
  if (!eventName) return;
  // Preserve normal new-tab/download behavior; only ordinary same-tab clicks await the beacon.
  if (enabled && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && !link.download && (!link.target || link.target === '_self')) {
   event.preventDefault(); track(eventName,params,() => location.assign(url.href));
  } else track(eventName,params);
 });
})();
