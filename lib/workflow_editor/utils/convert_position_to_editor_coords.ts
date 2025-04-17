import { AreaPlugin } from "rete-area-plugin";
import { NodeEditor, GetSchemes, ClassicPreset, BaseSchemes } from "rete";
import { AreaExtra } from "@/app/(protected)/w/[workflowId]/editor/_components/w_editor";

/**
 * Converts the drop position from screen coordinates to editor coordinates.
 * @param event - The drop event containing the screen coordinates.
 * @param area - The AreaPlugin instance managing the editor's viewport.
 * @param editor - The NodeEditor instance managing the editor's state.
 * @returns The position object with x and y coordinates in the editor's coordinate system.
 */
export const convertDropPositionToEditorCoords = (
  position: { x: number; y: number },
  area: AreaPlugin<BaseSchemes, AreaExtra>
): { x: number; y: number } => {
  // Get the editor's current transformation state
  const { x, y, k } = area.area.transform;

  // Get the bounding rectangle of the editor's container
  const box = area.container.getBoundingClientRect();

  // Calculate the drop position relative to the editor's viewport
  const dropX = (position.x - box.left - x) / k;
  const dropY = (position.y - box.top - y) / k;

  // Return the calculated position
  return { x: dropX + -30, y: dropY + -10 };
};
