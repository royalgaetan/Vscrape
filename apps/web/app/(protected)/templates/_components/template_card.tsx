import { cn } from "@/lib/utils";
import React from "react";
import { categoryType } from "./templates_list";
import { WorkflowTriggerMode } from "../../workflows/_components/workflow_card";
import { userProfile } from "@/lib/types";

export type workflowTemplateType = {
  owner: userProfile;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  creditCost: number;
  triggerMode: WorkflowTriggerMode;
  category: categoryType;
  downloads: number;
  logoPath: React.ReactNode;
};

const WorkflowTemplateCard = ({
  workflowTemplate,
  onClick,
}: {
  workflowTemplate: workflowTemplateType;
  onClick?: () => void;
}) => {
  return (
    <div className={cn()}>
      <div className="flex flex-1 gap-3 w-full px-4 py-4 h-[5.5rem]">
        {/* Icon */}
        <button
          onClick={() => {
            onClick && onClick();
          }}
          className=""
        ></button>

        {/* Details */}
        <button
          onClick={() => {
            onClick && onClick();
          }}
          className="flex flex-1"
        >
          <div className="flex flex-col gap-1 items-start justify-center h-fit w-[60%]">
            {/* Detail Line 1 */}
            <div className="flex">{workflowTemplate.title}</div>

            {/* Detail Line 2 */}
            <div className="flex w-full gap-1 justify-start items-start"></div>

            {/* Detail Line 3 */}
            <div className="flex w-fit group/folderDetails gap-1 justify-start items-start"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default WorkflowTemplateCard;
