import { ClassicPreset } from "rete";
import { LucideIcon } from "lucide-react";
import { VsInput, VsOutput, VsSocket } from "./sockets";
import { deepClone } from "@/lib/utils";
import { workflowEditorSections } from "../constants/w_constants";
import { NodeBlockStringType, WorkflowEditorNode } from "../types/w_types";
import { VsFormInputField } from "./form_field_item";
import { OperationItem } from "./operation_item";

export type VsNodeBlockType = OperationItem[] | VsFormInputField[];
export type VsNodeInputsType = (typeof VsNode.prototype)["inputs"];
export type VsNodeOutputsType = (typeof VsNode.prototype)["outputs"];

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

  upsertBlock(block: OperationItem | VsFormInputField): this {
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
