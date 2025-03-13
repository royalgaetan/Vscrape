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
import { CircleSmallIcon, Loader2 } from "lucide-react";
import React from "react";
import { SessionType } from "../sessions/sessions_settings";
import { camelToSentenceCase, cn } from "@/lib/utils";
import { BillingHistoryType } from "../billing/billing_settings";
import { ConnectedAppType } from "../integrations/integration_settings";
import { format } from "date-fns";
import Image from "next/image";
import { isImage } from "@/lib/image";

const SettingItemTable = ({
  data,
  onRefresh,
  isLoading,
  dataType,
  tableCaption,
}: {
  dataType: "sessions" | "billingHistory" | "connectedApps" | "";
  data: SessionType[] | BillingHistoryType[] | ConnectedAppType[] | any[];
  isLoading: boolean;
  onRefresh: () => void;
  tableCaption: string;
}) => {
  return isLoading ? (
    <div className="h-44 w-full flex flex-1 justify-center items-center">
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
                // Format Date
                const finalValue =
                  val instanceof Date ? (
                    <div className="flex flex-col justify-start">
                      <div className="font-semibold text-[#333]">
                        {format(val, "MMMM dd, yyyy")}
                      </div>
                      <div className="font-normal text-muted-foreground">
                        {format(val, "HH:mm")}
                      </div>
                    </div>
                  ) : (
                    val
                  );
                return (
                  <TableCell
                    key={`${i.toString()}`}
                    className={cn(
                      "my-4",
                      dataType === "sessions" && i === 0 && "w-7",
                      dataType === "connectedApps" && i === 0 && "w-fit"
                    )}
                  >
                    {typeof finalValue === "string" && isImage(finalValue) ? (
                      // Handle Image Case
                      <div className="relative h-7 ml-3">
                        <Image
                          alt={finalValue}
                          src={finalValue}
                          className="select-none object-contain"
                          fill
                        />
                      </div>
                    ) : (
                      // Handle Text Case
                      <span className="flex flex-1 items-center gap-1">
                        <span
                          className={cn(
                            finalValue === "Active" &&
                              "text-emerald-700 font-semibold",
                            finalValue === "Expired" &&
                              "text-red-700 font-semibold"
                          )}
                        >
                          {finalValue}
                        </span>
                        {dataType === "sessions" &&
                          item.isActive &&
                          i === 1 && (
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
                      </span>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default SettingItemTable;
