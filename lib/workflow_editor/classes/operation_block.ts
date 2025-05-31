import { workflowEditorNodes } from "../constants/w_constants";
import { vsAnyPrimitives, vsAnyRawTypes } from "../types/data_types";
import {
  OperationParamItem,
  OperationThroughput,
  OperationFilterType,
  VsOperationBlockType,
} from "../types/w_types";
import { ObservableMixin } from "./observable_mixin";

export class OperationBlock extends ObservableMixin() {
  id: string;
  operationName: string;
  operationDescription: string;
  nodeName: (typeof workflowEditorNodes)[number]["label"];
  params?: (OperationParamItem | OperationParamItem[])[];
  inputs?: {
    previousOperationData?: OperationThroughput;
    previousNodeData?: OperationThroughput;
    variables?: OperationThroughput;
  };
  inputFilters?: OperationFilterType<
    (vsAnyPrimitives | vsAnyRawTypes)["type"]
  >[];
  outputs?: OperationThroughput;
  skipDuplicate?: boolean;
  loopThrough?: "All items" | number | boolean;

  constructor(operation: VsOperationBlockType) {
    super();
    this.id = operation.id;
    this.operationName = operation.operationName;
    this.operationDescription = operation.operationDescription;
    this.nodeName = operation.nodeName;
    this.params = operation.params;
    this.inputs = operation.inputs;
    this.inputFilters = operation.inputFilters;
    this.outputs = operation.outputs;
    this.skipDuplicate = operation.skipDuplicate;
    this.loopThrough = operation.loopThrough;
  }

  // Optional: Add methods to manage data
  addParam(param: OperationParamItem | OperationParamItem[]) {
    if (!this.params) this.params = [];
    this.params.push(param);
    this.notifyAll();
  }

  setOutput(output: OperationThroughput) {
    this.outputs = output;
  }

  hasInputs(): boolean {
    return !!(
      this.inputs?.previousOperationData ||
      this.inputs?.previousNodeData ||
      this.inputs?.variables
    );
  }

  isLooping(): boolean {
    return this.loopThrough !== undefined && this.loopThrough !== false;
  }
}
