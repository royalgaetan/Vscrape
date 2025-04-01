import { Check, Copy, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import ReactJson from "react-json-view";
import { useCopy2Clipboard } from "@/hooks/useCopy2Clipboard";

const JSONPreviewDialog = ({
  children,
  jsonValue,
}: {
  children: React.ReactNode;
  jsonValue: any;
}) => {
  const { textCopied, isTextBeingCopied, copy2Clipboard } = useCopy2Clipboard();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-[90vh] w-[50vw] flex flex-col max-w-none overflow-clip">
        <DialogHeader>
          <DialogTitle>JSON Preview</DialogTitle>
        </DialogHeader>

        <div className="p-4 flex flex-1 max-w-full border border-border/80 bg-neutral-200/10 rounded-lg overflow-auto scrollbar-hide">
          <ReactJson enableClipboard={false} src={jsonValue} />
        </div>
        <DialogFooter className="justify-end">
          <Button
            onClick={() => copy2Clipboard(JSON.stringify(jsonValue, null, 4))}
            disabled={isTextBeingCopied}
            type="button"
            variant="secondary"
            className="flex gap-2"
          >
            {isTextBeingCopied && (
              <Loader2 className="animate-spin text-neutral-700 size-4" />
            )}
            {!isTextBeingCopied && textCopied && (
              <Check className="size-4 stroke-neutral-700" />
            )}
            {!isTextBeingCopied && textCopied === false && <X />}
            {!isTextBeingCopied && textCopied === null && <Copy />}
            Copy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JSONPreviewDialog;
