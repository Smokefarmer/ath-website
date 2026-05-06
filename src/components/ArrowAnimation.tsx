"use client";
import { MoveDown } from "lucide-react";
import { m } from "framer-motion";

export const ArrowAnimation = ({
  icon = <MoveDown className="w-2.5 md:w-4" />,
  y = [-10, 0, 10],
}: {
  icon?: React.ReactNode;
  y?: number[];
}) => {
  return (
    <m.div
      animate={{
        y: y,
        opacity: [0, 1, 1, 0.5, 0],
      }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      {icon}
    </m.div>
  );
};
