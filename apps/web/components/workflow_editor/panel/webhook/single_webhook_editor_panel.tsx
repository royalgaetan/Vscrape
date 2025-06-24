import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { delay } from "@/lib/numbers_utils";
import { VsNode } from "@/lib/workflow_editor/classes/node";
import SimpleTooltip from "@/components/global/simple_tooltip";
import { Button } from "@/components/ui/button";
import { Check, Loader2, LucideIcon, Save, X } from "lucide-react";
import PanelHeader from "../panel_header";
import {
  httpMethodsList,
  WebhookBlock,
} from "@/lib/workflow_editor/classes/webhook_block";
import FieldLabel from "../field_label";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toCleanUrl } from "@/lib/string_utils";
import CustomSwitchInput from "../../inputs/custom_switch_input";
import { cn } from "@/lib/utils";
import { cloneDeep } from "lodash";
import {
  getInvalidInputs,
  insertOrRemoveIdsFromCurrentEditorErrors,
} from "@/lib/workflow_editor/utils/w_utils";

const SingleWebhookEditorPanel = ({
  initialNode,
  initialWebhookBlock,
  onBack,
  onSave,
  displayBackButton,
}: {
  initialNode: VsNode;
  initialWebhookBlock: WebhookBlock;
  onBack?: () => void;
  onSave: (block?: WebhookBlock) => void;
  displayBackButton?: boolean;
}) => {
  const [currentBlock, setCurrentBlock] = useState<WebhookBlock>(
    cloneDeep(initialWebhookBlock)
  );

  // State Values:
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [endpointURL, setEndpointURL] = useState<string>(
    currentBlock.endpointUrl
  );
  const [httpMethod, setHttpMethod] = useState<
    (typeof httpMethodsList)[number]
  >(currentBlock.httpMethod);
  const [authToken, setAuthToken] = useState(currentBlock.authToken);

  const [isSavingBlock, setIsSavingBlock] = useState(false);
  const [SavingBlockResultIcon, setSavingBlockResultIcon] = useState<
    LucideIcon | undefined
  >(undefined);

  const saveWebhookBlock = async () => {
    setErrorFields([]);
    setSavingBlockResultIcon(undefined);
    setIsSavingBlock(true);
    await delay(400);

    try {
      // Save entered values to original block
      currentBlock.endpointUrl = endpointURL;
      currentBlock.httpMethod = httpMethod;
      currentBlock.authToken = authToken;

      // Errors Checking
      errorChecker();

      setIsSavingBlock(false);
      setSavingBlockResultIcon(Check);
      await delay(150);
      setSavingBlockResultIcon(undefined);

      onSave(currentBlock);
    } catch (e) {
      toast.error("Invalid Webhook! Try again.", {
        position: "bottom-center",
        richColors: true,
      });
      console.log("Err", e);
      setIsSavingBlock(false);
      setSavingBlockResultIcon(X);
      await delay(1000);
      setSavingBlockResultIcon(undefined);
      return;
    }
  };

  const errorChecker = () => {
    // Get Invalid Inputs
    const errFields = getInvalidInputs({
      from: currentBlock,
      nodeId: currentBlock.id,
    });

    if (errFields.length > 0) {
      // Add the current "Webhook Id" + "Parent Node Id" among CurrentEditor errors list
      insertOrRemoveIdsFromCurrentEditorErrors({
        fromId: currentBlock.id,
        initialNodeId: initialNode.id,
        action: "add",
      });

      setErrorFields(errFields);
      console.log("errFields", errFields);
      throw new Error("Invalid Endpoint URL or Http Method");
    } else {
      // Remove the current "Webhook Id" + "Parent Node Id" among CurrentEditor errors list
      insertOrRemoveIdsFromCurrentEditorErrors({
        fromId: currentBlock.id,
        initialNodeId: initialNode.id,
        action: "remove",
      });
    }
  };

  return (
    <div className="flex flex-col w-full max-h-full relative">
      <div className="pb-10 flex flex-col w-full max-h-full overflow-x-clip overflow-y-scroll scrollbar-hide">
        {/* Header */}
        <div className="px-4 w-full">
          <PanelHeader
            nodeOrigin={initialNode}
            displayBackButton={displayBackButton}
            onBack={() => {
              if (onBack) {
                insertOrRemoveIdsFromCurrentEditorErrors({
                  fromId: currentBlock.id,
                  initialNodeId: initialNode.id,
                  action: "remove",
                });

                onBack();
              }
            }}
          />
        </div>

        <Separator className="my-2" />
        {/* WebhookBlock Params */}
        <div className="ml-2 mb-2 mt-2">
          <FieldLabel label="Webhook Settings" />
        </div>

        {/* Webhook Setting: Endpoint URL */}
        <div className="px-4 flex flex-col gap-1 mb-5">
          <Label className="text-xs text-neutral-500">Endpoint URL</Label>

          <Input
            onChange={(e) => {
              // Clean Error
              setErrorFields((prev) => prev.filter((f) => f !== "endpointURL"));
              //  Save Changes
              setEndpointURL(toCleanUrl(e.target.value));
            }}
            defaultValue={endpointURL}
            className={cn(
              "h-7",
              errorFields.includes("endpointURL") &&
                "border-destructive/70 ring-2 ring-destructive/60"
            )}
            placeholder={"Enter your endpoint name..."}
          />
        </div>

        {/* Webhook Setting: Http Method */}
        <div className="px-4 flex flex-col gap-1 mb-5">
          <Label className="text-xs text-neutral-500">Http Method</Label>

          <CustomSwitchInput
            hasError={errorFields.includes("httpMethod")}
            selectedValue={httpMethod}
            valuesToPickFrom={httpMethodsList.map((s) => s.toString())}
            onValueChange={(val) => {
              // Clean Error
              setErrorFields((prev) => prev.filter((f) => f !== "httpMethod"));
              //  Save Changes
              if (httpMethodsList.includes(val)) setHttpMethod(val);
            }}
          />
        </div>

        {/* Webhook Setting: Auth Token */}
        <div className="px-4 flex flex-col gap-1 mb-5">
          <Label className="text-xs text-neutral-500">Auth Token</Label>

          <Input
            onChange={(e) => {
              setAuthToken(e.target.value.trim());
            }}
            defaultValue={authToken}
            className="h-7"
            placeholder={"e.g., Bearer eyJhbGciOi..."}
          />
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="flex flex-col w-[var(--workflowPanelWidth)] !h-10 bg-white z-10 fixed bottom-[7vh]">
        {/* Action Buttons: Delete | Save Webhook */}
        <div className="flex flex-1 justify-end items-center py-1 px-3 border-t">
          <Button
            variant={"default"}
            disabled={isSavingBlock}
            className="rounded-2xl h-7 text-xs gap-1 px-3 duration-150"
            onClick={() => saveWebhookBlock()}
            // disabled={!onboardingForm.formState.isValid}
          >
            {isSavingBlock && SavingBlockResultIcon === undefined && (
              <Loader2 className="animate-spin stroke-white" />
            )}
            {SavingBlockResultIcon && !isSavingBlock && (
              <SavingBlockResultIcon className="stroke-white" />
            )}

            {!isSavingBlock && SavingBlockResultIcon === undefined && (
              <Save className="stroke-white" />
            )}
            <span className="">Save Webhook</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleWebhookEditorPanel;
