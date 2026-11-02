// Keep the visible homepage shell aligned with English; retain localized scripts and copy.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const write = (f, text) => fs.writeFileSync(path.join(root, f), text);
const en = read('index.html');
if (en.includes('href="home-layout.css')) {
  console.log('Homepage layout migration already applied; edit home-layout.css directly.');
  process.exit(0);
}
const sectionRE = /<section\b[^>]*>[\s\S]*?<\/section>/g;
const englishSections = en.match(sectionRE);
const authority = englishSections.find(s => s.includes('id="china-vehicle-export-credentials"'));
const copy = {
  fr: ['Qualifications pour l’exportation de véhicules depuis la Chine','Qualifications et documents justificatifs à examiner par les acheteurs professionnels.',
    'Documents de qualification à l’exportation automobile','Hangzhou Chemnitz figure sur la liste 2026 des entreprises titulaires de licences d’exportation automobile du ministère chinois du Commerce, dans le cadre des relations d’exportateur autorisé applicables. Les justificatifs de qualification et d’enregistrement pour les véhicules d’occasion sont disponibles pour vérification. Le véhicule, la relation avec le constructeur et le périmètre de la licence sont confirmés pour chaque commande.',
    'Documents de coopération Nissan','Les documents d’autorisation encadrent la coopération pour l’exportation de véhicules Nissan ; les modèles et destinations concernés sont confirmés pour chaque commande.',
    'Distinctions de l’entreprise','Les documents relatifs aux distinctions de l’entreprise peuvent être consultés avec les modalités de l’opération d’exportation.',
    'Expérience export et équipe de service','L’équipe examine la configuration, les exigences du pays de destination, les documents d’exportation et les conditions de remise convenues pour chaque commande professionnelle.',
    'Voir le document de qualification','Voir le document de la base d’exportation','Voir l’autorisation','Voir la distinction'],
  ru: ['Документы для экспорта автомобилей из Китая','Квалификационные и подтверждающие документы для проверки коммерческими покупателями.',
    'Документы о праве на экспорт автомобилей','Hangzhou Chemnitz включена в перечень предприятий с лицензиями на экспорт автомобилей Министерства коммерции Китая на 2026 год в рамках соответствующих отношений уполномоченного экспортёра. Документы о квалификации и регистрации экспорта подержанных автомобилей доступны для проверки. Автомобиль, отношения с производителем и область действия лицензии подтверждаются для каждого заказа.',
    'Документы о сотрудничестве с Nissan','Документы об авторизации подтверждают сотрудничество по экспорту автомобилей Nissan; модели и направления подтверждаются для каждого заказа.',
    'Награды компании','Документы о наградах компании доступны для ознакомления вместе с условиями конкретной экспортной сделки.',
    'Опыт экспорта и команда сопровождения','Для каждого коммерческого заказа команда проверяет комплектацию, требования страны назначения, экспортные документы и согласованные условия передачи.',
    'Документ о квалификации','Документ экспортной базы','Документ об авторизации','Награда компании'],
  ar: ['وثائق تأهيل تصدير المركبات من الصين','مؤهلات الشركة والوثائق الداعمة لمراجعة المشترين التجاريين.',
    'وثائق تأهيل تصدير السيارات','تُدرج Hangzhou Chemnitz في قائمة وزارة التجارة الصينية لعام 2026 للمؤسسات المرخصة لتصدير السيارات ضمن علاقات المصدّر المعتمد السارية. تتوفر وثائق التأهيل وتسجيل تصدير المركبات المستعملة للمراجعة. يتم تأكيد المركبة والعلاقة مع المصنّع ونطاق رخصة التصدير لكل طلب.',
    'وثائق التعاون مع نيسان','تدعم وثائق التفويض التعاون في تصدير مركبات نيسان؛ ويتم تأكيد الموديلات والوجهات المشمولة لكل طلب.',
    'سجلات تكريم الشركة','تتوفر وثائق تكريم الشركة للمراجعة إلى جانب ترتيبات عملية التصدير المحددة.',
    'خبرة التصدير وفريق الخدمة','يراجع الفريق مواصفات المركبة ومتطلبات الوجهة ووثائق التصدير وشروط التسليم المتفق عليها لكل طلب تجاري.',
    'عرض وثيقة التأهيل','عرض وثيقة قاعدة التصدير','عرض وثيقة التفويض','عرض شهادة التكريم'],
  es: ['Credenciales para exportar vehículos desde China','Cualificaciones de la empresa y documentos justificativos para la revisión de compradores profesionales.',
    'Documentación de cualificación para exportación de automóviles','Hangzhou Chemnitz figura en la lista de empresas con licencia de exportación de automóviles de 2026 del Ministerio de Comercio de China, dentro de las relaciones de exportador autorizado aplicables. La documentación de cualificación y registro para vehículos usados está disponible para su revisión. El vehículo, la relación con el fabricante y el alcance de la licencia se confirman para cada pedido.',
    'Documentación de cooperación con Nissan','La documentación de autorización respalda la cooperación en exportación de vehículos Nissan; los modelos y destinos incluidos se confirman para cada pedido.',
    'Reconocimientos de la empresa','Los documentos de reconocimiento de la empresa están disponibles para su revisión junto con las condiciones de la operación de exportación.',
    'Experiencia exportadora y equipo de servicio','El equipo revisa la configuración, los requisitos del destino, los documentos de exportación y las condiciones de entrega acordadas para cada pedido comercial.',
    'Ver documento de cualificación','Ver documento de la base de exportación','Ver autorización','Ver reconocimiento']
};
function localizedAuthority(lang) {
  const c = copy[lang]; let i = 0;
  let html = authority.replace(/(<h2\b[^>]*>)[\s\S]*?(<\/h2>)/, (_,a,b)=>a+c[0]+b);
  html = html.replace(/(<p\b[^>]*>)[\s\S]*?(<\/p>)/, (_,a,b)=>a+c[1]+b);
  html = html.replace(/(<strong\b[^>]*>)[\s\S]*?(<\/strong>)/g, (_,a,b)=>a+c[2+i++*2]+b);
  i = 0;
  html = html.replace(/(<p\b[^>]*>)([\s\S]*?)(<\/p>)/g, (all,a,text,b)=>{
    if (i++ === 0) return all;
    const links = [...text.matchAll(/<a\b[\s\S]*?<\/a>/g)].map(m=>m[0]);
    const labels = i===2 ? [c[10],c[11]] : i===3 ? [c[12]] : [c[13]];
    return a+c[3+(i-2)*2]+(links.length?' '+links.map((s,j)=>s.replace(/>[^<]*<\/a>/,'>'+labels[j]+'</a>')).join(' · '):'')+b;
  });
  return html;
}
const guideTitle={en:'Destination guides',fr:'Guides par destination',ru:'Информация по странам',ar:'أدلة الوجهات',es:'Guías por destino'};
const paths=['az.html','ar/uae.html','ar/saudi-arabia.html','es/peru.html','tj.html','uz.html','ng.html','es/chile.html','es/colombia.html','es/ecuador.html','es/bolivia.html','es/panama.html','es/republica-dominicana.html'];
const countries={
 en:['Azerbaijan','UAE','Saudi Arabia','Peru','Tajikistan','Uzbekistan','Nigeria','Chile','Colombia','Ecuador','Bolivia','Panama','Dominican Republic'],
 fr:['Azerbaïdjan','Émirats arabes unis','Arabie saoudite','Pérou','Tadjikistan','Ouzbékistan','Nigeria','Chili','Colombie','Équateur','Bolivie','Panama','République dominicaine'],
 ru:['Азербайджан','ОАЭ','Саудовская Аравия','Перу','Таджикистан','Узбекистан','Нигерия','Чили','Колумбия','Эквадор','Боливия','Панама','Доминиканская Республика'],
 ar:['أذربيجان','الإمارات','السعودية','بيرو','طاجيكستان','أوزبكستان','نيجيريا','تشيلي','كولومبيا','الإكوادور','بوليفيا','بنما','جمهورية الدومينيكان'],
 es:['Azerbaiyán','Emiratos Árabes Unidos','Arabia Saudita','Perú','Tayikistán','Uzbekistán','Nigeria','Chile','Colombia','Ecuador','Bolivia','Panamá','República Dominicana']};
const titles={en:'Markets Worldwide',fr:'Marchés internationaux',ru:'Международные рынки',ar:'الأسواق الدولية',es:'Mercados internacionales'};
const tags={en:['Kazakhstan','Russia','UAE &amp; Gulf','Saudi Arabia','Nigeria','Algeria','Uzbekistan','Kyrgyzstan','Kenya &amp; East Africa','Serbia &amp; Balkans','Latin America','SE Asia'],fr:['Kazakhstan','Russie','Émirats et Golfe','Arabie saoudite','Nigeria','Algérie','Ouzbékistan','Kirghizistan','Kenya et Afrique de l’Est','Serbie et Balkans','Amérique latine','Asie du Sud-Est'],ru:['Казахстан','Россия','ОАЭ и страны Залива','Саудовская Аравия','Нигерия','Алжир','Узбекистан','Кыргызстан','Кения и Восточная Африка','Сербия и Балканы','Латинская Америка','Юго-Восточная Азия'],ar:['كازاخستان','روسيا','الإمارات والخليج','السعودية','نيجيريا','الجزائر','أوزبكستان','قيرغيزستان','كينيا وشرق أفريقيا','صربيا والبلقان','أمريكا اللاتينية','جنوب شرق آسيا'],es:['Kazajistán','Rusia','Emiratos y Golfo','Arabia Saudita','Nigeria','Argelia','Uzbekistán','Kirguistán','Kenia y África Oriental','Serbia y Balcanes','América Latina','Sudeste Asiático']};
for (const [lang,file] of Object.entries({en:'index.html',fr:'fr.html',ru:'ru.html',ar:'ar.html',es:'es.html'})) {
 let html=read(file), sections=html.match(sectionRE);
 const markets=sections[1];
 const regionSections=sections.slice(2).filter(s=>s.includes('class="latam-hub"') || (s.includes('ar/uae.html') && !s.includes('class="section"')));
 let marketCopy=markets.replace(/(<h2\b[^>]*>)[\s\S]*?<\/h2>/,(_,a)=>a+titles[lang]+'</h2>');
 const chips='<div class="home-market-chips">'+tags[lang].map(t=>'<span>'+t+'</span>').join('')+'</div>';
 marketCopy=marketCopy.replace(/<div style="display:flex;justify-content:center;flex-wrap:wrap;gap:8px;font-size:0.85em">[\s\S]*?<\/div>/,chips);
 const guideLinks=paths.map((p,i)=>`<a href="${p}" data-market-guide>${countries[lang][i]}</a>`).join('');
 const existingDetails=regionSections.map(s=>s.replace(/^<section\b[^>]*>/,'<div class="home-regional-detail">').replace(/<\/section>$/,'</div>')).join('');
 const guides=`<details class="home-market-guides"><summary>${guideTitle[lang]}</summary><nav class="home-guide-links">${guideLinks}</nav>${existingDetails}</details>`;
 marketCopy=marketCopy.replace(/\s*<\/div>\s*<\/section>$/,guides+'\n  </div>\n</section>');
 html=html.replace(markets,marketCopy);
 for(const s of regionSections) html=html.replace(s,'');
 if(lang!=='en'){
   const old=sections.find(s=>s.includes('max-width:800px;')&&!s.includes('faq-section'));
   if(!old)throw Error('Missing credentials: '+lang);
   html=html.replace(old,localizedAuthority(lang));
 }
 html=html.replace(/<footer>[\s\S]*?<\/footer>/,'<footer>&copy; 2026 Hangzhou Chemnitz International Trade Co., Ltd. · 杭州开姆尼茨国际贸易有限公司</footer>');
 html=html.replace(/class="hero-actions"/g,'class="wa-row hero-actions"');
 // Equal caption structure, without a duplicate line break in localized model introductions.
 html=html.replace(/<br>\s*<span>(Nissan · Toyota ·[^<]*)<\/span>/g,'<span class="lang">$1</span>');
 html=html.replace('</head>','<link rel="stylesheet" href="home-layout.css?v=20261102a">\n</head>');
 write(file,html);
}
// The English stylesheet is the single source of layout rules for all five languages.
const css=en.match(/<style>([\s\S]*?)<\/style>/)[1];
write('home-layout.css', css + `
/* Shared language-safe layout. Text can wrap without altering the module grid. */
.hero-actions{flex-wrap:wrap;gap:12px}
.hero-actions .cta-btn,.hero-actions .catalog-cta{white-space:normal;min-height:56px;padding:14px 30px;font-size:1.02em;justify-content:center}
.featured-grid .card-body{min-height:54px;text-align:start}
.featured-grid h4{min-width:0;overflow-wrap:anywhere}
.featured-grid .brochure-link{white-space:normal;text-align:center;max-width:50%}
.contact-section .company-info{text-align:start}
.contact-choice-modal{background:#f8fafc;border-radius:10px;color:#1a1a2e}
.contact-choice-bar{background:#111827;color:#fff;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;font-size:1.15em;font-weight:700}
.contact-choice-close{border:0;background:transparent;color:#cbd5e1;font-size:32px;cursor:pointer}
.home-market-chips{display:flex;justify-content:center;flex-wrap:wrap;gap:8px;font-size:.85em}
.home-market-chips span{background:rgba(255,255,255,.1);padding:6px 14px;border-radius:50px}
.home-market-guides{margin:16px auto 0;max-width:960px;text-align:start}
.home-market-guides summary{cursor:pointer;text-align:center;font-size:.85em;color:#cbd5e1}
.home-guide-links{display:flex;justify-content:center;flex-wrap:wrap;gap:10px 18px;padding:18px}
.home-guide-links a{color:#fff;font-size:.85em;text-underline-offset:3px}
.home-regional-detail{background:#f8fafc;color:#1a1a2e;padding:24px;border-radius:12px;margin-top:12px}
html[dir="rtl"] .featured-grid .card-body,html[dir="rtl"] .company-info{text-align:start}
html[dir="rtl"] .hero h1{letter-spacing:0}
@media(max-width:640px){.hero-actions{flex-direction:column;align-items:stretch}.hero-actions .cta-btn,.hero-actions .catalog-cta{width:100%}.contact-choice-number{font-size:1em}.contact-choice-link{padding:14px;gap:12px}.contact-avatar{width:56px;height:56px;flex-basis:56px}}
`);
