import { VsNodeBlockType } from "../types/w_types";
import { ObservableMixin } from "./observable_mixin";

export class ManualBlock extends ObservableMixin() {
  private _id: string;

  constructor() {
    super();
    this._id = crypto.randomUUID();
  }

  // Cron Id: getter
  get id() {
    return this._id;
  }
}
