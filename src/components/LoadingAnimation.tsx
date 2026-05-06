"use client";
import { m, useAnimation } from "framer-motion";
import { useEffect } from "react";

export const Loading = ({ onComplete }: { onComplete: () => void }) => {
  const Outercontrols = useAnimation();
  const innerControls = useAnimation();
  const logoControls = useAnimation();

  useEffect(() => {
    async function sequence() {
      await Outercontrols.start({
        scaleX: 1,
        transition: {
          delay: 2.1,
          duration: 1.1,
          ease: [0.6, 0, 0.1, 1],
        },
      });
      await innerControls.start({
        scaleX: 1,
        transition: { duration: 1.4, ease: [0.3, 0, 0, 1] },
      });
      await Promise.all([
        Outercontrols.start({
          scaleX: 0,
          transition: { duration: 0.65, ease: [0.7, 0, 0, 1] },
        }),
        logoControls.start({
          y: "190%",
          transition: { delay: 0.23, duration: 0.43, ease: [0.7, 0, 0, 1] },
        }),
      ]);
    }
    sequence();
  }, [Outercontrols, innerControls, logoControls]);

  return (
    <m.div className="relative w-full h-screen bg-black pointer-events-none">
      <m.div
        className="absolute inset-0 w-full h-full z-0 flex flex-col gap-10 items-center justify-center bg-[#232323]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25, duration: 1 }}
          className="size-[50px] md:size-[70px]"
        >
          <svg viewBox="0 0 1563 1563">
            <path
              fill="#000000"
              d="M642 240h264l3 11h2l3 8 1 3 1 2v2l1 4h2l3 8 1 3 1 2v2l1 5h2l4 9 1 3v3l1 2 1 5h2l3 8 1 2 1 2v2l1 6h2l3 8 1 3 1 2v2l1 4h2a1759 1759 0 0 1 7 23h2l3 8 1 2 1 2v2l1 5h2l3 8 1 2 1 2v2l1 5h2a4191 4191 0 0 1 5 13v2l1 3 1 4h2l3 8 1 3 1 2v2l1 5h2l3 8 1 2 1 2v2l1 6h2a3652 3652 0 0 1 7 21h2l3 8 1 3 1 2v2l1 5h2l3 8 1 3 1 2v2l1 5h2a2390 2390 0 0 1 5 15l1 2 1 5h2l3 8 1 3 1 2v2l1 4h2l3 8 1 3 1 2v2l1 4h2a2745 2745 0 0 1 5 13v2l1 3 1 5h2l3 8 1 3 1 2v2l1 4h2l3 8 1 3 1 2v2l1 5h2l3 8 1 3 1 2v2l1 4h2l3 8 1 2 3 13h2l3 8 1 3 1 2v2l1 4h2l3 8 1 3 1 2v2l1 4h2a2745 2745 0 0 1 5 13v2l1 3 1 5h2l3 8 1 2 1 2v2l1 5h2l3 8 1 2 1 2v2l1 6h2l4 9 1 3v3l1 2 1 4h2l3 8 1 3 1 2v2l1 6h2l3 8 1 2 1 2v2l1 5h2a2390 2390 0 0 1 5 12v3l1 2 1 5h2v3H787v-60l74-1 1-403h-75v-74l-20 1-1 73h-74v404h74v60H386c1-6 1-10 4-15l1-3 1-3h2v-3l4-11v-2l2-5h2l1-3c1-7 4-13 6-20h2l1-2 5-17h2l1-4 5-16h2v-2l4-13 1-2 2-6h2v-2l7-19 7-18h2l1-4 9-24 5-15h2l1-3 5-16h2v-2l4-13 1-2 2-6h2l1-4 5-14 8-22h2l1-4 6-19h2l1-4 5-16h2l1-3 5-16h2v-2l4-13 1-2 2-6h2l1-4 5-14 4-11 1-2 3-9h2l1-3c1-7 4-13 6-20h2l1-2 5-17h2l1-4 5-16h2v-2l4-13 1-2 2-6h2l1-3 5-16h2v-3l4-11v-2l2-5h2l1-3 5-16h2v-2l4-13 1-2 2-6h2l1-4 5-16h2v-3a67 67 0 0 1 4-12l2-5h2l1-4 6-18ZM763 908h161v144h90V908h155v428h-155v-145l-24 1h-66v144H763V908ZM386 908h352v154h-99v274H484v-274h-98V908Z"
            />
          </svg>
        </m.div>
        <div className="w-[30%] h-[1px] scale-y-[70%] bg-transparent" />
      </m.div>

      <m.div
        className="absolute inset-0 z-0 w-full h-full flex flex-col gap-10 items-center justify-center bg-[#141214]"
        initial={{ opacity: 0, clipPath: "inset(0% 49.95% 100% 49.95%)" }}
        animate={{
          opacity: 1,
          clipPath: [
            "inset(0% 49.95% 100% 49.95%)",
            "inset(0% 49.95% 0% 49.95%)",
            "inset(0% 0% 0% 0%)",
          ],
        }}
        style={{ transformOrigin: "center top" }}
        transition={{
          clipPath: {
            delay: 1.6,
            duration: 1.7,
            times: [0, 0.32, 1],
            ease: ["easeInOut", [0.6, 0, 0, 1]],
          },
          opacity: { delay: 1 },
        }}
      >
        <m.div
          initial={{ y: 0 }}
          animate={logoControls}
          onAnimationComplete={onComplete}
          className="size-[50px] md:size-[70px]"
        >
          <svg viewBox="0 0 1563 1563">
            <path
              fill="#A8FF07"
              d="M642 240h264l3 11h2l3 8 1 3 1 2v2l1 4h2l3 8 1 3 1 2v2l1 5h2l4 9 1 3v3l1 2 1 5h2l3 8 1 2 1 2v2l1 6h2l3 8 1 3 1 2v2l1 4h2a1759 1759 0 0 1 7 23h2l3 8 1 2 1 2v2l1 5h2l3 8 1 2 1 2v2l1 5h2a4191 4191 0 0 1 5 13v2l1 3 1 4h2l3 8 1 3 1 2v2l1 5h2l3 8 1 2 1 2v2l1 6h2a3652 3652 0 0 1 7 21h2l3 8 1 3 1 2v2l1 5h2l3 8 1 3 1 2v2l1 5h2a2390 2390 0 0 1 5 15l1 2 1 5h2l3 8 1 3 1 2v2l1 4h2l3 8 1 3 1 2v2l1 4h2a2745 2745 0 0 1 5 13v2l1 3 1 5h2l3 8 1 3 1 2v2l1 4h2l3 8 1 3 1 2v2l1 5h2l3 8 1 3 1 2v2l1 4h2l3 8 1 2 3 13h2l3 8 1 3 1 2v2l1 4h2l3 8 1 3 1 2v2l1 4h2a2745 2745 0 0 1 5 13v2l1 3 1 5h2l3 8 1 2 1 2v2l1 5h2l3 8 1 2 1 2v2l1 6h2l4 9 1 3v3l1 2 1 4h2l3 8 1 3 1 2v2l1 6h2l3 8 1 2 1 2v2l1 5h2a2390 2390 0 0 1 5 12v3l1 2 1 5h2v3H787v-60l74-1 1-403h-75v-74l-20 1-1 73h-74v404h74v60H386c1-6 1-10 4-15l1-3 1-3h2v-3l4-11v-2l2-5h2l1-3c1-7 4-13 6-20h2l1-2 5-17h2l1-4 5-16h2v-2l4-13 1-2 2-6h2v-2l7-19 7-18h2l1-4 9-24 5-15h2l1-3 5-16h2v-2l4-13 1-2 2-6h2l1-4 5-14 8-22h2l1-4 6-19h2l1-4 5-16h2l1-3 5-16h2v-2l4-13 1-2 2-6h2l1-4 5-14 4-11 1-2 3-9h2l1-3c1-7 4-13 6-20h2l1-2 5-17h2l1-4 5-16h2v-2l4-13 1-2 2-6h2l1-3 5-16h2v-3l4-11v-2l2-5h2l1-3 5-16h2v-2l4-13 1-2 2-6h2l1-4 5-16h2v-3a67 67 0 0 1 4-12l2-5h2l1-4 6-18ZM763 908h161v144h90V908h155v428h-155v-145l-24 1h-66v144H763V908ZM386 908h352v154h-99v274H484v-274h-98V908Z"
            />
          </svg>
        </m.div>
        <div className="relative w-full flex items-center justify-center">
          <m.div
            className="relative w-[80%] md:w-[50%] xl:w-[30%] h-[1px] scale-y-[70%] bg-white/20 origin-center"
            initial={{ scaleX: 0 }}
            animate={Outercontrols}
          >
            <m.div
              className="absolute inset-0 w-full h-full bg-white origin-center"
              initial={{ scaleX: 0 }}
              animate={innerControls}
            />
          </m.div>
          <div className="absolute w-full h-30 z-10 bg-[#141214] top-[1px]"></div>
        </div>
      </m.div>
    </m.div>
  );
};
