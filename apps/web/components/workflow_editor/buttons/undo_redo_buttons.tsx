import { LucideIcon, Undo2, Redo2 } from "lucide-react";

const UndoRedoButtons = () => {
  const doButtons: { icon: LucideIcon; name: string }[] = [
    {
      icon: Undo2,
      name: "Undo",
    },
    {
      icon: Redo2,
      name: "Redo",
    },
  ];

  return (
    <div className="rounded-2xl border divide-x-2 overflow-clip flex h-7 w-min bg-white">
      {doButtons.map((el) => {
        const Icon = el.icon;
        return (
          <button
            key={el.name}
            className="w-10 flex justify-center group/viewBtn items-center bg-transparent hover:bg-neutral-200 cursor-pointer"
          >
            <Icon className="size-4 stroke-neutral-700 group-active/viewBtn:scale-[0.80] transition-all duration-200" />
          </button>
        );
      })}
    </div>
  );
};

export default UndoRedoButtons;
