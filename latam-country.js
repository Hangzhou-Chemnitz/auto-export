(function () {
  'use strict';

  var contacts = [
    { name: 'Jacky', number: '+86 138 26126147', wa: '8613826126147', avatar: 'jacky-v2.jpg' },
    { name: 'Chloe', number: '+86 15625033581', wa: '8615625033581', avatar: 'chloe.jpg' },
    { name: 'Natalie', number: '+86 15913687692', wa: '8615913687692', avatar: 'natalie.jpg' },
    { name: 'Darwin', number: '+86 136 40033268', wa: '8613640033268', avatar: 'darwin.jpg' },
    { name: 'Zeeshan', number: '+86 185 1144 5792', wa: '8618511445792', avatar: 'zeeshan-v3.jpg' }
  ];

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function pageContext() {
    var root = document.documentElement;
    return {
      country: root.getAttribute('data-country-name') || 'América Latina',
      market: root.getAttribute('data-market') || 'LATAM',
      assetBase: root.getAttribute('data-asset-base') || '../'
    };
  }

  function message(topic) {
    var context = pageContext();
    var subject = topic || 'vehículos disponibles';
    var mentionsCountry = subject.toLocaleLowerCase('es').indexOf(context.country.toLocaleLowerCase('es')) !== -1;
    var destination = mentionsCountry ? '' : ' para ' + context.country;
    return [
      'Hola, deseo consultar sobre ' + subject + destination + '.',
      'Por favor, indíqueme las configuraciones disponibles, el precio de exportación, las opciones FOB/EXW y los documentos aplicables.',
      'Página de referencia: ' + window.location.href.split('#')[0]
    ].join('\n');
  }

  function track(name, params) {
    if (typeof window.chemnitzTrack === 'function') {
      window.chemnitzTrack(name, Object.assign({ target_market: pageContext().market }, params || {}));
    }
  }

  window.openLatamWhatsApp = function (topic) {
    var overlay = document.getElementById('latam-contact-overlay');
    if (!overlay) return;
    var context = pageContext();
    var encoded = encodeURIComponent(message(topic));
    var html = '';
    contacts.forEach(function (contact) {
      var avatar = context.assetBase + 'images/contacts/' + contact.avatar;
      html += '<a class="latam-contact" data-contact-name="' + esc(contact.name) + '" data-wa-number="' + esc(contact.wa) + '" href="https://wa.me/' + esc(contact.wa) + '?text=' + encoded + '" target="_self" rel="noopener">';
      html += '<img src="' + esc(avatar) + '" alt="' + esc(contact.name) + '" width="54" height="54" loading="lazy" decoding="async">';
      html += '<span><strong>' + esc(contact.name) + '</strong><span>' + esc(contact.number) + '</span></span></a>';
    });
    var grid = overlay.querySelector('.latam-contact-grid');
    if (grid) grid.innerHTML = html;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    track('latam_contact_choice_open', { topic: topic || 'general', destination_country: context.country });
  };

  window.closeLatamWhatsApp = function () {
    var overlay = document.getElementById('latam-contact-overlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.addEventListener('click', function (event) {
    var overlay = document.getElementById('latam-contact-overlay');
    if (overlay && event.target === overlay) window.closeLatamWhatsApp();

    var marketLink = event.target.closest('[data-market-link]');
    if (marketLink) {
      track('market_page_click', {
        destination_country: marketLink.getAttribute('data-market-link') || '',
        link_url: marketLink.href || ''
      });
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') window.closeLatamWhatsApp();
  });
})();
