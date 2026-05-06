import { navigationConfig } from "./Navbar/navigationConfig";
import { UnderlineText } from "./UnderlineText";
import { SocialLink } from "./SocialLink";
import { Logo } from "./Logo";
import { ArrowAnimation } from "./ArrowAnimation";
import { MoveUp } from "lucide-react";
import { companySocials } from "./CompanySocials";
import { BorderTemplate } from "./BorderTemplate";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="relative w-full h-full pt-[50vh] px-4 sm:px-7 lg:px-10 flex items-end justify-center font-LazareGrotesk text-primary mb-5 lg:mb-10"
    >
      <BorderTemplate
        className="w-full flex flex-col items-start gap-5 py-5 lg:p-4.5"
        isFooter
      >
        <div className="w-full flex max-lg:flex-col items-stretch justify-between gap-5">
          <Logo className="size-14 sm:size-16 -ml-[12px]" href="/#home" />

          <ul className="flex flex-col items-start justify-start gap-1.5 pb-7 text-sm uppercase tracking-wider">
            {navigationConfig.slice(1).map((item, idx) => {
              return <UnderlineText key={idx} {...item} />;
            })}
          </ul>

          <div className="flex items-start gap-3 sm:gap-5">
            {companySocials.map((icon, idx) => {
              return (
                <SocialLink
                  key={idx}
                  icon={icon.icon}
                  iconName={icon.iconName.toLowerCase()}
                  href={icon.href}
                  className="opacity-50 hover:opacity-100"
                />
              );
            })}
          </div>
        </div>
        <p className="tracking-wide text-xs font-bold text-secondary">
          All Time High (“ATH”) acts solely as a strategic advisor and
          coordinator. ATH does not provide investment services, does not trade
          or custody digital assets, and makes no promises regarding token
          performance. Any references to trading, market making, or execution
          reflect the independent activities of third-party partners.
          Information on this site is for informational purposes only and does
          not constitute financial advice.
        </p>
        <UnderlineText
          itemName="back to top"
          href="#home"
          className="text-sm uppercase self-end"
        >
          <ArrowAnimation
            y={[10, 0, -10]}
            icon={<MoveUp className="w-3 md:w-4" />}
          />
        </UnderlineText>
      </BorderTemplate>
    </footer>
  );
};

export default Footer;
