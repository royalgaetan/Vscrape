"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fakeInputs } from "@/lib/fake_data";
import { humanizeKey } from "@/lib/string_utils";
import React, { useEffect, useState } from "react";
import { useWorkflowEditorStore } from "@/stores/workflowStore";
import SharedOutputsViewer from "./shared_outputs_viewer";

const SelectInputDataDialog = () => {
  const [currentKeyTab, setCurrentKeyTab] = useState("");

  // Store
  const isSharedOutputsDialogOpen = useWorkflowEditorStore(
    (s) => s.isSharedOutputsDialogOpen
  );
  const toggleSharedOutputsDialog = useWorkflowEditorStore(
    (s) => s.toggleSharedOutputsDialog
  );
  const inputToken = useWorkflowEditorStore((s) => s.inputToken);
  const setSharedOutputSelected = useWorkflowEditorStore(
    (s) => s.setSharedOutputSelected
  );
  // End Store

  useEffect(() => {
    const inputTokenValue = inputToken?.inputTokenValue;
    if (
      typeof inputTokenValue === "string" &&
      (inputTokenValue.toLocaleLowerCase().includes("lastnode") ||
        inputTokenValue.toLocaleLowerCase().includes("last node"))
    ) {
      setCurrentKeyTab("LastNode");
    } else if (
      typeof inputTokenValue === "string" &&
      (inputTokenValue.toLocaleLowerCase().includes("lastoperation") ||
        inputTokenValue.toLocaleLowerCase().includes("last operation"))
    ) {
      setCurrentKeyTab("LastOperation");
    } else {
      setCurrentKeyTab("Variables");
    }
  }, [inputToken?.inputTokenValue]);

  return (
    <Dialog
      open={isSharedOutputsDialogOpen}
      onOpenChange={(open) => toggleSharedOutputsDialog(open)}
    >
      <DialogContent
        onInteractOutside={() => toggleSharedOutputsDialog(false)}
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
              {Object.keys(fakeInputs).map((key) => {
                return (
                  <TabsTrigger
                    className="rounded-none pb-2 border-b-4 border-transparent data-[state=active]:border-primary font-medium focus-visible:ring-0 data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none"
                    key={key}
                    value={key}
                  >
                    {humanizeKey(key)}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </DialogTitle>

          <div className="pt-2 pb-6 min-h-[65vh] w-full">
            {/* Tab Content */}
            {Object.entries(fakeInputs).map(([key, values]) => {
              return (
                <TabsContent key={key} value={key} className="h-full mt-2 px-6">
                  <SharedOutputsViewer
                    key={key}
                    object={{ [key]: values }}
                    onObjectSelected={(obj) => {
                      setSharedOutputSelected(obj);
                      toggleSharedOutputsDialog(false, inputToken);
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
