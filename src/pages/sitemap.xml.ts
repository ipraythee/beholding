import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// 검색엔진에 "여기 이런 글들이 있다" 고 알려주는 목록.
// 글을 새로 쓰면 자동으로 여기에 들어갑니다. 손볼 일 없습니다.
export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('posts')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const day = (d: Date) => d.toISOString().slice(0, 10);
  const entries = [
    { loc: new URL('/', site).href, lastmod: posts[0] ? day(posts[0].data.date) : undefined },
    ...posts.map((p) => ({
      loc: new URL(`/posts/${p.id}/`, site).href,
      lastmod: day(p.data.date),
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url><loc>${e.loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
