import { Prisma } from '@prisma/client';

export const postsWithAuthor = Prisma.validator<Prisma.PostArgs>()({
  select: {
    id: true,
    title: true,
    content: true,
    createdAt: true,
    updatedAt: true,
    author: {
      select: {
        id: true,
        name: true,
        profile: {
          select: {
            avatar: true,
          },
        },
      },
    },
  },
});

export type PostsWithAuthor = Prisma.PostGetPayload<typeof postsWithAuthor>;
