# 채움드라이브 웹 (Chaeum Drive Web)

채움드라이브 웹 화면은 OpenCloud Web(https://github.com/opencloud-eu/web, GNU Affero General Public License 3.0)을 바꾸지 않고 그대로 쓰고, 그 위에 설정으로 얹는 테마·한국어 번역·확장을 더한 것입니다. 이 저장소는 ChaeumAI Inc.가 더한 부분의 소스이며 AGPL-3.0으로 공개합니다(LICENSE).

The Chaeum Drive web interface runs the unmodified OpenCloud Web shipped with OpenCloud 7.5.0 (AGPL-3.0) and adds the theme, Korean translations and extension in this repository through the web configuration. Our additions are published here under the AGPL-3.0.

| 폴더 | 내용 |
|---|---|
| `themes/chaeum/` | 테마(theme.json, chaeum.css), 한국어 번역(ko.json, ko-apply.js), 로고, Pretendard 글꼴(SIL OFL 1.1, fonts/OFL.txt) |
| `apps/chaeum-slides/` | 파일 메뉴의 「채움슬라이드로 열기」 확장(external app, module federation remote entry) |
| `core/` | 웹 서버(nginx)가 바꿔 끼우는 파일: 탭 그림(favicon), 홈 화면 추가 아이콘·이름(manifest), 문서 제목. 방법은 core/README.md |
| `tools/` | ko.json 을 만드는 대본(build.py)과 번역 원본(ko/*.tsv, overrides.json) |

## 넣는 법

- 테마 폴더를 `WEB_ASSET_THEMES_PATH` 아래 `chaeum/` 로 두고 `WEB_UI_THEME_PATH=/themes/chaeum/theme.json` 을 준다.
- `WEB_UI_CONFIG_FILE` 의 config.json 에 `styles: [{"href": "themes/chaeum/chaeum.css"}]`, `customTranslations: [{"url": "<주소>/themes/chaeum/ko.json"}]`, `scripts: [{"src": "/themes/chaeum/ko-apply.js"}]` 를 더한다.
- 확장은 `WEB_ASSET_APPS_PATH` 아래 `chaeum-slides/` 로 둔다.

## 이름과 로고

「채움드라이브」, 「채움AI」 이름과 로고 그림(themes/chaeum/assets/, core/ 의 그림)은 ChaeumAI Inc.의 상표이며 위 라이선스가 상표 사용권을 주지는 않습니다. 이 저장소로 다른 서비스를 만들 때는 이름과 로고를 바꿔 주십시오. OpenCloud 는 OpenCloud GmbH 의 이름입니다.
