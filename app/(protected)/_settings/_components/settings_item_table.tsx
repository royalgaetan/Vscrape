import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, CircleSmallIcon, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { SessionType } from "../sessions/sessions_settings";
import {
  camelToSentenceCase,
  cn,
  copyToClipboard,
  delay,
  maskApiKey,
} from "@/lib/utils";
import { BillingHistoryType } from "../billing/billing_settings";
import { ConnectedAppType } from "../integrations/integration_settings";
import { format } from "date-fns";
import { ApiKeyType, WebhookType } from "@/lib/types";
import { isImage } from "@/lib/image";
import Image from "next/image";

const SettingItemTable = ({
  data,
  onRefresh,
  isLoading,
  dataType,
  tableCaption,
}: {
  dataType:
    | "sessions"
    | "billingHistory"
    | "connectedApps"
    | "apiKeys"
    | "webhooks"
    | "";
  data:
    | SessionType[]
    | BillingHistoryType[]
    | ConnectedAppType[]
    | ApiKeyType[]
    | WebhookType[]
    | any[];
  isLoading: boolean;
  onRefresh: () => void;
  tableCaption: string;
}) => {
  return isLoading ? (
    <div className="h-44 flex flex-1 justify-center items-center">
      <Loader2 className="animate-spin text-neutral-500" />
    </div>
  ) : (
    <Table>
      <TableCaption className="text-muted-foreground text-xs">
        <span>{tableCaption}</span>
        <Button
          className="text-primary hover:opacity-80 hover:no-underline px-0 py-0 ml-1 text-xs"
          variant={"link"}
          onClick={() => onRefresh()}
        >
          Refresh
        </Button>
      </TableCaption>
      <TableHeader className="cursor-pointer select-none">
        <TableRow className="">
          {data.length > 1 &&
            Object.keys(data[0])
              .filter((p) => p !== "isActive")
              .map((property) => {
                return (
                  <TableHead
                    key={property}
                    className={cn(
                      dataType === "sessions" &&
                        property === "deviceType" &&
                        "w-7"
                    )}
                  >
                    {property !== "deviceType" &&
                      property !== "appLogoPath" &&
                      property !== "icon" &&
                      camelToSentenceCase(property)}
                  </TableHead>
                );
              })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, idx) => {
          return (
            <TableRow key={`${idx.toString()}`} className="text-xs h-12">
              {Object.values(item as typeof data).map((val, i) => {
                return (
                  <CustomTableCell
                    key={val}
                    dataType={dataType}
                    index={i}
                    item={item}
                    val={val}
                  />
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const CustomTableCell = ({
  index,
  dataType,
  val,
  item,
}: {
  index: number;
  dataType: string;
  val: any;
  item: any;
}) => {
  const [isSecretKeyCopied, setSecretKeyCopied] = useState<boolean | null>(
    null
  );
  const [isSecretKeyBeingCopied, setSecretBeingKeyCopied] =
    useState<boolean>(false);

  const handleSecretkeyCopiedToClipboard = async (secretKey: string) => {
    setSecretBeingKeyCopied(true);
    const res = await copyToClipboard(secretKey);
    setSecretKeyCopied(res);
    await delay(200);
    setSecretBeingKeyCopied(false);
    await delay(1000);
    setSecretKeyCopied(null);
  };

  const isSecretKey = index === 2 && dataType === "apiKeys";
  return (
    <TableCell
      key={`${index.toString()}`}
      className={cn(
        "my-4 align-top break-all overflow-hidden",
        dataType === "sessions" && index === 0 && "w-7",
        index === 1 && "font-semibold",
        dataType === "connectedApps" && index === 0 && "w-fit",
        dataType === "connectedApps" && index === 1 && "align-middle",
        dataType === "apiKeys" && index === 0 && "w-4",
        dataType === "apiKeys" && index === 2 && "w-28",
        dataType === "webhooks" && index === 2 && "max-w-7",
        dataType === "webhooks" && index === 4 && "max-w-7",
        dataType === "apiKeys" && index === 2 && "max-w-28 mr-5"
      )}
    >
      {/* Handle val as Date */}
      {val instanceof Date && (
        <div className="flex flex-col justify-start">
          <div className="font-semibold text-[#333]">
            {format(val, "MMMM dd, yyyy")}
          </div>
          <div className="font-normal text-muted-foreground">
            {format(val, "HH:mm")}
          </div>
        </div>
      )}
      {/* Handle val as Image */}
      {typeof val === "string" && isImage(val) && (
        <div className="relative h-7 ml-3">
          <Image
            alt={val}
            src={val}
            className="select-none object-contain"
            fill
          />
        </div>
      )}

      {/* Handle val as Array */}
      {val instanceof Array && (
        <div className="flex flex-col justify-start items-start gap-2">
          {val.map((line) => {
            return <div key={line}>◉ {line}</div>;
          })}
        </div>
      )}

      {/* Handle val as Secret Key (e.g. API key) */}
      {!(val instanceof Array) &&
        !(val instanceof Date) &&
        typeof val === "string" &&
        !isImage(val) &&
        isSecretKey && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleSecretkeyCopiedToClipboard(val)}
                  disabled={
                    isSecretKeyBeingCopied || isSecretKeyCopied !== null
                  }
                  className={cn(
                    "font-semibold text-[#333] w-full line-clamp-2",
                    isSecretKeyCopied === null && "cursor-pointer"
                  )}
                >
                  {isSecretKeyBeingCopied && (
                    <Loader2 className="animate-spin text-neutral-700 size-4" />
                  )}
                  {!isSecretKeyBeingCopied && isSecretKeyCopied && (
                    <div className="flex flex-1 gap-1">
                      <Check className="size-4 stroke-neutral-700" />
                      <span>Copied!</span>
                    </div>
                  )}
                  {!isSecretKeyBeingCopied && isSecretKeyCopied === false && (
                    <div className="flex flex-1 gap-1">
                      <span>Failed to copy</span>
                    </div>
                  )}
                  {!isSecretKeyBeingCopied && isSecretKeyCopied === null && (
                    <div className="w-full text-start justify-start items-start line-clamp-2">
                      {maskApiKey(val)}
                    </div>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to copy</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

      {/* Handle val as Text */}
      {typeof val === "string" && !isImage(val) && !isSecretKey && (
        <div className="flex flex-1 items-center gap-1 break-all overflow-hidden">
          <p
            className={cn(
              "line-clamp-2",
              val === "Active" && "text-emerald-700 font-semibold",
              val === "Paid" && "text-emerald-700 font-semibold",
              val === "Disabled" && "text-yellow-500 font-semibold",
              val === "Expired" && "text-red-700 font-semibold",
              val === "Failed" && "text-red-700 font-semibold",
              val === "Revoked" && "text-red-700 font-semibold"
            )}
          >
            {val}
          </p>
          {dataType === "sessions" && item.isActive && index === 1 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleSmallIcon className="fill-primary size-3 stroke-primary" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Current session</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}

      {/* Handle val as other types */}
      {typeof val !== "string" &&
        !(val instanceof Array) &&
        !(val instanceof Date) &&
        !isImage(val) && <div>{val}</div>}
    </TableCell>
  );
};

export default SettingItemTable;
