const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const slugify = require('slugify');

const prisma = new PrismaClient();

async function main() {
  // Créer un auteur
  const author = await prisma.author.create({
    data: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      name: faker.person.fullName(),
      age: faker.number.int({ min: 20, max: 80 }),
      bio: faker.lorem.paragraph(),
      website: faker.internet.url(),
      avatar: faker.image.avatar(),
    },
  });

  // Créer quelques tags
  const tags = await Promise.all(
    Array.from({ length: 5 }, async () => {
      const name = faker.word.noun();
      return prisma.tag.create({
        data: {
          name,
          slug: slugify(name, { lower: true }),
        },
      });
    })
  );

  // Créer des posts
  for (let i = 0; i < 10; i++) {
    const title = faker.lorem.sentence();
    const slug = slugify(title, { lower: true });
    const content = faker.lorem.paragraphs(5);
    const excerpt = content.split(' ').slice(0, 30).join(' ') + '...';

    await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        published: faker.datatype.boolean(),
        coverImage: faker.image.url(),
        author: {
          connect: { id: author.id },
        },
        tags: {
          connect: faker.helpers.arrayElements(tags, { min: 1, max: 3 }).map(tag => ({ id: tag.id })),
        },
      },
    });
  }

  console.log('Seed data inserted successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });