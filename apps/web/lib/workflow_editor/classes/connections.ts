import { ClassicPreset } from "rete";

export class VsConnection<
  T extends ClassicPreset.Node,
> extends ClassicPreset.Connection<T, T> {
  // To Object
  toObject(): object {
    return {
      id: this.id,
      source: this.source,
      sourceOutput: this.sourceOutput,
      target: this.target,
      targetInput: this.targetInput,
    };
  }
}
