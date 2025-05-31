import { VsNodeBlockType } from "../types/w_types";
import { ObservableMixin } from "./observable_mixin";

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

export const getNewCronBlock = () =>
  new CronBlock({
    cronExp: "* * * * *",
    configMinute: "",
    configHour: "",
    configDayOfMonth: "*",
    configMonth: "*",
    configDayOfWeek: "*",
    configTimezone: "",
    configStartDate: new Date(Date.now()),
  });

export class CronBlock extends ObservableMixin() {
  private _id: string;
  private _cronExp: string;
  private _configMinute: string;
  private _configHour: string;
  private _configDayOfMonth: string;
  private _configMonth: string;
  private _configDayOfWeek: string;
  private _configTimezone?: string;
  private _configStartDate?: Date;
  private _configEndDate?: Date;

  constructor(cron: Omit<VsNodeBlockType, "id">) {
    super();
    this._id = crypto.randomUUID();
    this._cronExp = cron.cronExp;
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
    return this._cronExp;
  }
  set cronExp(value: string) {
    this._cronExp = value;
    this.notifyAll();
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
  set configTimezone(value: string) {
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
}
