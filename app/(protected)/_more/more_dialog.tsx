import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sidebarPathType } from "@/lib/types";
import { Headset, Rocket, Bug } from "lucide-react";
import Support from "./support/support";
import FeatureRequest from "./feature_request/feature_request";
import Report from "./report/report";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export type moreButtonPathType = Omit<sidebarPathType, "path" | "type"> & {
  path: moreTabValue;
  component: React.ComponentType;
};
export type moreTabValue = "support" | "featureRequest" | "report";

export const moreButtonPaths: moreButtonPathType[] = [
  { name: "Support", path: "support", icon: Headset, component: Support },
  { name: "Report", path: "report", icon: Bug, component: Report },
  {
    name: "Feature Request",
    path: "featureRequest",
    icon: Rocket,
    component: FeatureRequest,
  },
];

const MoreDialog = ({ children }: { children: React.ReactNode }) => {
  const [tabValue, setTabValue] = useState<moreTabValue>("support");
  return (
    <Dialog>
      <DialogTrigger>
        <DropdownMenu>
          <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col">
            {moreButtonPaths.map((p, i) => {
              const Icon = p.icon;
              return (
                <button
                  key={`${i.toString()}`}
                  onClick={() => setTabValue(p.path)}
                >
                  <DropdownMenuItem>
                    <Icon className="stroke-neul-600" />
                    <span className="text-neutral-600">{p.name}</span>
                  </DropdownMenuItem>
                  {i === 1 && <DropdownMenuSeparator />}
                </button>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="min-h-[50vh] max-h-[90vh] overflow-clip w-[40vw] max-w-none pt-6 pb-0 px-0"
      >
        <Tabs defaultValue={tabValue} className="w-full">
          {/* Tab Header Buttons */}
          <DialogTitle className="px-6 mb-2">
            <TabsList className="bg-transparent border-b-2 border-neutral-400/20 pb-0 pl-0 rounded-none justify-start w-full gap-3">
              {moreButtonPaths.map((p) => {
                return (
                  <TabsTrigger
                    className="rounded-none pb-2 border-b-4 border-transparent data-[state=active]:border-primary font-medium focus-visible:ring-0 data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none"
                    key={p.name}
                    value={p.path}
                  >
                    {p.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </DialogTitle>

          <div className="w-full h-full">
            {/* Tab Content */}
            {moreButtonPaths.map((p) => {
              const Component = p.component;
              return (
                <TabsContent key={p.path} value={p.path}>
                  <Component />
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default MoreDialog;
