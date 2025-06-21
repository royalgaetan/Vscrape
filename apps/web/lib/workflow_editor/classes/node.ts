import { ClassicPreset } from "rete";
import { LucideIcon } from "lucide-react";
import { VsInput, VsOutput, VsSocket } from "./sockets";
import { workflowEditorSections } from "../constants/w_constants";
import {
  nodeBlockTypeNames,
  OutputDataType,
  VsNodeType,
} from "../types/w_types";
import { OperationBlock } from "./operation_block";
import { CronBlock } from "./cron_block";
import { ObservableMixin } from "./mixins";
import { WebhookBlock } from "./webhook_block";
import { WaitBlock } from "./wait_block";
import { SetVariablesBlock } from "./setVariables_block";
import { cloneDeep } from "lodash";
import { FormBlock } from "./form_field_block";

export type VsNodeBlockType =
  | OperationBlock
  | FormBlock
  | CronBlock
  | WebhookBlock
  | WaitBlock
  | SetVariablesBlock
  | undefined;
export type VsNodeInputsType = (typeof VsNode.prototype)["inputs"];
export type VsNodeOutputsType = (typeof VsNode.prototype)["outputs"];

export class VsNode extends ObservableMixin(ClassicPreset.Node) {
  private _iconColor: string;
  private _icon?: LucideIcon;
  private _logoPath?: string;
  private _tooltip?: string;
  private _isDisabled?: boolean;
  private _sectionName?: keyof typeof workflowEditorSections;
  private _blockType: (typeof nodeBlockTypeNames)[number];
  private _block?: VsNodeBlockType;

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
    this._block = node.block as any;
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

  // Block: getter + setter
  get block() {
    return this._block;
  }
  set block(value: VsNodeBlockType) {
    this._block = value;
    this.notifyAll();
  }

  // Input Validation
  hasValidInputs(): boolean {
    return this.block?.hasValidInputs() ?? false;
  }

  duplicate(): VsNode {
    const cloned = new VsNode({
      label: this.label,
      iconColor: this._iconColor,
      icon: this._icon,
      logoPath: this._logoPath,
      tooltip: this._tooltip,
      sectionName: this._sectionName as any,
      block: cloneDeep(this._block) as any,
      blockType: this._blockType as any,
    });

    return cloned;
  }

  // OutputData
  get outputData(): OutputDataType | undefined {
    return this._block?.outputData;
  }

  // To Object
  toObject(): object {
    return {
      id: this.id,
      label: this.label,
      block: this._block?.toObject(),
    };
  }
}
