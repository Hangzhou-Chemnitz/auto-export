(function () {
  'use strict';

  if (window.__chemnitzAnalyticsEventsLoaded) return;
  window.__chemnitzAnalyticsEventsLoaded = true;

  var measurementId = 'G-PEL4QMFR44';
  var hostname = String(window.location.hostname || '').toLowerCase();
  var productionHosts = {
    'hzchemnitz.cn': true,
    'www.hzchemnitz.cn': true
  };
  var analyticsEnabled = typeof window.__chemnitzAnalyticsEnabled === 'boolean'
    ? window.__chemnitzAnalyticsEnabled
    : window.location.protocol === 'https:' && Boolean(productionHosts[hostname]);

  window.__chemnitzAnalyticsEnabled = analyticsEnabled;
  window.__chemnitzAnalyticsDisabled = !analyticsEnabled;

  if (!analyticsEnabled) {
    window.chemnitzTrack = function () {};
    window.chemnitzSetConsultationContext = function (context) {
      window.chemnitzConsultationContext = Object.assign({}, context || {});
      return window.chemnitzConsultationContext;
    };
    return;
  }

  var whatsappContacts = {
    '8615625033581': 'Chloe',
    '8615913687692': 'Natalie',
    '8613640033268': 'Darwin',
    '8613826126147': 'Jacky',
    '8618511445792': 'Zeeshan'
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

  var marketSessionKey = 'chemnitz_target_market';
  var marketSessionTtl = 30 * 60 * 1000;
  var inheritableMarkets = {
    'PE': true,
    'CO': true,
    'CL': true,
    'LATAM': true
  };

  function pageLocale() {
    return clean(document.documentElement.lang || 'en', 20);
  }

  function pageLanguage() {
    var language = pageLocale().toLowerCase();
    return clean(language.split('-')[0], 12);
  }

  function pageType() {
    var body = document.body;
    return clean(
      document.documentElement.getAttribute('data-page-type') ||
      (body && body.getAttribute('data-page-type')) ||
      '',
      40
    );
  }

  function normalizeMarket(value) {
    var market = clean(value, 20).toUpperCase().replace(/[^A-Z0-9_-]/g, '');
    return market;
  }

  function explicitMarket() {
    var body = document.body;
    return normalizeMarket(
      document.documentElement.getAttribute('data-market') ||
      (body && body.getAttribute('data-market')) ||
      ''
    );
  }

  function queryMarket() {
    try {
      var market = normalizeMarket(new URLSearchParams(window.location.search).get('market'));
      return market === 'PE' || market === 'CO' || market === 'CL' ? market : '';
    } catch (error) {
      return '';
    }
  }

  function isSpanishJourney() {
    var params = new URLSearchParams(window.location.search);
    return pageLanguage() === 'es' ||
      clean(params.get('lang'), 12).toLowerCase() === 'es' ||
      /(?:^|\/)models-es\.html$/i.test(window.location.pathname || '');
  }

  function sameOriginReferrerPath() {
    if (!document.referrer) return '';
    try {
      var referrer = new URL(document.referrer);
      if (referrer.origin !== window.location.origin) return '';
      return referrer.pathname || '/';
    } catch (error) {
      return '';
    }
  }

  function readInheritedMarket() {
    if (!isSpanishJourney()) return '';
    var referrerPath = sameOriginReferrerPath();
    if (!referrerPath) return '';

    try {
      var stored = JSON.parse(window.sessionStorage.getItem(marketSessionKey) || 'null');
      var market = normalizeMarket(stored && stored.market);
      var updatedAt = Number(stored && stored.updated_at) || 0;
      var sourcePath = clean(stored && stored.source_page, 100);
      if (!inheritableMarkets[market]) return '';
      if (!updatedAt || Date.now() - updatedAt > marketSessionTtl) return '';
      if (!sourcePath || sourcePath !== referrerPath) return '';
      return market;
    } catch (error) {
      return '';
    }
  }

  function rememberMarket(market) {
    var normalized = normalizeMarket(market);
    if (!inheritableMarkets[normalized]) return;
    try {
      window.sessionStorage.setItem(marketSessionKey, JSON.stringify({
        market: normalized,
        updated_at: Date.now(),
        source_page: clean(window.location.pathname || '/', 100)
      }));
    } catch (error) {
      // Analytics must never block navigation when storage is unavailable.
    }
  }

  function resolveTargetMarket() {
    var market = queryMarket();
    if (market) return market;

    market = explicitMarket();
    if (market) return market;

    var localeParts = pageLocale().split('-');
    if (localeParts.length > 1 && localeParts[0].toLowerCase() === 'es') {
      market = normalizeMarket(localeParts[1]);
      if (market) return market;
    }

    market = readInheritedMarket();
    if (market) return market;
    return isSpanishJourney() ? 'LATAM' : '';
  }

  var resolvedTargetMarket = resolveTargetMarket();
  if (explicitMarket() || (resolvedTargetMarket && resolvedTargetMarket !== 'LATAM' && isSpanishJourney())) {
    rememberMarket(resolvedTargetMarket);
  }

  function targetMarket() {
    return resolvedTargetMarket;
  }

  function defaultContext() {
    return {
      model_name: '',
      trim_name: '',
      guide_price: '',
      contact_name: '',
      page_language: pageLanguage(),
      page_locale: pageLocale(),
      target_market: targetMarket(),
      page_type: pageType(),
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
      page_locale: clean(source.page_locale || pageLocale(), 20),
      target_market: normalizeMarket(source.target_market || targetMarket()),
      page_type: clean(source.page_type || pageType(), 40),
      source_page: clean(source.source_page || window.location.pathname || '/', 100)
    };
  }

  function configurationContext(context) {
    var normalized = normalizedContext(context);
    if (!normalized.contact_name) normalized.contact_name = 'not_selected';
    return normalized;
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
    var eventParams = Object.assign({}, params || {});
    var context = normalizedContext(Object.assign(
      {},
      window.chemnitzConsultationContext || {},
      eventParams
    ));
    window.gtag('event', eventName, Object.assign({}, eventParams, context));
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

  function marketFromLink(link) {
    var market = normalizeMarket(
      link.getAttribute('data-market-link') ||
      link.getAttribute('data-market') ||
      ''
    );
    if (market) return market;

    var href = clean(link.getAttribute('href'), 200).toLowerCase();
    if (/\/peru\.html(?:[?#]|$)/.test(href)) return 'PE';
    if (/\/colombia\.html(?:[?#]|$)/.test(href)) return 'CO';
    if (/\/chile\.html(?:[?#]|$)/.test(href)) return 'CL';
    return '';
  }

  document.addEventListener('click', function (event) {
    var marketLink = event.target.closest('[data-market-link]');
    if (marketLink) {
      var selectedMarket = marketFromLink(marketLink) || targetMarket();
      rememberMarket(selectedMarket);
      window.chemnitzTrack('market_select', {
        target_market: selectedMarket,
        selected_market: selectedMarket,
        link_url: clean(marketLink.href || marketLink.getAttribute('href') || '', 200),
        link_text: clean(marketLink.textContent, 100)
      });
    }

    var catalogLink = event.target.closest('[data-catalog-link]');
    if (catalogLink) {
      rememberMarket(targetMarket() || 'LATAM');
      window.chemnitzTrack('catalog_open', {
        link_url: clean(catalogLink.href || catalogLink.getAttribute('href') || '', 200),
        link_text: clean(catalogLink.textContent, 100)
      });
    }

    var countryCta = event.target.closest('[data-country-cta]');
    if (countryCta) {
      window.chemnitzTrack('country_cta_click', {
        cta_name: clean(countryCta.getAttribute('data-country-cta') || countryCta.textContent, 100),
        link_url: clean(countryCta.href || countryCta.getAttribute('href') || '', 200),
        link_text: clean(countryCta.textContent, 100)
      });
    }

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
        configurationContext(window.chemnitzConsultationContext),
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
      'changan-cs55': 'Changan CS55',
      'changan-x5': 'Changan X5',
      'corolla-cross': 'Toyota Corolla Cross',
      'corolla': 'Toyota Corolla',
      'dashing': 'Jetour Dashing',
      'free-rider': 'Jetour Free Rider',
      'granvia': 'Toyota Granvia',
      'highlander': 'Toyota Highlander',
      'nx8': 'Nissan NX8',
      'q3': 'Audi Q3',
      'q5': 'Audi Q5',
      'a5': 'Audi A5',
      'qashqai': 'Nissan Qashqai',
      'rav4': 'Toyota RAV4',
      'sylphy': 'Nissan Sylphy',
      'wildlander': 'Toyota Wildlander',
      'x70': 'Jetour X70',
      'traveler': 'Jetour Traveler',
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
    window.chemnitzTrack('config_sheet_open', configurationContext(context));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inferConfigurationContext, { once: true });
  } else {
    inferConfigurationContext();
  }
})();
