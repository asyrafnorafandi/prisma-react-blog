import { AuthSeed } from '../seeds';
import { DbMigrate } from '../utils';
import { AuthController } from '../../src/controllers';
import { PrismaClient } from '@prisma/client';

describe('AuthController', () => {
  const testSchemaName = 'auth-tests';
  const prismaClient = new PrismaClient({
    datasources: {
      db: {
        url: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?schema=${testSchemaName}`,
      },
    },
  });
  const authController: AuthController = new AuthController(prismaClient);

  beforeAll(async () => {
    // sync data
    await DbMigrate(testSchemaName);
    // load test data
    await AuthSeed(testSchemaName);
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  describe('login()', () => {
    it('should check for required params', async () => {
      await expect(authController.login({ email: null, password: null })).rejects.toThrow('Email & password required.');
    });

    it('should validate for email/password', async () => {
      await expect(authController.login({ email: 'ben@gmail.com', password: 'wrong' })).rejects.toThrow(
        'Invalid email/password.',
      );
    });

    it('should return accessToken upon correct credentials', async () => {
      const data = await authController.login({ email: 'ben@gmail.com', password: 'ben' });
      expect(data).toHaveProperty('accessToken');
    });
  });
});
