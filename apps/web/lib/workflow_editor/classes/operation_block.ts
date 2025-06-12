import { workflowEditorNodes } from "../constants/w_constants";
import { vsAnyPrimitives, vsAnyRawTypes } from "../types/data_types";
import {
  OperationParamItem,
  OperationThroughput,
  OperationFilterType,
  VsOperationBlockType,
} from "../types/w_types";
import { ObservableMixin } from "./mixins";

export class OperationBlock extends ObservableMixin() {
  private _id: string;
  private _operationName: string;
  private _operationDescription: string;
  private _nodeName: (typeof workflowEditorNodes)[number]["label"];
  private _params?: (OperationParamItem | OperationParamItem[])[];
  private _inputs?: {
    previousOperationData?: OperationThroughput;
    previousNodeData?: OperationThroughput;
    variables?: OperationThroughput;
  };
  private _inputFilters?: OperationFilterType<
    (vsAnyPrimitives | vsAnyRawTypes)["type"]
  >[];
  private _outputs?: OperationThroughput;
  private _skipDuplicate?: boolean;
  private _loopThrough?: "All items" | number | boolean;

  constructor(operation: VsOperationBlockType) {
    super();
    this._id = crypto.randomUUID();
    this._operationName = operation.operationName;
    this._operationDescription = operation.operationDescription;
    this._nodeName = operation.nodeName;
    this._params = operation.params;
    this._inputs = operation.inputs;
    this._inputFilters = operation.inputFilters;
    this._outputs = operation.outputs;
    this._skipDuplicate = operation.skipDuplicate;
    this._loopThrough = operation.loopThrough;
  }

  // Getters
  get operationName() {
    return this._operationName;
  }
  get operationDescription() {
    return this._operationDescription;
  }
  get nodeName() {
    return this._nodeName;
  }
  hasInputs(): boolean {
    return !!(
      this._inputs?.previousOperationData ||
      this._inputs?.previousNodeData ||
      this._inputs?.variables
    );
  }

  // OperationBlock Id: getter + setter
  get id() {
    return this._id;
  }
  set updateId(value: string) {
    this._id = value;
    this.notifyAll();
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
  get params(): (OperationParamItem | OperationParamItem[])[] | undefined {
    return this._params;
  }
  set params(params: (OperationParamItem | OperationParamItem[])[]) {
    if (!this._params) this._params = [];
    this._params = params;
    this.notifyAll();
  }

  // Params: Add getter + setter
  get outputs(): OperationThroughput | undefined {
    return this._outputs;
  }
  set outputs(outputsVal: OperationThroughput) {
    this._outputs = outputsVal;
    this.notifyAll();
  }

  // Input Filters: Add getter + setter
  get inputFilters():
    | OperationFilterType<(vsAnyPrimitives | vsAnyRawTypes)["type"]>[]
    | undefined {
    return this._inputFilters;
  }
  set inputFilters(
    filters: OperationFilterType<(vsAnyPrimitives | vsAnyRawTypes)["type"]>[]
  ) {
    if (!this._inputFilters) this._inputFilters = [];
    this._inputFilters = filters;
    this.notifyAll();
  }

  // To JSON
  toJSON(): object {
    return {
      OperationBlock: "OperationBlock",
    };
  }
}
