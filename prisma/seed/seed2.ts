import { Payment, PaymentStatus, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

async function main() {
  await prisma.payment.deleteMany({}); // use with caution.

  const amountOfPayments = 5050;

  const payments: Payment[] = [];

  for (let i = 0; i < amountOfPayments; i++) {
    const payment: Payment = {
      id: nanoid(),
      email: faker.internet.email(),
      amount: Number(faker.finance.amount()),
      status: faker.helpers.enumValue(PaymentStatus),
    };

    payments.push(payment);
  }

  const addUsers = async () =>
    await prisma.payment.createMany({ data: payments });

  addUsers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
