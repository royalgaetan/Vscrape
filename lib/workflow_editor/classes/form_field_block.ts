import {
  VsFormInputFieldType,
  VsFormInputFieldTypeUnion,
} from "../types/w_types";
import { ObservableMixin } from "./observable_mixin";

export class FormFieldBlock extends ObservableMixin() {
  private _id: string;
  private _fieldName: string;
  private _fieldLabel: string;
  private _fieldValue: any;
  private _fieldDescription?: string;
  private _fieldPlaceholder?: string;
  private _fieldDefaultPlaceholder?: string;
  private _fieldDefaultDescription?: string;
  private _fieldValueToPickFrom?: string[];
  private _isOptional?: boolean;
  private _isHidden?: boolean;
  private _fieldType: VsFormInputFieldTypeUnion["type"];

  constructor(formField: Omit<VsFormInputFieldType, "id">) {
    super();
    this._id = crypto.randomUUID();
    this._fieldName = formField.fieldName;
    this._fieldLabel = formField.fieldLabel;
    this._fieldType = formField.type;
    this._fieldValue = formField.value;
    this._fieldDescription = formField.fieldDescription;
    this._fieldPlaceholder = formField.fieldPlaceholder;
    this._fieldDefaultPlaceholder = formField.fieldDefaultPlaceholder;
    this._fieldDefaultDescription = formField.fieldDefaultDescription;
    this._fieldValueToPickFrom = formField.fieldValueToPickFrom;
    this._isOptional = formField.isOptional;
    this._isHidden = formField.isHidden;
  }

  // Field Id: getter
  get id() {
    return this._id;
  }

  // Field Name: getter
  get fieldName() {
    return this._fieldName;
  }

  // Field Type: getter
  get fieldType() {
    return this._fieldType;
  }

  // Field Label: getter + setter
  get fieldLabel() {
    return this._fieldLabel;
  }
  set fieldLabel(value: string) {
    this._fieldLabel = value;
    this.notifyAll();
  }

  // Field Value: getter + setter
  get fieldValue(): any {
    return this._fieldValue;
  }
  set fieldValue(value: any) {
    this._fieldValue = value;
    this.notifyAll();
  }

  // Field Default Description: getter
  get fieldDefaultDescription(): string | undefined {
    return this._fieldDefaultDescription;
  }
  // Field Description: getter + setter
  get fieldDescription(): string | undefined {
    return this._fieldDescription;
  }
  set fieldDescription(value: string) {
    this._fieldDescription = value;
    this.notifyAll();
  }

  // Field Default Placeholder: getter
  get fieldDefaultPlaceholder(): string | undefined {
    return this._fieldDefaultPlaceholder;
  }
  // Field Placeholder: getter + setter
  get fieldPlaceholder(): string | undefined {
    return this._fieldPlaceholder;
  }
  set fieldPlaceholder(value: string) {
    this._fieldPlaceholder = value;
    this.notifyAll();
  }

  // Field ValueToPickFrom: getter + setter
  get fieldValueToPickFrom(): string[] | undefined {
    return this._fieldValueToPickFrom;
  }
  set fieldValueToPickFrom(value: string[]) {
    this._fieldValueToPickFrom = value;
    this.notifyAll();
  }

  // Field IsOptional: getter + setter
  get isOptional(): boolean | undefined {
    return this._isOptional;
  }
  set isOptional(value: boolean) {
    this._isOptional = value;
    this.notifyAll();
  }

  // Field IsHidden: getter + setter
  get isHidden(): boolean | undefined {
    return this._isHidden;
  }
  set isHidden(value: boolean) {
    this._isHidden = value;
    this.notifyAll();
  }
}
