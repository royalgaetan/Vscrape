"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  humanizeKey,
} from "@vscrape/ui";
import {
  getPreviousInputData,
  useWorkflowEditorStore,
} from "@vscrape/engine/src";
import { getWorkflowDefinition } from "../../actions/get_workflow_definition";
import SharedOutputsViewer from "./shared_outputs_viewer";

const SelectInputDataDialog = () => {
  const [currentKeyTab, setCurrentKeyTab] = useState("");

  // Store
  const currentEditor = useWorkflowEditorStore((s) => s.currentEditor);
  const isSharedOutputsDialogOpen = useWorkflowEditorStore(
    (s) => s.isSharedOutputsDialogOpen
  );
  const toggleSharedOutputsDialog = useWorkflowEditorStore(
    (s) => s.toggleSharedOutputsDialog
  );
  const sharedOutputInputToken = useWorkflowEditorStore(
    (s) => s.sharedOutputInputToken
  );
  const sharedOutputInitialNodeId = useWorkflowEditorStore(
    (s) => s.sharedOutputInitialNodeId
  );
  const sharedOutputInitialItemId = useWorkflowEditorStore(
    (s) => s.sharedOutputInitialItemId
  );
  // End Store

  const previousInputs = getPreviousInputData({
    nodeId: sharedOutputInitialNodeId ?? "",
    itemId: sharedOutputInitialItemId ?? "",
    executionPlan: currentEditor.executionPlan ?? {},
    workflowDefinition: getWorkflowDefinition(currentEditor.editor) ?? {
      connections: [],
      nodes: [],
    },
  });
  useEffect(() => {
    const sharedOutputInputTokenValue = sharedOutputInputToken?.inputTokenValue;
    if (
      typeof sharedOutputInputTokenValue === "string" &&
      (sharedOutputInputTokenValue.toLocaleLowerCase().includes("lastnode") ||
        sharedOutputInputTokenValue.toLocaleLowerCase().includes("last node"))
    ) {
      setCurrentKeyTab("Last Node");
    } else if (
      typeof sharedOutputInputTokenValue === "string" &&
      (sharedOutputInputTokenValue.toLocaleLowerCase().includes("lastitem") ||
        sharedOutputInputTokenValue.toLocaleLowerCase().includes("last item"))
    ) {
      setCurrentKeyTab("Last Item");
    } else {
      setCurrentKeyTab("Variables");
    }
  }, [sharedOutputInputToken?.inputTokenValue]);

  return (
    <Dialog
      open={isSharedOutputsDialogOpen}
      onOpenChange={(open) =>
        toggleSharedOutputsDialog({ isSharedOutputsDialogOpen: open })
      }
    >
      <DialogContent
        onInteractOutside={() =>
          toggleSharedOutputsDialog({ isSharedOutputsDialogOpen: false })
        }
        className="h-[90vh] w-[50vw] flex flex-col max-w-none overflow-clip"
      >
        <Tabs
          value={currentKeyTab}
          onValueChange={(tab) => setCurrentKeyTab(tab)}
          className="flex flex-col w-full"
        >
          {/* Tab Header Buttons */}

          <DialogTitle className="mt-3 px-6 ">
            <div className="mb-5 flex flex-col">
              <DialogHeader className="font-semibold text-neutral-800 text-base mb-[2px]">
                Select an input data
              </DialogHeader>
              <DialogDescription className="text-muted-foreground/80 text-xs font-normal">
                Click on the data item you wish to reference.
              </DialogDescription>
            </div>
            <TabsList className="bg-transparent border-b-2 border-neutral-400/20 pb-0 pl-0 rounded-none justify-start w-full gap-3">
              {previousInputs.map((prev) => {
                return (
                  <TabsTrigger
                    className="rounded-none pb-2 border-b-4 border-transparent data-[state=active]:border-primary font-medium focus-visible:ring-0 data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none"
                    key={prev.label}
                    value={prev.label}
                  >
                    {humanizeKey(prev.label)}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </DialogTitle>

          <div className="pt-2 pb-6 min-h-[65vh] w-full">
            {/* Tab Content */}
            {previousInputs
              .filter((p) => p.label === currentKeyTab)
              .map((prev) => {
                return (
                  <TabsContent
                    key={prev.label}
                    value={prev.label}
                    className="h-full mt-2 px-6"
                  >
                    <SharedOutputsViewer
                      key={prev.label}
                      prevElements={prev.data}
                      onObjectSelected={(obj) => {
                        toggleSharedOutputsDialog({
                          isSharedOutputsDialogOpen: false,
                          sharedOutputSelectedItem: obj,
                          sharedOutputInputToken: sharedOutputInputToken,
                        });
                      }}
                    />
                  </TabsContent>
                );
              })}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SelectInputDataDialog;
