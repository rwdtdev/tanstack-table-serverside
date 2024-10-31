"use client";
import { createSearchParams } from "@/lib/createSearchParams";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Pagination() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  return (
    <div className="space-x-2">
      <Button variant="outline" size="sm" onClick={() => {}} disabled={false}>
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
