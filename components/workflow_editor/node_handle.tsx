import { Schemes } from "@/app/(protected)/w/[workflowId]/editor/_components/w_editor";
import { cn } from "@/lib/utils";
import {
  VsNodeInputsType,
  VsNodeOutputsType,
} from "@/lib/workflow_editor/node";
import { Circle } from "lucide-react";
import { Drag, Presets } from "rete-react-plugin";

const { RefSocket } = Presets.classic;

const NodeHandle = ({
  iconClassName,
  throughput,
  nodeId,
  side,
  emit,
}: {
  iconClassName?: string;
  throughput: VsNodeInputsType | VsNodeOutputsType;
  nodeId: string;
  side: "input" | "output";
  emit: Presets.classic.RenderEmit<Schemes>;
}) => {
  return (
    <Drag.NoDrag>
      <div
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
        className={cn("flex flex-col gap-2 relative")}
      >
        <div
          className={cn(
            "-translate-x-[40%] -translate-y-[25%] pointer-events-none w-[4rem] h-16 items-center transition-all duration-100 ease-in-out absolute flex justify-end group"
          )}
        ></div>

        {Object.entries(throughput).map(
          ([key, throughput]) =>
            throughput && (
              <div
                key={key}
                className={cn(
                  iconClassName,
                  "origin-center group-hover:scale-[1.8] inline-block transition-transform duration-100 ease-in-out cursor-grab"
                )}
                data-testid={`${side}-${key}`}
              >
                <RefSocket
                  name={`${side}-socket`}
                  emit={emit}
                  side={side}
                  socketKey={key}
                  nodeId={nodeId}
                  payload={throughput.socket}
                />
              </div>
            )
        )}
      </div>
    </Drag.NoDrag>
  );
};

export default NodeHandle;
