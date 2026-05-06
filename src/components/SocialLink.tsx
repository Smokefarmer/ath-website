import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export const SocialLink = ({
  icon,
  href = "#",
  iconName,
  className,
}: {
  icon: string | StaticImageData;
  href?: string;
  iconName: string;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-opacity duration-300 hover:will-change-[opacity] ${className}`}
    >
      <Image
        src={icon}
        alt={`${iconName}-icon`}
        width={20}
        height={20}
        className="w-full h-full object-contain"
      />
    </Link>
  );
};
