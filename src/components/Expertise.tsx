"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

import solana from "../../public/crypto/solana.png";
import ethereum from "../../public/crypto/ethereum.png";
import hyperliquid from "../../public/crypto/hyperliquid.png";
import base from "../../public/crypto/base.png";
import avalanche from "../../public/crypto/avalanche.png";
import sui from "../../public/crypto/sui.png";
import binance from "../../public/crypto/binance.png";

const Expertise = () => {
  const logos = [
    { name: "Sui", logo: sui },
    { name: "BNB Chain", logo: binance },
    { name: "Hyperliquid", logo: hyperliquid },
    { name: "Base", logo: base },
    { name: "Avalanche", logo: avalanche },
    { name: "Solana", logo: solana },
    { name: "Ethereum", logo: ethereum },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
  });

  return (
    <section
      id="expertise"
      ref={ref}
      className="w-full min-h-screen px-4 md:px-10 pt-[16vh] md:pt-[30vh]"
    >
      <div className="flex flex-col items-center justify-center gap-16 h-full max-w-5xl mx-auto">
        <m.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-primary text-center text-4xl sm:text-5xl md:text-7xl"
        >
          Multi-Chain Expertise
        </m.h3>
        <div className="flex items-center justify-center gap-16 flex-wrap">
          {logos.map((logo, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: idx * 0.15,
                ease: "easeInOut",
              }}
              className="relative group flex flex-col items-center justify-center will-change-transform"
            >
              <div className="size-[96px] sm:size-[120px]">
                <Image
                  src={logo.logo}
                  alt={`${logo.name}-logo`}
                  className=" w-full h-full object-contain md:group-hover:blur-xl transition-all duration-500"
                />
              </div>
              <div className="md:absolute md:inset-0 w-full h-full flex items-center justify-center text-primary text-center whitespace-nowrap text-xl md:text-3xl md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {logo.name}
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
