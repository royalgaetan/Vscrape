"use client";

import {
  ArrowDownToLine,
  LucideIcon,
  PencilLineIcon,
  Shapes,
  SparklesIcon,
  WandSparkles,
} from "lucide-react";
import React from "react";
import { useAppDialog } from "@/hooks/useAppDialog";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

const Home = () => {
  const { setOpenSettingsDialog } = useAppDialog();

  return (
    <div className="h-[90vh] w-full flex flex-1 justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="mb-5 text-center">
          <h2 className="text-3xl text-[#333] font-semibold">
            Create Workflows in Minutes
          </h2>
          <p className="text-muted-foreground font-normal text-sm mt-1">
            Build from scratch or accelerate with templates
          </p>
        </div>

        <div className="w-full gap-3 flex justify-center items-center">
          <GetStartedOption
            text={"Create a workflow from scratch"}
            Icon={PencilLineIcon}
            iconColor="stroke-orange-400"
            onClick={() => {}}
          />

          <GetStartedOption
            text={"Build one in less than 1 sec"}
            Icon={WandSparkles}
            iconColor="stroke-blue-400"
            onClick={() => redirect("/chats")}
          />

          <GetStartedOption
            text={"Choose from templates"}
            Icon={Shapes}
            iconColor="stroke-green-700"
            onClick={() => redirect("/templates")}
          />

          <GetStartedOption
            text={"Import an existing"}
            Icon={ArrowDownToLine}
            iconColor="stroke-pink-500"
            onClick={() => setOpenSettingsDialog(true, "import")}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

export const GetStartedOption = ({
  text,
  Icon,
  iconColor,
  onClick,
}: {
  text: string;
  Icon: LucideIcon;
  iconColor: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={() => onClick()}
      className="w-44 h-32 flex-col rounded-2xl pt-2 pb-3 pl-4 pr-3 group bg-muted-foreground/[0.03] hover:bg-muted-foreground/[0.05] border-[2.2px] border-muted-foreground/5 hover:border-muted-foreground/10 transition-all duration-200"
    >
      <div className="h-16 flex items-end">
        <Icon className={cn("size-6 stroke-2 mb-1", iconColor)} />
      </div>

      <div className="h-12 mr-5 line-clamp-2 text-left whitespace-pre-wrap text-sm font-medium group-hover:text-[#333]">
        {text}
      </div>
    </button>
  );
};
