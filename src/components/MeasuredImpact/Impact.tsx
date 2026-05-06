import { BorderTemplate } from "../BorderTemplate";

const Impact = () => {
  const highlights = [
    "90+ TGEs supported",
    "$80M+ raised",
    "$1.5B+ in post-launch DEX volume",
    "1000+ vetted partners",
    "$300M+ in KOL-driven post-launch trading volume",
    "24/7 launch monitoring & oversight",
  ];

  return (
    <BorderTemplate className="flex max-lg:flex-col items-center lg:items-start justify-center lg:justify-between gap-10 text-primary py-16 sm:px-10 md:px-14">
      <h4 className="text-[42px] sm:text-[44px] xl:text-[56px] lg:w-1/2 leading-[1] tracking-wide max-lg:text-center">
        Measured Impact:
      </h4>
      <div className="lg:w-1/2 flex flex-col justify-center items-center text-center gap-1.5">
        {highlights.map((highlight, idx) => (
          <span key={idx} className="text-xl sm:text-2xl xl:text-3xl">
            {highlight}
          </span>
        ))}
      </div>
    </BorderTemplate>
  );
};

export default Impact;
