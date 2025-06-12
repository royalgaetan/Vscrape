import { LucideIcon } from "lucide-react";

const FieldLabel = ({ label, Icon }: { label: string; Icon?: LucideIcon }) => {
  return (
    <div className="flex flex-1 justify-start items-center gap-2 mb-2">
      <div className="w-fit">
        {Icon && <Icon className="stroke-neutral-700/70 !size-5" />}
      </div>
      <span className="text-base font-semibold text-neutral-700 line-clamp-1">
        {label}
      </span>
    </div>
  );
};

export default FieldLabel;
