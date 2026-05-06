"use client";
import { UnderlineText } from "../UnderlineText";
import { Logo } from "../Logo";
import { useLenis } from "lenis/react";
import { navigationConfig } from "./navigationConfig";
import { useState, useEffect } from "react";
import { MobileNavbar } from "./MobileNavbar";
import { useActiveSection } from "@/hooks/useActiveSection";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    if (isOpen) {
      lenis.stop();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      lenis.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      lenis.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen, lenis]);

  const sectionIds = navigationConfig
    .filter((item) => item.href && item.href.startsWith("#"))
    .map((item) => item.href!.replace("#", ""));

  const activeId = useActiveSection(sectionIds);
  const anyActive = !!activeId;

  const lineBaseClass =
    "absolute w-3 lg:w-[1vw] h-[0.5px] lg:h-[0.1vw] bg-secondary transition-transform duration-300 ease-in-out";
  return (
    <>
      <nav
        className="fixed top-0 w-full lg:h-[5vw] flex items-center justify-between gap-10 pr-4 pl-2 lg:px-[1.5vw] z-50 font-LazareGrotesk pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, #151515 0%, rgba(21,21,21,0) 100%)",
        }}
      >
        <Logo
          className="size-14 lg:size-[3.5vw] pointer-events-auto"
          href="/#home"
        />
        <ul className="hidden lg:flex items-center gap-[1.5vw] link-text uppercase pointer-events-auto">
          {navigationConfig.slice(1).map((item, idx) => {
            return (
              <UnderlineText
                key={idx}
                {...item}
                isActive={
                  item.href?.startsWith("#")
                    ? activeId === item.href.replace("#", "")
                    : false
                }
                anyActive={anyActive}
              />
            );
          })}
        </ul>

        <button
          type="button"
          className="relative w-7 lg:w-[2.3vw] h-7 lg:h-[2.3vw] border border-secondary rounded-full lg:hidden flex items-center justify-center shrink-0 cursor-pointer pointer-events-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={` ${lineBaseClass} ${
              isOpen
                ? "rotate-45"
                : "-translate-y-[1.5px] lg:-translate-y-[0.2vw]"
            }`}
          ></span>

          <span
            className={` ${lineBaseClass} ${
              isOpen
                ? "-rotate-45"
                : "translate-y-[1.5px] lg:translate-y-[0.2vw]"
            }`}
          ></span>
        </button>
      </nav>

      <div
        className={`block lg:hidden w-full fixed h-[100dvh] inset-0 z-40 p-3 bg-background transition-transform duration-500 ease-out  ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <MobileNavbar onClose={() => setIsOpen(false)} activeId={activeId} />
      </div>
    </>
  );
};

export default Navbar;
