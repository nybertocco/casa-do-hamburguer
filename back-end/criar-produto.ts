import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const produto = await prisma.product.create({
    data: {
      name: "hhhhhhhhh",
      description:
        "ghhghgghhghg",
      img: "ghghghghghg",
      price: 14,
      category: "Porção",
    },
  });
  console.log(produto);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());