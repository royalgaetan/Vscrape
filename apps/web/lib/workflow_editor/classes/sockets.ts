import { ClassicPreset } from "rete";
import { ThroughputMixin } from "./mixins";

export class VsSocket extends ClassicPreset.Socket {
  private _color: string = "#76879d"; //Hex

  constructor(name: string, color: string) {
    super(name);
    this._color = color;
  }

  // Color: getter + setter
  get color() {
    return this._color;
  }
  set color(value: string) {
    this._color = value;
  }
}

export class VsInput extends ThroughputMixin(ClassicPreset.Input<VsSocket>) {
  toJSON(): object {
    return {
      input: "data",
    };
  }
}

export class VsOutput extends ThroughputMixin(ClassicPreset.Input<VsSocket>) {
  toJSON(): object {
    return {
      output: "data",
    };
  }
}
