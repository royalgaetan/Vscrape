import { ObservableMixin } from "./observable_mixin";

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
}
