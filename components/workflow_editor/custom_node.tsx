import { WorkflowEditorToolItem } from "@/lib/workflow_editor/types/w_types";
import React, { useRef } from "react";
import { ClassicScheme, RenderEmit } from "rete-react-plugin";
import Image from "next/image";
import {
  Circle,
  Copy,
  CopyCheck,
  GripVertical,
  LucideIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  getWorkflowSectionFromName,
  getWorkflowToolItemFromLabel,
} from "@/lib/workflow_editor/utils/w_utils";
import { useWorkflowEditor } from "@/hooks/useWorkflowEditor";
import SimpleTooltip from "../global/simple_tooltip";

type Props<S extends ClassicScheme> = {
  data: S["Node"];
  emit: RenderEmit<S>;
};

const CustomNode = <S extends ClassicScheme>(props?: Props<S>): JSX.Element => {
  // const { toggleOptionbar, isOptionbarOpen, optionbarItem } =
  //   useWorkflowEditor();

  const arrayLength = useRef<number>(Math.round(Math.random() * 87));

  const toolItem = useRef<WorkflowEditorToolItem | null>(
    getWorkflowToolItemFromLabel(props?.data.label ?? "")
  );
  const Icon = toolItem.current?.icon as LucideIcon;
  const sectionInfo = useRef(
    getWorkflowSectionFromName(toolItem.current?.sectionName.toString() ?? "")
  );

  return (
    <button
      onClick={() => {
        // Open Option Bar for this Node:
        // if (toolItem.current === null || !toolItem.current) return;
        // toggleOptionbar(true, {
        //   iconColor: "",
        //   ...toolItem.current,
        // });
      }}
      className="relative flex flex-col justify-center cursor-pointer items-center group w-48 gap-3 border-none select-none hover:opacity-95 transition-all duration-300"
    >
      {/* Buttons: Grab (Move Node) */}
      <Button
        variant={"ghost"}
        className={cn(
          "group-hover:flex hidden absolute -top-0 right-2 cursor-grab !px-0 transition-all duration-300 justify-center items-center hover:bg-transparent bg-transparent"
        )}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        {/* Icon */}
        <GripVertical
          className="stroke-neutral-400 !size-7 !fill-neutral-400
          "
        />
      </Button>

      {/* Icon & Logo */}
      <div className="justify-center items-center flex">
        {Icon && (
          <div
            className={cn(
              "flex size-28 rounded-full justify-center items-center"
            )}
            style={{ backgroundColor: sectionInfo.current?.[1].iconColor }}
          >
            <Icon className={"size-16 stroke-[1.3px] stroke-white"} />
          </div>
        )}
        {toolItem.current?.logoPath && (
          <div className="relative h-24 w-24 mb-0">
            <Image
              src={toolItem.current?.logoPath}
              alt={`${toolItem.current?.label} logo`}
              className="select-none object-contain"
              fill
            />
          </div>
        )}
      </div>

      {/* Content: Node Name, Handles, Operation Number, etc. */}
      <div className="flex flex-col justify-center items-center gap-0">
        {/* Node Name + Handles */}
        <div className="relative flex flex-1 items-center justify-center gap-1">
          <NodeHandle
            iconColor={sectionInfo.current?.[1].iconColor}
            containerClassName="absolute left-0 group-hover:flex w-1/2 h-16 items-center justify-start hidden group/leftHandle"
            iconClassName="origin-center group-hover/leftHandle:scale-[2.25]"
          />
          <h6 className="w-full text-center line-clamp-1 font-bold text-neutral-900 text-base px-5">
            {toolItem.current?.label}
          </h6>
          <NodeHandle
            iconColor={sectionInfo.current?.[1].iconColor}
            containerClassName="absolute right-0 group-hover:flex w-1/2 h-16 items-center justify-end hidden group/rightHandle"
            iconClassName="origin-center group-hover/rightHandle:scale-[2.25]"
          />
        </div>

        {/* Rests... */}
        <div className="flex flex-1 items-center justify-center gap-1">
          <p className="w-full text-center line-clamp-1 font-normal text-neutral-500 text-sm">
            {arrayLength.current} Operations
          </p>
          {/* Button: Duplicate */}
          <SimpleTooltip tooltipText="Duplicate" side="bottom">
            <Button
              variant={"ghost"}
              className={cn(
                "flex cursor-pointer hover:opacity-70 translate-y-[0.16rem] active:scale-[0.96] h-fit !px-0 !py-0 transition-all duration-300 justify-center items-center hover:bg-transparent bg-transparent"
              )}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {/* Icon */}
              <Copy className="stroke-neutral-400" />
            </Button>
          </SimpleTooltip>
        </div>
      </div>
    </button>
  );
};
export default CustomNode;

export const NodeHandle = ({
  iconClassName,
  containerClassName,
  iconColor,
}: {
  iconClassName?: string;
  containerClassName?: string;
  iconColor?: string;
}) => {
  return (
    <span
      className={cn(
        "transition-all duration-100 ease-in-out",
        containerClassName
      )}
    >
      <Circle
        className={cn(
          "size-2 inline-block transition-transform duration-100 ease-in-out",
          iconClassName
        )}
        stroke={iconColor ?? "#6460aa"}
        fill={iconColor ?? "#6460aa"}
      />
    </span>
  );
};
