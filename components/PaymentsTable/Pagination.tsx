"use client";
import { createSearchParams } from "@/lib/createSearchParams";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Pagination({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  return (
    <div className="space-x-2 ">
      <div className="inline-block text-sm text-muted-foreground align-baseline">
        page {page || 1} of {totalPages}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          const modSearchParams = createSearchParams(
            { page: page === "2" ? "" : Number(page) - 1 },
            searchParams
          );

          router.push(pathname + "?" + modSearchParams);
        }}
        disabled={!page}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          const modSearchParams = createSearchParams(
            { page: page ? Number(page) + 1 : 2 },
            searchParams
          );

          router.push(pathname + "?" + modSearchParams);
        }}
        disabled={false}
      >
        Next
      </Button>
    </div>
  );
}
