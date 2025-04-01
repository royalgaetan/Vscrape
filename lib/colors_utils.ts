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
  red: "#EF4444", // red-500
  amber: "#F59E0B", // amber-500
  green: "#10B981", // green-500
  teal: "#0D9488", // teal-500
  blue: "#3B82F6", // blue-500
  indigo: "#9333EA", // indigo-500
  purple: "#8B5CF6", // purple-500
  pink: "#F43F5E", // pink-500
  yellow: "#D97706", // yellow-500
  slate: "#64748B", // slate-500
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
