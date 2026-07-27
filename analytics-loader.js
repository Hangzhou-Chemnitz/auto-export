(function () {
  'use strict';

  var measurementId = 'G-PEL4QMFR44';
  var hostname = String(window.location.hostname || '').toLowerCase();
  var productionHosts = {
    'hzchemnitz.cn': true,
    'www.hzchemnitz.cn': true
  };
  var analyticsEnabled =
    window.location.protocol === 'https:' &&
    Boolean(productionHosts[hostname]);

  window.__chemnitzAnalyticsEnabled = analyticsEnabled;
  window.__chemnitzAnalyticsDisabled = !analyticsEnabled;

  if (!analyticsEnabled || window.__chemnitzAnalyticsLoaderStarted) return;
  window.__chemnitzAnalyticsLoaderStarted = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  var loader = document.createElement('script');
  loader.async = true;
  loader.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(loader);

  window.gtag('js', new Date());
  window.gtag('config', measurementId);
})();
