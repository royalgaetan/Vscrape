import React, { useEffect, useState } from "react";
import { Presets } from "rete-react-plugin";
import Image from "next/image";
import { Copy, GripVertical, LucideIcon } from "lucide-react";
import NodeHandle from "./node_handle";
import {
  cn,
  SimpleTooltip,
  Button,
  formatDurationFromMs,
  hexToRgba,
  capitalizeFirstLetter,
} from "@vscrape/ui";
import {
  VsNode,
  Schemes,
  useWorkflowEditorStore,
  WaitBlock,
  CronBlock,
  SetVariablesBlock,
  OperationBlock,
  FormBlock,
  entryPointNodesLabels,
} from "@vscrape/engine/src";
import { cloneDeep } from "lodash";

const CustomNode = ({
  data,
  emit,
}: {
  data: VsNode;
  emit: Presets.classic.RenderEmit<Schemes>;
}) => {
  const [node, setNode] = useState(data);

  const Icon = node.icon as LucideIcon;
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [nodeBlock, setNodeBlock] = useState(node.block);
  // Special to Wait Block
  const [nodeBlockDuration, setNodeBlockDuration] = useState(
    nodeBlock instanceof WaitBlock ? nodeBlock.durationMs : undefined
  );
  // Special to SetVariables Block
  const [variablesAssignations, setVariablesAssignations] = useState(
    nodeBlock instanceof SetVariablesBlock ? nodeBlock.variableAssignations : []
  );

  // Store
  const setElementIdToActOn = useWorkflowEditorStore(
    (s) => s.setElementIdToActOn
  );
  const currentEditor = useWorkflowEditorStore((s) => s.currentEditor);
  // End Store

  useEffect(() => {
    const sub = node.stream$().subscribe((newData: any) => {
      setNode(cloneDeep(newData));
      setNodeBlock(newData.block);
    });

    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    if (!node.block) return;
    const sub = (node.block as any).stream$().subscribe((newData: any) => {
      setNodeBlock(cloneDeep(newData));

      // Update Node DurationMs if it's a WaitBlock
      if (newData instanceof WaitBlock)
        setNodeBlockDuration(newData.durationMs);
      // Update Node Variable Assignations if it's a SetVariablesBlock
      if (newData instanceof SetVariablesBlock) {
        setVariablesAssignations(newData.variableAssignations);
      }
    });

    return () => sub.unsubscribe();
  }, []);

  const getNodeTerminology = () => {
    const getFullTerm = (term: string) => {
      const blocksLength =
        nodeBlock instanceof OperationBlock
          ? nodeBlock.items.length
          : nodeBlock instanceof FormBlock
            ? nodeBlock.fields.length
            : 0;

      return `${blocksLength} ${capitalizeFirstLetter(term)}${
        blocksLength > 1 ? "s" : ""
      }`;
    };
    switch (node.blockType) {
      case "operation":
        return getFullTerm("operation");
      case "formField":
        return getFullTerm("field");
      case "cron":
        return nodeBlock instanceof CronBlock ? "Scheduled" : "Not Scheduled";
      case "manual":
        return "Trigger";
      case "webhook":
        return "Listening...";
      case "wait":
        return nodeBlockDuration
          ? `Wait ${formatDurationFromMs(nodeBlockDuration)}`
          : "Not set";
      case "setVariables":
        return `${variablesAssignations.length} set${
          variablesAssignations.length > 1 ? "s" : ""
        }`;
      default:
        return "";
    }
  };

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        // Handle Delete Node
        if (e.key === "Delete") {
          setElementIdToActOn({
            type: "Node",
            elementId: node.id,
            operation: "Delete",
          });
        }
      }}
      className={cn(
        "relative flex flex-col justify-center cursor-pointer items-center rounded-3xl ring-4 ring-transparent group min-w-[6rem] w-[calc(100%+2rem)] max-w-[13rem] py-4 gap-3 border-[3px] border-transparent select-none hover:opacity-95 transition-all duration-0",
        node.selected && "border-border/70",
        currentEditor.errors?.has(node.id) &&
          "border-destructive/90 ring-destructive/40"
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
                    iconClassName="-translate-x-[0.75rem]"
                  />
                );
              })}

            {/* Node Label */}
            <div className="flex justify-center max-w-fit min-w-[6rem]">
              <h6 className="text-center truncate font-bold text-neutral-900 text-base px-3">
                {node.label}
              </h6>
            </div>

            {/* Right Handle */}
            {node.outputs &&
              Object.entries(node.outputs).map(([key, output]) => {
                return (
                  <NodeHandle
                    key={key}
                    emit={emit}
                    nodeId={node.id}
                    side="output"
                    socketKey={key}
                    throughput={output}
                    iconClassName="translate-x-[0.75rem]"
                  />
                );
              })}
          </div>

          {/* Rests... */}
          <div className="flex flex-1 items-center justify-center gap-1 pointer-events-none">
            <p className="w-full text-center line-clamp-1 font-normal text-neutral-500 text-sm">
              {getNodeTerminology()}
            </p>
            {/* Button: Duplicate */}
            {node.blockType !== "preview" &&
            node.blockType !== "setVariables" &&
            !entryPointNodesLabels().includes(node.label) ? (
              <SimpleTooltip tooltipText="Duplicate" side="bottom">
                <Button
                  variant={"ghost"}
                  className={cn(
                    "flex cursor-pointer pointer-events-auto hover:opacity-70 translate-y-[0.16rem] active:scale-[0.9] h-fit !px-0 !py-0 transition-all duration-300 justify-center items-center hover:bg-transparent bg-transparent"
                  )}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setElementIdToActOn({
                      type: "Node",
                      elementId: node.id,
                      operation: "Duplicate",
                    });
                  }}
                >
                  {/* Icon */}
                  <Copy className="stroke-neutral-400" />
                </Button>
              </SimpleTooltip>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default CustomNode;
