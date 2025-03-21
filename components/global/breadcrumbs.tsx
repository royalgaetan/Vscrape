import React from "react";
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
import { usePathname } from "next/navigation";
import { capitalizeFirstLetter } from "@/lib/utils";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const showBreadcrumb =
    pathname.includes("/workflows") || pathname.includes("/templates");
  return (
    <div>
      {showBreadcrumb && (
        <Breadcrumb>
          <BreadcrumbList>
            {pathname.split("/").map((path, i) => {
              return (
                <>
                  <BreadcrumbItem>
                    {pathname === `/${path}` && i === 1 ? (
                      <div className="cursor-pointer">
                        {capitalizeFirstLetter(path)}
                      </div>
                    ) : (
                      <BreadcrumbLink href={`/${path}`}>
                        {capitalizeFirstLetter(path)}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </>
              );
            })}

            {/* <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem> */}
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </div>
  );
};

export default Breadcrumbs;
