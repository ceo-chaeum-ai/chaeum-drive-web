// 채움 한국어(ko.json)를 앱별 번역 위에 다시 얹는다.
// OpenCloud Web 은 config.json 의 customTranslations 를 먼저 넣고, 그 뒤에 앱(파일·미리보기·검색 등)이 가진 번역을 덮어써서
// 앱에 이미 있는 문구는 우리 번역이 지워진다. 앱 번역은 로그인·언어 바꿀 때 다시 실리므로, 표지 문구 하나만 계속 보고 달라졌으면 다시 얹는다.
(function () {
  var base = (document.currentScript && document.currentScript.src) || '';
  var url = base.replace(/[^/]*$/, '') + 'ko.json';
  var ours = null;

  function gettext() {
    var el = document.getElementById('opencloud');
    var app = el && el.__vue_app__;
    return app && app.config.globalProperties.$language;
  }

  function apply() {
    var g = gettext();
    if (!ours || !g || !g.translations || !g.translations.ko) return;
    var cur = g.translations.ko;
    var probe = 'Deleted files';
    if (cur[probe] === ours[probe]) return;
    var ko = Object.assign({}, cur, ours);
    var next = Object.assign({}, g.translations);
    next.ko = ko;
    g.translations = next;
  }

  // AGPL-3.0 13조: 웹을 쓰는 사람이 우리 수정분 소스를 찾을 수 있게 왼쪽 아래(숨긴 판 줄 자리)에 링크를 단다.
  var SOURCE = 'https://github.com/ceo-chaeum-ai/chaeum-drive-web';
  function sourceLink() {
    var box = document.querySelector('#web-nav-sidebar div.pb-4.px-4.text-xs');
    if (!box || box.querySelector('a.chaeum-source')) return;
    var a = document.createElement('a');
    a.className = 'chaeum-source';
    a.href = SOURCE;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = '소스 코드';
    box.appendChild(a);
  }
  setInterval(sourceLink, 1000);

  // 앱 이름(Text Editor, PDF Viewer, Epub Reader 등)이 번역 전 글로 탭 제목과 화면 읽기 알림에 박혀 들어온다.
  // 우리 번역에 있으면 그것으로, 없으면 앱이 가진 한국어 번역으로 바꾼다. 딱 맞는 글 조각만 바꾼다(파일 이름은 그대로).
  function ko(s) {
    var v = ours && ours[s];
    if (typeof v !== 'string') {
      var g = gettext();
      v = g && g.translations && g.translations.ko && g.translations.ko[s];
    }
    return typeof v === 'string' && v !== s ? v : null;
  }
  // 탭 제목: 「… - Text Editor - 채움드라이브」 의 가운데 앱 이름
  function title() {
    var parts = document.title.split(' - ');
    if (parts.length < 3) return;
    var i = parts.length - 2, name = ko(parts[i]);
    if (name) { parts[i] = name; document.title = parts.join(' - '); }
  }
  // 화면 읽기 알림: 「회의록.pdf - PDF Viewer 화면」 의 끝 앱 이름
  var SCREEN = ' 화면';
  function announcer() {
    var els = document.querySelectorAll('.oc-hidden-announcer');
    for (var k = 0; k < els.length; k++) {
      var t = els[k].textContent || '';
      var tail = t.slice(-SCREEN.length) === SCREEN ? SCREEN : '';
      var parts = t.slice(0, t.length - tail.length).split(' - ');
      if (parts.length < 2) continue;
      var name = ko(parts[parts.length - 1]);
      if (name) { parts[parts.length - 1] = name; els[k].textContent = parts.join(' - ') + tail; }
    }
  }
  setInterval(function () { title(); announcer(); }, 500);

  fetch(url, { credentials: 'same-origin' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (j) {
      ours = j && j.ko;
      if (!ours) return;
      // 처음 20초는 50ms 마다 봐서 앱 번역이 실린 직후 바로 얹고(깜빡임 줄임), 그 뒤로는 1초마다 본다.
      apply();
      var fast = setInterval(apply, 50);
      setTimeout(function () { clearInterval(fast); setInterval(apply, 1000); }, 20000);
    })
    .catch(function () {});
})();
