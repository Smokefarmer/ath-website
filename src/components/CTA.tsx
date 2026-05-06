import Link from "next/link";
import CornerDecorators from "./CornerDecorators";

export const CTA = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-16 pt-32 pb-20 px-4">
      <p className="text-primary text-center text-3xl md:text-5xl lg:text-7xl">
        When it&apos;s time to launch, do it right.
      </p>
      <Link
        href={"https://t.me/ATH_contact"}
        className="relative py-3 px-5 cursor-pointer border-y group hover:border-[#75e97b] transition-colors duration-300 text-lg sm:text-xl md:text-2xl"
      >
        <CornerDecorators className="border-white group-hover:border-[#75e97b] transition-colors duration-300" />
        <span className="text-primary font-LazareGrotesk group-hover:text-[#75e97b] transition-colors duration-300">
          Get in Touch
        </span>
      </Link>
    </div>
  );
};
