import { TeamCard } from "./TeamCard";
import { teamConfig } from "./teamConfig";
const Team = () => {
  return (
    <section
      id="impact"
      className="size-full py-36 xl:scroll-mt-40 flex flex-col gap-[10rem] px-5 md:px-10"
    >
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center gap-20 md:gap-28 lg:gap-40">
        <h2 className="heading-text text-primary leading-[1]">Team</h2>

        <div className="w-full flex flex-wrap items-start justify-center gap-[4.5rem]">
          {teamConfig.map((team, idx) => {
            return <TeamCard key={idx} {...team} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
