import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import faker from 'faker';

const prisma = new PrismaClient();

async function main() {
  // Set faker seed for consistency
  faker.seed(1234567890);

  console.log(faker.internet.email());
  console.log(faker.internet.email());

  // const alice = await prisma.user.upsert({
  //   where: { email: faker.internet.email() },
  //   update: {},
  //   create: {
  //     email: faker.,
  //     name: 'Alice',
  //     password: bcrypt.hashSync('password', 10),
  //     posts: {
  //       create: {
  //         title: 'Check out Prisma with Next.js',
  //         content: 'https://www.prisma.io/nextjs',
  //         published: true,
  //       },
  //     },
  //   },
  // });

  // const bob = await prisma.user.upsert({
  //   where: { email: 'bob@gmail.com' },
  //   update: {},
  //   create: {
  //     email: 'bob@gmail.com',
  //     name: 'Bob',
  //     password: 'lol',
  //     posts: {
  //       create: [
  //         {
  //           title: 'Follow Prisma on Twitter',
  //           content: 'https://twitter.com/prisma',
  //           published: true,
  //         },
  //         {
  //           title: 'Follow Nexus on Twitter',
  //           content: 'https://twitter.com/nexusgql',
  //           published: true,
  //         },
  //       ],
  //     },
  //   },
  // });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
