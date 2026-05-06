"use client";
import { useState } from "react";
import { m } from "framer-motion";
import { Loading } from "@/components/LoadingAnimation";

export default function LoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return isLoading ? (
    <Loading onComplete={() => setIsLoading(false)} />
  ) : (
    <m.div
      key="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="relative w-full h-full z-10 bg-[#151515] antialiased"
    >
      {children}
    </m.div>
  );
}
