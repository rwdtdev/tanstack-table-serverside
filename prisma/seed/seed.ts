import { PrismaClient } from "@prisma/client";
import { payments } from "./tabledata";
const prisma = new PrismaClient();
async function main() {
  const res = await prisma.payment.createMany({
    data: payments,
  });

  console.log({ res });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
