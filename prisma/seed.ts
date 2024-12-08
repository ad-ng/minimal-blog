import { PrismaClient } from "@prisma/client"
import { faker } from '@faker-js/faker';

const prisma =  new PrismaClient
async function main() {
    console.log("seeding !")
    // creating users
    for(let i=0; i<11; i++){
        await prisma.user.create({
            data: {
                email: faker.internet.email(),
                password: 'test@123',
                names: faker.person.fullName(),
                phoneNumber: faker.phone.number()
            }
        })
    }
    console.log('users created')
    
    // creating categories
    for (let index = 0; index < 6; index++) {
        await prisma.category.create({
            data: {
                name: faker.color.human()
            }
        })
    }
    console.log('categories created')

    // creating blogs
    for (let index = 0; index < 21; index++) {
        await prisma.blog.create({
            data: {
                title: faker.food.vegetable(),
                description: faker.food.description(),
                userId: faker.number.int({ min: 1, max:10 }),
                categoryId: faker.number.int({ min: 1, max: 5 })
            }
        })
    }
    console.log('blogs created')
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });