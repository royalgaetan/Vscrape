import { ClassicPreset } from "rete";

export class VsInput extends ClassicPreset.Input<VsSocket> {}

export class VsOutput extends ClassicPreset.Input<VsSocket> {}

export class VsSocket extends ClassicPreset.Socket {
  color: string;
  constructor(name: string, color?: string) {
    super(name);
    this.color = color ?? "#76879d";
  }
}
