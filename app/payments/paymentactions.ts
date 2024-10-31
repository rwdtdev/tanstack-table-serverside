"use server";

import { searchParamsSchema, statusSchema } from "@/lib/searchParamsSchema";
import prisma from "@/prisma/db";
import { Payment } from "@prisma/client";

export async function getAllPayments() {
  const res = await prisma.payment.findMany();
  console.log("🚀 ~ getAllPaymentsAction");
  return res;
}

export async function getPaymentsWithParams(searchParams?: {
  [key: string]: string | string[] | undefined;
}): Promise<Payment[]> {
  //   try {
  const { page, email, status, sort } = searchParamsSchema.parse(searchParams);
  console.log("🚀 ~ status:", status);

  const statuses = statusSchema.parse(status?.split("."));
  console.log("🚀 ~ statuses:", statuses);

  const res = await prisma.payment.findMany({
    where: { status: { in: statuses } },
  });
  console.log("🚀 ~ res:", res);
  return res;
  //   } catch (err) {
  //     console.error(err);
  //   }
}
