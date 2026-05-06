import { InfoCard } from "./InfoCard";

export const WhatWeDo = () => {
  const infoCardsData = [
    {
      title: "What we do",
      description:
        "We support projects at the most critical point in their journey - the TGE and everything that follows. From narrative-driven memes to serious infrastructure, we guide launches that earn trust and momentum. ATH delivers a full-stack launch management. The goal is simple: give teams the full framework they need to succeed in launch and beyond.",
    },
    {
      title: "How we do it",
      description:
        "We´re selective. ATH only works with teams prepared to meet a high standard of execution. Once engaged, we run a structured process - from token design and sequencing to liquidity planning, community growth, and market strategy. We stay deeply involved while keeping oversight tight. Every element - partners, timing, and distribution, is aligned under one framework so launches remain disciplined, credible and built to sustain.",
    },
  ];
  return (
    <section className="w-full min-h-screen py-20 px-5">
      <div className="w-full flex flex-col items-start gap-24 max-w-[1440px] mx-auto">
        {infoCardsData.map((info, idx) => {
          return (
            <div
              key={idx}
              className={`${
                idx % 2 == 0 ? "self-start" : "lg:self-end"
              } overflow-hidden`}
            >
              <InfoCard cardNo={idx + 1} {...info} />
            </div>
          );
        })}
      </div>
    </section>
  );
};
