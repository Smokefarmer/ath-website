import Link from "next/link";

export const UnderlineText = ({
  itemName,
  href = "#",
  className = "",
  children,
  isActive = false,
  anyActive = false,
}: {
  itemName: string;
  href?: string;
  className?: string;
  children?: React.ReactNode;
  isActive?: boolean;
  anyActive?: boolean;
}) => {
  // Determine opacity:
  // - active item: full opacity
  // - other items: 70% if any item active, otherwise full
  const opacity = isActive
    ? "opacity-100"
    : anyActive
    ? "opacity-70 hover:opacity-100"
    : "opacity-100";

  // Determine underline scale
  const underlineScale = isActive
    ? "scale-x-100"
    : "scale-x-0 group-hover:scale-x-100";

  return (
    <Link
      href={href}
      className={`flex flex-col items-start w-fit group cursor-pointer ${className}`}
    >
      <div className="flex items-center gap-1 overflow-hidden">
        <span
          className={`transition-opacity duration-300 ease-in-out whitespace-nowrap ${opacity}`}
        >
          {itemName}
        </span>
        {children}
      </div>
      <div
        className={`w-full h-[1px] bg-primary/30 origin-left transition-transform duration-300 ease-in-out ${underlineScale}`}
      />
    </Link>
  );
};
