import { X } from "lucide-react";
import React from "react";

const InputData = ({
  inputData,
  onDelete,
}: {
  inputData: string;
  onDelete: (btn: HTMLButtonElement) => void;
}) => {
  return (
    <div
      data-type={`[${inputData}]`}
      className={
        "inputData group flex relative min-w-fit translate-y-0 rounded-[9px] px-[13px] py-[2px] mb-[2px] select-none text-center border-none bg-primary/20 text-primary/80 cursor-pointer text-xs overflow-hidden transition-all duration-200 hover:bg-primary/30 "
      }
    >
      {inputData}
      <button
        type="button"
        onClick={(e) => {
          console.log("Delete Inside");
          onDelete(e.currentTarget);
        }}
        className={
          "group-hover:flex hidden justify-center items-center size-4 font-semibold absolute right-1 rounded-full active:scale-[0.97] bg-[#D0CFE5] top-1/2 -translate-y-1/2 text-[12px] border-none cursor-pointer p-0 leading-none"
        }
      >
        <X className="stroke-primary/80 !size-3 translate-y-[0.9px]" />
      </button>
    </div>
  );
};

export default InputData;
