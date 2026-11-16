const DAY=86400000;
const dateOK=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x))&&new Date(x).toISOString().slice(0,10)===x;
export function readSearchOrder(raw,models,today=new Date().toISOString().slice(0,10)){
 const invalid={status:'unavailable',rankedModelIds:[]};
 if(!raw||raw.version!==1||raw.source!=='google-search-console'||raw.metric!=='model-page-impressions'||raw.aggregation!=='en-zh-canonical-pages'||!['ready','insufficient-data'].includes(raw.status))return invalid;
 const w=raw.window;if(!w||!dateOK(w.from)||!dateOK(w.to)||!dateOK(raw.validThrough)||!dateOK(today)||w.to>=today||w.from>w.to||raw.validThrough<today||raw.validThrough<w.to||Date.parse(raw.validThrough)-Date.parse(w.to)>14*DAY)return invalid;
 const days=Math.round((Date.parse(w.to)-Date.parse(w.from))/DAY)+1;
 if(days!==w.availableDays||days<1||days>28||w.targetDays!==28||!Array.isArray(raw.rankedModelIds))return invalid;
 const known=new Set(models.map(x=>x.id)),ids=raw.rankedModelIds;
 if(new Set(ids).size!==ids.length||ids.some(id=>!known.has(id))||raw.samplePolicy?.minImpressions!==5||raw.samplePolicy?.minObservedDays!==2)return invalid;
 if(raw.status==='ready'&&(days<7||ids.length<2))return invalid;
 if(raw.status==='insufficient-data'&&ids.length)return invalid;
 return{...raw,window:{...w},rankedModelIds:[...ids]};
}
export function orderModels(items,data,mode='search'){
 if(mode!=='search'||data?.status!=='ready')return[...items];
 const ranks=new Map(data.rankedModelIds.map((id,i)=>[id,i]));
 return items.map((model,index)=>({model,index})).sort((a,b)=>(ranks.get(a.model.id)??Infinity)-(ranks.get(b.model.id)??Infinity)||a.index-b.index).map(x=>x.model);
}
export function orderSummary(data,zh,mode='search',regional=false){
 const t=(a,b)=>zh?a:b;
 if(mode==='catalog')return t('当前按目录顺序展示。','Showing catalogue order.');
 if(data?.status==='unavailable'||!data)return t('搜索数据待更新，暂按目录顺序展示。','Search data awaiting an update; showing catalogue order.');
 let text=data.status==='ready'?t('官网搜索关注度 · 数据：','Website search attention · Data: '):t('搜索样本积累中，暂按目录顺序展示。数据：','Building a search sample; showing catalogue order. Data: ');
 text+=data.window.from+' — '+data.window.to;
 if(data.window.availableDays<28)text+=t('（尚不足28天）',' (less than 28 days)');
 if(data.status==='ready')text+=t('；样本不足的车型保留目录顺序。','; models with limited data retain catalogue order.');
 if(regional)text+=t(' 区域筛选只缩小车型范围，关注度仍按官网整体统计。',' Regional filters limit the model set; attention still uses site-wide data.');
 return text;
}
