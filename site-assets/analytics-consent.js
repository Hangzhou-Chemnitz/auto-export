// Basic consent mode: do not load any Google tag before an affirmative choice.
(function () {
 'use strict';
 if (window.ChemnitzAnalyticsConsent) return;
 const root = document.documentElement, KEY = 'chemnitz:analytics-consent:v1', AGE = 180 * 86400000;
 const eligible = location.protocol === 'https:' && ['hzchemnitz.cn','www.hzchemnitz.cn'].includes(location.hostname) && root.dataset.release === 'true' && root.dataset.analyticsReviewed === 'true' && root.dataset.stage !== 'true' && !document.querySelector('meta[name="robots"][content*="noindex"]');
 const protectedChoice = navigator.globalPrivacyControl === true || navigator.doNotTrack === '1' || window.doNotTrack === '1';
 const lang = (root.lang || 'en').split('-')[0];
 const copy = {
  en:['Your privacy choices','With your permission, we use Google Analytics cookies to understand visits, vehicle views and contact-button clicks. We do not send inquiry text, names, email addresses or phone numbers. No advertising tracking. Refusing does not affect browsing or contacting us. You can change this choice at any time.','Allow analytics','Necessary only','Privacy choices','Close','Your browser privacy signal is respected: analytics remains off.'],
  zh:['隐私选择','经您同意，我们使用 Google Analytics Cookie 统计访问、车型浏览和联系按钮点击。不发送询价内容、姓名、邮箱或电话号码，不进行广告跟踪。拒绝不会影响浏览或联系团队，您可随时更改选择。','允许统计','仅必要功能','隐私设置','关闭','已尊重浏览器的隐私信号：统计保持关闭。'],
  es:['Tus opciones de privacidad','Con tu permiso, usamos cookies de Google Analytics para medir visitas, vistas de vehículos y clics de contacto. No enviamos consultas, nombres, correos ni teléfonos. Sin seguimiento publicitario. Rechazar no afecta la navegación ni el contacto. Puedes cambiar tu elección en cualquier momento.','Permitir estadísticas','Solo necesarias','Privacidad','Cerrar','Respetamos la señal de privacidad del navegador: las estadísticas siguen desactivadas.'],
  fr:['Vos choix de confidentialité','Avec votre accord, nous utilisons les cookies Google Analytics pour mesurer les visites, les vues de véhicules et les clics de contact. Aucun texte de demande, nom, e-mail ou téléphone n’est envoyé. Aucun suivi publicitaire. Refuser ne limite ni la navigation ni les contacts. Vous pouvez modifier votre choix à tout moment.','Autoriser les statistiques','Nécessaires uniquement','Confidentialité','Fermer','Le signal de confidentialité du navigateur est respecté : les statistiques restent désactivées.'],
  ru:['Настройки конфиденциальности','С вашего согласия мы используем файлы cookie Google Analytics для подсчёта посещений, просмотров автомобилей и нажатий кнопок связи. Тексты запросов, имена, адреса почты и телефоны не передаются. Рекламного отслеживания нет. Отказ не мешает просмотру и связи с нами. Выбор можно изменить в любое время.','Разрешить статистику','Только необходимые','Конфиденциальность','Закрыть','Сигнал конфиденциальности браузера учтён: статистика отключена.'],
  ar:['خيارات الخصوصية','بموافقتك، نستخدم ملفات تعريف الارتباط في Google Analytics لقياس الزيارات ومشاهدات السيارات والنقر على أزرار التواصل. لا نرسل نص الاستفسار أو الأسماء أو البريد الإلكتروني أو أرقام الهاتف، ولا نستخدم تتبع الإعلانات. الرفض لا يؤثر في التصفح أو التواصل معنا. يمكنك تغيير اختيارك في أي وقت.','السماح بالإحصاءات','الضرورية فقط','الخصوصية','إغلاق','نحترم إشارة الخصوصية في متصفحك: تبقى الإحصاءات معطلة.']
 }[lang] || null;
 const words = copy || ['Privacy choices','Optional Google Analytics cookies measure visits and contact-button clicks without inquiry content or advertising tracking. Refusing does not affect the website.','Allow analytics','Necessary only','Privacy choices','Close','Analytics is off because of your browser privacy signal.'];
 let choice = null, panel, launcher, previousFocus;
 try { const saved = JSON.parse(localStorage.getItem(KEY)); if (saved && saved.version === 1 && ['granted','denied'].includes(saved.choice) && Number.isFinite(saved.at) && saved.at <= Date.now() && Date.now() - saved.at < AGE) choice = saved.choice; } catch {}
 function allowed() { return eligible && choice === 'granted' && !protectedChoice; }
 function close() { if (panel) panel.hidden = true; if (previousFocus?.isConnected) previousFocus.focus(); }
 function set(value) {
  if (!['granted','denied'].includes(value)) return;
  choice = protectedChoice ? 'denied' : value;
  try { localStorage.setItem(KEY,JSON.stringify({version:1,choice,at:Date.now()})); } catch {}
  window.dispatchEvent(new CustomEvent('chemnitz:analytics-consent',{detail:{allowed:allowed()}}));
  close();
 }
 function open() { if (panel) { previousFocus = document.activeElement; panel.hidden = false; panel.querySelector('button').focus(); } }
 window.ChemnitzAnalyticsConsent = Object.freeze({allowed,set,open});
 if (!eligible) return;
 function render() {
  launcher = document.createElement('button'); launcher.type = 'button'; launcher.className = 'privacy-choice'; launcher.textContent = words[4]; launcher.setAttribute('aria-controls','analytics-privacy'); launcher.addEventListener('click',open);
  panel = document.createElement('section'); panel.id = 'analytics-privacy'; panel.className = 'analytics-privacy'; panel.setAttribute('role','region'); panel.setAttribute('aria-labelledby','analytics-privacy-title'); panel.dir = lang === 'ar' ? 'rtl' : 'ltr';
  const title = document.createElement('h2'); title.id = 'analytics-privacy-title'; title.textContent = words[0];
  const text = document.createElement('p'); text.textContent = words[1];
  const buttons = document.createElement('div'); buttons.className = 'analytics-privacy-actions';
  for (const [label,value] of [[words[3],'denied'],[words[2],'granted']]) { const button = document.createElement('button'); button.type = 'button'; button.textContent = label; button.addEventListener('click',()=>set(value)); if (protectedChoice && value === 'granted') button.disabled = true; buttons.append(button); }
  const dismiss = document.createElement('button'); dismiss.type = 'button'; dismiss.className = 'analytics-privacy-close'; dismiss.textContent = '×'; dismiss.setAttribute('aria-label',words[5]); dismiss.addEventListener('click',close);
  panel.append(title,text,buttons,dismiss);
  if (protectedChoice) { const note = document.createElement('p'); note.textContent = words[6]; panel.append(note); }
  panel.addEventListener('keydown',event=>{ if (event.key === 'Escape') close(); });
  panel.hidden = choice !== null || protectedChoice;
  document.body.append(launcher,panel);
 }
 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',render,{once:true}); else render();
 window.addEventListener('storage',event=>{
  if (event.key !== KEY) return;
  try { const saved = JSON.parse(event.newValue); choice = saved?.version === 1 && ['granted','denied'].includes(saved.choice) && saved.at <= Date.now() && Date.now()-saved.at < AGE ? saved.choice : null; } catch { choice = null; }
  window.dispatchEvent(new CustomEvent('chemnitz:analytics-consent',{detail:{allowed:allowed()}}));
 });
})();
