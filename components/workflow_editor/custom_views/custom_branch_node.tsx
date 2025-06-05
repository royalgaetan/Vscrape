import React, { useEffect, useState } from "react";
import { Presets } from "rete-react-plugin";
import Image from "next/image";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import NodeHandle from "./node_handle";
import { Schemes } from "@/app/(protected)/w/[workflowId]/editor/_components/w_editor";
import { useWorkflowEditorStore } from "@/stores/workflowStore";
import { hexToRgba } from "@/lib/colors_utils";
import { VsNode } from "@/lib/workflow_editor/classes/node";

const CustomBranchNode = ({
  data: node,
  emit,
}: {
  data: VsNode;
  emit: Presets.classic.RenderEmit<Schemes>;
}) => {
  const Icon = node.icon as LucideIcon;

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [nodeOutputs, setNodeOutputs] = useState(
    node ? node.outputs : undefined
  );

  // Store
  const setNodeIdToActOn = useWorkflowEditorStore((s) => s.setNodeIdToActOn);
  // End Store

  useEffect(() => {
    const sub = node.stream$().subscribe((newData) => {
      const outputs = (newData as VsNode).outputs;
      setNodeOutputs({ ...outputs });
    });

    return () => sub.unsubscribe();
  }, []);
  const isMergeNode = node.label.includes("Merge");

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
        "relative flex flex-col justify-center cursor-pointer items-center group min-w-[6rem] w-[calc(100%+2rem)] max-w-[13rem] gap-3 border-[3px] border-transparent select-none hover:opacity-95 transition-all duration-0",
        node.selected && "border-border/70 rounded-2xl"
      )}
    >
      {/* All Content */}
      <div className="flex flex-1 w-full gap-1 relative justify-center items-center">
        {/* Left Handle */}
        <div className="flex flex-col">
          {node.inputs &&
            Object.entries(node.inputs).map(([key, input]) => {
              return (
                <NodeHandle
                  key={key}
                  emit={emit}
                  nodeId={node.id}
                  side="input"
                  socketKey={key}
                  throughput={input}
                  iconClassName="mr-3 -translate-x-[0.5rem]"
                />
              );
            })}
        </div>

        {/* Icon & Logo */}
        <div className="flex items-center cursor-grab justify-center relative size-20">
          {/* Square */}
          <div
            className="absolute z-[9] rounded-sm rotate-45 size-20"
            style={{
              backgroundColor: node.iconColor,
              outline: `6px solid ${
                node.selected || isHovered
                  ? hexToRgba(node.iconColor, 0.4)
                  : "transparent"
              }`,
            }}
          ></div>
          {/* Icon/Logo */}
          <div className="flex absolute z-[10] place-items-center place-content-center">
            {Icon && (
              <Icon
                className={
                  "absolute size-[3.5rem] stroke-[1.8px] translate-y-1 stroke-white"
                }
              />
            )}
            {node?.logoPath && (
              <div className="relative h-[3.8rem] w-[3.8rem]">
                <Image
                  src={node?.logoPath}
                  alt={`${node.label} logo`}
                  className="select-none object-contain group-hover:opacity-80 transition-all duration-150"
                  fill
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Handles: All Branches */}
        <div
          className={cn(
            "flex flex-col w-[5.5rem] !min-h-[10rem] !max-h-fit z-[10] relative -top-[0] transition-all duration-100 ease-in-out group",
            isMergeNode ||
              (nodeOutputs && Object.entries(nodeOutputs).length < 3)
              ? "right-[4rem] -mr-16"
              : "right-11 -mr-9 "
          )}
        >
          {nodeOutputs &&
            Object.entries(nodeOutputs).map(([key, branch], idx) => {
              const outputsLength = Object.entries(nodeOutputs).length;
              const mid = Math.round(outputsLength / 2);
              const midRange = outputsLength % 2 === 1 ? [mid] : [mid, mid + 1];
              const gen = (): number | undefined => {
                const index = idx + 1;
                if (midRange.includes(index)) {
                  return 1;
                } else if (midRange.length === 1) {
                  return Math.abs(index - midRange[0]) + 1;
                } else if (midRange.length === 2) {
                  if (index < midRange[0]) {
                    return Math.abs(midRange[0] - index) + 1;
                  } else if (index > midRange[1]) {
                    return Math.abs(index - midRange[1]) + 1;
                  }
                }
              };
              const perc = 80 - (80 / midRange[0]) * ((gen() ?? 0) - 1);
              return (
                <div
                  key={key}
                  className="flex flex-1 items-center justify-start w-full h-fit place-content-center"
                  style={{
                    marginLeft: `${perc}px`,
                  }}
                >
                  <NodeHandle
                    key={key}
                    emit={emit}
                    content={!isMergeNode ? `${idx + 1}` : undefined}
                    nodeId={node.id}
                    side="output"
                    socketKey={key}
                    throughput={branch}
                    iconClassName="translate-x-2"
                  />
                </div>
              );
            })}
        </div>
      </div>
    </button>
  );
};

export default CustomBranchNode;
