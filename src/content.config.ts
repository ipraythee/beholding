import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 글 하나 = 마크다운 파일 하나. Obsidian에서 쓰던 그대로 옮겨오면 됩니다.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),          // 타임라인 정렬 기준
    place: z.string().optional(),   // 예: 북아현동 철거 농성장
    summary: z.string().optional(), // 목록에 비치는 한 줄
    source: z.enum(['mediaig', '바라봄', '']).optional(), // 출처 갈래
    // 사진은 제목 아래에 놓입니다. 파일은 src/assets/ 에 두고 경로만 적습니다.
    // caption 은 사진 밑 한 줄. 옛 글의 알맹이가 거기 있습니다.
    photos: z.array(z.object({
      src: image(),
      caption: z.string().optional(),
      alt: z.string().optional(),
    })).optional(),
    // 영상은 제목 아래에 놓입니다. 원본은 Vimeo·YouTube에 그대로 두고 임베드만.
    videos: z.array(z.object({
      provider: z.enum(['vimeo', 'youtube']),
      id: z.string(),
      caption: z.string().optional(),
    })).optional(),
  }),
});

export const collections = { posts };
