// 휴대폰 폭에서 처음 열 때 파일 목록을 바둑판 대신 목록 보기로 연다.
// OpenCloud Web 은 기본이 바둑판(resource-tiles)이라 390px 폭에서는 폴더 하나가 화면 1/3 을 차지한다.
// 보기 방식은 localStorage 「oc-options_view-mode」 에 남는다. 앱이 이 값을 읽기 전에 돌아야 하므로
// config 의 scripts(앱이 뜬 뒤 실림)가 아니라 index.html <head> 에 nginx sub_filter 로 끼운다(core/README.md).
// 한 번만 정한다. 그 뒤 사람이 바둑판으로 바꾸면 그대로 둔다.
(function () {
  try {
    var KEY = 'oc-options_view-mode';
    var DONE = 'chaeum-mobile-view-set';
    if (!window.matchMedia('(max-width: 640px)').matches || localStorage.getItem(DONE)) return;
    if (!localStorage.getItem(KEY)) localStorage.setItem(KEY, 'resource-table');
    localStorage.setItem(DONE, '1');
  } catch (e) {}
})();
