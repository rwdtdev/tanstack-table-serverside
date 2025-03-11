'use client';
import { ResponsePaymentsWithParams } from '@/components/PaymentsTable/paymentsActions';
import { DataTable } from './DataTable';
import { getColumnModel } from './columns';
import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Payment } from '@prisma/client';

type Props = {
  paymentServerResp: ResponsePaymentsWithParams;
  filteredPaymentsIdsProm: Promise<string[]>;
};
export function PaymentTable({
  paymentServerResp,
  filteredPaymentsIdsProm,
}: Props) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { totalRecords } = paymentServerResp;
  const columns = useMemo<ColumnDef<Payment, unknown>[]>(
    () =>
      getColumnModel({
        selectedRows,
        setSelectedRows,
        totalRecords,
        filteredPaymentsIdsProm,
      }),
    [selectedRows, setSelectedRows, filteredPaymentsIdsProm]
  );

  return (
    <DataTable
      columns={columns}
      paymentServerResp={paymentServerResp}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
    />
  );
}
