(function () {
  'use strict';

  if (window.__chemnitzAnalyticsEventsLoaded) return;
  window.__chemnitzAnalyticsEventsLoaded = true;

  var measurementId = 'G-PEL4QMFR44';
  var whatsappContacts = {
    '8615913687692': 'Natalie',
    '8613640033268': 'Darwin',
    '8613826126147': 'Jacky'
  };

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  var hasGoogleTagLoader = Boolean(
    document.querySelector('script[src*="googletagmanager.com/gtag/js?id=' + measurementId + '"]')
  );
  if (!hasGoogleTagLoader) {
    var loader = document.createElement('script');
    loader.async = true;
    loader.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.appendChild(loader);
    window.gtag('js', new Date());
    window.gtag('config', measurementId);
  }

  function clean(value, maxLength) {
    return String(value == null ? '' : value).trim().slice(0, maxLength || 100);
  }

  function pageLanguage() {
    var language = (document.documentElement.lang || 'en').toLowerCase();
    return clean(language.split('-')[0], 12);
  }

  function defaultContext() {
    return {
      model_name: '',
      trim_name: '',
      guide_price: '',
      contact_name: '',
      page_language: pageLanguage(),
      source_page: clean(window.location.pathname || '/', 100)
    };
  }

  function normalizedContext(context) {
    var source = Object.assign(defaultContext(), context || {});
    return {
      model_name: clean(source.model_name || source.model, 100),
      trim_name: clean(source.trim_name || source.trim, 100),
      guide_price: clean(source.guide_price, 40),
      contact_name: clean(source.contact_name, 40),
      page_language: clean(source.page_language || pageLanguage(), 12),
      source_page: clean(source.source_page || window.location.pathname || '/', 100)
    };
  }

  window.chemnitzConsultationContext = normalizedContext(window.chemnitzConsultationContext);

  window.chemnitzSetConsultationContext = function (context) {
    window.chemnitzConsultationContext = normalizedContext(
      Object.assign({}, window.chemnitzConsultationContext || {}, context || {})
    );
    return window.chemnitzConsultationContext;
  };

  window.chemnitzTrack = function (eventName, params) {
    if (!eventName || typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, Object.assign({
      page_language: pageLanguage(),
      source_page: clean(window.location.pathname || '/', 100)
    }, params || {}));
  };

  function modelNameFromCard(card) {
    if (!card) return '';
    var heading = card.querySelector('h3, h4, .model-name, .card-title');
    return clean(
      card.getAttribute('data-title') ||
      card.getAttribute('data-model') ||
      (heading && heading.textContent) ||
      card.textContent,
      100
    );
  }

  function whatsappPhone(link) {
    var raw = [
      link.getAttribute('data-wa-number') || '',
      link.getAttribute('href') || ''
    ].join(' ');
    var match = raw.match(/(?:phone=|wa\.me\/)(\d{8,15})/i);
    return match ? match[1] : '';
  }

  function contactName(link) {
    var explicit = link.getAttribute('data-contact') || link.getAttribute('data-contact-name');
    if (explicit) return clean(explicit, 40);
    var phone = whatsappPhone(link);
    if (phone && whatsappContacts[phone]) return whatsappContacts[phone];
    var label = link.querySelector('span');
    if (label && !/\d{6,}/.test(label.textContent || '')) return clean(label.textContent, 40);
    return '';
  }

  function whatsappContext(link) {
    var context = normalizedContext(window.chemnitzConsultationContext);
    context.contact_name = contactName(link);
    context.link_url = clean((link.href || '').split('?')[0], 200);
    context.link_text = clean(link.textContent, 100);
    context.transport_type = 'beacon';
    return context;
  }

  document.addEventListener('click', function (event) {
    var whatsappLink = event.target.closest(
      'a[href*="wa.me"], a[href*="api.whatsapp.com"], a[data-wa-number]'
    );
    if (whatsappLink) {
      window.chemnitzTrack('whatsapp_click', whatsappContext(whatsappLink));
      return;
    }

    var pdfLink = event.target.closest('a[href$=".pdf"], a[href*=".pdf?"]');
    if (pdfLink) {
      window.chemnitzTrack('config_pdf_open', Object.assign(
        normalizedContext(window.chemnitzConsultationContext),
        { link_url: clean(pdfLink.href, 200) }
      ));
      return;
    }

    var priceOption = event.target.closest('.config-menu-option, .config-option, .config-card');
    if (priceOption) {
      window.chemnitzTrack('guide_price_select', {
        model_name: clean(window.currentConfigModel, 100),
        trim_name: clean(priceOption.textContent, 100)
      });
      return;
    }

    var orderButton = event.target.closest(
      '.config-order-btn, a.config-btn, .config-consult-card, .special-consult'
    );
    if (orderButton) {
      window.chemnitzTrack('preorder_click', {
        model_name: clean(window.currentConfigModel, 100),
        link_url: clean(orderButton.href || '', 200)
      });
      return;
    }

    var card = event.target.closest('.model-card');
    if (card) {
      window.chemnitzTrack('model_card_click', {
        model_name: modelNameFromCard(card)
      });
    }
  });

  function inferConfigurationContext() {
    if (window.location.pathname.indexOf('/vehicle-config-') === -1) return;

    var params = new URLSearchParams(window.location.search);
    var page = window.vehicleConfigPage || {};
    var titleNode = document.getElementById('vehicle-title');
    var priceNode = document.getElementById('vehicle-price');
    var title = clean(page.title || (titleNode && titleNode.textContent) || document.title, 100);
    var price = clean(page.price || (priceNode && priceNode.textContent) || '', 40);
    var slugMatch = window.location.pathname.match(/vehicle-config-([^/.]+)\.html$/);
    var models = {
      'bz3': 'Toyota bZ3',
      'camry': 'Toyota Camry',
      'corolla-cross': 'Toyota Corolla Cross',
      'corolla': 'Toyota Corolla',
      'granvia': 'Toyota Granvia',
      'highlander': 'Toyota Highlander',
      'nx8': 'Nissan NX8',
      'qashqai': 'Nissan Qashqai',
      'rav4': 'Toyota RAV4',
      'sylphy': 'Nissan Sylphy',
      'wildlander': 'Toyota Wildlander',
      'xtrail': 'Nissan X-Trail'
    };
    var model = slugMatch ? (models[slugMatch[1]] || slugMatch[1]) : '';
    var context = window.chemnitzSetConsultationContext({
      model_name: model,
      trim_name: title,
      guide_price: price,
      page_language: params.get('lang') || pageLanguage(),
      source_page: params.get('from') || window.location.pathname
    });
    window.chemnitzTrack('config_sheet_view', context);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inferConfigurationContext, { once: true });
  } else {
    inferConfigurationContext();
  }
})();
