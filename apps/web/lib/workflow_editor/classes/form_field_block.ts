import {
  MoveBlockDirection,
  OutputDataType,
  VsFormFieldItemType,
  VsFormInputFieldTypeUnion,
} from "../types/w_types";
import { getInvalidInputs } from "../utils/w_utils";
import { ObservableMixin } from "./mixins";

export class FormBlock extends ObservableMixin() {
  private _id: string;
  private _formName: string = "Form";
  private _formDescription: string = "";

  private _fields: FormFieldItem[] = [];

  constructor() {
    super();
    this._id = crypto.randomUUID();
  }

  // Form Id: getter
  get id() {
    return this._id;
  }

  // Form Name: getter
  get formName() {
    return this._formName;
  }
  set formName(value: string) {
    this._formName = value;
    this.notifyAll();
  }

  // Form Description: getter
  get formDescription(): string {
    return this._formDescription;
  }
  set formDescription(value: string) {
    this._formDescription = value;
    this.notifyAll();
  }

  // Form Fields: getter
  get fields(): FormFieldItem[] {
    return this._fields;
  }

  // Methods
  removeFieldItem(id: string) {
    this._fields = this._fields.filter((field) => field.id !== id);
    this.notifyAll();
  }

  upsertFieldItem(item: FormFieldItem) {
    // Update if the Item already exists within Fields list
    const itemIdsList = this._fields.map((f) => f.id);
    if (itemIdsList.includes(item.id)) {
      const indexAt = itemIdsList.findIndex((id) => id === item.id);
      this._fields[indexAt] = item;
    }

    // Add if the Item doesn't exist yet inside the Fields list: add it
    else {
      this._fields = [...this._fields, item];
    }
    this.notifyAll();
  }

  moveFieldItem(itemId: string, direction: MoveBlockDirection) {
    // Get corresponding Field Item index from ItemId
    const itemIndex = this._fields.findIndex((f) => f.id === itemId);
    if (itemIndex === -1) return this;

    const targetIndex = direction === "Up" ? itemIndex - 1 : itemIndex + 1;

    // Prevent out-of-bounds move
    if (targetIndex < 0 || targetIndex >= this._fields.length) return this;

    // Safe Swap: using Array destructuring
    const itemCopy = [...this._fields];
    [itemCopy[itemIndex], itemCopy[targetIndex]] = [
      itemCopy[targetIndex],
      itemCopy[itemIndex],
    ];

    this._fields = itemCopy;
    this.notifyAll();
  }

  // ---------------------------------------------------------------------------

  // OutputData
  get outputData(): OutputDataType {
    const merged = this._fields.reduce((acc, f) => {
      const key = f.fieldLabel;
      const fieldValue = f.fieldValue;
      const fieldType = f.fieldType;
      if (fieldValue !== undefined) {
        acc[key] = {
          type: fieldType as any,
          value: fieldValue,
        };
      }
      return acc;
    }, {} as OutputDataType);

    return Object.keys(merged).length > 0 ? merged : {};
  }

  // Input Validation
  hasValidInputs(parentNodeId: string): boolean {
    return this._fields.every((f) => f.hasValidInputs(parentNodeId));
  }

  // To Object
  toObject(): object {
    return {
      id: this._id,
      formName: this._formName,
      formDescription: this._formDescription,
      fields: this._fields.map((f) => f.toObject()),
    };
  }
}

export class FormFieldItem extends ObservableMixin() {
  private _id: string;
  private _fieldName: string;
  private _fieldLabel: string;
  private _fieldType: VsFormInputFieldTypeUnion["type"];
  private _fieldValue: any;
  private _fieldDescription?: string;
  private _fieldPlaceholder?: string;

  private _fieldDefaultPlaceholder?: string;
  private _fieldDefaultDescription?: string;

  private _fieldValueToPickFrom?: string[];
  private _isOptional?: boolean;
  private _isHidden?: boolean;

  // Special
  private _isMultiline?: boolean;
  private _acceptedFileExtensions?: string[];

  private _fieldOutputData?: OutputDataType;

  constructor(formField: VsFormFieldItemType) {
    super();
    this._id = formField.id ?? crypto.randomUUID();

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

    this._isMultiline = formField.isMultiline;
    this._acceptedFileExtensions = formField.acceptedFileExtensions;
  }

  // Field Id: getter + setter
  get id() {
    return this._id;
  }
  set updateId(value: string) {
    this._id = value;
    this.notifyAll();
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

  // -----------------------------------------------
  // ------------------- Specials ------------------
  // -----------------------------------------------

  // Field IsMultiline: getter + setter
  get isMultiline(): boolean | undefined {
    return this._isMultiline;
  }
  set isMultiline(isMultiline: boolean | undefined) {
    this._isMultiline = isMultiline;
    this.notifyAll();
  }

  // Field Accepted File Extensions: getter + setter
  get acceptedFileExtensions(): string[] | undefined {
    return this._acceptedFileExtensions;
  }
  set acceptedFileExtensions(extensionsList: string[] | undefined) {
    this._acceptedFileExtensions = extensionsList;
    this.notifyAll();
  }

  // -----------------------------------------------
  // ---------------- End Specials -----------------
  // -----------------------------------------------

  // Output: Add getter + setter
  get fieldOutputData(): OutputDataType | undefined {
    return this._fieldOutputData;
  }
  set fieldOutputData(outputsVal: OutputDataType) {
    this._fieldOutputData = outputsVal;
    this.notifyAll();
  }

  // Input Validation
  hasValidInputs(nodeParentId: string): boolean {
    return (
      getInvalidInputs({ from: this, nodeId: nodeParentId, itemId: this._id })
        .length === 0
    );
  }

  // To Object
  toObject(): object {
    return {
      id: this._id,
      fieldName: this._fieldName,
      fieldLabel: this.fieldLabel,

      fieldValue: this._fieldValue,
      fieldDescription: this._fieldDescription,
      fieldPlaceholder: this._fieldPlaceholder,

      fieldValueToPickFrom: this._fieldValueToPickFrom,
      isOptional: this._isOptional,
      isHidden: this._isHidden,

      isMultiline: this._isMultiline,
      acceptedFileExtensions: this._acceptedFileExtensions,
    };
  }
}
