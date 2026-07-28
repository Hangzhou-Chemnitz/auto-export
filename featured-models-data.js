(function(global) {
  'use strict';

  var corollaConfigSpecids = {
    '76042': true,
    '76043': true,
    '76041': true,
    '76028': true,
    '75827': true,
    '74685': true
  };

  global.ChemnitzFeaturedModels = {
    'Toyota Corolla': {
      source: 'Autohome',
      seriesId: 526,
      modelYear: 2026,
      trims: [
        { name: '2026款 1.2T 先锋', price: '118,800', source: 'Autohome', specid: 76042 },
        { name: '2026款 1.2T 精英', price: '124,800', source: 'Autohome', specid: 76043 },
        { name: '2026款 1.8L 双擎 先锋', price: '126,800', source: 'Autohome', specid: 76041 },
        { name: '2026款 1.8L 双擎 精英', price: '136,800', source: 'Autohome', specid: 76028 },
        { name: '2026款 1.8L 双擎 旗舰', price: '146,800', source: 'Autohome', specid: 75827 },
        { name: '2026款 2.0L 汽油 精英', price: '149,800', source: 'Autohome', specid: 74685 }
      ]
    }
  };

  global.ChemnitzFeaturedConfigUrl = function(modelName, trim) {
    var specid = trim && String(trim.specid || '');
    if (modelName !== 'Toyota Corolla' || !corollaConfigSpecids[specid]) return '';
    return 'vehicle-config-corolla.html?specid=' + encodeURIComponent(specid);
  };
})(window);
