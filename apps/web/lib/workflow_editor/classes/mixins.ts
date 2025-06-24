import { BehaviorSubject } from "rxjs";
import { ExtendedOperationFilterType } from "../types/w_types";
import { rebuildExecutionPlan } from "../utils/w_utils";

export type Constructor<T = {}> = new (...args: any[]) => T;

export const ObservableMixin = <TBase extends Constructor = Constructor>(
  Base: TBase = class {} as TBase
) => {
  return class extends Base {
    private _stream$ = new BehaviorSubject<typeof this>(this);

    // Notify All Class instance Subscribers
    notifyAll() {
      rebuildExecutionPlan();
      this._stream$.next(this);
    }

    // Return the latest class instance's data in readonly
    stream$() {
      return this._stream$.asObservable();
    }
  };
};

export const ThroughputMixin = <TBase extends Constructor = Constructor>(
  Base: TBase = class {} as TBase
) => {
  return class extends Base {
    private _condition?: ExtendedOperationFilterType;

    // Condition: getter + setter
    get condition(): ExtendedOperationFilterType | undefined {
      return this._condition;
    }
    set condition(value: ExtendedOperationFilterType | undefined) {
      this._condition = value;
    }
  };
};
