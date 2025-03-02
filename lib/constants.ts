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

export const HomeTextareaPlaceholders = [
  "What custom automation do you have in mind?",
  "Describe the automation you need, and I’ll make it happen!",
  "Tell me what you want to automate, and I'll build it for you.",
  "Need automation? Explain it here, and I’ll take care of the rest!",
  "Describe your workflow, and I'll automate it for you.",
  "What do you want to automate? Write it down, and I’ll handle it.",
  "Drop your automation idea here—I’ll bring it to life!",
  "Tell me about the task, and I’ll automate it for you.",
  "Explain your automation needs, and I’ll build it for you!",
  "Write down what you need automated, and I’ll create it.",
  "Just type your automation request—I’ll handle the rest!",
];
