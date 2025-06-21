import React, { useEffect, useMemo, useRef, useState } from "react";
import { NodeEditor, GetSchemes } from "rete";
import CustomLoader from "@/components/global/loader";
import { createRoot } from "react-dom/client";
import { ReactPlugin, Presets, ReactArea2D } from "rete-react-plugin";
import { AreaPlugin, AreaExtensions, NodeView } from "rete-area-plugin";
import {
  ClassicFlow,
  ConnectionPlugin,
  Presets as ConnectionPresets,
  getSourceTarget,
  makeConnection,
} from "rete-connection-plugin";
import { DroppedToolItem } from "@/lib/workflow_editor/types/w_types";
import { convertDropPositionToEditorCoords } from "@/lib/workflow_editor/utils/convert_position_to_editor_coords";
import {
  buildAdjacency,
  entryPointNodesLabels,
  getVsNodeFromLabel,
  hasAlreadyEntryPoint,
  hasCycleInAdjacency,
  rebuildExecutionPlan,
} from "@/lib/workflow_editor/utils/w_utils";
import { useWorkflowEditorStore } from "@/stores/workflowStore";
import { VsConnection } from "@/lib/workflow_editor/classes/connections";
import CustomConnection from "@/components/workflow_editor/custom_views/custom_connection";
import EditorGettingStartedButton from "@/components/workflow_editor/buttons/getting_started_button";
import CustomNode from "@/components/workflow_editor/custom_views/custom_node";
import CustomSocket from "@/components/workflow_editor/custom_views/custom_socket";
import { VsNode } from "@/lib/workflow_editor/classes/node";
import { VsSelector } from "@/lib/workflow_editor/classes/selector";
import CustomBranchNode from "@/components/workflow_editor/custom_views/custom_branch_node";
import { toast } from "sonner";

export type Schemes = GetSchemes<VsNode, VsConnection<VsNode>>;
export type AreaExtra = ReactArea2D<Schemes>;

const WorkflowEditor = ({
  elementDropped,
  editorOnboardingState,
}: {
  elementDropped?: DroppedToolItem;
  editorOnboardingState: (isDisplayed: boolean) => void;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const initialisedRef = useRef<boolean>(false);
  const [displayLoader, setDisplayLoader] = useState<boolean>(true);
  const [displayEditorOnboarding, setDisplayEditorOnboarding] = useState(true);

  // Editor + Plugins refs
  const editorInstanceRef = useRef<NodeEditor<Schemes>>();
  const areaInstanceRef = useRef<AreaPlugin<Schemes, AreaExtra>>();
  const renderInstanceRef = useRef<ReactPlugin<Schemes, AreaExtra>>();
  const connectionInstanceRef = useRef<ConnectionPlugin<Schemes, AreaExtra>>();
  const selectorRef = useRef<VsSelector<any>>();

  // Store
  const toggleWorkflowPanel = useWorkflowEditorStore(
    (s) => s.toggleWorkflowPanel
  );
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  const setCurrentEditor = useWorkflowEditorStore((s) => s.setCurrentEditor);
  const setElementIdToActOn = useWorkflowEditorStore(
    (s) => s.setElementIdToActOn
  );
  // End Store

  const editorCursorPosition = useRef<{ x: number; y: number } | null>(null);
  const currentNodeRef = useRef(currentNode);
  const isTranslatingCurrentNode = useRef<boolean>();

  const handleNodeDeletion = async (nodeId: string) => {
    try {
      const editor = editorInstanceRef.current;
      const area = areaInstanceRef.current;
      if (!editor || !area) throw new Error("Can't load area or editor...");

      // Delete Related Connections
      const relatedConnections = editor
        .getConnections()
        .filter((c) => c.source === nodeId || c.target === nodeId);
      if (relatedConnections.length > 0) {
        relatedConnections.forEach((connection) => {
          editor.removeConnection(connection.id);
          area.removeConnectionView(connection.id);
        });
      }
      await editor.removeNode(nodeId);

      if (currentNodeRef.current && currentNodeRef.current.id === nodeId) {
        toggleWorkflowPanel(false);
      }
    } catch (err) {
      console.log(
        err instanceof Error ? err.message : `Cannot delete the node: ${nodeId}`
      );
    } finally {
      setElementIdToActOn(undefined);
    }
  };

  const handleNodeDuplication = async (nodeId: string) => {
    try {
      const editor = editorInstanceRef.current;
      const area = areaInstanceRef.current;
      if (!editor || !area) throw new Error("Can't load area or editor...");

      const nodeToDuplicate = await editor.getNode(nodeId);
      if (!nodeToDuplicate)
        throw new Error("Can't get old node from editor...");

      const duplicatedNode = nodeToDuplicate.duplicate();
      if (!duplicatedNode) throw new Error("Can't duplicate the node...");

      const res = await editor.addNode(duplicatedNode);
      if (!res) throw new Error("Can't add the node...");

      // Translate new node
      const oldNodeView = area.nodeViews.get(nodeToDuplicate.id);
      if (!oldNodeView) throw new Error("Can't get old node view...");

      const { x, y } = getDuplicatedNodePosition(oldNodeView);
      await area.translate(duplicatedNode.id, { x, y });

      console.log("@DEBUG", "Node duplicated", duplicatedNode.id);
    } catch (err) {
      console.log(
        err instanceof Error
          ? err.message
          : `Cannot duplicate the node: ${nodeId}`
      );
    } finally {
      setElementIdToActOn(undefined);
    }
  };

  const getDuplicatedNodePosition = (
    oldNodeView: NodeView
  ): { x: number; y: number } => {
    const randomX = Math.round(Math.random() * 300);
    const randomY = Math.round(Math.random() * 450);
    let xPosition =
      oldNodeView.position.x +
      oldNodeView.element.getBoundingClientRect().width +
      35 +
      randomX;
    let yPosition = oldNodeView.position.y + randomY;

    return { x: xPosition, y: yPosition };
  };

  const handleBranchDeletion = async (outputKey: string) => {
    try {
      const editor = editorInstanceRef.current;
      const area = areaInstanceRef.current;
      if (!editor || !area) throw new Error("Can't load area or editor...");

      // Get Connections
      const connectionsToDelete = editor
        .getConnections()
        .filter(
          (c) => c.sourceOutput === outputKey || c.targetInput === outputKey
        );

      if (connectionsToDelete.length > 0) {
        connectionsToDelete.forEach((connection) => {
          editor.removeConnection(connection.id);
          area.removeConnectionView(connection.id);
        });
      }
    } catch (err) {
      console.log(
        err instanceof Error
          ? err.message
          : `Cannot delete all associated connections from this Branch: ${outputKey}`
      );
    } finally {
      setElementIdToActOn(undefined);
    }
  };

  useEffect(() => {
    currentNodeRef.current = currentNode;
  }, [currentNode?.id]);

  async function createEditor() {
    // Check if the editor div element has been loaded and Avoid double-initialization
    if (!editorRef.current || initialisedRef.current) return;
    initialisedRef.current = true;

    // Init Editor, Area, Render and Connections
    const editor = new NodeEditor<Schemes>();
    const area = new AreaPlugin<Schemes, AreaExtra>(editorRef.current);
    const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });
    const connection = new ConnectionPlugin<Schemes, AreaExtra>();

    // Add Presets and Custom UI to Render and Connections
    connection.addPreset(
      () =>
        new ClassicFlow({
          makeConnection(from, to, context) {
            const [source, target] = getSourceTarget(from, to) || [null, null];
            const { editor } = context;
            if (!source || !target) return false;

            const sourceNode = editor.getNode(source.nodeId);
            const targetNode = editor.getNode(target.nodeId);
            if (!sourceNode || !targetNode) return false;

            editor.addConnection(
              new VsConnection(
                sourceNode,
                source.key as any,
                targetNode,
                target.key as any
              )
            );
            return true;
          },
        })
    );
    render.addPreset(
      Presets.classic.setup({
        customize: {
          node(data) {
            if (data.payload.blockType === "branch") return CustomBranchNode;
            else return CustomNode;
          },
          connection() {
            return CustomConnection;
          },
          socket() {
            return CustomSocket;
          },
        },
      })
    );
    // AddCustomBackground(area);

    // Connect Editor to area and Area to Render and Connection
    editor.use(area);
    area.use(connection);
    area.use(render);
    setCurrentEditor({ editor: editor });

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

      // Remove Loader
      setDisplayLoader(false);

      // Display Editor Onboarding
      setDisplayEditorOnboarding(true);
    }, 30);

    return {
      destroy: () => area.destroy(),
    };
  }

  useEffect(() => {
    createEditor();

    // Listen to Workflow Editor Store
    const unsub = useWorkflowEditorStore.subscribe((state) => {
      // Listen to WorkflowPanel Display State
      if (state.isWorkflowPanelOpen === false) {
        selectorRef.current && selectorRef.current?.unselectAll();
      }

      // Listen to node actions
      if (state.elementToActOn && state.elementToActOn.elementId) {
        // NODE CASE:
        if (state.elementToActOn.type === "Node") {
          if (state.elementToActOn.operation === "Delete") {
            // Handle Node Deletion
            handleNodeDeletion(state.elementToActOn.elementId);
          } else if (state.elementToActOn.operation === "Duplicate") {
            // Handle Node Duplication
            handleNodeDuplication(state.elementToActOn.elementId);
          }
        }

        // BRANCH CASE: Outputs
        // SPECIAL TO Node with Branches: If/Else, Branch
        else if (state.elementToActOn.type === "Output") {
          // Handle Node Branch Deletion
          if (state.elementToActOn.operation === "BranchDeleted") {
            handleBranchDeletion(state.elementToActOn.elementId);
          }
        }
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

    if (!editor || !area || !selectorRef.current) return;
    const selectableNodes = AreaExtensions.selectableNodes(
      area,
      selectorRef.current,
      {
        accumulating: AreaExtensions.accumulateOnCtrl(),
      }
    );

    area.addPipe((context) => {
      // On New Connection
      if (context.type === "connectioncreated") {
        // Rebuild the ExecutionPlan (to propagate Shared outputData)
        rebuildExecutionPlan();

        // Check for Cycles (D.A.G)
        const adj = buildAdjacency(editor);
        if (hasCycleInAdjacency(adj)) {
          editor.removeConnection(context.data.id);
          toast.error(
            "Oops! Looks like your workflow loops back on itself—We've removed your last connection.",
            {
              position: "bottom-center",
              richColors: true,
            }
          );
          return;
        }
      }
      // On Connection removed
      if (context.type === "connectionremoved") {
        // Rebuild the ExecutionPlan (to propagate Shared outputData)
        rebuildExecutionPlan();
      }

      // Picked: Node "fully" Clicked
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
            toggleWorkflowPanel(false);
          } else {
            selectableNodes.select(nodeIdDragged, true);
            toggleWorkflowPanel(true, concernedNode);
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

    // Check for Double EntryPoints
    if (
      entryPointNodesLabels().includes(droppedItem.label) &&
      hasAlreadyEntryPoint(editor)
    ) {
      toast.error("Only one starting point allowed in a workflow.", {
        position: "bottom-center",
        richColors: true,
      });
      return;
    }

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
      // toggleWorkflowPanel(false);
    } else {
      // Pan / Drag
    }
  };

  return (
    <div className="flex flex-col w-full h-full justify-center items-center z-[20] relative group/workflowEditorArena">
      {/* Loader */}
      {displayLoader && (
        <div className="bg-white w-full h-full z-10 absolute top-0">
          <CustomLoader text="Loading editor..." className="w-full h-full" />
        </div>
      )}

      {/* Get Started Button */}
      {!displayLoader && displayEditorOnboarding && (
        <div className="w-full h-full z-10 absolute top-0">
          <EditorGettingStartedButton
            onEntryPointSelected={(entryPointNode) => {
              if (entryPointNode) {
                onNodeAdded(entryPointNode);
              }
              // Dismiss Editor Onboarding
              setDisplayEditorOnboarding(false);
              editorOnboardingState(false);

              const editor = editorInstanceRef.current;
              if (!editor) return;
              setCurrentEditor({ editor, state: "rendered" });
            }}
          />
        </div>
      )}

      {/* Editor */}
      <div
        ref={editorRef}
        className="flex flex-1 w-full editor-background-dots"
      ></div>
    </div>
  );
};

export default WorkflowEditor;
