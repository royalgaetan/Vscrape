import { OperationItem } from "../types/w_types";

export const workflowOperations: Omit<OperationItem, "operationId">[] = [
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
    nodeName: "Web Scraper",
    operationDescription:
      "Extracts content from a single web page, allowing retrieval of specific elements such as text, images, links, or structured data using defined selectors.",
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
    nodeName: "Web Scraper",
    operationDescription:
      "Automatically navigates through multiple pages of a paginated website and extracts content from each page, enabling large-scale data collection without manual intervention.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "Start URL",
        paramInputPlaceholder: "Enter the url to begin with...",
        paramDescription:
          "This should be the URL of the first page you want to start scraping.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Pagination Selector",
        paramInputPlaceholder: "Selector to find the “next page” button/link",
        paramDescription:
          'A CSS selector that targets the "Next" button or link in the pagination UI.',
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Max Pages",
          paramDescription:
            "An upper limit to avoid scraping infinitely. Choose a number based on how many pages you want to scrape.",
          type: "primitive/number",
          paramInputPlaceholder: "Enter...",
          value: "" as any,
        },
        {
          paramName: "Wait between pages",
          paramInputPlaceholder: "0 (ms)",
          paramDescription: "Delay (ms) between pages.",
          type: "primitive/number",
          value: "" as any,
        },
      ],
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
  //
  //
  //
  //
  // File Reader Operations
  {
    operationName: "Read Text File",
    nodeName: "File reader",
    operationDescription:
      "Read content from .txt, .log, .md, or similar plain text files.",
    skipDuplicate: true,
    loopThrough: false,
    params: [
      {
        paramName: "File input",
        paramInputPlaceholder: "File or file path...",
        paramDescription: "File or file path (dynamic or static)",
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Encoding",
          paramInputPlaceholder: "Select...",
          paramDescription: "",
          type: "primitive/text",
          valuesToPickFrom: ["utf-8", "ascii", "latin1"],
          value: "",
        },
        {
          paramName: "Read mode",
          paramInputPlaceholder: "Select...",
          paramDescription: "",
          type: "primitive/text",
          valuesToPickFrom: ["full", "lines", "lines with limit"],
          value: "",
        },
      ],

      {
        paramName: "Line limit",
        paramDescription: "(if mode is line-based)",
        type: "primitive/number",
        paramInputPlaceholder: "(if mode is line-based)...",
        value: "" as any,
      },
      {
        paramName: "Trim whitespace",
        paramInputPlaceholder: "",
        paramDescription: "Trim whitespace",
        type: "primitive/switch",
        value: true,
      },
    ],
    inputs: {},
    inputFilters: [],
    outputs: {},
  },
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
