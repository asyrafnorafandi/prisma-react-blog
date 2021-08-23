import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../utils';
import { postsWithAuthor, PostsWithAuthor } from '../interfaces/post.interface';

export class PostController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prismaClient;
  }

  /**
   * Get all public posts
   */
  get(): Promise<PostsWithAuthor[]> {
    return this.prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      ...postsWithAuthor,
    });
  }
}
