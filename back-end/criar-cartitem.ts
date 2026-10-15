import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const item = await prisma.cartItem.create({
    data: {
      productId: "cmv5t0d030000h0u0wgrk5sjm",
      userId: "0796f40e-fcfc-4f50-961e-e6b67696b726",
    },
  });
  console.log(item);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());