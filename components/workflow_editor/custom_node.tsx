import React, { useEffect, useState } from "react";
import { Presets } from "rete-react-plugin";
import Image from "next/image";
import { Copy, GripVertical, LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import SimpleTooltip from "../global/simple_tooltip";
import NodeHandle from "./node_handle";
import { VsNode } from "@/lib/workflow_editor/node";
import { Schemes } from "@/app/(protected)/w/[workflowId]/editor/_components/w_editor";
import { useWorkflowEditorStore } from "@/stores/workflowStore";
import { hexToRgba } from "@/lib/colors_utils";

const { RefSocket } = Presets.classic;

const CustomNode = ({
  data: node,
  emit,
}: {
  data: VsNode;
  emit: Presets.classic.RenderEmit<Schemes>;
}) => {
  const Icon = node.icon as LucideIcon;

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [nodeOperationsLength, setNodeOperationsLength] = useState<number>(
    node.operations.length
  );
  // Store
  const setNodeIdToActOn = useWorkflowEditorStore((s) => s.setNodeIdToActOn);
  // End Store

  useEffect(() => {
    // Listen to Node Changes
    const unsub = useWorkflowEditorStore.subscribe((state, prev) => {
      if (!state.currentNode) return;
      if (state.currentNode.id !== node.id) return;

      setNodeOperationsLength(state.currentNode.operations.length);
    });

    return () => unsub();
  }, []);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        // Handle Delete Node
        if (e.key === "Delete") {
          setNodeIdToActOn({ nodeId: node.id, operation: "Delete" });
        }
      }}
      className={cn(
        "relative flex flex-col justify-center cursor-pointer items-center group min-w-[6rem] w-[calc(100%+2rem)] max-w-[13rem] py-4 gap-3 border-[3px] border-transparent select-none hover:opacity-95 transition-all duration-0",
        node.selected && "border-border/70 rounded-2xl"
      )}
    >
      {/* Button: Grab (Move Node) */}
      <Button
        variant={"ghost"}
        className={cn(
          "group-hover:flex hidden absolute top-1 right-0 cursor-grab !px-0 transition-all duration-300 justify-center items-center hover:bg-transparent bg-transparent"
        )}
        onClick={(e) => {
          console.log("Moving the node", node.id);
        }}
      >
        {/* Icon */}
        <GripVertical
          className="stroke-neutral-400 !size-7 !fill-neutral-400
          "
        />
      </Button>

      {/* All Content */}
      <div className="flex flex-col gap-2 w-full">
        {/* Icon & Logo */}
        <div className="justify-center items-center flex">
          {Icon && (
            <div
              className={cn(
                "flex size-28 rounded-full justify-center items-center outline-offset-[-1px] transition-all duration-150"
              )}
              style={{
                backgroundColor: node.iconColor,
                outline: `6px solid ${
                  node.selected || isHovered
                    ? hexToRgba(node.iconColor, 0.4)
                    : "transparent"
                }`,
              }}
            >
              <Icon className={"size-16 stroke-[1.3px] stroke-white"} />
            </div>
          )}
          {node?.logoPath && (
            <div className="relative h-24 w-24 mb-0 ">
              <Image
                src={node.logoPath}
                alt={`${node.label} logo`}
                className="select-none object-contain group-hover:opacity-80 transition-all duration-150"
                fill
              />
            </div>
          )}
        </div>

        {/* Content: Node Name, Handles, Operation Number, etc. */}
        <div className="flex flex-col justify-center items-center gap-0 w-full">
          {/* Node Name + Handles */}
          <div className="relative flex flex-1 items-center justify-center gap-1 w-max">
            {/* Handle Overlays */}

            {/* Left Handle */}
            <NodeHandle
              key={`${node.id}-input`}
              emit={emit}
              nodeId={node.id}
              side="input"
              throughput={node.inputs}
              iconClassName="-translate-x-[0.75rem]"
            />

            {/* Node Label */}
            <div className="flex justify-center max-w-fit min-w-[6rem]">
              <h6 className="text-center truncate font-bold text-neutral-900 text-base px-3">
                {node.label}
              </h6>
            </div>

            {/* Right Handle */}
            <NodeHandle
              key={`${node.id}-output`}
              emit={emit}
              nodeId={node.id}
              side="output"
              throughput={node.outputs}
              iconClassName="translate-x-[0.75rem]"
            />
          </div>

          {/* Rests... */}
          <div className="flex flex-1 items-center justify-center gap-1 pointer-events-none">
            <p className="w-full text-center line-clamp-1 font-normal text-neutral-500 text-sm">
              {nodeOperationsLength} Operation
              {nodeOperationsLength > 1 && "s"}
            </p>
            {/* Button: Duplicate */}
            <SimpleTooltip tooltipText="Duplicate" side="bottom">
              <Button
                variant={"ghost"}
                className={cn(
                  "flex cursor-pointer pointer-events-auto hover:opacity-70 translate-y-[0.16rem] active:scale-[0.9] h-fit !px-0 !py-0 transition-all duration-300 justify-center items-center hover:bg-transparent bg-transparent"
                )}
                onPointerDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setNodeIdToActOn({ nodeId: node.id, operation: "Duplicate" });
                }}
              >
                {/* Icon */}
                <Copy className="stroke-neutral-400" />
              </Button>
            </SimpleTooltip>
          </div>
        </div>
      </div>
    </button>
  );
};

export default CustomNode;
