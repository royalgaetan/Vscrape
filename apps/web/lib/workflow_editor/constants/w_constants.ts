import {
  Pickaxe,
  Smile,
  PenLine,
  Webhook,
  AlarmClock,
  Play,
  Globe,
  FileSearch,
  DatabaseIcon,
  FileCode,
  FileImage,
  FileVideo2,
  FileVolume,
  DatabaseZap,
  Video,
  Images,
  Type,
  TableProperties,
  NotebookTextIcon,
  MessageCircleMoreIcon,
  Clock,
  ZapIcon,
  GitBranch,
  DatabaseZapIcon,
  Merge,
  CodeXmlIcon,
  Send,
  LucideGalleryHorizontalEnd,
  TvMinimalPlayIcon,
  Braces,
  ArrowLeftRight,
  AudioLines,
  BrainIcon,
  FileDigit,
  FileInput,
  Tag,
  FileText,
  Variable,
  SignpostBig,
} from "lucide-react";
import { PreviousInputDataType, VsNodeType } from "../types/w_types";
import { WORKFLOW_COLORS } from "@/lib/colors_utils";
import { OperationBlock } from "../classes/operation_block";
import { FormBlock } from "../classes/form_field_block";
import { ManualBlock } from "../classes/manual_block";
import { WebhookBlock } from "../classes/webhook_block";
import { WaitBlock } from "../classes/wait_block";
import { SetVariablesBlock } from "../classes/setVariables_block";

export const previousInputData: PreviousInputDataType[] = [
  {
    label: "Variables",
    dataTransfer: "{{ Variables }}",
    tooltip: "All Variables",
  },
  {
    label: "Last Node",
    dataTransfer: "{{ Last Node }}",
    tooltip: "Previous Node Data",
  },
  {
    label: "Last Item",
    dataTransfer: "{{ Last Item }}",
    tooltip: "Previous Item Data",
  },
];

export const inputErrorClassName =
  "border-destructive/70 ring-2 ring-destructive/60";

export const workflowEditorSections = {
  "Entry Point": {
    iconColor: WORKFLOW_COLORS.slate,
  },
  "Data Reading": {
    iconColor: WORKFLOW_COLORS.green,
  },
  Core: {
    iconColor: WORKFLOW_COLORS.purple,
  },
  "Data Extraction": {
    iconColor: WORKFLOW_COLORS.pink,
  },
  "Data Manipulation": {
    iconColor: WORKFLOW_COLORS.blue,
  },
  "Data Conversion": {
    iconColor: WORKFLOW_COLORS.yellow,
  },
  "Data Preview": {
    iconColor: WORKFLOW_COLORS.teal,
  },
  "Data Sync": {
    iconColor: WORKFLOW_COLORS.stone,
  },
} as const;

export const workflowEditorNodes: Omit<VsNodeType, "iconColor">[] = [
  // Entry Points
  {
    label: "Webhook",
    icon: Webhook,
    tooltip: "Trigger the workflow when an external service sends a request.",
    sectionName: "Entry Point",
    blockType: "webhook",
    block: new WebhookBlock(),
  },
  {
    label: "Manual",
    icon: Play,
    tooltip: "Manually start the workflow when needed.",
    sectionName: "Entry Point",
    blockType: "manual",
    block: new ManualBlock(),
  },
  {
    label: "Cron",
    icon: AlarmClock,
    tooltip: "Run the workflow on a scheduled time or interval.",
    sectionName: "Entry Point",
    blockType: "cron",
    block: undefined,
  },
  {
    label: "Form Input",
    icon: PenLine,
    tooltip: "Start the workflow when a user submits a form.",
    sectionName: "Entry Point",
    blockType: "formField",
    block: new FormBlock(),
  },
  {
    label: "Chat Bot",
    icon: MessageCircleMoreIcon,
    isDisabled: true,
    tooltip:
      "Trigger the workflow when a new conversation is started with the chat assistant",
    sectionName: "Entry Point",
    blockType: "operation",
    block: new OperationBlock("Chat Bot"),
  },

  // Data Reading
  {
    label: "Web Scraper",
    icon: Globe,
    tooltip: "",
    sectionName: "Data Reading",
    blockType: "operation",
    block: new OperationBlock("Web Scraper"),
  },
  {
    label: "File reader",
    icon: FileSearch,
    tooltip: "",
    sectionName: "Data Reading",
    blockType: "operation",
    block: new OperationBlock("File reader"),
  },
  {
    label: "Knowledge Base",
    icon: DatabaseZapIcon,
    tooltip: "",
    sectionName: "Data Reading",
    blockType: "operation",
    block: new OperationBlock("Knowledge Base"),
  },

  {
    label: "Database reader",
    icon: DatabaseIcon,
    tooltip: "",
    isDisabled: true,
    sectionName: "Data Reading",
    blockType: "operation",
    block: new OperationBlock("Database reader"),
  },

  // Core
  {
    label: "Wait",
    icon: Clock,
    tooltip: "Add a delay before moving to the next step",
    sectionName: "Core",
    blockType: "wait",
    block: new WaitBlock(),
  },
  {
    label: "Set Variables",
    icon: Variable,
    tooltip: "Add/Remove Global Variables",
    sectionName: "Core",
    blockType: "setVariables",
    block: new SetVariablesBlock(),
  },

  {
    label: "If/else Condition",
    icon: SignpostBig,
    tooltip: "Add a condition if/else inside your workflow",
    sectionName: "Core",
    blockType: "branch",
    block: new OperationBlock("If/else Condition"),
  },

  {
    label: "Branch",
    icon: GitBranch,
    tooltip: "Add multiple branch at any stage of the workflow",
    sectionName: "Core",
    blockType: "branch",
    block: new OperationBlock("Branch"),
  },
  {
    label: "Merge",
    icon: Merge,
    tooltip: "Merge data into a single object",
    sectionName: "Core",
    blockType: "branch",
    block: new OperationBlock("Merge"),
  },
  {
    label: "Call Workflow",
    icon: ZapIcon,
    tooltip: "Launch another workflow to take over",
    sectionName: "Core",
    blockType: "operation",
    block: new OperationBlock("Call Workflow"),
  },
  {
    label: "Call API",
    icon: CodeXmlIcon,
    tooltip: "Call an external API",
    sectionName: "Core",
    blockType: "operation",
    block: new OperationBlock("Call API"),
  },
  {
    label: "Send",
    icon: Send,
    tooltip:
      "Send an Email, Chat Message, SMS, leave a Voicemail or launch a Phone Call",
    sectionName: "Core",
    blockType: "operation",
    block: new OperationBlock("Send"),
  },

  // Data Extraction
  {
    label: "Extract Data",
    icon: Pickaxe,
    tooltip: "Retrieve data from a webpage, API, or document.",
    sectionName: "Data Extraction",
    blockType: "operation",
    block: new OperationBlock("Extract Data"),
  },
  {
    label: "Tag",
    icon: Tag,
    tooltip: "Auto-tagging or intent detection",
    sectionName: "Data Extraction",
    blockType: "operation",
    block: new OperationBlock("Tag"),
  },
  {
    label: "Field Mapper",
    icon: ArrowLeftRight,
    tooltip: "Manually attach certain data to specific field",
    sectionName: "Data Extraction",
    blockType: "operation",
    block: new OperationBlock("Field Mapper"),
  },

  // Data Manipulation
  {
    label: "Text Manipulation",
    icon: Type,
    tooltip: "Enhance and modify any data text",
    sectionName: "Data Manipulation",
    blockType: "operation",
    block: new OperationBlock("Text Manipulation"),
  },
  {
    label: "AI Generation",
    tooltip: "Generate anything with AI",
    icon: BrainIcon,
    sectionName: "Data Manipulation",
    blockType: "operation",
    block: new OperationBlock("AI Generation"),
  },

  {
    label: "Sentiment Analysis",
    icon: Smile,
    tooltip:
      "Analyze a data and determine the overall sentiment (positive, negative, neutral).",
    sectionName: "Data Manipulation",
    blockType: "operation",
    block: new OperationBlock("Sentiment Analysis"),
  },
  {
    label: "Data Enrichment",
    icon: DatabaseZap,
    tooltip: "Fetch relevant data around data source",
    sectionName: "Data Manipulation",
    blockType: "operation",
    block: new OperationBlock("Data Enrichment"),
  },
  {
    label: "Image Manipulation",
    icon: Images,
    tooltip: "Modify, resize, or process images within the workflow.",
    sectionName: "Data Manipulation",
    blockType: "operation",
    block: new OperationBlock("Image Manipulation"),
  },
  {
    label: "Video Manipulation",
    icon: Video,
    tooltip: "Modify or edit videos within the workflow.",
    sectionName: "Data Manipulation",
    blockType: "operation",
    block: new OperationBlock("Video Manipulation"),
  },
  {
    label: "Audio Manipulation",
    tooltip: "Modify or edit any audio file",
    icon: AudioLines,
    sectionName: "Data Manipulation",
    blockType: "operation",
    block: new OperationBlock("Audio Manipulation"),
  },

  // Data Conversion
  {
    label: "Data Converter",
    icon: FileInput,
    tooltip: "Convert extracted or processed data into a another format.",
    sectionName: "Data Conversion",
    blockType: "operation",
    block: new OperationBlock("Data Converter"),
  },
  {
    label: "Image Converter",
    icon: FileImage,
    tooltip: "Convert any image into another format.",
    sectionName: "Data Conversion",
    blockType: "operation",
    block: new OperationBlock("Image Converter"),
  },
  {
    label: "Video Converter",
    icon: FileVideo2,
    tooltip: "Convert any video into another format.",
    sectionName: "Data Conversion",
    blockType: "operation",
    block: new OperationBlock("Video Converter"),
  },
  {
    label: "Audio Converter",
    icon: FileVolume,
    tooltip: "Convert any audio file into another format.",
    sectionName: "Data Conversion",
    blockType: "operation",
    block: new OperationBlock("Audio Converter"),
  },
  {
    label: "Encoding",
    icon: FileDigit,
    tooltip: "Convert your data to format like binary, hex, base64, etc.",
    sectionName: "Data Conversion",
    blockType: "operation",
    block: new OperationBlock("Encoding"),
  },
  {
    label: "Markup",
    icon: FileCode,
    tooltip: "Convert data into a Markup language",
    sectionName: "Data Conversion",
    blockType: "operation",
    block: new OperationBlock("Markup"),
  },

  // Data Preview
  {
    label: "PDF Viewer",
    icon: NotebookTextIcon,
    tooltip: "Preview or render a PDF from a file or URL",
    sectionName: "Data Preview",
    blockType: "preview",
    block: new OperationBlock("PDF Viewer"),
  },
  {
    label: "Docs Viewer",
    icon: FileText,
    tooltip: "Preview or render your data inside a Word-like previewer",
    sectionName: "Data Preview",
    blockType: "preview",
    block: new OperationBlock("Docs Viewer"),
  },
  {
    label: "Spreadsheet Viewer",
    icon: TableProperties,
    tooltip: "Preview your data inside a Spreadsheet",
    sectionName: "Data Preview",
    blockType: "preview",
    block: new OperationBlock("Spreadsheet Viewer"),
  },
  {
    label: "Image Preview",
    icon: LucideGalleryHorizontalEnd,
    tooltip: "Preview any image",
    sectionName: "Data Preview",
    blockType: "preview",
    block: new OperationBlock("Image Preview"),
  },
  {
    label: "Media Player",
    icon: TvMinimalPlayIcon,
    tooltip: "Play your video or audio",
    sectionName: "Data Preview",
    blockType: "preview",
    block: new OperationBlock("Media Player"),
  },
  {
    label: "Code Preview",
    icon: Braces,
    tooltip: "Preview a Code's snippet (JSON, XML, Markdown, etc.)",
    sectionName: "Data Preview",
    blockType: "preview",
    block: new OperationBlock("Code Preview"),
  },

  // Data Sync
  {
    label: "Dropbox",
    logoPath: "/logos/dropbox.svg",
    tooltip: "Sync and organize files automatically in Dropbox.",
    sectionName: "Data Sync",
    blockType: "operation",
    block: new OperationBlock("Dropbox"),
  },
  {
    label: "Google Drive",
    logoPath: "/logos/google drive.svg",
    tooltip: "Sync files and folders between workflows and Google Drive.",
    sectionName: "Data Sync",
    blockType: "operation",
    block: new OperationBlock("Google Drive"),
  },

  {
    label: "Airtable",
    logoPath: "/logos/airtable.svg",
    tooltip: "Sync and manage Airtable records seamlessly.",
    sectionName: "Data Sync",
    blockType: "operation",
    block: new OperationBlock("Airtable"),
  },

  {
    label: "Mailchimp",
    logoPath: "/logos/mailchimp.svg",
    tooltip: "Automate email campaigns and sync subscriber lists.",
    sectionName: "Data Sync",
    blockType: "operation",
    block: new OperationBlock("Mailchimp"),
  },

  {
    label: "Trello",
    logoPath: "/logos/trello.svg",
    tooltip: "Manage Trello boards, lists, and cards automatically.",
    sectionName: "Data Sync",
    blockType: "operation",
    block: new OperationBlock("Trello"),
  },
  {
    label: "Figma",
    logoPath: "/logos/figma.svg",
    tooltip: "Retrieve designs and track changes in Figma.",
    sectionName: "Data Sync",
    blockType: "operation",
    block: new OperationBlock("Figma"),
  },
  {
    label: "Github",
    logoPath: "/logos/github.svg",
    tooltip: "Automate issues, pull requests, and repo management.",
    sectionName: "Data Sync",
    blockType: "operation",
    block: new OperationBlock("Github"),
  },

  {
    label: "HubSpot",
    logoPath: "/logos/hubspot.svg",
    tooltip: "Manage contacts, deals, and automation within HubSpot.",
    sectionName: "Data Sync",
    blockType: "operation",
    block: new OperationBlock("HubSpot"),
  },
  {
    label: "Zoom",
    logoPath: "/logos/zoom.svg",
    tooltip: "Automate Zoom meeting scheduling and data sync.",
    sectionName: "Data Sync",
    blockType: "operation",
    block: new OperationBlock("Zoom"),
  },
  {
    label: "Slack",
    logoPath: "/logos/slack.svg",
    tooltip: "Send messages and automate notifications in Slack.",
    sectionName: "Data Sync",
    blockType: "operation",
    block: new OperationBlock("Slack"),
  },
  {
    label: "Asana",
    logoPath: "/logos/asana.svg",
    tooltip: "Automate task creation and project management in Asana.",
    sectionName: "Data Sync",
    blockType: "operation",
    block: new OperationBlock("Asana"),
  },

  {
    label: "Notion",
    logoPath: "/logos/notion.svg",
    tooltip: "Create and update Notion pages automatically.",
    sectionName: "Data Sync",
    blockType: "operation",
    block: new OperationBlock("Notion"),
  },
  {
    label: "Shopify",
    logoPath: "/logos/shopify.svg",
    tooltip: "Sync orders, products, and customer details with Shopify.",
    sectionName: "Data Sync",
    blockType: "operation",
    block: new OperationBlock("Shopify"),
  },
  {
    label: "WordPress",
    logoPath: "/logos/wordpress.svg",
    tooltip: "Sync posts, pages, and custom fields with WordPress.",
    sectionName: "Data Sync",
    blockType: "operation",
    block: new OperationBlock("WordPress"),
  },
  {
    label: "Calendly",
    logoPath: "/logos/calendly.svg",
    tooltip: "Automate meeting scheduling and follow-ups with Calendly.",
    sectionName: "Data Sync",
    blockType: "operation",
    block: new OperationBlock("Calendly"),
  },

  {
    label: "BigCommerce",
    logoPath: "/logos/bigcommerce.svg",
    tooltip: "Sync products, orders, and customer data with BigCommerce.",
    sectionName: "Data Sync",
    blockType: "operation",
    block: new OperationBlock("BigCommerce"),
  },

  {
    label: "Webflow",
    logoPath: "/logos/webflow.svg",
    tooltip: "Automate Webflow site updates and CMS management.",
    sectionName: "Data Sync",
    blockType: "operation",
    block: new OperationBlock("Webflow"),
  },
] as const;
