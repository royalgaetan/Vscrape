import { VsInput, VsOutput, Schemes } from "@vscrape/engine/src";
import { cn } from "@vscrape/ui";
import { Drag, Presets } from "rete-react-plugin";

const { RefSocket } = Presets.classic;

const NodeHandle = ({
  iconClassName,
  throughput,
  nodeId,
  side,
  socketKey,
  content,
  emit,
}: {
  iconClassName?: string;
  throughput: VsInput | VsOutput;
  socketKey: string;
  nodeId: string;
  content?: string;
  side: "input" | "output";
  emit: Presets.classic.RenderEmit<Schemes>;
}) => {
  return (
    <Drag.NoDrag>
      <div
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
        className={cn(
          iconClassName,
          "relative origin-center group-hover:scale-[1.8] inline-block transition-transform duration-100 ease-in-out cursor-grab"
        )}
        data-testid={`${side}`}
      >
        {content && (
          <div className="group-hover:visible invisible absolute top-[60%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[10] text-white font-medium scale-50 text-xs">
            {content}
          </div>
        )}
        <div className="relative z-[9]">
          <RefSocket
            name={`${side}-socket`}
            emit={emit}
            side={side}
            socketKey={socketKey}
            nodeId={nodeId}
            payload={throughput.socket}
          />
        </div>
      </div>
    </Drag.NoDrag>
  );
};

export default NodeHandle;
