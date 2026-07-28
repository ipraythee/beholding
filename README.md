# 바라봄 — 아카이브

젠 스타일 정적 사이트 (Astro). mediaig + 네이버 '바라봄'을 한 타임라인으로 남기는 집.

## 손으로 돌려보기
```bash
npm install
npm run dev      # http://localhost:4321
```

## 글 쓰는 법
`src/content/posts/` 에 마크다운 파일 하나 = 글 하나.
파일 이름은 `2012-02-03-bichwojim.md` 처럼 날짜로 시작합니다. 그게 주소가 됩니다.
이미 있는 글 하나를 복사해 시작하는 게 가장 빠릅니다.

- 머리말(frontmatter): `title` · `date` 는 필수. `place` · `summary` · `source` 는 있으면 좋고.
- **사진**: 원본을 `src/assets/mediaig/` 에 날짜 이름으로 두고, 본문에
  `![설명](../../assets/mediaig/2012-02-03.jpg)` 로 불러옵니다. 크기는 CSS가 알아서 맞춥니다.
- **영상**: 머리말 `videos` 에 provider와 id만. 원본은 Vimeo·YouTube에 그대로 둡니다.

## Cloudflare Pages 배포
1. 이 폴더를 GitHub 저장소로 push.
2. Cloudflare Pages → Create → 저장소 연결.
3. 빌드 설정 — Framework: Astro / Build command: `npm run build` / Output: `dist`
4. 배포 후 도메인 연결. astro.config.mjs 의 site 값을 실제 도메인으로 바꾸기.
