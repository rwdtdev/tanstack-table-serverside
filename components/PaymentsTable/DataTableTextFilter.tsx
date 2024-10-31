"use client";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function DataTableTextFilter() {
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState<string | null>(
    searchParams.get("email")
  );

  useDebounce(inputValue);

  return (
    <Input
      placeholder="Filter emails..."
      value={inputValue || ""}
      onChange={(event) => {
        setInputValue(event.target.value);
      }}
      className="max-w-sm mr-2"
    />
  );
}
