(function(global) {
  'use strict';

  function groupName(trim) {
    var name = String(trim.name || '');
    if (name.indexOf(' · ') > -1) return name.split(' · ')[0];
    if (/380T/.test(name)) return '2.0T Gasoline';
    if (/纯电|EV|km|续航|增程/.test(name)) return 'New Energy';
    var match = name.match(/([0-9]\.[0-9])\s*(L|T|TD|TSI|HE|HG|HQ|E|G|S)?/);
    var displacement = match ? match[1] + (/^(T|TD|TSI)$/.test(match[2] || '') ? 'T' : 'L') : '';
    if (/双擎|混动|HEV|e:HEV|智擎|DM|EM/.test(name)) return displacement ? displacement + ' Hybrid' : 'Hybrid';
    return displacement ? displacement + ' Gasoline' : 'Other trims';
  }

  function guidePrice(trim) {
    var value = String(trim.msrp || trim.price || '').trim();
    var digits = value.replace(/[^\d]/g, '');
    return digits ? 'RMB ' + Number(digits).toLocaleString('en-US') : value;
  }

  function make(tag, className, value) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    if (value != null) element.textContent = value;
    return element;
  }

  global.ChemnitzHomeConfigPicker = {
    init: function(options) {
      var locale = options.locale || document.documentElement.lang || 'en';
      var i18n = global.ChemnitzTrimI18n;
      var activeAnchor = null;
      var anchorTop = null;
      var menu = null;

      function ui(key) {
        return i18n ? i18n.ui(key, locale) : key;
      }

      function close(restoreFocus) {
        if (menu) menu.remove();
        menu = null;
        if (activeAnchor) {
          activeAnchor.setAttribute('aria-expanded', 'false');
          if (restoreFocus) activeAnchor.focus();
        }
        activeAnchor = null;
        anchorTop = null;
      }

      function place(anchor) {
        var rect = anchor.getBoundingClientRect();
        var bounds = menu.getBoundingClientRect();
        var gap = 8;
        var rtl = locale === 'ar';
        var left = rtl ? rect.right - bounds.width : rect.left;
        var top = rect.bottom + gap;
        if (left + bounds.width > global.innerWidth - 12) left = global.innerWidth - bounds.width - 12;
        if (top + bounds.height > global.innerHeight - 12) top = Math.max(12, rect.top - bounds.height - gap);
        menu.style.left = Math.max(12, left) + 'px';
        menu.style.top = Math.max(12, top) + 'px';
      }

      function open(modelName, anchor) {
        if (menu && activeAnchor === anchor) {
          close(false);
          return;
        }
        close(false);
        if (options.onOpen) options.onOpen(modelName);
        var data = (global.ChemnitzHomeModels && global.ChemnitzHomeModels[modelName]) || options.getData(modelName);
        var trims = data && Array.isArray(data.trims) ? data.trims : [];
        if (!trims.length) {
          options.onSelect(modelName, null);
          return;
        }

        menu = make('div', 'chemnitz-config-menu');
        menu.id = 'localized-config-menu';
        menu.setAttribute('role', 'dialog');
        menu.setAttribute('aria-label', modelName + ' · ' + ui('modalTitle'));
        if (locale === 'ar') menu.dir = 'rtl';
        var head = make('div', 'chemnitz-config-menu-head');
        head.appendChild(make('div', 'chemnitz-config-menu-title', modelName));
        head.appendChild(make('div', 'chemnitz-config-menu-sub', ui('menuSub')));
        menu.appendChild(head);

        var groups = [];
        trims.forEach(function(trim, index) {
          var label = i18n ? i18n.group(groupName(trim), locale) : groupName(trim);
          var group = groups.find(function(item) { return item.label === label; });
          if (!group) {
            group = { label: label, entries: [] };
            groups.push(group);
          }
          group.entries.push({ trim: trim, index: index });
        });
        groups.forEach(function(group) {
          menu.appendChild(make('div', 'chemnitz-config-menu-group', group.label));
          group.entries.forEach(function(entry) {
            var trim = entry.trim;
            var option = make('button', 'chemnitz-config-menu-option');
            option.type = 'button';
            option.dataset.vehicleSpecId = String(trim.specid || '');
            var main = make('span', 'chemnitz-config-menu-option-main');
            var price = make('bdi', 'chemnitz-config-menu-price', guidePrice(trim));
            price.dir = 'ltr';
            main.appendChild(price);
            main.appendChild(make('span', 'chemnitz-config-menu-name', i18n ? i18n.trim(trim.name || '', trim.specid, locale) : trim.name || ''));
            option.appendChild(main);
            var hasSheet = trim._homeSheetUrl || (global.ChemnitzFeaturedConfigUrl && global.ChemnitzFeaturedConfigUrl(modelName, trim));
            option.appendChild(make('span', 'chemnitz-config-menu-meta', ui(hasSheet ? 'config' : 'consult')));
            option.addEventListener('click', function(event) {
              event.stopPropagation();
              close(false);
              if (trim._homeSheetUrl) {
                var context = {model_name:modelName,vehicle_spec_id:String(trim.specid || ''),page_language:locale,entry_surface:'home_featured_models',cta_location:'config_picker'};
                if (global.chemnitzSetConsultationContext) global.chemnitzSetConsultationContext(context);
                if (global.chemnitzTrack) global.chemnitzTrack('guide_price_select',context);
                var separator = trim._homeSheetUrl.indexOf('?') === -1 ? '?' : '&';
                global.location.href = trim._homeSheetUrl + separator + 'from=home&lang=' + encodeURIComponent(locale);
                return;
              }
              options.onSelect(modelName, entry.index);
            });
            menu.appendChild(option);
          });
        });
        document.body.appendChild(menu);
        activeAnchor = anchor;
        anchorTop = anchor.getBoundingClientRect().top;
        anchor.setAttribute('aria-expanded', 'true');
        place(anchor);
      }

      document.querySelectorAll('.featured-models .model-card .brochure-link').forEach(function(anchor) {
        anchor.removeAttribute('onclick');
        anchor.setAttribute('aria-haspopup', 'dialog');
        anchor.setAttribute('aria-controls', 'localized-config-menu');
        anchor.setAttribute('aria-expanded', 'false');
        anchor.addEventListener('click', function(event) {
          event.preventDefault();
          event.stopPropagation();
          var card = anchor.closest('.model-card');
          open(card && card.getAttribute('data-title') || '', anchor);
        });
      });
      document.addEventListener('click', function(event) {
        if (menu && !menu.contains(event.target)) close(false);
      });
      document.addEventListener('keydown', function(event) {
        if (menu && event.key === 'Escape') {
          event.preventDefault();
          close(true);
        }
      });
      global.addEventListener('resize', function() { if (menu) close(false); });
      global.addEventListener('scroll', function(event) {
        // Scrolling the options must not close their own menu. A delayed event
        // from scrolling the trigger into view must not close a newly opened menu.
        if (!menu || !activeAnchor || menu.contains(event.target)) return;
        if (Math.abs(activeAnchor.getBoundingClientRect().top - anchorTop) > 1) close(false);
      }, true);
    }
  };
})(window);
