import { OutputDataType } from "../types/w_types";
import { ObservableMixin } from "./mixins";

export class WaitBlock extends ObservableMixin() {
  private _id: string;
  private _durationMs: number; // in milliseconds

  constructor() {
    super();
    this._id = crypto.randomUUID();
    this._durationMs = 5000; // Init with 5 secs
  }

  // Wait Block Id: getter
  get id() {
    return this._id;
  }

  // Duration Ms
  get durationMs() {
    return this._durationMs;
  }
  set durationMs(value: number) {
    this._durationMs = value;
    this.notifyAll();
  }

  // --------------------------------------------------
  // OutputData
  get outputData(): OutputDataType | undefined {
    return {
      duration: {
        type: "primitive/milliseconds",
        value: this._durationMs,
      },
    };
  }

  // Input Validation
  hasValidInputs(): boolean {
    return true;
  }

  // To Object
  toObject(): object {
    return {
      id: this._id,
      durationMs: this._durationMs,
    };
  }
}
