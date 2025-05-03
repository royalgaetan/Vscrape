import React, { useRef } from "react";
import { ClassicScheme, RenderEmit } from "rete-react-plugin";
import Image from "next/image";
import { Copy, GripVertical, LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  getWorkflowSectionFromName,
  getWorkflowToolItemFromLabel,
} from "@/lib/workflow_editor/utils/w_utils";
import SimpleTooltip from "../global/simple_tooltip";
import NodeHandle from "./node_handle";
import { useWorkflowEditorStore } from "@/stores/workflowStore";
import { WorkflowEditorNode } from "@/lib/workflow_editor/types/w_types";

const CustomNode = <S extends ClassicScheme>({
  data,
  emit,
}: {
  data: S["Node"];
  emit: RenderEmit<S>;
}) => {
  // Store
  const toggleOptionbar = useWorkflowEditorStore((s) => s.toggleOptionbar);
  // End Store

  const arrayLength = useRef<number>(Math.round(Math.random() * 87));

  const nodeItem = useRef<WorkflowEditorNode | null>(
    getWorkflowToolItemFromLabel(data.label ?? "")
  );
  const Icon = nodeItem.current?.icon as LucideIcon;
  const sectionInfo = useRef(
    getWorkflowSectionFromName(nodeItem.current?.sectionName.toString() ?? "")
  );

  const openOptionbar = () => {
    // Open Option Bar for this Node:
    if (nodeItem.current === null || !nodeItem.current) return;
    toggleOptionbar(true, {
      iconColor: sectionInfo.current?.[1].iconColor,
      ...nodeItem.current,
    });
  };

  return (
    <div className="relative flex flex-col justify-center cursor-pointer items-center group w-48 gap-3 border-none select-none hover:opacity-95 transition-all duration-300">
      {/* Button: Grab (Move Node) */}
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
      <button
        onPointerUp={() => openOptionbar()}
        className="justify-center items-center flex"
      >
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
        {nodeItem.current?.logoPath && (
          <div className="relative h-24 w-24 mb-0">
            <Image
              src={nodeItem.current?.logoPath}
              alt={`${nodeItem.current?.label} logo`}
              className="select-none object-contain"
              fill
            />
          </div>
        )}
      </button>

      {/* Content: Node Name, Handles, Operation Number, etc. */}
      <div className="flex flex-col justify-center items-center gap-0">
        {/* Node Name + Handles */}
        <div className="relative flex flex-1 items-center justify-center gap-1">
          <NodeHandle
            iconColor={sectionInfo.current?.[1].iconColor}
            containerClassName="absolute left-0 group-hover:flex justify-start hidden group/leftHandle"
            iconClassName="origin-center group-hover/leftHandle:scale-[2.25]"
          />
          <button onPointerUp={() => openOptionbar()}>
            <h6 className="w-full text-center line-clamp-1 font-bold text-neutral-900 text-base px-5">
              {nodeItem.current?.label}
            </h6>
          </button>
          <NodeHandle
            iconColor={sectionInfo.current?.[1].iconColor}
            containerClassName="absolute right-0 group-hover:flex justify-end hidden group/rightHandle"
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
                "flex cursor-pointer hover:opacity-70 translate-y-[0.16rem] active:scale-[0.9] h-fit !px-0 !py-0 transition-all duration-300 justify-center items-center hover:bg-transparent bg-transparent"
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
    </div>
  );
};

export default CustomNode;
