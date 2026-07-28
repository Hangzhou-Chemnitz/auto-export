(function(global) {
  'use strict';

  var EXACT_TRIMS = {
    '76612': 'Sylphy 2026 Classic 1.6L CVT Peace of Mind',
    '76613': 'Sylphy 2026 1.6L CVT Comfort',
    '76614': 'Sylphy 2026 1.6L CVT Comfort Plus',
    '76608': 'Sylphy 2026 1.6L CVT Technology',
    '76609': 'Sylphy 2026 1.6L CVT Comfort Technology',
    '76610': 'Sylphy 2026 1.6L CVT Luxury Technology',
    '74682': 'Sylphy 2026 1.6L CVT Flagship',

    '73478': 'Qashqai 2025 Honor 2.0L CVT XV Sincere Edition',
    '73625': 'Qashqai 2025 Honor 2.0L CVT XV+ Leading',
    '73628': 'X-Trail 2025 Honor 2.0L FWD Sincere Edition',
    '73627': 'X-Trail 2025 Honor 2.0L FWD Leading',

    '77209': 'NX8 2026 EV 580 Pro',
    '75909': 'NX8 2026 EV 580 Max',
    '76408': 'NX8 2026 EV 650 Max',
    '77210': 'NX8 2026 EV 630 Master Edition',
    '77207': 'NX8 2026 Range-Extended 150 Pro',
    '77208': 'NX8 2026 Range-Extended 150 Max',
    '76643': 'NX8 2026 Range-Extended 260 Pro',
    '76642': 'NX8 2026 Range-Extended 310 Max',

    '75719': 'Teana 2026 HarmonyOS Cockpit 2.0L Comfort',
    '75718': 'Teana 2026 HarmonyOS Cockpit 2.0L Super Comfort',
    '75439': 'Teana 2026 HarmonyOS Cockpit 2.0L Smart Super Comfort',
    '74182': 'Teana 2026 HarmonyOS Cockpit 2.0T Flagship',
    '74183': 'Teana 2026 HarmonyOS Cockpit 2.0T S380 Master Edition',

    '77628': 'N7 2026 EV 625 Pro Black Knight',
    '77629': 'N7 2026 EV 625 Pro Rhine Knight',
    '77571': 'N7 2026 EV 625 Max Black Knight',
    '77630': 'N7 2026 EV 625 Max Rhine Knight',

    '77650': 'N6 2026 PHEV 180 Pro Youth',
    '74150': 'N6 2026 PHEV 180 Pro',
    '74151': 'N6 2026 PHEV 180 Max',
    '76611': 'N6 2026 PHEV 180 Pro+',
    '74152': 'N6 2026 PHEV 180 Max+',
    '77651': 'N6 2026 PHEV 180 Pro+ Black Knight',
    '77652': 'N6 2026 PHEV 180 Max+ Black Knight',
    '75878': 'N6 2026 PHEV 170 Max+ Flagship',
    '66470': 'bZ3 2024 517km Elite PRO',

    '74072': 'Tharu XR 2026 1.5L Ruijin',
    '74073': 'Tharu XR 2026 1.5L Ruiyi',
    '74046': 'Tharu XR 2026 1.5L Ruixiang',
    '74074': 'Tharu XR 2026 300TSI Ruiyi',
    '74075': 'Tharu XR 2026 300TSI Ruixiang',

    '75016': 'Golf 2026 300TSI',
    '75017': 'Golf 2026 300TSI Pro',
    '75018': 'Golf 2026 300TSI R-Line',

    '74967': 'T-Roc 2026 280TSI DSG FWD Shiguang',
    '74968': 'T-Roc 2026 300TSI DSG FWD Chenguang',
    '74969': 'T-Roc 2026 300TSI DSG FWD Xingguang',

    '74683': 'RAV4 2026 2.0L Gasoline AWD',
    '75765': 'RAV4 2026 2.0L Hybrid FWD',
    '74690': 'RAV4 2026 2.5L Hybrid AWD Flagship',

    '76042': 'Corolla 2026 1.2T Pioneer',
    '76043': 'Corolla 2026 1.2T Elite',
    '76041': 'Corolla 2026 1.8L Hybrid Pioneer',
    '76028': 'Corolla 2026 1.8L Hybrid Elite',
    '75827': 'Corolla 2026 1.8L Hybrid Flagship',
    '74685': 'Corolla 2026 2.0L Gasoline Elite',

    '75436': 'Corolla Cross 2026 2.0L Gasoline Elite',
    '75437': 'Corolla Cross 2026 2.0L Gasoline',
    '75353': 'Corolla Cross 2026 2.0L Hybrid Pioneer',
    '75354': 'Corolla Cross 2026 2.0L Hybrid Elite',
    '73837': 'Corolla Cross 2026 2.0L Hybrid',

    '74933': '2026 380T AWD Luxury 7-Seat',
    '74934': '2026 380T AWD Premium 7-Seat',
    '74935': '2026 2.5L Hybrid FWD Elite 5-Seat',
    '74936': '2026 2.5L Hybrid FWD Elite 7-Seat',
    '74937': '2026 2.5L Hybrid FWD Luxury 7-Seat',
    '74938': '2026 2.5L Hybrid AWD Elite 7-Seat',
    '74939': '2026 2.5L Hybrid AWD Luxury 7-Seat',
    '74940': '2026 2.5L Hybrid AWD Premium 7-Seat',
    '74941': '2026 2.5L Hybrid AWD Flagship 7-Seat',

    '73997': '2026 2.0E Elite',
    '73998': '2026 2.0GVP Luxury',
    '73999': '2026 2.0G Premium',
    '74000': '2026 2.0S Sport',
    '74001': '2026 Hybrid 2.0HE Elite',
    '74002': '2026 Hybrid 2.0HGVP Luxury',
    '74005': '2026 Hybrid 2.0HSE Sport Lite',
    '76167': '2026 Hybrid 2.0HSE Radiance',
    '74003': '2026 Hybrid 2.0HG Premium',
    '74006': '2026 Hybrid 2.0HS Sport',
    '74004': '2026 Hybrid 2.0HG Radiance',
    '74007': '2026 Hybrid 2.0HXS Sport Plus',
    '77199': '2026 Hybrid 2.0HXS Radiance (Matte Gold)',
    '74008': '2026 Hybrid 2.0HXS Radiance (Matte Gray)',
    '74010': '2026 Hybrid 2.5HXS Sport Plus',
    '74011': '2026 Hybrid 2.5HQ Flagship',

    '78248': 'Granvia 2027 2.5L Hybrid Comfort PLUS',
    '78249': 'Granvia 2027 2.5L Hybrid Premium PLUS',
    '78251': 'Granvia 2027 2.5L Hybrid Prestige ULTRA',
    '78253': 'Granvia 2027 2.5L Hybrid Premium MAX AWD',
    '78254': 'Granvia 2027 2.5L Hybrid Prestige ULTRA AWD',
    '78250': 'Granvia 2027 2.5L Hybrid Premium Welcab PLUS',
    '78252': 'Granvia 2027 2.5L Hybrid Flagship ULTRA',

    '76044': 'Audi Q3 2026 quattro 45th Anniversary 35 TFSI Progressive Dynamic',
    '75193': 'Audi Q3 2026 quattro 45th Anniversary 35 TFSI Fashion Dynamic',
    '72704': 'Audi Q5L 2026 2.0T Smart Hybrid',
    '73537': 'Audi A5L 2026 2.0T Sport quattro',

    '78059': 'Honda CR-V 2026 30th Anniversary 1.5T FWD Vitality 5-Seat',
    '78060': 'Honda CR-V 2026 30th Anniversary 1.5T FWD Fengshang 5-Seat',
    '78061': 'Honda CR-V 2026 30th Anniversary 1.5T FWD Fengshang 7-Seat',
    '78062': 'Honda CR-V 2026 30th Anniversary 1.5T FWD Zhiling 5-Seat',
    '78063': 'Honda CR-V 2026 30th Anniversary 1.5T AWD Zhenxiang 5-Seat',

    '72714': 'Tiggo 5X 2025 1.5L MT Excellence',
    '71624': 'Tiggo 5X 2025 1.5L CVT Excellence',

    '69331': 'Tiggo 3X 2024 1.5L CVT Excellence',
    '68127': 'Tiggo 3X 2024 Huimin Edition 1.5L MT Fashion',
    '68128': 'Tiggo 3X 2024 Huimin Edition 1.5L CVT Fashion',

    '73650': 'MG5 2026 180DVVT Global First Edition',
    '73575': 'MG5 2026 180DVVT Global Luxury',
    '75932': 'MG5 2026 180DVVT Yixiang Custom Edition',

    '74278': 'Changan X5 PLUS 2026 Second Generation 1.5T High Energy PRO',
    '74279': 'Changan X5 PLUS 2026 Second Generation 1.5T Pioneer PRO',
    '74137': 'Changan X5 PLUS 2026 Second Generation 1.5T Beyond PRO',
    '74280': 'Changan X5 PLUS 2026 Second Generation 1.5T Excellence PRO',

    '74992': 'Changan CS55 PLUS 2026 Fourth Generation New Blue Whale 1.5T Elite',
    '74514': 'Changan CS55 PLUS 2026 Fourth Generation New Blue Whale 1.5T Leading',
    '72642': 'Changan CS55 PLUS 2026 Fourth Generation New Blue Whale 1.5T Tianshu',
    '74993': 'Changan CS55 PLUS 2026 Fourth Generation New Blue Whale 1.5T Tianshu Premium',

    '75346': 'Changan CS75 PLUS 2026 Smart Champion Edition 1.5T New Blue Whale Zhiling',
    '75339': 'Changan CS75 PLUS 2026 Smart Champion Edition 1.5T New Blue Whale Zhihang',
    '77936': 'Changan CS75 PLUS 2026 Fourth Generation 1.5T New Blue Whale Premium',
    '77937': 'Changan CS75 PLUS 2026 Fourth Generation 1.5T New Blue Whale Tianshu Flagship',

    '68972': 'Coolray 2025 1.5L MT Chaoneng',
    '67792': 'Coolray 2025 1.5L CVT Chaoneng',
    '73598': 'Coolray 2025 1.5L CVT Chaoneng MAX',
    '72132': 'Coolray L 2025 1.5TD DCT Chaoyue',
    '70452': 'Coolray L 2025 1.5TD DCT Xingzuan',
    '69434': 'Coolray L 2025 1.5TD DCT Xingyao',
    '75683': 'Coolray L 2025 1.5TD DCT Battle',

    '76920': 'Boyue L 2026 Fourth Generation 1.5TD DCT Xiaolandeng',
    '74083': 'Boyue 2026 1.5TD DCT Huanle',
    '74082': 'Boyue 2026 1.5TD DCT Xiangwang',
    '77692': 'Boyue 2026 1.5TD DCT 10th Anniversary Champion',
    '73942': 'Boyue 2026 1.5TD DCT Meihao',
    '73941': 'Boyue 2026 1.5TD DCT Zhiai',

    '74638': 'Xingyue L 2026 Dongfangyao 2.0TD AT Xiaohan',
    '74637': 'Xingyue L 2026 Dongfangyao 2.0TD AT Lanxing',
    '74636': 'Xingyue L 2026 Dongfangyao 2.0TD AT Wangyue',

    '77979': 'Niuzai 2026 1.5TD Xunchuan',
    '77980': 'Niuzai 2026 1.5TD Zhuyue',
    '77944': 'Niuzai 2026 1.5TD Guanye',

    '74359': 'Galaxy M9 2025 100km FWD Qihang',
    '74361': 'Galaxy M9 2025 100km FWD Zhihang',
    '74360': 'Galaxy M9 2025 230km FWD Yuanhang',
    '74362': 'Galaxy M9 2025 230km FWD Zhihang',
    '74263': 'Galaxy M9 2025 230km FWD Tansuo',
    '73548': 'Galaxy M9 2025 210km AWD Linghang',

    '73680': 'Seltos 2026 1.5L IVT Style',
    '73681': 'Seltos 2026 1.5L IVT Comfort',
    '73659': 'Seltos 2026 1.5L IVT Luxury',
    '73682': 'Seltos 2026 1.5L IVT Luxury Comfort',
    '73683': 'Seltos 2026 1.5L IVT Premium',

    '75520': 'KX1 2026 1.4L IVT Enjoy Automatic',
    '75521': 'KX1 2026 1.4L IVT Sunroof',

    '66683': 'K3 2024 1.5L CVT Comfort Plus',
    '66684': 'K3 2024 1.5L CVT Luxury Smart',

    '69773': 'K5 2025 1.5T Luxury',
    '69774': 'K5 2025 1.5T Premium',

    '76700': '2026 1.5T FWD Comfort',
    '76701': '2026 1.5T FWD Luxury',
    '76531': '2026 1.5T FWD Premium',

    '78117': 'Elantra 2026 1.5L CVT GLS Leading',
    '78118': 'Elantra 2026 1.5L CVT GLX Elite',
    '78119': 'Elantra 2026 1.5L CVT LUX Premium',

    '75368': 'Traveler 2026 1.5TD Explore',
    '75336': 'Traveler 2026 1.5TD Explore Plus',
    '75320': 'Traveler 2026 2.0TD XWD Discovery',
    '76336': 'Traveler 2026 Junma 2.0TD DCT XWD Discovery',
    '75231': 'Traveler 2026 2.0TD XWD Traverse',
    '76337': 'Traveler 2026 Junma 2.0TD DCT XWD Traverse',
    '77227': 'Traveler PLUS 2026 2.0TD XWD Conquer 5-Seat',
    '75297': 'Traveler 2026 2.0TD XWD Conquer',
    '77229': 'Traveler PLUS 2026 2.0TD XWD Conquer 7-Seat',
    '77228': 'Traveler PLUS 2026 2.0TD XWD Conquer Plus 5-Seat',
    '77230': 'Traveler PLUS 2026 2.0TD XWD Conquer Plus 7-Seat',
    '75846': 'Traveler 2026 2.0TD XWD Adventure',
    '77673': 'Traveler 2026 2.0TD XWD Expedition',

    '78309': 'Free Rider 2026 1.5TD DCT Qicheng',
    '76338': 'Free Rider 2026 Junma 1.5TD DCT Explore',
    '76339': 'Free Rider 2026 Junma 1.5TD DCT Discovery',

    '74432': 'Zeekr 9X 2025 Ultra 55kWh',
    '75103': 'Zeekr 9X 2025 Ultra 70kWh'
  };

  var MODEL_NAMES = [
    ['RAV4荣放', 'RAV4'],
    ['卡罗拉锐放', 'Corolla Cross'],
    ['锐放', 'Corolla Cross'],
    ['汉兰达', 'Highlander'],
    ['凯美瑞', 'Camry'],
    ['轩逸', 'Sylphy'],
    ['逍客', 'Qashqai'],
    ['奇骏', 'X-Trail'],
    ['极氪9X', 'Zeekr 9X'],
    ['铂智3X', 'bZ3X'],
    ['锋兰达', 'Frontlander'],
    ['威兰达', 'Wildlander'],
    ['格瑞维亚', 'Granvia'],
    ['缤越', 'Coolray'],
    ['博越L', 'Boyue L'],
    ['博越', 'Boyue'],
    ['狮铂拓界', 'Sportage'],
    ['捷途大圣', 'Dashing'],
    ['捷途旅行者', 'Traveller'],
    ['途观L', 'Tiguan L'],
    ['途岳', 'Tharu'],
    ['荣放', 'RAV4']
  ];

  var CANONICAL_TERMS = [
    ['光辉版（磨砂金）', ' Radiance (Matte Gold) '],
    ['光辉版（磨砂灰）', ' Radiance (Matte Gray) '],
    ['智能电混双擎', ' Hybrid '],
    ['电混双擎', ' Hybrid '],
    ['运动Plus版', ' Sport Plus '],
    ['运动Lite版', ' Sport Lite '],
    ['尊贵智享', ' Premium Smart '],
    ['自动征服', ' Automatic Conquer '],
    ['四驱至尊版', ' AWD Flagship '],
    ['四驱尊贵版', ' AWD Premium '],
    ['四驱豪华版', ' AWD Luxury '],
    ['四驱精英版', ' AWD Elite '],
    ['两驱尊贵版', ' FWD Premium '],
    ['两驱豪华版', ' FWD Luxury '],
    ['两驱精英版', ' FWD Elite '],
    ['双擎', ' Hybrid '],
    ['增程', ' Range-Extended '],
    ['纯电', ' EV '],
    ['新能源', ' New Energy '],
    ['汽油', ' Gasoline '],
    ['柴油', ' Diesel '],
    ['四驱', ' AWD '],
    ['两驱', ' FWD '],
    ['前驱', ' FWD '],
    ['后驱', ' RWD '],
    ['至尊版', ' Flagship '],
    ['旗舰版', ' Flagship '],
    ['旗舰', ' Flagship '],
    ['尊贵版', ' Premium '],
    ['尊贵', ' Premium '],
    ['豪华版', ' Luxury '],
    ['豪华', ' Luxury '],
    ['精英版', ' Elite '],
    ['精英', ' Elite '],
    ['领先版', ' Leading '],
    ['领先', ' Leading '],
    ['先锋版', ' Pioneer '],
    ['先锋', ' Pioneer '],
    ['舒适版', ' Comfort '],
    ['舒适', ' Comfort '],
    ['经典', ' Classic '],
    ['荣誉', ' Honor '],
    ['改款', ' Facelift '],
    ['运动版', ' Sport '],
    ['运动', ' Sport '],
    ['光辉版', ' Radiance '],
    ['光辉', ' Radiance '],
    ['磨砂金', ' Matte Gold '],
    ['磨砂灰', ' Matte Gray '],
    ['进阶', ' Advanced '],
    ['标准', ' Standard '],
    ['卓越', ' Excellence '],
    ['都市', ' Urban '],
    ['新锐', ' New '],
    ['高能', ' High Energy '],
    ['青春', ' Youth '],
    ['黑武士', ' Black Edition '],
    ['星耀', ' Starlight '],
    ['探索', ' Explore '],
    ['登峰', ' Summit '],
    ['纵横', ' Adventure '],
    ['越境', ' Cross-Border '],
    ['领航', ' Navigator '],
    ['穿越', ' Traverse '],
    ['征服', ' Conquer '],
    ['远征', ' Expedition '],
    ['悦野', ' Adventure '],
    ['畅行', ' Touring '],
    ['畅享', ' Enjoy '],
    ['乐享', ' Enjoy '],
    ['悦享', ' Enjoy '],
    ['智享', ' Smart '],
    ['全能', ' All-Round '],
    ['加长', ' Extended '],
    ['手动', ' MT '],
    ['自动', ' AT ']
  ];

  var LOCALIZED_TERMS = {
    fr: [
      ['Second Generation', 'Deuxième génération'],
      ['Beyond', 'Dépassement'],
      ['Global First Edition', 'Première édition mondiale'],
      ['Global Luxury', 'Luxe mondial'],
      ['Yixiang Custom Edition', 'Édition personnalisée Yixiang'],
      ['30th Anniversary', '30e anniversaire'],
      ['10th Anniversary Champion', 'Champion du 10e anniversaire'],
      ['Huimin Edition', 'Édition accessible'],
      ['Huanle', 'Joie'],
      ['Xiangwang', 'Aspiration'],
      ['Meihao', 'Harmonie'],
      ['Zhiai', 'Bien-aimée'],
      ['Fourth Generation', 'Quatrième génération'],
      ['Range-Extended', 'Autonomie prolongée'],
      ['New Energy', 'Énergie nouvelle'],
      ['High Energy', 'Haute performance'],
      ['Matte Gold', 'Or mat'],
      ['Matte Gray', 'Gris mat'],
      ['Cross-Border', 'Tout-terrain'],
      ['Black Edition', 'Édition noire'],
      ['Fashion', 'Élégance'],
      ['Dynamic', 'Dynamique'],
      ['Qicheng', 'Départ'],
      ['Discovery', 'Découverte'],
      ['HarmonyOS Cockpit', 'Habitacle HarmonyOS'],
      ['Super Comfort', 'Confort supérieur'],
      ['Master Edition', 'Édition Master'],
      ['Peace of Mind', 'Sérénité'],
      ['Comfort Plus', 'Confort Plus'],
      ['Technology', 'Technologie'],
      ['Sincere Edition', 'Édition Sincère'],
      ['Black Knight', 'Chevalier noir'],
      ['Rhine Knight', 'Chevalier du Rhin'],
      ['Youth', 'Jeune'],
      ['Sport Plus', 'Sport Plus'],
      ['Sport Lite', 'Sport Lite'],
      ['All-Round', 'Polyvalente'],
      ['7-Seat', '7 places'],
      ['6-Seat', '6 places'],
      ['5-Seat', '5 places'],
      ['Hybrid', 'Hybride'],
      ['Gasoline', 'Essence'],
      ['Diesel', 'Diesel'],
      ['Flagship', 'Haut de gamme'],
      ['Premium', 'Premium'],
      ['Luxury', 'Luxe'],
      ['Elite', 'Élite'],
      ['Pioneer', 'Pionnière'],
      ['Leading', 'Avancée'],
      ['Style', 'Style'],
      ['Comfort', 'Confort'],
      ['Radiance', 'Éclat'],
      ['Facelift', 'Restylée'],
      ['Standard', 'Standard'],
      ['Excellence', 'Excellence'],
      ['Advanced', 'Avancée'],
      ['Classic', 'Classique'],
      ['Honor', 'Honneur'],
      ['Sport', 'Sport'],
      ['Explore', 'Exploration'],
      ['Summit', 'Sommet'],
      ['Adventure', 'Aventure'],
      ['Navigator', 'Navigation'],
      ['Traverse', 'Traversée'],
      ['Conquer', 'Conquête'],
      ['Expedition', 'Expédition'],
      ['Touring', 'Touring'],
      ['Enjoy', 'Confort'],
      ['Automatic', 'Automatique'],
      ['Sunroof', 'Toit ouvrant'],
      ['Smart', 'Intelligente'],
      ['Extended', 'Longue'],
      ['FWD', 'Traction avant'],
      ['AWD', 'Transmission intégrale'],
      ['RWD', 'Propulsion'],
      ['Other trims', 'Autres versions']
    ],
    ru: [
      ['Second Generation', 'Второе поколение'],
      ['Beyond', 'Превосходство'],
      ['Global First Edition', 'Первая глобальная версия'],
      ['Global Luxury', 'Глобальная люкс-версия'],
      ['Yixiang Custom Edition', 'Индивидуальная версия Yixiang'],
      ['30th Anniversary', '30-летие'],
      ['10th Anniversary Champion', 'Чемпион 10-летия'],
      ['Huimin Edition', 'Доступная версия'],
      ['Huanle', 'Радость'],
      ['Xiangwang', 'Стремление'],
      ['Meihao', 'Прекрасная'],
      ['Zhiai', 'Любимая'],
      ['Fourth Generation', 'Четвертое поколение'],
      ['Range-Extended', 'С увеличенным запасом хода'],
      ['New Energy', 'Новая энергия'],
      ['High Energy', 'Высокая мощность'],
      ['Matte Gold', 'Матовый золотой'],
      ['Matte Gray', 'Матовый серый'],
      ['Cross-Border', 'Внедорожная'],
      ['Black Edition', 'Черная версия'],
      ['Progressive', 'Прогрессивная'],
      ['Fashion', 'Стиль'],
      ['Dynamic', 'Динамичная'],
      ['Qicheng', 'Старт'],
      ['Discovery', 'Открытие'],
      ['HarmonyOS Cockpit', 'Салон HarmonyOS'],
      ['Super Comfort', 'Повышенный комфорт'],
      ['Master Edition', 'Версия Master'],
      ['Peace of Mind', 'Спокойствие'],
      ['Comfort Plus', 'Комфорт Плюс'],
      ['Technology', 'Технологичная'],
      ['Sincere Edition', 'Искренняя версия'],
      ['Black Knight', 'Черный рыцарь'],
      ['Rhine Knight', 'Рейнский рыцарь'],
      ['Youth', 'Молодежная'],
      ['Sport Plus', 'Спорт Плюс'],
      ['Sport Lite', 'Спорт Лайт'],
      ['All-Round', 'Универсальная'],
      ['7-Seat', '7 мест'],
      ['6-Seat', '6 мест'],
      ['5-Seat', '5 мест'],
      ['Hybrid', 'Гибрид'],
      ['Gasoline', 'Бензин'],
      ['Diesel', 'Дизель'],
      ['Flagship', 'Флагман'],
      ['Prestige', 'Престиж'],
      ['Premium', 'Премиум'],
      ['Luxury', 'Люкс'],
      ['Elite', 'Элитная'],
      ['Pioneer', 'Начальная'],
      ['Leading', 'Передовая'],
      ['Style', 'Стиль'],
      ['Comfort', 'Комфорт'],
      ['Radiance', 'Сияние'],
      ['Facelift', 'Рестайлинг'],
      ['Standard', 'Стандарт'],
      ['Excellence', 'Превосходная'],
      ['Advanced', 'Продвинутая'],
      ['Classic', 'Классическая'],
      ['Honor', 'Honor'],
      ['Sport', 'Спорт'],
      ['Explore', 'Исследователь'],
      ['Summit', 'Вершина'],
      ['Adventure', 'Приключение'],
      ['Navigator', 'Навигатор'],
      ['Traverse', 'Туристическая'],
      ['Conquer', 'Покоритель'],
      ['Expedition', 'Экспедиция'],
      ['Touring', 'Туринг'],
      ['Enjoy', 'Комфорт'],
      ['Automatic', 'Автомат'],
      ['Sunroof', 'Люк'],
      ['Smart', 'Интеллект'],
      ['Extended', 'Удлиненная'],
      ['FWD', 'Передний привод'],
      ['AWD', 'Полный привод'],
      ['RWD', 'Задний привод'],
      ['Other trims', 'Другие комплектации']
    ],
    ar: [
      ['Second Generation', 'الجيل الثاني'],
      ['Beyond', 'التفوق'],
      ['Global First Edition', 'الإصدار العالمي الأول'],
      ['Global Luxury', 'الإصدار العالمي الفاخر'],
      ['Yixiang Custom Edition', 'إصدار Yixiang المخصص'],
      ['30th Anniversary', 'الذكرى الثلاثون'],
      ['10th Anniversary Champion', 'بطل الذكرى العاشرة'],
      ['Huimin Edition', 'الإصدار الاقتصادي'],
      ['Huanle', 'الفرح'],
      ['Xiangwang', 'التطلع'],
      ['Meihao', 'الجميلة'],
      ['Zhiai', 'المحبوبة'],
      ['Fourth Generation', 'الجيل الرابع'],
      ['Range-Extended', 'مدى ممتد'],
      ['New Energy', 'طاقة جديدة'],
      ['High Energy', 'أداء عالٍ'],
      ['Matte Gold', 'ذهبي مطفي'],
      ['Matte Gray', 'رمادي مطفي'],
      ['Cross-Border', 'للطرق الوعرة'],
      ['Black Edition', 'الإصدار الأسود'],
      ['Progressive', 'متطورة'],
      ['Fashion', 'أنيقة'],
      ['Dynamic', 'ديناميكية'],
      ['Qicheng', 'الانطلاق'],
      ['Discovery', 'الاكتشاف'],
      ['HarmonyOS Cockpit', 'مقصورة HarmonyOS'],
      ['Super Comfort', 'راحة فائقة'],
      ['Master Edition', 'إصدار Master'],
      ['Peace of Mind', 'راحة البال'],
      ['Comfort Plus', 'راحة بلس'],
      ['Technology', 'تقنية'],
      ['Sincere Edition', 'إصدار صادق'],
      ['Black Knight', 'الفارس الأسود'],
      ['Rhine Knight', 'فارس الراين'],
      ['Youth', 'شبابية'],
      ['Sport Plus', 'رياضية بلس'],
      ['Sport Lite', 'رياضية لايت'],
      ['All-Round', 'متعددة الاستخدامات'],
      ['7-Seat', '7 مقاعد'],
      ['6-Seat', '6 مقاعد'],
      ['5-Seat', '5 مقاعد'],
      ['Hybrid', 'هجين'],
      ['Gasoline', 'بنزين'],
      ['Diesel', 'ديزل'],
      ['Flagship', 'الفئة الرائدة'],
      ['Prestige', 'بريستيج'],
      ['Premium', 'بريميوم'],
      ['Luxury', 'فاخرة'],
      ['Elite', 'فئة النخبة'],
      ['Pioneer', 'فئة البداية'],
      ['Leading', 'متقدمة'],
      ['Style', 'الأناقة'],
      ['Comfort', 'مريحة'],
      ['Radiance', 'إشراقة'],
      ['Facelift', 'محسنة'],
      ['Standard', 'قياسية'],
      ['Excellence', 'متميزة'],
      ['Advanced', 'متطورة'],
      ['Classic', 'كلاسيك'],
      ['Honor', 'Honor'],
      ['Sport', 'رياضية'],
      ['Explore', 'استكشاف'],
      ['Summit', 'القمة'],
      ['Adventure', 'مغامرة'],
      ['Navigator', 'ملاحة'],
      ['Traverse', 'عابرة'],
      ['Conquer', 'الفتح'],
      ['Expedition', 'رحلات'],
      ['Touring', 'سياحية'],
      ['Enjoy', 'مريحة'],
      ['Automatic', 'أوتوماتيكي'],
      ['Sunroof', 'فتحة سقف'],
      ['Smart', 'ذكية'],
      ['Extended', 'ممتدة'],
      ['FWD', 'دفع أمامي'],
      ['AWD', 'دفع رباعي'],
      ['RWD', 'دفع خلفي'],
      ['Other trims', 'فئات أخرى']
    ]
  };

  var UI_TEXT = {
    en: {
      menuSub: 'Select guide price to contact us',
      modalTitle: 'Select Guide Price',
      modalIntro: 'Choose a guide price or powertrain version, then contact us for the current export price and availability.',
      empty: 'No guide price data yet.',
      pending: 'Configuration data is being updated. Please contact us on WhatsApp for the latest export price.',
      config: 'Config',
      consult: 'Consult',
      greeting: 'Hello, I want to consult about {model}.',
      configuration: 'Configuration: {trim}',
      guidePrice: 'Guide price: {price}',
      request: 'Please send the current export price, availability, port options and documents.'
    },
    fr: {
      menuSub: 'Sélectionnez le prix catalogue pour nous contacter',
      modalTitle: 'Sélectionner le prix catalogue',
      modalIntro: 'Choisissez un prix catalogue ou une motorisation, puis contactez-nous pour connaître le prix export et la disponibilité.',
      empty: 'Aucun prix catalogue disponible pour le moment.',
      pending: 'Les données de configuration sont en cours de mise à jour. Contactez-nous sur WhatsApp pour le dernier prix export.',
      config: 'Fiche',
      consult: 'Consulter',
      greeting: 'Bonjour, je souhaite obtenir des informations sur {model}.',
      configuration: 'Configuration : {trim}',
      guidePrice: 'Prix catalogue : {price}',
      request: 'Merci de nous envoyer le prix export actuel, la disponibilité, les options de port et les documents.'
    },
    ru: {
      menuSub: 'Выберите рекомендованную цену для консультации',
      modalTitle: 'Выберите рекомендованную цену',
      modalIntro: 'Выберите цену или силовую установку, затем свяжитесь с нами для уточнения экспортной цены и наличия.',
      empty: 'Данные о рекомендованной цене пока отсутствуют.',
      pending: 'Данные комплектации обновляются. Свяжитесь с нами в WhatsApp для уточнения экспортной цены.',
      config: 'Комплектация',
      consult: 'Запрос',
      greeting: 'Здравствуйте! Нужна консультация по автомобилю {model}.',
      configuration: 'Комплектация: {trim}',
      guidePrice: 'Ориентир цены: {price}',
      request: 'Пожалуйста, отправьте актуальную экспортную цену, наличие, варианты порта и документы.'
    },
    ar: {
      menuSub: 'اختر السعر الإرشادي للتواصل معنا',
      modalTitle: 'اختر السعر الإرشادي',
      modalIntro: 'اختر السعر الإرشادي أو نظام الدفع، ثم تواصل معنا لمعرفة سعر التصدير الحالي والتوفر.',
      empty: 'لا تتوفر بيانات السعر الإرشادي حاليا.',
      pending: 'يجري تحديث بيانات الفئات. تواصل معنا عبر WhatsApp لمعرفة أحدث سعر للتصدير.',
      config: 'المواصفات',
      consult: 'استشارة',
      greeting: 'مرحبا، أود الاستفسار عن {model}.',
      configuration: 'الفئة: {trim}',
      guidePrice: 'السعر الإرشادي: {price}',
      request: 'يرجى إرسال سعر التصدير الحالي والتوفر وخيارات الميناء والمستندات.'
    }
  };

  function localeCode(locale) {
    var code = String(locale || '').toLowerCase().split('-')[0];
    return code === 'fr' || code === 'ru' || code === 'ar' ? code : 'en';
  }

  function replaceTerms(value, terms) {
    var output = value;
    for (var i = 0; i < terms.length; i++) {
      output = output.split(terms[i][0]).join(terms[i][1]);
    }
    return output;
  }

  function canonicalize(rawName) {
    var source = String(rawName || '')
      .replace(/（/g, ' (')
      .replace(/）/g, ') ')
      .replace(/[·•]/g, ' ')
      .replace(/(\d{4})款/g, '$1 ')
      .replace(/([0-9]+)\s*座/g, '$1-Seat ');

    source = replaceTerms(source, MODEL_NAMES);
    source = replaceTerms(source, CANONICAL_TERMS);
    source = source
      .replace(/[款版型]+/g, ' ')
      .replace(/[\u3400-\u9fff\uf900-\ufaff]+/g, ' ')
      .replace(/\s*([()+/])\s*/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();

    source = source
      .replace(/\b(Hybrid)(?:\s+\1)+\b/g, '$1')
      .replace(/\b(AWD|FWD|RWD)(?:\s+\1)+\b/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();

    return source || 'Standard Edition';
  }

  function localizeCanonical(canonical, locale) {
    var code = localeCode(locale);
    if (code === 'en') return canonical;
    return replaceTerms(canonical, LOCALIZED_TERMS[code] || []);
  }

  function localizeTrim(rawName, specid, locale) {
    var exact = EXACT_TRIMS[String(specid || '')];
    return localizeCanonical(exact || canonicalize(rawName), locale);
  }

  function localizeGroup(groupName, locale) {
    return localizeCanonical(String(groupName || 'Other trims'), locale);
  }

  function uiText(key, locale, values) {
    var code = localeCode(locale);
    var table = UI_TEXT[code] || UI_TEXT.en;
    var text = table[key] || UI_TEXT.en[key] || '';
    var data = values || {};
    return text.replace(/\{([a-zA-Z]+)\}/g, function(match, name) {
      return data[name] == null ? '' : data[name];
    });
  }

  global.ChemnitzTrimI18n = {
    locale: localeCode,
    trim: localizeTrim,
    group: localizeGroup,
    ui: uiText
  };
})(window);
