(function(){
  var page=window.vehicleConfigPage||{};
  var routes={
    'vehicle-config-qashqai.html':{pdf:'documents/nissan-qashqai-2025-2l-cvt-config.pdf',dir:'documents/qashqai-config-pages',pages:6},
    'vehicle-config-xtrail.html':{pdf:'documents/nissan-xtrail-2025-leading-config.pdf',dir:'documents/xtrail-config-pages',pages:8},
    'vehicle-config-nx8.html':{pdf:'documents/nissan-nx8-2026-310-max-config.pdf',dir:'documents/nx8-config-pages',pages:8},
    'vehicle-config-teana.html':{pdf:'documents/nissan-teana-2026-harmonyos-2l-comfort-139900-config.pdf',dir:'documents/teana-2l-comfort-139900-config-pages',pages:7},
    'vehicle-config-n7.html':{pdf:'documents/nissan-n7-2026-625-pro-black-knight-148900-config.pdf',dir:'documents/n7-625-pro-black-knight-148900-config-pages',pages:7},
    'vehicle-config-n6.html':{pdf:'documents/nissan-n6-2026-180-pro-youth-103900-config.pdf',dir:'documents/n6-180-pro-youth-103900-config-pages',pages:8},
    'vehicle-config-sylphy-2026.html':{pdf:'documents/nissan-sylphy-2026-16l-cvt-comfort-84900-config.pdf',dir:'documents/sylphy-16l-cvt-comfort-84900-config-pages',pages:8},
    'vehicle-config-rav4.html':{pdf:'documents/toyota-rav4-2026-2l-awd-config.pdf',dir:'documents/rav4-config-pages',pages:8},
    'vehicle-config-corolla.html':{pdf:'documents/toyota-corolla-2026-1-2t-118800-config.pdf',dir:'documents/corolla-1-2t-118800-config-pages',pages:7},
    'vehicle-config-wildlander.html':{pdf:'documents/toyota-wildlander-2026-2l-gasoline-169800-config.pdf',dir:'documents/wildlander-gasoline-169800-config-pages',pages:8},
    'vehicle-config-bz3.html':{pdf:'documents/toyota-bz3-2024-517km-elite-pro-169800-config.pdf',dir:'documents/bz3-169800-config-pages',pages:8},
    'vehicle-config-camry.html':{pdf:'documents/toyota-camry-2026-hybrid-2l-elite-config.pdf',dir:'documents/camry-config-pages'},
    'vehicle-config-highlander.html':{pdf:'documents/toyota-highlander-2026-380t-awd-7seat-config.pdf',dir:'documents/highlander-config-pages',pages:7},
    'vehicle-config-granvia.html':{pdf:'documents/toyota-granvia-2027-hybrid-2-5l-comfort-plus-299800-config.pdf',dir:'documents/granvia-299800-config-pages',pages:8},
    'vehicle-config-corolla-cross.html':{pdf:'documents/toyota-corolla-cross-2026-2l-gasoline-136800-config.pdf',dir:'documents/corolla-cross-gasoline-136800-config-pages',pages:7},
    'vehicle-config-tharu.html':{pdf:'documents/volkswagen-tharu-xr-2026-1-5l-ruijin-125900-config.pdf',dir:'documents/tharu-xr-1-5l-ruijin-125900-config-pages',pages:6},
    'vehicle-config-golf.html':{pdf:'documents/volkswagen-golf-2026-300tsi-129900-config.pdf',dir:'documents/golf-300tsi-129900-config-pages',pages:7},
    'vehicle-config-troc.html':{pdf:'documents/volkswagen-t-roc-2026-280tsi-dsg-fwd-shiguang-138900-config.pdf',dir:'documents/t-roc-280tsi-shiguang-138900-config-pages',pages:6},
    'vehicle-config-teramont.html':{pdf:'documents/volkswagen-teramont-2026-pro-380tsi-fwd-cross-border-299900-config.pdf',dir:'documents/teramont-pro-380tsi-fwd-cross-border-299900-config-pages',pages:7},
    'vehicle-config-jetta-vs5.html':{pdf:'documents/volkswagen-jetta-vs5-2026-280tsi-at-pioneer-98900-config.pdf',dir:'documents/jetta-vs5-280tsi-at-pioneer-98900-config-pages',pages:6}
  };
  var qashqaiVariants={
    '73478':{
      title:'Nissan Qashqai 2025 Honor 2.0L CVT XV Sincere Edition',
      price:'125,900',
      pdf:'documents/nissan-qashqai-2025-2l-cvt-xv-sincere-125900-config.pdf',
      dir:'documents/qashqai-2l-cvt-xv-sincere-125900-config-pages'
    },
    '73625':{
      title:'Nissan Qashqai 2025 Honor 2.0L CVT XV+ Leading',
      price:'134,900',
      pdf:'documents/nissan-qashqai-2025-2l-cvt-config.pdf',
      dir:'documents/qashqai-config-pages'
    }
  };
  var xtrailVariants={
    '73628':{
      title:'Nissan X-Trail 2025 Honor 2.0L 2WD Sincere Edition',
      price:'160,800',
      pdf:'documents/nissan-xtrail-2025-2l-fwd-sincere-160800-config.pdf',
      dir:'documents/xtrail-2l-fwd-sincere-160800-config-pages'
    },
    '73627':{
      title:'Nissan X-Trail 2025 Honor 2.0L 2WD Leading',
      price:'166,800',
      pdf:'documents/nissan-xtrail-2025-leading-config.pdf',
      dir:'documents/xtrail-config-pages'
    }
  };
  var nx8Variants={
    '77209':{
      title:'Nissan NX8 2026 EV 580 Pro',
      price:'159,900',
      pdf:'documents/nissan-nx8-2026-ev-580-pro-159900-config.pdf',
      dir:'documents/nx8-ev-580-pro-159900-config-pages'
    },
    '75909':{
      title:'Nissan NX8 2026 EV 580 Max',
      price:'169,900',
      pdf:'documents/nissan-nx8-2026-ev-580-max-169900-config.pdf',
      dir:'documents/nx8-ev-580-max-169900-config-pages'
    },
    '76408':{
      title:'Nissan NX8 2026 EV 650 Max',
      price:'184,900',
      pdf:'documents/nissan-nx8-2026-ev-650-max-184900-config.pdf',
      dir:'documents/nx8-ev-650-max-184900-config-pages'
    },
    '77210':{
      title:'Nissan NX8 2026 EV 630 Master Edition',
      price:'209,900',
      pdf:'documents/nissan-nx8-2026-ev-630-master-209900-config.pdf',
      dir:'documents/nx8-ev-630-master-209900-config-pages'
    },
    '77207':{
      title:'Nissan NX8 2026 Range-Extended 150 Pro',
      price:'159,900',
      pdf:'documents/nissan-nx8-2026-range-extended-150-pro-159900-config.pdf',
      dir:'documents/nx8-range-extended-150-pro-159900-config-pages'
    },
    '77208':{
      title:'Nissan NX8 2026 Range-Extended 150 Max',
      price:'169,900',
      pdf:'documents/nissan-nx8-2026-range-extended-150-max-169900-config.pdf',
      dir:'documents/nx8-range-extended-150-max-169900-config-pages'
    },
    '76643':{
      title:'Nissan NX8 2026 Range-Extended 260 Pro',
      price:'169,900',
      pdf:'documents/nissan-nx8-2026-range-extended-260-pro-169900-config.pdf',
      dir:'documents/nx8-range-extended-260-pro-169900-config-pages'
    },
    '76642':{
      title:'Nissan NX8 2026 Range-Extended 310 Max',
      price:'179,900',
      pdf:'documents/nissan-nx8-2026-310-max-config.pdf',
      dir:'documents/nx8-config-pages'
    }
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
  var teanaVariants={
    '75719':{
      title:'Nissan Teana 2026 HarmonyOS Cockpit 2.0L Comfort',
      price:'139,900',
      pdf:'documents/nissan-teana-2026-harmonyos-2l-comfort-139900-config.pdf',
      dir:'documents/teana-2l-comfort-139900-config-pages'
    },
    '75718':{
      title:'Nissan Teana 2026 HarmonyOS Cockpit 2.0L Super Comfort',
      price:'149,900',
      pdf:'documents/nissan-teana-2026-harmonyos-2l-super-comfort-149900-config.pdf',
      dir:'documents/teana-2l-super-comfort-149900-config-pages'
    },
    '75439':{
      title:'Nissan Teana 2026 HarmonyOS Cockpit 2.0L Smart Super Comfort',
      price:'157,900',
      pdf:'documents/nissan-teana-2026-harmonyos-2l-smart-super-comfort-157900-config.pdf',
      dir:'documents/teana-2l-smart-super-comfort-157900-config-pages'
    },
    '74182':{
      title:'Nissan Teana 2026 HarmonyOS Cockpit 2.0T Flagship',
      price:'167,900',
      pdf:'documents/nissan-teana-2026-harmonyos-2t-flagship-167900-config.pdf',
      dir:'documents/teana-2t-flagship-167900-config-pages'
    },
    '74183':{
      title:'Nissan Teana 2026 HarmonyOS Cockpit 2.0T S380 Master Edition',
      price:'182,900',
      pdf:'documents/nissan-teana-2026-harmonyos-2t-s380-master-182900-config.pdf',
      dir:'documents/teana-2t-s380-master-182900-config-pages'
    }
  };
  var n7Variants={
    '77628':{
      title:'Nissan N7 2026 EV 625 Pro Black Knight',
      price:'148,900',
      pdf:'documents/nissan-n7-2026-625-pro-black-knight-148900-config.pdf',
      dir:'documents/n7-625-pro-black-knight-148900-config-pages'
    },
    '77629':{
      title:'Nissan N7 2026 EV 625 Pro Rhine Knight',
      price:'148,900',
      pdf:'documents/nissan-n7-2026-625-pro-rhine-knight-148900-config.pdf',
      dir:'documents/n7-625-pro-rhine-knight-148900-config-pages'
    },
    '77571':{
      title:'Nissan N7 2026 EV 625 Max Black Knight',
      price:'158,900',
      pdf:'documents/nissan-n7-2026-625-max-black-knight-158900-config.pdf',
      dir:'documents/n7-625-max-black-knight-158900-config-pages'
    },
    '77630':{
      title:'Nissan N7 2026 EV 625 Max Rhine Knight',
      price:'158,900',
      pdf:'documents/nissan-n7-2026-625-max-rhine-knight-158900-config.pdf',
      dir:'documents/n7-625-max-rhine-knight-158900-config-pages'
    }
  };
  var n6Variants={
    '77650':{
      title:'Nissan N6 2026 PHEV 180 Pro Youth',
      price:'103,900',
      pdf:'documents/nissan-n6-2026-180-pro-youth-103900-config.pdf',
      dir:'documents/n6-180-pro-youth-103900-config-pages'
    },
    '74150':{
      title:'Nissan N6 2026 PHEV 180 Pro',
      price:'109,900',
      pdf:'documents/nissan-n6-2026-180-pro-109900-config.pdf',
      dir:'documents/n6-180-pro-109900-config-pages'
    },
    '74151':{
      title:'Nissan N6 2026 PHEV 180 Max',
      price:'114,900',
      pdf:'documents/nissan-n6-2026-180-max-114900-config.pdf',
      dir:'documents/n6-180-max-114900-config-pages'
    },
    '76611':{
      title:'Nissan N6 2026 PHEV 180 Pro+',
      price:'116,900',
      pdf:'documents/nissan-n6-2026-180-pro-plus-116900-config.pdf',
      dir:'documents/n6-180-pro-plus-116900-config-pages'
    },
    '74152':{
      title:'Nissan N6 2026 PHEV 180 Max+',
      price:'121,900',
      pdf:'documents/nissan-n6-2026-180-max-plus-121900-config.pdf',
      dir:'documents/n6-180-max-plus-121900-config-pages'
    },
    '77651':{
      title:'Nissan N6 2026 PHEV 180 Pro+ Black Knight',
      price:'122,900',
      pdf:'documents/nissan-n6-2026-180-pro-plus-black-knight-122900-config.pdf',
      dir:'documents/n6-180-pro-plus-black-knight-122900-config-pages'
    },
    '77652':{
      title:'Nissan N6 2026 PHEV 180 Max+ Black Knight',
      price:'127,900',
      pdf:'documents/nissan-n6-2026-180-max-plus-black-knight-127900-config.pdf',
      dir:'documents/n6-180-max-plus-black-knight-127900-config-pages'
    },
    '75878':{
      title:'Nissan N6 2026 PHEV 170 Max+ Flagship',
      price:'129,900',
      pdf:'documents/nissan-n6-2026-170-max-plus-flagship-129900-config.pdf',
      dir:'documents/n6-170-max-plus-flagship-129900-config-pages'
    }
  };
  var sylphyVariants={
    '76613':{
      title:'Nissan Sylphy 2026 1.6L CVT Comfort',
      price:'84,900',
      pdf:'documents/nissan-sylphy-2026-16l-cvt-comfort-84900-config.pdf',
      dir:'documents/sylphy-16l-cvt-comfort-84900-config-pages'
    },
    '76614':{
      title:'Nissan Sylphy 2026 1.6L CVT Comfort Plus',
      price:'94,900',
      pdf:'documents/nissan-sylphy-2026-16l-cvt-comfort-plus-94900-config.pdf',
      dir:'documents/sylphy-16l-cvt-comfort-plus-94900-config-pages'
    },
    '76608':{
      title:'Nissan Sylphy 2026 1.6L CVT Technology',
      price:'104,900',
      pdf:'documents/nissan-sylphy-2026-16l-cvt-technology-104900-config.pdf',
      dir:'documents/sylphy-16l-cvt-technology-104900-config-pages'
    },
    '76609':{
      title:'Nissan Sylphy 2026 1.6L CVT Comfort Technology',
      price:'109,900',
      pdf:'documents/nissan-sylphy-2026-16l-cvt-comfort-technology-109900-config.pdf',
      dir:'documents/sylphy-16l-cvt-comfort-technology-109900-config-pages'
    },
    '76610':{
      title:'Nissan Sylphy 2026 1.6L CVT Luxury Technology',
      price:'114,900',
      pdf:'documents/nissan-sylphy-2026-16l-cvt-luxury-technology-114900-config.pdf',
      dir:'documents/sylphy-16l-cvt-luxury-technology-114900-config-pages'
    },
    '74682':{
      title:'Nissan Sylphy 2026 1.6L CVT Flagship',
      price:'119,900',
      pdf:'documents/nissan-sylphy-2026-16l-cvt-flagship-119900-config.pdf',
      dir:'documents/sylphy-16l-cvt-flagship-119900-config-pages'
    }
  };
  var rav4Variants={
    '74683':{
      title:'Toyota RAV4 2026 2.0L Gasoline AWD',
      price:'189,800',
      pdf:'documents/toyota-rav4-2026-2l-awd-config.pdf',
      dir:'documents/rav4-config-pages'
    },
    '75765':{
      title:'Toyota RAV4 2026 Hybrid 2.0L FWD',
      price:'187,800',
      pdf:'documents/toyota-rav4-2026-hybrid-2l-fwd-187800-config.pdf',
      dir:'documents/rav4-hybrid-187800-config-pages'
    },
    '74690':{
      title:'Toyota RAV4 2026 Hybrid 2.5L AWD Flagship',
      price:'228,800',
      pdf:'documents/toyota-rav4-2026-hybrid-2-5l-awd-228800-config.pdf',
      dir:'documents/rav4-hybrid-228800-config-pages'
    }
  };
  var tharuVariants={
    '74072':{
      title:'Volkswagen Tharu XR 2026 1.5L Ruijin',
      price:'125,900',
      pdf:'documents/volkswagen-tharu-xr-2026-1-5l-ruijin-125900-config.pdf',
      dir:'documents/tharu-xr-1-5l-ruijin-125900-config-pages'
    },
    '74073':{
      title:'Volkswagen Tharu XR 2026 1.5L Ruiyi',
      price:'135,900',
      pdf:'documents/volkswagen-tharu-xr-2026-1-5l-ruiyi-135900-config.pdf',
      dir:'documents/tharu-xr-1-5l-ruiyi-135900-config-pages'
    },
    '74046':{
      title:'Volkswagen Tharu XR 2026 1.5L Ruixiang',
      price:'143,900',
      pdf:'documents/volkswagen-tharu-xr-2026-1-5l-ruixiang-143900-config.pdf',
      dir:'documents/tharu-xr-1-5l-ruixiang-143900-config-pages'
    },
    '74074':{
      title:'Volkswagen Tharu XR 2026 300TSI Ruiyi',
      price:'146,900',
      pdf:'documents/volkswagen-tharu-xr-2026-300tsi-ruiyi-146900-config.pdf',
      dir:'documents/tharu-xr-300tsi-ruiyi-146900-config-pages'
    },
    '74075':{
      title:'Volkswagen Tharu XR 2026 300TSI Ruixiang',
      price:'154,900',
      pdf:'documents/volkswagen-tharu-xr-2026-300tsi-ruixiang-154900-config.pdf',
      dir:'documents/tharu-xr-300tsi-ruixiang-154900-config-pages'
    }
  };
  var golfVariants={
    '75016':{
      title:'Volkswagen Golf 2026 300TSI',
      price:'129,900',
      pdf:'documents/volkswagen-golf-2026-300tsi-129900-config.pdf',
      dir:'documents/golf-300tsi-129900-config-pages'
    },
    '75017':{
      title:'Volkswagen Golf 2026 300TSI Pro',
      price:'139,900',
      pdf:'documents/volkswagen-golf-2026-300tsi-pro-139900-config.pdf',
      dir:'documents/golf-300tsi-pro-139900-config-pages'
    },
    '75018':{
      title:'Volkswagen Golf 2026 300TSI R-Line',
      price:'158,900',
      pdf:'documents/volkswagen-golf-2026-300tsi-r-line-158900-config.pdf',
      dir:'documents/golf-300tsi-r-line-158900-config-pages'
    }
  };
  var trocVariants={
    '74967':{
      title:'Volkswagen T-Roc 2026 280TSI DSG FWD Shiguang',
      price:'138,900',
      pdf:'documents/volkswagen-t-roc-2026-280tsi-dsg-fwd-shiguang-138900-config.pdf',
      dir:'documents/t-roc-280tsi-shiguang-138900-config-pages'
    },
    '74968':{
      title:'Volkswagen T-Roc 2026 300TSI DSG FWD Chenguang',
      price:'149,900',
      pdf:'documents/volkswagen-t-roc-2026-300tsi-dsg-fwd-chenguang-149900-config.pdf',
      dir:'documents/t-roc-300tsi-chenguang-149900-config-pages'
    },
    '74969':{
      title:'Volkswagen T-Roc 2026 300TSI DSG FWD Xingguang',
      price:'158,700',
      pdf:'documents/volkswagen-t-roc-2026-300tsi-dsg-fwd-xingguang-158700-config.pdf',
      dir:'documents/t-roc-300tsi-xingguang-158700-config-pages'
    }
  };
  var teramontVariants={
    '74970':{
      title:'Volkswagen Teramont 2026 Pro 380TSI FWD Cross-Border',
      price:'299,900',
      pdf:'documents/volkswagen-teramont-2026-pro-380tsi-fwd-cross-border-299900-config.pdf',
      dir:'documents/teramont-pro-380tsi-fwd-cross-border-299900-config-pages'
    },
    '74865':{
      title:'Volkswagen Teramont 2026 Pro 380TSI FWD Adventure',
      price:'309,900',
      pdf:'documents/volkswagen-teramont-2026-pro-380tsi-fwd-adventure-309900-config.pdf',
      dir:'documents/teramont-pro-380tsi-fwd-adventure-309900-config-pages'
    },
    '74971':{
      title:'Volkswagen Teramont 2026 Pro 450TSI AWD Cross-Border',
      price:'319,900',
      pdf:'documents/volkswagen-teramont-2026-pro-450tsi-awd-cross-border-319900-config.pdf',
      dir:'documents/teramont-pro-450tsi-awd-cross-border-319900-config-pages'
    },
    '76655':{
      title:'Volkswagen Teramont 2026 Pro 450TSI AWD Navigator',
      price:'344,900',
      pdf:'documents/volkswagen-teramont-2026-pro-450tsi-awd-navigator-344900-config.pdf',
      dir:'documents/teramont-pro-450tsi-awd-navigator-344900-config-pages'
    },
    '74864':{
      title:'Volkswagen Teramont 2026 Pro 450TSI AWD Summit',
      price:'359,900',
      pdf:'documents/volkswagen-teramont-2026-pro-450tsi-awd-summit-359900-config.pdf',
      dir:'documents/teramont-pro-450tsi-awd-summit-359900-config-pages'
    }
  };
  var jettaVs5Variants={
    '75249':{
      title:'Volkswagen Jetta VS5 2026 280TSI AT Pioneer',
      price:'98,900',
      pdf:'documents/volkswagen-jetta-vs5-2026-280tsi-at-pioneer-98900-config.pdf',
      dir:'documents/jetta-vs5-280tsi-at-pioneer-98900-config-pages'
    },
    '75289':{
      title:'Volkswagen Jetta VS5 2026 280TSI AT Yuexiang',
      price:'106,900',
      pdf:'documents/volkswagen-jetta-vs5-2026-280tsi-at-yuexiang-106900-config.pdf',
      dir:'documents/jetta-vs5-280tsi-at-yuexiang-106900-config-pages'
    },
    '75287':{
      title:'Volkswagen Jetta VS5 2026 280TSI AT Haoyun Plus',
      price:'108,900',
      pdf:'documents/volkswagen-jetta-vs5-2026-280tsi-at-haoyun-plus-108900-config.pdf',
      dir:'documents/jetta-vs5-280tsi-at-haoyun-plus-108900-config-pages'
    },
    '75290':{
      title:'Volkswagen Jetta VS5 2026 280TSI AT Yuexiang Highlight',
      price:'108,900',
      pdf:'documents/volkswagen-jetta-vs5-2026-280tsi-at-yuexiang-highlight-108900-config.pdf',
      dir:'documents/jetta-vs5-280tsi-at-yuexiang-highlight-108900-config-pages'
    },
    '75291':{
      title:'Volkswagen Jetta VS5 2026 280TSI AT Rongyao Highlight',
      price:'112,900',
      pdf:'documents/volkswagen-jetta-vs5-2026-280tsi-at-rongyao-highlight-112900-config.pdf',
      dir:'documents/jetta-vs5-280tsi-at-rongyao-highlight-112900-config-pages'
    },
    '75292':{
      title:'Volkswagen Jetta VS5 2026 280TSI AT Flagship Highlight',
      price:'121,900',
      pdf:'documents/volkswagen-jetta-vs5-2026-280tsi-at-flagship-highlight-121900-config.pdf',
      dir:'documents/jetta-vs5-280tsi-at-flagship-highlight-121900-config-pages'
    }
  };
  var corollaVariants={
    '76042':{
      title:'Toyota Corolla 2026 1.2T Pioneer',
      price:'118,800',
      pdf:'documents/toyota-corolla-2026-1-2t-118800-config.pdf',
      dir:'documents/corolla-1-2t-118800-config-pages'
    },
    '76043':{
      title:'Toyota Corolla 2026 1.2T Elite',
      price:'124,800',
      pdf:'documents/toyota-corolla-2026-1-2t-124800-config.pdf',
      dir:'documents/corolla-1-2t-124800-config-pages'
    },
    '76041':{
      title:'Toyota Corolla 2026 1.8L Hybrid Pioneer',
      price:'126,800',
      pdf:'documents/toyota-corolla-2026-hybrid-1-8l-126800-config.pdf',
      dir:'documents/corolla-hybrid-1-8l-126800-config-pages'
    },
    '76028':{
      title:'Toyota Corolla 2026 1.8L Hybrid Elite',
      price:'136,800',
      pdf:'documents/toyota-corolla-2026-hybrid-1-8l-136800-config.pdf',
      dir:'documents/corolla-hybrid-1-8l-136800-config-pages'
    },
    '75827':{
      title:'Toyota Corolla 2026 1.8L Hybrid Flagship',
      price:'146,800',
      pdf:'documents/toyota-corolla-2026-hybrid-1-8l-146800-config.pdf',
      dir:'documents/corolla-hybrid-1-8l-146800-config-pages'
    },
    '74685':{
      title:'Toyota Corolla 2026 2.0L Gasoline Elite',
      price:'149,800',
      pdf:'documents/toyota-corolla-2026-2l-gasoline-149800-config.pdf',
      dir:'documents/corolla-2l-gasoline-149800-config-pages'
    }
  };
  var wildlanderVariants={
    '75768':{
      title:'Toyota Wildlander 2026 2.0L Gasoline AIR',
      price:'169,800',
      pdf:'documents/toyota-wildlander-2026-2l-gasoline-169800-config.pdf',
      dir:'documents/wildlander-gasoline-169800-config-pages'
    },
    '75769':{
      title:'Toyota Wildlander 2026 2.0L Gasoline PRO',
      price:'181,800',
      pdf:'documents/toyota-wildlander-2026-2l-gasoline-181800-config.pdf',
      dir:'documents/wildlander-gasoline-181800-config-pages'
    },
    '75770':{
      title:'Toyota Wildlander 2026 2.0L Gasoline PRO+',
      price:'191,800',
      pdf:'documents/toyota-wildlander-2026-2l-gasoline-191800-config.pdf',
      dir:'documents/wildlander-gasoline-191800-config-pages'
    },
    '75771':{
      title:'Toyota Wildlander 2026 Hybrid 2.0L AIR',
      price:'179,800',
      pdf:'documents/toyota-wildlander-2026-hybrid-2l-179800-config.pdf',
      dir:'documents/wildlander-hybrid-179800-config-pages'
    },
    '75772':{
      title:'Toyota Wildlander 2026 Hybrid 2.0L PRO',
      price:'189,800',
      pdf:'documents/toyota-wildlander-2026-hybrid-2l-189800-config.pdf',
      dir:'documents/wildlander-hybrid-189800-config-pages'
    },
    '74158':{
      title:'Toyota Wildlander 2026 Hybrid 2.0L PRO+',
      price:'199,800',
      pdf:'documents/toyota-wildlander-2026-hybrid-2l-199800-config.pdf',
      dir:'documents/wildlander-hybrid-199800-config-pages'
    }
  };
  var corollaCrossVariants={
    '75436':{
      title:'Toyota Corolla Cross 2026 2.0L Gasoline Elite',
      price:'136,800',
      pdf:'documents/toyota-corolla-cross-2026-2l-gasoline-136800-config.pdf',
      dir:'documents/corolla-cross-gasoline-136800-config-pages'
    },
    '75437':{
      title:'Toyota Corolla Cross 2026 2.0L Gasoline',
      price:'149,800',
      pdf:'documents/toyota-corolla-cross-2026-2l-gasoline-149800-config.pdf',
      dir:'documents/corolla-cross-gasoline-149800-config-pages'
    },
    '75353':{
      title:'Toyota Corolla Cross 2026 Hybrid 2.0L Pioneer',
      price:'139,800',
      pdf:'documents/toyota-corolla-cross-2026-hybrid-2l-139800-config.pdf',
      dir:'documents/corolla-cross-hybrid-139800-config-pages'
    },
    '75354':{
      title:'Toyota Corolla Cross 2026 Hybrid 2.0L Elite',
      price:'149,800',
      pdf:'documents/toyota-corolla-cross-2026-hybrid-2l-149800-config.pdf',
      dir:'documents/corolla-cross-hybrid-149800-config-pages'
    },
    '73837':{
      title:'Toyota Corolla Cross 2026 Hybrid 2.0L',
      price:'159,800',
      pdf:'documents/toyota-corolla-cross-2026-hybrid-2l-159800-config.pdf',
      dir:'documents/corolla-cross-hybrid-159800-config-pages'
    }
  };
  var highlanderVariants={
    '74933':{
      title:'Toyota Highlander 2026 380T AWD Luxury 7-Seat',
      price:'284,800',
      pdf:'documents/toyota-highlander-2026-380t-awd-7seat-config.pdf',
      dir:'documents/highlander-config-pages'
    },
    '74934':{
      title:'Toyota Highlander 2026 380T AWD Premium 7-Seat',
      price:'295,800',
      pdf:'documents/toyota-highlander-2026-380t-awd-premium-295800-config.pdf',
      dir:'documents/highlander-295800-config-pages'
    },
    '74935':{
      title:'Toyota Highlander 2026 Hybrid 2.5L FWD Elite 5-Seat',
      price:'249,800',
      pdf:'documents/toyota-highlander-2026-hybrid-2-5l-fwd-elite-5seat-249800-config.pdf',
      dir:'documents/highlander-249800-config-pages'
    },
    '74936':{
      title:'Toyota Highlander 2026 Hybrid 2.5L FWD Elite 7-Seat',
      price:'257,800',
      pdf:'documents/toyota-highlander-2026-hybrid-2-5l-fwd-elite-7seat-257800-config.pdf',
      dir:'documents/highlander-257800-config-pages'
    },
    '74937':{
      title:'Toyota Highlander 2026 Hybrid 2.5L FWD Luxury 7-Seat',
      price:'288,800',
      pdf:'documents/toyota-highlander-2026-hybrid-2-5l-fwd-luxury-7seat-288800-config.pdf',
      dir:'documents/highlander-288800-config-pages'
    },
    '74938':{
      title:'Toyota Highlander 2026 Hybrid 2.5L AWD Elite 7-Seat',
      price:'268,800',
      pdf:'documents/toyota-highlander-2026-hybrid-2-5l-awd-elite-7seat-268800-config.pdf',
      dir:'documents/highlander-268800-config-pages'
    },
    '74939':{
      title:'Toyota Highlander 2026 Hybrid 2.5L AWD Luxury 7-Seat',
      price:'299,800',
      pdf:'documents/toyota-highlander-2026-hybrid-2-5l-awd-luxury-7seat-299800-config.pdf',
      dir:'documents/highlander-299800-config-pages'
    },
    '74940':{
      title:'Toyota Highlander 2026 Hybrid 2.5L AWD Premium 7-Seat',
      price:'309,800',
      pdf:'documents/toyota-highlander-2026-hybrid-2-5l-awd-premium-7seat-309800-config.pdf',
      dir:'documents/highlander-309800-config-pages'
    },
    '74941':{
      title:'Toyota Highlander 2026 Hybrid 2.5L AWD Flagship 7-Seat',
      price:'325,800',
      pdf:'documents/toyota-highlander-2026-hybrid-2-5l-awd-flagship-7seat-325800-config.pdf',
      dir:'documents/highlander-325800-config-pages'
    }
  };
  var granviaVariants={
    '78248':{
      title:'Toyota Granvia 2027 Hybrid 2.5L Comfort PLUS',
      price:'299,800',
      pdf:'documents/toyota-granvia-2027-hybrid-2-5l-comfort-plus-299800-config.pdf',
      dir:'documents/granvia-299800-config-pages'
    },
    '78249':{
      title:'Toyota Granvia 2027 Hybrid 2.5L Premium PLUS',
      price:'349,800',
      pdf:'documents/toyota-granvia-2027-hybrid-2-5l-premium-plus-349800-config.pdf',
      dir:'documents/granvia-349800-config-pages'
    },
    '78251':{
      title:'Toyota Granvia 2027 Hybrid 2.5L Prestige ULTRA',
      price:'365,800',
      pdf:'documents/toyota-granvia-2027-hybrid-2-5l-prestige-ultra-365800-config.pdf',
      dir:'documents/granvia-prestige-ultra-365800-config-pages'
    },
    '78253':{
      title:'Toyota Granvia 2027 Hybrid 2.5L Premium MAX AWD',
      price:'365,800',
      pdf:'documents/toyota-granvia-2027-hybrid-2-5l-premium-max-awd-365800-config.pdf',
      dir:'documents/granvia-premium-max-awd-365800-config-pages'
    },
    '78254':{
      title:'Toyota Granvia 2027 Hybrid 2.5L Prestige ULTRA AWD',
      price:'379,800',
      pdf:'documents/toyota-granvia-2027-hybrid-2-5l-prestige-ultra-awd-379800-config.pdf',
      dir:'documents/granvia-prestige-ultra-awd-379800-config-pages'
    },
    '78250':{
      title:'Toyota Granvia 2027 Hybrid 2.5L Premium Welcab PLUS',
      price:'385,800',
      pdf:'documents/toyota-granvia-2027-hybrid-2-5l-premium-welcab-plus-385800-config.pdf',
      dir:'documents/granvia-premium-welcab-plus-385800-config-pages'
    },
    '78252':{
      title:'Toyota Granvia 2027 Hybrid 2.5L Flagship ULTRA',
      price:'399,800',
      pdf:'documents/toyota-granvia-2027-hybrid-2-5l-flagship-ultra-399800-config.pdf',
      dir:'documents/granvia-flagship-ultra-399800-config-pages'
    }
  };
  var filename=location.pathname.split('/').pop();
  var route=routes[filename];
  function resolveBackLink(){
    var params=new URLSearchParams(location.search);
    var source=params.get('from');
    var language=params.get('lang')||'en';
    var targets={
      en:{home:'/#models',models:'models.html#models'},
      fr:{home:'fr.html#models',models:'models-fr.html#models'},
      ru:{home:'ru.html#models',models:'models-ru.html#models'},
      ar:{home:'ar.html#models',models:'models-ar.html#models'}
    };
    if(targets[language]&&(source==='home'||source==='models')){
      return targets[language][source];
    }

    if(document.referrer){
      try{
        var referrerFile=new URL(document.referrer).pathname.split('/').pop();
        var referrerTargets={
          '':'/#models',
          'index.html':'/#models',
          'fr.html':'fr.html#models',
          'ru.html':'ru.html#models',
          'ar.html':'ar.html#models',
          'models.html':'models.html#models',
          'models-fr.html':'models-fr.html#models',
          'models-ru.html':'models-ru.html#models',
          'models-ar.html':'models-ar.html#models'
        };
        if(Object.prototype.hasOwnProperty.call(referrerTargets,referrerFile)){
          return referrerTargets[referrerFile];
        }
      }catch(error){}
    }

    return '/#models';
  }
  if(filename==='vehicle-config-rav4.html'){
    var rav4Specid=new URLSearchParams(location.search).get('specid')||'74683';
    var rav4Variant=rav4Variants[rav4Specid]||rav4Variants['74683'];
    route={pdf:rav4Variant.pdf,dir:rav4Variant.dir,pages:8};
    page.title=rav4Variant.title;
    page.price=rav4Variant.price;
    page.summary='Selected guide-price configuration for Toyota RAV4 FOB export consultation.';
  }
  if(filename==='vehicle-config-qashqai.html'){
    var qashqaiSpecid=new URLSearchParams(location.search).get('specid')||'73625';
    var qashqaiVariant=qashqaiVariants[qashqaiSpecid]||qashqaiVariants['73625'];
    route={pdf:qashqaiVariant.pdf,dir:qashqaiVariant.dir,pages:6};
    page.title=qashqaiVariant.title;
    page.price=qashqaiVariant.price;
    page.summary='Selected guide-price configuration for Nissan Qashqai FOB export consultation.';
  }
  if(filename==='vehicle-config-xtrail.html'){
    var xtrailSpecid=new URLSearchParams(location.search).get('specid')||'73627';
    var xtrailVariant=xtrailVariants[xtrailSpecid]||xtrailVariants['73627'];
    route={pdf:xtrailVariant.pdf,dir:xtrailVariant.dir,pages:8};
    page.title=xtrailVariant.title;
    page.price=xtrailVariant.price;
    page.summary='Selected configuration for the Nissan X-Trail export program.';
  }
  if(filename==='vehicle-config-nx8.html'){
    var nx8Specid=new URLSearchParams(location.search).get('specid')||'76642';
    var nx8Variant=nx8Variants[nx8Specid]||nx8Variants['76642'];
    route={pdf:nx8Variant.pdf,dir:nx8Variant.dir,pages:8};
    page.title=nx8Variant.title;
    page.price=nx8Variant.price;
    page.summary='Selected configuration for the Nissan NX8 new-energy export program.';
  }
  if(filename==='vehicle-config-teana.html'){
    var teanaSpecid=new URLSearchParams(location.search).get('specid')||'75719';
    var teanaVariant=teanaVariants[teanaSpecid]||teanaVariants['75719'];
    route={pdf:teanaVariant.pdf,dir:teanaVariant.dir,pages:7};
    page.title=teanaVariant.title;
    page.price=teanaVariant.price;
    page.summary='Selected guide-price configuration for Nissan Teana FOB export consultation.';
  }
  if(filename==='vehicle-config-n7.html'){
    var n7Specid=new URLSearchParams(location.search).get('specid')||'77628';
    var n7Variant=n7Variants[n7Specid]||n7Variants['77628'];
    route={pdf:n7Variant.pdf,dir:n7Variant.dir,pages:7};
    page.title=n7Variant.title;
    page.price=n7Variant.price;
    page.summary='Selected guide-price configuration for Nissan N7 FOB export consultation.';
  }
  if(filename==='vehicle-config-n6.html'){
    var n6Specid=new URLSearchParams(location.search).get('specid')||'77650';
    var n6Variant=n6Variants[n6Specid]||n6Variants['77650'];
    route={pdf:n6Variant.pdf,dir:n6Variant.dir,pages:8};
    page.title=n6Variant.title;
    page.price=n6Variant.price;
    page.summary='Selected guide-price configuration for Nissan N6 FOB export consultation.';
  }
  if(filename==='vehicle-config-sylphy-2026.html'){
    var sylphySpecid=new URLSearchParams(location.search).get('specid')||'76613';
    var sylphyVariant=sylphyVariants[sylphySpecid]||sylphyVariants['76613'];
    route={pdf:sylphyVariant.pdf,dir:sylphyVariant.dir,pages:8};
    page.title=sylphyVariant.title;
    page.price=sylphyVariant.price;
    page.summary='Selected guide-price configuration for Nissan Sylphy FOB export consultation.';
  }
  if(filename==='vehicle-config-tharu.html'){
    var tharuSpecid=new URLSearchParams(location.search).get('specid')||'74072';
    var tharuVariant=tharuVariants[tharuSpecid]||tharuVariants['74072'];
    route={pdf:tharuVariant.pdf,dir:tharuVariant.dir,pages:6};
    page.title=tharuVariant.title;
    page.price=tharuVariant.price;
    page.summary='Selected guide-price configuration for Volkswagen Tharu XR FOB export consultation.';
  }
  if(filename==='vehicle-config-golf.html'){
    var golfSpecid=new URLSearchParams(location.search).get('specid')||'75016';
    var golfVariant=golfVariants[golfSpecid]||golfVariants['75016'];
    route={pdf:golfVariant.pdf,dir:golfVariant.dir,pages:7};
    page.title=golfVariant.title;
    page.price=golfVariant.price;
    page.summary='Selected guide-price configuration for Volkswagen Golf FOB export consultation.';
  }
  if(filename==='vehicle-config-troc.html'){
    var trocSpecid=new URLSearchParams(location.search).get('specid')||'74967';
    var trocVariant=trocVariants[trocSpecid]||trocVariants['74967'];
    route={pdf:trocVariant.pdf,dir:trocVariant.dir,pages:6};
    page.title=trocVariant.title;
    page.price=trocVariant.price;
    page.summary='Selected guide-price configuration for Volkswagen T-Roc FOB export consultation.';
  }
  if(filename==='vehicle-config-teramont.html'){
    var teramontSpecid=new URLSearchParams(location.search).get('specid')||'74970';
    var teramontVariant=teramontVariants[teramontSpecid]||teramontVariants['74970'];
    route={pdf:teramontVariant.pdf,dir:teramontVariant.dir,pages:7};
    page.title=teramontVariant.title;
    page.price=teramontVariant.price;
    page.summary='Selected guide-price configuration for Volkswagen Teramont FOB export consultation.';
  }
  if(filename==='vehicle-config-jetta-vs5.html'){
    var jettaVs5Specid=new URLSearchParams(location.search).get('specid')||'75249';
    var jettaVs5Variant=jettaVs5Variants[jettaVs5Specid]||jettaVs5Variants['75249'];
    route={pdf:jettaVs5Variant.pdf,dir:jettaVs5Variant.dir,pages:6};
    page.title=jettaVs5Variant.title;
    page.price=jettaVs5Variant.price;
    page.summary='Selected guide-price configuration for Volkswagen Jetta VS5 FOB export consultation.';
  }
  if(filename==='vehicle-config-corolla.html'){
    var corollaSpecid=new URLSearchParams(location.search).get('specid')||'76042';
    var corollaVariant=corollaVariants[corollaSpecid]||corollaVariants['76042'];
    route={pdf:corollaVariant.pdf,dir:corollaVariant.dir,pages:7};
    page.title=corollaVariant.title;
    page.price=corollaVariant.price;
    page.summary='Selected guide-price configuration for Toyota Corolla FOB export consultation.';
  }
  if(filename==='vehicle-config-wildlander.html'){
    var wildlanderSpecid=new URLSearchParams(location.search).get('specid')||'75768';
    var wildlanderVariant=wildlanderVariants[wildlanderSpecid]||wildlanderVariants['75768'];
    route={pdf:wildlanderVariant.pdf,dir:wildlanderVariant.dir,pages:8};
    page.title=wildlanderVariant.title;
    page.price=wildlanderVariant.price;
    page.summary='Selected guide-price configuration for Toyota Wildlander FOB export consultation.';
  }
  if(filename==='vehicle-config-camry.html'){
    var specid=new URLSearchParams(location.search).get('specid')||'74001';
    var camryVariant=camryVariants[specid]||camryVariants['74001'];
    route={pdf:camryVariant.pdf,dir:camryVariant.dir,pages:8};
    page.title=camryVariant.title;
    page.price=camryVariant.price;
    page.summary='Selected guide-price configuration for Toyota Camry FOB export consultation.';
  }
  if(filename==='vehicle-config-corolla-cross.html'){
    var corollaCrossSpecid=new URLSearchParams(location.search).get('specid')||'75436';
    var corollaCrossVariant=corollaCrossVariants[corollaCrossSpecid]||corollaCrossVariants['75436'];
    route={pdf:corollaCrossVariant.pdf,dir:corollaCrossVariant.dir,pages:7};
    page.title=corollaCrossVariant.title;
    page.price=corollaCrossVariant.price;
    page.summary='Selected guide-price configuration for Toyota Corolla Cross FOB export consultation.';
  }
  if(filename==='vehicle-config-highlander.html'){
    var highlanderSpecid=new URLSearchParams(location.search).get('specid')||'74933';
    var highlanderVariant=highlanderVariants[highlanderSpecid]||highlanderVariants['74933'];
    route={pdf:highlanderVariant.pdf,dir:highlanderVariant.dir,pages:7};
    page.title=highlanderVariant.title;
    page.price=highlanderVariant.price;
    page.summary='Selected guide-price configuration for Toyota Highlander FOB export consultation.';
  }
  if(filename==='vehicle-config-granvia.html'){
    var granviaSpecid=new URLSearchParams(location.search).get('specid')||'78248';
    var granviaVariant=granviaVariants[granviaSpecid]||granviaVariants['78248'];
    route={pdf:granviaVariant.pdf,dir:granviaVariant.dir,pages:8};
    page.title=granviaVariant.title;
    page.price=granviaVariant.price;
    page.summary='Selected guide-price configuration for Toyota Granvia FOB export consultation.';
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
  if(backLink) backLink.href=resolveBackLink();
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
  var queryParams=new URLSearchParams(location.search);
  var configModelNames={
    'vehicle-config-bz3.html':'Toyota bZ3',
    'vehicle-config-camry.html':'Toyota Camry',
    'vehicle-config-corolla-cross.html':'Toyota Corolla Cross',
    'vehicle-config-corolla.html':'Toyota Corolla',
    'vehicle-config-granvia.html':'Toyota Granvia',
    'vehicle-config-highlander.html':'Toyota Highlander',
    'vehicle-config-nx8.html':'Nissan NX8',
    'vehicle-config-n7.html':'Nissan N7',
    'vehicle-config-n6.html':'Nissan N6',
    'vehicle-config-sylphy-2026.html':'Nissan Sylphy',
    'vehicle-config-qashqai.html':'Nissan Qashqai',
    'vehicle-config-teana.html':'Nissan Teana',
    'vehicle-config-rav4.html':'Toyota RAV4',
    'vehicle-config-tharu.html':'Volkswagen Tharu',
    'vehicle-config-golf.html':'Volkswagen Golf',
    'vehicle-config-troc.html':'Volkswagen T-Roc',
    'vehicle-config-teramont.html':'Volkswagen Teramont',
    'vehicle-config-jetta-vs5.html':'Volkswagen Jetta VS5',
    'vehicle-config-wildlander.html':'Toyota Wildlander',
    'vehicle-config-xtrail.html':'Nissan X-Trail'
  };
  window.chemnitzConsultationContext={
    model_name:configModelNames[filename]||'',
    trim_name:page.title||'',
    guide_price:page.price||'',
    page_language:queryParams.get('lang')||document.documentElement.lang||'en',
    source_page:queryParams.get('from')||location.pathname
  };
  if(window.chemnitzSetConsultationContext){
    window.chemnitzSetConsultationContext(window.chemnitzConsultationContext);
  }
  document.querySelectorAll('[data-wa-number]').forEach(function(link){
    link.href='https://wa.me/'+link.getAttribute('data-wa-number')+'?text='+encodeURIComponent(message);
  });
  window.openWhatsAppChooser=function(){
    if(window.chemnitzTrack){
      window.chemnitzTrack('preorder_contact_choice',window.chemnitzConsultationContext);
    }
    if(modal) modal.classList.add('open');
  };
  window.closeWhatsAppChooser=function(){if(modal) modal.classList.remove('open')};
  if(modal) modal.addEventListener('click',function(event){if(event.target===modal) window.closeWhatsAppChooser()});
})();
