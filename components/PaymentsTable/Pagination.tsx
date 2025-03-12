'use client';
import { createSearchParams } from '@/lib/createSearchParams';
import { Button } from '../ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import './paymentsTable.css';
import { twJoin } from 'tailwind-merge';

export function Pagination({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  return (
    <div className='space-x-2 flex-grow flex'>
      <div className='inline-block text-sm text-muted-foreground align-baseline mx-auto'>
        page {page || 1} of {totalPages}
      </div>
      <div className='w-20'>
        {/* <CSSTransition
          in={Boolean(page)}
          nodeRef={refPrevBtn}
          timeout={300}
          classNames='delete-row-btn'
          unmountOnExit
          onEnter={() => console.log('transition onEnter')}
          onExited={() => console.log('transition onExited')}
          on
        >
          <Button
            variant='outline'
            size='sm'
            // className='shadow-md'
            ref={refPrevBtn}
            onClick={() => {
              const modSearchParams = createSearchParams(
                { page: page === '2' ? '' : Number(page) - 1 },
                searchParams
              );

              router.push(pathname + '?' + modSearchParams);
            }}
          >
            Previous
          </Button>
        </CSSTransition> */}
        <Button
          className={twJoin(
            'scale-0 transition-transform select-none',
            Boolean(page) && 'scale-100'
          )}
          variant='outline'
          size='sm'
          onClick={() => {
            const modSearchParams = createSearchParams(
              { page: page === '2' ? '' : Number(page) - 1 },
              searchParams
            );

            router.push(pathname + '?' + modSearchParams);
          }}
          disabled={!page}
        >
          Previous
        </Button>
      </div>
      {/* <Button
        variant='outline'
        size='sm'
        onClick={() => {
          const modSearchParams = createSearchParams(
            { page: page === '2' ? '' : Number(page) - 1 },
            searchParams
          );

          router.push(pathname + '?' + modSearchParams);
        }}
        disabled={!page}
      >
        Previous
      </Button> */}
      <Button
        className='  select-none'
        variant='outline'
        size='sm'
        onClick={() => {
          const modSearchParams = createSearchParams(
            { page: page ? Number(page) + 1 : 2 },
            searchParams
          );

          router.push(pathname + '?' + modSearchParams);
        }}
        disabled={Number(page || 1) === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
