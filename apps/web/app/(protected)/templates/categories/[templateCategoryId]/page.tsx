"use client";
import React from "react";
import WorkflowTemplatesList, {
  workflowTemplateCategories,
} from "../../_components/templates_list";
import { fakeWorkflowTemplates } from "@/lib/fake_data";
import { redirect, useParams } from "next/navigation";

const Page = () => {
  const { templateCategoryId } = useParams();

  const templateObj = Object.entries(workflowTemplateCategories).find(
    ([catName, catPath]) => catPath === templateCategoryId
  );
  // If no template category has been found : 'from url params'
  if (!templateObj || !templateCategoryId) redirect("/templates");

  return (
    <div className="mt-0 pt-0">
      <WorkflowTemplatesList
        categoryType={templateObj[0]}
        workflowTemplatesList={fakeWorkflowTemplates.filter(
          (t) => t.category === templateObj[0]
        )}
      />
    </div>
  );
};

export default Page;
