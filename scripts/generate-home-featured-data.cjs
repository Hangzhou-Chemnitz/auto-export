// Export the existing English homepage's featured choices without changing vehicle data.
const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
(async()=>{
 const root=path.resolve(__dirname,'..');
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
 try {
  const page=await browser.newPage();
  await page.goto(pathToFileURL(path.join(root,'index.html')).href);
  const data=await page.evaluate(()=>Object.fromEntries([...document.querySelectorAll('.featured-grid .model-card')].map(card=>{
   const name=card.dataset.title;
   return [name,{trims:configData[name].trims.map(t=>({name:t.name,price:t.price,msrp:t.msrp,specid:t.specid,_homeSheetUrl:configSheetUrl(name,t)}))}];
  })));
  fs.writeFileSync(path.join(root,'home-featured-data.js'),'// Generated from the English homepage by scripts/generate-home-featured-data.cjs.\nwindow.ChemnitzHomeModels = '+JSON.stringify(data,null,2)+';\n');
  for(const file of ['fr.html','ar.html','ru.html']){
   let text=fs.readFileSync(path.join(root,file),'utf8');
   if(!text.includes('src="home-featured-data.js'))text=text.replace('<script src="localized-home-config-picker.js','<script src="home-featured-data.js?v=20261102a"></script>\n<script src="localized-home-config-picker.js');
   fs.writeFileSync(path.join(root,file),text);
  }
  console.log('Exported',Object.keys(data).length,'featured models');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
