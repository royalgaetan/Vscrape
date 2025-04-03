"use client";
import { fakeRuns } from "@/lib/fake_data";
import { RunItem } from "./w_sidebar_run_item";

const WRunsSidebar = () => {
  return (
    <div className="min-w-[18rem] max-w-[18rem] h-full bg-white border-r items-start justify-start relative">
      <div className="flex flex-col w-full h-full overflow-y-scroll overflow-x-clip">
        <h2 className="text-2xl font-semibold text-[#333] px-4 mb-3 mt-4">
          All Runs
        </h2>

        <div className="flex flex-col w-full max-h-full">
          {fakeRuns.length === 0 ? (
            <div className=" text-muted-foreground text-xs font-semibold flex flex-1 justify-center items-center min-h-44">
              No run found.
            </div> // Display "Not found" if no matches are found
          ) : (
            <div className="h-px">
              {fakeRuns
                .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime())
                .map((run) => {
                  return <RunItem key={run.runId} item={run} />;
                })}

              <div className="h-[5vh]"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WRunsSidebar;
