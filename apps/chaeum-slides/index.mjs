// 채움슬라이드로 열기: 드라이브 웹(OpenCloud Web) 확장.
// .html 파일의 오른쪽 클릭 메뉴(와 자세히 창의 동작)에 「채움슬라이드로 열기」를 넣고, 누르면 채움슬라이드 편집기를 새 탭으로 연다.
//   여는 주소: <지금 출처>/slides/edit.html?file=<스페이스 안 경로>(&space=<스페이스 id>, 내 파일이 아닐 때만)
//   편집기 주소는 manifest.json 의 config.editorUrl 로 바꿀 수 있다(기본은 지금 출처의 /slides/edit.html).
// 웹은 바깥 앱을 module federation 원격 입구(.mjs)로만 싣는다. 빌드 도구 없이 쓰려고 입구(init·get)를 손으로 썼다.
// 웹이 넘기는 공유 모듈은 쓰지 않는다(vue 판이 바뀌어도 이 파일은 그대로 돈다).

const LABEL = "채움슬라이드로 열기";

function isDeck(resource) {
  if (!resource || resource.isFolder || resource.type === "folder") return false;
  const ext = String(resource.extension || String(resource.name || "").split(".").pop() || "").toLowerCase();
  return ext === "html" || ext === "htm";
}

// 스페이스 안 경로와 스페이스 id. 내 파일이면 space 를 비운다(편집기가 내 파일함으로 연다).
function locate(resource, space) {
  let id = space && space.id;
  let path = resource.path;
  if (!id || !path) {
    // 찾기 결과처럼 space 가 안 넘어올 때: webDavPath = /spaces/<id>/<경로>
    const m = /^\/spaces\/([^/]+)(\/.*)$/.exec(resource.webDavPath || "");
    if (m) { id = id || decodeURIComponent(m[1]); path = path || decodeURIComponent(m[2]); }
  }
  if (!path) return null;
  const personal = space ? space.driveType === "personal" : false;
  return { path: path.replace(/^\/+/, ""), space: personal ? "" : (id || "") };
}

function editorHref(config, resource, space) {
  const at = locate(resource, space);
  if (!at) return null;
  const base = (config && config.editorUrl) || (location.origin + "/slides/edit.html");
  const u = new URL(base, location.href);
  u.searchParams.set("file", at.path);
  if (at.space) u.searchParams.set("space", at.space);
  return u.href;
}

function makeApp() {
  return {
    setup({ applicationConfig } = {}) {
      const action = {
        name: "chaeum-slides-open",
        id: "chaeum-slides-open",
        icon: "presentation",
        category: "secondary",
        label: () => LABEL,
        isVisible: ({ resources } = {}) => Array.isArray(resources) && resources.length === 1 && isDeck(resources[0]),
        isDisabled: () => false,
        handler: ({ resources, space } = {}) => {
          const href = editorHref(applicationConfig, resources[0], space);
          if (href) window.open(href, "_blank", "noopener");
        },
        class: "oc-files-actions-chaeum-slides-trigger",
      };
      const ext = (id, point) => ({ id, type: "action", extensionPointIds: [point], action });
      return {
        appInfo: { name: "채움슬라이드", id: "chaeum-slides", icon: "presentation", isFileEditor: false },
        extensions: [
          ext("com.chaeumai.slides.open.context", "global.files.context-actions"),
          ext("com.chaeumai.slides.open.sidebar", "app.files.sidebar.actions"),
        ],
      };
    },
  };
}

// module federation 원격 입구
export function init() {}
export async function get() {
  return () => ({ default: makeApp() });
}

// 시험용(node 에서 주소 꼴만 본다)
export const _test = { isDeck, locate, editorHref };
