import ActiveStatus from "./active-status";
interface BranchInfoProps {
  title: string;
  description: string;
  lang: string;
}



export default function BranchInfo({ title, description, lang }: BranchInfoProps) {
  return (
    <div className="flex flex-col gap-4">
      <article className="flex flex-col">
        <h2 className="text-[13px] font-medium text-black">
          {title}
        </h2>
        <p className="text-[10px] font-light text-black">
          {description}
        </p>
      </article>
      <ActiveStatus lang={lang} />
    </div>
  );
}
