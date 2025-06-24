import ShortUniqueId from "short-unique-id";
import { ObservableMixin } from "./mixins";
import { OutputDataType } from "../types/w_types";
import { getInvalidInputs } from "../utils/w_utils";

const { randomUUID } = new ShortUniqueId({ length: 15 });
export const httpMethodsList = ["GET", "POST"] as const;

export class WebhookBlock extends ObservableMixin() {
  private _id: string;
  private _endpointUrl: string;
  private _httpMethod: (typeof httpMethodsList)[number];
  private _authToken?: string;

  constructor() {
    super();
    this._id = crypto.randomUUID();
    this._httpMethod = "GET";

    // Generate Short Url for this Webhook
    this._endpointUrl = `${randomUUID(20)}`;
  }

  // Webhook Id: getter
  get id() {
    return this._id;
  }

  // EndpointUrl: getter + setter
  get endpointUrl() {
    return this._endpointUrl;
  }
  set endpointUrl(value: string) {
    this._endpointUrl = `${value}_${randomUUID(7)}`;
    this.notifyAll();
  }

  // Http Method: getter + setter
  get httpMethod() {
    return this._httpMethod;
  }
  set httpMethod(value: (typeof httpMethodsList)[number]) {
    this._httpMethod = value;
    this.notifyAll();
  }

  // Auth Token: getter + setter
  get authToken(): string | undefined {
    return this._authToken;
  }
  set authToken(value: string | undefined) {
    this._authToken = value;
    this.notifyAll();
  }

  // --------------------------------------------------
  // OutputData
  get outputData(): OutputDataType {
    return {
      endpointUrl: {
        type: "primitive/url",
        value: this._endpointUrl,
      },
      httpMethod: {
        type: "primitive/customSwitch",
        value: this._httpMethod,
      },
      ...(this._authToken && {
        authToken: {
          type: "primitive/text",
          value: this._authToken,
        },
      }),
    };
  }

  // Input Validation
  hasValidInputs(parentNodeId: string): boolean {
    return getInvalidInputs({ from: this, nodeId: parentNodeId }).length === 0;
  }

  // To Object
  toObject(): object {
    return {
      id: this._id,
      endpointUrl: this._endpointUrl,
      httpMethod: this._httpMethod,
      authToken: this._authToken,
    };
  }
}
