"use client";

import { useState } from "react";

import { SearchContext } from "@/context/search";

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SearchContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </SearchContext.Provider>
  );
}
