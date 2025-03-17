'use client';

import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createSearchParams } from '@/lib/createSearchParams';

export function SortBtn({ name }: { name: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <Button
      variant='ghost'
      className='ml-auto px-0 hover:bg-transparent'
      onClick={() => {
        let ascDesc = searchParams.get('sort');
        console.log('sort by ', ascDesc);
        if (ascDesc?.split('.')[1] === null) {
          ascDesc = 'asc';
        } else if (ascDesc?.split('.')[1] === 'asc') {
          ascDesc = 'desc';
        } else {
          ascDesc = 'asc';
        }
        const modSearchParams = createSearchParams(
          { sort: `${name.toLowerCase()}.${ascDesc}`, page: 0 },
          searchParams
        );
        router.push(pathname + '?' + modSearchParams);
      }}
    >
      {name}
      <ArrowUpDown className=' h-4 w-4' />
    </Button>
  );
}
