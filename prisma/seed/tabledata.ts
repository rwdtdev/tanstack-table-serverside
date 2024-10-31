import { Payment } from "@prisma/client";

export const payments: Omit<Payment, "id">[] = [
  {
    // id: "489e1d41",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    // id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example-2@gmail.com",
  },
  {
    // id: "489e1d43",
    amount: 354,
    status: "processing",
    email: "example-3@gmail.com",
  },
  {
    // id: "489e1d44",
    amount: 275,
    status: "processing",
    email: "example-4@gmail.com",
  },
  {
    // id: "489e1d45",
    amount: 654,
    status: "pending",
    email: "example-5@gmail.com",
  },
  {
    // id: "489e1d46",
    amount: 123,
    status: "pending",
    email: "example-6@gmail.com",
  },
  {
    // id: "489e1d47",
    amount: 456,
    status: "processing",
    email: "example-7@gmail.com",
  },
  {
    // id: "489e1d48",
    amount: 987,
    status: "processing",
    email: "example-8@gmail.com",
  },
  {
    // id: "489e1d49",
    amount: 951,
    status: "pending",
    email: "example-9@gmail.com",
  },
  {
    // id: "489e1d50",
    amount: 665,
    status: "processing",
    email: "example-10@gmail.com",
  },
  {
    // id: "489e1d11",
    amount: 115,
    status: "processing",
    email: "example-11@gmail.com",
  },
  {
    // id: "489e1d12",
    amount: 665,
    status: "pending",
    email: "example-12@gmail.com",
  },
  {
    // id: "489e1d13",
    amount: 1235,
    status: "processing",
    email: "example-13@gmail.com",
  },
  {
    // id: "489e1d14",
    amount: 444,
    status: "success",
    email: "example-14@gmail.com",
  },
  {
    // id: "489e1d15",
    amount: 556,
    status: "failed",
    email: "example-15@gmail.com",
  },
];
