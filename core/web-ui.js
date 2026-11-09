// ESPHOME_Hunter web_server v3 add-ons (the only js_include allowed):
//  1) project favicon (droplet+chip) via data: URI;
//  2) cap the debug log panel height;
//  3) PT/EN language toggle + entity/group name translation (MutationObserver);
//  4) collapsible wiring diagram driven by live zone state (/events).

(function () {
  var HREF = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNjAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImYiIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMyQkQ0N0QiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwQThGRDgiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIHJ4PSIxMjgiIGZpbGw9InVybCgjZikiLz48cGF0aCBkPSJNMzAwIDcwTDQ0Ni41IDI3NS41QTE4MCAxODAgMCAxIDEgMTUzLjUgMjc1LjVaIiBmaWxsPSIjZmZmIi8+CjxyZWN0IHg9IjIyNS4wIiB5PSIzMzAuMCIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIHJ4PSIyMiIgZmlsbD0idXJsKCNmKSIvPjxwYXRoIGQ9Ik0yMjEuMCAzNjBIMTkxLjBNMzc5LjAgMzYwSDQwOS4wTTIyMS4wIDQwNUgxOTEuME0zNzkuMCA0MDVINDA5LjBNMjIxLjAgNDUwSDE5MS4wTTM3OS4wIDQ1MEg0MDkuMCIgc3Ryb2tlPSJ1cmwoI2YpIiBzdHJva2Utd2lkdGg9IjIwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=';
  function applyFav() {
    var head = document.head || document.getElementsByTagName('head')[0];
    if (!head) return;
    var links = head.querySelectorAll('link[rel="icon"],link[rel="shortcut icon"]');
    if (!links.length) {
      var l = document.createElement('link');
      l.rel = 'icon'; l.type = 'image/svg+xml'; l.href = HREF; head.appendChild(l);
    } else {
      for (var i = 0; i < links.length; i++) { links[i].type = 'image/svg+xml'; links[i].href = HREF; }
    }
  }
  if (document.head) applyFav(); else document.addEventListener('DOMContentLoaded', applyFav);
})();

(function () {
  function root() { var a = document.querySelector('esp-app'); return a && a.shadowRoot; }
  function fixLog() {
    var sr = root(), log = sr && sr.querySelector('esp-log'), lr = log && log.shadowRoot;
    if (!lr) return false;
    if (!lr.getElementById('web-log-css')) {
      var st = document.createElement('style');
      st.id = 'web-log-css';
      st.textContent = '.logs{max-height:min(45vh,420px);overflow-y:auto;overscroll-behavior:contain}';
      lr.appendChild(st);
    }
    return true;
  }
  if (!fixLog()) { var n = 0, t = setInterval(function () { if (fixLog() || ++n > 40) clearInterval(t); }, 250); }
})();

(function () {
  var ENT_PT = {"Zone 1": "Zona 1", "Zone 2": "Zona 2", "Zone 3": "Zona 3", "Zone 4": "Zona 4", "Zone 5": "Zona 5", "Zone 6": "Zona 6", "Zone 7": "Zona 7", "Zone 8": "Zona 8", "Zone 1 Running": "Zona 1 a regar", "Zone 2 Running": "Zona 2 a regar", "Zone 3 Running": "Zona 3 a regar", "Zone 4 Running": "Zona 4 a regar", "Zone 5 Running": "Zona 5 a regar", "Zone 6 Running": "Zona 6 a regar", "Zone 7 Running": "Zona 7 a regar", "Zone 8 Running": "Zona 8 a regar", "Zone 4 Input Voltage": "Tensão de entrada da zona 4", "Watering": "A regar", "Active Zone": "Zona ativa", "Run Time": "Duração", "Stop All": "Parar tudo", "Run Program A": "Correr programa A", "Run Program B": "Correr programa B", "Run Program C": "Correr programa C", "Pause Watering": "Pausar rega", "External Antenna": "Antena externa", "Firmware Update": "Atualização do firmware", "Auto Update": "Atualização automática", "Update Status": "Estado da atualização", "Check for Update": "Verificar atualizações", "Install Update": "Instalar atualização", "Latest Version": "Última versão", "Update Available": "Atualização disponível", "Firmware Version": "Versão do firmware", "ESPHome Version": "Versão do ESPHome", "Board": "Placa", "Uptime": "Tempo ligado", "Wi-Fi Signal": "Sinal Wi-Fi", "Reset Reason": "Motivo do reinício", "IP Address": "Endereço IP", "Restart": "Reiniciar", "Restart (Safe Mode)": "Reiniciar (modo seguro)"};
  var GROUP_PT = {"Zones": "Zonas", "Programs": "Programas", "Settings": "Definições", "Maintenance": "Manutenção", "Configuration": "Configuração", "Diagnostic": "Diagnóstico", "Undefined": "Outros"};
  var KEY = 'esphome_hunter_lang', lang;
  try { lang = localStorage.getItem(KEY); } catch (e) {}
  if (lang !== 'pt' && lang !== 'en') lang = /^pt/i.test(navigator.language || '') ? 'pt' : 'en';
  window.__hunterLang = {
    get: function () { return lang; },
    set: function (l) {
      lang = l === 'pt' ? 'pt' : 'en';
      try { localStorage.setItem(KEY, lang); } catch (e) {}
      if (window.__hunterOnLang) window.__hunterOnLang(lang);
    },
    t: function (pt, en) { return lang === 'pt' ? pt : en; }
  };

  function root() { var a = document.querySelector('esp-app'); return a && a.shadowRoot; }
  function tableEl() {
    var sr = root(), t = sr && sr.querySelector('esp-entity-table');
    return t && t.shadowRoot ? t : null;
  }
  function uiString(v) {
    if (lang !== 'pt') return v;
    var m = /^New version (.+) available, install from Device Builder$/.exec(v);
    if (m) return 'Versão nova ' + m[1] + ' disponível, instala no Device Builder';
    m = /^Up to date \((.+)\)$/.exec(v);
    if (m) return 'Atualizado (' + m[1] + ')';
    m = /^Update available: (.+)$/.exec(v);
    if (m) return 'Atualização disponível: ' + m[1];
    var CONTENT_PT = {
      'Checking for updates': 'A verificar atualizações',
      'Install requested': 'Instalação pedida',
      'Downloading firmware (do not unplug)': 'A transferir o firmware (não desligues)',
      'Installed, rebooting': 'Instalado, a reiniciar'
    };
    if (CONTENT_PT[v]) return CONTENT_PT[v];
    if (/^Update failed \(/.test(v)) return v.replace('Update failed', 'Falha na atualização');
    return v;
  }
  function translateTable() {
    var tb = tableEl();
    if (!tb) return false;
    var sr = tb.shadowRoot;
    if (tb.entities) {
      var rows = sr.querySelectorAll('.entity-row');
      for (var i = 0; i < tb.entities.length && i < rows.length; i++) {
        var box = rows[i].children && rows[i].children[1];
        if (!box) continue;
        var tn = null;
        for (var c = 0; c < box.childNodes.length; c++)
          if (box.childNodes[c].nodeType === 3 && box.childNodes[c].nodeValue.trim()) tn = box.childNodes[c];
        if (tn) {
          if (tn.__en === undefined) tn.__en = tn.nodeValue.trim();
          var en = tn.__en, pt = ENT_PT[en];
          tn.nodeValue = lang === 'pt' && pt ? pt : en;
        }
      }
    }
    sr.querySelectorAll('.entity-row').forEach(function (row) {
      var nameEl = row.children && row.children[1], name = nameEl && nameEl.textContent;
      if (!name) return;
      var wanted = lang === 'pt' ? 'Estado da atualização' : 'Update Status';
      if (name.trim().replace(/^\[[^\]]+\]\s*/, '').trim() !== wanted) return;
      var walker = document.createTreeWalker(row, NodeFilter.SHOW_TEXT), nodes = [], n;
      while ((n = walker.nextNode())) nodes.push(n);
      nodes.forEach(function (node) {
        var txt = node.nodeValue.trim();
        if (!txt || node.parentNode === nameEl) return;
        if (node.__statusEn !== undefined) txt = node.__statusEn;
        else if (/^(New version|Up to date|Checking for updates|Install requested|Downloading firmware|Installed, rebooting|Update failed)/.test(txt)) node.__statusEn = txt;
        if (node.__statusEn !== undefined) node.nodeValue = uiString(node.__statusEn);
      });
    });
    sr.querySelectorAll('.tab-header').forEach(function (h) {
      var v = h.textContent.trim();
      Object.keys(GROUP_PT).forEach(function (en) {
        if (lang === 'pt' && v === en) h.textContent = GROUP_PT[en];
        if (lang === 'en' && v === GROUP_PT[en]) h.textContent = en;
      });
    });
    sr.querySelectorAll('.abutton,.abuttonIsState').forEach(function (b) {
      var v = b.textContent.trim();
      if (!/^(PRESS|PREMIR|CARREGAR)$/.test(v)) return;
      b.textContent = lang === 'pt' ? 'CARREGAR' : 'PRESS';
    });
    if (!tb.__langObs) {
      tb.__langObs = new MutationObserver(function () { translateTableSoon(); });
      tb.__langObs.observe(sr, { childList: true, subtree: true });
    }
    return true;
  }
  var tTimer = null;
  function translateTableSoon() {
    if (tTimer) return;
    tTimer = setTimeout(function () { tTimer = null; translateTable(); }, 30);
  }
  function placeLangBtn() {
    var sr = root();
    if (!sr || sr.getElementById('hunter-lang')) return !!sr;
    var b = document.createElement('button');
    b.id = 'hunter-lang';
    b.type = 'button';
    b.style.cssText = 'margin:8px 16px;padding:6px 12px;border-radius:999px;border:1px solid #c9ccd1;background:#fff;font-weight:700;cursor:pointer';
    function paint() { b.textContent = lang === 'pt' ? 'PT · EN' : 'EN · PT'; b.title = lang === 'pt' ? 'Mudar língua (PT/EN)' : 'Switch language (PT/EN)'; }
    paint();
    b.onclick = function () {
      window.__hunterLang.set(lang === 'pt' ? 'en' : 'pt');
      paint();
      translateTable();
    };
    var main = sr.querySelector('esp-entity-table') || sr.firstChild;
    if (main && main.parentNode) main.parentNode.insertBefore(b, main);
    else sr.appendChild(b);
    window.__hunterOnLang = function () { paint(); translateTable(); };
    return true;
  }
  function bootI18n() {
    placeLangBtn();
    translateTable();
  }
  if (!bootI18n()) {
    var n = 0, t = setInterval(function () { if (bootI18n() || ++n > 60) clearInterval(t); }, 250);
  }
})();

(function () {
  var SVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1790\" height=\"1200\" viewBox=\"0 0 1790 1200\" font-family=\"Segoe UI, Roboto, Helvetica, Arial, sans-serif\"><style>.z{opacity:0;animation:on 16s infinite}@keyframes on{0%{opacity:0}1.5%{opacity:1}11%{opacity:1}12.5%,100%{opacity:0}}.dr{animation:fl .5s infinite alternate}@keyframes fl{from{opacity:.3}to{opacity:1}}.z1{animation-delay:0s}.z2{animation-delay:2s}.z3{animation-delay:4s}.z4{animation-delay:6s}.z5{animation-delay:8s}.z6{animation-delay:10s}.z7{animation-delay:12s}.z8{animation-delay:14s}</style><defs><linearGradient id=\"hg\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#2BD47D\"/><stop offset=\"1\" stop-color=\"#0A8FD8\"/></linearGradient></defs><rect width=\"1790\" height=\"1200\" fill=\"#fff\"/><g transform=\"translate(60 0)\"><rect x=\"213.0\" y=\"40\" width=\"1274.0\" height=\"560\" rx=\"44\" fill=\"#e9ebee\" stroke=\"#9aa0a6\" stroke-width=\"4\"/><rect x=\"283.0\" y=\"120\" width=\"400\" height=\"150\" rx=\"16\" fill=\"#0b2a4a\"/><text class=\"z z1\" x=\"483.0\" y=\"218.0\" text-anchor=\"middle\" font-size=\"64\" font-weight=\"700\" fill=\"#0FE3FA\" font-family=\"DejaVu Sans Mono, Consolas, monospace\">ZONE 1</text><text class=\"z z2\" x=\"483.0\" y=\"218.0\" text-anchor=\"middle\" font-size=\"64\" font-weight=\"700\" fill=\"#0FE3FA\" font-family=\"DejaVu Sans Mono, Consolas, monospace\">ZONE 2</text><text class=\"z z3\" x=\"483.0\" y=\"218.0\" text-anchor=\"middle\" font-size=\"64\" font-weight=\"700\" fill=\"#0FE3FA\" font-family=\"DejaVu Sans Mono, Consolas, monospace\">ZONE 3</text><text class=\"z z4\" x=\"483.0\" y=\"218.0\" text-anchor=\"middle\" font-size=\"64\" font-weight=\"700\" fill=\"#0FE3FA\" font-family=\"DejaVu Sans Mono, Consolas, monospace\">ZONE 4</text><text class=\"z z5\" x=\"483.0\" y=\"218.0\" text-anchor=\"middle\" font-size=\"64\" font-weight=\"700\" fill=\"#0FE3FA\" font-family=\"DejaVu Sans Mono, Consolas, monospace\">ZONE 5</text><text class=\"z z6\" x=\"483.0\" y=\"218.0\" text-anchor=\"middle\" font-size=\"64\" font-weight=\"700\" fill=\"#0FE3FA\" font-family=\"DejaVu Sans Mono, Consolas, monospace\">ZONE 6</text><text class=\"z z7\" x=\"483.0\" y=\"218.0\" text-anchor=\"middle\" font-size=\"64\" font-weight=\"700\" fill=\"#0FE3FA\" font-family=\"DejaVu Sans Mono, Consolas, monospace\">ZONE 7</text><text class=\"z z8\" x=\"483.0\" y=\"218.0\" text-anchor=\"middle\" font-size=\"64\" font-weight=\"700\" fill=\"#0FE3FA\" font-family=\"DejaVu Sans Mono, Consolas, monospace\">ZONE 8</text><circle cx=\"850\" cy=\"250\" r=\"140\" fill=\"url(#hg)\"/><path d=\"M850.0 132.0L850.0 118.0M933.4 166.6L943.3 156.7M968.0 250.0L982.0 250.0M933.4 333.4L943.3 343.3M850.0 368.0L850.0 382.0M766.6 333.4L756.7 343.3M732.0 250.0L718.0 250.0M766.6 166.6L756.7 156.7\" stroke=\"#fff\" stroke-width=\"8\" stroke-linecap=\"round\"/><circle cx=\"850\" cy=\"250\" r=\"102\" fill=\"#2b2f33\"/><path d=\"M850 310 V176\" stroke=\"#fff\" stroke-width=\"14\" stroke-linecap=\"round\"/><rect x=\"1215.0\" y=\"105\" width=\"84\" height=\"64\" rx=\"16\" fill=\"#1784F7\"/><path d=\"M1241.0 137H1273.0M1257.0 121V153\" stroke=\"#fff\" stroke-width=\"9\" stroke-linecap=\"round\" fill=\"none\"/><rect x=\"1215.0\" y=\"221\" width=\"84\" height=\"64\" rx=\"16\" fill=\"#1784F7\"/><path d=\"M1241.0 253H1273.0\" stroke=\"#fff\" stroke-width=\"9\" stroke-linecap=\"round\" fill=\"none\"/><rect x=\"1107.0\" y=\"163\" width=\"84\" height=\"64\" rx=\"16\" fill=\"#1784F7\"/><path d=\"M1159.0 179L1139.0 195L1159.0 211\" stroke=\"#fff\" stroke-width=\"9\" stroke-linecap=\"round\" fill=\"none\" stroke-linejoin=\"round\"/><rect x=\"1323.0\" y=\"163\" width=\"84\" height=\"64\" rx=\"16\" fill=\"#1784F7\"/><path d=\"M1355.0 179L1375.0 195L1355.0 211\" stroke=\"#fff\" stroke-width=\"9\" stroke-linecap=\"round\" fill=\"none\" stroke-linejoin=\"round\"/><line x1=\"243.0\" y1=\"430\" x2=\"1457.0\" y2=\"430\" stroke=\"#c9ccd1\" stroke-width=\"4\"/><text x=\"322.0\" y=\"488\" text-anchor=\"middle\" font-size=\"30\" font-weight=\"700\" fill=\"#555\">24VAC</text><text x=\"469.0\" y=\"488\" text-anchor=\"middle\" font-size=\"30\" font-weight=\"700\" fill=\"#555\">REM</text><text x=\"616.0\" y=\"488\" text-anchor=\"middle\" font-size=\"30\" font-weight=\"700\" fill=\"#555\">SEN</text><text x=\"763.0\" y=\"488\" text-anchor=\"middle\" font-size=\"40\" font-weight=\"700\" fill=\"#555\">C</text><text x=\"871.0\" y=\"488\" text-anchor=\"middle\" font-size=\"40\" font-weight=\"700\" fill=\"#0f63c4\">1</text><text x=\"949.0\" y=\"488\" text-anchor=\"middle\" font-size=\"40\" font-weight=\"700\" fill=\"#0f63c4\">2</text><text x=\"1027.0\" y=\"488\" text-anchor=\"middle\" font-size=\"40\" font-weight=\"700\" fill=\"#0f63c4\">3</text><text x=\"1105.0\" y=\"488\" text-anchor=\"middle\" font-size=\"40\" font-weight=\"700\" fill=\"#0f63c4\">4</text><text x=\"1183.0\" y=\"488\" text-anchor=\"middle\" font-size=\"40\" font-weight=\"700\" fill=\"#0f63c4\">5</text><text x=\"1261.0\" y=\"488\" text-anchor=\"middle\" font-size=\"40\" font-weight=\"700\" fill=\"#0f63c4\">6</text><text x=\"1339.0\" y=\"488\" text-anchor=\"middle\" font-size=\"40\" font-weight=\"700\" fill=\"#0f63c4\">7</text><text x=\"1417.0\" y=\"488\" text-anchor=\"middle\" font-size=\"40\" font-weight=\"700\" fill=\"#0f63c4\">8</text><circle cx=\"283.0\" cy=\"548\" r=\"26\" fill=\"#b8bcc2\" stroke=\"#555\" stroke-width=\"4\"/><line x1=\"267.0\" y1=\"548\" x2=\"299.0\" y2=\"548\" stroke=\"#444\" stroke-width=\"6\"/><circle cx=\"361.0\" cy=\"548\" r=\"26\" fill=\"#b8bcc2\" stroke=\"#555\" stroke-width=\"4\"/><line x1=\"345.0\" y1=\"548\" x2=\"377.0\" y2=\"548\" stroke=\"#444\" stroke-width=\"6\"/><circle cx=\"469.0\" cy=\"548\" r=\"26\" fill=\"#b8bcc2\" stroke=\"#555\" stroke-width=\"4\"/><line x1=\"453.0\" y1=\"548\" x2=\"485.0\" y2=\"548\" stroke=\"#444\" stroke-width=\"6\"/><circle cx=\"577.0\" cy=\"548\" r=\"26\" fill=\"#b8bcc2\" stroke=\"#555\" stroke-width=\"4\"/><line x1=\"561.0\" y1=\"548\" x2=\"593.0\" y2=\"548\" stroke=\"#444\" stroke-width=\"6\"/><circle cx=\"655.0\" cy=\"548\" r=\"26\" fill=\"#b8bcc2\" stroke=\"#555\" stroke-width=\"4\"/><line x1=\"639.0\" y1=\"548\" x2=\"671.0\" y2=\"548\" stroke=\"#444\" stroke-width=\"6\"/><circle cx=\"763.0\" cy=\"548\" r=\"26\" fill=\"#b8bcc2\" stroke=\"#555\" stroke-width=\"4\"/><line x1=\"747.0\" y1=\"548\" x2=\"779.0\" y2=\"548\" stroke=\"#444\" stroke-width=\"6\"/><circle cx=\"871.0\" cy=\"548\" r=\"26\" fill=\"#b8bcc2\" stroke=\"#555\" stroke-width=\"4\"/><line x1=\"855.0\" y1=\"548\" x2=\"887.0\" y2=\"548\" stroke=\"#444\" stroke-width=\"6\"/><circle cx=\"949.0\" cy=\"548\" r=\"26\" fill=\"#b8bcc2\" stroke=\"#555\" stroke-width=\"4\"/><line x1=\"933.0\" y1=\"548\" x2=\"965.0\" y2=\"548\" stroke=\"#444\" stroke-width=\"6\"/><circle cx=\"1027.0\" cy=\"548\" r=\"26\" fill=\"#b8bcc2\" stroke=\"#555\" stroke-width=\"4\"/><line x1=\"1011.0\" y1=\"548\" x2=\"1043.0\" y2=\"548\" stroke=\"#444\" stroke-width=\"6\"/><circle cx=\"1105.0\" cy=\"548\" r=\"26\" fill=\"#b8bcc2\" stroke=\"#555\" stroke-width=\"4\"/><line x1=\"1089.0\" y1=\"548\" x2=\"1121.0\" y2=\"548\" stroke=\"#444\" stroke-width=\"6\"/><circle cx=\"1183.0\" cy=\"548\" r=\"26\" fill=\"#b8bcc2\" stroke=\"#555\" stroke-width=\"4\"/><line x1=\"1167.0\" y1=\"548\" x2=\"1199.0\" y2=\"548\" stroke=\"#444\" stroke-width=\"6\"/><circle cx=\"1261.0\" cy=\"548\" r=\"26\" fill=\"#b8bcc2\" stroke=\"#555\" stroke-width=\"4\"/><line x1=\"1245.0\" y1=\"548\" x2=\"1277.0\" y2=\"548\" stroke=\"#444\" stroke-width=\"6\"/><circle cx=\"1339.0\" cy=\"548\" r=\"26\" fill=\"#b8bcc2\" stroke=\"#555\" stroke-width=\"4\"/><line x1=\"1323.0\" y1=\"548\" x2=\"1355.0\" y2=\"548\" stroke=\"#444\" stroke-width=\"6\"/><circle cx=\"1417.0\" cy=\"548\" r=\"26\" fill=\"#b8bcc2\" stroke=\"#555\" stroke-width=\"4\"/><line x1=\"1401.0\" y1=\"548\" x2=\"1433.0\" y2=\"548\" stroke=\"#444\" stroke-width=\"6\"/><path d=\"M763.0 548 V610 Q763.0 640 733.0 640 H18 Q-12 640 -12 670 V1096\" stroke=\"#8a9097\" stroke-width=\"13\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M-12 1096 H1594 M110 1096 V1070 M322 1096 V1070 M534 1096 V1070 M746 1096 V1070 M958 1096 V1070 M1170 1096 V1070 M1382 1096 V1070 M1594 1096 V1070\" stroke=\"#8a9097\" stroke-width=\"13\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M763.0 548 V610 Q763.0 640 733.0 640 H18 Q-12 640 -12 670 V1096\" stroke=\"#ffffff\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M-12 1096 H1594 M110 1096 V1070 M322 1096 V1070 M534 1096 V1070 M746 1096 V1070 M958 1096 V1070 M1170 1096 V1070 M1382 1096 V1070 M1594 1096 V1070\" stroke=\"#ffffff\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"763.0\" cy=\"548\" r=\"9\" fill=\"#8a9097\"/><path d=\"M871.0 548 V640 C871.0 780 110 836 110 996\" stroke=\"#1784F7\" stroke-width=\"11\" fill=\"none\" stroke-linecap=\"round\"/><circle cx=\"871.0\" cy=\"548\" r=\"11\" fill=\"#1784F7\"/><path d=\"M949.0 548 V640 C949.0 780 322 836 322 996\" stroke=\"#1784F7\" stroke-width=\"11\" fill=\"none\" stroke-linecap=\"round\"/><circle cx=\"949.0\" cy=\"548\" r=\"11\" fill=\"#1784F7\"/><path d=\"M1027.0 548 V640 C1027.0 780 534 836 534 996\" stroke=\"#1784F7\" stroke-width=\"11\" fill=\"none\" stroke-linecap=\"round\"/><circle cx=\"1027.0\" cy=\"548\" r=\"11\" fill=\"#1784F7\"/><path d=\"M1105.0 548 V640 C1105.0 780 746 836 746 996\" stroke=\"#1784F7\" stroke-width=\"11\" fill=\"none\" stroke-linecap=\"round\"/><circle cx=\"1105.0\" cy=\"548\" r=\"11\" fill=\"#1784F7\"/><path d=\"M1183.0 548 V640 C1183.0 780 958 836 958 996\" stroke=\"#1784F7\" stroke-width=\"11\" fill=\"none\" stroke-linecap=\"round\"/><circle cx=\"1183.0\" cy=\"548\" r=\"11\" fill=\"#1784F7\"/><path d=\"M1261.0 548 V640 C1261.0 780 1170 836 1170 996\" stroke=\"#1784F7\" stroke-width=\"11\" fill=\"none\" stroke-linecap=\"round\"/><circle cx=\"1261.0\" cy=\"548\" r=\"11\" fill=\"#1784F7\"/><path d=\"M1339.0 548 V640 C1339.0 780 1382 836 1382 996\" stroke=\"#1784F7\" stroke-width=\"11\" fill=\"none\" stroke-linecap=\"round\"/><circle cx=\"1339.0\" cy=\"548\" r=\"11\" fill=\"#1784F7\"/><path d=\"M1417.0 548 V640 C1417.0 780 1594 836 1594 996\" stroke=\"#1784F7\" stroke-width=\"11\" fill=\"none\" stroke-linecap=\"round\"/><circle cx=\"1417.0\" cy=\"548\" r=\"11\" fill=\"#1784F7\"/><rect x=\"-38\" y=\"844.0\" width=\"52\" height=\"48\" rx=\"10\" fill=\"#fff\" stroke=\"#8a9097\" stroke-width=\"3\"/><text x=\"-12\" y=\"880.0\" text-anchor=\"middle\" font-size=\"32\" font-weight=\"700\" fill=\"#3f4448\">C</text><g transform=\"translate(0 10)\"><ellipse cx=\"110\" cy=\"1034\" rx=\"95\" ry=\"32\" fill=\"#6bbf5a\"/><ellipse cx=\"110\" cy=\"1024\" rx=\"86\" ry=\"22\" fill=\"#8fd67a\"/><path d=\"M50 1028 l-6 -16 M50 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M80 1028 l-6 -16 M80 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M140 1028 l-6 -16 M140 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M170 1028 l-6 -16 M170 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><rect x=\"102\" y=\"994\" width=\"16\" height=\"28\" rx=\"3\" fill=\"#333\"/><rect x=\"97\" y=\"986\" width=\"26\" height=\"10\" rx=\"3\" fill=\"#555\"/><g class=\"z z1\"><path d=\"M110 986 Q62.0 866 30 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M110 986 Q86.0 816 70 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M110 986 Q110.0 796 110 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M110 986 Q134.0 816 150 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M110 986 Q158.0 866 190 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><circle class=\"dr\" cx=\"35\" cy=\"960\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"65\" cy=\"880\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"155\" cy=\"885\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"185\" cy=\"955\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"110\" cy=\"820\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"92\" cy=\"920\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"130\" cy=\"915\" r=\"8\" fill=\"#1784F7\"/></g><ellipse cx=\"322\" cy=\"1034\" rx=\"95\" ry=\"32\" fill=\"#6bbf5a\"/><ellipse cx=\"322\" cy=\"1024\" rx=\"86\" ry=\"22\" fill=\"#8fd67a\"/><path d=\"M262 1028 l-6 -16 M262 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M292 1028 l-6 -16 M292 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M352 1028 l-6 -16 M352 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M382 1028 l-6 -16 M382 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><rect x=\"314\" y=\"994\" width=\"16\" height=\"28\" rx=\"3\" fill=\"#333\"/><rect x=\"309\" y=\"986\" width=\"26\" height=\"10\" rx=\"3\" fill=\"#555\"/><g class=\"z z2\"><path d=\"M322 986 Q274.0 866 242 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M322 986 Q298.0 816 282 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M322 986 Q322.0 796 322 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M322 986 Q346.0 816 362 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M322 986 Q370.0 866 402 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><circle class=\"dr\" cx=\"247\" cy=\"960\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"277\" cy=\"880\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"367\" cy=\"885\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"397\" cy=\"955\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"322\" cy=\"820\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"304\" cy=\"920\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"342\" cy=\"915\" r=\"8\" fill=\"#1784F7\"/></g><ellipse cx=\"534\" cy=\"1034\" rx=\"95\" ry=\"32\" fill=\"#6bbf5a\"/><ellipse cx=\"534\" cy=\"1024\" rx=\"86\" ry=\"22\" fill=\"#8fd67a\"/><path d=\"M474 1028 l-6 -16 M474 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M504 1028 l-6 -16 M504 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M564 1028 l-6 -16 M564 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M594 1028 l-6 -16 M594 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><rect x=\"526\" y=\"994\" width=\"16\" height=\"28\" rx=\"3\" fill=\"#333\"/><rect x=\"521\" y=\"986\" width=\"26\" height=\"10\" rx=\"3\" fill=\"#555\"/><g class=\"z z3\"><path d=\"M534 986 Q486.0 866 454 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M534 986 Q510.0 816 494 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M534 986 Q534.0 796 534 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M534 986 Q558.0 816 574 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M534 986 Q582.0 866 614 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><circle class=\"dr\" cx=\"459\" cy=\"960\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"489\" cy=\"880\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"579\" cy=\"885\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"609\" cy=\"955\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"534\" cy=\"820\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"516\" cy=\"920\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"554\" cy=\"915\" r=\"8\" fill=\"#1784F7\"/></g><ellipse cx=\"746\" cy=\"1034\" rx=\"95\" ry=\"32\" fill=\"#6bbf5a\"/><ellipse cx=\"746\" cy=\"1024\" rx=\"86\" ry=\"22\" fill=\"#8fd67a\"/><path d=\"M686 1028 l-6 -16 M686 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M716 1028 l-6 -16 M716 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M776 1028 l-6 -16 M776 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M806 1028 l-6 -16 M806 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><rect x=\"738\" y=\"994\" width=\"16\" height=\"28\" rx=\"3\" fill=\"#333\"/><rect x=\"733\" y=\"986\" width=\"26\" height=\"10\" rx=\"3\" fill=\"#555\"/><g class=\"z z4\"><path d=\"M746 986 Q698.0 866 666 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M746 986 Q722.0 816 706 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M746 986 Q746.0 796 746 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M746 986 Q770.0 816 786 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M746 986 Q794.0 866 826 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><circle class=\"dr\" cx=\"671\" cy=\"960\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"701\" cy=\"880\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"791\" cy=\"885\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"821\" cy=\"955\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"746\" cy=\"820\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"728\" cy=\"920\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"766\" cy=\"915\" r=\"8\" fill=\"#1784F7\"/></g><ellipse cx=\"958\" cy=\"1034\" rx=\"95\" ry=\"32\" fill=\"#6bbf5a\"/><ellipse cx=\"958\" cy=\"1024\" rx=\"86\" ry=\"22\" fill=\"#8fd67a\"/><path d=\"M898 1028 l-6 -16 M898 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M928 1028 l-6 -16 M928 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M988 1028 l-6 -16 M988 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M1018 1028 l-6 -16 M1018 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><rect x=\"950\" y=\"994\" width=\"16\" height=\"28\" rx=\"3\" fill=\"#333\"/><rect x=\"945\" y=\"986\" width=\"26\" height=\"10\" rx=\"3\" fill=\"#555\"/><g class=\"z z5\"><path d=\"M958 986 Q910.0 866 878 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M958 986 Q934.0 816 918 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M958 986 Q958.0 796 958 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M958 986 Q982.0 816 998 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M958 986 Q1006.0 866 1038 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><circle class=\"dr\" cx=\"883\" cy=\"960\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"913\" cy=\"880\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1003\" cy=\"885\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1033\" cy=\"955\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"958\" cy=\"820\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"940\" cy=\"920\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"978\" cy=\"915\" r=\"8\" fill=\"#1784F7\"/></g><ellipse cx=\"1170\" cy=\"1034\" rx=\"95\" ry=\"32\" fill=\"#6bbf5a\"/><ellipse cx=\"1170\" cy=\"1024\" rx=\"86\" ry=\"22\" fill=\"#8fd67a\"/><path d=\"M1110 1028 l-6 -16 M1110 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M1140 1028 l-6 -16 M1140 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M1200 1028 l-6 -16 M1200 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M1230 1028 l-6 -16 M1230 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><rect x=\"1162\" y=\"994\" width=\"16\" height=\"28\" rx=\"3\" fill=\"#333\"/><rect x=\"1157\" y=\"986\" width=\"26\" height=\"10\" rx=\"3\" fill=\"#555\"/><g class=\"z z6\"><path d=\"M1170 986 Q1122.0 866 1090 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M1170 986 Q1146.0 816 1130 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M1170 986 Q1170.0 796 1170 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M1170 986 Q1194.0 816 1210 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M1170 986 Q1218.0 866 1250 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><circle class=\"dr\" cx=\"1095\" cy=\"960\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1125\" cy=\"880\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1215\" cy=\"885\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1245\" cy=\"955\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1170\" cy=\"820\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1152\" cy=\"920\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1190\" cy=\"915\" r=\"8\" fill=\"#1784F7\"/></g><ellipse cx=\"1382\" cy=\"1034\" rx=\"95\" ry=\"32\" fill=\"#6bbf5a\"/><ellipse cx=\"1382\" cy=\"1024\" rx=\"86\" ry=\"22\" fill=\"#8fd67a\"/><path d=\"M1322 1028 l-6 -16 M1322 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M1352 1028 l-6 -16 M1352 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M1412 1028 l-6 -16 M1412 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M1442 1028 l-6 -16 M1442 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><rect x=\"1374\" y=\"994\" width=\"16\" height=\"28\" rx=\"3\" fill=\"#333\"/><rect x=\"1369\" y=\"986\" width=\"26\" height=\"10\" rx=\"3\" fill=\"#555\"/><g class=\"z z7\"><path d=\"M1382 986 Q1334.0 866 1302 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M1382 986 Q1358.0 816 1342 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M1382 986 Q1382.0 796 1382 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M1382 986 Q1406.0 816 1422 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M1382 986 Q1430.0 866 1462 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><circle class=\"dr\" cx=\"1307\" cy=\"960\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1337\" cy=\"880\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1427\" cy=\"885\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1457\" cy=\"955\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1382\" cy=\"820\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1364\" cy=\"920\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1402\" cy=\"915\" r=\"8\" fill=\"#1784F7\"/></g><ellipse cx=\"1594\" cy=\"1034\" rx=\"95\" ry=\"32\" fill=\"#6bbf5a\"/><ellipse cx=\"1594\" cy=\"1024\" rx=\"86\" ry=\"22\" fill=\"#8fd67a\"/><path d=\"M1534 1028 l-6 -16 M1534 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M1564 1028 l-6 -16 M1564 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M1624 1028 l-6 -16 M1624 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><path d=\"M1654 1028 l-6 -16 M1654 1028 l6 -14\" stroke=\"#4e9e42\" stroke-width=\"3\"/><rect x=\"1586\" y=\"994\" width=\"16\" height=\"28\" rx=\"3\" fill=\"#333\"/><rect x=\"1581\" y=\"986\" width=\"26\" height=\"10\" rx=\"3\" fill=\"#555\"/><g class=\"z z8\"><path d=\"M1594 986 Q1546.0 866 1514 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M1594 986 Q1570.0 816 1554 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M1594 986 Q1594.0 796 1594 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M1594 986 Q1618.0 816 1634 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><path d=\"M1594 986 Q1642.0 866 1674 1006\" stroke=\"#0FE3FA\" stroke-width=\"7\" fill=\"none\" stroke-linecap=\"round\" stroke-dasharray=\"4 14\"/><circle class=\"dr\" cx=\"1519\" cy=\"960\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1549\" cy=\"880\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1639\" cy=\"885\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1669\" cy=\"955\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1594\" cy=\"820\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1576\" cy=\"920\" r=\"8\" fill=\"#1784F7\"/><circle class=\"dr\" cx=\"1614\" cy=\"915\" r=\"8\" fill=\"#1784F7\"/></g></g><g transform=\"translate(0 44)\"><circle cx=\"110\" cy=\"1100\" r=\"26\" fill=\"#0f63c4\"/><text x=\"110\" y=\"1110\" text-anchor=\"middle\" font-size=\"30\" font-weight=\"700\" fill=\"#fff\">1</text><circle cx=\"322\" cy=\"1100\" r=\"26\" fill=\"#0f63c4\"/><text x=\"322\" y=\"1110\" text-anchor=\"middle\" font-size=\"30\" font-weight=\"700\" fill=\"#fff\">2</text><circle cx=\"534\" cy=\"1100\" r=\"26\" fill=\"#0f63c4\"/><text x=\"534\" y=\"1110\" text-anchor=\"middle\" font-size=\"30\" font-weight=\"700\" fill=\"#fff\">3</text><circle cx=\"746\" cy=\"1100\" r=\"26\" fill=\"#0f63c4\"/><text x=\"746\" y=\"1110\" text-anchor=\"middle\" font-size=\"30\" font-weight=\"700\" fill=\"#fff\">4</text><circle cx=\"958\" cy=\"1100\" r=\"26\" fill=\"#0f63c4\"/><text x=\"958\" y=\"1110\" text-anchor=\"middle\" font-size=\"30\" font-weight=\"700\" fill=\"#fff\">5</text><circle cx=\"1170\" cy=\"1100\" r=\"26\" fill=\"#0f63c4\"/><text x=\"1170\" y=\"1110\" text-anchor=\"middle\" font-size=\"30\" font-weight=\"700\" fill=\"#fff\">6</text><circle cx=\"1382\" cy=\"1100\" r=\"26\" fill=\"#0f63c4\"/><text x=\"1382\" y=\"1110\" text-anchor=\"middle\" font-size=\"30\" font-weight=\"700\" fill=\"#fff\">7</text><circle cx=\"1594\" cy=\"1100\" r=\"26\" fill=\"#0f63c4\"/><text x=\"1594\" y=\"1110\" text-anchor=\"middle\" font-size=\"30\" font-weight=\"700\" fill=\"#fff\">8</text></g></g></svg>";
  function L() { return (window.__hunterLang && window.__hunterLang.get()) || (/^pt/i.test(navigator.language || '') ? 'pt' : 'en'); }
  function t(pt, en) { return L() === 'pt' ? pt : en; }
  function root() { var a = document.querySelector('esp-app'); return a && a.shadowRoot; }
  var zoneOn = {}; // 1..8 -> bool (prefer "Running" feedback)

  function applyZones(wrap) {
    if (!wrap) return;
    for (var z = 1; z <= 8; z++) {
      var on = !!zoneOn[z];
      wrap.querySelectorAll('.z' + z).forEach(function (el) {
        if (on) el.classList.add('on'); else el.classList.remove('on');
      });
    }
    // LCD text: show first active zone, else idle
    var lcd = wrap.querySelectorAll('text.z');
    // LCD uses stacked ZONE N texts with class zN — already handled by .on opacity
  }

  function onState(d) {
    if (!d) return;
    var name = (d.name || d.id || '') + '';
    var m = /(?:^|[^a-z])zone[\s_-]*([1-8])(?:\s+running)?$/i.exec(name.replace(/_/g, ' ').trim())
         || /^Zone\s*([1-8])(?:\s+Running)?$/i.exec(name.trim())
         || /zone[_-]?([1-8])(?:[_-]running)?$/i.exec((d.id || '') + '');
    if (!m) return;
    var z = +m[1];
    var isRunningEntity = /running/i.test(name) || /running/i.test(d.id || '');
    var on = d.value === true || d.value === 'ON' || d.value === 'on' || d.state === 'ON' || d.state === 'on' || d.state === true;
    if (d.state === 'OFF' || d.state === 'off' || d.value === false) on = false;
    // Prefer Running binary_sensor when present; switch state fills gaps
    if (isRunningEntity || zoneOn[z] === undefined || isRunningEntity) {
      zoneOn[z] = on;
    } else if (!isRunningEntity) {
      // only set from switch if we have no running info yet kept; still update switch as fallback
      zoneOn[z] = on;
    }
    var wrap = root() && root().getElementById('hunter-wiring');
    applyZones(wrap);
  }

  function inject() {
    var sr = root();
    if (!sr) return false;
    if (sr.getElementById('hunter-wiring')) return true;
    var main = sr.querySelector('esp-entity-table') || sr.querySelector('.content') || sr.firstChild;
    var wrap = document.createElement('details');
    wrap.id = 'hunter-wiring';
    wrap.open = true;
    wrap.style.cssText = 'margin:12px 16px;border:1px solid #c9ccd1;border-radius:10px;background:#fff;overflow:hidden';
    var sum = document.createElement('summary');
    sum.id = 'hunter-wiring-sum';
    sum.textContent = t('Ligações', 'Wiring');
    sum.style.cssText = 'cursor:pointer;font-weight:700;padding:10px 14px;user-select:none';
    var body = document.createElement('div');
    body.style.cssText = 'padding:0 8px 8px;background:#fff';
    body.innerHTML = SVG;
    var svgEl = body.querySelector('svg');
    if (svgEl) {
      svgEl.removeAttribute('width'); svgEl.removeAttribute('height');
      svgEl.style.width = '100%'; svgEl.style.height = 'auto'; svgEl.style.display = 'block';
      // Live mode: kill sequential demo animation; .on shows the active zone
      var st = document.createElementNS('http://www.w3.org/2000/svg', 'style');
      st.textContent = '.z{opacity:0;animation:none!important}.z.on{opacity:1}.z.on .dr,.dr.on{animation:fl .5s infinite alternate}';
      svgEl.insertBefore(st, svgEl.firstChild);
    }
    wrap.appendChild(sum); wrap.appendChild(body);
    var langBtn = sr.getElementById('hunter-lang');
    if (langBtn && langBtn.parentNode) langBtn.parentNode.insertBefore(wrap, langBtn.nextSibling);
    else if (main && main.parentNode) main.parentNode.insertBefore(wrap, main);
    else sr.appendChild(wrap);
    applyZones(wrap);
    if (window.__hunterLang) {
      var prev = window.__hunterOnLang;
      window.__hunterOnLang = function (l) {
        if (prev) prev(l);
        var s = document.getElementById ? null : null;
        var sum2 = (root() && root().getElementById('hunter-wiring-sum'));
        if (sum2) sum2.textContent = t('Ligações', 'Wiring');
      };
    }
    try {
      var es = new EventSource('/events');
      es.addEventListener('state', function (e) {
        try { onState(JSON.parse(e.data)); } catch (err) {}
      });
      es.addEventListener('ping', function () {});
    } catch (err) {}
    return true;
  }
  if (!inject()) {
    var n = 0, timer = setInterval(function () { if (inject() || ++n > 60) clearInterval(timer); }, 250);
  }
})();
