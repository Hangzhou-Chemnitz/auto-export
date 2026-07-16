(function(){
  var page=window.vehicleConfigPage||{};
  var routes={
    'vehicle-config-qashqai.html':{pdf:'documents/nissan-qashqai-2025-2l-cvt-config.pdf',dir:'documents/qashqai-config-pages',pages:6},
    'vehicle-config-xtrail.html':{pdf:'documents/nissan-xtrail-2025-leading-config.pdf',dir:'documents/xtrail-config-pages',pages:8},
    'vehicle-config-nx8.html':{pdf:'documents/nissan-nx8-2026-310-max-config.pdf',dir:'documents/nx8-config-pages',pages:8},
    'vehicle-config-rav4.html':{pdf:'documents/toyota-rav4-2026-2l-awd-config.pdf',dir:'documents/rav4-config-pages'},
    'vehicle-config-camry.html':{pdf:'documents/toyota-camry-2026-hybrid-2l-elite-config.pdf',dir:'documents/camry-config-pages'},
    'vehicle-config-highlander.html':{pdf:'documents/toyota-highlander-2026-380t-awd-7seat-config.pdf',dir:'documents/highlander-config-pages'},
    'vehicle-config-corolla-cross.html':{pdf:'documents/toyota-corolla-cross-2024-2l-pioneer-config.pdf',dir:'documents/corolla-cross-config-pages'}
  };
  var camryVariants={
    '73997':{title:'Toyota Camry 2026 2.0E Elite',price:'171,800',pdf:'documents/toyota-camry-2026-2l-gasoline-171800-config.pdf',dir:'documents/camry-gasoline-171800-config-pages'},
    '73998':{title:'Toyota Camry 2026 2.0GVP Luxury',price:'181,800',pdf:'documents/toyota-camry-2026-2l-gasoline-181800-config.pdf',dir:'documents/camry-gasoline-181800-config-pages'},
    '73999':{title:'Toyota Camry 2026 2.0G Premium',price:'191,800',pdf:'documents/toyota-camry-2026-2l-gasoline-191800-config.pdf',dir:'documents/camry-gasoline-191800-config-pages'},
    '74000':{title:'Toyota Camry 2026 2.0S Sport',price:'196,800',pdf:'documents/toyota-camry-2026-2l-gasoline-196800-config.pdf',dir:'documents/camry-gasoline-196800-config-pages'},
    '74001':{title:'Toyota Camry 2026 Hybrid 2.0HE Elite',price:'179,800',pdf:'documents/toyota-camry-2026-hybrid-2l-elite-config.pdf',dir:'documents/camry-config-pages'},
    '74002':{title:'Toyota Camry 2026 Hybrid 2.0HGVP Luxury',price:'189,800',pdf:'documents/toyota-camry-2026-hybrid-2l-189800-config.pdf',dir:'documents/camry-hybrid-189800-config-pages'},
    '74005':{title:'Toyota Camry 2026 Hybrid 2.0HSE Sport Lite',price:'191,800',pdf:'documents/toyota-camry-2026-hybrid-2l-191800-config.pdf',dir:'documents/camry-hybrid-191800-config-pages'},
    '76167':{title:'Toyota Camry 2026 Hybrid 2.0HSE Radiance',price:'194,800',pdf:'documents/toyota-camry-2026-hybrid-2l-194800-config.pdf',dir:'documents/camry-hybrid-194800-config-pages'},
    '74003':{title:'Toyota Camry 2026 Hybrid 2.0HG Premium',price:'202,800',pdf:'documents/toyota-camry-2026-hybrid-2l-202800-config.pdf',dir:'documents/camry-hybrid-202800-config-pages'},
    '74006':{title:'Toyota Camry 2026 Hybrid 2.0HS Sport',price:'204,800',pdf:'documents/toyota-camry-2026-hybrid-2l-204800-config.pdf',dir:'documents/camry-hybrid-204800-config-pages'},
    '74004':{title:'Toyota Camry 2026 Hybrid 2.0HG Radiance',price:'205,800',pdf:'documents/toyota-camry-2026-hybrid-2l-205800-config.pdf',dir:'documents/camry-hybrid-205800-config-pages'},
    '74007':{title:'Toyota Camry 2026 Hybrid 2.0HXS Sport Plus',price:'206,800',pdf:'documents/toyota-camry-2026-hybrid-2l-206800-config.pdf',dir:'documents/camry-hybrid-206800-config-pages'},
    '77199':{title:'Toyota Camry 2026 Hybrid 2.0HXS Radiance (Matte Gold)',price:'209,800',pdf:'documents/toyota-camry-2026-hybrid-2l-209800-config.pdf',dir:'documents/camry-hybrid-209800-config-pages'},
    '74008':{title:'Toyota Camry 2026 Hybrid 2.0HXS Radiance (Matte Gray)',price:'211,800',pdf:'documents/toyota-camry-2026-hybrid-2l-211800-config.pdf',dir:'documents/camry-hybrid-211800-config-pages'},
    '74010':{title:'Toyota Camry 2026 Hybrid 2.5HXS Sport Plus',price:'226,800',pdf:'documents/toyota-camry-2026-hybrid-2-5l-226800-config.pdf',dir:'documents/camry-hybrid-226800-config-pages'},
    '74011':{title:'Toyota Camry 2026 Hybrid 2.5HQ Flagship',price:'259,800',pdf:'documents/toyota-camry-2026-hybrid-2-5l-259800-config.pdf',dir:'documents/camry-hybrid-259800-config-pages'}
  };
  var filename=location.pathname.split('/').pop();
  var route=routes[filename];
  if(filename==='vehicle-config-camry.html'){
    var specid=new URLSearchParams(location.search).get('specid')||'74001';
    var camryVariant=camryVariants[specid]||camryVariants['74001'];
    route={pdf:camryVariant.pdf,dir:camryVariant.dir,pages:8};
    page.title=camryVariant.title;
    page.price=camryVariant.price;
    page.summary='Selected guide-price configuration for Toyota Camry FOB export consultation.';
  }
  var title=document.getElementById('vehicle-title');
  var price=document.getElementById('vehicle-price');
  var summary=document.getElementById('vehicle-summary');
  var sections=document.getElementById('config-sections');
  var modal=document.getElementById('contact-overlay');
  var backLink=document.getElementById('back-link');
  if(page.title) document.title=page.title+' Configuration Sheet | Chemnitz';
  if(title) title.textContent=page.title||'';
  if(price) price.textContent='Guide price: RMB '+(page.price||'TBD')+' · FOB export consultation';
  if(summary) summary.textContent=page.summary||'Configuration summary for export consultation.';
  if(backLink) backLink.href=page.backLink||'index.html#models';
  if(route){
    var nav=document.querySelector('.viewer-actions');
    var consultButton=nav&&nav.querySelector('.primary');
    var pdfLink=document.createElement('a');
    pdfLink.href=route.pdf;
    pdfLink.target='_blank';
    pdfLink.rel='noopener';
    pdfLink.textContent='Open PDF';
    if(nav) nav.insertBefore(pdfLink,consultButton||null);

    var oldShell=document.querySelector('.sheet-shell');
    var pdfShell=document.createElement('section');
    pdfShell.className='pdf-shell';
    pdfShell.setAttribute('aria-label',(page.title||'Vehicle')+' configuration sheet');
    var pages=document.createElement('div');
    pages.className='config-pages';
    for(var pageNumber=1;pageNumber<=(route.pages||2);pageNumber+=1){
      var image=document.createElement('img');
      image.className='config-page';
      image.src=route.dir+'/page-'+pageNumber+'.png';
      image.alt=(page.title||'Vehicle')+' configuration sheet page '+pageNumber;
      if(pageNumber>1) image.loading='lazy';
      pages.appendChild(image);
    }
    pdfShell.appendChild(pages);
    if(oldShell) oldShell.replaceWith(pdfShell);
  }
  if(sections&&!route){
    (page.sections||[]).forEach(function(section){
      var block=document.createElement('section');
      block.className='config-section';
      var heading=document.createElement('h3');
      heading.textContent=section.title;
      block.appendChild(heading);
      var table=document.createElement('table');
      table.className='config-table';
      var body=document.createElement('tbody');
      (section.rows||[]).forEach(function(row){
        var tr=document.createElement('tr');
        var th=document.createElement('th');
        var td=document.createElement('td');
        th.textContent=row[0];
        td.textContent=row[1];
        tr.appendChild(th); tr.appendChild(td); body.appendChild(tr);
      });
      table.appendChild(body); block.appendChild(table); sections.appendChild(block);
    });
  }
  var message='Hello, I want to consult '+(page.title||'this vehicle')+'.';
  document.querySelectorAll('[data-wa-number]').forEach(function(link){
    link.href='https://wa.me/'+link.getAttribute('data-wa-number')+'?text='+encodeURIComponent(message);
  });
  window.openWhatsAppChooser=function(){if(modal) modal.classList.add('open')};
  window.closeWhatsAppChooser=function(){if(modal) modal.classList.remove('open')};
  if(modal) modal.addEventListener('click',function(event){if(event.target===modal) window.closeWhatsAppChooser()});
})();
