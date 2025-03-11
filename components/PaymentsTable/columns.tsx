'use client';
import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Dispatch, SetStateAction } from 'react';
import { SortBtn } from './SortBtn';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed';

export type Payment = {
  id: string;
  amount: number;
  status: PaymentStatus;
  email: string;
};

type Props = {
  selectedRows: string[];
  setSelectedRows: Dispatch<SetStateAction<string[]>>;
  totalRecords: number;
  filteredPaymentsIdsProm: Promise<string[]>;
};

export function getColumnModel({
  selectedRows,
  setSelectedRows,
  totalRecords,
  filteredPaymentsIdsProm,
}: Props): ColumnDef<Payment>[] {
  return [
    {
      id: 'select',
      header: () => (
        <Checkbox
          checked={
            selectedRows.length === totalRecords ||
            (!!selectedRows.length && 'indeterminate')
          }
          onCheckedChange={async () => {
            if (selectedRows.length === totalRecords) {
              setSelectedRows([]);
            } else if (selectedRows.length) {
              setSelectedRows([]);
            } else {
              const filteredPaymentsIds = await filteredPaymentsIdsProm;

              setSelectedRows(filteredPaymentsIds);
            }
          }}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedRows.includes(row.original.id)}
          onCheckedChange={() => {
            console.log('🚀 ~ selectedRows:', selectedRows, row.original.id);
            setSelectedRows((st) =>
              st.includes(row.original.id)
                ? st.filter((item) => item !== row.original.id)
                : st.concat(row.original.id)
            );
          }}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'email',
      header: (/* { column } */) => {
        return (
          // <Button
          //   variant='ghost'
          //   className='pl-0'
          //   onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          // >
          //   Email
          //   <ArrowUpDown className='ml-2 h-4 w-4' />
          // </Button>
          <SortBtn name='Email' />
        );
      },
    },
    {
      accessorKey: 'amount',
      // header: () => <div className="text-right">Amount</div>,
      header: () => {
        return (
          <div className='text-right'>
            {/* <Button
              variant='ghost'
              className='ml-auto pr-0'
              onClick={() => console.log('sort by amount')}
            >
              Amount
              <ArrowUpDown className=' h-4 w-4' />
            </Button> */}
            <SortBtn name='Amount' />
          </div>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('amount'));
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount);

        return <div className='text-right font-medium'>{formatted}</div>;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

export type DataTableFilterableColumn<Payment> = {
  id: keyof Payment;
  title: string;
  options: {
    label: PaymentStatus;
    value: PaymentStatus;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
};

export function filterableColumns(): DataTableFilterableColumn<Payment>[] {
  const statuses: PaymentStatus[] = [
    'pending',
    'processing',
    'success',
    'failed',
  ];
  return [
    {
      id: 'status',
      title: 'Статус',
      options: statuses.map((status) => {
        return {
          label: status,
          value: status,
        };
      }),
    },
  ];
}
