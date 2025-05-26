import {
  LockKeyholeOpenIcon,
  LucideIcon,
  Maximize,
  Minus,
  Plus,
} from "lucide-react";

const ViewButtons = () => {
  const viewIcons: { icon: LucideIcon; name: string }[] = [
    {
      icon: Plus,
      name: "Zoom in",
    },
    {
      icon: Minus,
      name: "Zoom out",
    },
    {
      icon: Maximize,
      name: "Fit",
    },
    {
      icon: LockKeyholeOpenIcon,
      name: "Lock",
    },
  ];

  return (
    <div className="rounded-2xl border divide-y-2 overflow-clip flex flex-col w-7 h-min bg-white">
      {viewIcons.map((el) => {
        const Icon = el.icon;
        return (
          <button
            key={el.name}
            className="h-7 flex justify-center group/viewBtn items-center bg-transparent hover:bg-neutral-200 cursor-pointer"
          >
            <Icon className="size-4 stroke-neutral-700 group-active/viewBtn:scale-[0.80] transition-all duration-200" />
          </button>
        );
      })}
    </div>
  );
};

export default ViewButtons;
