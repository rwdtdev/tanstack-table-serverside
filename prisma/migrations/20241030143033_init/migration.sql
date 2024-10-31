-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('processing', 'pending', 'success', 'errorr');

-- CreateTable
CREATE TABLE "Payments" (
    "id" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);
