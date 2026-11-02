const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const root = path.resolve(__dirname, '..');
(async () => {
 const browser = await chromium.launch({executablePath:process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 try {
  for (const width of process.env.VIEWPORTS ? process.env.VIEWPORTS.split(',').map(Number) : [1440,768,390]) {
   let reference;
   for (const file of ['index.html','fr.html','ru.html','ar.html','es.html']) {
    const page = await browser.newPage({viewport:{width,height:1000}});
    const errors=[]; page.on('pageerror', e=>errors.push(e.message));
    await page.goto(pathToFileURL(path.join(root,file)).href,{waitUntil:'load'});
    const result=await page.evaluate(()=>{
     const styles=(selector)=>{const s=getComputedStyle(document.querySelector(selector));return [s.maxWidth,s.padding,s.gap,s.gridTemplateColumns,s.fontSize,s.lineHeight]};
     return {overflow:document.documentElement.scrollWidth>innerWidth,sections:[...document.querySelectorAll('body > section')].map(e=>e.className || 'markets'),cards:[...document.querySelectorAll('.featured-grid .model-card')].map(e=>e.dataset.title),buttons:[...document.querySelectorAll('.featured-grid .model-card')].map(e=>e.querySelectorAll('.brochure-link').length),credentials:document.querySelectorAll('#china-vehicle-export-credentials strong').length,styles:['.hero','.featured-grid','.special-grid','.company-info-layout','.faq-section'].map(styles),guides:document.querySelectorAll('.home-guide-links a').length};
    });
    assert.equal(errors.length,0,`${file} script errors: ${errors}`);
    assert.equal(result.overflow,false,`${file}/${width} horizontal overflow`);
    assert.equal(result.credentials,4,file+' credentials');
    assert.equal(result.guides,13,file+' guide links');
    assert.ok(result.buttons.every(n=>n===1),file+' duplicate/missing model buttons: '+result.buttons);
    if (!reference) reference=result;
    else {assert.deepEqual(result.sections,reference.sections,file+' section order');assert.deepEqual(result.cards,reference.cards,file+' model order');assert.deepEqual(result.styles,reference.styles,file+' shared layout styles');}
    await page.screenshot({path:`/tmp/chemnitz-layout-${width}-${file}.png`,fullPage:true});
    if(width===390) await page.screenshot({path:`/tmp/chemnitz-hero-${file}.png`});
    await page.locator('.hero .cta-btn').click();
    assert.equal(await page.locator('.contact-choice-link:visible').count(),5,file+' contacts');
    const contactOverflow=await page.locator('.contact-choice-modal:visible').evaluate(e=>e.scrollWidth>e.clientWidth+1);
    assert.equal(contactOverflow,false,file+' contact overflow');
    if(width===390){
     await page.goto(pathToFileURL(path.join(root,file)).href,{waitUntil:'load'});
     await page.locator('.featured-grid .brochure-link').first().click();
     const option=page.locator('.config-menu-option:visible,.chemnitz-config-menu-option:visible').first();
     await option.waitFor();
     await option.click();
     await page.waitForURL(url=>url.pathname.includes('vehicle-config-'));
     const target=new URL(page.url());
     assert.equal(target.searchParams.get('lang'),file==='index.html'?'en':file.split('.')[0],file+' config language');
     assert.ok(target.searchParams.get('specid'),file+' missing configuration ID');
     assert.equal(target.searchParams.get('from'),'home',file+' home attribution');
     console.log('PASS configuration navigation',file);
    }
    await page.close();
    console.log('PASS',file,width);
   }
  }
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
