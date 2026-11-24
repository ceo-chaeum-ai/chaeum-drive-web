# 드라이브 웹 바탕 파일 바꿔 끼우기

OpenCloud Web 이 테마를 싣기 전에 내보내는 파일 넷에 OpenCloud 이름·그림이 들어 있다. 테마(theme.json·chaeum.css)로는 바꿀 수 없어 서버 앞(nginx)에서 바꿔 끼운다. 반영은 aidev-main 몫이다.

| 주소 | 원래 | 바꿀 것 |
|---|---|---|
| `/` 의 index.html `<title>OpenCloud</title>` | 불러오는 동안 탭 제목이 OpenCloud | `sub_filter '<title>OpenCloud</title>' '<title>채움드라이브</title>';` |
| `/img/favicon.svg` | 불러오는 동안 탭 그림이 OpenCloud 문양 | `favicon.svg`(채움드라이브 D 그림) |
| `/manifest.json` | 휴대폰 「홈 화면에 추가」 이름이 OpenCloud | `manifest.json`(이름 채움드라이브) |
| `/img/opencloud-icon.png` | 홈 화면 그림이 OpenCloud 문양 | `icon-512.png` |
| `/` 의 index.html `<head>` | 휴대폰 폭에서도 바둑판 보기라 폴더 하나가 화면 1/3 | 위 title 바꾸기의 뒤 글을 `'<title>채움드라이브</title><script src="/themes/chaeum/mobile-view.js"></script>'` 로. 앱이 보기 방식을 읽기 전에 돌아야 해서 config 의 scripts 로는 늦다(11-25) |

그림은 채움드라이브 PC 앱의 아이콘과 같은 파일이다(ceo-chaeum-ai/desktop `src/resources/theme/`).
