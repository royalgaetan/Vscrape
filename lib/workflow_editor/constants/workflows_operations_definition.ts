import { OperationItem } from "../types/w_types";

export const deepFreeze = <T>(obj: T): T => {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const value = (obj as any)[prop];
    if (
      value !== null &&
      !Object.isFrozen(value) &&
      (typeof value === "function" || typeof value === "object")
    ) {
      deepFreeze(value);
    }
  });
  return obj;
};

export const workflowOperations: OperationItem[] = [
  // Webhook Operations
  //
  //
  //
  //
  // Manual Operations
  //
  //
  //
  //
  // Cron Operations
  //
  //
  //
  //
  // FormInput Operations
  //
  //
  //
  //
  // ChatBot Operations
  //
  //
  //
  //
  // Web Scraper Operations
  {
    operationName: "Scrape a Web Page",
    toolItemName: "Web Scraper",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "URL to scrape",
        paramInputPlaceholder: "Website URL...",
        paramDescription: "This is the target web page you want to scrape",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Method",
        type: "primitive/customSwitch",
        valuesToPickFrom: ["GET", "POST"],
        paramDescription:
          "Some pages need to be scraped via POST requests (e.g. submitting filters or forms).",
        value: "GET",
      },
      {
        paramName: "Headers",
        type: "primitive/record",
        paramDescription:
          "Add custom headers like User-Agent, cookies, or auth tokens.",
        value: [
          {
            key: "",
            value: "",
          },
        ],
      },
      {
        paramName: "Wait for Selector",
        paramDescription:
          "Wait until a specific element appears before scraping.",
        type: "primitive/text",
        paramInputPlaceholder: "Add your selector here...",
        value: "",
      },
      {
        paramName: "Body",
        type: "primitive/record",
        paramDescription: "Add a body to your POST requests",
        value: [
          {
            key: "",
            value: "",
          },
        ],
      },

      [
        {
          paramName: "Render JS",
          type: "primitive/switch",
          paramDescription:
            "Enables JS rendering for pages where content loads dynamically.",
          value: false,
        },
        {
          paramName: "Metadata",
          type: "primitive/switch",
          paramDescription:
            "Toggle to extract meta tags, title, and other document metadata.",
          value: true,
        },
        {
          paramName: "Redirects",
          type: "primitive/switch",
          paramDescription:
            "Ensures final content is scraped even if the page redirects (e.g., 301, login flow).",
          value: false,
        },
      ],
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },

  {
    operationName: "Auto-Paginate and Scrape",
    toolItemName: "Web Scraper",
    skipDuplicate: true,
    params: [],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  //
  //
  //
  //
  // File Reader Operations
  //
  //
  //
  //
  // KnowledgeBase Reader Operations
  //
  //
  //
  //
  // Database Reader Operations
  //
  //
  //
  //
  // Wait Operations
  //
  //
  //
  //
  // If/Else Operations
  //
  //
  //
  //
  // Branch Operations
  //
  //
  //
  //
  // Merge Operations
  //
  //
  //
  //
  // Call Workflow Operations
  //
  //
  //
  //
  // Call API Operations
  //
  //
  //
  //
  // Send Operations
  //
  //
  //
  //
  // Extract Data Operations
  //
  //
  //
  //
  // Tag Operations
  //
  //
  //
  //
  // Field Mapper Operations
  //
  //
  //
  //
  // Text Manipulation Operations
  //
  //
  //
  //
  // AI Generation Operations
  //
  //
  //
  //
  // Sentiment Analysis Operations
  //
  //
  //
  //
  // Data Enrichment Operations
  //
  //
  //
  //
  // Image Manipulation Operations
  //
  //
  //
  //
  // Video Manipulation Operations
  //
  //
  //
  //
  // Audio Manipulation Operations
  //
  //
  //
  //
  // Data Converter Operations
  //
  //
  //
  //
  // Image Converter Operations
  //
  //
  //
  //
  // Video Converter Operations
  //
  //
  //
  //
  // Audio Converter Operations
  //
  //
  //
  //
  // Encoding Operations
  //
  //
  //
  //
  // PDF Converter Operations
  //
  //
  //
  //
  // To Markup Operations
  //
  //
  //
  //
  // PDF Viewer Operations
  //
  //
  //
  //
  // Docs Viewer Operations
  //
  //
  //
  //
  // Spreadsheet Viewer Operations
  //
  //
  //
  //
  // Image Preview Operations
  //
  //
  //
  //
  // Media Player Operations
  //
  //
  //
  //
  // Code Preview Operations
  //
  //
  //
  //
  // App Sync Operations
  //
  //
  //
  //
] as const;
