import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { VsNode } from "@/lib/workflow_editor/node";
import { getVsNodeFromLabel } from "@/lib/workflow_editor/utils/w_utils";
import { useWorkflowEditorStore } from "@/stores/workflowStore";
import { VsSelector } from "@/lib/workflow_editor/selector";

export type Schemes = GetSchemes<
  VsNode,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
export type AreaExtra = ReactArea2D<Schemes>;

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
  const socket = new ClassicPreset.Socket("any");
  const selectorRef = useRef<VsSelector<any>>();

  // Store
  const toggleOptionbar = useWorkflowEditorStore((s) => s.toggleOptionbar);
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  const setNodeIdToDelete = useWorkflowEditorStore((s) => s.setNodeIdToDelete);
  // End Store

  const editorCursorPosition = useRef<{ x: number; y: number } | null>(null);
  const currentNodeRef = useRef(currentNode);
  const isTranslatingCurrentNode = useRef<boolean>();

  const handleNodeDeletion = async (nodeId: string) => {
    try {
      const editor = editorInstanceRef.current;
      if (!editor) return;
      await editor.removeNode(nodeId);
      if (currentNodeRef.current && currentNodeRef.current.id === nodeId) {
        toggleOptionbar(false);
      }
      setNodeIdToDelete(undefined);
    } catch (err) {
      console.log(`Cannot delete the node: ${nodeId}`);
    }
  };

  useEffect(() => {
    currentNodeRef.current = currentNode;
  }, [currentNode?.id]);

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

    // Listen to Workflow Editor Store
    const unsub = useWorkflowEditorStore.subscribe((state) => {
      // Listen to OptionBar Display State
      if (state.isWorkflowOptionbarOpen === false) {
        selectorRef.current && selectorRef.current?.unselectAll();
      }

      // Listen to node to delete
      if (state.nodeIdToDelete) {
        // Handle Node Deletion
        handleNodeDeletion(state.nodeIdToDelete);
      }
    });

    // Listen to Editor clicks!
    if (editorRef.current) {
      editorRef.current.addEventListener("pointerdown", handlePointerDown);
      editorRef.current.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      unsub();
      editorRef.current?.removeEventListener("pointerdown", handlePointerDown);
      editorRef.current?.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  useEffect(() => {
    // Add Selection Abilities: to Editor
    const editor = editorInstanceRef.current;
    const area = areaInstanceRef.current;
    selectorRef.current = new VsSelector((_, $) => {});

    const accumulating = AreaExtensions.accumulateOnCtrl();

    if (!editor || !area || !selectorRef.current) return;
    const selectableNodes = AreaExtensions.selectableNodes(
      area,
      selectorRef.current,
      {
        accumulating,
      }
    );

    area.addPipe((context) => {
      // Picked: Node "full" Clicked
      if (context.type === "nodepicked") {
        isTranslatingCurrentNode.current = false;
        selectableNodes.unselect(context.data.id);
      }
      // Translated: Node being moved...
      else if (context.type === "nodetranslated") {
        onNodeTranslated();
      }
      // Dragged: On Drag End (PointerUp)
      else if (context.type === "nodedragged") {
        const nodeIdDragged = context.data.id;
        const concernedNode = editor.getNode(nodeIdDragged);

        if (isTranslatingCurrentNode.current) {
          if (
            currentNodeRef.current &&
            currentNodeRef.current.id === nodeIdDragged
          ) {
            selectableNodes.select(nodeIdDragged, true);
          } else {
            selectableNodes.unselect(nodeIdDragged);
            if (!currentNodeRef.current) return;
            selectableNodes.select(currentNodeRef.current.id, true);
          }
        } else {
          if (
            currentNodeRef.current &&
            currentNodeRef.current.id === nodeIdDragged
          ) {
            selectableNodes.unselect(nodeIdDragged);
            toggleOptionbar(false);
          } else {
            selectableNodes.select(nodeIdDragged, true);
            toggleOptionbar(true, concernedNode);
          }
        }
      }

      return context;
    });
  }, [editorInstanceRef.current]);

  useEffect(() => {
    if (elementDropped) {
      onNodeAdded(elementDropped);
    }
  }, [elementDropped]);

  const onNodeAdded = async (droppedItem: DroppedToolItem) => {
    const editor = editorInstanceRef.current;
    const area = areaInstanceRef.current;
    const nodeToAdd = getVsNodeFromLabel(droppedItem.label);

    if (!editor || !area || !nodeToAdd || droppedItem.label.length < 1) return;
    await editor.addNode(nodeToAdd);

    const position = convertDropPositionToEditorCoords(
      droppedItem.position ?? { x: 0, y: 0 },
      area
    );

    await area.translate(nodeToAdd.id, position);
    console.log("@DEBUG", "Node Added", nodeToAdd.label);
  };

  const onNodeTranslated = useMemo(() => {
    return () => {
      isTranslatingCurrentNode.current = true;
    };
  }, []);

  const handlePointerDown = (e: PointerEvent) => {
    editorCursorPosition.current = { x: e.clientX, y: e.clientY };
  };
  const handlePointerUp = (e: PointerEvent) => {
    if (e.target !== e.currentTarget || !editorCursorPosition.current) return;
    const dx = Math.abs(e.clientX - editorCursorPosition.current.x);
    const dy = Math.abs(e.clientY - editorCursorPosition.current.y);
    const threshold = 5; // pixels

    if (dx < threshold && dy < threshold) {
      // Click
      toggleOptionbar(false);
    } else {
      // Pan / Drag
    }
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
        className="flex flex-1 w-full editor-background-dots"
      ></div>
    </div>
  );
};

export default WorkflowEditor;
