import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import faker from 'faker';

const prisma = new PrismaClient();

async function main() {
  // faker.seed(1234567890);
  const categories = [
    faker.hacker.ingverb(),
    faker.hacker.ingverb(),
    faker.hacker.ingverb(),
    faker.hacker.ingverb(),
    faker.hacker.ingverb(),
  ];

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

  const userCount = 10;
  for (let i = 0; i < userCount; i++) {
    const email = faker.internet.email();

    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        password: bcrypt.hashSync(`password-${i}`, 10),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        profile: {
          create: {
            bio: `${faker.name.jobDescriptor()}`,
            avatar: faker.internet.avatar(),
          },
        },
        posts: {
          create: Array.from({ length: faker.random.number({ min: 1, max: 10 }) }, () => ({
            title: faker.company.catchPhrase(),
            content: faker.lorem.paragraphs(3, '\\n\\n'),
            published: true,
            categories: {
              create: {
                category: {
                  connect: {
                    id: faker.random.arrayElement(categoriesId),
                  },
                },
              },
            },
            createdAt: faker.date.between('2021-01-01', '2021-12-31'),
          })),
        },
      },
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
