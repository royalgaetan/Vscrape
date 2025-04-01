"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SettingItemSearchBar from "../../_settings/_components/settings_item_searchbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { workflowTemplateType } from "./template_card";
import { avatarBackgroundColors2 } from "@/lib/constants";
import Image from "next/image";
import { lucideIconNames } from "@/lib/fake_data";
import TemplateDialog from "./template_dialog";
import { isSearchTermFound } from "@/lib/string_utils";
import { isElementInViewport, waitForElementById } from "@/lib/dom_utils";
import { getRandomElement } from "@/lib/numbers_utils";

export const workflowTemplateCategories: Record<string, string> = {
  "Lead & Customer": "lead-customer",
  "E-commerce & Sales": "ecommerce-sales",
  "Marketing & Social Media": "marketing-social-media",
  "Reporting & Analytics": "reporting-analytics",
  "Notifications & Alerts": "notifications-alerts",
  "Finance & Billing": "finance-billing",
  "Productivity & Workflows": "productivity-workflows",
  "Data Extraction & Scraping": "data-extraction-scraping",
} as const;

export type categoryType = keyof typeof workflowTemplateCategories;

const WorkflowTemplatesList = ({
  workflowTemplatesList,
  categoryType,
}: {
  workflowTemplatesList: workflowTemplateType[];
  categoryType: categoryType;
}) => {
  const currentItemRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [searchContent, setSearchContent] = useState("");
  const filteredWorkflowsList = workflowTemplatesList.filter((w) =>
    isSearchTermFound({ text: w.title.concat(), keySearchTerm: searchContent })
  );

  // Scrollable content
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollToLeft, setCanScrollToLeft] = useState<boolean>(true);
  const [canScrollToRight, setCanScrollToRight] = useState<boolean>(true);

  const scrollToLeft = () => {
    if (!scrollableContainerRef.current) return;
    scrollableContainerRef.current.scrollBy({
      left: -100,
      behavior: "smooth",
    });
  };
  const scrollToRight = () => {
    if (!scrollableContainerRef.current) return;
    scrollableContainerRef.current.scrollBy({
      left: 100,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!scrollableContainerRef.current) return;
    const { scrollLeft, clientWidth, scrollWidth } =
      scrollableContainerRef.current;

    setCanScrollToLeft(scrollLeft > 0);
    setCanScrollToRight(scrollLeft < scrollWidth - clientWidth - 3);
  };

  useEffect(() => {
    if (!scrollableContainerRef.current) return;

    scrollableContainerRef.current.addEventListener("scroll", handleScroll);

    // Scroll to element
    if (currentItemRef.current && scrollableContainerRef.current) {
      waitForElementById(currentItemRef.current.id).then((el) => {
        if (!scrollableContainerRef.current) return;
        if (!isElementInViewport(scrollableContainerRef.current, el)) {
          scrollableContainerRef.current.scrollLeft =
            el.offsetLeft - scrollableContainerRef.current.offsetLeft - 100;
        }
      });
    }

    return () => {
      scrollableContainerRef.current?.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return (
    <div className="relative mt-0 pt-0">
      {/* Header */}
      <div className="sticky top-[8vh] z-40 bg-white w-full flex flex-col mt-4">
        <div className="flex flex-1 gap-4 justify-center items-center pb-0">
          {/* Header Text */}
          <div className="w-[50vw] flex flex-1 relative group/scrollable-header ">
            {/* Left and Right Gradient overlays */}
            <div className="absolute top-0 z-[41] pointer-events-none w-full h-full">
              {canScrollToLeft && (
                <div className="left-0 top-0 absolute h-full w-14 bg-gradient-to-r from-white to-transparent"></div>
              )}
              {canScrollToRight && (
                <div className="right-0 top-0 absolute h-full w-14 bg-gradient-to-l from-white to-transparent"></div>
              )}
            </div>

            {/* Left and Right Buttons */}
            <div className="hidden group-hover/scrollable-header:flex absolute top-0 z-[42] pointer-events-none w-full h-full bg-transparent ">
              {canScrollToLeft && (
                <button
                  onClick={() => scrollToLeft()}
                  className="left-0 top-0 absolute -translate-y-1 flex justify-center items-center active:scale-[0.97] pointer-events-auto h-7 w-7 rounded-full bg-white border-[1px] border-neutral-500/20 shadow-sm"
                >
                  <ChevronLeft className=" stroke-neutral-700 size-4" />
                </button>
              )}

              {canScrollToRight && (
                <button
                  onClick={() => scrollToRight()}
                  className="right-0 top-0 absolute  -translate-y-1 flex justify-center items-center active:scale-[0.97] pointer-events-auto h-7 w-7 rounded-full bg-white border-[1px] border-neutral-500/20 shadow-sm"
                >
                  <ChevronRight className=" stroke-neutral-700 size-4" />
                </button>
              )}
            </div>

            {/* Category List */}
            <div
              ref={scrollableContainerRef}
              id="scrollableContainer"
              className="relative overflow-x-scroll flex flex-1 gap-2 scrollbar-hide text-base font-semibold justify-start items-center"
            >
              {[
                <div key={"marginPlaceholder"} className="min-w-6"></div>,
                <WorkflowTemplateLink
                  key={"featuredCategory"}
                  categoryPath="/templates"
                  categoryName="Featured"
                  isSelected={pathname === "/templates"}
                  ref={pathname === "/templates" ? currentItemRef : undefined}
                />,
                ...Object.entries(workflowTemplateCategories).map(
                  ([catName, catPath]) => {
                    return (
                      <WorkflowTemplateLink
                        key={catPath}
                        categoryPath={`/templates/categories/${catPath}`}
                        categoryName={catName}
                        isSelected={
                          pathname === `/templates/categories/${catPath}`
                        }
                        ref={
                          pathname === `/templates/categories/${catPath}`
                            ? currentItemRef
                            : undefined
                        }
                      />
                    );
                  }
                ),
              ]}
            </div>
          </div>

          {/* Search */}
          <div className="flex min-w-[20rem] pb-2">
            <SettingItemSearchBar
              className="w-full bg-transparent"
              inputType="search"
              placeholder="Search for a template..."
              onTextChange={(val) => {
                setSearchContent(val);
              }}
              onSubmit={(val) => {
                setSearchContent(val);
              }}
              onCancel={() => {}}
            />
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="flex relative">
        {/* Workflow List */}
        <div className="flex flex-1">
          <div className="flex flex-col w-full">
            {filteredWorkflowsList.length === 0 ? (
              <div className=" text-muted-foreground text-xs font-semibold flex justify-center items-center h-36">
                No template found.
              </div> // Display "Not found" if no matches are found
            ) : (
              <>
                {/* For Featured of "All Category" */}
                {categoryType === "All" && (
                  <div className="mt-6">
                    <h3 className="text-2xl font-semibold">Top picks</h3>
                    <p className="text-sm text-neutral-400">
                      Must-Try Recommendations
                    </p>
                  </div>
                )}
                {categoryType === "All" && (
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2 mt-2 pr-64">
                    {filteredWorkflowsList.slice(0, 4).map((template, idx) => {
                      return (
                        <WorkflowTemplateDetailItem
                          key={template.title}
                          item={template}
                          isFeatured={true}
                        />
                      );
                    })}
                  </div>
                )}

                {/* For Others templates categories and remaining of "All Category" */}
                {categoryType === "All" && (
                  <div className="mt-14">
                    <h3 className="text-2xl font-semibold">Trending</h3>
                    <p className="text-sm text-neutral-400">
                      Popular Right Now
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-x-2 gap-y-2 mt-2 pr-64">
                  {filteredWorkflowsList
                    .slice(categoryType === "All" ? 5 : 0)
                    .map((template, idx) => {
                      return (
                        <WorkflowTemplateDetailItem
                          key={template.title}
                          item={template}
                        />
                      );
                    })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowTemplatesList;

export const WorkflowTemplateDetailItem = ({
  isFeatured,
  item,
}: {
  isFeatured?: boolean;
  item: workflowTemplateType;
}) => {
  const bgColor = getRandomElement(avatarBackgroundColors2);
  const IconName = getRandomElement(lucideIconNames);
  return (
    <TemplateDialog template={item}>
      <div
        className={cn(
          "col-span-1 my-2 hover:bg-neutral-100 rounded-lg px-3 py-2 cursor-pointer active:scale-[0.98] duration-100 transition-all",
          isFeatured && "px-3 py-4"
        )}
      >
        <div className="flex flex-1 gap-3">
          {/* Logo */}
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold",
              isFeatured && "w-20 h-20"
            )}
            style={{ backgroundColor: `${bgColor}` }}
          >
            <IconName
              className={cn(
                "text-white stroke-white stroke-4 size-6",
                isFeatured && "size-10"
              )}
            />
          </div>

          {/* Content */}
          <div className="flex flex-1">
            <div className="flex flex-col w-[80%]">
              {/* Template Title */}
              <h6
                className={cn(
                  "text-neutral-900 font-semibold text-sm line-clamp-1",
                  isFeatured && "text-base"
                )}
              >
                {item.title}
              </h6>

              {/* Template Description */}
              <p className="text-neutral-600 text-xs mt-1 font-normal line-clamp-3">
                {item.description}
              </p>

              {/* Template User Profile */}
              <div
                className={cn(
                  "text-xs text-neutral-500 mt-1 flex flex-1 justify-start items-center",
                  isFeatured && "mt-2"
                )}
              >
                <div
                  className={cn(
                    "min-w-3 min-h-3 relative mr-1",
                    isFeatured && "min-w-5 min-h-5"
                  )}
                >
                  <Image
                    alt="Profile Picture"
                    src={item.owner.avatar ?? "/Vscrape logo.png"}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <span className="line-clamp-1">By {item.owner.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TemplateDialog>
  );
};

export const WorkflowTemplateLink = ({
  categoryName,
  categoryPath,
  isSelected,
  ref,
}: {
  ref?: React.RefObject<HTMLDivElement | null>;
  categoryName: string;
  categoryPath: string;
  isSelected: boolean;
}) => {
  return (
    <div
      id={categoryPath}
      ref={ref}
      className={cn(
        "min-w-fit border-b-[4px] border-transparent font-medium text-neutral-400 pb-2 px-2 text-sm",
        isSelected && "border-primary text-primary font-medium"
      )}
    >
      <Link href={categoryPath} className="flex line-clamp-1">
        {categoryName}
      </Link>
    </div>
  );
};
