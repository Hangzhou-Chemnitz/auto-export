import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(root, 'es', 'modelos');

const models = [
  {
    slug: 'toyota-camry-2026',
    englishUrl: 'vehicle-config-camry.html',
    image: 'images/thumbs/toyota/camry/1.webp',
    name: 'Toyota Camry 2026 Hybrid',
    shortName: 'Toyota Camry 2026',
    title: 'Toyota Camry 2026 desde China | Precio y Exportación | Chemnitz',
    description: 'Toyota Camry 2026 híbrido desde China: precio guía, configuración 2.0HE, ficha técnica y cotización de exportación FOB o EXW.',
    h1: 'Toyota Camry 2026 híbrido',
    h1Accent: 'desde China',
    intro: 'Precio guía y especificaciones de la versión china, con verificación de configuración y cotización FOB o EXW para importadores de América Latina.',
    guidePrice: 'RMB 179.800',
    trim: 'Híbrido 2.0HE Elite',
    body: 'Sedán',
    fuel: 'Híbrido gasolina-eléctrico',
    transmission: 'E-CVT',
    drive: 'Tracción delantera',
    bodyText: [
      'El Toyota Camry 2026 híbrido de esta página corresponde a una configuración disponible en el mercado chino. Publicamos la versión, el sistema de propulsión y el precio guía para que el comprador identifique correctamente el vehículo antes de solicitar una cotización.',
      'La propuesta de exportación se calcula después de confirmar versión, color, cantidad, disponibilidad, destino y término comercial. Chemnitz puede coordinar abastecimiento, preparación, documentación y entrega según el alcance FOB o EXW acordado por escrito.'
    ],
    benefits: ['Sedán híbrido de consumo eficiente', 'Configuración exacta verificada antes de la compra', 'Cotización en USD con alcance FOB o EXW', 'Soporte documental y coordinación de salida desde China'],
    topic: 'Toyota Camry 2026 híbrido desde China'
  },
  {
    slug: 'toyota-rav4-2026',
    englishUrl: 'vehicle-config-rav4.html',
    image: 'images/thumbs/toyota/rav4/1.webp',
    name: 'Toyota RAV4 2026',
    shortName: 'Toyota RAV4 2026',
    title: 'Toyota RAV4 2026 desde China | Precio y Exportación | Chemnitz',
    description: 'Toyota RAV4 2026 desde China: precio guía, versión 2.0L AWD, especificaciones y cotización FOB o EXW para importadores.',
    h1: 'Toyota RAV4 2026',
    h1Accent: 'desde China',
    intro: 'Consulte la versión china 2.0L AWD, su precio guía y las condiciones necesarias para preparar una cotización de exportación FOB o EXW.',
    guidePrice: 'RMB 189.800',
    trim: '2.0L gasolina AWD',
    body: 'SUV',
    fuel: 'Gasolina 2.0L atmosférica',
    transmission: 'CVT automática',
    drive: 'Tracción integral',
    bodyText: [
      'El Toyota RAV4 2026 presentado corresponde a la configuración china 2.0L gasolina con tracción integral. La ficha resume los datos que permiten distinguir esta versión de otras variantes RAV4 ofrecidas en China.',
      'El precio de exportación no se obtiene mediante una conversión directa del precio guía. Se confirma el costo real de abastecimiento, color, cantidad, servicios solicitados, transporte interior y punto de entrega antes de emitir la proforma.'
    ],
    benefits: ['SUV con tracción integral', 'Verificación de versión y equipamiento', 'Opciones de entrega FOB o EXW', 'Coordinación para puerto o paso fronterizo acordado en China'],
    topic: 'Toyota RAV4 2026 desde China'
  },
  {
    slug: 'toyota-corolla-cross-2026',
    englishUrl: 'vehicle-config-corolla-cross.html',
    image: 'images/thumbs/toyota/corolla-cross/1.webp',
    name: 'Toyota Corolla Cross 2026',
    shortName: 'Toyota Corolla Cross 2026',
    title: 'Toyota Corolla Cross 2026 desde China | Precio | Chemnitz',
    description: 'Toyota Corolla Cross 2026 desde China: precio guía, versión 2.0L Elite, especificaciones y cotización de exportación FOB o EXW.',
    h1: 'Toyota Corolla Cross 2026',
    h1Accent: 'desde China',
    intro: 'Ficha en español de la versión china 2.0L Elite, con precio guía y proceso de cotización para exportación FOB o EXW.',
    guidePrice: 'RMB 136.800',
    trim: '2.0L gasolina Elite',
    body: 'SUV',
    fuel: 'Gasolina 2.0L atmosférica',
    transmission: 'CVT automática',
    drive: 'Tracción delantera',
    bodyText: [
      'Esta ficha identifica el Toyota Corolla Cross 2026 2.0L Elite ofrecido en el mercado chino. La denominación comercial puede variar entre países, por lo que confirmamos la configuración y el equipamiento exactos antes de la compra.',
      'Para preparar la cotización se revisan disponibilidad, color, cantidad, precio real de abastecimiento, preparación, documentación y ruta interna. El comprador debe confirmar la admisibilidad y homologación aplicables en su mercado.'
    ],
    benefits: ['SUV compacto para uso urbano y familiar', 'Configuración china identificada por escrito', 'Cotización personalizada, no conversión automática', 'FOB o EXW según el alcance solicitado'],
    topic: 'Toyota Corolla Cross 2026 desde China'
  }
];

const organization = {
  '@type': 'Organization',
  '@id': 'https://hzchemnitz.cn/#organization',
  name: 'Hangzhou Chemnitz International Trade Co., Ltd.',
  url: 'https://hzchemnitz.cn/',
  logo: 'https://hzchemnitz.cn/images/chemnitz-logo.png',
  contactPoint: [
    { '@type': 'ContactPoint', name: 'Chloe', telephone: '+86-15625033581', url: 'https://wa.me/8615625033581', contactType: 'sales' },
    { '@type': 'ContactPoint', name: 'Natalie', telephone: '+86-15913687692', url: 'https://wa.me/8615913687692', contactType: 'sales' },
    { '@type': 'ContactPoint', name: 'Darwin', telephone: '+86-13640033268', url: 'https://wa.me/8613640033268', contactType: 'sales' },
    { '@type': 'ContactPoint', name: 'Zeeshan', telephone: '+86-18511445792', url: 'https://wa.me/8618511445792', contactType: 'sales' },
    { '@type': 'ContactPoint', name: 'Jacky', telephone: '+86-13826126147', url: 'https://wa.me/8613826126147', contactType: 'sales' }
  ]
};

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function schemaFor(model) {
  const spanishUrl = `https://hzchemnitz.cn/es/modelos/${model.slug}.html`;
  const faq = [
    ['¿El precio guía es el precio final de exportación?', `No. ${model.guidePrice} es una referencia del fabricante para la configuración indicada. La cotización final depende del abastecimiento, cantidad, color, destino y servicios acordados.`],
    ['¿Puedo solicitar una cotización FOB o EXW?', 'Sí. La proforma define por escrito el punto de entrega, los servicios incluidos y las responsabilidades de cada parte.'],
    ['¿La configuración puede importarse en cualquier país?', 'La posibilidad de exportar desde China no garantiza la importación en destino. El comprador o su agente debe verificar homologación, emisiones, impuestos y matriculación antes del pago.']
  ];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      { '@type': 'WebSite', '@id': 'https://hzchemnitz.cn/#website', url: 'https://hzchemnitz.cn/', name: 'Chemnitz China Vehicle Export', publisher: { '@id': 'https://hzchemnitz.cn/#organization' } },
      { '@type': 'WebPage', '@id': `${spanishUrl}#webpage`, url: spanishUrl, name: model.title.split(' | ')[0], inLanguage: 'es', dateModified: '2026-10-19', isPartOf: { '@id': 'https://hzchemnitz.cn/#website' }, about: { '@id': `${spanishUrl}#vehicle` } },
      {
        '@type': ['Product', 'Vehicle'], '@id': `${spanishUrl}#vehicle`, name: model.name, url: spanishUrl,
        image: `https://hzchemnitz.cn/${model.image}`, description: model.description,
        brand: { '@type': 'Brand', name: 'Toyota' }, model: model.shortName, vehicleModelDate: '2026', bodyType: model.body,
        fuelType: model.fuel, vehicleTransmission: model.transmission, vehicleDriveWheelConfiguration: model.drive,
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Configuración de referencia', value: model.trim },
          { '@type': 'PropertyValue', name: 'Precio guía del fabricante', value: `${model.guidePrice}; referencia en China, no es una oferta final de exportación` },
          { '@type': 'PropertyValue', name: 'Términos de exportación', value: 'FOB o EXW según cotización' }
        ]
      },
      { '@type': 'BreadcrumbList', '@id': `${spanishUrl}#breadcrumb`, itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://hzchemnitz.cn/es.html' },
        { '@type': 'ListItem', position: 2, name: 'Catálogo', item: 'https://hzchemnitz.cn/models-es.html' },
        { '@type': 'ListItem', position: 3, name: model.shortName, item: spanishUrl }
      ] },
      { '@type': 'FAQPage', '@id': `${spanishUrl}#faq`, mainEntity: faq.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) }
    ]
  };
}

function relatedCards(current) {
  return models.map((model) => `<a class="latam-market-card" href="${model.slug}.html"${model.slug === current.slug ? ' aria-current="page"' : ''}><b>${esc(model.shortName)}</b><span>${esc(model.trim)} · ${esc(model.guidePrice)} de referencia</span></a>`).join('');
}

function page(model) {
  const spanishUrl = `https://hzchemnitz.cn/es/modelos/${model.slug}.html`;
  const englishUrl = `https://hzchemnitz.cn/${model.englishUrl}`;
  const faq = [
    ['¿El precio guía es el precio final de exportación?', `No. ${model.guidePrice} es una referencia del fabricante para la configuración indicada. La cotización final depende del abastecimiento, cantidad, color, destino y servicios acordados.`],
    ['¿Puedo solicitar una cotización FOB o EXW?', 'Sí. La proforma define por escrito el punto de entrega, los servicios incluidos y las responsabilidades de cada parte.'],
    ['¿La configuración puede importarse en cualquier país?', 'La posibilidad de exportar desde China no garantiza la importación en destino. El comprador o su agente debe verificar homologación, emisiones, impuestos y matriculación antes del pago.']
  ];
  return `<!doctype html>
<html lang="es" data-market="LATAM" data-country-name="América Latina" data-asset-base="../../" data-page-type="localized_vehicle" data-model-name="${esc(model.shortName)}" data-guide-price="${esc(model.guidePrice)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(model.title)}</title>
  <meta name="description" content="${esc(model.description)}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
  <link rel="canonical" href="${spanishUrl}">
  <link rel="alternate" hreflang="en" href="${englishUrl}">
  <link rel="alternate" hreflang="es" href="${spanishUrl}">
  <link rel="alternate" hreflang="x-default" href="${englishUrl}">
  <meta property="og:type" content="product">
  <meta property="og:locale" content="es_419">
  <meta property="og:title" content="${esc(model.title.split(' | ')[0])}">
  <meta property="og:description" content="${esc(model.description)}">
  <meta property="og:url" content="${spanishUrl}">
  <meta property="og:image" content="https://hzchemnitz.cn/${model.image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(model.title.split(' | ')[0])}">
  <meta name="twitter:description" content="${esc(model.description)}">
  <meta name="twitter:image" content="https://hzchemnitz.cn/${model.image}">
  <link rel="stylesheet" href="../../latam-country.css?v=20261019a">
  <script src="../../analytics-loader.js?v=20260727a"></script>
  <script defer src="../../analytics-events.js?v=20261009a"></script>
  <script type="application/ld+json">${JSON.stringify(schemaFor(model), null, 2)}</script>
</head>
<body class="latam-page">
  <div class="latam-topbar"><div class="latam-shell"><span>Exportador de vehículos registrado en China · Cotizaciones FOB y EXW</span><div class="latam-topbar-links"><a href="../../es.html">Inicio en español</a><a href="../../models-es.html">Catálogo completo</a></div></div></div>
  <nav class="latam-nav" aria-label="Navegación principal"><div class="latam-shell"><a class="latam-brand" href="../../es.html"><img src="../../images/chemnitz-logo.png" alt="Chemnitz" width="42" height="42"><span>CHEMNITZ<small>CHINA VEHICLE EXPORT</small></span></a><div class="latam-nav-links"><a href="../../es.html">Inicio</a><a href="../../models-es.html">Modelos</a><a href="../peru.html">Perú</a><a href="../colombia.html">Colombia</a><a href="../chile.html">Chile</a><button class="latam-btn latam-nav-cta" type="button" onclick="openLatamWhatsApp('${esc(model.topic)}')">WhatsApp</button></div></div></nav>
  <main>
    <section class="latam-model-hero"><div class="latam-shell latam-model-hero-grid"><div><div class="latam-country-pill">Toyota · Modelo 2026</div><h1>${esc(model.h1)} <em>${esc(model.h1Accent)}</em></h1><p class="latam-model-lead">${esc(model.intro)}</p><div class="latam-model-price"><strong>${esc(model.guidePrice)}</strong><span>precio guía en China · no es una oferta final</span></div><div class="latam-hero-actions"><button class="latam-btn latam-btn-primary" type="button" onclick="openLatamWhatsApp('${esc(model.topic)}')">Solicitar cotización</button><a class="latam-btn latam-btn-secondary" href="../../${model.englishUrl}?lang=es&amp;from=spanish-model">Ver configuraciones disponibles</a></div></div><div class="latam-model-visual"><img src="../../${model.image}" alt="${esc(model.name)} para exportación desde China" width="640" height="420" fetchpriority="high"><span class="latam-model-visual-badge">${esc(model.body)}</span></div></div></section>
    <section class="latam-proof"><div class="latam-shell latam-proof-grid"><div class="latam-proof-item"><strong>${esc(model.trim)}</strong><span>configuración de referencia</span></div><div class="latam-proof-item"><strong>${esc(model.transmission)}</strong><span>transmisión</span></div><div class="latam-proof-item"><strong>${esc(model.drive)}</strong><span>sistema de tracción</span></div><div class="latam-proof-item"><strong>FOB o EXW</strong><span>según alcance cotizado</span></div></div></section>
    <section class="latam-section"><div class="latam-shell"><div class="latam-heading"><span class="latam-kicker">Ficha de referencia</span><h2>Especificaciones principales del ${esc(model.shortName)}</h2><p>La versión y el equipamiento finales se confirman por escrito antes de la compra.</p></div><div class="latam-model-specs"><div class="latam-model-spec"><small>Versión</small><strong>${esc(model.trim)}</strong></div><div class="latam-model-spec"><small>Carrocería</small><strong>${esc(model.body)}</strong></div><div class="latam-model-spec"><small>Motorización</small><strong>${esc(model.fuel)}</strong></div><div class="latam-model-spec"><small>Tracción</small><strong>${esc(model.drive)}</strong></div></div></div></section>
    <section class="latam-section latam-section-soft"><div class="latam-shell latam-model-copy"><h2>${esc(model.shortName)} para exportación desde China</h2>${model.bodyText.map((text) => `<p>${esc(text)}</p>`).join('')}<h3>Qué se confirma antes de cotizar</h3><ul>${model.benefits.map((item) => `<li>${esc(item)}</li>`).join('')}</ul><div class="latam-model-notice">El precio guía publicado no es el precio final de exportación ni una oferta vinculante. La proforma vigente indicará el precio, la moneda, el plazo, el término comercial y todos los servicios incluidos.</div></div></section>
    <section class="latam-section"><div class="latam-shell latam-country-focus"><article class="latam-focus-card"><span class="latam-kicker">Cotización real</span><h2>Del precio guía a la proforma</h2><p>Confirmamos precio de abastecimiento, cantidad, color, preparación, documentos, ruta interior y punto de entrega. Después emitimos una cotización en USD con vigencia y condiciones.</p><div class="latam-focus-list"><span>Identificación exacta de la versión china</span><span>Alcance FOB o EXW definido por escrito</span><span>Plazo sujeto a disponibilidad y logística</span><span>Validación de importación a cargo del comprador o su agente</span></div></article><aside class="latam-checklist"><h3>Información necesaria</h3><div class="latam-check-grid"><div class="latam-check"><b>País de destino</b>Mercado y ciudad</div><div class="latam-check"><b>Puerto o paso</b>Punto previsto</div><div class="latam-check"><b>Pedido</b>Cantidad y color</div><div class="latam-check"><b>Versión</b>Equipamiento deseado</div><div class="latam-check"><b>Transporte</b>Contenedor o RoRo</div><div class="latam-check"><b>Término</b>FOB o EXW</div></div></aside></div></section>
    <section class="latam-section latam-section-soft"><div class="latam-shell"><div class="latam-heading"><span class="latam-kicker">Mercados de destino</span><h2>Guías para importar vehículos desde China</h2><p>Consulte el proceso general y las validaciones que debe realizar el comprador en su país.</p></div><div class="latam-market-nav"><a class="latam-market-card" href="../peru.html"><b>🇵🇪 Importar autos de China a Perú</b><span>Nuevos por lote y evaluación individual de usados elegibles.</span></a><a class="latam-market-card" href="../colombia.html"><b>🇨🇴 Importar carros de China a Colombia</b><span>Vehículos nuevos, homologación previa y cotización FOB.</span></a><a class="latam-market-card" href="../chile.html"><b>🇨🇱 Importar autos de China a Chile</b><span>Validación técnica y de homologación antes de la compra.</span></a></div></div></section>
    <section class="latam-section"><div class="latam-shell"><div class="latam-heading"><span class="latam-kicker">Comparar modelos</span><h2>Toyota 2026 para exportación</h2></div><div class="latam-market-nav">${relatedCards(model)}</div></div></section>
    <section class="latam-section latam-section-soft"><div class="latam-shell"><div class="latam-heading"><span class="latam-kicker">Preguntas frecuentes</span><h2>Precio, entrega e importación</h2></div><div class="latam-faq">${faq.map(([question, answer]) => `<details><summary>${esc(question)}</summary><p>${esc(answer)}</p></details>`).join('')}</div></div></section>
    <section class="latam-cta"><div class="latam-shell latam-cta-grid"><div><h2>Solicite la cotización del ${esc(model.shortName)}</h2><p>Indique país, cantidad, color, versión y punto de entrega previsto.</p></div><button class="latam-btn latam-btn-primary" type="button" onclick="openLatamWhatsApp('${esc(model.topic)}')">Consultar por WhatsApp</button></div></section>
  </main>
  <footer class="latam-footer"><div class="latam-shell"><span>© 2026 Hangzhou Chemnitz International Trade Co., Ltd.</span><span>Exportador de vehículos registrado en China</span></div></footer>
  <div class="latam-contact-overlay" id="latam-contact-overlay" role="dialog" aria-modal="true" aria-labelledby="latam-contact-title"><div class="latam-contact-modal"><div class="latam-contact-head"><strong id="latam-contact-title">Elija un asesor por WhatsApp</strong><button class="latam-contact-close" type="button" aria-label="Cerrar" onclick="closeLatamWhatsApp()">×</button></div><div class="latam-contact-grid"></div></div></div>
  <script src="../../latam-country.js?v=20260924a"></script>
</body>
</html>
`;
}

fs.mkdirSync(outputDir, { recursive: true });
for (const model of models) {
  fs.writeFileSync(path.join(outputDir, `${model.slug}.html`), page(model));
}
