// Learn CSS: small, dependency-free playgrounds. Every page reads without this file; it adds the controls.
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function bind(root, fn) { $$('input,select,textarea', root).forEach(function (el) { el.addEventListener('input', fn); }); fn(); }
  function out(el, text) { el.textContent = text; }
  function fit(parent, n, tag) {
    while (parent.children.length < n) { var i = document.createElement(tag || 'i'); i.textContent = parent.children.length + 1; parent.appendChild(i); }
    while (parent.children.length > n) parent.lastChild.remove();
  }

  // BOX MODEL: sliders drive custom properties on the figure; the sum is computed, not typed.
  var box = $('[data-lab=box]');
  if (box) {
    var fig = $('.bm', box), code = $('.out code', box), total = $('.total', box);
    bind(box, function () {
      var v = {};
      ['w', 'pd', 'bw', 'mg'].forEach(function (k) {
        var i = $('[name=' + k + ']', box); v[k] = +i.value; $('output[for=' + k + ']', box).textContent = i.value + 'px';
      });
      fig.style.setProperty('--w', v.w + 'px'); fig.style.setProperty('--pd', v.pd + 'px');
      fig.style.setProperty('--bw', v.bw + 'px'); fig.style.setProperty('--mg', v.mg + 'px');
      $('.ct', fig).textContent = v.w + ' px';
      out(code, '.box {\n  width: ' + v.w + 'px;\n  padding: ' + v.pd + 'px;\n  border: ' + v.bw + 'px solid;\n  margin: ' + v.mg + 'px;\n}');
      var tw = v.w + 2 * v.pd + 2 * v.bw, mw = tw + 2 * v.mg;
      out(total, 'Painted width = ' + v.w + ' + 2×' + v.pd + ' + 2×' + v.bw + ' = ' + tw + 'px. With margin: ' + mw + 'px.');
    });
  }

  // FLEXBOX
  var fx = $('[data-lab=flex]');
  if (fx) {
    var st = $('.fx', fx), cd = $('.out code', fx);
    bind(fx, function () {
      var d = $('[name=direction]', fx).value, j = $('[name=justify]', fx).value, a = $('[name=align]', fx).value,
        w = $('[name=wrap]', fx).checked, g = +$('[name=gap]', fx).value, n = +$('[name=count]', fx).value;
      $('output[for=gap]', fx).textContent = g + 'px'; $('output[for=count]', fx).textContent = n;
      Object.assign(st.style, { flexDirection: d, justifyContent: j, alignItems: a, flexWrap: w ? 'wrap' : 'nowrap', gap: g + 'px' });
      fit(st, n);
      var sm=$('#fsum'); if (sm) out(sm, d.replace('-', ' ') + ', ' + j + ', ' + a + ', ' + n + ' items, gap ' + g + 'px' + (w ? ', wrapping.' : '.'));
      out(cd, '.container {\n  display: flex;\n  flex-direction: ' + d + ';\n  justify-content: ' + j + ';\n  align-items: ' + a + ';\n  flex-wrap: ' + (w ? 'wrap' : 'nowrap') + ';\n  gap: ' + g + 'px;\n}');
    });
  }

  // GRID
  var gx = $('[data-lab=grid]');
  if (gx) {
    var gs = $('.gx', gx), gc = $('.out code', gx);
    bind(gx, function () {
      var c = +$('[name=cols]', gx).value, g = +$('[name=gap]', gx).value, t = $('[name=track]', gx).value, n = +$('[name=count]', gx).value;
      $('output[for=cols]', gx).textContent = c; $('output[for=gap]', gx).textContent = g + 'px'; $('output[for=count]', gx).textContent = n;
      var cols = t === 'fr' ? 'repeat(' + c + ', 1fr)' : t === 'minmax' ? 'repeat(auto-fit, minmax(6rem, 1fr))' : 'repeat(' + c + ', 4rem)';
      var cs = $('[name=cols]', gx); cs.disabled = t === 'minmax'; cs.title = t === 'minmax' ? 'Columns are chosen by the browser in this mode' : '';
      gs.style.gridTemplateColumns = cols; gs.style.gap = g + 'px';
      fit(gs, n);
      var sp = $('[name=span]', gx).checked; gs.classList.toggle('span', sp);
      var sm = $('#gsum'); if (sm) out(sm, c + ' columns, gap ' + g + 'px, ' + n + ' items' + (sp ? ', item 1 spans 2.' : '.'));
      out(gc, '.container {\n  display: grid;\n  grid-template-columns: ' + cols + ';\n  gap: ' + g + 'px;\n}' + (sp ? '\n\n.item:first-child {\n  grid-column: span 2;\n}' : ''));
    });
  }

  // SELECTORS: type a selector, see exactly which elements it matches.
  var sel = $('[data-lab=selector]');
  if (sel) {
    var input = $('input[type=text]', sel), dom = $('.dom', sel), msg = $('.result', sel);
    var run = function () {
      $$('.hit', dom).forEach(function (e) { e.classList.remove('hit'); });
      var q = input.value.trim();
      input.removeAttribute('aria-invalid');
      if (!q) { out(msg, 'Type a selector. Try  li  or  .done  or  li:nth-child(2)'); return; }
      try {
        var m = $$(q, dom); m.forEach(function (e) { e.classList.add('hit'); });
        out(msg, q + ' matches ' + m.length + (m.length === 1 ? ' element.' : ' elements.'));
      } catch (e) { input.setAttribute('aria-invalid', 'true'); out(msg, '"' + q + '" is not a valid selector yet.'); }
    };
    input.addEventListener('input', run);
    $$('[data-try]', sel).forEach(function (b) { b.addEventListener('click', function () { input.value = b.getAttribute('data-try'); run(); input.focus(); }); });
    run();
  }

  // SANDBOX: CSS in, a sandboxed frame out. The frame cannot reach this page.
  $$('[data-lab=sandbox]').forEach(function (lab) {
    var ta = $('textarea', lab), fr = $('iframe', lab), tpl = $('template', lab), start = ta.value;
    var draw = function () {
      fr.srcdoc = '<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><style>body{margin:1rem;font:16px/1.5 system-ui,sans-serif;color:#14213d}</style><style>' + ta.value.replace(/<\/style/gi, '') + '</style>' + tpl.innerHTML;
    };
    ta.addEventListener('input', draw);
    var r = $('[data-reset]', lab); if (r) r.addEventListener('click', function () { ta.value = start; draw(); });
    draw();
  });
})();
