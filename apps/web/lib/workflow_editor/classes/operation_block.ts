import { workflowEditorNodes } from "../constants/w_constants";
import { vsAnyPrimitives, vsAnyRawTypes } from "../types/data_types";
import {
  OperationItemParam,
  OperationThroughput,
  OperationFilterType,
  VsOperationItemType,
  MoveBlockDirection,
} from "../types/w_types";
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

  // To Object
  toObject(): object {
    return {
      id: this._id,
      nodeName: this._nodeName,
      items: this._items.map((it) => it.toObject()),
    };
  }
}

export class OperationItem extends ObservableMixin() {
  private _id: string;
  private _operationItemName: string;
  private _operationItemDescription: string;
  private _nodeName: (typeof workflowEditorNodes)[number]["label"];

  private _itemParams?: (OperationItemParam | OperationItemParam[])[];
  private _itemInputFilters?: OperationFilterType<
    (vsAnyPrimitives | vsAnyRawTypes)["type"]
  >[];
  private _itemOutputs?: OperationThroughput;

  private _skipDuplicate?: boolean;
  private _loopThrough?: "All items" | number | boolean;

  constructor(operationItem: VsOperationItemType) {
    super();
    this._id = operationItem.id ?? crypto.randomUUID();
    this._nodeName = operationItem.nodeName;

    this._operationItemName = operationItem.operationItemName;
    this._operationItemDescription = operationItem.operationItemDescription;
    this._itemParams = operationItem.itemParams;
    this._itemInputFilters = operationItem.itemInputFilters;
    this._itemOutputs = operationItem.itemOutputs;
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

  // Output: Add getter + setter
  get itemOutputs(): OperationThroughput | undefined {
    return this._itemOutputs;
  }
  set itemOutputs(outputsVal: OperationThroughput) {
    this._itemOutputs = outputsVal;
    this.notifyAll();
  }

  // Input Filters: Add getter + setter
  get itemInputFilters():
    | OperationFilterType<(vsAnyPrimitives | vsAnyRawTypes)["type"]>[]
    | undefined {
    return this._itemInputFilters;
  }
  set itemInputFilters(
    filters: OperationFilterType<(vsAnyPrimitives | vsAnyRawTypes)["type"]>[]
  ) {
    if (!this._itemInputFilters) this._itemInputFilters = [];
    this._itemInputFilters = filters;
    this.notifyAll();
  }

  // ------------------------------------------------------------
  // To Object
  toObject(): object {
    return {
      id: this._id,
      nodeName: this._nodeName,
      operationItemName: this._operationItemName,
      skipDuplicate: this._skipDuplicate,
      loopThrough: this._loopThrough,

      itemParams: this._itemParams?.flatMap((p) => JSON.stringify(p)),
      itemInputFilters: this._itemInputFilters?.flatMap((p) =>
        JSON.stringify(p)
      ),
      itemOutputs: JSON.stringify(this._itemOutputs),
    };
  }
}
