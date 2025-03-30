import { SettingItemSelectDataType } from "@/app/(protected)/_settings/_components/settings_item_select";
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
  LucideIcon,
  Workflow,
  BarChart3,
  PlugZap,
  Users,
  GlobeIcon,
  Cpu,
  Cloudy,
  FileUp,
  Lightbulb,
} from "lucide-react";
import { AppsConnectionType, planNames, PlanType } from "./types";

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

export const avatarBackgroundColors2 = [
  "#93c5fd", // Blue-300
  "#a5b4fc", // Indigo-300
  "#c4b5fd", // Purple-300
  "#f0abfc", // Fuchsia-300
  "#f9a8d4", // Pink-300
  "#fda4af", // Rose-300
  "#fca5a5", // Red-300
  "#fdba74", // Orange-300
  "#fcd34d", // Amber-300
  "#fde047", // Yellow-300
  "#bef264", // Lime-300
  "#86efac", // Green-300
  "#5eead4", // Teal-300
  "#67e8f9", // Cyan-300
  "#7dd3fc", // Sky-300
  "#a3e635", // Lime-400
  "#4ade80", // Green-400
  "#2dd4bf", // Teal-400
  "#22d3ee", // Cyan-400
  "#38bdf8", // Sky-400
  "#60a5fa", // Blue-400
  "#818cf8", // Indigo-400
  "#a78bfa", // Purple-400
  "#d8b4fe", // Violet-300
  "#e879f9", // Fuchsia-400
  "#f472b6", // Pink-400
  "#fb7185", // Rose-400
];

export const reportTypes = [
  { label: "UI Display Issue", value: "ui_issue" },
  { label: "Feature Not Working", value: "feature_not_working" },
  { label: "Slow Performance", value: "performance_issue" },
  { label: "App Crash / Error Message", value: "app_crash" },
  { label: "Data Not Saving / Syncing", value: "data_sync_issue" },
  { label: "Login / Authentication Problem", value: "auth_issue" },
  { label: "Notification Not Received", value: "notification_issue" },
  { label: "Broken Link or Button", value: "broken_link" },
  { label: "Form Submission Problem", value: "form_issue" },
  { label: "Other (Please Specify)", value: "other" },
] as const;

export const reportTypeValues = reportTypes.map((r) => r.value) as [
  string,
  ...string[]
];

export const featureCategories = [
  { label: "UI/UX", value: "ui_ux" },
  { label: "Security", value: "security" },
  { label: "Performance", value: "performance" },
  { label: "Integrations", value: "integrations" },
  { label: "Bug Fixes", value: "bug_fixes" },
  { label: "New Features", value: "new_features" },
  { label: "API", value: "api" },
  { label: "Documentation", value: "documentation" },
  { label: "Analytics", value: "analytics" },
  { label: "Mobile App", value: "mobile_app" },
  { label: "Accessibility", value: "accessibility" },
  { label: "Other", value: "other" },
] as const;

export const featureCategoriesValues = featureCategories.map(
  (r) => r.value
) as [string, ...string[]];

export const featureFrequencyOfUse = ["Daily", "Weekly", "Occasionally"];

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

export const appLanguages: SettingItemSelectDataType = {
  "": [
    { value: "en", label: "English", disabled: false },
    { value: "fr", label: "Français", disabled: false },
    { value: "es", label: "Español", disabled: true },
    { value: "de", label: "Deutsch", disabled: true },
    { value: "zh", label: "中文 (Chinese)", disabled: true },
    { value: "ar", label: "العربية (Arabic)", disabled: true },
    { value: "hi", label: "हिन्दी (Hindi)", disabled: true },
    { value: "pt", label: "Português", disabled: true },
    { value: "ru", label: "Русский (Russian)", disabled: true },
    { value: "ja", label: "日本語 (Japanese)", disabled: true },
  ],
};

export const appTimezones: SettingItemSelectDataType = {
  Americas: [
    { value: "America/Los_Angeles", label: "(GMT-8:00) Los Angeles" },
    { value: "America/Denver", label: "(GMT-7:00) Denver" },
    { value: "America/Chicago", label: "(GMT-6:00) Chicago" },
    {
      value: "America/New_York",
      label: "(GMT-5:00) New York",
    },
    { value: "America/Sao_Paulo", label: "(GMT-3:00) São Paulo" },
  ],
  "South America": [
    {
      value: "America/Argentina/Buenos_Aires",
      label: "(GMT-3:00) Buenos Aires",
    },
    { value: "America/Caracas", label: "(GMT-4:00) Caracas" },
    { value: "America/Bogota", label: "(GMT-5:00) Bogotá" },
  ],
  "North America": [
    { value: "Canada/Atlantic", label: "(GMT-4:00) Atlantic (Canada)" },
    { value: "America/Toronto", label: "(GMT-5:00) Toronto" },
    { value: "America/Vancouver", label: "(GMT-8:00) Vancouver" },
  ],
  Europe: [
    { value: "Europe/London", label: "(GMT+0:00) London" },
    { value: "Europe/Paris", label: "(GMT+1:00) Paris" },
    { value: "Europe/Berlin", label: "(GMT+1:00) Berlin" },
    { value: "Europe/Moscow", label: "(GMT+3:00) Moscow" },
  ],
  Africa: [
    { value: "Africa/Casablanca", label: "(GMT+1:00) Casablanca" },
    { value: "Africa/Lagos", label: "(GMT+1:00) Lagos" },
    { value: "Africa/Johannesburg", label: "(GMT+2:00) Johannesburg" },
    { value: "Africa/Nairobi", label: "(GMT+3:00) Nairobi" },
    { value: "Indian/Mauritius", label: "(GMT+4:00) Mauritius" },
  ],
  "Middle East": [
    { value: "Asia/Jerusalem", label: "(GMT+2:00) Jerusalem" },
    { value: "Asia/Baghdad", label: "(GMT+3:00) Baghdad" },
    { value: "Asia/Riyadh", label: "(GMT+3:00) Riyadh" },
    { value: "Asia/Tehran", label: "(GMT+3:30) Tehran" },
  ],
  Asia: [
    { value: "Asia/Dubai", label: "(GMT+4:00) Dubai" },
    { value: "Asia/Karachi", label: "(GMT+5:00) Karachi" },
    { value: "Asia/Kolkata", label: "(GMT+5:30) Kolkata" },
    { value: "Asia/Bangkok", label: "(GMT+7:00) Bangkok" },
    { value: "Asia/Shanghai", label: "(GMT+8:00) Shanghai" },
    { value: "Asia/Tokyo", label: "(GMT+9:00) Tokyo" },
  ],
  "Australia & Pacific": [
    { value: "Pacific/Honolulu", label: "(GMT-10:00) Honolulu" },
    { value: "Australia/Perth", label: "(GMT+8:00) Perth" },
    { value: "Australia/Sydney", label: "(GMT+10:00) Sydney" },
    { value: "Pacific/Auckland", label: "(GMT+12:00) Auckland" },
  ],
};

export const plans: PlanType[] = [
  {
    name: "Free",
    membershipPrice: "$0/month",
    isCurrent: true,
    description: "Perfect for individuals just starting with automation.",
  },
  {
    name: "Plus",
    membershipPrice: "$79/month",
    isCurrent: false,
    description:
      "Take automation further with unlimited workflows and better tools.",
  },
  {
    name: "Business",
    membershipPrice: "$129/month",
    isCurrent: false,
    description: "Ideal for teams and businesses that need premium features.",
  },
];

export const featureGroupNames: Record<string, LucideIcon> = {
  Highlight: Lightbulb,
  "Workflow Automation": Workflow,
  "Web Scraping & Data Capture": GlobeIcon,
  "AI-Powered Data Extraction": Cpu,
  "Data Export & Delivery": FileUp,
  "Cloud Storage & Sync": Cloudy,
  "Team & Access Control": Users,
  "Insights & Monitoring": BarChart3,
  "Notifications & Alerts": Bell,
  "Integrations & API": PlugZap,
} as const;

export const appFeatures: {
  featureName: string;
  group: keyof typeof featureGroupNames;
  description: string;
  planIncluded: {
    planName: planNames;
    content: string | string[];
  }[];
}[] = [
  {
    featureName: "Highlights",
    group: "Highlight",
    description: "",
    planIncluded: [
      {
        planName: "Free",
        content: [
          "Drag-and-drop workflow builder",
          "No-code web scraping builder",
        ],
      },
      {
        planName: "Plus",
        content: [
          "Drag-and-drop workflow builder",
          "No-code web scraping builder",
          "Scheduled scraping",
          "Auto-detect lists and tables",
        ],
      },
      {
        planName: "Business",
        content: [
          "Drag-and-drop workflow builder",
          "No-code web scraping builder",
          "Scheduled scraping",
          "Auto-detect lists and tables",
          "Multi-step workflows",
        ],
      },
    ],
  },

  // 🔄 Workflow Automation
  {
    featureName: "Drag-and-drop workflow builder",
    group: "Workflow Automation",
    description: "Easily create workflows by dragging and dropping elements.",
    planIncluded: [
      { planName: "Free", content: "Yes" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },
  {
    featureName:
      "Trigger-based automation (time-based, event-based, API-based)",
    group: "Workflow Automation",
    description: "Automate tasks based on time, events, or API triggers.",
    planIncluded: [
      { planName: "Free", content: "Time-based only" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },
  {
    featureName: "Multi-step workflows",
    group: "Workflow Automation",
    description: "Build workflows with multiple steps to streamline processes.",
    planIncluded: [
      { planName: "Free", content: "Up to 3 steps" },
      { planName: "Plus", content: "Unlimited" },
      { planName: "Business", content: "Unlimited" },
    ],
  },
  {
    featureName: "Conditional logic (if/else, filters, branches)",
    group: "Workflow Automation",
    description: "Add conditional logic to workflows for dynamic outcomes.",
    planIncluded: [
      { planName: "Free", content: "Limited" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },
  {
    featureName: "Scheduled automation (hourly, daily, weekly)",
    group: "Workflow Automation",
    description: "Schedule automations to run at specific times or intervals.",
    planIncluded: [
      { planName: "Free", content: "Daily only" },
      { planName: "Plus", content: "Hourly, daily, weekly" },
      { planName: "Business", content: "Hourly, daily, weekly" },
    ],
  },
  {
    featureName: "Real-time workflow execution",
    group: "Workflow Automation",
    description: "Execute workflows in real-time for instant results.",
    planIncluded: [
      { planName: "Free", content: "No" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },
  {
    featureName: "Reusable automation templates",
    group: "Workflow Automation",
    description: "Save and reuse your automation templates for efficiency.",
    planIncluded: [
      { planName: "Free", content: "Basic only" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },
  {
    featureName: "Error handling and fallback flows",
    group: "Workflow Automation",
    description: "Ensure smooth workflows with error handling and fallbacks.",
    planIncluded: [
      { planName: "Free", content: "No" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },
  {
    featureName: "Multi-workflow chaining",
    group: "Workflow Automation",
    description: "Chain multiple workflows together for complex automation.",
    planIncluded: [
      { planName: "Free", content: "No" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },

  // 🌐 Web Scraping & Data Capture
  {
    featureName: "No-code web scraping builder",
    group: "Web Scraping & Data Capture",
    description: "Build web scrapers without any coding knowledge.",
    planIncluded: [
      { planName: "Free", content: "Yes" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },
  {
    featureName: "Scheduled scraping (even when app is closed)",
    group: "Web Scraping & Data Capture",
    description: "Scrape data on a schedule, even if the app is not open.",
    planIncluded: [
      { planName: "Free", content: "Limited to 1 schedule" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },
  {
    featureName: "Auto-detect lists, tables, and elements",
    group: "Web Scraping & Data Capture",
    description:
      "Automatically identify and extract lists, tables, and elements.",
    planIncluded: [
      { planName: "Free", content: "Yes" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },
  {
    featureName: "Pagination handling",
    group: "Web Scraping & Data Capture",
    description: "Handle pagination to scrape multiple pages seamlessly.",
    planIncluded: [
      { planName: "Free", content: "Yes" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },
  {
    featureName: "Anti-bot bypass capabilities",
    group: "Web Scraping & Data Capture",
    description: "Bypass bot protection to scrape data from secured sites.",
    planIncluded: [
      { planName: "Free", content: "No" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },

  // 🧠 AI-Powered Data Extraction
  {
    featureName: "AI-powered content parsing (summaries, sentiment, keywords)",
    group: "AI-Powered Data Extraction",
    description: "Extract key content, sentiment, and keywords using AI.",
    planIncluded: [
      { planName: "Free", content: "No" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },
  {
    featureName:
      "Intelligent data classification (e.g., names, emails, products, etc.)",
    group: "AI-Powered Data Extraction",
    description: "Automatically classify and organize extracted data.",
    planIncluded: [
      { planName: "Free", content: "No" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },

  // 📤 Data Export & Delivery
  {
    featureName: "Export to CSV, Excel, JSON, XML",
    group: "Data Export & Delivery",
    description:
      "Export data in popular formats like CSV, Excel, JSON, and XML.",
    planIncluded: [
      { planName: "Free", content: "CSV/JSON only" },
      { planName: "Plus", content: "CSV/JSON/Excel" },
      { planName: "Business", content: "CSV/JSON/Excel/XML" },
    ],
  },
  {
    featureName: "Email delivery",
    group: "Data Export & Delivery",
    description: "Send data directly via email for easy access.",
    planIncluded: [
      { planName: "Free", content: "Yes" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },

  // ☁️ Cloud Storage & Sync
  {
    featureName: "Cloud storage of scraped/processed data",
    group: "Cloud Storage & Sync",
    description:
      "Store scraped or processed data in the cloud for easy access.",
    planIncluded: [
      { planName: "Free", content: "Limited (100MB)" },
      { planName: "Plus", content: "1GB" },
      { planName: "Business", content: "Unlimited" },
    ],
  },
  {
    featureName: "Auto-sync to cloud (Google Drive, Dropbox, etc.)",
    group: "Cloud Storage & Sync",
    description:
      "Automatically sync data to cloud services like Google Drive or Dropbox.",
    planIncluded: [
      { planName: "Free", content: "No" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },

  // 👥 Team & Access Control
  {
    featureName: "Multi-user access",
    group: "Team & Access Control",
    description:
      "Allow multiple users to access and collaborate on the platform.",
    planIncluded: [
      { planName: "Free", content: "No" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },
  {
    featureName: "Role-based permissions",
    group: "Team & Access Control",
    description: "Assign roles and permissions to control user access.",
    planIncluded: [
      { planName: "Free", content: "No" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },

  // 📊 Insights & Monitoring
  {
    featureName: "Workflow performance analytics",
    group: "Insights & Monitoring",
    description: "Track and analyze the performance of your workflows.",
    planIncluded: [
      { planName: "Free", content: "No" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },

  // 💬 Notifications & Alerts
  {
    featureName: "Workflow execution summary alerts",
    group: "Notifications & Alerts",
    description:
      "Receive notifications with execution summaries of your workflows.",
    planIncluded: [
      { planName: "Free", content: "Yes" },
      { planName: "Plus", content: "Yes" },
      { planName: "Business", content: "Yes" },
    ],
  },

  // 🔌 Integrations & API
  {
    featureName: "REST API access",
    group: "Integrations & API",
    description: "Access our REST API to integrate with other tools.",
    planIncluded: [
      { planName: "Free", content: "No" },
      { planName: "Plus", content: "No" },
      { planName: "Business", content: "Yes" },
    ],
  },
];

export const appsConnectionList: AppsConnectionType[] = [
  {
    appLogoPath: "/logos/google drive.svg",
    appName: "Google Drive",
    description: "Sync files and documents from your Google Drive.",
  },
  {
    appLogoPath: "/logos/dropbox.svg",
    appName: "Dropbox",
    description: "Easily import and export files via your Dropbox account.",
  },
  {
    appLogoPath: "/logos/slack.svg",
    appName: "Slack",
    description:
      "Get real-time updates and notifications in your Slack workspace.",
  },
  {
    appLogoPath: "/logos/notion.svg",
    appName: "Notion",
    description: "Send data directly to your Notion workspace and databases.",
  },
  {
    appLogoPath: "/logos/figma.svg",
    appName: "Figma",
    description:
      "Collaborate on designs and sync assets from your Figma files.",
  },
  {
    appLogoPath: "/logos/trello.svg",
    appName: "Trello",
    description: "Connect tasks and data directly to your Trello boards.",
  },
  {
    appLogoPath: "/logos/asana.svg",
    appName: "Asana",
    description: "Link tasks and sync workflows with your Asana projects.",
  },
  {
    appLogoPath: "/logos/github.svg",
    appName: "GitHub",
    description: "Connect repositories and trigger actions from your codebase.",
  },
  {
    appLogoPath: "/logos/airtable.svg",
    appName: "Airtable",
    description: "Import data and sync your Airtable bases in real-time.",
  },
  {
    appLogoPath: "/logos/hubspot.svg",
    appName: "HubSpot",
    description: "Push leads and data directly to your HubSpot CRM.",
  },
  {
    appLogoPath: "/logos/mailchimp.svg",
    appName: "Mailchimp",
    description: "Connect email lists and automate campaigns via Mailchimp.",
  },
  {
    appLogoPath: "/logos/calendly.svg",
    appName: "Calendly",
    description: "Sync meetings and scheduling workflows with Calendly.",
  },
  {
    appLogoPath: "/logos/shopify.svg",
    appName: "Shopify",
    description:
      "Connect your store and manage orders, products, and customers.",
  },
  {
    appLogoPath: "/logos/wordpress.svg",
    appName: "WordPress",
    description:
      "Sync your WordPress content and automate publishing workflows.",
  },
  {
    appLogoPath: "/logos/webflow.svg",
    appName: "Webflow",
    description: "Push data and automate CMS content updates in Webflow.",
  },
  {
    appLogoPath: "/logos/zoom.svg",
    appName: "Zoom",
    description:
      "Automate meeting scheduling, reminders, and post-call workflows with seamless Zoom integration.",
  },
  {
    appLogoPath: "/logos/bigcommerce.svg",
    appName: "BigCommerce",
    description: "Integrate your store and streamline e-commerce operations.",
  },
];
