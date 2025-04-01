import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { redirect, usePathname } from "next/navigation";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { folders } from "@/lib/fake_data";
import { Squircle } from "lucide-react";
import { workflowTemplateCategories } from "@/app/(protected)/templates/_components/templates_list";

export const getFolderName = (folderId: string) => {
  return folders.find((f) => f.folderPath === folderId)?.folderName;
};

export const getTemplateCategoryName = (categoryPath: string) => {
  return Object.entries(workflowTemplateCategories).find(
    ([name, path]) => categoryPath === path
  )?.[0];
};

const Breadcrumbs = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const pathSplitted = pathname.split("/");
  const showBreadcrumb =
    pathname.includes("/workflows") || pathname.includes("/templates");

  const isATemplateCategory = (currentPath: string) => {
    return (
      pathSplitted[pathSplitted.length - 2] === "categories" &&
      pathSplitted.length === 4 &&
      currentPath !== "categories" &&
      currentPath !== "templates"
    );
  };

  const isAFolder = (currentPath: string) => {
    return (
      pathSplitted[pathSplitted.length - 2] === "folders" &&
      pathSplitted.length === 4 &&
      currentPath !== "folders" &&
      currentPath !== "workflows"
    );
  };

  const isLinkDisabled = (currentPath: string) => {
    return (
      isAFolder(currentPath) ||
      isATemplateCategory(currentPath) ||
      pathname === `/${currentPath}`
    );
  };

  return (
    <div>
      {showBreadcrumb && (
        <Breadcrumb>
          <BreadcrumbList>
            {pathname.split("/").map((path, i) => {
              if (i === 0) return <></>;

              // If item is "folders" form "/workflows/folders"
              if (pathSplitted[1] === "workflows" && path === "folders") {
                return (
                  <>
                    <BreadcrumbItem>
                      <DropdownMenu
                        open={isDropdownOpen}
                        onOpenChange={setDropdownOpen}
                      >
                        <DropdownMenuTrigger className="flex items-center gap-1">
                          <BreadcrumbEllipsis className="h-4 w-4" />
                          <span className="sr-only">
                            {capitalizeFirstLetter(path)}
                          </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="w-52 max-h-[60vh] overflow-y-auto"
                        >
                          <div className="w-full text-xs text-muted-foreground justify-start mb-1 px-3 pt-2">
                            Folders
                          </div>
                          {folders.map((folder) => (
                            <DropdownMenuItem
                              onClick={() => {
                                setDropdownOpen(false);
                                redirect(
                                  `/workflows/folders/${folder.folderPath}`
                                );
                              }}
                              key={folder.folderPath}
                              className="truncate w-full"
                            >
                              <Squircle
                                fill={folder.folderColor}
                                className="stroke-none"
                              />
                              <span>
                                {capitalizeFirstLetter(folder.folderName)}
                              </span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="last:hidden" />
                  </>
                );
              }

              // If item is "categories" form "/templates/categories"
              if (pathSplitted[1] === "templates" && path === "categories") {
                return (
                  <>
                    <BreadcrumbItem>
                      <DropdownMenu
                        open={isDropdownOpen}
                        onOpenChange={setDropdownOpen}
                      >
                        <DropdownMenuTrigger className="flex items-center gap-1">
                          <BreadcrumbEllipsis className="h-4 w-4" />
                          <span className="sr-only">
                            {capitalizeFirstLetter(path)}
                          </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="w-52 max-h-[60vh] overflow-y-auto"
                        >
                          <div className="w-full text-xs text-muted-foreground justify-start mb-1 px-3 pt-2">
                            Categories
                          </div>
                          {Object.entries(workflowTemplateCategories).map(
                            ([categoryName, categoryPath]) => (
                              <DropdownMenuItem
                                onClick={() => {
                                  setDropdownOpen(false);
                                  redirect(
                                    `/templates/categories/${categoryPath}`
                                  );
                                }}
                                key={categoryPath}
                                className="truncate w-full"
                              >
                                <span>
                                  {capitalizeFirstLetter(categoryName)}
                                </span>
                              </DropdownMenuItem>
                            )
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="last:hidden" />
                  </>
                );
              }

              return (
                <>
                  <BreadcrumbItem key={path}>
                    <BreadcrumbLink
                      aria-disabled={isLinkDisabled(path)}
                      className={cn(
                        isLinkDisabled(path) && "pointer-events-none"
                      )}
                      href={
                        isAFolder(path) || isATemplateCategory(path)
                          ? `#`
                          : `/${path}`
                      }
                    >
                      {/* If item if "folders" form "/workflows/folders" */}
                      {isAFolder(path) && getFolderName(pathSplitted[3])}
                      {isATemplateCategory(path) &&
                        getTemplateCategoryName(pathSplitted[3])}
                      {!isAFolder(path) &&
                        !isATemplateCategory(path) &&
                        capitalizeFirstLetter(path)}
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbSeparator className="last:hidden" />
                </>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </div>
  );
};

export default Breadcrumbs;
