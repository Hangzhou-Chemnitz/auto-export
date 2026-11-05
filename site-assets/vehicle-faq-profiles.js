// Model-specific copy is grounded in the local official trim datasets.
// Live answers append the selected trim's specifications and equipment states.
// A legacy route key must not override the model identity in the current sheet.
export const MODEL_FAQ_PROFILES = {
  'vehicle-config-rav4': {
    question: { zh: '这款RAV4是前驱、汽油四驱，还是E-FOUR双擎四驱？', en: 'Is this RAV4 front-wheel drive, petrol AWD or E-FOUR hybrid AWD?' },
    note: { zh: '当前配置表包含前驱、适时四驱和E-FOUR三种驱动标注；双擎名称本身不代表四驱。比较时请同时核对燃料类型与驱动形式。', en: 'The current sheet distinguishes front-wheel drive, on-demand AWD and E-FOUR. A hybrid badge alone does not mean AWD; check both fuel type and drive system.' },
    specKeys: ['fuel', 'drive', 'power'],
    featureQuestion: { zh: '这版RAV4的全景影像、电动尾门与座椅加热是否配备？', en: 'Does this RAV4 trim include panoramic monitoring, a power tailgate and heated front seats?' },
    featureKeywords: ['PVM全景', '电动尾门', '前排座椅加热']
  },
  'vehicle-config-corolla': {
    question: { zh: '卡罗拉不同动力版本的车身和变速箱也一样吗？', en: 'Do Corolla powertrain versions share the same body dimensions and transmission?' },
    note: { zh: '本表同时列出1.2T、1.8L双擎和2.0L版本，车身尺寸及轴距并非全部相同；不要把一个版本的参数套用于全系。', en: 'This sheet covers 1.2T, 1.8L hybrid and 2.0L versions, with differing dimensions and wheelbases. Use the selected version rather than one specification for the whole range.' },
    specKeys: ['fuel', 'transmission', 'dimensions', 'wheelbase'],
    featureQuestion: { zh: '卡罗拉的倒车影像、自动空调和一键启动如何随版本区分？', en: 'Which reversing-camera, automatic-climate and push-button-start features are listed for this Corolla?' },
    featureKeywords: ['倒车影像', '自动空调', '一键启动']
  },
  'vehicle-config-corolla-cross': {
    question: { zh: '卡罗拉锐放的汽油版和双擎版，主要动力参数有何区别？', en: 'How do petrol and hybrid Corolla Cross powertrains differ in this sheet?' },
    note: { zh: '当前锐放版本均标注前驱，汽油版与双擎版的变速系统及功率口径不同；混动系统功率不要与发动机功率混为一项。', en: 'The listed Corolla Cross versions are front-wheel drive, but petrol and hybrid transmissions and output figures differ. Hybrid system output is distinct from engine output.' },
    specKeys: ['fuel', 'transmission', 'power', 'drive'],
    featureQuestion: { zh: '锐放这版有后排出风口、无线充电和倒车影像吗？', en: 'Does this Corolla Cross have rear air vents, wireless charging and a reversing camera?' },
    featureKeywords: ['后排出风口', '无线充电', '倒车影像']
  },
  'vehicle-config-camry': {
    question: { zh: '凯美瑞汽油、2.0L双擎与2.5L双擎该怎样对比？', en: 'How should I compare Camry petrol, 2.0L hybrid and 2.5L hybrid versions?' },
    note: { zh: '当前表内均为前驱，但汽油与双擎使用不同变速系统；双擎参数分别标明发动机和系统输出。', en: 'All versions in this sheet are front-wheel drive, while petrol and hybrid transmissions differ. Hybrid figures identify engine output separately from total system output.' },
    specKeys: ['fuel', 'power', 'transmission', 'drive'],
    featureQuestion: { zh: '这版凯美瑞前后排座椅舒适功能及全景影像有哪些？', en: 'Which front- and rear-seat comfort features and panoramic monitoring are listed for this Camry?' },
    featureKeywords: ['前排座椅加热/通风', '后排座椅加热/通风', 'PVM全景']
  },
  'vehicle-config-highlander': {
    question: { zh: '汉兰达应先确认五座或七座，还是双擎或380T？', en: 'Which seating and powertrain combination is selected for this Highlander?' },
    note: { zh: '本表包含五座与七座版本，也区分双擎和380T汽油动力；双擎四驱与380T四驱的官方系统名称不同，应按具体版本核对。', en: 'This sheet includes five- and seven-seat versions, plus hybrid and 380T petrol powertrains. The hybrid AWD and 380T AWD systems have different official designations.' },
    specKeys: ['seats', 'fuel', 'drive', 'transmission'],
    featureQuestion: { zh: '汉兰达家庭用车常关注的二排加热、电动尾门与全景影像配齐了吗？', en: 'Does this Highlander include second-row heating, a power tailgate and panoramic monitoring?' },
    featureKeywords: ['第二排座椅加热', '电动尾门', 'PVM全景']
  },
  'vehicle-config-wildlander': {
    question: { zh: '这页锋兰达的汽油与双擎版本如何区分？', en: 'How do the petrol and hybrid Frontlander versions on this page differ?' },
    note: { zh: '本页对应广汽丰田锋兰达，旧链接名称不代表威兰达；应使用锋兰达本身的动力和尺寸数据，不套用其他丰田SUV参数。', en: 'This page represents GAC Toyota Frontlander despite its legacy URL. Use the Frontlander powertrain and dimensions shown here, not specifications from another Toyota SUV.' },
    specKeys: ['fuel', 'power', 'transmission', 'dimensions'],
    featureQuestion: { zh: '锋兰达这版的全景影像、盲区监测与无线充电如何配置？', en: 'What are this Frontlander trim’s panoramic-monitoring, blind-spot and wireless-charging specifications?' },
    featureKeywords: ['PVM全景', 'BSM并线', '手机无线充电']
  },
  'vehicle-config-granvia': {
    question: { zh: '格瑞维亚的驱动形式、车身尺寸和乘坐布局该怎样核对？', en: 'What should I check about Granvia drive systems, dimensions and seating arrangements?' },
    note: { zh: '当前配置包含前驱、E-Four及福祉版本，车高也有差异；多人乘坐时还应单独确认所选版本的座位布局与上下车安排。', en: 'The current range includes front-wheel-drive, E-Four and accessible-seat versions, with differing heights. Confirm the selected seating layout and passenger-access arrangements separately.' },
    specKeys: ['drive', 'dimensions', 'wheelbase', 'transmission'],
    featureQuestion: { zh: '格瑞维亚的双侧电动门、后排娱乐与全景影像是否为本版配置？', en: 'Are dual power sliding doors, rear entertainment and panoramic monitoring included on this Granvia?' },
    featureKeywords: ['双侧电动侧滑门', '后排影音', 'PVM全景']
  },
  'vehicle-config-bz3': {
    question: { zh: 'bZ3各版本电机功率相同吗？', en: 'Do all bZ3 versions have the same motor output?' },
    note: { zh: '本表中的bZ3均为纯电前驱，但电机功率随版本变化；续航、充电接口与充电条件应另查对应版本的完整资料。', en: 'The listed bZ3 versions are battery-electric and front-wheel drive, but motor output varies. Check the full trim documentation separately for range, charging connectors and charging conditions.' },
    specKeys: ['fuel', 'power', 'drive'],
    featureQuestion: { zh: 'bZ3的热泵空调、座椅加热与全景监控有哪些配置差别？', en: 'What heat-pump, seat-heating and panoramic-monitoring equipment is listed for this bZ3?' },
    featureKeywords: ['热泵空调', '前排座椅加热', 'PVM全景']
  },
  'vehicle-config-teramont': {
    question: { zh: '途昂Pro的380TSI与450TSI，驱动和动力是否不同？', en: 'How do Teramont Pro 380TSI and 450TSI drive systems and outputs differ?' },
    note: { zh: '本页使用途昂Pro配置；380TSI与450TSI在本表中分别对应前驱和4Motion四驱，核对时还应结合车身尺寸与停车空间。', en: 'This page uses Teramont Pro specifications. The listed 380TSI and 450TSI versions correspond to front-wheel drive and 4Motion AWD respectively; also compare dimensions with your parking space.' },
    specKeys: ['power', 'drive', 'dimensions', 'wheelbase'],
    featureQuestion: { zh: '途昂Pro这版有二排加热、前排按摩及电动尾门吗？', en: 'Does this Teramont Pro have second-row heating, front-seat massage and a power tailgate?' },
    featureKeywords: ['二排座椅加热', '前排座椅10点按摩', '电动尾门']
  },
  'vehicle-config-tharu': {
    question: { zh: '途岳新锐1.5L和300TSI的变速箱、动力有什么区别？', en: 'How do Tharu XR 1.5L and 300TSI transmissions and outputs differ?' },
    note: { zh: '此处为途岳新锐（Tharu XR），不是其他途岳版本；当前表区分六挡与七挡自动变速器，不能仅按“途岳”名称套用参数。', en: 'This is Tharu XR, not another Tharu version. The current sheet distinguishes six- and seven-speed automatic transmissions, so the Tharu name alone is not enough to identify specifications.' },
    specKeys: ['power', 'torque', 'transmission', 'dimensions'],
    featureQuestion: { zh: '途岳新锐的倒车影像、自适应巡航和座椅加热在这版如何配置？', en: 'How are reversing-camera, adaptive-cruise and heated-seat features specified on this Tharu XR?' },
    featureKeywords: ['泊车后视影像', '自适应巡航', '前排座椅加热']
  },
  'vehicle-config-troc': {
    question: { zh: '探歌280TSI与300TSI应该核对哪些动力数据？', en: 'Which powertrain figures distinguish T-Roc 280TSI and 300TSI versions?' },
    note: { zh: '当前探歌版本均列为前驱、七速双离合，但功率与扭矩转速区间有所不同；版本编号不是可直接比较的功率单位。', en: 'The listed T-Roc versions use front-wheel drive and a seven-speed dual-clutch transmission, while power and torque rpm ranges differ. The trim numbers are not power units.' },
    specKeys: ['power', 'torque', 'transmission', 'drive'],
    featureQuestion: { zh: '探歌这版配电动尾门、前排加热和自适应巡航吗？', en: 'Does this T-Roc include a power tailgate, heated front seats and adaptive cruise control?' },
    featureKeywords: ['电动尾门', '前排座椅加热', '自适应巡航']
  },
  'vehicle-config-golf': {
    question: { zh: '高尔夫300TSI、Pro和R-Line的动力相同吗？', en: 'Do Golf 300TSI, Pro and R-Line share the same listed powertrain?' },
    note: { zh: '当前三款300TSI的发动机输出与变速箱相同，车身长度和部分装备存在差异；R-Line名称不等于本表提供更高功率。', en: 'These three 300TSI versions share the listed engine output and transmission, with differences in length and equipment. R-Line does not indicate higher output in this sheet.' },
    specKeys: ['power', 'transmission', 'dimensions'],
    featureQuestion: { zh: '高尔夫的前排通风、方向盘加热与ACC是否随版本变化？', en: 'What front-seat ventilation, heated-steering-wheel and ACC equipment is listed for this Golf?' },
    featureKeywords: ['前排通风座椅', '方向盘加热', 'ACC 3.0']
  },
  'vehicle-config-jetta-vs5': {
    question: { zh: '捷达VS5手动和自动版本如何确认，年款能混用吗？', en: 'How do I identify manual versus automatic Jetta VS5 versions and their model years?' },
    note: { zh: '本表同时保留明确年款和未标年款版本，手动与自动变速箱也分别列示；请按完整版本名称匹配，勿只看280TSI。', en: 'This sheet retains both explicitly dated and undated versions, with manual and automatic transmissions listed separately. Match the full trim name, not just the 280TSI badge.' },
    specKeys: ['transmission', 'drive', 'power'],
    featureQuestion: { zh: '这版VS5的倒车影像、前排座椅加热与ACC分别是什么状态？', en: 'What are the reversing-camera, heated-front-seat and ACC statuses for this VS5?' },
    featureKeywords: ['倒车影像', '前排座椅加热', 'ACC自适应巡航']
  },
  'vehicle-config-coolray': {
    question: { zh: '这页Coolray对应哪款缤越，是手动还是CVT？', en: 'Which China-market Binyue does this Coolray page cover, and is it manual or CVT?' },
    note: { zh: '当前数据对应吉利缤越超能版，包含5MT与CVT；不能仅凭Coolray名称套用其他市场或其他缤越版本的动力规格。', en: 'The data covers Geely Binyue Chaoneng with 5MT and CVT versions. The Coolray name alone does not establish specifications for other markets or Binyue variants.' },
    specKeys: ['power', 'transmission', 'dimensions'],
    featureQuestion: { zh: '缤越超能版这款有倒车影像、定速巡航和电动天窗吗？', en: 'Does this Binyue Chaoneng trim have a reversing camera, cruise control and a power sunroof?' },
    featureKeywords: ['倒车影像', '定速巡航', '电动天窗']
  },
  'vehicle-config-boyue': {
    question: { zh: '博越各版本动力一致时，还应比较哪些规格？', en: 'With the same listed powertrain, which Boyue specifications should I compare?' },
    note: { zh: '当前博越版本的功率、前驱形式和七速湿式双离合相同，轮胎规格与整备质量存在差异，可结合舒适装备一起比较。', en: 'The listed Boyue trims share output, front-wheel drive and a seven-speed wet dual-clutch transmission. Tyre specifications and curb weights differ and can be compared alongside comfort equipment.' },
    specKeys: ['power', 'transmission', 'tires', 'weight'],
    featureQuestion: { zh: '博越的540°影像、自适应巡航和电动尾门是否为本版装备？', en: 'Are 540-degree imaging, adaptive cruise and a power tailgate listed for this Boyue?' },
    featureKeywords: ['540°', 'ACC自适应巡航', '电动后尾门']
  },
  'vehicle-config-xingyue-l': {
    question: { zh: '星越L的DHT、7DCT和8AT分别属于哪类版本？', en: 'Which powertrain and drive combination is selected for this Xingyue L?' },
    note: { zh: '星越L当前表同时包含汽油与油电混合、前驱与四驱，并有多种变速系统；仅按“星越L”名称无法确定动力组合。', en: 'The current Xingyue L sheet includes petrol and hybrid versions, front-wheel drive and AWD, and several transmissions. The model name alone does not identify the powertrain combination.' },
    specKeys: ['fuel', 'transmission', 'drive', 'power'],
    featureQuestion: { zh: '星越L这版的前排加热、后排出风口与AEB有哪些记录？', en: 'What front-seat heating, rear-vent and AEB equipment is recorded for this Xingyue L?' },
    featureKeywords: ['前排座椅加热', '后排空调出风口', 'AEB城市']
  },
  'vehicle-config-niuzai': {
    question: { zh: '牛仔的造型是否代表四驱，实际驱动怎么确认？', en: 'Does Niuzai’s styling mean AWD, and what drive system is actually listed?' },
    note: { zh: '当前牛仔配置表列为前置前驱和七速湿式双离合；外观风格、行李架或版本名称不能代替驱动形式参数。', en: 'The current Niuzai sheet specifies front-wheel drive and a seven-speed wet dual-clutch transmission. Styling, roof rails and trim names do not establish an AWD specification.' },
    specKeys: ['drive', 'transmission', 'dimensions', 'tires'],
    featureQuestion: { zh: '牛仔这版有自适应巡航、前排加热与贯穿式安全气帘吗？', en: 'Does this Niuzai have adaptive cruise, heated front seats and front-to-rear curtain airbags?' },
    featureKeywords: ['ACC自适应巡航', '前排座椅加热', '一体式安全气帘']
  },
  'vehicle-config-galaxy-m9': {
    question: { zh: '银河M9的六座布局与两驱、四驱动力应怎样一起看？', en: 'How do Galaxy M9 seating and two-wheel-drive or AWD powertrains fit together?' },
    note: { zh: '当前M9均标注2+2+2六座插混，但两驱和四驱的系统输出不同；请按所选版本核对，不将版本名中的数字作为实际续航承诺。', en: 'The listed M9 trims are six-seat, 2+2+2 plug-in hybrids, with different system outputs for two-wheel drive and AWD. Numbers in trim names are not a promise of real-world range.' },
    specKeys: ['seats', 'fuel', 'drive', 'power'],
    featureQuestion: { zh: '银河M9的二排通风、三排加热和全景影像如何配置？', en: 'What second-row ventilation, third-row heating and panoramic-camera equipment does this Galaxy M9 list?' },
    featureKeywords: ['二排座椅通风', '三排座椅石墨烯加热', '360°全景影像']
  },
  'vehicle-config-zeekr-9x': {
    question: { zh: '极氪9X是五座还是六座，双电机与三电机有何区别？', en: 'Is this Zeekr 9X a five- or six-seater with two or three motors?' },
    note: { zh: '本表包含五座和六座插混版本，驱动形式区分双电机与三电机四驱；发动机和电机输出单独列示，不应直接相加为系统功率。', en: 'This sheet includes five- and six-seat plug-in hybrids with dual- or triple-motor AWD. Engine and motor outputs are listed separately and should not be added to claim total system output.' },
    specKeys: ['seats', 'fuel', 'drive', 'power'],
    featureQuestion: { zh: '极氪9X这版的投影大灯、二排通风与主动巡航分别如何配置？', en: 'How are projection headlights, second-row ventilation and active cruise specified on this Zeekr 9X?' },
    featureKeywords: ['智能投影大灯', '二排座椅通风', '全速域主动巡航']
  },
  'vehicle-config-teana': {
    question: { zh: '天籁各版本的动力与轮胎是否一样？', en: 'Do Teana trims share the same engine output and tyres?' },
    note: { zh: '当前天籁表中有不同发动机输出与轮胎规格，但均列为XTRONIC CVT；比较时应按具体版本核对，不能把最高输出当成全系参数。', en: 'The current Teana sheet lists different engine outputs and tyre sizes, all with XTRONIC CVT. The highest output is not a specification for every trim.' },
    specKeys: ['power', 'torque', 'transmission', 'tires'],
    featureQuestion: { zh: '这版天籁的自动驻车、胎压显示和车身稳定系统有哪些记录？', en: 'What auto-hold, tyre-pressure and stability-control equipment is recorded for this Teana?' },
    featureKeywords: ['EPB电子驻车', 'TPMS胎压', 'VDC车辆']
  },
  'vehicle-config-n7': {
    question: { zh: '日产N7不同版本的电机输出和车身尺寸如何区分？', en: 'How do Nissan N7 motor output and body dimensions vary by trim?' },
    note: { zh: '当前N7均为纯电前驱，电机功率、车身尺寸与整备质量并非完全一致；版本名中的数字不能代替完整续航测试条件。', en: 'The listed N7 versions are battery-electric and front-wheel drive, with differences in motor output, dimensions and curb weight. Trim-name numbers do not replace complete range-test conditions.' },
    specKeys: ['fuel', 'power', 'drive', 'dimensions'],
    featureQuestion: { zh: 'N7这版的座椅通风、按摩和后排出风口是否配备？', en: 'Does this N7 include seat ventilation, massage and rear air vents?' },
    featureKeywords: ['前排座椅通风', '前排座椅全身', '后排独立出风口']
  },
  'vehicle-config-n6': {
    question: { zh: '日产N6是纯电还是插混，动力参数怎样读？', en: 'Is Nissan N6 battery-electric or plug-in hybrid, and how should I read its output figures?' },
    note: { zh: '当前N6表标注插电式混合动力和DHT；发动机与电机功率分别列示，不能简单相加后当作厂家公布的系统输出。', en: 'The current N6 sheet specifies a plug-in hybrid with DHT. Engine and motor outputs are separate figures, not values to add into a claimed manufacturer system output.' },
    specKeys: ['fuel', 'power', 'transmission', 'drive'],
    featureQuestion: { zh: 'N6的前排加热、通风与天窗形式如何随版本确认？', en: 'Which heated-seat, ventilated-seat and roof features are listed for this N6?' },
    featureKeywords: ['前排座椅加热', '前排座椅通风', '电动天窗', '全景天幕']
  },
  'vehicle-config-qashqai': {
    question: { zh: '这页逍客对应哪个国内系列，两版机械规格有何差别？', en: 'Which China-market Qashqai range is shown, and what differs between its two trims?' },
    note: { zh: '本页数据对应“逍客·荣誉”，两版列出的动力、前驱和CVT相同，轮胎与整备质量不同；不要与其他逍客系列混用。', en: 'This page covers Qashqai Honor. Its two listed trims share engine output, front-wheel drive and CVT, but differ in tyres and curb weight; do not substitute another Qashqai range’s figures.' },
    specKeys: ['power', 'transmission', 'drive', 'tires'],
    featureQuestion: { zh: '逍客·荣誉的全景天幕、后排出风口与无钥匙进入是否配备？', en: 'Does this Qashqai Honor include a panoramic roof, rear air vents and keyless entry?' },
    featureKeywords: ['全景天幕', '后排出风口', '无钥匙进入']
  },
  'vehicle-config-xtrail': {
    question: { zh: '奇骏·荣誉这款是四驱吗，是否能套用其他奇骏参数？', en: 'Is this X-Trail Honor AWD, and can I use specifications from another X-Trail range?' },
    note: { zh: '当前资料对应“奇骏·荣誉”，两版均标注前轮驱动与XTRONIC CVT；不能仅凭奇骏名称推定四驱或其他动力系统。', en: 'The current data covers X-Trail Honor, with front-wheel drive and XTRONIC CVT listed for both trims. The X-Trail name alone does not establish AWD or another powertrain.' },
    specKeys: ['fuel', 'drive', 'transmission', 'dimensions'],
    featureQuestion: { zh: '奇骏·荣誉的全景天窗、一键启动和胎压监测怎样配置？', en: 'How are the panoramic sunroof, push-button start and tyre-pressure monitoring specified on this X-Trail Honor?' },
    featureKeywords: ['全景天窗', '一键式启动', 'TPMS胎压']
  },
  'vehicle-config-nx8': {
    question: { zh: 'NX8的增程和纯电版本如何区分，驱动形式一样吗？', en: 'How do NX8 range-extended and battery-electric versions differ, and do they share a drive layout?' },
    note: { zh: '本表同时列出增程与纯电NX8，均标注后置后驱；增程版的发动机与电机参数分列，不能当成两个可相加的驱动功率。', en: 'This sheet includes range-extended and battery-electric NX8 versions, both listed as rear-wheel drive. Range-extender engine and motor figures are separate, not additive drive-output figures.' },
    specKeys: ['fuel', 'power', 'drive', 'seats'],
    featureQuestion: { zh: 'NX8这版的自适应LED灯、后排出风口与儿童座椅接口有哪些记录？', en: 'What adaptive-LED, rear-vent and child-seat-anchor equipment is recorded for this NX8?' },
    featureKeywords: ['自适应LED', '后排独立出风口', 'ISOFIX儿童座椅']
  },
  'vehicle-config-sylphy': {
    question: { zh: '这页轩逸是哪一代，几个版本的动力配置相同吗？', en: 'Which Sylphy generation is covered, and do its trims share the same powertrain?' },
    note: { zh: '本页对应十五代轩逸当前配置，所列版本均为1.6L汽油与XTRONIC CVT；应与其他代际或其他动力轩逸分开核对。', en: 'This page covers the current 15th-generation Sylphy sheet, with 1.6L petrol and XTRONIC CVT across the listed trims. Keep these specifications separate from other Sylphy generations or powertrains.' },
    specKeys: ['fuel', 'power', 'transmission', 'wheelbase'],
    featureQuestion: { zh: '轩逸的前排加热、通风与自动驻车是否都在所选版本中？', en: 'Are front-seat heating, ventilation and auto hold listed for the selected Sylphy?' },
    featureKeywords: ['前排座椅加热', '前排座椅通风', 'Auto Hold']
  },
  'vehicle-config-seltos': {
    question: { zh: '赛图斯1.5L与1.5T除了动力，变速箱也不同吗？', en: 'Do Seltos 1.5L and 1.5T versions differ in transmission as well as output?' },
    note: { zh: '当前赛图斯表同时包含IVT和8AT，均列为前置前驱；选择时应将排量、动力输出和变速箱作为同一版本组合核对。', en: 'The current Seltos sheet includes IVT and 8AT versions, all listed as front-wheel drive. Check displacement, output and transmission as one trim-specific combination.' },
    specKeys: ['power', 'torque', 'transmission', 'drive'],
    featureQuestion: { zh: '赛图斯的全景显示、智能尾门与前排通风在这版是否配备？', en: 'Does this Seltos include surround-view display, a smart tailgate and ventilated front seats?' },
    featureKeywords: ['全景显示', '电动尾门', '前排座椅通风']
  },
  'vehicle-config-kx1': {
    question: { zh: '奕跑KX1两版动力一样时，城市停车应看哪些尺寸？', en: 'With the same listed KX1 powertrain, which dimensions should I check for city parking?' },
    note: { zh: '当前奕跑两版均为1.4L IVT前驱，车身尺寸与轴距一致；停车位、车门开启和乘坐需求仍应按实际使用场景核对。', en: 'The two current KX1 trims share a 1.4L IVT front-wheel-drive powertrain, dimensions and wheelbase. Check parking clearance, door opening and passenger needs for your own use.' },
    specKeys: ['transmission', 'drive', 'dimensions', 'wheelbase'],
    featureQuestion: { zh: '奕跑趣享自动版与天窗版的天窗、空调和巡航怎样区分？', en: 'Which sunroof, automatic-climate and cruise features distinguish the selected KX1 trim?' },
    featureKeywords: ['电动天窗', '自动恒温空调', '定速巡航']
  },
  'vehicle-config-k3': {
    question: { zh: '当前K3页面是哪个年款，各版本动力是否相同？', en: 'Which K3 model year is covered, and do these trims share the same powertrain?' },
    note: { zh: '本页使用2027款K3官方配置，所列版本均为1.5L、IVT和前驱；功率保留厂家PS单位，不与kW数值直接比较。', en: 'This page uses the official 2027 K3 sheet, listing 1.5L, IVT and front-wheel drive throughout. Output retains the manufacturer’s PS unit and should not be compared numerically with kW.' },
    specKeys: ['power', 'transmission', 'drive', 'tires'],
    featureQuestion: { zh: 'K3这版的前排通风加热、方向盘加热和前方防撞辅助有哪些？', en: 'What front-seat ventilation/heating, heated-steering-wheel and forward-collision equipment does this K3 list?' },
    featureKeywords: ['前排座椅通风', '方向盘加热', 'FCA 前方']
  },
  'vehicle-config-k5': {
    question: { zh: 'K5的1.5T与2.0T应该怎样比较动力和变速箱？', en: 'How should I compare K5 1.5T and 2.0T engine and transmission combinations?' },
    note: { zh: '当前K5包含7DCT与8AT两类变速箱，发动机输出与轮胎规格随版本变化；外观或“尊贵版”名称不能单独确定动力。', en: 'The current K5 sheet includes 7DCT and 8AT transmissions, with trim-specific engine outputs and tyres. Styling or the Premium trim label alone does not identify the powertrain.' },
    specKeys: ['power', 'torque', 'transmission', 'tires'],
    featureQuestion: { zh: 'K5的全景影像、前排通风与智能巡航是否属于这版配置？', en: 'Does this K5 list surround-view imaging, front-seat ventilation and smart cruise control?' },
    featureKeywords: ['SVM 全景影像', '前排通风座椅', 'NSCC']
  },
  'vehicle-config-sportage': {
    question: { zh: '狮铂拓界的1.5T、2.0T及四驱版本该怎样辨认？', en: 'How do I identify Sportage 1.5T, 2.0T and AWD versions in the China-market sheet?' },
    note: { zh: '本页对应中国市场新狮铂拓界，均列8AT，但同时有前驱与四驱；2.0T名称本身并不代表四驱。', en: 'This page covers China-market Sportage, named Shibotuojie, with 8AT throughout and both front-wheel-drive and AWD versions. A 2.0T badge alone does not mean AWD.' },
    specKeys: ['power', 'transmission', 'drive', 'tires'],
    featureQuestion: { zh: '狮铂拓界这版配全景显示、电动尾门和智能自适应巡航吗？', en: 'Does this Sportage include surround-view display, a power tailgate and smart adaptive cruise?' },
    featureKeywords: ['SVM 全景显示', '电动尾门', 'SCC2']
  },
  'vehicle-config-elantra': {
    question: { zh: '本页伊兰特是否包含所有动力版本？', en: 'Does this Elantra page cover every powertrain version?' },
    note: { zh: '当前资料仅列1.5L CVT的GLS、GLX和LUX版本，不能用来代替其他动力或其他市场伊兰特的配置；轮胎与质量仍需按版本核对。', en: 'The current data lists only the 1.5L CVT GLS, GLX and LUX versions. It does not establish specifications for other powertrains or markets; tyres and weight remain trim-specific.' },
    specKeys: ['power', 'transmission', 'tires', 'weight'],
    featureQuestion: { zh: '伊兰特的座椅加热、倒车影像与前方防碰撞辅助如何配置？', en: 'How are heated seats, reversing-camera and forward-collision assistance specified on this Elantra?' },
    featureKeywords: ['前排座椅加热', 'RVM 倒车影像', 'FCA 前方']
  },
  'vehicle-config-dashing': {
    question: { zh: '捷途大圣青春版是手动还是双离合，动力相同吗？', en: 'Is this Jetour Dashing Youth manual or dual-clutch, and does output differ?' },
    note: { zh: '当前大圣青春版各款列出的发动机输出相同，但有六速手动和6DCT；请按完整版本名称核对变速箱，不沿用其他大圣系列参数。', en: 'The listed Dashing Youth trims share engine output but offer a six-speed manual or 6DCT. Match the full trim name rather than specifications from another Dashing range.' },
    specKeys: ['power', 'transmission', 'drive', 'tires'],
    featureQuestion: { zh: '大圣青春版的方向盘加热、主驾通风和倒车影像在本版是否配备？', en: 'Does this Dashing Youth have a heated steering wheel, driver-seat ventilation and a reversing camera?' },
    featureKeywords: ['方向盘加热', '主驾座椅-座椅通风', '后倒车影像']
  },
  'vehicle-config-x70': {
    question: { zh: '捷途X70超越版的5/5+2座与变速箱该怎样确认？', en: 'How should I confirm the X70 Beyond 5/5+2 seating listing and transmission?' },
    note: { zh: '官方表以“5/5+2”列示座位，并区分六速手动与六速湿式双离合；实际订车时需明确所需座椅布局，不能默认每辆都有第三排。', en: 'The official sheet lists seating as “5/5+2” and distinguishes six-speed manual and wet dual-clutch transmissions. Confirm the required seating layout; do not assume every vehicle has a third row.' },
    specKeys: ['seats', 'transmission', 'dimensions', 'wheelbase'],
    featureQuestion: { zh: 'X70超越版的全景天窗、定速巡航与倒车影像如何配备？', en: 'What panoramic-sunroof, cruise-control and reversing-camera equipment is listed for this X70 Beyond?' },
    featureKeywords: ['全景天窗', '定速巡航', '倒车视频影像']
  },
  'vehicle-config-traveler': {
    question: { zh: '旅行者1.5TD与2.0TD XWD的驱动和变速箱有何区别？', en: 'How do Traveler 1.5TD and 2.0TD XWD drive systems and transmissions differ?' },
    note: { zh: '当前旅行者同时包含前驱与四驱、7DCT与8AT，轮胎也有不同标注；外观不能代替驱动核对，轮胎配置需结合具体版本及选装说明。', en: 'The current Traveler sheet includes front-wheel drive, AWD, 7DCT and 8AT, plus differing tyre entries. Check the actual drive specification and trim-specific tyre or option notes rather than styling.' },
    specKeys: ['power', 'drive', 'transmission', 'tires'],
    featureQuestion: { zh: '旅行者这版的全景影像、方向盘加热与全景天窗分别是什么配置？', en: 'What panoramic-camera, heated-steering-wheel and panoramic-sunroof equipment is listed for this Traveler?' },
    featureKeywords: ['360°全景影像', '方向盘加热', '全景大天窗']
  },
  'vehicle-config-free-rider': {
    question: { zh: '自由者这页的1.5TD版本是四驱吗？', en: 'Are the 1.5TD Free Rider versions on this page AWD?' },
    note: { zh: '当前自由者仅列1.5TD前驱版本，配七挡湿式双离合；不能把旅行者或其他版本的四驱数据套用于本页。', en: 'The current Free Rider data lists 1.5TD front-wheel-drive versions with a seven-speed wet dual-clutch transmission. Do not substitute AWD figures from Traveler or another version.' },
    specKeys: ['drive', 'transmission', 'dimensions', 'seats'],
    featureQuestion: { zh: '自由者的前排通风、自适应巡航与360°影像在这版如何配置？', en: 'How are front-seat ventilation, adaptive cruise and 360-degree imaging specified on this Free Rider?' },
    featureKeywords: ['前排座椅通风', '自适应巡航', '360°全景影像']
  },
  'vehicle-config-q5': {
    question: { zh: '本页Q5实际对应哪款Q5L，动力数字是系统总功率吗？', en: 'Which Q5L does this Q5 page cover, and are its output figures total hybrid-system output?' },
    note: { zh: '本页为一汽奥迪全新Q5L，所列均为HDI智混与quattro；功率和扭矩为发动机值，不是混动系统合计输出，也不代替海外Q5参数。', en: 'This page covers FAW Audi’s all-new Q5L, listed with HDI hybrid technology and quattro. Power and torque are engine figures, not combined hybrid-system output or overseas Q5 specifications.' },
    specKeys: ['fuel', 'power', 'drive', 'wheelbase'],
    featureQuestion: { zh: '全新Q5L的通风按摩座椅、方向盘加热和矩阵大灯如何配置？', en: 'What ventilated/massage-seat, heated-steering-wheel and matrix-headlight equipment does this Q5L list?' },
    featureKeywords: ['前排通风按摩座椅', '方向盘加热', '矩阵式LED']
  },
  'vehicle-config-q3': {
    question: { zh: 'Q3“quattro45周年典藏版”是否全部为四驱？', en: 'Are all Q3 “quattro 45th Anniversary” trims all-wheel drive?' },
    note: { zh: '“quattro45周年”是此系列名称，不代表每版都配四驱；本表35TFSI、40TFSI为前驱，45TFSI quattro才列四驱。', en: '“quattro 45th Anniversary” names the series, not every trim’s drive system. The listed 35TFSI and 40TFSI versions are front-wheel drive; 45TFSI quattro is AWD.' },
    specKeys: ['drive', 'power', 'transmission'],
    featureQuestion: { zh: 'Q3这版的矩阵大灯、电动行李箱盖和智能钥匙是什么配置状态？', en: 'What are the matrix-headlight, power-tailgate and smart-key statuses for this Q3?' },
    featureKeywords: ['矩阵式LED', '电动行李箱盖', '智能钥匙']
  },
  'vehicle-config-a5': {
    question: { zh: 'A5L运动版是否就有quattro，智混又如何区分？', en: 'Does an A5L Sport badge mean quattro, and how is the hybrid version identified?' },
    note: { zh: '当前资料为中国一汽奥迪A5L，包含前驱、quattro及HDI智混版本；“运动版”名称本身不确定四驱或混动，应按所选动力和驱动项判断。', en: 'This sheet covers China-market FAW Audi A5L, including front-wheel-drive, quattro and HDI hybrid versions. A Sport label alone does not establish AWD or hybrid technology.' },
    specKeys: ['fuel', 'drive', 'power', 'transmission'],
    featureQuestion: { zh: 'A5L的前排通风、矩阵大灯和自适应巡航在本版如何配备？', en: 'How are ventilated front seats, matrix headlights and adaptive cruise specified on this A5L?' },
    featureKeywords: ['前排通风座椅', '星辰矩阵大灯', '自适应巡航']
  },
  'vehicle-config-crv': {
    question: { zh: 'CR-V七座与四驱是否为同一个版本？', en: 'Are seven seats and AWD combined in the same CR-V trim here?' },
    note: { zh: '本表仅覆盖燃油CR-V，七座锋尚版列为两驱，臻享四驱版列为五座；不能把七座、四驱或e:HEV配置合并理解。', en: 'This sheet covers petrol CR-V only. Style 7-seat is listed as two-wheel drive, while Premium AWD has five seats; seven seats, AWD and e:HEV must not be combined into one assumed specification.' },
    specKeys: ['seats', 'drive', 'fuel', 'dimensions'],
    featureQuestion: { zh: '这版CR-V有感应尾门、前排加热和通风吗？', en: 'Does this CR-V have a hands-free tailgate and heated, ventilated front seats?' },
    featureKeywords: ['感应式电动尾门', '前排座椅加热', '前排座椅通风']
  },
  'vehicle-config-tiggo-3x': {
    question: { zh: '瑞虎3x卓越版这份配置包含手动版本吗？', en: 'Does this Tiggo 3x Excellence sheet include a manual version?' },
    note: { zh: '当前资料只列1.5L-CVT卓越版，不能据此扩展出其他变速箱或年款；比较车型时请使用这版的车身尺寸和轴距。', en: 'The current data lists only 1.5L CVT Excellence. It does not establish another transmission or model year; use this version’s dimensions and wheelbase when comparing vehicles.' },
    specKeys: ['transmission', 'drive', 'dimensions', 'wheelbase'],
    featureQuestion: { zh: '瑞虎3x卓越版列出了哪些倒车和基础安全装备？', en: 'Which reversing and basic safety equipment is listed for Tiggo 3x Excellence?' },
    featureKeywords: ['倒车影像', '前排双安全气囊', 'ABS防抱死']
  },
  'vehicle-config-tiggo-5x': {
    question: { zh: '瑞虎5x卓越版手动与CVT除了变速箱，还有哪些规格差异？', en: 'Beyond transmission, which specifications differ between manual and CVT Tiggo 5x Excellence trims?' },
    note: { zh: '当前两版发动机输出与前驱形式相同，但变速箱、轮胎和整备质量不同；应按MT或CVT完整版本核对。', en: 'The two listed trims share engine output and front-wheel drive, but differ in transmission, tyres and curb weight. Match the complete MT or CVT version.' },
    specKeys: ['transmission', 'tires', 'weight', 'power'],
    featureQuestion: { zh: '瑞虎5x的倒车影像、倒车雷达和定速巡航在这版是否配备？', en: 'Does this Tiggo 5x have a reversing camera, rear parking sensors and cruise control?' },
    featureKeywords: ['倒车影像', '倒车雷达', '定速巡航']
  },
  'vehicle-config-mg5': {
    question: { zh: 'MG5的180DVVT与300TGI如何区分，运动造型代表后驱吗？', en: 'How do MG5 180DVVT and 300TGI differ, and does sporty styling mean rear-wheel drive?' },
    note: { zh: '当前MG5均标注前置前驱，但180DVVT与300TGI对应不同输出及CVT、七速湿式双离合组合；外观不能代替动力和驱动参数。', en: 'The listed MG5 versions are front-wheel drive, with different outputs and CVT or seven-speed wet dual-clutch combinations for 180DVVT and 300TGI. Styling does not establish a drive layout.' },
    specKeys: ['power', 'torque', 'transmission', 'drive'],
    featureQuestion: { zh: 'MG5这版的自动空调、后排出风口和定速巡航分别如何配置？', en: 'How are automatic climate control, rear air vents and cruise control specified on this MG5?' },
    featureKeywords: ['自动恒温空调', '后排空调出风口', '定速巡航']
  },
  'vehicle-config-changan-cs55': {
    question: { zh: 'CS55这页对应哪一代PLUS，动力与轮胎怎样核对？', en: 'Which CS55 PLUS generation is shown, and what powertrain and tyres should I check?' },
    note: { zh: '本页为第四代CS55PLUS，当前版本均列前驱与7DCT，轮胎规格及整备质量随版本变化；不套用旧代CS55数据。', en: 'This page covers fourth-generation CS55 PLUS, with front-wheel drive and 7DCT across the listed trims. Tyres and curb weight vary; earlier CS55 generations are not interchangeable.' },
    specKeys: ['power', 'transmission', 'drive', 'tires'],
    featureQuestion: { zh: '第四代CS55PLUS的主驾通风、540°影像与AEB在本版怎样配置？', en: 'What driver-seat ventilation, 540-degree imaging and AEB equipment is listed for this fourth-generation CS55 PLUS?' },
    featureKeywords: ['主驾座椅通风', '540°', 'AEB自动']
  },
  'vehicle-config-changan-cs75': {
    question: { zh: 'CS75PLUS智慧冠军版用什么变速箱，与其他CS75能混用参数吗？', en: 'Which transmission does CS75 PLUS Smart Champion use, and can other CS75 specifications be substituted?' },
    note: { zh: '本表仅对应CS75PLUS智慧冠军版，两款均列爱信8AT与前驱；车身与动力应按此系列核对，不与其他CS75代际混用。', en: 'This sheet covers CS75 PLUS Smart Champion only, with Aisin 8AT and front-wheel drive on both trims. Use this range’s dimensions and powertrain, not another CS75 generation’s figures.' },
    specKeys: ['transmission', 'drive', 'power', 'dimensions'],
    featureQuestion: { zh: 'CS75PLUS智慧冠军版的主副驾通风和540°影像如何区分？', en: 'How are driver/passenger seat ventilation and 540-degree imaging specified on this CS75 PLUS Smart Champion?' },
    featureKeywords: ['主驾座椅通风', '副驾座椅通风', '540°']
  },
  'vehicle-config-changan-x5': {
    question: { zh: '第二代长安X5 PLUS的MT与PRO版本动力是否相同？', en: 'Do second-generation Changan X5 PLUS MT and PRO trims share the same powertrain?' },
    note: { zh: '当前资料包含手动与七速湿式双离合，发动机输出和车高也有不同；PRO或运动化外观不能代替具体动力版本核对。', en: 'The current data includes manual and seven-speed wet dual-clutch versions, with differences in engine output and height. A PRO label or sporty styling does not replace trim-specific verification.' },
    specKeys: ['power', 'torque', 'transmission', 'dimensions'],
    featureQuestion: { zh: 'X5 PLUS这版的电动后备箱、天窗与主动刹车分别是什么状态？', en: 'What are the power-boot, sunroof and active-braking statuses for this X5 PLUS?' },
    featureKeywords: ['电动后备箱', '天窗类型', '主动刹车']
  }
};
