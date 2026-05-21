import React from "react";

export default function AuthCardHeader() {
  return (
    <div className="mb-3 lg:mb-4">
      <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold text-[var(--ui-text)] mb-0.5 tracking-tight">
        Welcome to Your Library
      </h2>
      <p className="text-[var(--ui-text-muted)] text-[11px] lg:text-[12px] font-normal opacity-90">
        Sign in to track your favorites and explore our collection.
      </p>
    </div>
  );
}
