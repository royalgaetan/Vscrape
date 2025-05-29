import { ClassicPreset } from "rete";
import { LucideIcon } from "lucide-react";
import { VsInput, VsOutput, VsSocket } from "./sockets";
import { deepClone } from "@/lib/utils";
import { workflowEditorSections } from "../constants/w_constants";
import { NodeBlockStringType, WorkflowEditorNode } from "../types/w_types";
import { OperationItem } from "./operation_item";
import { PossibleFieldBlockType as FieldBlockType } from "@/lib/workflow_editor/constants/workflow_form_fields_definition";

export type VsNodeBlockType = OperationItem[] | FieldBlockType[];
export type VsNodeInputsType = (typeof VsNode.prototype)["inputs"];
export type VsNodeOutputsType = (typeof VsNode.prototype)["outputs"];
export type MoveBlockDirection = "Up" | "Down";

export class VsNode extends ClassicPreset.Node {
  public iconColor: string;
  public icon?: LucideIcon;
  public logoPath?: string;
  public tooltip?: string;
  public isSpecialNode?: boolean;
  public isDisabled?: boolean;
  public sectionName?: keyof typeof workflowEditorSections;
  public blockType: NodeBlockStringType;
  public blocks: VsNodeBlockType = [] as [];

  override inputs: { [key in keyof VsInput]?: ClassicPreset.Input<VsSocket> } =
    {};
  override outputs: {
    [key in keyof VsOutput]?: ClassicPreset.Input<VsSocket>;
  } = {};

  constructor(node: WorkflowEditorNode) {
    super(node.label);
    this.iconColor = node.iconColor;
    this.icon = node.icon;
    this.logoPath = node.logoPath;
    this.tooltip = node.tooltip;
    this.isDisabled = node.isDisabled;
    this.isSpecialNode = node.isSpecialNode;
    this.sectionName = node.sectionName;
    this.blockType = node.blockType;

    const anySocket = new VsSocket("any", this.iconColor);

    this.addInput("input", new VsInput(anySocket));
    this.addOutput("output", new VsOutput(anySocket));
  }

  removeBlock(id: string): this {
    console.log("Deleting 1 block...", this.blocks.length);
    this.blocks = this.blocks.filter(
      (block) => block.id !== id
    ) as VsNodeBlockType;
    console.log("🗑️ Block deleted", this.blocks.length);
    return this;
  }

  upsertBlock(block: OperationItem | FieldBlockType): this {
    // Update if the block already exists
    const blockIdsList = this.blocks.map((b) => b.id);

    if (blockIdsList.includes(block.id)) {
      const indexAt = blockIdsList.findIndex((id) => id === block.id);
      this.blocks[indexAt] = block;
      console.log(`🦜 Node ${this.id}: 1 Block Updated`, this.blocks.length);
    }
    // Add if the block doesn't exist yet
    else {
      this.blocks = [...this.blocks, block] as VsNodeBlockType;
      console.log(`🐪 Node ${this.id}: 1 Block Added`, this.blocks.length);
    }

    return this;
  }

  moveBlock(blockId: string, direction: MoveBlockDirection): this {
    // Get corresponding block index from blockId
    const blockIndex = this.blocks.findIndex((b) => b.id === blockId);
    if (blockIndex === -1) return this;

    const targetIndex = direction === "Up" ? blockIndex - 1 : blockIndex + 1;

    // Prevent out-of-bounds move
    if (targetIndex < 0 || targetIndex >= this.blocks.length) return this;

    // Safe Swap: using Array destructuring
    const blockCopy = [...this.blocks];
    [blockCopy[blockIndex], blockCopy[targetIndex]] = [
      blockCopy[targetIndex],
      blockCopy[blockIndex],
    ];

    this.blocks = blockCopy as VsNodeBlockType;
    return this;
  }

  duplicate(): VsNode {
    const cloned = new VsNode({
      label: this.label,
      iconColor: this.iconColor,
      icon: this.icon,
      logoPath: this.logoPath,
      tooltip: this.tooltip,
      sectionName: this.sectionName as any,
      blocks: deepClone(this.blocks) as any,
      blockType: this.blockType as any,
    });

    return cloned;
  }
}
