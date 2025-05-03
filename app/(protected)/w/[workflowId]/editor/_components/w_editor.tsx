import React, { useEffect, useRef, useState } from "react";
import { NodeEditor, GetSchemes, ClassicPreset } from "rete";
import CustomLoader from "@/components/global/loader";
import { createRoot } from "react-dom/client";
import { ReactPlugin, Presets, ReactArea2D } from "rete-react-plugin";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
  ConnectionPlugin,
  Presets as ConnectionPresets,
} from "rete-connection-plugin";
import { DroppedToolItem } from "@/lib/workflow_editor/types/w_types";
import CustomNode from "@/components/workflow_editor/custom_node";
import { convertDropPositionToEditorCoords } from "@/lib/workflow_editor/utils/convert_position_to_editor_coords";

export type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
export type AreaExtra = ReactArea2D<Schemes>;

export const NodeTest = () => {
  return <div>Node Text here 🥥</div>;
};

const WorkflowEditor = ({
  elementDropped,
}: {
  elementDropped?: DroppedToolItem;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const initialisedRef = useRef<boolean>(false);
  const [displayLoader, setDisplayLoader] = useState<boolean>(true);

  // Editor + Plugins refs
  const editorInstanceRef = useRef<NodeEditor<Schemes>>();
  const areaInstanceRef = useRef<AreaPlugin<Schemes, AreaExtra>>();
  const renderInstanceRef = useRef<ReactPlugin<Schemes, AreaExtra>>();
  const connectionInstanceRef = useRef<ConnectionPlugin<Schemes, AreaExtra>>();
  const socket = new ClassicPreset.Socket("socket");

  async function createEditor() {
    // Check if the editor div element has been loaded and Avoid double-initialization
    if (!editorRef.current || initialisedRef.current) return;
    initialisedRef.current = true;
    // Remove Loader
    setDisplayLoader(false);

    // Init Editor, Area, Render and Connections
    const editor = new NodeEditor<Schemes>();
    const area = new AreaPlugin<Schemes, AreaExtra>(editorRef.current);
    const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });
    const connection = new ConnectionPlugin<Schemes, AreaExtra>();

    // Add Presets and Custom UI to Render and Connections
    connection.addPreset(ConnectionPresets.classic.setup());
    render.addPreset(
      Presets.classic.setup({
        customize: {
          node() {
            return CustomNode;
          },
        },
      })
    );
    // AddCustomBackground(area);

    // Connect Editor to area and Area to Render and Connection
    editor.use(area);
    area.use(connection);
    area.use(render);

    // Restrict Zoom
    AreaExtensions.restrictor(area, {
      scaling: { min: 0.3, max: 1.3 },
      // translation: {
      //   top: -320,
      //   left: -320,
      //   bottom: 640,
      //   right: 640,
      // },
    });
    AreaExtensions.simpleNodesOrder(area);
    AreaExtensions.zoomAt(area, editor.getNodes());

    // Add Selection Abilities
    AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
      accumulating: AreaExtensions.accumulateOnCtrl(),
    });

    // Assign edior + plugins to Refs: to avoid re-rendering of their values
    editorInstanceRef.current = editor;
    areaInstanceRef.current = area;
    renderInstanceRef.current = render;
    connectionInstanceRef.current = connection;

    setTimeout(() => {
      // wait until nodes rendered because they dont have predefined width and height
      AreaExtensions.zoomAt(area, editor.getNodes());
    }, 10);

    return {
      destroy: () => area.destroy(),
    };
  }
  useEffect(() => {
    createEditor();

    if (editorInstanceRef.current) {
      // editorInstanceRef.current.vie
    }
  }, []);

  useEffect(() => {
    if (elementDropped) {
      onNodeAdded(elementDropped);
    }
  }, [elementDropped]);

  const onNodeAdded = async (droppedItem: DroppedToolItem) => {
    const editor = editorInstanceRef.current;
    const area = areaInstanceRef.current;

    if (!editor || !area || droppedItem.label.length < 1) return;

    const newNode = new ClassicPreset.Node(droppedItem.label);
    newNode.addControl(
      "custom",
      new ClassicPreset.InputControl("text", { initial: "custom" })
    );
    newNode.addInput("custom", new ClassicPreset.Input(socket));
    await editor.addNode(newNode);

    const position = convertDropPositionToEditorCoords(
      droppedItem.position ?? { x: 0, y: 0 },
      area
    );

    await area.translate(newNode.id, position);
    console.log("@DEBUG", "Node Added", newNode);
  };

  return (
    <div className="flex flex-col w-full h-full justify-center items-center z-[20] relative group/workflowEditorArena">
      {displayLoader && (
        <div className="bg-white w-full h-full z-10 absolute top-0">
          <CustomLoader text="Loading editor..." className="w-full h-full" />
        </div>
      )}

      <div
        ref={editorRef}
        className="h-full w-full editor-background-dots"
      ></div>
    </div>
  );
};

export default WorkflowEditor;
