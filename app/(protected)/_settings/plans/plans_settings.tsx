import React, { useState } from "react";
import SettingDialogHeader from "../_components/settings_dialog_header";
import { COLORS, getIconColor } from "@/lib/colors_utils";
import {
  CheckIcon,
  Cloudy,
  CoinsIcon,
  Cpu,
  DatabaseZap,
  FileUp,
  Globe,
  Workflow,
  Zap,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { appFeatures, featureGroupNames, plans } from "@/lib/constants";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatNumber } from "@/lib/string_utils";
import { cn } from "@/lib/utils";
export type CreditOption = {
  value: string;
  label: string;
  amount: number;
};

const creditMultiplier = 0.005;

const creditOptions: CreditOption[] = [
  { value: "small", label: "Small Pack", amount: 10 }, // $10
  { value: "medium", label: "Medium Pack", amount: 25 }, // $25
  { value: "large", label: "Large Pack", amount: 50 }, // $50
];

const PlansSettings = () => {
  const [selectedCreditValue, setSelectedCreditValue] = useState<string>(
    creditOptions[0].value
  );

  const handleChange = (value: string) => {
    setSelectedCreditValue(value);
  };

  return (
    <div className="w-full h-full overflow-x-scroll flex flex-col items-start justify-start pr-7 pl-5 pb-28">
      {/* Current Plans */}
      <div className="flex flex-col gap-2 w-full mt-7">
        <SettingDialogHeader title="Active Plan" />
        <div className="w-full h-full">
          <div className="flex flex-1 min-h-28 justify-between items-start mx-3 my-2 rounded-2xl px-5 py-6 border-[2px] bg-white border-neutral-300">
            {/* Plan Description */}
            <div className="flex flex-col w-1/2 justify-start items-start mt-4">
              <div className="mb-7">
                <div className={`text-4xl font-bold ${COLORS.neutralDark}`}>
                  {formatNumber(13403)}
                </div>
                <div className="text-xs mt-1 font-medium text-muted-foreground">
                  Credits left
                </div>
              </div>

              <div>
                <div className={`text-4xl font-bold ${COLORS.neutralDark}`}>
                  Free
                </div>
                <div className="text-xs mt-1 font-medium text-muted-foreground">
                  Current plan
                </div>
              </div>

              <div className="flex flex-1 gap-[0.33rem] mt-2">
                <Zap className="size-4" style={{ stroke: getIconColor(Zap) }} />
                <Workflow
                  className="size-4"
                  style={{ stroke: getIconColor(Workflow) }}
                />

                <Globe
                  className="size-4"
                  style={{ stroke: getIconColor(Globe) }}
                />
                <Cpu className="size-4" style={{ stroke: getIconColor(Cpu) }} />
                <FileUp
                  className="size-4"
                  style={{ stroke: getIconColor(FileUp) }}
                />
                <Cloudy
                  className="size-4"
                  style={{ stroke: getIconColor(Cloudy) }}
                />
                <DatabaseZap
                  className="size-4"
                  style={{ stroke: getIconColor(DatabaseZap) }}
                />
              </div>
            </div>

            {/* Add Credits */}
            <div className="flex rounded-2xl bg-neutral-100/90 min-h-28 w-1/2 ml-4 p-4">
              <div className=" flex flex-col h-full">
                {/* Header */}
                <div className="flex flex-1 gap-2">
                  <CoinsIcon className="stroke-neutral-700" />
                  <h3 className="font-semibold stroke-neutral-700">
                    Add Credits
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground font-medium mb-6 mt-2">
                  You can add credits to your plan if you've used up your
                  available credits.
                </p>

                {/* Select credits amount to purchase */}
                <RadioGroup
                  value={selectedCreditValue}
                  onValueChange={handleChange}
                >
                  {creditOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2 space-y-2"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label className="flex flex-1" htmlFor={option.value}>
                        <span>{option.label} — </span>
                        <span className="flex flex-1">
                          <span className="mx-1">
                            {new Intl.NumberFormat("en-US").format(
                              option.amount / creditMultiplier
                            )}
                          </span>
                          <CoinsIcon className="size-4" />
                        </span>

                        <p className="flex text-xs justify-center items-center gap-1">
                          <Badge className="bg-primary text-xs cursor-pointer py-0 px-2 ml-1 shadow-none hover:bg-primary">
                            {option.amount}$
                          </Badge>
                        </p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {/* Purchase credit button: CTA */}
                <div className="mt-6 flex flex-1 justify-center">
                  <Button
                    type="submit"
                    variant={"default"}
                    size={"sm"}
                    className="w-full"
                  >
                    Purchase
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plans - Comparaison */}
      <div className="flex flex-col gap-2 w-full mt-7">
        <SettingDialogHeader title="All Plans" />

        <TableHeader className="min-w-full bg-white hover:bg-white -top-1 sticky">
          <TableRow className="flex flex-1 bg-white hover:bg-white border-none ">
            {/* Empty Header for 1st header */}
            <TableHead className="px-4 py-2 flex flex-1"></TableHead>

            {plans.map((plan) => {
              return (
                <div key={plan.name} className="p-4 pl-2 rounded-lg w-1/4">
                  <div className="flex flex-1 gap-1">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    {plan.name === "Plus" && (
                      <Badge className="bg-primary/5 hover:bg-primary/5 text-primary/80 text-xs cursor-pointer py-0 px-2 ml-1 shadow-none">
                        Popular
                      </Badge>
                    )}
                  </div>

                  <p className="my-1 font-semibold text-primary">
                    {plan.membershipPrice}
                  </p>
                  <p className="text-xs font-light">{plan.description}</p>

                  {/* Upgrade Button */}
                  {!plan.isCurrent && (
                    <div className="mt-6 flex flex-1 justify-center">
                      <Button
                        type="submit"
                        variant={"outline"}
                        size={"sm"}
                        className="w-full"
                      >
                        Upgrade
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(featureGroupNames).map(([groupName, lucidIcon]) => {
            const Icon = lucidIcon;
            return (
              <div key={groupName} className="flex flex-col">
                {/* GroupName Color */}
                {groupName != "Highlight" && (
                  <div
                    className="flex flex-1 gap-1 items-center ml-3 mt-14 mb-4 font-semibold text-xs border-b-2 border-gray-300 pb-3"
                    style={{
                      stroke: getIconColor(Icon),
                      color: getIconColor(Icon),
                    }}
                  >
                    <Icon className="size-4" />
                    {groupName}
                  </div>
                )}
                {/* Features List */}
                <div>
                  {appFeatures
                    .filter((f) => f.group === groupName)
                    .map((feature) => (
                      <TableRow
                        key={feature.featureName}
                        className={cn(
                          "border-b text-xs items-start",
                          feature.group === "Highlight" &&
                            "bg-neutral-500/10 hover:bg-neutral-500/10 border-none"
                        )}
                      >
                        {/* Feature Name Column*/}
                        {feature.description === "" ? (
                          <TableCell className="flex-1 px-4 py-2 font-semibold cursor-default align-top">
                            {feature.featureName}
                          </TableCell>
                        ) : (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <TableCell className="flex-1 px-4 py-2 font-semibold cursor-help align-top">
                                  {feature.featureName}
                                </TableCell>
                              </TooltipTrigger>
                              <TooltipContent className="bg-neutral-700/95 text-white text-xs w-44 p-2">
                                <p>{feature.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}

                        {/* Feature Free Plan Info Column */}
                        <TableCell className="px-4 py-2 align-top w-1/4">
                          {feature.planIncluded
                            .filter((p) => p.planName === plans[0].name)
                            .map((plan) => {
                              return (
                                <FeatureCellContent
                                  key={feature.featureName}
                                  content={plan.content}
                                />
                              );
                            })}
                        </TableCell>

                        {/* Feature Plus Plan Info Column */}
                        <TableCell className="px-4 py-2 align-top w-1/4">
                          {feature.planIncluded
                            .filter((p) => p.planName === plans[1].name)
                            .map((plan) => {
                              return (
                                <FeatureCellContent
                                  key={feature.featureName}
                                  content={plan.content}
                                />
                              );
                            })}
                        </TableCell>

                        {/* Feature BUsiness Plan Info Column */}
                        <TableCell className="px-4 py-2 align-top w-1/4">
                          {feature.planIncluded
                            .filter((p) => p.planName === plans[2].name)
                            .map((plan) => {
                              return (
                                <FeatureCellContent
                                  key={feature.featureName}
                                  content={plan.content}
                                />
                              );
                            })}
                        </TableCell>
                      </TableRow>
                    ))}
                </div>
              </div>
            );
          })}
        </TableBody>
      </div>
    </div>
  );
};

export default PlansSettings;

export const FeatureCellContent = ({
  content,
}: {
  content: string | string[];
}) => {
  return (
    <div className="">
      {typeof content === "string" ? (
        <div className="stroke-neutral-900 text-neutral-900">
          {content === "Yes" && <CheckIcon className="size-5 " />}
          {content === "No" && <span className="text-neutral-400">—</span>}
          {content !== "Yes" && content !== "No" && `${content}`}
        </div>
      ) : (
        <div className="flex flex-col justify-start items-start gap-2">
          {content.map((line) => {
            return <div key={line}>◉ {line}</div>;
          })}
        </div>
      )}
    </div>
  );
};
