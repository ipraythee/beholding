import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// 따라 읽는 사람을 위한 구독 주소. 글을 새로 쓰면 자동으로 들어갑니다.
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const plainText = (body: string) =>
  body
    .replace(/<[^>]*>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^[#>\s]+/gm, '')
    .replace(/[*_]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('posts')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const items = posts
    .map((p) => {
      const link = new URL(`/posts/${p.id}/`, site).href;
      const text = plainText(p.body ?? '');
      const summary = p.data.summary ?? (text.length > 300 ? text.slice(0, 300).trim() + '…' : text);
      return `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${p.data.date.toUTCString()}</pubDate>
      <description>${esc(summary)}</description>
    </item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>바라봄</title>
    <link>${new URL('/', site).href}</link>
    <atom:link href="${new URL('/rss.xml', site).href}" rel="self" type="application/rss+xml" />
    <description>눈이 멀었다가 지금은 보게 되었다. 사진과 영상, 영적 여정과 이주민 곁의 기록 — 2012년부터 이어온 바라봄의 아카이브.</description>
    <language>ko</language>
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
