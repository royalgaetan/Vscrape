import { trashItems } from "@/lib/fake_data";

import React from "react";
import VersionItem from "./w_sidebar_version_item";

const WVersionsSidebar = ({
  selectedWorkflow,
  onVersionSelected,
}: {
  selectedWorkflow?: string;
  onVersionSelected: (versionId: string) => void;
}) => {
  return (
    <div className="min-w-[18rem] max-w-[18rem] h-full bg-white border-r items-start justify-start relative">
      <div className="flex flex-col w-full h-full overflow-y-scroll overflow-x-clip scrollbar-hide">
        <h2 className="text-2xl font-semibold text-[#333] px-4 mb-3 mt-4">
          Old Versions
        </h2>

        <div className="flex flex-col w-full max-h-full">
          {trashItems.length === 0 ? (
            <div className=" text-muted-foreground text-xs font-semibold flex flex-1 justify-center items-center min-h-44">
              No old version found.
            </div> // Display "Not found" if no matches are found
          ) : (
            <div className="h-px flex flex-col">
              {trashItems.map((item) => {
                return (
                  <button
                    key={item.title}
                    onClick={() => onVersionSelected(item.title)}
                    className="inset"
                  >
                    <VersionItem
                      item={item}
                      isSelected={item.title === selectedWorkflow}
                    />
                  </button>
                );
              })}

              <div className="h-[5vh]"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WVersionsSidebar;
