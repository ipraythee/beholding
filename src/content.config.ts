import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 글 하나 = 마크다운 파일 하나. Obsidian에서 쓰던 그대로 옮겨오면 됩니다.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),          // 타임라인 정렬 기준
    place: z.string().optional(),   // 예: 북아현동 철거 농성장
    summary: z.string().optional(), // 목록에 비치는 한 줄
    source: z.enum(['mediaig', '바라봄', '']).optional(), // 출처 갈래
    // 네이버 '바라봄'의 갈래를 그대로 적어둡니다. 예: "행앎 / 영적 여정"
    // 지금은 화면 어디에도 안 보입니다. 나중에 갈래로 보고 싶어질 때를 위해 남기는 것.
    category: z.string().optional(),
    // 사진은 본문에 ![설명](../../assets/mediaig/파일.jpg) 로 넣습니다.
    // 영상은 제목 아래에 놓입니다. 원본은 Vimeo·YouTube에 그대로 두고 임베드만.
    videos: z.array(z.object({
      provider: z.enum(['vimeo', 'youtube']),
      id: z.string(),
      caption: z.string().optional(),
    })).optional(),
  }),
});

export const collections = { posts };
