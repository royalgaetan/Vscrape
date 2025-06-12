import { ClassicPreset } from "rete";
import { LucideIcon } from "lucide-react";
import { VsInput, VsOutput, VsSocket } from "./sockets";
import { workflowEditorSections } from "../constants/w_constants";
import { nodeBlockTypeNames, VsNodeType } from "../types/w_types";
import { OperationBlock } from "./operation_block";
import { PossibleFieldBlockType as FieldBlockType } from "@/lib/workflow_editor/constants/workflow_form_fields_definition";
import { CronBlock } from "./cron_block";
import { ObservableMixin } from "./mixins";
import { WebhookBlock } from "./webhook_block";
import { WaitBlock } from "./wait_block";
import { SetVariablesBlock } from "./setVariables_block";
import { cloneDeep } from "lodash";

export type VsNodeBlockType =
  | OperationBlock[]
  | FieldBlockType[]
  | CronBlock
  | WebhookBlock
  | WaitBlock
  | SetVariablesBlock
  | undefined;
export type VsNodeInputsType = (typeof VsNode.prototype)["inputs"];
export type VsNodeOutputsType = (typeof VsNode.prototype)["outputs"];
export type MoveBlockDirection = "Up" | "Down";

export class VsNode extends ObservableMixin(ClassicPreset.Node) {
  private _iconColor: string;
  private _icon?: LucideIcon;
  private _logoPath?: string;
  private _tooltip?: string;
  private _isDisabled?: boolean;
  private _sectionName?: keyof typeof workflowEditorSections;
  private _blockType: (typeof nodeBlockTypeNames)[number];
  private _blocks?: VsNodeBlockType;

  override inputs: { [key in keyof VsInput]?: VsInput } = {};
  override outputs: {
    [key in keyof VsOutput]?: VsOutput;
  } = {};

  private _anySocket: VsSocket;

  constructor(node: VsNodeType) {
    super(node.label);
    this._iconColor = node.iconColor;
    this._icon = node.icon;
    this._logoPath = node.logoPath;
    this._tooltip = node.tooltip;
    this._isDisabled = node.isDisabled;
    this._sectionName = node.sectionName;
    this._blockType = node.blockType;
    this._blocks = node.blocks as any;
    this._anySocket = new VsSocket("any", this._iconColor);

    this.insertInput();
    this.insertOutput();
  }

  // Input Methods
  insertInput(): void {
    super.addInput(
      crypto.randomUUID(),
      new VsInput(this._anySocket, undefined, this.label.includes("Merge"))
    );
    this.notifyAll();
  }
  deleteInput(key: string): void {
    super.removeInput(key);
    this.notifyAll();
  }

  // Output Methods
  insertOutput(): void {
    super.addOutput(
      crypto.randomUUID(),
      new VsOutput(this._anySocket, undefined, false)
    );
    this.notifyAll();
  }
  deleteOutput(key: string): void {
    super.removeOutput(key);
    this.notifyAll();
  }

  // Getters
  get iconColor() {
    return this._iconColor;
  }
  get icon() {
    return this._icon;
  }
  get logoPath() {
    return this._logoPath;
  }
  get tooltip() {
    return this._tooltip;
  }
  get isDisabled() {
    return this._isDisabled;
  }
  get sectionName() {
    return this._sectionName;
  }
  get blockType() {
    return this._blockType;
  }
  get blocks() {
    return this._blocks;
  }

  // Methods
  removeBlock(id: string) {
    // If Block content is an array like: e.g. OperationBlock[] or FieldBlockType[]
    if (Array.isArray(this._blocks)) {
      this._blocks = this._blocks.filter((b) => b.id !== id) as VsNodeBlockType;
    }
    // Else if Block content is NOT an array: e.g CronBlock
    else {
      this._blocks = undefined;
    }
    this.notifyAll();
  }

  upsertBlock(
    block:
      | OperationBlock
      | FieldBlockType
      | CronBlock
      | WebhookBlock
      | WaitBlock
      | SetVariablesBlock
  ) {
    if (
      block instanceof CronBlock ||
      block instanceof WebhookBlock ||
      block instanceof SetVariablesBlock ||
      block instanceof WaitBlock
    ) {
      this._blocks = block as any;
    } else if (
      this._blockType === "formField" ||
      this._blockType === "operation" ||
      this._blockType === "preview"
    ) {
      // Else Block content is an array like: e.g. OperationBlock[], FieldBlockType[] or BranchBlock[]
      // If no block exist yet:
      if (!this._blocks) {
        this._blocks = [];
      }
      // Update if the block already exists
      const blockIdsList = (this._blocks as any).map((b: any) => b.id);
      if (blockIdsList.includes(block.id)) {
        const indexAt = blockIdsList.findIndex((id: any) => id === block.id);
        (this._blocks as any)[indexAt] = block as any;
      } else {
        // Add if the block doesn't exist yet
        this._blocks = [...(this._blocks as any), block] as VsNodeBlockType;
      }
    }

    this.notifyAll();
  }

  moveBlock(blockId: string, direction: MoveBlockDirection) {
    // Continue: If Block content is an array like: e.g. OperationBlock[], FieldBlockType[] or BranchBlock[]
    if (!Array.isArray(this._blocks)) return;
    // Get corresponding block index from blockId
    const blockIndex = this._blocks.findIndex((b) => b.id === blockId);
    if (blockIndex === -1) return this;

    const targetIndex = direction === "Up" ? blockIndex - 1 : blockIndex + 1;

    // Prevent out-of-bounds move
    if (targetIndex < 0 || targetIndex >= this._blocks.length) return this;

    // Safe Swap: using Array destructuring
    const blockCopy = [...this._blocks];
    [blockCopy[blockIndex], blockCopy[targetIndex]] = [
      blockCopy[targetIndex],
      blockCopy[blockIndex],
    ];

    this._blocks = blockCopy as VsNodeBlockType;
    this.notifyAll();
  }

  duplicate(): VsNode {
    const cloned = new VsNode({
      label: this.label,
      iconColor: this._iconColor,
      icon: this._icon,
      logoPath: this._logoPath,
      tooltip: this._tooltip,
      sectionName: this._sectionName as any,
      blocks: cloneDeep(this._blocks) as any,
      blockType: this._blockType as any,
    });

    return cloned;
  }

  toJSON(): object {
    return {
      // iconColor: this._iconColor,
      // icon: this._icon?.name,
      // logoPath: this._logoPath,
      // tooltip: this._tooltip,
      // sectionName: this._sectionName,
      blockType: this._blockType,
      blocks: getBlockJSON(this._blocks),
      // inputs: this.inputs.toJSON(),
      // outputs: this.outputs,
    };
  }
}

const getBlockJSON = (blocks: VsNodeBlockType) => {
  if (Array.isArray(blocks)) {
    const blocksJSON = [];
    for (const block of blocks) {
      blocksJSON.push(block.toJSON());
    }
    return blocksJSON;
  } else if (blocks !== undefined && !Array.isArray(blocks)) {
    return blocks.toJSON();
  }
};
