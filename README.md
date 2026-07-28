# 바라봄 — 아카이브

젠 스타일 정적 사이트 (Astro). mediaig + 네이버 '바라봄'을 한 타임라인으로 남기는 집.

## 손으로 돌려보기
```bash
npm install
npm run dev      # http://localhost:4321
```

## 글 쓰는 법
`src/content/posts/` 에 마크다운 파일 하나 = 글 하나.
머리말(frontmatter)에 title·date·place·summary를 적고, 영상은 videos에 id만.
`src/content/posts/0-example.md` 를 복사해 시작하세요. (다 되면 예시 파일은 삭제.)

## Cloudflare Pages 배포
1. 이 폴더를 GitHub 저장소로 push.
2. Cloudflare Pages → Create → 저장소 연결.
3. 빌드 설정 — Framework: Astro / Build command: `npm run build` / Output: `dist`
4. 배포 후 도메인 연결. astro.config.mjs 의 site 값을 실제 도메인으로 바꾸기.
