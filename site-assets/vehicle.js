(async () => {
 const zh = document.documentElement.lang === 'zh-CN';
 const t = (cn, en) => zh ? cn : en;
 const main = document.getElementById('vehicle-content');
 if (!main || main._chemnitzRuntimeMounted) return;
 main._chemnitzRuntimeMounted = true;
 const staticContent = Boolean(document.documentElement.dataset.model);
 // Static form markup must never fall back to a native GET with personal data
 // if a later module/data request fails. Successful hydration replaces it.
 if (staticContent) document.querySelector('#model-inquiry-form')?.addEventListener('submit', event => event.preventDefault());
 const requestedId = document.documentElement.dataset.model || new URLSearchParams(location.search).get('model');
 const id = requestedId === 'vehicle-config-sylphy-2026' ? 'vehicle-config-sylphy' : requestedId;
 const el = (tag, value, cls) => {const node = document.createElement(tag); if (value) node.textContent = value; if (cls) node.className = cls; return node;};
 try {
  const {appUrl, vehicleUrl, pageUrl} = await import('./site-paths.js');
  const response = await fetch(appUrl('data/catalog-models.json'));
  if (!response.ok) throw new Error('Catalogue manifest unavailable');
  const models = await response.json();
  const model = models.find(item => item.id === id);
  if (!model) throw new Error('Unknown model');
  const name = model.title;
  // Release pages already carry build-time SEO titles. Do not replace them.
  if (!document.documentElement.hasAttribute('data-release')) document.title = zh ? name + ' 中国汽车出口 · 配置与询价 | Chemnitz' : name + ' China Export | Specs & FOB Quote | Chemnitz';
  document.querySelector('#model-crumb').textContent = name;
  const language = document.getElementById('language-link');
  if (language) language.href = vehicleUrl(id, !zh, new URLSearchParams(location.search).get('trim'));
  const quote = new URL(pageUrl(zh ? 'quote-zh.html' : 'quote.html'), location.href);
  quote.searchParams.set('model', name);
  document.querySelectorAll('[data-model-quote],.nav-quote').forEach(link => link.href = quote.href);
  document.querySelector('#model-name').textContent = name;
  document.querySelector('#body-style').textContent = model.type || '—';
  document.querySelector('#brand-name').textContent = model.brand;
  const photo = document.querySelector('#main-photo');
  const thumbnails = document.querySelector('.vehicle-thumbs');
  const gallery = model.gallery || [];
  if (gallery.length && photo && thumbnails) {
   // Fetch the first display image and separate 160px thumbnails on entry.
   // Other display files are fetched only after an explicit gallery click.
   const initial = gallery[0];
   photo.src = appUrl(initial.src); photo.alt = name;
   photo.width = initial.width; photo.height = initial.height;
   photo.style.height = 'auto';
   photo.removeAttribute('srcset'); photo.fetchPriority = 'high';
   thumbnails.replaceChildren();
   gallery.forEach((item, index) => {
    const button = el('button'); button.type = 'button';
    button.setAttribute('aria-label', t('查看车型图片 ', 'View vehicle photo ') + (index + 1));
    button.setAttribute('aria-pressed', String(index === 0));
    const image = new Image(); image.src = appUrl(item.thumb); image.alt = name;
    image.width = 160; image.height = Math.round(160 * item.height / item.width);
    image.decoding = 'async'; button.append(image);
    button.addEventListener('click', () => {
     photo.src = appUrl(item.src); photo.width = item.width; photo.height = item.height;
     thumbnails.querySelectorAll('button').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    });
    thumbnails.append(button);
   });
  }
  if (!document.getElementById('related-models')) {
   const related = el('section', '', 'related-models'); related.id = 'related-models';
   const heading = el('div', '', 'related-heading'); heading.append(el('h2', t('您也可以看看', 'Explore related models')));
   const all = el('a', t('全部车型 →', 'All vehicles →')); all.href = pageUrl(zh ? 'cars-zh.html' : 'cars.html'); heading.append(all);
   const cards = el('div', '', 'related-grid');
   const score = candidate => (candidate.brandGroup === model.brandGroup ? 2 : 0) + (candidate.bodyStyle === model.bodyStyle ? 3 : 0);
   for (const candidate of models.filter(item => item.id !== id).sort((a, b) => score(b) - score(a)).slice(0, 4)) {
    const link = el('a', '', 'related-card'); link.href = vehicleUrl(candidate.id, zh);
    const image = new Image(); image.loading = 'lazy'; image.src = appUrl(candidate.image); image.alt = candidate.title;
    const info = el('div', '', 'related-info');
    info.append(el('span', candidate.type, 'related-type'), el('small', candidate.brand), el('h3', candidate.name), el('p', t('查看车型与配置 ↗', 'View model & specifications ↗')));
    link.append(image, info); cards.append(link);
   }
   related.append(heading, cards); main.append(related);
  }
  const existingForm = document.querySelector('#model-inquiry-form');
  if (!document.getElementById('shipping') && !document.getElementById('model-faq') && document.querySelector('.vehicle-bottom')) {
   const {addSections} = await import('./vehicle-sections.js');
   addSections({id, name, zh});
  } else if (existingForm && !existingForm._chemnitzRuntimeBound) {
   // Snapshot HTML has no serialized event listeners. Restore its form handlers
   // while preserving autofill or fields entered before hydration finishes.
   const values = [...existingForm.elements].filter(control => {
    if (!control.name || control.readOnly || control.type === 'checkbox' || !control.value) return false;
    const initial = control.tagName === 'SELECT' ? ([...control.options].find(option => option.defaultSelected) || control.options[0])?.value : control.defaultValue;
    return control.value !== initial;
   }).map(control => ({name: control.name, value: control.value}));
   const {createModelInquiry} = await import('./vehicle-inquiry.js');
   const form = createModelInquiry({name, zh}); form._chemnitzRuntimeBound = true;
   for (const value of values) {const control = form.elements.namedItem(value.name); if (control) control.value = value.value;}
   existingForm.replaceWith(form);
  }
  const {mountVariants} = await import('./vehicle-variants.js');
  await mountVariants({id, name, zh});
 } catch (error) {
  if (staticContent) {
   // Temporary network failure must not erase independently readable HTML.
   if (!main.querySelector('.vehicle-load-notice')) {
    const notice = el('p', t('交互资料暂未加载，当前静态车型信息仍可阅读。请刷新重试。', 'Interactive data could not load. The static model information remains available; please refresh to retry.'), 'vehicle-load-notice');
    notice.setAttribute('role', 'status'); main.append(notice);
   }
  } else {
   main.replaceChildren(el('h1', t('车型资料暂时无法加载', 'Vehicle data could not load')), el('p', t('请刷新或返回车型目录重新选择。', 'Please refresh or return to the vehicle catalogue.')));
   const link = el('a', t('返回车型目录 →', 'Back to catalogue →')); link.href = zh ? 'cars-zh.html' : 'cars.html'; main.append(link);
  }
 }
})();
