import {
  Database,
  Tag,
  FileText,
  ListOrdered,
  Crop,
  LineChart,
  BarChart,
  TrendingUp,
  Bell,
  MoreHorizontal,
  SmileIcon,
} from "lucide-react";

export const appName = "Vscrape";

export const appUseCases = {
  "Competitor Price Tracking": BarChart,
  "Review Sentiment Analysis": SmileIcon,
  "Image Resizing": Crop,
  "Product Scraping": Database,
  "Price Monitoring": Tag,
  "Market Trend Tracking": LineChart,
  "Sales Trend Analysis": TrendingUp,
  "Catalog Updates": FileText,
  "Attribute Extraction": ListOrdered,
  "Inventory Alerts": Bell,
  Other: MoreHorizontal,
};

export const appUseCaseNames = Object.keys(
  appUseCases
) as (keyof typeof appUseCases)[];

export const avatarBackgroundColors = [
  "b6e3f4", // Light Blue
  "c0aede", // Light Purple
  "d1d4f9", // Light Periwinkle
  "ffd5dc", // Light Pink
  "ffdfbf", // Light Peach
  "a8e6cf", // Light Mint Green
  "ff8b94", // Soft Red
  "f8b195", // Soft Coral
  "f67280", // Soft Rose
  "c06c84", // Soft Plum
];
