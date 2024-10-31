"use server";
import { rowsPerPage } from "@/constants/paymentstableconsts";
import { searchParamsSchema, statusSchema } from "@/lib/searchParamsSchema";
import prisma from "@/prisma/db";
import { Payment } from "@prisma/client";

export async function getAllPayments() {
  const res = await prisma.payment.findMany();
  console.log("🚀 ~ getAllPaymentsAction");
  return res;
}

type ResponsePaymentsWithParams = {
  payments: Payment[];
  totalRecords: number;
};

export async function getPaymentsWithParams(searchParams?: {
  [key: string]: string | string[] | undefined;
}): Promise<ResponsePaymentsWithParams> {
  const { page, email, status, sort } = searchParamsSchema.parse(searchParams);
  console.log("🚀 ~ status:", status);

  const statuses = statusSchema.parse(status?.split("."));
  console.log("🚀 ~ statuses:", statuses);

  const payments = await prisma.payment.findMany({
    where: {
      status: { in: statuses },
      email: { contains: email, mode: "insensitive" },
    },
    skip: (Number(page) - 1) * rowsPerPage || 0,
    take: rowsPerPage,
  });

  const totalRecords = await prisma.payment.count({
    where: {
      status: { in: statuses },
      email: { contains: email, mode: "insensitive" },
    },
  });

  console.log("🚀 ~ payments:", payments.length);
  return { payments, totalRecords };
}
