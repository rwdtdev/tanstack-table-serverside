'use client';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTableFacetedFilter } from './DataTableFacetedFilter';
import { filterableColumns } from './columns';
import { DataTableTextFilter } from './DataTableTextFilter';
import { Pagination } from './Pagination';
import { rowsPerPage } from '@/constants/paymentstableconsts';
import { deletePayments } from './paymentsActions';
import { CSSTransition } from 'react-transition-group';
import './paymentsTable.css';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  paymentServerResp: {
    payments: TData[];
    totalRecords: number;
  };
  selectedRows: string[];
  setSelectedRows: Dispatch<SetStateAction<string[]>>;
}

export function DataTable<TData, TValue>({
  columns,
  paymentServerResp,
  selectedRows,
  setSelectedRows,
}: DataTableProps<TData, TValue>) {
  console.log('DataTable');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const refDelBtn = useRef<HTMLButtonElement | null>(null);
  const { payments, totalRecords } = paymentServerResp;
  const table = useReactTable({
    data: payments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // onSortingChange: setSorting,
    // getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    // onRowSelectionChange: setRowSelection,
    state: {
      // sorting,
      // columnFilters,
      columnVisibility,
      // rowSelection,
    },
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
  });

  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const filterableColumnsList = filterableColumns();

  return (
    <div>
      <div className='flex items-center py-4'>
        <DataTableTextFilter />
        {filterableColumnsList.length &&
          filterableColumnsList.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : '') && (
                <DataTableFacetedFilter
                  key={String(column.id)}
                  column={table.getColumn(column.id ? String(column.id) : '')}
                  title={column.title}
                  options={column.options}
                />
              )
          )}
        <div className='ml-auto space-x-2'>
          {/* <Button
            variant='destructive'
            className={twJoin(
              'ml-auto transition-opacity shadow-md',
              selectedRows?.length ? 'opacity-100' : 'opacity-0 cursor-default'
            )}
            onClick={() => {
              console.log(selectedRows);
              deletePayments(selectedRows);
              setSelectedRows([]);
            }}
          >
            Удалить
          </Button> */}

          <CSSTransition
            in={Boolean(selectedRows?.length)}
            nodeRef={refDelBtn}
            timeout={300}
            classNames='delete-row-btn'
            unmountOnExit
            onEnter={() => console.log('transition onEnter')}
            onExited={() => console.log('transition onExited')}
            on
          >
            <Button
              variant='destructive'
              className='shadow-md'
              ref={refDelBtn}
              onClick={() => {
                console.log(selectedRows);
                deletePayments(selectedRows);
                setSelectedRows([]);
              }}
            >
              Удалить
            </Button>
          </CSSTransition>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className=''>
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between space-x-2 py-4'>
        <div className='text-sm text-muted-foreground'>
          {selectedRows?.length || 0} of {totalRecords} row(s) selected.
        </div>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
