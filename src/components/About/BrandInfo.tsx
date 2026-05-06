import { Logo } from "../Logo";

export const BrandInfo = () => {
  return (
    <section className="w-full h-screen">
      <div className="w-full h-full flex flex-col items-center text-center justify-center gap-3 max-w-2xl mx-auto">
        <Logo className="size-36" />
        <h4 className="text-3xl tracking-tight text-primary mt-16">
          Where our name comes from
        </h4>
        <p className="text-xl font-light leading-[1.5] w-[90%] tracking-wide">
          Inspired by topological dimension reduction — a mathematical and
          machine learning technique that simplifies complex, high‑dimensional
          data while preserving essential features and core qualities. <br />
          <br />
          We see our work as similar: distilling intricate webs of information
          into key insights that drive high-conviction investments and long term
          partnerships.
        </p>
      </div>
    </section>
  );
};
