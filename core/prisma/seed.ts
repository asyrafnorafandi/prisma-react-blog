import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import faker from 'faker';

const prisma = new PrismaClient();

async function main() {
  // faker.seed(1234567890);
  const categories = [
    faker.company.bsNoun(),
    faker.company.bsNoun(),
    faker.company.bsNoun(),
    faker.company.bsNoun(),
    faker.company.bsNoun(),
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
          create: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, () => ({
            title: faker.company.catchPhrase(),
            content: faker.lorem.paragraphs(6, '<br /><br />'),
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
            createdAt: faker.date.between('2021-01-01', '2021-07-31'),
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
