type WhyUsCardProps = {
  title: string;
  description: string;
};
export const WhyUsCard = ({ title, description }: WhyUsCardProps) => {
  return (
    <div className="flex flex-col items-start gap-5 w-full lg:w-[550px]">
      <h3 className="text-3xl md:text-5xl xl:text-[56px] text-primary">
        {title}.
      </h3>
      <p className="para-text text-primary font-light leading-[1.3] tracking-tight font-space-mono">
        {description}
      </p>
    </div>
  );
};

export default WhyUsCard;
