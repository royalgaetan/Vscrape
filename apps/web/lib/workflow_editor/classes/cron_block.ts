import { OutputDataType, VsCronBlockType } from "../types/w_types";
import { getInvalidInputs } from "../utils/w_utils";
import { ObservableMixin } from "./mixins";

/* {
  minute: "0,15,30",
  hour: "*\/2",
  dayOfMonth: "*",
  month: "1,2,12",
  dayOfWeek: "*",
  timezone: "UTC",
  startDate: "2025-06-10",
  endDate: null,
} 
*/

export const getNewCronBlock = (cronExpPreset?: string) => {
  const presetSplit = cronExpPreset?.split(" ") ?? undefined;

  return new CronBlock({
    configMinute: presetSplit ? presetSplit[0] : "",
    configHour: presetSplit ? presetSplit[1] : "",
    configDayOfMonth: presetSplit ? presetSplit[2] : "*",
    configMonth: presetSplit ? presetSplit[3] : "*",
    configDayOfWeek: presetSplit ? presetSplit[4] : "*",
    configTimezone: "",
    configStartDate: new Date(Date.now()),
  });
};
export class CronBlock extends ObservableMixin() {
  private _id: string;
  private _configMinute: string;
  private _configHour: string;
  private _configDayOfMonth: string;
  private _configMonth: string;
  private _configDayOfWeek: string;
  private _configTimezone?: string;
  private _configStartDate?: Date;
  private _configEndDate?: Date;

  constructor(cron: Omit<VsCronBlockType, "id">) {
    super();
    this._id = crypto.randomUUID();
    this._configMinute = cron.configMinute;
    this._configHour = cron.configHour;
    this._configDayOfMonth = cron.configDayOfMonth;
    this._configMonth = cron.configMonth;
    this._configDayOfWeek = cron.configDayOfWeek;
    this._configTimezone = cron.configTimezone;
    this._configStartDate = cron.configStartDate;
    this._configEndDate = cron.configEndDate;
  }

  // Cron Id: getter
  get id() {
    return this._id;
  }

  // Cron Expression: getter + setter
  get cronExp() {
    return `${this._configMinute} ${this._configHour} ${this._configDayOfMonth} ${this._configMonth} ${this._configDayOfWeek}`;
  }

  // Cron Config/Minute: getter + setter
  get configMinute() {
    return this._configMinute;
  }
  set configMinute(value: string) {
    this._configMinute = value;
    this.notifyAll();
  }

  // Cron Config/Hour: getter + setter
  get configHour() {
    return this._configHour;
  }
  set configHour(value: string) {
    this._configHour = value;
    this.notifyAll();
  }

  // Cron Config/DayOfMonth: getter + setter
  get configDayOfMonth() {
    return this._configDayOfMonth;
  }
  set configDayOfMonth(value: string) {
    this._configDayOfMonth = value;
    this.notifyAll();
  }

  // Cron Config/Month: getter + setter
  get configMonth() {
    return this._configMonth;
  }
  set configMonth(value: string) {
    this._configMonth = value;
    this.notifyAll();
  }

  // Cron Config/Month: getter + setter
  get configDayOfWeek() {
    return this._configDayOfWeek;
  }
  set configDayOfWeek(value: string) {
    this._configDayOfWeek = value;
    this.notifyAll();
  }

  // Cron Config/Timezone: getter + setter
  get configTimezone(): string | undefined {
    return this._configTimezone;
  }
  set configTimezone(value: string | undefined) {
    this._configTimezone = value;
    this.notifyAll();
  }

  // Cron Config/StartDate: getter + setter
  get configStartDate(): Date | undefined {
    return this._configStartDate;
  }
  set configStartDate(value: Date) {
    this._configStartDate = value;
    this.notifyAll();
  }

  // Cron Config/StartDate: getter + setter
  get configEndDate(): Date | undefined {
    return this._configEndDate;
  }
  set configEndDate(value: Date) {
    this._configEndDate = value;
    this.notifyAll();
  }

  // --------------------------------------------------
  // OutputData
  get outputData(): OutputDataType {
    return {
      "Cron Expression": { type: "primitive/cron", value: this.cronExp },
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
      configMinute: this._configMinute,
      configHour: this._configHour,

      configDayOfMonth: this._configDayOfMonth,
      configMonth: this._configMonth,
      configDayOfWeek: this._configDayOfWeek,

      configTimezone: this._configTimezone,
      configStartDate: this._configStartDate,
      configEndDate: this._configEndDate,
    };
  }
}
