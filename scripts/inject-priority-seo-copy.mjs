import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const pages = {
  'vehicle-config-camry.html': `
<section class="seo-copy" aria-labelledby="camry-export-title"><div class="seo-copy-card">
  <h2 id="camry-export-title">Toyota Camry 2026 Hybrid price and export quotation from China</h2>
  <p>This page shows the China-market Toyota Camry 2026 Hybrid 2.0HE Elite, including its RMB 179,800 manufacturer guide price and core specifications. The guide price is a reference for model comparison; it is not a final FOB or EXW export offer.</p>
  <p>A final quotation is prepared after the exact trim, color, quantity, destination and delivery term are confirmed. Importers should also verify local homologation, emissions, tax and registration requirements before ordering.</p>
  <h3>Related Toyota models and Spanish market guides</h3>
  <div class="seo-link-grid"><a href="vehicle-config-rav4.html">Toyota RAV4 2026 price and specs</a><a href="vehicle-config-corolla-cross.html">Toyota Corolla Cross 2026 price and specs</a><a href="es/modelos/toyota-camry-2026.html" hreflang="es">Toyota Camry 2026 desde China</a><a href="es/peru.html">Import cars from China to Peru</a><a href="es/colombia.html">Import cars from China to Colombia</a><a href="es/chile.html">Import cars from China to Chile</a></div>
</div></section>`,
  'vehicle-config-rav4.html': `
<section class="seo-copy" aria-labelledby="rav4-export-title"><div class="seo-copy-card">
  <h2 id="rav4-export-title">Toyota RAV4 2026 price, specifications and export options from China</h2>
  <p>This reference configuration is the China-market Toyota RAV4 2026 2.0L gasoline AWD with a manufacturer guide price of RMB 189,800. It helps importers compare the powertrain, drive system and equipment before requesting a vehicle export quotation.</p>
  <p>The final FOB or EXW price depends on the selected trim, quantity, color, sourcing conditions, inland logistics and agreed services. Local import eligibility and homologation remain subject to the destination market.</p>
  <h3>Compare Toyota export models</h3>
  <div class="seo-link-grid"><a href="vehicle-config-camry.html">Toyota Camry 2026 Hybrid</a><a href="vehicle-config-corolla-cross.html">Toyota Corolla Cross 2026</a><a href="es/modelos/toyota-rav4-2026.html" hreflang="es">Toyota RAV4 2026 desde China</a><a href="models.html">Cars for export from China</a><a href="es/peru.html">Peru import guide</a><a href="es/chile.html">Chile import guide</a></div>
</div></section>`,
  'vehicle-config-corolla-cross.html': `
<section class="seo-copy" aria-labelledby="corolla-cross-export-title"><div class="seo-copy-card">
  <h2 id="corolla-cross-export-title">Toyota Corolla Cross 2026 price and export specifications from China</h2>
  <p>The displayed Toyota Corolla Cross 2026 2.0L gasoline Elite is a China-market reference configuration with a manufacturer guide price of RMB 136,800. Buyers can use the static specifications to identify the intended trim before an export quote is prepared.</p>
  <p>FOB and EXW quotations are calculated from the confirmed configuration, quantity, color, sourcing price, inland route and requested export services. The buyer should confirm destination-country compliance before payment.</p>
  <h3>Related models and import information</h3>
  <div class="seo-link-grid"><a href="vehicle-config-rav4.html">Toyota RAV4 2026</a><a href="vehicle-config-camry.html">Toyota Camry 2026 Hybrid</a><a href="es/modelos/toyota-corolla-cross-2026.html" hreflang="es">Toyota Corolla Cross 2026 desde China</a><a href="models.html">China export vehicle catalog</a><a href="es/colombia.html">Colombia import guide</a><a href="es/chile.html">Chile import guide</a></div>
</div></section>`,
  'vehicle-config-qashqai.html': `
<section class="seo-copy" aria-labelledby="qashqai-export-title"><div class="seo-copy-card">
  <h2 id="qashqai-export-title">Nissan Qashqai 2025 price, specifications and export consultation from China</h2>
  <p>This page identifies the China-market Nissan Qashqai 2025 Honor 2.0L CVT XV+ Leading and its RMB 134,900 manufacturer guide price. The visible specifications support model verification before an importer requests an FOB or EXW quotation.</p>
  <p>The final export price varies with the confirmed trim, color, order quantity, current sourcing conditions and delivery point. Import regulations, homologation and registration must be checked in the destination country.</p>
  <h3>Compare Nissan export models</h3>
  <div class="seo-link-grid"><a href="vehicle-config-xtrail.html">Nissan X-Trail 2025 price and specs</a><a href="vehicle-config-sylphy-2026.html">Nissan Sylphy 2026 price and specs</a><a href="models.html">Cars for export from China</a><a href="models-es.html" hreflang="es">Catálogo de autos de China</a></div>
</div></section>`,
  'vehicle-config-xtrail.html': `
<section class="seo-copy" aria-labelledby="xtrail-export-title"><div class="seo-copy-card">
  <h2 id="xtrail-export-title">Nissan X-Trail 2025 price, specifications and export options from China</h2>
  <p>The China-market Nissan X-Trail 2025 2.0L configuration is presented with its manufacturer guide price and key equipment for comparison. These details help buyers verify the intended vehicle before requesting a current export quotation.</p>
  <p>A final FOB or EXW quote is based on the exact trim, color, quantity, sourcing price, inland transport and services agreed in writing. Buyers remain responsible for confirming import eligibility at destination.</p>
  <h3>Related Nissan models and catalogs</h3>
  <div class="seo-link-grid"><a href="vehicle-config-qashqai.html">Nissan Qashqai 2025 price and specs</a><a href="vehicle-config-sylphy-2026.html">Nissan Sylphy 2026</a><a href="models.html">China vehicle export catalog</a><a href="models-es.html" hreflang="es">Catálogo en español</a></div>
</div></section>`
};

for (const [file, block] of Object.entries(pages)) {
  const target = path.join(root, file);
  const source = fs.readFileSync(target, 'utf8');
  if (source.includes('class="seo-copy"')) continue;
  const marker = '</section></main>';
  const matches = source.split(marker).length - 1;
  if (matches !== 1) throw new Error(`${file}: expected one ${marker}, found ${matches}`);
  fs.writeFileSync(target, source.replace(marker, `</section>${block}</main>`));
}
