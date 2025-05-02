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
import DataInputViewer from "../data_input_viewer";
import { useWorkflowEditor } from "@/hooks/useWorkflowEditor";

const SelectInputDataDialog = () => {
  const [currentKeyTab, setCurrentKeyTab] = useState("");
  const {
    expandedInputDataKeys,
    setExpandedInputDataKeys,
    isDataInputDialogOpen,
    setIsDataInputDialogOpen,
    setDataInputSelected,
    inputTokenID,
    inputTokenValue,
    toggleDataInputDialog,
  } = useWorkflowEditor();

  useEffect(() => {
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
  }, [inputTokenValue]);

  return (
    <Dialog
      open={isDataInputDialogOpen}
      onOpenChange={(open) => setIsDataInputDialogOpen(open)}
    >
      <DialogContent
        onInteractOutside={(e) => setIsDataInputDialogOpen(false)}
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
                  <DataInputViewer
                    key={key}
                    object={{ [key]: values }}
                    onKeyToggled={(keyFullPath) => {
                      if (expandedInputDataKeys.includes(keyFullPath)) {
                        setExpandedInputDataKeys((prev) =>
                          prev.filter((p) => p != keyFullPath)
                        );
                      } else {
                        setExpandedInputDataKeys((prev) => [
                          ...prev,
                          keyFullPath,
                        ]);
                      }
                    }}
                    onObjectSelected={(obj) => {
                      setDataInputSelected(obj);
                      toggleDataInputDialog(false, inputTokenID);
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
