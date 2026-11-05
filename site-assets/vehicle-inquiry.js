// Keep model-page inquiries on the page until the customer opens WhatsApp.
// Contacts match the existing dedicated quotation page; no backend submission.
import './inquiry-draft.js';
const CONTACTS = [
 ['Chloe','8615625033581'],['Natalie','8615913687692'],
 ['Darwin','8613640033268'],['Zeeshan','8618511445792'],['Jacky','8613826126147']
];

export function createModelInquiry({name,zh}) {
 const t=(cn,en)=>zh?cn:en;
 const el=(tag,content,cls)=>{const node=document.createElement(tag);if(content)node.textContent=content;if(cls)node.className=cls;return node};
 const form=el('form','','model-inquiry-form');form.id='model-inquiry-form';
 function field(key,cn,en,{type='text',required=false,textarea=false,autocomplete,placeholder}={}){
  const label=el('label',t(cn,en)+(required?' *':''));
  const control=el(textarea?'textarea':'input');control.name=key;control.id='model-inquiry-'+key;
  if(!textarea)control.type=type;
  control.required=required;if(autocomplete)control.autocomplete=autocomplete;
  if(placeholder)control.placeholder=t(...placeholder);
  label.append(control);return {label,control};
 }
 const model=field('model','车型 / 已选配置','Model / selected trim',{textarea:true,required:true});
 model.control.readOnly=true;model.control.rows=2;model.control.value=name;model.control.dataset.inquiryModel='';
 model.control.setAttribute('aria-describedby','model-inquiry-trim-note');
 const trimNote=el('small',t('自动同步上方选择的配置版本。','Automatically follows the trim selected above.'),'inquiry-field-note');trimNote.id='model-inquiry-trim-note';model.label.append(trimNote);form.append(model.label);
 const customer=field('customer','姓名','Name',{required:true,autocomplete:'name'});
 const company=field('company','公司名称（选填）','Company (optional)',{autocomplete:'organization'});
 const destination=field('destination','目的国家 / 港口','Destination country / port',{required:true,placeholder:['例如：秘鲁 / 卡亚俄','e.g. Peru / Callao']});
 const quantity=field('quantity','采购数量','Quantity',{required:true,type:'number'});quantity.control.min='1';quantity.control.step='1';
 const email=field('email','邮箱（选填）','Email (optional)',{type:'email',autocomplete:'email'});
 const phone=field('phone','WhatsApp / 电话（选填）','WhatsApp / phone (optional)',{type:'tel',autocomplete:'tel'});
 for(const pair of [[customer,company],[destination,quantity],[email,phone]]){const row=el('div','','inquiry-form-row');pair.forEach(f=>row.append(f.label));form.append(row);}
 const message=field('message','补充需求（选填）','Additional requirements (optional)',{textarea:true,placeholder:['颜色、期望交付时间或其他采购需求','Colours, preferred delivery timing or other requirements']});message.control.rows=3;form.append(message.label);
 const contactLabel=el('label',t('选择销售顾问','Select a sales contact'));const contact=el('select');contact.name='contact';contact.id='model-inquiry-contact';CONTACTS.forEach(([label,number])=>contact.add(new Option(label,number)));contactLabel.append(contact);form.append(contactLabel);
 const contactNote=el('small',t('秘鲁、哥伦比亚和智利客户建议联系 Jacky；也可自行选择顾问。','Jacky is recommended for Peru, Colombia and Chile; you can also choose a contact.'),'inquiry-field-note');contactNote.id='model-inquiry-contact-note';contact.setAttribute('aria-describedby',contactNote.id);contactLabel.append(contactNote);
 destination.control.addEventListener('change',()=>{const country=destination.control.value.normalize('NFD').replace(/[\u0300-\u036f]/g,'');if(/\b(peru|colombia|chile)\b|秘鲁|哥伦比亚|智利/i.test(country))contact.value='8613826126147';});
 const consent=el('label','','inquiry-consent');const checkbox=el('input');checkbox.type='checkbox';checkbox.required=true;checkbox.name='consent';checkbox.id='model-inquiry-consent';
 consent.append(checkbox,el('span',t('我同意将上述信息通过 WhatsApp 分享给所选销售顾问，以沟通本次询价。','I agree to share these details with the selected sales contact through WhatsApp for this inquiry.')));form.append(consent);
 const submit=el('button',t('前往 WhatsApp 询价','Continue to WhatsApp'),'button red');submit.type='submit';submit.append(el('span','↗'));form.append(submit);
 const note=el('small',t('点击后直接打开 WhatsApp，自动生成车型、配置和采购需求，由您确认后发送；不会提交到网站后台。','Opens WhatsApp directly with your model, trim and requirements. Review and send the message yourself; nothing is submitted to a website backend.'));form.append(note);
 window.ChemnitzInquiry.bind(form,{scope:'vehicle',surface:'vehicle',modelOverride:name,modelLabel:'Model & trim',zh});
 return form;
}
