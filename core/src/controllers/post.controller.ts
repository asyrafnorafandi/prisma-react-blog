import { Post, PrismaClient } from '@prisma/client';
import { postsWithAuthor, PostsWithAuthor } from '../interfaces/post.interface';

export class PostController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Get all public posts
   */
  get(): Promise<PostsWithAuthor[]> {
    return this.prisma.post.findMany({
      where: {
        published: true,
      },
      ...postsWithAuthor,
    });
  }
}
