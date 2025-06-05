import { BehaviorSubject } from "rxjs";
import { ExtendedOperationFilterType } from "../types/w_types";

export type Constructor<T = {}> = new (...args: any[]) => T;

export const ObservableMixin = <TBase extends Constructor = Constructor>(
  Base: TBase = class {} as TBase
) => {
  return class extends Base {
    _stream$ = new BehaviorSubject<any>(this);

    // Notify All Class instance Subscribers
    notifyAll() {
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
