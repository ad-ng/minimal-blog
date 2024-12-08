import { PrismaClient } from "@prisma/client"

const prisma =  new PrismaClient
async function main() {
    console.log('seed !')
    await prisma.category.create({
        data: {
            name: 'seeding'
        }
    })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });