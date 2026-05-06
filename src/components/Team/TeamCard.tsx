import Image, { StaticImageData } from "next/image";
import { SocialLink } from "../SocialLink";
import linkedIn from "../../../public/SocialIcons/linkedin.svg";
import twitter from "../../public/SocialIcons/twitter.svg";
import instagram from "../../public/SocialIcons/instagram.svg";

type TeamCardProps = {
  personImage: string | StaticImageData;
  personName: string;
  role: string;
  workedAt: string;
  socials: {
    socialName: string;
    link?: string;
  }[];
};

export const TeamCard = ({
  personImage,
  personName,
  role,
  workedAt,
  socials,
}: TeamCardProps) => {
  const socialIcons: Record<string, string> = {
    instagram: instagram,
    twitter: twitter,
    linkedin: linkedIn,
  };

  return (
    <div className="relative flex flex-col items-center justify-center text-center gap-7 text-primary min-w-[120px] w-[40vw] lg:w-[290px]">
      <Image
        src={personImage}
        alt={`${personName}-img`}
        className="w-full h-auto object-cover aspect-square"
      />
      <div className="flex flex-col gap-2 items-center justify-center w-[90%]">
        <h5 className="text-2xl lg:text-3xl capitalize font-LazareGrotesk font-medium">
          {personName}
        </h5>
        <span className="tracking-wide capitalize font-space-mono">{role}</span>
        <p className="tracking-wider text-secondary font-space-mono">
          [{workedAt}]
        </p>
        <div className="flex items-center gap-3 pt-5">
          {socials.map((social, idx) => {
            const icon = socialIcons[social.socialName.toLowerCase()];
            return (
              <SocialLink
                key={idx}
                icon={icon}
                iconName={social.socialName.toLowerCase()}
                href={social.link || "#"}
                className="opacity-100 hover:opacity-50"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
