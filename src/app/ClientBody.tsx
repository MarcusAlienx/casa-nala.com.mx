"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  useEffect(() => {
    // This ensures the class is set on the client after hydration
    document.body.className = className;
  }, [className]);

  return <body className={className}>{children}</body>;
}
