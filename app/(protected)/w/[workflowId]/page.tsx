"use client";
import { redirect, useParams } from "next/navigation";

const Page = () => {
  const { workflowId } = useParams();
  return redirect(`/w/${workflowId}/editor`);
};

export default Page;
