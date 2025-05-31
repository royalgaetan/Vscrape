import { BehaviorSubject } from "rxjs";

type Constructor<T = {}> = new (...args: any[]) => T;

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
