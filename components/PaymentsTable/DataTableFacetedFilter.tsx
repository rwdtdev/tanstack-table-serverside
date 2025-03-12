'use client';
import { CheckIcon } from '@radix-ui/react-icons';
import { type Column } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Filter } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createSearchParams } from '@/lib/createSearchParams';

interface DataTableFacetedFilter<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  variant?: 'popover' | 'command';
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  variant = 'popover',
}: DataTableFacetedFilter<TData, TValue>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <>
      {variant === 'popover' ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline' className='h-9 border-dashed mr-2'>
              <Filter size={15} className='mr-2' />
              {title}
              {selectedValues?.size > 0 && (
                <>
                  <Separator orientation='vertical' className='mx-2 h-4' />
                  <Badge
                    variant='secondary'
                    className='rounded-sm px-1 font-normal lg:hidden'
                  >
                    {selectedValues.size}
                  </Badge>
                  <div className='hidden space-x-1 lg:flex'>
                    {selectedValues.size > 2 ? (
                      <Badge
                        variant='secondary'
                        className='rounded-sm px-1 font-normal'
                      >
                        Выбрано {selectedValues.size}
                      </Badge>
                    ) : (
                      options
                        .filter((option) => selectedValues.has(option.value))
                        .map((option) => (
                          <Badge
                            variant='secondary'
                            key={option.value}
                            className='rounded-sm px-1 font-normal'
                          >
                            {option.label}
                          </Badge>
                        ))
                    )}
                  </div>
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0' align='start'>
            <Command>
              <CommandInput placeholder={title} />
              <CommandList>
                <CommandEmpty>Нет результатов.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = selectedValues.has(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => {
                          if (isSelected) {
                            selectedValues.delete(option.value);
                          } else {
                            selectedValues.add(option.value);
                          }
                          const filterValues = Array.from(selectedValues);

                          const modSearchParams = createSearchParams(
                            { status: filterValues.join('.'), page: 0 },
                            searchParams
                          );

                          column?.setFilterValue(
                            filterValues.length ? filterValues : undefined
                          );
                          router.push(pathname + '?' + modSearchParams);
                        }}
                      >
                        <div
                          className={cn(
                            'mr-2 flex size-4 items-center justify-center rounded-sm border border-primary',
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'opacity-50 [&_svg]:invisible'
                          )}
                        >
                          <CheckIcon
                            className={cn('size-4')}
                            aria-hidden='true'
                          />
                        </div>
                        {option.icon && (
                          <option.icon
                            className='mr-2 size-4 text-muted-foreground'
                            aria-hidden='true'
                          />
                        )}
                        <span>{option.label}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                {selectedValues.size > 0 && (
                  <>
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => {
                          column?.setFilterValue(undefined);
                          const modSearchParams = createSearchParams(
                            { status: null, page: 0 },
                            searchParams
                          );

                          router.push(pathname + '?' + modSearchParams);
                        }}
                        className='justify-center text-center'
                      >
                        Очистить фильтры
                      </CommandItem>
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      ) : (
        <Command className='p-1'>
          <CommandInput
            placeholder={title}
            autoFocus
            className='flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
          />
          <CommandList className='mt-1'>
            <CommandEmpty>Нет результатов.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex size-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className={cn('size-4')} aria-hidden='true' />
                    </div>
                    {option.icon && (
                      <option.icon
                        className='mr-2 size-4 text-muted-foreground'
                        aria-hidden='true'
                      />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className='justify-center text-center'
                  >
                    Очистить фильтры
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      )}
    </>
  );
}
