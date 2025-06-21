import { OutputDataType } from "../types/w_types";
import { ObservableMixin } from "./mixins";

export class ManualBlock extends ObservableMixin() {
  private _id: string;

  constructor() {
    super();
    this._id = crypto.randomUUID();
  }

  // Manual Trigger Id: getter
  get id() {
    return this._id;
  }

  // --------------------------------------
  // OutputData
  get outputData(): OutputDataType[] | undefined {
    return undefined;
  }

  // Input Validation
  hasValidInputs(): boolean {
    return true;
  }

  // To Object
  toObject(): object {
    return {
      id: this._id,
    };
  }
}
