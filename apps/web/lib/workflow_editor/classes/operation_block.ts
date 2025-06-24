import { workflowEditorNodes } from "../constants/w_constants";
import { vsAnyPrimitives, vsAnyRawTypes } from "../types/data_types";
import {
  OperationItemParam,
  OperationFilterType,
  VsOperationItemType,
  MoveBlockDirection,
  OutputDataType,
} from "../types/w_types";
import { getInvalidInputs } from "../utils/w_utils";
import { ObservableMixin } from "./mixins";

export class OperationBlock extends ObservableMixin() {
  private _id: string;
  private _nodeName: (typeof workflowEditorNodes)[number]["label"];
  private _items: OperationItem[] = [];

  constructor(nodeName: (typeof workflowEditorNodes)[number]["label"]) {
    super();
    this._id = crypto.randomUUID();
    this._nodeName = nodeName;
  }

  // Getters
  get id() {
    return this._id;
  }
  get nodeName() {
    return this._nodeName;
  }
  get items(): OperationItem[] {
    return this._items;
  }

  // Methods
  removeItem(id: string) {
    this._items = this._items.filter((it) => it.id !== id);
    this.notifyAll();
  }

  upsertItem(item: OperationItem) {
    // Update if the Item already exists within Item list
    const itemIdsList = this._items.map((it) => it.id);
    if (itemIdsList.includes(item.id)) {
      const indexAt = itemIdsList.findIndex((id) => id === item.id);
      this._items[indexAt] = item;
    }

    // Add if the Item doesn't exist yet inside the Item list: add it
    else {
      this._items = [...this._items, item];
    }
    this.notifyAll();
  }

  moveItem(itemId: string, direction: MoveBlockDirection) {
    // Get corresponding Item index from ItemId
    const itemIndex = this._items.findIndex((it) => it.id === itemId);
    if (itemIndex === -1) return this;

    const targetIndex = direction === "Up" ? itemIndex - 1 : itemIndex + 1;

    // Prevent out-of-bounds move
    if (targetIndex < 0 || targetIndex >= this._items.length) return this;

    // Safe Swap: using Array destructuring
    const itemCopy = [...this._items];
    [itemCopy[itemIndex], itemCopy[targetIndex]] = [
      itemCopy[targetIndex],
      itemCopy[itemIndex],
    ];

    this._items = itemCopy;
    this.notifyAll();
  }

  // -----------------------------------------------------------------------------

  // OutputData
  get outputData(): OutputDataType {
    const merged = this._items.reduce((acc, it) => {
      const key = it.operationItemName;
      const value = it.itemOutputData;
      if (value && key) {
        acc[key] = value;
      }
      return acc;
    }, {} as OutputDataType);

    return Object.keys(merged).length > 0 ? merged : {};
  }

  // Input Validation
  hasValidInputs(parentNodeId: string): boolean {
    return this._items.every((it) => it.hasValidInputs(parentNodeId));
  }

  // To Object
  toObject(): object {
    return {
      id: this._id,
      nodeName: this._nodeName,
      items: this._items.map((it) => it.toObject()),
      outputData: this._items.map((it) => ({ [it.id]: it.itemOutputData })),
    };
  }
}

export class OperationItem extends ObservableMixin() {
  private _id: string;
  private _operationItemName: string;
  private _operationItemDescription: string;
  private _nodeName: (typeof workflowEditorNodes)[number]["label"];

  private _itemParams?: (OperationItemParam | OperationItemParam[])[];
  private _itemOutputData: OutputDataType;

  private _skipDuplicate?: boolean;
  private _loopThrough?: "All items" | number | boolean;

  constructor(operationItem: VsOperationItemType) {
    super();
    this._id = operationItem.id ?? crypto.randomUUID();
    this._nodeName = operationItem.nodeName;

    this._operationItemName = operationItem.operationItemName;
    this._operationItemDescription = operationItem.operationItemDescription;
    this._itemParams = operationItem.itemParams;
    this._itemOutputData = operationItem.itemOutputData ?? {};
    this._skipDuplicate = operationItem.skipDuplicate;
    this._loopThrough = operationItem.loopThrough;
  }

  // Getters
  get id() {
    return this._id;
  }
  get nodeName() {
    return this._nodeName;
  }
  get operationItemName() {
    return this._operationItemName;
  }
  get operationItemDescription() {
    return this._operationItemDescription;
  }

  // Skip Duplicate: getter + setter
  get skipDuplicate(): boolean | undefined {
    return this._skipDuplicate;
  }
  set skipDuplicate(value: boolean | undefined) {
    this._skipDuplicate = value;
    this.notifyAll();
  }

  // Skip Duplicate: getter + setter
  get loopThrough(): "All items" | number | boolean | undefined {
    return this._loopThrough;
  }
  set loopThrough(value: "All items" | number | boolean | undefined) {
    this._loopThrough = value;
    this.notifyAll();
  }

  // Params: Add getter + setter
  get itemParams(): (OperationItemParam | OperationItemParam[])[] | undefined {
    return this._itemParams;
  }

  set itemParams(params: (OperationItemParam | OperationItemParam[])[]) {
    if (!this._itemParams) this._itemParams = [];
    this._itemParams = params;
    this.notifyAll();
  }

  // ------------------------------------------------------------
  // OutputData: Add getter + setter
  get itemOutputData(): OutputDataType {
    return this._itemOutputData ?? {};
  }
  set itemOutputData(outputsVal: OutputDataType) {
    this._itemOutputData = outputsVal;
    this.notifyAll();
  }

  // Input Validation
  hasValidInputs(parentNodeId: string): boolean {
    return (
      getInvalidInputs({ from: this, nodeId: parentNodeId, itemId: this._id })
        .length === 0
    );
  }

  // To Object
  toObject(): object {
    return {
      id: this._id,
      nodeName: this._nodeName,
      operationItemName: this._operationItemName,
      skipDuplicate: this._skipDuplicate,
      loopThrough: this._loopThrough,
      itemParams: this._itemParams?.flatMap((p) => JSON.stringify(p)),
    };
  }
}
