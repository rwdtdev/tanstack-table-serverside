import { columns } from "@/components/PaymentsTable/columns";
// import { payments } from "@/prisma/seed/tabledata";
import { getAllPayments, getPaymentsWithParams } from "./paymentactions";
import { DataTable } from "@/components/PaymentsTable/dataTable";

export default async function PaymentsPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  console.log("🚀 ~ searchParams:", searchParams);
  console.log("🚀 ~ params:", params);
  getAllPayments();
  const payments = await getPaymentsWithParams(searchParams);
  return (
    <>
      <h1>PaymentsPage</h1>
      <div className="p-10">
        <DataTable columns={columns} data={payments} />
      </div>
    </>
  );
}
