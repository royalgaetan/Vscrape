import { VsNode } from "@/lib/workflow_editor/classes/node";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

const PanelHeader = ({
  nodeOrigin,
  displayBackButton,
  onBack,
  description,
}: {
  nodeOrigin: VsNode;
  displayBackButton?: boolean;
  onBack?: () => void;
  description?: string;
}) => {
  const Icon = nodeOrigin?.icon;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-1 gap-2 items-center">
        {displayBackButton ? (
          <button
            onClick={() => onBack && onBack()}
            className="inset-0 hover:opacity-90 transition-all duration-300 active:scale-[0.97]"
          >
            <ArrowLeft className={"size-5"} stroke={nodeOrigin.iconColor} />
          </button>
        ) : (
          <div className="size-5">
            {Icon && (
              <Icon className={"size-5"} stroke={nodeOrigin.iconColor} />
            )}
            {nodeOrigin.logoPath && (
              <div className="relative h-5 w-5 mb-2">
                <Image
                  src={nodeOrigin.logoPath}
                  alt={`${nodeOrigin.label} logo`}
                  className="select-none object-contain"
                  fill
                />
              </div>
            )}
          </div>
        )}

        <h2 className="text-xl font-semibold text-[#333] line-clamp-1">
          {nodeOrigin.label}
        </h2>
      </div>

      {nodeOrigin.tooltip && (
        <p className="mt-1 text-xs font-normal text-neutral-500 line-clamp-2">
          {description ?? nodeOrigin.tooltip}
        </p>
      )}
    </div>
  );
};

export default PanelHeader;
