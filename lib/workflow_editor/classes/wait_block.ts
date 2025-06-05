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
}
