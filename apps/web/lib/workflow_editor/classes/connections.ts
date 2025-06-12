import { ClassicPreset } from "rete";
import { VsNode } from "./node";

export class VsConnection<
  T extends ClassicPreset.Node
> extends ClassicPreset.Connection<T, T> {
  // constructor(
  //   source: string,
  //   sourceOutput: string,
  //   target: string,
  //   targetInput: string
  // ) {
  //   super(source, sourceOutput, target, targetInput);
  // }

  toJSON(): string {
    return "Connection JSONed";
  }
}
