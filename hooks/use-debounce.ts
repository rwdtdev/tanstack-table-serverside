import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createSearchParams } from "@/lib/createSearchParams";

export function useDebounce(value: string, delay?: number) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const modSearchParams = createSearchParams(
        { email: value },
        searchParams
      );
      router.push(pathname + "?" + modSearchParams);
    }, delay ?? 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
}
