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

const Breadcrumbs = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const pathSplitted = pathname.split("/");
  const showBreadcrumb =
    pathname.includes("/workflows") || pathname.includes("/templates");

  const getFolderName = (folderId: string) => {
    return folders.find((f) => f.folderPath === folderId)?.folderName;
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
    return isAFolder(currentPath) || pathname === `/${currentPath}`;
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

              return (
                <span key={path}>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      aria-disabled={isLinkDisabled(path)}
                      className={cn(
                        isLinkDisabled(path) && "pointer-events-none"
                      )}
                      href={
                        isAFolder(path)
                          ? `/workflows/folders/${path}`
                          : `/${path}`
                      }
                    >
                      {/* If item if "folders" form "/workflows/folders" */}
                      {isAFolder(path)
                        ? getFolderName(pathSplitted[3])
                        : capitalizeFirstLetter(path)}
                    </BreadcrumbLink>
                    <br />
                  </BreadcrumbItem>

                  <BreadcrumbSeparator className="last:hidden" />
                </span>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </div>
  );
};

export default Breadcrumbs;
