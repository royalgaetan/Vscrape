import { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bell,
  Cloudy,
  Cpu,
  DatabaseZap,
  FileUp,
  Globe,
  PlugZap,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

export const COLORS = {
  sidebarColor: "#F8F8F7",
  neutralDark: "#33333",
};

export const WORKFLOW_COLORS = {
  red: "#e66b6b", // softer red
  amber: "#F59E0B", // golden amber
  lime: "#9fcf4f", // fresh lime
  green: "#4fbf8f", // minty green
  teal: "#36a69a", // turquoise teal
  blue: "#5b8ee6", // calm blue
  indigo: "#7c70d8", // mid indigo
  purple: "#6460aa", // soft violet (app primary)
  fuchsia: "#d762c5", // gentle fuchsia
  pink: "#e4728c", // balanced pink
  yellow: "#e2a84b", // sunny yellow
  slate: "#76879d", // mid slate
  stone: "#8f837a", // warm gray-brown
};

export const getIconColor = (icon: LucideIcon): string => {
  switch (icon) {
    case Zap:
      return "#dc2626"; // red-600
    case Workflow:
      return "#ca8a04"; // yellow-600
    case Globe:
      return "#16a34a"; // green-600
    case Cpu:
      return "#db2777"; // pink-600
    case FileUp:
      return "#c026d3"; // fuchsia-600
    case Cloudy:
      return "#2563eb"; // blue-600
    case DatabaseZap:
      return "#737373"; // neutral-600
    case Users:
      return "#9333ea"; // purple-600
    case BarChart3:
      return "#ea580c"; // orange-600
    case Bell:
      return "#ca8a04"; // yellow-600
    case PlugZap:
      return "#059669"; // emerald-600
    default:
      return "#475569"; // slate-600
  }
};
