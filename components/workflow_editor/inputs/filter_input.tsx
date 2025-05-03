import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ExtendedOperationFilterType,
  OperationFilterType,
} from "@/lib/workflow_editor/types/w_types";
import { FieldLabel } from "@/app/(protected)/w/[workflowId]/editor/_components/w_optionbar_editor";
import { ListFilterPlusIcon } from "lucide-react";
import SingleFilterRow from "./filter_input_row";

const FilterInput = ({
  initialFilters,
  onBlur,
}: {
  initialFilters: ExtendedOperationFilterType[];
  onBlur: (newFilters: ExtendedOperationFilterType[]) => void;
}) => {
  const [localFilters, setLocalFilters] = useState<
    ExtendedOperationFilterType[]
  >([]);

  useEffect(() => {
    setLocalFilters(initialFilters);
  }, [initialFilters]);

  const generateEmpyFilter = (): OperationFilterType<"primitive/text"> => ({
    keyId: crypto.randomUUID(),
    filterCriteria: null,
    filterValue: null,
    filterType: null,
    inputID: "",
  });

  return (
    <div
      role="button"
      tabIndex={1}
      onBlur={() => onBlur(localFilters)}
      className="flex flex-col w-full !cursor-default"
    >
      <div className="flex flex-1 items-center px-4">
        <FieldLabel label={"Filters"} Icon={ListFilterPlusIcon} />
        <Button
          type="button"
          variant={"outline"}
          size={"sm"}
          className="w-fit text-xs text-neutral-500 py-1 px-2 h-6 rounded-sm"
          onClick={() => {
            setLocalFilters((prev) => [...prev, generateEmpyFilter()]);
          }}
        >
          + Add
        </Button>
      </div>

      {/* All Filters: list */}
      <div className="flex flex-col w-full mt-0">
        {localFilters.length === 0 ? (
          <div className=" text-muted-foreground text-xs font-semibold flex flex-1 justify-center items-center min-h-20">
            No filter yet.
          </div>
        ) : (
          <div>
            {Array.isArray(localFilters) &&
              localFilters.map((filter, idx) => {
                return (
                  <SingleFilterRow
                    initialFilter={filter}
                    onSave={(newFilterValue) => {
                      localFilters[idx] = newFilterValue;
                      setLocalFilters(localFilters);
                    }}
                    index={idx}
                    key={filter.keyId}
                    onDelete={() => {
                      setLocalFilters((prev) =>
                        prev.filter((_, id) => id !== idx)
                      );
                    }}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterInput;
