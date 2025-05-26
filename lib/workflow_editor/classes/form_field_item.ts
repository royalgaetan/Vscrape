import { VsFormInputFieldType } from "../types/w_types";

export class VsFormInputField {
  id: string;
  nodeName: "Form Input";
  fieldType: string;
  fieldName: string;
  fieldValue: any;
  fieldDescription: string;
  fieldPlaceholder: string;
  fieldValueToPickFrom?: string[];
  isOptional?: boolean;

  // Specific
  isTextArea?: boolean;

  constructor(formField: VsFormInputFieldType) {
    this.id = formField.id;
    this.nodeName = "Form Input";
    this.fieldType = formField.type;
    this.fieldValue = formField.value;
    this.fieldName = formField.fieldName;
    this.fieldDescription = formField.fieldDescription;
    this.fieldPlaceholder = formField.fieldPlaceholder;
    this.fieldValueToPickFrom = formField.fieldValueToPickFrom;
    this.isOptional = formField.isOptional;
  }

  isRequired(): boolean {
    return !!this.isOptional;
  }

  getFieldName(): string {
    return this.fieldName || "Unnamed Field";
  }

  getDisplayValue(): any {
    return this.fieldValue ?? null;
  }
}
