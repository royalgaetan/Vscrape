import { OutputDataType } from "../types/w_types";
import { getInvalidInputs } from "../utils/w_utils";
import { ObservableMixin } from "./mixins";

export type SingleVariableAssignation = { varName: string; varValue: any };

export const generateNewVariableAssignationValues =
  (): SingleVariableAssignation => ({
    varName: "",
    varValue: "",
  });

export class SetVariablesBlock extends ObservableMixin() {
  private _id: string;
  private _variableAssignations: SingleVariableAssignation[] = [];

  constructor() {
    super();
    this._id = crypto.randomUUID();
  }

  // SetVariables Block Id: getter
  get id() {
    return this._id;
  }

  // Variables Expression: getter + setter
  get variableAssignations() {
    return this._variableAssignations;
  }
  set variableAssignations(arr: SingleVariableAssignation[]) {
    this._variableAssignations = arr;
    this.notifyAll();
  }

  // ----------------------------------------------------------------------
  // OutputData
  get outputData(): OutputDataType {
    const merged = this._variableAssignations.reduce((acc, as) => {
      const key = as.varName;
      const value = as.varValue;
      if ((key && key.length > 0) || value) {
        acc[key] = { type: "primitive/text", value };
      }
      return acc;
    }, {} as OutputDataType);

    return Object.keys(merged).length > 0 ? merged : {};
  }

  // Input Validation
  hasValidInputs(parentNodeId: string): boolean {
    return this._variableAssignations.every(
      (as) => getInvalidInputs({ from: as, nodeId: parentNodeId }).length === 0
    );
  }

  // To Object
  toObject(): object {
    return {
      id: this._id,
      variableAssignations: this._variableAssignations.map((r) =>
        JSON.stringify(r)
      ),
    };
  }
}
