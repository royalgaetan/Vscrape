import React, { useEffect, useState } from "react";
import { WebhookBlock, useWorkflowEditorStore } from "@vscrape/engine/src";
import { useCopy2Clipboard, cn, SimpleTooltip, Button } from "@vscrape/ui";
import { Check, Copy, Loader2, PenLineIcon, Webhook, X } from "lucide-react";
import { toast } from "sonner";

const WebhookBlockList = ({
  onWebhookEdit,
}: {
  onWebhookEdit: (webhookBlock: WebhookBlock) => void;
}) => {
  // Store:
  const currentNode = useWorkflowEditorStore((s) => s.currentNode);
  // End Store
  const [webhookBlock, setWebhookBlock] = useState(
    currentNode ? (currentNode.block as WebhookBlock) : undefined
  );

  // States
  const {
    textCopied: endpointUrlCopied,
    isTextBeingCopied: isEndpointUrlBeingCopied,
    copy2Clipboard,
  } = useCopy2Clipboard();

  useEffect(() => {
    if (!currentNode) return;
    const sub = currentNode.stream$().subscribe((newData: any) => {
      setWebhookBlock(newData.block as WebhookBlock);
    });

    return () => sub.unsubscribe();
  }, []);

  if (
    !currentNode ||
    !webhookBlock ||
    !(webhookBlock instanceof WebhookBlock)
  ) {
    return <div></div>;
  }

  return (
    // Here Blocks represents: Webhook
    <div>
      <div
        key={webhookBlock.id}
        className="relative group/webhookBlock flex flex-col w-full px-3 py-4 border border-border overflow-clip rounded-md bg-neutral-100/20 transition-all duration-200"
      >
        {/* Background Icon */}
        <div className="absolute top-0 pointer-events-none z-[9]">
          <Webhook className="size-24 rotate-[32deg] translate-x-[10rem] -translate-y-1 stroke-neutral-200/50 " />
        </div>

        {/* Detail */}
        <div className="flex flex-col relative z-10">
          <div className="w-full text-base font-semibold text-[#333] line-clamp-1 mb-1">
            Listening...
          </div>
          {/* Detail: endpoint URL */}
          <div className="flex flex-1 gap-1 mt-2 text-muted-foreground text-xs font-light mb-[2px]">
            <div className="min-w-fit flex">At URL: </div>
            <button
              className="flex flex-1 gap-1 hover:opacity-70 transition-all duration-200 font-medium"
              onClick={async () => {
                const res = await copy2Clipboard(
                  `${process.env.NEXT_PUBLIC_WEBHOOK_URL}/${webhookBlock.endpointUrl}`
                );
                if (res) {
                  toast.success("Webhook URL Copied!", {
                    position: "bottom-center",
                    richColors: true,
                  });
                }
              }}
              disabled={isEndpointUrlBeingCopied}
            >
              <div className="inline-block text-left !line-clamp-1 max-w-[10.5rem]">
                {`webhooks/${webhookBlock.endpointUrl}`}
              </div>
              <div className="flex -translate-y-[2.5px] !size-[0.97rem]">
                {isEndpointUrlBeingCopied && (
                  <Loader2 className="animate-spin text-neutral-700" />
                )}
                {!isEndpointUrlBeingCopied && endpointUrlCopied && (
                  <Check className="stroke-neutral-700" />
                )}
                {!isEndpointUrlBeingCopied && endpointUrlCopied === false && (
                  <X />
                )}
                {!isEndpointUrlBeingCopied && endpointUrlCopied === null && (
                  <Copy />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Detail: Http Method */}
        <div className="flex flex-1 gap-1 mt-2 text-muted-foreground text-xs font-light mb-[2px]">
          <div className="min-w-fit flex">Method: </div>
          <div
            className={cn(
              "flex items-center justify-center px-3 h-fit text-xs line-clamp-1 cursor-pointer font-bold border rounded-sm",
              webhookBlock.httpMethod === "GET"
                ? "text-emerald-700/70 border-emerald-700/70"
                : "text-red-700/70 border-red-700/70"
            )}
          >
            <span className="!scale-50">{webhookBlock.httpMethod}</span>
          </div>
        </div>

        {/* Detail: Auth Token */}
        {webhookBlock.authToken && (
          <div className="flex flex-1 gap-1 mt-2 text-muted-foreground text-xs font-light mb-[2px]">
            <div className="min-w-fit flex">Auth Token: </div>
            <div
              className={
                "w-max h-fit text-xs truncate line-clamp-1 cursor-pointer font-medium"
              }
            >
              {"*".repeat(
                webhookBlock.authToken.length > 16
                  ? 16
                  : webhookBlock.authToken.length
              )}
            </div>
          </div>
        )}

        {/* Action Buttons: Edit */}
        <div className="!h-5 relative z-10">
          <div className="group-hover/webhookBlock:visible invisible flex flex-1 gap-1 justify-end items-center pt-1">
            {/* Edit */}
            <SimpleTooltip tooltipText="Edit Webhook">
              <Button
                variant={"ghost"}
                className={cn(
                  "!h-6 px-2 flex items-center justify-center hover:bg-neutral-200/60 bg-transparent text-neutral-500 cursor-pointer rounded-sm transition-all duration-300"
                )}
                onClick={() => {
                  onWebhookEdit(webhookBlock);
                }}
              >
                <PenLineIcon className="!size-3" /> Edit Webhook
              </Button>
            </SimpleTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebhookBlockList;
