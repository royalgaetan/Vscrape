import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ExtendedOperationFilterType,
  OperationFilterType,
} from "@/lib/workflow_editor/types/w_types";
import { ListFilterPlusIcon } from "lucide-react";
import SingleFilterRow from "./filter_input_row";
import FieldLabel from "../panel/field_label";

const FilterInput = ({
  initialFilters,
  onBlur,
  onError,
  isEditting,

  nodeId,
  itemId,
}: {
  initialFilters: ExtendedOperationFilterType[];
  onBlur: (newFilters: ExtendedOperationFilterType[]) => void;
  onError?: (val: boolean) => void;
  isEditting?: (state: boolean) => void;

  nodeId?: string;
  itemId?: string;
}) => {
  const [localFilters, setLocalFilters] = useState<
    ExtendedOperationFilterType[]
  >([]);

  useEffect(() => {
    setLocalFilters(initialFilters);
  }, [initialFilters]);

  const [currentlyEdittedFilter, setCurrentlyEdittedFilter] =
    useState<number>();
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
          disabled={typeof currentlyEdittedFilter === "number"}
          type="button"
          variant={"outline"}
          size={"sm"}
          className="w-fit text-xs text-neutral-500 py-1 px-2 h-6 rounded-sm"
          onClick={() => {
            const newArr = localFilters
              ? [...localFilters, generateEmpyFilter()]
              : [generateEmpyFilter()];
            setCurrentlyEdittedFilter(newArr.length - 1);
            setLocalFilters(newArr);
          }}
        >
          + Add
        </Button>
      </div>

      {/* All Filters: list */}
      <div className="flex flex-col w-full mt-0">
        {!localFilters || localFilters.length === 0 ? (
          <div className=" text-muted-foreground text-xs font-semibold flex flex-1 justify-center items-center min-h-20">
            No filter yet.
          </div>
        ) : (
          <div>
            {Array.isArray(localFilters) &&
              localFilters.map((filter, idx) => {
                return (
                  <SingleFilterRow
                    nodeId={nodeId}
                    itemId={itemId}
                    onError={(err) => {
                      onError && onError(err);
                    }}
                    initialFilter={filter}
                    onEdit={() => {
                      setCurrentlyEdittedFilter(idx);
                      isEditting && isEditting(true);
                    }}
                    onSave={(newFilterValue) => {
                      localFilters[idx] = newFilterValue;
                      setLocalFilters(localFilters);
                      setCurrentlyEdittedFilter(undefined);

                      isEditting && isEditting(false);
                    }}
                    initialIsEditing={currentlyEdittedFilter === idx}
                    canDelete={currentlyEdittedFilter === undefined}
                    canEdit={currentlyEdittedFilter === undefined}
                    index={idx}
                    key={filter.keyId}
                    onDelete={() => {
                      setLocalFilters((prev) =>
                        prev.filter((_, id) => id !== idx)
                      );
                      setCurrentlyEdittedFilter(undefined);

                      isEditting && isEditting(false);
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
