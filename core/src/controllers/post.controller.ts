import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../utils';
import { postsWithAuthor, PostsWithAuthor } from '../interfaces/post.interface';

export class PostController {
  private prisma: PrismaClient;

  constructor(pc?: PrismaClient) {
    this.prisma = pc || prismaClient;
  }

  /**
   * List all public posts
   */
  list(): Promise<PostsWithAuthor[]> {
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

  /**
   * Get data of specific public blog post
   */
  async get(id: string): Promise<PostsWithAuthor> {
    const post = await this.prisma.post.findFirst({
      where: {
        id,
        published: true,
      },
      ...postsWithAuthor,
    });

    if (!post) {
      throw new Error('Blog post not found.');
    }

    return post;
  }
}
