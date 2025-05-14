import { ClassicPreset } from "rete";
import { VsNode } from "./node";

export class VsConnection<
  T extends ClassicPreset.Node
> extends ClassicPreset.Connection<T, T> {
  //   constructor(
  //     source: VsNode,
  //     sourceOutput: string,
  //     target: VsNode,
  //     targetInput: string
  //   ) {
  //     super(source, sourceOutput, target, targetInput);
  //   }
}
