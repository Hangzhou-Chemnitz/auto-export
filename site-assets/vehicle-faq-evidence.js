// Supplemental FAQ facts, checked against the same FAW Toyota CSV on 2026-11-04.
// Bind by source URL, verification date AND trim name: updates need rechecking.
const COROLLA_SOURCE = 'https://operate-static.ftms.com.cn/operate/c179be87f3154597a1d5229a167c691a.csv';
const COROLLA = {
 '卡罗拉1.2T GAS 先锋版': '6.09',
 '卡罗拉1.2T GAS 精英版': '6.13',
 '卡罗拉1.8L HEV 先锋版': '4.13',
 '卡罗拉1.8L HEV 精英版': '4.17',
 '卡罗拉1.8L HEV 旗舰版': '4.45',
 '卡罗拉2.0L GAS 精英版': '6.08'
};

export function faqEvidence(id, data, variant) {
 if (id !== 'vehicle-config-corolla' || data.source?.url !== COROLLA_SOURCE || data.source?.checkedAt !== '2026-11-04') return {};
 const consumption = COROLLA[variant.officialName];
 return consumption ? {
  fuelConsumptionWltcL100km: consumption,
  phoneConnectivity: 'CarLink / CarPlay / HiCar',
  equipment: [{label: {zh: '倒车影像显示系统', en: 'Reversing camera'}, status: 'standard'}],
  sourceUrl: COROLLA_SOURCE,
  checkedAt: '2026-11-04'
 } : {};
}
