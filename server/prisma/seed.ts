// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await prisma.content.deleteMany();

  const content1 = await prisma.content.create({
    data: {
      title: 'Test 1',
      text: 'Test content 1',
      type: 'task',
      state: 'done'
    },
  });

  const content2 = await prisma.content.create({
    data: {
      title: 'Test 2',
      text: 'Test content 2',
      type: 'task',
      state: 'done'
    },
  });

  console.log({
    content1,
    content2,
  });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
