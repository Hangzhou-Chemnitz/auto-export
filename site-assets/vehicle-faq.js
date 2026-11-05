import {MODEL_FAQ_PROFILES} from './vehicle-faq-profiles.js';
import {faqEvidence} from './vehicle-faq-evidence.js';

const SPEC_LABELS = {
 fuel: ['燃料类型', 'Fuel type'], power: ['厂家功率数据', 'Manufacturer power figures'],
 transmission: ['变速箱', 'Transmission'], drive: ['驱动方式', 'Drive'],
 dimensions: ['尺寸（长 × 宽 × 高）', 'Dimensions (L × W × H)'],
 wheelbase: ['轴距', 'Wheelbase'], seats: ['座位数 / 布局记录', 'Seats / layout as listed'],
 tires: ['轮胎', 'Tyres'], weight: ['整备质量', 'Curb weight'],
 acceleration: ['0–100 km/h', '0–100 km/h'], torque: ['厂家扭矩数据', 'Manufacturer torque figures']
};

function energyType(variant) {
 const fuel = variant?.specs?.fuel;
 const text = typeof fuel === 'string' ? fuel : `${fuel?.zh || ''} ${fuel?.en || ''}`;
 if (/插电|plug-in/i.test(text)) return 'phev';
 if (/增程|range.extended/i.test(text)) return 'erev';
 if (/纯电|battery electric/i.test(text)) return 'bev';
 if (/HDI/i.test(text)) return 'hybrid';
 if (/油电|双擎|hybrid/i.test(text)) return 'hev';
 if (/汽油|petrol|gasoline/i.test(text)) return 'petrol';
 return 'unknown';
}

// Pure content builder: tested for every official trim in both languages.
export function buildModelFaq({id, name, zh, data, variant, fullName}) {
 const t = (cn, en) => zh ? cn : en;
 const local = value => typeof value === 'string' ? value : value?.[zh ? 'zh' : 'en'] || '';
 const selected = fullName || name;
 const item = (key, question, paragraphs = [], bullets = []) => ({key, question, paragraphs, bullets});
 const type = energyType(variant);
 const electric = ['hev', 'hybrid', 'phev', 'erev', 'bev'].includes(type);
 const common = [
  item('price', t(`${name} 的出口报价包含什么？`, `What is included in an export quote for the ${name}?`), [
   t(`询价时请提供“${selected}”、数量和交付地点。报价应逐项列明车辆、境内运输、出口手续及适用运费，并写明 FOB / EXW 等具体条款与交付地点。`, `Include “${selected}”, quantity and delivery location in your inquiry. The quotation should itemise the vehicle, inland transport, export handling and any applicable freight, with the agreed terms such as FOB / EXW and named delivery location.`),
   t('不要把厂家国内指导价当作出口成交价，也不要默认报价包含目的地税费、清关或上牌。请在付款前核对费用清单及报价有效期。', 'A domestic manufacturer list price is not an export selling price. Do not assume destination taxes, customs clearance or registration are included; check the cost breakdown and quote validity before payment.')
  ]),
  item('availability', t('所选版本、颜色和数量有货吗？多久能发运？', 'Is my selected trim and colour available, and when can it ship?'), [
   t(`本页的“${selected}”是配置资料，不代表实时库存。请提供外观 / 内饰颜色、采购数量及期望交付时间，核对实际车辆的生产日期、版本与供货状态。`, `“${selected}” is a specification reference, not a live stock listing. Provide exterior/interior colour, quantity and target delivery date, then confirm production date, exact trim and vehicle availability.`),
   t('单台或批量订单的可行性、最小数量、备车时间和运输排期需逐单确认；发运日期与到港日期应分开约定。', 'Single-unit or bulk-order feasibility, minimum quantity, preparation and carrier schedules need order-specific confirmation. Agree dispatch and arrival dates separately.')
  ]),
  item('ownership', t(electric ? '出口后整车、电池的保修和配件如何确认？' : '出口后的保修、保养和配件如何确认？', electric ? 'What warranty and parts support applies to the vehicle and battery overseas?' : 'What warranty, servicing and parts support applies overseas?'), [
   t('国内销售版本的保修不能直接当作目的地的保修承诺。下单前应书面确认服务提供方、适用地区、期限 / 里程、覆盖项目及零件和人工费用责任。', 'Do not treat domestic-market warranty terms as a promise of destination-market cover. Obtain written confirmation of the provider, territory, time/mileage limits, covered items and responsibility for parts and labour.'),
   t(electric ? '电池与电驱系统需单独核对覆盖范围。保养资料、诊断支持及配件应按 VIN 和具体版本匹配，不以同车型名称保证通用。' : '保养周期与油液规格应按对应随车手册确认；配件按 VIN、发动机及具体版本匹配，不以同车型名称保证通用。', electric ? 'Check battery and electric-drive coverage separately. Match maintenance information, diagnostic support and parts to the VIN and exact build; a shared model name does not establish compatibility.' : 'Use the matching owner’s manual for service intervals and fluid specifications. Match parts to VIN, engine and build rather than assuming all cars with this model name use the same parts.')
  ]),
  item('documents', t(`进口这款 ${name} 前，需要确认哪些资料？`, `What should I verify before importing this ${name}?`), [
   t('将具体车型版本、VIN / 生产日期、转向位置、车辆登记状态及可提供文件交给目的地的进口商、清关代理或相关机构核对。车辆资料与当地同名车型不能直接互相代替。', 'Have the destination importer, customs broker or relevant authority check the exact trim, VIN/production date, steering position, registration status and available documents. Do not substitute documentation for a locally sold vehicle with the same name.'),
   t('先明确所需文件清单、提供方及费用，再确认订单。页面展示和国内配置标准不构成进口、认证或上牌保证。', 'Confirm the required document list, responsible parties and costs before ordering. A website listing or domestic specification is not a guarantee of import approval, certification or registration.')
  ]),
  item('inspection', t('如何确认发运实车与我选择的版本一致？', 'How can I verify that the actual vehicle matches my selected trim?'), [
   t(`把“${selected}”、颜色、关键装备及选装项目写入确认清单，再按 VIN 核对生产日期、里程、铭牌和车内外照片 / 视频。图库图片不能代替订单实车核验。`, `Record “${selected}”, colours, key equipment and options in the order checklist. Match the VIN, production date, mileage, identification plate and interior/exterior photos or video. Gallery images do not replace checks of the actual order vehicle.`),
   t(electric ? '可在合同中约定交付前检查范围、功能与充电测试（适用时）、电池状态资料，以及发现差异后的处理方式。检查能力和报告范围需事先确认。' : '可在合同中约定交付前检查范围、功能测试及发现差异后的处理方式；第三方验车的可行性、费用和报告范围需事先确认。', electric ? 'Agree the pre-delivery inspection scope, function and charging tests where applicable, battery-condition evidence and discrepancy procedure in the contract. Confirm test capabilities and report scope in advance.' : 'Agree the pre-delivery inspection scope, function tests and discrepancy procedure in the contract. Confirm third-party inspection feasibility, cost and report scope in advance.')
  ]),
  item('mixed-order', t(`这款 ${name} 可以和其他车型一起采购、安排运输吗？`, `Can I order this ${name} together with other models and arrange shipping?`), [
   t(`询价时可以把“${selected}”与其他意向车型、各自数量和目的港列在同一份清单中，分别确认版本、颜色及供货时间。能否合并采购和发运，应以各车型的供货情况及实际订单方案为准。`, `You can include “${selected}”, other requested models, quantities and the destination port in one inquiry. Confirm each trim, colour and availability separately. Combined procurement and dispatch depend on vehicle availability and the agreed order plan.`),
   t('如需混装集装箱，应由物流方根据每款实车的尺寸、重量、箱型及固定防护要求核定方案。不要仅凭车型名称判断装载数量；请在报价中明确分批发运、仓储或额外装卸费用（如适用）。', 'For mixed-model container loading, ask the logistics provider to check actual vehicle dimensions and weights, container type and securing requirements. Do not infer loading capacity from model names; clarify any split-shipment, storage or additional handling costs in the quotation.')
  ])
 ];
 if (!data?.variants?.length || !variant) return common;

 const profile = MODEL_FAQ_PROFILES[id];
 const facts = faqEvidence(id, data, variant);
 const rows = keys => keys.flatMap(key => {
  const value = local(variant.specs?.[key]);
  return value ? [`${t(...SPEC_LABELS[key])}${zh ? '：' : ': '}${value}`] : [];
 });
 const fuels = [...new Set(data.variants.map(v => local(v.specs?.fuel)).filter(Boolean))];
 const edition = variant.year ? t(`${variant.year} 年款`, `${variant.year} model year`) : t('所引官方配置表未标注年款，资料发布日期不作为年款。', 'The cited sheet does not identify a model year; its publication date is not a model year.');
 const versions = item('versions', t(`${name} 有哪些版本，当前选的是哪款？`, `Which ${name} versions are listed, and which have I selected?`), [
  t(`当前选择：${selected}。${edition}`, `Selected: ${selected}. ${edition}`),
  t(`本页官方资料收录 ${data.variants.length} 个年款 / 配置记录，能源类型包括：${fuels.join('、') || '待核对'}。请通过上方选择框比较具体版本；这不是可供现货数量。`, `The official data used here contains ${data.variants.length} model-year/trim records, with these powertrains: ${fuels.join('; ') || 'not verified'}. Compare exact versions using the selectors above; this is not a stock count.`)
 ]);

 const energyQuestions = {
  petrol: [t('这个版本用什么动力和变速箱？油耗怎么看？', 'Which engine and transmission does this trim use, and how should I compare consumption?'), t('请按具体动力与变速箱比较，不把同名车型的其他发动机或年款参数套用过来。燃油标号与保养要求以对应车辆手册为准。', 'Compare the exact engine and transmission, not another engine or model year sharing this model name. Follow the matching owner’s manual for fuel grade and servicing.')],
  hev: [t('这个双擎 / 油电混动版本需要插电吗？', 'Does this HEV version need to be plugged in?'), t('当前为非插电式油电混动（HEV），日常需要加油，无需外接充电。它不同于插电混动；不要把电机功率与发动机功率直接相加当作系统功率。', 'This is a non-plug-in petrol–electric hybrid (HEV): it uses petrol and does not need external charging. It differs from a plug-in hybrid. Do not add engine and motor outputs to infer combined system power.')],
  hybrid: [t('这个 HDI 智混版本的动力数据如何理解？', 'How should I read this HDI hybrid version’s power figures?'), t('按厂家对发动机、电机或系统输出的标注分别理解，不将单项数值相加。混动名称不代表具备纯电车型的续航或充电功能，使用方式应按对应车辆手册核对。', 'Read engine, motor and system outputs as labelled by the manufacturer; do not add them together. A hybrid badge does not establish BEV-like range or charging functions; check the matching owner’s manual.')],
  bev: [t('这个纯电版本续航怎么看，海外充电要核对什么？', 'How should I assess this BEV version’s range and overseas charging?'), t('当前选择为纯电车型。采购前需核对实车交流 / 直流接口、通信协议、当地充电设施及充电设备要求，不默认转接头即可兼容。', 'The selected version is battery electric. Before purchase, verify the actual AC/DC connectors, communication protocols, local charging network and equipment requirements; do not assume an adapter establishes compatibility.')],
  phev: [t('这个插混版本如何补能，纯电续航与总续航一样吗？', 'How is this PHEV charged, and is electric range the same as total range?'), t('当前为插电式混合动力，可使用外接充电与燃油。纯电续航不能与满油满电综合续航混用；应核对电池版本、测试标准及当地充电兼容性。', 'This is a plug-in hybrid, using external charging and fuel. Electric-only range is not the same as combined full-tank/full-battery range. Verify the battery version, test cycle and local charging compatibility.')],
  erev: [t('这个增程版本和纯电版本有什么区别？', 'How does this range-extended version differ from the BEV?'), t('当前选择为增程式，而非纯电版本。采购时分别核对燃油、外接充电、电池和纯电续航资料，不将同车系纯电版本的参数套用到增程版。', 'The selected version is range-extended, not the BEV. Check its fuel, external-charging, battery and electric-only-range information separately; do not apply the BEV specifications to this version.')],
  unknown: [t('这个版本的动力资料应如何核对？', 'How can I verify the powertrain for this trim?'), t('按所选配置表与车辆识别信息确认，尚未核验的能源类型不作推断。', 'Check the selected sheet and vehicle identification; an unverified powertrain type is not inferred.')]
 };
 const [energyQuestion, explanation] = energyQuestions[type];
 const energy = item('energy', energyQuestion, [explanation], rows(['fuel', 'power', 'transmission']));
 if (facts.fuelConsumptionWltcL100km) {
  energy.bullets.push(t(`厂家 WLTC 综合油耗：${facts.fuelConsumptionWltcL100km} L/100 km。`, `Manufacturer WLTC combined fuel consumption: ${facts.fuelConsumptionWltcL100km} L/100 km.`));
  energy.paragraphs.push(t('油耗为所选版本的测试值，不是实际用车保证；路况、温度、载荷和驾驶方式都会影响结果。', 'Consumption is the selected trim’s test figure, not a real-world guarantee; route, temperature, load and driving style affect results.'));
 } else if (variant.performanceDetail?.cltcRangeKm) {
  energy.bullets.push(t(`厂家 CLTC 续航：${variant.performanceDetail.cltcRangeKm} km`, `Manufacturer CLTC range: ${variant.performanceDetail.cltcRangeKm} km`));
  if (variant.performanceDetail.batteryCapacityKwh) energy.bullets.push(t(`厂家电池容量：${variant.performanceDetail.batteryCapacityKwh} kWh`, `Manufacturer battery capacity: ${variant.performanceDetail.batteryCapacityKwh} kWh`));
  energy.paragraphs.push(t('CLTC 是测试工况，不是海外道路实测或 WLTP 数据，不能作为实际续航承诺。', 'CLTC is a test cycle, not an overseas road test or a WLTP result, and is not a promise of real-world range.'));
 } else {
  energy.paragraphs.push(t(['bev','phev','erev'].includes(type) ? '当前已核验数据未收录该版本完整的续航和充电数值，不能从版本名称推算；询价时请确认对应电池配置、测试标准及充电条件。' : '当前已核验数据未收录该版本的油耗测试值，不用其他年款的数字替代；比较用车成本时应采用相同测试标准。', ['bev','phev','erev'].includes(type) ? 'The verified data currently held here does not include a full range/charging specification for this trim. Do not infer figures from its name; request the matching battery specification, test cycle and charging conditions.' : 'The verified data currently held here does not include this trim’s consumption test figure. Do not substitute another model year’s value; use the same test cycle when comparing running costs.'));
 }

 const focusKeys = profile?.specKeys || ['drive', 'dimensions', 'wheelbase'];
 const focus = item('focus', local(profile?.question) || t('这个版本的驱动与空间参数是什么？', 'What are the drive and space specifications for this version?'), [
  local(profile?.note) || t('按当前所选版本核对以下参数。', 'Check the following figures for the selected version.')
 ], rows(focusKeys));
 const missing = focusKeys.filter(key => !local(variant.specs?.[key]));
 if (missing.length) focus.paragraphs.push(t(`当前已核验数据尚无${missing.map(key => SPEC_LABELS[key][0]).join('、')}的明确值，应另行核对实车资料。`, `The verified data currently held here has no explicit value for ${missing.map(key => SPEC_LABELS[key][1].toLowerCase()).join(', ')}; check the actual vehicle documentation.`));

 const features = Object.values(variant.equipment || {}).flat();
 for (const feature of facts.equipment || []) {
  if (!features.some(f => f.label?.zh === feature.label.zh)) features.push(feature);
 }
 const rangeFeatures = data.variants.flatMap(v => Object.values(v.equipment || {}).flat());
 const chosen = [];
 for (const keyword of profile?.featureKeywords || []) {
  const feature = features.find(f => f.label?.zh?.includes(keyword) && !chosen.includes(f));
  if (feature) chosen.push(feature);
  else {
   // Missing from the held summary is not the same as absent from the vehicle.
   const knownLabel = rangeFeatures.find(f => f.label?.zh?.includes(keyword));
   if (knownLabel) chosen.push({label: knownLabel.label, status: 'unknown'});
  }
 }
 if (!chosen.length) chosen.push(...features.slice(0, 4));
 const statuses = {
  standard: t('标配', 'Standard'), optional: t('选配，需确认订单是否选装', 'Optional — confirm it is included in the order'),
  absent: t('未配备', 'Not equipped'), unknown: t('当前版本的已核验摘要未收录，需另行核对', 'Not recorded in the held summary for this trim — verify separately')
 };
 const equipment = item('equipment', local(profile?.featureQuestion) || t('所选版本有哪些关键装备？', 'Which key features does the selected trim include?'), [
  t('以下仅列当前版本的重点装备。选配不等于已安装，未配备也不代表可以后期加装；完整项目请查看上方配置区域。', 'These are selected features for the current trim. Optional does not mean fitted, and absence does not establish retrofit feasibility. See the specification section above for more items.')
 ], chosen.slice(0, 4).map(f => `${local(f.label)} — ${statuses[f.status] || statuses.unknown}`));
 if (!chosen.length) equipment.paragraphs.push(t('当前未收录可核验的装备条目，请按实车配置确认。', 'No verified equipment entries are held here; confirm against the actual build.'));

 const compatibility = item('compatibility', t(`中国版 ${name} 的车机和海外版本一样吗？`, `Does this China-market ${name} have the same software as the local-market version?`), [
  facts.phoneConnectivity ? t(`所引厂家配置表为当前版本列有 ${facts.phoneConnectivity}。这不等于 Android Auto、英文 / 西班牙文菜单或海外联网服务已获确认。`, `The cited manufacturer sheet lists ${facts.phoneConnectivity} for this trim. This does not confirm Android Auto, English/Spanish menus or overseas connected services.`) : t('本页依据中国市场配置资料，不能把当地同名车型的语言、手机互联或联网功能直接套用。国内标配装备与功能在海外能否使用，需要分别核对。', 'This page uses China-market specifications. Do not transfer language, smartphone or connected-service claims from a locally sold vehicle with the same name. Domestic equipment fitment and overseas functionality are separate checks.'),
  t('付款前应按实车确认菜单语言、CarPlay / Android Auto、地图、账号 / App 和 OTA 的可用范围；可将演示与核对结果列入订单确认清单。', 'Before payment, verify menus, CarPlay/Android Auto, maps, account/app access and OTA availability on the actual vehicle. Include demonstrations and confirmed results in the order checklist.')
 ]);
 return [versions, energy, focus, equipment, compatibility, ...common];
}

const node = (tag, text, className) => {
 const result = document.createElement(tag);
 if (text) result.textContent = text;
 if (className) result.className = className;
 return result;
};

export function createModelFaq({id, name, zh}) {
 const panel = node('div', '', 'faq-panel');
 panel.dataset.model = id;
 panel.append(node('h2', name + (zh ? ' · 选车与出口问答' : ' · Buying & export questions')));
 const context = node('p', zh ? '正在读取所选版本的官方资料…' : 'Loading the selected version’s official data…', 'faq-context');
 context.setAttribute('role', 'status');context.setAttribute('aria-live', 'polite');
 const note = node('p', zh ? '车型答案随上方配置选择更新；厂家来源见技术规格区。库存及交易条件按实际订单确认。' : 'Model answers update with the selected trim. Manufacturer sources appear in the specifications section. Confirm stock and trading terms for the actual order.', 'faq-note');
 panel.append(context, note, node('div', '', 'faq-list'));
 panel.dataset.faqStatus = 'loading';
 return panel;
}

export function updateModelFaq(args) {
 const panel = document.querySelector('.faq-panel');
 if (!panel) return;
 const {zh, variant, fullName} = args;
 panel.dataset.faqStatus = variant ? 'ready' : 'unavailable';
 panel.dataset.trim = variant?.id || '';
 panel.querySelector('.faq-context').textContent = variant ? (zh ? '当前配置：' : 'Selected trim: ') + fullName : (zh ? '车型资料暂不可用；以下仅显示通用采购核对事项，请勿据此确认车辆配置。' : 'Model data is unavailable. Only general purchasing checks are shown below; they do not confirm a vehicle specification.');
 const list = panel.querySelector('.faq-list');
 const questions = buildModelFaq(args);
 const keys = new Set(questions.map(q => q.key));
 for (const old of [...list.children]) if (!keys.has(old.dataset.faqKey)) old.remove();
 questions.forEach((q, i) => {
  let detail = [...list.children].find(d => d.dataset.faqKey === q.key);
  if (!detail) {
   detail = node('details');detail.dataset.faqKey = q.key;detail.open = i === 0;
   detail.append(node('summary'), node('div', '', 'faq-answer'));
  }
  detail.querySelector('summary').textContent = q.question;
  const answer = detail.querySelector('.faq-answer');
  answer.replaceChildren(...q.paragraphs.map(p => node('p', p)));
  if (q.bullets.length) {
   const ul = node('ul');ul.append(...q.bullets.map(b => node('li', b)));answer.append(ul);
  }
  // Keep existing <details>/<summary> nodes so open state and focus survive trim changes.
  if (list.children[i] !== detail) list.insertBefore(detail, list.children[i] || null);
 });
}
