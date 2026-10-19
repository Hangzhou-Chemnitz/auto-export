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

  var pageSourcePath = clean(window.location.pathname || '/', 100);

  function currentPath() {
    return pageSourcePath;
  }

  function queryValue(name, maxLength) {
    try {
      return clean(new URLSearchParams(window.location.search).get(name), maxLength || 100);
    } catch (error) {
      return '';
    }
  }

  function firstSameOriginEntrySurface() {
    var explicit = clean(
      document.documentElement.getAttribute('data-entry-surface') ||
      (document.body && document.body.getAttribute('data-entry-surface')) ||
      queryValue('from', 60),
      60
    );
    if (explicit) return explicit;

    var referrerPath = sameOriginReferrerPath();
    return referrerPath && referrerPath !== currentPath() ? clean(referrerPath, 60) : '';
  }

  function elementValue(element, attributeNames, maxLength) {
    if (!element) return '';
    for (var index = 0; index < attributeNames.length; index += 1) {
      var value = clean(element.getAttribute(attributeNames[index]), maxLength || 100);
      if (value) return value;
    }
    return '';
  }

  function specIdFromElement(element) {
    var specId = elementValue(element, ['data-vehicle-spec-id', 'data-specid', 'data-spec-id'], 60);
    if (specId) return specId;

    var href = element && (element.getAttribute('href') || element.href);
    if (!href) return '';
    try {
      return clean(new URL(href, window.location.href).searchParams.get('specid'), 60);
    } catch (error) {
      return '';
    }
  }

  function ctaLocation(element) {
    if (!element) return '';
    var explicit = elementValue(element, ['data-cta-location', 'data-analytics-location'], 60);
    if (explicit) return explicit;
    if (element.closest('.contact-choice-grid, .latam-contact-grid')) return 'contact_selector';
    if (element.closest('#config-menu')) return 'config_picker';
    if (element.closest('.contact-choice-modal, .contact-modal')) return 'contact_modal';
    if (element.closest('.config-modal, #config-overlay')) return 'config_modal';
    if (element.closest('.viewer-actions')) return 'vehicle_config_header';
    if (element.closest('.brochure-link, .config-order-btn, a.config-btn, .special-consult')) {
      return 'model_consult_action';
    }
    if (element.closest('.hero, .hero-section, [class*="hero"]')) return 'hero';
    if (element.closest('.featured-models, #featured-models')) return 'featured_models';
    if (element.closest('.model-card')) return 'model_card';
    if (element.closest('header, nav')) return 'header_navigation';
    if (element.closest('footer')) return 'footer';
    return 'page_body';
  }

  var initialEntrySurface = firstSameOriginEntrySurface();
  var activeCtaLocation = '';
  document.addEventListener('click', function (event) {
    activeCtaLocation = ctaLocation(event.target);
    window.setTimeout(function () {
      activeCtaLocation = '';
    }, 0);
  }, true);

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
      model_name: clean(document.documentElement.getAttribute('data-model-name') || '', 100),
      trim_name: '',
      vehicle_spec_id: queryValue('specid', 60),
      guide_price: clean(document.documentElement.getAttribute('data-guide-price') || '', 40),
      contact_name: '',
      entry_surface: initialEntrySurface,
      cta_location: '',
      page_language: pageLanguage(),
      page_locale: pageLocale(),
      target_market: targetMarket(),
      page_type: pageType(),
      source_page: currentPath()
    };
  }

  function normalizedContext(context) {
    var source = Object.assign(defaultContext(), context || {});
    return {
      model_name: clean(source.model_name || source.model, 100),
      trim_name: clean(source.trim_name || source.trim, 100),
      vehicle_spec_id: clean(source.vehicle_spec_id || source.specid || queryValue('specid', 60), 60),
      guide_price: clean(source.guide_price, 40),
      contact_name: clean(source.contact_name, 40),
      entry_surface: clean(source.entry_surface || initialEntrySurface, 60),
      cta_location: clean(source.cta_location, 60),
      page_language: clean(source.page_language || pageLanguage(), 12),
      page_locale: clean(source.page_locale || pageLocale(), 20),
      target_market: normalizeMarket(source.target_market || targetMarket()),
      page_type: clean(source.page_type || pageType(), 40),
      // The actual page path is authoritative. Navigation origin belongs in
      // entry_surface and must never replace source_page.
      source_page: currentPath()
    };
  }

  function mergeMeaningful(base, updates) {
    var merged = Object.assign({}, base || {});
    Object.keys(updates || {}).forEach(function (key) {
      var value = updates[key];
      if (value === undefined || value === null) return;
      if (typeof value === 'string' && !value.trim()) return;
      merged[key] = value;
    });
    return merged;
  }

  function configurationContext(context) {
    var normalized = normalizedContext(context);
    if (!normalized.contact_name) normalized.contact_name = 'not_selected';
    return normalized;
  }

  window.chemnitzConsultationContext = normalizedContext(window.chemnitzConsultationContext);

  window.chemnitzSetConsultationContext = function (context) {
    window.chemnitzConsultationContext = normalizedContext(
      mergeMeaningful(window.chemnitzConsultationContext || {}, context || {})
    );
    return window.chemnitzConsultationContext;
  };

  var recentEvents = {};

  function eventFingerprint(eventName, params) {
    return [
      eventName,
      params.model_name,
      params.trim_name,
      params.vehicle_spec_id,
      params.contact_name,
      params.link_url,
      params.cta_location,
      params.source_page
    ].join('|');
  }

  window.chemnitzTrack = function (eventName, params) {
    if (!eventName || typeof window.gtag !== 'function') return;
    var eventParams = Object.assign({}, params || {});
    if (!eventParams.cta_location && activeCtaLocation) {
      eventParams.cta_location = activeCtaLocation;
    }
    var context = normalizedContext(mergeMeaningful(
      window.chemnitzConsultationContext || {},
      eventParams
    ));
    var payload = Object.assign({}, eventParams, context);
    var fingerprint = eventFingerprint(eventName, payload);
    var now = Date.now();
    if (recentEvents[fingerprint] && now - recentEvents[fingerprint] < 250) return;
    recentEvents[fingerprint] = now;
    window.gtag('event', eventName, payload);
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
    var namedLabel = link.querySelector('.contact-choice-name, [data-contact-label]');
    if (namedLabel) return clean(namedLabel.textContent, 40);
    var phone = whatsappPhone(link);
    if (phone && whatsappContacts[phone]) return whatsappContacts[phone];
    var label = link.querySelector('span:not(.contact-avatar):not(.contact-choice-number)');
    if (label && !/\d{6,}/.test(label.textContent || '')) return clean(label.textContent, 40);
    return '';
  }

  function whatsappContext(link) {
    var context = normalizedContext(window.chemnitzConsultationContext);
    context.contact_name = contactName(link);
    context.link_url = clean((link.href || '').split('?')[0], 200);
    context.link_text = clean(link.textContent, 100);
    context.cta_location = ctaLocation(link);
    context.vehicle_spec_id = specIdFromElement(link) || context.vehicle_spec_id;
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

  function optionText(option, selector, fallback) {
    var node = option && option.querySelector(selector);
    return clean((node && node.textContent) || fallback || '', 100);
  }

  function contactModalFor(element) {
    if (!element) return null;
    return element.closest('.contact-modal, .contact-choice-modal, .latam-contact-modal') ||
      (element.querySelector && element.querySelector(
        '.contact-modal, .contact-choice-modal, .latam-contact-modal'
      ));
  }

  document.addEventListener('click', function (event) {
    var contactClose = event.target.closest(
      '.contact-modal-close, .contact-choice-close, .latam-contact-close, .contact-choice-modal .config-close'
    );
    var contactBackdrop = event.target.matches(
      '.contact-overlay, .contact-choice-overlay, .latam-contact-overlay, #config-overlay'
    ) && contactModalFor(event.target);
    if (contactClose || contactBackdrop) {
      window.chemnitzTrack('contact_modal_close', {
        close_method: contactClose ? 'close_button' : 'backdrop',
        cta_location: 'contact_modal'
      });
      return;
    }

    var marketLink = event.target.closest('[data-market-link]');
    if (marketLink) {
      var selectedMarket = marketFromLink(marketLink) || targetMarket();
      rememberMarket(selectedMarket);
      window.chemnitzTrack('market_select', {
        target_market: selectedMarket,
        selected_market: selectedMarket,
        link_url: clean(marketLink.href || marketLink.getAttribute('href') || '', 200),
        link_text: clean(marketLink.textContent, 100),
        cta_location: ctaLocation(marketLink)
      });
    }

    var catalogLink = event.target.closest('[data-catalog-link]');
    if (catalogLink) {
      rememberMarket(targetMarket() || 'LATAM');
      window.chemnitzTrack('catalog_open', {
        link_url: clean(catalogLink.href || catalogLink.getAttribute('href') || '', 200),
        link_text: clean(catalogLink.textContent, 100),
        cta_location: ctaLocation(catalogLink)
      });
    }

    var countryCta = event.target.closest('[data-country-cta]');
    if (countryCta) {
      window.chemnitzTrack('country_cta_click', {
        cta_name: clean(countryCta.getAttribute('data-country-cta') || countryCta.textContent, 100),
        link_url: clean(countryCta.href || countryCta.getAttribute('href') || '', 200),
        link_text: clean(countryCta.textContent, 100),
        cta_location: ctaLocation(countryCta)
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
        {
          link_url: clean(pdfLink.href, 200),
          cta_location: ctaLocation(pdfLink)
        }
      ));
      return;
    }

    // Check the specific consultation action before the broad .config-card
    // selector below. Many cards contain their CTA, and the old order recorded
    // those clicks as guide-price selections instead of consultation intent.
    var orderButton = event.target.closest(
      '.config-order-btn, a.config-btn, .config-consult-card, .special-consult'
    );
    if (orderButton) {
      var orderContext = normalizedContext(window.chemnitzConsultationContext);
      window.chemnitzTrack('preorder_click', {
        model_name: clean(window.currentConfigModel || orderContext.model_name, 100),
        vehicle_spec_id: specIdFromElement(orderButton) || orderContext.vehicle_spec_id,
        link_url: clean(orderButton.href || '', 200),
        cta_location: ctaLocation(orderButton)
      });
      return;
    }

    var priceOption = event.target.closest('.config-menu-option, .config-option, .config-card');
    if (priceOption) {
      var optionContext = normalizedContext(window.chemnitzConsultationContext);
      window.chemnitzTrack('guide_price_select', {
        model_name: clean(window.currentConfigModel || optionContext.model_name, 100),
        trim_name: optionText(priceOption, '.name, .config-card-name', priceOption.textContent),
        vehicle_spec_id: specIdFromElement(priceOption) || optionContext.vehicle_spec_id,
        guide_price: optionText(priceOption, '.price, .config-card-price', optionContext.guide_price),
        cta_location: ctaLocation(priceOption)
      });
      return;
    }

    var card = event.target.closest('.model-card');
    if (card) {
      window.chemnitzTrack('model_card_click', {
        model_name: modelNameFromCard(card),
        cta_location: 'model_card'
      });
    }
  });

  var pickerContexts = typeof WeakMap === 'function' ? new WeakMap() : null;

  function pickerEventContext(menu) {
    var titleNode = menu && menu.querySelector('.config-menu-title');
    var current = normalizedContext(window.chemnitzConsultationContext);
    return {
      model_name: clean(
        window.currentConfigModel || (titleNode && titleNode.textContent) || current.model_name,
        100
      ),
      vehicle_spec_id: current.vehicle_spec_id,
      guide_price: current.guide_price,
      cta_location: 'config_picker',
      picker_item_count: menu ? menu.querySelectorAll('.config-menu-option').length : 0
    };
  }

  function pickerNodes(node) {
    if (!node || node.nodeType !== 1) return [];
    var nodes = [];
    if (node.id === 'config-menu') nodes.push(node);
    if (node.querySelectorAll) {
      Array.prototype.push.apply(nodes, node.querySelectorAll('#config-menu'));
    }
    return nodes;
  }

  function trackPickerOpen(menu) {
    if (!menu || menu.getAttribute('data-analytics-picker-open') === '1') return;
    var context = pickerEventContext(menu);
    menu.setAttribute('data-analytics-picker-open', '1');
    if (pickerContexts) pickerContexts.set(menu, context);
    window.chemnitzTrack('config_picker_open', context);
  }

  function trackPickerClose(menu) {
    if (!menu || menu.getAttribute('data-analytics-picker-open') !== '1') return;
    var context = pickerContexts && pickerContexts.get(menu);
    window.chemnitzTrack('config_picker_close', context || pickerEventContext(menu));
    if (pickerContexts) pickerContexts.delete(menu);
  }

  function installPickerObserver() {
    if (!document.body || typeof window.MutationObserver !== 'function') return;
    var observer = new MutationObserver(function (records) {
      records.forEach(function (record) {
        Array.prototype.forEach.call(record.addedNodes || [], function (node) {
          pickerNodes(node).forEach(trackPickerOpen);
        });
        Array.prototype.forEach.call(record.removedNodes || [], function (node) {
          pickerNodes(node).forEach(trackPickerClose);
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    var existing = document.getElementById('config-menu');
    if (existing) trackPickerOpen(existing);
  }

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
      'a5': 'Audi A5',
      'boyue': 'Geely Boyue',
      'bz3': 'Toyota bZ3',
      'camry': 'Toyota Camry',
      'changan-cs75': 'Changan CS75',
      'changan-cs55': 'Changan CS55',
      'changan-x5': 'Changan X5',
      'coolray': 'Geely Coolray',
      'corolla-cross': 'Toyota Corolla Cross',
      'corolla': 'Toyota Corolla',
      'crv': 'Honda CR-V',
      'dashing': 'Jetour Dashing',
      'elantra': 'Hyundai Elantra',
      'free-rider': 'Jetour Free Rider',
      'galaxy-m9': 'Geely Galaxy M9',
      'golf': 'Volkswagen Golf',
      'granvia': 'Toyota Granvia',
      'highlander': 'Toyota Highlander',
      'jetta-vs5': 'Volkswagen Jetta VS5',
      'k3': 'Kia K3',
      'k5': 'Kia K5',
      'kx1': 'Kia KX1',
      'mg5': 'MG MG5',
      'n6': 'Nissan N6',
      'n7': 'Nissan N7',
      'niuzai': 'Geely Niuzai',
      'nx8': 'Nissan NX8',
      'q3': 'Audi Q3',
      'q5': 'Audi Q5',
      'qashqai': 'Nissan Qashqai',
      'rav4': 'Toyota RAV4',
      'seltos': 'Kia Seltos',
      'sportage': 'Kia Sportage',
      'sylphy': 'Nissan Sylphy',
      'sylphy-2026': 'Nissan Sylphy',
      'teana': 'Nissan Teana',
      'teramont': 'Volkswagen Teramont',
      'tharu': 'Volkswagen Tharu',
      'tiggo-3x': 'Chery Tiggo 3X',
      'tiggo-5x': 'Chery Tiggo 5X',
      'traveler': 'Jetour Traveler',
      'troc': 'Volkswagen T-Roc',
      'wildlander': 'Toyota Wildlander',
      'x70': 'Jetour X70',
      'xingyue-l': 'Geely Xingyue L',
      'xtrail': 'Nissan X-Trail',
      'zeekr-9x': 'Zeekr 9X'
    };
    var existing = normalizedContext(window.chemnitzConsultationContext);
    var model = clean(
      existing.model_name ||
      page.model_name ||
      (slugMatch && models[slugMatch[1]]) ||
      '',
      100
    );
    var context = window.chemnitzSetConsultationContext({
      model_name: model,
      trim_name: title,
      vehicle_spec_id: params.get('specid') || existing.vehicle_spec_id,
      guide_price: price,
      entry_surface: params.get('from') || existing.entry_surface,
      cta_location: 'vehicle_config_page',
      page_language: params.get('lang') || pageLanguage(),
      source_page: currentPath()
    });
    window.chemnitzTrack('config_sheet_open', configurationContext(context));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      installPickerObserver();
      inferConfigurationContext();
    }, { once: true });
  } else {
    installPickerObserver();
    inferConfigurationContext();
  }
})();
