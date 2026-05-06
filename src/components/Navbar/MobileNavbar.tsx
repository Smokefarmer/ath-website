import CornerDecorators from "../CornerDecorators";
import { companySocials } from "../CompanySocials";
import { SocialLink } from "../SocialLink";
import { navigationConfig } from "./navigationConfig";
import Link from "next/link";

export const MobileNavbar = ({
  onClose,
  activeId,
}: {
  onClose: () => void;
  activeId: string | null;
}) => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-end gap-10">
      <ul className="flex flex-col items-start gap-3 text-6xl text-primary">
        {navigationConfig.slice(0, 5).map((item, idx) => {
          const isActive =
            item.href?.startsWith("#") &&
            activeId === item.href.replace("#", "");

          return (
            <Link
              key={idx}
              href={item.href || "#"}
              className={`leading-[1] transition-opacity duration-300 ${
                isActive ? "opacity-100" : "opacity-50"
              }`}
              onClick={onClose}
            >
              {item.itemName}
            </Link>
          );
        })}
      </ul>

      <div className="w-full px-2">
        <div className="relative w-full flex items-center justify-between gap-5 pt-5 border-t border-primary/30">
          <CornerDecorators variant="top" className="border-primary" />
          <span className="text-sm text-primary pointer-events-none select-none">
            ATH &copy; 2025
          </span>
          <div className="flex items-center gap-5">
            {companySocials.map((icon, idx) => (
              <SocialLink
                key={idx}
                icon={icon.icon}
                href={icon.href}
                iconName={icon.iconName.toLowerCase()}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
