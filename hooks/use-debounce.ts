import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createSearchParams } from "@/lib/createSearchParams";

export function useDebounce(value: string | null, delay?: number) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (value === searchParams.get("email")) return;
    const timer = setTimeout(() => {
      const modSearchParams = createSearchParams(
        { email: value, page: 0 },
        searchParams
      );
      router.push(pathname + "?" + modSearchParams);
    }, delay ?? 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
}
