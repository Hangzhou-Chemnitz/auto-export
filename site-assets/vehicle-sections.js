import {createModelInquiry} from './vehicle-inquiry.js';
import {createModelFaq} from './vehicle-faq.js';

export function addSections({id,name,zh}){
 const t=(a,b)=>zh?a:b,el=(tag,value,cls)=>{const e=document.createElement(tag);e.textContent=value;if(cls)e.className=cls;return e};
 document.querySelector('#specifications h2').textContent=t('技术规格与配置','Technical specifications & equipment');
 const block=el('section','','trade-panel');block.id='shipping';
 block.append(el('h2',t('运输、文件与付款','Shipping, documents & payment')));
 const trade=el('div','','trade-grid');
 const entries=[
 ['运输方式','Transport','按目的地、车型及承运方案确认。','Confirm for the destination, vehicle and carrier.'],
 ['装柜方案（40HQ）','Container loading (40HQ)','装载数量、固定方式及可行性由物流方核算，不默认每柜两台。','The logistics provider must validate capacity, securing and feasibility; two vehicles per container is not assumed.'],
 ['装运港口','Loading port','按货源位置与订单运输方案确认。','Confirm according to vehicle location and the agreed route.'],
 ['交付时间','Delivery timing','15天左右，实际按车辆准备情况与承运排期确认。','Around 15 days; actual timing is subject to vehicle readiness and carrier schedules.'],
 ['贸易条款','Trade terms','现有官网涉及 FOB / EXW；具体适用条款和费用范围以报价及合同为准。','The existing site references FOB / EXW; the quotation and contract define applicable terms and costs.'],
 ['提供的文件','Documents provided','商业发票、装箱单、提单、原产地证书、出口许可证、合格证书。','Commercial invoice, packing list, bill of lading, certificate of origin, export licence and certificate of conformity.'],
 ['付款条款','Payment terms','30%定金，70%尾款。','30% deposit, 70% balance.'],
 ['认证与合规','Certification & compliance','按具体车辆与目的地逐项核实，不预先承诺 GCC / EAC 等认证。','Verify for the specific vehicle and destination; GCC / EAC certification is not assumed.']];
 entries.forEach(([cn,en,a,b],i)=>{const item=el('article');item.append(el('span',String(i+1).padStart(2,'0'),'trade-number'),el('h3',t(cn,en)),el('p',t(a,b)));trade.append(item)});block.append(trade);
 const faqArea=el('section','','faq-quote-grid');faqArea.id='model-faq';const faq=createModelFaq({id,name,zh});
 const inquiry=el('div','','model-inquiry-panel');inquiry.id='model-inquiry';inquiry.append(el('p',t('从具体订单开始','START WITH YOUR ORDER'),'eyebrow'),el('h2',t('获取 ','Request a quote for ')+name+t(' 的报价','')),el('p',t('直接填写采购需求，选择顾问后前往 WhatsApp 沟通报价。','Enter your requirements and choose a sales contact to discuss your quotation on WhatsApp.')),createModelInquiry({name,zh}));
 faqArea.append(faq,inquiry);
 const bottom=document.querySelector('.vehicle-bottom');bottom.replaceWith(block,faqArea);
}
