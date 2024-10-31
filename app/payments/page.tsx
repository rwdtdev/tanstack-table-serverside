import { columns } from "@/components/PaymentsTable/columns";
// import { payments } from "@/prisma/seed/tabledata";
import { getPaymentsWithParams } from "./paymentactions";
import { DataTable } from "@/components/PaymentsTable/DataTable";

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // console.log("🚀 ~ PaymentsPage:");
  const paymentServerResp = await getPaymentsWithParams(searchParams);
  return (
    <>
      <h1>PaymentsPage</h1>
      <div className="p-10">
        <DataTable columns={columns} paymentServerResp={paymentServerResp} />
      </div>
    </>
  );
}
