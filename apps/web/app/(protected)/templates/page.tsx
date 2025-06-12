import React from "react";
import WorkflowTemplatesList from "./_components/templates_list";
import { fakeWorkflowTemplates } from "@/lib/fake_data";

const page = () => {
  return (
    <div className="mt-0 pt-0">
      <WorkflowTemplatesList
        categoryType="All"
        workflowTemplatesList={fakeWorkflowTemplates.sort(
          (a, b) => b.downloads - a.downloads
        )}
      />
    </div>
  );
};

export default page;
