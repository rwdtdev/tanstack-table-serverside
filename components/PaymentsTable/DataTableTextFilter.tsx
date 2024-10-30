"use client";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useState } from "react";

export function DataTableTextFilter() {
  const [inputValue, setInputValue] = useState("");

  useDebounce(inputValue);
  return (
    <Input
      placeholder="Filter emails..."
      value={inputValue ?? ""}
      onChange={(event) => {
        setInputValue(event.target.value);
      }}
      className="max-w-sm mr-2"
    />
  );
}
