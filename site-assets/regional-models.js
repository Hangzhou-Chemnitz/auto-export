// Country-specific public samples, not continental sales rankings or import advice.
export const REVIEWED_AT = '2026-11-04';

const COMMON_CAVEAT = {
 zh: '同名或关联车系不代表中国版本的代际、配置、转向位置、认证或进口资格一致。样本统计期不同；列表顺序不是销量排名。',
 en: 'A nameplate or related-model match does not establish equivalence to China-market generations, trims, steering position or approval/import eligibility. Sample periods differ; list order is not a sales ranking.'
};

const EDITORIAL_EVIDENCE = {
 zh: '沿用首页精选车型，供继续浏览；不作当地销量或热销声明。',
 en: 'A homepage-featured model for further browsing; no local sales or popularity claim.'
};

export const REGIONAL_SHORTLISTS = {
 'latin-america': {
  label: {zh: '拉丁美洲', en: 'Latin America'},
  scope: {
   zh: '参考智利与巴西 2025 全年公开销量及登记数据，仅代表这两个样本市场。',
   en: 'Based on public full-year 2025 sales and registration samples from Chile and Brazil, not a Latin America-wide ranking.'
  },
  caveat: COMMON_CAVEAT,
  models: [
   {
    id: 'vehicle-config-corolla-cross',
    evidence: {
     zh: '巴西 2025 年登记 59,674 辆，SUV 类第 6；智利同期 2,358 辆，SUV 类第 20。',
     en: 'Brazil, 2025: 59,674 registrations, No. 6 among SUVs. Chile, 2025: 2,358 sales, No. 20 among SUVs.'
    },
    sourceIds: ['fenabrave-2025', 'anac-2025'], match: 'nameplate'
   },
   {
    id: 'vehicle-config-corolla',
    evidence: {
     zh: '巴西 2025 年登记 33,170 辆，中型轿车类第 1，细分市场份额 54.99%。',
     en: 'Brazil, 2025: 33,170 registrations; No. 1 in medium sedans, with a 54.99% segment share.'
    },
    sourceIds: ['fenabrave-2025'], match: 'nameplate'
   },
   {
    id: 'vehicle-config-rav4',
    evidence: {
     zh: '智利 2025 年销量 3,427 辆，SUV 类第 11。',
     en: 'Chile, 2025: 3,427 sales, No. 11 among SUVs.'
    },
    sourceIds: ['anac-2025'], match: 'nameplate'
   },
   {
    id: 'vehicle-config-coolray',
    evidence: {
     zh: '智利 2025 年销量 2,466 辆，SUV 类第 18。',
     en: 'Chile, 2025: 2,466 sales, No. 18 among SUVs.'
    },
    sourceIds: ['anac-2025'], match: 'nameplate'
   },
   {
    id: 'vehicle-config-tiggo-5x',
    evidence: {
     zh: '巴西 2025 年 CAOA Chery Tiggo 5X 登记 13,670 辆，SUV 类第 22。',
     en: 'Brazil, 2025: CAOA Chery Tiggo 5X recorded 13,670 registrations, No. 22 among SUVs.'
    },
    sourceIds: ['fenabrave-2025'], match: 'nameplate'
   }
  ],
  sources: [
   {
    id: 'anac-2025',
    title: {zh: 'ANAC：智利 2025 年12月汽车市场报告', en: 'ANAC: Chile December 2025 automotive market report'},
    url: 'https://www.anac.cl/wp-content/uploads/2026/01/12-ANAC-Mercado-Automotor-Diciembre-2025.pdf',
    type: {zh: '行业协会报告（一手）', en: 'Industry association report (primary)'}
   },
   {
    id: 'fenabrave-2025',
    title: {zh: 'FENABRAVE：巴西 2025 年12月车辆登记报告', en: 'FENABRAVE: Brazil December 2025 vehicle registration report'},
    url: 'https://www.fenabrave.org.br/portal/files/2025_12_02.pdf',
    type: {zh: '汽车经销行业协会报告（一手）', en: 'Automotive dealer association report (primary)'}
   }
  ]
 },
 'middle-east': {
  label: {zh: '中东', en: 'Middle East'},
  scope: {
   zh: '参考沙特 2025 全年、2026 上半年及阿联酋 2025 上半年公开市场报道，不代表整个中东排名。',
   en: 'Saudi Arabia full-year 2025 and H1 2026, plus UAE H1 2025 market-report samples; not a Middle East-wide ranking.'
  },
  caveat: COMMON_CAVEAT,
  models: [
   {
    id: 'vehicle-config-camry',
    evidence: {
     zh: '沙特 2026 上半年：燃油与 HEV 合计销量第 1，市场份额 6.3%。',
     en: 'Saudi Arabia, H1 2026: No. 1 with petrol and HEV combined, representing 6.3% of the market.'
    },
    sourceIds: ['bscb-saudi-h1-2026'], match: 'nameplate'
   },
   {
    id: 'vehicle-config-elantra',
    evidence: {
     zh: '沙特 2026 上半年：销量第 5，同比下降 27.6%。',
     en: 'Saudi Arabia, H1 2026: No. 5; sales fell 27.6% year on year.'
    },
    sourceIds: ['bscb-saudi-h1-2026'], match: 'nameplate'
   },
   {
    id: 'vehicle-config-corolla',
    evidence: {
     zh: '沙特 2025 全年：销量第 7，同比增长 13.2%。',
     en: 'Saudi Arabia, full-year 2025: No. 7, with sales up 13.2% year on year.'
    },
    sourceIds: ['bscb-saudi-2025'], match: 'nameplate'
   },
   {
    id: 'vehicle-config-xtrail',
    evidence: {
     zh: '阿联酋 2025 上半年：X-Trail 销量第 5，同比增长 29.4%。',
     en: 'UAE, H1 2025: X-Trail ranked No. 5, up 29.4% year on year.'
    },
    sourceIds: ['bscb-uae-h1-2025'], match: 'nameplate'
   }
  ],
  sources: [
   {
    id: 'bscb-saudi-h1-2026',
    title: {zh: 'BSCB：沙特 2026 上半年市场报告', en: 'BSCB: Saudi Arabia H1 2026 market report'},
    url: 'https://bestsellingcarsblog.com/2026/08/saudi-arabia-h1-2026-haval-48-jetour-22-6-islands-of-growth-in-market-off-23-5/',
    type: {zh: '专业汽车销量媒体（二手来源，公开摘要）', en: 'Specialist vehicle-sales reporting (secondary; public summary)'}
   },
   {
    id: 'bscb-saudi-2025',
    title: {zh: 'BSCB：沙特 2025 全年市场报告', en: 'BSCB: Saudi Arabia full-year 2025 market report'},
    url: 'https://bestsellingcarsblog.com/2026/02/saudi-arabia-full-year-2025-hyundai-accent-snaps-to-spot-toyota-camry-real-leader-highest-volume-in-10-years/',
    type: {zh: '专业汽车销量媒体（二手来源，公开摘要）', en: 'Specialist vehicle-sales reporting (secondary; public summary)'}
   },
   {
    id: 'bscb-uae-h1-2025',
    title: {zh: 'BSCB：阿联酋 2025 上半年市场报告', en: 'BSCB: UAE H1 2025 market report'},
    url: 'https://bestsellingcarsblog.com/2025/08/united-arab-emirates-h1-2025-toyota-hilux-above-nissan-patrol-jetour-t2-up-to-4/',
    type: {zh: '专业汽车销量媒体（二手来源，公开摘要）', en: 'Specialist vehicle-sales reporting (secondary; public summary)'}
   }
  ]
 },
 'central-asia': {
  label: {zh: '中亚', en: 'Central Asia'},
  scope: {
   zh: '参考哈萨克斯坦 2025 全年及 2026 上半年数据，不代表其他中亚国家。',
   en: 'Kazakhstan full-year 2025 and H1 2026 samples; these do not represent other Central Asian countries.'
  },
  caveat: COMMON_CAVEAT,
  models: [
   {
    id: 'vehicle-config-sportage',
    evidence: {
     zh: '哈萨克斯坦 2026 上半年：Sportage 销量 5,200 辆，全国车型第 3。',
     en: 'Kazakhstan, H1 2026: Sportage sold 5,200 units, No. 3 nationally by model.'
    },
    sourceIds: ['kau-h1-2026'], match: 'nameplate'
   },
   {
    id: 'vehicle-config-changan-cs55',
    evidence: {
     zh: '哈萨克斯坦 2026 上半年：CS55 Plus 销量 4,017 辆，全国车型第 4。',
     en: 'Kazakhstan, H1 2026: CS55 Plus sold 4,017 units, No. 4 nationally by model.'
    },
    sourceIds: ['kau-h1-2026'], match: 'nameplate'
   },
   {
    id: 'vehicle-config-elantra',
    evidence: {
     zh: '哈萨克斯坦 2025 全年：Elantra 销量 7,867 辆，全国车型第 5。',
     en: 'Kazakhstan, full-year 2025: Elantra sold 7,867 units, No. 5 nationally by model.'
    },
    sourceIds: ['kau-2025'], match: 'nameplate'
   },
   {
    id: 'vehicle-config-coolray',
    evidence: {
     zh: '哈萨克斯坦 2025 全年：Geely 官方经销方公布 Coolray 销量 3,259 辆；未宣称全国排名。',
     en: 'Kazakhstan, full-year 2025: Geely’s official distributor reported 3,259 Coolray sales; no national rank is claimed.'
    },
    sourceIds: ['geely-kazakhstan-2025'], match: 'nameplate'
   }
  ],
  sources: [
   {
    id: 'kau-h1-2026',
    title: {zh: '哈萨克斯坦汽车联盟：2026 上半年销量报告', en: 'Kazakhstan Automobile Union: H1 2026 sales report'},
    url: 'https://kao.kz/en/novosti/93/',
    type: {zh: '汽车行业联盟报告（一手）', en: 'Automotive industry union report (primary)'}
   },
   {
    id: 'kau-2025',
    title: {zh: '哈萨克斯坦汽车联盟：2025 全年销量报告', en: 'Kazakhstan Automobile Union: full-year 2025 sales report'},
    url: 'https://kao.kz/en/novosti/78/',
    type: {zh: '汽车行业联盟报告（一手）', en: 'Automotive industry union report (primary)'}
   },
   {
    id: 'geely-kazakhstan-2025',
    title: {zh: 'Geely 哈萨克斯坦：2025 年销售表现', en: 'Geely Kazakhstan: 2025 sales performance'},
    url: 'https://geely.kz/ru/news/74/',
    type: {zh: '官方经销方销售披露（一手）', en: 'Official distributor sales disclosure (primary)'}
   }
  ]
 },
 africa: {
  label: {zh: '非洲', en: 'Africa'},
  scope: {
   zh: '分别参考埃及 2025 年 Car-C 轿车细分市场及南非 2025 年销量；不是非洲统一排行榜。',
   en: 'Separate samples: Egypt’s 2025 Car-C sedan segment and South Africa’s 2025 sales, not a continent-wide ranking.'
  },
  caveat: {
   zh: '埃及与南非是独立样本，不可合并为非洲排名。南非为右舵市场样本，不证明中国左舵版本适用。同名或关联车系不代表中国版本的代际、配置、转向位置、认证或进口资格一致。样本统计期不同；列表顺序不是销量排名。',
   en: 'Egypt and South Africa are separate samples, not an African ranking. South Africa is a right-hand-drive market sample, not evidence that a Chinese left-hand-drive version is applicable. Nameplate or related-model matches do not establish equivalent China-market generations, trims, steering or approval/import eligibility. Sample periods differ; list order is not a sales ranking.'
  },
  models: [
   {
    id: 'vehicle-config-corolla',
    evidence: {
     zh: '埃及 2025 年：Corolla 在 Car-C 细分市场第 2，份额 16.5%；并非全国全车型排名。',
     en: 'Egypt, 2025: Corolla ranked No. 2 in the Car-C segment, with 16.5% share; not an all-model national rank.'
    },
    sourceIds: ['egypt-car-c-2025'], match: 'nameplate'
   },
   {
    id: 'vehicle-config-elantra',
    evidence: {
     zh: '埃及 2025 年：Elantra AD 在 Car-C 类第 1，份额 30.7%。AD 与本目录中国版 Elantra 不同代，仅为关联车系参考。',
     en: 'Egypt, 2025: Elantra AD led Car-C with 30.7% share. AD is a different generation from the China-market Elantra listed here; this is related-family evidence only.'
    },
    sourceIds: ['egypt-car-c-2025'], match: 'related'
   },
   {
    id: 'vehicle-config-corolla-cross',
    evidence: {
     zh: '南非 2025 年：Corolla Cross 销量 22,191 辆。右舵市场样本，不代表中国左舵版本适用。',
     en: 'South Africa, 2025: Corolla Cross sold 22,191 units. This right-hand-drive market sample does not establish applicability of a Chinese left-hand-drive version.'
    },
    sourceIds: ['toyota-south-africa-2025'], match: 'nameplate'
   }
  ],
  sources: [
   {
    id: 'egypt-car-c-2025',
    title: {zh: 'Z Auto Show：埃及 2025 年 Car-C 市场（引述 AMIC）', en: 'Z Auto Show: Egypt 2025 Car-C market, citing AMIC'},
    url: 'https://zautoshow.com/?p=3477',
    type: {zh: '汽车媒体转述 AMIC 数据（二手来源）', en: 'Automotive-media report of AMIC data (secondary)'}
   },
   {
    id: 'toyota-south-africa-2025',
    title: {zh: 'Toyota：南非 2025 年销量回顾（经销商转载）', en: 'Toyota: South Africa 2025 sales review, reproduced by a dealer'},
    url: 'https://www.mmgtoyotaestcourt.africa/result/Articles/TOYOTA-POSTS-BEST-ANNUAL-SALES-SINCE-2007-21916?DateFormat=dd+MMM+yyyy&HAF=False',
    type: {zh: 'Toyota 新闻稿的经销商转载（非厂家原始发布页）', en: 'Dealer reproduction of a Toyota release (not the original manufacturer-hosted page)'}
   }
  ]
 },
 other: {
  label: {zh: '其他地区', en: 'Other regions'},
  scope: {
   zh: '尚未选择具体市场；这里展示首页六款精选车型，不代表任何国家或地区的销量排名。',
   en: 'No specific market has been selected. These are the six homepage-featured models, not a national or regional sales ranking.'
  },
  caveat: {
   zh: '这里是现有主推车型的浏览入口，不是区域热销榜。请先确定目的国家，再核对具体版本、供货情况与目的地适用性。',
   en: 'This is a browsing shortlist of our featured models, not a regional bestseller list. Identify the destination country, then verify the exact version, availability and destination suitability.'
  },
  models: [
   {id: 'vehicle-config-rav4', evidence: EDITORIAL_EVIDENCE, sourceIds: [], match: 'editorial'},
   {id: 'vehicle-config-camry', evidence: EDITORIAL_EVIDENCE, sourceIds: [], match: 'editorial'},
   {id: 'vehicle-config-sylphy', evidence: EDITORIAL_EVIDENCE, sourceIds: [], match: 'editorial'},
   {id: 'vehicle-config-teramont', evidence: EDITORIAL_EVIDENCE, sourceIds: [], match: 'editorial'},
   {id: 'vehicle-config-corolla-cross', evidence: EDITORIAL_EVIDENCE, sourceIds: [], match: 'editorial'},
   {id: 'vehicle-config-xtrail', evidence: EDITORIAL_EVIDENCE, sourceIds: [], match: 'editorial'}
  ],
  sources: []
 }
};
