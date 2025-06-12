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
}
