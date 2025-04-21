import { cn } from "@/lib/utils";
import {
  OperationFilterType,
  OperationMoreOptionType,
} from "@/lib/workflow_editor/types/w_types";
import React, { useEffect, useState } from "react";
import SimpleSwitchInput from "./inputs/simple_switch_input";
import { Button } from "../ui/button";
import FilterInput from "./inputs/filter_input";
import { ListFilterPlusIcon, LucideIcon } from "lucide-react";
import { FieldLabel } from "@/app/(protected)/w/[workflowId]/editor/_components/w_optionbar_editor";
import {
  deepFreeze,
  workflowOperations,
} from "@/lib/workflow_editor/constants/workflows_operations_definition";
import {
  vsAnyPrimitives,
  vsAnyRawTypes,
} from "@/lib/workflow_editor/types/data_types";

type FilterArr = OperationFilterType<
  (vsAnyPrimitives | vsAnyRawTypes)["type"]
>[];

const getInitialOptionValues = ({
  optionType,
  operationName,
}: Pick<Props, "operationName" | "optionType">): any => {
  const frozenWorkflowOperations = deepFreeze([...workflowOperations] as const);
  switch (optionType) {
    case "skipDuplicate":
      return frozenWorkflowOperations.find(
        (op) => op.operationName === operationName
      )?.skipDuplicate;
    case "loopThrough":
      return frozenWorkflowOperations.find(
        (op) => op.operationName === operationName
      )?.loopThrough;
    case "filters":
      return deepFreeze([] as const) as FilterArr;
    default:
      break;
  }
};

type Props = {
  optionType: OperationMoreOptionType;
  operationName: string;
};

const MoreOptionInput = ({ optionType, operationName }: Props) => {
  const [internalOptionValue, setInternalOptionValue] = useState(
    getInitialOptionValues({ optionType, operationName })
  );

  useEffect(() => {
    setInternalOptionValue([]);
  }, [operationName]);

  const generateEmpyFilter = (): OperationFilterType<"primitive/text"> => ({
    keyId: crypto.randomUUID(),
    filterCriteria: null,
    filterValue: null,
    filterType: null,
    inputID: "",
  });

  switch (optionType) {
    case "skipDuplicate":
      return (
        <div className="flex flex-1 items-center w-full">
          <MoreOptionLabel label={"Skip Duplicate"} />

          <SimpleSwitchInput
            isChecked={!!internalOptionValue}
            onCheckedChange={(isChecked) => setInternalOptionValue(isChecked)}
          />
        </div>
      );

    case "loopThrough":
      return (
        <div className="flex flex-1 items-center w-full">
          <MoreOptionLabel label={"Loop Through"} />

          <SimpleSwitchInput
            isChecked={!!internalOptionValue}
            onCheckedChange={(isChecked) => setInternalOptionValue(isChecked)}
          />
        </div>
      );

    case "filters":
      return (
        <div className="flex flex-col w-full">
          {/* Label + Add Filter Button */}

          <div className="flex flex-1 items-center px-4">
            <FieldLabel label={"Filters"} Icon={ListFilterPlusIcon} />
            <Button
              type="button"
              variant={"outline"}
              size={"sm"}
              className="w-fit text-xs text-neutral-500 py-1 px-2 h-6 rounded-sm"
              onClick={() => {
                setInternalOptionValue((prev: FilterArr) => [
                  ...prev,
                  generateEmpyFilter(),
                ]);
              }}
            >
              + Add
            </Button>
          </div>

          {/* All Filters: list */}
          <div className="flex flex-col w-full mt-0">
            {!internalOptionValue ||
            (internalOptionValue as FilterArr)?.length === 0 ? (
              <div className=" text-muted-foreground text-xs font-semibold flex flex-1 justify-center items-center min-h-20">
                No filter yet.
              </div>
            ) : (
              (internalOptionValue as FilterArr)?.map((filter, idx) => {
                return (
                  <FilterInput
                    key={filter.keyId}
                    index={idx + 1}
                    onSave={(filterObj) => {
                      internalOptionValue[idx] = filterObj;
                    }}
                    onDelete={() => {
                      const deletedArr = (
                        internalOptionValue as FilterArr
                      ).filter((_, id) => id !== idx);
                      setInternalOptionValue(deletedArr);
                    }}
                    initialFilter={filter}
                  />
                );
              })
            )}
          </div>
        </div>
      );

    default:
      return <div></div>;
  }
};

export default MoreOptionInput;

const MoreOptionLabel = ({
  label,
  className,
  Icon,
}: {
  label: string;
  className?: string;
  Icon?: LucideIcon;
}) => {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="w-fit">
        {Icon && <Icon className="stroke-neutral-600/70 !size-4" />}
      </div>

      <div
        className={cn(
          "px-1 w-full text-start text-xs line-clamp-1 font-semibold text-neutral-500",
          className
        )}
      >
        {label}
      </div>
    </div>
  );
};
