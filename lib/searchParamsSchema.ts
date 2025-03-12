import { PaymentStatus } from '@prisma/client';
import { z } from 'zod';

export const searchParamsSchema = z.object({
  page: z.string().optional(),
  sort: z
    .union([
      z.literal('amount.asc'),
      z.literal('amount.desc'),
      z.literal('email.asc'),
      z.literal('email.desc'),
    ])
    .optional(),
  email: z.string().optional(),
  status: z.string().optional(),
});

export const statusSchema = z.array(z.nativeEnum(PaymentStatus)).optional();
