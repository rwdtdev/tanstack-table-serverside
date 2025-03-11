'use client';
import { Input } from '../ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import { CircleX } from 'lucide-react';

export function DataTableTextFilter() {
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState<string | null>(
    searchParams.get('email')
  );

  useDebounce(inputValue);

  return (
    <div className='relative w-full max-w-sm mr-3'>
      <Input
        placeholder='Filter emails...'
        value={inputValue || ''}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        className='max-w-sm mr-2 '
      />
      {inputValue && (
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-transparent'
          onClick={() => setInputValue('')}
        >
          <CircleX />
        </Button>
      )}
    </div>
  );
}
