import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export default async (schemaName: string) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?schema=${schemaName}`,
      },
    },
  });

  // Load users
  await prisma.user.upsert({
    where: { email: 'ben@gmail.com' },
    update: {},
    create: {
      email: 'ben@gmail.com',
      password: bcrypt.hashSync(`ben`, 10),
      name: `ben`,
      profile: {
        create: {
          bio: `Engineer`,
          avatar: ``,
        },
      },
    },
  });

  return prisma.$disconnect();
};
