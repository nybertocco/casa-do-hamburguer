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
      userId: "ce0ca497-7cdd-4631-ac1d-727277ae8601",
    },
  });
  console.log(item);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());