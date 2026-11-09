// ESPHOME_Hunter web_server v3 add-ons (the only js_include allowed):
//  1) project favicon (droplet+chip, same as static/favicon.svg) via data: URI so it works offline;
//  2) cap the debug log panel height (style injected into esp-log's shadowRoot).
(function () {
  var HREF = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNjAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImYiIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMyQkQ0N0QiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwQThGRDgiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgcng9IjEyOCIgZmlsbD0idXJsKCNmKSIvPjxwYXRoIGQ9Ik0zMDAgNzBMNDQ2LjUgMjc1LjVBMTgwIDE4MCAwIDEgMSAxNTMuNSAyNzUuNVoiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSIyMjUuMCIgeT0iMzMwLjAiIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiByeD0iMjIiIGZpbGw9InVybCgjZikiLz48cGF0aCBkPSJNMjIxLjAgMzYwSDE5MS4wTTM3OS4wIDM2MEg0MDkuME0yMjEuMCA0MDVIMTkxLjBNMzc5LjAgNDA1SDQwOS4wTTIyMS4wIDQ1MEgxOTEuME0zNzkuMCA0NTBINDA5LjAiIHN0cm9rZT0idXJsKCNmKSIgc3Ryb2tlLXdpZHRoPSIyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+';
  function apply() {
    var head = document.head || document.getElementsByTagName('head')[0];
    if (!head) return;
    var links = head.querySelectorAll('link[rel="icon"],link[rel="shortcut icon"]');
    if (!links.length) {
      var l = document.createElement('link');
      l.rel = 'icon';
      l.type = 'image/svg+xml';
      l.href = HREF;
      head.appendChild(l);
    } else {
      for (var i = 0; i < links.length; i++) {
        links[i].type = 'image/svg+xml';
        links[i].href = HREF;
      }
    }
  }
  if (document.head) apply();
  else document.addEventListener('DOMContentLoaded', apply);
})();

(function () {
  function root() {
    var a = document.querySelector('esp-app');
    return a && a.shadowRoot;
  }
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
  if (!fixLog()) {
    var n = 0, t = setInterval(function () {
      if (fixLog() || ++n > 40) clearInterval(t);
    }, 250);
  }
})();
