import { columns } from "@/components/PaymentsTable/columns";
import { DataTable } from "@/components/PaymentsTable/dataTable";
import { payments } from "@/components/PaymentsTable/tabledata";

export default function PaymentsPage() {
  return (
    <>
      <h1>PaymentsPage</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={payments} />
      </div>
    </>
  );
}
