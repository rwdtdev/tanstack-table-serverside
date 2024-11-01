"use server";
import { rowsPerPage } from "@/constants/paymentstableconsts";
import { searchParamsSchema, statusSchema } from "@/lib/searchParamsSchema";
import prisma from "@/prisma/db";
import { Payment } from "@prisma/client";

export async function getAllPayments() {
  const res = await prisma.payment.findMany();
  return res;
}

export type ResponsePaymentsWithParams = {
  payments: Payment[];
  totalRecords: number;
};

export async function getPaymentsWithParams(searchParams?: {
  [key: string]: string | string[] | undefined;
}): Promise<ResponsePaymentsWithParams> {
  const { page, email, statuses, sort } = parseSearchParams(searchParams);

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

  return { payments, totalRecords };
}

export async function getFilteredPaymentsIds(searchParams?: {
  [key: string]: string | string[] | undefined;
}): Promise<string[]> {
  const { email, statuses } = parseSearchParams(searchParams);

  const allFilteredPaymentsIdObjs = await prisma.payment.findMany({
    where: {
      status: { in: statuses },
      email: { contains: email, mode: "insensitive" },
    },
    select: { id: true },
  });

  return allFilteredPaymentsIdObjs.map((item) => item.id);
}

function parseSearchParams(searchParams?: {
  [key: string]: string | string[] | undefined;
}) {
  const { page, email, status, sort } = searchParamsSchema.parse(searchParams);
  const statuses = statusSchema.parse(status?.split("."));
  return { page, email, statuses, sort };
}
