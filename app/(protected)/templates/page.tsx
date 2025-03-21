import { Shapes } from "lucide-react";
import React from "react";

const Templates = () => {
  return (
    <div className="h-[90vh] w-full flex flex-col justify-center items-center text-center">
      <Shapes className="size-10 stroke-emerald-600 mb-4" />
      <h2 className="text-3xl text-[#333] font-semibold">Templates</h2>
    </div>
  );
};

export default Templates;
