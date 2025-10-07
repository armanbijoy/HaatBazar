import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

const prisma = new PrismaClient();

async function main() {
  // Delete in safe order
  await prisma.verificationToken.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Seed products
  await prisma.product.createMany({ data: sampleData.products });

  // Seed users with required timestamps
  await prisma.user.createMany({
    data: sampleData.users.map((u) => ({
      ...u,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    skipDuplicates: true,
  });

  console.log("Data Seeded Successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
