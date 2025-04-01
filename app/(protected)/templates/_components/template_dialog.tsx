import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { workflowTemplateType } from "./template_card";
import { Coins, Shapes, Star, Text, UserPen } from "lucide-react";
import { lucideIconNames } from "@/lib/fake_data";
import { avatarBackgroundColors2 } from "@/lib/constants";
import Image from "next/image";
import { WorkflowDetailItem } from "../../workflows/_components/workflow_list";
import { getTriggerModeIcon } from "../../workflows/_components/workflow_card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { WorkflowTemplatePreview } from "@/components/global/workflow_template_preview";
import { getRandomElement } from "@/lib/numbers_utils";
import { formatLargeNumber, getTimeAgoWithLimit } from "@/lib/date_time_utils";
import { formatNumber } from "@/lib/string_utils";

const TemplateDialog = ({
  children,
  template,
}: {
  template: workflowTemplateType;
  children: React.ReactNode;
}) => {
  const bgColor = getRandomElement(avatarBackgroundColors2);
  const IconName = getRandomElement(lucideIconNames);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        hideCloseButton
        className="w-[70vw] max-w-none h-[80vh] flex flex-1 gap-0 p-0 overflow-clip"
      >
        <DialogTitle></DialogTitle>
        {/* Left Side: Details */}
        <div className={cn("flex flex-col w-[25vw] h-full", `bg-[#F8F8F7]`)}>
          <div className="flex flex-1 overflow-auto">
            <div className="flex flex-col p-3 pt-7 px-5">
              {/* Logo */}
              <div className="w-full flex justify-center">
                <div
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center text-white font-bold mb-3"
                  )}
                  style={{ backgroundColor: `${bgColor}` }}
                >
                  <IconName
                    className={cn("text-white stroke-white stroke-4 size-10")}
                  />
                </div>
              </div>
              {/* Title */}
              <div className="w-full flex justify-center">
                <div className="mb-4 text-center line-clamp-2 w-full font-semibold">
                  {template.title}
                </div>
              </div>

              {/* Ratings & Credits, Downloads */}
              <div className="mx-0 mb-7 grid grid-cols-3 divide-x">
                {/* Ratings */}
                <TemplateStat
                  subHeader="Ratings"
                  header={
                    <div className="flex items-center gap-1 text-neutral-700 text-lg font-medium">
                      <Star className="fill-neutral-600 size-[1.1rem]" /> 4.8
                    </div>
                  }
                />

                {/* Downloads */}
                <TemplateStat
                  subHeader="Downloads"
                  header={
                    <div className="flex items-center text-neutral-700 text-lg font-medium">
                      +{formatLargeNumber(template.downloads)}
                    </div>
                  }
                />

                {/* Credits */}
                <TemplateStat
                  subHeader="Credits"
                  header={
                    <div className="flex items-center gap-1 text-neutral-700 text-lg font-medium">
                      <Coins className="size-5" />{" "}
                      {formatNumber(template.creditCost)}
                    </div>
                  }
                />
              </div>

              {/* Miscellaneous: Description, Category, Trigger Mode, Last Update */}
              <div className="mb-3 space-y-3">
                <WorkflowDetailItem
                  key={template.title}
                  icon={Text}
                  val={template.description}
                  isLongText={true}
                />

                <WorkflowDetailItem
                  icon={Shapes}
                  val={template.category}
                  iconColor="#737373"
                />

                <WorkflowDetailItem
                  icon={getTriggerModeIcon(template.triggerMode)}
                  val={
                    template.triggerMode === "Manual"
                      ? "Trigger Manually"
                      : template.triggerMode === "Scheduled"
                      ? "Run on schedule"
                      : "Trigger by a webhook"
                  }
                  iconColor="#737373"
                />

                <WorkflowDetailItem
                  icon={UserPen}
                  val={`Last update: ${getTimeAgoWithLimit(
                    template.updatedAt,
                    true
                  )}`}
                  iconColor="#737373"
                />

                <WorkflowDetailItem
                  icon={Star}
                  val={`Add your review`}
                  cta={<AddYourReview />}
                  iconColor="#737373"
                  overallClassname="items-center"
                />
              </div>

              {/* Author */}
              <div className="w-full flex justify-start mb-5">
                <div className="flex items-center">
                  <div className="min-w-5 min-h-5 relative mr-1">
                    <Image
                      alt="Profile Picture"
                      src={template.owner.avatar ?? "/Vscrape logo.png"}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <span className="w-full line-clamp-1 text-xs text-neutral-600">
                    By{" "}
                    <span className="cursor-pointer font-medium hover:opacity-70 duration-200 transition-all">
                      {template.owner.name}
                    </span>
                  </span>
                </div>
              </div>

              {/* Rate: Add your vote */}
              <div className="pb-5">
                <p className="font-medium text-neutral-800 text-sm mb-2">
                  Ratings
                </p>
                <TemplateRatings />
              </div>
            </div>
          </div>

          {/* CTA: Duplicate and use */}
          <div className="pb-2 pt-1 px-5">
            <Button
              type="button"
              variant={"default"}
              size={"sm"}
              className="w-full"
              onClick={() => {}}
            >
              Duplicate and use
            </Button>
          </div>
        </div>

        {/* Right Side: Preview */}
        <WorkflowTemplatePreview containerClassName="bg-white" />
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDialog;

export const TemplateStat = ({
  header,
  subHeader,
}: {
  header: React.ReactNode;
  subHeader: string;
}) => {
  return (
    <div className="flex flex-col col-span-1 items-center justify-center">
      {/* Header */}
      <div className="flex flex-1 items-center justify-center">
        <p className="line-clamp-1 w-full">{header}</p>
      </div>
      <div className="text-center mt-1 text-xs text-neutral-400">
        {subHeader}
      </div>
    </div>
  );
};

export const TemplateRatings = () => {
  const stars = [
    {
      star: 5,
      numberOfPeople: 890,
      percentage: 89,
    },
    {
      star: 4,
      numberOfPeople: 85,
      percentage: 8.5,
    },
    {
      star: 3,
      numberOfPeople: 15,
      percentage: 1.5,
    },
    {
      star: 2,
      numberOfPeople: 6,
      percentage: 0.6,
    },
    {
      star: 1,
      numberOfPeople: 4,
      percentage: 0.4,
    },
  ];

  return (
    <div className="flex flex-1">
      <div className="flex flex-col">
        {stars.map((item) => (
          <TemplateRatingsItem
            index={item.star}
            number={item.numberOfPeople}
            percentage={item.percentage}
          />
        ))}
      </div>
    </div>
  );
};

export const TemplateRatingsItem = ({
  index,
  number,
  percentage,
}: {
  index?: number;
  number: number;
  percentage: number;
}) => {
  return (
    <div className="flex flex-1 gap-2 items-center">
      <div className="relative">
        <Star className="fill-primary stroke-primary relative z-[11] size-6" />
        <span className="left-[0.547rem] top-[0.26rem] scale-75 z-[12] text-xs  text-white absolute">
          {index}
        </span>
      </div>
      <div className="w-[15vw]">
        <Progress
          value={percentage}
          className="bg-neutral-300 transition-all duration-300"
          indicatorClassName="bg-primary"
        />
      </div>
      <div className="text-xs">{number}</div>
    </div>
  );
};

export const AddYourReview = () => {
  const [starHovered, setStarHovered] = useState<number>();

  return (
    <div className="flex flex-1 items-center gap-0">
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          onMouseEnter={() => setStarHovered(item)}
          onMouseLeave={() => setStarHovered(undefined)}
          className="px-[0.4px]"
        >
          <Star
            className={cn(
              "cursor-pointer size-4 fill-transparent stroke-primary",
              starHovered !== undefined &&
                item <= starHovered &&
                "fill-primary stroke-primary transition-none"
            )}
          />
        </div>
      ))}
    </div>
  );
};
