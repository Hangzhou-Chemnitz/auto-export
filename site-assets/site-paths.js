// Runtime assets stay relative to this module, not to a model or language URL.
export const isRelease = document.documentElement.dataset.release === 'true';
export function appUrl(path) { return new URL(path, import.meta.url).href; }
export function pageUrl(file) {
 const aliases = {'cars.html':'models.html','cars-zh.html':'models-zh.html'};
 const base = isRelease ? new URL('../', import.meta.url) : new URL('./', import.meta.url);
 const url = new URL(file, base);
 if (isRelease) {
  const filename = url.pathname.split('/').pop();
  if (aliases[filename]) url.pathname = url.pathname.slice(0, -filename.length) + aliases[filename];
 }
 if(isRelease&&window.ChemnitzI18n){const mapped=window.ChemnitzI18n.pagePath(url.href);return new URL(mapped,url).href;}
 return url.href;
}
export function vehicleUrl(id, zh = false, trim = '') {
 const model = id === 'vehicle-config-sylphy-2026' ? 'vehicle-config-sylphy' : id;
 if (!/^vehicle-config-[a-z0-9-]+$/.test(model)) throw new Error('Invalid model route');
 const language=document.documentElement.lang,localized=!zh&&['es','fr','ru','ar'].includes(language)?language+'/':zh?'zh/':'';
 const url = isRelease
  ? new URL(localized + model + '.html', new URL('../', import.meta.url))
  : new URL((zh ? 'vehicle-zh.html' : 'vehicle.html') + '?model=' + encodeURIComponent(model), import.meta.url);
 if (trim) url.searchParams.set('trim', trim);
 return url.href;
}
