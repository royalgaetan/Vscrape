import { LucideIcon } from "lucide-react";

const RunDetailItem = ({
  LeadingIcon,
  label,
  detail,
}: {
  LeadingIcon: LucideIcon;
  label: string;
  detail: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Status */}
      <div className="flex w-full gap-2 items-center">
        <div className="flex min-w-fit gap-1 text-xs items-center font-medium text-muted-foreground/90">
          <LeadingIcon className="size-4" /> <span>{label}</span>
        </div>
        <div className="w-full text-end text-black font-medium text-xs line-clamp-1">
          {detail}
        </div>
      </div>
    </div>
  );
};

export default RunDetailItem;
