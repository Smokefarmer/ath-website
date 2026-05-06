const CornerDecorators = ({
  variant = "all",
  className,
}: {
  variant?: string;
  className?: string;
}) => {
  const corners = [
    {
      id: "top-right",
      position: "top-[-1px] right-[-8px] md:right-[-1rem]",
      rounded: "rounded-tr-[75%]",
      border: "border-t border-r",
    },
    {
      id: "top-left",
      position: "top-[-1px] left-[-8px] md:left-[-1rem]",
      rounded: "rounded-tl-[75%]",
      border: "border-t border-l",
    },
    {
      id: "bottom-left",
      position: "bottom-[-1px] left-[-8px] md:left-[-1rem]",
      rounded: "rounded-bl-[75%]",
      border: "border-b border-l",
    },
    {
      id: "bottom-right",
      position: "bottom-[-1px] right-[-8px] md:right-[-1rem]",
      rounded: "rounded-br-[75%]",
      border: "border-b border-r",
    },
  ];

  // Filter based on variant
  const activeCorners = (() => {
    switch (variant) {
      case "top":
        return corners.filter((c) => c.id.includes("top"));
      case "bottom":
        return corners.filter((c) => c.id.includes("bottom"));
      case "left":
        return corners.filter((c) => c.id.includes("left"));
      case "right":
        return corners.filter((c) => c.id.includes("right"));
      default: // "all"
        return corners;
    }
  })();

  return (
    <>
      {activeCorners.map((c, i) => (
        <div
          key={i}
          className={`absolute w-1 md:w-2 h-1 md:h-2 ${c.position} ${c.rounded} bg-transparent text-transparent ${className} ${c.border}`}
        />
      ))}
    </>
  );
};

export default CornerDecorators;
