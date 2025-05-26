import { AreaPlugin } from "rete-area-plugin";
import { NodeEditor, GetSchemes, ClassicPreset, BaseSchemes } from "rete";
import { AreaExtra } from "@/app/(protected)/w/[workflowId]/editor/_components/w_editor";
import { nodeDropPosition } from "../types/w_types";

/**
 * Converts the drop position from screen coordinates to editor coordinates.
 * @param event - The drop event containing the screen coordinates.
 * @param area - The AreaPlugin instance managing the editor's viewport.
 * @param editor - The NodeEditor instance managing the editor's state.
 * @returns The position object with x and y coordinates in the editor's coordinate system.
 */
export const convertDropPositionToEditorCoords = (
  position: nodeDropPosition,
  area: AreaPlugin<BaseSchemes, AreaExtra>
): { x: number; y: number } => {
  // Get the editor's current transformation state
  const { x, y, k } = area.area.transform;
  let dropX;
  let dropY;

  // Get the bounding rectangle of the editor's container
  const box = area.container.getBoundingClientRect();
  if (position === "center") {
    dropX = (box.x - 400) / k;
    dropY = (box.y - 150) / k;
  } else {
    // Calculate the drop position relative to the editor's viewport
    dropX = (position.x - box.left - x) / k + -30;
    dropY = (position.y - box.top - y) / k + -10;
  }

  // Return the calculated position
  return { x: dropX, y: dropY };
};
