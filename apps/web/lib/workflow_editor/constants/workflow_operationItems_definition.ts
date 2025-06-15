import { appLanguages, appVoices } from "@/lib/constants";
import { VsOperationItemType } from "../types/w_types";

export const workflowOperationItems: VsOperationItemType[] = [
  // Webhook Operations: Not available. It's Special Node
  // Manual Operations: Not available. It's Special Node
  // Cron Operations: Not available. It's Special Node
  // FormInput Operations: Note: Here "Operation" === "Field". FormInput contains a collection of Fields[]. Refer to workflow_form_fields_definition file
  //
  //
  //
  //
  // ChatBot Operations: This node is Disabled.
  //
  //
  //
  //
  // Web Scraper Operations
  {
    operationItemName: "Scrape a Web Page",
    nodeName: "Web Scraper",
    operationItemDescription:
      "Extracts content from a single web page, allowing retrieval of specific elements such as text, images, links, or structured data using defined selectors.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
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

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Auto-Paginate and Scrape",
    nodeName: "Web Scraper",
    operationItemDescription:
      "Automatically navigates through multiple pages of a paginated website and extracts content from each page, enabling large-scale data collection without manual intervention.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
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

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // File Reader Operations
  {
    operationItemName: "Read Text File",
    nodeName: "File reader",
    operationItemDescription:
      "Read content from .txt, .log, .md, or similar plain text files.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
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

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Parse CSV",
    nodeName: "File reader",
    operationItemDescription: "Parse and extract data from a CSV file.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "File input",
        paramInputPlaceholder: "File or file path...",
        paramDescription: "File or file path (dynamic or static)",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Delimiter",
        paramInputPlaceholder: "e.g. « , » | « ; » | « \\t »",
        paramDescription:
          "Character(s) used to separate columns in the CSV file (e.g., comma, semicolon, tab).",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Has header row?",
        paramInputPlaceholder: "",
        paramDescription: "Has header row",
        type: "primitive/switch",
        value: true,
      },
      {
        paramName: "Skip rows?",
        paramInputPlaceholder: "Type...",
        paramDescription: "Number of initial rows to be ignored",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Extract Specific Columns",
        paramInputPlaceholder: "Column filter...",
        paramDescription: "Exact column names you want to extract from",
        type: "primitive/array",
        value: [""],
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Parse PDF",
    nodeName: "File reader",
    operationItemDescription:
      "Extract text, tables, and optionally structured fields from PDF documents.",
    loopThrough: false,
    itemParams: [
      {
        paramName: "File input",
        paramInputPlaceholder: "File or file path...",
        paramDescription: "Upload the PDF file you want to extract data from.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Extraction mode",
        paramInputPlaceholder: "Select...",
        paramDescription: "Select an extraction mode...",
        type: "primitive/text",
        valuesToPickFrom: [
          "all content",
          "text only",
          "tables",
          "text + tables",
          "images only",
          "text + images",
        ],
        value: "",
      },
      {
        paramName: "Page range",
        paramInputPlaceholder: "e.g. « 1-3 » | « all » | « 1,3,5-7 »",
        paramDescription: "Specifies which pages to extract content from.",
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Auto-clean formatting",
          paramDescription: "Attempts to clean up common formatting issues",
          type: "primitive/switch",
          value: true,
        },
        {
          paramName: "OCR fallback",
          paramDescription:
            "If the PDF is scanned (i.e., it contains images instead of real text), OCR (Optical Character Recognition) will be used to extract text. (May slow down processing)",
          type: "primitive/switch",
          value: false,
        },
      ],
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Read Image File",
    nodeName: "File reader",
    operationItemDescription:
      "Get image metadata, base64 encoding, or run OCR on an image.",
    loopThrough: false,
    itemParams: [
      {
        paramName: "File input",
        paramInputPlaceholder: "File or file path...",
        paramDescription: " The image file to process.",
        type: "primitive/text",
        value: "",
      },

      {
        paramName: "Run OCR?",
        paramDescription:
          "Runs Optical Character Recognition and extracts any visible text from the image.",
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "AI-Powered File Summary",
    nodeName: "File reader",
    operationItemDescription:
      "Reads the content of a file (various formats supported — e.g., .pdf, .docx, .txt, .pptx, etc.) and generates a human-readable summary using AI.",
    loopThrough: false,
    itemParams: [
      {
        paramName: "File input",
        paramInputPlaceholder: "File or file path...",
        paramDescription: "The document to be read and summarized.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Summary Type",
        paramInputPlaceholder: "Select...",
        paramDescription: "Select a summary type...",
        type: "primitive/text",
        valuesToPickFrom: ["Short", "Detailed", "Bullet Points"],
        value: "",
      },

      {
        paramName: "Include file metadata",
        paramDescription:
          "If enabled, the summary output will also include metadata from the file",
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // KnowledgeBase Reader Operations
  {
    operationItemName: "Query Knowledge Base",
    nodeName: "Knowledge Base",
    operationItemDescription:
      "Ask a question and retrieve the most relevant articles or documents in your knowledge base",
    loopThrough: false,
    itemParams: [
      {
        paramName: "Query",
        paramInputPlaceholder: "Enter query...",
        paramDescription:
          "The question or phrase you want to search for in the knowledge base.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "topK",
        paramInputPlaceholder: "e.g., 3",
        paramDescription: "Number of most relevant entries to return.",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Filter Tags (Optional)",
        isOptional: true,
        paramDescription:
          "Optional tags to filter which parts of the KB are searched.",
        type: "primitive/array",
        value: [""],
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Add to Knowledge Base",
    nodeName: "Knowledge Base",
    operationItemDescription:
      "Paste or write content directly, or provide a URL or a file path to be parsed and added to the knowledge base.",
    loopThrough: false,
    itemParams: [
      {
        paramName: "Title (optional)",
        isOptional: true,
        paramInputPlaceholder: "Enter a descriptive title...",
        paramDescription:
          "A title or label for the content you're adding to the knowledge base.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Content",
        paramInputPlaceholder:
          "Paste content, or enter a URL or file path reference...",
        paramDescription:
          "Provide the raw content, a URL, or a file path to be parsed and embedded.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Filter Tags (Optional)",
        isOptional: true,
        paramDescription:
          "Tags or categories to help with future filtering and querying.",
        type: "primitive/array",
        value: [""],
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
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
  {
    operationItemName: "Call a specific workflow",
    nodeName: "Call Workflow",
    operationItemDescription: "Call a specific workflow by its name",
    itemParams: [
      {
        paramName: "Workflows",
        paramInputPlaceholder: "The Workflow Name",
        valuesToPickFrom: ["Workflow A", "Workflow B", "Workflow C"],
        paramDescription: "The na of the workflow to call.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Input Payload (JSON)",
        paramDescription: "(if mode is line-based)",
        type: "primitive/text",
        isTextarea: true,
        isOptional: true,
        paramInputPlaceholder:
          "Optional input data to pass to the called workflow (JSON format).",
        value: "" as any,
      },
      {
        paramName: "Await Result",
        paramDescription:
          "Wait for the called workflow to finish and return data?",
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Call API Operations
  {
    operationItemName: "Basic API Call",
    nodeName: "Call API",
    operationItemDescription:
      "Make a standard HTTP request (GET, POST, PUT, PATCH, DELETE) with full control over URL, headers, body, and method.",
    itemParams: [
      {
        paramName: "API URL",
        paramInputPlaceholder: "e.g., https://api.example.com/resource",
        paramDescription: "Full URL of the API endpoint.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Method",
        type: "primitive/text",
        valuesToPickFrom: ["GET", "POST", "PUT/PATCH", "DELETE"],
        paramDescription: "HTTP method to use (GET, POST, PUT, PATCH, DELETE).",
        value: "GET",
      },
      {
        paramName: "Headers",
        type: "primitive/record",
        paramDescription: "Headers to send with the request",
        value: [
          {
            key: "",
            value: "",
          },
        ],
      },
      {
        paramName: "Body",
        type: "primitive/record",
        paramDescription: "Form body for POST, PUT, or PATCH requests.",
        value: [
          {
            key: "",
            value: "",
          },
        ],
      },
      {
        paramName: "Retry on Fail",
        type: "primitive/switch",
        paramDescription: "Whether to retry the request on failure.",
        value: true,
      },

      [
        {
          paramName: "Timeout (Ms)",
          type: "primitive/number",
          paramInputPlaceholder: "e.g., 10000",
          paramDescription:
            "Max time (ms) to wait for the request before failing.",
          value: "" as any,
        },
        {
          paramName: "Retry Attempts",
          type: "primitive/number",
          paramInputPlaceholder: "e.g., 3",
          paramDescription: "Number of times to retry the request.",
          value: "" as any,
        },
      ],
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Send Operations
  {
    operationItemName: "Send Email",
    nodeName: "Send",
    operationItemDescription:
      "Deliver a custom email to one or more recipients.",
    itemParams: [
      {
        paramName: "From",
        paramInputPlaceholder: "e.g., noreply@yourapp.com",
        paramDescription: "Sender email address.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "To",
        paramInputPlaceholder: "e.g., user@example.com",
        paramDescription: "Recipient email address.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "CC",
        paramInputPlaceholder: "e.g., cc@example.com",
        paramDescription: "Optional CC recipient(s).",
        isOptional: true,
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "BCC",
        paramInputPlaceholder: "e.g., bcc@example.com",
        paramDescription: "Optional BCC recipient(s).",
        isOptional: true,
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Subject",
        type: "primitive/text",
        paramInputPlaceholder: "Your Receipt",
        paramDescription: "Email subject line.",
        value: "",
      },
      {
        paramName: "Body",
        type: "primitive/text",
        paramInputPlaceholder: "Hello, here is your info...",
        paramDescription: "Email body (HTML or text).",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Attachments (files)",
        type: "primitive/array",
        isOptional: true,
        paramDescription: "List of attachments (file URLs).",
        value: [""],
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Send SMS",
    nodeName: "Send",
    operationItemDescription:
      "Instantly send a text message to a phone number.",
    itemParams: [
      {
        paramName: "Phone Number",
        paramInputPlaceholder: "e.g., +123456789",
        paramDescription: "Recipient phone number.",
        type: "primitive/tel",
        value: "" as any,
      },
      {
        paramName: "Message",
        paramInputPlaceholder: "e.g., Hi there!",
        isTextarea: true,
        paramDescription: "Text message to send.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Sender ID (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g., MyApp",
        paramDescription: "Optional sender name or ID.",
        type: "primitive/text",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Send Chat Message",
    nodeName: "Send",
    operationItemDescription: "Post a message inside the chat bot",
    itemParams: [
      {
        paramName: "Message",
        paramInputPlaceholder: "e.g., Hi there!",
        isTextarea: true,
        paramDescription: "Text message to send.",
        type: "primitive/text",
        value: "",
      },
    ],
    isDisabled: true,

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Initiate Phone Call",
    nodeName: "Send",
    operationItemDescription: "Trigger an automated phone call to a user.",
    itemParams: [
      {
        paramName: "Phone Number",
        paramInputPlaceholder: "e.g., +123456789",
        paramDescription: "Phone number to call.",
        type: "primitive/tel",
        value: "" as any,
      },
      {
        paramName: "Message",
        paramInputPlaceholder: "e.g., This is an automated call from...",
        isTextarea: true,
        paramDescription: "Voice message (Text-to-Speech).",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Voice",
        isOptional: true,
        paramDescription: "Voice type (male, female, neutral).",
        type: "primitive/text",
        valuesToPickFrom: Object.values(appVoices)[0].map((lang) => lang.label),
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Send Voice Message (TTS)",
    nodeName: "Send",
    operationItemDescription: "Send an audio message using synthesized speech.",
    itemParams: [
      {
        paramName: "Recipient Phone",
        paramInputPlaceholder: "e.g., +1234567890",
        paramDescription:
          "Phone number to send the voice message to (international format).",
        type: "primitive/tel",
        value: "" as any,
      },
      {
        paramName: "Message",
        paramInputPlaceholder: "e.g., Your appointment is tomorrow at 10 AM.",
        isTextarea: true,
        paramDescription:
          "The text to convert into spoken audio and deliver as a voice message.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Voice",
        isOptional: true,
        paramDescription:
          "Voice style to use for speech synthesis (e.g., en-US-JennyNeural, en-GB-Ryan).",
        type: "primitive/text",
        valuesToPickFrom: Object.values(appVoices)[0].map((lang) => lang.label),
        value: "",
      },
      {
        paramName: "Language",
        paramDescription:
          "Language/locale of the spoken message (for correct pronunciation).",
        valuesToPickFrom: Object.values(appLanguages)[0].map(
          (lang) => lang.label
        ),
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Speed",
        valuesToPickFrom: ["1.0 (normal)", "0.8 (slower)", "1.2 (faster)"],
        paramDescription: "Controls the playback speed of the speech.",
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Repeat Count (Optional)",
          isOptional: true,
          type: "primitive/number",
          paramInputPlaceholder: "e.g., 2",
          paramDescription:
            "Number of times to repeat the voice message during the call.",
          value: "" as any,
        },
        {
          paramName: "Retry on Fail (Optional)",
          isOptional: true,
          type: "primitive/switch",
          paramDescription:
            "Retry sending the message if the first attempt fails (e.g., unreachable line).",
          value: true,
        },
      ],
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Extract Data Operations
  {
    operationItemName: "Extract with AI",
    nodeName: "Extract Data",
    operationItemDescription:
      "Extract structured data from raw input using AI, based on a target schema.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste content, email, file path, etc.",
        paramDescription:
          "The raw text or content, or file from which to extract structured information.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Schema",
        paramInputPlaceholder: "e.g. { name: string, amount: number }",
        paramDescription:
          "A JSON structure defining the fields you want to extract.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Temperature",
        paramInputPlaceholder: "e.g., 0.2",
        paramDescription:
          "Controls how creative the AI is when extracting data. Lower = more accurate.",
        type: "primitive/number",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Extract with Regex",
    nodeName: "Extract Data",
    operationItemDescription:
      "Use one or multiple regular expressions to extract specific matches.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste content, email, file path, etc.",
        paramDescription:
          "The raw text or content, or file to extract data from using regular expressions.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Regex List [Label + Pattern]",
        paramInputPlaceholder:
          "e.g. [ { label: 'Email', pattern: '\\\\S+@\\\\S+\\.\\\\S+' } ]",
        paramDescription:
          "A list of labels and regex patterns to apply. Each match will be returned with its label. E.g. [ { label: 'Email', pattern: '\\\\S+@\\\\S+\\.\\\\S+' } ]",
        type: "primitive/record",
        value: [{ key: "", value: "" }],
      },
      {
        paramName: "Global Match",
        paramDescription:
          "If true, will extract all matches; otherwise, only the first one for each pattern.",
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Extract Table from HTML",
    nodeName: "Extract Data",
    operationItemDescription:
      "Detect and extract tables from HTML pages or fragments.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "HTML Input",
        paramInputPlaceholder: "<table>...</table> or URL",
        paramDescription:
          "Paste Raw HTML content, HTML file or url that includes one or more tables.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Table Index",
        paramInputPlaceholder: "(0 = first table)",
        paramDescription:
          "The index of the table to extract if there are multiple (0 = first table).",
        type: "primitive/number",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Extract Named Entities",
    nodeName: "Extract Data",
    operationItemDescription:
      "Use NLP to extract names, dates, locations, etc., from text.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder:
          "Paste unstructured text like an article or email...",
        paramDescription: "The text to analyze for named entities.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Entity Types",
        paramDescription:
          "List of named entity types you want to extract (e.g., PERSON, ORG, DATE, LOCATION).",
        type: "primitive/text",
        valuesToPickFrom: [
          "PERSON (e.g., Marie Curie)",
          "ORG (e.g., Google)",
          "LOCATION (e.g., Tokyo)",
          "DATE (e.g., 2025-03-15)",
          "TIME (e.g., 3:00 PM)",
          "MONEY (e.g., $1,000)",
          "PERCENT (e.g., 45%)",
          "NORP (e.g., American)",
          "FAC (e.g., JFK Airport)",
          "LANGUAGE (e.g., French)",
          "LAW (e.g., Section 13)",
          "EVENT (e.g., World War II)",
          "PRODUCT (e.g., iPhone)",
          "WORK_OF_ART (e.g., Starry Night)",
          "QUANTITY (e.g., 3 liters)",
          "ORDINAL (e.g., 1st)",
          "CARDINAL (e.g., 1000)",
          "EMAIL (e.g., user@example.com)",
          "URL (e.g., https://vscrape.com)",
          "PHONE_NUMBER (e.g., +123456789)",
          "HASHTAG (e.g., #Automation)",
          "USERNAME (e.g., @johnny)",
          "IP_ADDRESS (e.g., 192.168.0.1)",
          "FILE_PATH (e.g., /home/user/file.txt)",
          "SKILL (e.g., Python)",
          "JOB_TITLE (e.g., Data Analyst)",
          "BRAND (e.g., Nike)",
        ],
        value: [] as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Tag Operations
  {
    operationItemName: "AI-based Tagging",
    nodeName: "Tag",
    operationItemDescription:
      "Automatically generate tags based on the semantic content of text using AI.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content, url or file path...",
        paramDescription: "The raw text or document to analyze and tag.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Tag Type",
        paramInputPlaceholder: "e.g., topic, sentiment, category",
        paramDescription:
          "Describe what kind of tags to generate (e.g., topics, content type, categories).",
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Max Tags",
          paramInputPlaceholder: "e.g., 5",
          paramDescription: "Maximum number of tags to return.",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Temperature",
          paramInputPlaceholder: "e.g., 0.3",
          paramDescription:
            "Controls AI creativity vs. precision. Lower = more focused tagging.",
          type: "primitive/number",
          value: "" as any,
        },
      ],
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Keyword-Based Tagging",
    nodeName: "Tag",
    operationItemDescription:
      "Tag content by matching predefined keyword sets.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content, url or file path...",
        paramDescription: "Content that will be scanned for keywords.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Keyword Map",
        paramInputPlaceholder: "e.g., topic, sentiment, category",
        paramDescription: `If any keyword appears in the text, the matching tag is added.
        For example: if you set Name = "Health" and Value = "exercise, nutrition", any content mentioning those words will be tagged as Health`,
        type: "primitive/record",
        value: [{ key: "", value: "" }],
      },
      {
        paramName: "Case Sensitive",
        paramDescription: "Whether keyword matching should be case-sensitive.",
        type: "primitive/switch",
        value: false,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Field Mapper Operations
  {
    operationItemName: "Rename Fields",
    nodeName: "Field Mapper",
    operationItemDescription: `Change the names of fields in your data object to match a new schema.
    Example: { "first_name": "Alice" } → { "name": "Alice" }`,
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Object",
        paramInputPlaceholder: "e.g. { 'name': 'Eva', 'dob': '1990-01-01' }",
        paramDescription: "The original data with keys you want to rename.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Field Map",
        paramDescription: `A mapping of old field names to new field names.`,
        type: "primitive/record",
        value: [{ key: "", value: "" }],
      },
      [
        {
          paramName: "Ignore Missing",
          paramDescription: `If true, missing fields will be ignored instead of throwing an error.`,
          type: "primitive/switch",
          value: true,
        },
        {
          paramName: "Only Renamed",
          paramDescription: `If true, only renamed fields will be returned. Otherwise, unlisted fields will also be included in the output.`,
          type: "primitive/switch",
          value: false,
        },
      ],
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Flatten Nested Structure",
    nodeName: "Field Mapper",
    operationItemDescription: `Convert a deeply nested object into a flat key-value format using separators.
    Example: { "user": { "name": "Alice" } } → { "user.name": "Alice" }`,
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Object",
        paramInputPlaceholder:
          "e.g. { 'user': { 'name': { 'first': 'Alice' } } }",
        paramDescription: "The nested Data you want to flatten.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Separator",
        paramInputPlaceholder: `e.g., « . » | « _ »`,
        paramDescription: `Separator used in flattened keys (e.g., '.', '_').`,
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Include Array",
        paramDescription: `Whether to flatten arrays (e.g., users[0].name).`,
        type: "primitive/switch",
        value: false,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Rebuild Nested Structure",
    nodeName: "Field Mapper",
    operationItemDescription: `Turn a flat object with dot-separated keys into a nested structure.
    Example: { "user.name": "Alice" } → { "user": { "name": "Alice" } }`,
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Object",
        paramInputPlaceholder: "e.g. { 'user.name.first': 'Alice' }",
        paramDescription: "The flat key-value object to nest.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Separator",
        paramInputPlaceholder: `e.g., « . » | « _ »`,
        paramDescription: `Separator used in flat keys to define nesting`,
        type: "primitive/text",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },

  //
  //
  //
  //
  // Text Manipulation Operations
  {
    operationItemName: "Trim Whitespace",
    nodeName: "Text Manipulation",
    operationItemDescription:
      "Remove leading and trailing whitespace from a text content.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The raw text to trim.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Change Case",
    nodeName: "Text Manipulation",
    operationItemDescription:
      "Convert text to uppercase, lowercase, title case, or sentence case.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The raw text to change the case.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Case Type",
        paramDescription: "Choose how to transform the case of the text.",
        valuesToPickFrom: [
          "UPPERCASE",
          "lowercase",
          "Title Case",
          "Sentence case",
        ],
        type: "primitive/text",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Replace Subtext",
    nodeName: "Text Manipulation",
    operationItemDescription:
      "Find and replace parts of a text content using plain text or regex.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Find",
        paramInputPlaceholder: `Type your content or regex pattern ("\\s+")`,
        paramDescription: "Text or regex pattern to search for.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Replace With",
        paramInputPlaceholder: `e.g. « , » | « - »`,
        paramDescription: "What to replace the matched content with.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Use Regex",
        paramDescription: 'Whether to interpret "find" as a regex pattern.',
        type: "primitive/switch",
        value: false,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Split Text",
    nodeName: "Text Manipulation",
    operationItemDescription:
      "Split a text content into parts using a delimiter (e.g., comma, space).",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The raw text to split.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Delimiter",
        paramInputPlaceholder: "e.g. « , » | « ; » | « \\t »",
        paramDescription: "Character(s) used to split the text content.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Limit",
        paramInputPlaceholder: "e.g. 4",
        paramDescription: "Optional number of splits to perform.",
        type: "primitive/number",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Subtext",
    nodeName: "Text Manipulation",
    operationItemDescription:
      "Extract a part of a text based on start index and length.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The raw text to split.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Start At",
        paramInputPlaceholder: "e.g. 0",
        paramDescription:
          "Index where the subtext should start (0 = beginning).",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Length",
        paramInputPlaceholder: "e.g. 5",
        paramDescription:
          "Number of characters to extract (leave blank to extract till end).",
        type: "primitive/number",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Sanitize Text",
    nodeName: "Text Manipulation",
    operationItemDescription:
      "Remove special characters, HTML tags, or emojis from text.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to sanitize.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Remove HTML",
        paramDescription: "Strip HTML tags from the text content.",
        type: "primitive/switch",
        value: true,
      },
      {
        paramName: "Remove Special Chars",
        paramDescription: "Remove special symbols (e.g., @, #, $, %, etc.).",
        type: "primitive/switch",
        value: true,
      },
      {
        paramName: "Remove Emojis",
        paramDescription: "Remove all emojis from the text.",
        type: "primitive/switch",
        value: false,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Normalize Accents",
    nodeName: "Text Manipulation",
    operationItemDescription:
      "Convert accented characters to plain letters (é → e, ñ → n).",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to normalize.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Slugify",
    nodeName: "Text Manipulation",
    operationItemDescription: `Convert text to a URL-safe slug (e.g., "Hello World!" → "hello-world").`,
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to slugify.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Delimiter",
        paramInputPlaceholder: "e.g. « - » | « _ » | « / »",
        paramDescription: " Character to use as separator in the slug.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "To Lowercase",
        paramDescription: "Convert result to lowercase.",
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Limit Length",
    nodeName: "Text Manipulation",
    operationItemDescription: `Truncate a text content to a max length with optional ellipsis.`,
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to slugify.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Max Length",
        paramInputPlaceholder: "e.g. 100",
        paramDescription: "Maximum number of characters allowed.",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Add Ellipsis (...)",
        paramDescription: 'Append "..." if the text is cut off.',
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Remove Duplicates (Words or Lines)",
    nodeName: "Text Manipulation",
    operationItemDescription: "Remove repeated words or lines from the text.",
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The raw text to deduplicate.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Mode",
        paramDescription: "Choose whether to deduplicate by word or by line.",
        valuesToPickFrom: ["Word", "Line"],
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Ignore Case",
        paramDescription: "Treat Hello and hello as the same for comparison.",
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Translate Text",
    nodeName: "Text Manipulation",
    operationItemDescription:
      "Automatically translate text from one language to another.",
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to translate.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "To Language",
        paramDescription: "Target language code.",
        valuesToPickFrom: Object.values(appLanguages)[0].map(
          (lang) => lang.label
        ),
        type: "primitive/text",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Count Words/Characters",
    nodeName: "Text Manipulation",
    operationItemDescription:
      "Return the total word count or character count of the text.",
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Add text content...",
        paramDescription:
          "Return the total word count or character count of the text.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Count Type",
        paramDescription: "Choose whether to count words or characters.",
        valuesToPickFrom: ["Word", "Characters"],
        type: "primitive/text",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Obfuscate / Mask Text",
    nodeName: "Text Manipulation",
    operationItemDescription: `Mask sensitive parts of a text (e.g., john@example.com → j***@example.com).`,
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to slugify.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Mask Character",
        paramInputPlaceholder: "e.g. « * »",
        paramDescription: "Character to use for masking.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Preserve Start (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g. 1",
        paramDescription: "Number of characters to preserve at the beginning.",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Preserve End (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g. 5",
        paramDescription: "Number of characters to preserve at the end.",
        type: "primitive/number",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Strip Punctuation",
    nodeName: "Text Manipulation",
    operationItemDescription:
      "Remove all punctuation characters from the text.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to strip punctuation from.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: 'Exclude List (e.g. "?")',
        isOptional: true,
        paramDescription: "Punctuation characters to keep (optional).",
        type: "primitive/array",
        value: [""],
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Add Prefix / Suffix",
    nodeName: "Text Manipulation",
    operationItemDescription: "Wrap or decorate each word in a text content.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to decorate.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Prefix",
        isOptional: true,
        paramInputPlaceholder: "e.g. « @ »",
        paramDescription: "Word or Character to add before each word.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Suffix",
        isOptional: true,
        paramInputPlaceholder: "e.g. « ! »",
        paramDescription: "Word or Character to add after each word.",
        type: "primitive/text",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Pluralize or Singularize",
    nodeName: "Text Manipulation",
    operationItemDescription: "Convert text between singular and plural forms.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to strip punctuation from.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Mode",
        paramDescription: "Choose conversion direction.",
        type: "primitive/text",
        valuesToPickFrom: ["Pluralize", "Singularize"],
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Randomize Text",
    nodeName: "Text Manipulation",
    operationItemDescription:
      "Shuffle words, letters, or apply text scrambling for anonymization.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Input Content",
        paramInputPlaceholder: "Paste your content...",
        paramDescription: "The text content to strip punctuation from.",
        type: "primitive/text",
        value: "",
        isTextarea: true,
      },
      {
        paramName: "Mode",
        paramDescription: "Choose conversion direction.",
        type: "primitive/text",
        valuesToPickFrom: ["Letters", "Words"],
        value: "",
      },
      {
        paramName: "Preserve Length",
        isOptional: true,
        paramDescription:
          "Keep the length of each word consistent when scrambling.",
        type: "primitive/switch",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // AI Generation Operations
  {
    operationItemName: "Generate Text",
    nodeName: "AI Generation",
    operationItemDescription:
      "Create written content from a prompt — for articles, emails, product descriptions, etc.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Prompt",
        paramInputPlaceholder: "e.g., Write a blog intro about skydiving...",
        paramDescription:
          "The instruction that guides what the AI should write.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Tone",
        isOptional: true,
        paramInputPlaceholder: "e.g., casual, professional, witty",
        paramDescription: "Optional tone or voice for the generated text",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Length",
        isOptional: true,
        paramDescription: "Approximate desired length of the output.",
        valuesToPickFrom: [
          "Very Short",
          "Short",
          "Medium",
          "Long",
          "Very Long",
          "Full / Exhaustive",
        ],
        type: "primitive/text",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Summarize or Rewrite Content",
    nodeName: "AI Generation",
    operationItemDescription:
      "Transform existing text — summarizing or paraphrasing it with a clear intent.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Prompt",
        paramInputPlaceholder: "Paste your content here...",
        paramDescription:
          "The full original text to be summarized or rewritten.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Mode",
        valuesToPickFrom: ["Summarize", "Paraphrase"],
        paramDescription: "Choose a specific mode.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Style",
        isOptional: true,
        paramInputPlaceholder: "e.g., simplified, professional",
        paramDescription: "Style of the output text.",
        type: "primitive/text",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Generate Metadata (SEO, Tags, Titles)",
    nodeName: "AI Generation",
    operationItemDescription:
      "Generate optimized metadata from raw content (titles, descriptions, tags).",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Prompt",
        paramInputPlaceholder:
          "Paste your product description or blog post here...",
        paramDescription: "The source content from which to generate metadata.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Output Type",
        paramDescription: "Specify which metadata element(s) to generate.",
        paramInputPlaceholder: "e.g., meta description, SEO title, tags",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Max Items",
        isOptional: true,
        paramInputPlaceholder: "e.g., 5",
        paramDescription: "Optional limit for tags or suggestions.",
        type: "primitive/number",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Generate Image",
    nodeName: "AI Generation",
    operationItemDescription:
      "Create an image from a descriptive prompt using AI.",
    skipDuplicate: true,
    loopThrough: false,
    itemParams: [
      {
        paramName: "Prompt",
        paramInputPlaceholder:
          "e.g., “a peaceful forest at sunset in Studio Ghibli style”",
        paramDescription:
          "The instruction that guides what the AI should write.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Style",
        isOptional: true,
        paramInputPlaceholder:
          "e.g., photorealistic, cartoon, oil painting ., photorealistic, cartoon, oil painting",
        paramDescription:
          "Optional visual style to apply to the generated image.",
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Width",
          isOptional: true,
          paramInputPlaceholder: "e.g. 512",
          paramDescription: "Width of the image to be generated.",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Height",
          isOptional: true,
          paramInputPlaceholder: "e.g. 512",
          paramDescription: "Height of the image to be generated.",
          type: "primitive/number",
          value: "" as any,
        },
      ],
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Generate Video (Short Loop)",
    nodeName: "AI Generation",
    operationItemDescription:
      "Create a short animated video (or loop) from a descriptive scene prompt.",
    itemParams: [
      {
        paramName: "Prompt",
        paramInputPlaceholder:
          "e.g., A drone flying through a dense neon-lit cyberpunk city...",
        paramDescription: "Textual description of the scene to animate.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Duration",
        valuesToPickFrom: ["5 seconds", "10 seconds", "20 seconds"],
        paramDescription: "Length of the video loop.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Motion Style",
        isOptional: true,
        paramInputPlaceholder: "e.g., slow pan, dynamic, steady",
        paramDescription: "Style of motion in the generated clip.",
        type: "primitive/text",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Generate Voice / Audio",
    nodeName: "AI Generation",
    operationItemDescription:
      "Convert text into natural-sounding speech using AI-generated voices — useful for voiceovers, narration, or accessibility.",
    itemParams: [
      {
        paramName: "Prompt",
        paramInputPlaceholder:
          "e.g., Welcome to our website. Let me walk you through our services...",
        paramDescription: "The text you want to convert into spoken audio.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Voice Type",
        valuesToPickFrom: Object.values(appVoices)[0].map((lang) => lang.label),
        paramDescription: "The desired voice style or persona.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Language",
        paramDescription:
          "The language and regional accent for the generated voice.",
        valuesToPickFrom: Object.values(appLanguages)[0].map(
          (lang) => lang.label
        ),
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Speed",
        valuesToPickFrom: ["1.0 (normal)", "0.8 (slower)", "1.2 (faster)"],
        paramDescription: "Controls the playback speed of the speech.",
        type: "primitive/text",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Sentiment Analysis Operations
  {
    operationItemName: "Basic Sentiment Classification",
    nodeName: "Sentiment Analysis",
    operationItemDescription:
      "Determine if the input text expresses a positive, negative, or neutral sentiment.",
    itemParams: [
      {
        paramName: "Text Content",
        paramInputPlaceholder: "Paste the content to analyze...",
        paramDescription: "The text that will be analyzed for basic sentiment.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Language (Optional)",
        isOptional: true,
        paramDescription: "The language of the text for proper analysis.",
        valuesToPickFrom: Object.values(appLanguages)[0].map(
          (lang) => lang.label
        ),
        type: "primitive/text",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Sentiment Scoring",
    nodeName: "Sentiment Analysis",
    operationItemDescription:
      "Return a numerical sentiment score (e.g., -1 to 1) and confidence levels.",
    itemParams: [
      {
        paramName: "Text Content",
        paramInputPlaceholder: "Enter the text to be scored...",
        paramDescription: "The content to calculate a sentiment score from.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Normalize Score",
        isOptional: true,
        paramDescription:
          "Whether to normalize the score to a scale like -1 (neg) to +1 (pos).",
        type: "primitive/switch",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Emotion Detection",
    nodeName: "Sentiment Analysis",
    operationItemDescription:
      "Detect emotional undertones in the text — e.g., joy, anger, sadness, fear, surprise.",
    itemParams: [
      {
        paramName: "Text Content",
        paramInputPlaceholder: "Enter text to be analyzed for emotions...",
        paramDescription: "The text to be analyzed for emotions.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "topN",
        isOptional: true,
        paramInputPlaceholder: "e.g., 1 or 3",
        paramDescription: "Number of top emotions to return.",
        type: "primitive/number",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Intent Classification",
    nodeName: "Sentiment Analysis",
    operationItemDescription:
      "Classify the text intent — e.g., ask a question, express frustration, request support, etc.",
    itemParams: [
      {
        paramName: "Text Content",
        paramInputPlaceholder: "e.g., I need help with my order...",
        paramDescription: "The text content to classify for intent.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Custom Labels",
        paramDescription:
          "Optional list of custom intents to classify against. E.g., [request, complaint, inquiry]",
        type: "primitive/array",
        isOptional: true,
        value: [""],
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Tone Classification",
    nodeName: "Sentiment Analysis",
    operationItemDescription:
      "Detect the tone of the text — e.g., formal, casual, sarcastic, professional, angry.",
    itemParams: [
      {
        paramName: "Text Content",
        paramInputPlaceholder: "Paste your text content here...",
        paramDescription: "Text content to analyze for tone.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Sentiment from Image",
    nodeName: "Sentiment Analysis",
    operationItemDescription:
      "Analyze the sentiment from an Image. Optionally detect facial emotions if faces are present.",
    itemParams: [
      {
        paramName: "Text Content",
        paramInputPlaceholder: "Enter Image Path or URL...",
        paramDescription:
          "URL or Image Path to an image containing text or faces.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Include Facial Emotion",
        paramDescription:
          "Whether to detect facial emotions from human faces (e.g., happy, angry).",
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Data Enrichment Operations
  {
    operationItemName: "Email Lookup",
    nodeName: "Data Enrichment",
    operationItemDescription:
      "Enrich an email address with associated profile data (name, company, job title, LinkedIn, etc.)",
    itemParams: [
      {
        paramName: "Email to look up",
        paramInputPlaceholder: "e.g., john.doe@example.com",
        paramDescription:
          "The email address to enrich with public profile information.",
        type: "primitive/emailUrl",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Company Info Lookup",
    nodeName: "Data Enrichment",
    operationItemDescription:
      "Retrieve enriched data about a company using its domain (size, industry, tech stack, logo, etc.)",
    itemParams: [
      {
        paramName: "Domain",
        paramInputPlaceholder: "e.g., shopify.com",
        paramDescription:
          "The company domain name used to fetch enrichment details.",
        type: "primitive/url",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Social Profile Extraction",
    nodeName: "Data Enrichment",
    operationItemDescription:
      "Extract and enrich data from a given social media URL (e.g., LinkedIn, Twitter, etc.)",
    itemParams: [
      {
        paramName: "Profile URL",
        paramInputPlaceholder: "e.g., https://www.linkedin.com/in/john-doe",
        paramDescription: "The social profile URL to analyze and enrich.",
        type: "primitive/url",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "IP to Geo & ISP Info",
    nodeName: "Data Enrichment",
    operationItemDescription:
      "Enrich an IP address with location (city, country), timezone, ISP, and organization data.",
    itemParams: [
      {
        paramName: "IP Address",
        paramInputPlaceholder: "e.g., 192.168.0.1",
        paramDescription:
          "The IP address to enrich with geo-location and network provider information.",
        type: "primitive/text",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Phone Number Lookup",
    nodeName: "Data Enrichment",
    operationItemDescription:
      "Validate and enrich a phone number with carrier, line type, country, and region data.",
    itemParams: [
      {
        paramName: "Phone Number",
        paramInputPlaceholder: "e.g., +14155552671",
        paramDescription:
          "Phone number to enrich with telecom and geographical data.",
        type: "primitive/tel",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Zip/Postal Code Enrichment",
    nodeName: "Data Enrichment",
    operationItemDescription:
      "Get city, state, region, timezone, and population data from a zip or postal code.",
    itemParams: [
      {
        paramName: "Postal Code",
        paramInputPlaceholder: "e.g., 94107",
        paramDescription:
          "The zip or postal code to enrich with location and demographic information.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Country Code (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g., US",
        paramDescription:
          "Optional 2-letter country code to narrow down the postal code context.",
        type: "primitive/text",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Image Manipulation Operations
  {
    operationItemName: "Resize Image",
    nodeName: "Image Manipulation",
    operationItemDescription:
      "Resize an image to specific dimensions or by percentage.",
    itemParams: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to resize",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Resize Mode",
        paramDescription: "Choose Resize Method",
        type: "primitive/radio",
        valuesToPickFrom: ["Percentage", "Pixels"],
        value: "Percentage",
      },
      [
        {
          paramName: "Width",
          paramInputPlaceholder: "Enter...",
          paramDescription: "Target width in pixels or percentage.",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Height",
          paramInputPlaceholder: "Enter...",
          paramDescription: "Target height in pixels or percentage.",
          type: "primitive/number",
          value: "" as any,
        },
      ],
      {
        paramName: "Keep Aspect Ratio",
        paramDescription: "Maintain aspect ratio when resizing.",
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Crop Image",
    nodeName: "Image Manipulation",
    operationItemDescription:
      "Crop using coordinates or aspect ratio, with optional Smart Crop to focus on key content.",
    itemParams: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to crop",
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "X",
          paramInputPlaceholder: "e.g., 100",
          paramDescription: "X coordinate of the top-left corner for cropping.",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Y",
          paramInputPlaceholder: "e.g., 50",
          paramDescription: "Y coordinate of the top-left corner for cropping.",
          type: "primitive/number",
          value: "" as any,
        },
      ],
      [
        {
          paramName: "Width",
          paramInputPlaceholder: "e.g., 400",
          paramDescription: "Width of the crop box in pixels.",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Height",
          paramInputPlaceholder: "e.g., 300",
          paramDescription: "Height of the crop box in pixels.",
          type: "primitive/number",
          value: "" as any,
        },
      ],
      {
        paramName: "Aspect Ratio (Optional)",
        isOptional: true,
        paramDescription: "Optional aspect ratio to maintain while cropping.",
        type: "primitive/text",
        valuesToPickFrom: [
          "1:1 (Square, social media)",
          "4:3 (Standard, old TVs)",
          "3:2 (Photo, DSLR)",
          "16:9 (Widescreen, HD)",
          "9:16 (Vertical, mobile)",
          "21:9 (Ultra-wide, cinema)",
          "2:1 (Modern video)",
          "5:4 (Classic monitor)",
          "4:5 (Portrait, social)",
          "3:1 (Banner, wide)",
        ],
        value: "",
      },
      {
        paramName: "Smart Crop",
        paramDescription:
          "If true, automatically crop to keep the most relevant parts.",
        type: "primitive/switch",
        value: false,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Compress Image",
    nodeName: "Image Manipulation",
    operationItemDescription: "Reduce file size with quality control.",
    itemParams: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to compress",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Quality (1-100)",
        paramInputPlaceholder: "e.g., 75",
        paramDescription: "Compression quality from 1 (worst) to 100 (best).",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Max File Size (KB) (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g., 500",
        paramDescription: "Optional max file size in KB after compression.",
        type: "primitive/number",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Blur Image",
    nodeName: "Image Manipulation",
    operationItemDescription:
      "Apply a blur effect to the entire image or selective areas (including faces).",
    itemParams: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to blur",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Blur Radius",
        paramDescription: "Intensity of the blur effect.",
        paramInputPlaceholder: "e.g., 10",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Blur Faces",
        paramDescription: "Automatically detect and blur faces for privacy.",
        type: "primitive/switch",
        value: false,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Overlay Text / Watermark",
    nodeName: "Image Manipulation",
    operationItemDescription: "Add text or image watermark with styling.",
    itemParams: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to add watermark on.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Overlay Content",
        paramInputPlaceholder: "Add Your watermark text or image...",
        paramDescription: "Text or Image (path, url) to overlay on the image.",
        isTextarea: true,
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Position",
        paramDescription: "Position of the overlay content on the image.",
        type: "primitive/text",
        valuesToPickFrom: [
          "top-left",
          "top-center",
          "top-right",
          "center-left",
          "center",
          "center-right",
          "bottom-left",
          "bottom-center",
          "bottom-right",
        ],
        value: "",
      },
      [
        {
          paramName: "Overlay Size (pixels)",
          paramInputPlaceholder: "e.g., 24",
          paramDescription: "Image or Font size of the overlay content",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Opacity (0-1)",
          paramInputPlaceholder: "e.g., 0.7",
          paramDescription: "Opacity of the overlay content (0 to 1).",
          type: "primitive/number",
          value: "" as any,
        },
      ],
      {
        paramName: "Color HEX (if Text Overlay)",
        isOptional: true,
        paramInputPlaceholder: "e.g., #FFFFFF",
        paramDescription: "Text color in HEX.",
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Rotate / Flip Image",
    nodeName: "Image Manipulation",
    operationItemDescription: "Rotate or flip the image.",
    itemParams: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to rotate or flip",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Rotate Degrees",
        paramInputPlaceholder: "e.g., 90",
        paramDescription: "Rotate image by degrees clockwise (0-360).",
        type: "primitive/number",
        value: "" as any,
      },
      [
        {
          paramName: "Flip Horizontal",
          paramDescription: "Flip the image horizontally.",
          type: "primitive/switch",
          value: false,
        },
        {
          paramName: "Flip Vertical",
          paramDescription: "Flip the image vertically.",
          type: "primitive/switch",
          value: false,
        },
      ],
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Remove Background",
    nodeName: "Image Manipulation",
    operationItemDescription:
      "Automatically isolate and remove image background.",
    itemParams: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to remove background",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Tolerance",
        paramInputPlaceholder: "e.g., 10",
        paramDescription:
          "Sensitivity for background removal (higher = more aggressive).",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Background Color (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g., #FFFFFF",
        paramDescription:
          "Background color to replace removed background (default: transparent).",
        type: "primitive/text",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Enhance Image (Super Resolution)",
    nodeName: "Image Manipulation",
    operationItemDescription:
      "Improve blurry or low-res images to high quality.",
    itemParams: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to enhance",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Scale Factor",
        paramInputPlaceholder: "e.g., 2",
        paramDescription: `Multiplier for resolution enhancement (e.g., 2x, 4x).`,
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Denoise Strength (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g., 0.5",
        paramDescription: `Level of noise reduction applied (0 to 1).`,
        type: "primitive/number",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Image Quality Enhancer",
    nodeName: "Image Manipulation",
    operationItemDescription:
      "Enhances image clarity by combining sharpening, brightness/contrast adjustment, and noise reduction.",
    itemParams: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to enhance",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Brightness",
        paramInputPlaceholder: "e.g., 10",
        paramDescription: `Brightness adjustment (-100 to 100).`,
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Contrast",
        paramInputPlaceholder: "e.g., 20",
        paramDescription: `Contrast adjustment (-100 to 100).`,
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Sharpen Amount",
        paramInputPlaceholder: "e.g., 1.5",
        paramDescription: `Sharpness intensity (1 = normal).`,
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Denoise Level (Optional)",
        paramInputPlaceholder: "e.g., 0.3",
        paramDescription: `Noise reduction level (0 to 1).`,
        type: "primitive/number",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Extract Dominant Colors",
    nodeName: "Image Manipulation",
    operationItemDescription: "Identify main colors in the image.",
    itemParams: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to extract colors from.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Color Count",
        paramInputPlaceholder: "e.g., 3",
        paramDescription: `Number of dominant colors to extract.`,
        type: "primitive/number",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Detect Faces and Objects",
    nodeName: "Image Manipulation",
    operationItemDescription: "Detect faces and objects with bounding boxes.",
    itemParams: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image used to detect faces and objects.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Draw Bounding Boxes",
        paramDescription: `Overlay bounding boxes on detected faces/objects.`,
        type: "primitive/switch",
        value: true,
      },
      {
        paramName: "Object Types",
        paramDescription: `Filter object types to detect. E.g., Person, Car, Dog. (leave empty for all).`,
        type: "primitive/array",
        isOptional: true,
        value: [""],
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Generate Thumbnail",
    nodeName: "Image Manipulation",
    operationItemDescription: "Create a small optimized preview image.",
    itemParams: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image used to generate thumbnail",
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Max Width",
          paramInputPlaceholder: "e.g., 150",
          paramDescription: "Maximum width of thumbnail. (Pixels)",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Max Height",
          paramInputPlaceholder: "e.g., 150",
          paramDescription: "Maximum height of thumbnail. (Pixels)",
          type: "primitive/number",
          value: "" as any,
        },
      ],
      {
        paramName: "Maintain Aspect Ratio",
        paramDescription: "Keep original aspect ratio.",
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Add Shape & Border",
    nodeName: "Image Manipulation",
    operationItemDescription:
      "Shapes the image (e.g., circle) and adds border or padding.",
    itemParams: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to modify",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Shape",
        paramDescription: "Shape mask to apply.",
        type: "primitive/text",
        valuesToPickFrom: [
          "None",
          "Circle",
          "Square",
          "Rounded-rectangle",
          "Ellipse",
          "Triangle",
          "Hexagon",
          "Star",
          "Heart",
        ],
        value: "",
      },
      [
        {
          paramName: "Border Width",
          paramInputPlaceholder: "e.g., 5",
          paramDescription: "Width of the border in pixels.",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Border Color",
          paramInputPlaceholder: "e.g., #000000",
          paramDescription: "Border color in HEX.",
          type: "primitive/text",
          value: "",
        },
      ],
      {
        paramName: "Padding",
        paramDescription: "Padding space around the image in pixels.",
        paramInputPlaceholder: "e.g., 10",
        type: "primitive/number",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Apply Filters",
    nodeName: "Image Manipulation",
    operationItemDescription: "Add artistic filters to an image.",
    itemParams: [
      {
        paramName: "Image input",
        paramInputPlaceholder: "Add your Image, URL or Path...",
        paramDescription: "Image to apply filters to.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Filter Type",
        paramDescription: "Filter style to apply.",
        type: "primitive/text",
        valuesToPickFrom: [
          "Grayscale",
          "BlackWhite",
          "Sepia",
          "Vintage",
          "Cool",
          "Warm",
          "Blur",
          "Sharpen",
          "Invert",
          "Brightness",
          "Contrast",
          "Saturate",
          "Duotone",
          "Clarendon",
          "Gingham",
          "Lark",
          "Juno",
          "Slumber",
          "Aden",
          "Perpetua",
          "Valencia",
          "xProII",
          "Earlybird",
          "Brannan",
        ],
        value: [] as any,
      },
      {
        paramName: "intensity",
        paramInputPlaceholder: "e.g., 0.7",
        paramDescription: "Filter intensity (0 to 1).",
        type: "primitive/number",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Image Fusion",
    nodeName: "Image Manipulation",
    operationItemDescription:
      "Combines multiple images using side-by-side, stacked, or overlay layouts.",
    itemParams: [
      {
        paramName: "Images",
        paramInputPlaceholder: "List of image path, URLs or base64 to merge.",
        paramDescription: "Add images to combine...",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Layout",
        paramDescription: "How to combine images.",
        type: "primitive/text",
        valuesToPickFrom: [
          "Side-by-side",
          "Stacked",
          "Overlay",
          "Grid",
          "Collage",
        ],
        value: "",
      },
      {
        paramName: "Spacing",
        paramInputPlaceholder: "e.g., 10",
        paramDescription: "Space between images in pixels.",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Alignment",
        paramDescription: "Alignment for merged images.",
        type: "primitive/text",
        valuesToPickFrom: [
          "center",
          "left",
          "right",
          "top",
          "bottom",
          "top-left",
          "top-right",
          "bottom-left",
          "bottom-right",
        ],
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Video Manipulation Operations
  {
    operationItemName: "Trim Video",
    nodeName: "Video Manipulation",
    operationItemDescription: "Cut the video to a specific start and end time.",
    itemParams: [
      {
        paramName: "Video",
        paramInputPlaceholder: "Add Video path, URL or base64 to trim.",
        paramDescription: "Add video to trim...",
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Start Time",
          paramDescription: "Start trimming from this timestamp (HH:MM:SS).",
          type: "primitive/milliseconds",
          value: "" as any,
        },
        {
          paramName: "End Time",
          paramDescription: "Stop trimming at this timestamp (HH:MM:SS).",
          type: "primitive/milliseconds",
          value: "" as any,
        },
      ],
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Resize Video",
    nodeName: "Video Manipulation",
    operationItemDescription: "Change dimensions to match platform or screen.",
    itemParams: [
      {
        paramName: "Video",
        paramInputPlaceholder: "Add Video path, URL or base64 to resize.",
        paramDescription: "Add video to resize...",
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Width",
          paramInputPlaceholder: "e.g. 1280",
          paramDescription: "Target width in pixels.",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Height",
          paramInputPlaceholder: "e.g. 720",
          paramDescription: "Target height in pixels.",
          type: "primitive/number",
          value: "" as any,
        },
      ],
      {
        paramName: "Keep Aspect Ratio",
        paramDescription: "Maintain original aspect ratio when resizing.",
        type: "primitive/switch",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Overlay Text / Watermark",
    nodeName: "Video Manipulation",
    operationItemDescription: "Add branding or labels onto the video.",
    itemParams: [
      {
        paramName: "Video",
        paramInputPlaceholder: "Video to add watermark on...",
        paramDescription: "Add Video path, URL or base64 to add overlay on.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Overlay Content",
        paramInputPlaceholder: "Add Your watermark text or image...",
        paramDescription: "Text or Image (path, url) to overlay on the video.",
        isTextarea: true,
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Start Time (Optional)",
          paramDescription:
            "Start displaying the content overlay at this timestamp (HH:MM:SS).",
          type: "primitive/milliseconds",
          value: "" as any,
        },
        {
          paramName: "End Time (Optional)",
          paramDescription:
            "Stop displaying the content overlay at this timestamp (HH:MM:SS).",
          type: "primitive/milliseconds",
          value: "" as any,
        },
      ],
      {
        paramName: "Position",
        paramDescription: "Position of the overlay content on the video.",
        type: "primitive/text",
        valuesToPickFrom: [
          "top-left",
          "top-center",
          "top-right",
          "center-left",
          "center",
          "center-right",
          "bottom-left",
          "bottom-center",
          "bottom-right",
        ],
        value: "",
      },

      [
        {
          paramName: "Overlay Size (pixels)",
          paramInputPlaceholder: "e.g., 24",
          paramDescription: "Image or Font size of the overlay content",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Opacity (0-1)",
          paramInputPlaceholder: "e.g., 0.7",
          paramDescription: "Opacity of the overlay content (0 to 1).",
          type: "primitive/number",
          value: "" as any,
        },
      ],
      {
        paramName: "Color HEX (if Text Overlay)",
        isOptional: true,
        paramInputPlaceholder: "e.g., #FFFFFF",
        paramDescription: "Text color in HEX.",
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Generate Thumbnail",
    nodeName: "Video Manipulation",
    operationItemDescription:
      "Auto-create a thumbnail image from a video frame.",
    itemParams: [
      {
        paramName: "Video",
        paramInputPlaceholder: "Add your Video, URL or Path...",
        paramDescription: "Video used to generate thumbnail",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Timestamp (Optional)",
        paramDescription: "The time to grab the thumbnail frame. (HH:MM:SS).",
        type: "primitive/milliseconds",
        isOptional: true,
        value: "" as any,
      },
      [
        {
          paramName: "Width",
          isOptional: true,
          paramInputPlaceholder: "e.g., 640",
          paramDescription: "Thumbnail width (optional).",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Height",
          isOptional: true,
          paramInputPlaceholder: "e.g., 360",
          paramDescription: "Thumbnail height (optional).",
          type: "primitive/number",
          value: "" as any,
        },
      ],
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Compress Video",
    nodeName: "Video Manipulation",
    operationItemDescription:
      "Reduce file size without losing too much quality.",
    itemParams: [
      {
        paramName: "Video",
        paramInputPlaceholder: "Add Video path, URL or base64 to compress.",
        paramDescription: "Add video to compress...",
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Quality (1-100)",
          isOptional: true,
          paramInputPlaceholder: "e.g., 90",
          paramDescription: "Compression quality from 1 (worst) to 100 (best).",
          type: "primitive/number",
          value: "" as any,
        },
        {
          paramName: "Target Size (MB) (Optional)",
          isOptional: true,
          paramInputPlaceholder: "e.g., 10",
          paramDescription: "Desired file size in megabytes.",
          type: "primitive/number",
          value: "" as any,
        },
      ],
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Add Captions / Subtitles",
    nodeName: "Video Manipulation",
    operationItemDescription: "Overlay subtitles (manual or AI-generated).",
    itemParams: [
      {
        paramName: "Video",
        paramInputPlaceholder: "Video to add captions to.",
        paramDescription:
          "Enter the video path, URL, or base64 string to overlay captions.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Caption Source",
        paramInputPlaceholder: "Leave empty for AI auto-generation.",
        paramDescription:
          "Source of subtitles (auto-generate or upload .srt/.vtt).",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Language",
        paramDescription: "Language of the captions.",
        valuesToPickFrom: Object.values(appLanguages)[0].map(
          (lang) => lang.label
        ),
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Position",
        paramDescription: "Placement of subtitles on screen.",
        type: "primitive/text",
        valuesToPickFrom: [
          "top-left",
          "top-center",
          "top-right",
          "center-left",
          "center",
          "center-right",
          "bottom-left",
          "bottom-center",
          "bottom-right",
        ],
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Speed Adjustment",
    nodeName: "Video Manipulation",
    operationItemDescription: "Change the video playback speed.",
    itemParams: [
      {
        paramName: "Video",
        paramInputPlaceholder: "Video to modify playback speed.",
        paramDescription:
          "Add Video path, URL or base64 string to adjust the playback speed...",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Speed",
        valuesToPickFrom: [
          "0.25 (very slow)",
          "0.5 (slow)",
          "0.75 (moderately slow)",
          "1.0 (normal)",
          "1.25 (moderately fast)",
          "1.5 (fast)",
          "1.75 (very fast)",
          "2.0 (double speed)",
        ],
        paramDescription: "Controls the playback speed of the video.",
        type: "primitive/text",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Smart Video Stitcher",
    nodeName: "Video Manipulation",
    operationItemDescription: "Combine multiple videos and add intro/outro.",
    itemParams: [
      {
        paramName: "Video Clips",
        paramInputPlaceholder: "Enter video URLs or paths to merge...",
        paramDescription: "List of video URLs or paths to merge.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Intro Clip (Optional)",
        isOptional: true,
        paramInputPlaceholder: "Optional intro video clip.",
        paramDescription: "Add an optional intro video clip to the beginning.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Outro Clip (Optional)",
        isOptional: true,
        paramInputPlaceholder: "Optional Outro video clip.",
        paramDescription: "Add an optional outro video clip to the end.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Transition Type",
        paramDescription:
          "Transition style between clips (e.g., none, fade, slide).",
        valuesToPickFrom: [
          "None (no transition)",
          "Fade (smooth fade between clips)",
          "Slide (slide transition between clips)",
          "Wipe (wipe transition between clips)",
          "Zoom (zoom in/out transition)",
          "Cube (3D cube transition)",
          "Dissolve (gradual dissolve effect)",
          "Flip (flip transition between clips)",
          "Circle (circle wipe transition)",
          "Ripple (water ripple effect)",
          "Spin (spin effect between clips)",
          "Blur (blur transition effect)",
        ],
        type: "primitive/text",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Auto Clean Audio",
    nodeName: "Video Manipulation",
    operationItemDescription: "Optimize audio for clarity and compliance.",
    itemParams: [
      {
        paramName: "Video",
        paramInputPlaceholder: "Add video to clean...",
        paramDescription: "Add Video path, URL or base64 to clean.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Remove Silences",
        paramDescription: `Automatically detect and cut silent parts.`,
        type: "primitive/switch",
        value: true,
      },
      {
        paramName: "Censor List",
        paramDescription: `Words to detect and censor.`,
        type: "primitive/array",
        value: [""],
      },
      {
        paramName: "Censor Method",
        paramDescription: "Censor style (mute, beep).",
        valuesToPickFrom: [
          "Beep (Replace the word with a beep sound)",
          "Mute (Silence the audio during the word)",
          "Blur (Blur the video over the censored word)",
          "Pixelate (Pixelate the video over the word)",
          "Black Bar (Cover the word with a black bar)",
          "Voice Change (Alter the voice to obscure the word)",
        ],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Smart Highlights (AI)",
    nodeName: "Video Manipulation",
    operationItemDescription:
      "Generate engaging short clips from a video using AI.",
    itemParams: [
      {
        paramName: "Video",
        paramInputPlaceholder: "Add video to highlight",
        paramDescription:
          "Enter the video path, URL, or base64 string to generate short clips.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Summary Length",
        paramInputPlaceholder: "e.g. 15 sec",
        paramDescription: `Max duration of highlight summary (in seconds).`,
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Number of Clips",
        paramInputPlaceholder: "e.g. 4",
        paramDescription: `Enter the number of video clips to generate.`,
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Highlight Criteria",
        paramDescription:
          "What defines a 'highlight' (AI uses this to detect moments).",
        valuesToPickFrom: [
          "Scene Change (Visual transition)",
          "Audio Spike (Sudden volume increase)",
          "Motion (Fast movement or high motion)",
          "Face Detection (Visible faces)",
          "Speech (Key moments with dialogue)",
          "Action (Significant actions like a jump or goal)",
          "Emotion (Strong emotional moments)",
          "Objects (Involvement of specific objects)",
          "Scene Brightness (Visually bright moments)",
          "Music Beat (Aligned with music beats)",
        ],
        type: "primitive/text",
        value: [] as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Apply Color Grade",
    nodeName: "Video Manipulation",
    operationItemDescription: "Stylize the video with cinematic filters.",
    itemParams: [
      {
        paramName: "Video",
        paramInputPlaceholder: "Add video to stylize.",
        paramDescription:
          "Enter the video path, URL, or base64 string to apply filters to.",
        type: "primitive/text",
        value: "",
      },

      {
        paramName: "Filters",
        paramDescription:
          "Choose from preset styles: cinematic, vintage, vibrant, etc.",
        valuesToPickFrom: [
          "Cinematic (Adds a film-like look with rich colors)",
          "Vintage (Gives a retro, old-film effect)",
          "Vibrant (Increases saturation for more vivid colors)",
          "Black & White (Converts the video to grayscale)",
          "Sepia (Applies a warm, brownish tone)",
          "Faded (Adds a soft, faded effect)",
          "Night Mode (Enhances dark tones for a nighttime effect)",
          "Lomo (Adds a vignette with high contrast)",
          "Bright (Increases overall brightness)",
          "Soft Focus (Adds a dreamy, soft focus effect)",
          "Retro (Gives a nostalgic, colorful, slightly washed-out look)",
          "HDR (High dynamic range, boosting contrast and colors)",
          "Warm (Adds a warm, golden tint)",
          "Cool (Adds a cool, bluish tint)",
          "Neon (Gives a vibrant, glowing effect)",
        ],
        type: "primitive/text",
        value: [] as any,
      },
      {
        paramName: "Intensity (0-1)",
        paramInputPlaceholder: "e.g. 0.7",
        paramDescription: `Strength of the filters (0 to 1).`,
        type: "primitive/number",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Smart Audio Mixer",
    nodeName: "Video Manipulation",
    operationItemDescription: "Full control over video audio track.",
    itemParams: [
      {
        paramName: "Video",
        paramInputPlaceholder: "Add video to modify...",
        paramDescription:
          "Enter the video path, URL, or base64 string to modify the audio track.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Normalize Volume",
        paramDescription: `Even out the volume across the video.`,
        type: "primitive/switch",
        value: "" as any,
      },
      {
        paramName: "Enhance Voice",
        paramDescription: `Improve clarity of human speech.`,
        type: "primitive/switch",
        value: "" as any,
      },
      {
        paramName: "Mute Original Audio",
        paramDescription: `Remove original audio completely.`,
        type: "primitive/switch",
        value: "" as any,
      },
      {
        paramName: "Replacement Audio URL (Optional)",
        isOptional: true,
        paramInputPlaceholder: "Optional audio file to use instead.",
        paramDescription:
          "URL or path to an audio file that replaces the original audio.",
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Audio Manipulation Operations
  {
    operationItemName: "Trim Audio",
    nodeName: "Audio Manipulation",
    operationItemDescription: "Cut audio to a specific start and end time.",
    itemParams: [
      {
        paramName: "Audio",
        paramInputPlaceholder: "The source audio to trim...",
        paramDescription: "Add Audio path, URL or base64 to trim.",
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Start Time",
          paramDescription: "Start time to begin the trimmed audio (HH:MM:SS).",
          type: "primitive/milliseconds",
          value: "" as any,
        },
        {
          paramName: "End Time",
          paramDescription: "End time to stop the trimmed audio (HH:MM:SS).",
          type: "primitive/milliseconds",
          value: "" as any,
        },
      ],
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Clean & Adjust Audio",
    nodeName: "Audio Manipulation",
    operationItemDescription:
      "Improve audio clarity by removing noise, adjusting volume, and changing pitch.",
    itemParams: [
      {
        paramName: "Audio",
        paramInputPlaceholder: "The source audio to enhance...",
        paramDescription: "Add Audio path, URL or base64 to clean and adjust.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Remove Silence",
        paramDescription: "Cut silence in the audio.",
        type: "primitive/switch",
        value: true,
      },
      {
        paramName: "Enable Ducking",
        paramDescription:
          "Automatically reduce background audio during speech.",
        type: "primitive/switch",
        value: true,
      },
      {
        paramName: "Noise Reduction Level",
        paramDescription: "Noise reduction strength (low, medium, high).",
        type: "primitive/text",
        valuesToPickFrom: ["Low", "Medium", "High"],
        value: "" as any,
      },

      {
        paramName: "Pitch Shift",
        paramDescription: "Change pitch in semitones (e.g., -2, 0, +3).",
        valuesToPickFrom: ["-3", "-2", "-1", "0", "+1", "+2", "+3"],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Add Background Music",
    nodeName: "Audio Manipulation",
    operationItemDescription:
      "Overlay a background music track with adjustable volume.",
    itemParams: [
      {
        paramName: "Audio",
        paramInputPlaceholder: "Enter the Main audio track ...",
        paramDescription:
          "Add Audio path, URL or base64 to add background music to.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Background Music",
        paramInputPlaceholder: "Enter the Background music track ...",
        paramDescription:
          "Add the Audio path, URL or base64 to be layered under the main audio track.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Music Volume (1-100)",
        paramInputPlaceholder: "e.g. 75",
        paramDescription: "Volume of the background music (0-100).",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Loop Background",
        paramDescription:
          "Should the background music loop to match main audio length?",
        type: "primitive/switch",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Auto-Censor & Filler Cutter",
    nodeName: "Audio Manipulation",
    operationItemDescription:
      "Clean audio by removing fillers and censoring words",
    itemParams: [
      {
        paramName: "Audio",
        paramInputPlaceholder: "Enter the audio to clean...",
        paramDescription: "Audio to scan for censorship and filler removal.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Remove Fillers",
        paramDescription: "Auto-remove 'uh', 'um', 'like' and similar fillers.",
        type: "primitive/switch",
        value: true,
      },
      {
        paramName: "Censor List",
        paramDescription: `Words to detect and censor.`,
        type: "primitive/array",
        value: [""],
      },
      {
        paramName: "Censor Method",
        paramDescription: "Censor style (mute, beep).",
        valuesToPickFrom: [
          "Mute (Silence the audio during the censored word)",
          "Beep (Insert a beep sound over the censored word)",
          "Skip (Remove the censored word completely)",
          "Distort (Distort the word for unrecognizability)",
          "Shush (Insert a 'shh' sound to cover the word)",
          "Reverse (Reverse the audio of the censored word)",
          "Pitch Shift (Alter the pitch to mask the word)",
        ],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Speed Adjustment",
    nodeName: "Audio Manipulation",
    operationItemDescription: "Change the audio playback speed.",
    itemParams: [
      {
        paramName: "Audio",
        paramInputPlaceholder: "Audio to modify playback speed...",
        paramDescription:
          "Add Audio path, URL or base64 string to adjust the playback speed...",
        type: "primitive/text",
        value: "",
      },

      {
        paramName: "Speed",
        valuesToPickFrom: [
          "0.25 (very slow)",
          "0.5 (slow)",
          "0.75 (moderately slow)",
          "1.0 (normal)",
          "1.25 (moderately fast)",
          "1.5 (fast)",
          "1.75 (very fast)",
          "2.0 (double speed)",
        ],
        paramDescription: "Controls the playback speed of the audio.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Preserve Pitch",
        paramDescription: "Maintain original pitch when adjusting speed.",
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Fade In / Fade Out",
    nodeName: "Audio Manipulation",
    operationItemDescription: "Create smooth fade-in and fade-out effects",
    itemParams: [
      {
        paramName: "Audio",
        paramInputPlaceholder: "The source audio to fade...",
        paramDescription: "Add Audio path, URL or base64 to apply fading to...",
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Fade In (Optional)",
          isOptional: true,
          paramDescription: "Duration for fade in at start.",
          type: "primitive/milliseconds",
          value: "" as any,
        },
        {
          paramName: "Fade Out (Optional)",
          isOptional: true,
          paramDescription: "Duration for fade out at end.",
          type: "primitive/milliseconds",
          value: "" as any,
        },
      ],
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Merge Audio",
    nodeName: "Audio Manipulation",
    operationItemDescription: "Combine multiple audio into one.",
    itemParams: [
      {
        paramName: "Audio",
        paramInputPlaceholder: "List of audio to merge in sequence...",
        paramDescription: "Add audio tracks to merge in sequence.",
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Cross Fade",
        paramDescription: "Apply smooth crossfade between segments.",
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Voice Isolation",
    nodeName: "Audio Manipulation",
    operationItemDescription:
      "Remove music and isolate voice from mixed audio.",
    itemParams: [
      {
        paramName: "Audio",
        paramInputPlaceholder: "The source audio to isolate...",
        paramDescription:
          "Add Audio path, URL or base64 containing both music and voice.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Output Type",
        paramDescription: "Choose 'Voice Only' or 'Music Only' as output.",
        type: "primitive/text",
        valuesToPickFrom: ["Voice Only", "Music Only"],
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Compress Audio",
    nodeName: "Audio Manipulation",
    operationItemDescription: "Reduce audio size while maintaining quality.",
    itemParams: [
      {
        paramName: "Audio",
        paramInputPlaceholder: "The source audio to compress...",
        paramDescription:
          "Add the Audio path, URL or base64 to reduce the size.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Target Bitrate",
        paramDescription:
          "Desired bitrate for compression (e.g., 64, 128, 192kbps).",
        valuesToPickFrom: [
          "64 kbps",
          "128 kbps",
          "192 kbps",
          "256 kbps",
          "320 kbps",
          "512 kbps",
          "1024 kbps",
        ],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Transcribe Audio (AI)",
    nodeName: "Audio Manipulation",
    operationItemDescription: "Generate a text transcript from an audio track.",
    itemParams: [
      {
        paramName: "Audio",
        paramInputPlaceholder: "Source audio for transcript",
        paramDescription:
          "Enter the audio path, URL, or base64 to generate the transcript.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Language",
        paramDescription: "Language of the transcript.",
        valuesToPickFrom: Object.values(appLanguages)[0].map(
          (lang) => lang.label
        ),
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Output Format",
        type: "primitive/text",
        paramDescription: "Choose the format for the transcript.",
        valuesToPickFrom: [
          "Plain Text",
          "JSON",
          "SRT (Subtitles)",
          "VTT (WebVTT)",
        ],
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Summarize Audio (AI)",
    nodeName: "Audio Manipulation",
    operationItemDescription:
      "Extract key points from long recordings or meetings.",
    itemParams: [
      {
        paramName: "Audio",
        paramInputPlaceholder: "Source audio for summarization...",
        paramDescription: "Enter the audio path, URL, or base64 to summarize.",
        type: "primitive/text",
        value: "",
      },

      {
        paramName: "Summary Type",
        paramInputPlaceholder: "Select...",
        paramDescription: "Select a summary type...",
        type: "primitive/text",
        valuesToPickFrom: [
          "Short",
          "Detailed",
          "Bullet Points",
          "Key takeaways",
        ],
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Apply Styles",
    nodeName: "Audio Manipulation",
    operationItemDescription:
      "Choose from predefined styles like podcast, radio, phone, etc.",
    itemParams: [
      {
        paramName: "Audio",
        paramInputPlaceholder: "Source audio to apply style to...",
        paramDescription: `Enter the audio path, URL, or base64 to apply a style preset.`,
        type: "primitive/text",
        value: "",
      },

      {
        paramName: "Styles",
        paramInputPlaceholder: "Select...",
        paramDescription: "Select a style to apply to your audio...",
        type: "primitive/text",
        valuesToPickFrom: [
          "Podcast",
          "Radio",
          "Phone",
          "Cinematic",
          "Vintage",
          "News",
          "Voiceover",
          "Ambient",
          "Music Studio",
          "Lo-Fi",
          "Live Broadcast",
          "ASMR",
          "Documentary",
        ],
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Data Converter Operations
  {
    operationItemName: "Convert to PDF",
    nodeName: "Data Converter",
    operationItemDescription: `Convert any data into a well-formatted PDF document.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter the data you'd like to convert into a PDF document. Bulk data can be entered.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Page Size",
        paramDescription: `Set the page size of the output PDF.`,
        valuesToPickFrom: [
          "A4",
          "Letter",
          "Legal",
          "A3",
          "A5",
          "B5",
          "Tabloid",
          "Executive",
          "Folio",
          "Ledger",
        ],
        type: "primitive/text",
        value: "" as any,
      },
      {
        paramName: "Orientation",
        paramDescription: `Define the page orientation.`,
        valuesToPickFrom: ["Portrait", "Landscape"],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to CSV",
    nodeName: "Data Converter",
    operationItemDescription: `Convert structured data into CSV format.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter the data you'd like to convert to CSV. Bulk data can be entered.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Delimiter",
        paramInputPlaceholder: "e.g. « , » | « ; » | « \\t »",
        paramDescription: "Character used to separate values in the CSV.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Include Headers",
        paramDescription: `Include column headers in the output.`,
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to Excel (XLSX)",
    nodeName: "Data Converter",
    operationItemDescription: `Convert datasets to a spreadsheet format.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter the data you'd like to convert to Excel. Bulk data is allowed.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Sheet Name",
        paramInputPlaceholder: "e.g. DataSheet1",
        paramDescription: "Name of the spreadsheet tab.",
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Auto Column Width",
        paramDescription: `Automatically adjust column widths based on content.`,
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to Plain Text",
    nodeName: "Data Converter",
    operationItemDescription: `Flatten and serialize any data into readable plain text.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter the data you'd like to convert to plain text. Bulk data is allowed.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Wrap Text",
        paramDescription: `Enable line wrapping for long lines.`,
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Image Converter Operations
  {
    operationItemName: "Convert to JPEG",
    nodeName: "Image Converter",
    operationItemDescription: `Convert image to JPG format with optional quality settings.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter the data you'd like to convert to JPG. Bulk data is allowed.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Quality (1-100)",
        paramInputPlaceholder: "e.g., 90",
        paramDescription:
          "Set JPEG compression quality (higher = better quality).",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Progressive",
        paramDescription: `Create a progressive JPEG for faster web rendering.`,
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to PNG",
    nodeName: "Image Converter",
    operationItemDescription: `Convert any data to PNG format.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter the data you'd like to convert to PNG. Bulk data is allowed.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Grayscale",
        paramDescription: `Convert image to grayscale if enabled.`,
        type: "primitive/switch",
        value: false,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to WebP",
    nodeName: "Image Converter",
    operationItemDescription: `Convert image to WebP for faster web loading.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter the data to convert to WebP format. Bulk data is allowed.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Quality (1-100)",
        paramInputPlaceholder: "e.g., 90",
        paramDescription: "Compression level for WebP output.",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Lossless",
        paramDescription: `Generate a lossless WebP.`,
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to AVIF",
    nodeName: "Image Converter",
    operationItemDescription: `Convert to AVIF for high compression, modern web usage.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter the data you'd like to convert to AVIF format. Bulk data is allowed.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Quality (1-100)",
        paramInputPlaceholder: "e.g., 90",
        paramDescription: "AVIF compression quality.",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Speed (0-10)",
        paramInputPlaceholder: "e.g., 4",
        paramDescription: `0 (slowest, best) - 10 (fastest, worst)`,
        type: "primitive/number",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to TIFF",
    nodeName: "Image Converter",
    operationItemDescription: `Convert to TIFF for high-quality print and publishing.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter the data to convert to TIFF. Bulk data is allowed.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Compression Algorithm",
        paramDescription: `Compression algorithm used in TIFF output.`,
        valuesToPickFrom: ["None", "LZW", "Deflate"],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to BMP",
    nodeName: "Image Converter",
    operationItemDescription: `Convert to BMP for legacy system compatibility.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter the data you'd like to convert to BMP format. Bulk data is allowed.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Color Depth",
        paramDescription: `Bits per pixel in BMP output.`,
        valuesToPickFrom: ["8 bits", "16 bits", "24 bits", "32 bits"],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to ICO",
    nodeName: "Image Converter",
    operationItemDescription: `Convert to .ico for favicon or desktop apps.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter the data you'd like to convert to ICO. Bulk data is allowed.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Icon Size",
        paramDescription: `Generate multiple sizes for favicon or desktop icon compatibility.`,
        valuesToPickFrom: ["16x16", "32x32", "64x64"],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to SVG",
    nodeName: "Image Converter",
    operationItemDescription: `Use tracing/edge-detection to generate SVG from raster (AI-assisted).`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter the data to convert to SVG. Bulk data is allowed.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Simplify Paths",
        paramDescription: `Reduce the number of points in path data for a cleaner SVG.`,
        type: "primitive/switch",
        value: false,
      },
      {
        paramName: "Threshold (0-255)",
        paramInputPlaceholder: "e.g., 128",
        paramDescription:
          "Threshold for binarization before vector tracing (0–255).",
        type: "primitive/number",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Video Converter Operations
  {
    operationItemName: "Convert to MP4",
    nodeName: "Video Converter",
    operationItemDescription: `Convert to MP4 with H.264 encoding for universal playback.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter the data you'd like to convert to MP4 format. Bulk data is allowed.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Resolution",
        paramDescription: "Target video resolution (e.g., 720p, 1080p, 4K).",
        valuesToPickFrom: [
          "144p",
          "240p",
          "360p",
          "480p",
          "720p",
          "1080p",
          "1440p",
          "4K",
          "8K",
        ],
        type: "primitive/text",
        value: "" as any,
      },
      {
        paramName: "Bitrate (kbps) (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g. 3000",
        paramDescription: "Set video bitrate to control quality and file size.",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Frame Rate (fps)  (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g. 30",
        paramDescription: "Target frames per second (15 - 120).",
        type: "primitive/number",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to WebM",
    nodeName: "Video Converter",
    operationItemDescription: `Convert to WebM for optimized browser performance.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter the data you'd like to convert to WebM. Bulk data is allowed.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Resolution",
        paramDescription: "Target video resolution (e.g., 720p, 1080p, 4K).",
        valuesToPickFrom: [
          "144p",
          "240p",
          "360p",
          "480p",
          "720p",
          "1080p",
          "1440p",
          "4K",
          "8K",
        ],
        type: "primitive/text",
        value: "" as any,
      },
      {
        paramName: "Bitrate (kbps) (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g. 3000",
        paramDescription: "Set video bitrate to control quality and file size.",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Frame Rate (fps)  (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g. 30",
        paramDescription: "Target frames per second (15 - 120).",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Codec",
        paramDescription: "Choose a video codec supported by the format.",
        valuesToPickFrom: [
          "vp8",
          "h264",
          "hevc",
          "av1",
          "vp9",
          "mpeg4",
          "theora",
          "prores",
        ],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to MOV",
    nodeName: "Video Converter",
    operationItemDescription: `Convert to Apple-compatible MOV format.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter the data you want to convert into MOV format. Bulk conversions are supported.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Resolution",
        paramDescription: "Target video resolution (e.g., 720p, 1080p, 4K).",
        valuesToPickFrom: [
          "144p",
          "240p",
          "360p",
          "480p",
          "720p",
          "1080p",
          "1440p",
          "4K",
          "8K",
        ],
        type: "primitive/text",
        value: "" as any,
      },
      {
        paramName: "Bitrate (kbps) (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g. 3000",
        paramDescription: "Set video bitrate to control quality and file size.",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Frame Rate (fps)  (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g. 30",
        paramDescription: "Target frames per second (15 - 120).",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Codec",
        paramDescription: "Choose a video codec supported by the format.",
        valuesToPickFrom: [
          "vp8",
          "h264",
          "hevc",
          "av1",
          "vp9",
          "mpeg4",
          "theora",
          "prores",
        ],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to AVI",
    nodeName: "Video Converter",
    operationItemDescription: `Convert to AVI for legacy software needs.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Provide the data for conversion to AVI format. Bulk data entries are accepted.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Resolution",
        paramDescription: "Target video resolution (e.g., 720p, 1080p, 4K).",
        valuesToPickFrom: [
          "144p",
          "240p",
          "360p",
          "480p",
          "720p",
          "1080p",
          "1440p",
          "4K",
          "8K",
        ],
        type: "primitive/text",
        value: "" as any,
      },
      {
        paramName: "Bitrate (kbps) (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g. 3000",
        paramDescription: "Set video bitrate to control quality and file size.",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Frame Rate (fps)  (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g. 30",
        paramDescription: "Target frames per second (15 - 120).",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Codec",
        paramDescription: "Choose a video codec supported by the format.",
        valuesToPickFrom: [
          "vp8",
          "h264",
          "hevc",
          "av1",
          "vp9",
          "mpeg4",
          "theora",
          "prores",
        ],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to MKV",
    nodeName: "Video Converter",
    operationItemDescription: `Convert to MKV for media archiving and subtitles.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Submit the data you wish to convert to MKV format. You can submit bulk data.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Resolution",
        paramDescription: "Target video resolution (e.g., 720p, 1080p, 4K).",
        valuesToPickFrom: [
          "144p",
          "240p",
          "360p",
          "480p",
          "720p",
          "1080p",
          "1440p",
          "4K",
          "8K",
        ],
        type: "primitive/text",
        value: "" as any,
      },
      {
        paramName: "Bitrate (kbps) (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g. 3000",
        paramDescription: "Set video bitrate to control quality and file size.",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Frame Rate (fps)  (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g. 30",
        paramDescription: "Target frames per second (15 - 120).",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Codec",
        paramDescription: "Choose a video codec supported by the format.",
        valuesToPickFrom: [
          "vp8",
          "h264",
          "hevc",
          "av1",
          "vp9",
          "mpeg4",
          "theora",
          "prores",
        ],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to GIF",
    nodeName: "Video Converter",
    operationItemDescription: `Convert video clips into animated GIFs.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Add the data you'd like to convert to GIF format. Bulk data processing is available.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Frame Rate (0-30)",
        paramInputPlaceholder: "e.g. 30",
        paramDescription:
          "Playback frame rate for the GIF (lower = smaller file).",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Max Duration",
        paramDescription:
          "Maximum duration in seconds (clips longer than this will be trimmed).",
        type: "primitive/milliseconds",
        value: "" as any,
      },
      {
        paramName: "Scale",
        paramDescription: "Resize scale for output GIF (e.g., 100%, 50%).",
        valuesToPickFrom: ["10%", "25%", "50%", "75%", "100%"],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Audio Converter Operations
  {
    operationItemName: "Convert to MP3",
    nodeName: "Audio Converter",
    operationItemDescription: `Convert (any data) to MP3 with bitrate options.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter your data for conversion into MP3 format. Bulk data is allowed.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Bitrate (kbps)",
        paramDescription: "Audio bitrate in kbps.",
        type: "primitive/text",
        valuesToPickFrom: [
          "64 kbps",
          "128 kbps",
          "192 kbps",
          "256 kbps",
          "320 kbps",
          "512 kbps",
          "1024 kbps",
        ],
        value: "" as any,
      },
      {
        paramName: "Channels",
        paramDescription: "Select audio channel type.",
        valuesToPickFrom: ["Mono", "Stereo"],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to WAV",
    nodeName: "Audio Converter",
    operationItemDescription: `Convert to WAV (uncompressed audio quality).`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Input the data you want to convert to WAV format. Bulk is supported.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Bitrate (kbps)",
        paramDescription: "Audio bitrate in kbps.",
        type: "primitive/text",
        valuesToPickFrom: [
          "64 kbps",
          "128 kbps",
          "192 kbps",
          "256 kbps",
          "320 kbps",
          "512 kbps",
          "1024 kbps",
        ],
        value: "" as any,
      },
      {
        paramName: "Channels",
        paramDescription: "Select audio channel type.",
        valuesToPickFrom: ["Mono", "Stereo"],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to AAC",
    nodeName: "Audio Converter",
    operationItemDescription: `Convert to AAC for iTunes/Apple devices.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Choose the data to be converted into AAC format. Bulk data submissions are allowed.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Bitrate (kbps)",
        paramDescription: "Audio bitrate in kbps.",
        type: "primitive/text",
        valuesToPickFrom: [
          "64 kbps",
          "128 kbps",
          "192 kbps",
          "256 kbps",
          "320 kbps",
          "512 kbps",
          "1024 kbps",
        ],
        value: "" as any,
      },
      {
        paramName: "Channels",
        paramDescription: "Select audio channel type.",
        valuesToPickFrom: ["Mono", "Stereo"],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to OGG",
    nodeName: "Audio Converter",
    operationItemDescription: `Convert to OGG for open-source friendly audio.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Add the data you wish to convert to OGG format. Bulk data conversions are enabled.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Bitrate (kbps)",
        paramDescription: "Audio bitrate in kbps.",
        type: "primitive/text",
        valuesToPickFrom: [
          "64 kbps",
          "128 kbps",
          "192 kbps",
          "256 kbps",
          "320 kbps",
          "512 kbps",
          "1024 kbps",
        ],
        value: "" as any,
      },
      {
        paramName: "Channels",
        paramDescription: "Select audio channel type.",
        valuesToPickFrom: ["Mono", "Stereo"],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to FLAC",
    nodeName: "Audio Converter",
    operationItemDescription: `Convert to FLAC for lossless compression.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter the data you'd like to convert to FLAC format. Bulk input is accepted.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Bitrate (kbps)",
        paramDescription: "Audio bitrate in kbps.",
        type: "primitive/text",
        valuesToPickFrom: [
          "64 kbps",
          "128 kbps",
          "192 kbps",
          "256 kbps",
          "320 kbps",
          "512 kbps",
          "1024 kbps",
        ],
        value: "" as any,
      },
      {
        paramName: "Channels",
        paramDescription: "Select audio channel type.",
        valuesToPickFrom: ["Mono", "Stereo"],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to M4A",
    nodeName: "Audio Converter",
    operationItemDescription: `Convert to M4A (used in mobile/web apps).`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Provide the data for M4A format conversion. Bulk data is allowed for conversion.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Bitrate (kbps)",
        paramDescription: "Audio bitrate in kbps.",
        type: "primitive/text",
        valuesToPickFrom: [
          "64 kbps",
          "128 kbps",
          "192 kbps",
          "256 kbps",
          "320 kbps",
          "512 kbps",
          "1024 kbps",
        ],
        value: "" as any,
      },
      {
        paramName: "Channels",
        paramDescription: "Select audio channel type.",
        valuesToPickFrom: ["Mono", "Stereo"],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to Opus",
    nodeName: "Audio Converter",
    operationItemDescription: `Convert to Opus for efficient speech audio (e.g., VoIP).`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter the data you’d like to convert into Opus format. Bulk processing is supported.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Bitrate (kbps)",
        paramDescription: "Audio bitrate in kbps.",
        type: "primitive/text",
        valuesToPickFrom: [
          "64 kbps",
          "128 kbps",
          "192 kbps",
          "256 kbps",
          "320 kbps",
          "512 kbps",
          "1024 kbps",
        ],
        value: "" as any,
      },
      {
        paramName: "Channels",
        paramDescription: "Select audio channel type.",
        valuesToPickFrom: ["Mono", "Stereo"],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to AMR",
    nodeName: "Audio Converter",
    operationItemDescription: `Convert for compatibility with mobile voice apps.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Add your data for Voice Note Format (AMR) conversion. Bulk data is accepted.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Bitrate (kbps)",
        paramDescription: "Audio bitrate in kbps.",
        type: "primitive/text",
        valuesToPickFrom: [
          "64 kbps",
          "128 kbps",
          "192 kbps",
          "256 kbps",
          "320 kbps",
          "512 kbps",
          "1024 kbps",
        ],
        value: "" as any,
      },
      {
        paramName: "Channels",
        paramDescription: "Select audio channel type.",
        valuesToPickFrom: ["Mono", "Stereo"],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Encoding Operations
  {
    operationItemName: "Convert to Base64",
    nodeName: "Encoding",
    operationItemDescription: `Encode any data into base64 string.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to encode... (bulk is allowed)",
        paramDescription: `Enter the data you’d like to encode into Base64. Bulk data is supported.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Output Format",
        paramDescription:
          "Format of the output data (e.g., Plain text or JSON-wrapped).",
        valuesToPickFrom: ["Plain text", "JSON (wrapped)"],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to Hexadecimal",
    nodeName: "Encoding",
    operationItemDescription: `Encode any data into hexadecimal format.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to encode... (bulk is allowed)",
        paramDescription: `Provide the data for encoding into Hexadecimal format. Bulk input is allowed.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Output Format",
        paramDescription:
          "Format of the output data (e.g., Plain text or JSON-wrapped).",
        valuesToPickFrom: ["Plain text", "JSON (wrapped)"],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to Binary",
    nodeName: "Encoding",
    operationItemDescription: `Convert (any) data to binary encoding.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to encode... (bulk is allowed)",
        paramDescription: `Input the data to be converted into Binary format. Bulk encoding is supported.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Output Format",
        paramDescription:
          "Format of the output data (e.g., Plain text or JSON-wrapped).",
        valuesToPickFrom: ["Plain text", "JSON (wrapped)"],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to QR Code",
    nodeName: "Encoding",
    operationItemDescription: `Encode any data into QR image, returned as base64 image.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to encode... (bulk is allowed)",
        paramDescription: `Enter the data to encode into QR Code. Bulk data encoding is enabled.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Size (Pixels)",
        paramInputPlaceholder: "e.g. 256",
        paramDescription: "Size of the QR code image in pixels.",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Error Correction Level",
        paramDescription:
          "QR code error correction level (higher means more redundancy).",
        type: "primitive/text",
        valuesToPickFrom: ["L (Low)", "M (Medium)", "Q (Quartile)", "H (High)"],
        value: "" as any,
      },
      [
        {
          paramName: "Foreground Color (Optional)",
          isOptional: true,
          paramInputPlaceholder: "e.g., #000000",
          paramDescription: "Foreground color for the QR code.",
          type: "primitive/text",
          value: "" as any,
        },
        {
          paramName: "Background Color (Optional)",
          isOptional: true,
          paramInputPlaceholder: "e.g., #FFFFFF",
          paramDescription: "Background color for the QR code.",
          type: "primitive/text",
          value: "" as any,
        },
      ],
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Markup Operations
  {
    operationItemName: "Convert to JSON",
    nodeName: "Markup",
    operationItemDescription: `Convert data into JSON for APIs or storage.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Add the data to be converted to JSON. Bulk is accepted`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Indentation",
        paramInputPlaceholder: "e.g. 2",
        paramDescription:
          "Number of spaces to use for indentation in the output.",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Sort Keys",
        paramDescription: `Sort object keys alphabetically for consistent output.`,
        type: "primitive/switch",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to HTML",
    nodeName: "Markup",
    operationItemDescription: `Convert structured data or text into semantic HTML.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter the data to convert to HTML format. Bulk input is accepted.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Root Element",
        paramDescription:
          "Name of the root HTML element (e.g., div, article, section).",
        valuesToPickFrom: [
          "div",
          "article",
          "section",
          "header",
          "footer",
          "main",
          "nav",
          "aside",
          "section",
          "span",
          "p",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "form",
          "input",
          "button",
          "ul",
          "ol",
          "li",
          "table",
          "tr",
          "td",
          "th",
          "thead",
          "tbody",
          "tfoot",
        ],
        type: "primitive/text",
        value: "" as any,
      },
      {
        paramName: "Pretty Print",
        paramDescription: `Format the HTML output with line breaks and indentation.`,
        type: "primitive/switch",
        value: "" as any,
      },
      {
        paramName: "Include Head",
        paramDescription: `Include <head> section with meta tags and title?`,
        type: "primitive/switch",
        value: "" as any,
      },
      {
        paramName: "Title (Optional)",
        isOptional: true,
        paramDescription: `Document title (leave empty if 'Include Head' is off)`,
        paramInputPlaceholder: `Title (if 'Include Head' is enabled.)`,
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to Markdown",
    nodeName: "Markup",
    operationItemDescription: `Convert data into Markdown format.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Add the data to convert to Markdown. Bulk submissions are permitted.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Inline Images as Links",
        paramDescription: `Render images as markdown links instead of base64 inline.`,
        type: "primitive/switch",
        value: "" as any,
      },
      {
        paramName: "List Style (Optional)",
        isOptional: true,
        paramDescription: "Set default style for list rendering.",
        valuesToPickFrom: ["Numbered", "Bullet"],
        type: "primitive/text",
        value: "" as any,
      },
      {
        paramName: "Heading Level Offset (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g. 0",
        paramDescription:
          "Offset for all heading levels (e.g., '1' will turn # into ##).",
        type: "primitive/number",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to XML",
    nodeName: "Markup",
    operationItemDescription: `Convert data into XML markup.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Input the data for XML conversion. Bulk processing is enabled.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Root Tag",
        paramInputPlaceholder: "e.g. root",
        paramDescription: `Name of the XML root tag.`,
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Include Declaration",
        paramDescription: `Include XML declaration header (<?xml version='1.0'?>)?`,
        type: "primitive/switch",
        value: true,
      },
      {
        paramName: "Attribute Prefix (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g. @",
        paramDescription: `Prefix to recognize data as attributes (e.g., @name becomes name='').`,
        type: "primitive/text",
        value: "",
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to YAML",
    nodeName: "Markup",
    operationItemDescription: `Convert data into YAML for devops/config readability.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter the data to convert into YAML. Bulk input allowed.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Indentation",
        paramInputPlaceholder: "e.g. 2",
        paramDescription: "Spaces to use per level of nesting.",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Flow Style",
        paramDescription: `Choose between block or inline YAML output.`,
        valuesToPickFrom: ["Block", "Inline"],
        type: "primitive/text",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  {
    operationItemName: "Convert to LaTeX",
    nodeName: "Markup",
    operationItemDescription: `Convert data (mathematical or academic content) to LaTeX markup.`,
    itemParams: [
      {
        paramName: "Data Input",
        paramInputPlaceholder: "Add data to convert (multiple allowed)...",
        paramDescription: `Enter data for LaTeX conversion. Bulk input is supported.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      {
        paramName: "Document Class",
        paramDescription: `Choose a base document class.`,
        valuesToPickFrom: ["Article", "Report", "Book"],
        type: "primitive/text",
        value: "" as any,
      },
      {
        paramName: "Include Preamble",
        paramDescription: `Include document preamble (e.g., \\documentclass, \\begin{document}).`,
        type: "primitive/switch",
        value: "" as any,
      },
      {
        paramName: "Escape Special Characters",
        paramDescription: `Automatically escape LaTeX special characters.`,
        type: "primitive/switch",
        value: "" as any,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },

  //
  //
  //
  //
  // PDF Viewer Operations
  {
    operationItemName: "PDF Viewer",
    nodeName: "PDF Viewer",
    operationItemDescription: `Render and preview a PDF document directly from a file or URL.`,
    itemParams: [
      {
        paramName: "PDF To Preview",
        paramInputPlaceholder: "Add the PDF to preview...",
        paramDescription: `File path or URL of the PDF.`,
        type: "primitive/text",
        value: "",
      },
      [
        {
          paramName: "Start Page",
          paramInputPlaceholder: "e.g. 2",
          paramDescription: "The page number where viewing should begin.",
          type: "primitive/number",
          isOptional: true,
          value: "" as any,
        },
        {
          paramName: "End Page",
          paramInputPlaceholder: "e.g. 30",
          paramDescription: "The page number where viewing should end.",
          type: "primitive/number",
          isOptional: true,
          value: "" as any,
        },
      ],
      {
        paramName: "Zoom Level",
        paramInputPlaceholder: "e.g. 100",
        paramDescription: "Zoom level percentage (e.g., 100).",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Theme",
        paramDescription: `Viewer theme.`,
        valuesToPickFrom: ["Light", "Dark", "Auto"],
        type: "primitive/text",
        value: "Auto",
      },
      {
        paramName: "Show Toolbar",
        paramDescription: `Display viewer controls (next page, zoom, etc.).`,
        type: "primitive/switch",
        value: true,
      },

      {
        paramName: "Allow Download",
        paramDescription: `Allow anyone to download the previewed file.`,
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Docs Viewer Operations
  {
    operationItemName: "Docs Viewer",
    nodeName: "Docs Viewer",
    operationItemDescription: `Preview text-based documents like Word files or raw content inside a styled, paginated viewer.`,
    itemParams: [
      {
        paramName: "Document To Preview",
        paramInputPlaceholder: "Add the document to preview...",
        paramDescription: `Document path, URL or content.`,
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Page Size",
        paramDescription: `Page size format (A4, Letter, etc.).`,
        valuesToPickFrom: [
          "A4",
          "Letter",
          "Legal",
          "A3",
          "A5",
          "B5",
          "Tabloid",
          "Executive",
          "Folio",
          "Ledger",
        ],
        type: "primitive/text",
        value: "A4",
      },
      {
        paramName: "Theme",
        paramDescription: `Viewer theme.`,
        valuesToPickFrom: ["Light", "Dark", "Auto"],
        type: "primitive/text",
        value: "Auto",
      },
      {
        paramName: "Allow Download",
        paramDescription: `Allow anyone to download the previewed file.`,
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Spreadsheet Viewer Operations
  {
    operationItemName: "Spreadsheet Viewer",
    nodeName: "Spreadsheet Viewer",
    operationItemDescription: `Display structured data like Excel or CSV in an interactive spreadsheet format.`,
    itemParams: [
      {
        paramName: "Spreadsheet To Preview",
        paramInputPlaceholder: "Add the data to preview...",
        paramDescription: `Spreadsheet file URL or data.`,
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Sheet Name (Optional)",
        paramInputPlaceholder: "e.g. Sheet 1",
        paramDescription: "Sheet to render (optional).",
        type: "primitive/text",
        isOptional: true,
        value: "",
      },
      {
        paramName: "Start Cell (Optional)",
        paramInputPlaceholder: "e.g. A1",
        paramDescription: "Start rendering from this cell.",
        type: "primitive/text",
        isOptional: true,
        value: "",
      },
      {
        paramName: "Allow Sorting",
        paramDescription: `Enable user sorting and filtering.`,
        type: "primitive/switch",
        value: true,
      },
      {
        paramName: "Allow Download",
        paramDescription: `Allow anyone to download the previewed file.`,
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Image Preview Operations
  {
    operationItemName: "Image Preview",
    nodeName: "Image Preview",
    operationItemDescription: `View images in-line, whether they’re uploaded or linked by URL.`,
    itemParams: [
      {
        paramName: "Images (Paths + Alt text)",
        paramDescription: `File paths or URLs of the images to display.`,
        type: "primitive/record",
        value: [
          {
            key: "",
            value: "",
          },
        ],
      },
      {
        paramName: "Fit Mode",
        paramDescription: `How the image fits in the preview area.`,
        valuesToPickFrom: ["Contains", "Cover", "Stretch", "Original"],
        type: "primitive/text",
        value: "Contains",
      },
      {
        paramName: "Background Color (Optional)",
        isOptional: true,
        paramInputPlaceholder: "e.g., #000000",
        paramDescription: "Background color for display area.",
        type: "primitive/text",
        value: "" as any,
      },
      {
        paramName: "Show Zoom",
        paramDescription: `Enable zooming and panning.`,
        type: "primitive/switch",
        value: true,
      },
      {
        paramName: "Allow Download",
        paramDescription: `Allow anyone to download the previewed file.`,
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Media Player Operations
  {
    operationItemName: "Media Player",
    nodeName: "Media Player",
    operationItemDescription: `Play audio or video files directly within the workflow.`,
    itemParams: [
      {
        paramName: "Audio/Video playlist",
        paramDescription:
          "File paths or URLs of the audio and video files to display",
        type: "primitive/array",
        value: [""],
      },
      [
        {
          paramName: "Autoplay",
          isOptional: true,
          paramDescription: `Start playing automatically.`,
          type: "primitive/switch",
          value: true,
        },
        {
          paramName: "Controls",
          isOptional: true,
          paramDescription: `Show media player controls.`,
          type: "primitive/switch",
          value: true,
        },
        {
          paramName: "Loop",
          isOptional: true,
          paramDescription: `Loop playback continuously.`,
          type: "primitive/switch",
          value: true,
        },
      ],
      {
        paramName: "Volume (1-100)",
        isOptional: true,
        paramInputPlaceholder: "e.g. 75",
        paramDescription: "Initial volume level (0–100).",
        type: "primitive/number",
        value: "" as any,
      },
      {
        paramName: "Allow Download",
        paramDescription: `Allow anyone to download the previewed file.`,
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
  //
  //
  //
  //
  // Code Preview Operations
  {
    operationItemName: "Code Preview",
    nodeName: "Code Preview",
    operationItemDescription: `Render code or structured text (JSON, XML, Markdown, etc.) with syntax highlighting.`,
    itemParams: [
      {
        paramName: "Code Content",
        paramInputPlaceholder: "Paste your code or structured content...",
        paramDescription: `File path or content to preview.`,
        type: "primitive/text",
        isTextarea: true,
        value: "",
      },
      [
        {
          paramName: "Line Numbers",
          paramDescription: `Show line numbers beside code.`,
          type: "primitive/switch",
          value: true,
        },
        {
          paramName: "Wrap Lines",
          paramDescription: `Wrap long lines instead of horizontal scroll.`,
          type: "primitive/switch",
          value: true,
        },
      ],
      {
        paramName: "Language",
        paramDescription: `Code language for syntax highlighting.`,
        valuesToPickFrom: ["JSON", "XML", "Markdown", "Js"],
        type: "primitive/text",
        value: "",
      },
      {
        paramName: "Allow Download",
        paramDescription: `Allow anyone to download the previewed content.`,
        type: "primitive/switch",
        value: true,
      },
    ],

    itemInputFilters: [],
    itemOutputs: {},
  },
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
