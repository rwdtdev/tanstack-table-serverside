import {
  getFilteredPaymentsIds,
  getPaymentsWithParams,
} from "../../components/PaymentsTable/paymentactions";
import { PaymentTable } from "@/components/PaymentsTable/PaymentTable";

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // console.log("🚀 ~ PaymentsPage:");
  const filteredPaymentsIdsProm = getFilteredPaymentsIds(searchParams);

  const paymentServerResp = await getPaymentsWithParams(searchParams);
  return (
    <div className="px-10 py-5">
      <h1>PaymentsPage</h1>
      <PaymentTable
        paymentServerResp={paymentServerResp}
        filteredPaymentsIdsProm={filteredPaymentsIdsProm}
      />
    </div>
  );
}
