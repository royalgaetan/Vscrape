"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createWorkflowFormSchema } from "@/lib/schema_validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { folders } from "@/lib/fake_data";
import { FolderPlusIcon, Loader2, Squircle } from "lucide-react";
import MultiSelect from "@/components/global/multi_select";
import { useAppDialog } from "@/hooks/useAppDialog";
import { SidebarIcon } from "@/components/global/app_sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { delay, generateUniqueId } from "@/lib/numbers_utils";
import { cn } from "@/lib/utils";

const CreateWorkflowDialog = ({ children }: { children: React.ReactNode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isCreateWorkflowDialogOpen, setCreateWorkflowDialogOpen } =
    useAppDialog();
  const createWorkflowForm = useForm<z.infer<typeof createWorkflowFormSchema>>({
    resolver: zodResolver(createWorkflowFormSchema),
    defaultValues: {
      name: "",
      folder: "",
    },
    mode: "onSubmit",
  });

  const createWorkflow = async () => {
    setIsSubmitting(true);
    // Validate Form
    const data = createWorkflowFormSchema.safeParse(
      createWorkflowForm.control._formValues
    );

    if (data.error) {
      data.error.errors.map((err, idx) =>
        createWorkflowForm.setError(
          err.path[0] as keyof z.infer<typeof createWorkflowFormSchema>,
          { message: err.message },
          { shouldFocus: idx === 0 }
        )
      );
    } else {
      await delay(2000);
      const workflowId = generateUniqueId({});
      setCreateWorkflowDialogOpen(false);
      redirect(`/w/${workflowId}/editor`);
    }

    setIsSubmitting(false);
  };

  return (
    <Dialog
      open={isCreateWorkflowDialogOpen}
      modal
      onOpenChange={(isOpen) => {
        setCreateWorkflowDialogOpen(isOpen);
        if (!isOpen) {
          createWorkflowForm.clearErrors();
          createWorkflowForm.reset();
        }
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent
        hideCloseButton
        className="flex flex-col gap-2 items-center w-[min(600px,90%)] h-auto md:px-10"
      >
        <DialogHeader>
          <DialogTitle className="text-3xl mt-4 mb-1 w-full text-center font-medium text-[#333]">
            Create a workflow
          </DialogTitle>
          <DialogDescription className="mb-7 text-muted-foreground text-xs font-medium text-center">
            <p>Design a unique workflow tailored to your needs...</p>
          </DialogDescription>
        </DialogHeader>
        <Form {...createWorkflowForm}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="space-y-4 py-4 flex flex-col items-center w-[25vw]"
          >
            {/* Name Field */}
            <FormField
              control={createWorkflowForm.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="w-[25vw] pb-2">
                    <FormControl>
                      <Input
                        {...field}
                        autoFocus
                        placeholder="Workflow name..."
                        autoComplete="name"
                        className="placeholder:font-semibold placeholder:text-muted-foreground/70"
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="pt-1" />
                  </FormItem>
                );
              }}
            />

            {/* Folder Field */}
            <div className="flex flex-1">
              {/* Select a folder */}
              <FormField
                control={createWorkflowForm.control}
                name="folder"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormControl>
                        <MultiSelect
                          triggerClassName="h-9 w-[22vw] flex flex-1 mb-1"
                          popoverAlignment="start"
                          popoverSide="bottom"
                          selectionMode="single"
                          popoverClassName="h-60 w-[22vw]"
                          label={
                            field.value.length > 0
                              ? field.value
                              : "Select a folder"
                          }
                          data={{
                            "Your folders": folders.map((f) => ({
                              label: f.folderName,
                              value: f.folderName,
                              icon: Squircle,
                              iconClassName: `stroke-none`,
                              iconColorHex: f.folderColor,
                            })),
                          }}
                          selectedValues={[field.value]}
                          handleSelect={(folderSelected) => {
                            field.onChange(folderSelected);
                          }}
                        />
                      </FormControl>
                      <FormMessage className="pt-1" />
                    </FormItem>
                  );
                }}
              />

              {/* Create a folder */}
              <div className="flex w-[3vw] justify-end">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"ghost"}
                        className={cn(
                          "flex w-9 transition-all duration-300 h-9 justify-center items-center gap-2 hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer mb-[0.9px] px-3 rounded-sm"
                        )}
                      >
                        {/* Icon */}
                        <SidebarIcon
                          defaultIcon={FolderPlusIcon}
                          isExpandable={false}
                          type="icon"
                          isSelected={undefined}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-neutral-700/95 text-white text-xs w-fit px-2 py-1">
                      <p>Create a new folder</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-1 justify-end mt-4 w-full">
              <Button
                type="submit"
                variant={"default"}
                size={"sm"}
                disabled={!createWorkflowForm.formState.isValid}
                className="w-32"
                onClick={() => createWorkflow()}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin text-white" />
                ) : (
                  <span className="flex gap-1">Create Workflow</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
