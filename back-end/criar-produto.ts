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
      name: "Vitamina de Morango",
      description:
        "Cremosa mistura de morangos frescos, leite gelado e um toque de baunilha, batida na hora para uma textura perfeita.",
      img: "vitamina-morango.png",
      price: 14,
      category: "Bebida",
    },
  });
  console.log(produto);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());