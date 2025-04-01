"use client";
import { Separator } from "@/components/ui/separator";
import { fakePhases, fakeRuns } from "@/lib/fake_data";
import { RunItemType, PhaseItemType } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import {
  BadgeInfo,
  CalendarClock,
  CheckCircle2Icon,
  CircleOff,
  CircleXIcon,
  Clock,
  Coins,
  Loader2,
} from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import PhaseDetail from "../_components/w_phase_details";
import { waitForElementById } from "@/lib/dom_utils";
import { capitalizeFirstLetter } from "@/lib/string_utils";
import RunDetailItemLine from "../_components/w_run_detail_itemline";
import PhaseItemLine from "../_components/w_phase_itemline";

const WRunSinglePage = () => {
  const { runId } = useParams();
  const pathname = usePathname();
  const [currentRun, setCurrentRun] = useState<RunItemType>();
  const [selectedPhase, setSelectedPhase] = useState<string>();

  useEffect(() => {
    if (runId) {
      const runFound = fakeRuns.find((r) => r.runId === runId);
      runFound && setCurrentRun(runFound);
    }

    waitForElementById("phasesListContainer").then((el) => {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
    });
  }, [pathname]);

  return (
    <div className="flex flex-1 h-full w-full justify-center items-center">
      {/* Run Box! Details & Phases */}
      <div className="rounded-3xl border flex w-[50vw] h-[75vh] overflow-clip">
        {!currentRun && (
          <div className="flex flex-1 justify-center items-center">
            <div className="flex flex-col justify-center items-center text-center">
              <CircleOff className="stroke-neutral-400 size-10 mb-2" />
              <p className="text-neutral-500 font-normal text-sm">
                <b> Invalid or non-existant Run</b>
                <br />
                Try another one
              </p>
            </div>
          </div>
        )}

        {currentRun && (
          <div className="flex flex-1">
            {/* Run Sidebar: Phases List & Status  */}
            <div className="w-[20vw] flex flex-col h-full bg-[#F8F8F7] pt-3 border-r">
              {/* Status Infos */}
              <div className="mt-2 px-4">
                <h4 className="font-semibold text-base text-neutral-800">
                  Run Details
                </h4>
                <p className="text-xs font-normal mb-2">
                  <b>ID: </b>
                  {runId}
                </p>
                <Separator />

                <div className="flex flex-col gap-2 mt-4 mb-2">
                  <RunDetailItemLine
                    LeadingIcon={BadgeInfo}
                    label={"Status"}
                    detail={
                      <div className="flex justify-end">
                        {currentRun.status === "running" && (
                          <Loader2 className="animate-spin stroke-neutral-500 size-4" />
                        )}
                        {currentRun.status === "success" && (
                          <CheckCircle2Icon className="stroke-green-500 size-4" />
                        )}
                        {currentRun.status === "failed" && (
                          <>
                            <CircleXIcon className="stroke-red-500 size-4 mr-1" />
                            <span>Failed</span>
                          </>
                        )}
                        {currentRun.status === "paused" && "Paused"}
                      </div>
                    }
                  />

                  <RunDetailItemLine
                    LeadingIcon={CalendarClock}
                    label={"Started At"}
                    detail={capitalizeFirstLetter(
                      formatDistanceToNow(currentRun.startedAt, {
                        addSuffix: true,
                      })
                    )}
                  />

                  <RunDetailItemLine
                    LeadingIcon={Clock}
                    label={"Duration"}
                    detail={"3 min"}
                  />

                  <RunDetailItemLine
                    LeadingIcon={Coins}
                    label={"Credit Consumed"}
                    detail={currentRun.creditConsumed}
                  />
                </div>

                <h4 className="font-semibold text-base text-neutral-800 mt-8">
                  Phases
                </h4>
                <Separator />
              </div>

              {/* Phases List */}
              <div
                id="phasesListContainer"
                className="w-full scrollbar-hide overflow-y-scroll"
              >
                {fakePhases.length === 0 ? (
                  <div className=" text-muted-foreground text-xs font-semibold flex flex-1 justify-center items-center max-h-36">
                    No phase runned.
                  </div> // Display "Not found" if no matches are found
                ) : (
                  <div className="pl-4 pt-2 pr-1 w-full">
                    {fakePhases.map((phase, idx) => {
                      return (
                        <PhaseItemLine
                          onClick={() => {
                            if (selectedPhase === phase.title) {
                              setSelectedPhase(undefined);
                            } else {
                              setSelectedPhase(phase.title);
                            }
                          }}
                          key={`${runId}_${phase.title}`}
                          phase={phase}
                          position={idx + 1}
                          isSelected={selectedPhase === phase.title}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Run Main Content: Single Phase Detail */}

            <PhaseDetail
              phase={fakePhases.find((p) => p.title === selectedPhase)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WRunSinglePage;
