import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";

const ConfirmationDialog = ({
  isOpen,
  LeadingIcon,
  title,
  description,
  additionalInfo,
  primaryBtnText,
  cancelBtnText,
  onConfirm,
}: {
  isOpen: boolean;
  LeadingIcon?: LucideIcon;
  title?: string;
  description: string;
  additionalInfo?: string;
  primaryBtnText?: string;
  cancelBtnText?: string;
  onConfirm: (hasConfirmed: boolean) => void;
}) => {
  const [internalState, setInternalState] = useState<boolean>(isOpen);

  useEffect(() => {
    setInternalState(isOpen);
  }, [isOpen]);

  return (
    <Dialog
      open={internalState}
      onOpenChange={(isOpen) => setInternalState(isOpen)}
    >
      <DialogContent className="w-[500px] px-6">
        <DialogHeader>
          <DialogTitle className="flex flex-1 gap-2">
            {LeadingIcon && (
              <LeadingIcon className="size-4 stroke-neutral-900" />
            )}
            <div className="flex flex-wrap text-neutral-900 font-semibold text-base">
              {title ?? "Just double-checking"}
            </div>
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-wrap text-neutral-600 text-sm">
              {description}
            </div>
            {additionalInfo && (
              <div className="flex flex-wrap text-muted-foreground text-xs ">
                {additionalInfo}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-1 mt-6 w-full justify-end items-center gap-2">
          <Button
            type="button"
            variant={"ghost"}
            size={"sm"}
            className="w-fit"
            onClick={() => {
              setInternalState(false);
              onConfirm(false);
            }}
          >
            {cancelBtnText ?? "Cancel"}
          </Button>
          <Button
            type="submit"
            variant={"default"}
            size={"sm"}
            className="w-fit"
            onClick={() => {
              setInternalState(false);
              onConfirm(true);
            }}
          >
            {primaryBtnText ?? "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
