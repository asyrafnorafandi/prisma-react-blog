import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import moment from 'moment';

export default async (schemaName: string) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?schema=${schemaName}`,
      },
    },
  });

  // Load categories
  const categories = ['web services', 'design', 'backend'];
  await prisma.category.createMany({
    data: categories.map(name => ({
      name,
    })),
  });
  const categoriesId = (
    await prisma.category.findMany({
      select: { id: true },
    })
  ).map(d => d.id);

  // Load users
  await prisma.user.upsert({
    where: { email: 'jason@gmail.com' },
    update: {},
    create: {
      email: 'jason@gmail.com',
      password: bcrypt.hashSync(`jason`, 10),
      name: `jason`,
      profile: {
        create: {
          bio: `Engineer`,
          avatar: ``,
        },
      },
      posts: {
        create: [
          {
            title: 'Test Post 1',
            content: 'Test Content 1',
            published: true,
            categories: {
              create: {
                category: {
                  connect: {
                    id: categoriesId[0],
                  },
                },
              },
            },
            createdAt: moment('2021-08-01').toDate(),
          },
          {
            title: 'Test Post 2',
            content: 'Test Content 2',
            published: false,
            categories: {
              create: {
                category: {
                  connect: {
                    id: categoriesId[1],
                  },
                },
              },
            },
            createdAt: moment('2021-08-05').toDate(),
          },
        ],
      },
    },
  });
  await prisma.user.upsert({
    where: { email: 'isaac@gmail.com' },
    update: {},
    create: {
      email: 'isaac@gmail.com',
      password: bcrypt.hashSync(`isaac`, 10),
      name: `isaac`,
      profile: {
        create: {
          bio: `Engineer`,
          avatar: ``,
        },
      },
      posts: {
        create: [
          {
            title: 'Test Post 3',
            content: 'Test Content 3',
            published: true,
            categories: {
              create: {
                category: {
                  connect: {
                    id: categoriesId[0],
                  },
                },
              },
            },
            createdAt: moment('2021-08-10').toDate(),
          },
          {
            title: 'Test Post 4',
            content: 'Test Content 4',
            published: true,
            categories: {
              create: {
                category: {
                  connect: {
                    id: categoriesId[2],
                  },
                },
              },
            },
            createdAt: moment('2021-07-01').toDate(),
          },
        ],
      },
    },
  });

  return prisma.$disconnect();
};
