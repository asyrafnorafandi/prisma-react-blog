import { PostSeed } from '../seeds';
import { DbMigrate } from '../utils';
import { PostController } from '../../src/controllers';
import { PrismaClient } from '@prisma/client';

describe('PostController', () => {
  const testSchemaName = 'posts-tests';
  const prismaClient = new PrismaClient({
    datasources: {
      db: {
        url: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?schema=${testSchemaName}`,
      },
    },
  });
  const postController: PostController = new PostController(prismaClient);

  beforeAll(async () => {
    // sync data
    await DbMigrate(testSchemaName);
    // load test data
    await PostSeed(testSchemaName);
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  describe('list()', () => {
    it('should return all pusblished posts only', async () => {
      const data = await postController.list();
      expect(data.length).toStrictEqual(3);
    });

    it('should list published posts in desc order', async () => {
      const data = await postController.list();
      expect(data[0].title).toStrictEqual('Test Post 3');
    });
  });
});
