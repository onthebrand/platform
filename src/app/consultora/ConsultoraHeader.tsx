"use client";

import ConsultoraSubNav from "@/components/common/ConsultoraSubNav";
import { useHeaderVisibility } from "@/components/common/useHeaderVisibility";

export default function ConsultoraHeader() {
  const isHeaderVisible = useHeaderVisibility();
  return (
    <header className={`w-full z-40 sticky top-16 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-16'}`}>
      <ConsultoraSubNav />
    </header>
  );
}