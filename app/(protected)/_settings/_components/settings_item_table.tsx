import React from "react";
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
import { SessionType } from "../sessions/sessions_settings";
import { BillingHistoryType } from "../billing/billing_settings";
import { ConnectedAppType } from "../integrations/integration_settings";
import { format } from "date-fns";
import { ApiKeyType, WebhookType } from "@/lib/types";
import { isImage } from "@/lib/image_utils";
import Image from "next/image";
import { useCopy2Clipboard } from "@/hooks/useCopy2Clipboard";
import { camelToSentenceCase, maskApiKey } from "@/lib/string_utils";
import { cn } from "@/lib/utils";

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
  const isSecretKey = index === 2 && dataType === "apiKeys";

  return (
    <TableCell
      key={`${index.toString()}`}
      className={cn(
        "my-4 align-top break-all overflow-hidden",
        dataType === "sessions" && index === 0 && "w-7",
        index === 1 && "font-semibold",
        dataType === "billingHistory" && index === 1 && "max-w-32",
        dataType === "billingHistory" && index === 4 && "min-w-28",
        dataType === "connectedApps" && index === 0 && "w-fit",
        dataType === "connectedApps" && index === 1 && "align-middle",
        dataType === "apiKeys" && index === 0 && "w-4",
        dataType === "apiKeys" && index === 2 && "w-28",
        dataType === "apiKeys" && index === 2 && "max-w-28 mr-5",
        dataType === "webhooks" && index === 2 && "max-w-7",
        dataType === "webhooks" && index === 4 && "max-w-7"
      )}
    >
      {/* Handle val as Date */}
      {val instanceof Date && <DateCell date={val} />}
      {/* Handle val as Image */}
      {typeof val === "string" && isImage(val) && <ImageCell imagePath={val} />}

      {/* Handle val as Array */}
      {val instanceof Array && <ArrayCell array={val} />}

      {/* Handle val as Secret Key (e.g. API key) */}
      {!(val instanceof Array) &&
        !(val instanceof Date) &&
        typeof val === "string" &&
        !isImage(val) &&
        isSecretKey && <CopiableTextCell text={val} />}

      {/* Handle val as Text */}
      {typeof val === "string" && !isImage(val) && !isSecretKey && (
        <div className="flex flex-1 items-center gap-1 break-all overflow-hidden">
          <TextCell text={val} />
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

export const TextCell = ({ text }: { text: string }) => {
  return (
    <p
      className={cn(
        "line-clamp-2",
        text === "Active" && "text-emerald-700 font-semibold",
        text === "Paid" && "text-emerald-700 font-semibold",
        text === "Disabled" && "text-yellow-500 font-semibold",
        text === "Expired" && "text-red-700 font-semibold",
        text === "Failed" && "text-red-700 font-semibold",
        text === "Revoked" && "text-red-700 font-semibold"
      )}
    >
      {text}
    </p>
  );
};

export const DateCell = ({ date }: { date: Date }) => {
  return (
    <div className="flex flex-col justify-start">
      <div className="font-semibold text-[#333]">
        {format(date, "MMMM dd, yyyy")}
      </div>
      <div className="font-normal text-muted-foreground">
        {format(date, "HH:mm")}
      </div>
    </div>
  );
};

export const ImageCell = ({ imagePath }: { imagePath: string }) => {
  return (
    <div className="relative h-7 ml-3">
      <Image
        alt={imagePath}
        src={imagePath}
        className="select-none object-contain"
        fill
      />
    </div>
  );
};

export const ArrayCell = ({ array }: { array: Array<any> }) => {
  return (
    <div className="flex flex-col justify-start items-start gap-2">
      {array.map((line) => {
        return <div key={line}>◉ {line}</div>;
      })}
    </div>
  );
};

export const CopiableTextCell = ({ text }: { text: string }) => {
  const { textCopied, isTextBeingCopied, copy2Clipboard } = useCopy2Clipboard();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => copy2Clipboard(text)}
            disabled={isTextBeingCopied || textCopied !== null}
            className={cn(
              "font-semibold text-[#333] w-full line-clamp-2",
              textCopied === null && "cursor-pointer"
            )}
          >
            {isTextBeingCopied && (
              <Loader2 className="animate-spin text-neutral-700 size-4" />
            )}
            {!isTextBeingCopied && textCopied && (
              <div className="flex flex-1 gap-1">
                <Check className="size-4 stroke-neutral-700" />
                <span>Copied!</span>
              </div>
            )}
            {!isTextBeingCopied && textCopied === false && (
              <div className="flex flex-1 gap-1">
                <span>Failed to copy</span>
              </div>
            )}
            {!isTextBeingCopied && textCopied === null && (
              <div className="w-full text-start justify-start items-start line-clamp-2">
                {maskApiKey(text)}
              </div>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to copy</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
