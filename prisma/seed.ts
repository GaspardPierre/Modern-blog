const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcrypt');
const prisma = new PrismaClient();
require('dotenv').config(); 

async function main() {
  const adminPassword = await hash('admin123', 10);
  const userPassword = await hash('user123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'ADMIN',
      image: 'https://picsum.photos/200', 
    },
  });

  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: 'Regular User',
      email: 'user@example.com',
      password: userPassword,
      role: 'USER',
      image: 'https://picsum.photos/201', 
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
