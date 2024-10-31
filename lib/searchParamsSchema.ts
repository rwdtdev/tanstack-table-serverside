import { PaymentStatus } from "@prisma/client";
import { z } from "zod";

export const searchParamsSchema = z.object({
  page: z.string().optional(),
  sort: z.string().optional(),
  email: z.string().optional(),
  status: z.string().optional(),
});

export const statusSchema = z.array(z.nativeEnum(PaymentStatus)).optional();
