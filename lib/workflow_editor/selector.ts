import { AreaExtensions } from "rete-area-plugin";
import { SelectorEntity } from "rete-area-plugin/_types/extensions/selectable";

export type SelectionType = "select" | "unselect";
type onFuncSignature = (type: SelectionType, nodeId: string) => void;

export class VsSelector<
  E extends SelectorEntity
> extends AreaExtensions.Selector<E> {
  on: onFuncSignature;

  constructor(on: onFuncSignature) {
    super();
    this.on = on;
  }

  add(entity: E, accumulate: boolean): void {
    super.add(entity, accumulate);
    this.on("select", entity.id);
  }

  remove(entity: Pick<E, "label" | "id">): void {
    super.remove(entity);
    this.on("unselect", entity.id);
  }
}
